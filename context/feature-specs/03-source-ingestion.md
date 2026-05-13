# Feature: Source Ingestion UI

Read `AGENTS.md`, `context/architecture.md`, and `context/project_overview.md` before starting.

We are building the user interface for ingesting video content into Bytclip. This supports two primary flows: pasting a YouTube URL and uploading large video files directly to the studio. Since authentication is deferred, this UI will be the initial entry point of the application.

## Implementation Tasks

### 1. Ingestion Stage UI
Create `src/components/studio/ingestion-stage.tsx`.
- Design a centered, high-contrast container within the "Stage" area of the layout.
- Tabs for "YouTube Link" and "Local Upload."
- Use the `Card` primitive with glassmorphism for the input area.

### 2. YouTube Input Component
Create `src/components/studio/youtube-input.tsx`.
- An `Input` field with a "Bytclip Violet" `Button` ("Fetch Video").
- Implementation of client-side regex validation for YouTube URLs.
- Loading state indicator while the system "handshakes" with the URL.

### 3. File Upload Zone
Create `src/components/studio/upload-zone.tsx`.
- A drag-and-drop area for large video files (up to 3 hours/2GB).
- Progress bar implementation (visual only for now).
- File type validation (MP4, MKV, MOV).

### 4. Project Initialization Action
Create `src/actions/init-project.ts`.
- A Server Action to receive the validated source (URL or File metadata).
- For now, it should log the input and return a success message.
- This action will eventually trigger the actual ingestion logic (FFmpeg/Download).

## Scope Limits
- Do not implement the actual YouTube download logic (Spec 06).
- Do not implement the actual R2 file upload logic (Spec 13).
- Do not build the "Reviewer Stage" (Spec 09).
- Keep all logic ephemeral; do not save to Firestore yet.

## Check When Done
- [ ] Users can toggle between YouTube and Upload tabs.
- [ ] YouTube URL validation correctly identifies invalid links.
- [ ] Drag-and-drop zone highlights when a file is hovered.
- [ ] Clicking "Fetch" or "Upload" triggers the server action without errors.
- [ ] UI maintains the "Studio Engine" aesthetic with absolute dark backgrounds.
