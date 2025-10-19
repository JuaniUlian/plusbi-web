import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('🔍 Verificando nombres de provincias...\n');

  // Obtener todas las provincias únicas
  const surveys = await prisma.survey.findMany({
    where: { scope: 'PROVINCIAL' },
    select: { province: true }
  });

  const provinces = [...new Set(surveys.map(s => s.province))].sort();

  console.log('📋 Provincias encontradas:', provinces.length);
  provinces.forEach(p => {
    const count = surveys.filter(s => s.province === p).length;
    console.log(`  - ${p}: ${count} encuestas`);
  });

  console.log('\n🔧 Normalizando nombres duplicados...\n');

  // Normalizar "Ciudad Autónoma de Buenos Aires" a "CABA"
  const cabaLong = await prisma.survey.count({
    where: { province: 'Ciudad Autónoma de Buenos Aires' }
  });

  if (cabaLong > 0) {
    console.log(`📝 Convirtiendo ${cabaLong} encuestas de "Ciudad Autónoma de Buenos Aires" a "CABA"...`);

    const result = await prisma.survey.updateMany({
      where: { province: 'Ciudad Autónoma de Buenos Aires' },
      data: { province: 'CABA' }
    });

    console.log(`✅ Actualizadas ${result.count} encuestas`);
  } else {
    console.log('✅ No hay encuestas con "Ciudad Autónoma de Buenos Aires"');
  }

  // Verificar el resultado
  console.log('\n📊 Resultado final:');
  const finalSurveys = await prisma.survey.findMany({
    where: { scope: 'PROVINCIAL' },
    select: { province: true }
  });

  const finalProvinces = [...new Set(finalSurveys.map(s => s.province))].sort();
  console.log(`Total de provincias únicas: ${finalProvinces.length}`);

  finalProvinces.forEach(p => {
    const count = finalSurveys.filter(s => s.province === p).length;
    console.log(`  - ${p}: ${count} encuestas`);
  });

  // Verificar provincias que deberían tener datos pero no tienen
  const expectedProvinces = [
    'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
    'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
    'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
    'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
    'Tierra del Fuego', 'Tucumán'
  ];

  console.log('\n⚠️  Provincias sin datos en la base:');
  const missing = expectedProvinces.filter(p => !finalProvinces.includes(p));
  if (missing.length > 0) {
    missing.forEach(p => console.log(`  - ${p}`));
  } else {
    console.log('  Todas las provincias tienen datos ✅');
  }

  await prisma.$disconnect();
  console.log('\n🎉 Normalización completada!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  });
