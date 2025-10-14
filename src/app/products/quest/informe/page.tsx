'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

function InformeContent() {
  const searchParams = useSearchParams();
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(true);
  const [metadata, setMetadata] = useState<{
    type: string;
    province?: string;
    date: string;
  } | null>(null);

  useEffect(() => {
    const reportData = searchParams.get('report');
    const type = searchParams.get('type');
    const province = searchParams.get('province');

    if (reportData) {
      try {
        const decodedReport = decodeURIComponent(reportData);
        setReport(decodedReport);
        setMetadata({
          type: type || 'national',
          province: province || undefined,
          date: new Date().toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        });
      } catch (error) {
        console.error('Error decoding report:', error);
      }
      setLoading(false);
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"
          />
          <p className="mt-4 text-muted-foreground">Cargando informe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Solo visible en pantalla, no en impresión */}
      <header className="print:hidden sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/logo/quest.png" alt="Quest" width={40} height={40} />
              <h1 className="text-xl font-bold">Quest - Informe Electoral</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.close()}>
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido del informe */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header del informe - Visible en impresión */}
        <div className="mb-8 pb-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <Image src="/logo/quest.png" alt="Quest" width={60} height={60} className="print:block" />
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Fecha: {metadata?.date}</p>
              <p className="text-sm text-muted-foreground">
                {metadata?.type === 'national' ? 'Informe Nacional' : `Informe Provincial - ${metadata?.province}`}
              </p>
            </div>
          </div>
          <h1 className="text-3xl font-bold font-headline">
            {metadata?.type === 'national'
              ? 'Informe de Situación Electoral - Argentina'
              : `Informe de Situación Electoral - ${metadata?.province}`}
          </h1>
        </div>

        {/* Contenido del informe en Markdown */}
        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-headline prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-ul:my-4 prose-li:my-2 prose-strong:text-foreground prose-strong:font-semibold print:prose-sm">
          <ReactMarkdown>{report}</ReactMarkdown>
        </article>

        {/* Footer del informe */}
        <footer className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Image src="/logo/quest.png" alt="Quest" width={24} height={24} />
            <span className="font-semibold">Quest</span>
          </div>
          <p>Informe generado con inteligencia artificial</p>
          <p className="mt-1">
            Este documento es confidencial y está destinado únicamente para el uso del destinatario.
          </p>
        </footer>
      </main>

      {/* Estilos de impresión */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }

          .print\\:hidden {
            display: none !important;
          }

          header.print\\:hidden {
            display: none !important;
          }

          @page {
            margin: 2cm;
            size: A4;
          }
        }
      `}</style>
    </div>
  );
}

export default function InformePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto"
          />
          <p className="mt-4 text-muted-foreground">Cargando informe...</p>
        </div>
      </div>
    }>
      <InformeContent />
    </Suspense>
  );
}
