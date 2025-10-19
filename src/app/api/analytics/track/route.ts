import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { EventType, UserRole } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const body = await request.json()
    const { eventType, eventName, metadata } = body

    // Validar eventType
    if (!eventType || !Object.values(EventType).includes(eventType)) {
      return NextResponse.json(
        { error: 'Tipo de evento inválido' },
        { status: 400 }
      )
    }

    // Obtener información de la request
    const ipAddress = request.headers.get('x-forwarded-for') ||
                      request.headers.get('x-real-ip') ||
                      'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Crear evento
    const event = await prisma.analyticsEvent.create({
      data: {
        eventType,
        eventName: eventName || eventType,
        userId: session?.user?.id || null,
        userEmail: session?.user?.email || null,
        userRole: session?.user?.role as UserRole || null,
        metadata: metadata || {},
        sessionId: session?.user?.id || null,
        ipAddress,
        userAgent,
      }
    })

    return NextResponse.json({
      success: true,
      eventId: event.id,
    })
  } catch (error) {
    console.error('Error al registrar evento:', error)
    return NextResponse.json(
      { error: 'Error al registrar evento' },
      { status: 500 }
    )
  }
}
