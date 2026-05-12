# Bytclip

## Overview

Bytclip is an internal high-volume video clipping engine designed to empower a small team of creators (2-7 members) to extract high-quality, "complete thought" segments from long-form content. By leveraging Gemini's large context window and FFmpeg's precision, it bypasses the cost and volume restrictions of commercial SaaS platforms while prioritizing narrative completeness over generic AI-cut logic.

## Goals

1. **Unlimited Throughput**: Process any number of videos and clips without per-minute or per-clip SaaS costs.
2. **Narrative Precision**: Automate the identification of "complete thoughts" (segments with a clear setup, climax, and resolution) to ensure viral-ready quality.
3. **Internal Efficiency**: Reduce the time from "long-form upload" to "social-ready clip" by at least 80% through automated timestamping and scheduling.

## Core User Flow

1. **Source Input**: User pastes a YouTube URL or uploads a 2-3 hour video file.
2. **Thematic Selection**: User selects a prompt from the internal library (e.g., "Discipline", "Comedy", "Technical Insight").
3. **AI Analysis**: Gemini analyzes the full transcript to identify segments that represent a "Complete Thought."
4. **Studio Review**: User reviews suggested segments in a "Premium Dark" dashboard, adjusting boundaries if necessary.
5. **Precision Clipping**: User triggers the FFmpeg engine to extract finalized clips.
6. **Automated Scheduling**: User schedules clips to social media via the `postforme.dev` API.

## Features

### Input & Processing
- **Multi-Source Ingestion**: YouTube metadata extraction and support for large (3hr+) video uploads.
- **FFmpeg Engine**: Precise, server-side clipping and transcoding to preserve narrative boundaries.
- **Background Job Queue**: Asynchronous processing for resource-heavy video operations.

### AI Intelligence
- **Complete Thought Engine**: Gemini-powered deep transcript analysis to find logically sound segments.
- **Prompt Library**: A collection of reusable AI templates to guide the analysis toward specific themes.
- **Metadata Generation**: Automated creation of titles, captions, and hashtags optimized for social platforms.

### Distribution & Management
- **postforme.dev Scheduler**: Native dashboard to manage and schedule the social media pipeline.
- **Thought Reviewer UI**: A high-contrast "Studio" interface for verifying AI suggestions.

## Scope

### In Scope
- YouTube transcript and metadata extraction.
- Support for large video file uploads (up to 3 hours).
- AI-driven segment identification (Complete Thought logic).
- Server-side precision clipping via FFmpeg.
- Integration with `postforme.dev` API for scheduling.
- Internal-use "Studio" dashboard with dark mode aesthetic.

### Out of Scope
- Multi-tenant user authentication (system is designed for a trusted internal team).
- Advanced non-linear video editing (Bytclip is a clipper, not a full editor).
- Direct hosting of final clips (optimized for export and social distribution).
- Mobile application (focused on a desktop-first studio workflow).

## Success Criteria

1. **Extraction Speed**: A user can identify and extract a playable 60s clip from a 3-hour video in under 5 minutes.
2. **AI Accuracy**: The "Complete Thought" engine correctly identifies logically complete segments with >80% accuracy.
3. **Pipeline Reliability**: Clips are successfully scheduled and posted to social platforms via `postforme.dev` without manual file handling.
