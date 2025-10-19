import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { SurveyScope, Chamber } from '@prisma/client';
import * as XLSX from 'xlsx';

// POST - Carga masiva de encuestas (solo SUPERADMIN)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // Solo SUPERADMIN puede cargar encuestas
    if (!session?.user || session.user.role !== 'SUPERADMIN') {
      return NextResponse.json(
        { error: 'No autorizado. Solo SUPERADMIN puede cargar encuestas.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { type, data } = body; // type: 'text' | 'xlsx' | 'json'

    let surveys: any[] = [];

    if (type === 'text') {
      // Parsear texto plano
      surveys = parseTextData(data);
    } else if (type === 'xlsx') {
      // Parsear datos de Excel
      surveys = parseExcelData(data);
    } else if (type === 'json') {
      // Datos ya en formato JSON
      surveys = data;
    } else {
      return NextResponse.json(
        { error: 'Tipo de datos no soportado. Use: text, xlsx, o json' },
        { status: 400 }
      );
    }

    // Validar y crear encuestas
    const created = [];
    const errors = [];

    for (const surveyData of surveys) {
      try {
        const survey = await prisma.survey.create({
          data: {
            date: new Date(surveyData.date),
            pollster: surveyData.pollster,
            scope: surveyData.scope.toUpperCase() as SurveyScope,
            province: surveyData.province || null,
            chamber: surveyData.chamber.toUpperCase() as Chamber,
            LLA: surveyData.LLA || null,
            FP: surveyData.FP || null,
            PU: surveyData.PU || null,
            UCR: surveyData.UCR || null,
            PRO: surveyData.PRO || null,
            FIT: surveyData.FIT || null,
            Provincial: surveyData.Provincial || null,
            Others: surveyData.Others || null,
            sample: surveyData.sample || null,
            methodology: surveyData.methodology || null,
            marginError: surveyData.marginError || null,
            createdBy: session.user.email,
          }
        });

        created.push(survey.id);
      } catch (error: any) {
        errors.push({
          data: surveyData,
          error: error.message
        });
      }
    }

    return NextResponse.json({
      success: true,
      created: created.length,
      errors: errors.length,
      details: {
        createdIds: created,
        errors: errors
      }
    });

  } catch (error: any) {
    console.error('Error en carga masiva:', error);
    return NextResponse.json(
      { error: 'Error al procesar carga masiva', details: error.message },
      { status: 500 }
    );
  }
}

// Parsear texto plano (formato: fecha|encuestadora|scope|provincia|camara|LLA|FP|PU|UCR|PRO|FIT|Provincial|Others|muestra|metodologia|margen)
function parseTextData(text: string): any[] {
  const lines = text.trim().split('\n');
  const surveys = [];

  for (const line of lines) {
    if (!line.trim() || line.startsWith('#')) continue; // Ignorar líneas vacías y comentarios

    const parts = line.split('|').map(p => p.trim());

    if (parts.length < 7) continue; // Mínimo: fecha, encuestadora, scope, provincia, camara, LLA, FP

    surveys.push({
      date: parts[0],
      pollster: parts[1],
      scope: parts[2] || 'national',
      province: parts[3] || null,
      chamber: parts[4] || 'diputados',
      LLA: parseFloat(parts[5]) || null,
      FP: parseFloat(parts[6]) || null,
      PU: parseFloat(parts[7]) || null,
      UCR: parseFloat(parts[8]) || null,
      PRO: parseFloat(parts[9]) || null,
      FIT: parseFloat(parts[10]) || null,
      Provincial: parseFloat(parts[11]) || null,
      Others: parseFloat(parts[12]) || null,
      sample: parseInt(parts[13]) || null,
      methodology: parts[14] || null,
      marginError: parseFloat(parts[15]) || null,
    });
  }

  return surveys;
}

// Parsear datos de Excel (base64)
function parseExcelData(base64Data: string): any[] {
  const buffer = Buffer.from(base64Data, 'base64');
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);

  return data.map((row: any) => ({
    date: row.fecha || row.date,
    pollster: row.encuestadora || row.pollster,
    scope: row.ambito || row.scope || 'national',
    province: row.provincia || row.province || null,
    chamber: row.camara || row.chamber || 'diputados',
    LLA: parseFloat(row.LLA) || null,
    FP: parseFloat(row.FP) || null,
    PU: parseFloat(row.PU) || null,
    UCR: parseFloat(row.UCR) || null,
    PRO: parseFloat(row.PRO) || null,
    FIT: parseFloat(row.FIT) || null,
    Provincial: parseFloat(row.Provincial) || null,
    Others: parseFloat(row.Others || row.Otros) || null,
    sample: parseInt(row.muestra || row.sample) || null,
    methodology: row.metodologia || row.methodology || null,
    marginError: parseFloat(row.margen_error || row.marginError) || null,
  }));
}
