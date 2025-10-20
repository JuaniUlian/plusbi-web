import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    // Solo SUPERADMIN pueden ver eventos detallados
    if (!session?.user || session.user.role !== 'SUPERADMIN') {
      return NextResponse.json(
        { error: 'No autorizado. Solo usuarios SUPERADMIN pueden acceder.' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7d' // 1d, 7d, 30d, all
    const userEmail = searchParams.get('user') || null
    const eventType = searchParams.get('eventType') || null
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

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

    // Construir filtros
    const where: any = {
      createdAt: {
        gte: startDate
      }
    }

    if (userEmail) {
      where.userEmail = userEmail
    }

    if (eventType) {
      where.eventType = eventType
    }

    // Obtener eventos paginados
    const [events, totalCount] = await Promise.all([
      prisma.analyticsEvent.findMany({
        where,
        orderBy: {
          createdAt: 'desc'
        },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          eventType: true,
          eventName: true,
          userEmail: true,
          userRole: true,
          metadata: true,
          createdAt: true,
        }
      }),
      prisma.analyticsEvent.count({ where })
    ])

    return NextResponse.json({
      success: true,
      events,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    })
  } catch (error) {
    console.error('Error al obtener eventos:', error)
    return NextResponse.json(
      { error: 'Error al obtener eventos' },
      { status: 500 }
    )
  }
}
