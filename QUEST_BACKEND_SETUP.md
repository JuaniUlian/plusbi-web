# Quest Backend - Guía de Setup y Deployment

## 🎯 Descripción General

Backend completo para Quest con:
- ✅ Autenticación segura (NextAuth.js)
- ✅ Base de datos PostgreSQL (Vercel Postgres)
- ✅ Analytics y tracking de usuarios
- ✅ Gestión dinámica de encuestas
- ✅ Sistema de roles (Premium/Guest)

---

## 📦 Stack Tecnológico

- **Framework**: Next.js 15.3.3 (App Router)
- **Base de Datos**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma 6.17.1
- **Autenticación**: NextAuth.js v5 (beta)
- **Hashing**: bcryptjs
- **TypeScript**: 5.x

---

## 🚀 Setup Inicial

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
# Base de Datos (Vercel Postgres)
POSTGRES_URL="postgresql://..."
POSTGRES_PRISMA_URL="postgresql://..."
POSTGRES_URL_NON_POOLING="postgresql://..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genera_un_secreto_aleatorio_aqui"
# Genera con: openssl rand -base64 32

# OpenAI (para reportes)
OPENAI_API_KEY="sk-..."
```

### 2. Configurar Vercel Postgres

#### Opción A: Vercel Dashboard (Recomendado)

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Click en pestaña "Storage"
3. Click "Create Database" → Selecciona "Postgres"
4. Nombra tu base de datos: `quest-db`
5. Selecciona región: preferiblemente cerca de tus usuarios
6. Click "Create"
7. Ve a la pestaña ".env.local" y copia todas las variables
8. Pega las variables en tu archivo `.env` local

#### Opción B: Vercel CLI

```bash
# Instalar Vercel CLI si no lo tienes
npm i -g vercel

# Conectar tu proyecto
vercel link

# Crear base de datos Postgres
vercel postgres create quest-db

# Descargar variables de entorno
vercel env pull .env
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Generar Cliente de Prisma

```bash
npx prisma generate
```

### 5. Ejecutar Migraciones

```bash
# Crear y aplicar migraciones
npx prisma migrate dev --name init

# O si estás en producción
npx prisma migrate deploy
```

### 6. Seed de Datos Iniciales

```bash
# Crear usuarios premium
npx tsx scripts/seed-users.ts

# Migrar encuestas desde JSON
npx tsx scripts/migrate-surveys.ts
```

---

## 📊 Estructura de la Base de Datos

### Tablas Principales

#### `users` - Usuarios del sistema
- `id`: ID único
- `email`: Email único
- `password`: Hash de contraseña
- `role`: ADMIN | GUEST | SUPERADMIN
- `guestExpiresAt`: Fecha de expiración para guests
- `premiumSince`: Fecha de inicio premium
- `premiumUntil`: Fecha de fin premium (null = sin límite)

#### `sessions` - Sesiones activas
- Gestión automática por NextAuth.js

#### `analytics_events` - Tracking de eventos
- `eventType`: Tipo de evento (LOGIN_SUCCESS, FILTER_CHANGE, etc.)
- `userId`, `userEmail`, `userRole`: Info del usuario
- `metadata`: JSON con datos adicionales
- `ipAddress`, `userAgent`: Info de la request

#### `surveys` - Datos de encuestas
- Todos los campos de encuestas electorales
- `date`, `pollster`, `scope`, `chamber`
- Porcentajes de partidos: LLA, FP, PU, UCR, PRO, FIT, etc.
- Metadata: sample, methodology, marginError

#### `generated_reports` - Historial de reportes
- `userId`, `reportType`, `province`
- `content`: Texto completo del reporte
- `tokensUsed`, `generationTime`: Métricas

---

## 🔐 API Endpoints

### Autenticación

```bash
# Login
POST /api/auth/callback/credentials
Body: { email, password }

# Logout
POST /api/auth/signout

# Session
GET /api/auth/session
```

### Usuarios

```bash
# Registrar nuevo usuario
POST /api/users/register
Body: { email, password, name?, role? }

# Upgrade a premium
POST /api/users/upgrade
Body: { premiumUntil? }
Headers: { Authorization: session }
```

### Analytics

```bash
# Registrar evento
POST /api/analytics/track
Body: { eventType, eventName?, metadata? }

# Ver estadísticas (solo ADMIN)
GET /api/analytics/stats?period=7d
Query: period = 1d | 7d | 30d | all
```

### Encuestas

```bash
# Listar encuestas
GET /api/surveys?chamber=DIPUTADOS&pollster=...&startDate=...

# Crear encuesta (solo ADMIN)
POST /api/surveys
Body: { date, pollster, scope, chamber, LLA, FP, ... }

# Obtener encuesta específica
GET /api/surveys/[id]

# Actualizar encuesta (solo ADMIN)
PUT /api/surveys/[id]

# Eliminar encuesta (solo ADMIN)
DELETE /api/surveys/[id]
```

### Reportes

```bash
# Generar reporte con IA
POST /api/generate-report
Body: { type: 'national' | 'provincial', province?, encuestasData }
Headers: { Authorization: session }
```

---

## 📈 Analytics - Eventos Trackeados

El sistema registra automáticamente:

### Eventos de Autenticación
- `LOGIN_SUCCESS`: Login exitoso (premium o guest)
- `LOGIN_FAILED`: Intento fallido
- `LOGOUT`: Cierre de sesión
- `GUEST_ACCESS`: Acceso como invitado

