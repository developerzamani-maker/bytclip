# Feature: Database Schema (Firestore)

Read `AGENTS.md`, `context/architecture.md`, and `context/project_overview.md` before starting.

We are establishing the core data persistence layer for Bytclip using Firebase Firestore. This spec defines the collections, documents, and Zod schemas for the fundamental entities: Projects, Jobs, and Prompts. Since we deferred Authentication, we will initialize the Firebase app here to allow public/anonymous reads/writes locally or in dev.

## Implementation Tasks

### 1. Firebase Initialization (If not already present)
Create `src/lib/firebase/config.ts`.
- Initialize the Firebase Client SDK using environment variables (`NEXT_PUBLIC_FIREBASE_...`).
- Export the `db` (Firestore) instance.
- Ensure initialization only happens once (Singleton pattern).

### 2. Core Zod Schemas
Create `src/schemas/collections.ts` (or individual files like `project.ts`, `job.ts`).
- Define the `Project` schema: `id`, `title`, `sourceType` (youtube | upload), `sourceUrl`, `status` (processing | ready | error), `createdAt`, `updatedAt`.
- Define the `Job` schema: `id`, `projectId`, `type` (extraction | analysis | clipping), `status` (queued | running | complete | failed), `result` (optional JSON), `error` (optional string).
- Define the `Prompt` schema: `id`, `title`, `content` (the AI prompt template), `tags`.

### 3. Firestore Typed Helpers
Create `src/lib/firebase/firestore.ts`.
- Implement typed helper functions to interact with collections safely:
    - `projects` collection: `createProject`, `getProject`, `updateProject`.
    - `jobs` collection: `createJob`, `updateJobStatus`.
    - `prompts` collection: `getPrompts`.
- Ensure all inputs and outputs are validated against the Zod schemas before interacting with Firestore.

### 4. Prompt Library Seeding (Optional but recommended)
Create a quick utility or script to seed the `prompts` collection with at least two default templates:
- "Complete Thought: Discipline"
- "Complete Thought: Technical Insight"

## Scope Limits
- Do not implement the UI to display these projects or jobs yet.
- Do not implement the actual backend worker logic that processes these jobs (e.g., FFmpeg or Gemini).
- Do not add user-level security rules in Firestore yet (since auth is deferred).

## Check When Done
- [ ] Zod schemas correctly define the shape of the data.
- [ ] TypeScript types are inferred successfully from the Zod schemas.
- [ ] Helper functions can successfully write and read a dummy Project to/from Firestore.
- [ ] Firebase initializes without errors in the console.
