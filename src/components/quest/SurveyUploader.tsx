'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Upload, FileSpreadsheet, Type, CheckCircle, XCircle } from 'lucide-react';
import { questAnalytics } from '@/lib/analytics';

interface SurveyUploaderProps {
  onUploadSuccess?: () => void;
}

export function SurveyUploader({ onUploadSuccess }: SurveyUploaderProps = {}) {
  const [uploadType, setUploadType] = useState<'text' | 'excel' | null>(null);
  const [textData, setTextData] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTextUpload = async () => {
    if (!textData.trim()) {
      setUploadResult({ success: false, message: 'Por favor ingresa datos para cargar' });
      return;
    }

    setIsUploading(true);
    setUploadResult(null);

    try {
      const response = await fetch('/api/surveys/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'text',
          data: textData
        })
      });

      const result = await response.json();

      if (result.success) {
        setUploadResult({
          success: true,
          message: `✅ ${result.count} encuesta(s) cargada(s) exitosamente`
        });
        setTextData('');
        questAnalytics.surveyUpload('text', result.count);
        // Notificar al componente padre para recargar datos
        if (onUploadSuccess) {
          setTimeout(() => {
            onUploadSuccess();
            setUploadResult({
              success: true,
              message: `✅ ${result.count} encuesta(s) cargada(s) y gráficos actualizados`
            });
          }, 1000);
        }
      } else {
        setUploadResult({
          success: false,
          message: `❌ Error: ${result.error}`
        });
        questAnalytics.error('Survey upload failed', 'uploader');
      }
    } catch (error) {
      setUploadResult({
        success: false,
        message: '❌ Error al cargar encuestas. Intenta nuevamente.'
      });
      questAnalytics.error('Survey upload error', 'uploader');
    } finally {
      setIsUploading(false);
    }
  };

  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadResult(null);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;

        const response = await fetch('/api/surveys/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'excel',
            data: base64.split(',')[1] // Remove data:... prefix
          })
        });

        const result = await response.json();

        if (result.success) {
          setUploadResult({
            success: true,
            message: `✅ ${result.count} encuesta(s) cargada(s) desde Excel`
          });
          questAnalytics.surveyUpload('excel', result.count);
          // Notificar al componente padre para recargar datos
          if (onUploadSuccess) {
            setTimeout(() => {
              onUploadSuccess();
              setUploadResult({
                success: true,
                message: `✅ ${result.count} encuesta(s) cargada(s) y gráficos actualizados`
              });
            }, 1000);
          }
        } else {
          setUploadResult({
            success: false,
            message: `❌ Error: ${result.error}`
          });
          questAnalytics.error('Excel upload failed', 'uploader');
        }
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      setUploadResult({
        success: false,
        message: '❌ Error al procesar archivo Excel'
      });
      questAnalytics.error('Excel processing error', 'uploader');
      setIsUploading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Cargar Nuevas Encuestas
        </CardTitle>
        <CardDescription>
          Solo disponible para administradores. Carga encuestas mediante texto plano o archivo Excel.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!uploadType && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => setUploadType('text')}
              variant="outline"
              className="h-24 flex flex-col gap-2"
            >
              <Type className="h-8 w-8" />
              <span>Copiar y Pegar Texto</span>
            </Button>
            <Button
              onClick={() => setUploadType('excel')}
              variant="outline"
              className="h-24 flex flex-col gap-2"
            >
              <FileSpreadsheet className="h-8 w-8" />
              <span>Subir Excel (.xlsx)</span>
            </Button>
          </div>
        )}

        {uploadType === 'text' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="survey-text">
                Formato: Fecha|Encuestadora|Provincia|Cámara|Muestra|LLA|FP|...
              </Label>
              <Textarea
                id="survey-text"
                placeholder="2025-10-15|PLUS Quest|Buenos Aires|diputados|1500|45.2|32.8|..."
                value={textData}
                onChange={(e) => setTextData(e.target.value)}
                rows={10}
                disabled={isUploading}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleTextUpload}
                disabled={isUploading}
              >
                {isUploading ? 'Cargando...' : 'Cargar Encuestas'}
              </Button>
              <Button
                onClick={() => {
                  setUploadType(null);
                  setTextData('');
                  setUploadResult(null);
                }}
                variant="outline"
                disabled={isUploading}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {uploadType === 'excel' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="excel-file">
                Selecciona archivo Excel (.xlsx)
              </Label>
              <input
                id="excel-file"
                type="file"
                accept=".xlsx"
                onChange={handleExcelUpload}
                disabled={isUploading}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/90
                  disabled:opacity-50"
              />
            </div>
            <Button
              onClick={() => {
                setUploadType(null);
                setUploadResult(null);
              }}
              variant="outline"
              disabled={isUploading}
            >
              Cancelar
            </Button>
          </div>
        )}

        {uploadResult && (
          <Alert variant={uploadResult.success ? 'default' : 'destructive'}>
            {uploadResult.success ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {uploadResult.success ? 'Éxito' : 'Error'}
            </AlertTitle>
            <AlertDescription>{uploadResult.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
