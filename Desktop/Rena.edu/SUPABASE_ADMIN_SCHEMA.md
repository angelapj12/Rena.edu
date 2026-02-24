# Supabase Admin Portal Schema

**Phase 1 Implementation** - Actual schema deployed for Rena.edu admin portal.

## Table of Contents

1. [Phase 1 Status](#phase-1-status)
2. [ENUMs](#enums)
3. [Core Tables](#core-tables)
4. [Indexes](#indexes)
5. [Status Transition Guard](#status-transition-guard)
6. [Deferred to Phase 2+](#deferred-to-phase-2)
7. [Usage Examples](#usage-examples)

---

## Phase 1 Status

✅ **Implemented:**
- `booking_requests` (existing table, enhanced)
- `staff_members` (auth-linked)
- `request_actions` (immutable audit log)
- `request_evidence` (documents + facts)
- `tour_schedules` (single row per request)
- `contracts` (simple structure)
- `payments` (PENDING → CONFIRMED only)
- Status transition guard trigger

❌ **Deferred to Phase 2+**
- Hardened RLS policies
- Status-transition guards (DB or app)
- Application documents table (decision pending)
- Real schedules
- Automation
- Analytics
- Instructor dashboards
- Rescheduling history
- Refunds

---

## ENUMs

All status and type fields use PostgreSQL ENUMs for type safety and consistency.

### Booking Status Enum

```sql
CREATE TYPE booking_status_enum AS ENUM (
  'SUBMITTED',
  'TOUR_SCHEDULED',
  'TOUR_COMPLETED',
  'FORMAL_APPLICATION_PENDING',
  'FORMAL_APPLICATION_COMPLETED',
  'CONTRACT_SENT',
  'AWAITING_PAYMENT',
  'ACTIVE',
  'DECLINED'
);
```

### Staff Role Enum

```sql
CREATE TYPE staff_role_enum AS ENUM (
  'ADMIN',
  'CEO',
  'ACCOUNT_MANAGER',
  'TOUR_GUIDE'
);
```

### Request Action Enum

```sql
CREATE TYPE request_action_enum AS ENUM (
  'TOUR_ASSIGNED',
  'TOUR_SCHEDULED',
  'TOUR_COMPLETED',
  'FORMAL_APPLICATION_SENT',
  'FORMAL_APPLICATION_COMPLETED',
  'CONTRACT_SENT',
  'CONTRACT_SIGNED',
  'PAYMENT_CONFIRMED',
  'DECLINED'
);
```

### Evidence Type Enum

```sql
CREATE TYPE evidence_type_enum AS ENUM (
  'NOTE',
  'DOCUMENT',
  'PAYMENT_PROOF',
  'SIGNED_CONTRACT'
);
```

### Payment Status Enum

```sql
CREATE TYPE payment_status_enum AS ENUM (
  'PENDING',
  'CONFIRMED'
);
```

**Note:** Additional ENUMs may exist for `access_option`, `request_type`, `estimated_frequency`, etc. These are part of the existing `booking_requests` table structure.

---

## Core Tables

### 1. `staff_members` (Auth-Linked)

Staff members linked directly to Supabase Auth users.

```sql
CREATE TABLE staff_members (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role staff_role_enum NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_staff_members_role ON staff_members(role);
```

**Key Design:**
- `id` references `auth.users(id)` directly
- On user deletion, staff member record is automatically deleted
- Role determines permissions and capabilities

### 2. `booking_requests` (Source of Truth)

Main booking requests table (already existed, enhanced for admin portal).

**Existing Columns:**
```sql
id                          UUID PRIMARY KEY DEFAULT gen_random_uuid()
chinese_last_name           TEXT NOT NULL
chinese_first_name          TEXT NOT NULL
english_name                TEXT NOT NULL
email                       TEXT NOT NULL
phone                       TEXT NOT NULL
class_description           TEXT NOT NULL
preferred_times             TEXT
access_option               USER-DEFINED (enum)
request_type                USER-DEFINED (enum)
estimated_frequency         USER-DEFINED (enum)
equipment                   JSONB
status                      USER-DEFINED (enum) DEFAULT 'submitted'
assigned_access_tier        USER-DEFINED (enum)
internal_priority_score     INTEGER
internal_notes              TEXT
reviewed_by                 TEXT
reviewed_at                 TIMESTAMP WITHOUT TIME ZONE
created_at                  TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
updated_at                  TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
additional_notes            TEXT
assigned_account_manager    UUID (references staff_members)
declined_reason             TEXT
```

**Phase 1 Enhancements (Timestamps for workflow stages):**
```sql
tour_scheduled_at                TIMESTAMPTZ
tour_completed_at                TIMESTAMPTZ
formal_application_completed_at  TIMESTAMPTZ
contract_signed_at               TIMESTAMPTZ
payment_confirmed_at             TIMESTAMPTZ
```

**Indexes:**
```sql
CREATE INDEX idx_booking_requests_status ON booking_requests(status);
CREATE INDEX idx_booking_requests_email ON booking_requests(email);
CREATE INDEX idx_booking_requests_created_at ON booking_requests(created_at DESC);
CREATE INDEX idx_booking_requests_assigned_account_manager ON booking_requests(assigned_account_manager);
```

**Note:** The existing table uses `access_request_status_enum` which may need to be mapped/updated to `booking_status_enum` for consistency with the admin portal workflow.

### 3. `request_actions` (Immutable Audit Log)

Complete audit trail of all actions taken on booking requests.

```sql
CREATE TABLE request_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES booking_requests(id) ON DELETE CASCADE,
  action_type request_action_enum NOT NULL,
  performed_by UUID REFERENCES staff_members(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_request_actions_request_id ON request_actions(request_id);
CREATE INDEX idx_request_actions_created_at ON request_actions(created_at DESC);
CREATE INDEX idx_request_actions_action_type ON request_actions(action_type);
CREATE INDEX idx_request_actions_performed_by ON request_actions(performed_by);
```

**Key Design:**
- Immutable: Never updated, only inserted
- Links to `staff_members` for audit tracking
- All workflow actions are logged here
- `notes` field captures context and details

### 4. `request_evidence` (Documents + Facts)

Evidence and documents associated with requests and actions.

```sql
CREATE TABLE request_evidence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES booking_requests(id) ON DELETE CASCADE,
  action_id UUID REFERENCES request_actions(id),
  evidence_type evidence_type_enum NOT NULL,
  label TEXT NOT NULL,
  file_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_request_evidence_request_id ON request_evidence(request_id);
CREATE INDEX idx_request_evidence_action_id ON request_evidence(action_id);
CREATE INDEX idx_request_evidence_type ON request_evidence(evidence_type);
```

**Key Design:**
- Optional link to `action_id` for action-specific evidence
- `file_url` stores Supabase Storage paths or external URLs
- `metadata` JSONB for flexible additional data
- `label` identifies what the evidence represents

### 5. `tour_schedules` (Single Row Per Request)

Tour scheduling information. One row per booking request.

```sql
CREATE TABLE tour_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID NOT NULL REFERENCES booking_requests(id) ON DELETE CASCADE,
  guide_id UUID REFERENCES staff_members(id),
  scheduled_at TIMESTAMPTZ NOT NULL,
  completed_at TIMESTAMPTZ,
  completion_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_tour_schedules_request_id ON tour_schedules(request_id);
CREATE INDEX idx_tour_schedules_guide_id ON tour_schedules(guide_id);
CREATE INDEX idx_tour_schedules_scheduled_at ON tour_schedules(scheduled_at);
```

**Key Design:**
- Single row per request (MVP approach)
- `completed_at` tracks when tour finished
- `completion_notes` for guide feedback
- `guide_id` links to assigned tour guide

**Future:** Phase 3 may expand to support multiple tours or rescheduling history.

### 6. `contracts`

Contract generation, sending, and signing.

```sql
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID UNIQUE NOT NULL REFERENCES booking_requests(id) ON DELETE CASCADE,
  contract_url TEXT,
  sent_at TIMESTAMPTZ,
  signed_at TIMESTAMPTZ,
  signed_by TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_contracts_request_id ON contracts(request_id);
CREATE INDEX idx_contracts_sent_at ON contracts(sent_at);
```

**Key Design:**
- One-to-one with `booking_requests` (UNIQUE constraint)
- `contract_url` stores Supabase Storage path or external URL
- Timestamps track send and sign dates
- `signed_by` stores signer's name (text field)

### 7. `payments` (PENDING → CONFIRMED Only)

Payment tracking. Simplified Phase 1 implementation.

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id UUID UNIQUE NOT NULL REFERENCES booking_requests(id) ON DELETE CASCADE,
  status payment_status_enum NOT NULL DEFAULT 'PENDING',
  amount_cents INTEGER,
  currency TEXT DEFAULT 'USD',
  reference TEXT,
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_payments_request_id ON payments(request_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_reference ON payments(reference);
CREATE INDEX idx_payments_confirmed_at ON payments(confirmed_at);
```

**Key Design:**
- One-to-one with `booking_requests` (UNIQUE constraint)
- `amount_cents` stores amount in cents (e.g., 50000 = $500.00)
- Simple status: PENDING → CONFIRMED
- `reference` for payment reference numbers
- `confirmed_at` tracks confirmation timestamp

**Future:** Phase 3 may add refunds, partial payments, payment methods, etc.

---

## Indexes

Additional composite indexes for common admin portal queries:

```sql
-- Common queries: requests by status and date
CREATE INDEX idx_booking_requests_status_created ON booking_requests(status, created_at DESC);

-- Staff assignment queries
CREATE INDEX idx_booking_requests_account_manager_status ON booking_requests(assigned_account_manager, status) 
  WHERE assigned_account_manager IS NOT NULL;

-- Tour scheduling queries
CREATE INDEX idx_tour_schedules_guide_status ON tour_schedules(guide_id, scheduled_at) 
  WHERE guide_id IS NOT NULL;
```

---

## Status Transition Guard

Database-level enforcement to prevent invalid status transitions.

### Trigger Function

```sql
CREATE OR REPLACE FUNCTION enforce_booking_status_progression()
RETURNS trigger AS $$
BEGIN
  -- Prevent any changes to declined requests
  IF OLD.status = 'DECLINED' THEN
    RAISE EXCEPTION 'Declined requests cannot change status';
  END IF;

  -- Allow no-op updates (status unchanged)
  IF NEW.status = OLD.status THEN
    RETURN NEW;
  END IF;

  -- Allow decline from any stage (requires reason)
  IF NEW.status = 'DECLINED' AND NEW.declined_reason IS NOT NULL THEN
    RETURN NEW;
  END IF;

  -- Prevent backward movement (assuming enum order)
  -- Note: This assumes enum values are ordered correctly
  IF NEW.status < OLD.status THEN
    RAISE EXCEPTION 'Backward status transitions are not allowed';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Trigger

```sql
CREATE TRIGGER booking_status_guard
BEFORE UPDATE ON booking_requests
FOR EACH ROW
EXECUTE FUNCTION enforce_booking_status_progression();
```

**Key Rules:**
- ✅ Decline from any stage (requires `declined_reason`)
- ❌ No backward transitions
- ❌ No changes to declined requests
- ✅ Skip stages allowed (for now, Phase 1)

**Note:** The backward movement check assumes enum ordering. You may want to implement a custom progression matrix if needed.

---

## Deferred to Phase 2

### Phase 2 — Stabilize (Week 2–3)

- ✅ Harden RLS policies
- ✅ Add status-transition guards (enhanced beyond current trigger)
- ✅ Clean up UI friction
- ⚠️ Decide if `application_documents` deserves its own table

### Phase 3 — Expand (Only After Usage)

- ❌ Real schedules (recurring class sessions)
- ❌ Automation (notifications, workflows)
- ❌ Analytics (dashboards, metrics)
- ❌ Instructor dashboards
- ❌ Rescheduling history
- ❌ Refunds and payment reversals

---

## Usage Examples

### Query All Requests with Current Status and Staff

```sql
SELECT 
  br.id,
  br.english_name,
  br.email,
  br.status,
  sm.full_name as account_manager_name,
  sm.role as account_manager_role,
  br.created_at
FROM booking_requests br
LEFT JOIN staff_members sm ON br.assigned_account_manager = sm.id
ORDER BY br.created_at DESC;
```

### Get Request with Full Workflow History

```sql
SELECT 
  br.*,
  json_agg(
    json_build_object(
      'action_type', ra.action_type,
      'action_label', ra.action_type::text,
      'performed_by', sm.full_name,
      'notes', ra.notes,
      'created_at', ra.created_at
    ) ORDER BY ra.created_at
  ) as action_history
FROM booking_requests br
LEFT JOIN request_actions ra ON br.id = ra.request_id
LEFT JOIN staff_members sm ON ra.performed_by = sm.id
WHERE br.id = $1
GROUP BY br.id;
```

### Get Pipeline View (Grouped by Status)

```sql
SELECT 
  status,
  COUNT(*) as count,
  json_agg(
    json_build_object(
      'id', id,
      'name', english_name,
      'email', email,
      'created_at', created_at
    ) ORDER BY created_at DESC
  ) as requests
FROM booking_requests
WHERE status != 'DECLINED'  -- Optional: exclude declined
GROUP BY status
ORDER BY 
  CASE status
    WHEN 'SUBMITTED' THEN 1
    WHEN 'TOUR_SCHEDULED' THEN 2
    WHEN 'TOUR_COMPLETED' THEN 3
    WHEN 'FORMAL_APPLICATION_PENDING' THEN 4
    WHEN 'FORMAL_APPLICATION_COMPLETED' THEN 5
    WHEN 'CONTRACT_SENT' THEN 6
    WHEN 'AWAITING_PAYMENT' THEN 7
    WHEN 'ACTIVE' THEN 8
    WHEN 'DECLINED' THEN 9
  END;
```

### Get Tour Schedule with Guide Info

```sql
SELECT 
  ts.*,
  br.english_name as requestor_name,
  br.email as requestor_email,
  sm.full_name as guide_name,
  sm.role as guide_role
FROM tour_schedules ts
JOIN booking_requests br ON ts.request_id = br.id
LEFT JOIN staff_members sm ON ts.guide_id = sm.id
WHERE ts.scheduled_at >= NOW()
ORDER BY ts.scheduled_at ASC;
```

### Get Request with All Related Data (Complete View)

```sql
SELECT 
  br.*,
  ts.scheduled_at as tour_scheduled_at,
  ts.completed_at as tour_completed_at,
  ts.completion_notes as tour_notes,
  ts.guide_id,
  guide.full_name as guide_name,
  contract.contract_url,
  contract.sent_at as contract_sent_at,
  contract.signed_at as contract_signed_at,
  contract.signed_by,
  payment.status as payment_status,
  payment.amount_cents,
  payment.reference as payment_reference,
  payment.confirmed_at as payment_confirmed_at,
  account_manager.full_name as account_manager_name
FROM booking_requests br
LEFT JOIN tour_schedules ts ON br.id = ts.request_id
LEFT JOIN staff_members guide ON ts.guide_id = guide.id
LEFT JOIN contracts contract ON br.id = contract.request_id
LEFT JOIN payments payment ON br.id = payment.request_id
LEFT JOIN staff_members account_manager ON br.assigned_account_manager = account_manager.id
WHERE br.id = $1;
```

### Get Evidence for a Request

```sql
SELECT 
  re.*,
  ra.action_type as linked_action_type,
  ra.created_at as linked_action_at
FROM request_evidence re
LEFT JOIN request_actions ra ON re.action_id = ra.id
WHERE re.request_id = $1
ORDER BY re.created_at DESC;
```

### Log a New Action

```sql
-- Example: Log tour scheduled
INSERT INTO request_actions (
  request_id,
  action_type,
  performed_by,
  notes
) VALUES (
  $1,  -- request_id
  'TOUR_SCHEDULED',
  $2,  -- staff_member_id (from auth)
  'Tour scheduled for 2026-01-15 at 3:00 PM'
) RETURNING *;
```

### Update Request Status (with Guard)

```sql
-- Example: Advance to tour scheduled
UPDATE booking_requests
SET 
  status = 'TOUR_SCHEDULED',
  tour_scheduled_at = NOW(),
  assigned_account_manager = $1,  -- staff_member_id
  updated_at = NOW()
WHERE id = $2
RETURNING *;
```

---

## Next Steps for Admin Portal Integration

1. **Replace Mock Data** with Supabase queries
2. **Connect Forms** to insert/update tables
3. **Implement File Uploads** to Supabase Storage (for evidence)
4. **Add Authentication** for staff members
5. **Build Action Handlers** that create `request_actions` entries
6. **Test Workflow** manually through all stages

---

## Notes

- **Storage Buckets:** Create Supabase Storage buckets for:
  - `booking-evidence` - Documents and evidence files
  - `contracts` - Contract PDFs
  
- **RLS Policies:** Currently minimal. Phase 2 will harden these.

- **Status Mapping:** The existing `booking_requests.status` uses `access_request_status_enum` which may need to be aligned with `booking_status_enum` used in the admin portal.

- **Timestamps:** Workflow stage timestamps are stored both in `booking_requests` (for quick queries) and in `request_actions` (for audit trail). This provides redundancy and flexibility.
