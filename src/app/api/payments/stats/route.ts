import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// GET - Obtener estadísticas de pagos
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || 'month' // month, week, year
    
    let startDate = new Date()
    let endDate = new Date()
    
    switch (period) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1)
        break
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1)
        break
      default:
        startDate.setMonth(startDate.getMonth() - 1)
    }
    
    const where = {
      userId: authResult.user.id,
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    }
    
    // Estadísticas generales
    const [totalStats, completedStats, pendingStats, refundedStats] = await Promise.all([
      prisma.payment.aggregate({
        where,
        _sum: { amount: true },
        _count: { id: true }
      }),
      prisma.payment.aggregate({
        where: { ...where, status: 'COMPLETED' },
        _sum: { amount: true },
        _count: { id: true }
      }),
      prisma.payment.aggregate({
        where: { ...where, status: 'PENDING' },
        _sum: { amount: true },
        _count: { id: true }
      }),
      prisma.payment.aggregate({
        where: { ...where, status: 'REFUNDED' },
        _sum: { amount: true },
        _count: { id: true }
      })
    ])
    
    // Estadísticas por método de pago
    const paymentMethodStats = await prisma.payment.groupBy({
      by: ['paymentMethod'],
      where: { ...where, status: 'COMPLETED' },
      _sum: { amount: true },
      _count: { id: true }
    })
    
    // Ingresos por día (últimos 30 días)
    const dailyStats = await prisma.$queryRaw`
      SELECT 
        DATE(created_at) as date,
        SUM(amount) as total_amount,
        COUNT(*) as total_payments
      FROM payments
      WHERE user_id = ${authResult.user.id}
        AND status = 'COMPLETED'
        AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `
    
    return NextResponse.json({
      period,
      summary: {
        total: {
          amount: totalStats._sum.amount || 0,
          count: totalStats._count || 0
        },
        completed: {
          amount: completedStats._sum.amount || 0,
          count: completedStats._count || 0
        },
        pending: {
          amount: pendingStats._sum.amount || 0,
          count: pendingStats._count || 0
        },
        refunded: {
          amount: refundedStats._sum.amount || 0,
          count: refundedStats._count || 0
        }
      },
      byPaymentMethod: paymentMethodStats,
      dailyStats
    })
    
  } catch (error) {
    console.error('Get payment stats error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}