# Quest - Migración del Frontend

## 🎯 Objetivo

Migrar el frontend de Quest para usar el backend completo (NextAuth + Prisma + APIs).

---

## 📊 Estado Actual vs. Nuevo

| Componente | Actual (Hardcoded) | Nuevo (Backend) |
|------------|-------------------|-----------------|
| **Autenticación** | `auth-context.tsx` + localStorage | NextAuth.js + Supabase |
| **Datos de encuestas** | JSON estático | API `/api/surveys` |
| **Usuarios** | 4 hardcoded en código | Base de datos PostgreSQL |
| **Analytics** | No existe | Sistema completo de tracking |
| **Carga de datos** | Manual (editar JSON) | UI para SUPERADMIN |

---

## ✅ Ya Implementado (Backend)

1. ✅ Base de datos PostgreSQL (Supabase)
2. ✅ Schema de Prisma con 6 tablas
3. ✅ NextAuth.js configurado
4. ✅ 12 API endpoints:
   - `/api/auth/*` - Autenticación
   - `/api/users/*` - Gestión de usuarios
   - `/api/analytics/*` - Tracking y estadísticas
   - `/api/surveys/*` - CRUD de encuestas
   - `/api/surveys/bulk` - Carga masiva ⭐ NUEVO
   - `/api/generate-report` - Generación de reportes
5. ✅ Sistema de roles (ADMIN, GUEST, SUPERADMIN)
6. ✅ 7 usuarios:
   - juanulian@quest.ar (SUPERADMIN) - puede cargar encuestas
   - cristianulian@quest.ar (SUPERADMIN) - puede cargar encuestas
   - ctoller@quest.ar (ADMIN)
   - emelchiori@quest.ar (ADMIN)
   - jinsaurralde@quest.ar (ADMIN)
   - agostog@quest.ar (ADMIN) - reportes personalizados
   - guest@quest.ar (GUEST)

---

## 🔄 Migración Paso a Paso

### Fase 1: Autenticación (CRÍTICO)

#### Archivos a Modificar:

1. **`src/contexts/auth-context.tsx`** → Reemplazar por NextAuth
2. **`src/app/products/quest/login/page.tsx`** → Usar `signIn` de NextAuth
3. **`src/app/products/quest/layout.tsx`** → Agregar `SessionProvider`

#### Cambios:

**Antes**:
```typescript
// auth-context.tsx
const PREMIUM_USERS = [/* hardcoded */];
const login = (email, password) => {
  const found = PREMIUM_USERS.find(u => u.email === email && u.password === password);
  // ...
}
```

**Después**:
```typescript
// usar NextAuth
import { useSession, signIn, signOut } from 'next-auth/react';

const { data: session, status } = useSession();
const isPaidUser = session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPERADMIN';
```

---

### Fase 2: Datos de Encuestas

#### Archivos a Modificar:

1. **`src/app/products/quest/dashboard/page.tsx`**
   - Cambiar `fetch('/data/encuestas_argentina_2025.json')`
   - Por `fetch('/api/surveys')`

**Antes**:
```typescript
const response = await fetch('/data/encuestas_argentina_2025.json');
const data: EncuestaData[] = await response.json();
setEncuestasData(data);
```

**Después**:
```typescript
const response = await fetch('/api/surveys');
const { surveys } = await response.json();
setEncuestasData(surveys);
```

---

### Fase 3: Analytics (Tracking)

#### Agregar tracking en componentes:

```typescript
import { questAnalytics } from '@/lib/analytics';

// En login exitoso
questAnalytics.loginSuccess(session.user.email, session.user.role === 'GUEST');

// Al cambiar filtro
questAnalytics.filterChange('chamber', selectedChamber);

// Al generar reporte
questAnalytics.reportGenerated(type, province);
```

---

### Fase 4: UI de Carga de Encuestas (SUPERADMIN)

#### Crear nuevo componente:

**`src/components/quest/SurveyUploader.tsx`**

Funcionalidades:
- ✅ Upload de archivo Excel (.xlsx)
- ✅ Paste de texto plano (formato separado por `|`)
- ✅ Solo visible para SUPERADMIN (juanulian y cristianulian)
- ✅ Preview antes de guardar
- ✅ Feedback de éxito/error

**Formato de texto plano**:
```
fecha|encuestadora|scope|provincia|camara|LLA|FP|PU|UCR|PRO|FIT|Provincial|Others|muestra|metodologia|margen
2025-10-16|DC Consultores|provincial|Buenos Aires|diputados|38.7|41.9|4.2|||3.0|9.2||1780||2.5
2025-10-15|Tendencias|provincial|CABA|senadores|43.8|26.3||5.7|4.2|7.9|3.4|2.1|823||3.4
```

