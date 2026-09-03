# Design audit — phased backlog

Processed 2026-08-31 against **live Figma** (`get_design_context` on the named nodes). Detail for each id lives in [`ISSUES.md`](./ISSUES.md).

**Crawl:** complete. All 67 frames on page `177:2037` were compared in scans A–D (2026-08-31). Next free id: `AUD-086`.

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

## Visual QA — pass 11–16 (remaining frames)

1440×900 (desktop) / 390×844 (scanner) vs live Figma for all leftover business-page routes.

### Pass 11 — Talent Hire / Availability / Finance / Portfolio
Frames `298:9377`, `298:9491`, `298:9558`, `298:9675`.

| ID | Outcome |
|----|---------|
| AUD-083 | **fixed** — Availability status card `px-[28px] py-[26px]` (talent + vendor) |
| AUD-084 | **fixed** — Coloured `KpiCard` uses warm `#FFF1E9` + `border-strong` |
| AUD-085 | **fixed** — Talent/Vendor payments confirm strip `rounded-[16px]` / 22×18 |

Also confirmed: Hire split 380 / avatars 42; Portfolio main 22 / cards 266·341·r16 / lead brand border; Payments main 22 / KPI grid 16 / 668·432; NoteCard 20×18.

### Pass 12 — Talent Profile / Support / Notifications / Hire completed
Frames `298:9746`, `298:10111`, `298:10178`, `298:10364` (thread via `?thread=`).

Confirmed: Profile identity `p-xl` / gap 22 / 668·432; Support/Notifications stack 24 (shared templates); completed hire thread chrome matches inbox pattern.

### Pass 13 — Vendor Hire / Availability / Finance / Gallery
Frames `298:8033`, `298:8147`, `298:8230`, `298:8348`.

Confirmed: Hire 380 pane; Availability status pad (AUD-083); Finance coloured KPI + confirm strip (AUD-084/085); Gallery card grid matches Portfolio recipe.

### Pass 14 — Vendor Profile / Declined hire / Available state
Frames `298:8432`, `298:9035`, `298:9141`.

Confirmed: Profile identity `p-xl` / main 22; Available toggle reuses Availability chrome; declined thread via hire inbox.

### Pass 15 — Support case thread + Seating unlocked
Frames `298:11188`, `298:5926`.

Confirmed: Support thread main 24 / 1180 / 473·615 grid; seating unlocked remains query-flag only (AUD-059).

### Pass 16 — Scanner app
Frames `298:7163`–`298:7344` at 390×844.

Confirmed: Sign-in canvas / gap 20 / device error r14; Events list; Scan dark shell `#12100d`, viewport 368 / reticle 252, result panel success/danger, outcome chips (dev-only). Copy left as drawn (AUD-042).

---

## Visual QA — pass 10 (Venues / Profile / Marketplace Profile)

1440×900 live screenshots vs Figma `298:5729`, `298:11752`, `298:11493`. Venues main 20 / card row 18 / cards ~360 / body 22×18; Profile main 22 / grid 668·432; Marketplace hero 24×24 / intel 16 / 668·432.

| ID | Outcome |
|----|---------|
| AUD-081 | **fixed** — Profile identity card `p-xl` (24), logo row `gap-lg` (20) |
| AUD-082 | **fixed** — Profile logo Avatar 96 squircle `rounded-[24px]` |

Also confirmed: Venues chrome matches; Marketplace Profile hero / intel / two-col match; head actions gap 10px; bio counter 600; brand AlertBanner 22×18 r16.

---

## Visual QA — pass 9 (Attendance / Scan history / Auth)

1440×900 live screenshots vs Figma `298:7779`, `298:7620`, `298:6502`, `298:6452` (also spot-checked Review `298:6578` / Declined `298:6646`). Attendance main 20px / KPI 16 / grid 668·432; Scan history main 18px; Sign-in EntryShell 1040 / 64 / card 420×32×22; Welcome NoteCard 20×18 / gap 4 / borderless.

| ID | Outcome |
|----|---------|
| AUD-078 | **fixed** — Scan history main `gap-md` (18px) |
| AUD-079 | **fixed** — NoteCard Icon=No: pad 20×18, gap 4, borderless; Neutral page fill |
| AUD-080 | **fixed** — Sign-in rebuilt to two-column EntryShell (`298:6502`) |

