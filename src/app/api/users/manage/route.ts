import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import bcrypt from 'bcryptjs'

// GET: Obtener todos los usuarios
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    // Solo SUPERADMIN pueden gestionar usuarios
    if (!session?.user || session.user.role !== 'SUPERADMIN') {
      return NextResponse.json(
        { error: 'No autorizado. Solo usuarios SUPERADMIN pueden acceder.' },
        { status: 403 }
      )
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        guestExpiresAt: true,
        _count: {
          select: {
            generatedReports: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Obtener última actividad de cada usuario
    const usersWithActivity = await Promise.all(
      users.map(async (user) => {
        const lastActivity = await prisma.analyticsEvent.findFirst({
          where: { userEmail: user.email },
          orderBy: { createdAt: 'desc' },
          select: { createdAt: true }
        })

        return {
          ...user,
          lastActivity: lastActivity?.createdAt || null,
          reportsGenerated: user._count.generatedReports
        }
      })
    )

    return NextResponse.json({
      success: true,
      users: usersWithActivity
    })
  } catch (error) {
    console.error('Error al obtener usuarios:', error)
    return NextResponse.json(
      { error: 'Error al obtener usuarios' },
      { status: 500 }
    )
  }
}

// POST: Resetear contraseña de usuario
export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    // Solo SUPERADMIN pueden resetear contraseñas
    if (!session?.user || session.user.role !== 'SUPERADMIN') {
      return NextResponse.json(
        { error: 'No autorizado. Solo usuarios SUPERADMIN pueden acceder.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { userId, newPassword } = body

    if (!userId || !newPassword) {
      return NextResponse.json(
        { error: 'userId y newPassword son requeridos' },
        { status: 400 }
      )
    }

    // Validar longitud mínima de contraseña
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'La contraseña debe tener al menos 6 caracteres' },
        { status: 400 }
      )
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Actualizar contraseña
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })

    return NextResponse.json({
      success: true,
      message: `Contraseña actualizada para ${updatedUser.email}`,
      user: updatedUser
    })
  } catch (error) {
    console.error('Error al resetear contraseña:', error)
    return NextResponse.json(
      { error: 'Error al resetear contraseña' },
      { status: 500 }
    )
  }
}

// PATCH: Actualizar rol de usuario
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()

    // Solo SUPERADMIN pueden cambiar roles
    if (!session?.user || session.user.role !== 'SUPERADMIN') {
      return NextResponse.json(
        { error: 'No autorizado. Solo usuarios SUPERADMIN pueden acceder.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { userId, newRole } = body

    if (!userId || !newRole) {
      return NextResponse.json(
        { error: 'userId y newRole son requeridos' },
        { status: 400 }
      )
    }

    // Validar que el rol sea válido
    if (!['ADMIN', 'GUEST'].includes(newRole)) {
      return NextResponse.json(
        { error: 'El rol debe ser ADMIN o GUEST. No se puede asignar SUPERADMIN.' },
        { status: 400 }
      )
    }

    // Actualizar rol
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })

    return NextResponse.json({
      success: true,
      message: `Rol actualizado a ${newRole} para ${updatedUser.email}`,
      user: updatedUser
    })
  } catch (error) {
    console.error('Error al actualizar rol:', error)
    return NextResponse.json(
      { error: 'Error al actualizar rol' },
      { status: 500 }
    )
  }
}
