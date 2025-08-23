import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Appointment, Client, Service } from '@/types'

// Utility para combinar clases de Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ==================== DATE & TIME UTILITIES ====================

export function formatTime(time: string | Date): string {
  if (typeof time === 'string') return time
  return time.toTimeString().slice(0, 5)
}

export function formatDate(date: string | Date): string {
  if (typeof date === 'string') return date
  return date.toISOString().split('T')[0]
}

export function formatDateTime(date: Date): string {
  return date.toISOString().slice(0, 16)
}

export function formatDisplayDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDisplayTime(time: string | Date): string {
  const timeStr = formatTime(time)
  const [hours, minutes] = timeStr.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
}

export function formatDisplayDateTime(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function addMinutesToTime(time: string, minutes: number): string {
  const [hours, mins] = time.split(':').map(Number)
  const totalMinutes = hours * 60 + mins + minutes
  const newHours = Math.floor(totalMinutes / 60) % 24
  const newMins = totalMinutes % 60
  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`
}

export function subtractMinutesFromTime(time: string, minutes: number): string {
  const [hours, mins] = time.split(':').map(Number)
  const totalMinutes = hours * 60 + mins - minutes
  const newHours = Math.floor(Math.max(0, totalMinutes) / 60) % 24
  const newMins = Math.max(0, totalMinutes) % 60
  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`
}

export function getTimeDifferenceInMinutes(startTime: string, endTime: string): number {
  const [startHours, startMins] = startTime.split(':').map(Number)
  const [endHours, endMins] = endTime.split(':').map(Number)
  
  const startTotalMinutes = startHours * 60 + startMins
  const endTotalMinutes = endHours * 60 + endMins
  
  return endTotalMinutes - startTotalMinutes
}

export function isTimeInRange(checkTime: string, startTime: string, endTime: string): boolean {
  const [checkHours, checkMins] = checkTime.split(':').map(Number)
  const [startHours, startMins] = startTime.split(':').map(Number)
  const [endHours, endMins] = endTime.split(':').map(Number)
  
  const checkMinutes = checkHours * 60 + checkMins
  const startMinutes = startHours * 60 + startMins
  const endMinutes = endHours * 60 + endMins
  
  return checkMinutes >= startMinutes && checkMinutes < endMinutes
}

export function getWeekDays(date: Date = new Date()): Date[] {
  const week = []
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - date.getDay()) // Domingo
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    week.push(day)
  }
  
  return week
}

export function getMonthDays(date: Date = new Date()): Date[] {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const days = []
  
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day))
  }
  
  return days
}

export function isToday(date: Date): boolean {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

export function isTomorrow(date: Date): boolean {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return date.toDateString() === tomorrow.toDateString()
}

export function isThisWeek(date: Date): boolean {
  const today = new Date()
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()))
  const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6))
  
  return date >= startOfWeek && date <= endOfWeek
}

