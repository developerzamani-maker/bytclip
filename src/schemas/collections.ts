import { z } from "zod";

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  sourceType: z.enum(["youtube", "upload"]),
  sourceUrl: z.string().url().optional(), // optional because an upload might not have a public URL immediately
  duration: z.number().optional(), // duration in seconds
  thumbnailUrl: z.string().url().optional(),
  author: z.string().optional(),
  rawTranscript: z.array(
    z.object({
      start: z.number(),
      duration: z.number(),
      text: z.string(),
    })
  ).optional(),
  status: z.enum(["processing", "ready", "error"]),
  createdAt: z.string(), // Using ISO string for cross-platform consistency
  updatedAt: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;

export const JobSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  type: z.enum(["extraction", "analysis", "clipping"]),
  status: z.enum(["queued", "running", "complete", "failed"]),
  result: z.string().optional(), // JSON string payload
  error: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Job = z.infer<typeof JobSchema>;

export const PromptSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(), // The AI prompt template
  tags: z.array(z.string()),
});

export type Prompt = z.infer<typeof PromptSchema>;
