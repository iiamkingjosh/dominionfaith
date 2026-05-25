import type { LucideIcon } from 'lucide-react'

interface ModeCardProps {
  icon: LucideIcon
  title: string
  note: string
  schedule: { saturday: string; sunday: string }
  highlighted?: boolean
}

export default function ModeCard({ icon: Icon, title, note, schedule, highlighted }: ModeCardProps) {
  return (
    <div
      className="flex flex-1 flex-col gap-5 rounded-2xl p-7"
      style={{
        background: highlighted ? 'rgba(42,47,170,0.12)' : 'rgba(12,12,40,0.7)',
        border:     `1px solid ${highlighted ? 'rgba(42,47,170,0.5)' : 'rgba(255,255,255,0.08)'}`,
        boxShadow:  '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: 'rgba(42,47,170,0.2)', border: '1px solid rgba(42,47,170,0.3)' }}
        >
          <Icon size={20} style={{ color: '#2A2FAA' }} aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-[16px] font-black text-white">{title}</h3>
          <p className="text-[11px] text-white/40">{note}</p>
        </div>
      </div>
      <div className="border-t border-white/[0.07]" />
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-white/50">Saturday</span>
          <span className="text-[14px] font-bold text-white">{schedule.saturday}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[13px] text-white/50">Sunday</span>
          <span className="text-[14px] font-bold text-white">{schedule.sunday}</span>
        </div>
      </div>
    </div>
  )
}
