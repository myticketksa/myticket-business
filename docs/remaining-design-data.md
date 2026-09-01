# Remaining Design Data

> Extracted via Figma AI (2026-08-31). Merged into `MyTicket-Design-System-Specification.md`.
> Markers: **Existing** · **Inferred** · **Rejected correction** · **Assumption**

---

## Corrections (reviewed)

| Claim | Verdict |
|-------|---------|
| Hire & Marketplace is 7 frames, not 3 | **Rejected.** Those extra frames are already inventoried under Talent (§07) and Vendor (§08). Organizer hire group remains 3 frames. |
| EmptyState / Toast “not listed” in the spec | **Rejected.** Already in §03 / P0–P1. New fact: node IDs `207:2901` and `207:2875`, **0 instances** on the business page. |

---

## 1. Sidebar (`Biz/Sidebar` — `298:21438`)

**Existing.** 15 + 5 / 9 + 4 / 9 + 4 confirmed.

### Organizer (`298:21439`)

| Group | Icon | Label | Count |
|-------|------|-------|-------|
| *(none)* | house-fill | Home | — |
| Operate | calendar-blank | Events | 2 |
| Operate | storefront | Venues | — |
| Operate | archive | Archive | — |
| Hire | users-three | Marketplace | — |
| Hire | circle-dashed | Hire requests | 3 |
| Door | qr-code | Scanners | 1 |
| Door | door-open | Live door | — |
| Door | chart-line-up | Attendance | — |
| Grow | receipt | Sales | — |
| Grow | bank | Finance & payouts | 1 |
| Grow | star | Ratings & reviews | — |
| Account | user-circle | Profile | — |
| Account | — | Settings | — |
| Account | — | Support | — |

Footer: `RE` · Riyadh Events Co. · `Organizer · ORG-2481` · caret-up-down.

**Confirmed (Visual QA 2026-08-31):** Home is **ungrouped** above Operate. Operate’s third item is **Archive** (`298:5826`), not Attendance.

Notifications are **not** a sidebar item. Reach via topbar bell.

### Talent (`298:21466`)

| Group | Icon | Label | Count |
|-------|------|-------|-------|
| *(none)* | house-fill | Home | — |
| Work | circle-dashed | Hire requests | ✓ |
| Work | — | Availability | — |
| Presence | user-circle | Profile | — |
| Presence | images | Portfolio | 1 |
| Presence | star | Ratings & reviews | — |
| Money | receipt | Payments | — |
| Account | — | Settings | — |
| Account | — | Support | — |

Footer: `LH` · Lina Hakim · `Talent · TAL-0917`.

### Vendor (`298:21486`)

| Group | Icon | Label | Count |
|-------|------|-------|-------|
| *(none)* | house-fill | Home | — |
| Work | circle-dashed | Hire requests | ✓ |
| Work | — | Availability | — |
| Presence | user-circle | Profile | — |
| Presence | images | Gallery | — |
| Presence | star | Ratings & reviews | — |
| Money | receipt | Payments | — |
| Account | — | Settings | — |
| Account | — | Support | — |

Footer: `LC` · Layla Catering · `Vendor · VEN-1204`.

---

## 2. Topbar (`Biz/Topbar` — `298:21507`)

| Property | Type | Default |
|----------|------|---------|
| Crumb | TEXT | Business workspace |
| Current | TEXT | Home |
| BellCount | TEXT | 7 |
| Initials | TEXT | RE |
| Kind | VARIANT | Base \| MainWebsite \| EditorMeta \| HireRequests |

| Kind | Node | Extra |
|------|------|-------|
| Base `298:21508` | Breadcrumb Crumb / Current · العربية pill (Cairo Bold 12.5) · bell + BellCount · avatar Initials |
| MainWebsite `298:21522` | + “Main website” + arrow-square-out |
| EditorMeta `298:21539` | + “Draft saved just now” + check-circle |
| HireRequests `298:21556` | No العربية · gradient CTA “New request” + plus |

