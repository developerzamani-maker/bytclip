import ytdl from "@distube/ytdl-core";

export interface YouTubeMetadata {
  title: string;
  duration: number; // in seconds
  thumbnailUrl: string;
  author: string;
}

export async function fetchYouTubeMetadata(url: string): Promise<YouTubeMetadata> {
  try {
    const info = await ytdl.getInfo(url);
    const videoDetails = info.videoDetails;

    // Try to get highest resolution thumbnail
    const thumbnails = videoDetails.thumbnails;
    const bestThumbnail = thumbnails.length > 0 
      ? thumbnails[thumbnails.length - 1].url 
      : "";

    return {
      title: videoDetails.title,
      duration: parseInt(videoDetails.lengthSeconds, 10) || 0,
      thumbnailUrl: bestThumbnail,
      author: videoDetails.author.name,
    };
  } catch (error) {
    console.error("[YouTubeMetadata] Failed to fetch metadata:", error);
    throw new Error("Failed to fetch YouTube metadata. Please check if the video is valid, public, and not age-restricted.");
  }
}
