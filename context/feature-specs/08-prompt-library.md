# Feature: AI Prompt Library UI

Read `AGENTS.md`, `context/architecture.md`, and `context/project_overview.md` before starting.

We are building the interface to manage the "Templates" used by the Gemini engine. Different brands and video styles require different "Complete Thought" criteria (e.g., a fast-paced comedy clip vs. a slow technical explanation). This feature allows the internal team to manage those criteria.

## Implementation Tasks

### 1. Library Sidebar UI
Create `src/components/studio/library-panel.tsx`.
- Implement this as a view within the existing `StudioSidebar` (Spec 02) when the "Library" tab is active.
- Display a list of all Prompts fetched from the Firestore `prompts` collection.
- Use a minimalist, high-contrast card list style.

### 2. Prompt Management Dialogs
Create `src/components/studio/prompt-dialog.tsx`.
- Create a Radix UI `Dialog` for creating and editing Prompts.
- Form fields: `title` (e.g., "Tech Deep Dive"), `tags` (e.g., "educational", "long-form"), and `content` (a `Textarea` for the actual system instructions).
- Integrate with the Firestore helper functions (`createPrompt`, `updatePrompt`) defined in Spec 04.

### 3. Selection Flow Integration
Update `src/components/studio/ingestion-stage.tsx`.
- Before clicking "Fetch Video" or "Upload", the user must select a Prompt Template from a dropdown menu.
- Store the `selectedPromptId` in the project state.
- Pass this ID to the `initProject` and subsequently to the `analyze-project` action so Gemini knows which rule set to follow.

## Scope Limits
- Do not implement user-specific or private prompts; all templates are globally shared among the internal team.
- Do not add complex prompt versioning or history tracking.
- Do not implement the actual Gemini analysis logic here (handled in Spec 07).

## Check When Done
- [ ] Users can view the list of seeded prompts in the Library sidebar.
- [ ] Users can create a new prompt and see it appear in the list instantly.
- [ ] The ingestion flow requires a prompt selection before proceeding.
- [ ] UI maintains the absolute dark base and glassmorphism standards.