Width FILL 1192. Bell counts **existing:** Organizer 7, Talent 4, Vendor 2. Bell **hidden** on notification pages.

**Inferred:** “New request” has **no** destination frame.

---

## 3. StatusBadge (`207:1750`) — 202 business instances

| Tone | Labels (instance counts) |
|------|--------------------------|
| SuccessTint | Valid 21, Accepted 17, Paid 8, Verified 8, Valid · queued 6, Approved 4, Completed 4, Active 3, On 3, Received 2, Deposit received 1, Accepted · reserves you 2, Completed · review them 1 |
| BrandTint | Open 11, On sale 4, Under review 4, In progress 3, Confirm receipt 2, Announcement 2, Pending 1, Resold 1, Schedule change 1, Never signed in 1, With MyTicket 2, Report under assessment 1, Expiring 1, Expiring 11 Sep 1 |
| DangerTint | Wrong event 8, Action needed 8, Declined 6, Declined by you 3, Fix: Commercial Registration 1, Fix: Responsible person 1, Cancelled 1, Rejected 1, Already scanned 1, Refunded 1, Missing 2, Can't scan 1, Held 1, Expiring 1 |
| NeutralOutline | Awaiting you 4, Draft 2, Awaiting your response · Xd/Xh, Awaiting payment 2, No amount recorded 2, Complimentary 1, This device 3, Scheduled 1, Agreed · due Nov 1, Awaiting response · Xd, Awaiting their response · 4d 1 |
| LiveSolid | Live now 3, Active now 2 |
| Inactive | Closed 8 |
| InfoTint | Refunded 4 |
| UrgentSolid | **NOT FOUND** on business page |
| Terminal | **NOT FOUND** on business page |

Keep all 9 tones in code. `Refunded` appears on both DangerTint and InfoTint — pick tone from the instance, do not merge.

---

## 4. Standalone components (not sets)

| Name | Node | Notes |
|------|------|-------|
| Select | `207:1698` | Value TEXT |
| Textarea | `207:1700` | Value TEXT |
| Pagination | `207:2852` | 246×40 · “Show 24 more” · “Showing 24 of 168” · load-more, not pages · **0** business instances |
| Modal | `207:3040` | 460×244 |
| ModalScrim | `207:3048` | Backdrop |
| FieldLabel | (cited) | Already in DS |
| Mobile/TabBar | `263:9918` | Scanner |
| Mobile/SegmentedTabs | `263:9981` | |
| Mobile/BottomSheet | `263:10030` | |
| Mobile/SheetHeader | `263:10154` | |
| Mobile/SheetSuccess | `263:10163` | |

**NOT FOUND:** DatePicker, TimePicker, FileUpload (beyond HatchPlaceholder / local upload row), Tooltip, Popover, web Drawer, opened DropdownMenu, Stepper, dark layouts, breadcrumb component, table-row component.

Filter dropdowns are **closed-trigger local frames** only.

---

## 5. Icons

- **63** listed components, frames **24×24**
- Families: `Icon / kebab-name` (canonical, 51) and `Icon/PascalName` (legacy, 12)
- **Inferred:** Phosphor Icons naming
- Sidebar uses names **not** all present in the 63-row list (`house-fill`, `calendar-blank`, `storefront`, …). Treat those as existing in file; export when implementing shell.

Full 63-row table lives in the Figma AI dump (prompt response). Implement from MCP / Phosphor matching kebab names. Do not invent icons.

---

## 6. EventTabBar (`298:21621`)

Active: Edit | Orders | Tickets | Refunds | Notify | LiveDoor. Counts boolean default true.

Visible labels **inferred:** Edit event (implicit when Active=Edit), Orders (3,412), Tickets issued (7,240), Refund requests (2), Notify holders, Live door.

---

## 7–10.

Form fields, locale, empty/alert/toast instances, and table column maps are in `MyTicket-Design-System-Specification.md` §§12–16.
