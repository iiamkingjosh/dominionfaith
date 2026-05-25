// lib/live.ts
export function isLiveNow(): boolean {
  // Manual override for special events — set FORCE_LIVE=true in Vercel env vars,
  // no redeploy needed (page revalidates every 60s)
  if (process.env.FORCE_LIVE === 'true') return true

  const wat = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Lagos' }))
  const day = wat.getDay() // 0 = Sunday
  const totalMinutes = wat.getHours() * 60 + wat.getMinutes()
  // Sunday service: 9:00 AM (540 min) to 1:30 PM (810 min) WAT
  return day === 0 && totalMinutes >= 540 && totalMinutes < 810
}
