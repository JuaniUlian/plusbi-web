import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experiencia — Del análisis político a la IA para gobiernos',
  description:
    'Desde 2021, PLUS BI construye tecnología para el sector público: consultoría basada en datos, Quest, Mila y sistemas de expediente electrónico. Conocé nuestra historia y equipo.',
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
