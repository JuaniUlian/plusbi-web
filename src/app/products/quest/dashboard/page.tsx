'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, LogOut, Crown, User, MapPin } from 'lucide-react';
import Image from 'next/image';

// Tipos de datos temporales - se reemplazarán con datos reales
interface PollData {
  date: string;
  value: number;
  pollster?: string;
  province?: string;
}

interface ProvinceData {
  name: string;
  winner: string;
  color: string;
  percentages: { [key: string]: number };
}

const MOCK_DATA: PollData[] = [
  { date: '2025-01', value: 45, pollster: 'Encuestadora A', province: 'Buenos Aires' },
  { date: '2025-02', value: 47, pollster: 'Encuestadora A', province: 'Buenos Aires' },
  { date: '2025-03', value: 46, pollster: 'Encuestadora A', province: 'Buenos Aires' },
  { date: '2025-04', value: 48, pollster: 'Encuestadora A', province: 'Buenos Aires' },
  { date: '2025-05', value: 50, pollster: 'Encuestadora A', province: 'Buenos Aires' },
];

const MOCK_PROVINCES: ProvinceData[] = [
  { name: 'Buenos Aires', winner: 'Partido A', color: '#3b82f6', percentages: { 'Partido A': 48, 'Partido B': 35, 'Partido C': 17 } },
  { name: 'Córdoba', winner: 'Partido B', color: '#ef4444', percentages: { 'Partido A': 30, 'Partido B': 45, 'Partido C': 25 } },
  { name: 'Santa Fe', winner: 'Partido A', color: '#3b82f6', percentages: { 'Partido A': 42, 'Partido B': 38, 'Partido C': 20 } },
];

