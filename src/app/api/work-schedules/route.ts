import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// GET - Obtener horarios de trabajo
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const schedules = await prisma.workSchedule.findMany({
      where: { userId: authResult.user.id },
      orderBy: { dayOfWeek: 'asc' }
    })
    
    // Crear un array con todos los días de la semana
    const daysOfWeek = [
      { dayOfWeek: 0, name: 'Domingo', isActive: false, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 1, name: 'Lunes', isActive: false, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 2, name: 'Martes', isActive: false, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 3, name: 'Miércoles', isActive: false, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 4, name: 'Jueves', isActive: false, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 5, name: 'Viernes', isActive: false, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 6, name: 'Sábado', isActive: false, startTime: '09:00', endTime: '17:00' }
    ]
    
    // Actualizar con los horarios existentes
    schedules.forEach(schedule => {
      const dayIndex = schedule.dayOfWeek
      if (daysOfWeek[dayIndex]) {
        daysOfWeek[dayIndex] = {
          ...daysOfWeek[dayIndex],
          id: schedule.id,
          isActive: schedule.isActive,
          startTime: schedule.startTime.toTimeString().slice(0, 5),
          endTime: schedule.endTime.toTimeString().slice(0, 5)
        }
      }
    })
    
    return NextResponse.json(daysOfWeek)
    
  } catch (error) {
    console.error('Get work schedules error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar horarios de trabajo
export async function PUT(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const body = await request.json()
    const { schedules } = body
    
    if (!Array.isArray(schedules)) {
      return NextResponse.json(
        { error: 'schedules debe ser un array' },
        { status: 400 }
      )
    }
    
    // Procesar cada horario
    for (const schedule of schedules) {
      const { dayOfWeek, isActive, startTime, endTime } = schedule
      
      if (isActive) {
        // Crear o actualizar horario
        await prisma.workSchedule.upsert({
          where: {
            userId_dayOfWeek: {
              userId: authResult.user.id,
              dayOfWeek: dayOfWeek
            }
          },
          update: {
            startTime: new Date(`2000-01-01T${startTime}:00`),
            endTime: new Date(`2000-01-01T${endTime}:00`),
            isActive: true
          },
          create: {
            userId: authResult.user.id,
            dayOfWeek: dayOfWeek,
            startTime: new Date(`2000-01-01T${startTime}:00`),
            endTime: new Date(`2000-01-01T${endTime}:00`),
            isActive: true
          }
        })
      } else {
        // Desactivar horario existente
        await prisma.workSchedule.updateMany({
          where: {
            userId: authResult.user.id,
            dayOfWeek: dayOfWeek
          },
          data: { isActive: false }
        })
      }
    }
    
    return NextResponse.json({ message: 'Horarios actualizados correctamente' })
    
  } catch (error: any) {
    console.error('Update work schedules error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
