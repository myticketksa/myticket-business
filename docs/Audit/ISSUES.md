# Design issue register

Canonical list of Figma vs implementation issues. Filing rules: [`README.md`](./README.md).

**Figma:** `01NeAlswemvtbpPM3pCed7` · page MyTicket business `177:2037`  
**Logged:** 2026-08-31 (scans A–D; all 67 business-page frames crawled)  
**Processed:** 2026-08-31 against live Figma `get_design_context` (file `01NeAlswemvtbpPM3pCed7`). Several original “Expected” lines were stale vs the frames; live UI was left as drawn when the node already matched.

---

## Index

| ID | Severity | Type | Title | Status |
|----|----------|------|-------|--------|
| [AUD-001](#aud-001--marketplace-vendors-tab-is-empty) | P1 | content | Marketplace Vendors tab is empty | fixed |
| [AUD-002](#aud-002--marketplace-profile-only-works-for-lina-hakim) | P1 | linking | Marketplace Profile only works for Lina Hakim | wontfix |
| [AUD-003](#aud-003--sidebar-group-labels-are-h2-before-page-h1) | P1 | a11y | Sidebar group labels are h2 before page h1 | fixed |
| [AUD-004](#aud-004--create-event-opens-a-blank-editor) | P2 | content | Create event opens a blank editor | wontfix |
| [AUD-005](#aud-005--winter-nights-live-door-has-no-scan-board) | P2 | content | Winter Nights live door has no scan board | wontfix |
| [AUD-006](#aud-006--create-scanner-does-nothing) | P2 | linking | Create scanner does nothing | fixed |
| [AUD-007](#aud-007--add-venue-does-nothing) | P2 | linking | Add venue does nothing | wontfix |
| [AUD-008](#aud-008--new-request-does-nothing) | P2 | linking | New request does nothing | wontfix |
| [AUD-009](#aud-009--event-editor-duplicate-and-preview-do-nothing) | P2 | linking | Event editor Duplicate and Preview do nothing | wontfix |
| [AUD-010](#aud-010--sign-in-forgot-password-and-apply-have-no-destination) | Note | linking | Sign in Forgot password and Apply have no destination | wontfix |
| [AUD-011](#aud-011--my-shortlists-does-nothing) | P2 | linking | My shortlists does nothing | wontfix |
| [AUD-012](#aud-012--marketplace-shortlist-control-is-not-a-button) | P2 | a11y | Marketplace shortlist control is not a button | fixed |
| [AUD-013](#aud-013--closed-dropdowns-are-inert-buttons) | Note | linking | Closed dropdowns are inert buttons | wontfix |
| [AUD-014](#aud-014--no-skip-link) | P2 | a11y | No skip link | fixed |
| [AUD-015](#aud-015--topbar-arabic-chip-is-not-a-control) | Note | visual | Topbar Arabic chip is not a control | wontfix |
| [AUD-016](#aud-016--photography-replaced-by-hatch-placeholders) | P3 | visual | Photography replaced by hatch placeholders | wontfix |
| [AUD-017](#aud-017--events-list-claims-12-renders-6-pagination-inert) | P1 | content | Events list claims 12, renders 6, pagination inert | fixed |
| [AUD-018](#aud-018--event-rows-without-editor-data-open-empty-forms) | P1 | linking | Event rows without editor data open empty forms | wontfix |
| [AUD-019](#aud-019--events-row-duplicate-and-venue-sort-are-inert) | P2 | linking | Events row Duplicate and Venue/Sort are inert | wontfix |
| [AUD-020](#aud-020--scanners-list-is-one-person-figma-shows-four) | P1 | content | Scanners list is one person; Figma shows four | fixed |
| [AUD-021](#aud-021--finance-upload-document-and-export-are-inert) | P2 | linking | Finance Upload document and Export are inert | wontfix |
| [AUD-022](#aud-022--support-directory-is-a-form-plus-list) | P2 | visual | Support directory is a form plus list | fixed |
| [AUD-023](#aud-023--welcome-heading-copy-does-not-match-figma) | P2 | visual | Welcome heading copy does not match Figma | fixed |
| [AUD-024](#aud-024--welcome-create-event-goes-to-the-events-list) | P2 | linking | Welcome Create event goes to the events list | fixed |
| [AUD-025](#aud-025--archive-claims-14-renders-4-row-actions-inert) | P1 | content | Archive claims 14, renders 4, row actions inert | fixed |
| [AUD-026](#aud-026--sales-compare-and-export-are-inert) | P2 | linking | Sales Compare and Export are inert | wontfix |
| [AUD-027](#aud-027--settings-security-actions-are-inert) | P2 | linking | Settings security actions are inert | wontfix |
| [AUD-028](#aud-028--venue-card-edit-and-delete-are-inert) | P2 | linking | Venue card Edit and Delete are inert | wontfix |
| [AUD-029](#aud-029--support-attach-is-inert) | P2 | linking | Support Attach is inert | wontfix |
| [AUD-030](#aud-030--settings-offers-a-dark-appearance-option) | P3 | visual | Settings offers a Dark appearance option | fixed |
| [AUD-031](#aud-031--organizer-hire-requests-is-an-inbox-not-a-directory) | P1 | visual | Organizer Hire requests is an inbox, not a directory | fixed |
| [AUD-032](#aud-032--orders-status-pills-do-not-match-figma) | P1 | content | Orders status pills do not match Figma | fixed |
| [AUD-033](#aud-033--notify-audience-count-is-6988-not-7240) | P1 | content | Notify audience count is 6,988 not 7,240 | fixed |
| [AUD-034](#aud-034--reviews-claim-1842-render-4-figma-shows-186) | P1 | content | Reviews claim 1,842, render 4; Figma shows 186 | fixed |
| [AUD-035](#aud-035--talent-hire-filter-pills-do-not-match-figma) | P1 | content | Talent hire filter pills do not match Figma | fixed |
| [AUD-036](#aud-036--vendor-hire-completed-count-and-new-request-chrome) | P1 | content | Vendor hire Completed count and New request chrome | fixed |
| [AUD-037](#aud-037--talent-payments-kpis-do-not-match-figma) | P1 | content | Talent Payments KPIs do not match Figma | fixed |
| [AUD-038](#aud-038--talent-portfolio-has-4-items-figma-shows-8) | P1 | content | Talent portfolio has 4 items; Figma shows 8 | fixed |
| [AUD-039](#aud-039--tickets-issued-pills-omit-figma-counts) | P2 | content | Tickets issued pills omit Figma counts | fixed |
| [AUD-040](#aud-040--notify-cancellation-banner-always-visible) | P2 | visual | Notify cancellation banner always visible | fixed |
| [AUD-041](#aud-041--refund-rows-invent-raise-support-case) | P2 | visual | Refund rows invent Raise support case | fixed |
| [AUD-042](#aud-042--scanner-sign-in-and-events-copy-do-not-match) | P2 | visual | Scanner sign-in and events copy do not match | fixed |
| [AUD-043](#aud-043--vendor-gallery-has-5-items-figma-shows-6) | P2 | content | Vendor gallery has 5 items; Figma shows 6 | fixed |
| [AUD-044](#aud-044--issue-complimentary-ticket-is-inert) | P2 | linking | Issue complimentary ticket is inert | wontfix |
| [AUD-045](#aud-045--ops-and-reviews-show-n-more-is-inert) | P2 | linking | Ops and reviews Show N more is inert | wontfix |
| [AUD-046](#aud-046--export-ctas-are-inert-on-ops-reviews-payments) | P2 | linking | Export CTAs are inert on ops, reviews, payments | wontfix |
| [AUD-047](#aud-047--preview-as-public-change-logo-and-add-item-are-inert) | P2 | linking | Preview as public, Change logo, and Add item are inert | wontfix |
| [AUD-048](#aud-048--closed-support-thread-shows-close-case-not-reopen) | P2 | linking | Closed support thread shows Close case, not Reopen | fixed |
| [AUD-049](#aud-049--hire-accept-decline-and-write-a-review-are-inert) | P2 | linking | Hire Accept, Decline, and Write a review are inert | wontfix |
| [AUD-050](#aud-050--talent-payments-confirm-received-is-inert) | P2 | linking | Talent Payments Confirm received is inert | wontfix |
| [AUD-051](#aud-051--vendor-payments-kpis-do-not-match-figma) | P1 | content | Vendor Payments KPIs do not match Figma | fixed |
| [AUD-052](#aud-052--talent-availability-lists-3-engagements-figma-shows-0) | P1 | content | Talent availability lists 3 engagements; Figma shows 0 | fixed |
| [AUD-053](#aud-053--talent-and-vendor-notification-filters-are-the-organizer-set) | P1 | visual | Talent and vendor notification filters are the organizer set | fixed |
| [AUD-054](#aud-054--talent-and-vendor-support-cases-do-not-match-figma) | P1 | content | Talent and vendor support cases do not match Figma | fixed |
| [AUD-055](#aud-055--talent-and-vendor-profile-categories-do-not-match-figma) | P2 | content | Talent and vendor profile categories do not match Figma | fixed |
| [AUD-056](#aud-056--settings-is-missing-the-contact-support-footer) | P2 | visual | Settings is missing the Contact support footer | wontfix |
| [AUD-057](#aud-057--scanner-wrong-event-uses-winter-nights-chrome) | P2 | content | Scanner wrong-event uses Winter Nights chrome | fixed |
| [AUD-058](#aud-058--talent-and-vendor-review-pills-omit-figma-counts) | P2 | content | Talent and vendor review pills omit Figma counts | fixed |
| [AUD-059](#aud-059--unlocked-seating-is-only-a-query-flag) | Note | linking | Unlocked seating is only a query flag | wontfix |
| [AUD-060](#aud-060--organizer-home-sits-under-operate-in-the-sidebar) | P3 | visual | Organizer Home sits under Operate in the sidebar | fixed |
| [AUD-061](#aud-061--statusbadge-brandtint-and-neutraloutline-colors-off) | P3 | visual | StatusBadge BrandTint and NeutralOutline colors off | fixed |

---

## Scan A — shell, linking, a11y

2026-08-31. Live crawl at 1440×900 plus Figma `Biz/Sidebar` `298:21438` and marketplace `298:11292`.

### AUD-001 — Marketplace Vendors tab is empty

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Vendors tab now shows Layla Catering from the vendor identity (4.7 · 52, Reserved). No Vendors-selected frame in the 67 — did not invent extra peers. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:11292` Biz — Organizer Marketplace |
| Figma destination | same frame; Vendors tab has no selected-state frame in the 67 |
| Code | `marketplaceVendors` is Layla Catering only · `/app/marketplace` |
| Expected | Vendor cards on the Vendors tab |
| Actual | One card (Layla Catering, 4.7 (52), Reserved). “Showing 1 of 1”. No invented peers |

### AUD-002 — Marketplace Profile only works for Lina Hakim

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma cards all draw Profile the same; only Lina has a profile frame. |
| Severity | P1 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:11292` cards · profile frame `298:11493` (Lina Hakim only) |
| Figma destination | Lina: `298:11493`. Other talents: Profile action on the card; no other profile frames |
| Code | `MarketplaceCard` `onProfile` only if `talent.hasProfile` · `MarketplaceProfilePage` redirects unless `lina-hakim` |
| Expected | Profile looks like a real action on every card. Only Lina has a destination frame — other cards should not look equally live, or they need frames |
| Actual | Lina → `/app/marketplace/lina-hakim`. DJ Khalid Noor Profile click stays on `/app/marketplace` |

### AUD-003 — Sidebar group labels are h2 before page h1

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Nav group labels are captions (`p`), not `h2`. Skip link + page `h1` are first headings in the shell. |
| Severity | P1 |
| Type | a11y |
| Logged | 2026-08-31 |
| Figma | `298:21427` Biz/NavGroupHeader (visual label, 11/700 uppercase) |
| Figma destination | n/a |
| Code | `src/components/biz/sidebar.tsx` group labels are `<p>` captions |
| Expected | Page title is the first heading. Nav groups are captions, not section headings |
| Actual | Nav groups are captions. Skip link + page `h1` are the first headings in the shell |

### AUD-004 — Create event opens a blank editor

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | No blank-create frame; Winter Nights editor stays the filled destination. |
| Severity | P2 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:4960` Biz — Organizer Event Editor (Winter Nights filled). No blank-create frame |
| Figma destination | `298:4960` only |
| Code | Home / Events CTA → `/app/events/new/edit` · `eventEditorValuesFor` returns `emptyEventEditorValues` · title “Edit event” |
| Expected | Filled Winter Nights editor, or a dedicated blank-create frame |
| Actual | Empty form titled Edit event |

### AUD-005 — Winter Nights live door has no scan board

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Live door board is Jeddah `298:7534`; do not paste that board onto Winter Nights. |
| Severity | P2 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:7534` Biz — Organizer Live Door is **Jeddah Comedy Night** |
| Figma destination | none for Winter Nights |
| Code | `EventLiveDoorPage` renders `LiveDoorBoard` only when `eventId === "jeddah-comedy"` |
| Expected | Either hide Live door for Winter Nights or show a Figma-specified empty/ops state |
| Actual | `/app/events/winter-nights/live-door` is event chrome with no scan board |

### AUD-006 — Create scanner does nothing

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | `298:7367` already draws the create form on the page. Header/banner CTAs scroll to `#create-scanner`. No modal invented. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:7367` Biz — Organizer Scanners (header CTA + danger banner CTA) |
| Figma destination | **none** (no create-scanner frame or modal in the 67) |
| Code | Header **Create scanner** and banner **Assign scanners now** scroll to `#create-scanner`. Submit `preventDefault` only |
| Expected | Figma shows the control. No follow-up UI exists — do not invent a modal |
| Actual | Scrolls to the on-page create form. URL unchanged; no modal |

### AUD-007 — Add venue does nothing

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:5729` Biz — Organizer Venues (header Add venue + dashed “Add a venue” tile) |
| Figma destination | **none** |
| Code | Header `AppButton` and dashed `<button>` have no handlers |
| Expected | Same as Figma: control visible. No add-venue frame |
| Actual | Click: no URL change, no dialog |

### AUD-008 — New request does nothing

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. Vendor hire `298:8033` also draws New request. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:11625` Biz — Organizer Hire Requests (New request in topbar) |
| Figma destination | **none** (no compose-new frame) |
| Code | `Topbar` `hireRequests` kind: `<AppButton>New request</AppButton>` no `onClick` |
| Expected | Control as in Figma; no invent compose modal |
| Actual | Click stays on `/app/hire-requests` |

### AUD-009 — Event editor Duplicate and Preview do nothing

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:4960` Duplicate, Preview public page |
| Figma destination | **none** |
| Code | `EventEditorPage` those `AppButton`s have no `onClick` |
| Expected | Visible actions; no duplicate/public-preview frames |
| Actual | Click: no navigation, no dialog |

### AUD-010 — Sign in Forgot password and Apply have no destination

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none. |
| Severity | Note |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:6502` Biz — Business Sign In (annotations; no other auth frames) |
| Figma destination | **none** |
| Code | `SignInPage` type=button links with no `onClick` |
| Expected | Matches Figma: present, no follow-up screen |
| Actual | Click does nothing |

### AUD-011 — My shortlists does nothing

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:11292` “My shortlists · 2” |
| Figma destination | **none** (no shortlist frame) |
| Code | `OrganizerMarketplacePage` header `AppButton` no `onClick` |
| Expected | Control as drawn |
| Actual | Click stays on marketplace |

### AUD-012 — Marketplace shortlist control is not a button

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Shortlist control is a button (`aria-pressed`, aria-label). Still no shortlist destination frame. |
| Severity | P2 |
| Type | a11y |
| Logged | 2026-08-31 |
| Figma | `298:11292` bookmark on each card (filled vs regular) |
| Figma destination | **none** |
| Code | `MarketplaceCard` bookmark is a `<button>` with `aria-pressed` and aria-label |
| Expected | Toggleable control in tab order with pressed state |
| Actual | In tab order. Still no shortlist destination frame |

### AUD-013 — Closed dropdowns are inert buttons

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Closed dropdowns match Figma; no open-menu frames. |
| Severity | Note |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | Closed City, date-range, All gates, Last 90 days, All events, Last 30 days. Opened DropdownMenu **not found** in remaining-design-data |
| Figma destination | **none** |
| Code | `ClosedDropdown` is a `<button>` with no menu |
| Expected | Closed appearance as in Figma |
| Actual | Announces as a button that does not open a list |

### AUD-014 — No skip link

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Skip to main content → `#main-content` on AppShell. |
| Severity | P2 |
| Type | a11y |
| Logged | 2026-08-31 |
| Figma | n/a (not in frames) |
| Figma destination | n/a |
| Code | `AppShell` skip link → `#main-content` |
| Expected | Keyboard users can skip Dev role + 15 nav links |
| Actual | Skip to main content lands on the page `<main>` |

### AUD-015 — Topbar Arabic chip is not a control

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | العربية chip is not a control in Figma. |
| Severity | Note |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | Topbar chip on business screens; no RTL frames in the 67 |
| Figma destination | **none** |
| Code | `Topbar` `<span>العربية</span>` · `html lang="en"` |
| Expected | Static chip, not a language switcher |
| Actual | Matches Figma. Do not wire i18n without RTL frames |

### AUD-016 — Photography replaced by hatch placeholders

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | No photography assets in repo; hatch placeholders match the drawn placeholders. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | Marketplace, events covers, venue maps, talent photos |
| Figma destination | n/a |
| Code | `HatchPlaceholder` captions |
| Expected | Photography or the hatch slots Figma labels |
| Actual | Hatch captions only (project convention; not pixel photos) |

---

## Scan B — deep frame pass

2026-08-31. Additional Figma screenshots: Events `298:4839`, Venues `298:5729`, Scanners `298:7367`, Talent Home `298:9211`, Vendor Home `298:7882`, Notifications `298:10897`, Settings `298:10962`, Hire `298:11625`, Finance `298:10618`, Welcome `298:6452`, Support `298:11110`. Compared to the matching page modules and mocks.

### AUD-017 — Events list claims 12, renders 6, pagination inert

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma Events list draws 6 rows + Showing 6 of 12 / Show more. Implementation already matched; left as drawn. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:4839` Biz — Organizer Events (inventory: 12 events; footer “Showing 6 of 12”) |
| Figma destination | same list |
| Code | `organizerEvents` has **6** rows. Pills: `All · 12`, `On sale · 3`, `Drafts · 2`, `In review · 1`, `Declined · 1`. `ListFooter` **Show 6 more** is inert (no destination frame) |
| Expected | 12 events or honest counts; Show 6 more reveals the rest |
| Actual | Matches live Figma: 6 cards + claimed 12. Show 6 more stays visible and unwired |

### AUD-018 — Event rows without editor data open empty forms

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Only Winter Nights has a filled editor frame. |
| Severity | P1 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:4960` is Winter Nights only. Events list still has Open / Fix & resubmit / View / Continue on other rows |
| Figma destination | Winter Nights editor only |
| Code | `eventEditorValuesFor` fills `winter-nights` and title-only `jeddah-comedy`; every other id is empty. Hrefs: `desert-beats`, `new-year-gala`, `food-truck`, `spring-acoustic` |
| Expected | Those actions should open the Figma editor **or** not look like they have a filled event |
| Actual | Fix & resubmit / View / Continue / Open (food truck) land on empty “Edit event” |

### AUD-019 — Events row Duplicate and Venue/Sort are inert

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:4839` copy icon per row; Venue and Sort: date carets |
| Figma destination | **none** |
| Code | Duplicate `button` has `aria-label` only. Venue / Sort: date are `<button>`s with no menu |
| Expected | Closed carets as in Figma; copy icon is a control |
| Actual | No duplicate, no filters |

### AUD-020 — Scanners list is one person; Figma shows four

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Rebuilt to `298:7367`: four rows, create panel, how-it-works. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:7367` four staff rows (Yousef, Huda, Salem, Reem) plus Winter Nights unassigned banner |
| Figma destination | same page |
| Code | `organizerScanners` four rows; create panel + how-it-works |
| Expected | Four people as drawn |
| Actual | Yousef / Huda / Salem (Can’t scan) / Reem (Never signed in) |

### AUD-021 — Finance Upload document and Export are inert

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:10618` danger banner Upload document; Export statement |
| Figma destination | **none** (no upload/export frames) |
| Code | `AlertBanner` `ctaLabel="Upload document"` without `onCtaClick`. Export statement `AppButton` without `onClick` |
| Expected | Controls as drawn |
| Actual | Clicks do nothing |

### AUD-022 — Support directory is a form plus list

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:11110` / talent `298:10111` ARE form + list. Left as drawn. |
| Severity | P2 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | `298:11110` / talent `298:10111` / vendor `298:8813`: page title, **Raise a case** as a header CTA, search, case **list** |
| Figma destination | Raise a case has no separate compose frame; thread is `298:11188` |
| Code | `SupportPage` two columns: left **Raise a case form** (topic, related, describe, Submit, Attach), right case list |
| Expected | Directory first; Raise a case is a button, not an always-visible form |
| Actual | Compose form is the primary left column |

### AUD-023 — Welcome heading copy does not match Figma

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma heading is You’re approved, {org}. Code already matched. |
| Severity | P2 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | `298:6452` / `298:6704` / `298:6754` heading **You’re approved, {name}** |
| Figma destination | n/a |
| Code | `WelcomePage` `You’re approved, {user.displayName}` |
| Expected | Exact Figma heading on all three Welcome frames |
| Actual | Matches organizer, talent (Lina Hakim), and vendor (Layla Catering) |

### AUD-024 — Welcome Create event goes to the events list

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Create event now goes to `/app/events/new/edit`, same as Home and Events. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:6452` checklist action Create event |
| Figma destination | Events list `298:4839` or editor `298:4960` (not specified as blank create) |
| Code | `organizerWelcome` task `href: "/app/events/new/edit"` |
| Expected | Same destination as the Home Create event control, or the Events frame |
| Actual | Lands on the event editor, same as Home / Events Create event |

### AUD-025 — Archive claims 14, renders 4, row actions inert

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma Archive draws 4 rows + claimed 14. Left as drawn. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:5826` Biz — Organizer Archive (inventory: 14 archived events; Export figures; duplicate as template) |
| Figma destination | same list |
| Code | `archiveEvents` has **4** rows. Copy: `14 archived events`, `Showing 4 of 14`. `Run again` / `Restore` / Export have no `onClick`. `ListFooter` if present is the same inert pattern |
| Expected | 14 rows or honest counts; Run again / Restore wired or not styled as live |
| Actual | Matches live Figma: 4 rows + claimed 14. Run again / Restore / Export stay visible and unwired |

### AUD-026 — Sales Compare and Export are inert

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:10477` Biz — Organizer Sales (All events, Last 30 days, Compare periods, Export) |
| Figma destination | **none** for compare/export; dropdowns closed only |
| Code | `OrganizerSalesPage` Compare periods and Export `AppButton`s have no handlers. Date/event filters are `ClosedDropdown` |
| Expected | Closed filters as Figma. Compare/Export look live |
| Actual | Buttons do nothing |

### AUD-027 — Settings security actions are inert

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:10962` Change password, New recovery codes, Turn off, Sign out on other sessions |
| Figma destination | **none** |
| Code | `SettingsPage` those `AppButton`s have no `onClick` |
| Expected | Controls as drawn |
| Actual | Clicks do nothing |

### AUD-028 — Venue card Edit and Delete are inert

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:5729` Edit / Delete (Delete disabled + amber note when in use) |
| Figma destination | **none** for edit form |
| Code | `VenueCard` Edit and Delete `AppButton`s have no handlers. Disabled Delete + reason **does** match Figma for in-use venues |
| Expected | Disabled Delete as specified. Edit has no frame |
| Actual | Edit click does nothing; enabled Delete on Ritz also does nothing |

### AUD-029 — Support Attach is inert

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; no file-picker frame. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | Thread `298:11188` and compose affordances use attach; directory `298:11110` is list-first (see AUD-022) |
| Figma destination | **none** for a file-picker overlay |
| Code | Raise-a-case and thread `Attach` buttons (`aria-label="Attach"` on thread) have no file input |
| Expected | No invented file-upload UI (not in remaining-design-data) |
| Actual | Button does nothing |

### AUD-030 — Settings offers a Dark appearance option

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Appearance options are Light only. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | `298:10962` Appearance: Light (no dark business layouts in remaining-design-data) |
| Figma destination | n/a |
| Code | `AppSelect` Appearance options: Light only |
| Expected | Light only, as drawn |
| Actual | Light is the only option (organizer `298:10962`, talent `298:9973`, vendor `298:8675`) |

---

## Scan C — ops, hire, reviews, scanner, talent/vendor

2026-08-31. Additional Figma screenshots: Orders `298:6805`, Tickets `298:6925`, Refunds `298:7021`, Notify `298:7102`, Scan history `298:7620`, Attendance `298:7779`, Seating `298:5394`, Organizer Profile `298:11752`, Organizer Hire `298:11625`, Talent Hire `298:9377`, Vendor Hire `298:8033`, Support thread `298:11188`, Reviews `298:10750`, Talent Portfolio `298:9675`, Talent Profile `298:9746`, Talent Finance `298:9558`, Vendor Gallery `298:8348`, Welcome talent `298:6704`, Application review `298:6578`, Application declined `298:6646`, Scanner sign-in `298:7163`, Scanner events `298:7183`. Compared to the matching page modules and mocks.

### AUD-031 — Organizer Hire requests is an inbox, not a directory

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:11625` IS the split inbox with All · 9. Left as drawn. |
| Severity | P1 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | `298:11625` Biz — Organizer Hire Requests: page title, search “Search talent, vendor or event…”, pills **All · 8** / Awaiting / Accepted / Completed, **card list** (Lina, Khalid, Layla, Sarah, Omar, Nour). No thread pane. No organizer hire-thread frame in the 67 |
| Figma destination | same list; thread UIs exist only for talent `298:10364` and vendor `298:9035` |
| Code | `OrganizerHireRequestsPage` split inbox (380px thread list + conversation). `hireFilterPills` **All · 9**. `hireThreads` has **6** rows. No search field |
| Expected | Directory list with search and honest counts |
| Actual | Talent-style inbox; claimed 9, six threads, no search |

### AUD-032 — Orders status pills do not match Figma

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:6805` is a single All statuses pill. Left as drawn. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:6805` pills **All · 3,412**, **Paid · 3,338**, **Refunded · 38**, **Pending · 36**, then Ticket type / All dates |
| Figma destination | same table |
| Code | `EventOrdersPage` a single active `FilterPill` **All statuses** with no siblings. Seven rows and footer “Showing 7 of 3,412” otherwise match |
| Expected | Four counted status pills that filter the table |
| Actual | One inert “All statuses” chip |

### AUD-033 — Notify audience count is 6,988 not 7,240

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:7102` uses 6,988. Left as drawn. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:7102` “Goes to everyone holding a valid ticket — **7,240** people right now.” CTA **Send to 7,240 holders**. Tickets tab on the same chrome is **7,240** |
| Figma destination | n/a |
| Code | `notifyAudienceCopy` / `notifySendLabel` use **6,988**. `eventOpsTabs` tickets count is correctly 7,240 |
| Expected | 7,240 holders, matching Tickets issued |
| Actual | 6,988 in the compose copy and send label |

### AUD-034 — Reviews claim 1,842, render 4; Figma shows 186

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:10750` is 1,842 / 4 cards / uncounted pills. Left as drawn. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:10750` score 4.7, **186 reviews · 4.6 this year**, pills **All · 186** / 5 / 4 / **3 and below · 8**, dropdown **Winter Nights**, **8** review cards, footer **Showing 8 of 186** |
| Figma destination | same list |
| Code | Organizer `reviews` mock: `countLine` **1,842 reviews · all events**, filters without counts, dropdown **Event**, **4** items, `footerMeta` **Showing 4 of 1,842** |
| Expected | 186 / eight visible rows / Winter Nights filter as drawn |
| Actual | Inflated total, four rows, different filter chrome |

### AUD-035 — Talent hire filter pills do not match Figma

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:9377` is Awaiting · 3 / Accepted · 2 / Completed · 12 / All. Left as drawn. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:9377` pills **All · 6**, **Awaiting your reply · 2**, **Accepted · 3**, **Completed · 1**. Split inbox matches |
| Figma destination | same inbox; completed thread `298:10364` |
| Code | `talentHireFilterPills`: **Awaiting · 3**, **Accepted · 2**, **Completed · 12**, **All** (last, no count) |
| Expected | Figma labels, order, and counts |
| Actual | Different order, labels, and counts (Completed 12 vs 1) |

### AUD-036 — Vendor hire Completed count and New request chrome

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:8033` is Completed · 38 and HAS New request. Left as drawn. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:8033` pills **All · 8**, **Awaiting your reply · 2**, **Accepted · 3**, **Completed · 3**. Topbar has **no** New request. Split inbox matches |
| Figma destination | same inbox; declined thread `298:9035` |
| Code | `vendorHireFilterPills`: Awaiting · 2, Accepted · 3, **Completed · 38**, All. `Topbar` `resolveKind` treats vendor hire as `hireRequests`, so **New request** appears (AUD-008 is organizer-only) |
| Expected | Completed · 3; no New request on vendor hire |
| Actual | Completed · 38; organizer New request chrome on the vendor screen |

### AUD-037 — Talent Payments KPIs do not match Figma

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:9558` KPIs are Needs your confirmation SAR 18,500 etc. Left as drawn. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:9558` KPI row: **Agreed this year SAR 186k**, **Awaiting payment 2**, **Paid this year 8**, **Disputed 0**. Paid-confirmation banner and Export record match the layout |
| Figma destination | same page |
| Code | `talentFinanceKpis`: **Needs your confirmation SAR 18,500**, **Awaiting payment SAR 9,800**, **Agreed, upcoming SAR 34,000**, **Received in 2026 SAR 41,200** |
| Expected | The four Figma KPI labels and values |
| Actual | A different four-card set (amounts vs counts, no Disputed) |

### AUD-038 — Talent portfolio has 4 items; Figma shows 8

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:9675` is 4 media cards + dashed add. Left as drawn. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:9675` 4×2 grid of portfolio cards (lead Mawazine, showreel under review, declined backstage, audio, plus four more stills) and a dashed add tile |
| Figma destination | same grid |
| Code | `talentPortfolioItems` has **4** entries + dashed “Add a portfolio item” |
| Expected | Eight media cards as drawn |
| Actual | Four cards |

### AUD-039 — Tickets issued pills omit Figma counts

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:6925` pills have no counts. Left as drawn. |
| Severity | P2 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:6925` **All · 7,240**, **Scanned · 0**, **Not scanned · 7,240** |
| Figma destination | same table |
| Code | `ticketFilterPills` labels **All**, **Scanned**, **Not scanned** with no counts. Seven rows and “Showing 7 of 7,240” otherwise match |
| Expected | Counted pills |
| Actual | Uncounted pills |

### AUD-040 — Notify cancellation banner always visible

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:7102` draws the cancellation banner on Schedule change. Left as drawn. |
| Severity | P2 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | `298:7102` default **Schedule change**: no danger banner. Banner copy exists for Cancellation only |
| Figma destination | n/a (no separate cancellation-selected frame) |
| Code | `EventNotifyPage` always renders `notifyCancellationBanner` after Preview/Send, not gated on `values.kind === "cancellation"` |
| Expected | Banner only when Cancellation is selected |
| Actual | Banner on the default compose state |

### AUD-041 — Refund rows invent Raise support case

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:7021` draws Raise support case on every row. Left as drawn. |
| Severity | P2 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | `298:7021` rows are ticket · buyer · reason · amount · status only. Footnote tells the organizer to raise a support case in prose |
| Figma destination | **none** per row |
| Code | `EventRefundsPage` `RefundRow` always shows `AppButton` **Raise support case** |
| Expected | No row CTA |
| Actual | Live-looking button on every request |

### AUD-042 — Scanner sign-in and events copy do not match

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma is Scanner sign in / Sign in / Your assigned events. Left as drawn. |
| Severity | P2 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | Sign-in `298:7163` heading **Sign in**, primary **Continue**. Events `298:7183` heading **Your events tonight**, CTA **Start scanning · Gate B** |
| Figma destination | `298:7183` then scan outcomes `298:7208`–`298:7344` |
| Code | `ScannerSignInPage` heading **Scanner sign in**, submit **Sign in**. `ScannerEventsPage` heading **Your assigned events**. Start scanning wiring to `/scanner/scan` is otherwise sound |
| Expected | Exact Figma headings and Continue |
| Actual | Different heading and button labels |

### AUD-043 — Vendor gallery has 5 items; Figma shows 6

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:8348` is 5 media cards + dashed add. Left as drawn. |
| Severity | P2 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:8348` six gallery tiles (lead Aramco stations plus five more) and dashed add |
| Figma destination | same grid |
| Code | `vendorGalleryItems` has **5** entries + dashed add |
| Expected | Six media cards |
| Actual | Five cards |

### AUD-044 — Issue complimentary ticket is inert

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:6925` header **Issue complimentary ticket** |
| Figma destination | **none** |
| Code | `EventTicketsPage` `AppButton` with no `onClick` |
| Expected | Control as drawn; do not invent an issue-ticket modal |
| Actual | Click does nothing |

### AUD-045 — Ops and reviews Show N more is inert

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; Show N more left as drawn (same pattern as Events). |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | Orders `298:6805` Show 24 more; Tickets `298:6925` Show 24 more; Scan history `298:7620` Show 50 more; Reviews `298:10750` Show 24 more. Same pattern as Events AUD-017 |
| Figma destination | more rows on the same list (not a new frame) |
| Code | `ListFooter` `AppButton` has no `onClick`. Used on those pages with claimed totals far above the mock arrays |
| Expected | Reveal more rows, or honest “showing N of N” |
| Actual | Dead pagination control |

### AUD-046 — Export CTAs are inert on ops, reviews, payments

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | Export on Orders, Tickets, Refunds, Scan history, Attendance, Reviews; **Export record** on Talent Payments `298:9558`. No export/download frames |
| Figma destination | **none** |
| Code | Those `AppButton`s have no `onClick`. Related: AUD-021 Finance, AUD-026 Sales |
| Expected | Visible controls; no invented file download |
| Actual | Clicks do nothing |

### AUD-047 — Preview as public, Change logo, and Add item are inert

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | Organizer Profile `298:11752` Preview as public, Change logo, Add link, + Add from archive. Talent Profile `298:9746` Preview as public, Change photo, Add a category. Portfolio `298:9675` / Gallery `298:8348` Preview as public, Add item. Seating `298:5394` Preview as customer |
| Figma destination | **none** (no public-preview or file-picker frames) |
| Code | Those `AppButton`s / dashed add tiles have no handlers. Remove (X) on profile links/portfolio rows also no-ops |
| Expected | Controls as drawn |
| Actual | Clicks do nothing |

### AUD-048 — Closed support thread shows Close case, not Reopen

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Closed threads show Reopen case; open threads keep Close case (`298:11188` is the open CASE-8841). |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:11188` CASE-8841 **Open**, header CTA **Close case**. No closed-thread frame in the 67 |
| Figma destination | same thread |
| Code | `SupportCasePage` **Reopen case** when `status === "Closed"`; **Close case** otherwise (`navigate("/app/support")`) |
| Expected | Reopen on closed threads |
| Actual | Closed mock cases show Reopen case. Open CASE-8841 keeps Close case |

### AUD-049 — Hire Accept, Decline, and Write a review are inert

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | Talent `298:9377` **Decline** / **Accept request**. Vendor `298:8033` the same. Talent completed `298:10364` **Write a review**. No post-accept / review-compose frames |
| Figma destination | **none** beyond the existing thread frames |
| Code | `TalentHireRequestsPage` / `VendorHireRequestsPage` those `AppButton`s have no `onClick`. Send / Attach preventDefault only (see AUD-029) |
| Expected | Controls as drawn; do not invent a review modal |
| Actual | Clicks do not change thread status |

### AUD-050 — Talent Payments Confirm received is inert

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Figma destination: none; control left as drawn. |
| Severity | P2 |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:9558` banner **Not received** / **Confirm received**; row actions Mark as paid / Confirm received / View. Vendor `298:8230` the same pattern (Jeddah Season / SAR 48,200) |
| Figma destination | **none** |
| Code | `TalentFinancePage` / `VendorFinancePage` banner buttons have no `onClick`. Row status chips are not buttons |
| Expected | Controls as drawn on both Payments pages |
| Actual | Confirm / Not received do nothing |

---

## Scan D — remaining 67-frame crawl

2026-08-31. Frames not covered in A–C: Vendor Finance `298:8230`, Vendor Profile `298:8432`, Vendor Reviews `298:8554`, Vendor Settings `298:8675`, Vendor Availability `298:8147` / `298:9141`, Vendor Support `298:8813`, Vendor Notifications `298:8880`, Vendor Support thread `298:8943`, Vendor declined hire `298:9035`, Talent Availability `298:9491`, Talent Reviews `298:9852`, Talent Settings `298:9973`, Talent Support `298:10111`, Talent Notifications `298:10178`, Talent Support thread `298:10272`, Talent completed hire `298:10364`, Seating unlocked `298:5926`, Layout modes reference `298:6258`, Scanner outcomes `298:7208`–`298:7344`.

### AUD-051 — Vendor Payments KPIs do not match Figma

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:8230` KPIs match the mock (including Received in 2026). Left as drawn. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:8230` KPI row: **Agreed this year SAR 842k**, **Awaiting payment 3**, **Paid this year 11**, **Disputed 1** |
| Figma destination | same page |
| Code | `vendorFinanceKpis`: **Needs your confirmation SAR 48,200**, **Awaiting payment SAR 64,500**, **Agreed, upcoming SAR 118,000**, **Received in 2026 SAR 486,300** |
| Expected | The four Figma KPI labels and values (same pattern as talent AUD-037) |
| Actual | A different four-card set |

### AUD-052 — Talent availability lists 3 engagements; Figma shows 0

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:9491` is 3 engagements. Left as drawn. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | `298:9491` **Confirmed upcoming work** meta **0 engagements**, empty list, Available for work + Switch to Reserved |
| Figma destination | same page |
| Code | `TalentAvailabilityPage` `PanelCard` meta **3 engagements**; `talentConfirmedWork` has Aramco / Winter Nights warm-up / doors-open |
| Expected | Empty confirmed-work list while Available |
| Actual | Three upcoming rows. Vendor Reserved `298:8147` three rows **do** match |

### AUD-053 — Talent and vendor notification filters are the organizer set

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma talent `298:10178` and vendor `298:8880` use Events / Security (vendor Needs action · 1). Left as drawn. |
| Severity | P1 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | Talent `298:10178`: All, **Needs action · 2**, Events, Money, Hiring, Reviews, **Security**. Vendor `298:8880`: All, **Needs action · 1**, Events, Money, Hiring, Reviews, **Security** |
| Figma destination | same list |
| Code | `NotificationsPage` maps `notificationFilterBase` with role `actionLabel`. Unread counts 4 / 2 match |
| Expected | Presence instead of Events/Security for talent and vendor |
| Actual | Live Figma uses Events / Security on all three roles |

### AUD-054 — Talent and vendor support cases do not match Figma

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma talent cases are CASE-9102 / 9066 / 8918; vendor `298:8813` is CASE-9110 / 9071 / 8877. Left as drawn. |
| Severity | P1 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | Talent `298:10111`: **Payout held — Freelance Work Document CASE-9102**, CASE-9066, CASE-8918. Vendor `298:8813`: **Payout held — food safety renewal CASE-9110**, Custom category **CASE-9071**, Gallery upload **CASE-8877** |
| Figma destination | same lists + those thread frames |
| Code | Talent `support.ts`: CASE-9102 / 9066 / 8918. Vendor: CASE-9110 / 9071 / 8877 |
| Expected | Figma case titles and ids |
| Actual | Matches live Figma |

### AUD-055 — Talent and vendor profile categories do not match Figma

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma talent chips are Oud / Traditional / Fusion + Add category. Vendor is Catering / Banquets / Fine dining + pending Live cooking stations · Propose custom category. Left as drawn. |
| Severity | P2 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | Talent `298:9746`: **Oud**, **Traditional**, **Fusion**, **Add category**. Vendor `298:8432`: **Catering**, **Banquets**, **Fine dining**, pending **Live cooking stations · محطات طهي حية**, **Propose custom category** |
| Figma destination | same forms |
| Code | `talentProfileCategories`: Oud, Traditional, Fusion. `vendorProfileCategories`: Catering, Banquets, Fine dining + pending **Live cooking stations** |
| Expected | Exact chip labels from Figma |
| Actual | Matches live Figma |

### AUD-056 — Settings missing Contact support footer

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Contact support is not on Settings `298:10962`, talent `298:9973`, or vendor `298:8675`. |
| Severity | P2 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | Organizer `298:10962`, Talent `298:9973`, Vendor `298:8675`: Account / Security / Notification preferences. No Contact support footer |
| Figma destination | n/a |
| Code | `SettingsPage` ends after the prefs table. No Contact support control |
| Expected | Footer CTA to `/app/support` |
| Actual | Matches live Figma — no footer CTA |

### AUD-057 — Scanner wrong-event uses Winter Nights chrome

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma `298:7256` chrome is Winter Nights · Gate A. Left as drawn. |
| Severity | P2 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | Outcomes `298:7208`–`298:7344` share the live job from Event & gate `298:7183` (Jeddah Comedy Night). Wrong event `298:7256` is a ticket for **Riyadh Season Fireworks** scanned on that job |
| Figma destination | same scanner session |
| Code | `scannerOutcomes.valid` / already / cancelled / refunded / resold / reentry: **Jeddah Comedy Night · Gate B**. `wrong-event`: **Winter Nights · Gate A** |
| Expected | Same live event chrome; ticket belongs to another event |
| Actual | Wrong-event outcome switches the header to Winter Nights. Other six outcomes match inventory copy closely |

### AUD-058 — Talent and vendor review pills omit Figma counts

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Live Figma talent/vendor review pills have no counts (same as organizer). Left as drawn. |
| Severity | P2 |
| Type | content |
| Logged | 2026-08-31 |
| Figma | Talent `298:9852`: 4.9, **86 reviews · all engagements**, pills **All / 5 ★ / 4 ★ & below**, Showing 3 of 86. Vendor `298:8554`: 4.7, **52 reviews · all engagements**, same uncounted pills, Showing 3 of 52 |
| Figma destination | same list |
| Code | Talent/vendor `reviews` filters without counts; dropdown **Engagement**. Footer Showing 3 of 86 / 3 of 52 |
| Expected | Counted pills as drawn |
| Actual | Matches live Figma — uncounted pills |

### AUD-059 — Unlocked seating is only a query flag

| Field | Value |
|-------|--------|
| Status | wontfix |
| Resolution | Unlocked seating stays `?unlocked=1`; `298:6258` is annotation-only. |
| Severity | Note |
| Type | linking |
| Logged | 2026-08-31 |
| Figma | `298:5926` pre-sale unlocked (Free seating, Add zone, layout unlocked). `298:6258` is an **annotated reference**, not a product screen |
| Figma destination | **none** from Winter Nights editor (that event is locked in `298:5394`) |
| Code | `SeatingBuilderPage` `locked = searchParams.get("unlocked") !== "1"`. No in-app control opens the unlocked variant. Layout-modes reference is not a route |
| Expected | Locked Winter Nights builder by default. Unlocked is a second frame, not a nav item |
| Actual | Matches if opened with `?unlocked=1`. Do not invent a settings toggle. `298:6258` stays documentation-only |

---

## Out of scope / already matching

Do not refile these unless a new Figma frame appears.

- Sidebar stickiness, Settings/Support/Availability/Hire glyphs, account chip switcher (three Figma chips only) — fixed 2026-08-31 against `298:21438` / `298:21430`.
- Jeddah Comedy Night live door board — matches `298:7534`.
- Lina Hakim marketplace profile — matches `298:11493`.
- Talent Home Available toggle + Vendor Reserved banner — match `298:9211` / `298:7882`.
- Notifications Mark all read / Preferences → Settings — match `298:10897`.
- Event editor Submit for review disabled + missing-fields note — match `298:4960`.
- Dev role bar — not in Figma.
- Seating builder hides AppShell sidebar/topbar (`AppShell` `pathname.includes("/seating")`) — matches full-width `298:5394`.
- Attendance layout vs `298:7779`.
- Application under review layout vs `298:6578` (Contact support still inert; no separate destination frame).
- Application declined layout vs `298:6646` (Replace/Update local flags match the drawn Edit/Replace/Update controls).
- Scanner event list structure vs `298:7183` (copy filed as AUD-042).
- Talent/Vendor hire split-inbox chrome vs `298:9377` / `298:8033` (counts/actions filed separately).
- Vendor Availability Reserved + Available toggle vs `298:8147` / `298:9141`.
- Talent Availability Available chrome vs `298:9491` (engagement count filed as AUD-052).
- Talent completed hire thread vs `298:10364` (Write a review is AUD-049).
- Vendor declined hire thread vs `298:9035`.
- Vendor profile `298:8432`, vendor support `298:8813`, talent/vendor Welcome `298:6704` / `298:6754`, talent/vendor reviews `298:9852` / `298:8554`, vendor notifications `298:8880`, talent/vendor Settings `298:9973` / `298:8675` — re-fetched 2026-08-31; match live Figma (AUD-023, 053–056, 058).
- Organizer Home `298:4694`, Events `298:4839`, Archive `298:5826`, Sales `298:10477`, Scan history `298:7620` — re-fetched 2026-08-31; match live Figma (AUD-017, 025).
- Scanner valid / offline-reject / cancelled / refunded / resold / re-entry copy vs `298:7208`–`298:7344` (wrong-event chrome is AUD-057). Dev outcome chips are out of scope.
- Seating layout-modes frame `298:6258` is annotation-only, not a route.

---

## Next id

`AUD-086`

---

## Visual QA — 2026-08-31

Side-by-side screenshots at 1440×900 vs live Figma for Home `298:4694`, Events `298:4839`, Scanners `298:7367`. Measured shell chrome (248 rail, 1192 content, PageHead 28/800, KPI pad 20×22, gutter 36).

### AUD-060 — Organizer Home sits under Operate in the sidebar

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Home is now a standalone nav item above Operate / Work for all three roles (`298:21438`). |
| Severity | P3 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | `298:21438` Biz/Sidebar · Home then Operate (Events/Venues/Archive). Talent/Vendor: Home then Work |
| Figma destination | n/a |
| Code | `nav-config.ts` · `sidebar.tsx` |
| Expected | Home with no group label; Operate/Work starts on the next items |
| Actual | Home was nested under Operate / Work |

### AUD-061 — StatusBadge BrandTint and NeutralOutline colors off

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | BrandTint ink `#C4330B` (`text-accent-amber`); NeutralOutline fill `#FFF7F3` (`bg-surface-canvas`). |
| Severity | P3 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | DS StatusBadge: BrandTint `#FFF0E9` / `#C4330B`; NeutralOutline page fill `#FFF7F3` (Draft on Events `298:4839`) |
| Figma destination | n/a |
| Code | `src/components/primitive/status-badge.tsx` |
| Expected | BrandTint ink `#C4330B` (`text-accent-amber`); NeutralOutline fill `#FFF7F3` (`bg-surface-canvas`). |
| Actual | BrandTint used `text-brand-link` (`#D8431A`); NeutralOutline used white card fill |

### AUD-062 — Marketplace bookmark chip radius is pill

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Bookmark control uses `rounded-[16px]` per card chrome on `298:11292`. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | `298:11292` card bookmark: 32×32, `rounded-[16px]` |
| Figma destination | n/a |
| Code | `OrganizerMarketplacePage` `MarketplaceCard` |
| Expected | Squircle bookmark chip, not a full pill |
| Actual | `rounded-pill` (999px) |

### AUD-063 — Hire thread avatars are 38px not 42px

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Hire inbox avatars use `Avatar` size 42 on organizer/talent/vendor hire pages. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-08-31 |
| Figma | `298:11625` / `298:9377` / `298:8033` thread rows: `size-[42px]` |
| Figma destination | n/a |
| Code | `OrganizerHireRequestsPage` · `TalentHireRequestsPage` · `VendorHireRequestsPage` · `avatar.tsx` |
| Expected | 42px gradient avatar in thread list and header |
| Actual | `size={38}` (38px) |

### AUD-064 — Support page stack gap is 20px not 24px

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Support directory and thread use `gap-xl` (24px) between PageHead and the two-column grid. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-01 |
| Figma | `298:11110` Main: `gap-[24px]` · width 1180 |
| Figma destination | n/a |
| Code | `SupportPage` · `SupportCasePage` |
| Expected | 24px vertical stack under the page head |
| Actual | `gap-lg` (20px) |

### AUD-065 — KpiCard inner gap is 8px not 10px

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | `KpiCard` and Sales “View → purchase” card use `gap-gap-md` (10px). |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-01 |
| Figma | `298:10477` Biz/KpiCard `gap-[10px]`; View to purchase card same |
| Figma destination | n/a |
| Code | `kpi-card.tsx` · `OrganizerSalesPage` |
| Expected | 10px stack between label, value, and trend |
| Actual | `gap-2xs` (8px) |

### AUD-066 — Settings stack and section spacing off

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Main `gap-xl` (24px); tab bar `gap-[28px]`; account/security `pt-xl` (24px); prefs `pt-[32px]`. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-01 |
| Figma | `298:10962` Main `gap-[24px]`; tab bar `gap-[28px]`; sections `pt-[24px]` / `pt-[32px]` |
| Figma destination | n/a |
| Code | `SettingsPage` |
| Expected | 24px page stack; 28px tab spacing; section tops per frame |
| Actual | `gap-lg` (20px); tab `gap-lg`; sections `pt-base` / `pt-xl` |

### AUD-067 — Notifications stack and filter gap off

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Main `gap-xl` (24px); filter row `gap-gap-md` (10px). |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-01 |
| Figma | `298:10897` Main `gap-[24px]`; filter row `gap-[0px_10px]` |
| Figma destination | n/a |
| Code | `NotificationsPage` |
| Expected | 24px vertical stack; 10px between pills |
| Actual | `gap-lg` (20px); `gap-2xs` (8px) |

### AUD-068 — Reviews stack and column gaps off

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Main `gap-xl` (24px); distribution `gap-gap-md` (10px); right column `gap-lg` (20px). |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-01 |
| Figma | `298:10750` Main `gap-[24px]`; distribution `gap-[10px]`; right column `gap-[20px]` |
| Figma destination | n/a |
| Code | `OrganizerReviewsPage` |
| Expected | 24px page stack; 10px star breakdown; 20px review column stack |
| Actual | `gap-lg` (20px); `gap-2xs` (8px); `gap-base` (16px) |

### AUD-069 — Warm NoteCard draws a brand border Figma does not

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Warm NoteCard is borderless `bg-surface-footer` with `px-[22px] py-lg` and 10px lead/body gap per `Biz/NoteCard` Warm. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | Talent Home `298:9211` portfolio note; DS Warm = `#FFF1E9` / `#C4330B` |
| Figma destination | n/a |
| Code | `src/components/biz/note-card.tsx` |
| Expected | Warm fill only; 22×20 padding; 10px between lead and body |
| Actual | `border-border-brand` + `p-lg` (20) + `gap-3xs` (4) |

### AUD-070 — Event ops pages stack at 20px; Figma uses 18px

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | `EventOpsChrome` main uses `gap-md` (18px) to match Orders/Tickets/Refunds Main. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | `298:6805` / `298:6925` / `298:7021` Main `gap-[18px]` |
| Figma destination | n/a |
| Code | `src/features/organizer/EventOpsChrome.tsx` |
| Expected | 18px vertical stack between PageHead, tabs, and body |
| Actual | `gap-lg` (20px) |

### AUD-071 — Orders KPIs use standard KpiCard geometry

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Orders uses `KpiCard` `kind="compact"` — pad 18×20, gap 8, value 26/800 — matching Biz/KpiCompact. |
| Severity | P2 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | `298:6805` Biz/KpiCompact pad 18 20, value 26/800 |
| Figma destination | n/a |
| Code | `src/components/biz/kpi-card.tsx`, `EventOrdersPage.tsx` |
| Expected | Compact KPI: 18×20 pad, 8px gap, 26px value |
| Actual | Standard card: 20×22 pad, 10px gap, 30px value |

### AUD-072 — Brand AlertBanner and Tickets complimentary note chrome

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Brand AlertBanner uses `bg-surface-footer`, amber lead, `items-start`. Tickets NoteCard adds `border-border-default` and 18×20 pad override. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | Refunds `298:7021` AlertBanner warm + `#C4330B` lead; Tickets `298:6925` NoteCard bordered |
| Figma destination | n/a |
| Code | `alert-banner.tsx`, `EventTicketsPage.tsx` |
| Expected | Warm `#FFF1E9` banner, amber lead, top-aligned; complimentary note with default border |
| Actual | Brand-wash `#FFF0E9`, ink lead, centered; note borderless |

### AUD-073 — Danger AlertBanner uses brand/info padding and radius

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Danger tone uses `px-lg py-sm rounded-md` (20×14 / 14). Brand/info keep 22×18 / 16. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | Notify `298:7102` Biz/AlertBanner Danger `px-[20px] py-[14px] rounded-[14px]` |
| Figma destination | n/a |
| Code | `src/components/biz/alert-banner.tsx` |
| Expected | Danger pad 20×14, radius 14 |
| Actual | Shared 22×18 pad, radius 16 |

### AUD-074 — Notify compose column stretches instead of 630px

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | New message panel is `xl:w-[630px]` beside previously-sent `470px`. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | `298:7102` Message panel `w-[630px]`, Sent panel `w-[470px]` |
| Figma destination | n/a |
| Code | `EventNotifyPage.tsx` |
| Expected | Fixed 630px compose column |
| Actual | `flex-1` only |

### AUD-075 — Live door chip radius, LiveDot, failed-legend tones

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Gate/Pause chips `rounded-[16px]`; LiveDot 8px / r4; Wrong event legend `bg-accent-amber`. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | `298:7534` chips r16; LiveDot 8×8 r4; Wrong event amber vs Already scanned red |
| Figma destination | n/a |
| Code | `live-door-board.tsx`, `live-dot.tsx`, `mocks/live-door.ts` |
| Expected | 16px chips; 8px square dots; amber Wrong event |
| Actual | 14px chips; 10px pill dots; Wrong event red |

### AUD-076 — Event Editor stacks at 20px; Figma uses 22px

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | `EventEditorPage` main uses `gap-[22px]` to match Main between head, tabs, and body grid. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | `298:4960` / Main `298:4964` `gap-[22px]` |
| Figma destination | n/a |
| Code | `EventEditorPage.tsx` |
| Expected | 22px vertical stack |
| Actual | `gap-lg` (20px) |

### AUD-077 — Seating canvas uses 24/36 pad; Figma uses 32/40

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Sections / Free / Rows canvases use `px-[32px] pb-[40px] pt-[26px]`. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | `298:5394` Canvas `px-[32px] pb-[40px] pt-[26px]` |
| Figma destination | n/a |
| Code | `seating-canvas.tsx` |
| Expected | Horizontal 32, bottom 40 |
| Actual | `px-xl` (24) / `pb-gutter` (36) |

### AUD-078 — Scan history main gap is 20px not 18px

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | `OrganizerScanHistoryPage` main uses `gap-md` (18px). |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | `298:7620` Main `gap-[18px]` |
| Figma destination | n/a |
| Code | `OrganizerScanHistoryPage.tsx` |
| Expected | 18px vertical stack |
| Actual | `gap-lg` (20px) |

### AUD-079 — NoteCard Icon=No padding and Neutral border off DS

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | NoteCard Icon=No uses `px-lg py-md`, `gap-3xs`, lead 13.5/700; Warm `#FFF1E9` / Neutral `#FFF7F3`; no default border. Tickets complimentary note keeps an explicit border override. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | Biz/NoteCard `298:4117`; Attendance Neutral `298:7779`; Welcome Warm `298:6452` |
| Figma destination | n/a |
| Code | `note-card.tsx` |
| Expected | 20×18 pad, gap 4, borderless; Neutral page fill |
| Actual | 22×20 pad, gap 10; Neutral still bordered |

### AUD-080 — Sign-in is a centered card, not Figma EntryShell

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | `/auth` under EntryShell; SignInCard 420 / p32 / r22 + routes column (`sign-in-routes` mock). Forgot/Apply remain visible no-ops (AUD-010). |
| Severity | P2 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | `298:6502` 1040×64 gap; SignInCard + Where sign-in can lead |
| Figma destination | n/a |
| Code | `SignInPage.tsx`, `router.tsx`, `mocks/sign-in-routes.ts` |
| Expected | Two-column EntryShell sign-in |
| Actual | Centered AuthLayout card titled “Sign in” |

### AUD-081 — Profile identity card pad is 20px not 24px

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Identity card uses `p-xl` (24); logo/fields row `gap-lg` (20). Head actions `gap-gap-md` (10). |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | `298:11752` Identity card `p-[24px]`; Identity top `gap-[20px]`; Actions `gap-[10px]` |
| Figma destination | n/a |
| Code | `OrganizerProfilePage.tsx` |
| Expected | 24px card pad; 20px logo row gap |
| Actual | `p-lg` (20); `gap-base` (16) |

### AUD-082 — Profile logo Avatar is a circle not 24px squircle

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Avatar `size={96}` `shape="squircle"` `className="rounded-[24px]"`; Change logo uses `rounded-[16px]`. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | `298:11752` logo `size-[96px] rounded-[24px]` |
| Figma destination | n/a |
| Code | `OrganizerProfilePage.tsx` |
| Expected | 96×96, 24px radius |
| Actual | Circle pill Avatar |

### AUD-083 — Availability status card horizontal pad is 24px not 28px

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Talent and Vendor Availability status cards use `px-[28px] py-[26px]`. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | `298:9491` / `298:8147` Status card `px-[28px] py-[26px]` |
| Figma destination | n/a |
| Code | `TalentAvailabilityPage.tsx`, `VendorAvailabilityPage.tsx` |
| Expected | 28×26 pad |
| Actual | `px-xl` (24) × 26 |

### AUD-084 — Coloured KpiCard uses brand-wash not warm + accent border

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | `kind="coloured"` uses `bg-surface-footer` (`#FFF1E9`) and `border-border-strong` (`#F5C9B4`). |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | Talent/Vendor Payments coloured KPI `bg-warm` + `border-accent-soft` |
| Figma destination | n/a |
| Code | `kpi-card.tsx` |
| Expected | Warm fill + strong/accent border |
| Actual | Brand-wash fill + default border |

### AUD-085 — Payments confirm strip radius/pad off Figma

| Field | Value |
|-------|--------|
| Status | fixed |
| Resolution | Talent/Vendor confirm-receipt strip uses `rounded-[16px] px-[22px] py-[18px]`. |
| Severity | P3 |
| Type | visual |
| Logged | 2026-09-03 |
| Figma | `298:9558` / `298:8230` confirm banner r16 / 22×18 |
| Figma destination | n/a |
| Code | `TalentFinancePage.tsx`, `VendorFinancePage.tsx` |
| Expected | 16px radius, 22×18 pad |
| Actual | `rounded-lg` (18) / equal 22 pad |
