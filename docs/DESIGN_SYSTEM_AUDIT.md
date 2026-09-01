# MyTicket Business — Design System Audit

> **UI bug register (Figma vs code):** [`docs/Audit/ISSUES.md`](./Audit/ISSUES.md) — file new design issues there.  
> **Scope:** MyTicket Business portal (Organizer, Talent, Vendor), Scanner App, Design System page.
> **Excluded:** MyTicket Guests (52 consumer screens), MyTicket Mobile App (58 screens).
> **Date:** 2026-08-30
> **File:** Myticket Design (Copy) — `01NeAlswemvtbpPM3pCed7`

---

## 01. Project Structure

### File Pages

| Page | Purpose |
|------|---------|
| Showcase | Marketing/presentation page |
| MyTicket Guests | Consumer-facing screens (EXCLUDED) |
| **MyTicket business** | Business portal screens (IN SCOPE) |
| MyTicket Mobile App | Native mobile app (EXCLUDED) |
| Design System | Component library and token definitions |

### Business Page Sections (page `177:2037`)

| Section | Frames | Platform |
|---------|--------|----------|
| 00 · Entry & Account | 6 | Desktop 1440px |
| 01 · Organizer — Home & Events | 8 | Desktop 1440px |
| 02 · Organizer — Event Operations | 4 | Desktop 1440px |
| 03 · Organizer — Door & Attendance | 4 | Desktop 1440px |
| 04 · Organizer — Grow & Money | 2 | Desktop 1440px |
| 05 · Organizer — Hire & Marketplace | 3 | Desktop 1440px |
| 06 · Organizer — Account | 1 | Desktop 1440px |
| 07 · Talent | 12 | Desktop 1440px |
| 08 · Vendor | 13 | Desktop 1440px |
| 09 · Shared Templates | 5 | Desktop 1440px |
| 10 · Scanner App | 9 | Mobile 390×844 |
| **Total** | **67 frames** | |

### Layout Architecture

- **Business portal:** 248px sidebar + 1192px content area (topbar + main)
- **Full page width:** 1440px
- **Topbar height:** 64px with backdrop blur
- **Scanner app:** 390×844px (iPhone 14 viewport)

### Role-Based Navigation

| Role | Nav Destinations | Group Headers |
|------|-----------------|---------------|
| Organizer | 15 | 5 |
| Talent | 9 | 4 |
| Vendor | 9 | 4 |

---

## 02. Color System

### Variable Collection

| Collection | Variables | Modes | Mode Names |
|-----------|-----------|-------|------------|
| MyTicket | 71 | 1 | Mode 1 |

### Color Variables (52 total)

#### Surface / Background (13 variables)

| Variable | HEX | Semantic Usage |
|----------|-----|---------------|
| `surface/canvas` | #FFF7F3 | Page background |
| `surface/card` | #FFFFFF | Card/panel background |
| `surface/tint` | #FFF8F4 | Subtle warm highlight |
| `surface/footer` | #FFF1E9 | Footer/chip background |
| `surface/chip` | #FFF1E9 | Chip/pill background |
| `surface/brand-wash` | #FFF0E9 | Brand-tinted background |
| `surface/inverse` | #191008 | Dark surface (toasts) |
| `surface/skeleton` | #FFE2D0 | Skeleton loading base |
| `surface/skeleton-alt` | #FFC0A0 | Skeleton shimmer |
| `surface/sold` | #F7E9E1 | Sold-out overlay |
| `surface/featured-from` | #FFF2EA | Featured gradient start |
| `surface/featured-mid` | #FFE6D8 | Featured gradient mid |
| `surface/featured-to` | #F4E9FF | Featured gradient end |

#### Ink / Text (6 variables)

| Variable | HEX | Semantic Usage |
|----------|-----|---------------|
| `ink/primary` | #191008 | Primary text, headings |
| `ink/body` | #3A2418 | Body text |
| `ink/muted` | #6B5F58 | Secondary/muted text |
| `ink/faint` | #8E8078 | Tertiary/hint text |
| `ink/disabled` | #C0AEA4 | Disabled text |
| `ink/inverse` | #FFF7F3 | Text on dark surfaces |

#### Border (5 variables)

| Variable | HEX | Semantic Usage |
|----------|-----|---------------|
| `border/default` | #F3DED2 | Standard borders |
| `border/strong` | #F5C9B4 | Emphasized borders |
| `border/subtle` | #F7E9E1 | Hairline dividers |
| `border/brand` | #FFC8AE | Brand accent borders |
| `border/featured` | #F7DFD3 | Featured section borders |

