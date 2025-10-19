/**
 * Mapeo de partidos provinciales por provincia
 * Basado en información electoral 2025 Argentina
 *
 * Fuentes:
 * - Wikipedia - Elecciones provinciales de Argentina de 2025
 * - Infobae - Listas oficiales elecciones legislativas 2025
 * - Tribunal Electoral Misiones
 */

export const PROVINCIAL_PARTIES: { [province: string]: string } = {
  // Buenos Aires
  'Buenos Aires': 'Fuerza Patria (provincial)',

  // CABA
  'CABA': 'PRO (CABA)',
  'Ciudad Autónoma de Buenos Aires': 'PRO (CABA)',

  // Córdoba
  'Córdoba': 'Hacemos por Córdoba',

  // Santa Fe
  'Santa Fe': 'Unidos para Cambiar Santa Fe',

  // Mendoza
  'Mendoza': 'Cambia Mendoza (UCR)',

  // Tucumán
  'Tucumán': 'Fuerza Republicana',

  // Salta
  'Salta': 'Primero los Salteños',

  // Entre Ríos
  'Entre Ríos': 'Juntos por Entre Ríos',

  // Misiones - Frente Renovador de la Concordia (Rovira)
  'Misiones': 'Frente Renovador (Misiones)',

  // Chaco
  'Chaco': 'UCR Chaco',

  // Corrientes - Vamos Corrientes (Valdés)
  'Corrientes': 'Vamos Corrientes',

  // Santiago del Estero
  'Santiago del Estero': 'Frente Cívico',

  // San Juan
  'San Juan': 'Producción y Trabajo',

  // Jujuy - Cambia Jujuy (Morales/Sadir)
  'Jujuy': 'Cambia Jujuy',

  // Río Negro
  'Río Negro': 'Juntos Somos Río Negro',

  // Neuquén - Movimiento Popular Neuquino (aunque perdió en 2023, sigue siendo referente)
  'Neuquén': 'MPN / La Neuquinidad',

  // Formosa
  'Formosa': 'Frente de Todos Formosa',

  // Chubut
  'Chubut': 'Chubut al Frente',

  // San Luis - Ahora San Luis (Poggi)
  'San Luis': 'Ahora San Luis',

  // Catamarca
  'Catamarca': 'Frente de Todos Catamarca',

  // La Rioja
  'La Rioja': 'Frente de Todos La Rioja',

  // La Pampa
  'La Pampa': 'Justicialismo Pampeano',

  // Santa Cruz
  'Santa Cruz': 'Frente para la Victoria',

  // Tierra del Fuego
  'Tierra del Fuego': 'Frente de Todos TDF',
};

/**
 * Obtiene el nombre del partido provincial para una provincia dada
 * @param province - Nombre de la provincia
 * @returns Nombre del partido provincial dominante o "Provincial" si no se encuentra
 */
export function getProvincialPartyName(province: string | null): string {
  if (!province) return 'Provincial';
  return PROVINCIAL_PARTIES[province] || 'Provincial';
}

/**
 * Obtiene el nombre corto del partido provincial
 * @param province - Nombre de la provincia
 * @returns Siglas o nombre corto del partido
 */
export function getProvincialPartyShortName(province: string | null): string {
  if (!province) return 'Prov.';

  const fullName = PROVINCIAL_PARTIES[province];
  if (!fullName) return 'Prov.';

  // Casos especiales con siglas conocidas
  if (fullName.includes('MPN')) return 'MPN';
  if (fullName.includes('PRO')) return 'PRO';
  if (fullName.includes('UCR')) return 'UCR';

  // Extraer lo que está entre paréntesis
  const match = fullName.match(/\(([^)]+)\)/);
  if (match) return match[1];

  // Tomar las primeras palabras significativas
  const words = fullName
    .replace(/Frente|Partido|Movimiento|de|por|para|los|las/gi, '')
    .trim()
    .split(' ')
    .filter(w => w.length > 2);

  if (words.length === 0) return 'Prov.';
  if (words.length <= 2) return words.join(' ');

  // Tomar iniciales
  return words.map(w => w[0].toUpperCase()).join('');
}

/**
 * Obtiene información completa del partido provincial
 * @param province - Nombre de la provincia
 * @returns Objeto con nombre completo, nombre corto y si existe en el mapeo
 */
export function getProvincialPartyInfo(province: string | null): {
  fullName: string;
  shortName: string;
  exists: boolean;
} {
  const fullName = getProvincialPartyName(province);
  const shortName = getProvincialPartyShortName(province);
  const exists = province ? province in PROVINCIAL_PARTIES : false;

  return {
    fullName,
    shortName,
    exists,
  };
}