export function getDaysUntil(date: Date): number {
  const today = new Date()
  const diffTime = date.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getRelativeTimeString(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000)
  
  if (Math.abs(diffInSeconds) < 60) return 'Ahora'
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (Math.abs(diffInMinutes) < 60) {
    return diffInMinutes > 0 ? `En ${diffInMinutes}m` : `Hace ${Math.abs(diffInMinutes)}m`
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (Math.abs(diffInHours) < 24) {
    return diffInHours > 0 ? `En ${diffInHours}h` : `Hace ${Math.abs(diffInHours)}h`
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (Math.abs(diffInDays) < 7) {
    return diffInDays > 0 ? `En ${diffInDays}d` : `Hace ${Math.abs(diffInDays)}d`
  }
  
  return formatDisplayDate(date)
}

// ==================== APPOINTMENT UTILITIES ====================

export function isTimeSlotAvailable(
  existingAppointments: Array<{ startTime: string | Date; endTime: string | Date }>,
  newStart: string,
  newEnd: string
): boolean {
  const newStartTime = new Date(`2000-01-01T${newStart}:00`)
  const newEndTime = new Date(`2000-01-01T${newEnd}:00`)
  
  return !existingAppointments.some(apt => {
    const existingStart = new Date(`2000-01-01T${formatTime(apt.startTime)}:00`)
    const existingEnd = new Date(`2000-01-01T${formatTime(apt.endTime)}:00`)
    
    return (
      (newStartTime >= existingStart && newStartTime < existingEnd) ||
      (newEndTime > existingStart && newEndTime <= existingEnd) ||
      (newStartTime <= existingStart && newEndTime >= existingEnd)
    )
  })
}

export function generateAvailableSlots(
  workStart: string,
  workEnd: string,
  serviceDuration: number,
  existingAppointments: Array<{ startTime: string | Date; endTime: string | Date }>,
  slotInterval: number = 15
): string[] {
  const slots: string[] = []
  const startTime = new Date(`2000-01-01T${workStart}:00`)
  const endTime = new Date(`2000-01-01T${workEnd}:00`)
  
  let currentTime = new Date(startTime)
  
  while (currentTime < endTime) {
    const slotStart = formatTime(currentTime)
    const slotEndTime = new Date(currentTime.getTime() + serviceDuration * 60000)
    
    if (slotEndTime <= endTime) {
      const slotEnd = formatTime(slotEndTime)
      
      if (isTimeSlotAvailable(existingAppointments, slotStart, slotEnd)) {
        slots.push(slotStart)
      }
    }
    
    currentTime = new Date(currentTime.getTime() + slotInterval * 60000)
  }
  
  return slots
}

export function getAppointmentDuration(appointment: Appointment): number {
  return getTimeDifferenceInMinutes(
    formatTime(appointment.startTime),
    formatTime(appointment.endTime)
  )
}

export function getAppointmentStatusColor(status: string): string {
  const colors = {
    SCHEDULED: 'bg-blue-100 text-blue-800',
    CONFIRMED: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-gray-100 text-gray-800',
    CANCELLED: 'bg-red-100 text-red-800',
    NO_SHOW: 'bg-orange-100 text-orange-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

export function getAppointmentStatusText(status: string): string {
  const texts = {
    SCHEDULED: 'Programada',
    CONFIRMED: 'Confirmada',
    COMPLETED: 'Completada',
    CANCELLED: 'Cancelada',
    NO_SHOW: 'No asistió'
  }
  return texts[status as keyof typeof texts] || status
}

export function getPaymentStatusColor(status: string): string {
  const colors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    PAID: 'bg-green-100 text-green-800',
    REFUNDED: 'bg-red-100 text-red-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

export function getPaymentStatusText(status: string): string {
  const texts = {
    PENDING: 'Pendiente',
    PAID: 'Pagado',
    REFUNDED: 'Reembolsado'
  }
  return texts[status as keyof typeof texts] || status
}

export function getPaymentMethodText(method: string): string {
  const texts = {
    CASH: 'Efectivo',
    CARD: 'Tarjeta',
    TRANSFER: 'Transferencia',
    ONLINE: 'En línea'
  }
  return texts[method as keyof typeof texts] || method
}

// ==================== FORMATTING UTILITIES ====================

export function formatCurrency(amount: number, currency: string = 'CLP'): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-CL').format(num)
}

export function formatPhone(phone: string): string {
  // Formato chileno: +56 9 1234 5678
  if (phone.startsWith('+569')) {
    const number = phone.slice(4)
    return `+56 9 ${number.slice(0, 4)} ${number.slice(4)}`
  }
  
  // Formato general
  if (phone.startsWith('+')) {
    return phone
  }
  
  // Formato local chileno
  if (phone.length === 9 && phone.startsWith('9')) {
    return `+56 ${phone.slice(0, 1)} ${phone.slice(1, 5)} ${phone.slice(5)}`
  }
  
  return phone
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours === 0) return `${mins}m`
  if (mins === 0) return `${hours}h`
  return `${hours}h ${mins}m`
}

export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 Bytes'
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

// ==================== STRING UTILITIES ====================

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function slugify(str: string): string {
  return str
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function extractInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// ==================== VALIDATION UTILITIES ====================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function isValidTime(time: string): boolean {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
  return timeRegex.test(time)
}

export function isValidDate(date: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  return dateRegex.test(date) && !isNaN(Date.parse(date))
}

export function isStrongPassword(password: string): {
  isStrong: boolean
  score: number
  feedback: string[]
} {
  const feedback = []
  let score = 0
  
  if (password.length >= 8) score += 1
  else feedback.push('Mínimo 8 caracteres')
  
  if (/[a-z]/.test(password)) score += 1
  else feedback.push('Incluir minúsculas')
  
  if (/[A-Z]/.test(password)) score += 1
  else feedback.push('Incluir mayúsculas')
  
  if (/[0-9]/.test(password)) score += 1
  else feedback.push('Incluir números')
  
  if (/[^a-zA-Z0-9]/.test(password)) score += 1
  else feedback.push('Incluir símbolos')
  
  return {
    isStrong: score >= 4,
    score,
    feedback
  }
}

// ==================== COLOR UTILITIES ====================

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? "0" + hex : hex
  }).join("")
}

