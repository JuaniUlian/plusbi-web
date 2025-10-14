import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
}

export async function POST(request: NextRequest) {
  try {
    const { type, province, encuestasData } = await request.json();

    // Leer el informe de situación
    const situacionPath = path.join(process.cwd(), 'public', 'data', 'Informe Situación.txt');
    const situacionContent = fs.readFileSync(situacionPath, 'utf-8');

    // Filtrar datos relevantes
    let datosRelevantes: EncuestaData[] = [];
    let contexto = '';

    if (type === 'national') {
      // Datos nacionales
      datosRelevantes = encuestasData.filter((e: EncuestaData) => e.scope === 'national');
      contexto = 'nivel nacional';
    } else if (type === 'provincial' && province) {
      // Datos provinciales
      datosRelevantes = encuestasData.filter((e: EncuestaData) => e.province === province);

      // Extraer información específica de la provincia del informe
      const provinceSections = situacionContent.split('\n\n');
      const provinceSection = provinceSections.find(section =>
        section.toLowerCase().includes(province.toLowerCase())
      );

      if (provinceSection) {
        contexto = `provincia de ${province}`;
      } else {
        contexto = `provincia de ${province}`;
      }
    }

    // Calcular promedios de últimas encuestas por encuestadora
    const calcularPromedios = (campo: keyof EncuestaData) => {
      const ultimasEncuestas: { [key: string]: EncuestaData } = {};

      datosRelevantes.forEach(encuesta => {
        const valor = encuesta[campo];
        if (valor !== null && typeof valor === 'number') {
          if (!ultimasEncuestas[encuesta.pollster] ||
              new Date(encuesta.date) > new Date(ultimasEncuestas[encuesta.pollster].date)) {
            ultimasEncuestas[encuesta.pollster] = encuesta;
          }
        }
      });

      const valores = Object.values(ultimasEncuestas)
        .map(d => d[campo])
        .filter(v => v !== null && typeof v === 'number') as number[];

      return valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
    };

    const promedioLLA = calcularPromedios('LLA');
    const promedioFP = calcularPromedios('FP');
    const promedioPU = calcularPromedios('PU');
    const promedioUCR = calcularPromedios('UCR');
    const promedioPRO = calcularPromedios('PRO');

    // Obtener últimas 5 encuestas ordenadas
    const ultimasEncuestas = datosRelevantes
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    // Contar encuestas y encuestadoras
    const encuestadorasUnicas = Array.from(new Set(datosRelevantes.map(e => e.pollster)));
    const totalEncuestas = datosRelevantes.length;
    const totalMuestra = datosRelevantes.reduce((sum, e) => sum + (e.sample || 0), 0);

    // Extraer contexto específico de la provincia si aplica
    let contextoEspecifico = '';
    if (type === 'provincial' && province) {
      const regex = new RegExp(`${province}[\\s\\S]*?(?=\\n\\n[A-Z]|$)`, 'i');
      const match = situacionContent.match(regex);
      contextoEspecifico = match ? match[0] : '';
    } else {
      contextoEspecifico = situacionContent;
    }

    // Crear prompt para OpenAI
    const prompt = `Eres un analista político electoral experto en Argentina. Genera un informe profesional, completo y bien redactado sobre la situación electoral en ${contexto}.

**DATOS DE ENCUESTAS DISPONIBLES:**

Total de encuestas analizadas: ${totalEncuestas}
Encuestadoras que midieron este territorio: ${encuestadorasUnicas.length} (${encuestadorasUnicas.join(', ')})
Muestra total acumulada: ${totalMuestra.toLocaleString('es-AR')} personas

Promedios de intención de voto (últimas encuestas por encuestadora):
- LLA (La Libertad Avanza): ${promedioLLA.toFixed(1)}%
- FP (Frente Patria): ${promedioFP.toFixed(1)}%
- PU (Provincias Unidas): ${promedioPU.toFixed(1)}%
- UCR (Unión Cívica Radical): ${promedioUCR.toFixed(1)}%
- PRO: ${promedioPRO.toFixed(1)}%

Últimas 5 encuestas en orden cronológico:
${ultimasEncuestas.map((e, i) => `${i + 1}. ${e.pollster} (${new Date(e.date).toLocaleDateString('es-AR')}) - Muestra: ${e.sample || 'N/D'} | LLA: ${e.LLA}%, FP: ${e.FP}%, PU: ${e.PU}%, UCR: ${e.UCR}%, PRO: ${e.PRO}%`).join('\n')}

**CONTEXTO POLÍTICO Y SITUACIÓN ACTUAL:**

${contextoEspecifico || 'No hay información contextual específica disponible para este territorio.'}

---

**ESTRUCTURA DEL INFORME:**

Genera un informe profesional estructurado en las siguientes secciones (usa formato markdown con títulos ##):

## 1. Resumen Ejecutivo
Síntesis de 2-3 párrafos sobre la situación electoral actual.

## 2. Análisis de las Encuestas
- Menciona explícitamente cuántas encuestas se analizaron (${totalEncuestas}) y qué encuestadoras midieron (${encuestadorasUnicas.join(', ')})
- Analiza las tendencias y diferencias entre encuestadoras
- Identifica al favorito y la competencia

## 3. Contexto Político e Impacto en la Intención de Voto
Basándote en el contexto político proporcionado, analiza:
- Eventos recientes que impactan la elección (escándalos, crisis, logros)
- Estimación del impacto: ¿cuántos puntos (+/-) pueden ganar o perder los partidos por estos eventos?
- Factores determinantes para el resultado

## 4. Proyección y Escenarios Posibles
- Escenario base (más probable según datos)
- Escenarios alternativos
- Factores de incertidumbre

## 5. Conclusiones
Resumen profesional con recomendaciones estratégicas.

---

**INSTRUCCIONES:**
- Sé objetivo, analítico y profesional
- Usa datos concretos del informe de situación para fundamentar tus análisis
- Haz inferencias inteligentes sobre intenciones de voto basadas en eventos políticos
- Mantén un tono periodístico de calidad, como el de un analista político reconocido
- El informe debe ser completo pero conciso (600-800 palabras)`;

    // Generar respuesta con OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-latest',
      messages: [
        {
          role: 'system',
          content: 'Eres un analista político electoral experto en Argentina, especializado en análisis de encuestas y tendencias electorales. Tu estilo es profesional, objetivo y basado en datos.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const text = completion.choices[0].message.content || '';

    return NextResponse.json({
      report: text,
      success: true
    });

  } catch (error) {
    console.error('Error generando reporte:', error);
    return NextResponse.json(
      { error: 'Error al generar el reporte', success: false },
      { status: 500 }
    );
  }
}
