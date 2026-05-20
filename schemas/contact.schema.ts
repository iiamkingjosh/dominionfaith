import { z } from 'zod'

export const SUBJECTS = [
  { value: 'general',     label: 'General Enquiry'     },
  { value: 'prayer',      label: 'Prayer Request'      },
  { value: 'ministry',    label: 'Join a Ministry'     },
  { value: 'partnership', label: 'Partnership / Giving' },
  { value: 'media',       label: 'Media & Press'       },
] as const

export type SubjectValue = (typeof SUBJECTS)[number]['value']

export const contactSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  email:    z.string().email('Please enter a valid email address'),
  phone:    z.string().optional(),
  subject:  z.enum(['general', 'prayer', 'ministry', 'partnership', 'media']),
  message:  z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1,000 characters'),
  callBack: z.boolean().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
