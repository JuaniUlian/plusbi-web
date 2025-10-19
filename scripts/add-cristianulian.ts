import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function addCristianulian() {
  try {
    const email = 'cristianulian@quest.ar';
    const password = 'Crist1@nUl!2025#Qst';

    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      await prisma.user.update({
        where: { email },
        data: { password: hashedPassword, name: 'Cristian Ulian', role: 'SUPERADMIN', premiumSince: new Date() }
      });
    } else {
      await prisma.user.create({
        data: { email, password: hashedPassword, name: 'Cristian Ulian', role: 'SUPERADMIN', premiumSince: new Date() }
      });
    }

    await prisma.user.update({
      where: { email: 'juanulian@quest.ar' },
      data: { role: 'SUPERADMIN' }
    });

    console.log('✅ cristianulian@quest.ar:', password);
    console.log('✅ juanulian@quest.ar: SUPERADMIN');
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addCristianulian().then(() => process.exit(0)).catch(() => process.exit(1));
