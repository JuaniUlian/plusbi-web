/**
 * Script para agregar las nuevas encuestas de octubre 2025
 */

import { PrismaClient, SurveyScope, Chamber } from '@prisma/client';

const prisma = new PrismaClient();

const NEW_SURVEYS = [
  // DC Consultores - Buenos Aires - 14-16 oct
  {
    date: new Date('2025-10-16'),
    pollster: 'DC Consultores',
    scope: 'PROVINCIAL' as SurveyScope,
    province: 'Buenos Aires',
    chamber: 'DIPUTADOS' as Chamber,
    LLA: 38.7,
    FP: 41.9,
    PU: 4.2,
    UCR: null,
    PRO: null,
    FIT: 3.0,
    Provincial: 5.1 + 1.7 + 1.3 + 1.1, // Propuesta Federal + Unión Federal + Potencia + Proyecto Sur
    Others: null,
    sample: 1780,
    methodology: null,
    marginError: 2.5,
  },
  // Emilio Scotta - Ciudad de Santa Fe - 14-15 oct
  {
    date: new Date('2025-10-15'),
    pollster: 'Emilio Scotta',
    scope: 'PROVINCIAL' as SurveyScope,
    province: 'Santa Fe',
    chamber: 'DIPUTADOS' as Chamber,
    LLA: 23.0,
    FP: 24.3,
    PU: 29.1,
    UCR: null,
    PRO: null,
    FIT: null,
    Provincial: null,
    Others: 10.5,
    sample: 230,
    methodology: 'Ciudad de Santa Fe',
    marginError: 6.0,
  },
  // Circuitos - Entre Ríos - 14-16 oct
  {
    date: new Date('2025-10-16'),
    pollster: 'Circuitos',
    scope: 'PROVINCIAL' as SurveyScope,
    province: 'Entre Ríos',
    chamber: 'DIPUTADOS' as Chamber,
    LLA: 43.0,
    FP: 40.5,
    PU: 1.9,
    UCR: null,
    PRO: null,
    FIT: 2.6,
    Provincial: 3.9, // Ahora 503
    Others: 2.2 + 1.1, // PS + MAS
    sample: 831,
    methodology: null,
    marginError: 3.4,
  },
  // Tendencias - Buenos Aires - 13-15 oct
  {
    date: new Date('2025-10-15'),
    pollster: 'Tendencias',
    scope: 'PROVINCIAL' as SurveyScope,
    province: 'Buenos Aires',
    chamber: 'DIPUTADOS' as Chamber,
    LLA: 31.5,
    FP: 40.2,
    PU: 4.2,
    UCR: 1.5, // Coalición Cívica
    PRO: null,
    FIT: 5.4,
    Provincial: 1.7 + 1.5 + 1.4, // Propuesta Federal + Potencia + Unión Federal
    Others: 2.8 + 3.5, // MDCA + Otros
    sample: 2863,
    methodology: null,
    marginError: 1.8,
  },
  // Tendencias - CABA Diputados - 13-15 oct
  {
    date: new Date('2025-10-15'),
    pollster: 'Tendencias',
    scope: 'PROVINCIAL' as SurveyScope,
    province: 'CABA',
    chamber: 'DIPUTADOS' as Chamber,
    LLA: 39.1,
    FP: 22.1,
    PU: null,
    UCR: 6.5 + 2.2, // Ciudadanos Unidos + Coalición Cívica
    PRO: 6.1, // Para Adelante (López Murphy)
    FIT: 10.6,
    Provincial: null,
    Others: 6.0,
    sample: 823,
    methodology: null,
    marginError: 3.4,
  },
  // Nueva Comunicación - Buenos Aires - 11-15 oct
  {
    date: new Date('2025-10-15'),
    pollster: 'Nueva Comunicación',
    scope: 'PROVINCIAL' as SurveyScope,
    province: 'Buenos Aires',
    chamber: 'DIPUTADOS' as Chamber,
    LLA: 31.5,
    FP: 43.8,
    PU: 3.8,
    UCR: null,
    PRO: null,
    FIT: 5.5,
    Provincial: 3.9, // Potencia
    Others: 1.3 + 1.3 + 3.7, // Proyecto Sur + MDCA + Otros
    sample: 2089,
    methodology: null,
    marginError: 2.9,
  },
  // Tendencias - CABA Senadores - 13-15 oct
  {
    date: new Date('2025-10-15'),
    pollster: 'Tendencias',
    scope: 'PROVINCIAL' as SurveyScope,
    province: 'CABA',
    chamber: 'SENADORES' as Chamber,
    LLA: 43.8,
    FP: 26.3,
    PU: null,
    UCR: 5.7, // Ciudadanos Unidos
    PRO: 4.2, // Para Adelante (Manes)
    FIT: 7.9,
    Provincial: 1.8 + 1.6, // Potencia + Movimiento Ciudadano
    Others: 2.1,
    sample: 823,
    methodology: null,
    marginError: 3.4,
  },
  // Circuitos - Córdoba - 13-15 oct
  {
    date: new Date('2025-10-15'),
    pollster: 'Circuitos',
    scope: 'PROVINCIAL' as SurveyScope,
    province: 'Córdoba',
    chamber: 'DIPUTADOS' as Chamber,
    LLA: 35.2,
    FP: 4.8,
    PU: 19.5,
    UCR: 4.2,
    PRO: null,
    FIT: 4.6,
    Provincial: 18.7 + 3.6, // Defendemos Córdoba + Encuentro por la República
    Others: 4.1,
    sample: 1098,
    methodology: null,
    marginError: 3.0,
  },
];

async function addNewSurveys() {
  try {
    console.log('🚀 Agregando nuevas encuestas de octubre 2025...\n');

    for (const survey of NEW_SURVEYS) {
      await prisma.survey.create({
        data: {
          ...survey,
          createdBy: 'manual_update_oct_2025',
        }
      });

      console.log(`✅ Agregada: ${survey.pollster} - ${survey.province} (${survey.date.toLocaleDateString('es-AR')})`);
    }

    console.log(`\n📊 Total de encuestas agregadas: ${NEW_SURVEYS.length}`);

    // Verificar total
    const totalSurveys = await prisma.survey.count();
    console.log(`📈 Total de encuestas en DB: ${totalSurveys}`);

  } catch (error) {
    console.error('❌ Error al agregar encuestas:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addNewSurveys()
  .then(() => {
    console.log('\n🎉 Encuestas agregadas exitosamente!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error);
    process.exit(1);
  });
