import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Corrigiendo roles de usuarios premium...\n');

  // Usuarios que deben ser ADMIN (premium)
  const premiumEmails = [
    'agostog@quest.ar',
    'ctollet@quest.ar',
    'emelchiori@quest.ar',
    'jinsaurralde@quest.ar'
  ];

  for (const email of premiumEmails) {
    const result = await prisma.user.updateMany({
      where: { email },
      data: { role: 'ADMIN' }
    });

    if (result.count > 0) {
      console.log(`✓ ${email} actualizado a ADMIN`);
    } else {
      console.log(`⚠ ${email} no encontrado en la base de datos`);
    }
  }

  // Verificar estado final
  console.log('\n--- Estado final de roles ---');
  const users = await prisma.user.findMany({
    select: {
      email: true,
      role: true,
      name: true
    },
    orderBy: {
      email: 'asc'
    }
  });

  console.table(users);

  // Resumen por rol
  const roleCount = await prisma.user.groupBy({
    by: ['role'],
    _count: true
  });

  console.log('\n--- Resumen por rol ---');
  roleCount.forEach(r => {
    console.log(`${r.role}: ${r._count} usuarios`);
  });
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
