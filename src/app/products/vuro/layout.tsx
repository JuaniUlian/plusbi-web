import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vuro - Automatización IA para Expedientes Públicos (Próximamente)',
  description: 'Vuro es un súper-agente de IA que automatiza completamente la creación, revisión, firma y publicación de decretos y resoluciones. Orquestación de flujos de trabajo con auditoría completa.',
  keywords: ['Vuro', 'automatización expedientes', 'IA gestión pública', 'agente inteligente gobierno', 'automatización decretos', 'workflow gobierno', 'expedientes electrónicos IA'],
  openGraph: {
    title: 'Vuro - Súper-Agente IA para Expedientes Públicos',
    description: 'Automatización completa de expedientes públicos con IA. Próximamente.',
    images: ['/logo/plusbi.png'],
  },
};

export default function VuroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
