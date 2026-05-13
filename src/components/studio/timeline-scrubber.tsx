import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

interface TimelineScrubberProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  // Add any custom props if needed
}

const TimelineScrubber = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  TimelineScrubberProps
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center group cursor-pointer",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-surface/50">
      <SliderPrimitive.Range className="absolute h-full bg-accent" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border border-accent bg-primary shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 opacity-0 group-hover:opacity-100" />
  </SliderPrimitive.Root>
))
TimelineScrubber.displayName = "TimelineScrubber"

export { TimelineScrubber }
