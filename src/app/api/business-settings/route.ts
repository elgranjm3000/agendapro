import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { withAuth } from '@/lib/middleware'

// GET - Obtener configuraciones del negocio
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const settings = await prisma.businessSetting.findMany({
      where: { userId: authResult.user.id }
    })
    
    // Convertir a objeto para facilitar el uso
    const settingsObject: Record<string, string> = {}
    settings.forEach(setting => {
      settingsObject[setting.settingKey] = setting.settingValue || ''
    })
    
    // Agregar configuraciones por defecto si no existen
    const defaultSettings = {
      whatsappEnabled: 'false',
      whatsappNumber: '',
      emailEnabled: 'false',
      emailTemplate: 'Hola {clientName}, te recordamos tu cita para {appointmentDate} a las {appointmentTime} para {serviceName}.',
      whatsappTemplate: 'Hola {clientName}! 👋\n\nTe recordamos tu cita:\n📅 {appointmentDate}\n🕐 {appointmentTime}\n💄 {serviceName}\n\n¡Te esperamos!',
      reminderHours: '24',
      confirmationEnabled: 'true',
      cancellationPolicy: 'Las cancelaciones deben realizarse con al menos 24 horas de anticipación.',
      currency: 'CLP',
      timeZone: 'America/Santiago'
    }
    
    const finalSettings = { ...defaultSettings, ...settingsObject }
    
    return NextResponse.json(finalSettings)
    
  } catch (error) {
    console.error('Get business settings error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar configuraciones del negocio
export async function PUT(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    if (authResult instanceof NextResponse) return authResult
    
    const body = await request.json()
    
    // Actualizar cada configuración
    for (const [key, value] of Object.entries(body)) {
      await prisma.businessSetting.upsert({
        where: {
          userId_settingKey: {
            userId: authResult.user.id,
            settingKey: key
          }
        },
        update: {
          settingValue: String(value)
        },
        create: {
          userId: authResult.user.id,
          settingKey: key,
          settingValue: String(value)
        }
      })
    }
    
    return NextResponse.json({ message: 'Configuraciones actualizadas correctamente' })
    
  } catch (error: any) {
    console.error('Update business settings error:', error)
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    )
  }
}