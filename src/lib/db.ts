// lib/db.ts
import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
})

if (process.env.NODE_ENV === 'development') {
  globalThis.prisma = client
}

export { client as prisma }

// Funciones de utilidad para la base de datos
export class DatabaseUtils {
  static async checkConnection() {
    try {
      await client.$queryRaw`SELECT 1`
      return true
    } catch (error) {
      console.error('Database connection error:', error)
      return false
    }
  }

  // Función para limpiar sesiones expiradas
  static async cleanExpiredSessions() {
    try {
      const result = await client.session.deleteMany({
        where: {
          expiresAt: {
            lt: new Date()
          }
        }
      })
      console.log(`Cleaned ${result.count} expired sessions`)
      return result.count
    } catch (error) {
      console.error('Error cleaning expired sessions:', error)
      return 0
    }
  }

  // Función para obtener estadísticas generales
  static async getGeneralStats(userId: number) {
    try {
      const [
        totalClients,
        totalAppointments,
        totalRevenue,
        activeServices
      ] = await Promise.all([
        client.client.count({
          where: { userId }
        }),
        client.appointment.count({
          where: { userId }
        }),
        client.payment.aggregate({
          where: {
            userId,
            status: 'COMPLETED'
          },
          _sum: {
            amount: true
          }
        }),
        client.service.count({
          where: {
            userId,
            isActive: true
          }
        })
      ])

      return {
        totalClients,
        totalAppointments,
        totalRevenue: totalRevenue._sum.amount || 0,
        activeServices
      }
    } catch (error) {
      console.error('Error getting general stats:', error)
      throw error
    }
  }

  // Función para buscar citas por fecha
  static async getAppointmentsByDateRange(
    userId: number,
    startDate: Date,
    endDate: Date,
    includeDetails = true
  ) {
    try {
      return await client.appointment.findMany({
        where: {
          userId,
          appointmentDate: {
            gte: startDate,
            lte: endDate
          }
        },
        include: includeDetails ? {
          client: {
            select: {
              id: true,
              name: true,
              phone: true,
              email: true
            }
          },
          service: {
            select: {
              id: true,
              name: true,
              duration: true,
              price: true,
              color: true
            }
          },
          payments: {
            select: {
              id: true,
              amount: true,
              status: true,
              paymentMethod: true
            }
          }
        } : false,
        orderBy: [
          { appointmentDate: 'asc' },
          { startTime: 'asc' }
        ]
      })
    } catch (error) {
      console.error('Error getting appointments by date range:', error)
      throw error
    }
  }

  // Función para verificar disponibilidad de horario
  static async checkTimeSlotAvailability(
    userId: number,
    date: Date,
    startTime: string,
    endTime: string,
    excludeAppointmentId?: number
  ) {
    try {
      const conflictingAppointment = await client.appointment.findFirst({
        where: {
          userId,
          appointmentDate: date,
          status: {
            in: ['SCHEDULED', 'CONFIRMED']
          },
          ...(excludeAppointmentId && {
            id: { not: excludeAppointmentId }
          }),
          OR: [
            // Nueva cita empieza durante una cita existente
            {
              AND: [
                { startTime: { lte: new Date(`2000-01-01T${startTime}:00`) } },
                { endTime: { gt: new Date(`2000-01-01T${startTime}:00`) } }
              ]
            },
            // Nueva cita termina durante una cita existente
            {
              AND: [
                { startTime: { lt: new Date(`2000-01-01T${endTime}:00`) } },
                { endTime: { gte: new Date(`2000-01-01T${endTime}:00`) } }
              ]
            },
            // Nueva cita envuelve una cita existente
            {
              AND: [
                { startTime: { gte: new Date(`2000-01-01T${startTime}:00`) } },
                { endTime: { lte: new Date(`2000-01-01T${endTime}:00`) } }
              ]
            }
          ]
        }
      })

      return !conflictingAppointment
    } catch (error) {
      console.error('Error checking time slot availability:', error)
      throw error
    }
  }

