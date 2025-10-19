/**
 * Script para verificar encuestas de PLUS Quest
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkPlusQuest() {
  try {
    console.log('🔍 Verificando encuestas de PLUS Quest...\n');

    const plusQuestSurveys = await prisma.survey.findMany({
      where: {
        pollster: 'PLUS Quest'
      },
      orderBy: {
        date: 'desc'
      },
      select: {
        date: true,
        scope: true,
        province: true,
        chamber: true,
        sample: true,
        LLA: true,
        FP: true,
      }
    });

    console.log(`📊 Total encuestas PLUS Quest: ${plusQuestSurveys.length}\n`);

    // Agrupar por scope
    const nacional = plusQuestSurveys.filter(s => s.scope === 'NATIONAL');
    const provincial = plusQuestSurveys.filter(s => s.scope === 'PROVINCIAL');

    console.log(`🌎 Nacionales: ${nacional.length}`);
    console.log(`🗺️  Provinciales: ${provincial.length}\n`);

    if (nacional.length > 0) {
      console.log('📋 Encuestas Nacionales:');
      nacional.forEach(s => {
        console.log(`   ${s.date.toLocaleDateString('es-AR')} - ${s.chamber} - Muestra: ${s.sample || 'N/D'}`);
      });
      console.log('');
    }

    if (provincial.length > 0) {
      console.log('📋 Encuestas Provinciales:');
      const byProvince = provincial.reduce((acc, s) => {
        const key = s.province || 'Sin provincia';
        if (!acc[key]) acc[key] = [];
        acc[key].push(s);
        return acc;
      }, {} as Record<string, typeof provincial>);

      Object.entries(byProvince).forEach(([province, surveys]) => {
        const totalSample = surveys.reduce((sum, s) => sum + (s.sample || 0), 0);
        console.log(`   ${province}: ${surveys.length} encuesta(s) - Muestra total: ${totalSample}`);
      });
    }

    // Muestra total
    const totalSample = plusQuestSurveys.reduce((sum, s) => sum + (s.sample || 0), 0);
    console.log(`\n📊 Muestra total PLUS Quest: ${totalSample.toLocaleString('es-AR')} casos`);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

checkPlusQuest()
  .then(() => {
    console.log('\n✅ Verificación completada!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error);
    process.exit(1);
  });
