// app/api/clients/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'
import { clientSchema } from '@/lib/validations'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// GET - Obtener todos los clientes
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit
    
    const where = {
      userId: authResult.user.id,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
          { phone: { contains: search, mode: 'insensitive' as const } }
        ]
      })
    }
    
    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { appointments: true }
          }
        }
      }),
      prisma.client.count({ where })
    ])
    
    return NextResponse.json({
      clients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
    
  } catch (error) {
    console.error('Get clients error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear cliente
export async function POST(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const body = await request.json()
    const validatedData = clientSchema.parse(body)
    
    // Verificar si ya existe un cliente con ese email o teléfono
    if (validatedData.email || validatedData.phone) {
      const existingClient = await prisma.client.findFirst({
        where: {
          userId: authResult.user.id,
          OR: [
            ...(validatedData.email ? [{ email: validatedData.email }] : []),
            ...(validatedData.phone ? [{ phone: validatedData.phone }] : [])
          ]
        }
      })
      
      if (existingClient) {
        return NextResponse.json(
          { error: 'Ya existe un cliente con ese email o teléfono' },
          { status: 400 }
        )
      }
    }
    
    const client = await prisma.client.create({
      data: {
        ...validatedData,
        userId: authResult.user.id,
        dateOfBirth: validatedData.dateOfBirth ? new Date(validatedData.dateOfBirth) : null
      },
      include: {
        _count: {
          select: { appointments: true }
        }
      }
    })
    
    return NextResponse.json(client, { status: 201 })
    
  } catch (error: any) {
    console.error('Create client error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

