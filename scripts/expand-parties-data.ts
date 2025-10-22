/**
 * Script para expandir datos de partidos:
 * 1. Reemplazar campo "Provincial" por nombres reales según provincia
 * 2. Expandir "Others" en Buenos Aires con partidos específicos
 * 3. Agregar campos adicionales para partidos menores cuando hay info
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
  // Campos adicionales que vamos a agregar
  provincialPartyName?: string;
  CC?: number | null; // Coalición Cívica
  ProFederal?: number | null; // PRO Federal
  Potencia?: number | null;
  ProyectoSur?: number | null;
  UnionFederal?: number | null;
  FrenteIzquierda?: number | null;
}

// Nombres de partidos provinciales dominantes
const PARTIDOS_PROVINCIALES: Record<string, string> = {
  'Córdoba': 'Hacemos por Córdoba',
  'Santa Fe': 'Unidos',
  'Chubut': 'JSRN',
  'Santa Cruz': 'Frente Renovador',
  'Jujuy': 'Jujuy Crece',
  'San Luis': 'Ahora San Luis',
  'San Juan': 'Por San Juan',
  'Misiones': 'Frente Renovador',
  'Neuquén': 'MPN',
  'Entre Ríos': 'Fuerza Entre Ríos',
  'Corrientes': 'ECO+Cambiemos',
  'Tucumán': 'Fuerza Republicana',
  'Salta': 'Primero los Salteños',
  'Formosa': 'Modelo Formoseño',
  'Catamarca': 'Frente de Todos',
  'La Rioja': 'Frente de Todos La Rioja',
  'La Pampa': 'PJ La Pampa',
  'Río Negro': 'JSRN',
  'Tierra del Fuego': 'Forja',
  'Mendoza': 'Cambia Mendoza',
  'Chaco': 'Fuerza Republicana',
  'Santiago del Estero': 'Frente Cívico'
};

function expandirBuenosAires(survey: Survey): Survey {
  if (survey.province !== 'Buenos Aires' || !survey.Others) return survey;

  // Solo expandir si es una encuesta de PLUS Quest con Others > 20%
  if (survey.pollster === 'PLUS Quest' && survey.Others > 20) {
    const others = survey.Others;

    // Distribución aproximada basada en tus datos originales
    // Total Others: 24.67%
    const distribucion = {
      CC: 0.68,
      ProFederal: 1.61,
      PciasUnidas: 5.73,
      Potencia: 2.74,
      ProyectoSur: 1.37,
      UnionFederal: 0.21,
      FrenteIzquierda: 12.33
    };

    const totalDist = Object.values(distribucion).reduce((a, b) => a + b, 0);
    const factor = others / totalDist;

    return {
      ...survey,
      CC: parseFloat((distribucion.CC * factor).toFixed(2)),
      ProFederal: parseFloat((distribucion.ProFederal * factor).toFixed(2)),
      PU: (survey.PU || 0) + parseFloat((distribucion.PciasUnidas * factor).toFixed(2)), // Sumar a PU existente
      Potencia: parseFloat((distribucion.Potencia * factor).toFixed(2)),
      ProyectoSur: parseFloat((distribucion.ProyectoSur * factor).toFixed(2)),
      UnionFederal: parseFloat((distribucion.UnionFederal * factor).toFixed(2)),
      FrenteIzquierda: parseFloat((distribucion.FrenteIzquierda * factor).toFixed(2)),
      Others: 0 // Ahora está todo expandido
    };
  }

  return survey;
}

function agregarNombreProvincial(survey: Survey): Survey {
  if (!survey.province || !survey.Provincial) return survey;

  const nombrePartido = PARTIDOS_PROVINCIALES[survey.province];
  if (nombrePartido) {
    return {
      ...survey,
      provincialPartyName: nombrePartido
    };
  }

  return survey;
}

async function main() {
  console.log('🔧 Expandiendo datos de partidos...\n');

  // Leer JSON
  const jsonPath = path.join(process.cwd(), 'public', 'data', 'encuestas_argentina_2025.json');
  const surveys: Survey[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`📊 Total de encuestas: ${surveys.length}`);

  let expandidasBA = 0;
  let nombresProvinciales = 0;

  // Procesar cada encuesta
  const surveysExpandidas = surveys.map(survey => {
    let expandida = { ...survey };

    // Expandir Buenos Aires
    if (survey.province === 'Buenos Aires' && survey.Others && survey.Others > 20) {
      expandida = expandirBuenosAires(expandida);
      if (expandida.CC) expandidasBA++;
    }

    // Agregar nombres de partidos provinciales
    if (survey.Provincial && survey.province) {
      expandida = agregarNombreProvincial(expandida);
      if (expandida.provincialPartyName) nombresProvinciales++;
    }

    return expandida;
  });

  // Guardar JSON expandido
  fs.writeFileSync(jsonPath, JSON.stringify(surveysExpandidas, null, 2), 'utf-8');

  console.log(`\n✅ Expansiones completadas:`);
  console.log(`   - Buenos Aires expandido: ${expandidasBA} encuestas`);
  console.log(`   - Nombres provinciales agregados: ${nombresProvinciales}`);
  console.log(`\n💾 JSON actualizado: ${jsonPath}`);
  console.log('\n📝 Nota: Los nuevos campos (CC, ProFederal, etc.) están en el JSON.');
  console.log('   El schema de Prisma mantiene los campos originales Provincial y Others.');
}

main()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  });
