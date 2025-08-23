import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'

// GET - Obtener pago específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const paymentId = parseInt(params.id)
    
    if (isNaN(paymentId)) {
      return NextResponse.json(
        { error: 'ID de pago inválido' },
        { status: 400 }
      )
    }
    
    const payment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        userId: authResult.user.id
      },
      include: {
        appointment: {
          include: {
            client: true,
            service: true
          }
        }
      }
    })
    
    if (!payment) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(payment)
    
  } catch (error) {
    console.error('Get payment error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar estado de pago
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const paymentId = parseInt(params.id)
    
    if (isNaN(paymentId)) {
      return NextResponse.json(
        { error: 'ID de pago inválido' },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    const { status, notes } = body
    
    // Verificar que el pago pertenece al usuario
    const existingPayment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        userId: authResult.user.id
      }
    })
    
    if (!existingPayment) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }
    
    const updateData: any = {}
    
    if (status) {
      updateData.status = status
      
      if (status === 'COMPLETED' && !existingPayment.paidAt) {
        updateData.paidAt = new Date()
      } else if (status === 'REFUNDED') {
        updateData.refundedAt = new Date()
      }
    }
    
    if (notes !== undefined) {
      updateData.notes = notes
    }
    
    const payment = await prisma.payment.update({
      where: { id: paymentId },
      data: updateData,
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
    
    // Actualizar estado de pago en la cita
    if (status) {
      let appointmentPaymentStatus = 'PENDING'
      if (status === 'COMPLETED') appointmentPaymentStatus = 'PAID'
      else if (status === 'REFUNDED') appointmentPaymentStatus = 'REFUNDED'
      
      await prisma.appointment.update({
        where: { id: payment.appointmentId },
        data: { paymentStatus: appointmentPaymentStatus }
      })
    }
    
    return NextResponse.json(payment)
    
  } catch (error: any) {
    console.error('Update payment error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
