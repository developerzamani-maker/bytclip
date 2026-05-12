# Feature: Design System Foundation

Read `AGENTS.md` and `context/ui-context.md` before starting.

We're adding the design system foundation and core UI primitives to establish the "Studio Engine" aesthetic.

## Implementation Tasks

1.  **Tailwind Configuration**: Update `tailwind.config.ts` to include the color tokens and glassmorphism utilities defined in `context/ui-context.md`.
2.  **Global Styles**: Update `src/app/globals.css` to implement the "Studio Engine" base styles (absolute dark background, foreground colors).
3.  **Typography**: Configure **Geist Sans** and **Geist Mono** in `src/app/layout.tsx`.
4.  **Utils**: Create `src/lib/utils.ts` with a `cn()` helper for merging Tailwind classes.
5.  **Core Primitives**: Implement the following atomic components in `src/components/` using Radix UI where necessary:
    - `Button`: Multiple variants (primary, ghost, outline) with the "Bytclip Violet" accent.
    - `Card`: With the defined glassmorphism (`bg-slate-900/40 backdrop-blur-md border border-slate-700/50`).
    - `Input` & `Textarea`: Sleek, dark input fields with `border-slate-800`.
    - `Stage`: A container for the video player with distinct surface coloring.

## Check When Done

- [ ] `npm run lint` passes.
- [ ] Components render correctly with the dark "Studio" theme.
- [ ] Glassmorphism effect is visible on Card and Sidebars.
- [ ] `cn()` utility works for conditional class merging.
