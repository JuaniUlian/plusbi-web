
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, LogOut, Crown, User } from 'lucide-react';
import Image from 'next/image';
import { PremiumLineChart } from '@/components/quest/premium-line-chart';
import { PremiumPieChart } from '@/components/quest/premium-pie-chart';
import { StatsCards } from '@/components/quest/stats-cards';
import { LeafletMap } from '@/components/quest/leaflet-map';
import { motion, AnimatePresence } from 'framer-motion';

interface EncuestaData {
  date: string;
  pollster: string;
  scope: string;
  province: string | null;
  chamber: string;
  LLA: number | null;
  FP: number | null;
  PU: number | null;
  UCR: number | null;
  PRO: number | null;
  FIT: number | null;
  Provincial: number | null;
  Others: number | null;
}

interface ProvinceData {
  name: string;
  winner: string;
  color: string;
  percentages: { [key: string]: number };
}

interface PieChartData {
  LLA?: number | null;
  FP?: number | null;
  PU?: number | null;
}


export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated, isPaidUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [encuestasData, setEncuestasData] = useState<EncuestaData[]>([]);
  const [selectedPollster, setSelectedPollster] = useState('Todas');
  const [selectedProvince, setSelectedProvince] = useState('Todas');
  const [selectedChamber, setSelectedChamber] = useState('Todas');
  const [showGeneralReport, setShowGeneralReport] = useState(false);
  const [showProvinceReport, setShowProvinceReport] = useState(false);
  const [selectedProvinceData, setSelectedProvinceData] = useState<ProvinceData | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/data/encuestas_argentina_2025.json')
      .then(res => res.json())
      .then(data => setEncuestasData(data))
      .catch(err => console.error('Error cargando encuestas:', err));
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/products/quest/login');
    }
  }, [mounted, isAuthenticated, router]);

  const datosFiltrados = useMemo(() => {
    return encuestasData.filter(e => {
      const chamberMatch = selectedChamber === 'Todas' || e.chamber === selectedChamber;
      const pollsterMatch = selectedPollster === 'Todas' || e.pollster === selectedPollster;
      
      let scopeMatch = true;
      if (selectedProvince === 'Todas') {
        // Si la cámara es senadores, solo mostrar nacional. Si no, mostrar nacional.
        scopeMatch = e.scope === 'national';
        if (selectedChamber === 'diputados' && selectedPollster !== 'Todas') {
             scopeMatch = true; // Allow provincial and national
        } else if (selectedChamber !== 'senadores') {
             scopeMatch = e.scope === 'national';
        }

      } else {
        scopeMatch = e.scope === 'provincial' && e.province === selectedProvince;
      }
      
      return chamberMatch && pollsterMatch && scopeMatch;
    });
  }, [encuestasData, selectedChamber, selectedPollster, selectedProvince]);

  const datosGrafico = useMemo(() => {
    return datosFiltrados
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(d => ({
        date: new Date(d.date).toLocaleDateString('es-AR', { month: 'short', day: 'numeric' }),
        LLA: d.LLA,
        FP: d.FP,
        PU: d.PU
      }));
  }, [datosFiltrados]);

  const datosNacionales = useMemo(() => encuestasData.filter(e => e.scope === 'national'), [encuestasData]);
  const datosProvinciales = useMemo(() => encuestasData.filter(e => e.scope === 'provincial'), [encuestasData]);
  
  const calcularPromedio = (campo: keyof EncuestaData, datos: EncuestaData[]) => {
    const valores = datos.map(d => d[campo]).filter(v => v !== null) as number[];
    return valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
  };

  const totalLLA = useMemo(() => calcularPromedio('LLA', datosNacionales), [datosNacionales]);
  const totalFP = useMemo(() => calcularPromedio('FP', datosNacionales), [datosNacionales]);

  const ultimaActualizacion = useMemo(() => {
      const fechas = datosNacionales.map(d => new Date(d.date)).sort((a, b) => b.getTime() - a.getTime());
      return fechas.length > 0 ? fechas[0].toLocaleDateString('es-AR') : '-';
  }, [datosNacionales]);

  const MOCK_PROVINCES: ProvinceData[] = useMemo(() => {
    const provincesMap: { [key: string]: { LLA: number[], FP: number[], PU: number[], Provincial: number[] } } = {};
    datosProvinciales.forEach(d => {
      if (!d.province) return;
      if (!provincesMap[d.province]) {
        provincesMap[d.province] = { LLA: [], FP: [], PU: [], Provincial: [] };
      }
      if (d.LLA) provincesMap[d.province].LLA.push(d.LLA);
      if (d.FP) provincesMap[d.province].FP.push(d.FP);
      if (d.PU) provincesMap[d.province].PU.push(d.PU);
      if (d.Provincial) provincesMap[d.province].Provincial.push(d.Provincial);
    });

    return Object.keys(provincesMap).map(prov => {
      const promedios = {
        LLA: provincesMap[prov].LLA.length > 0 ? provincesMap[prov].LLA.reduce((a, b) => a + b, 0) / provincesMap[prov].LLA.length : 0,
        FP: provincesMap[prov].FP.length > 0 ? provincesMap[prov].FP.reduce((a, b) => a + b, 0) / provincesMap[prov].FP.length : 0,
        PU: provincesMap[prov].PU.length > 0 ? provincesMap[prov].PU.reduce((a, b) => a + b, 0) / provincesMap[prov].PU.length : 0,
        Provincial: provincesMap[prov].Provincial.length > 0 ? provincesMap[prov].Provincial.reduce((a, b) => a + b, 0) / provincesMap[prov].Provincial.length : 0,
      };

      const maxPartido = Object.entries(promedios).reduce((a, b) => a[1] > b[1] ? a : b);
      const colores: { [key: string]: string } = {
        LLA: '#7c3aed', FP: '#3b82f6', PU: '#10b981', Provincial: '#f59e0b'
      };

      const percentages: { [key: string]: number } = {};
      if (promedios.LLA > 0) percentages['LLA'] = Math.round(promedios.LLA * 10) / 10;
      if (promedios.FP > 0) percentages['FP'] = Math.round(promedios.FP * 10) / 10;
      if (promedios.PU > 0) percentages['PU'] = Math.round(promedios.PU * 10) / 10;
      if (promedios.Provincial > 0) percentages['Provincial'] = Math.round(promedios.Provincial * 10) / 10;

      return { name: prov, winner: maxPartido[0], color: colores[maxPartido[0]] || '#64748b', percentages };
    });
  }, [datosProvinciales]);

  const { CHAMBERS, POLLSTERS, PROVINCES_LIST } = useMemo(() => {
    const chamberFilteredData = encuestasData.filter(e => selectedChamber === 'Todas' || e.chamber === selectedChamber);
    const provinceFilteredData = chamberFilteredData.filter(e => selectedProvince === 'Todas' || e.province === selectedProvince);
    
    const pollsterFilteredData = encuestasData.filter(e => selectedPollster === 'Todas' || e.pollster === selectedPollster);
    const chamberAfterPollsterData = pollsterFilteredData.filter(e => selectedChamber === 'Todas' || e.chamber === selectedChamber);

    return {
      CHAMBERS: ['Todas', ...Array.from(new Set(encuestasData.map(d => d.chamber).filter(Boolean)))],
      POLLSTERS: ['Todas', ...Array.from(new Set(provinceFilteredData.map(d => d.pollster)))],
      PROVINCES_LIST: ['Todas', ...Array.from(new Set(chamberAfterPollsterData.filter(e => e.scope === 'provincial').map(d => d.province).filter(Boolean))) as string[]]
    };
  }, [encuestasData, selectedChamber, selectedPollster, selectedProvince]);

  const handleFilterAction = () => {
    if (!isPaidUser) {
      setShowUpgradeModal(true);
      return false;
    }
    return true;
  };
  
  const handleChamberChange = (value: string) => {
    if (handleFilterAction()) {
      setSelectedChamber(value);
      if(value === 'senadores'){
        setSelectedProvince('Todas');
      }
    }
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
  
  if (!mounted || !isAuthenticated) {
    return null;
  }

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

        <StatsCards
          totalLLA={totalLLA}
          totalFP={totalFP}
          lastUpdate={ultimaActualizacion}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glassmorphism-light shadow-2xl border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Evolución Temporal de Intención de Voto por Partido</CardTitle>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 flex-wrap">
                <Select
                  value={selectedChamber}
                  onValueChange={handleChamberChange}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Cámara" />
                  </SelectTrigger>
                  <SelectContent>
                    {CHAMBERS.map((chamber) => (
                      <SelectItem key={chamber} value={chamber}>
                        {chamber === 'diputados' ? 'Diputados' : chamber === 'senadores' ? 'Senadores' : chamber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedPollster}
                  onValueChange={(value) => {
                    if (handleFilterAction()) setSelectedPollster(value);
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
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
                  disabled={selectedChamber === 'senadores'}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
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
              {datosGrafico.length === 1 ? (
                <PremiumPieChart data={{ LLA: datosGrafico[0].LLA, FP: datosGrafico[0].FP, PU: datosGrafico[0].PU }} />
              ) : datosGrafico.length > 0 ? (
                <PremiumLineChart data={datosGrafico.slice(-10)} />
              ) : (
                <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
                  No hay datos disponibles para los filtros seleccionados
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glassmorphism-light shadow-2xl border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Mapa de Calor Electoral - Argentina</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Haz clic en una provincia para ver el informe detallado con análisis de IA
              </p>
            </CardHeader>
            <CardContent>
              <LeafletMap provincesData={MOCK_PROVINCES} onProvinceClick={handleProvinceClick} />
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <AnimatePresence>
        {showUpgradeModal && (
          <Dialog open={showUpgradeModal} onOpenChange={setShowUpgradeModal}>
            <DialogContent className="glassmorphism-solid" aria-describedby="upgrade-description">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-2xl">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  Funcionalidad Premium
                </DialogTitle>
                <DialogDescription id="upgrade-description">
                  Accede a análisis avanzados y filtros personalizados
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <p className="text-base">Esta funcionalidad está disponible solo para usuarios registrados.</p>
                <p className="text-sm text-muted-foreground">Accede a análisis avanzados, filtros personalizados, informes con IA y mucho más.</p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={() => setShowUpgradeModal(false)} variant="outline" className="flex-1">Cerrar</Button>
                  <Button onClick={() => window.open('https://script.google.com/macros/s/AKfycbzKO1kHsEJokymKc38SwiMvexQtuhVpshitKnV3iU5lB0gPNvTBYdPldKM4Gh7NdEXP/exec', '_blank')} className="flex-1">Registrarme Ahora</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGeneralReport && (
          <Dialog open={showGeneralReport} onOpenChange={setShowGeneralReport}>
            <DialogContent className="glassmorphism-solid max-w-3xl max-h-[80vh] overflow-y-auto" aria-describedby="general-report-description">
              <DialogHeader>
                <DialogTitle className="text-2xl">Informe General de Situación Electoral</DialogTitle>
                <DialogDescription id="general-report-description">
                  Análisis completo de las encuestas nacionales
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {generatingReport ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
                    <p className="mt-4 text-muted-foreground">Generando informe con IA...</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold text-lg">Resumen Ejecutivo</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Basado en el análisis de {datosNacionales.length} encuestas nacionales, LLA mantiene {totalLLA.toFixed(1)}% de intención de voto promedio, mientras que FP alcanza {totalFP.toFixed(1)}%. Los datos muestran tendencias variables según las diferentes encuestadoras.
                    </p>
                    <h3 className="font-semibold text-lg mt-6">Análisis por Región</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                      {MOCK_PROVINCES.slice(0, 5).map(p => (
                        <li key={p.name}>{p.name}: {p.winner} lidera con ventaja</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProvinceReport && (
          <Dialog open={showProvinceReport} onOpenChange={setShowProvinceReport}>
            <DialogContent className="glassmorphism-solid max-w-2xl max-h-[80vh] overflow-y-auto" aria-describedby="province-report-description">
              <DialogHeader>
                <DialogTitle className="text-2xl">Informe de {selectedProvinceData?.name}</DialogTitle>
                <DialogDescription id="province-report-description">
                  Análisis detallado con datos provinciales
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {generatingReport ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
                    <p className="mt-4 text-muted-foreground">Analizando datos con IA...</p>
                  </div>
                ) : (
                  <>
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <h3 className="font-semibold">Situación Actual</h3>
                      <p className="text-sm text-muted-foreground mt-2">Ganador actual: <strong>{selectedProvinceData?.winner}</strong></p>
                      <div className="mt-3 space-y-1">
                        {selectedProvinceData && Object.entries(selectedProvinceData.percentages).map(([party, percentage]) => (
                          <div key={party} className="flex justify-between text-sm">
                            <span>{party}</span>
                            <span className="font-bold">{percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
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

    