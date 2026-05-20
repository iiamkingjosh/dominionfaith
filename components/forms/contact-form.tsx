'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react'
import { contactSchema, SUBJECTS, type ContactFormData } from '@/schemas/contact.schema'
import { sendContactMessage } from '@/lib/actions/send-contact-message'

const MotionDiv = motion.div

// ── Field wrapper ──────────────────────────────────────────────
function Field({ label, error, required, children }: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[13px] font-semibold text-white/70">
        {label}{required && <span className="ml-1 text-[#F61F27]" aria-hidden="true">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <MotionDiv
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-[12px] font-medium"
            style={{ color: '#F61F27' }}
            role="alert"
          >
            <AlertCircle size={12} aria-hidden="true" />
            {error}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

const INPUT_BASE =
  'w-full rounded-xl border bg-transparent px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none transition-all duration-200'
const INPUT_IDLE    = 'border-white/10 focus:border-[#2A2FAA] focus:ring-2 focus:ring-[#2A2FAA]/20'
const INPUT_ERROR   = 'border-[#F61F27]/50 focus:border-[#F61F27] focus:ring-2 focus:ring-[#F61F27]/15'
const SELECT_BG     = 'bg-[#07071f]'

// ── Component ──────────────────────────────────────────────────
export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { callBack: false },
  })

  const messageValue = watch('message') ?? ''
  const charCount = messageValue.length

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting')
    const result = await sendContactMessage(data)
    if (result.success) {
      setStatus('success')
      setServerMessage(result.message)
      reset()
    } else {
      setStatus('error')
      setServerMessage(result.message)
    }
  }

  // ── Success state ──────────────────────────────────────────
  if (status === 'success') {
    return (
      <MotionDiv
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-5 rounded-3xl px-8 py-16 text-center"
        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ background: 'rgba(16,185,129,0.15)' }}
        >
          <CheckCircle size={32} style={{ color: '#10b981' }} />
        </div>
        <div>
          <h3 className="mb-2 text-xl font-black text-white">Message Sent!</h3>
          <p className="text-[14px] leading-relaxed text-white/60">{serverMessage}</p>
        </div>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 text-[13px] font-semibold underline text-white/40 hover:text-white/70 transition-colors"
        >
          Send another message
        </button>
      </MotionDiv>
    )
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
    >
      {/* Server error banner */}
      <AnimatePresence>
        {status === 'error' && serverMessage && (
          <MotionDiv
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 rounded-xl px-4 py-3 text-[13px]"
            style={{ background: 'rgba(246,31,39,0.08)', border: '1px solid rgba(246,31,39,0.25)', color: '#f87171' }}
            role="alert"
          >
            <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
            {serverMessage}
          </MotionDiv>
        )}
      </AnimatePresence>

      {/* Name + Email row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name?.message} required>
          <input
            type="text"
            placeholder="Pastor Joshua"
            autoComplete="name"
            {...register('name')}
            className={`${INPUT_BASE} ${errors.name ? INPUT_ERROR : INPUT_IDLE}`}
          />
        </Field>

        <Field label="Email Address" error={errors.email?.message} required>
          <input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register('email')}
            className={`${INPUT_BASE} ${errors.email ? INPUT_ERROR : INPUT_IDLE}`}
          />
        </Field>
      </div>

      {/* Phone + Subject row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone Number" error={errors.phone?.message}>
          <input
            type="tel"
            placeholder="+234 800 000 0000"
            autoComplete="tel"
            {...register('phone')}
            className={`${INPUT_BASE} ${errors.phone ? INPUT_ERROR : INPUT_IDLE}`}
          />
        </Field>

        <Field label="Subject" error={errors.subject?.message} required>
          <select
            {...register('subject')}
            className={`${INPUT_BASE} ${SELECT_BG} ${errors.subject ? INPUT_ERROR : INPUT_IDLE} appearance-none cursor-pointer`}
          >
            <option value="" disabled>Select a subject…</option>
            {SUBJECTS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* Message */}
      <Field label="Your Message" error={errors.message?.message} required>
        <div className="relative">
          <textarea
            rows={6}
            placeholder="How can we help you?"
            {...register('message')}
            className={`${INPUT_BASE} resize-none ${errors.message ? INPUT_ERROR : INPUT_IDLE}`}
          />
          <span
            className="absolute bottom-3 right-4 text-[11px] tabular-nums"
            style={{ color: charCount > 900 ? '#F61F27' : 'rgba(255,255,255,0.25)' }}
            aria-live="polite"
          >
            {charCount}/1000
          </span>
        </div>
      </Field>

      {/* Call-back checkbox */}
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          {...register('callBack')}
          className="h-4 w-4 cursor-pointer rounded accent-[#2A2FAA]"
        />
        <span className="text-[13px] text-white/60">
          I&apos;d like someone to call me back
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="flex w-full items-center justify-center gap-2.5 rounded-2xl py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-85 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg, #2A2FAA 0%, #F9A916 100%)' }}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send size={15} />
            Send Message
          </>
        )}
      </button>

      <p className="text-center text-[11px] text-white/25">
        We respond within 24–48 hours. For urgent matters call{' '}
        <a href="tel:+2347034543971" className="underline hover:text-white/50">+234 703 454 3971</a>.
      </p>
    </form>
  )
}
