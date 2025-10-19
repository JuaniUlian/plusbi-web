# Verificación de Variables de Entorno en Vercel

## 🔍 Cómo revisar las variables en Vercel Dashboard

1. **Ir a tu proyecto en Vercel:**
   - https://vercel.com/dashboard
   - Selecciona el proyecto `plusbi-web` (o como se llame tu proyecto)

2. **Navegar a Settings → Environment Variables:**
   - En el menú lateral, click en "Settings"
   - Luego click en "Environment Variables"

3. **Verificar que existan TODAS estas variables:**

### ✅ Variables Requeridas

#### Database (Supabase)
```
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE
```

#### NextAuth
```
NEXTAUTH_URL
NEXTAUTH_SECRET
```

#### OpenAI (para generación de reportes)
```
OPENAI_API_KEY
```

---

## 🔧 Variables que probablemente FALTEN en Vercel:

### 1. NEXTAUTH_URL
**Valor para Production:**
```
https://plusbi-web-git-main-juaniulians-projects.vercel.app
```
(o tu dominio custom si tenés uno)

**Valor para Preview:**
```
https://plusbi-web-git-main-juaniulians-projects.vercel.app
```

### 2. NEXTAUTH_SECRET
**Generar uno nuevo:**
```bash
openssl rand -base64 32
```

Ejemplo de output: `xK9mP2nQ7rS5tU8vW1xY3zA4bC6dE9fG0hI2jK5lM7nO=`

---

## 📝 Cómo agregar variables en Vercel:

1. En la página de Environment Variables, click **"Add New"**
2. Ingresa el **Name** (ej: `NEXTAUTH_SECRET`)
3. Ingresa el **Value** (el secret generado)
4. Selecciona los environments:
   - ✅ Production
   - ✅ Preview
   - ✅ Development (opcional)
5. Click **Save**

---

## 🚨 Variables Críticas que Seguro Faltan:

Basado en tu error 403/500, estas son las que probablemente falten:

### NEXTAUTH_SECRET
Si esta falta, NextAuth no puede funcionar.

**Acción:** Generala y agregala:
```bash
openssl rand -base64 32
```

### NEXTAUTH_URL
Si esta falta o es incorrecta, la autenticación falla.

**Acción:** Usa tu URL de Vercel:
```
https://plusbi-web-git-main-juaniulians-projects.vercel.app
```

---

## ✅ Verificación Post-Configuración:

Después de agregar las variables:

1. **Redeploy** el proyecto (no es automático):
   - Ve a "Deployments"
   - Click en los 3 puntos del último deployment
   - Click "Redeploy"

2. **Verificar el API** una vez deployado:
   ```bash
   curl https://tu-dominio.vercel.app/api/surveys
   ```

   Debería devolver: `{"success":true,"surveys":[...],"count":76}`

3. **Probar login:**
   - Ir a: https://tu-dominio.vercel.app/products/quest/login
   - Intentar login con: `agostog@quest.ar` / la contraseña que tengas

---

## 🔍 Comando rápido para ver variables locales:

```bash
cat .env | grep -E "^(NEXTAUTH_|POSTGRES_|OPENAI_)" | sed 's/=.*/=***/'
```

Esto muestra qué variables tenés localmente (sin mostrar los valores).

---

## 📋 Checklist Final:

- [ ] NEXTAUTH_SECRET agregada en Vercel
- [ ] NEXTAUTH_URL agregada en Vercel
- [ ] Todas las variables POSTGRES_* agregadas
- [ ] OPENAI_API_KEY agregada
- [ ] Redeploy ejecutado
- [ ] API /api/surveys responde correctamente
- [ ] Login funciona

---

## 💡 Alternativa: Usar Vercel CLI

Si preferís usar el CLI:

```bash
# Login
vercel login

# Listar variables actuales
vercel env ls

# Agregar una variable
vercel env add NEXTAUTH_SECRET

# Pull variables al .env.local
vercel env pull .env.local
```
