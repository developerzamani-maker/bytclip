"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card";
import { YoutubeInput } from "./youtube-input";
import { UploadZone } from "./upload-zone";
import { cn } from "@/lib/utils";

type Tab = "youtube" | "upload";

export function IngestionStage() {
  const [activeTab, setActiveTab] = useState<Tab>("youtube");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 bg-base">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-2xl">Ingest Video Source</CardTitle>
          <CardDescription>
            Import a video via YouTube URL or upload a local file to begin editing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Custom Tabs */}
          <div className="mb-8 flex w-full rounded-md border border-slate-800 bg-slate-900/50 p-1">
            <button
              onClick={() => setActiveTab("youtube")}
              className={cn(
                "flex-1 rounded-sm py-2 text-sm font-medium transition-colors",
                activeTab === "youtube"
                  ? "bg-slate-800 text-primary shadow-sm"
                  : "text-muted hover:text-primary"
              )}
            >
              YouTube Link
            </button>
            <button
              onClick={() => setActiveTab("upload")}
              className={cn(
                "flex-1 rounded-sm py-2 text-sm font-medium transition-colors",
                activeTab === "upload"
                  ? "bg-slate-800 text-primary shadow-sm"
                  : "text-muted hover:text-primary"
              )}
            >
              Local Upload
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[200px] flex items-center justify-center">
            {activeTab === "youtube" ? <YoutubeInput /> : <UploadZone />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
