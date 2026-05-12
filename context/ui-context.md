# UI Context

## Theme

Bytclip utilizes a "Studio Engine" aesthetic — a premium, high-performance dark mode environment designed for long hours of professional video editing and AI review. 

The visual language is characterized by:
- **Absolute Dark Base**: Deep near-black backgrounds for maximum focus.
- **Layered Surfaces**: Using subtle value changes and border separators instead of heavy shadows.
- **Glassmorphism**: `bg-slate-900/40 backdrop-blur-md border border-slate-700/50`.
- **Colors**: Tailwind-based palette (`bg-slate-950`, `text-slate-50`, `border-slate-800`).
- **Vivid Accents**: High-contrast "Bytclip Violet" for primary actions and status indicators.

## Colors

| Role            | CSS Variable       | Value     |
| --------------- | ------------------ | --------- |
| Page background | `--bg-base`        | `#09090b` |
| Surface         | `--bg-surface`     | `#18181b` |
| Primary text    | `--text-primary`   | `#fafafa` |
| Muted text      | `--text-muted`     | `#a1a1aa` |
| Primary accent  | `--accent-primary` | `#8b5cf6` |
| Border          | `--border-default` | `#27272a` |
| Error           | `--state-error`    | `#ef4444` |
| Success         | `--state-success`  | `#10b981` |

## Typography

| Role      | Font       | Variable      |
| --------- | ---------- | ------------- |
| UI text   | Geist Sans | `--font-sans` |
| Code/mono | Geist Mono | `--font-mono` |

## Border Radius

| Context           | Class          | Value  |
| ----------------- | -------------- | ------ |
| Inline / small UI | `rounded-md`   | `6px`  |
| Cards / panels    | `rounded-xl`   | `12px` |
| Modals / overlays | `rounded-2xl`  | `16px` |

## Component Library

- **Framework**: Custom components built with Tailwind CSS and Radix UI primitives.
- **Location**: Components live in `src/components/`.
- **Usage**: Follow the "Studio Engine" aesthetic defined in the Theme section.


## Layout Patterns

- **Studio Editor**: Full-viewport layout. Left sidebar for project/asset management (280px), central "Stage" for video review, and right sidebar for AI justification and scheduling controls.
- **Glass Sidebars**: Fixed width with `bg-surface/80` and `backdrop-blur-md` for a premium layered feel.
- **The Stage**: The central video player area uses a slightly lighter background (`--bg-surface`) to create a focal point.
- **Modal Overlays**: Centered containers with `bg-base/40` backdrops and `backdrop-blur-lg`.

## Icons

- **Library**: Lucide React.
- **Style**: Stroke-based icons only (thin or regular weight).
- **Sizing**: 
  - `h-4 w-4` for inline text and small buttons.
  - `h-5 w-5` for standard action buttons and navigation.