### Eventos de Interacción
- `PAGE_VIEW`: Vista de página
- `FILTER_CHANGE`: Cambio de filtro (chamber, pollster, province)
- `MAP_INTERACTION`: Click/hover en mapa
- `POLLSTER_COMPARISON`: Comparación de encuestadoras

### Eventos de Generación
- `REPORT_GENERATED`: Reporte generado
- `UPGRADE_ATTEMPT`: Intento de upgrade a premium

### Eventos de Error
- `ERROR`: Error en la aplicación

### Cómo Usarlo en el Frontend

```typescript
import { questAnalytics } from '@/lib/analytics';

// Login exitoso
questAnalytics.loginSuccess('user@email.com', false);

// Cambio de filtro
questAnalytics.filterChange('chamber', 'DIPUTADOS');

// Click en mapa
questAnalytics.mapClick('Buenos Aires');

// Reporte generado
questAnalytics.reportGenerated('national');

// Error
questAnalytics.error('Failed to load data', 'Dashboard');
```

---

## 🔧 Comandos Útiles de Prisma

```bash
# Ver datos en Prisma Studio
npx prisma studio

# Generar nuevo cliente después de cambios en schema
npx prisma generate

# Crear nueva migración
npx prisma migrate dev --name descripcion_del_cambio

# Aplicar migraciones en producción
npx prisma migrate deploy

# Resetear base de datos (¡CUIDADO!)
npx prisma migrate reset

# Validar schema
npx prisma validate

# Formatear schema
npx prisma format
```

---

## 🚢 Deployment en Vercel

### 1. Conectar Proyecto

```bash
vercel link
```

### 2. Configurar Variables de Entorno en Vercel

Ve a tu proyecto en Vercel → Settings → Environment Variables

Agrega todas las variables de `.env`:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `NEXTAUTH_URL` (tu dominio de producción)
- `NEXTAUTH_SECRET`
- `OPENAI_API_KEY`

### 3. Agregar Script de Build

En `package.json`, asegúrate de tener:

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build",
    "postinstall": "prisma generate"
  }
}
```

### 4. Deploy

```bash
vercel --prod
```

### 5. Ejecutar Seeds en Producción

```bash
# Después del primer deploy, ejecuta los seeds
vercel env pull .env.production
npx tsx scripts/seed-users.ts
npx tsx scripts/migrate-surveys.ts
```

---

## 📊 Dashboard de Analytics

Para ver estadísticas en tiempo real:

```bash
# Localmente
curl http://localhost:3000/api/analytics/stats?period=7d

# Producción
curl https://tu-dominio.com/api/analytics/stats?period=30d \
  -H "Cookie: next-auth.session-token=..."
```

### Métricas Disponibles

- **totalUsers**: Total de usuarios registrados
- **newUsers**: Usuarios nuevos en el período
- **usersByRole**: Distribución por rol (ADMIN/GUEST)
- **activeUsersCount**: Usuarios activos en el período
- **eventsByType**: Eventos agrupados por tipo
- **loginStats**: Login exitosos vs fallidos
- **reportsGenerated**: Total de reportes generados
- **reportsByType**: Reportes por tipo (nacional/provincial)
- **topUsers**: Top 10 usuarios más activos
- **topEvents**: Top 10 eventos más frecuentes

---

## 🔒 Seguridad

### Passwords
- Todas las contraseñas se hashean con bcryptjs (10 salt rounds)
- Nunca se devuelven en las respuestas de API

### Sesiones
- Manejo seguro con NextAuth.js
- JWT con tokens firmados
- Sesiones expiran automáticamente

### Autenticación de Endpoints
```typescript
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  // ... resto del código
}
```

### Rate Limiting
**TODO**: Implementar rate limiting para:
- Login attempts
- Report generation
- API calls

---

## 🐛 Troubleshooting

### Error: "Prisma Client could not connect"
```bash
# Verifica que las variables de entorno estén correctas
echo $POSTGRES_URL

# Regenera el cliente
npx prisma generate
```

### Error: "Migration failed"
```bash
# Resetea y vuelve a crear
npx prisma migrate reset
npx prisma migrate dev
```

### Error: "NextAuth session undefined"
```bash
# Verifica que NEXTAUTH_SECRET esté configurado
echo $NEXTAUTH_SECRET

# Genera uno nuevo si es necesario
openssl rand -base64 32
```

### Base de datos no se actualiza
```bash
# Asegúrate de ejecutar las migraciones
npx prisma migrate deploy

# Y regenerar el cliente
npx prisma generate
```

---

## 📝 Próximos Pasos (Roadmap)

### Corto Plazo
- [ ] Implementar rate limiting
- [ ] Agregar email service (Resend/SendGrid)
- [ ] Sistema de notificaciones
- [ ] Panel de administración

### Mediano Plazo
- [ ] Integración con Stripe para pagos
- [ ] Webhooks para actualización de encuestas
- [ ] Exportación de reportes a PDF
- [ ] API pública con API keys

### Largo Plazo
- [ ] Sistema de alertas personalizadas
- [ ] Machine learning para predicciones
- [ ] App móvil con React Native
- [ ] Integración con redes sociales

---

## 📞 Contacto y Soporte

Para preguntas o issues:
- Email: juanulian@quest.ar
- GitHub: [Crear issue en el repo]

---

## 📄 Licencia

Propiedad de PLUS BI - Todos los derechos reservados.
