"use client";

import * as React from "react";
import { IngestionStage } from "@/components/studio/ingestion-stage";
import { StudioStage } from "@/components/studio/stage";
import { VideoPlayer } from "@/components/studio/video-player";

export default function DashboardPage() {
  // Mock state to demonstrate the Video Player.
  // Set to true to show the player, false to show the ingestion stage.
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
  
  // Public MP4 URL for testing
  const DUMMY_VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  return (
    <div className="flex h-full flex-col">
      {isVideoLoaded ? (
        <StudioStage>
          <VideoPlayer url={DUMMY_VIDEO_URL} />
        </StudioStage>
      ) : (
        <IngestionStage />
      )}
    </div>
  );
}
