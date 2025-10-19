# 🚀 Configuración Rápida de Vercel para Quest

## ⚠️ El error 403/500 es porque faltan variables de entorno en Vercel

---

## 📍 PASO 1: Ir a Vercel Dashboard

1. Abrí: https://vercel.com/dashboard
2. Seleccioná tu proyecto **plusbi-web**
3. Click en **Settings** (menú lateral izquierdo)
4. Click en **Environment Variables**

---

## 📍 PASO 2: Agregar Variables Faltantes

Estas son las variables que **seguramente falten**:

### ✅ NEXTAUTH_SECRET (CRÍTICA)

**Name:** `NEXTAUTH_SECRET`

**Value:** (copiá este valor generado para vos)
```
d8ipyd+Z+5SNx9aXU1Loel19DoGifLzBPlGNEIWFgCA=
```

**Environments:**
- ✅ Production
- ✅ Preview
- ✅ Development

---

### ✅ NEXTAUTH_URL (CRÍTICA)

**Name:** `NEXTAUTH_URL`

**Value para Production:**
```
https://plusbi-web-git-main-juaniulians-projects.vercel.app
```

**Environments:**
- ✅ Production
- ✅ Preview

---

## 📍 PASO 3: Verificar Variables de Database

Asegurate que estas **YA estén** en Vercel (las copiaste antes):

- ✅ `POSTGRES_URL`
- ✅ `POSTGRES_PRISMA_URL`
- ✅ `POSTGRES_URL_NON_POOLING`
- ✅ `POSTGRES_USER`
- ✅ `POSTGRES_HOST`
- ✅ `POSTGRES_PASSWORD`
- ✅ `POSTGRES_DATABASE`

Si alguna falta, copiala desde tu `.env` local.

---

## 📍 PASO 4: Verificar OpenAI

- ✅ `OPENAI_API_KEY`

Si falta, copiala desde tu `.env` local.

---

## 📍 PASO 5: Redeploy

**IMPORTANTE:** Después de agregar variables, tenés que redeplegar:

1. Ve a **Deployments** (tab superior)
2. Click en los **3 puntos** del último deployment
3. Click **Redeploy**
4. Esperá 1-2 minutos

---

## 📍 PASO 6: Verificar que funcione

Una vez redeplegado:

1. **Probar API:**
   - Abrí: https://plusbi-web-git-main-juaniulians-projects.vercel.app/api/surveys
   - Deberías ver JSON con 76 encuestas

2. **Probar Login:**
   - Abrí: https://plusbi-web-git-main-juaniulians-projects.vercel.app/products/quest/login
   - Intentá login con:
     - Email: `agostog@quest.ar`
     - Password: (la que configuraste)

---

## 🎯 Checklist Rápido:

- [ ] Agregué NEXTAUTH_SECRET en Vercel
- [ ] Agregué NEXTAUTH_URL en Vercel
- [ ] Verifiqué que existan todas las variables POSTGRES_*
- [ ] Verifiqué que exista OPENAI_API_KEY
- [ ] Hice **Redeploy**
- [ ] Probé el API y funciona
- [ ] Probé login y funciona

---

## 💡 Si seguís con error:

1. **Ver logs en Vercel:**
   - Deployments → Click en el deployment → Runtime Logs
   - Buscá el error específico

2. **Revisar que las URLs sean correctas:**
   - La NEXTAUTH_URL debe coincidir EXACTAMENTE con tu dominio de Vercel
   - Sin trailing slash `/` al final

3. **Contactame** mostrándome:
   - Screenshot de las Environment Variables en Vercel
   - El error específico de los logs
