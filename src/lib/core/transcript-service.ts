import { YoutubeTranscript } from "youtube-transcript";

export interface TranscriptLine {
  start: number; // in seconds
  duration: number; // in seconds
  text: string;
}

export async function fetchTranscript(url: string): Promise<TranscriptLine[]> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    
    return transcript.map(line => ({
      start: line.offset / 1000,
      duration: line.duration / 1000,
      text: line.text,
    }));
  } catch (error) {
    console.error("[TranscriptService] Failed to fetch transcript:", error);
    throw new Error("Failed to extract transcript. The video may not have captions enabled.");
  }
}
