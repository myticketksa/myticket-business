> **Superseded as the working spec.** Use [`MyTicket-Design-System-Specification.md`](./MyTicket-Design-System-Specification.md). This file is a source note.

# MyTicket — Design System Specification

> **Source file:** Myticket Design (Copy)  
> **File key:** `01NeAlswemvtbpPM3pCed7`  
> **Target stack:** React 18 · TypeScript · Tailwind CSS v4 · shadcn/ui · Redux Toolkit · Yup  
> **Date:** 2026-08-30

---

## 01 · Design System Overview

### 1.1 Philosophy

MyTicket is a warm, premium Saudi-market event platform. The visual language avoids the cold blues and greys of typical SaaS — instead it builds on a terracotta-to-orange brand gradient, warm stone neutrals, and generous whitespace. Every surface feels approachable yet professional.

### 1.2 Visual Identity

| Attribute | Value |
|-----------|-------|
| **Brand gradient** | 120° linear from `#FF9147` → `#E0451A` |
| **Primary font** | Manrope (Google Fonts), weights 500–800 |
| **Canvas colour** | `#FFF7F3` (warm off-white) |
| **Card surface** | `#FFFFFF` (pure white) |
| **Primary ink** | `#191008` (warm near-black) |
| **Border default** | `#F3DED2` (warm blush) |
| **Corner strategy** | Rounded everywhere — 12px base, pill for actions |
| **Shadow** | Single tokenised elevation (Elevation/Card) |
| **Icon system** | Custom icon set, consistent 19px/22px sizing |

### 1.3 Layout Patterns

| Pattern | Specification |
|---------|--------------|
| **Business portal shell** | 248px fixed sidebar + fluid content area |
| **Content max-width** | 1192px (1440 − 248 sidebar) |
| **Topbar** | 64px height, backdrop-blur 14px, 92% opacity `#FFF7F3` |
| **Page gutter** | 40px (`space/gutter`) |
| **Section spacing** | 88px (`space/section`) |
| **Scanner app** | 390×844px mobile viewport |
| **Desktop viewport** | 1440px reference width |

### 1.4 Design Maturity Assessment

| Metric | Score | Detail |
|--------|-------|--------|
| Token coverage — colour | 8/10 | 68 colour variables; ~10 hardcoded colours remain in heavy use |
| Token coverage — spacing | 6/10 | 7 tokens; many raw values (4, 6, 10, 16, 24) not tokenised |
| Token coverage — radius | 6/10 | 6 tokens; 6px (388 uses) and 10px (44 uses) have no token |
| Text style adoption | 3/10 | Only 7% of text nodes bound (325 of 4,765) |
| Auto-layout adoption | 7/10 | 67% (3,831 of 5,754 frames) |
| Component coverage | 8/10 | 68 component sets, 360+ total variants |
| **Overall consistency** | **6/10** | Strong token foundation, weak binding discipline |

---

## 02 · Design Tokens

### 2.1 Colour Tokens

All colours from the `MyTicket` variable collection (single mode). 68 variables total.

#### Surface Colours

| Token | HEX | Usage |
|-------|-----|-------|
| `surface/canvas` | `#FFF7F3` | App background, page canvas |
| `surface/card` | `#FFFFFF` | Card backgrounds, modals |
| `surface/tint` | `#FFF8F4` | Subtle tinted backgrounds |
| `surface/footer` | `#FFF1E9` | Footer background, chip background |
| `surface/chip` | `#FFF1E9` | Chip/tag backgrounds |
| `surface/skeleton` | `#FFE2D0` | Skeleton loader base |
| `surface/skeleton-alt` | `#FFC0A0` | Skeleton loader shimmer |
| `surface/inverse` | `#191008` | Dark backgrounds (scanner, inverse cards) |
| `surface/sold` | `#F7E9E1` | Sold-out/disabled surface |
| `surface/brand-wash` | `#FFF0E9` | Brand-tinted wash areas |
| `surface/featured-from` | `#FFF2EA` | Featured gradient start |
| `surface/featured-mid` | `#FFE6D8` | Featured gradient midpoint |
| `surface/featured-to` | `#F4E9FF` | Featured gradient end (purple tint) |

#### Ink (Text) Colours

| Token | HEX | Usage |
|-------|-----|-------|
| `ink/primary` | `#191008` | Headings, primary text (2,610 uses) |
| `ink/body` | `#3A2418` | Body text, secondary headings |
| `ink/muted` | `#6B5F58` | Secondary labels, metadata (702 uses) |
| `ink/faint` | `#8E8078` | Tertiary text, placeholders (996 uses) |
| `ink/disabled` | `#C0AEA4` | Disabled text |
| `ink/inverse` | `#FFF7F3` | Text on dark backgrounds |