**Formato Excel**:
Columnas: `fecha`, `encuestadora`, `ambito`, `provincia`, `camara`, `LLA`, `FP`, `PU`, `UCR`, `PRO`, `FIT`, `Provincial`, `Otros`, `muestra`, `metodologia`, `margen_error`

---

## 🚀 Plan de Implementación

### Prioridad ALTA (Crítico para funcionamiento)

1. ✅ **Migrar autenticación**
   - Reemplazar auth-context por NextAuth
   - Actualizar login page
   - Agregar SessionProvider
   - Tiempo estimado: 30 min

2. ✅ **Migrar datos de encuestas**
   - Cambiar fetch de JSON a API
   - Actualizar tipos si es necesario
   - Tiempo estimado: 15 min

3. ✅ **Componente de carga** (solo SUPERADMIN)
   - Crear SurveyUploader
   - Integrar en dashboard
   - Tiempo estimado: 45 min

### Prioridad MEDIA (Mejoras)

4. **Agregar tracking de analytics**
   - En login/logout
   - En cambios de filtros
   - En generación de reportes
   - Tiempo estimado: 20 min

5. **UI para ver analytics**
   - Dashboard simple de métricas
   - Solo para SUPERADMIN
   - Tiempo estimado: 30 min

### Prioridad BAJA (Opcionales)

6. **Panel de administración**
   - Gestionar usuarios
   - Ver reportes generados
   - Tiempo estimado: 1 hora

7. **Optimizaciones**
   - Caché de encuestas
   - Lazy loading
   - Tiempo estimado: 30 min

---

## 📝 Ejemplo de Uso - Carga de Encuestas

### Opción 1: Texto Plano (copiar/pegar)

```typescript
// Usuario copia esto:
2025-10-16|Nueva Encuestadora|provincial|Córdoba|diputados|35.2|19.5|18.7|4.2||4.6|22.3|4.1|1200|Telefónica|3.0

// Sistema lo convierte automáticamente a:
{
  date: "2025-10-16",
  pollster: "Nueva Encuestadora",
  scope: "provincial",
  province: "Córdoba",
  chamber: "diputados",
  LLA: 35.2,
  FP: 19.5,
  PU: 18.7,
  UCR: 4.2,
  FIT: 4.6,
  Provincial: 22.3,
  Others: 4.1,
  sample: 1200,
  methodology: "Telefónica",
  marginError: 3.0
}
```

### Opción 2: Archivo Excel

Usuario sube archivo `.xlsx` con las columnas correctas → Sistema parsea automáticamente.

---

## 🔐 Seguridad

### Control de Acceso

- ✅ Carga de encuestas: Solo `SUPERADMIN` (juanulian, cristianulian)
- ✅ Ver analytics: Solo `ADMIN` y `SUPERADMIN`
- ✅ Generar reportes: Solo `ADMIN` y `SUPERADMIN`
- ✅ Dashboard: Todos los autenticados
- ✅ Filtros premium: Solo `ADMIN` y `SUPERADMIN`

### Backend Validation

- ✅ Todos los endpoints verifican `session`
- ✅ Role-based access control en cada API
- ✅ Validación de datos antes de guardar en DB

---

## 📦 Dependencias Agregadas

```json
{
  "next-auth": "^5.0.0-beta.29",
  "@prisma/client": "^6.17.1",
  "prisma": "^6.17.1",
  "bcryptjs": "^3.0.2",
  "@vercel/postgres": "^0.10.0",
  "xlsx": "^0.18.5"  // ⭐ NUEVO para Excel
}
```

---

## 🎯 Checklist de Migración

### Backend
- [x] Base de datos configurada
- [x] Schema de Prisma creado
- [x] Usuarios migrados
- [x] Encuestas migradas
- [x] API endpoints creados
- [x] NextAuth configurado
- [x] Sistema de analytics
- [x] API de carga masiva

### Frontend
- [ ] Reemplazar auth-context por NextAuth
- [ ] Actualizar login page
- [ ] Agregar SessionProvider
- [ ] Cambiar fetch de JSON a API
- [ ] Crear componente SurveyUploader
- [ ] Agregar tracking de analytics
- [ ] Actualizar UI para mostrar rol del usuario
- [ ] Testing completo

---

## 🚦 Próximo Paso

**EMPEZAR CON**: Migrar autenticación (Fase 1)

**Comando para probar**:
```bash
npm run dev
# Login con: juanulian@quest.ar / Juani.2025
# O: cristianulian@quest.ar / Crist1@nUl!2025#Qst
```

---

Última actualización: 19 de octubre de 2025
