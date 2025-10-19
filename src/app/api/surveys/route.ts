import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SurveyScope, Chamber } from '@prisma/client'

// GET - Obtener encuestas con filtros
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const chamber = searchParams.get('chamber') as Chamber | null
    const pollster = searchParams.get('pollster')
    const scope = searchParams.get('scope') as SurveyScope | null
    const province = searchParams.get('province')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Construir filtros
    const where: any = {}

    if (chamber) where.chamber = chamber
    if (pollster) where.pollster = pollster
    if (scope) where.scope = scope
    if (province) where.province = province

    if (startDate || endDate) {
      where.date = {}
      if (startDate) where.date.gte = new Date(startDate)
      if (endDate) where.date.lte = new Date(endDate)
    }

    // Obtener encuestas
    const surveys = await prisma.survey.findMany({
      where,
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      surveys,
      count: surveys.length,
    })
  } catch (error) {
    console.error('Error al obtener encuestas:', error)
    return NextResponse.json(
      { error: 'Error al obtener encuestas' },
      { status: 500 }
    )
  }
}

// POST - Crear nueva encuesta (solo admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      date,
      pollster,
      scope,
      province,
      chamber,
      LLA,
      FP,
      PU,
      UCR,
      PRO,
      FIT,
      Provincial,
      Others,
      sample,
      methodology,
      marginError,
      createdBy,
    } = body

    // Validaciones básicas
    if (!date || !pollster || !scope || !chamber) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Crear encuesta
    const survey = await prisma.survey.create({
      data: {
        date: new Date(date),
        pollster,
        scope,
        province: scope === 'PROVINCIAL' ? province : null,
        chamber,
        LLA,
        FP,
        PU,
        UCR,
        PRO,
        FIT,
        Provincial,
        Others,
        sample,
        methodology,
        marginError,
        createdBy,
      }
    })

    return NextResponse.json({
      success: true,
      survey,
    })
  } catch (error) {
    console.error('Error al crear encuesta:', error)
    return NextResponse.json(
      { error: 'Error al crear encuesta' },
      { status: 500 }
    )
  }
}
