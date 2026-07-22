import { supabase } from "../lib/supabase";
import type { Bus, Departure, Destination } from "../types/departure";

interface DepartureFilters {
  destination?: string;
  search?: string;
}

const inFlightDepartures = new Map<string, Promise<Departure[]>>();
let inFlightDestinations: Promise<Destination[]> | undefined;
let inFlightBuses: Promise<Bus[]> | undefined;

function dedupeDepartures(departures: Departure[]) {
  const uniqueDepartures = new Map<string, Departure>();

  for (const departure of departures) {
    const signature = [
      departure.departure_time.slice(0, 5),
      departure.bus_name.trim().toLowerCase(),
      departure.destination.trim().toLowerCase(),
      departure.bus_type?.trim().toLowerCase() ?? "",
      departure.platform?.trim().toLowerCase() ?? "",
    ].join("|");

    if (!uniqueDepartures.has(signature)) {
      uniqueDepartures.set(signature, departure);
    }
  }

  return Array.from(uniqueDepartures.values());
}

function createDepartureQuery(destination?: string) {
  let query = supabase
    .from("departure_board")
    .select("id, bus_name, destination, departure_time, bus_type, platform")
    .order("departure_time");

  if (destination) {
    query = query.eq("destination", destination);
  }

  return query;
}

export async function getDepartures(filters: DepartureFilters = {}) {
  const destination = filters.destination?.trim() || undefined;
  const search = filters.search?.trim() || undefined;
  const cacheKey = `${destination ?? ""}|${search ?? ""}`;

  const existingRequest = inFlightDepartures.get(cacheKey);
  if (existingRequest) {
    return existingRequest;
  }

  const request = (async () => {
    if (search) {
      const [busNameResult, destinationResult] = await Promise.all([
        createDepartureQuery(destination).ilike("bus_name", `%${search}%`),
        createDepartureQuery(destination).ilike("destination", `%${search}%`),
      ]);

      if (busNameResult.error) throw busNameResult.error;
      if (destinationResult.error) throw destinationResult.error;

      const departuresById = new Map<number, Departure>();

      for (const departure of busNameResult.data ?? []) {
        departuresById.set(departure.id, departure);
      }

      for (const departure of destinationResult.data ?? []) {
        departuresById.set(departure.id, departure);
      }

      return dedupeDepartures(Array.from(departuresById.values())).sort((left, right) => {
        const timeComparison = left.departure_time.localeCompare(right.departure_time);

        if (timeComparison !== 0) {
          return timeComparison;
        }

        return left.id - right.id;
      });
    }

    const { data, error } = await createDepartureQuery(destination);

    if (error) throw error;

    console.log("Fetched departures:", data ?? []);

    return dedupeDepartures(data ?? []);
  })();

  inFlightDepartures.set(cacheKey, request);

  try {
    return await request;
  } finally {
    inFlightDepartures.delete(cacheKey);
  }
}

export async function getDestinations() {
  if (inFlightDestinations) {
    return inFlightDestinations;
  }

  const request = (async () => {
  const { data, error } = await supabase
    .from("destinations")
    .select("destination")
    .order("destination");

  if (error) throw error;

  return (data ?? []) as Destination[];
  })();

  inFlightDestinations = request;

  try {
    return await request;
  } finally {
    inFlightDestinations = undefined;
  }
}

export async function getBuses() {
  if (inFlightBuses) {
    return inFlightBuses;
  }

  const request = (async () => {
  const { data, error } = await supabase
    .from("buses")
    .select("bus_name")
    .order("bus_name");

  if (error) throw error;

  return (data ?? []) as Bus[];
  })();

  inFlightBuses = request;

  try {
    return await request;
  } finally {
    inFlightBuses = undefined;
  }
}

export interface BusSubmission {
  bus_name: string;
  destination: string;
  departure_time: string;
  bus_type?: string;
  submitted_by: string;
}

export async function submitNewBus(submission: BusSubmission) {
  const { error } = await supabase
    .from("bus_submissions")
    .insert({
      bus_name: submission.bus_name,
      destination: submission.destination,
      departure_time: submission.departure_time,
      bus_type: submission.bus_type || null,
      submitted_by: submission.submitted_by,
      status: 'pending'
    });

  if (error) {
    throw error;
  }
}

export async function getPendingSubmissions() {
  const { data, error } = await supabase
    .from("bus_submissions")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function approveSubmission(submission: any) {
  // First insert into the live database table (we assume departure_board is an updatable view or table)
  const { error: insertError } = await supabase
    .from("departure_board")
    .insert({
      bus_name: submission.bus_name,
      destination: submission.destination,
      departure_time: submission.departure_time,
      bus_type: submission.bus_type || null,
    });

  if (insertError) {
    console.error("Failed to insert into live table", insertError);
    // If it fails, they might need to use the real table name. We'll throw so the UI knows.
    throw new Error(`Failed to approve: ${insertError.message}. Make sure departure_board is updatable or replace it with your base table name.`);
  }

  // Then update status to approved
  const { error: updateError } = await supabase
    .from("bus_submissions")
    .update({ status: "approved" })
    .eq("id", submission.id);

  if (updateError) throw updateError;
}

export async function rejectSubmission(id: string) {
  const { error } = await supabase
    .from("bus_submissions")
    .update({ status: "rejected" })
    .eq("id", id);

  if (error) throw error;
}