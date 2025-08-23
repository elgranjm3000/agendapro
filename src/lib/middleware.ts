import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from './auth'

export async function withAuth(request: NextRequest) {
  const token = request.cookies.get('session')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  
  const session = await validateSession(token)
  
  if (!session) {
    return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 })
  }
  
  return { user: session.user }
}