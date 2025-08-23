import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
  const pathname = request.nextUrl.pathname

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/', '/login', '/register', '/api/auth/register', '/api/auth/login']
  
  // Rutas de API que requieren autenticación
  const protectedApiRoutes = ['/api/clients', '/api/services', '/api/appointments', '/api/payments', '/api/dashboard']
  
  // Si es una ruta de API protegida y no hay sesión
  if (protectedApiRoutes.some(route => pathname.startsWith(route)) && !session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  
  // Si es una página protegida y no hay sesión, redirigir al login
  if (!publicRoutes.includes(pathname) && !pathname.startsWith('/api') && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Si tiene sesión y está en login/register, redirigir al dashboard
  if (session && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}