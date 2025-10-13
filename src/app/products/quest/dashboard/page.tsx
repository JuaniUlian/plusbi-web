
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, LogOut, Crown, User, Info } from 'lucide-react';
import Image from 'next/image';
import { PremiumLineChart } from '@/components/quest/premium-line-chart';
import { PremiumPieChart } from '@/components/quest/premium-pie-chart';
import { StatsCards } from '@/components/quest/stats-cards';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { ArgentinaMapSimple } from '@/components/quest/argentina-map-simple';
import ReactMarkdown from 'react-markdown';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';


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

type PartyKey = 'LLA' | 'FP' | 'PU' | 'UCR' | 'PRO' | 'FIT' | 'Provincial' | 'Others';

interface ProvinceData {
  name: string;
  winner: string;
  color: string;
  percentages: { [key: string]: number };
  pollsters?: string[];
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
  const [generatedReport, setGeneratedReport] = useState<string>('');
  const [generatedProvinceReport, setGeneratedProvinceReport] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    fetch('/data/encuestas_argentina_2025.json')
      .then(res => res.json())
      .then(data => {
        const unifiedData = data.map((d: EncuestaData) => ({
          ...d,
          pollster: d.pollster
            .replace(/Córdoba/i, 'Cordoba')
            .replace(/Federico Gonzalez y Asco(\.)?/, 'Federico Gonzalez y Asociados')
            .replace(/Federico Gonzalez y Asoc\./, 'Federico Gonzalez y Asociados')
            .trim()
        }));
        setEncuestasData(unifiedData);
      })
      .catch(err => console.error('Error cargando encuestas:', err));
  }, []);

  const { CHAMBERS, POLLSTERS, PROVINCES_LIST } = useMemo(() => {
    const chambersList = ['Todas', ...Array.from(new Set(encuestasData.map(d => d.chamber).filter(Boolean)))];
    
    let relevantData = encuestasData;
    if (selectedChamber !== 'Todas') {
      relevantData = encuestasData.filter(d => d.chamber === selectedChamber);
    }
  
    const pollstersList = ['Todas', ...Array.from(new Set(relevantData.map(d => d.pollster).filter(Boolean)))].sort((a,b) => a.localeCompare(b));
    
    const provincesList = ['Todas', ...Array.from(new Set(relevantData.filter(e => e.scope === 'provincial').map(d => d.province).filter(Boolean))) as string[]].sort((a, b) => a.localeCompare(b));
  
    return {
      CHAMBERS: chambersList,
      POLLSTERS: pollstersList,
      PROVINCES_LIST: provincesList,
    };
  }, [encuestasData, selectedChamber]);

  useEffect(() => {
    if (selectedChamber === 'Todas' && selectedProvince === 'Todas' && selectedPollster !== 'Todas') {
      const pollsterData = encuestasData.filter(e => e.pollster === selectedPollster);
      const provinces = Array.from(new Set(pollsterData.map(e => e.province).filter(p => p !== null && p !== undefined)));
      if (provinces.length > 0) {
        provinces.sort();
        setSelectedProvince(provinces[0] as string);
      }
    }
  }, [selectedPollster, selectedChamber, selectedProvince, encuestasData]);

  const datosFiltrados = useMemo(() => {
    return encuestasData.filter(e => {
        let chamberMatch = selectedChamber === 'Todas' || e.chamber === selectedChamber;
        const pollsterMatch = selectedPollster === 'Todas' || e.pollster === selectedPollster;

        if (selectedChamber === 'senadores') {
          return e.chamber === 'senadores' && pollsterMatch && e.scope === 'national';
        }

        if (selectedProvince !== 'Todas') {
          return chamberMatch && pollsterMatch && e.province === selectedProvince;
        }

        if(selectedPollster !== 'Todas' && selectedProvince === 'Todas') {
           const pollsterHasNationalData = encuestasData.some(d => d.pollster === selectedPollster && d.scope === 'national');
           if (pollsterHasNationalData) {
             return pollsterMatch && chamberMatch && e.scope === 'national';
           }
        }
        
        return chamberMatch && pollsterMatch && e.scope === 'national';
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

  const pieChartSingleData = useMemo(() => {
    if (datosGrafico.length === 1) {
      const { date, ...rest } = datosGrafico[0];
      return rest;
    }
    return null;
  }, [datosGrafico]);

  const calcularPromedioUltimasEncuestas = (campo: PartyKey, datos: EncuestaData[]) => {
    if (datos.length === 0) return 0;
    const ultimasEncuestas: { [key: string]: EncuestaData } = {};
  
    datos.forEach(encuesta => {
      const valor = encuesta[campo];
      if (valor !== null && typeof valor === 'number') {
        if (!ultimasEncuestas[encuesta.pollster] || new Date(encuesta.date) > new Date(ultimasEncuestas[encuesta.pollster].date)) {
          ultimasEncuestas[encuesta.pollster] = encuesta;
        }
      }
    });
  
    const valores = Object.values(ultimasEncuestas)
      .map(d => d[campo])
      .filter(v => v !== null && typeof v === 'number') as number[];
  
    return valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
  };

  const totalLLA = useMemo(() => calcularPromedioUltimasEncuestas('LLA', datosFiltrados), [datosFiltrados]);
  const totalFP = useMemo(() => calcularPromedioUltimasEncuestas('FP', datosFiltrados), [datosFiltrados]);

  const ultimaActualizacion = useMemo(() => {
      if (encuestasData.length === 0) return '-';
      const fechas = encuestasData.map(d => new Date(d.date)).sort((a, b) => b.getTime() - a.getTime());
      return fechas[0].toLocaleDateString('es-AR');
  }, [encuestasData]);

  const MOCK_PROVINCES: ProvinceData[] = useMemo(() => {
    const datosProvinciales = encuestasData.filter(e => e.scope === 'provincial');
    const provincesMap: { [key: string]: { [pollster: string]: EncuestaData } } = {};

    datosProvinciales.forEach(d => {
      if (!d.province) return;
      if (!provincesMap[d.province]) {
        provincesMap[d.province] = {};
      }
      if (!provincesMap[d.province][d.pollster] || new Date(d.date) > new Date(provincesMap[d.province][d.pollster].date)) {
        provincesMap[d.province][d.pollster] = d;
      }
    });

    return Object.keys(provincesMap).map(prov => {
      const ultimasEncuestas = Object.values(provincesMap[prov]);
      const pollsters = Object.keys(provincesMap[prov]).sort();

      const promedios = {
        LLA: ultimasEncuestas.map(e => e.LLA).filter(v => v!=null).reduce((a, b) => a + (b as number), 0) / ultimasEncuestas.filter(e => e.LLA!=null).length || 0,
        FP: ultimasEncuestas.map(e => e.FP).filter(v => v!=null).reduce((a, b) => a + (b as number), 0) / ultimasEncuestas.filter(e => e.FP!=null).length || 0,
        PU: ultimasEncuestas.map(e => e.PU).filter(v => v!=null).reduce((a, b) => a + (b as number), 0) / ultimasEncuestas.filter(e => e.PU!=null).length || 0,
        Provincial: ultimasEncuestas.map(e => e.Provincial).filter(v => v!=null).reduce((a, b) => a + (b as number), 0) / ultimasEncuestas.filter(e => e.Provincial!=null).length || 0,
      };

      const maxPartido = Object.entries(promedios).reduce((a, b) => a[1] > b[1] ? a : b);

      const colores: { [key: string]: string } = {
        LLA: '#7c3aed', FP: '#3b82f6', PU: '#f97316', Provincial: '#f59e0b'
      };

      const percentages: { [key: string]: number } = {};
      if (promedios.LLA > 0) percentages['LLA'] = Math.round(promedios.LLA * 10) / 10;
      if (promedios.FP > 0) percentages['FP'] = Math.round(promedios.FP * 10) / 10;
      if (promedios.PU > 0) percentages['PU'] = Math.round(promedios.PU * 10) / 10;
      if (promedios.Provincial > 0) percentages['Provincial'] = Math.round(promedios.Provincial * 10) / 10;

      return { name: prov, winner: maxPartido[0], color: colores[maxPartido[0]] || '#64748b', percentages, pollsters };
    });
  }, [encuestasData]);
  
  
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
      if (value === 'senadores') {
        setSelectedProvince('Todas');
      }
    }
  };

  const handleGeneralReport = async () => {
    if (!isPaidUser) {
      setShowUpgradeModal(true);
      return;
    }
    setGeneratingReport(true);
    setShowGeneralReport(true);

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'national',
          encuestasData: encuestasData
        })
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedReport(data.report);
      }
    } catch (error) {
      console.error('Error generando reporte:', error);
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleProvinceClick = async (province: ProvinceData) => {
    if (!isPaidUser) {
      setShowUpgradeModal(true);
      return;
    }
    setSelectedProvinceData(province);
    setGeneratingReport(true);
    setShowProvinceReport(true);

    try {
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'provincial',
          province: province.name,
          encuestasData: encuestasData
        })
      });

      const data = await response.json();
      if (data.success) {
        setGeneratedProvinceReport(data.report);
      }
    } catch (error) {
      console.error('Error generando reporte provincial:', error);
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/products/quest');
  };
  
  const datosNacionales = useMemo(() => encuestasData.filter(e => e.scope === 'national'), [encuestasData]);
  
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/products/quest/login');
    }
  }, [mounted, isAuthenticated, router]);
  
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
              <div className="flex justify-between items-start mb-4">
                <CardTitle className="text-2xl">Evolución Temporal de Intención de Voto</CardTitle>
                 <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Info className="h-5 w-5 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Interpretación de datos</h4>
                        <p className="text-sm text-muted-foreground">
                          Los porcentajes mostrados en las tarjetas son <strong>promedios de la última encuesta de cada consultora</strong> para evitar sesgo de frecuencia. El gráfico muestra la evolución temporal de todas las encuestas disponibles según el filtro. Para senadores, los datos son de ámbito nacional.
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 flex-wrap items-end">
                <div className='flex-1 min-w-[150px]'>
                  <Label htmlFor="chamber-select">Cámara</Label>
                  <Select
                    value={selectedChamber}
                    onValueChange={handleChamberChange}
                  >
                    <SelectTrigger id="chamber-select" className="w-full">
                      <SelectValue placeholder="Cámara" />
                    </SelectTrigger>
                    <SelectContent>
                      {CHAMBERS.map((chamber) => (
                        <SelectItem key={chamber} value={chamber}>
                          {chamber.charAt(0).toUpperCase() + chamber.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex-1 min-w-[150px]'>
                  <Label htmlFor="pollster-select">Encuestadora</Label>
                  <Select
                    value={selectedPollster}
                    onValueChange={(value) => {
                      if (handleFilterAction()) setSelectedPollster(value);
                    }}
                  >
                    <SelectTrigger id="pollster-select" className="w-full">
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
                </div>

                <div className='flex-1 min-w-[150px]'>
                  <Label htmlFor="province-select">Provincia</Label>
                  <Select
                    value={selectedProvince}
                    onValueChange={(value) => {
                      if (handleFilterAction()) setSelectedProvince(value);
                    }}
                    disabled={selectedChamber === 'senadores'}
                  >
                    <SelectTrigger id="province-select" className="w-full">
                       <SelectValue placeholder={selectedChamber === 'senadores' ? 'Nacional' : 'Provincia'} />
                    </SelectTrigger>
                    <SelectContent>
                      {PROVINCES_LIST.length > 1 ? PROVINCES_LIST.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      )) : <SelectItem value="Todas" disabled>Nacional</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {datosGrafico.length > 0 ? (
                 (datosGrafico.length > 1) ? (
                    <PremiumLineChart data={datosGrafico.slice(-10)} />
                 ) : pieChartSingleData && Object.values(pieChartSingleData).some(v => v != null && v > 0) ? (
                    <PremiumPieChart data={pieChartSingleData} />
                 ) : (
                    <div className="w-full h-[400px] flex items-center justify-center text-muted-foreground">
                      No hay datos disponibles para los filtros seleccionados
                    </div>
                 )
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
              <CardTitle className="text-2xl">Mapa Electoral - Argentina</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Haz clic en una provincia para ver el informe detallado con análisis de IA
              </p>
            </CardHeader>
            <CardContent>
              <ArgentinaMapSimple provincesData={MOCK_PROVINCES} onProvinceClick={handleProvinceClick} />
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

      <Sheet open={showGeneralReport} onOpenChange={setShowGeneralReport}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl">Informe General de Situación Electoral</SheetTitle>
            <SheetDescription>
              Análisis completo de las encuestas nacionales con IA
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 mt-6">
            {generatingReport ? (
              <div className="flex flex-col items-center justify-center py-12">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
                <p className="mt-4 text-muted-foreground">Generando informe con IA...</p>
              </div>
            ) : generatedReport ? (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{generatedReport}</ReactMarkdown>
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
        </SheetContent>
      </Sheet>

      <Sheet open={showProvinceReport} onOpenChange={setShowProvinceReport}>
        <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-2xl">Informe de {selectedProvinceData?.name}</SheetTitle>
            <SheetDescription>
              Análisis detallado con datos provinciales e IA
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 mt-6">
            {generatingReport ? (
              <div className="flex flex-col items-center justify-center py-12">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
                <p className="mt-4 text-muted-foreground">Analizando datos con IA...</p>
              </div>
            ) : generatedProvinceReport ? (
              <>
                <div className="bg-primary/10 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold">Situación Actual</h3>
                  <p className="text-sm text-muted-foreground mt-2">Ganador actual: <strong>{selectedProvinceData?.winner}</strong></p>
                  {selectedProvinceData?.pollsters && selectedProvinceData.pollsters.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Encuestadoras consideradas:</strong> {selectedProvinceData.pollsters.join(', ')}
                    </p>
                  )}
                  <div className="mt-3 space-y-1">
                    {selectedProvinceData && Object.entries(selectedProvinceData.percentages).map(([party, percentage]) => (
                      <div key={party} className="flex justify-between text-sm">
                        <span>{party}</span>
                        <span className="font-bold">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{generatedProvinceReport}</ReactMarkdown>
                </div>
              </>
            ) : (
              <>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="font-semibold">Situación Actual</h3>
                  <p className="text-sm text-muted-foreground mt-2">Ganador actual: <strong>{selectedProvinceData?.winner}</strong></p>
                  {selectedProvinceData?.pollsters && selectedProvinceData.pollsters.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      <strong>Encuestadoras consideradas:</strong> {selectedProvinceData.pollsters.join(', ')}
                    </p>
                  )}
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
