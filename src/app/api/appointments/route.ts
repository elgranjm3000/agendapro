import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'
import { appointmentSchema } from '@/lib/validations'
import { addMinutesToTime, formatDate, formatTime, isTimeSlotAvailable } from '@/lib/utils'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// GET - Obtener citas
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') // YYYY-MM-DD
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const clientId = searchParams.get('clientId')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit
    
    let dateFilter = {}
    
    if (date) {
      dateFilter = { appointmentDate: new Date(date) }
    } else if (startDate && endDate) {
      dateFilter = {
        appointmentDate: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      }
    }
    
    const where = {
      userId: authResult.user.id,
      ...dateFilter,
      ...(clientId && { clientId: parseInt(clientId) }),
      ...(status && { status })
    }
    
    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { appointmentDate: 'asc' },
          { startTime: 'asc' }
        ],
        include: {
          client: {
            select: { id: true, name: true, phone: true, email: true }
          },
          service: {
            select: { id: true, name: true, duration: true, price: true, color: true }
          },
          payments: {
            select: { id: true, amount: true, status: true, paymentMethod: true }
          }
        }
      }),
      prisma.appointment.count({ where })
    ])
    
    return NextResponse.json({
      appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error('Get appointments error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear cita
export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const body = await request.json()
    const validatedData = appointmentSchema.parse(body)
    
    // Obtener información del servicio
    const service = await prisma.service.findFirst({
      where: {
        id: validatedData.serviceId,
        userId: authResult.user.id,
        isActive: true
      }
    })
    
    if (!service) {
      return NextResponse.json(
        { error: 'Servicio no encontrado o inactivo' },
        { status: 404 }
      )
    }
    
    // Verificar que el cliente pertenece al usuario
    const client = await prisma.client.findFirst({
      where: {
        id: validatedData.clientId,
        userId: authResult.user.id
      }
    })
    
    if (!client) {
      return NextResponse.json(
        { error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }
    
    // Calcular hora de fin
    const endTime = addMinutesToTime(validatedData.startTime, service.duration)
    
    // Verificar disponibilidad del horario
    const existingAppointments = await prisma.appointment.findMany({
      where: {
        userId: authResult.user.id,
        appointmentDate: new Date(validatedData.appointmentDate),
        status: { in: ['SCHEDULED', 'CONFIRMED'] }
      },
      select: { startTime: true, endTime: true }
    })
    
    if (!isTimeSlotAvailable(existingAppointments, validatedData.startTime, endTime)) {
      return NextResponse.json(
        { error: 'El horario ya está ocupado' },
        { status: 400 }
      )
    }
    
    // Verificar horarios de trabajo
    const appointmentDate = new Date(validatedData.appointmentDate)
    const dayOfWeek = appointmentDate.getDay()
    
    const workSchedule = await prisma.workSchedule.findFirst({
      where: {
        userId: authResult.user.id,
        dayOfWeek,
        isActive: true
      }
    })
    
    if (!workSchedule) {
      return NextResponse.json(
        { error: 'No hay horario de trabajo configurado para este día' },
        { status: 400 }
      )
    }
    
    const workStart = formatTime(workSchedule.startTime)
    const workEnd = formatTime(workSchedule.endTime)
    
    if (validatedData.startTime < workStart || endTime > workEnd) {
      return NextResponse.json(
        { error: 'La cita está fuera del horario de trabajo' },
        { status: 400 }
      )
    }
    
    const appointment = await prisma.appointment.create({
      data: {
        userId: authResult.user.id,
        clientId: validatedData.clientId,
        serviceId: validatedData.serviceId,
        appointmentDate: new Date(validatedData.appointmentDate),
        startTime: new Date(`2000-01-01T${validatedData.startTime}:00`),
        endTime: new Date(`2000-01-01T${endTime}:00`),
        price: validatedData.price || service.price,
        notes: validatedData.notes
      },
      include: {
        client: {
          select: { id: true, name: true, phone: true, email: true }
        },
        service: {
          select: { id: true, name: true, duration: true, price: true, color: true }
        }
      }
    })
    
    return NextResponse.json(appointment, { status: 201 })
    
  } catch (error: any) {
    console.error('Create appointment error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}