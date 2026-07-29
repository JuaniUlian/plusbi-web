import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mila — Detecta irregularidades en expedientes en minutos',
  description:
    'Mila audita expedientes públicos contra tu propia normativa en minutos, con cita legal y evidencia por cada hallazgo. En uso en organismos de control y universidades. Un producto de PLUS BI.',
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
    title: 'Mila — Detecta irregularidades en expedientes en minutos',
    description:
      'Toda tu normativa. Todo el expediente. Hallazgos por nivel de riesgo con cita legal y evidencia.',
    images: ['/products/mila/mila-07-hallazgo.png'],
  },
};

export default function MilaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
