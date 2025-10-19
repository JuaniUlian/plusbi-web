# Provincias sin Datos de Encuestas

## ⚠️ Provincias que aparecen en BLANCO en el mapa

Las siguientes provincias NO tienen datos de encuestas en la base de datos:

1. **Catamarca** - 0 encuestas
2. **Corrientes** - 0 encuestas
3. **Formosa** - 0 encuestas
4. **La Rioja** - 0 encuestas
5. **San Luis** - 0 encuestas
6. **Santa Cruz** - 0 encuestas

## ✅ Provincias CON datos (18 provincias)

| Provincia | Cantidad de Encuestas |
|-----------|----------------------|
| Buenos Aires | 10 |
| CABA | 10 |
| Santa Fe | 8 |
| Córdoba | 7 |
| Tucumán | 6 |
| Entre Ríos | 4 |
| Mendoza | 4 |
| Neuquén | 2 |
| San Juan | 2 |
| Tierra del Fuego | 2 |
| Chaco | 1 |
| Chubut | 1 |
| Jujuy | 1 |
| La Pampa | 1 |
| Misiones | 1 |
| Río Negro | 1 |
| Salta | 1 |
| Santiago del Estero | 1 |

**Total**: 63 encuestas provinciales

## 📝 Notas

### Normalización realizada:
- "Ciudad Autónoma de Buenos Aires" → "CABA" (8 encuestas migradas)
- Ahora CABA tiene 10 encuestas totales (2 originales + 8 migradas)

### Para agregar datos de las provincias faltantes:

Usar el componente **SurveyUploader** (solo visible para SUPERADMIN):

1. Login como `juanulian@quest.ar` o `cristianulian@quest.ar`
2. Click en botón "Cargar Encuestas" en el header
3. Ingresar datos en formato texto plano o Excel

**Formato texto** (pipe-delimited):
```
2025-10-15|Encuestadora X|Catamarca|diputados|1500|45.2|32.8|5.1|null|null|2.5|8.4|6.0
```

**Campos**: `fecha|encuestadora|provincia|cámara|muestra|LLA|FP|PU|UCR|PRO|FIT|Provincial|Otros`

### Razones posibles de falta de datos:

1. **Provincias pequeñas**: Menos encuestadoras hacen relevamientos locales
2. **Costo**: Encuestas provinciales son más caras que las nacionales
3. **Elecciones desdobladas**: Algunas provincias ya votaron (Corrientes: 31/ago, San Luis: 11/mayo)
4. **Poca competitividad**: Algunas provincias tienen oficialismo muy consolidado

## 🔍 Recomendaciones

Para mejorar la cobertura del mapa:

1. **Buscar encuestas locales** de medios provinciales
2. **Contactar encuestadoras regionales** que operen en esas provincias
3. **Usar proyecciones nacionales** como aproximación temporal
4. **Marcar en el mapa** las provincias sin datos con un mensaje claro

### Posible mensaje en el mapa:
```
"Provincia sin datos de encuestas disponibles.
Click para generar proyección basada en contexto nacional."
```
