import { PrismaClient, SurveyScope, Chamber } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Datos de Buenos Aires - Diputados
  const baSurveys = [
    {
      date: new Date('2025-10-17'),
      pollster: 'Datos Electorales',
      scope: SurveyScope.PROVINCIAL,
      province: 'Buenos Aires',
      chamber: Chamber.DIPUTADOS,
      LLA: 34.24,
      FP: 41.09,
      Others: 24.67, // Suma de otros partidos
      sample: null,
      createdBy: 'system'
    },
    {
      date: new Date('2025-10-20'),
      pollster: 'Datos Electorales',
      scope: SurveyScope.PROVINCIAL,
      province: 'Buenos Aires',
      chamber: Chamber.DIPUTADOS,
      LLA: 29.30,
      FP: 45.66,
      Others: 25.04, // Suma de otros partidos
      sample: null,
      createdBy: 'system'
    }
  ];

  // Datos de Córdoba - Diputados
  const corSurveys = [
    {
      date: new Date('2025-10-17'),
      pollster: 'Datos Electorales',
      scope: SurveyScope.PROVINCIAL,
      province: 'Córdoba',
      chamber: Chamber.DIPUTADOS,
      LLA: 0.99,
      FP: 7.04,
      Provincial: 33.14, // Córdoba
      PU: 47.22, // Pcias Unidas
      Others: 11.61, // Suma de otros
      sample: null,
      createdBy: 'system'
    },
    {
      date: new Date('2025-10-20'),
      pollster: 'Datos Electorales',
      scope: SurveyScope.PROVINCIAL,
      province: 'Córdoba',
      chamber: Chamber.DIPUTADOS,
      LLA: 1.53,
      FP: 6.36,
      Provincial: 36.87, // Córdoba
      PU: 40.69, // Pcias Unidas
      Others: 14.55, // Suma de otros
      sample: null,
      createdBy: 'system'
    }
  ];

  // Datos de Entre Ríos - Senadores
  const erSurveys = [
    {
      date: new Date('2025-10-17'),
      pollster: 'Datos Electorales',
      scope: SurveyScope.PROVINCIAL,
      province: 'Entre Ríos',
      chamber: Chamber.SENADORES,
      LLA: 34.91,
      FP: null,
      Provincial: 21.98, // Fuerza ER
      Others: 43.10, // PS y otros
      sample: null,
      createdBy: 'system'
    },
    {
      date: new Date('2025-10-20'),
      pollster: 'Datos Electorales',
      scope: SurveyScope.PROVINCIAL,
      province: 'Entre Ríos',
      chamber: Chamber.SENADORES,
      LLA: 31.02,
      FP: null,
      Provincial: 36.50, // Fuerza ER
      Others: 32.48, // PS y otros
      sample: null,
      createdBy: 'system'
    }
  ];

  const allSurveys = [...baSurveys, ...corSurveys, ...erSurveys];

  console.log(`📊 Cargando ${allSurveys.length} encuestas...`);

  for (const survey of allSurveys) {
    const created = await prisma.survey.create({
      data: survey
    });
    console.log(`✅ Encuesta cargada: ${created.province} - ${created.date.toLocaleDateString()}`);
  }

  console.log(`\n✅ Total cargadas: ${allSurveys.length} encuestas`);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
