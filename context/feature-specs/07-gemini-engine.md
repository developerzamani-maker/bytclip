# Feature: Gemini "Complete Thought" Engine

Read `AGENTS.md`, `context/architecture.md`, and `context/project_overview.md` before starting.

We are implementing the core intelligence layer of Bytclip. This engine uses the Google AI SDK to analyze a video's transcript and identify "Complete Thoughts"—narratively cohesive segments with a clear setup, climax, and resolution.

## Implementation Tasks

### 1. AI SDK Integration
Create `src/lib/core/gemini-service.ts`.
- Initialize the Google AI SDK using `@ai-sdk/google`.
- Create a function `analyzeTranscript` that accepts:
  - The raw transcript (from Spec 06).
  - The selected Prompt Template content (from Spec 08).
- Ensure the model string is dynamic and fetched from the user's settings, not hardcoded.

### 2. Structured Output Schema
Update `src/lib/core/gemini-service.ts`.
- Use the `generateObject` function from the AI SDK.
- Define a strict Zod schema for the expected AI output: an array of objects containing `startTime` (seconds), `endTime` (seconds), `title` (short string), and `justification` (why this is a complete thought based on the prompt).

### 3. Analysis Server Action
Create `src/actions/analyze-project.ts`.
- A Server Action that fetches the project's transcript from Firestore.
- Calls `analyzeTranscript` with the text and prompt.
- Maps the AI's structured output into `Segment` documents (defined in Spec 04) and saves them to the `projects/{projectId}/segments` sub-collection in Firestore with a status of `pending`.

### 4. Integration with UI
Update `src/components/studio/ingestion-stage.tsx`.
- After successful metadata/transcript extraction, trigger the `analyze-project` action.
  - Show an "Analyzing with Gemini..." loading state.
  - Upon completion, transition the layout to the main Reviewer Stage.

### 5. Model Selection Settings UI
Create `src/components/studio/settings-panel.tsx`.
- Implement a view for the "Settings" tab in the sidebar.
- Add a dropdown menu to select the Gemini model (e.g., `gemini-1.5-pro`, `gemini-1.5-flash`, `gemini-2.0-flash`, `gemini-3.0-pro`, etc.).
- Persist this selection (e.g., in Firestore or local storage) and ensure the `analyze-project` action uses the selected model.

## Scope Limits
- Do not build the visual timeline to review these segments yet (Spec 09).
- Do not trigger FFmpeg video processing.
- Do not implement real-time streaming of the AI response (wait for the full structured object).

## Check When Done
- [ ] Passing a transcript to the Server Action successfully creates `Segment` documents in the local Firestore emulator.
- [ ] The generated segments strictly follow the Zod schema (valid timestamps and titles).
- [ ] The AI analysis correctly utilizes the model selected by the user in the Settings panel.
