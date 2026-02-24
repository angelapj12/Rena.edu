"use client";

import { useState, useEffect } from "react";
import {
  fetchAllRequests,
  fetchRequestById,
  updateRequestStatus,
  assignAccountManager,
  fetchAllStaff,
  createRequestAction,
  createOrUpdateTourSchedule,
  createOrUpdateContract,
  createOrUpdatePayment,
  createRequestEvidence,
} from "@/lib/admin/admin-api";
import { testSupabaseConnection } from "@/lib/admin/test-connection";
import type {
  BookingRequest,
  BookingRequestWithRelations,
  BookingStatus,
  StaffMember,
  RequestAction,
  RequestEvidence,
} from "@/lib/types/database";

/* =====================
   Types
===================== */

type EvidenceItem = {
  label: string;
  file?: File;
  stagedAt: Date;
};

type EvidenceBlock = {
  action: string;
  items: EvidenceItem[];
  committedAt: Date;
  action_id?: string;
};

/* =====================
   STATE DEFINITIONS (LOCKED)
===================== */

const STATES: BookingStatus[] = [
  "SUBMITTED",
  "TOUR_SCHEDULED",
  "TOUR_COMPLETED",
  "FORMAL_APPLICATION_PENDING",
  "FORMAL_APPLICATION_COMPLETED",
  "CONTRACT_SENT",
  "AWAITING_PAYMENT",
  "ACTIVE",
  "DECLINED",
];

/* =====================
   Root App
===================== */

