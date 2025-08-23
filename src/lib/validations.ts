// lib/validations.ts
import { z } from 'zod'

// Validaciones base
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
const dateRegex = /^\d{4}-\d{2}-\d{2}$/

// User validations
export const registerSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').max(100, 'Nombre muy largo'),
  email: z.string().email('Email inválido').toLowerCase(),
  password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres').max(100, 'Contraseña muy larga'),
  businessName: z.string().min(2, 'Nombre del negocio muy corto').max(255, 'Nombre del negocio muy largo').optional().or(z.literal('')),
  businessAddress: z.string().max(500, 'Dirección muy larga').optional().or(z.literal('')),
  businessPhone: z.string().regex(phoneRegex, 'Teléfono del negocio inválido').optional().or(z.literal('')),
  phone: z.string().regex(phoneRegex, 'Teléfono inválido').optional().or(z.literal(''))
})

export const loginSchema = z.object({
  email: z.string().email('Email inválido').toLowerCase(),
  password: z.string().min(1, 'Contraseña requerida')
})

export const updateUserSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').max(100, 'Nombre muy largo').optional(),
  businessName: z.string().min(2, 'Nombre del negocio muy corto').max(255, 'Nombre del negocio muy largo').optional().or(z.literal('')),
  businessAddress: z.string().max(500, 'Dirección muy larga').optional().or(z.literal('')),
  businessPhone: z.string().regex(phoneRegex, 'Teléfono del negocio inválido').optional().or(z.literal('')),
  phone: z.string().regex(phoneRegex, 'Teléfono inválido').optional().or(z.literal(''))
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Contraseña actual requerida'),
  newPassword: z.string().min(6, 'Nueva contraseña debe tener al menos 6 caracteres').max(100, 'Contraseña muy larga'),
  confirmPassword: z.string().min(1, 'Confirmación requerida')
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
})

// Client validations
export const clientSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').max(255, 'Nombre muy largo'),
  email: z.string().email('Email inválido').toLowerCase().optional().or(z.literal('')),
  phone: z.string().regex(phoneRegex, 'Teléfono inválido').optional().or(z.literal('')),
  notes: z.string().max(1000, 'Notas muy largas').optional().or(z.literal('')),
  dateOfBirth: z.string().regex(dateRegex, 'Fecha debe estar en formato YYYY-MM-DD').optional().or(z.literal('')),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER'], {
    errorMap: () => ({ message: 'Género debe ser MALE, FEMALE u OTHER' })
  }).optional(),
  address: z.string().max(500, 'Dirección muy larga').optional().or(z.literal(''))
}).refine((data) => data.email || data.phone, {
  message: "Debe proporcionar al menos email o teléfono",
  path: ["email", "phone"]
})

// Service validations
export const serviceSchema = z.object({
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres').max(255, 'Nombre muy largo'),
  description: z.string().max(1000, 'Descripción muy larga').optional().or(z.literal('')),
  duration: z.number().int('Duración debe ser un número entero').min(5, 'Duración mínima 5 minutos').max(480, 'Duración máxima 8 horas'),
  price: z.number().min(0, 'Precio debe ser positivo').max(999999.99, 'Precio muy alto'),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Color debe ser hexadecimal válido (#RRGGBB)').optional().or(z.literal('#3B82F6'))
})

// Appointment validations
export const appointmentSchema = z.object({
  clientId: z.number().int('ID de cliente debe ser un entero').positive('ID de cliente debe ser positivo'),
  serviceId: z.number().int('ID de servicio debe ser un entero').positive('ID de servicio debe ser positivo'),
  appointmentDate: z.string().regex(dateRegex, 'Fecha debe estar en formato YYYY-MM-DD'),
  startTime: z.string().regex(timeRegex, 'Hora debe estar en formato HH:MM'),
  notes: z.string().max(1000, 'Notas muy largas').optional().or(z.literal('')),
  price: z.number().min(0, 'Precio debe ser positivo').max(999999.99, 'Precio muy alto').optional()
}).refine((data) => {
  const appointmentDate = new Date(data.appointmentDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return appointmentDate >= today
}, {
  message: "No se pueden crear citas en fechas pasadas",
  path: ["appointmentDate"]
})

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(['SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'], {
    errorMap: () => ({ message: 'Estado inválido' })
  }),
  notes: z.string().max(1000, 'Notas muy largas').optional()
})

