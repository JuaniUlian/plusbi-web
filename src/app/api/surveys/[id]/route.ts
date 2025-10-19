import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET - Obtener una encuesta específica
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const survey = await prisma.survey.findUnique({
      where: { id }
    })

    if (!survey) {
      return NextResponse.json(
        { error: 'Encuesta no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      survey,
    })
  } catch (error) {
    console.error('Error al obtener encuesta:', error)
    return NextResponse.json(
      { error: 'Error al obtener encuesta' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar encuesta (solo admin)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const survey = await prisma.survey.update({
      where: { id },
      data: {
        ...body,
        date: body.date ? new Date(body.date) : undefined,
      }
    })

    return NextResponse.json({
      success: true,
      survey,
    })
  } catch (error) {
    console.error('Error al actualizar encuesta:', error)
    return NextResponse.json(
      { error: 'Error al actualizar encuesta' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar encuesta (solo admin)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.survey.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Encuesta eliminada correctamente',
    })
  } catch (error) {
    console.error('Error al eliminar encuesta:', error)
    return NextResponse.json(
      { error: 'Error al eliminar encuesta' },
      { status: 500 }
    )
  }
}
