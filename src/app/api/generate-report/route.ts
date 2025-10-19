import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { ReportType } from '@prisma/client';

// Lazy initialization to avoid build-time errors
function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
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
  const startTime = Date.now();

  try {
    // Verificar autenticación
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'No autenticado', success: false },
        { status: 401 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          error: 'OPENAI_API_KEY no está configurada en el entorno',
          success: false
        },
        { status: 500 }
      );
    }

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
      contexto = `provincia de ${province}`;
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

    // Detectar si es agostog para usar prompt personalizado
    const isAgostog = session.user.email === 'agostog@quest.ar';

    // Crear prompt para OpenAI
    let prompt = '';

    if (isAgostog) {
      // Prompt especializado para análisis político estratégico
      prompt = `Eres Quest, el analista político estratégico de PLUS BI. Genera un informe de análisis político de alto nivel para Agostina sobre la situación electoral en ${contexto}.

**DATOS DE ENCUESTAS DISPONIBLES:**

Total de encuestas analizadas: ${totalEncuestas}
Encuestadoras: ${encuestadorasUnicas.join(', ')}
Muestra total: ${totalMuestra.toLocaleString('es-AR')} personas

Promedios de intención de voto:
- LLA: ${promedioLLA.toFixed(1)}% | FP: ${promedioFP.toFixed(1)}% | PU: ${promedioPU.toFixed(1)}% | UCR: ${promedioUCR.toFixed(1)}% | PRO: ${promedioPRO.toFixed(1)}%

**CONTEXTO POLÍTICO:**

${contextoEspecifico || 'Información contextual limitada para este territorio.'}

---

**ESTRUCTURA OBLIGATORIA DEL INFORME:**

## 1. Introducción y Contexto Político
**OBLIGATORIO:** Incluir los datos de las encuestas (LLA: ${promedioLLA.toFixed(1)}%, FP: ${promedioFP.toFixed(1)}%, PU: ${promedioPU.toFixed(1)}%) en el primer párrafo. Identificar el escenario político dominante con evidencia concreta del contexto proporcionado.

## 2. Balance de Gobernabilidad
**OBLIGATORIO:** Usar datos específicos del contexto para evaluar:
- Fortalezas del oficialismo: [Citar ejemplos CONCRETOS de logros legislativos o aprobación]
- Debilidades: [Identificar FRACASOS específicos mencionados en contexto]
- Relación con Congreso: [Cuantificar: X leyes aprobadas, Y vetos, nivel de conflicto: Bajo/Medio/Alto]

## 3. Economía y Efecto Social
**OBLIGATORIO:** Relacionar datos económicos del contexto con la intención de voto:
- Correlación específica: "Inflación del X% explica caída/subida de Y puntos en intención de voto"
- Proyectar impacto numérico: "Si continúa recesión, LLA podría perder/ganar Z puntos"

## 4. Relación con Actores Clave
**OBLIGATORIO:** Identificar actores ESPECÍFICOS (nombres reales de gobernadores, sindicatos, empresas mencionados en contexto):
- NO escribir "gobernadores provinciales" → SÍ escribir "Gobernador X de provincia Y"
- Evaluar tensión con cada actor: Escala 1-10 + justificación

## 5. Discurso y Narrativa
**OBLIGATORIO:** Citar temas ESPECÍFICOS que mueve cada fuerza:
- NO: "mensajes dominantes" → SÍ: "LLA enfoca en motosierra fiscal, FP ataca ajuste sobre jubilados"
- Efectividad medida en impacto electoral: "Narrativa X explica Y% de diferencia en segmento Z"

## 6. Riesgos y Oportunidades
**OBLIGATORIO:** Cuantificar probabilidades:
- Riesgo X: Probabilidad estimada Y%, impacto en voto: Z puntos
- Oportunidad X: Si se concreta, cambio proyectado: +/- Z% para espacio Y

## 7. Escenarios Probables + Implicancias Estratégicas
**OBLIGATORIO:** Proyecciones NUMÉRICAS para cada escenario:
- **Escenario Base (60% probabilidad):** LLA: X%, FP: Y%, PU: Z% [fundamentar en datos + contexto]
- **Escenario Optimista (25% prob.):** LLA: X%, FP: Y% [explicar qué eventos dispararían esto]
- **Escenario Pesimista (15% prob.):** LLA: X%, FP: Y% [explicar bajo qué condiciones]
- **Implicancias CONCRETAS:** No generalidades. Ej: "Si LLA <30%, pierde gobernabilidad"

## 8. Indicadores Clave a Monitorear

**OBLIGATORIO: Cada indicador DEBE incluir un valor numérico concreto basado en la evidencia disponible.**

- **Imagen presidencial y aprobación:** [Estimar % de aprobación basado en tendencia de LLA]
- **Conflicto con el Congreso:** [Evaluar nivel: Bajo/Medio/Alto + justificación específica]
- **Nivel de riesgo político:** [OBLIGATORIO: Escala 1-10 con fundamentación concreta en datos]
- **Inflación mensual estimada:** [Proyectar % basado en contexto económico mencionado]
- **Actividad económica:** [Tendencia: Expansión/Estancamiento/Recesión + % estimado]
- **Tensión territorial:** [Escala 1-10 de conflicto con gobernadores + razones]
- **Agenda pública dominante:** [Top 3 temas específicos que impactan voto]
- **Factor de inestabilidad principal:** [Identificar EL riesgo más crítico con probabilidad estimada]

---

**INSTRUCCIONES ESTRICTAS - NO GENERAR DESCRIPCIONES GENÉRICAS:**

❌ **PROHIBIDO:** Listas de definiciones genéricas sin datos
❌ **PROHIBIDO:** Frases como "es importante monitorear", "determinará el futuro"
❌ **PROHIBIDO:** Descripciones teóricas sin números ni evidencia concreta

✅ **OBLIGATORIO:** Cada métrica DEBE tener un valor numérico o categoría específica
✅ **OBLIGATORIO:** Fundamentar TODAS las estimaciones en los datos de encuestas + contexto
✅ **OBLIGATORIO:** Si no hay datos suficientes, decir explícitamente "Datos insuficientes" y estimar basándose en el contexto nacional
✅ **OBLIGATORIO:** Análisis de correlaciones políticas-económicas con evidencia
✅ **OBLIGATORIO:** Tono ejecutivo, directo, orientado a decisiones estratégicas

**Ejemplo de lo que SÍ queremos:**
"Nivel de riesgo político: 7/10. Fundamentación: LLA mantiene ${promedioLLA.toFixed(1)}% en provincia clave, pero tensión con gobernador genera incertidumbre. Riesgo de movilizaciones sindicales estimado en 60% próximos 30 días."

**Ejemplo de lo que NO queremos:**
"Nivel de riesgo político: Escala de 1 a 10 para evaluar la estabilidad institucional." ← ESTO ES INACEPTABLE

Extensión: 1200-1500 palabras con alta densidad de información`;

    } else {
      // Prompt estándar para análisis electoral
      prompt = `Eres Quest, el analista electoral de PLUS BI. Genera un informe profesional redactado especialmente para el usuario, utilizando datos e información curada por el equipo de PLUS BI sobre la situación electoral en ${contexto}.

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
    }

    // Generar respuesta con OpenAI
    console.log('🤖 API: Generando informe con Quest...');
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: isAgostog
            ? 'Eres Quest, el analista político estratégico de PLUS BI. Generas informes de alto nivel enfocados en riesgos, oportunidades e implicancias estratégicas. Tu estilo es ejecutivo, analítico y orientado a la toma de decisiones políticas.'
            : 'Eres Quest, el analista electoral de PLUS BI. Redactas informes profesionales personalizados basados en datos curados por el equipo de PLUS BI. Tu estilo es profesional, objetivo y basado en datos.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: isAgostog ? 5000 : 4000,
    });
    console.log('✅ API: Informe generado por Quest');

    const text = completion.choices[0].message.content || '';
    console.log('✅ API: Informe generado, length:', text.length);

    // Calcular tokens usados y tiempo de generación
    const tokensUsed = completion.usage?.total_tokens || 0;
    const generationTime = Date.now() - startTime;

    // Guardar reporte en la base de datos
    try {
      await prisma.generatedReport.create({
        data: {
          userId: session.user.id,
          userEmail: session.user.email || '',
          reportType: type === 'national' ? ReportType.NATIONAL : ReportType.PROVINCIAL,
          province: type === 'provincial' ? province : null,
          content: text,
          tokensUsed,
          generationTime,
        }
      });
      console.log('✅ API: Reporte guardado en base de datos');
    } catch (dbError) {
      console.error('❌ Error al guardar reporte en DB:', dbError);
      // No fallar el request si falla el guardado
    }

    // Registrar evento de analytics
    try {
      await prisma.analyticsEvent.create({
        data: {
          eventType: 'REPORT_GENERATED',
          eventName: `report_${type}`,
          userId: session.user.id,
          userEmail: session.user.email,
          userRole: session.user.role,
          metadata: {
            reportType: type,
            province: province || null,
            tokensUsed,
            generationTime,
          },
        }
      });
    } catch (analyticsError) {
      console.error('❌ Error al registrar analytics:', analyticsError);
      // No fallar el request si falla el analytics
    }

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