const POLLSTERS = ['Todas', 'Encuestadora A', 'Encuestadora B', 'Encuestadora C'];
const PROVINCES_LIST = ['Todas', 'Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza'];

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated, isPaidUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [selectedPollster, setSelectedPollster] = useState('Todas');
  const [selectedProvince, setSelectedProvince] = useState('Todas');
  const [showGeneralReport, setShowGeneralReport] = useState(false);
  const [showProvinceReport, setShowProvinceReport] = useState(false);
  const [selectedProvinceData, setSelectedProvinceData] = useState<ProvinceData | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/products/quest/login');
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
    return null;
  }

  const handleFilterAction = () => {
    if (!isPaidUser) {
      setShowUpgradeModal(true);
      return false;
    }
    return true;
  };

  const handleGeneralReport = () => {
    if (!isPaidUser) {
      setShowUpgradeModal(true);
      return;
    }
    setGeneratingReport(true);
    setShowGeneralReport(true);
    // Simular generación de informe
    setTimeout(() => setGeneratingReport(false), 2000);
  };

  const handleProvinceClick = (province: ProvinceData) => {
    if (!isPaidUser) {
      setShowUpgradeModal(true);
      return;
    }
    setSelectedProvinceData(province);
    setGeneratingReport(true);
    setShowProvinceReport(true);
    setTimeout(() => setGeneratingReport(false), 2000);
  };

  const handleLogout = () => {
    logout();
    router.push('/products/quest');
  };

  return (
    <div
      className="min-h-screen pb-8"
      style={{
        backgroundImage: "url('/backgrounds/titulos.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/logo/quest.png" alt="Quest" width={40} height={40} />
              <h1 className="text-2xl font-headline font-bold">Quest Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                {isPaidUser ? (
                  <Crown className="h-4 w-4 text-yellow-500" />
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="hidden sm:inline">{user?.email}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Botón Ver Informe General */}
        <div className="flex justify-end">
          <Button onClick={handleGeneralReport} size="lg" className="gap-2">
            <FileText className="h-5 w-5" />
            Ver Informe General
          </Button>
        </div>

        {/* Gráfico de Líneas */}
        <Card className="glassmorphism shadow-xl card-hud-effect">
          <CardHeader>
            <CardTitle>Evolución de Intención de Voto</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Select
                value={selectedPollster}
                onValueChange={(value) => {
                  if (handleFilterAction()) setSelectedPollster(value);
                }}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Encuestadora" />
                </SelectTrigger>
                <SelectContent>
                  {POLLSTERS.map((pollster) => (
                    <SelectItem key={pollster} value={pollster}>
                      {pollster}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedProvince}
                onValueChange={(value) => {
                  if (handleFilterAction()) setSelectedProvince(value);
                }}
              >
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Provincia" />
                </SelectTrigger>
                <SelectContent>
                  {PROVINCES_LIST.map((province) => (
                    <SelectItem key={province} value={province}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MOCK_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} name="Intención de Voto %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mapa de Calor */}
        <Card className="glassmorphism shadow-xl card-hud-effect">
          <CardHeader>
            <CardTitle>Mapa de Calor por Provincias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_PROVINCES.map((province) => (
                <Card
                  key={province.name}
                  className="cursor-pointer hover:scale-105 transition-transform border-2"
                  style={{ borderColor: province.color, backgroundColor: `${province.color}20` }}
                  onClick={() => handleProvinceClick(province)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      {province.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold">Ganador: {province.winner}</p>
                    <div className="mt-2 space-y-1">
                      {Object.entries(province.percentages).map(([party, percentage]) => (
                        <div key={party} className="text-xs flex justify-between">
                          <span>{party}:</span>
                          <span className="font-bold">{percentage}%</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Informe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Modal de Upgrade */}
      <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
        <DialogContent className="glassmorphism">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-yellow-500" />
              Funcionalidad Premium
            </DialogTitle>
            <DialogDescription className="space-y-4 pt-4">
              <p className="text-base">
                Esta funcionalidad está disponible solo para usuarios registrados.
              </p>
              <p className="text-sm text-muted-foreground">
                Accede a análisis avanzados, filtros personalizados, informes con IA y mucho más.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button onClick={() => setShowUpgradeModal(false)} variant="outline" className="flex-1">
                  Cerrar
                </Button>
                <Button
                  onClick={() => window.open('https://forms.google.com', '_blank')}
                  className="flex-1"
                >
                  Registrarme Ahora
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Modal de Informe General */}
      <Dialog open={showGeneralReport} onOpenChange={setShowGeneralReport}>
        <DialogContent className="glassmorphism max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Informe General de Situación Electoral</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {generatingReport ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-lg">Resumen Ejecutivo</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Basado en el análisis de datos consolidados de múltiples encuestadoras, se observa una tendencia
                  de crecimiento sostenido en la intención de voto del candidato principal, alcanzando el 50% en
                  el último período medido. Las provincias clave muestran una distribución favorable, con Buenos
                  Aires y Santa Fe liderando con el Partido A, mientras que Córdoba presenta un escenario más
                  competitivo.
                </p>
                <h3 className="font-semibold text-lg mt-6">Análisis por Región</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Buenos Aires mantiene una ventaja de 13 puntos sobre el segundo competidor</li>
                  <li>Córdoba muestra la competencia más reñida, con solo 5 puntos de diferencia</li>
                  <li>Santa Fe presenta estabilidad en los últimos 3 meses</li>
                </ul>
                <h3 className="font-semibold text-lg mt-6">Recomendaciones Estratégicas</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Se sugiere reforzar la presencia en Córdoba mediante campañas focalizadas, mientras se mantiene
                  la consolidación en Buenos Aires. El monitoreo continuo de Santa Fe es crítico para prevenir
                  posibles fluctuaciones.
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Informe Provincial */}
      <Dialog open={showProvinceReport} onOpenChange={setShowProvinceReport}>
        <DialogContent className="glassmorphism max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Informe de {selectedProvinceData?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {generatingReport ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : (
              <>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="font-semibold">Situación Actual</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Ganador actual: <strong>{selectedProvinceData?.winner}</strong>
                  </p>
                  <div className="mt-3 space-y-1">
                    {selectedProvinceData && Object.entries(selectedProvinceData.percentages).map(([party, percentage]) => (
                      <div key={party} className="flex justify-between text-sm">
                        <span>{party}</span>
                        <span className="font-bold">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="font-semibold text-lg">Análisis de IA</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  La provincia de {selectedProvinceData?.name} presenta un escenario donde {selectedProvinceData?.winner} lidera
                  con ventaja significativa. Los datos históricos muestran estabilidad en esta tendencia durante los últimos
                  meses. Se recomienda mantener presencia constante y reforzar mensajes en los segmentos donde la competencia
                  es más estrecha.
                </p>
                <h3 className="font-semibold text-lg mt-4">Factores Clave</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Alto nivel de decisión de voto en el electorado</li>
                  <li>Temas prioritarios: economía y seguridad</li>
                  <li>Distribución geográfica favorable en principales centros urbanos</li>
                </ul>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
