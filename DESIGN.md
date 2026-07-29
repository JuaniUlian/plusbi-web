# PLUS BI — Sistema de Diseño (rediseño 2026)

Fuente de verdad del diseño del sitio. Toda página nueva o modificada debe respetar este documento.

## Principios

1. **Apple-style claro**: fondo neutro cálido, mucho aire, tipografía grande y confiada, sombras suaves. Nada de fotos stock de fondo.
2. **El producto es el protagonista**: screenshots reales en marcos de browser, no ilustraciones genéricas.
3. **Copy Sinek (why → how → what)**: cada página arranca desde el dolor de la persona (el funcionario, la auditora), después la creencia, al final el producto. Nunca specs primero.
4. **Un acento por producto**: el color identifica al producto en todo el sitio (cards, badges, headers, links).
5. **Anti-genérico**: layouts asimétricos, bloques alternados, jerarquía desigual (1 card grande + 2 chicas), números grandes como identidad visual. Prohibido el grid uniforme de features con ícono centrado arriba.
6. **Accesible por contrato**: touch targets ≥44px, contraste AA calculado, `prefers-reduced-motion` respetado, labels aria en español, focus visible.

## Color

### Base (neutra, cálida)
| Token | Valor | Uso |
|---|---|---|
| `background` | `hsl(40 30% 97%)` (crema #FAF8F4) | fondo global |
| `foreground` | `hsl(218 61% 15%)` (tinta navy #0F2140) | texto |
| `card` | `hsl(0 0% 100%)` | superficies |
| `muted-foreground` | `hsl(220 15% 42%)` | texto secundario (AA sobre background) |
| `border` | `hsl(40 18% 88%)` | bordes hairline |
| `primary` | `hsl(218 61% 19%)` (navy #13294F) | botones primarios, marca PLUS BI |

### Acentos por producto
| Producto | Token | Valor | Notas |
|---|---|---|---|
| **Mila** | `mila` | `hsl(218 61% 19%)` navy + `mila-accent hsl(20 80% 57%)` terracota #E8713A | hereda la identidad del deck y la app real |
| **Quest** | `quest` | `hsl(24 94% 50%)` naranja | pedido explícito |
| **SEE** | `see` | `hsl(152 55% 32%)` verde | continuidad con la página actual |

Regla: el acento se usa para badge, ícono, links y detalles del producto — nunca como fondo de bloques de texto largo. Chequear AA si lleva texto encima.

## Tipografía

- **Display / headings**: `Archivo` (700–800, tracking -0.02em). Misma familia que el deck de Mila.
- **Body**: `Archivo` (400–500).
- **Serif editorial**: `Fraunces` — solo para momentos narrativos (citas, la historia de Marta, headings de la página de Mila, espejando la app real que usa serif).
- **Números grandes (KPIs)**: Archivo 800, tabular-nums, tamaño ≥ text-5xl.
- Escala: h1 `text-5xl md:text-7xl`, h2 `text-3xl md:text-5xl`, body `text-base md:text-lg`, eyebrow `text-sm tracking-[0.2em] uppercase font-semibold`.

## Superficies y glass

- `glass`: `bg-white/65 backdrop-blur-xl border border-black/5 shadow-[0_8px_40px_rgba(15,33,64,0.08)]` — sobre fondos con mesh.
- `glass-dark`: `bg-white/10 backdrop-blur-xl border border-white/15` — sobre bloques navy (página Mila, deck).
- Cards: `rounded-2xl` (radius base 1rem), sombra en dos capas (hairline + ambiente suave).
- Fondos de sección: crema plano, o **mesh sutil** (radial-gradients del acento del producto al 8–16% + crema). Nunca fotos.

## Componentes canónicos

- `PageHero`: eyebrow (badge del producto) → h1 → subtítulo → CTA. Orden fijo, siempre.
- `ProductCard`: única implementación para home y /products. Ícono lucide en chip redondeado del color del producto, nombre, tag, descripción, link absoluto desde constante central.
- `BrowserFrame`: marco de browser (barra con 3 puntos + url) para todo screenshot de producto.
- `ContactSection`: formulario corto (nombre, organismo, mensaje) + email visible copiable. Nunca `mailto:` como único canal.
- Íconos: **lucide-react únicamente**, stroke 2, dentro de chip `rounded-xl` con `bg-{acento}/10 text-{acento}`.
- Carruseles: flechas ≥44px, autoplay solo si `prefers-reduced-motion` no está activo, con dots indicadores.

## Motion

- Un solo patrón de reveal al scroll: fade + translate-y 12px, 400ms ease-out, envuelto en `motion-safe:`.
- `motion-safe:scroll-smooth` en `<html>` (nunca incondicional).
- Hover en cards: `translateY(-2px)` + sombra, 200ms.

## Copy — líneas rojas (de mentorías CAF)

- SIGEN, AGCBA, universidades = "en uso en" / "implementaciones", **nunca "clientes"**.
- **Sin precios en páginas públicas** (pricing solo en /mila/aliados, noindex).
- "+10M documentos" se atribuye a **PLUS BI**, no a Mila.
- 67% / 76% se presentan como outputs dentro de la cadena de impacto (input → output → outcome → confianza en el Estado).
- Top 20 CAF / Corrupción Cero = origen, no validación central.
- **Omitir** detección de licitaciones "dirigidas" en todo copy público.
- Vuro no existe más en el sitio.
