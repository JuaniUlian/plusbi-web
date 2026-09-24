import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mila — El expediente, leído antes de que lo firmes',
  description:
    'Mila revisa el expediente completo, lo cruza con la norma y te entrega cada hallazgo con su evidencia. En uso en organismos de control y universidades. Un producto de PLUS BI.',
  keywords: [
    'Mila',
    'validación documentos IA',
    'auditoría expedientes',
    'inteligencia artificial gobierno',
    'control interno',
    'licitaciones públicas',
    'cumplimiento normativo',
  ],
  openGraph: {
    title: 'Mila — El expediente, leído antes de que lo firmes',
    description:
      'Mila lo revisa completo, lo cruza con la norma y te entrega cada hallazgo con su evidencia. Usted decide.',
    images: ['/products/mila/mila-validacion-resultados.png'],
  },
};

export default function MilaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
