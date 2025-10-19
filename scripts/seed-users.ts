/**
 * Script para crear usuarios premium iniciales en la base de datos
 *
 * Ejecutar con: npx tsx scripts/seed-users.ts
 */

import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const PREMIUM_USERS = [
  {
    email: 'juanulian@quest.ar',
    password: 'Juani.2025',
    name: 'Juan Ulian',
    role: 'ADMIN' as UserRole,
  },
  {
    email: 'ctoller@quest.ar',
    password: 'Ct0ll3r#2025$Qst',
    name: 'C. Toller',
    role: 'ADMIN' as UserRole,
  },
  {
    email: 'emelchiori@quest.ar',
    password: 'Em3lch10r!2025&Qst',
    name: 'E. Melchiori',
    role: 'ADMIN' as UserRole,
  },
  {
    email: 'jinsaurralde@quest.ar',
    password: 'J1ns@urr@ld3*2025',
    name: 'J. Insaurralde',
    role: 'ADMIN' as UserRole,
  },
];

async function seedUsers() {
  try {
    console.log('🚀 Iniciando seed de usuarios premium...');

    for (const userData of PREMIUM_USERS) {
      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        console.log(`⚠️  Usuario ${userData.email} ya existe, actualizando...`);

        // Actualizar usuario existente
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await prisma.user.update({
          where: { email: userData.email },
          data: {
            password: hashedPassword,
            name: userData.name,
            role: userData.role,
            premiumSince: new Date(),
            guestExpiresAt: null,
          },
        });

        console.log(`✅ Usuario ${userData.email} actualizado`);
      } else {
        // Crear nuevo usuario
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        await prisma.user.create({
          data: {
            email: userData.email,
            password: hashedPassword,
            name: userData.name,
            role: userData.role,
            premiumSince: new Date(),
          },
        });

        console.log(`✅ Usuario ${userData.email} creado`);
      }
    }

    // Crear un usuario guest de ejemplo
    const guestEmail = 'guest@quest.ar';
    const existingGuest = await prisma.user.findUnique({
      where: { email: guestEmail },
    });

    if (!existingGuest) {
      const hashedPassword = await bcrypt.hash('guest123', 10);
      const guestExpiresAt = new Date();
      guestExpiresAt.setDate(guestExpiresAt.getDate() + 3); // Expira en 3 días

      await prisma.user.create({
        data: {
          email: guestEmail,
          password: hashedPassword,
          name: 'Usuario Invitado',
          role: 'GUEST',
          guestExpiresAt,
        },
      });

      console.log(`✅ Usuario guest creado (${guestEmail})`);
    }

    console.log('\n📊 Resumen:');
    const totalUsers = await prisma.user.count();
    const premiumUsers = await prisma.user.count({ where: { role: 'ADMIN' } });
    const guestUsers = await prisma.user.count({ where: { role: 'GUEST' } });

    console.log(`   Total de usuarios: ${totalUsers}`);
    console.log(`   Usuarios premium: ${premiumUsers}`);
    console.log(`   Usuarios guest: ${guestUsers}`);

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar seed
seedUsers()
  .then(() => {
    console.log('\n🎉 Seed completado exitosamente!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal en el seed:', error);
    process.exit(1);
  });
