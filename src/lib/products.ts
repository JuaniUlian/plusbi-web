import type { LucideIcon } from 'lucide-react';
import { BarChart3, ShieldCheck, FileStack } from 'lucide-react';

export const CONTACT_EMAIL = 'juan.ulian@pluscompol.com';

export type ProductId = 'quest' | 'mila' | 'see';

export interface ProductDef {
  id: ProductId;
  href: string;
  icon: LucideIcon;
  logo?: string;
  /** Logo real del producto (si existe, se muestra en vez del ícono) */
  logo?: string;
  /** Clases literales para que Tailwind las compile */
  chipClass: string;
  badgeClass: string;
  name: { es: string; en: string };
  tag: { es: string; en: string };
  /** Dolor de la persona — primera línea de la card (copy Sinek) */
  pain: { es: string; en: string };
  description: { es: string; en: string };
}

export const PRODUCTS: ProductDef[] = [
  {
    id: 'mila',
    href: '/products/mila',
    icon: ShieldCheck,
    logo: '/products/mila/mila-logo-dark.png',
    logo: '/logo/mila.png',
    chipClass: 'bg-mila/10 text-mila',
    badgeClass: 'bg-mila/10 text-mila border-transparent',
    name: { es: 'Mila', en: 'Mila' },
    tag: { es: 'Control inteligente', en: 'Intelligent oversight' },
    pain: {
      es: 'Tu firma dice que el expediente está en orden. ¿Lo leíste completo?',
      en: 'Your signature says the file is in order. Did you read all of it?',
    },
    description: {
      es: 'Mila audita expedientes contra tu propia normativa en minutos, con cita legal y evidencia por cada hallazgo.',
      en: 'Mila audits files against your own regulations in minutes, with a legal citation and evidence for every finding.',
    },
  },
  {
    id: 'quest',
    href: '/products/quest',
    icon: BarChart3,
    logo: '/logo/quest.png',
    chipClass: 'bg-quest/10 text-quest',
    badgeClass: 'bg-quest/10 text-quest border-transparent',
    name: { es: 'Quest', en: 'Quest' },
    tag: { es: 'Análisis de datos', en: 'Data analysis' },
    pain: {
      es: 'La encuesta que citás en la reunión ya tiene dos semanas.',
      en: 'The poll you quote in meetings is already two weeks old.',
    },
    description: {
      es: 'Quest reúne y cruza encuestas y datos electorales para que decidas con información de hoy, no del mes pasado.',
      en: 'Quest gathers and cross-references polls and electoral data so you decide with today’s information, not last month’s.',
    },
  },
  {
    id: 'see',
    href: '/products/see',
    icon: FileStack,
    chipClass: 'bg-see/10 text-see',
    badgeClass: 'bg-see/10 text-see border-transparent',
    name: { es: 'Expediente Electrónico', en: 'Electronic Records' },
    tag: { es: 'Transformación digital', en: 'Digital transformation' },
    pain: {
      es: 'El expediente que necesitás hoy está en un archivo, en papel, en otro edificio.',
      en: 'The file you need today is on paper, in an archive, in another building.',
    },
    description: {
      es: 'Instalamos, damos soporte y capacitamos en sistemas de expediente electrónico. Más de 10 millones de documentos gestionados.',
      en: 'We install, support and train teams on electronic record systems. Over 10 million documents managed.',
    },
  },
];