  // Función para obtener el siguiente slot disponible
  static async getNextAvailableSlot(
    userId: number,
    serviceId: number,
    fromDate: Date = new Date()
  ) {
    try {
      const service = await client.service.findFirst({
        where: {
          id: serviceId,
          userId,
          isActive: true
        }
      })

      if (!service) {
        throw new Error('Service not found')
      }

      const workSchedules = await client.workSchedule.findMany({
        where: {
          userId,
          isActive: true
        }
      })

      // Buscar en los próximos 30 días
      for (let i = 0; i < 30; i++) {
        const checkDate = new Date(fromDate)
        checkDate.setDate(checkDate.getDate() + i)
        
        const dayOfWeek = checkDate.getDay()
        const workSchedule = workSchedules.find(ws => ws.dayOfWeek === dayOfWeek)
        
        if (!workSchedule) continue

        // Generar slots para este día
        const slots = await this.generateAvailableSlots(
          userId,
          checkDate,
          service.duration,
          workSchedule.startTime.toTimeString().slice(0, 5),
          workSchedule.endTime.toTimeString().slice(0, 5)
        )

        if (slots.length > 0) {
          return {
            date: checkDate.toISOString().split('T')[0],
            time: slots[0],
            dayOfWeek
          }
        }
      }

      return null
    } catch (error) {
      console.error('Error getting next available slot:', error)
      throw error
    }
  }

  // Función para generar slots disponibles
  static async generateAvailableSlots(
    userId: number,
    date: Date,
    serviceDuration: number,
    workStart: string,
    workEnd: string,
    slotInterval: number = 15 // minutos entre slots
  ) {
    try {
      const existingAppointments = await client.appointment.findMany({
        where: {
          userId,
          appointmentDate: date,
          status: {
            in: ['SCHEDULED', 'CONFIRMED']
          }
        },
        select: {
          startTime: true,
          endTime: true
        }
      })

      const slots: string[] = []
      const [workStartHour, workStartMin] = workStart.split(':').map(Number)
      const [workEndHour, workEndMin] = workEnd.split(':').map(Number)
      
      const workStartMinutes = workStartHour * 60 + workStartMin
      const workEndMinutes = workEndHour * 60 + workEndMin
      
      for (let minutes = workStartMinutes; minutes + serviceDuration <= workEndMinutes; minutes += slotInterval) {
        const slotHour = Math.floor(minutes / 60)
        const slotMin = minutes % 60
        const slotTime = `${slotHour.toString().padStart(2, '0')}:${slotMin.toString().padStart(2, '0')}`
        
        const slotEndMinutes = minutes + serviceDuration
        const slotEndHour = Math.floor(slotEndMinutes / 60)
        const slotEndMin = slotEndMinutes % 60
        const slotEndTime = `${slotEndHour.toString().padStart(2, '0')}:${slotEndMin.toString().padStart(2, '0')}`
        
        // Verificar si este slot está libre
        const isAvailable = await this.checkTimeSlotAvailability(
          userId,
          date,
          slotTime,
          slotEndTime
        )
        
        if (isAvailable) {
          slots.push(slotTime)
        }
      }

      return slots
    } catch (error) {
      console.error('Error generating available slots:', error)
      throw error
    }
  }

  // Función para obtener clientes frecuentes
  static async getFrequentClients(userId: number, limit: number = 10) {
    try {
      return await client.client.findMany({
        where: {
          userId,
          totalAppointments: {
            gt: 0
          }
        },
        orderBy: {
          totalAppointments: 'desc'
        },
        take: limit,
        include: {
          _count: {
            select: {
              appointments: {
                where: {
                  status: 'COMPLETED'
                }
              }
            }
          }
        }
      })
    } catch (error) {
      console.error('Error getting frequent clients:', error)
      throw error
    }
  }

