'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Calendar, CheckCircle, XCircle, FileText } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const PROVINCIAS = [
  'BUENOS AIRES',
  'CIUDAD AUTÓNOMA DE BUENOS AIRES',
  'CÓRDOBA',
  'SANTA FE',
  'MENDOZA',
  'TUCUMÁN',
  'SALTA',
  'SANTIAGO DEL ESTERO',
  'CORRIENTES',
  'ENTRE RÍOS',
  'CHACO',
  'MISIONES',
  'FORMOSA',
  'JUJUY',
  'SAN JUAN',
  'SAN LUIS',
  'LA RIOJA',
  'CATAMARCA',
  'LA PAMPA',
  'NEUQUÉN',
  'RÍO NEGRO',
  'CHUBUT',
  'SANTA CRUZ',
  'TIERRA DEL FUEGO'
];

export function EventUploader() {
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [eventText, setEventText] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleAddEvent = async () => {
    if (!selectedProvince || !eventDate || !eventText.trim()) {
      setUploadResult({
        success: false,
        message: 'Por favor completa todos los campos: provincia, fecha y evento'
      });
      return;
    }

    setIsUploading(true);
    setUploadResult(null);

    try {
      const response = await fetch('/api/events/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          province: selectedProvince,
          date: eventDate,
          eventText: eventText.trim()
        })
      });

      const result = await response.json();

      if (result.success) {
        setUploadResult({
          success: true,
          message: `✅ Evento agregado exitosamente a ${selectedProvince}`
        });
        // Limpiar campos
        setEventText('');
        setEventDate('');
      } else {
        setUploadResult({
          success: false,
          message: `❌ Error: ${result.error}`
        });
      }
    } catch (error) {
      setUploadResult({
        success: false,
        message: '❌ Error al agregar evento. Intenta nuevamente.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Obtener fecha de hoy en formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Agregar Evento Político
        </CardTitle>
        <CardDescription>
          Solo disponible para SUPERADMIN. Agrega eventos al archivo "Informe Situación" que se usa para generar reportes con IA.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="province-select">Provincia</Label>
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger id="province-select">
                <SelectValue placeholder="Selecciona una provincia" />
              </SelectTrigger>
              <SelectContent>
                {PROVINCIAS.map(prov => (
                  <SelectItem key={prov} value={prov}>
                    {prov}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="event-date">Fecha del Evento</Label>
            <Input
              id="event-date"
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              max={today}
              disabled={isUploading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="event-text">
            Descripción del Evento (texto plano)
          </Label>
          <Textarea
            id="event-text"
            placeholder="Ejemplo:&#10;Milei visitó Córdoba con Llaryora&#10;&#10;Anunció inversión en infraestructura&#10;Destacó: 'Córdoba motor productivo'&#10;Llaryora pidió más fondos coparticipables"
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
            rows={8}
            disabled={isUploading}
          />
          <p className="text-xs text-muted-foreground">
            Escribe el evento en formato simple. Usa saltos de línea para separar puntos clave.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleAddEvent}
            disabled={isUploading || !selectedProvince || !eventDate || !eventText.trim()}
          >
            {isUploading ? 'Agregando...' : 'Agregar Evento'}
          </Button>
          <Button
            onClick={() => {
              setEventText('');
              setEventDate('');
              setSelectedProvince('');
              setUploadResult(null);
            }}
            variant="outline"
            disabled={isUploading}
          >
            Limpiar
          </Button>
        </div>

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

        <Alert>
          <FileText className="h-4 w-4" />
          <AlertTitle>Información</AlertTitle>
          <AlertDescription>
            Los eventos se agregan a la sección "EVENTOS ÚLTIMOS 7 DÍAS POR PROVINCIA" del archivo
            "Informe Situación.txt". Este archivo se utiliza para generar informes políticos con IA.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
