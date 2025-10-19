/**
 * Script para agregar usuaria agostog
 */

import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function addAgostogUser() {
  try {
    console.log('🚀 Agregando usuaria agostog...\n');

    const email = 'agostog@quest.ar';
    const password = 'Ag0st0G#2025$Qst!Secure';

    // Verificar si ya existe
    const existing = await prisma.user.findUnique({
      where: { email }
    });

    if (existing) {
      console.log(`⚠️  Usuario ${email} ya existe, actualizando...`);
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          name: 'Agostina G.',
          role: 'ADMIN',
          premiumSince: new Date(),
        }
      });

      console.log(`✅ Usuario ${email} actualizado`);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: 'Agostina G.',
          role: 'ADMIN',
          premiumSince: new Date(),
        }
      });

      console.log(`✅ Usuario ${email} creado`);
    }

    console.log('\n📋 Credenciales:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('\n⚠️  IMPORTANTE: Guarda estas credenciales en un lugar seguro!');

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addAgostogUser()
  .then(() => {
    console.log('\n🎉 Usuario agregado exitosamente!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error);
    process.exit(1);
  });
