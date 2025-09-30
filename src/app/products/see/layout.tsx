import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sistema de Expediente Electrónico - Transformación Digital',
  description: 'Implementación de sistemas de expedientes electrónicos para gobiernos. +30 implementaciones, +40k usuarios, +10 millones de documentos gestionados. Instalación, soporte y capacitación completa.',
  keywords: ['expediente electrónico', 'digitalización gobierno', 'gestión documental', 'transformación digital sector público', 'expedientes digitales', 'firma electrónica', 'código abierto gobierno'],
  openGraph: {
    title: 'Sistema de Expediente Electrónico - PLUS BI',
    description: 'Transformación digital para gobiernos. +30 implementaciones exitosas, +10M documentos gestionados.',
    images: ['/logo/plusbi.png'],
  },
};

export default function SEELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
