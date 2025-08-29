import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'
import { serviceSchema } from '@/lib/validations'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// GET - Obtener servicio específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const serviceId = parseInt(params.id)
    
    if (isNaN(serviceId)) {
      return NextResponse.json(
        { error: 'ID de servicio inválido' },
        { status: 400 }
      )
    }
    
    const service = await prisma.service.findFirst({
      where: {
        id: serviceId,
        userId: authResult.user.id
      },
      include: {
        appointments: {
          take: 10,
          orderBy: { appointmentDate: 'desc' },
          include: {
            client: {
              select: { name: true, phone: true }
            }
          }
        },
        _count: {
          select: { appointments: true }
        }
      }
    })
    
    if (!service) {
      return NextResponse.json(
        { error: 'Servicio no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(service)
    
  } catch (error) {
    console.error('Get service error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar servicio
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const serviceId = parseInt(params.id)
    
    if (isNaN(serviceId)) {
      return NextResponse.json(
        { error: 'ID de servicio inválido' },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    const validatedData = serviceSchema.parse(body)
    
    // Verificar que el servicio pertenece al usuario
    const existingService = await prisma.service.findFirst({
      where: {
        id: serviceId,
        userId: authResult.user.id
      }
    })
    
    if (!existingService) {
      return NextResponse.json(
        { error: 'Servicio no encontrado' },
        { status: 404 }
      )
    }
    
    // Verificar conflictos de nombre con otros servicios
    const conflictingService = await prisma.service.findFirst({
      where: {
        userId: authResult.user.id,
        id: { not: serviceId },
        name: validatedData.name,
        isActive: true
      }
    })
    
    if (conflictingService) {
      return NextResponse.json(
        { error: 'Ya existe otro servicio con ese nombre' },
        { status: 400 }
      )
    }
    
    const service = await prisma.service.update({
      where: { id: serviceId },
      data: validatedData,
      include: {
        _count: {
          select: { appointments: true }
        }
      }
    })
    
    return NextResponse.json(service)
    
  } catch (error: any) {
    console.error('Update service error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar/Desactivar servicio
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const serviceId = parseInt(params.id)
    
    if (isNaN(serviceId)) {
      return NextResponse.json(
        { error: 'ID de servicio inválido' },
        { status: 400 }
      )
    }
    
    // Verificar que el servicio pertenece al usuario
    const existingService = await prisma.service.findFirst({
      where: {
        id: serviceId,
        userId: authResult.user.id
      }
    })
    
    if (!existingService) {
      return NextResponse.json(
        { error: 'Servicio no encontrado' },
        { status: 404 }
      )
    }
    
    // Verificar si tiene citas futuras
    const futureAppointments = await prisma.appointment.count({
      where: {
        serviceId,
        appointmentDate: { gte: new Date() },
        status: { in: ['SCHEDULED', 'CONFIRMED'] }
      }
    })
    
    if (futureAppointments > 0) {
      // Si tiene citas futuras, solo desactivar
      const service = await prisma.service.update({
        where: { id: serviceId },
        data: { isActive: false },
        include: {
          _count: {
            select: { appointments: true }
          }
        }
      })
      
      return NextResponse.json({
        message: 'Servicio desactivado (tiene citas futuras)',
        service
      })
    } else {
      // Si no tiene citas futuras, eliminar completamente
      await prisma.service.delete({
        where: { id: serviceId }
      })
      
      return NextResponse.json({ message: 'Servicio eliminado correctamente' })
    }
    
  } catch (error) {
    console.error('Delete service error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

