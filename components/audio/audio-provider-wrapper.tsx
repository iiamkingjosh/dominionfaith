'use client'

import type { ReactNode } from 'react'
import { AudioPlayerProvider } from '@/context/audio-player-context'
import PodcastPlayer from '@/components/audio/podcast-player'

export default function AudioProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <AudioPlayerProvider>
      {children}
      <PodcastPlayer />
    </AudioPlayerProvider>
  )
}
