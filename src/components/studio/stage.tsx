import * as React from "react"
import { cn } from "@/lib/utils"

export interface StudioStageProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function StudioStage({ className, children, ...props }: StudioStageProps) {
  return (
    <div
      className={cn(
        "flex-1 w-full h-full bg-base flex items-center justify-center relative overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
