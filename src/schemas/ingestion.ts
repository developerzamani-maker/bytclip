import { z } from "zod";

// YouTube Regex: Supports standard, shortened, and some embed formats
const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

export const youtubeIngestionSchema = z.object({
  url: z.string().url().regex(youtubeUrlRegex, {
    message: "Must be a valid YouTube URL",
  }),
});

export const fileIngestionSchema = z.object({
  name: z.string().min(1, { message: "File name is required" }),
  size: z.number().positive({ message: "File size must be greater than 0" }),
  type: z.enum(["video/mp4", "video/x-matroska", "video/quicktime"], {
    errorMap: () => ({ message: "Only MP4, MKV, and MOV formats are supported" }),
  }),
});

export type YoutubeIngestionInput = z.infer<typeof youtubeIngestionSchema>;
export type FileIngestionInput = z.infer<typeof fileIngestionSchema>;
