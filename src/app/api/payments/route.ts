import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'

// GET - Obtener todos los pagos
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const status = searchParams.get('status')
    const paymentMethod = searchParams.get('paymentMethod')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit
    
    let dateFilter = {}
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate + 'T23:59:59.999Z')
        }
      }
    }
    
    const where = {
      userId: authResult.user.id,
      ...dateFilter,
      ...(status && { status }),
      ...(paymentMethod && { paymentMethod })
    }
    
    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          appointment: {
            include: {
              client: {
                select: { id: true, name: true, phone: true }
              },
              service: {
                select: { id: true, name: true }
              }
            }
          }
        }
      }),
      prisma.payment.count({ where })
    ])
    
    // Calcular estadísticas
    const stats = await prisma.payment.aggregate({
      where: { userId: authResult.user.id, status: 'COMPLETED' },
      _sum: { amount: true },
      _count: { id: true }
    })
    
    return NextResponse.json({
      payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats: {
        totalAmount: stats._sum.amount || 0,
        completedPayments: stats._count || 0
      }
    })
    
  } catch (error) {
    console.error('Get payments error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear pago
export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const body = await request.json()
    const { appointmentId, paymentMethod, amount, notes } = body
    
    if (!appointmentId || !paymentMethod || !amount) {
      return NextResponse.json(
        { error: 'appointmentId, paymentMethod y amount son requeridos' },
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
    
    // Verificar si ya existe un pago para esta cita
    const existingPayment = await prisma.payment.findFirst({
      where: {
        appointmentId,
        status: { in: ['PENDING', 'COMPLETED'] }
      }
    })
    
    if (existingPayment) {
      return NextResponse.json(
        { error: 'Ya existe un pago para esta cita' },
        { status: 400 }
      )
    }
    
    const payment = await prisma.payment.create({
      data: {
        appointmentId,
        userId: authResult.user.id,
        clientId: appointment.clientId,
        amount,
        paymentMethod,
        status: paymentMethod === 'CASH' ? 'COMPLETED' : 'PENDING',
        paidAt: paymentMethod === 'CASH' ? new Date() : null,
        notes
      },
      include: {
        appointment: {
          include: {
            client: {
              select: { id: true, name: true, phone: true }
            },
            service: {
              select: { id: true, name: true }
            }
          }
        }
      }
    })
    
    // Actualizar estado de pago de la cita
    if (paymentMethod === 'CASH') {
      await prisma.appointment.update({
        where: { id: appointmentId },
        data: { paymentStatus: 'PAID' }
      })
    }
    
    return NextResponse.json(payment, { status: 201 })
    
  } catch (error: any) {
    console.error('Create payment error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
