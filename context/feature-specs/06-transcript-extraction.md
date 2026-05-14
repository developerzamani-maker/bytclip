# Feature: YouTube Metadata & Transcript Extraction

Read `AGENTS.md`, `context/architecture.md`, and `context/project_overview.md` before starting.

We are implementing the backend logic to extract essential metadata and transcripts from YouTube videos. This is the first step in the "Complete Thought" engine and is part of Phase 2: Ingestion & Intelligence.

## Implementation Tasks

### 1. YouTube Metadata Fetcher
Create `src/lib/core/youtube-metadata.ts`.
- Implementation of a server-side utility to fetch video title, duration, thumbnail, and author via `ytdl-core` or a similar lightweight wrapper.
- Handle error states for private, age-restricted, or non-existent videos.

### 2. Transcript Extraction Service
Create `src/lib/core/transcript-service.ts`.
- Fetch the automated or manual transcript for a given video ID.
- Format the transcript into a clean JSON array: `[{ start: number, duration: number, text: string }]`.
- Implement fallback logic if no transcript is available.

### 3. Extraction Server Action
Create `src/actions/extract-source.ts`.
- Integrate the metadata and transcript services.
- Update the Firestore `Project` record with the fetched metadata and raw transcript.
- Trigger this action automatically once a YouTube URL is submitted in the UI (Spec 03).

### 4. Progress Feedback UI
Update `src/components/studio/ingestion-stage.tsx`.
- Add a status indicator for the extraction process: "Fetching Metadata..." -> "Extracting Transcript..." -> "Ready for Analysis."

## Scope Limits
- Do not implement the Gemini analysis logic (Spec 07).
- Do not handle local file transcription (Whisper) in this unit; YouTube transcripts only.
- Do not download the actual video file yet.

## Check When Done
- [ ] Submitting a YouTube URL populates the project in Firestore with title and transcript.
- [ ] Transcripts are correctly timestamped in seconds.
- [ ] Handle videos without transcripts gracefully (error message to user).
- [ ] No sensitive API keys are exposed.
