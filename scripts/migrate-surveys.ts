/**
 * Script para migrar datos de encuestas desde el JSON a la base de datos
 *
 * Ejecutar con: npx tsx scripts/migrate-surveys.ts
 */

import { PrismaClient, SurveyScope, Chamber } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface EncuestaJSON {
  date: string;
  pollster: string;
  scope: 'national' | 'provincial';
  province: string | null;
  chamber: 'diputados' | 'senadores';
  LLA: number | null;
  FP: number | null;
  PU: number | null;
  UCR: number | null;
  PRO: number | null;
  FIT: number | null;
  Provincial: number | null;
  Others: number | null;
  sample?: number;
  methodology?: string;
  margin_error?: number;
}

async function migrateSurveys() {
  try {
    console.log('🚀 Iniciando migración de encuestas...');

    // Leer archivo JSON
    const jsonPath = path.join(process.cwd(), 'public', 'data', 'encuestas_argentina_2025.json');
    const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
    const encuestas: EncuestaJSON[] = JSON.parse(jsonContent);

    console.log(`📊 Total de encuestas a migrar: ${encuestas.length}`);

    // Verificar si ya hay datos en la base de datos
    const existingSurveys = await prisma.survey.count();
    if (existingSurveys > 0) {
      console.log(`⚠️  Ya existen ${existingSurveys} encuestas en la base de datos.`);
      console.log('⚠️  Esta operación eliminará todas las encuestas existentes.');

      // En producción, aquí deberías pedir confirmación
      // Para este script, vamos a limpiar y volver a crear
      console.log('🗑️  Eliminando encuestas existentes...');
      await prisma.survey.deleteMany({});
      console.log('✅ Encuestas eliminadas');
    }

    // Migrar encuestas en lotes
    const batchSize = 100;
    let migratedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < encuestas.length; i += batchSize) {
      const batch = encuestas.slice(i, i + batchSize);

      try {
        const surveysToCreate = batch.map(encuesta => ({
          date: new Date(encuesta.date),
          pollster: encuesta.pollster,
          scope: encuesta.scope.toUpperCase() as SurveyScope,
          province: encuesta.province,
          chamber: encuesta.chamber.toUpperCase() as Chamber,
          LLA: encuesta.LLA,
          FP: encuesta.FP,
          PU: encuesta.PU,
          UCR: encuesta.UCR,
          PRO: encuesta.PRO,
          FIT: encuesta.FIT,
          Provincial: encuesta.Provincial,
          Others: encuesta.Others,
          sample: encuesta.sample || null,
          methodology: encuesta.methodology || null,
          marginError: encuesta.margin_error || null,
          createdBy: 'migration_script',
          // Campos expandidos
          provincialPartyName: (encuesta as any).provincialPartyName || null,
          CC: (encuesta as any).CC || null,
          ProFederal: (encuesta as any).ProFederal || null,
          Potencia: (encuesta as any).Potencia || null,
          ProyectoSur: (encuesta as any).ProyectoSur || null,
          UnionFederal: (encuesta as any).UnionFederal || null,
          FrenteIzquierda: (encuesta as any).FrenteIzquierda || null,
        }));

        await prisma.survey.createMany({
          data: surveysToCreate,
          skipDuplicates: true,
        });

        migratedCount += batch.length;
        console.log(`✅ Migradas ${migratedCount}/${encuestas.length} encuestas...`);
      } catch (batchError) {
        console.error(`❌ Error en lote ${i}-${i + batchSize}:`, batchError);
        errorCount += batch.length;
      }
    }

    console.log('\n📈 Resumen de migración:');
    console.log(`✅ Encuestas migradas exitosamente: ${migratedCount}`);
    console.log(`❌ Errores: ${errorCount}`);

    // Estadísticas
    const stats = await prisma.survey.groupBy({
      by: ['pollster'],
      _count: true,
    });

    console.log('\n📊 Encuestas por encuestadora:');
    stats.forEach(stat => {
      console.log(`   - ${stat.pollster}: ${stat._count} encuestas`);
    });

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar migración
migrateSurveys()
  .then(() => {
    console.log('\n🎉 Migración completada exitosamente!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal en la migración:', error);
    process.exit(1);
  });
