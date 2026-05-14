"use client";

import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { initProjectFromYoutube } from "@/actions/init-project";
import { extractSourceMetadata, extractSourceTranscript } from "@/actions/extract-source";
import { Loader2, PlaySquare, CheckCircle2 } from "lucide-react";

type ExtractionStep = "idle" | "init" | "metadata" | "transcript" | "done";

export function YoutubeInput() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<ExtractionStep>("idle");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic client-side validation
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!regex.test(url)) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    setLoading(true);
    setStep("init");
    try {
      // 1. Initialize project
      const initResult = await initProjectFromYoutube({ url });
      if (!initResult.success) {
        setError(initResult.error || "Failed to initialize project.");
        setLoading(false);
        setStep("idle");
        return;
      }

      const projectId = initResult.projectId;

      // 2. Fetch metadata
      setStep("metadata");
      const metadataResult = await extractSourceMetadata({ projectId, url });
      if (!metadataResult.success) {
        setError(metadataResult.error || "Failed to fetch metadata.");
        setLoading(false);
        setStep("idle");
        return;
      }

      // 3. Extract transcript
      setStep("transcript");
      const transcriptResult = await extractSourceTranscript({ projectId, url });
      if (!transcriptResult.success) {
        setError(transcriptResult.error || "Failed to extract transcript.");
        setLoading(false);
        setStep("idle");
        return;
      }

      setStep("done");
      setSuccess("Ready for Analysis.");
      setUrl(""); // Reset
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
      if (step !== "done") {
        setStep("idle");
      }
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <PlaySquare className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <Input
              type="url"
              placeholder="Paste YouTube URL here..."
              className="pl-10"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" disabled={loading || !url.trim()} variant="primary">
            {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {loading ? "Processing..." : "Fetch Video"}
          </Button>
        </div>
        
        {loading && (
          <div className="flex flex-col gap-2 mt-4 text-sm text-muted">
            <div className="flex items-center gap-2">
              {step === "init" ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
              <span className={step === "init" ? "text-primary" : "text-emerald-500"}>Initializing project...</span>
            </div>
            {(step === "metadata" || step === "transcript" || step === "done") && (
              <div className="flex items-center gap-2">
                {step === "metadata" ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                <span className={step === "metadata" ? "text-primary" : "text-emerald-500"}>Fetching Metadata...</span>
              </div>
            )}
            {(step === "transcript" || step === "done") && (
              <div className="flex items-center gap-2">
                {step === "transcript" ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                <span className={step === "transcript" ? "text-primary" : "text-emerald-500"}>Extracting Transcript...</span>
              </div>
            )}
          </div>
        )}

        {error && <p className="text-sm text-state-error text-red-500">{error}</p>}
        {success && <p className="text-sm text-state-success text-emerald-500">{success}</p>}
      </form>
    </div>
  );
}
