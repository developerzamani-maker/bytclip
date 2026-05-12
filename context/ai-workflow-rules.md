# AI Workflow Rules

Build this project incrementally using a spec-driven workflow. Context files (`architecture.md`, `ui-context.md`, `code-standards.md`) define what to build, how to build it, and the current state of progress. Always implement against these specs — do not infer or invent behavior from scratch.

## 1. Scoping Rules
*   **Atomic Features**: Work on one feature unit at a time.
*   **Atomic Components**: Work on one UI component at a time to ensure styling purity.
*   **Small Increments**: Prefer small, verifiable increments over large speculative changes.
*   **No Boundary Crossings**: Do not combine unrelated system boundaries (e.g., UI changes and background FFmpeg logic) in a single step.

## 2. When to Split Work
Split an implementation step if it combines:
*   UI changes and background task processing.
*   Multiple unrelated Server Actions or API routes.
*   Behavior not clearly defined in the context files.
*   If a change cannot be verified end-to-end within 10 minutes, the scope is too broad — split it.

## 3. Handling Missing Requirements
*   **No Guesswork**: Do not invent product behavior or UI states (e.g., 'loading', 'empty', 'error') not defined in `ui-context.md`.
*   **The "Ask" Protocol**: If a requirement is missing or ambiguous, **STOP** and ask for clarification. Record the decision in the relevant context file before continuing.
*   **Tracker Updates**: If a requirement is missing, add it as an open question in `progress-tracker.md` before proceeding.

## 4. Protected Files
Do not modify the following unless explicitly instructed:
*   `src/lib/core/` — These are engine primitives.
*   Any third-party library internals.
*   `architecture.md` (unless documenting a finalized structural decision).

## 5. Keeping Docs in Sync
Update the relevant context file whenever implementation changes:
*   System architecture or boundaries.
*   Storage model decisions (R2/Firestore).
*   Code conventions or standards.
*   Feature scope defined in `project_overview.md`.

## 6. Before Moving to the Next Unit
1.  The current unit works end-to-end within its defined scope.
2.  No invariant defined in `architecture.md` or `code-standards.md` was violated.
3.  **Linting Obligation**: `npm run lint` passes successfully.
4.  `progress-tracker.md` reflects the completed work with evidence of verification.
5.  `npm run build` passes for production parity check.