export function getContrastColor(hex: string): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return '#000000'
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return brightness > 128 ? '#000000' : '#ffffff'
}

export function lightenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  const factor = 1 + percent / 100
  return rgbToHex(
    Math.min(255, Math.floor(rgb.r * factor)),
    Math.min(255, Math.floor(rgb.g * factor)),
    Math.min(255, Math.floor(rgb.b * factor))
  )
}

export function darkenColor(hex: string, percent: number): string {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex
  
  const factor = 1 - percent / 100
  return rgbToHex(
    Math.max(0, Math.floor(rgb.r * factor)),
    Math.max(0, Math.floor(rgb.g * factor)),
    Math.max(0, Math.floor(rgb.b * factor))
  )
}

// ==================== ARRAY UTILITIES ====================

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)]
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// ==================== SEARCH UTILITIES ====================

export function fuzzySearch<T>(items: T[], query: string, keys: (keyof T)[]): T[] {
  if (!query.trim()) return items
  
  const searchTerm = query.toLowerCase().trim()
  
  return items.filter(item =>
    keys.some(key => {
      const value = String(item[key]).toLowerCase()
      return value.includes(searchTerm) || 
             searchTerm.split(' ').every(term => value.includes(term))
    })
  ).sort((a, b) => {
    // Score by relevance
    const aScore = keys.reduce((score, key) => {
      const value = String(a[key]).toLowerCase()
      if (value.startsWith(searchTerm)) return score + 10
      if (value.includes(searchTerm)) return score + 5
      return score
    }, 0)
    
    const bScore = keys.reduce((score, key) => {
      const value = String(b[key]).toLowerCase()
      if (value.startsWith(searchTerm)) return score + 10
      if (value.includes(searchTerm)) return score + 5
      return score
    }, 0)
    
    return bScore - aScore
  })
}

// ==================== LOCAL STORAGE UTILITIES ====================

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue
  
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    console.warn(`Failed to save ${key} to localStorage`)
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(key)
  } catch {
    console.warn(`Failed to remove ${key} from localStorage`)
  }
}

// ==================== URL UTILITIES ====================

export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value != null && value !== '') {
      searchParams.append(key, String(value))
    }
  })
  
  return searchParams.toString()
}

export function parseQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString)
  const result: Record<string, string> = {}
  
  params.forEach((value, key) => {
    result[key] = value
  })
  
  return result
}

// ==================== ERROR HANDLING UTILITIES ====================

export function getErrorMessage(error: any): string {
  if (typeof error === 'string') return error
  if (error?.message) return error.message
  if (error?.error) return error.error
  return 'Ha ocurrido un error inesperado'
}

export function handleApiError(error: any): never {
  const message = getErrorMessage(error)
  throw new Error(message)
}

// ==================== NOTIFICATION TEMPLATE UTILITIES ====================

export function processNotificationTemplate(
  template: string,
  variables: Record<string, any>
): string {
  return template.replace(/\{([^}]+)\}/g, (match, key) => {
    return variables[key] || match
  })
}

export function getNotificationVariables(
  appointment: Appointment,
  client: Client,
  service: Service,
  businessInfo: any
): Record<string, string> {
  return {
    clientName: client.name,
    appointmentDate: formatDisplayDate(appointment.appointmentDate),
    appointmentTime: formatDisplayTime(appointment.startTime),
    serviceName: service.name,
    servicePrice: formatCurrency(service.price),
    businessName: businessInfo.businessName || '',
    businessAddress: businessInfo.businessAddress || '',
    businessPhone: businessInfo.businessPhone || '',
    totalAmount: formatCurrency(appointment.price || service.price),
    paymentMethod: getPaymentMethodText(appointment.paymentStatus),
    remainingBalance: formatCurrency(0) // Calculado dinámicamente
  }
}

// ==================== CSV EXPORT UTILITIES ====================

export function exportToCSV<T>(data: T[], filename: string): void {
  if (data.length === 0) return
  
  const headers = Object.keys(data[0] as object)
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = (row as any)[header]
        return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
      }).join(',')
    )
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}

