/**
 * Script para verificar que los datos se guardaron correctamente
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyData() {
  try {
    console.log('🔍 Verificando datos en la base de datos...\n');

    // Contar usuarios
    const usersCount = await prisma.user.count();
    console.log(`✅ Total de usuarios: ${usersCount}`);

    // Listar usuarios
    const users = await prisma.user.findMany({
      select: {
        email: true,
        role: true,
        createdAt: true,
      }
    });
    console.log('\n📋 Usuarios registrados:');
    users.forEach(user => {
      console.log(`   - ${user.email} (${user.role})`);
    });

    // Contar encuestas
    const surveysCount = await prisma.survey.count();
    console.log(`\n✅ Total de encuestas: ${surveysCount}`);

    // Agrupar por encuestadora
    const byPollster = await prisma.survey.groupBy({
      by: ['pollster'],
      _count: true,
    });
    console.log(`\n📊 Encuestadoras únicas: ${byPollster.length}`);

    // Última encuesta
    const lastSurvey = await prisma.survey.findFirst({
      orderBy: { date: 'desc' },
      select: {
        date: true,
        pollster: true,
        chamber: true,
        LLA: true,
        FP: true,
      }
    });

    if (lastSurvey) {
      console.log(`\n📅 Última encuesta:`);
      console.log(`   Fecha: ${lastSurvey.date}`);
      console.log(`   Encuestadora: ${lastSurvey.pollster}`);
      console.log(`   Cámara: ${lastSurvey.chamber}`);
      console.log(`   LLA: ${lastSurvey.LLA}% | FP: ${lastSurvey.FP}%`);
    }

    console.log('\n✅ Base de datos funcionando correctamente!');

  } catch (error) {
    console.error('❌ Error al verificar datos:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

verifyData()
  .then(() => {
    console.log('\n🎉 Verificación completada!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error en la verificación:', error);
    process.exit(1);
  });
