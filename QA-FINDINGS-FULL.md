# Organizer dashboard full QA — 2026-10-08

**Target:** https://business.myticket.sa  
**Fixes deployed:** 2026-10-08 (organizer SPA + API cashier routes + web scanner)

**Wording (confirmed):** English/Arabic **cashier** is correct. Arabic **الحاسبة** for Payout is intentional.

## Deployed fixes

| Area | Fix |
|------|-----|
| Forgot password | Client validation; email-only placeholder; language toggle; copy no longer claims a code was sent (`If an account exists…`) |
| Login hang | Submit guard while loading; 30s API timeout; safer login response parse |
| Event status filter | Localized EN/AR labels (`events.status.*`) |
| Dates | Locale-aware `ar-SA` / `en-GB` formatting on events, cashiers, payout |
| Cashier rename + search | Clears search after successful save so the renamed row stays visible |
| Money | Payout uses the same 2-decimal `formatSar` as dashboard tiles |
| Cashiers Arabic | Repo/deploy now serves **الكاشير** |
| API cashier | `GET /cashier/events`, `POST /cashier/events/scan`, `POST /cashier/events/{eventId}/scan` (+ `wrong_event`) |
| Web scanner | Aligned to prod contract; all statuses; nested + flat holder fields; deployed to server as `scan.myticket.sa` |

## Still pending ops

- **DNS:** `scan.myticket.sa` has no A record yet (NXDOMAIN). Files + nginx are on `72.62.58.90`. Add `A scan.myticket.sa → 72.62.58.90`, then run certbot for HTTPS.
- **Mobile scanner app** (`tazkarty-scanner-app`) already matched prod scan API; no store release in this pass.
- **Legacy** `scanner_web` code updated locally; old host `107.180.100.61` is unreachable — use the new web scanner deploy.

## PASS (original suite + simulation)

Auth, dashboard, events, cashiers, payout (incl. settlement receipt PDF), reports, cashier scan matrix (`ok` / `duplicate` / `invalid` / `unpaid` / `cancelled` / `wrong_date` / `outside_entry_window` / `unauthorized`).

## Reproduce

```bash
QA_LIVE=1 npx playwright test e2e/live-organizer-qa.spec.ts --config=playwright.live.config.ts
python3 scripts/full-settlement-scan-sim.py
```
