import { prisma } from '../src/lib/prisma';

async function main() {
  const bsas = await prisma.survey.findMany({
    where: { province: 'Buenos Aires' },
    select: {
      date: true,
      pollster: true,
      LLA: true,
      FP: true,
    },
    orderBy: { date: 'desc' },
    take: 10
  });

  console.log('Últimas 10 encuestas de Buenos Aires en DB:');
  bsas.forEach(s => {
    console.log(`  ${s.date.toISOString().split('T')[0]} | ${s.pollster} | LLA=${s.LLA} FP=${s.FP}`);
  });

  // Calcular promedio por consultora
  const all = await prisma.survey.findMany({
    where: { province: 'Buenos Aires' },
    select: {
      date: true,
      pollster: true,
      LLA: true,
      FP: true,
    }
  });

  const byPollster: any = {};
  all.forEach(s => {
    if (!byPollster[s.pollster] || s.date > byPollster[s.pollster].date) {
      byPollster[s.pollster] = s;
    }
  });

  console.log('\nÚltima de cada consultora en DB:');
  Object.keys(byPollster).forEach(p => {
    const s = byPollster[p];
    console.log(`  ${p} | LLA=${s.LLA} FP=${s.FP}`);
  });

  const llValues = Object.values(byPollster).map((s: any) => s.LLA).filter((v: any) => v !== null);
  const fpValues = Object.values(byPollster).map((s: any) => s.FP).filter((v: any) => v !== null);

  if (llValues.length > 0) {
    const avgLLA = llValues.reduce((a: number, b: number) => a + b, 0) / llValues.length;
    const avgFP = fpValues.reduce((a: number, b: number) => a + b, 0) / fpValues.length;
    console.log(`\nPromedio en DB: LLA=${avgLLA.toFixed(1)}% FP=${avgFP.toFixed(1)}%`);
  }

  console.log(`\nTotal encuestas Buenos Aires en DB: ${all.length}`);
  console.log(`Total encuestadoras: ${Object.keys(byPollster).length}`);

  await prisma.$disconnect();
}

main();