// Payment validations
export const paymentSchema = z.object({
  appointmentId: z.number().int('ID de cita debe ser un entero').positive('ID de cita debe ser positivo'),
  paymentMethod: z.enum(['CASH', 'CARD', 'TRANSFER', 'ONLINE'], {
    errorMap: () => ({ message: 'Método de pago inválido' })
  }),
  amount: z.number().positive('Monto debe ser positivo').max(999999.99, 'Monto muy alto'),
  notes: z.string().max(500, 'Notas muy largas').optional().or(z.literal('')),
  providerPaymentId: z.string().max(255, 'ID de proveedor muy largo').optional().or(z.literal(''))
})

export const updatePaymentSchema = z.object({
  status: z.enum(['PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'], {
    errorMap: () => ({ message: 'Estado de pago inválido' })
  }).optional(),
  notes: z.string().max(500, 'Notas muy largas').optional(),
  providerPaymentId: z.string().max(255, 'ID de proveedor muy largo').optional()
})

// Work Schedule validations
export const workScheduleSchema = z.object({
  dayOfWeek: z.number().int('Día debe ser un entero').min(0, 'Día mínimo 0 (domingo)').max(6, 'Día máximo 6 (sábado)'),
  startTime: z.string().regex(timeRegex, 'Hora de inicio debe estar en formato HH:MM'),
  endTime: z.string().regex(timeRegex, 'Hora de fin debe estar en formato HH:MM'),
  isActive: z.boolean('isActive debe ser un booleano')
}).refine((data) => {
  const start = data.startTime.split(':').map(Number)
  const end = data.endTime.split(':').map(Number)
  const startMinutes = start[0] * 60 + start[1]
  const endMinutes = end[0] * 60 + end[1]
  return startMinutes < endMinutes
}, {
  message: "Hora de fin debe ser posterior a la hora de inicio",
  path: ["endTime"]
})

export const bulkWorkScheduleSchema = z.object({
  schedules: z.array(workScheduleSchema).min(1, 'Debe incluir al menos un horario').max(7, 'Máximo 7 días de la semana')
})

// Business Settings validations - CORREGIDAS
export const businessSettingsSchema = z.object({
  whatsappEnabled: z.union([
    z.string().transform(val => val === 'true'),
    z.boolean()
  ]).optional(),
  whatsappNumber: z.string().regex(phoneRegex, 'Número de WhatsApp inválido').optional().or(z.literal('')),
  emailEnabled: z.union([
    z.string().transform(val => val === 'true'),
    z.boolean()
  ]).optional(),
  emailTemplate: z.string().min(10, 'Plantilla de email muy corta').max(1000, 'Plantilla de email muy larga').optional(),
  whatsappTemplate: z.string().min(10, 'Plantilla de WhatsApp muy corta').max(500, 'Plantilla de WhatsApp muy larga').optional(),
  reminderHours: z.union([
    z.string().transform(val => {
      const num = parseInt(val)
      if (isNaN(num) || num < 1 || num > 168) {
        throw new Error('Horas de recordatorio deben estar entre 1 y 168')
      }
      return num
    }),
    z.number().min(1, 'Mínimo 1 hora').max(168, 'Máximo 168 horas (1 semana)')
  ]).optional(),
  confirmationEnabled: z.union([
    z.string().transform(val => val === 'true'),
    z.boolean()
  ]).optional(),
  cancellationPolicy: z.string().max(1000, 'Política de cancelación muy larga').optional(),
  currency: z.string().length(3, 'Código de moneda debe tener 3 caracteres').optional().or(z.literal('CLP')),
  timeZone: z.string().min(3, 'Zona horaria inválida').optional().or(z.literal('America/Santiago')),
  bookingWindowDays: z.union([
    z.string().transform(val => {
      const num = parseInt(val)
      if (isNaN(num) || num < 1 || num > 365) {
        throw new Error('Días de ventana de reserva deben estar entre 1 y 365')
      }
      return num
    }),
    z.number().min(1, 'Mínimo 1 día').max(365, 'Máximo 365 días')
  ]).optional(),
  maxAppointmentsPerDay: z.union([
    z.string().transform(val => {
      const num = parseInt(val)
      if (isNaN(num) || num < 1 || num > 50) {
        throw new Error('Máximo citas por día debe estar entre 1 y 50')
      }
      return num
    }),
    z.number().min(1, 'Mínimo 1 cita').max(50, 'Máximo 50 citas')
  ]).optional(),
  defaultAppointmentDuration: z.union([
    z.string().transform(val => {
      const num = parseInt(val)
      if (isNaN(num) || num < 15 || num > 480) {
        throw new Error('Duración por defecto debe estar entre 15 y 480 minutos')
      }
      return num
    }),
    z.number().min(15, 'Mínimo 15 minutos').max(480, 'Máximo 8 horas')
  ]).optional()
})

