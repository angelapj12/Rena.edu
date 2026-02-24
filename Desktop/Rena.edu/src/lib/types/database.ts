// Database types matching Supabase schema

export type BookingStatus =
  | "SUBMITTED"
  | "TOUR_SCHEDULED"
  | "TOUR_COMPLETED"
  | "FORMAL_APPLICATION_PENDING"
  | "FORMAL_APPLICATION_COMPLETED"
  | "CONTRACT_SENT"
  | "AWAITING_PAYMENT"
  | "ACTIVE"
  | "DECLINED";

export type StaffRole = "ADMIN" | "CEO" | "ACCOUNT_MANAGER" | "TOUR_GUIDE";

export type RequestActionType =
  | "TOUR_ASSIGNED"
  | "TOUR_SCHEDULED"
  | "TOUR_COMPLETED"
  | "FORMAL_APPLICATION_SENT"
  | "FORMAL_APPLICATION_COMPLETED"
  | "CONTRACT_SENT"
  | "CONTRACT_SIGNED"
  | "PAYMENT_CONFIRMED"
  | "DECLINED";

export type EvidenceType = "NOTE" | "DOCUMENT" | "PAYMENT_PROOF" | "SIGNED_CONTRACT";

export type PaymentStatus = "PENDING" | "CONFIRMED";

export interface StaffMember {
  id: string;
  full_name: string;
  role: StaffRole;
  created_at: string;
}

export interface BookingRequest {
  id: string;
  chinese_last_name: string;
  chinese_first_name: string;
  english_name: string;
  email: string;
  phone: string;
  class_description: string;
  preferred_times?: string | null;
  access_option?: string | null;
  request_type?: string | null;
  estimated_frequency?: string | null;
  equipment?: string[] | null;
  status: BookingStatus;
  assigned_access_tier?: string | null;
  internal_priority_score?: number | null;
  internal_notes?: string | null;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  created_at: string;
  updated_at: string;
  additional_notes?: string | null;
  assigned_account_manager?: string | null;
  declined_reason?: string | null;
  tour_scheduled_at?: string | null;
  tour_completed_at?: string | null;
  formal_application_completed_at?: string | null;
  contract_signed_at?: string | null;
  payment_confirmed_at?: string | null;
}

export interface RequestAction {
  id: string;
  request_id: string;
  action_type: RequestActionType;
  performed_by?: string | null;
  notes?: string | null;
  created_at: string;
}

export interface RequestEvidence {
  id: string;
  request_id: string;
  action_id?: string | null;
  evidence_type: EvidenceType;
  label: string;
  file_url?: string | null;
  metadata?: Record<string, any> | null;
  created_at: string;
}

export interface TourSchedule {
  id: string;
  request_id: string;
  guide_id?: string | null;
  scheduled_at: string;
  completed_at?: string | null;
  completion_notes?: string | null;
  created_at: string;
}

export interface Contract {
  id: string;
  request_id: string;
  contract_url?: string | null;
  sent_at?: string | null;
  signed_at?: string | null;
  signed_by?: string | null;
  created_at: string;
}

export interface Payment {
  id: string;
  request_id: string;
  status: PaymentStatus;
  amount_cents?: number | null;
  currency?: string | null;
  reference?: string | null;
  confirmed_at?: string | null;
  created_at: string;
}

// Extended types for UI
export interface BookingRequestWithRelations extends BookingRequest {
  account_manager?: StaffMember | null;
  tour_schedule?: TourSchedule | null;
  guide?: StaffMember | null;
  contract?: Contract | null;
  payment?: Payment | null;
  actions?: RequestAction[];
  evidence?: RequestEvidence[];
}
