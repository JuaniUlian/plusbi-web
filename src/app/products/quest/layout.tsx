import { Metadata } from 'next';
import { SessionProvider } from '@/components/providers/session-provider';

export const metadata: Metadata = {
  title: 'Quest - Análisis de Datos para Gobiernos y Campañas',
  description: 'Quest es la plataforma de inteligencia de datos para toma de decisiones en el sector público. Análisis en tiempo real para gobiernos y campañas electorales. Más de 7M de puntos de datos en elecciones argentinas 2023.',
  keywords: ['Quest', 'análisis de datos gobierno', 'big data sector público', 'inteligencia electoral', 'campañas políticas', 'toma de decisiones datos', 'analytics gobierno Argentina'],
  openGraph: {
    title: 'Quest - Plataforma de Inteligencia para Gobiernos',
    description: 'Análisis de datos en tiempo real para gobiernos y campañas electorales. Caso de éxito: 7M+ puntos de datos en elecciones Argentina 2023.',
    images: ['/logo/quest.png'],
  },
};

export default function QuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
