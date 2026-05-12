# Feature: Studio Shell

Read `AGENTS.md`, `context/project-overview.md`, and `context/ui-context.md` before starting.

We are building the foundational layout of the Bytclip Studio. This shell will frame the entire user experience, providing navigation and global actions while maintaining the "Studio Engine" aesthetic (absolute dark base, glassmorphism, and high contrast).

## Implementation Tasks

### 1. Studio Navbar
Create `src/components/studio/studio-navbar.tsx`.
- **Height**: Fixed 64px (`h-16`).
- **Style**: Bottom border (`border-b border-border-default`), background (`bg-bg-base`).
- **Content**:
    - **Left**: Bytclip Logo (Text: "Bytclip" in Geist Mono, Bold, `--accent-primary` text color).
    - **Center**: Current Project title placeholder with a muted style.
    - **Right**: A "New Project" `Button` (Ghost variant with `Plus` icon) and a user avatar placeholder.

### 2. Studio Sidebar
Create `src/components/studio/studio-sidebar.tsx`.
- **Width**: Fixed 280px (`w-[280px]`).
- **Style**: Right border (`border-r border-border-default`), glassmorphism (`bg-surface/80 backdrop-blur-md`).
- **Content**:
    - **Navigation Section**: A vertical list of nav items with icons:
        - `LayoutDashboard` (Projects)
        - `Library` (Prompt Library)
        - `Calendar` (Scheduler)
        - `Settings` (Settings)
    - **Recent Projects**: A scrollable list placeholder for project names.
    - **Footer**: A "System Status" tag (Engine: Online) with a success indicator.

### 3. Studio Layout Shell
Create `src/app/(studio)/layout.tsx`.
- **Structure**:
    - Full viewport height (`h-screen overflow-hidden`).
    - Flex container for the Sidebar and the Content area.
    - Top-level Navbar.
- **Content Area**: A `flex-1` container that will hold the page content (The Stage). Ensure it uses `--bg-base`.

### 4. Integration
Update `src/app/page.tsx` to redirect to or render the studio dashboard.

## Scope Limits
- Do not implement actual database fetching or state management for projects.
- Do not build the "Stage" (video player area) yet.
- Do not implement sidebar collapse/expand logic.
- Do not add complex animations.

## Check When Done
- [ ] Navbar and Sidebar are fixed and correctly positioned.
- [ ] Sidebar uses the glassmorphism effect correctly.
- [ ] All icons from `lucide-react` are `h-5 w-5`.
- [ ] Typography matches the "Studio Engine" spec (Geist Sans/Mono).
- [ ] Layout is responsive (desktop-first focus).
