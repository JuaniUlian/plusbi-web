/**
 * Script para expandir "Others" basado en datos reales de backup
 * Los datos de backup muestran la composición típica de cada provincia
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
  provincialPartyName?: string;
  CC?: number | null;
  ProFederal?: number | null;
  Potencia?: number | null;
  ProyectoSur?: number | null;
  UnionFederal?: number | null;
  FrenteIzquierda?: number | null;
}

// Basado en datos de backup - composición típica de "Others" por provincia
// Los pesos se calculan del promedio de las fechas en backup
const OTHERS_DISTRIBUTION: Record<string, {
  parties: Array<{ field: keyof Survey; avgWeight: number }>;
}> = {
  'Buenos Aires': {
    parties: [
      { field: 'CC', avgWeight: 0.006 },              // ~0.6% promedio
      { field: 'FrenteIzquierda', avgWeight: 0.154 }, // ~15.4% promedio (importante!)
      { field: 'ProFederal', avgWeight: 0.013 },      // ~1.3%
      { field: 'Potencia', avgWeight: 0.100 },        // ~10%
      { field: 'ProyectoSur', avgWeight: 0.100 },     // ~10%
      { field: 'UnionFederal', avgWeight: 0.001 },    // ~0.1%
      // El resto se distribuye entre partidos principales ya mapeados
    ]
  },
  'Córdoba': {
    parties: [
      { field: 'CC', avgWeight: 0.024 },              // Ciudadanos ~2.4%
      { field: 'PRO', avgWeight: 0.038 },             // PRO ~3.8%
      { field: 'UCR', avgWeight: 0.047 },             // UCR ~4.7%
    ]
  },
  'Entre Ríos': {
    parties: [
      { field: 'FIT', avgWeight: 0.00 },              // Nueva Izquierda (muy bajo)
      // Otros partidos menores (Ahora 503, Unión Popular) son muy específicos
    ]
  },
  'Santa Fe': {
    parties: [
      { field: 'CC', avgWeight: 0.00 },
      { field: 'FIT', avgWeight: 0.00 },
      { field: 'FrenteIzquierda', avgWeight: 0.00 },  // Muy bajo en datos
    ]
  },
  'Mendoza': {
    parties: [
      { field: 'FIT', avgWeight: 0.00 },
      { field: 'FrenteIzquierda', avgWeight: 0.00 },
    ]
  },
  'Tucumán': {
    parties: [
      { field: 'FIT', avgWeight: 0.00 },
      { field: 'FrenteIzquierda', avgWeight: 0.00 },
    ]
  },
  'Jujuy': {
    parties: [
      { field: 'FrenteIzquierda', avgWeight: 0.32 },  // ~32% importante!
      { field: 'FIT', avgWeight: 0.00 },
    ]
  },
  'Salta': {
    parties: [
      { field: 'FrenteIzquierda', avgWeight: 0.11 },  // ~11%
      { field: 'FIT', avgWeight: 0.00 },
    ]
  },
  'Neuquén': {
    parties: [
      { field: 'FrenteIzquierda', avgWeight: 0.125 }, // ~12.5%
      { field: 'FIT', avgWeight: 0.00 },
    ]
  },
  'Misiones': {
    parties: [
      { field: 'FIT', avgWeight: 0.00 },
    ]
  },
  'Chaco': {
    parties: [
      { field: 'ProyectoSur', avgWeight: 0.00 },
      { field: 'FIT', avgWeight: 0.00 },
    ]
  },
  'Río Negro': {
    parties: [
      { field: 'FrenteIzquierda', avgWeight: 0.00 },
      { field: 'FIT', avgWeight: 0.00 },
    ]
  },
};

// Nombres de partidos provinciales según backup
const PROVINCIAL_PARTY_NAMES: Record<string, string> = {
  'Buenos Aires': 'Pcias Unidas',          // Ya debería estar en PU
  'Córdoba': 'Hacemos por Córdoba',         // Campo Provincial
  'Entre Ríos': 'Fuerza Entre Ríos',       // Campo Provincial
  'Santa Fe': 'Unidos',                     // Campo Provincial
  'Mendoza': 'Cambia Mendoza',
  'Tucumán': 'Fuerza Republicana',
  'Chaco': 'Vamos Chaco',
  'Misiones': 'Frente Renovador',
  'Jujuy': 'Primero Jujuy',
  'Salta': 'Primero los Salteños',
  'Neuquén': 'MPN',
  'Río Negro': 'Juntos por Río Negro',
  'Chubut': 'JSRN',
  'Santa Cruz': 'Frente Renovador',
  'Tierra del Fuego': 'Forja',
  'La Pampa': 'PJ La Pampa',
  'La Rioja': 'Frente de Todos La Rioja',
  'Catamarca': 'Frente de Todos',
  'Santiago del Estero': 'Frente Cívico',
  'Formosa': 'Modelo Formoseño',
  'Corrientes': 'ECO+Cambiemos',
  'San Juan': 'Por San Juan',
  'San Luis': 'Ahora San Luis',
};

function expandOthers(survey: Survey): Survey {
  // Si no tiene Others o ya está expandido, retornar
  if (!survey.Others || survey.Others <= 0) return survey;

  // Si ya tiene campos expandidos no-cero, no tocar
  if ((survey.CC && survey.CC > 0) ||
      (survey.ProFederal && survey.ProFederal > 0) ||
      (survey.Potencia && survey.Potencia > 0)) {
    return survey;
  }

  const province = survey.province || 'DEFAULT';
  const distribution = OTHERS_DISTRIBUTION[province];

  if (!distribution) {
    // Provincia sin datos específicos, no expandir
    return survey;
  }

  const othersValue = survey.Others;
  const expanded: any = { ...survey };

  // Calcular total de pesos
  const totalWeight = distribution.parties.reduce((sum, p) => sum + p.avgWeight, 0);

  if (totalWeight > 0) {
    // Distribuir Others proporcionalmente
    distribution.parties.forEach(party => {
      const proportion = party.avgWeight / totalWeight;
      const value = othersValue * proportion;

      if (value > 0) {
        if (expanded[party.field] === null || expanded[party.field] === undefined || expanded[party.field] === 0) {
          expanded[party.field] = parseFloat(value.toFixed(2));
        }
      }
    });

    // Reducir Others por lo distribuido
    const distributed = othersValue * totalWeight;
    expanded.Others = parseFloat((othersValue - distributed).toFixed(2));

    // Si queda muy poco, ponerlo en 0
    if (expanded.Others < 0.5) {
      expanded.Others = 0;
    }
  }

  return expanded;
}

function ensureProvincialPartyName(survey: Survey): Survey {
  if (!survey.province || !survey.Provincial || survey.Provincial <= 0) {
    return survey;
  }

  const partyName = PROVINCIAL_PARTY_NAMES[survey.province];

  if (partyName && !survey.provincialPartyName) {
    return {
      ...survey,
      provincialPartyName: partyName
    };
  }

  return survey;
}

async function main() {
  console.log('🔧 Expandiendo "Others" basado en datos de backup reales...\n');

  const jsonPath = path.join(process.cwd(), 'public', 'data', 'encuestas_argentina_2025.json');
  const surveys: Survey[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`📊 Total de encuestas: ${surveys.length}\n`);

  let expandidasOthers = 0;
  let nombresProvinciales = 0;
  let sinCambios = 0;

  const surveysProcessed = surveys.map(survey => {
    let processed = { ...survey };

    // Expandir Others
    const withExpandedOthers = expandOthers(processed);
    if (withExpandedOthers.Others !== processed.Others) {
      expandidasOthers++;
    }
    processed = withExpandedOthers;

    // Asegurar nombre provincial
    const withProvincialName = ensureProvincialPartyName(processed);
    if (withProvincialName.provincialPartyName !== processed.provincialPartyName) {
      nombresProvinciales++;
    }
    processed = withProvincialName;

    if (processed === survey) {
      sinCambios++;
    }

    return processed;
  });

  // Guardar
  fs.writeFileSync(jsonPath, JSON.stringify(surveysProcessed, null, 2), 'utf-8');

  console.log(`✅ Procesamiento completado:`);
  console.log(`   - Others expandidos: ${expandidasOthers}`);
  console.log(`   - Nombres provinciales agregados: ${nombresProvinciales}`);
  console.log(`   - Sin cambios: ${sinCambios}`);
  console.log(`\n💾 JSON actualizado: ${jsonPath}`);
  console.log('\n📝 Ahora "Others" está distribuido según composición real de cada provincia.');
}

main()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  });
