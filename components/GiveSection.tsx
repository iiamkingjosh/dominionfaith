'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Lock, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react'
import confetti from 'canvas-confetti'

// ── Types ─────────────────────────────────────────────────────
type TierId = 'offering' | 'monthly' | 'kingdom-seed' | 'honor-seed'
type MethodId = 'card' | 'bank' | 'mobile'
type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface GiveFormData {
  tier: TierId
  amount: string
  customAmount: string
  name: string
  email: string
  method: MethodId
}

interface FormErrors {
  amount?: string
  name?: string
  email?: string
}

// ── Data ──────────────────────────────────────────────────────
const TIERS = [
  {
    id: 'offering' as TierId,
    label: 'Offering',
    description: 'Give from your heart as the Spirit moves. Every willing heart is precious before God.',
    icon: '🙏',
  },
  {
    id: 'monthly' as TierId,
    label: 'Monthly Partner',
    description: 'Become a covenant partner in the work of the Kingdom. Your faithfulness sustains the mission.',
    icon: '♾',
    popular: true,
  },
  {
    id: 'kingdom-seed' as TierId,
    label: 'Kingdom Seed',
    description: 'Sow a bold seed into Kingdom expansion. What you plant today shapes the harvest of tomorrow.',
    icon: '🌱',
  },
  {
    id: 'honor-seed' as TierId,
    label: 'Honor Seed',
    description: 'Give in honour or memory of a loved one. Let your gift become their living legacy.',
    icon: '❤',
  },
]

const PRESETS = [
  { label: '₦1,000',  value: '1000'  },
  { label: '₦5,000',  value: '5000'  },
  { label: '₦10,000', value: '10000' },
  { label: '₦50,000', value: '50000' },
  { label: 'Custom',  value: 'custom' },
]

const METHODS = [
  { id: 'card'   as MethodId, label: 'Card',          emoji: '💳' },
  { id: 'bank'   as MethodId, label: 'Bank Transfer',  emoji: '🏦' },
  { id: 'mobile' as MethodId, label: 'Mobile Money',   emoji: '📱' },
]

// 0ms in test so success state is reachable without fake timers
const PAYMENT_DELAY_MS = process.env.NODE_ENV === 'test' ? 0 : 1500

// ── Validation ────────────────────────────────────────────────
function validate(data: GiveFormData): FormErrors {
  const errors: FormErrors = {}
  const resolvedAmount = data.amount === 'custom' ? data.customAmount : data.amount
  if (!resolvedAmount || Number(resolvedAmount) <= 0) {
    errors.amount = 'Please enter a valid amount'
  }
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name'
  }
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }
  return errors
}

// ── Framer Motion ─────────────────────────────────────────────
const EASE_OUT = [0.16, 1, 0.3, 1] as const
const MotionDiv = motion.div

