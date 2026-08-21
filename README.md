npm install
npm run dev

## Database

The app uses Neon Postgres for application data and Clerk for authentication.
Set `DATABASE_URL` in `.env.local`, then apply the schema and Aletheia seed event:

```bash
npm run db:migrate
```

Authenticated users are synchronized into `app_users`. Event registrations are
stored in `event_registrations`, keyed by the Clerk user and event. The schema
already includes Razorpay order, payment, signature, and payment-status fields
for the future payment flow.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
