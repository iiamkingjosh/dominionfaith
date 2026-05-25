// app/live/page.tsx
import type { Metadata } from 'next'
import LiveView from '@/components/live/LiveView'
import OfflineView from '@/components/live/OfflineView'
import { isLiveNow } from '@/lib/live'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Watch Live — Dominion Faith International Ministry',
  description: 'Join our Sunday service live from anywhere. Watch the stream and give your offering online.',
}

export default function LivePage() {
  const channelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID ?? ''

  if (isLiveNow() && channelId) {
    return <LiveView channelId={channelId} />
  }

  return <OfflineView />
}
