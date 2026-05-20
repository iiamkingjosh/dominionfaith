'use server'

import { contactSchema, type ContactFormData } from '@/schemas/contact.schema'

export interface ActionResult {
  success: boolean
  message: string
}

export async function sendContactMessage(data: ContactFormData): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, message: 'Invalid form data. Please check your entries.' }
  }

  const { name, email, phone, subject, message, callBack } = parsed.data

  try {
    // ── Email via Resend ───────────────────────────────────
    // Uncomment and set RESEND_API_KEY in .env.local to enable:
    //
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from:    'Dominion Faith <no-reply@dominionfaith.com>',
    //   to:      ['info@dominionfaith.com'],
    //   subject: `[Contact] ${subject} — ${name}`,
    //   text:    `Name: ${name}\nEmail: ${email}\nPhone: ${phone ?? 'N/A'}\nCallback: ${callBack ? 'Yes' : 'No'}\n\n${message}`,
    // })
    // await resend.emails.send({
    //   from:    'Dominion Faith <no-reply@dominionfaith.com>',
    //   to:      [email],
    //   subject: 'We received your message — Dominion Faith',
    //   text:    `Hi ${name},\n\nThank you for reaching out to Dominion Faith International Ministry. We have received your message and will respond within 24–48 hours.\n\nGod bless you,\nThe DFIM Team`,
    // })

    // Simulate async work in development
    await new Promise<void>(resolve => setTimeout(resolve, 1200))

    console.info('[Contact Form]', { name, email, phone, subject, message: message.slice(0, 80), callBack })

    return {
      success: true,
      message: `Thank you, ${name}. Your message has been received. We'll get back to you within 24–48 hours.`,
    }
  } catch {
    return {
      success: false,
      message: 'Something went wrong. Please try again or email us at info@dominionfaith.com.',
    }
  }
}
