import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'
import { generateAvailableSlots, formatTime } from '@/lib/utils'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// GET - Obtener horarios disponibles para una fecha específica
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') // YYYY-MM-DD
    const serviceId = searchParams.get('serviceId')
    
    if (!date) {
      return NextResponse.json(
        { error: 'Fecha requerida' },
        { status: 400 }
      )
    }
    
    if (!serviceId) {
      return NextResponse.json(
        { error: 'ID de servicio requerido' },
        { status: 400 }
      )
    }
    
    // Obtener información del servicio
    const service = await prisma.service.findFirst({
      where: {
        id: parseInt(serviceId),
        userId: authResult.user.id,
        isActive: true
      }
    })
    
    if (!service) {
      return NextResponse.json(
        { error: 'Servicio no encontrado' },
        { status: 404 }
      )
    }
    
    // Verificar horarios de trabajo
    const appointmentDate = new Date(date)
    const dayOfWeek = appointmentDate.getDay()
    
    const workSchedule = await prisma.workSchedule.findFirst({
      where: {
        userId: authResult.user.id,
        dayOfWeek,
        isActive: true
      }
    })
    
    if (!workSchedule) {
      return NextResponse.json({
        availableSlots: [],
        message: 'No hay horario de trabajo para este día'
      })
    }
    
    // Obtener citas existentes para la fecha
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        userId: authResult.user.id,
        appointmentDate: appointmentDate,
        status: { in: ['SCHEDULED', 'CONFIRMED'] }
      },
      select: { startTime: true, endTime: true }
    })
    
    // Generar slots disponibles
    const workStart = formatTime(workSchedule.startTime)
    const workEnd = formatTime(workSchedule.endTime)
    
    const availableSlots = generateAvailableSlots(
      workStart,
      workEnd,
      service.duration,
      existingAppointments
    )
    
    return NextResponse.json({
      availableSlots,
      workHours: {
        start: workStart,
        end: workEnd
      },
      serviceDuration: service.duration
    })
    
  } catch (error) {
    console.error('Get available slots error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}