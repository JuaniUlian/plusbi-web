'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, LogOut, Crown, User } from 'lucide-react';
import Image from 'next/image';
import { PremiumLineChart } from '@/components/quest/premium-line-chart';
import { ArgentinaHeatmap } from '@/components/quest/argentina-heatmap-simple';
import { motion, AnimatePresence } from 'framer-motion';

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
  { date: 'Ene', value: 45 },
  { date: 'Feb', value: 47 },
  { date: 'Mar', value: 46 },
  { date: 'Abr', value: 48 },
  { date: 'May', value: 50 },
  { date: 'Jun', value: 52 },
  { date: 'Jul', value: 54 },
  { date: 'Ago', value: 53 },
  { date: 'Sep', value: 55 },
  { date: 'Oct', value: 57 },
];

const MOCK_PROVINCES: ProvinceData[] = [
  { name: 'Buenos Aires', winner: 'Partido A', color: '#3b82f6', percentages: { 'Partido A': 48, 'Partido B': 35, 'Partido C': 17 } },
  { name: 'Cordoba', winner: 'Partido B', color: '#ef4444', percentages: { 'Partido A': 30, 'Partido B': 45, 'Partido C': 25 } },
  { name: 'Santa Fe', winner: 'Partido A', color: '#3b82f6', percentages: { 'Partido A': 42, 'Partido B': 38, 'Partido C': 20 } },
  { name: 'Mendoza', winner: 'Partido C', color: '#10b981', percentages: { 'Partido A': 25, 'Partido B': 30, 'Partido C': 45 } },
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end"
        >
          <Button onClick={handleGeneralReport} size="lg" className="gap-2">
            <FileText className="h-5 w-5" />
            Ver Informe General
          </Button>
        </motion.div>

        {/* Gráfico de Líneas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="neomorphism shadow-2xl border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Evolución de Intención de Voto</CardTitle>
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
              <PremiumLineChart data={MOCK_DATA} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Mapa de Calor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="neomorphism shadow-2xl border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Mapa de Calor Electoral - Argentina</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Haz clic en una provincia para ver el informe detallado con análisis de IA
              </p>
            </CardHeader>
            <CardContent>
              <ArgentinaHeatmap provincesData={MOCK_PROVINCES} onProvinceClick={handleProvinceClick} />
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Modal de Upgrade */}
      <AnimatePresence>
        {showUpgradeModal && (
          <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
            <DialogContent className="glassmorphism-solid">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  Funcionalidad Premium
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
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
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Modal de Informe General */}
      <AnimatePresence>
        {showGeneralReport && (
          <Dialog open={showGeneralReport} onOpenChange={setShowGeneralReport}>
            <DialogContent className="glassmorphism-solid max-w-3xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Informe General de Situación Electoral</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {generatingReport ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full"
                    />
                    <p className="mt-4 text-muted-foreground">Generando informe con IA...</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-lg">Resumen Ejecutivo</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Basado en el análisis de datos consolidados de múltiples encuestadoras, se observa una tendencia
                      de crecimiento sostenido en la intención de voto del candidato principal, alcanzando el 57% en
                      el último período medido. Las provincias clave muestran una distribución favorable, con Buenos
                      Aires y Santa Fe liderando con el Partido A, mientras que Córdoba presenta un escenario más
                      competitivo.
                    </p>
                    <h3 className="font-semibold text-lg mt-6">Análisis por Región</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Buenos Aires mantiene una ventaja de 13 puntos sobre el segundo competidor</li>
                      <li>Córdoba muestra la competencia más reñida, con solo 5 puntos de diferencia</li>
                      <li>Santa Fe presenta estabilidad en los últimos 3 meses</li>
                      <li>Mendoza emerge como provincia sorpresa con liderazgo del Partido C</li>
                    </ul>
                    <h3 className="font-semibold text-lg mt-6">Recomendaciones Estratégicas</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Se sugiere reforzar la presencia en Córdoba mediante campañas focalizadas, mientras se mantiene
                      la consolidación en Buenos Aires. El monitoreo continuo de Santa Fe es crítico para prevenir
                      posibles fluctuaciones. La tendencia ascendente general indica un momento favorable para
                      intensificar la comunicación de logros y propuestas.
                    </p>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Modal de Informe Provincial */}
      <AnimatePresence>
        {showProvinceReport && (
          <Dialog open={showProvinceReport} onOpenChange={setShowProvinceReport}>
            <DialogContent className="glassmorphism-solid max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Informe de {selectedProvinceData?.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {generatingReport ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full"
                    />
                    <p className="mt-4 text-muted-foreground">Analizando datos con IA...</p>
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
                      <li>Oportunidades de crecimiento en zonas rurales</li>
                    </ul>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
