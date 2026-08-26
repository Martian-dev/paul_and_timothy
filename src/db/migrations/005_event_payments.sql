-- Payment-safe event registration state and Razorpay audit records.
ALTER TABLE events
  ADD COLUMN IF NOT EXISTS amount_minor BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS currency TEXT NOT NULL DEFAULT 'INR',
  ADD COLUMN IF NOT EXISTS payment_required BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS registration_deadline TIMESTAMPTZ;

ALTER TABLE event_registrations
  DROP CONSTRAINT IF EXISTS event_registrations_registration_status_check;

ALTER TABLE event_registrations
  ADD CONSTRAINT event_registrations_registration_status_check
  CHECK (registration_status IN ('draft', 'payment_pending', 'registered', 'cancelled', 'refunded'));

ALTER TABLE event_registrations
  DROP CONSTRAINT IF EXISTS event_registrations_payment_status_check;

ALTER TABLE event_registrations
  ADD CONSTRAINT event_registrations_payment_status_check
  CHECK (
    payment_status IN (
      'not_required',
      'pending',
      'authorized',
      'paid',
      'failed',
      'refund_pending',
      'refunded',
      'disputed'
    )
  );

ALTER TABLE event_registrations
  ADD COLUMN IF NOT EXISTS questionnaire_version INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS questionnaire_submitted_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS refunded_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS receipt_number TEXT;

-- Registrations created by the old form were not paid. Do not let them appear
-- as confirmed after pricing is enabled; they must complete the new payment
-- flow. Free events remain confirmed below when payment_required is false.
UPDATE event_registrations AS registrations
SET registration_status = 'payment_pending',
    payment_status = 'pending',
    updated_at = NOW()
FROM events
WHERE events.id = registrations.event_id
  AND events.payment_required = TRUE
  AND registrations.payment_status = 'not_required'
  AND registrations.registration_status = 'registered';

CREATE TABLE IF NOT EXISTS event_payment_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES event_registrations(id) ON DELETE CASCADE,
  client_idempotency_key TEXT NOT NULL,
  receipt TEXT NOT NULL,
  amount_minor BIGINT NOT NULL CHECK (amount_minor > 0),
  currency TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'creating' CHECK (
    status IN (
      'creating',
      'created',
      'authorized',
      'captured',
      'failed',
      'refund_pending',
      'refunded',
      'refund_failed',
      'disputed'
    )
  ),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  payment_method TEXT,
  failure_code TEXT,
  failure_description TEXT,
  razorpay_refund_id TEXT,
  questionnaire_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  raw_payment JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  authorized_at TIMESTAMPTZ,
  captured_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (registration_id, client_idempotency_key),
  UNIQUE (razorpay_order_id),
  UNIQUE (razorpay_payment_id)
);

CREATE INDEX IF NOT EXISTS event_payment_attempts_registration_id_idx
  ON event_payment_attempts(registration_id);
CREATE INDEX IF NOT EXISTS event_payment_attempts_status_idx
  ON event_payment_attempts(status);
CREATE UNIQUE INDEX IF NOT EXISTS event_payment_attempts_receipt_idx
  ON event_payment_attempts(receipt);

CREATE UNIQUE INDEX IF NOT EXISTS event_payment_attempts_one_captured_idx
  ON event_payment_attempts(registration_id)
  WHERE status = 'captured';

CREATE UNIQUE INDEX IF NOT EXISTS event_payment_attempts_one_open_idx
  ON event_payment_attempts(registration_id)
  WHERE status IN ('creating', 'created', 'authorized');

CREATE TABLE IF NOT EXISTS razorpay_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  razorpay_event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  signature_verified BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'received' CHECK (
    status IN ('received', 'processed', 'ignored', 'failed')
  ),
  processing_error TEXT,
  received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS razorpay_webhook_events_status_idx
  ON razorpay_webhook_events(status);

-- The existing seed is intentionally price-zero until the merchant supplies
-- the real event fee. The server refuses to create a paid order for zero.
UPDATE events
SET currency = 'INR',
    payment_required = TRUE,
    amount_minor = COALESCE(amount_minor, 0),
    updated_at = NOW()
WHERE slug = 'alethia';