#### Border Colours

| Token | HEX | Usage |
|-------|-----|-------|
| `border/default` | `#F3DED2` | Default borders (821 stroke uses) |
| `border/strong` | `#F5C9B4` | Emphasized borders |
| `border/subtle` | `#F7E9E1` | Subtle dividers (475 stroke uses) |
| `border/brand` | `#FFC8AE` | Brand-accented borders |
| `border/featured` | `#F7DFD3` | Featured item borders |

#### Brand Colours

| Token | HEX | Usage |
|-------|-----|-------|
| `brand/primary` | `#F25F2C` | Primary brand (buttons, links) (372 uses) |
| `brand/strong` | `#E0451A` | Stronger brand accent |
| `brand/deep` | `#B8320F` | Deep brand (hover states) |
| `brand/light` | `#FF9147` | Light brand (gradient start) |
| `brand/link` | `#D8431A` | Link colour |
| `brand/hover` | `#B8320F` | Link/button hover |
| `brand/gradient-from` | `#FF9147` | Gradient start |
| `brand/gradient-to` | `#E0451A` | Gradient end |
| `brand/gradient-deep` | `#C4330B` | Deep gradient stop |

#### Accent & Tier Colours

| Token | HEX | Usage |
|-------|-----|-------|
| `accent/amber` | `#C4330B` | Warm accent |
| `accent/amber-light` | `#FFC0A0` | Warm accent light |
| `tier/vip` | `#5A18C4` | VIP tier |
| `tier/vip-light` | `#EEDCFF` | VIP tier light |
| `tier/gold` | `#C4330B` | Gold tier |
| `tier/gold-light` | `#FFE2D0` | Gold tier light |
| `tier/gold-ink` | `#8A2A08` | Gold tier text |
| `tier/silver-light` | `#FFF1E9` | Silver tier light |
| `tier/bronze` | `#4E6C8B` | Bronze tier |
| `tier/bronze-light` | `#E5F0FC` | Bronze tier light |

#### Zone, Badge, Tag, Bar Colours

| Token | HEX | Usage |
|-------|-----|-------|
| `zone/amber-wash` | `#FFF4EE` | Amber zone background |
| `zone/brand-wash` | `#FFF0E9` | Brand zone background |
| `badge/rose-wash` | `#FDECEB` | Rose badge background |
| `badge/rose-ink` | `#C4261B` | Rose badge text |
| `tag/amber-wash` | `#FFE2D0` | Amber tag background |
| `tag/rose-wash` | `#FDECEB` | Rose tag background |
| `tag/rose-ink` | `#B8231A` | Rose tag text |
| `tag/brand-ink` | `#C4330B` | Brand tag text |
| `bar/brand-wash` | `#FFF0E9` | Progress bar brand wash |
| `bar/brand-line` | `#FFC8AE` | Progress bar brand line |

#### Third-Party Brand Colours

| Token | HEX | Usage |
|-------|-----|-------|
| `brand/tabby` | `#70F6B5` | Tabby payment badge |
| `brand/tabby-ink` | `#0A2A20` | Tabby badge text |
| `brand/tamara` | `#FFC7C5` | Tamara payment badge |
| `brand/tamara-ink` | `#3A0E14` | Tamara badge text |
| `brand/visa` | `#1A2B7B` | Visa badge |

#### Recommended Additional Tokens (from audit)

These colours appear frequently in the design but lack variables:

| Proposed Token | HEX | Current Usage | Purpose |
|---------------|-----|---------------|---------|
| `status/success` | `#1B8A5A` | 190 fills | Success states, valid scans |
| `status/success-light` | `#EAF6EF` | 107 fills | Success backgrounds |
| `status/danger` | `#DC3A2A` | 11 strokes | Error/danger states |
| `status/danger-light` | `#FFF8F6` | 83 fills | Error backgrounds |
| `status/danger-border` | `#F5CBC5` | 45 strokes | Error borders |
| `status/warning` | `#F2A93B` | 68 strokes | Warning states |
| `ink/secondary` | `#B9ACA4` | 379 fills | Quaternary text |
| `surface/dark` | `#12100D` | 76 fills | Extra-dark surfaces |
| `radius/xs` | `6` | 388 uses | Small radius (tags, badges) |
| `radius/circle` | `10` | 44 uses | Medium radius |

---

### 2.2 Typography Tokens

All 36 text styles. Single font family: **Manrope** (Google Fonts).

#### Display Scale

