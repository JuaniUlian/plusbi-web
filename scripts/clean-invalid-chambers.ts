/**
 * Script para eliminar encuestas con chamber inválido de la BD
 * Solo mantener DIPUTADOS y SENADORES
 */

import { prisma } from '../src/lib/prisma';

async function cleanInvalidChambers() {
  console.log('🧹 Limpiando encuestas con chamber inválido...\n');

  try {
    // Contar total antes
    const totalBefore = await prisma.survey.count();
    console.log(`📊 Total encuestas en BD antes: ${totalBefore}`);

    // Eliminar GENERAL (el único que se agregó a la BD)
    // No podemos usar deleteMany con enum inválido, así que usamos SQL directo
    await prisma.$executeRaw`DELETE FROM surveys WHERE chamber = 'GENERAL'`;

    // Contar después
    const totalAfter = await prisma.survey.count();
    const deleted = totalBefore - totalAfter;

    console.log(`\n✅ Encuestas eliminadas: ${deleted}`);
    console.log(`📊 Total encuestas en BD ahora: ${totalAfter}`);

    // Verificar chambers restantes
    const chambers = await prisma.$queryRaw`
      SELECT chamber, COUNT(*) as count
      FROM surveys
      GROUP BY chamber
    `;

    console.log('\n📋 Chambers en BD:');
    console.log(chambers);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

cleanInvalidChambers()
  .catch(e => {
    console.error('💥 Error fatal:', e);
    process.exit(1);
  });
