import { z } from 'zod'

export const DISTRICTS = [
  { value: 'HQ',      label: 'Head Quarters (Ojo)'            },
  { value: 'Mebamu',  label: 'Mebamu District'                },
  { value: 'Festac',  label: 'Festac (Amuwo-Odofin) District' },
  { value: 'Coconut', label: 'Coconut District'               },
  { value: 'Gabon',   label: 'Gabon District'                 },
  { value: 'Onitsha', label: 'Onitsha District'               },
  { value: 'Isuochi', label: 'Isuochi District'               },
  { value: 'Delta',   label: 'Delta District'                 },
  { value: 'Other',   label: 'Other'                          },
] as const

export type DistrictValue = (typeof DISTRICTS)[number]['value']

export const enrollmentSchema = z.object({
  email:                       z.string().email('Please enter a valid email address'),
  passportPhoto:               z.string().min(1, 'Passport photo is required'),
  title:                       z.enum(['Mr.', 'Mrs.', 'Dr.', 'Miss', 'Mister', 'Other'] as const, {
                                 message: 'Please select a title',
                               }),
  titleOther:                  z.string().optional(),
  firstName:                   z.string().min(2, 'First name must be at least 2 characters'),
  lastName:                    z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth:                 z.string().min(1, 'Date of birth is required'),
  gender:                      z.enum(['Male', 'Female'] as const, {
                                 message: 'Please select your gender',
                               }),
  maritalStatus:               z.enum(['Married', 'Single', 'Divorced', 'Widow / Widower', 'Separated'] as const, {
                                 message: 'Please select your marital status',
                               }),
  nationality:                 z.string().min(1, 'Nationality is required'),
  phone:                       z.string().regex(/^0[0-9]{10}$/, 'Enter a valid 11-digit Nigerian number starting with 0'),
  homeAddress:                 z.string().min(5, 'Please enter your full address'),
  churchName:                  z.string().min(2, 'Church name is required'),
  district:                    z.enum(['HQ', 'Mebamu', 'Festac', 'Coconut', 'Gabon', 'Onitsha', 'Isuochi', 'Delta', 'Other'] as const, {
                                 message: 'Please select your district',
                               }),
  districtOther:               z.string().optional(),
  programmeMode:               z.enum(['Physical', 'Online'] as const, {
                                 message: 'Please select a programme mode',
                               }),
  employed:                    z.enum(['Yes', 'No', 'Maybe'] as const, {
                                 message: 'Please select your employment status',
                               }),
  occupation:                  z.string().optional(),
  previousSOM:                 z.enum(['Yes', 'No'] as const, {
                                 message: 'Please answer this question',
                               }),
  previousSOMDetails:          z.string().optional(),
  educationBackground:         z.string().min(10, 'Please provide your education background'),
  newBirthExperience:          z.string().min(20, 'Please describe your new birth experience'),
  placeOfWorship:              z.string().min(5, 'Please specify your place of worship'),
  previousBibleCollege:        z.enum(['Yes', 'No'] as const, {
                                 message: 'Please answer this question',
                               }),
  previousBibleCollegeDetails: z.string().optional(),
  departmentInChurch:          z.string().min(2, 'Department is required'),
  indemnity:                   z.literal(true, {
                                 message: 'You must agree to the declaration to proceed',
                               }),
  paymentProof:                z.string().min(1, 'Proof of payment is required'),
})

export type EnrollmentData = z.infer<typeof enrollmentSchema>