| Token | Weight | Size | Line Height | Letter Spacing | Use Case |
|-------|--------|------|-------------|----------------|----------|
| `Display/Slide` | 800 | 88px | 92px | −2.64px | Presentation slides |
| `Display/XL` | 800 | 56px | 64px | −1.68px | Hero headings |
| `Display/XL Italic` | 800 | 56px | 64px | −1.68px | Italic hero headings |
| `Display/Page` | 800 | 54px | 55px | −1.89px | Page-level headings |
| `Display/L` | 800 | 46px | 48px | −1.61px | Large section headings |
| `Display/M` | 800 | 42px | 44px | −1.47px | Medium section headings |
| `Display/S` | 800 | 34px | 36px | −1.02px | Small section headings |
| `Display/XS` | 800 | 30px | 33px | −0.90px | Subsection headings |
| `Display/2XS` | 700 | 26px | 28px | −0.52px | Card headings |
| `Display/Card` | 700 | 25px | 28px | −0.50px | Card title variant |

#### Title Scale

| Token | Weight | Size | Line Height | Letter Spacing | Use Case |
|-------|--------|------|-------------|----------------|----------|
| `Title/XL` | 600 | 19px | 23px | 0 | Large titles |
| `Title/L` | 600 | 17px | 21px | 0 | Section titles |
| `Title/M` | 600 | 16px | 22px | 0 | Card titles, table headers |

#### Body Scale

| Token | Weight | Size | Line Height | Letter Spacing | Use Case |
|-------|--------|------|-------------|----------------|----------|
| `Body/L` | 500 | 18px | 28px | 0 | Large body text |
| `Body/M` | 500 | 16px | 24px | 0 | Default body text |
| `Body/S` | 500 | 14px | 21px | 0 | Small body text |
| `Body/XS` | 500 | 13px | 19px | 0 | Captions, metadata |
| `Body/2XS` | 500 | 12px | 17px | 0 | Fine print |

#### Action Scale (Buttons, Links)

| Token | Weight | Size | Line Height | Letter Spacing | Use Case |
|-------|--------|------|-------------|----------------|----------|
| `Action/M` | 700 | 15px | 20px | 0 | Primary buttons |
| `Action/S` | 600 | 14px | 20px | 0 | Secondary buttons |
| `Action/XS` | 600 | 13px | 18px | 0 | Small buttons |
| `Link/M` | 700 | 14px | 20px | 0 | Medium links |
| `Link/S` | 700 | 13px | 18px | 0 | Small links |

#### Navigation Scale

| Token | Weight | Size | Line Height | Letter Spacing | Use Case |
|-------|--------|------|-------------|----------------|----------|
| `Nav/M` | 600 | 15px | 22px | 0 | Sidebar nav items |

#### Utility Styles

| Token | Weight | Size | Line Height | Letter Spacing | Text Case | Use Case |
|-------|--------|------|-------------|----------------|-----------|----------|
| `Medium/14` | 500 | 14px | 20px | 0 | Original | Generic medium 14 |
| `Medium/13` | 500 | 13px | 19px | 0 | Original | Generic medium 13 |
| `Tag/M` | 700 | 12px | 16px | 0 | Original | Tag labels |
| `Tag/S` | 700 | 11px | 14px | 0 | Original | Small tag labels |
| `Price/XL` | 800 | 26px | 30px | 0 | Original | Hero pricing |
| `Price/L` | 700 | 20px | 24px | 0 | Original | Large pricing |
| `Price/M` | 700 | 18px | 22px | 0 | Original | Medium pricing |
| `Eyebrow` | 800 | 12px | 16px | +1.20px | UPPERCASE | Section eyebrows |
| `Eyebrow/Wide` | 800 | 13px | 16px | +3.64px | Original | Wide-spaced eyebrows |
| `Meta/Date` | 700 | 12px | 16px | +0.48px | UPPERCASE | Date metadata |
| `Logo/L` | 800 | 27px | 32px | −0.54px | Original | Large logo text |
| `Logo/S` | 800 | 25px | 30px | −0.50px | Original | Small logo text |

---

### 2.3 Spacing Tokens

| Token | Value | Top Uses |
|-------|-------|----------|
| `space/2xs` | 8px | Dense padding, small gaps |
| `space/xs` | 12px | Card inner padding, list gaps |
| `space/sm` | 14px | Form field padding, input gaps |
| `space/md` | 18px | Medium component padding |
| `space/lg` | 20px | Section inner padding (1,029 uses) |
| `space/gutter` | 40px | Page gutter / content margins |
| `space/section` | 88px | Between page sections |

**Untokenised values in heavy use (recommend adding):**

