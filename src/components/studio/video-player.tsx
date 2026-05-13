"use client"

import * as React from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { TimelineScrubber } from "./timeline-scrubber"
import { cn } from "@/lib/utils"

function formatTime(time: number) {
  if (isNaN(time)) return "00:00"
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

export interface VideoPlayerProps {
  url: string
  className?: string
}

export function VideoPlayer({ url, className }: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [isMuted, setIsMuted] = React.useState(false)
  const [isScrubbing, setIsScrubbing] = React.useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current && !isScrubbing) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleScrubChange = (value: number) => {
    setIsScrubbing(true)
    setCurrentTime(value)
    if (videoRef.current) {
      videoRef.current.currentTime = value
    }
  }

  const handleScrubCommit = () => {
    setIsScrubbing(false)
  }

  return (
    <div className={cn("relative w-full h-full flex flex-col group overflow-hidden bg-base", className)}>
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-contain"
        controls={false}
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Control Bar Overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-12 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex flex-col gap-3 rounded-xl bg-surface/80 backdrop-blur-md border border-border/50 p-3 shadow-lg">
          
          <div className="px-1">
            <TimelineScrubber 
              value={[currentTime]} 
              max={duration || 100} 
              onValueChange={(val) => handleScrubChange(val[0])}
              onPointerUp={handleScrubCommit}
            />
          </div>

          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-4">
              <button 
                onClick={togglePlay}
                className="text-primary hover:text-accent transition-colors outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-full p-1"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>
              
              <div className="text-xs font-mono text-muted select-none">
                <span className="text-primary">{formatTime(currentTime)}</span> / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={toggleMute}
                className="text-primary hover:text-accent transition-colors outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-full p-1"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
