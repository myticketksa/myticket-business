> **Superseded.** Merged into [`MyTicket-Design-System-Specification.md`](./MyTicket-Design-System-Specification.md) §§06–07.

06 · Component Build Priority
P0 — Core Primitives (Sprint 1–2)
Must exist before any page can be assembled. 13 components:

#	Component	Complexity	Dependencies
1	Button	Medium	Brand gradient token
2	TextInput	Medium	Border tokens, focus ring
3	Checkbox	Low	Brand accent colour
4	Radio	Low	Brand accent colour
5	Toggle/Switch	Low	Brand gradient
6	SearchField	Medium	TextInput base
7	Avatar	Low	Brand gradient
8	StatusBadge	Low	9 tone colour mappings
9	CountBadge	Low	Brand colour
10	FilterChip	Low	Brand gradient (active)
11	Divider	Low	Border tokens
12	Skeleton	Low	Skeleton surface token
13	Toast	Medium	Sonner integration
P1 — Shared Business (Sprint 3–4)
Required by multiple business pages. 16 components:

#	Component	Used By
1	Biz/Sidebar	All 58 desktop business frames
2	Biz/Topbar	All 58 desktop business frames
3	Biz/NavItem	Sidebar child
4	Biz/NavCount	Sidebar child
5	Biz/PageHead	Most business pages
6	Biz/FilterPill	Events, Orders, Tickets, Hire Requests
7	Biz/KpiCard	Home pages (3 roles)
8	Biz/EventTabBar	6 event operation pages
9	Biz/UnderlineTab	Marketplace, Finance
10	Biz/NoteCard	Event Editor, Finance, multiple pages
11	Biz/AlertBanner	Finance, compliance
12	Biz/NotificationRow	3 notification pages
13	Biz/ProgressBar	Sales, Attendance, Live Door
14	Tabs	Multiple listing pages
15	SectionHeader	Design System page references
16	EmptyState	Empty list states throughout
P2 — Feature-Specific (Sprint 5–6)
Used by specific feature areas. 8 components:

#	Component	Feature Area
1	Biz/SeatCell	Seating Builder (3 frames)
2	Biz/FeedRow	Live Door, Scan History
3	Biz/LiveDot	Live Door
4	Biz/ThreadMessage	Hire Requests, Support threads
5	Biz/AlertStrip	Hire Requests, Seating Builder
6	Biz/DocRow	Finance, Profile (compliance docs)
7	Biz/BarListRow	Sales, Attendance analytics
8	Biz/HatchPlaceholder	Event Editor, Profile (image upload)
P3 — Page-Specific & Cards (Sprint 7–8)
#	Component	Context
1	Biz/Avatar	Business-specific sizes
2	PriceDisplay	Finance, event cards
3	StarRating	Reviews pages
4	Countdown	Event countdown displays
5	EventCard	Guest-facing (shared)
6	TalentCard / VendorCard	Marketplace
P4 — Scanner Mobile (Sprint 9)
#	Component	Notes
1	Mobile/Button	Primary/Secondary × Default/Disabled
2	Mobile/FormField	Label + input with states
3	All scanner result states	Colour-coded scan outcomes
07 · Implementation Blueprint
Phase 1: Foundation (Week 1)
 Set up React + TypeScript + Vite project
 Install and configure Tailwind CSS v4 with @theme tokens from §05
 Install shadcn/ui with warm theme overrides
 Set up Manrope font (Google Fonts)
 Create /tokens directory with CSS custom properties
 Configure Redux Toolkit store skeleton
 Set up Yup validation schemas directory
 Configure routing (React Router v6)
Phase 2: Design Token Layer (Week 1–2)
 Implement all colour tokens as CSS custom properties (§02.1)
 Implement typography utility classes (§05.2)
 Implement spacing scale (§02.3)
 Implement radius scale (§02.4)
 Implement shadow tokens (§02.6)
 Implement brand gradient utilities (§05.3)
 Create Storybook or dev page to verify token visual fidelity
Phase 3: P0 Core Primitives (Week 2–3)
 Build 13 P0 components per §06
 Each component: Figma-matched variants, Storybook stories, unit tests
 Validate against Figma screenshots
Phase 4: Business Shell (Week 3–4)
 Build BizSidebar (role-aware, 3 navigation configs)
 Build BizTopbar (4 variants)
 Build AppShell layout (sidebar + topbar + content area)
 Implement role-based routing (Organizer/Talent/Vendor)
 Build BizPageHead component
Phase 5: P1 Shared Components (Week 4–5)
 Build 16 P1 components per §06
 Integrate with AppShell layout
Phase 6: Organizer Pages (Week 5–7)
 Home dashboard (KPI cards, events list, activity feed)
 Events listing + Event Editor (long-form, multi-section)
 Seating Builder (interactive layout editor — complex)
 Venues directory
 Archive listing
 Event Operations (Orders, Tickets, Refunds, Notify — 4 pages sharing EventTabBar)
 Door & Attendance (Scanners, Live Door, Scan History, Attendance)
 Sales + Finance (analytics dashboards)
 Marketplace + Profile View + Hire Requests
 Organizer Profile
Phase 7: Talent Pages (Week 7–8)
 Talent Home, Hire Requests (+ thread), Availability
 Finance, Portfolio, Profile, Reviews
 Settings, Support (+ thread), Notifications
Phase 8: Vendor Pages (Week 8–9)
 Vendor Home, Hire Requests (+ thread), Availability (2 states)
 Finance, Gallery, Profile, Reviews
 Settings, Support (+ thread), Notifications
Phase 9: Shared Templates (Week 9)
 Ratings & Reviews (shared across roles)
 Business Notifications (shared)
 Business Settings (shared)
 Business Support + Case Thread (shared)
Phase 10: Scanner App (Week 9–10)
 Mobile layout shell (390px viewport)
 Sign-in screen
 Event & gate selection
 7 scan result states (valid, rejected, wrong event, cancelled, refunded, resold, re-entry)
Phase 11: Polish & QA (Week 10)
 Visual regression testing against Figma screenshots
 Accessibility audit (contrast, focus management, ARIA)
 Responsive behaviour verification
 Cross-browser testing
 Performance optimisation (code splitting, lazy loading)
 State management review (Redux slices, Yup schemas)