| Proposed Token | Value | Usage Count |
|---------------|-------|-------------|
| `space/3xs` | 4px | 241 padding uses |
| `space/gap-sm` | 6px | 339 gap uses |
| `space/gap-md` | 10px | 377 gap uses |
| `space/base` | 16px | 478 padding uses |
| `space/xl` | 24px | 161 padding uses |

---

### 2.4 Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `radius/sm` | 12px | Input fields, small cards (124 uses) |
| `radius/md` | 14px | Medium components |
| `radius/lg` | 18px | Cards, dialogs (228 uses) |
| `radius/xl` | 20px | Large cards |
| `radius/2xl` | 22px | Hero cards |
| `radius/pill` | 999px | Buttons, pills, badges |

**Untokenised radii in heavy use:**

| Proposed Token | Value | Usage Count |
|---------------|-------|-------------|
| `radius/xs` | 6px | 388 uses — most used radius! |
| `radius/2xs` | 3px | 130 uses |
| `radius/badge` | 10px | 44 uses |

---

### 2.5 Border Tokens

| Width | Usage Count | Context |
|-------|-------------|---------|
| 1px | 659 | Default borders, card edges, table rules |
| 1.5px | 388 | Focused/active inputs, selected states |
| 2px | 6 | Active tab indicator |

---

### 2.6 Shadow Tokens

| Token | Layers | Specification |
|-------|--------|---------------|
| `Elevation/Card` | 2 | Layer 1: `0 1px 2px rgba(20,18,14, 0.04)` — subtle lift. Layer 2: `0 12px 32px -18px rgba(20,18,14, 0.25)` — ambient depth |

**Recommended additional shadows:**

| Proposed Token | Value | Use Case |
|---------------|-------|----------|
| `Elevation/Dropdown` | `0 4px 16px -4px rgba(20,18,14, 0.15)` | Dropdown menus |
| `Elevation/Modal` | `0 24px 48px -12px rgba(20,18,14, 0.20)` | Modal dialogs |
| `Elevation/Toast` | `0 8px 24px -8px rgba(20,18,14, 0.18)` | Toast notifications |

---

### 2.7 Sizing Tokens (Recommended)

| Token | Value | Context |
|-------|-------|---------|
| `size/sidebar` | 248px | Business portal sidebar width |
| `size/topbar` | 64px | Topbar height |
| `size/input-h` | 48px | Web input height |
| `size/input-mobile-h` | 52px | Mobile input height |
| `size/icon-sm` | 16px | Small icons |
| `size/icon-md` | 19px | Navigation icons |
| `size/icon-lg` | 22px | Action icons |
| `size/avatar-sm` | 28px | Small avatar |
| `size/avatar-md` | 38px | Medium avatar |
| `size/avatar-lg` | 52px | Large avatar |

---

## 03 · Component System

### 3.1 Inventory Summary

- **68 component sets** with **360+ total variants**
- **0 standalone components** outside sets
- All on the **Design System** page
- Component naming: `PascalCase` for shared, `Biz/PascalCase` for business-only, `Mobile/PascalCase` for mobile-only

### 3.2 Core Primitives (Shared Web)

#### Button
- **Variants:** 18 (Style × Size × State)
- **Properties:** Style (`Primary` | `Secondary` | `Ghost` | `Destructive` | `Icon`), Size (`L` | `M` | `S`), State (`Default` | `Hover` | `Disabled` | `Loading`), Label (text), Show icon (boolean), Icon (instance swap)
- **Radius:** height/2 (pill shape)
- **Primary:** brand gradient fill, white text
- **Secondary:** white fill, brand border, brand text
- **Ghost:** transparent, brand text
- **Destructive:** red variant

#### TextInput
- **Variants:** 4 (State)
- **Properties:** State (`Default` | `Focused` | `Error` | `Disabled`), Value (text)
- **Spec:** h48, r12, pad 0 14, 15px. Default 1px `border/default`; Focused 1.5px `brand/primary`; Error 1.5px red

#### Checkbox
- **Variants:** 2 (State: `Unchecked` | `Checked`)
- **Properties:** Label (text), Count (text), Show count (boolean)
- **Spec:** 16×16, accent-color brand, row gap 10, 14px label

#### Radio
- **Variants:** 2 (State: `Unchecked` | `Checked`)
- **Properties:** Label (text)
- **Spec:** 16×16, gap 10, 14px label

#### Toggle
- **Variants:** 2 (State: `On` | `Off`)
- **Properties:** Label (text)
- **Spec:** Track 44×26 r13, knob 20×20 r10. ON = brand gradient, OFF = `#E8D8CC`

#### SearchField
- **Variants:** 3 (Size: `Field` | `Pill` | `Icon`)
- **Properties:** Placeholder (text)
- **Spec:** Field h44 r22; Pill h38 r19; Icon = magnifier only

