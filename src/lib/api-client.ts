class ApiClient {
  private baseURL: string

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Error desconocido' }))
      throw new Error(error.error || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Auth
  async register(data: { name: string; email: string; password: string; businessName?: string }) {
    return this.request<{ user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async login(data: { email: string; password: string }) {
    return this.request<{ user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' })
  }

  async me() {
    return this.request<{ user: User }>('/auth/me')
  }

  // Clients
  async getClients(params?: { search?: string; page?: number; limit?: number }) {
    const searchParams = new URLSearchParams(params as any).toString()
    return this.request<PaginationResponse<Client>>(`/clients?${searchParams}`)
  }

  async getClient(id: number) {
    return this.request<Client>(`/clients/${id}`)
  }

  async createClient(data: Omit<Client, 'id' | 'totalAppointments' | 'lastAppointmentDate' | 'createdAt' | 'updatedAt'>) {
    return this.request<Client>('/clients', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateClient(id: number, data: Partial<Client>) {
    return this.request<Client>(`/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteClient(id: number) {
    return this.request(`/clients/${id}`, { method: 'DELETE' })
  }

  // Services
  async getServices(activeOnly = false) {
    return this.request<Service[]>(`/services?active=${activeOnly}`)
  }

  async getService(id: number) {
    return this.request<Service>(`/services/${id}`)
  }

  async createService(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) {
    return this.request<Service>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateService(id: number, data: Partial<Service>) {
    return this.request<Service>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteService(id: number) {
    return this.request(`/services/${id}`, { method: 'DELETE' })
  }

  async toggleService(id: number) {
    return this.request<{ service: Service }>(`/services/${id}/toggle`, { method: 'POST' })
  }

  // Appointments
  async getAppointments(params?: {
    date?: string
    startDate?: string
    endDate?: string
    clientId?: number
    status?: string
    page?: number
    limit?: number
  }) {
    const searchParams = new URLSearchParams(params as any).toString()
    return this.request<PaginationResponse<Appointment>>(`/appointments?${searchParams}`)
  }

  async getAppointment(id: number) {
    return this.request<Appointment>(`/appointments/${id}`)
  }

  async createAppointment(data: {
    clientId: number
    serviceId: number
    appointmentDate: string
    startTime: string
    notes?: string
    price?: number
  }) {
    return this.request<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateAppointment(id: number, data: Partial<Appointment>) {
    return this.request<Appointment>(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async cancelAppointment(id: number) {
    return this.request(`/appointments/${id}`, { method: 'DELETE' })
  }

  async getAvailableSlots(date: string, serviceId: number) {
    return this.request<{
      availableSlots: string[]
      workHours: { start: string; end: string }
      serviceDuration: number
    }>(`/appointments/available-slots?date=${date}&serviceId=${serviceId}`)
  }

  // Payments
  async getPayments(params?: {
    startDate?: string
    endDate?: string
    status?: string
    paymentMethod?: string
    page?: number
    limit?: number
  }) {
    const searchParams = new URLSearchParams(params as any).toString()
    return this.request<PaginationResponse<Payment>>(`/payments?${searchParams}`)
  }

  async createPayment(data: {
    appointmentId: number
    paymentMethod: string
    amount: number
    notes?: string
  }) {
    return this.request<Payment>('/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updatePayment(id: number, data: { status?: string; notes?: string }) {
    return this.request<Payment>(`/payments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async getPaymentStats(period = 'month') {
    return this.request(`/payments/stats?period=${period}`)
  }

  // Dashboard
  async getDashboardStats() {
    return this.request<DashboardStats>('/dashboard/stats')
  }

  // Work Schedules
  async getWorkSchedules() {
    return this.request<WorkSchedule[]>('/work-schedules')
  }

  async updateWorkSchedules(schedules: WorkSchedule[]) {
    return this.request('/work-schedules', {
      method: 'PUT',
      body: JSON.stringify({ schedules }),
    })
  }

  // Business Settings
  async getBusinessSettings() {
    return this.request<Record<string, string>>('/business-settings')
  }

  async updateBusinessSettings(settings: Record<string, string>) {
    return this.request('/business-settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    })
  }
}
export const apiClient = new ApiClient()