  // Función para obtener ingresos por período
  static async getRevenueByPeriod(
    userId: number,
    startDate: Date,
    endDate: Date,
    groupBy: 'day' | 'week' | 'month' = 'day'
  ) {
    try {
      let dateFormat = '%Y-%m-%d'
      
      if (groupBy === 'week') {
        dateFormat = '%Y-%u'
      } else if (groupBy === 'month') {
        dateFormat = '%Y-%m'
      }

      const result = await client.$queryRaw`
        SELECT 
          DATE_FORMAT(created_at, ${dateFormat}) as period,
          SUM(amount) as total_amount,
          COUNT(*) as total_payments
        FROM payments
        WHERE user_id = ${userId}
          AND status = 'COMPLETED'
          AND created_at >= ${startDate}
          AND created_at <= ${endDate}
        GROUP BY DATE_FORMAT(created_at, ${dateFormat})
        ORDER BY period
      ` as Array<{
        period: string
        total_amount: number
        total_payments: number
      }>

      return result
    } catch (error) {
      console.error('Error getting revenue by period:', error)
      throw error
    }
  }

  // Función para limpiar datos antiguos
  static async cleanOldData(daysToKeep: number = 365) {
    try {
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep)

      // Limpiar notificaciones antiguas
      const deletedNotifications = await client.notification.deleteMany({
        where: {
          createdAt: {
            lt: cutoffDate
          },
          status: {
            in: ['SENT', 'DELIVERED', 'FAILED']
          }
        }
      })

      // Limpiar sesiones muy antiguas
      const deletedSessions = await client.session.deleteMany({
        where: {
          createdAt: {
            lt: cutoffDate
          }
        }
      })

      console.log(`Cleaned ${deletedNotifications.count} old notifications and ${deletedSessions.count} old sessions`)
      
      return {
        notifications: deletedNotifications.count,
        sessions: deletedSessions.count
      }
    } catch (error) {
      console.error('Error cleaning old data:', error)
      throw error
    }
  }

  // Función para backup de datos importantes
  static async exportUserData(userId: number) {
    try {
      const [user, clients, services, appointments, payments] = await Promise.all([
        client.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            email: true,
            name: true,
            businessName: true,
            businessAddress: true,
            businessPhone: true,
            createdAt: true
          }
        }),
        client.client.findMany({
          where: { userId }
        }),
        client.service.findMany({
          where: { userId }
        }),
        client.appointment.findMany({
          where: { userId },
          include: {
            client: {
              select: { name: true, email: true, phone: true }
            },
            service: {
              select: { name: true }
            }
          }
        }),
        client.payment.findMany({
          where: { userId },
          include: {
            appointment: {
              select: {
                appointmentDate: true,
                client: { select: { name: true } },
                service: { select: { name: true } }
              }
            }
          }
        })
      ])

      return {
        user,
        clients,
        services,
        appointments,
        payments,
        exportDate: new Date().toISOString()
      }
    } catch (error) {
      console.error('Error exporting user data:', error)
      throw error
    }
  }

  // Función para verificar la integridad de los datos
  static async verifyDataIntegrity(userId: number) {
    try {
      const issues: string[] = []

      // Verificar citas sin cliente
      const appointmentsWithoutClient = await client.appointment.count({
        where: {
          userId,
          client: null
        }
      })
      if (appointmentsWithoutClient > 0) {
        issues.push(`${appointmentsWithoutClient} appointments without valid client`)
      }

      // Verificar citas sin servicio
      const appointmentsWithoutService = await client.appointment.count({
        where: {
          userId,
          service: null
        }
      })
      if (appointmentsWithoutService > 0) {
        issues.push(`${appointmentsWithoutService} appointments without valid service`)
      }

      // Verificar pagos sin cita
      const paymentsWithoutAppointment = await client.payment.count({
        where: {
          userId,
          appointment: null
        }
      })
      if (paymentsWithoutAppointment > 0) {
        issues.push(`${paymentsWithoutAppointment} payments without valid appointment`)
      }

      // Verificar inconsistencias en el conteo de citas por cliente
      const clientsWithIncorrectCount = await client.$queryRaw`
        SELECT c.id, c.name, c.total_appointments, 
               COUNT(a.id) as actual_count
        FROM clients c
        LEFT JOIN appointments a ON c.id = a.client_id
        WHERE c.user_id = ${userId}
        GROUP BY c.id, c.name, c.total_appointments
        HAVING c.total_appointments != COUNT(a.id)
      ` as Array<{
        id: number
        name: string
        total_appointments: number
        actual_count: number
      }>

      if (clientsWithIncorrectCount.length > 0) {
        issues.push(`${clientsWithIncorrectCount.length} clients with incorrect appointment count`)
      }

      return {
        isHealthy: issues.length === 0,
        issues,
        clientsWithIncorrectCount
      }
    } catch (error) {
      console.error('Error verifying data integrity:', error)
      throw error
    }
  }

  // Función para reparar contadores de citas
  static async repairAppointmentCounters(userId: number) {
    try {
      const result = await client.$executeRaw`
        UPDATE clients c
        SET total_appointments = (
          SELECT COUNT(*)
          FROM appointments a
          WHERE a.client_id = c.id
        ),
        last_appointment_date = (
          SELECT MAX(CONCAT(appointment_date, ' ', start_time))
          FROM appointments a
          WHERE a.client_id = c.id
        )
        WHERE c.user_id = ${userId}
      `

      return result
    } catch (error) {
      console.error('Error repairing appointment counters:', error)
      throw error
    }
  }
}

