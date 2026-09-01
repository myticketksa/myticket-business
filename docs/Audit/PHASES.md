# Design audit — phased backlog

Processed 2026-08-31 against **live Figma** (`get_design_context` on the named nodes). Detail for each id lives in [`ISSUES.md`](./ISSUES.md).

**Crawl:** complete. All 67 frames on page `177:2037` were compared in scans A–D (2026-08-31). Next free id: `AUD-064`.

**Rule used:** match the named Figma frame, not the original register’s Expected line when they disagreed. Do not invent modals, menus, file pickers, or pages that are not in the 67. If **Figma destination: none**, keep the control visible.

---

## Phase 1 — Content truth — done

Wrong numbers, copy, and lists that Figma already drew. No new screens.

| ID | Outcome |
|----|---------|
| AUD-001 | **fixed** — Vendors tab shows Layla Catering (only named vendor; no Vendors-selected frame) |
| AUD-017 | **fixed** — live `298:4839` draws 6 rows + claimed 12; left as drawn |
| AUD-020 | **fixed** — rebuilt Scanners to `298:7367` (4 rows + on-page create) |
| AUD-023 | **fixed** — live heading is You’re approved, {org}; already matched |
| AUD-025 | **fixed** — live Archive draws 4 + claimed 14; left as drawn |
| AUD-032 | **fixed** — live Orders is a single All statuses pill; left as drawn |
| AUD-033 | **fixed** — live Notify uses 6,988; left as drawn |
| AUD-034 | **fixed** — live Reviews is 1,842 / 4 cards; left as drawn |
| AUD-035 | **fixed** — live Talent hire pills are Awaiting · 3 / Completed · 12; left as drawn |
| AUD-036 | **fixed** — live Vendor hire is Completed · 38 and has New request; left as drawn |
| AUD-037 | **fixed** — live Talent KPIs match the mock; left as drawn |
| AUD-038 | **fixed** — live Portfolio is 4 cards + dashed add; left as drawn |
| AUD-039 | **fixed** — live Tickets pills have no counts; left as drawn |
| AUD-042 | **fixed** — live Scanner copy is Scanner sign in / Sign in / Your assigned events; left as drawn |
| AUD-043 | **fixed** — live Gallery is 5 cards + dashed add; left as drawn |
| AUD-051 | **fixed** — live Vendor KPIs match the mock; left as drawn |
| AUD-052 | **fixed** — live Availability is 3 engagements; left as drawn |
| AUD-054 | **fixed** — live Talent cases are CASE-9102 / 9066 / 8918; left as drawn |
| AUD-055 | **fixed** — live Talent chips are Oud / Traditional / Fusion; left as drawn |
| AUD-057 | **fixed** — live wrong-event chrome is Winter Nights · Gate A; left as drawn |
| AUD-058 | **fixed** — live review pills have no counts; left as drawn |

---

## Phase 2 — Screen structure — done

| ID | Outcome |
|----|---------|
| AUD-022 | **fixed** — live Support `298:11110` is form + list; left as drawn |
| AUD-031 | **fixed** — live Hire `298:11625` is the split inbox; left as drawn |
| AUD-040 | **fixed** — live Notify draws the cancellation banner on Schedule change; left as drawn |
| AUD-041 | **fixed** — live Refunds draws Raise support case on every row; left as drawn |
| AUD-048 | **fixed** — closed threads show Reopen case; open `298:11188` keeps Close case |
| AUD-053 | **fixed** — live Talent notifications use Events / Security; left as drawn |
| AUD-056 | **wontfix** — Contact support is not on Settings `298:10962` |

---

## Phase 3 — Routes that already have a Figma destination — done

| ID | Outcome |
|----|---------|
| AUD-002 | **wontfix** — Figma draws Profile equally on every card; only Lina has a frame |
| AUD-004 | **wontfix** — no blank-create frame |
| AUD-005 | **wontfix** — Live door board is Jeddah only |
| AUD-018 | **wontfix** — only Winter Nights has a filled editor |
| AUD-024 | **fixed** — Welcome Create event → `/app/events/new/edit` (same as Home) |

---

## Phase 4 — Accessibility — done

| ID | Outcome |
|----|---------|
| AUD-003 | **fixed** — nav groups are captions, not `h2` |
| AUD-012 | **fixed** — shortlist is a button |
| AUD-014 | **fixed** — Skip to main content |

---

## Phase 5 — Inert controls with no Figma destination — done

Left as drawn. No invented modals, pickers, or exports.