#### OTPBox
- **Variants:** 2 (State: `Filled` | `Empty`)
- **Spec:** 48×56, r12. Filled: 1.5px brand, 22px/700. Empty: 1px `border/default`

#### FilterChip
- **Variants:** 4 (State: `Default` | `Hover` | `Selected` | `Removable`)
- **Properties:** Label (text), Count (text), Show count (boolean)
- **Spec:** h38, r19, pad 0 14, 14px/500, gap 8

#### Avatar
- **Variants:** 4 (Size × Shape)
- **Properties:** Initials (text), Size (`28` | `52`), Shape (`Circle` | `Squircle`)
- **Spec:** Brand gradient background, white text

#### StatusBadge
- **Variants:** 9 (Tone)
- **Properties:** Label (text), Tone (`BrandTint` | `UrgentSolid` | `Terminal` | `NeutralOutline` | `LiveSolid` | `SuccessTint` | `Inactive` | `InfoTint` | `DangerTint`)
- **Spec:** Fixed taxonomy — every product state maps to exactly one tone

#### CountBadge
- **Variants:** 2 (Platform: `Web` | `Mobile`)
- **Properties:** Count (text)
- **Spec:** min-w 16, h16, r8, 9.5px/800

#### OverlayBadge
- **Variants:** 2 (Tone: `Ink` | `Success`)
- **Properties:** Label (text)
- **Spec:** Absolute positioned, 12px/700, r10

#### Divider
- **Variants:** 2 (Tone: `Divider` | `Border`)
- **Spec:** Divider = `#F7E9E1`, Border = `#F3DED2`

#### Skeleton
- **Variants:** 2 (Type: `Media` | `Line`)
- **Spec:** `surface/skeleton` colour, shimmer animation

#### Toast
- **Variants:** 3 (Tone: `Success` | `Error` | `Neutral`)
- **Properties:** Title (text), Subtitle (text), Action (text)
- **Spec:** Bottom-left, 5s auto-dismiss, stack gap 14

#### EmptyState
- **Variants:** 3 (Variant: `FirstUse` | `Filters` | `Gated`)
- **Properties:** Title (text), Body (text)
- **Rule:** Always explain what will live here + one route to fill it

#### SectionHeader
- **Variants:** 2 (Link: `Yes` | `No`)
- **Properties:** Overline (text), Heading (text), Lede (text), Show lede (boolean), Link (text)
- **Spec:** Overline 12/700 uppercase `#D8431A`, gap 8

#### Tabs
- **Variants:** 2 (State: `Active` | `Default`)
- **Properties:** Label (text), Count (text), Show count (boolean)

#### StarRating
- **Variants:** 2 (Form: `Strip` | `Inline`)
- **Properties:** Value (text)
- **Spec:** Uses U+2605 text glyph, NOT Icon component

#### PriceDisplay
- **Variants:** 6 (Context: `Card` | `Row` | `Total` | `Amount` | `Stat` | `Mobile`)
- **Format:** `SAR 1,240.00` tabular. Platform fee always separate line.

#### Countdown
- **Variants:** 2 (Urgency: `Under1h` | `Over1h`)
- **Colour rule:** < 1 hour = `brand/600 #D8431A`, tabular

#### ImagePlaceholder
- **Variants:** 3 (Ratio: `16x10` | `1x1` | `16x9`)
- **Spec:** Linear gradient 160° `#E8DDD6` → `#D8CCC4`

#### NavItem (Site)
- **Variants:** 3 (State: `Default` | `Active` | `Section`)

#### SiteHeader
- **Variants:** 2 (State: `Signed out` | `Signed in`)
- **Properties:** Show search (boolean)

#### SiteFooter
- **Variants:** 2 (Size: `Full` | `Minimal`)

#### EventCard
- **Variants:** 1 (Context: `Home`)
- **Properties:** Title, Venue, Price, Show flag

#### ExperienceCard
- **Variants:** 2 (Context: `Catalog` | `Home`)

#### TalentCard
- **Variants:** 2 (Context: `Catalog` | `Home`)

#### VendorCard
- **Variants:** 2 (Context: `Row` | `Directory`)

#### OrganizerCard
- **Variants:** 2 (Context: `Tile` | `Directory`)

---

### 3.3 Business Portal Components (`Biz/*`)

#### Biz/Sidebar
- **Variants:** 3 (Role: `Organizer` | `Talent` | `Vendor`)
- **Spec:** 248×900, white, 1px `#F3DED2` right border. Brand block + nav sections + footer

