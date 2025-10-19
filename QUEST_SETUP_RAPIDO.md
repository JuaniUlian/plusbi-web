# Quest Backend - Setup Rápido desde Supabase

## 📍 Estás Aquí: Ya creaste la base de datos en Supabase ✅

---

## 🚀 Pasos Siguientes (5 minutos)

### Paso 1: Copiar Variables de Entorno

En la pantalla de Supabase que tienes abierta:

1. **Click en "Copy Snippet"** (botón arriba a la derecha)
2. Abre el archivo `.env` en la raíz de tu proyecto
3. Pega las variables que copiaste

Tu archivo `.env` debería verse así:

```bash
POSTGRES_URL="postgresql://postgres.xxx:xxx@xxx.supabase.co:5432/postgres"
POSTGRES_PRISMA_URL="postgresql://postgres.xxx:xxx@xxx.supabase.co:6543/postgres?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgresql://postgres.xxx:xxx@xxx.supabase.co:5432/postgres"
SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_JWT_SECRET="xxx"
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxx"
```

4. **Agrega estas variables adicionales** al final del archivo `.env`:

```bash
# NextAuth (genera el secret con: openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="pon_aqui_un_secreto_aleatorio_32_caracteres"

# OpenAI (ya la tienes configurada, solo verifica que esté)
OPENAI_API_KEY="sk-..."
```

---

### Paso 2: Generar el Secret de NextAuth

Abre tu terminal y ejecuta:

```bash
openssl rand -base64 32
```

Copia el resultado y pégalo en `NEXTAUTH_SECRET` en tu `.env`

---

### Paso 3: Ejecutar las Migraciones

En tu terminal, ejecuta estos comandos uno por uno:

```bash
# 1. Generar el cliente de Prisma
npx prisma generate

# 2. Crear las tablas en la base de datos
npx prisma migrate dev --name init
```

Si te pregunta algo, responde "yes" o presiona Enter.

---

### Paso 4: Cargar Datos Iniciales

```bash
# Crear los 4 usuarios premium y migrar las encuestas
npm run db:seed
```

Este comando:
- ✅ Crea los 4 usuarios premium (juanulian, ctoller, emelchiori, jinsaurralde)
- ✅ Migra todas las encuestas del JSON a la base de datos

---

### Paso 5: Verificar que Funcionó

```bash
# Abrir Prisma Studio para ver tus datos
npm run db:studio
```

Se abrirá en tu navegador (http://localhost:5555) y podrás ver:
- Tabla `users` con 5 usuarios (4 premium + 1 guest)
- Tabla `surveys` con todas las encuestas
- Resto de tablas vacías (se llenarán con el uso)

---

## ✅ ¡Listo! Ya Tienes el Backend Funcionando

Ahora puedes:

```bash
# Iniciar tu aplicación
npm run dev
```

---

## 🔧 Comandos Útiles

```bash
npm run db:studio          # Ver la base de datos (navegador)
npm run db:seed:users      # Solo crear usuarios
npm run db:seed:surveys    # Solo migrar encuestas
npx prisma migrate dev     # Crear nueva migración
npx prisma generate        # Regenerar cliente Prisma
```

---

## 🐛 Si Algo Sale Mal

### Error: "Can't reach database server"
**Solución**: Verifica que las variables `POSTGRES_URL` y `POSTGRES_PRISMA_URL` estén correctas en `.env`

### Error: "Invalid NEXTAUTH_SECRET"
**Solución**: Ejecuta `openssl rand -base64 32` y copia el resultado a `NEXTAUTH_SECRET`

### Error: "Migration failed"
**Solución**:
```bash
npx prisma migrate reset  # ⚠️ Esto borra todo
npx prisma migrate dev --name init
npm run db:seed
```

### Error al ejecutar seeds
**Solución**: Asegúrate de que las migraciones se ejecutaron primero:
```bash
npx prisma migrate deploy
npm run db:seed
```

---

## 📊 Probar el Analytics

Una vez que esté corriendo (`npm run dev`), puedes probar:

### Ver Estadísticas
Abre tu navegador e ingresa a:
```
http://localhost:3000/api/analytics/stats?period=7d
```

**Necesitarás estar autenticado como ADMIN para ver las estadísticas.**

---

## 🎯 Próximos Pasos

1. ✅ **Setup completo** (acabas de hacerlo)
2. 🔄 **Migrar el frontend** para usar el nuevo backend
3. 🚀 **Deploy a producción**

Para migrar el frontend, necesitarás:
- Reemplazar `auth-context.tsx` para usar NextAuth
- Cambiar las llamadas al JSON por llamadas a `/api/surveys`
- Agregar tracking de analytics en componentes

**¿Te ayudo con eso ahora?**

---

## 📖 Documentación Completa

Si necesitas más detalles:
- **Guía Completa**: [QUEST_BACKEND_SETUP.md](QUEST_BACKEND_SETUP.md)
- **Resumen Técnico**: [QUEST_RESUMEN_IMPLEMENTACION.md](QUEST_RESUMEN_IMPLEMENTACION.md)