// Notification validations
export const notificationSchema = z.object({
  appointmentId: z.number().int('ID de cita debe ser un entero').positive('ID de cita debe ser positivo'),
  type: z.enum(['REMINDER', 'CONFIRMATION', 'CANCELLATION', 'PAYMENT'], {
    errorMap: () => ({ message: 'Tipo de notificación inválido' })
  }),
  channel: z.enum(['WHATSAPP', 'EMAIL', 'SMS'], {
    errorMap: () => ({ message: 'Canal de notificación inválido' })
  }),
  message: z.string().min(1, 'Mensaje requerido').max(1000, 'Mensaje muy largo'),
  subject: z.string().max(200, 'Asunto muy largo').optional().or(z.literal(''))
})

// Query parameter validations
export const paginationSchema = z.object({
  page: z.union([
    z.string().transform(val => parseInt(val) || 1),
    z.number()
  ]).refine(val => val >= 1, {
    message: 'Página debe ser mayor a 0'
  }).optional(),
  limit: z.union([
    z.string().transform(val => parseInt(val) || 10),
    z.number()
  ]).refine(val => val >= 1 && val <= 100, {
    message: 'Límite debe estar entre 1 y 100'
  }).optional(),
  search: z.string().max(100, 'Búsqueda muy larga').optional(),
  sortBy: z.string().max(50, 'Campo de ordenación inválido').optional(),
  sortOrder: z.enum(['asc', 'desc'], {
    errorMap: () => ({ message: 'Orden debe ser asc o desc' })
  }).optional()
})

export const dateRangeSchema = z.object({
  startDate: z.string().regex(dateRegex, 'Fecha de inicio debe estar en formato YYYY-MM-DD'),
  endDate: z.string().regex(dateRegex, 'Fecha de fin debe estar en formato YYYY-MM-DD')
}).refine((data) => {
  const start = new Date(data.startDate)
  const end = new Date(data.endDate)
  return start <= end
}, {
  message: "Fecha de fin debe ser posterior o igual a la fecha de inicio",
  path: ["endDate"]
})

export const availableSlotsSchema = z.object({
  date: z.string().regex(dateRegex, 'Fecha debe estar en formato YYYY-MM-DD'),
  serviceId: z.union([
    z.string().transform(val => parseInt(val)),
    z.number()
  ]).refine(val => val > 0, {
    message: 'ID de servicio debe ser positivo'
  })
})

// Statistics validations
export const statsSchema = z.object({
  period: z.enum(['day', 'week', 'month', 'year'], {
    errorMap: () => ({ message: 'Período debe ser day, week, month o year' })
  }).optional(),
  startDate: z.string().regex(dateRegex, 'Fecha de inicio inválida').optional(),
  endDate: z.string().regex(dateRegex, 'Fecha de fin inválida').optional(),
  groupBy: z.enum(['day', 'week', 'month'], {
    errorMap: () => ({ message: 'Agrupación debe ser day, week o month' })
  }).optional()
})

// Utility validation functions
export function validateTime(time: string): boolean {
  return timeRegex.test(time)
}

export function validateDate(date: string): boolean {
  return dateRegex.test(date) && !isNaN(Date.parse(date))
}

export function validatePhone(phone: string): boolean {
  return phoneRegex.test(phone)
}

export function validateEmail(email: string): boolean {
  return z.string().email().safeParse(email).success
}

export function validateTimeSlot(startTime: string, endTime: string): boolean {
  if (!validateTime(startTime) || !validateTime(endTime)) {
    return false
  }
  
  const start = startTime.split(':').map(Number)
  const end = endTime.split(':').map(Number)
  const startMinutes = start[0] * 60 + start[1]
  const endMinutes = end[0] * 60 + end[1]
  
  return startMinutes < endMinutes
}

// Export all schemas for easy import
export const schemas = {
  // Auth
  register: registerSchema,
  login: loginSchema,
  updateUser: updateUserSchema,
  changePassword: changePasswordSchema,
  
  // Client
  client: clientSchema,
  
  // Service
  service: serviceSchema,
  
  // Appointment
  appointment: appointmentSchema,
  updateAppointmentStatus: updateAppointmentStatusSchema,
  
  // Payment
  payment: paymentSchema,
  updatePayment: updatePaymentSchema,
  
  // Work Schedule
  workSchedule: workScheduleSchema,
  bulkWorkSchedule: bulkWorkScheduleSchema,
  
  // Business Settings
  businessSettings: businessSettingsSchema,
  
  // Notification
  notification: notificationSchema,
  
  // Query Parameters
  pagination: paginationSchema,
  dateRange: dateRangeSchema,
  availableSlots: availableSlotsSchema,
  stats: statsSchema
}