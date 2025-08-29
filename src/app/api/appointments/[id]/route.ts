import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'
import { appointmentSchema } from '@/lib/validations'
import { addMinutesToTime, formatTime, isTimeSlotAvailable } from '@/lib/utils'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// GET - Obtener cita específica
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const appointmentId = parseInt(params.id)
    
    if (isNaN(appointmentId)) {
      return NextResponse.json(
        { error: 'ID de cita inválido' },
        { status: 400 }
      )
    }
    
    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        userId: authResult.user.id
      },
      include: {
        client: true,
        service: true,
        payments: true
      }
    })
    
    if (!appointment) {
      return NextResponse.json(
        { error: 'Cita no encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(appointment)
    
  } catch (error) {
    console.error('Get appointment error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar cita
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const appointmentId = parseInt(params.id)
    
    if (isNaN(appointmentId)) {
      return NextResponse.json(
        { error: 'ID de cita inválido' },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    
    // Verificar que la cita pertenece al usuario
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        userId: authResult.user.id
      }
    })
    
    if (!existingAppointment) {
      return NextResponse.json(
        { error: 'Cita no encontrada' },
        { status: 404 }
      )
    }
    
    // Si se está actualizando la cita completa
    if (body.appointmentDate || body.startTime || body.serviceId) {
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
      
      // Calcular hora de fin
      const endTime = addMinutesToTime(validatedData.startTime, service.duration)
      
      // Verificar disponibilidad (excluyendo la cita actual)
      const existingAppointments = await prisma.appointment.findMany({
        where: {
          userId: authResult.user.id,
          appointmentDate: new Date(validatedData.appointmentDate),
          status: { in: ['SCHEDULED', 'CONFIRMED'] },
          id: { not: appointmentId }
        },
        select: { startTime: true, endTime: true }
      })
      
      if (!isTimeSlotAvailable(existingAppointments, validatedData.startTime, endTime)) {
        return NextResponse.json(
          { error: 'El horario ya está ocupado' },
          { status: 400 }
        )
      }
      
      const appointment = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
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
      
      return NextResponse.json(appointment)
    }
    
    // Si solo se está actualizando el estado o notas
    const allowedUpdates = ['status', 'notes', 'paymentStatus']
    const updateData: any = {}
    
    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        updateData[key] = body[key]
      }
    }
    
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No se proporcionaron datos para actualizar' },
        { status: 400 }
      )
    }
    
    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: updateData,
      include: {
        client: {
          select: { id: true, name: true, phone: true, email: true }
        },
        service: {
          select: { id: true, name: true, duration: true, price: true, color: true }
        }
      }
    })
    
    return NextResponse.json(appointment)
    
  } catch (error: any) {
    console.error('Update appointment error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Cancelar cita
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const appointmentId = parseInt(params.id)
    
    if (isNaN(appointmentId)) {
      return NextResponse.json(
        { error: 'ID de cita inválido' },
        { status: 400 }
      )
    }
    
    // Verificar que la cita pertenece al usuario
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        userId: authResult.user.id
      }
    })
    
    if (!existingAppointment) {
      return NextResponse.json(
        { error: 'Cita no encontrada' },
        { status: 404 }
      )
    }
    
    // Marcar como cancelada en lugar de eliminar
    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: 'CANCELLED' },
      include: {
        client: {
          select: { id: true, name: true, phone: true, email: true }
        },
        service: {
          select: { id: true, name: true, duration: true, price: true, color: true }
        }
      }
    })
    
    return NextResponse.json({
      message: 'Cita cancelada correctamente',
      appointment
    })
    
  } catch (error) {
    console.error('Cancel appointment error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}