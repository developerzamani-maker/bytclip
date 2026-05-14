"use server";

import { z } from "zod";
import { fetchYouTubeMetadata } from "@/lib/core/youtube-metadata";
import { fetchTranscript } from "@/lib/core/transcript-service";
import { updateProject } from "@/lib/firebase/firestore";

const extractSourceSchema = z.object({
  projectId: z.string(),
  url: z.string().url(),
});

type ExtractResponse = 
  | { success: true; message: string }
  | { success: false; error: string };

export async function extractSourceMetadata(input: unknown): Promise<ExtractResponse> {
  try {
    const parsed = extractSourceSchema.parse(input);
    
    // Fetch metadata
    const metadata = await fetchYouTubeMetadata(parsed.url);
    
    // Update project with metadata
    await updateProject(parsed.projectId, {
      title: metadata.title,
      duration: metadata.duration,
      thumbnailUrl: metadata.thumbnailUrl,
      author: metadata.author,
    });
    
    return { success: true, message: "Metadata fetched successfully" };
  } catch (error) {
    console.error("[ExtractSource] Metadata error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to fetch metadata" 
    };
  }
}

export async function extractSourceTranscript(input: unknown): Promise<ExtractResponse> {
  try {
    const parsed = extractSourceSchema.parse(input);
    
    // Fetch transcript
    const transcript = await fetchTranscript(parsed.url);
    
    // Update project with transcript
    await updateProject(parsed.projectId, {
      rawTranscript: transcript,
      status: "ready", // Ready for analysis
    });
    
    return { success: true, message: "Transcript extracted successfully" };
  } catch (error) {
    console.error("[ExtractSource] Transcript error:", error);
    // Even if transcript fails, we might still want to mark as error or something
    await updateProject(parsed.projectId, {
      status: "error",
    }).catch(console.error);

    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to extract transcript" 
    };
  }
}
