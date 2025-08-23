import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'
import { serviceSchema } from '@/lib/validations'

// GET - Obtener todos los servicios
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'
    
    const services = await prisma.service.findMany({
      where: {
        userId: authResult.user.id,
        ...(activeOnly && { isActive: true })
      },
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { appointments: true }
        }
      }
    })
    
    return NextResponse.json(services)
    
  } catch (error) {
    console.error('Get services error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear servicio
export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const body = await request.json()
    const validatedData = serviceSchema.parse(body)
    
    // Verificar si ya existe un servicio con ese nombre
    const existingService = await prisma.service.findFirst({
      where: {
        userId: authResult.user.id,
        name: validatedData.name,
        isActive: true
      }
    })
    
    if (existingService) {
      return NextResponse.json(
        { error: 'Ya existe un servicio con ese nombre' },
        { status: 400 }
      )
    }
    
    const service = await prisma.service.create({
      data: {
        ...validatedData,
        userId: authResult.user.id
      },
      include: {
        _count: {
          select: { appointments: true }
        }
      }
    })
    
    return NextResponse.json(service, { status: 201 })
    
  } catch (error: any) {
    console.error('Create service error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
