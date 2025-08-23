export interface User {
  id: number
  email: string
  name: string
  phone?: string
  businessName?: string
  businessAddress?: string
  businessPhone?: string
  subscriptionPlan: 'FREE' | 'PRO' | 'PREMIUM'
  createdAt: Date
  updatedAt: Date
}

export interface Client {
  id: number
  name: string
  email?: string
  phone?: string
  notes?: string
  dateOfBirth?: Date
  gender?: 'MALE' | 'FEMALE' | 'OTHER'
  address?: string
  totalAppointments: number
  lastAppointmentDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: number
  name: string
  description?: string
  duration: number // minutos
  price: number
  color: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Appointment {
  id: number
  appointmentDate: Date
  startTime: string
  endTime: string
  status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  price?: number
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED'
  notes?: string
  reminderSent: boolean
  confirmationSent: boolean
  createdAt: Date
  updatedAt: Date
  client: Pick<Client, 'id' | 'name' | 'phone' | 'email'>
  service: Pick<Service, 'id' | 'name' | 'duration' | 'price' | 'color'>
}

export interface Payment {
  id: number
  amount: number
  paymentMethod: 'CASH' | 'CARD' | 'TRANSFER' | 'ONLINE'
  paymentProvider?: string
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
  paidAt?: Date
  refundedAt?: Date
  notes?: string
  createdAt: Date
  appointment: {
    id: number
    client: Pick<Client, 'id' | 'name' | 'phone'>
    service: Pick<Service, 'id' | 'name'>
  }
}

export interface WorkSchedule {
  id?: number
  dayOfWeek: number // 0-6 (domingo-sábado)
  name: string
  startTime: string
  endTime: string
  isActive: boolean
}

export interface Notification {
  id: number
  type: 'REMINDER' | 'CONFIRMATION' | 'CANCELLATION' | 'PAYMENT'
  channel: 'WHATSAPP' | 'EMAIL' | 'SMS'
  recipient: string
  subject?: string
  message: string
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'FAILED'
  sentAt?: Date
  deliveredAt?: Date
  errorMessage?: string
  createdAt: Date
}

export interface DashboardStats {
  today: {
    appointments: Appointment[]
    appointmentCount: number
    revenue: number
  }
  weekly: {
    appointmentCount: number
  }
  monthly: {
    revenue: number
  }
  totalClients: number
  upcomingAppointments: Appointment[]
  popularServices: Array<{
    serviceId: number
    _count: { serviceId: number }
    service: Pick<Service, 'id' | 'name' | 'color'>
  }>
}

export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
}

export interface PaginationResponse<T> {
  items: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}