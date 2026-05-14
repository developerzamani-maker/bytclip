# Architecture Context

## Stack

| Layer     | Technology                  | Role                                      |
| --------- | --------------------------- | ----------------------------------------- |
| Framework | Next.js 16.2.6 (App Router)  | Full-stack dashboard and job management    |
| UI        | Tailwind CSS + Radix UI     | Premium "Studio" aesthetic and accessible primitives |
| Auth      | Firebase Auth               | Internal team authentication              |
| Database  | Firebase Firestore 12.13.0  | Metadata, job tracking, and prompt library |
| Storage   | Cloudflare R2 (S3-Compatible)| Persistent hosting for polished video clips |
| AI        | Google AI SDK (Gemini)      | Holistic context transcript analysis      |
| Video     | FFmpeg 8.1.1                | Server-side precision clipping            |

## System Boundaries

- `src/app/` — Owns the routing, layout, and page-level UI state.
- `src/actions/` — Owns all data mutations and background job initiations.
- `src/lib/core/` — Owns the engine primitives (FFmpeg wrappers, Gemini adapters, R2 clients).
- `src/schemas/` — Owns the Zod-based validation rules for all system inputs.
- `src/components/` — Owns reusable, atomic UI components and the "Studio Stage."

## Storage Model

- **Firebase Firestore**: Stores all system metadata, project configurations, AI-generated justifications, and post schedules.
- **Cloudflare R2**: Stores the finalized raw AI cuts and the polished brand clips for global distribution.
- **Ephemeral Server Storage (`/tmp`)**: Acts as a transient workshop for video downloads and FFmpeg operations. Content is wiped immediately after R2 upload.

## Auth and Access Model

- **Authentication**: Users sign in via Firebase Auth (Google Provider favored for internal team).
- **Access Control**: Since this is an internal "Studio" tool, authenticated team members have global access to all projects and brands.
- **Environment Isolation**: A `BYTCLIP_ENV` flag separates Dev and Prod data within the shared Firestore/R2 infrastructure.

## Development Environment

- **Firebase Local Emulator Suite**: For local development, the application connects to the Firebase Local Emulator for Firestore and Auth. This avoids writing to production during testing and allows local development without deploying security rules.

## Invariants

1. **Serial Processing**: The In-Memory queue must never allow more than one heavy FFmpeg job per Cloud Run instance to prevent OOM/Disk exhaustion.
2. **Cleanup Obligation**: Any function that creates a file in `/tmp` is strictly obligated to delete it before the process exits, even in failure states.
3. **Model Agnostic**: Model strings (e.g., "gemini-1.5-pro") must never be hardcoded in logic; they must be passed as job parameters.
4. **Validated Boundaries**: No external input (YouTube URL, file metadata, API payload) is trusted without a successful Zod schema parse.
5. **No Blob in Firestore**: Video data or large binary strings are strictly forbidden from being stored in Firestore.
