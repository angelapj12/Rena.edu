// Admin portal API functions for Supabase operations

import { supabase } from "@/lib/supabase";
import type {
  BookingRequest,
  BookingRequestWithRelations,
  BookingStatus,
  StaffMember,
  RequestAction,
  RequestActionType,
  RequestEvidence,
  TourSchedule,
  Contract,
  Payment,
} from "@/lib/types/database";

// =====================
// Booking Requests
// =====================

export async function fetchAllRequests(): Promise<BookingRequest[]> {
  try {
    const { data, error } = await supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching requests:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      console.error("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL || "Using fallback");
      throw new Error(`Failed to fetch requests: ${error.message}`);
    }

    return data || [];
  } catch (err: any) {
    // Handle network/DNS errors
    if (err.message?.includes("Failed to fetch") || err.message?.includes("ERR_NAME_NOT_RESOLVED")) {
      const errorMsg = `Cannot connect to Supabase. Please verify:
1. Your Supabase project is active (not paused)
2. The URL in .env.local matches your project URL from Supabase dashboard
3. Check Settings → API in your Supabase dashboard for the correct Project URL
Current URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set"}`;
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
    throw err;
  }
}

export async function fetchRequestById(
  id: string
): Promise<BookingRequestWithRelations | null> {
  // Fetch request
  const { data: request, error: requestError } = await supabase
    .from("booking_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (requestError) {
    console.error("Error fetching request:", requestError);
    throw requestError;
  }

  if (!request) return null;

  // Fetch related data in parallel
  const [
    accountManagerRes,
    tourScheduleRes,
    contractRes,
    paymentRes,
    actionsRes,
    evidenceRes,
  ] = await Promise.all([
    request.assigned_account_manager
      ? supabase
          .from("staff_members")
          .select("*")
          .eq("id", request.assigned_account_manager)
          .single()
      : Promise.resolve({ data: null, error: null }),
    supabase
      .from("tour_schedules")
      .select("*")
      .eq("request_id", id)
      .maybeSingle(),
    supabase
      .from("contracts")
      .select("*")
      .eq("request_id", id)
      .maybeSingle(),
    supabase
      .from("payments")
      .select("*")
      .eq("request_id", id)
      .maybeSingle(),
    supabase
      .from("request_actions")
      .select("*")
      .eq("request_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("request_evidence")
      .select("*")
      .eq("request_id", id)
      .order("created_at", { ascending: false }),
  ]);

  const accountManager = accountManagerRes.data;
  const tourSchedule = tourScheduleRes.data;
  const contract = contractRes.data;
  const payment = paymentRes.data;
  const actions = actionsRes.data || [];
  const evidence = evidenceRes.data || [];

  // Fetch guide if tour schedule exists
  let guide = null;
  if (tourSchedule?.guide_id) {
    const guideRes = await supabase
      .from("staff_members")
      .select("*")
      .eq("id", tourSchedule.guide_id)
      .single();
    guide = guideRes.data;
  }

  return {
    ...request,
    account_manager: accountManager || null,
    tour_schedule: tourSchedule || undefined,
    guide: guide || null,
    contract: contract || undefined,
    payment: payment || undefined,
    actions: actions || [],
    evidence: evidence || [],
  };
}

export async function updateRequestStatus(
  id: string,
  status: BookingStatus,
  declinedReason?: string
): Promise<BookingRequest> {
  const updateData: any = {
    status,
    updated_at: new Date().toISOString(),
  };

  // Set status-specific timestamps
  if (status === "TOUR_SCHEDULED") {
    updateData.tour_scheduled_at = new Date().toISOString();
  } else if (status === "TOUR_COMPLETED") {
    updateData.tour_completed_at = new Date().toISOString();
  } else if (status === "FORMAL_APPLICATION_COMPLETED") {
    updateData.formal_application_completed_at = new Date().toISOString();
  } else if (status === "CONTRACT_SENT" || status === "AWAITING_PAYMENT") {
    updateData.contract_signed_at = new Date().toISOString();
  } else if (status === "ACTIVE") {
    updateData.payment_confirmed_at = new Date().toISOString();
  }

  if (status === "DECLINED" && declinedReason) {
    updateData.declined_reason = declinedReason;
  }

  const { data, error } = await supabase
    .from("booking_requests")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating request status:", error);
    throw error;
  }

  return data;
}

export async function assignAccountManager(
  requestId: string,
  staffMemberId: string
): Promise<BookingRequest> {
  const { data, error } = await supabase
    .from("booking_requests")
    .update({
      assigned_account_manager: staffMemberId,
      updated_at: new Date().toISOString(),
    })
    .eq("id", requestId)
    .select()
    .single();

  if (error) {
    console.error("Error assigning account manager:", error);
    throw error;
  }

  return data;
}

// =====================
// Staff Members
// =====================

export async function fetchAllStaff(): Promise<StaffMember[]> {
  const { data, error } = await supabase
    .from("staff_members")
    .select("*")
    .order("full_name");

  if (error) {
    console.error("Error fetching staff:", error);
    throw error;
  }

  return data || [];
}

export async function fetchStaffByRole(
  role: StaffMember["role"]
): Promise<StaffMember[]> {
  const { data, error } = await supabase
    .from("staff_members")
    .select("*")
    .eq("role", role)
    .order("full_name");

  if (error) {
    console.error("Error fetching staff by role:", error);
    throw error;
  }

  return data || [];
}

// =====================
// Request Actions (Audit Log)
// =====================

export async function createRequestAction(
  requestId: string,
  actionType: RequestActionType,
  performedBy: string | null,
  notes?: string
): Promise<RequestAction> {
  const { data, error } = await supabase
    .from("request_actions")
    .insert({
      request_id: requestId,
      action_type: actionType,
      performed_by: performedBy,
      notes: notes || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating request action:", error);
    throw error;
  }

  return data;
}

// =====================
// Tour Schedules
// =====================

export async function createOrUpdateTourSchedule(
  requestId: string,
  guideId: string | null,
  scheduledAt: string,
  completionNotes?: string
): Promise<TourSchedule> {
  // Check if tour schedule exists
  const { data: existing } = await supabase
    .from("tour_schedules")
    .select("*")
    .eq("request_id", requestId)
    .maybeSingle();

  if (existing) {
    // Update existing
    const { data, error } = await supabase
      .from("tour_schedules")
      .update({
        guide_id: guideId,
        scheduled_at: scheduledAt,
        completed_at: completionNotes ? new Date().toISOString() : null,
        completion_notes: completionNotes || null,
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating tour schedule:", error);
      throw error;
    }

    return data;
  } else {
    // Create new
    const { data, error } = await supabase
      .from("tour_schedules")
      .insert({
        request_id: requestId,
        guide_id: guideId,
        scheduled_at: scheduledAt,
        completion_notes: completionNotes || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating tour schedule:", error);
      throw error;
    }

    return data;
  }
}

// =====================
// Contracts
// =====================

export async function createOrUpdateContract(
  requestId: string,
  contractUrl?: string,
  sentAt?: string,
  signedAt?: string,
  signedBy?: string
): Promise<Contract> {
  // Check if contract exists
  const { data: existing } = await supabase
    .from("contracts")
    .select("*")
    .eq("request_id", requestId)
    .maybeSingle();

  if (existing) {
    // Update existing
    const { data, error } = await supabase
      .from("contracts")
      .update({
        contract_url: contractUrl || existing.contract_url,
        sent_at: sentAt || existing.sent_at,
        signed_at: signedAt || existing.signed_at,
        signed_by: signedBy || existing.signed_by,
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating contract:", error);
      throw error;
    }

    return data;
  } else {
    // Create new
    const { data, error } = await supabase
      .from("contracts")
      .insert({
        request_id: requestId,
        contract_url: contractUrl || null,
        sent_at: sentAt || null,
        signed_at: signedAt || null,
        signed_by: signedBy || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating contract:", error);
      throw error;
    }

    return data;
  }
}

// =====================
// Payments
// =====================

export async function createOrUpdatePayment(
  requestId: string,
  status: Payment["status"],
  amountCents?: number,
  reference?: string,
  confirmedAt?: string
): Promise<Payment> {
  // Check if payment exists
  const { data: existing } = await supabase
    .from("payments")
    .select("*")
    .eq("request_id", requestId)
    .maybeSingle();

  if (existing) {
    // Update existing
    const { data, error } = await supabase
      .from("payments")
      .update({
        status,
        amount_cents: amountCents || existing.amount_cents,
        reference: reference || existing.reference,
        confirmed_at: confirmedAt || existing.confirmed_at,
      })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating payment:", error);
      throw error;
    }

    return data;
  } else {
    // Create new
    const { data, error } = await supabase
      .from("payments")
      .insert({
        request_id: requestId,
        status,
        amount_cents: amountCents || null,
        reference: reference || null,
        confirmed_at: confirmedAt || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating payment:", error);
      throw error;
    }

    return data;
  }
}

// =====================
// Request Evidence
// =====================

export async function createRequestEvidence(
  requestId: string,
  evidenceType: RequestEvidence["evidence_type"],
  label: string,
  fileUrl?: string,
  actionId?: string,
  metadata?: Record<string, any>
): Promise<RequestEvidence> {
  const { data, error } = await supabase
    .from("request_evidence")
    .insert({
      request_id: requestId,
      action_id: actionId || null,
      evidence_type: evidenceType,
      label,
      file_url: fileUrl || null,
      metadata: metadata || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating request evidence:", error);
    throw error;
  }

  return data;
}
