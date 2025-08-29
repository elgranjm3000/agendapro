import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/middleware'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export async function GET(request: NextRequest) {
  try {
    const authResult = await withAuth(request)
    
    if (authResult instanceof NextResponse) {
      return authResult // Error de autenticación
    }
    
    return NextResponse.json({
      user: {
        id: authResult.user.id,
        name: authResult.user.name,
        email: authResult.user.email,
        businessName: authResult.user.businessName,
        businessAddress: authResult.user.businessAddress,
        businessPhone: authResult.user.businessPhone,
        subscriptionPlan: authResult.user.subscriptionPlan
      }
    })
    
  } catch (error) {
    console.error('Me error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}