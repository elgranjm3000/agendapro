import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'
import { clientSchema } from '@/lib/validations'

// GET - Obtener cliente específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const clientId = parseInt(params.id)
    
    if (isNaN(clientId)) {
      return NextResponse.json(
        { error: 'ID de cliente inválido' },
        { status: 400 }
      )
    }
    
    const client = await prisma.client.findFirst({
      where: {
        id: clientId,
        userId: authResult.user.id
      },
      include: {
        appointments: {
          take: 5,
          orderBy: { appointmentDate: 'desc' },
          include: {
            service: {
              select: { name: true, color: true }
            }
          }
        },
        _count: {
          select: { appointments: true }
        }
      }
    })
    
    if (!client) {
      return NextResponse.json(
        { error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(client)
    
  } catch (error) {
    console.error('Get client error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar cliente
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const clientId = parseInt(params.id)
    
    if (isNaN(clientId)) {
      return NextResponse.json(
        { error: 'ID de cliente inválido' },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    const validatedData = clientSchema.parse(body)
    
    // Verificar que el cliente pertenece al usuario
    const existingClient = await prisma.client.findFirst({
      where: {
        id: clientId,
        userId: authResult.user.id
      }
    })
    
    if (!existingClient) {
      return NextResponse.json(
        { error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }
    
    // Verificar conflictos de email/teléfono con otros clientes
    if (validatedData.email || validatedData.phone) {
      const conflictingClient = await prisma.client.findFirst({
        where: {
          userId: authResult.user.id,
          id: { not: clientId },
          OR: [
            ...(validatedData.email ? [{ email: validatedData.email }] : []),
            ...(validatedData.phone ? [{ phone: validatedData.phone }] : [])
          ]
        }
      })
      
      if (conflictingClient) {
        return NextResponse.json(
          { error: 'Ya existe otro cliente con ese email o teléfono' },
          { status: 400 }
        )
      }
    }
    
    const client = await prisma.client.update({
      where: { id: clientId },
      data: {
        ...validatedData,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null
      },
      include: {
        _count: {
          select: { appointments: true }
        }
      }
    })
    
    return NextResponse.json(client)
    
  } catch (error: any) {
    console.error('Update client error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar cliente
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const clientId = parseInt(params.id)
    
    if (isNaN(clientId)) {
      return NextResponse.json(
        { error: 'ID de cliente inválido' },
        { status: 400 }
      )
    }
    
    // Verificar que el cliente pertenece al usuario
    const existingClient = await prisma.client.findFirst({
      where: {
        id: clientId,
        userId: authResult.user.id
      }
    })
    
    if (!existingClient) {
      return NextResponse.json(
        { error: 'Cliente no encontrado' },
        { status: 404 }
      )
    }
    
    // Verificar si tiene citas futuras
    const futureAppointments = await prisma.appointment.count({
      where: {
        clientId,
        appointmentDate: { gte: new Date() },
        status: { in: ['SCHEDULED', 'CONFIRMED'] }
      }
    })
    
    if (futureAppointments > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar un cliente con citas futuras' },
        { status: 400 }
      )
    }
    
    await prisma.client.delete({
      where: { id: clientId }
    })
    
    return NextResponse.json({ message: 'Cliente eliminado correctamente' })
    
  } catch (error) {
    console.error('Delete client error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}