# Bytclip Code Standards

This document defines the strict engineering constraints for the Bytclip Studio Engine. **Styling**: Tailwind CSS (Modern, Premium Dark "Studio" aesthetic with glassmorphism). These rules are adversarial: they explicitly forbid patterns that lead to technical debt, security leaks, or performance bottlenecks.

## 1. General Principles
*   **Boring by Default**: Forbidden from using experimental React features or unproven libraries. If it’s not in the approved stack, don’t import it.
*   **Root Cause Only**: Never layer a workaround on a symptom. If a job fails, fix the logic, do not just "try-catch" the error and move on.
*   **No Ghost Logic**: Every function must have a clear purpose. No "utility" files that act as junk drawers.

## 2. TypeScript & Zod Validation
*   **The Any Ban**: Use of `any` is strictly forbidden. Use `unknown` and a type-guard or Zod schema.
*   **Boundary Validation**: All external input (YouTube URLs, API request bodies, Manual Uploads) **MUST** be parsed through a Zod schema before hitting any business logic. No exceptions.
*   **Assertion Prohibition**: Forbidden from using type assertions (`as Type`) to silence the compiler. If the type is wrong, fix the source.

## 3. Next.js & Server Actions
*   **Server Component Default**: All components are Server Components by default. Use of `'use client'` is **FORBIDDEN** unless interactivity (hooks, event listeners) is technically required.
*   **Mutation Constraint**: All data mutations **MUST** use Next.js Server Actions. Internal API Routes (`/api/*`) are forbidden for app-driven mutations; they are reserved for external webhooks only.
*   **State Management**: Forbidden from using heavy client-side state (Redux/Zustand) for data that belongs in the URL or the database.

## 4. Styling (Tailwind CSS)
*   **Styling**: Tailwind CSS (Utility-First naming)
*   **Token Purity**: Forbidden from using arbitrary values (e.g., `bg-[#123456]`). Use the design system tokens defined in the Tailwind config.
*   **Utility Naming**: Use Tailwind utility classes directly in your components for maximum speed and consistency.
*   **Interactive States**: All interactive elements (buttons, links) **MUST** have explicit `hover:`, `active:`, and `focus:` states defined via Tailwind.

## 5. Data & Storage
*   **Strict Separation**: Videos **NEVER** go in Firestore. Metadata **NEVER** goes in R2 filenames.
*   **Atomic Operations**: Mutations involving job status must use Firestore Transactions or atomic `updateDoc` calls. No "read-then-write" patterns that cause race conditions.
*   **Cleanup Obligation**: Any function that creates a temporary file in `/tmp` is **OBLIGATED** to delete it before exit, even in error states.

## 6. File Organization
*   `src/app/` — Routes, Layouts, and Page components.
*   `src/components/` — Reusable, atomic UI components.
*   `src/actions/` — All Server Actions for data mutations.
*   `src/schemas/` — Central repository for all Zod validation schemas.
*   `src/lib/` — Core engine logic (Firebase, R2, Gemini, FFmpeg).
*   `src/hooks/` — Custom React hooks (Client-side only).
## 7. AI Engine
*   **Model Agnostic**: Forbidden from hardcoding model strings (e.g., `gemini-1.5-pro`). Always fetch the `modelId` from the request or project config.
*   **Prompt Purity**: System instructions **MUST** be fetched from Firestore, never hardcoded in the codebase.
