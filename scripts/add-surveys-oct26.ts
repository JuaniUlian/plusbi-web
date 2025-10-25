import fs from 'fs';
import path from 'path';

const newSurveys = [
  {
    "date": "2025-10-14",
    "pollster": "Trespuntozero",
    "scope": "national",
    "province": null,
    "chamber": "diputados",
    "LLA": 30.8,
    "FP": 12.0,
    "PU": 3.0,
    "UCR": null,
    "PRO": null,
    "FIT": 1.5,
    "CC": null,
    "Provincial": null,
    "Frente_Justicialista": 10.3,
    "MAS": 0.1,
    "Ninguno": 6.6,
    "No_sabe": 35.7,
    "Others": null,
    "sample": 1000,
    "methodology": "Mixto (CAWI + Telefónico IVR)",
    "margin_error": 3.1
  },
  {
    "date": "2025-09-08",
    "pollster": "Datos y Tendencias",
    "scope": "provincial",
    "province": "San Juan",
    "chamber": "general",
    "LLA": 9.5,
    "FP": null,
    "PU": 2.5,
    "UCR": null,
    "PRO": null,
    "FIT": 2.0,
    "CC": null,
    "Provincial": null,
    "Fabian_Martin_San_Juan": 38.7,
    "Cristian_Andino_Fuerza_San_Juan": 29.6,
    "Cruzada_Renovadora": 2.7,
    "Otros": 4.6,
    "No_sabe": 10.4,
    "Others": null,
    "sample": 1200,
    "methodology": null,
    "margin_error": null
  },
  {
    "date": "2025-09-26",
    "pollster": "Ethos",
    "scope": "provincial",
    "province": "San Juan",
    "chamber": "general",
    "LLA": 15.2,
    "FP": null,
    "PU": null,
    "UCR": null,
    "PRO": null,
    "FIT": null,
    "CC": null,
    "Provincial": null,
    "Fabian_Martin": 31.8,
    "Cristian_Andino": 30.5,
    "Emilio_Baistrocchi": 5.5,
    "Sergio_Vallejos": 4.0,
    "No_vota": 10.2,
    "Otros": 3.0,
    "Others": null,
    "sample": 735,
    "methodology": null,
    "margin_error": null
  },
  {
    "date": "2025-08-20",
    "pollster": "CB Consultora",
    "scope": "provincial",
    "province": "Corrientes",
    "chamber": "gobernador",
    "LLA": 10.3,
    "FP": null,
    "PU": null,
    "UCR": null,
    "PRO": null,
    "FIT": null,
    "CC": null,
    "Provincial": null,
    "Vamos_Corrientes": 35.8,
    "Limpiar_Corrientes": 17.4,
    "Encuentro_por_Corrientes": 16.0,
    "Blanco": 5.5,
    "No_sabe": 12.1,
    "Otros": 2.5,
    "Others": null,
    "sample": 808,
    "methodology": null,
    "margin_error": 3.4
  },
  {
    "date": "2025-10-01",
    "pollster": "Zuban Córdoba",
    "scope": "provincial",
    "province": "Tierra del Fuego",
    "chamber": "senadores",
    "LLA": 33.0,
    "FP": 31.9,
    "PU": 4.6,
    "UCR": null,
    "PRO": null,
    "FIT": 2.6,
    "CC": null,
    "Provincial": null,
    "Defendamos_TDF": 15.1,
    "Rogelio_Baron": 1.1,
    "EPF": 0.4,
    "En_blanco": 4.5,
    "No_sabe": 6.8,
    "Others": null,
    "sample": null,
    "methodology": null,
    "margin_error": null
  },
  {
    "date": "2025-10-01",
    "pollster": "Punto Doxa",
    "scope": "provincial",
    "province": "Tierra del Fuego",
    "chamber": "general",
    "LLA": 30.3,
    "FP": 20.2,
    "PU": null,
    "UCR": null,
    "PRO": null,
    "FIT": null,
    "CC": null,
    "Provincial": null,
    "Defendamos_TDF": 27.2,
    "Others": 22.3,
    "sample": null,
    "methodology": null,
    "margin_error": null
  },
  {
    "date": "2025-10-01",
    "pollster": "Vox Populi",
    "scope": "provincial",
    "province": "Tierra del Fuego",
    "chamber": "general",
    "LLA": 34.0,
    "FP": 27.0,
    "PU": null,
    "UCR": null,
    "PRO": null,
    "FIT": null,
    "CC": null,
    "Provincial": null,
    "Defendamos_TDF": 20.0,
    "Others": 19.0,
    "sample": null,
    "methodology": null,
    "margin_error": null
  }
];

async function main() {
  console.log('📥 Agregando 7 nuevas encuestas (Oct 26)...\n');

  const jsonPath = path.join(process.cwd(), 'public', 'data', 'encuestas_argentina_2025.json');
  const existingSurveys = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  console.log(`📊 Encuestas existentes: ${existingSurveys.length}`);
  console.log(`➕ Encuestas nuevas: ${newSurveys.length}`);

  // Combinar
  const allSurveys = [...existingSurveys, ...newSurveys];

  // Guardar
  fs.writeFileSync(jsonPath, JSON.stringify(allSurveys, null, 2), 'utf-8');

  console.log(`\n✅ Total de encuestas: ${allSurveys.length}`);
  console.log(`💾 JSON actualizado: ${jsonPath}`);
  console.log('\n📋 Nuevas encuestas por encuestadora:');
  console.log('   - Trespuntozero: 1 (nacional)');
  console.log('   - Datos y Tendencias: 1 (San Juan)');
  console.log('   - Ethos: 1 (San Juan)');
  console.log('   - CB Consultora: 1 (Corrientes - gobernador)');
  console.log('   - Zuban Córdoba: 1 (Tierra del Fuego)');
  console.log('   - Punto Doxa: 1 (Tierra del Fuego)');
  console.log('   - Vox Populi: 1 (Tierra del Fuego)');
  console.log('\n📝 Próximo paso: Ejecutar migrate-surveys.ts');
}

main()
  .catch(e => {
    console.error('❌ Error:', e);
    process.exit(1);
  });
