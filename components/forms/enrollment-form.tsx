'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2, Upload, ChevronRight, ChevronLeft } from 'lucide-react'
import { enrollmentSchema, DISTRICTS, type EnrollmentData } from '@/schemas/enrollment.schema'
import { submitEnrollment } from '@/lib/actions/enroll'

const MotionDiv = motion.div

const INPUT_BASE  = 'w-full rounded-xl border bg-transparent px-4 py-3 text-[14px] text-white placeholder-white/25 outline-none transition-all duration-200'
const INPUT_IDLE  = 'border-white/10 focus:border-[#2A2FAA] focus:ring-2 focus:ring-[#2A2FAA]/20'
const INPUT_ERROR = 'border-[#F61F27]/50 focus:border-[#F61F27] focus:ring-2 focus:ring-[#F61F27]/15'

function Field({ label, error, required, hint, children, id }: {
  label: string; error?: string; required?: boolean; hint?: string
  children: React.ReactNode; id?: string
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[13px] font-semibold text-white/70">
        {label}{required && <span className="ml-1 text-[#F61F27]" aria-hidden="true">*</span>}
      </label>
      {hint && <p className="text-[11px] text-white/35">{hint}</p>}
      {children}
      <AnimatePresence>
        {error && (
          <MotionDiv
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-[12px] font-medium"
            style={{ color: '#F61F27' }} role="alert"
          >
            <AlertCircle size={12} aria-hidden="true" />{error}
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  )
}

function RadioGroup({ name, options, value, onChange, error }: {
  name: string; options: { value: string; label: string }[]
  value: string; onChange: (v: string) => void; error?: string
}) {
  return (
    <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label={name}>
      {options.map(opt => (
        <label
          key={opt.value}
          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-medium transition-all ${
            value === opt.value
              ? 'border-[#2A2FAA] bg-[#2A2FAA]/15 text-white'
              : 'border-white/10 text-white/60 hover:border-white/25 hover:text-white'
          }`}
        >
          <input type="radio" name={name} value={opt.value} checked={value === opt.value}
            onChange={() => onChange(opt.value)} className="sr-only" />
          {opt.label}
        </label>
      ))}
      {error && (
        <p className="flex w-full items-center gap-1.5 text-[12px] font-medium" style={{ color: '#F61F27' }}>
          <AlertCircle size={12} />{error}
        </p>
      )}
    </div>
  )
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload  = () => resolve(reader.result as string)
    reader.onerror = reject
  })
}

const STEP1_FIELDS: (keyof EnrollmentData)[] = [
  'email', 'passportPhoto', 'title', 'firstName', 'lastName', 'dateOfBirth',
  'gender', 'maritalStatus', 'nationality', 'phone', 'homeAddress', 'churchName',
  'district', 'programmeMode', 'employed', 'previousSOM',
]

export default function EnrollmentForm() {
  const [step,          setStep]          = useState(1)
  const [status,        setStatus]        = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [photoName,     setPhotoName]     = useState('')
  const [proofName,     setProofName]     = useState('')

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } =
    useForm<EnrollmentData>({ resolver: zodResolver(enrollmentSchema) })

  const titleVal  = watch('title')
  const employed  = watch('employed')
  const prevSOM   = watch('previousSOM')
  const district  = watch('district')
  const prevBible = watch('previousBibleCollege')

  const goToStep2 = async () => {
    const valid = await trigger(STEP1_FIELDS)
    if (valid) setStep(2)
  }

  const handleFileChange = (field: 'passportPhoto' | 'paymentProof', setName: (n: string) => void) =>
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file || file.size > 10 * 1024 * 1024) return
      setName(file.name)
      setValue(field, await fileToBase64(file), { shouldValidate: true })
    }

  const onSubmit = async (data: EnrollmentData) => {
    setStatus('submitting')
    const result = await submitEnrollment(data)
    if (result.success) { setStatus('success'); setServerMessage(result.message) }
    else                { setStatus('error');   setServerMessage(result.message) }
  }

  if (status === 'success') {
    return (
      <MotionDiv
        initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        className="mx-auto flex max-w-2xl flex-col items-center gap-6 rounded-3xl px-8 py-16 text-center"
        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: 'rgba(16,185,129,0.15)' }}>
          <CheckCircle size={32} style={{ color: '#10b981' }} />
        </div>
        <div>
          <h3 className="mb-3 text-2xl font-black text-white">Application Received!</h3>
          <p className="text-[15px] leading-relaxed text-white/60">{serverMessage}</p>
        </div>
      </MotionDiv>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {([1, 2] as const).map((n, i) => (
          <div key={n} className="flex items-center gap-2">
            {i > 0 && <div className="h-px w-8 bg-white/15" />}
            <div className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-black"
              style={{ background: step >= n ? '#2A2FAA' : 'rgba(255,255,255,0.08)', color: step >= n ? '#fff' : 'rgba(255,255,255,0.35)' }}>
              {n}
            </div>
            <span className={`text-[12px] font-semibold ${step === n ? 'text-white' : 'text-white/35'}`}>
              {n === 1 ? 'Personal Details' : 'Background & Declaration'}
            </span>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)} noValidate
        className="rounded-3xl p-8 md:p-10"
        style={{ background: 'rgba(12,12,40,0.7)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 0 5px rgba(8,8,28,0.7),0 0 0 6px rgba(255,255,255,0.04)' }}
      >
        <AnimatePresence>
          {status === 'error' && serverMessage && (
            <MotionDiv
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mb-6 flex items-start gap-3 rounded-xl px-4 py-3 text-[13px]"
              style={{ background: 'rgba(246,31,39,0.08)', border: '1px solid rgba(246,31,39,0.25)', color: '#f87171' }}
              role="alert"
            >
              <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />{serverMessage}
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* ─── STEP 1 ─── */}
        {step === 1 && (
          <div className="space-y-6">
            <Field label="Email Address" error={errors.email?.message} required id="email">
              <input id="email" type="email" placeholder="you@example.com" autoComplete="email"
                {...register('email')} className={`${INPUT_BASE} ${errors.email ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="Passport Photo" error={errors.passportPhoto?.message} required hint="PDF or image — max 10 MB">
              <label className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all ${errors.passportPhoto ? INPUT_ERROR : INPUT_IDLE}`}>
                <Upload size={16} className="flex-shrink-0 text-white/40" />
                <span className="truncate text-[14px] text-white/40">{photoName || 'Choose file…'}</span>
                <input type="file" accept="image/*,.pdf" className="sr-only" onChange={handleFileChange('passportPhoto', setPhotoName)} />
              </label>
            </Field>

            <Field label="Title" error={errors.title?.message} required>
              <RadioGroup name="title"
                options={['Mr.', 'Mrs.', 'Dr.', 'Miss', 'Mister', 'Other'].map(v => ({ value: v, label: v }))}
                value={titleVal ?? ''} onChange={v => setValue('title', v as EnrollmentData['title'], { shouldValidate: true })}
                error={errors.title?.message} />
              {titleVal === 'Other' && (
                <input type="text" placeholder="Please specify…" {...register('titleOther')}
                  className={`mt-2 ${INPUT_BASE} ${INPUT_IDLE}`} />
              )}
            </Field>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="First Name (Surname)" error={errors.firstName?.message} required id="firstName">
                <input id="firstName" type="text" placeholder="Surname" autoComplete="given-name"
                  {...register('firstName')} className={`${INPUT_BASE} ${errors.firstName ? INPUT_ERROR : INPUT_IDLE}`} />
              </Field>
              <Field label="Last Name" error={errors.lastName?.message} required id="lastName">
                <input id="lastName" type="text" placeholder="Last Name" autoComplete="family-name"
                  {...register('lastName')} className={`${INPUT_BASE} ${errors.lastName ? INPUT_ERROR : INPUT_IDLE}`} />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Date of Birth" error={errors.dateOfBirth?.message} required id="dob">
                <input id="dob" type="date" {...register('dateOfBirth')}
                  className={`${INPUT_BASE} ${errors.dateOfBirth ? INPUT_ERROR : INPUT_IDLE}`}
                  style={{ colorScheme: 'dark' }} />
              </Field>
              <Field label="Nationality" error={errors.nationality?.message} required id="nationality">
                <input id="nationality" type="text" placeholder="e.g. Nigerian" {...register('nationality')}
                  className={`${INPUT_BASE} ${errors.nationality ? INPUT_ERROR : INPUT_IDLE}`} />
              </Field>
            </div>

            <Field label="Gender" error={errors.gender?.message} required>
              <RadioGroup name="gender" options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]}
                value={watch('gender') ?? ''} onChange={v => setValue('gender', v as 'Male' | 'Female', { shouldValidate: true })}
                error={errors.gender?.message} />
            </Field>

            <Field label="Marital Status" error={errors.maritalStatus?.message} required>
              <RadioGroup name="maritalStatus"
                options={['Married', 'Single', 'Divorced', 'Widow / Widower', 'Separated'].map(v => ({ value: v, label: v }))}
                value={watch('maritalStatus') ?? ''}
                onChange={v => setValue('maritalStatus', v as EnrollmentData['maritalStatus'], { shouldValidate: true })}
                error={errors.maritalStatus?.message} />
            </Field>

            <Field label="Phone Number" error={errors.phone?.message} required hint="11 digits starting with 0, e.g. 08012345678" id="phone">
              <input id="phone" type="tel" placeholder="08012345678" autoComplete="tel"
                {...register('phone')} className={`${INPUT_BASE} ${errors.phone ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="Home Address" error={errors.homeAddress?.message} required id="homeAddress">
              <textarea id="homeAddress" rows={3} placeholder="Your full home address" {...register('homeAddress')}
                className={`${INPUT_BASE} resize-none ${errors.homeAddress ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="Name of Your Church" error={errors.churchName?.message} required id="churchName">
              <input id="churchName" type="text" placeholder="e.g. Dominion Faith International Ministry"
                {...register('churchName')} className={`${INPUT_BASE} ${errors.churchName ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="District" error={errors.district?.message} required>
              <RadioGroup name="district" options={DISTRICTS.map(d => ({ value: d.value, label: d.label }))}
                value={district ?? ''} onChange={v => setValue('district', v as EnrollmentData['district'], { shouldValidate: true })}
                error={errors.district?.message} />
              {district === 'Other' && (
                <input type="text" placeholder="Please specify your district…" {...register('districtOther')}
                  className={`mt-2 ${INPUT_BASE} ${INPUT_IDLE}`} />
              )}
            </Field>

            <Field label="Nature of Programme" error={errors.programmeMode?.message} required>
              <RadioGroup name="programmeMode"
                options={[{ value: 'Physical', label: 'Physical Class' }, { value: 'Online', label: 'Online Class' }]}
                value={watch('programmeMode') ?? ''}
                onChange={v => setValue('programmeMode', v as 'Physical' | 'Online', { shouldValidate: true })}
                error={errors.programmeMode?.message} />
            </Field>

            <Field label="Are You Currently Employed?" error={errors.employed?.message} required>
              <RadioGroup name="employed" options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }, { value: 'Maybe', label: 'Maybe' }]}
                value={employed ?? ''} onChange={v => setValue('employed', v as 'Yes' | 'No' | 'Maybe', { shouldValidate: true })}
                error={errors.employed?.message} />
              {employed === 'Yes' && (
                <input type="text" placeholder="State your occupation" {...register('occupation')}
                  className={`mt-2 ${INPUT_BASE} ${INPUT_IDLE}`} />
              )}
            </Field>

            <Field label="Have You Participated in the SOM Programme Before?" error={errors.previousSOM?.message} required>
              <RadioGroup name="previousSOM" options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                value={prevSOM ?? ''} onChange={v => setValue('previousSOM', v as 'Yes' | 'No', { shouldValidate: true })}
                error={errors.previousSOM?.message} />
              {prevSOM === 'Yes' && (
                <textarea rows={2} placeholder="E.g. HQ, Online Class — 2024 Session" {...register('previousSOMDetails')}
                  className={`mt-2 ${INPUT_BASE} resize-none ${INPUT_IDLE}`} />
              )}
            </Field>
          </div>
        )}

        {/* ─── STEP 2 ─── */}
        {step === 2 && (
          <div className="space-y-6">
            <Field label="Education Qualifications / Background" error={errors.educationBackground?.message} required
              hint="Name of institute, qualification, and year of completion" id="edu">
              <textarea id="edu" rows={4} placeholder="e.g. University of Lagos, B.Sc Computer Science, 2019"
                {...register('educationBackground')}
                className={`${INPUT_BASE} resize-none ${errors.educationBackground ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="New Birth Experience" error={errors.newBirthExperience?.message} required
              hint="Please give details and state where and when it occurred" id="newBirth">
              <textarea id="newBirth" rows={4} placeholder="Describe your born again experience, when and where it happened…"
                {...register('newBirthExperience')}
                className={`${INPUT_BASE} resize-none ${errors.newBirthExperience ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="Place of Worship" error={errors.placeOfWorship?.message} required
              hint="Name and address of your place of worship" id="placeOfWorship">
              <textarea id="placeOfWorship" rows={3} placeholder="Church name and address"
                {...register('placeOfWorship')}
                className={`${INPUT_BASE} resize-none ${errors.placeOfWorship ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            <Field label="Have You Attended Any Other Bible College?" error={errors.previousBibleCollege?.message} required>
              <RadioGroup name="previousBibleCollege" options={[{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }]}
                value={prevBible ?? ''} onChange={v => setValue('previousBibleCollege', v as 'Yes' | 'No', { shouldValidate: true })}
                error={errors.previousBibleCollege?.message} />
              {prevBible === 'Yes' && (
                <textarea rows={3} placeholder="Name of Bible school, location, date period attended"
                  {...register('previousBibleCollegeDetails')}
                  className={`mt-2 ${INPUT_BASE} resize-none ${INPUT_IDLE}`} />
              )}
            </Field>

            <Field label="Department / Worker Service Unit in Church" error={errors.departmentInChurch?.message} required id="dept">
              <input id="dept" type="text" placeholder="e.g. Choir, Ushering, Children's Ministry"
                {...register('departmentInChurch')}
                className={`${INPUT_BASE} ${errors.departmentInChurch ? INPUT_ERROR : INPUT_IDLE}`} />
            </Field>

            {/* Indemnity */}
            <div className="rounded-2xl p-5 space-y-3"
              style={{ background: 'rgba(42,47,170,0.08)', border: '1px solid rgba(42,47,170,0.2)' }}>
              <h4 className="text-[14px] font-bold text-white">Statement of Indemnity</h4>
              <p className="text-[13px] leading-relaxed text-white/55">
                I, the above designated, declare this information is true to the best of my knowledge. I am aware that if it is found to be untrue, I may be disqualified. I also agree to abide by the rules and regulations governing the Course.
              </p>
              <label className="flex cursor-pointer items-start gap-3">
                <input type="checkbox" {...register('indemnity')} className="mt-0.5 h-4 w-4 cursor-pointer rounded accent-[#2A2FAA]" />
                <span className="text-[13px] font-semibold text-white/80">I agree with the above declaration</span>
              </label>
              {errors.indemnity && (
                <p className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: '#F61F27' }}>
                  <AlertCircle size={12} />{errors.indemnity.message}
                </p>
              )}
            </div>

            {/* Payment note */}
            <div className="rounded-2xl p-5" style={{ background: 'rgba(249,169,22,0.06)', border: '1px solid rgba(249,169,22,0.2)' }}>
              <h4 className="mb-2 text-[13px] font-bold text-white/80">Payment Details</h4>
              <p className="text-[12px] leading-relaxed text-white/50">
                Registration Fee: <strong className="text-white/70">₦10,000</strong><br />
                Account Name: Dominion Faith In&apos;l School of Ministry<br />
                Bank: Globus Bank PLC — Account No: <strong className="text-white/70">1000389027</strong>
              </p>
            </div>

            <Field label="Attach Proof of Payment" error={errors.paymentProof?.message} required hint="PDF or image of bank receipt — max 10 MB">
              <label className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all ${errors.paymentProof ? INPUT_ERROR : INPUT_IDLE}`}>
                <Upload size={16} className="flex-shrink-0 text-white/40" />
                <span className="truncate text-[14px] text-white/40">{proofName || 'Choose file…'}</span>
                <input type="file" accept="image/*,.pdf" className="sr-only" onChange={handleFileChange('paymentProof', setProofName)} />
              </label>
            </Field>
          </div>
        )}

        {/* Navigation */}
        <div className={`mt-8 flex ${step === 2 ? 'justify-between' : 'justify-end'} gap-3`}>
          {step === 2 && (
            <button type="button" onClick={() => setStep(1)}
              className="flex items-center gap-2 rounded-2xl border border-white/15 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10">
              <ChevronLeft size={16} />Back
            </button>
          )}
          {step === 1 && (
            <button type="button" onClick={goToStep2}
              className="flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-black text-white transition-opacity hover:opacity-85"
              style={{ background: '#2A2FAA' }}>
              Next<ChevronRight size={16} />
            </button>
          )}
          {step === 2 && (
            <button type="submit" disabled={status === 'submitting'}
              className="flex items-center gap-2.5 rounded-2xl px-8 py-3.5 text-sm font-black text-white transition-opacity hover:opacity-85 disabled:opacity-60"
              style={{ background: '#2A2FAA' }}>
              {status === 'submitting' ? <><Loader2 size={16} className="animate-spin" />Submitting…</> : 'Submit Application'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
