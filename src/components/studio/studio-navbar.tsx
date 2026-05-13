import { Button } from "@/components/Button";
import { Plus } from "lucide-react";

export function StudioNavbar() {
  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border-default bg-bg-base px-6">
      <div className="flex items-center">
        <span className="font-mono text-xl font-bold text-[var(--accent-primary)]">Bytclip</span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <span className="text-sm font-medium text-muted">Untitled Project</span>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="gap-2">
          <Plus className="h-5 w-5" />
          <span>New Project</span>
        </Button>
        <div className="h-8 w-8 rounded-full bg-surface" />
      </div>
    </header>
  );
}
