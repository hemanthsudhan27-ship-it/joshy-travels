export type EnquiryStatus = 'pending' | 'followed_up' | 'converted' | 'archived'

export interface Enquiry {
  id: string
  createdAt: string
  name: string
  phone: string
  email?: string
  destination: string
  packageSlug?: string
  adults: string
  children: string
  preferredDate: string
  message?: string
  status: EnquiryStatus
  notes?: string
}

