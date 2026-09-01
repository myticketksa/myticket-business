# Design audit

Living home for **Figma vs implementation** issues on MyTicket Business.

Figma file: [Myticket Design (Copy)](https://figma.com/design/01NeAlswemvtbpPM3pCed7/) (`01NeAlswemvtbpPM3pCed7`). Frame inventory: [`docs/MyTicket-Business-Frames.md`](../MyTicket-Business-Frames.md). Token/structure snapshot (not a bug list): [`docs/DESIGN_SYSTEM_AUDIT.md`](../DESIGN_SYSTEM_AUDIT.md).

## Files

| File | Purpose |
|------|---------|
| [`ISSUES.md`](./ISSUES.md) | Combined issue register (AUD-001…). Append new findings here. |
| [`PHASES.md`](./PHASES.md) | **Process later.** All open issues grouped into phases. Work from this file. |

Do not scatter new design bugs in chat, canvases, or other `docs/` files. File them in `ISSUES.md` first, then add the id to the matching phase in `PHASES.md`.

## How to file a future issue

1. Confirm it on a **named Figma frame** (node id required). If Figma never drew the open state, modal, or destination page, mark **Figma destination: none** — do not invent UI.
2. Confirm it in **code or a live click** (file path, route, or CTA label).
3. Append a new `AUD-NNN` block at the bottom of `ISSUES.md` and a row in the index table.
4. Use the next free id (do not reuse).
5. Set status `open`. Change to `fixed` only after the Figma node and the live UI match; `wontfix` only with a one-line reason.

### Template

```md
### AUD-NNN — short title

| Field | Value |
|-------|--------|
| Status | open |
| Severity | P1 / P2 / P3 / Note |
| Type | visual / content / linking / a11y |
| Logged | YYYY-MM-DD |
| Figma | \`node-id\` Frame name |
| Figma destination | frame / **none** |
| Code | \`path\` · route |
| Expected | What the Figma frame shows |
| Actual | What the app does |
```

## Severity

- **P1** — Wrong or missing content that Figma shows, or an a11y blocker on a primary screen.
- **P2** — CTA looks active but does nothing; empty route that Figma filled for a *different* entity; layout structure off.
- **P3** — Spacing, chrome, hatch vs photo, icon family.
- **Note** — Matches Figma as a closed/static control; not a product bug unless a new frame appears.

## Rules

- Do not invent modals, menus, or pages that are not in the 67-frame set.
- Closed dropdowns, Forgot password, and Apply are **Notes** when Figma has the control and no follow-up frame.
- Dev-only chrome (`Dev role` bar) is out of scope.
