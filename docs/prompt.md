i need you to create me a plan to implement a figam UI design but with high accuracy using Figma remote MCP server inluded in these files @guide.md @figam-design-pages.md @implementation-guide.md .
- make use of these files to create first the knowledge context about the design we should develop and how.
- the application must be using Reactjs + Typescript + Tailwindcss + Vite + Redux Toolkit + Zod, the rest is declared on the mentioned files, strictly follow these files instructions.
- analyse those mentioned files to firstly create the files tree architecture to organize the UI elements and utilities and tokens and themes and so on.
- install design library that is closed to the design system we have in Figma (see the recommended one - like shadcn or what ever).
- for every Figam fram use this command to analyse the frame or the component before build @figam-mcp-fram-command.md after you finish analysing create and md as an artifact file with the results you have to be used later as blueprint to build that frame or the component.
- then use the generated artifacts md file to build the element then organize that element, weather as in a components folders or utilities or what ever.
- before start building, for once analyse the application layout to create the needed layout architectures ````Have AI analyze the design BEFORE implementation

This is where you can get dramatically better results.

I recommend a two-stage process.

Stage A — Design reverse engineering

Cursor should determine:

Figma
 ↓
Design tokens
 ↓
Layout system
 ↓
Component hierarchy
 ↓
Responsive rules
 ↓
Page architecture
 ↓
Implementation plan

For example, instead of blindly creating:

<div className="flex gap-4">

the AI should understand:

Page
 └── DashboardShell
      ├── Sidebar
      ├── Header
      └── MainContent
           ├── PageHeader
           ├── StatsGrid
           │    ├── StatCard
           │    ├── StatCard
           │    └── StatCard
           └── ActivityTable

And determine which pieces are reusable.````.
- then Extract the design system and save it as md file to be used as knowledge and reference for the the whole design ```Don't let the AI treat every Figma frame as an isolated page.

Instead, have it identify:

Colors
Primary
Secondary
Background
Surface
Border
Text
Muted
Success
Warning
Error
Info
Typography
Font family
Heading sizes
Body sizes
Line heights
Letter spacing
Font weights
Spacing
4
8
12
16
20
24
32
40
48
64
...
Radius
sm
md
lg
xl
full
Shadows
card
dropdown
modal
popover
Components
Button
Input
Select
Checkbox
Radio
Badge
Card
Dialog
Table
Tabs
Tooltip
Dropdown
Navigation
...

Then the implementation becomes:

Figma
  ↓
Design system
  ↓
Reusable React components
  ↓
Pages

rather than:

Figma page 1 → random code

Figma page 2 → different random code

Figma page 3 → more random code

That distinction is huge when you have many screens.```.
- follow this ```Don't ask Cursor to implement the entire Figma file at once

I strongly recommend:

Design System
      ↓
Global Layout
      ↓
Page 1
      ↓
Page 2
      ↓
Page 3
      ↓
Responsive behavior
      ↓
Visual QA

rather than:

"Build the whole Figma project."

The second approach often produces a huge amount of mediocre code because the agent has to make too many assumptions simultaneously.```.
- use  this figma frame source of truth @figma-frame-source-of-truth.md , Then let it implement.
now start.