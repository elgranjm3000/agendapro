import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword, createSession } from '@/lib/auth'
import { registerSchema } from '@/lib/validations'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)
    
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email ya registrado' },
        { status: 400 }
      )
    }
    
    // Crear usuario
    const hashedPassword = await hashPassword(validatedData.password)
    
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        businessName: validatedData.businessName,
        phone: validatedData.phone
      }
    })
    
    // Crear servicios por defecto
    await prisma.service.createMany({
      data: [
        {
          userId: user.id,
          name: 'Consulta General',
          duration: 30,
          price: 25000,
          color: '#3B82F6'
        },
        {
          userId: user.id,
          name: 'Servicio Express',
          duration: 15,
          price: 15000,
          color: '#10B981'
        }
      ]
    })
    
    // Crear horarios por defecto (Lunes a Viernes 9-18, Sábado 9-14)
    await prisma.workSchedule.createMany({
      data: [
        { userId: user.id, dayOfWeek: 1, startTime: new Date('2000-01-01T09:00:00'), endTime: new Date('2000-01-01T18:00:00') },
        { userId: user.id, dayOfWeek: 2, startTime: new Date('2000-01-01T09:00:00'), endTime: new Date('2000-01-01T18:00:00') },
        { userId: user.id, dayOfWeek: 3, startTime: new Date('2000-01-01T09:00:00'), endTime: new Date('2000-01-01T18:00:00') },
        { userId: user.id, dayOfWeek: 4, startTime: new Date('2000-01-01T09:00:00'), endTime: new Date('2000-01-01T18:00:00') },
        { userId: user.id, dayOfWeek: 5, startTime: new Date('2000-01-01T09:00:00'), endTime: new Date('2000-01-01T18:00:00') },
        { userId: user.id, dayOfWeek: 6, startTime: new Date('2000-01-01T09:00:00'), endTime: new Date('2000-01-01T14:00:00') }
      ]
    })
    
    // Crear sesión
    const sessionToken = await createSession(user.id)
    
    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        businessName: user.businessName
      }
    })
    
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 días
    })
    
    return response
    
  } catch (error: any) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}