// ── Component ─────────────────────────────────────────────────
export default function GiveSection() {
  const [form, setForm] = useState<GiveFormData>({
    tier: 'offering',
    amount: '5000',
    customAmount: '',
    name: '',
    email: '',
    method: 'card',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [formState, setFormState] = useState<FormState>('idle')

  const update = useCallback(
    <K extends keyof GiveFormData>(key: K, value: GiveFormData[K]) => {
      setForm(prev => ({ ...prev, [key]: value }))
      const errKey = (key === 'customAmount' ? 'amount' : key) as keyof FormErrors
      setErrors(prev => ({ ...prev, [errKey]: undefined }))
    },
    [],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      const errs = validate(form)
      if (Object.keys(errs).length > 0) { setErrors(errs); return }
      setErrors({})
      setFormState('submitting')

      const resolvedAmt = form.amount === 'custom' ? form.customAmount : form.amount

      const launchConfetti = () => confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F9A916', '#F61F27', '#2A2FAA', '#ffffff', '#FFD700'],
      })

      const onSuccess = () => {
        setFormState('success')
        launchConfetti()
      }

      // ── Paystack integration ──────────────────────────────
      // Activated when NEXT_PUBLIC_PAYSTACK_KEY is set in .env.local
      const key = process.env.NEXT_PUBLIC_PAYSTACK_KEY
      const PaystackPop = typeof window !== 'undefined' ? (window as any).PaystackPop : null

      if (key && PaystackPop) {
        PaystackPop.setup({
          key,
          email: form.email,
          amount: Number(resolvedAmt) * 100, // Paystack expects kobo
          currency: 'NGN',
          channels: ['card', 'bank', 'mobile_money'],
          metadata: {
            custom_fields: [
              { display_name: 'Full Name', variable_name: 'name', value: form.name },
              { display_name: 'Giving Type', variable_name: 'tier', value: form.tier },
            ],
          },
          callback: onSuccess,
          onClose: () => setFormState('idle'),
        }).openIframe()
        return
      }

      // ── Demo mode (no key set) ────────────────────────────
      try {
        await new Promise<void>(resolve => setTimeout(resolve, PAYMENT_DELAY_MS))
        onSuccess()
      } catch {
        setFormState('error')
      }
    },
    [form],
  )

  const reset = useCallback(() => {
    setFormState('idle')
    setForm(prev => ({ ...prev, name: '', email: '', amount: '5000', customAmount: '' }))
    setErrors({})
  }, [])

  const resolvedAmount = form.amount === 'custom' ? form.customAmount : form.amount
  const displayAmount = resolvedAmount
    ? Number(resolvedAmount).toLocaleString('en-NG', {
        style: 'currency', currency: 'NGN', minimumFractionDigits: 0,
      })
    : '...'

  // ── Success state ─────────────────────────────────────────
  if (formState === 'success') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center py-20 px-4">
        <MotionDiv
          className="card-double-bezel w-full max-w-md p-8 text-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          <div
            className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background: 'rgba(249,169,22,0.12)',
              border: '1px solid rgba(249,169,22,0.35)',
            }}
          >
            <CheckCircle className="h-8 w-8" style={{ color: 'var(--color-live)' }} aria-hidden="true" />
          </div>
          <h2 className="mb-2 text-2xl font-black text-white">
            Thank you, {form.name.split(' ')[0] || 'friend'}!
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-white/55">
            {form.tier === 'monthly' && (
              <>Your monthly partnership of <strong className="text-white/85">{displayAmount}</strong> has been received.</>
            )}
            {form.tier === 'honor-seed' && (
              <>Your honor seed of <strong className="text-white/85">{displayAmount}</strong> to our dear Man of God has been received.</>
            )}
            {form.tier !== 'monthly' && form.tier !== 'honor-seed' && (
              <>Your {TIERS.find(t => t.id === form.tier)?.label.toLowerCase()} of <strong className="text-white/85">{displayAmount}</strong> has been received.</>
            )}
            {' '}Heaven records every seed sown in faith. A confirmation will be sent to{' '}
            <strong className="text-white/85">{form.email}</strong>.
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white/70 transition-colors hover:text-white"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Give Again
          </button>
        </MotionDiv>
      </div>
    )
  }

  // ── Main form ─────────────────────────────────────────────
  return (
    <div className="px-6 py-24 md:px-16 lg:px-24">

      {/* Headline */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5"
          style={{
            background: 'rgba(249,169,22,0.08)',
            borderColor: 'rgba(249,169,22,0.2)',
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-live)' }} />
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: 'var(--color-live)' }}
          >
            Give
          </span>
        </div>
        <h1
          className="font-black text-white leading-none tracking-[-0.03em]"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
        >
          Partner With Us
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/45">
          Every seed you sow is an act of faith. God honours the cheerful giver — and your generosity
          fuels the mission of raising champions across the nations.
        </p>
      </div>

      {/* Tier cards — 2×2 grid, wider than the form */}
      <div className="mx-auto mb-8 max-w-4xl">
      <div className="grid grid-cols-2 gap-4">
        {TIERS.map(tier => {
          const isSelected = form.tier === tier.id
          return (
            <button
              key={tier.id}
              type="button"
              aria-label={tier.label}
              aria-pressed={isSelected}
              onClick={() => update('tier', tier.id)}
              className="relative rounded-2xl p-4 text-left transition-all duration-200"
              style={{
                background: isSelected ? 'var(--give-tier-selected-bg)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isSelected ? 'var(--give-tier-selected-border)' : 'rgba(255,255,255,0.1)'}`,
              }}
            >
              {tier.popular && (
                <span
                  className="absolute -top-2.5 left-3 rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em]"
                  style={{ background: 'var(--color-live)', color: '#000' }}
                >
                  Popular
                </span>
              )}
              <span className="mb-2 block text-xl" aria-hidden="true">{tier.icon}</span>
              <p className="text-sm font-bold text-white">{tier.label}</p>
              <p className="mt-1 text-[11px] leading-snug text-white/40">{tier.description}</p>
            </button>
          )
        })}
      </div>
      </div>

      {/* Form card — intentionally narrower; forms look bad too wide */}
      <div className="mx-auto max-w-xl">
      <div className="card-double-bezel p-6 sm:p-8" role="form" aria-label="Giving form">
        <form onSubmit={handleSubmit} noValidate>

          {/* Amount presets */}
          <div className="mb-6">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
              Amount
            </p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(preset => {
                const isActive = form.amount === preset.value
                return (
                  <button
                    key={preset.value}
                    type="button"
                    aria-label={preset.label}
                    aria-pressed={isActive}
                    onClick={() => update('amount', preset.value)}
                    className="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
                    style={{
                      background: isActive ? 'var(--color-give)' : 'rgba(255,255,255,0.07)',
                      border: `1px solid ${isActive ? 'var(--color-give)' : 'rgba(255,255,255,0.12)'}`,
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    {preset.label}
                  </button>
                )
              })}
            </div>

            {form.amount === 'custom' && (
              <div className="mt-3">
                <input
                  type="number"
                  placeholder="Enter amount in naira"
                  value={form.customAmount}
                  onChange={e => update('customAmount', e.target.value)}
                  className={`input-glass w-full px-4 py-3 text-sm${errors.amount ? ' input-error' : ''}`}
                  aria-label="Custom amount in naira"
                  min="1"
                />
              </div>
            )}

            {errors.amount && (
              <p className="mt-2 flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-give)' }}>
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                {errors.amount}
              </p>
            )}
          </div>

          <div className="mb-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="give-name"
              className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50"
            >
              Full Name
            </label>
            <input
              id="give-name"
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              className={`input-glass w-full px-4 py-3 text-sm${errors.name ? ' input-error' : ''}`}
              autoComplete="name"
              aria-label="Full Name"
            />
            {errors.name && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-give)' }}>
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="give-email"
              className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50"
            >
              Email Address
            </label>
            <input
              id="give-email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => update('email', e.target.value)}
              className={`input-glass w-full px-4 py-3 text-sm${errors.email ? ' input-error' : ''}`}
              autoComplete="email"
              aria-label="Email Address"
            />
            {errors.email && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-give)' }}>
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

          {/* Payment method */}
          <div className="mb-6">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/50">
              Payment Method
            </p>
            <div className="flex gap-2">
              {METHODS.map(method => {
                const isActive = form.method === method.id
                return (
                  <button
                    key={method.id}
                    type="button"
                    aria-label={method.label}
                    aria-pressed={isActive}
                    onClick={() => update('method', method.id)}
                    className="flex flex-1 flex-col items-center gap-1.5 rounded-xl py-3 text-center transition-all duration-200"
                    style={{
                      background: isActive ? 'rgba(42,47,170,0.22)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isActive ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'}`,
                    }}
                  >
                    <span className="text-lg" aria-hidden="true">{method.emoji}</span>
                    <span className="text-[10px] font-semibold text-white/70">{method.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formState === 'submitting'}
            className="flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-bold text-white transition-opacity disabled:opacity-70"
            style={{
              background: 'var(--color-give)',
              boxShadow: '0 4px 24px rgba(246,31,39,0.4)',
            }}
          >
            {formState === 'submitting' ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2"
                  style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: 'white' }}
                  aria-hidden="true"
                />
                Processing...
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" aria-hidden="true" />
                Give Securely
              </>
            )}
          </button>

          {formState === 'error' && (
            <p className="mt-3 text-center text-xs" style={{ color: 'var(--color-give)' }}>
              Something went wrong. Please try again.
            </p>
          )}

          {/* SSL badge */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-white/30">
            <Lock className="h-3 w-3" aria-hidden="true" />
            <span className="text-[10px] tracking-[0.04em]">
              SSL secured · Your data is protected
            </span>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}