#### Biz/Topbar
- **Variants:** 4 (Kind: `Base` | `MainWebsite` | `EditorMeta` | `HireRequests`)
- **Properties:** Crumb, Current, BellCount, Initials (all text)
- **Spec:** h64, pad 0 36, gap 16, `#FFF7F3` @92% + backdrop-blur 14px, border-bottom 1px `#F3DED2`

#### Biz/NavItem
- **Variants:** 2 (State: `Default` | `Active`)
- **Properties:** Label (text), ShowCount (boolean)
- **Spec:** h40 r12, pad 0 12, gap 11, icon 19px

#### Biz/NavCount
- **Variants:** 2 (Tone: `Hot` | `Neutral`)
- **Properties:** Count (text)
- **Spec:** min-w 20, h20, r10, 11.5px/800. Hot = `#E0451A` on white

#### Biz/PageHead
- **Variants:** 2 (Sub: `Yes` | `No`)
- **Properties:** Eyebrow, Title, Sub, Sub2 (all text)
- **Spec:** Eyebrow 12/700 uppercase `#D8431A`, Title 28px bold

#### Biz/EventTabBar
- **Variants:** 6 (Active: `Edit` | `Orders` | `Tickets` | `Refunds` | `Notify` | `LiveDoor`)
- **Properties:** Counts (boolean)
- **Spec:** Gap 20, shared bottom edge 1px `#F3DED2`

#### Biz/FilterPill
- **Variants:** 6 (State × Size)
- **Properties:** Label (text), State (`Active` | `Idle`), Size (`32` | `36` | `38`)
- **Spec:** Active = brand gradient, 1px transparent border, white 600. Idle = 1px `#F3DED2`, `#191008`

#### Biz/UnderlineTab
- **Variants:** 4 (State × Size)
- **Properties:** Label (text), State (`Active` | `Default`), Size (`S` | `M`)
- **Spec:** Active = `#D8431A` ink + 2px `#F25F2C` bottom stroke

#### Biz/KpiCard
- **Variants:** 3 (Kind: `Standard` | `NoIcon` | `Coloured`)
- **Properties:** Label, Value, Trend, Note (all text)
- **Spec:** 1px `#F3DED2` r18 white, pad 20 22, w320 in 4-across grid gap 16

#### Biz/Avatar
- **Variants:** 8 (Size × Tone)
- **Properties:** Initials (text), Size (`34` | `38` | `42` | `44`), Tone (`Brand` | `Grey`)

#### Biz/NoteCard
- **Variants:** 4 (Tone × Icon)
- **Properties:** Lead, Body (text), Tone (`Warm` | `Neutral`), Icon (`Yes` | `No`)
- **Spec:** Warm = bg `#FFF1E9`, accent `#C4330B`

#### Biz/AlertBanner
- **Variants:** 4 (Tone × Cta)
- **Properties:** Lead, Body, CtaLabel (text), Tone (`Danger` | `Info`), Cta (`Yes` | `No`)
- **Spec:** Danger = 1px `#F5CBC5`, bg `#FFF8F6`, `#DC3A2A` icon

#### Biz/AlertStrip
- **Variants:** 2 (Tone: `Info` | `Lock`)
- **Properties:** Body (text)

#### Biz/BarListRow
- **Variants:** 2 (Layout: `Stacked` | `Inline`)
- **Properties:** Name, Value (text)

#### Biz/DocRow
- **Variants:** 3 (State: `Verified` | `Pending` | `Missing`)

#### Biz/FeedRow
- **Variants:** 2 (Result: `Valid` | `Rejected`)
- **Spec:** h44, pad 0 20, gap 14, border-bottom 1px `#F7E9E1`, 13px

#### Biz/NotificationRow
- **Variants:** 2 (State: `ActionNeeded` | `Read`)

#### Biz/ThreadMessage
- **Variants:** 2 (Side: `Incoming` | `Outgoing`)
- **Spec:** Bubble max-width 62%

#### Biz/ProgressBar
- **Variants:** 10 (Size × Surface)
- **Properties:** Size (`5` | `6` | `7` | `8` | `10`), Surface (`Light` | `Dark`)

#### Biz/SeatCell
- **Variants:** 9 states (Sold, Held, VIP, Gold, Silver, Selected, Unassigned, Disabled, Override)
- **Spec:** Swatch 26×26 r7, gap 10, label 13px/700

#### Biz/LiveDot
- **Variants:** 2 (Surface: `Light` | `Dark`)
- **Spec:** Pulsing animation 1.4–1.6s, scale 1→1.5

#### Biz/HatchPlaceholder
- **Variants:** 3 (Size: `Thumb` | `Band` | `Wide`)
- **Properties:** Caption (text)

---

