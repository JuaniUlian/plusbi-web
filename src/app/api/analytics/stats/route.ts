import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    // Solo administradores pueden ver estadísticas
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7d' // 1d, 7d, 30d, all

    // Calcular fecha de inicio según el período
    let startDate = new Date()
    if (period === '1d') {
      startDate.setDate(startDate.getDate() - 1)
    } else if (period === '7d') {
      startDate.setDate(startDate.getDate() - 7)
    } else if (period === '30d') {
      startDate.setDate(startDate.getDate() - 30)
    } else {
      startDate = new Date(0) // Desde el principio
    }

    // Total de usuarios
    const totalUsers = await prisma.user.count()

    // Usuarios premium vs guest
    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: true,
    })

    // Eventos por tipo en el período
    const eventsByType = await prisma.analyticsEvent.groupBy({
      by: ['eventType'],
      _count: true,
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    // Usuarios activos en el período
    const activeUsers = await prisma.analyticsEvent.groupBy({
      by: ['userId'],
      where: {
        createdAt: {
          gte: startDate
        },
        userId: {
          not: null
        }
      },
      _count: true,
    })

    // Top usuarios por actividad
    const topUsers = await prisma.analyticsEvent.groupBy({
      by: ['userEmail', 'userRole'],
      where: {
        createdAt: {
          gte: startDate
        },
        userEmail: {
          not: null
        }
      },
      _count: true,
      orderBy: {
        _count: {
          userEmail: 'desc'
        }
      },
      take: 10,
    })

    // Logins exitosos vs fallidos
    const loginStats = await prisma.analyticsEvent.groupBy({
      by: ['eventType'],
      where: {
        eventType: {
          in: ['LOGIN_SUCCESS', 'LOGIN_FAILED']
        },
        createdAt: {
          gte: startDate
        }
      },
      _count: true,
    })

    // Reportes generados
    const reportsGenerated = await prisma.generatedReport.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    // Reportes por tipo
    const reportsByType = await prisma.generatedReport.groupBy({
      by: ['reportType'],
      _count: true,
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    // Eventos más populares
    const topEvents = await prisma.analyticsEvent.groupBy({
      by: ['eventName'],
      _count: true,
      where: {
        createdAt: {
          gte: startDate
        }
      },
      orderBy: {
        _count: {
          eventName: 'desc'
        }
      },
      take: 10,
    })

    // Usuarios registrados en el período
    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    return NextResponse.json({
      success: true,
      period,
      stats: {
        totalUsers,
        newUsers,
        usersByRole,
        activeUsersCount: activeUsers.length,
        eventsByType,
        loginStats,
        reportsGenerated,
        reportsByType,
        topUsers,
        topEvents,
      }
    })
  } catch (error) {
    console.error('Error al obtener estadísticas:', error)
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    )
  }
}