// Función para inicializar la base de datos
export async function initializeDatabase() {
  try {
    console.log('🔌 Connecting to database...')
    
    const isConnected = await DatabaseUtils.checkConnection()
    if (!isConnected) {
      throw new Error('Unable to connect to database')
    }

    console.log('✅ Database connected successfully')

    // Limpiar sesiones expiradas al iniciar
    await DatabaseUtils.cleanExpiredSessions()

    return true
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    return false
  }
}

// Función para cerrar la conexión de la base de datos
export async function closeDatabase() {
  try {
    await client.$disconnect()
    console.log('🔌 Database disconnected')
  } catch (error) {
    console.error('Error disconnecting from database:', error)
  }
}

// Funciones de consulta rápida
export const quickQueries = {
  // Obtener citas de hoy para un usuario
  getTodayAppointments: (userId: number) =>
    client.appointment.findMany({
      where: {
        userId,
        appointmentDate: new Date(new Date().toDateString())
      },
      include: {
        client: { select: { name: true, phone: true } },
        service: { select: { name: true, color: true, duration: true } }
      },
      orderBy: { startTime: 'asc' }
    }),

  // Obtener próximas citas para un cliente
  getUpcomingAppointmentsForClient: (clientId: number) =>
    client.appointment.findMany({
      where: {
        clientId,
        appointmentDate: { gte: new Date() },
        status: { in: ['SCHEDULED', 'CONFIRMED'] }
      },
      include: {
        service: { select: { name: true, duration: true, color: true } }
      },
      orderBy: [
        { appointmentDate: 'asc' },
        { startTime: 'asc' }
      ],
      take: 5
    }),

  // Obtener servicios activos de un usuario
  getActiveServices: (userId: number) =>
    client.service.findMany({
      where: {
        userId,
        isActive: true
      },
      orderBy: { name: 'asc' }
    }),

  // Obtener ingresos del mes actual
  getCurrentMonthRevenue: (userId: number) => {
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
    
    return client.payment.aggregate({
      where: {
        userId,
        status: 'COMPLETED',
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      },
      _sum: { amount: true },
      _count: { id: true }
    })
  }
}

export default client