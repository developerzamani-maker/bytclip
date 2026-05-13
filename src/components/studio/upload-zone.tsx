"use client";

import { useState, useCallback } from "react";
import { UploadCloud, Loader2, FileVideo } from "lucide-react";
import { initProjectFromFile } from "@/actions/init-project";

export function UploadZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    setError(null);
    setSuccess(null);

    const validTypes = ["video/mp4", "video/x-matroska", "video/quicktime"]; // mp4, mkv, mov
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp4|mkv|mov)$/i)) {
      setError("Invalid file type. Please upload MP4, MKV, or MOV files.");
      return;
    }

    setLoading(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    try {
      const result = await initProjectFromFile({
        name: file.name,
        size: file.size,
        type: file.type || (file.name.endsWith(".mp4") ? "video/mp4" : "video/x-matroska")
      });

      clearInterval(interval);
      setProgress(100);

      if (result.success) {
        setSuccess(result.message);
      } else {
        setError(result.error);
        setProgress(0);
      }
    } catch (err) {
      clearInterval(interval);
      setError("An unexpected error occurred during upload.");
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
          isDragging
            ? "border-accent bg-accent/10"
            : "border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/30"
        } ${loading ? "pointer-events-none opacity-80" : "cursor-pointer"}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !loading && document.getElementById("file-upload")?.click()}
      >
        <input
          id="file-upload"
          type="file"
          accept=".mp4,.mkv,.mov,video/mp4,video/x-matroska,video/quicktime"
          className="hidden"
          onChange={handleFileChange}
        />

        {loading ? (
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-accent" />
            <div className="text-sm font-medium text-primary">Uploading...</div>
            <div className="w-64 h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300 ease-out" 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 rounded-full bg-slate-800/50 p-4">
              <UploadCloud className="h-8 w-8 text-muted" />
            </div>
            <p className="mb-2 text-sm font-medium text-primary">
              Click or drag file to this area to upload
            </p>
            <p className="text-xs text-muted">
              Support for a single or bulk upload. Strictly prohibited from uploading company data or other
              banned files.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-xs text-muted">
              <FileVideo className="h-4 w-4" />
              <span>MP4, MKV, MOV up to 2GB</span>
            </div>
          </>
        )}
      </div>

      {error && <p className="mt-4 text-sm text-state-error text-red-500 text-center">{error}</p>}
      {success && <p className="mt-4 text-sm text-state-success text-emerald-500 text-center">{success}</p>}
    </div>
  );
}
