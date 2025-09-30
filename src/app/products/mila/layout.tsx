import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mila - Validación de Documentos con IA para Gobiernos',
  description: 'Mila es una herramienta de inteligencia artificial que valida decretos, licitaciones y documentos públicos en minutos. Reduce errores 67%, acelera validaciones 76% y garantiza cumplimiento normativo.',
  keywords: ['Mila', 'validación documentos IA', 'inteligencia artificial gobierno', 'revisión decretos', 'licitaciones públicas', 'cumplimiento normativo', 'automatización documentos gobierno'],
  openGraph: {
    title: 'Mila - IA para Validación de Documentos Públicos',
    description: 'Validación inteligente de decretos y licitaciones en minutos. +67% errores detectados vs revisión humana.',
    images: ['/logo/mila.png'],
  },
};

export default function MilaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
