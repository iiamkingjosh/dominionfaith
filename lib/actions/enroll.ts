'use server'

import nodemailer from 'nodemailer'
import { enrollmentSchema, type EnrollmentData } from '@/schemas/enrollment.schema'

export interface EnrollmentResult {
  success: boolean
  message: string
}

function extractBase64(dataUrl: string) {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/)
  if (!match) return null
  return { mimeType: match[1], data: match[2], ext: match[1].split('/')[1] ?? 'bin' }
}

function buildAdminHtml(d: EnrollmentData): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;font-weight:600;color:#555;white-space:nowrap">${label}</td><td style="padding:6px 12px;color:#222">${value || '—'}</td></tr>`

  return `<div style="font-family:sans-serif;max-width:640px;margin:0 auto">
    <h2 style="background:#2A2FAA;color:#fff;padding:16px 20px;margin:0;border-radius:8px 8px 0 0">New School of Ministry Application</h2>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-top:none">
      ${row('Full Name',       `${d.title} ${d.firstName} ${d.lastName}`)}
      ${row('Email',            d.email)}
      ${row('Phone',            d.phone)}
      ${row('Date of Birth',    d.dateOfBirth)}
      ${row('Gender',           d.gender)}
      ${row('Marital Status',   d.maritalStatus)}
      ${row('Nationality',      d.nationality)}
      ${row('Home Address',     d.homeAddress)}
      ${row('Church Name',      d.churchName)}
      ${row('District',         d.district === 'Other' ? (d.districtOther ?? 'Other') : d.district)}
      ${row('Programme Mode',   d.programmeMode)}
      ${row('Employed',         d.employed)}
      ${d.employed === 'Yes'            ? row('Occupation',             d.occupation ?? '')              : ''}
      ${row('Previous SOM',     d.previousSOM)}
      ${d.previousSOM === 'Yes'         ? row('Previous Session',        d.previousSOMDetails ?? '')      : ''}
      ${row('Education',        d.educationBackground)}
      ${row('New Birth',        d.newBirthExperience)}
      ${row('Place of Worship', d.placeOfWorship)}
      ${row('Bible College',    d.previousBibleCollege)}
      ${d.previousBibleCollege === 'Yes' ? row('College Details',       d.previousBibleCollegeDetails ?? '') : ''}
      ${row('Department',       d.departmentInChurch)}
      ${row('Indemnity',        'Agreed')}
    </table>
    <p style="padding:12px 20px;color:#888;font-size:12px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
      Passport photo and proof of payment attached.
    </p>
  </div>`
}

function buildApplicantHtml(d: EnrollmentData): string {
  const district = d.district === 'Other' ? (d.districtOther ?? 'Other') : d.district
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto">
    <div style="background:#2A2FAA;padding:24px 28px;border-radius:8px 8px 0 0">
      <h1 style="color:#fff;margin:0;font-size:22px">Application Received!</h1>
      <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px">Dominion Faith School of Ministry</p>
    </div>
    <div style="padding:28px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
      <p style="color:#333">Dear ${d.title} ${d.firstName} ${d.lastName},</p>
      <p style="color:#555;line-height:1.7">Thank you for applying to the <strong>Dominion Faith School of Ministry</strong>. We have received your application and will review it within <strong>48 hours</strong>.</p>
      <p style="color:#555;line-height:1.7">You applied for the <strong>${d.programmeMode} Class</strong> at the <strong>${district}</strong> district.</p>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;margin:20px 0">
        <p style="margin:0 0 8px;font-weight:700;color:#2A2FAA">Payment Reference</p>
        <p style="margin:0;color:#555;font-size:13px;line-height:1.8">
          Registration Fee: <strong>&#8358;10,000</strong><br/>
          Account Name: Dominion Faith In'l School of Ministry<br/>
          Bank: Globus Bank PLC &mdash; Account No: <strong>1000389027</strong>
        </p>
      </div>
      <p style="color:#555;line-height:1.7">Contact us at <a href="mailto:info@dominionfaith.com" style="color:#2A2FAA">info@dominionfaith.com</a> or call <a href="tel:+2347034543971" style="color:#2A2FAA">+234 703 454 3971</a>.</p>
      <p style="color:#555;margin-top:24px">God bless you,<br/><strong>The DFIM Team</strong></p>
    </div>
  </div>`
}

export async function submitEnrollment(data: EnrollmentData): Promise<EnrollmentResult> {
  const parsed = enrollmentSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, message: 'Invalid form data. Please check your entries.' }
  }

  const d = parsed.data

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })

    const attachments: nodemailer.SendMailOptions['attachments'] = []
    const photo = extractBase64(d.passportPhoto)
    if (photo) attachments.push({ filename: `passport-${d.firstName}-${d.lastName}.${photo.ext}`, content: photo.data, encoding: 'base64', contentType: photo.mimeType })
    const proof = extractBase64(d.paymentProof)
    if (proof) attachments.push({ filename: `payment-proof-${d.firstName}-${d.lastName}.${proof.ext}`, content: proof.data, encoding: 'base64', contentType: proof.mimeType })

    await transporter.sendMail({
      from:        `"DFIM Website" <${process.env.GMAIL_USER}>`,
      to:          'info@dominionfaith.com',
      subject:     `New SOM Application — ${d.firstName} ${d.lastName}`,
      html:        buildAdminHtml(d),
      attachments,
    })

    await transporter.sendMail({
      from:    `"Dominion Faith School of Ministry" <${process.env.GMAIL_USER}>`,
      to:      d.email,
      subject: 'Application Received — Dominion Faith School of Ministry',
      html:    buildApplicantHtml(d),
    })

    return {
      success: true,
      message: `Thank you, ${d.firstName}! We've received your application and will be in touch within 48 hours. God bless you!`,
    }
  } catch (err) {
    console.error('[EnrollmentAction]', err)
    return { success: false, message: 'Something went wrong. Please try again or email info@dominionfaith.com.' }
  }
}