### 3.4 Mobile Components (`Mobile/*`)

#### Mobile/Button
- **Variants:** 4 (Kind × State)
- **Properties:** Kind (`Primary` | `Secondary`), State (`Default` | `Disabled`), Label, Icon, Show icon

#### Mobile/TabItem
- **Variants:** 2 (State: `Default` | `Active`)
- **Properties:** Label, Icon (instance swap), Dot (boolean)
- **Spec:** Active = brand gradient end colour, filled icon

#### Mobile/IconButton
- **Variants:** 2 (Tone: `Ink` | `Brand`)
- **Properties:** Icon (instance swap), Badge (boolean)

#### Mobile/FormField
- **Variants:** 2 (State: `Default` | `Focused`)
- **Properties:** Label, Value, Show label (all text/boolean)
- **Spec:** Label 11/700 uppercase, 52px field h, r16, 1.5px border

#### Mobile/FilterChip
- **Variants:** 3 (State: `Default` | `Active` | `Applied`)

#### Mobile/CategoryChip
- **Variants:** 2 (State: `Default` | `Active`)

#### Mobile/Segment
- **Variants:** 2 (State: `Active` | `Default`)

#### Mobile/SegPill
- **Variants:** 2 (State: `Active` | `Default`)

#### Mobile/Toggle
- **Variants:** 2 (State: `On` | `Off`)
- **Spec:** 46×28 track r14, 22 knob. ON = brand gradient, OFF = `#E8D8CC`

#### Mobile/OTPBox
- **Variants:** 3 (State: `Empty` | `Filled` | `Focused`)
- **Spec:** 62×68 r18, 1.5px border, digit 28/800 tabular

#### Mobile/PayRow
- **Variants:** 2 (State: `Default` | `Selected`)
- **Properties:** Brand, Title, Meta, Badge label, Show badge (all text/boolean)

#### Mobile/StateBadge
- **Variants:** 4 (Tone: `Success` | `Neutral` | `Brand` | `Muted`)
- **Spec:** 11/700, pad 5/11, r11

#### Mobile/StarRating
- **Variants:** 10 (Size × Rating)
- **Properties:** Size (`Small` | `Large`), Rating (`1`–`5`)

#### Mobile/Skeleton
- **Variants:** 2 (Kind: `Media` | `Line`)

#### Mobile/NotificationItem
- **Variants:** 3 (Kind: `Hot` | `Ok` | `Muted`)
- **Properties:** Title, Text, Time, Unread, Show deadline, Countdown, Show CTA, CTA label

---

## 04 · React Component Mapping

### 4.1 Direct shadcn/ui Usage (use as-is with token restyling)

| Figma Component | shadcn/ui Component | Notes |
|----------------|--------------------|----|
| Checkbox | `Checkbox` | Restyle with brand gradient for checked state |
| Radio | `RadioGroup` + `RadioGroupItem` | Standard radio behaviour |
| Toggle | `Switch` | Restyle track with brand gradient |
| Divider | `Separator` | Map Tone to `className` variants |

### 4.2 Extend shadcn/ui (wrap or extend with custom variants)

| Figma Component | shadcn/ui Base | Customisation |
|----------------|---------------|---------------|
| Button | `Button` | Add `gradient` variant for Primary, add Size L/M/S, Loading state with spinner |
| TextInput | `Input` | Wrap with label, error message, focused ring with brand colour |
| SearchField | `Input` | Add leading icon, pill variant, icon-only variant |
| Toast | `Toast` / `Sonner` | Add Success/Error/Neutral tones with brand colours |
| Tabs / UnderlineTab | `Tabs` | Restyle active indicator with brand colour underline |
| FilterChip | `Toggle` | Add Selected/Removable states, count badge |
| StatusBadge | `Badge` | Map 9 tones to className variants |
| EmptyState | `Card` (shell) | Custom compound component with icon + title + body + CTA |
| OTPBox | `InputOTP` | Restyle with brand focus ring |
| Skeleton | `Skeleton` | Set background to `surface/skeleton` token |

### 4.3 Build Custom (no shadcn/ui equivalent)

