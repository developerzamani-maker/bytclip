# Feature: Studio Video Player

Read `AGENTS.md`, `context/architecture.md`, and `context/project_overview.md` before starting.

We are building the "Stage" core component: a custom, premium video player interface. This is where users will review ingested content and verify the AI-suggested clips. For now, it will be a standalone UI component capable of playing a standard video URL.

## Implementation Tasks

### 1. The Stage Container
Update or create `src/components/studio/stage.tsx`.
- This component should act as the central hub of the studio layout, taking up the majority of the screen real estate (`flex-1`).
- Maintain the absolute dark background (`bg-bg-base`) to keep focus on the video content.

### 2. Custom Video Player Component
Create `src/components/studio/video-player.tsx`.
- Implement a custom HTML5 `<video>` element wrapper.
- Hide the default browser controls (`controls={false}`).
- Build a custom control bar at the bottom with glassmorphism (`bg-surface/80 backdrop-blur-md`).
- **Controls must include**:
  - Play/Pause toggle (use Lucide `Play` and `Pause` icons).
  - Current Time / Total Duration display (formatted as `MM:SS`).
  - Mute/Unmute toggle (use Lucide `Volume2` and `VolumeX`).

### 3. Timeline Scrubber
Create `src/components/studio/timeline-scrubber.tsx` (or integrate into the control bar).
- Implement a custom range input or Radix UI Slider for scrubbing through the video.
- Ensure the scrubber uses the Bytclip Violet (`--accent-primary`) to indicate progress.
- Support clicking to seek and dragging to scrub.

### 4. Integration
Update `src/app/(studio)/dashboard/page.tsx` (or the relevant layout page).
- If a project/video is loaded, render the `VideoPlayer`. If not, render the `IngestionStage` (from Spec 03).
- Use a dummy video URL (e.g., a standard public MP4) for initial testing.

## Scope Limits
- Do not implement the "AI Segments" overlay on the timeline yet (Spec 09).
- Do not add "Trim" handles or clip boundary controls yet.
- Do not connect to actual R2/YouTube streams (use a static dummy URL).
- Do not implement complex video rendering or canvas filters.

## Check When Done
- [ ] Custom video player plays, pauses, and scrubs correctly.
- [ ] Default browser controls are completely hidden.
- [ ] Scrubber visually updates as the video plays.
- [ ] Control bar maintains the "Studio Engine" premium aesthetic.
- [ ] Audio toggle works correctly.
