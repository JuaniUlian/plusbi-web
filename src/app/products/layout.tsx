import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Productos — IA y datos para el sector público',
  description:
    'Quest (análisis de datos y encuestas), Mila (auditoría de expedientes con IA) y sistemas de expediente electrónico. Cada producto nace de un problema real de la gestión pública.',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
