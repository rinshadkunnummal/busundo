export type ConfirmationStatus = "on_time" | "late" | "missed";

export interface ConfirmationReport {
  id: string;
  departure_id: number;
  user_identifier: string;
  status: ConfirmationStatus;
  created_at: string;
}

export interface CommunityPulseMetrics {
  total_confirmations: number;
  on_time_count: number;
  late_count: number;
  missed_count: number;
  last_confirmed_at?: string;
  reliability_score?: number; 
}