Also confirmed: Attendance NoteCard Neutral matches; Welcome chrome / checklist / CTA match; Review and Declined EntryShell chrome match.

---

## Visual QA — pass 8 (Editor / Seating)

1440×900 live screenshots vs Figma `298:4960`, `298:5394`. Editor Main `gap-[22px]`; body grid 292 / 22 / 806. Seating full-bleed chrome, tool rail 300 / gap 18, canvas pad 32×26×40, inner 980.

| ID | Outcome |
|----|---------|
| AUD-076 | **fixed** — Event Editor main stack `gap-[22px]` |
| AUD-077 | **fixed** — Seating canvas `px-[32px] pb-[40px]` (all layout modes) |

Also confirmed: area nav r14, readiness/area cards r18, seating lock strip 28×10 / brand-wash, regenerate blocked chrome. Layout-modes `298:6258` remains annotation-only.

---

## Visual QA — pass 7 (Notify / Live door)

1440×900 live screenshots vs Figma `298:7102`, `298:7534`. Notify EventOps stack 18px; compose 630 / history 470. Live door standalone `/app/live-door`, main gap 20, KPI gap 16, feed 668 / side 432.

| ID | Outcome |
|----|---------|
| AUD-073 | **fixed** — danger AlertBanner pad 20×14 / radius 14 |
| AUD-074 | **fixed** — Notify compose column `xl:w-[630px]` |
| AUD-075 | **fixed** — Live door chips 16r, LiveDot 8×8 r4, Wrong-event amber legend |

Also confirmed: Notify form pad 24, cancellation pill chrome, Live door scanned inverse KPI, gate bars, disconnect note.

---

## Visual QA — pass 6 (Orders / Tickets / Refunds)

1440×900 live screenshots vs Figma `298:6805`, `298:6925`, `298:7021`. EventOps stack gap 18px; Orders KpiCompact pad 18×20 / value 26; Tickets complimentary note bordered; Refunds brand AlertBanner `#FFF1E9` / amber lead / items-start.

| ID | Outcome |
|----|---------|
| AUD-070 | **fixed** — EventOpsChrome stack `gap-md` (18px) |
| AUD-071 | **fixed** — Orders KPIs use `KpiCard` `kind="compact"` |
| AUD-072 | **fixed** — brand AlertBanner warm fill + amber lead; Tickets NoteCard border |

Also confirmed: tab bar gap 20, filter bars `gap-gap-md` / `px-lg py-base`, refund request tiles 38px.

---

## Visual QA — pass 5 (Talent Home / Vendor Home)

1440×900 live screenshots vs Figma `298:9211`, `298:7882`. Shell 248 / 1192 / gutter 36. Columns 668 / 432, stack gap 24, waiting avatars 44px.

| ID | Outcome |
|----|---------|
| AUD-069 | **fixed** — warm NoteCard is borderless `#FFF1E9`, 22×20 pad, 10px lead/body gap |

Also confirmed: Available/Reserved chrome, vendor reserved banner 16r / 20×16, strength panels, public-profile stats grids.

---

## Visual QA — pass 4 (Settings / Notifications / Reviews)

1440×900 live screenshots vs Figma `298:10962`, `298:10897`, `298:10750`. Settings/Notifications mains are 1180/1080 as drawn; Reviews 1192.

| ID | Outcome |
|----|---------|
| AUD-066 | **fixed** — Settings stack gap 24px, tab bar 28px, section tops 24/24/32 |
| AUD-067 | **fixed** — Notifications stack gap 24px, filter row gap 10px |
| AUD-068 | **fixed** — Reviews stack gap 24px, distribution gap 10px, right column 20px |

Also confirmed: pref matrix `rounded-[14px]`, notification rows 38px tile / 20×14 pad, reviews score card 14px gap / 340px column.

---

## Visual QA — pass 3 (Sales / Archive / Support)

1440×900 live screenshots vs Figma `298:10477`, `298:5826`, `298:11110`. Shell still 248 / 1192 / gutter 36. Support main is 1180 as drawn.

| ID | Outcome |
|----|---------|
| AUD-064 | **fixed** — Support stack gap 24px |
| AUD-065 | **fixed** — KpiCard inner gap 10px |

Also confirmed: Archive table 64px rows, 18r card, filter bar 20×16; Sales chart 24×22 / 18 gap; Support 473 / 615 columns.

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
