import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MILA — Deck para aliados',
  description: 'MILA detecta irregularidades en expedientes públicos en minutos. Presentación para aliados.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function MilaAliadosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
