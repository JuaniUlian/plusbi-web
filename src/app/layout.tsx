import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';
import { OrganizationSchema } from '@/components/structured-data';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://plusbi.ar'),
  title: {
    default: 'PLUS BI - Soluciones GovTech e IA para Gobiernos | Argentina',
    template: '%s | PLUS BI'
  },
  description: 'PLUS BI ofrece soluciones de inteligencia artificial y tecnología para gobiernos en Argentina. Productos como Quest (análisis de datos), Mila (validación de documentos con IA), Vuro (automatización con IA) y sistemas de expedientes electrónicos para modernizar la gestión pública.',
  keywords: ['GovTech Argentina', 'inteligencia artificial gobiernos', 'IA sector público', 'transformación digital gobiernos', 'expedientes electrónicos', 'análisis de datos gubernamentales', 'validación documentos IA', 'automatización gobierno', 'PLUS BI', 'Quest', 'Mila', 'Vuro', 'tecnología gobierno Argentina', 'modernización estado', 'eficiencia pública'],
  authors: [{ name: 'PLUS BI' }],
  creator: 'PLUS BI',
  publisher: 'PLUS BI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    alternateLocale: ['en_US'],
    url: 'https://plusbi.ar',
    siteName: 'PLUS BI',
    title: 'PLUS BI - Soluciones GovTech e IA para Gobiernos',
    description: 'Soluciones de inteligencia artificial y tecnología para modernizar gobiernos. Quest, Mila, Vuro y sistemas de expedientes electrónicos.',
    images: [
      {
        url: '/logo/plusbi.png',
        width: 1200,
        height: 630,
        alt: 'PLUS BI - GovTech Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PLUS BI - Soluciones GovTech e IA para Gobiernos',
    description: 'Soluciones de IA para modernizar gobiernos: análisis de datos, validación de documentos y automatización.',
    images: ['/logo/plusbi.png'],
  },
  icons: {
    icon: '/logo/favicon-16x16.png',
    shortcut: '/logo/favicon-16x16.png',
    apple: '/logo/plusbi.png',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://plusbi.ar',
    languages: {
      'es-AR': 'https://plusbi.ar',
      'en-US': 'https://plusbi.ar/en',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="es" className="scroll-smooth">
        <head>
          <link rel="icon" href="/logo/favicon-16x16.png" sizes="any" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />
          <OrganizationSchema />
        </head>
        <body
          className={cn(
            'min-h-screen bg-background font-body antialiased',
            nunito.variable
          )}
          style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundAttachment: 'fixed', backgroundSize: 'cover'}}
        >
          <div className="relative flex min-h-dvh flex-col bg-transparent">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </html>
    </LanguageProvider>
  );
}
