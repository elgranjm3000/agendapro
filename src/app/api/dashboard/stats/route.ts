import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'

// GET - Obtener estadísticas del dashboard
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const today = new Date()
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
    
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())
    startOfWeek.setHours(0, 0, 0, 0)
    
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    
    // Estadísticas de citas de hoy
    const [todayAppointments, todayRevenue, weeklyAppointments, monthlyRevenue] = await Promise.all([
      prisma.appointment.findMany({
        where: {
          userId: authResult.user.id,
          appointmentDate: startOfDay,
          status: { in: ['SCHEDULED', 'CONFIRMED', 'COMPLETED'] }
        },
        include: {
          client: { select: { name: true, phone: true } },
          service: { select: { name: true, color: true, duration: true } }
        },
        orderBy: { startTime: 'asc' }
      }),
      
      prisma.payment.aggregate({
        where: {
          userId: authResult.user.id,
          status: 'COMPLETED',
          createdAt: { gte: startOfDay, lte: endOfDay }
        },
        _sum: { amount: true }
      }),
      
      prisma.appointment.count({
        where: {
          userId: authResult.user.id,
          appointmentDate: { gte: startOfWeek },
          status: { in: ['SCHEDULED', 'CONFIRMED', 'COMPLETED'] }
        }
      }),
      
      prisma.payment.aggregate({
        where: {
          userId: authResult.user.id,
          status: 'COMPLETED',
          createdAt: { gte: startOfMonth }
        },
        _sum: { amount: true }
      })
    ])
    
    // Clientes totales
    const totalClients = await prisma.client.count({
      where: { userId: authResult.user.id }
    })
    
    // Próximas citas (siguientes 7 días)
    const upcomingAppointments = await prisma.appointment.findMany({
      where: {
        userId: authResult.user.id,
        appointmentDate: {
          gte: today,
          lte: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
        },
        status: { in: ['SCHEDULED', 'CONFIRMED'] }
      },
      take: 5,
      orderBy: [
        { appointmentDate: 'asc' },
        { startTime: 'asc' }
      ],
      include: {
        client: { select: { name: true, phone: true } },
        service: { select: { name: true, color: true } }
      }
    })
    
    // Servicios más populares (último mes)
    const popularServices = await prisma.appointment.groupBy({
      by: ['serviceId'],
      where: {
        userId: authResult.user.id,
        appointmentDate: { gte: startOfMonth },
        status: { in: ['COMPLETED', 'CONFIRMED'] }
      },
      _count: { serviceId: true },
      orderBy: { _count: { serviceId: 'desc' } },
      take: 5
    })
    
    // Obtener detalles de los servicios populares
    const serviceIds = popularServices.map(s => s.serviceId)
    const servicesDetails = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
      select: { id: true, name: true, color: true }
    })
    
    const popularServicesWithDetails = popularServices.map(stat => {
      const service = servicesDetails.find(s => s.id === stat.serviceId)
      return {
        ...stat,
        service
      }
    })
    
    return NextResponse.json({
      today: {
        appointments: todayAppointments,
        appointmentCount: todayAppointments.length,
        revenue: todayRevenue._sum.amount || 0
      },
      weekly: {
        appointmentCount: weeklyAppointments
      },
      monthly: {
        revenue: monthlyRevenue._sum.amount || 0
      },
      totalClients,
      upcomingAppointments,
      popularServices: popularServicesWithDetails
    })
    
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}