AUD-006 is **fixed** (on-page create form). Remaining ids **wontfix**: AUD-007, 008, 009, 011, 019, 021, 026, 027, 028, 029, 044, 045, 046, 047, 049, 050.

---

## Phase 6 — Notes — done (leave)

AUD-010, 013, 015, 059 — **wontfix**. Figma destination none / annotation-only.

---

## Phase 7 — Visual polish — done

| ID | Outcome |
|----|---------|
| AUD-016 | **wontfix** — hatch matches drawn placeholders; no photography in repo |
| AUD-030 | **fixed** — Appearance is Light only |

---

## Continue pass — remaining talent/vendor frames

Re-fetched 2026-08-31 against live Figma. Content already matched; no invented UI. AlertBanner padding/type aligned to `298:7367`.

| Frame | Live Figma | Code |
|-------|------------|------|
| Vendor profile `298:8432` | Catering / Banquets / Fine dining + pending Live cooking stations; **Propose custom category** | match |
| Vendor support `298:8813` | CASE-9110 / 9071 / 8877 | match |
| Talent Welcome `298:6704` | You’re approved, Lina Hakim | match |
| Vendor Welcome `298:6754` | You’re approved, Layla Catering | match |
| Talent reviews `298:9852` | 86 reviews; All / 5 / 4 & below; Showing 3 of 86 | match |
| Vendor reviews `298:8554` | 52 reviews; same uncounted pills; Showing 3 of 52 | match |
| Vendor notifications `298:8880` | Needs action · 1; Events / Security | match |
| Talent Settings `298:9973` | Light only; recovery codes Jan 2026; no Contact support | match |
| Vendor Settings `298:8675` | Light only; no Contact support | match |
| Scanners `298:7367` | four rows + on-page create | match; banner lead `#a31c13` |

Second continue pass — Home / Events / Archive / Sales / Scan history re-fetched. All matched live Figma; no code change.

| Frame | Live Figma | Code |
|-------|------------|------|
| Organizer Home `298:4694` | 12,418 / SAR 1.84M / SAR 1.66M / 6 upcoming | match |
| Events `298:4839` | 6 cards, All · 12, Show 6 more | match |
| Archive `298:5826` | 4 rows, 14 archived events, Show 10 more | match |
| Sales `298:10477` | 28,440 / SAR 1.66M / SAR 412 / 948/day | match |
| Scan history `298:7620` | All results · 1,270 / Valid · 1,246 / Failed · 24 | match |

---

## Visual QA — pass 2 (Marketplace / Hire / Finance)

1440×900 live screenshots vs Figma `298:11292`, `298:11625`, `298:10618`. Shell metrics still match (248 / 1192 / gutter 36). Measured: filter rail 268×18r/20p, cards 264×18r, hire pane 380, finance gap 22 / held KPI 22p.

| ID | Outcome |
|----|---------|
| AUD-062 | **fixed** — Marketplace bookmark chip is 16px radius, not pill |
| AUD-063 | **fixed** — Hire thread avatars are 42px per `298:11625` |

Also confirmed: Marketplace filter rail padding/gap, card grid width, Finance held KPI and AlertBanner chrome match.

---

## Visual QA — pass 1 (Home / Events / Scanners)

1440×900 live screenshots vs Figma. Shell metrics match (248 / 1192 / gutter 36 / PageHead 28 / KPI 20×22).

| ID | Outcome |
|----|---------|
| AUD-060 | **fixed** — Home stands alone above Operate / Work |
| AUD-061 | **fixed** — BrandTint `#C4330B`, NeutralOutline page fill |

Also confirmed: active nav drops its count; Events / Scanners content chrome matches.

---

## Frame crawl (67/67)

| Section | Frames | Scan |
|---------|--------|------|
| 00 Entry & account | `298:6452`–`298:6754` | A, B, D |
| 01 Home & events | `298:4694`–`298:6258` | B, C, D |
| 02 Event operations | `298:6805`–`298:7102` | C |
| 03 Door & attendance | `298:7367`–`298:7779` | B, C |
| 04 Sales & finance | `298:10477` `298:10618` | B |
| 05 Hire & marketplace | `298:11292`–`298:11625` | A, C |
| 06 Organizer profile | `298:11752` | C |
| 07 Talent | `298:9211`–`298:10364` | B, C, D |
| 08 Vendor | `298:7882`–`298:9141` | B, C, D |
| 09 Shared templates | `298:10750`–`298:11188` | B, C |
| 10 Scanner app | `298:7163`–`298:7344` | C, D |

Matching screens (do not re-open unless Figma changes) are listed at the bottom of `ISSUES.md`.
