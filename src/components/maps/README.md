# Mapa de Argentina - React Simple Maps

Este componente muestra un mapa interactivo de Argentina con todas sus provincias usando `react-simple-maps 3.0.0`.

## Características

- Mapa vectorial de Argentina con 24 provincias
- Zoom in/out y reset
- Tooltips al pasar el mouse sobre cada provincia
- Click handler personalizable para cada provincia
- Colores y estilos configurables
- Compatible con TypeScript
- Responsive y optimizado para Next.js

## Uso Básico

```tsx
import { ArgentinaMap } from "@/components/maps/argentina-map";

export default function MyPage() {
  return (
    <div>
      <ArgentinaMap />
    </div>
  );
}
```

## Uso Avanzado

```tsx
import { ArgentinaMap } from "@/components/maps/argentina-map";

export default function MyPage() {
  const handleProvinceClick = (provinceName: string, provinceData: any) => {
    console.log(`Clickeaste en ${provinceName}`, provinceData);
    // Aquí puedes hacer lo que quieras con los datos de la provincia
  };

  return (
    <ArgentinaMap
      width={800}
      height={600}
      center={[-63.6167, -38.4161]}
      scale={800}
      currency="$"
      onProvinceClick={handleProvinceClick}
    />
  );
}
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `width` | `number` | `800` | Ancho del mapa en píxeles |
| `height` | `number` | `600` | Alto del mapa en píxeles |
| `center` | `[number, number]` | `[-63.6167, -38.4161]` | Coordenadas del centro del mapa [longitud, latitud] |
| `scale` | `number` | `800` | Factor de escala del mapa |
| `currency` | `string` | `"$"` | Símbolo de moneda para mostrar en los valores |
| `onProvinceClick` | `(name: string, data: ProvinceProperties) => void` | `undefined` | Callback cuando se hace click en una provincia |

## Datos de las Provincias

Cada provincia tiene las siguientes propiedades:

```typescript
interface ProvinceProperties {
  GID_0: string;        // ID del país
  NAME_0: string;       // Nombre del país ("Argentina")
  GID_1: string;        // ID único de la provincia
  NAME: string;         // Nombre de la provincia
  COLOR: string;        // Color hex de la provincia
  NL_NAME_1: string;    // Nombre alternativo
  TYPE_1: string;       // Tipo (ej: "Provincia", "Distrito Federal")
  ENGTYPE_1: string;    // Tipo en inglés
  CC_1: string;         // Código de país
  HASC_1: string;       // Código HASC
  VALUE: string;        // Valor asociado (ej: población)
}
```

## Personalización

### Cambiar los colores del mapa

Editá el archivo `src/constants/argentina-map.ts`:

```typescript
export const STYLES_MAP = {
  default: {
    fill: "#ECEFF1",      // Color por defecto
    stroke: "#607D8B",    // Color del borde
    strokeWidth: 0.75,
    outline: "none",
  },
  pressed: {
    fill: "#FF5722",      // Color al hacer click
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
  hover: {
    fill: "#607D8B",      // Color al pasar el mouse
    stroke: "#607D8B",
    strokeWidth: 0.75,
    outline: "none",
  },
};
```

### Actualizar los datos de las provincias

Los datos de las provincias están en `src/constants/argentina-map.ts` en el objeto `MAP_JSON`. Cada provincia tiene un objeto `properties` que podés modificar:

```typescript
{
  arcs: [[2, 3, 4, 5, 6, 7, 8, 9]],
  type: "Polygon",
  properties: {
    NAME: "Buenos Aires",
    VALUE: "16666000",  // <- Podés cambiar este valor
    // ... más propiedades
  }
}
```

## Ejemplo Completo

Ver el ejemplo completo en `src/app/map-demo/page.tsx` que incluye:

- Mapa interactivo
- Panel de información de la provincia seleccionada
- Controles de zoom
- Tooltips

## Dependencias

- `react-simple-maps`: ^3.0.0
- `topojson-client`: ^3.1.0
- `d3-geo`: ^3.1.1
- `react-tooltip`: ^5.27.1

Todas estas dependencias ya están instaladas en el proyecto.

## Notas

- El mapa usa la proyección Mercator por defecto
- Los datos de topología están en formato TopoJSON
- El componente es "client-side" (`"use client"` en Next.js)
- Compatible con React 18+
