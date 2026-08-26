npm install
npm run dev

## Database

The app uses Neon Postgres for application data and Clerk for authentication.
Set `DATABASE_URL` in `.env.local`, then apply the schema and Aletheia seed event:

```bash
npm run db:migrate
```

Authenticated users are synchronized into `app_users`. Event registrations are
stored in `event_registrations`, keyed by the Clerk user and event. Payment
attempts and webhook deliveries are retained in `event_payment_attempts` and
`razorpay_webhook_events` so callbacks can be retried and reconciled safely.

## Razorpay configuration

Set these server-side environment variables in `.env.local` and in the
production deployment. Never expose the secret values to browser code:

```bash
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
CRON_SECRET=...
ADMIN_CLERK_USER_IDS=user_...[,user_...]
```

`ADMIN_CLERK_USER_IDS` is a comma-separated allowlist for the server-side
refund operation. Keep it limited to trusted operations accounts; it is not a
browser role or a value supplied by the customer.

The Aletheia migration intentionally seeds `amount_minor = 0` as a safe
placeholder. Before accepting payments, update the event with the real price
in the smallest currency unit and confirm the currency, for example:

```sql
UPDATE events
SET amount_minor = 150000, currency = 'INR', payment_required = TRUE
WHERE slug = 'alethia';
```

Configure Razorpay Dashboard automatic capture and subscribe the live and test
webhook endpoints separately. The webhook endpoint is:

```text
POST /api/razorpay/webhook
```

The reconciliation endpoint is scheduled every five minutes on Vercel via
`vercel.json` (or can be called by another trusted scheduler). It accepts an
authenticated GET or POST request with `Authorization: Bearer $CRON_SECRET`:

```text
POST /api/razorpay/reconcile
```

Run database migrations after pulling the payment changes:

```bash
npm run db:migrate
```

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
