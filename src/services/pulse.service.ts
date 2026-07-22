import { supabase } from "../lib/supabase";
import type { ConfirmationStatus, CommunityPulseMetrics } from "../types/pulse";

const DEVICE_FINGERPRINT_KEY = "busundo_device_identifier";

export function getUserIdentifier(): string {
  let id = localStorage.getItem(DEVICE_FINGERPRINT_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_FINGERPRINT_KEY, id);
  }
  return id;
}

export async function submitConfirmation(departureId: number, status: ConfirmationStatus) {
  const userIdentifier = getUserIdentifier();
  
  // Since we rely on a date-based unique constraint (departure_id, user_identifier, DATE(created_at)),
  // Supabase JS client doesn't natively support ON CONFLICT for casted columns simply. 
  // However, we can just insert, and if it fails due to unique constraint, we can update today's record.
  // A simple and robust approach for the client side is to try an update first for today, then insert if no rows affected.
  // But standard insert might just fail. 
  // Let's query today's vote first to check if we need to update.

  const todayStr = new Date().toISOString().split('T')[0];

  const { data: existing, error: searchError } = await supabase
    .from("confirmation_reports")
    .select("id")
    .eq("departure_id", departureId)
    .eq("user_identifier", userIdentifier)
    .gte("created_at", `${todayStr}T00:00:00Z`)
    .lte("created_at", `${todayStr}T23:59:59Z`)
    .single();

  if (searchError && searchError.code !== 'PGRST116') {
    console.error("Search error:", searchError);
  }

  if (existing) {
    // Update existing vote for today
    const { error: updateError } = await supabase
      .from("confirmation_reports")
      .update({ status })
      .eq("id", existing.id);
      
    if (updateError) throw updateError;
    return;
  }

  // Insert new vote
  const { error: insertError } = await supabase
    .from("confirmation_reports")
    .insert({
      departure_id: departureId,
      user_identifier: userIdentifier,
      status
    });

  if (insertError) throw insertError;
}

export async function getDeparturesPulseMetrics(departureIds: number[]): Promise<Record<number, CommunityPulseMetrics>> {
  if (departureIds.length === 0) return {};

  const { data, error } = await supabase
    .from("confirmation_reports")
    .select("departure_id, status, created_at")
    .in("departure_id", departureIds);

  if (error) {
    console.error("Error fetching pulse metrics:", error);
    return {};
  }

  const metricsByDeparture: Record<number, CommunityPulseMetrics> = {};

  // Initialize
  departureIds.forEach(id => {
    metricsByDeparture[id] = {
      total_confirmations: 0,
      on_time_count: 0,
      late_count: 0,
      missed_count: 0,
    };
  });

  (data || []).forEach((report) => {
    const id = report.departure_id;
    if (!metricsByDeparture[id]) return;

    metricsByDeparture[id].total_confirmations += 1;
    if (report.status === "on_time") metricsByDeparture[id].on_time_count += 1;
    if (report.status === "late") metricsByDeparture[id].late_count += 1;
    if (report.status === "missed") metricsByDeparture[id].missed_count += 1;

    // Track latest confirmation
    if (!metricsByDeparture[id].last_confirmed_at || new Date(report.created_at) > new Date(metricsByDeparture[id].last_confirmed_at!)) {
      metricsByDeparture[id].last_confirmed_at = report.created_at;
    }
  });

  return metricsByDeparture;
}

export function generatePulseInsight(metrics?: CommunityPulseMetrics): { text: string; color: string; status: 'great' | 'warning' | 'bad' | 'unknown' } {
  if (!metrics || metrics.total_confirmations === 0) {
    return {
      text: "Community hasn't confirmed this bus recently.",
      color: "bg-zinc-100 text-zinc-600",
      status: "unknown"
    };
  }

  const { total_confirmations, on_time_count, late_count, missed_count } = metrics;
  const onTimePercentage = on_time_count / total_confirmations;
  const latePercentage = late_count / total_confirmations;
  const missedPercentage = missed_count / total_confirmations;

  if (missedPercentage > 0.4 || (latePercentage > 0.5 && missedPercentage > 0.2)) {
    return {
      text: "Had a bad experience before with this bus. Treat time as approximate.",
      color: "bg-red-100 text-red-700",
      status: "bad"
    };
  }

  if (latePercentage > 0.4) {
    return {
      text: `This bus runs late. Based on ${total_confirmations} reports.`,
      color: "bg-amber-100 text-amber-700",
      status: "warning"
    };
  }

  if (onTimePercentage > 0.8) {
    return {
      text: `This bus is extremely reliable. Confirmed by ${total_confirmations} students.`,
      color: "bg-emerald-100 text-emerald-700",
      status: "great"
    };
  }

  if (onTimePercentage > 0.5) {
    return {
      text: "This bus leaves on time.",
      color: "bg-emerald-50 text-emerald-600",
      status: "great"
    };
  }

  return {
    text: "Reports conflict. This bus may be unreliable.",
    color: "bg-zinc-100 text-zinc-700",
    status: "unknown"
  };
}

export async function getRecentConfirmations(limit = 10) {
  const { data, error } = await supabase
    .from("confirmation_reports")
    .select(`
      id,
      status,
      created_at,
      departure_id,
      departure_board (
        bus_name,
        destination,
        departure_time
      )
    `)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recent confirmations:", error);
    return [];
  }
  return data;
}

export async function getCommunityStats() {
  // Just an example of basic stats.
  const { count, error } = await supabase
    .from("confirmation_reports")
    .select('*', { count: 'exact', head: true });
    
  if (error) {
    console.error("Error fetching stats:", error);
  }
  
  return {
    totalConfirmations: count || 0,
  };
}