#### Brand (11 variables)

| Variable | HEX | Semantic Usage |
|----------|-----|---------------|
| `brand/primary` | #F25F2C | Primary brand color |
| `brand/strong` | #E0451A | Strong brand / gradient end |
| `brand/deep` | #B8320F | Deep brand accent |
| `brand/light` | #FF9147 | Light brand / gradient start |
| `brand/link` | #D8431A | Interactive links |
| `brand/hover` | #B8320F | Link hover state |
| `brand/gradient-from` | #FF9147 | Gradient start |
| `brand/gradient-to` | #E0451A | Gradient end |
| `brand/gradient-deep` | #C4330B | Deep gradient variant |
| `brand/visa` | #1A2B7B | Visa brand |
| `brand/tabby` | #70F6B5 | Tabby BNPL brand |

#### Accent & Tier (10 variables)

| Variable | HEX | Semantic Usage |
|----------|-----|---------------|
| `accent/amber` | #C4330B | Amber accent |
| `accent/amber-light` | #FFC0A0 | Amber light |
| `tier/vip` | #5A18C4 | VIP tier |
| `tier/vip-light` | #EEDCFF | VIP background |
| `tier/gold` | #C4330B | Gold tier |
| `tier/gold-light` | #FFE2D0 | Gold background |
| `tier/gold-ink` | #8A2A08 | Gold text |
| `tier/silver-light` | #FFF1E9 | Silver background |
| `tier/bronze` | #4E6C8B | Bronze tier |
| `tier/bronze-light` | #E5F0FC | Bronze background |

#### Third-Party, Tag, Badge, Bar, Zone (7+ variables)

| Variable | HEX |
|----------|-----|
| `brand/tabby-ink` | #0A2A20 |
| `brand/tamara` | #FFC7C5 |
| `brand/tamara-ink` | #3A0E14 |
| `tag/amber-wash` | #FFE2D0 |
| `tag/rose-wash` | #FDECEA |
| `tag/rose-ink` | #B8231A |
| `tag/brand-ink` | #C4330B |
| `badge/rose-wash` | #FDECEA |
| `badge/rose-ink` | #C4261B |
| `bar/brand-wash` | #FFF0E9 |
| `bar/brand-line` | #FFC8AE |
| `zone/amber-wash` | #FFF4EE |
| `zone/brand-wash` | #FFF0E9 |

### Top Fill Colors by Usage (Business Page)

| Rank | HEX | Usage Count | Likely Mapping |
|------|-----|-------------|---------------|
| 1 | #191008 | 2,610 | ink/primary |
| 2 | #FFFFFF | 1,430 | surface/card |
| 3 | #8E8078 | 996 | ink/faint |
| 4 | #6B5F58 | 702 | ink/muted |
| 5 | #B9ACA4 | 379 | ⚠️ No variable |
| 6 | #F25F2C | 372 | brand/primary |
| 7 | #C4330B | 323 | accent/amber |
| 8 | #FFF7F3 | 283 | surface/canvas |
| 9 | #1B8A5A | 190 | ⚠️ No variable — success green |
| 10 | #FFF0E9 | 187 | surface/brand-wash |
| 11 | #E0451A | 161 | brand/strong |
| 12 | #F1E8E1 | 140 | ⚠️ No variable |
| 13 | #EAF6EF | 107 | ⚠️ No variable — success tint |
| 14 | #FFF8F6 | 83 | ⚠️ No variable — danger tint |
| 15 | #12100D | 76 | ⚠️ No variable — near ink/primary |

### Unresolved Colors (heavy use, no variable)

| HEX | Count | Recommendation |
|-----|-------|----------------|
| #B9ACA4 | 379 fills | Add as `ink/placeholder` or merge into `ink/disabled` |
| #1B8A5A | 190 fills | Add as `status/success` |
| #F1E8E1 | 140 fills | Add as `surface/muted` or merge into `border/subtle` |
| #EAF6EF | 107 fills | Add as `status/success-tint` |
| #FFF8F6 | 83 fills | Add as `status/danger-tint` |
| #12100D | 76 fills | Merge into `ink/primary` (#191008) |
| #E8D8CC | 140 strokes | Add as `border/muted` |
| #F2A93B | 68 strokes | Add as `status/warning` |
| #F5CBC5 | 45 strokes | Add as `border/danger` |
| #C9BBB0 | 48 strokes | Add as `border/disabled` |
