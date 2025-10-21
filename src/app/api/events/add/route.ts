import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import fs from 'fs/promises';
import path from 'path';

// POST - Agregar evento al archivo "Informe Situación.txt" (solo SUPERADMIN)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // Solo SUPERADMIN puede agregar eventos
    if (!session?.user || session.user.role !== 'SUPERADMIN') {
      return NextResponse.json(
        { error: 'No autorizado. Solo SUPERADMIN puede agregar eventos.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { province, date, eventText } = body;

    if (!province || !date || !eventText) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: province, date, eventText' },
        { status: 400 }
      );
    }

    // Validar formato de fecha
    const eventDate = new Date(date);
    if (isNaN(eventDate.getTime())) {
      return NextResponse.json(
        { error: 'Formato de fecha inválido' },
        { status: 400 }
      );
    }

    // Formatear fecha en español
    const formattedDate = eventDate.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long'
    });

    // Leer archivo actual
    const filePath = path.join(process.cwd(), 'public', 'data', 'Informe Situación.txt');
    let fileContent = await fs.readFile(filePath, 'utf-8');

    // Buscar la sección de la provincia
    const provinceHeader = province.toUpperCase();
    const provinceRegex = new RegExp(`(${provinceHeader}\\n)`, 'i');
    const match = fileContent.match(provinceRegex);

    if (!match) {
      return NextResponse.json(
        { error: `No se encontró la sección para ${province}` },
        { status: 404 }
      );
    }

    // Construir el nuevo evento
    const newEvent = `${formattedDate}: ${eventText.trim()}\n\n`;

    // Encontrar la posición después del header de la provincia
    const headerIndex = fileContent.indexOf(match[0]);
    const insertPosition = headerIndex + match[0].length;

    // Insertar el nuevo evento
    fileContent =
      fileContent.slice(0, insertPosition) +
      newEvent +
      fileContent.slice(insertPosition);

    // Guardar archivo actualizado
    await fs.writeFile(filePath, fileContent, 'utf-8');

    console.log(`✅ Evento agregado por ${session.user.email} a ${province} - ${formattedDate}`);

    return NextResponse.json({
      success: true,
      message: `Evento agregado a ${province}`,
      province,
      date: formattedDate
    });

  } catch (error: any) {
    console.error('Error al agregar evento:', error);
    return NextResponse.json(
      { error: 'Error al agregar evento', details: error.message },
      { status: 500 }
    );
  }
}
