// app/api/services/[id]/toggle/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// POST - Activar/Desactivar servicio
export async function POST(
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
    
    const service = await prisma.service.update({
      where: { id: serviceId },
      data: { isActive: !existingService.isActive },
      include: {
        _count: {
          select: { appointments: true }
        }
      }
    })
    
    return NextResponse.json({
      message: `Servicio ${service.isActive ? 'activado' : 'desactivado'}`,
      service
    })
    
  } catch (error) {
    console.error('Toggle service error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}