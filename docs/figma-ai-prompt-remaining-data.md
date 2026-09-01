# Figma AI prompt — remaining design-system data

Paste everything below the line into Figma AI.  
**Scope:** MyTicket business page (`177:2037`), Design System page, Scanner frames only.  
**Do not** include MyTicket Guests or MyTicket Mobile App.

---

You are acting as a Design Systems Architect. We already have a completed design-system audit and specification for this file. Do **not** repeat colors, typography scales, spacing tokens, radius tokens, shadows, or the full 68-component dump.

Your job is to extract **only the missing facts** listed below so we can finish the React implementation spec.

**Rules:**

* Do not modify the Figma file.
* Do not invent UI, tokens, or components that are not in the file.
* Clearly separate: **Existing fact** / **Inferred from usage** / **Not found in this file**.
* If something does not exist, write `NOT FOUND` — do not recommend a new design unless asked at the end as a one-line note.
* Prefer component property names, variant names, and exact text strings as they appear in Figma.
* Include node IDs for every component set and every sidebar/nav instance you cite.

---

## 1. Business sidebar — exact navigation

Inspect `Biz/Sidebar` (all role variants: Organizer, Talent, Vendor).

For **each role** report:

* Component node ID
* Variant property values
* Brand/header block contents (exact strings)
* Footer contents (exact strings)
* Every nav **group header** (exact label, order)
* Every nav **item** in order:

  * Exact label
  * Icon instance name (and component name if it is an icon component)
  * Default vs Active appearance
  * Whether `ShowCount` / `Biz/NavCount` is used
  * Count tone if present (`Hot` | `Neutral`)
  * Whether the item is a section header vs a destination

State the destination count per role (we expect Organizer 15 / 5 groups, Talent 9 / 4, Vendor 9 / 4 — confirm or correct).

List items that appear only on one role.

---

## 2. Topbar — exact contents

Inspect `Biz/Topbar` (all 4 kinds: Base, MainWebsite, EditorMeta, HireRequests).

For each kind:

* Node ID
* Exact slots/properties (Crumb, Current, BellCount, Initials, etc.)
* Which actions/icons are visible
* Breadcrumb pattern (exact example strings from instances on business frames)
* What “MainWebsite” means in the UI (exact link label)

---

## 3. StatusBadge taxonomy — product states → 9 tones

Inspect `StatusBadge` and every instance on the MyTicket business page.

The 9 tones we already know:

`BrandTint` | `UrgentSolid` | `Terminal` | `NeutralOutline` | `LiveSolid` | `SuccessTint` | `Inactive` | `InfoTint` | `DangerTint`

Produce a complete table:

| Exact badge label (string) | Tone variant | Screens / features where it appears | Count of instances |

Do not merge labels that differ by wording. Include empty/unused tones if a tone exists but has no business-page instances.

---

## 4. Missing input and overlay components

Search the **Design System** page and business frames for these. For each, answer exists / does not exist:

* Select / Combobox / Dropdown field
* Textarea
* Date picker / Date field
* Time picker
* File upload / image upload (beyond `Biz/HatchPlaceholder`)
* Table (and table row / header / pagination)
* Pagination
* Modal / Dialog
* Drawer / Sheet
* Popover
* Tooltip
* Dropdown menu
* Tabs (beyond `Tabs`, `Biz/UnderlineTab`, `Biz/EventTabBar`)

If it **exists**, document:

* Component name, node ID, variants, states, sizes, key properties, Auto Layout summary
* Whether it is a component set or only a local frame pattern

If it is **only a repeated local pattern** (not a component), say so and list 2–3 example frame node IDs.

---

## 5. Icon inventory

Inspect the icon library used by business and scanner frames.

Report:

* How icons are organized (component set name(s), page)
* Total icon count
* Naming convention
* Default sizes actually used (we expect 16 / 19 / 22 — confirm)
* Color binding (do they use ink/brand variables?)

Then list **every icon name** used on:

* `Biz/Sidebar` (all roles)
* `Biz/Topbar` (all kinds)
* P0 primitives (Button, SearchField, TextInput trailing icons)
* Scanner chrome

Format: `| Icon component name | Node ID | Typical size | Used on |`

---

## 6. EventTabBar and filter patterns

Inspect `Biz/EventTabBar`:

* Exact tab labels in order
* Which tabs show counts
* Example count values from instances

Inspect `Biz/FilterPill` and listing-page filter rows:

* Exact filter labels per major listing (Events, Orders, Tickets, Refunds, Hire Requests, Archive, Marketplace)
* Active vs idle rules (already known: gradient vs outline — confirm)

---

## 7. Forms — field inventory (no new design)

For these frames only, list every form field as it exists:

* Biz — Business Sign In (`298:6502`)
* Biz — Organizer Event Editor (`298:4960`)
* Biz — Organizer Notify (`298:7102`)
* Biz — Organizer Profile (`298:11752`)
* Biz — Business Settings (`298:10962`)
* Biz — Talent Profile (`298:9746`)
* Biz — Vendor Profile (`298:8432`)
* Biz — Scanner · Sign in (`298:7163`)

For each field:

* Label (exact)
* Control type (TextInput, Textarea, Select, Toggle, Checkbox, upload, etc.)
* Required / optional if indicated
* Helper / error / annotation text if present
* Prefilled example value if present

Do not invent validation rules. Only transcribe what the file shows.

---

## 8. Language, direction, locale

Search the business page and Design System for:

* Arabic copy
* RTL Auto Layout
* `dir` / text-direction notes
* Currency format beyond `SAR` / `PriceDisplay`
* Date format examples (exact strings)

Report **Existing fact** only. If the file is English LTR only, say `NOT FOUND` for Arabic/RTL.

---

## 9. Empty states, alerts, toasts

List every distinct:

* `EmptyState` instance (variant + exact title/body/CTA)
* `Biz/AlertBanner` / `Biz/AlertStrip` / `Biz/NoteCard` (tone + exact copy)
* `Toast` (tone + exact copy)

Include frame node IDs.

---

## 10. Table pattern (if no Table component)

If there is no Table component, reverse-engineer the repeated table from Organizer Events, Orders, Tickets, Archive:

* Column headers (exact, in order) per table
* Row height, cell typography, divider color
* Sort indicators if any
* Row hover/selected if designed
* Pagination UI (exact labels, page size if shown)

---

## 11. What we already have — do not redo

Do not rewrite:

* Color / type / spacing / radius / shadow token tables
* Full 36 typography style list
* Full Button / TextInput / Checkbox / Radio / Toggle specs we already documented
* The 67-frame inventory

You may **correct** any of the above if you find a factual error (wrong HEX, wrong variant name, wrong node). Put corrections in a short “Corrections” section at the top.

---

## Output format

Use this structure:

```text
# Remaining Design Data

## Corrections (if any)

## 1. Sidebar navigation
### Organizer
### Talent
### Vendor

## 2. Topbar

## 3. StatusBadge map

## 4. Input and overlay inventory

## 5. Icons

## 6. Event tabs and filters

## 7. Form field inventory

## 8. Locale / RTL

## 9. Empty states, alerts, toasts

## 10. Table patterns

## Not found
(bullet list)

## Open questions
(only items that exist in the file but are ambiguous)
```

End when the sections above are complete. Do not propose a new design system. Do not change the file.
