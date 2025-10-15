'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function LegalDisclaimer() {
  return (
    <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20">
      <CardContent className="pt-6">
        <div className="flex gap-3">
          <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Disclaimer Legal
              </h4>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                Quest es un servicio de <strong>agregación y análisis</strong> de estudios de opinión pública
                <strong> YA PUBLICADOS</strong> por terceros. <strong>NO realizamos encuestas ni sondeos</strong>.
                NO somos una empresa encuestadora.
              </p>
            </div>

            <div>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                Toda la información mostrada proviene de <strong>fuentes públicas</strong> y ha sido liberada
                voluntariamente por las empresas encuestadoras registradas. Quest actúa exclusivamente como
                <strong> índice/agregador</strong> de contenido público electoral disponible en Internet,
                similar a un motor de búsqueda especializado.
              </p>
            </div>

            <div>
              <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                Para información sobre metodología, responsabilidad y validez de cada estudio,
                consulte directamente a la encuestadora original. Quest no es responsable de la
                metodología, validez o contenido de los estudios individuales.
              </p>
            </div>

            <div className="pt-2 border-t border-blue-200 dark:border-blue-800">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                <strong>Cumplimiento Legal:</strong> Durante períodos de veda electoral (8 días previos a elecciones),
                conforme a la Ley 26.571 art. 44 quáter, no se mostrarán datos actualizados públicamente.
                Los datos históricos permanecerán disponibles solo para usuarios registrados con fines de investigación.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
