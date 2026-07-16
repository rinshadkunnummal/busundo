import { supabase } from "../lib/supabase";
import type { Departure } from "../types/departure";

export async function getDepartures(destination?: string) {
  let query = supabase
    .from("departure_board")
    .select("*")
    .order("departure_time");

  if (destination) {
    query = query.eq("destination", destination);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data as Departure[];
}

export async function getDestinations() {
  const { data, error } = await supabase
    .from("destinations")
    .select("name")
    .order("name");

  if (error) throw error;

  return data.map((d) => d.name);
}