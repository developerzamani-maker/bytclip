import * as React from "react"
import { cn } from "@/lib/utils"

interface StageProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const Stage = React.forwardRef<HTMLDivElement, StageProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center w-full h-full bg-surface rounded-xl border border-border/50 overflow-hidden relative shadow-inner",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Stage.displayName = "Stage"

export { Stage }