// ==================== PRINT UTILITIES ====================

export function printAppointment(appointment: Appointment): void {
  const printWindow = window.open('', '_blank')
  if (!printWindow) return
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cita - ${appointment.client.name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
        .details { margin: 20px 0; }
        .row { display: flex; justify-content: space-between; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Comprobante de Cita</h1>
      </div>
      <div class="details">
        <div class="row"><strong>Cliente:</strong> ${appointment.client.name}</div>
        <div class="row"><strong>Servicio:</strong> ${appointment.service.name}</div>
        <div class="row"><strong>Fecha:</strong> ${formatDisplayDate(appointment.appointmentDate)}</div>
        <div class="row"><strong>Hora:</strong> ${formatDisplayTime(appointment.startTime)}</div>
        <div class="row"><strong>Duración:</strong> ${formatDuration(appointment.service.duration)}</div>
        <div class="row"><strong>Precio:</strong> ${formatCurrency(appointment.price || appointment.service.price)}</div>
      </div>
    </body>
    </html>
  `
  
  printWindow.document.write(html)
  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
}

// ==================== PERFORMANCE UTILITIES ====================

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// ==================== STATISTICS UTILITIES ====================

export function calculateAverage(numbers: number[]): number {
  if (numbers.length === 0) return 0
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length
}

export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return newValue > 0 ? 100 : 0
  return ((newValue - oldValue) / oldValue) * 100
}

export function calculateGrowthRate(values: number[]): number {
  if (values.length < 2) return 0
  return calculatePercentageChange(values[0], values[values.length - 1])
}

// ==================== BUSINESS LOGIC UTILITIES ====================

export function calculateServiceRevenue(
  appointments: Appointment[],
  serviceId: number
): { total: number; count: number } {
  const serviceAppointments = appointments.filter(
    apt => apt.service.id === serviceId && apt.status === 'COMPLETED'
  )
  
  return {
    total: serviceAppointments.reduce((sum, apt) => sum + (apt.price || apt.service.price), 0),
    count: serviceAppointments.length
  }
}

export function getClientLifetimeValue(
  appointments: Appointment[],
  clientId: number
): number {
  return appointments
    .filter(apt => apt.client.id === clientId && apt.status === 'COMPLETED')
    .reduce((sum, apt) => sum + (apt.price || apt.service.price), 0)
}

export function getBusiestHours(appointments: Appointment[]): Record<string, number> {
  const hourCounts: Record<string, number> = {}
  
  appointments.forEach(apt => {
    const hour = formatTime(apt.startTime).split(':')[0] + ':00'
    hourCounts[hour] = (hourCounts[hour] || 0) + 1
  })
  
  return Object.fromEntries(
    Object.entries(hourCounts).sort(([,a], [,b]) => b - a)
  )
}

export function getTopClients(appointments: Appointment[], limit: number = 10): Array<{
  client: Client
  totalSpent: number
  appointmentCount: number
}> {
  const clientStats = groupBy(appointments, 'client')
  
  return Object.entries(clientStats)
    .map(([clientName, clientAppointments]) => {
      const totalSpent = clientAppointments
        .filter(apt => apt.status === 'COMPLETED')
        .reduce((sum, apt) => sum + (apt.price || apt.service.price), 0)
      
      return {
        client: clientAppointments[0].client,
        totalSpent,
        appointmentCount: clientAppointments.length
      }
    })
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, limit)
}

// ==================== CONSTANTS ====================

export const DAYS_OF_WEEK = [
  'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
]

export const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export const APPOINTMENT_STATUSES = [
  { value: 'SCHEDULED', label: 'Programada', color: 'blue' },
  { value: 'CONFIRMED', label: 'Confirmada', color: 'green' },
  { value: 'COMPLETED', label: 'Completada', color: 'gray' },
  { value: 'CANCELLED', label: 'Cancelada', color: 'red' },
  { value: 'NO_SHOW', label: 'No asistió', color: 'orange' }
]

export const PAYMENT_METHODS = [
  { value: 'CASH', label: 'Efectivo' },
  { value: 'CARD', label: 'Tarjeta' },
  { value: 'TRANSFER', label: 'Transferencia' },
  { value: 'ONLINE', label: 'En línea' }
]

export const NOTIFICATION_CHANNELS = [
  { value: 'WHATSAPP', label: 'WhatsApp' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'SMS', label: 'SMS' }
]

export const DEFAULT_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
  '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
]