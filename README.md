# Next.js Session Security Assignment

A complete teaching demo for signed sessions, protected routes, safe post-login redirects,
account-scoped orders, and server-side staff authorization.

## Requirements

- Node.js 20.9+ recommended
- npm

## Run it

1. Extract the ZIP and open this folder in VS Code.
2. In a terminal, run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Replace `SESSION_SECRET` with a long random secret. One way to create it:
   `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`
5. Run `npm run dev`.
6. Open http://localhost:3000.

## Demo accounts

| Account | Password | Role |
|---|---|---|
| alice@example.com | password123 | customer |
| bob@example.com | password123 | customer |
| staff@example.com | password123 | staff |

These accounts and passwords are for local coursework only. Replace the demo data and
authentication flow with a real user database before production use.

## Test checklist

1. Open `/checkout` while signed out. Middleware redirects to `/signin?next=%2Fcheckout`.
2. Sign in as Alice. You should return to `/checkout`.
3. Open `/orders`. Alice should only see Alice's orders.
4. Sign out, then sign in as Bob and open `/orders`. Bob should only see Bob's orders.
5. Try a crafted redirect:
   `http://localhost:3000/signin?next=https%3A%2F%2Fevil.example`
   After sign-in, the app must go to `/`, not `evil.example`.
6. Sign in as Alice and visit `/kitchen`. The server-rendered page must deny access.
7. Sign in as `staff@example.com` and visit `/kitchen`. The server-rendered page allows staff.
8. While signed in as Alice, request `/api/orders?userId=bob` or `/api/orders?userId=2`.
   The API ignores the requested user ID and returns only the current session owner's orders.
9. In browser DevTools > Application/Storage > Cookies, inspect `session`. It should be
   HttpOnly, SameSite=Lax, and Secure in production. Secure is disabled only in development
   so localhost works over HTTP.

## Assignment implementation notes

- `lib/session.js`: signs and verifies a JWT session cookie with `jose`.
- `lib/auth.js`: gets the current session and enforces role checks.
- `app/api/signin/route.js`: validates demo credentials and sets secure cookie flags.
- `middleware.js`: matcher covers only `/checkout/:path*` and `/orders/:path*`.
- `app/signin/SignInForm.js`: carries `next` through sign-in.
- `lib/data.js`: filters orders by the verified session user ID.
- `app/kitchen/page.js`: checks staff role on the server, not merely in JSX.

## Security limitations

This is a learning sample, not production authentication. It uses hard-coded demo users,
plain demo passwords, and in-memory order data. A production app should use a database,
password hashing (Argon2id/bcrypt), rate limiting, CSRF-aware design where applicable,
session revocation/rotation, logging, and carefully managed secrets.
