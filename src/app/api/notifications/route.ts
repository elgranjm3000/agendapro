import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'

// GET - Obtener historial de notificaciones
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit
    
    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where: { userId: authResult.user.id },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          appointment: {
            select: {
              id: true,
              appointmentDate: true,
              startTime: true,
              client: { select: { name: true } },
              service: { select: { name: true } }
            }
          }
        }
      }),
      prisma.notification.count({
        where: { userId: authResult.user.id }
      })
    ])
    
    return NextResponse.json({
      notifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error('Get notifications error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Enviar notificación manual
export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const body = await request.json()
    const { appointmentId, type, channel, message, subject } = body
    
    if (!appointmentId || !type || !channel || !message) {
      return NextResponse.json(
        { error: 'appointmentId, type, channel y message son requeridos' },
        { status: 400 }
      )
    }
    
    // Verificar que la cita pertenece al usuario
    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        userId: authResult.user.id
      },
      include: {
        client: true,
        service: true
      }
    })
    
    if (!appointment) {
      return NextResponse.json(
        { error: 'Cita no encontrada' },
        { status: 404 }
      )
    }
    
    // Determinar el destinatario
    let recipient = ''
    if (channel === 'WHATSAPP' || channel === 'SMS') {
      recipient = appointment.client.phone || ''
    } else if (channel === 'EMAIL') {
      recipient = appointment.client.email || ''
    }
    
    if (!recipient) {
      return NextResponse.json(
        { error: `Cliente no tiene ${channel.toLowerCase()} configurado` },
        { status: 400 }
      )
    }
    
    const notification = await prisma.notification.create({
      data: {
        userId: authResult.user.id,
        appointmentId,
        type,
        channel,
        recipient,
        subject,
        message,
        status: 'PENDING'
      }
    })
    
    // Aquí se integraría con el servicio de notificaciones real
    // Por ahora simulamos el envío
    setTimeout(async () => {
      await prisma.notification.update({
        where: { id: notification.id },
        data: {
          status: 'SENT',
          sentAt: new Date()
        }
      })
    }, 1000)
    
    return NextResponse.json(notification, { status: 201 })
    
  } catch (error: any) {
    console.error('Send notification error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}