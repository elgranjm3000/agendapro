import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session')?.value
    
    if (sessionToken) {
      // Eliminar sesión de la base de datos
      await prisma.session.delete({
        where: { id: sessionToken }
      }).catch(() => {}) // Ignorar errores si la sesión no existe
    }
    
    const response = NextResponse.json({ message: 'Sesión cerrada' })
    response.cookies.delete('session')
    
    return response
    
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}