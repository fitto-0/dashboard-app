export interface Agency {
  id: string
  name: string
  city: string
  country: string
  phone: string
  email: string
  image?: string
  employees: number
  established: string
}

export interface Contact {
  id: string
  agencyId: string
  firstName: string
  lastName: string
  position: string
  email: string
  phone: string
  department: string
  avatar?: string
}

export interface UserUsage {
  userId: string
  date: string
  contactsViewed: number
  limit: number
}

export interface Stats {
  totalAgencies: number
  totalContacts: number
  availableViews: number
  usagePercentage: number
}
