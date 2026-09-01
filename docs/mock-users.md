# Mock users

Typed mock accounts for local development. Any non-empty password is accepted (Yup only requires the field). These emails are not listed on the sign-in screen.

Dev server: `http://127.0.0.1:5173/`

## Business portal — `/auth`

| Email | Role | Lands on |
|---|---|---|
| `team@riyadhevents.sa` | Organizer · Riyadh Events Co. · ORG-2481 | `/welcome` |
| `lina.hakim@myticket.sa` | Talent · Lina Hakim · TAL-0917 | `/welcome` |
| `hello@laylacatering.sa` | Vendor · Layla Catering · VEN-1204 | `/welcome` |
| `review@riyadhevents.sa` | Application pending (no workspace user) | `/application/review` |
| `declined@riyadhevents.sa` | Application declined (no workspace user) | `/application/declined` |

After welcome, **Open my workspace** goes to `/app`. Visiting `/app` without signing in auto-loads the organizer via `MockSession`.

## Scanner app — `/scanner`

| Email | Password (prefilled) | Lands on |
|---|---|---|
| `yousef.gates@riyadhevents.sa` | `password` | `/scanner/events` |

Scan outcomes are switched with the DEV chips on `/scanner/scan`.

## Dev role switcher

On `/app` (workspace shell), the **Dev role** bar switches the signed-in mock user among organizer, talent, and vendor without going through `/auth`.
