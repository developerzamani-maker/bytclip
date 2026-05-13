"use server";

import { fileIngestionSchema, youtubeIngestionSchema } from "@/schemas/ingestion";
import { z } from "zod";
import { createProject } from "@/lib/firebase/firestore";
import crypto from "crypto";

type IngestionResponse = 
  | { success: true; message: string; projectId: string }
  | { success: false; error: string };

export async function initProjectFromYoutube(
  input: unknown
): Promise<IngestionResponse> {
  try {
    const parsed = youtubeIngestionSchema.parse(input);
    
    const projectId = crypto.randomUUID();

    // Create a new project record in Firestore
    await createProject({
      id: projectId,
      title: "Untitled Project",
      sourceType: "youtube",
      sourceUrl: parsed.url,
      status: "processing",
    });

    return {
      success: true,
      message: "Successfully initialized project from YouTube.",
      projectId,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Failed to initialize project." };
  }
}

export async function initProjectFromFile(
  input: unknown
): Promise<IngestionResponse> {
  try {
    const parsed = fileIngestionSchema.parse(input);
    
    // TODO: Implement actual R2 file upload logic (Spec 13)
    console.log("[Source Ingestion] Received File Metadata:", parsed);

    // Simulate async work
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Successfully initialized project from file.",
      projectId: `proj_file_${Date.now()}`
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: "Failed to initialize project." };
  }
}
