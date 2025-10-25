import fs from 'fs';
import path from 'path';

const newSurveys = [
  {
    "date": "2025-10-25",
    "pollster": "PLUS Quest",
    "scope": "provincial",
    "province": "Entre Ríos",
    "chamber": "senadores",
    "LLA": 38.9,
    "FP": 34.9,
    "PU": null,
    "UCR": null,
    "PRO": null,
    "FIT": 3.2,
    "CC": null,
    "Provincial": null,
    "Ahora_503": 13.7,
    "PS": 3.9,
    "Union_Popular": 5.4,
    "Others": null,
    "sample": 5434,
    "methodology": "recopilación de datos online",
    "margin_error": null
  },
  {
    "date": "2025-10-25",
    "pollster": "PLUS Quest",
    "scope": "provincial",
    "province": "Entre Ríos",
    "chamber": "diputados",
    "LLA": 39.2,
    "FP": 38.7,
    "PU": null,
    "UCR": null,
    "PRO": null,
    "FIT": 3.1,
    "CC": null,
    "Provincial": null,
    "Ahora_503": 11.5,
    "PS": 4.3,
    "Union_Popular": 3.2,
    "Others": null,
    "sample": 5434,
    "methodology": "recopilación de datos online",
    "margin_error": null
  },
  {
    "date": "2025-10-18",
    "pollster": "Pulso Research",
    "scope": "provincial",
    "province": "Santa Fe",
    "chamber": "diputados",
    "LLA": 39.8,
    "FP": 32.7,
    "PU": 14.5,
    "UCR": null,
    "PRO": null,
    "FIT": 3.7,
    "CC": 2.4,
    "Defendamos_Santa_Fe": 5.0,
    "Compromiso_Federal": 1.5,
    "Republicanos_Unidos": 0.3,
    "Others": null,
    "sample": 1051,
    "methodology": "CATI + PRESENCIAL",
    "margin_error": 2.9
  },
  {
    "date": "2025-10-19",
    "pollster": "Proyección Consultores",
    "scope": "national",
    "province": null,
    "chamber": "general",
    "LLA": 35.7,
    "FP": 11.6,
    "PU": 21.0,
    "UCR": null,
    "PRO": null,
    "FIT": 5.0,
    "CC": null,
    "Provincial": null,
    "Otro_espacio": 19.0,
    "En_blanco": 7.7,
    "Others": null,
    "sample": 758,
    "methodology": "CAWI",
    "margin_error": 3.5
  },
  {
    "date": "2025-10-19",
    "pollster": "Proyección Consultores",
    "scope": "provincial",
    "province": "Córdoba",
    "chamber": "diputados",
    "LLA": 33.7,
    "FP": 4.8,
    "PU": 30.3,
    "UCR": 3.2,
    "PRO": 1.2,
    "FIT": 3.1,
    "CC": null,
    "Defendamos_Cordoba": 11.9,
    "Encuentro_Republica": 1.3,
    "Ciudadanos": 1.2,
    "Partido_Libertario": 0.9,
    "Partido_Democrata": 0.6,
    "Others": 3.8,
    "sample": 758,
    "methodology": "CAWI",
    "margin_error": 3.5
  },
  {
    "date": "2025-10-19",
    "pollster": "Proyección Consultores",
    "scope": "national",
    "province": null,
    "chamber": "general",
    "LLA": 30.6,
    "FP": 33.5,
    "PU": 13.4,
    "UCR": null,
    "PRO": null,
    "FIT": 3.8,
    "CC": null,
    "Provincial": null,
    "Otro_espacio": 8.3,
    "En_blanco": 10.5,
    "Others": null,
    "sample": 807,
    "methodology": "CAWI",
    "margin_error": 3.4
  },
  {
    "date": "2025-10-19",
    "pollster": "Proyección Consultores",
    "scope": "provincial",
    "province": "Santa Fe",
    "chamber": "diputados",
    "LLA": 29.7,
    "FP": 31.6,
    "PU": 21.8,
    "UCR": null,
    "PRO": null,
    "FIT": 2.7,
    "CC": 0.6,
    "Frente_Amplio_Soberania": 3.1,
    "Defendamos_Santa_Fe": 0.4,
    "Compromiso_Federal": 0.4,
    "Republicanos_Unidos": 0.3,
    "Igualdad_Participacion": 0.7,
    "Others": 8.5,
    "sample": 807,
    "methodology": "CAWI",
    "margin_error": 3.4
  },
  {
    "date": "2025-10-19",
    "pollster": "Proyección Consultores",
    "scope": "national",
    "province": null,
    "chamber": "general",
    "LLA": 47.3,
    "FP": 24.1,
    "PU": 2.9,
    "UCR": null,
    "PRO": null,
    "FIT": 4.7,
    "CC": null,
    "Provincial": null,
    "Otro_espacio": 12.4,
    "En_blanco": 8.6,
    "Others": null,
    "sample": 508,
    "methodology": "CAWI",
    "margin_error": 4.3
  },
  {
    "date": "2025-10-19",
    "pollster": "Proyección Consultores",
    "scope": "provincial",
    "province": "Mendoza",
    "chamber": "diputados",
    "LLA": 45.5,
    "FP": 25.8,
    "PU": 3.0,
    "UCR": null,
    "PRO": null,
    "FIT": 4.4,
    "CC": null,
    "Frente_Verde": 8.9,
    "Protectora_Fuerza_Politica": 1.4,
    "Frente_Libertario_Democrata": 1.3,
    "Others": 9.7,
    "sample": 508,
    "methodology": "CAWI",
    "margin_error": 4.3
  }
];

async function main() {
  console.log('📥 Agregando nuevas encuestas de octubre 25...\n');

  const jsonPath = path.join(process.cwd(), 'public', 'data', 'encuestas_argentina_2025.json');
  const existingSurveys = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`📊 Encuestas existentes: ${existingSurveys.length}`);
  console.log(`➕ Encuestas nuevas a agregar: ${newSurveys.length}`);

  // Combinar
  const allSurveys = [...existingSurveys, ...newSurveys];

  // Guardar
  fs.writeFileSync(jsonPath, JSON.stringify(allSurveys, null, 2), 'utf-8');

  console.log(`\n✅ Total de encuestas: ${allSurveys.length}`);
  console.log(`💾 JSON actualizado: ${jsonPath}`);
  console.log('\n📝 Próximo paso: Ejecutar migrate-surveys.ts para sincronizar con la base de datos');
}

main()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  });
