import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Lazy initialization to avoid build-time errors
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OpenAI API Key");
  }
  return new OpenAI({
    apiKey,
  });
}

interface EncuestaData {
  date: string;
  pollster: string;
  scope: string;
  province: string | null;
  chamber: string;
  LLA: number | null;
  FP: number | null;
  PU: number | null;
  UCR: number | null;
  PRO: number | null;
  FIT: number | null;
  Provincial: number | null;
  Others: number | null;
  sample?: number | null;
  methodology?: string | null;
  margin_error?: number | null;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: 'OPENAI_API_KEY no está configurada en el entorno',
          success: false
        },
        { status: 500 }
      );
    }
    // ... el resto de tu lógica igual ...
    const { type, province, encuestasData } = await request.json();

    // Leer el informe de situación
    const situacionPath = path.join(process.cwd(), 'public', 'data', 'Informe Situación.txt');
    const situacionContent = fs.readFileSync(situacionPath, 'utf-8');

    // Filtrar datos relevantes
    let datosRelevantes: EncuestaData[] = [];
    let contexto = '';

    if (type === 'national') {
      datosRelevantes = encuestasData.filter((e: EncuestaData) => e.scope === 'national');
      contexto = 'nivel nacional';
    } else if (type === 'provincial' && province) {
      datosRelevantes = encuestasData.filter((e: EncuestaData) => e.province === province);
      const provinceSections = situacionContent.split('\n\n');
      const provinceSection = provinceSections.find(section =>
        section.toLowerCase().includes(province.toLowerCase())
      );
      contexto = `provincia de ${province}`;
    }

    // ... el resto igual ...

    // Generar respuesta con OpenAI
    const openai = getOpenAIClient();
    const prompt = `Eres un analista político electoral experto en Argentina. Genera un informe profesional, completo y bien redactado sobre la situación electoral en ${contexto}...`;
    const completion = await openai.chat.completions.create({
      model: 'o1-mini',
      messages: [
        {
          role: 'user',
          content: `Eres un analista político electoral experto en Argentina, especializado en análisis de encuestas y tendencias electorales. Tu estilo es profesional, objetivo y basado en datos.\n\n${prompt}`
        }
      ],
      max_completion_tokens: 10000,
    });

    const text = completion.choices[0].message.content || '';
    return NextResponse.json({
      report: text,
      success: true
    });

  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Error al generar el reporte',
        details: error?.message || 'Unknown error',
        success: false
      },
      { status: 500 }
    );
  }
}