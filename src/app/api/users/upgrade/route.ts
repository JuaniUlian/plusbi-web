import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autenticado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { premiumUntil } = body

    // Actualizar usuario a premium
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        role: 'ADMIN',
        premiumSince: new Date(),
        premiumUntil: premiumUntil ? new Date(premiumUntil) : null,
        guestExpiresAt: null, // Limpiar expiración de guest
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        premiumSince: true,
        premiumUntil: true,
      }
    })

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error('Error al upgradar usuario:', error)
    return NextResponse.json(
      { error: 'Error al upgradar usuario' },
      { status: 500 }
    )
  }
}
