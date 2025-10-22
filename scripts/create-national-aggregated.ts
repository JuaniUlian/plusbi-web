/**
 * Script para crear encuesta nacional agregada para PLUS Quest
 * Pondera por el % del padrón de cada provincia
 */

import fs from 'fs';
import path from 'path';

interface Survey {
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
  sample: number | null;
  methodology: string | null;
  margin_error: number | null;
  [key: string]: any;
}

// Pesos por provincia según padrón electoral (% del padrón nacional)
// Ajustados para sumar exactamente 100%
const PESOS_PROVINCIALES: Record<string, number> = {
  'Buenos Aires': 38.38,
  'Córdoba': 8.59,
  'Santa Fe': 8.28,
  'Ciudad Autónoma de Buenos Aires': 6.57,
  'Mendoza': 4.34,
  'Tucumán': 3.54,
  'Entre Ríos': 3.13,
  'Salta': 3.03,
  'Chaco': 2.63,
  'Corrientes': 2.53,
  'Misiones': 2.73,
  'Santiago del Estero': 2.22,
  'San Juan': 1.72,
  'Jujuy': 1.72,
  'Río Negro': 1.62,
  'Formosa': 1.41,
  'Neuquén': 1.52,
  'Chubut': 1.31,
  'San Luis': 1.11,
  'Catamarca': 0.91,
  'La Rioja': 0.81,
  'La Pampa': 0.81,
  'Santa Cruz': 0.71,
  'Tierra del Fuego': 0.38  // Ajustado de 0.40 para sumar exacto 100%
};

function calcularNacionalPonderado(encuestas: Survey[], fecha: string): Survey | null {
  // Filtrar encuestas de PLUS Quest provinciales de la misma fecha (o cercanas)
  const encuestasProvinciales = encuestas.filter(e =>
    e.pollster === 'PLUS Quest' &&
    e.scope === 'provincial' &&
    e.province &&
    e.date === fecha
  );

  if (encuestasProvinciales.length === 0) return null;

  console.log(`📊 Calculando nacional para ${fecha}: ${encuestasProvinciales.length} provincias`);

  // Calcular ponderados
  let pesoTotal = 0;
  let sumaLLA = 0;
  let sumaFP = 0;
  let sumaPU = 0;
  let sumaUCR = 0;
  let sumaPRO = 0;
  let sumaFIT = 0;
  let sumaProvincial = 0;
  let sumaOthers = 0;

  for (const encuesta of encuestasProvinciales) {
    const peso = PESOS_PROVINCIALES[encuesta.province!] || 0;
    if (peso === 0) continue;

    pesoTotal += peso;
    sumaLLA += (encuesta.LLA || 0) * peso;
    sumaFP += (encuesta.FP || 0) * peso;
    sumaPU += (encuesta.PU || 0) * peso;
    sumaUCR += (encuesta.UCR || 0) * peso;
    sumaPRO += (encuesta.PRO || 0) * peso;
    sumaFIT += (encuesta.FIT || 0) * peso;
    sumaProvincial += (encuesta.Provincial || 0) * peso;
    sumaOthers += (encuesta.Others || 0) * peso;

    console.log(`  - ${encuesta.province}: peso ${peso}%, LLA ${encuesta.LLA}%`);
  }

  if (pesoTotal === 0) return null;

  // Normalizar por el peso total
  const nacional: Survey = {
    date: fecha,
    pollster: 'PLUS Quest',
    scope: 'national',
    province: null,
    chamber: 'diputados',
    LLA: parseFloat((sumaLLA / pesoTotal).toFixed(2)),
    FP: parseFloat((sumaFP / pesoTotal).toFixed(2)),
    PU: parseFloat((sumaPU / pesoTotal).toFixed(2)),
    UCR: parseFloat((sumaUCR / pesoTotal).toFixed(2)),
    PRO: parseFloat((sumaPRO / pesoTotal).toFixed(2)),
    FIT: parseFloat((sumaFIT / pesoTotal).toFixed(2)),
    Provincial: parseFloat((sumaProvincial / pesoTotal).toFixed(2)),
    Others: parseFloat((sumaOthers / pesoTotal).toFixed(2)),
    sample: null,
    methodology: 'Agregación ponderada por padrón',
    margin_error: null
  };

  console.log(`✅ Nacional calculado: LLA ${nacional.LLA}%, FP ${nacional.FP}%, PU ${nacional.PU}%`);

  return nacional;
}

async function main() {
  console.log('🇦🇷 Creando encuestas nacionales agregadas para PLUS Quest\n');

  const jsonPath = path.join(process.cwd(), 'public', 'data', 'encuestas_argentina_2025.json');
  const surveys: Survey[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  // Encontrar fechas únicas de PLUS Quest
  const fechasUnicas = [...new Set(
    surveys
      .filter(s => s.pollster === 'PLUS Quest' && s.scope === 'provincial')
      .map(s => s.date)
  )].sort();

  console.log(`📅 Fechas encontradas: ${fechasUnicas.join(', ')}\n`);

  const nacionalesNuevas: Survey[] = [];

  for (const fecha of fechasUnicas) {
    const nacional = calcularNacionalPonderado(surveys, fecha);
    if (nacional) {
      nacionalesNuevas.push(nacional);
    }
    console.log('');
  }

  // Eliminar nacionales viejas de PLUS Quest y agregar las nuevas
  const surveysLimpias = surveys.filter(s =>
    !(s.pollster === 'PLUS Quest' && s.scope === 'national')
  );

  const surveysFinal = [...surveysLimpias, ...nacionalesNuevas];

  // Guardar
  fs.writeFileSync(jsonPath, JSON.stringify(surveysFinal, null, 2), 'utf-8');

  console.log(`\n✅ Agregadas ${nacionalesNuevas.length} encuestas nacionales para PLUS Quest`);
  console.log(`📊 Total encuestas en JSON: ${surveysFinal.length}`);
}

main()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  });