| Component | Complexity | Notes |
|-----------|-----------|-------|
| `Avatar` | Low | Gradient background with initials, pill/squircle shapes |
| `CountBadge` | Low | Min-width badge with count |
| `OverlayBadge` | Low | Absolutely positioned label badge |
| `PriceDisplay` | Low | Tabular number formatting with SAR currency |
| `Countdown` | Medium | Timer with urgency colour switch |
| `StarRating` | Low | Text glyph stars, not SVG icons |
| `SectionHeader` | Low | Overline + heading + lede + link compound |
| `ImagePlaceholder` | Low | Gradient placeholder with aspect ratio |
| `EventCard` | Medium | Image + metadata card with tier badges |
| `ExperienceCard` | Medium | Similar to EventCard with category overlay |
| `TalentCard` | Medium | Profile card with avatar, discipline, rating |
| `VendorCard` | Medium | Service card with gallery, price |
| `OrganizerCard` | Medium | Brand card with cover image |
| `Biz/Sidebar` | High | Role-aware nav with sections, brand block, footer |
| `Biz/Topbar` | Medium | Breadcrumb, bell, avatar, backdrop-blur |
| `Biz/KpiCard` | Medium | Metric card with trend indicator |
| `Biz/EventTabBar` | Medium | 6-tab bar with count badges |
| `Biz/FilterPill` | Low | Gradient active state pill |
| `Biz/NoteCard` | Low | Info card with warm/neutral tones |
| `Biz/AlertBanner` | Medium | Danger/info banner with optional CTA |
| `Biz/ThreadMessage` | Medium | Chat bubble with side alignment |
| `Biz/ProgressBar` | Low | Animated bar with light/dark surface |
| `Biz/SeatCell` | Medium | Seating grid cell with 9 state colours |
| `Biz/LiveDot` | Low | Pulsing CSS animation dot |
| `Biz/FeedRow` | Low | Live feed row with valid/rejected states |
| `Mobile/TabItem` | Low | Bottom tab bar item with icon + dot |
| `Mobile/FormField` | Medium | Labeled input with uppercase label |
| `Mobile/PayRow` | Medium | Payment method row with brand badge |
| `Mobile/NotificationItem` | Medium | Rich notification with deadline + CTA |

---

## 05 · Tailwind CSS v4 Token Mapping

### 5.1 Theme Configuration (`app.css` or `theme.css`)

```css
@import "tailwindcss";

@theme {
  /* ── Colours ── */
  --color-surface-canvas: #FFF7F3;
  --color-surface-card: #FFFFFF;
  --color-surface-tint: #FFF8F4;
  --color-surface-footer: #FFF1E9;
  --color-surface-chip: #FFF1E9;
  --color-surface-skeleton: #FFE2D0;
  --color-surface-skeleton-alt: #FFC0A0;
  --color-surface-inverse: #191008;
  --color-surface-sold: #F7E9E1;
  --color-surface-brand-wash: #FFF0E9;

  --color-ink-primary: #191008;
  --color-ink-body: #3A2418;
  --color-ink-muted: #6B5F58;
  --color-ink-faint: #8E8078;
  --color-ink-disabled: #C0AEA4;
  --color-ink-inverse: #FFF7F3;

  --color-border-default: #F3DED2;
  --color-border-strong: #F5C9B4;
  --color-border-subtle: #F7E9E1;
  --color-border-brand: #FFC8AE;

  --color-brand-primary: #F25F2C;
  --color-brand-strong: #E0451A;
  --color-brand-deep: #B8320F;
  --color-brand-light: #FF9147;
  --color-brand-link: #D8431A;
  --color-brand-hover: #B8320F;

  --color-status-success: #1B8A5A;
  --color-status-success-light: #EAF6EF;
  --color-status-danger: #DC3A2A;
  --color-status-danger-light: #FFF8F6;
  --color-status-warning: #F2A93B;

  --color-tier-vip: #5A18C4;
  --color-tier-vip-light: #EEDCFF;
  --color-tier-gold: #C4330B;
  --color-tier-gold-light: #FFE2D0;
  --color-tier-silver-light: #FFF1E9;
  --color-tier-bronze: #4E6C8B;
  --color-tier-bronze-light: #E5F0FC;

  /* ── Spacing ── */
  --spacing-2xs: 8px;
  --spacing-xs: 12px;
  --spacing-sm: 14px;
  --spacing-md: 18px;
  --spacing-lg: 20px;
  --spacing-gutter: 40px;
  --spacing-section: 88px;

  /* ── Radius ── */
  --radius-xs: 6px;
  --radius-sm: 12px;
  --radius-md: 14px;
  --radius-lg: 18px;
  --radius-xl: 20px;
  --radius-2xl: 22px;
  --radius-pill: 999px;

  /* ── Shadows ── */
  --shadow-card: 0 1px 2px rgba(20,18,14,0.04), 0 12px 32px -18px rgba(20,18,14,0.25);
  --shadow-dropdown: 0 4px 16px -4px rgba(20,18,14,0.15);
  --shadow-modal: 0 24px 48px -12px rgba(20,18,14,0.20);

  /* ── Typography ── */
  --font-family-sans: 'Manrope', system-ui, sans-serif;
}