export default function AdminPortal() {
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<BookingRequestWithRelations | null>(null);
  const [currentPage, setCurrentPage] = useState<string>("Requests");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Test connection and fetch all requests on mount
  useEffect(() => {
    async function loadRequests() {
      try {
        setLoading(true);
        
        // First test the connection
        const connectionTest = await testSupabaseConnection();
        if (!connectionTest.success) {
          setError(connectionTest.message);
          console.error("Connection test failed:", connectionTest);
          return;
        }
        
        // If connection works, fetch requests
        const data = await fetchAllRequests();
        setRequests(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load requests");
        console.error("Error loading requests:", err);
      } finally {
        setLoading(false);
      }
    }
    loadRequests();
  }, []);

  // Load full request details when selected
  useEffect(() => {
    const id = selectedRequest?.id;
    if (!id) return;

    async function loadRequestDetails(requestId: string) {
      try {
        const fullRequest = await fetchRequestById(requestId);
        if (fullRequest) {
          setSelectedRequest(fullRequest);
        }
      } catch (err: any) {
        console.error("Error loading request details:", err);
      }
    }
    loadRequestDetails(id);
  }, [selectedRequest?.id]);

  const handleSelectRequest = async (req: BookingRequest) => {
    try {
      const fullRequest = await fetchRequestById(req.id);
      setSelectedRequest(fullRequest);
    } catch (err: any) {
      setError(err.message || "Failed to load request details");
      console.error("Error loading request:", err);
    }
  };

  const handleAdvanceStatus = async (
    id: string,
    nextStatus: BookingStatus,
    declinedReason?: string
  ) => {
    try {
      await updateRequestStatus(id, nextStatus, declinedReason);
      // Refresh requests list
      const updatedRequests = await fetchAllRequests();
      setRequests(updatedRequests);
      // Refresh selected request
      if (selectedRequest?.id === id) {
        const updatedRequest = await fetchRequestById(id);
        if (updatedRequest) {
          setSelectedRequest(updatedRequest);
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to update request status");
      console.error("Error updating status:", err);
    }
  };

  // Helper to map booking request to UI format
  const mapRequestToUI = (req: BookingRequest) => ({
    id: req.id,
    name: req.english_name,
    organization: req.additional_notes || "N/A",
    tier: req.assigned_access_tier || req.access_option || "N/A",
    status: req.status,
    guide: null, // Will be loaded from tour_schedule
    accountManager: null, // Will be loaded from staff_members
    submittedAt: new Date(req.created_at).toLocaleDateString(),
    requestType: req.request_type || "N/A",
    desiredSchedule: req.preferred_times || "N/A",
    estimatedFrequency: req.estimated_frequency || "N/A",
    notesFromApplicant: req.additional_notes || "",
  });

  if (loading && requests.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="mb-4 text-lg text-neutral-600">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-900">
      <Sidebar current={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-1 overflow-y-auto">
        {error && (
          <div className="mx-4 mt-4 rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-800">{error}</p>
            <button
              onClick={() => setError(null)}
              className="mt-2 text-xs text-red-600 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {currentPage === "Requests" && !selectedRequest && (
          <RequestsList
            requests={requests}
            onSelect={handleSelectRequest}
            loading={loading}
          />
        )}

        {currentPage === "Requests" && selectedRequest && (
          <RequestDetail
            request={selectedRequest}
            onBack={() => setSelectedRequest(null)}
            onAdvanceStatus={handleAdvanceStatus}
          />
        )}

        {currentPage === "Pipeline" && (
          <PipelineView
            requests={requests}
            onSelect={handleSelectRequest}
            loading={loading}
          />
        )}
      </main>
    </div>
  );
}

/* =====================
   Sidebar
===================== */

function Sidebar({
  current,
  onNavigate,
}: {
  current: string;
  onNavigate: (page: string) => void;
}) {
  const items = [
    "Dashboard",
    "Requests",
    "Pipeline",
    "Accounts",
    "Schedule",
    "Contracts",
    "Payments",
    "Settings",
  ];

  return (
    <aside className="w-64 border-r bg-white px-6 py-8">
      <h1 className="mb-10 text-xl font-semibold">Admin Portal</h1>
      <nav className="space-y-2 text-sm">
        {items.map((item) => (
          <NavItem
            key={item}
            label={item}
            active={current === item}
            onClick={() => onNavigate(item)}
          />
        ))}
      </nav>
    </aside>
  );
}

function NavItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded px-3 py-2 transition ${
        active ? "bg-neutral-100 font-medium" : "hover:bg-neutral-50"
      }`}
    >
      {label}
    </div>
  );
}

/* =====================
   Pipeline View
===================== */

function PipelineView({
  requests,
  onSelect,
  loading,
}: {
  requests: BookingRequest[];
  onSelect: (req: BookingRequest) => void;
  loading: boolean;
}) {
  const grouped = STATES.map((stage) => ({
    stage,
    items: requests.filter((r) => r.status === stage),
  }));

  if (loading) {
    return (
      <section className="p-10">
        <div className="text-center text-neutral-500">Loading pipeline...</div>
      </section>
    );
  }

  return (
    <section className="p-10">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold">Pipeline</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Requests grouped by lifecycle stage
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-4">
        {grouped.map(({ stage, items }) => (
          <div key={stage} className="rounded-lg border bg-white p-4">
            <h3 className="mb-4 text-sm font-semibold text-neutral-700">
              {stage}
            </h3>

            <div className="space-y-3">
              {items.length === 0 && (
                <p className="text-xs text-neutral-400">No requests</p>
              )}

              {items.map((req) => (
                <div
                  key={req.id}
                  onClick={() => onSelect(req)}
                  className="cursor-pointer rounded border px-3 py-2 hover:bg-neutral-50"
                >
                  <div className="text-sm font-medium">{req.english_name}</div>
                  <div className="text-xs text-neutral-500">
                    {req.preferred_times || "No schedule specified"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =====================
   Requests List
===================== */

function RequestsList({
  requests,
  onSelect,
  loading,
}: {
  requests: BookingRequest[];
  onSelect: (req: BookingRequest) => void;
  loading: boolean;
}) {
  if (loading) {
    return (
      <section className="p-10">
        <div className="text-center text-neutral-500">Loading requests...</div>
      </section>
    );
  }

  return (
    <section className="p-10">
      <header className="mb-8">
        <h2 className="text-2xl font-semibold">Requests</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Incoming demand for space access
        </p>
      </header>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="border-b bg-neutral-50 text-left text-neutral-500">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Tier</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-neutral-500">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr
                  key={req.id}
                  onClick={() => onSelect(req)}
                  className="cursor-pointer border-b hover:bg-neutral-50"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium">{req.english_name}</div>
                    <div className="text-xs text-neutral-500">{req.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    {req.assigned_access_tier || req.access_option || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <StatusChip status={req.status} />
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    {new Date(req.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatusChip({ status }: { status: BookingStatus }) {
  return (
    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium">
      {status}
    </span>
  );
}

/* =====================
   Request Detail – Facts / Actions / Evidence
===================== */

function RequestDetail({
  request,
  onBack,
  onAdvanceStatus,
}: {
  request: BookingRequestWithRelations;
  onBack: () => void;
  onAdvanceStatus: (
    id: string,
    nextStatus: BookingStatus,
    declinedReason?: string
  ) => Promise<void>;
}) {
  const [stagedEvidence, setStagedEvidence] = useState<EvidenceItem[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load staff members for dropdowns
  useEffect(() => {
    async function loadStaff() {
      try {
        const data = await fetchAllStaff();
        setStaff(data);
      } catch (err) {
        console.error("Error loading staff:", err);
      }
    }
    loadStaff();
  }, []);

  // Map request_actions to EvidenceBlock format
  const evidenceBlocks: EvidenceBlock[] =
    request.actions?.map((action) => ({
      action: action.action_type,
      items:
        request.evidence
          ?.filter((e) => e.action_id === action.id)
          .map((e) => ({
            label: e.label,
            stagedAt: new Date(e.created_at),
          })) || [],
      committedAt: new Date(action.created_at),
      action_id: action.id,
    })) || [];

  const commitAction = async (
    actionLabel: string,
    actionType: RequestAction["action_type"],
    nextState: BookingStatus,
    formData?: Record<string, any>
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Get current user (for now, use null - will be auth later)
      const performedBy = null; // TODO: Get from auth

      // Create action record
      const action = await createRequestAction(
        request.id,
        actionType,
        performedBy,
        formData?.notes || actionLabel
      );

      // Upload evidence files if any
      if (stagedEvidence.length > 0) {
        for (const evidence of stagedEvidence) {
          // TODO: Upload file to Supabase Storage
          // For now, just create evidence record
          if (evidence.file) {
            // Placeholder: In real implementation, upload file first
            const fileUrl = null; // await uploadFile(evidence.file);
            await createRequestEvidence(
              request.id,
              "DOCUMENT",
              evidence.label,
              fileUrl || undefined,
              action.id
            );
          }
        }
      }

      // Handle workflow-specific actions
      if (actionType === "TOUR_SCHEDULED" && formData) {
        // Create/update tour schedule
        const scheduledAt = new Date(
          `${formData.tourDate}T${formData.tourTime}`
        ).toISOString();
        await createOrUpdateTourSchedule(
          request.id,
          formData.guideId || null,
          scheduledAt
        );

        // Assign account manager if provided
        if (formData.accountManagerId) {
          await assignAccountManager(request.id, formData.accountManagerId);
        }
      }

      if (actionType === "TOUR_COMPLETED" && formData) {
        // Update tour schedule with completion
        if (request.tour_schedule) {
          await createOrUpdateTourSchedule(
            request.id,
            request.tour_schedule.guide_id || null,
            request.tour_schedule.scheduled_at,
            formData.completionNotes
          );
        }
      }

      if (actionType === "CONTRACT_SENT" && formData) {
        // Create/update contract
        await createOrUpdateContract(request.id, formData.contractUrl);
      }

      if (actionType === "CONTRACT_SIGNED" && formData) {
        // Update contract with signature
        const signedAt = new Date(
          `${formData.signedDate}T${formData.signedTime}`
        ).toISOString();
        await createOrUpdateContract(
          request.id,
          undefined,
          undefined,
          signedAt,
          formData.signerName
        );
      }

      if (actionType === "PAYMENT_CONFIRMED" && formData) {
        // Create/update payment
        const amountCents = formData.amount
          ? Math.round(parseFloat(formData.amount) * 100)
          : undefined;
        const confirmedAt = new Date(
          `${formData.paymentDate}T${formData.paymentTime}`
        ).toISOString();
        await createOrUpdatePayment(
          request.id,
          "CONFIRMED",
          amountCents,
          formData.reference,
          confirmedAt
        );
      }

      // Update status
      await onAdvanceStatus(
        request.id,
        nextState,
        formData?.declinedReason
      );

      // Clear staged evidence
      setStagedEvidence([]);
    } catch (err: any) {
      setError(err.message || "Failed to commit action");
      console.error("Error committing action:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-10">
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <button onClick={onBack} className="mb-6 text-sm text-neutral-500">
        ← Back to Requests
      </button>

      <header className="mb-8">
        <h2 className="text-2xl font-semibold">{request.english_name}</h2>
        <p className="text-sm text-neutral-500">{request.email}</p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* FACTS */}
        <div className="space-y-6">
          <Section title="Facts">
            <Field
              label="Requested Tier"
              value={request.assigned_access_tier || request.access_option || "N/A"}
            />
            <Field label="Request Type" value={request.request_type || "N/A"} />
            <Field
              label="Desired Schedule"
              value={request.preferred_times || "N/A"}
            />
            <Field
              label="Estimated Frequency"
              value={request.estimated_frequency || "N/A"}
            />
            <Field label="Current Status" value={request.status} />
            <Field
              label="Submitted At"
              value={new Date(request.created_at).toLocaleString()}
            />
            <Field
              label="Assigned Guide"
              value={request.guide?.full_name || request.tour_schedule?.guide_id || "Unassigned"}
            />
            <Field
              label="Account Manager"
              value={request.account_manager?.full_name || "Unassigned"}
            />
          </Section>

          <Section title="Contact">
            <Field label="Email" value={request.email} />
            <Field label="Phone" value={request.phone} />
            <Field
              label="Name (Chinese)"
              value={`${request.chinese_last_name} ${request.chinese_first_name}`}
            />
          </Section>

          <Section title="Class Details">
            <Field label="Class Description" value={request.class_description} />
            {request.equipment && request.equipment.length > 0 && (
              <Field
                label="Equipment"
                value={(request.equipment as string[]).join(", ")}
              />
            )}
            {request.additional_notes && (
              <Field label="Additional Notes" value={request.additional_notes} />
            )}
          </Section>
        </div>

        {/* ACTIONS */}
        <div className="space-y-6">
          <Section title="Actions">
            {/* Tour Scheduling */}
            <TourSchedulingAction
              request={request}
              staff={staff}
              onSubmit={async (formData) => {
                await commitAction(
                  "Tour Scheduled",
                  "TOUR_SCHEDULED",
                  "TOUR_SCHEDULED",
                  formData
                );
              }}
              loading={loading}
            />

            {/* Tour Completion */}
            <TourCompletionAction
              request={request}
              onSubmit={async (formData) => {
                await commitAction(
                  "Tour Completed",
                  "TOUR_COMPLETED",
                  "TOUR_COMPLETED",
                  formData
                );
              }}
              loading={loading}
            />

            {/* Formal Application Review */}
            <ApplicationReviewAction
              request={request}
              onStaged={(e) => setStagedEvidence((prev) => [...prev, e])}
              onSubmit={async (formData) => {
                await commitAction(
                  "Formal Application Completed",
                  "FORMAL_APPLICATION_COMPLETED",
                  "FORMAL_APPLICATION_COMPLETED",
                  formData
                );
              }}
              loading={loading}
            />

            {/* Contract */}
            <ContractAction
              request={request}
              onSubmit={async (formData) => {
                if (request.status === "FORMAL_APPLICATION_COMPLETED") {
                  await commitAction(
                    "Contract Sent",
                    "CONTRACT_SENT",
                    "CONTRACT_SENT",
                    formData
                  );
                } else if (request.status === "CONTRACT_SENT") {
                  await commitAction(
                    "Contract Signed",
                    "CONTRACT_SIGNED",
                    "AWAITING_PAYMENT",
                    formData
                  );
                }
              }}
              loading={loading}
            />

            {/* Decline */}
            <DeclineAction
              request={request}
              onSubmit={async (formData) => {
                await commitAction(
                  "Request Declined",
                  "DECLINED",
                  "DECLINED",
                  formData
                );
              }}
              loading={loading}
            />

            {/* Payment Confirmation */}
            <PaymentAction
              request={request}
              onSubmit={async (formData) => {
                await commitAction(
                  "Payment Confirmed",
                  "PAYMENT_CONFIRMED",
                  "ACTIVE",
                  formData
                );
              }}
              loading={loading}
            />
          </Section>
        </div>

        {/* EVIDENCE */}
        <div className="space-y-6">
          <Section title="Evidence">
            {evidenceBlocks.length === 0 && (
              <p className="text-sm text-neutral-500">
                No completed actions yet. Evidence appears only after an action
                is finalized.
              </p>
            )}

            {evidenceBlocks.map((block, idx) => (
              <div key={idx} className="rounded border px-3 py-2 text-sm">
                <div className="font-medium">{block.action}</div>
                <div className="mt-1 text-xs text-neutral-500">
                  {block.committedAt.toLocaleString()}
                </div>
                {block.items.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-xs">
                    {block.items.map((item, i) => (
                      <li key={i}>{item.label}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Section>
        </div>
      </div>
    </section>
  );
}

// Action Components
function TourSchedulingAction({
  request,
  staff,
  onSubmit,
  loading,
}: {
  request: BookingRequestWithRelations;
  staff: StaffMember[];
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}) {
  const [guideId, setGuideId] = useState("");
  const [accountManagerId, setAccountManagerId] = useState("");
  const [tourDate, setTourDate] = useState("");
  const [tourTime, setTourTime] = useState("");
  const [notes, setNotes] = useState("");

  const guides = staff.filter((s) => s.role === "TOUR_GUIDE");
  const accountManagers = staff.filter(
    (s) => s.role === "ACCOUNT_MANAGER" || s.role === "ADMIN" || s.role === "CEO"
  );

  return (
    <ActionBlock
      title="Schedule Tour"
      nextState="TOUR_SCHEDULED"
      description="Assign guide and confirm tour date/time with applicant."
      disabled={request.status !== "SUBMITTED" || loading}
    >
      <Select
        label="Assigned Guide"
        value={guideId}
        onChange={setGuideId}
        options={guides.map((g) => ({ value: g.id, label: g.full_name }))}
        placeholder="Select guide"
      />
      <Select
        label="Account Manager"
        value={accountManagerId}
        onChange={setAccountManagerId}
        options={accountManagers.map((a) => ({
          value: a.id,
          label: a.full_name,
        }))}
        placeholder="Select account manager"
      />
      <Input
        label="Tour Date"
        type="date"
        value={tourDate}
        onChange={(e) => setTourDate(e.target.value)}
      />
      <Input
        label="Tour Time"
        type="time"
        value={tourTime}
        onChange={(e) => setTourTime(e.target.value)}
      />
      <Textarea
        label="Scheduling Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Button
        label="Confirm Tour Scheduled"
        onClick={async () => {
          await onSubmit({
            guideId,
            accountManagerId,
            tourDate,
            tourTime,
            notes,
          });
        }}
        disabled={!tourDate || !tourTime || loading}
      />
    </ActionBlock>
  );
}

function TourCompletionAction({
  request,
  onSubmit,
  loading,
}: {
  request: BookingRequestWithRelations;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}) {
  const [completionNotes, setCompletionNotes] = useState("");

  return (
    <ActionBlock
      title="Complete Tour"
      nextState="TOUR_COMPLETED"
      description="Guide confirms tour completion and submits notes."
      disabled={request.status !== "TOUR_SCHEDULED" || loading}
    >
      <Textarea
        label="Tour Notes (Guide)"
        value={completionNotes}
        onChange={(e) => setCompletionNotes(e.target.value)}
      />
      <Button
        label="Confirm Tour Completed"
        onClick={async () => {
          await onSubmit({ completionNotes });
        }}
        disabled={loading}
      />
    </ActionBlock>
  );
}

function ApplicationReviewAction({
  request,
  onStaged,
  onSubmit,
  loading,
}: {
  request: BookingRequestWithRelations;
  onStaged: (item: EvidenceItem) => void;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}) {
  const [notes, setNotes] = useState("");

  return (
    <ActionBlock
      title="Review Formal Application"
      nextState="FORMAL_APPLICATION_COMPLETED"
      description="Verify documents, credentials, and booking details before contract."
      disabled={request.status !== "TOUR_COMPLETED" || loading}
    >
      <DocumentItem
        label="Institution Proof"
        status="pending"
        onStaged={onStaged}
      />
      <DocumentItem
        label="Teaching License / Credentials"
        status="pending"
        onStaged={onStaged}
      />
      <DocumentItem label="Background Check" status="not_required" />
      <Field
        label="Proposed Schedule"
        value={request.preferred_times || "N/A"}
      />
      <Textarea
        label="Internal Review Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Button
        label="Mark Application Complete"
        onClick={async () => {
          await onSubmit({ notes });
        }}
        disabled={loading}
      />
    </ActionBlock>
  );
}

function ContractAction({
  request,
  onSubmit,
  loading,
}: {
  request: BookingRequestWithRelations;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}) {
  const [contractUrl, setContractUrl] = useState("");
  const [contractNotes, setContractNotes] = useState("");
  const [signerName, setSignerName] = useState("");
  const [signedDate, setSignedDate] = useState("");
  const [signedTime, setSignedTime] = useState("");

  return (
    <ActionBlock
      title="Contract"
      nextState={
        request.status === "FORMAL_APPLICATION_COMPLETED"
          ? "CONTRACT_SENT"
          : request.status === "CONTRACT_SENT"
          ? "AWAITING_PAYMENT"
          : undefined
      }
      description="Generate, send, and track contract signing before payment."
      disabled={
        (request.status !== "FORMAL_APPLICATION_COMPLETED" &&
          request.status !== "CONTRACT_SENT") ||
        loading
      }
    >
      <Field
        label="Contract Type"
        value={`${request.assigned_access_tier || request.access_option || "N/A"} – ${request.request_type || "N/A"}`}
      />
      <Field
        label="Derived Schedule"
        value={request.preferred_times || "N/A"}
      />

      {request.status === "FORMAL_APPLICATION_COMPLETED" && (
        <>
          <Input
            label="Contract URL"
            type="url"
            value={contractUrl}
            onChange={(e) => setContractUrl(e.target.value)}
            placeholder="https://..."
          />
          <Textarea
            label="Contract Notes"
            value={contractNotes}
            onChange={(e) => setContractNotes(e.target.value)}
          />
          <Button
            label="Generate & Send Contract"
            onClick={async () => {
              await onSubmit({ contractUrl, notes: contractNotes });
            }}
            disabled={loading}
          />
        </>
      )}

      {request.status === "CONTRACT_SENT" && (
        <div className="space-y-3 rounded border border-dashed p-3">
          <div className="text-xs font-medium text-neutral-600">
            Contract Signed
          </div>
          <Input
            label="Signer Name"
            value={signerName}
            onChange={(e) => setSignerName(e.target.value)}
            placeholder="Legal representative name"
          />
          <Input
            label="Signed Date"
            type="date"
            value={signedDate}
            onChange={(e) => setSignedDate(e.target.value)}
          />
          <Input
            label="Signed Time"
            type="time"
            value={signedTime}
            onChange={(e) => setSignedTime(e.target.value)}
          />
          <Button
            label="Confirm Contract Signed"
            onClick={async () => {
              await onSubmit({ signerName, signedDate, signedTime });
            }}
            disabled={!signerName || !signedDate || !signedTime || loading}
          />
        </div>
      )}
    </ActionBlock>
  );
}

function DeclineAction({
  request,
  onSubmit,
  loading,
}: {
  request: BookingRequestWithRelations;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}) {
  const [declinedReason, setDeclinedReason] = useState("");

  return (
    <ActionBlock
      title="Decline Request"
      description="Decline this request at any stage with a mandatory reason. This action is irreversible."
      nextState="DECLINED"
      disabled={request.status === "DECLINED" || loading}
    >
      <Textarea
        label="Reason for Decline (required)"
        value={declinedReason}
        onChange={(e) => setDeclinedReason(e.target.value)}
      />
      <Button
        variant="secondary"
        label="Decline Request"
        onClick={async () => {
          await onSubmit({ declinedReason });
        }}
        disabled={!declinedReason || loading}
      />
    </ActionBlock>
  );
}

function PaymentAction({
  request,
  onSubmit,
  loading,
}: {
  request: BookingRequestWithRelations;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
}) {
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [paymentTime, setPaymentTime] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <ActionBlock
      title="Confirm Payment"
      nextState="ACTIVE"
      description="Record payment reference and confirm receipt before activation."
      disabled={request.status !== "AWAITING_PAYMENT" || loading}
    >
      <Input
        label="Payment Reference Number"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        placeholder="e.g. TXN123456"
      />
      <Input
        label="Amount"
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="0.00"
      />
      <Input
        label="Payment Date"
        type="date"
        value={paymentDate}
        onChange={(e) => setPaymentDate(e.target.value)}
      />
      <Input
        label="Payment Time"
        type="time"
        value={paymentTime}
        onChange={(e) => setPaymentTime(e.target.value)}
      />
      <Textarea
        label="Payment Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Button
        label="Confirm Payment Received"
        onClick={async () => {
          await onSubmit({ reference, amount, paymentDate, paymentTime, notes });
        }}
        disabled={!reference || !paymentDate || !paymentTime || loading}
      />
    </ActionBlock>
  );
}

/* =====================
   UI Primitives
===================== */

function DocumentItem({
  label,
  status,
  onStaged,
}: {
  label: string;
  status: "pending" | "uploaded" | "verified" | "not_required";
  onStaged?: (item: EvidenceItem) => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  const statusLabel = {
    pending: "Pending",
    uploaded: "Staged",
    verified: "Verified",
    not_required: "Not required",
  }[status];

  return (
    <div className="rounded border px-3 py-2 text-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium">{label}</span>
        <span className="text-xs text-neutral-500">{statusLabel}</span>
      </div>

      {status !== "not_required" && (
        <div className="mt-2 space-y-1 text-xs text-neutral-500">
          {file ? (
            <div className="flex items-center justify-between">
              <span>{file.name}</span>
              <button className="underline">View</button>
            </div>
          ) : (
            <label className="cursor-pointer text-neutral-700 underline">
              Upload document
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f && onStaged) {
                    setFile(f);
                    onStaged({ label, file: f, stagedAt: new Date() });
                  }
                }}
              />
            </label>
          )}

          {file && (
            <div className="text-neutral-400">
              Staged, pending action completion
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ActionBlock({
  title,
  description,
  disabled,
  nextState,
  children,
}: {
  title: string;
  description: string;
  disabled: boolean;
  nextState?: BookingStatus;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        disabled ? "opacity-40" : "bg-neutral-50"
      }`}
    >
      <h4 className="mb-1 text-sm font-semibold">{title}</h4>
      <p className="mb-1 text-xs text-neutral-500">{description}</p>
      {nextState && (
        <p className="mb-3 text-xs text-neutral-400">
          Completing this action will move request to:{" "}
          <span className="font-medium">{nextState}</span>
        </p>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled,
  step,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  step?: string;
}) {
  return (
    <div>
      <div className="mb-1 text-xs text-neutral-500">{label}</div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        step={step}
        className="w-full rounded border px-3 py-2 text-sm disabled:bg-neutral-100"
      />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <div className="mb-1 text-xs text-neutral-500">{label}</div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded border px-3 py-2 text-sm disabled:bg-neutral-100"
      >
        <option value="">{placeholder || "Select..."}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Textarea({
  label,
  value,
  onChange,
  disabled,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  rows?: number;
}) {
  return (
    <div>
      <div className="mb-1 text-xs text-neutral-500">{label}</div>
      <textarea
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
        className="w-full rounded border px-3 py-2 text-sm disabled:bg-neutral-100"
      />
    </div>
  );
}

function Button({
  label,
  onClick,
  variant = "primary",
  disabled,
}: {
  label: string;
  onClick: () => void | Promise<void>;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded px-3 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
        variant === "primary"
          ? "bg-neutral-900 text-white hover:bg-neutral-800"
          : "border bg-white hover:bg-neutral-50"
      }`}
    >
      {label}
    </button>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-white p-5">
      <h3 className="mb-4 text-sm font-semibold text-neutral-700">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-neutral-500">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
