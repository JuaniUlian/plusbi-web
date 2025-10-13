import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';
import fs from 'fs';
import path from 'path';

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

    // Crear prompt para Gemini
    const prompt = `Eres un analista político electoral experto en Argentina. Genera un informe breve y conciso (máximo 400 palabras) sobre la situación electoral en ${contexto}.

**Datos de encuestas disponibles:**

Promedios de intención de voto (últimas encuestas por encuestadora):
- LLA (La Libertad Avanza): ${promedioLLA.toFixed(1)}%
- FP (Frente Patria): ${promedioFP.toFixed(1)}%
- PU (Partido Unido): ${promedioPU.toFixed(1)}%
- UCR (Unión Cívica Radical): ${promedioUCR.toFixed(1)}%
- PRO: ${promedioPRO.toFixed(1)}%

Últimas 5 encuestas:
${ultimasEncuestas.map((e, i) => `${i + 1}. ${e.pollster} (${new Date(e.date).toLocaleDateString('es-AR')}): LLA ${e.LLA}%, FP ${e.FP}%, PU ${e.PU}%`).join('\n')}

**Contexto político actual:**
${type === 'provincial' && province ?
  situacionContent.split(province)[1]?.substring(0, 2000) || 'No hay información específica disponible para esta provincia.' :
  situacionContent.substring(0, 3000)
}

**Tu análisis debe incluir:**

1. **Tendencia electoral actual**: ¿Quién lidera? ¿Hay tendencias claras de crecimiento o caída?

2. **Impacto de eventos políticos**: Basándote en el contexto político proporcionado, estima cuántos puntos porcentuales (+/-) podrían ganar o perder los principales partidos debido a:
   - Escándalos de corrupción
   - Gestión económica
   - Conflictos políticos
   - Decisiones gubernamentales controversiales

3. **Factores clave**: ¿Qué eventos o situaciones específicas del contexto político podrían ser determinantes para el resultado electoral?

4. **Proyección**: Una breve conclusión sobre el escenario electoral más probable.

Sé objetivo, basado en datos, y mantén un tono profesional y analítico. Usa formato markdown para mejor legibilidad.`;

    // Generar respuesta con Gemini
    const { text } = await ai.generate({
      prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

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
