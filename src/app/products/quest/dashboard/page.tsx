
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { questAnalytics } from '@/lib/analytics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, LogOut, Crown, User, Info, RefreshCw, X, Printer, BarChart3, Upload } from 'lucide-react';
import Image from 'next/image';
import { PremiumLineChart } from '@/components/quest/premium-line-chart';
import { PremiumPieChart } from '@/components/quest/premium-pie-chart';
import { StatsCards } from '@/components/quest/stats-cards';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PollsterComparisonTable } from '@/components/quest/pollster-comparison-table';
import { GuestAccessBanner } from '@/components/quest/guest-access-banner';
import { LegalDisclaimer } from '@/components/quest/legal-disclaimer';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { SurveyUploader } from '@/components/quest/SurveyUploader';

const ArgentinaHeatmap = dynamic(
  () => import('@/components/quest/argentina-heatmap').then(mod => mod.ArgentinaHeatmap),
  {
    ssr: false,
    loading: () => <div className="flex items-center justify-center w-full h-full min-h-[400px] md:min-h-[600px]"><p>Cargando mapa...</p></div>
  }
);


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
  sample?: number | null;
  methodology?: string | null;
  margin_error?: number | null;
  // Campos expandidos
  provincialPartyName?: string | null;
  CC?: number | null;
  ProFederal?: number | null;
  Potencia?: number | null;
  ProyectoSur?: number | null;
  UnionFederal?: number | null;
  FrenteIzquierda?: number | null;
}

type PartyKey = 'LLA' | 'FP' | 'PU' | 'UCR' | 'PRO' | 'FIT' | 'Provincial' | 'CC' | 'ProFederal' | 'Potencia' | 'ProyectoSur' | 'UnionFederal' | 'FrenteIzquierda';

export interface ProvinceData {
  name: string;
  winner: string;
  color: string;
  percentages: { [key: string]: number };
  pollsters?: string[];
  totalSample?: number;
  pollsterCount?: number;
}



export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/products/quest/login');
    },
  });
  const user = session?.user;
  const isAuthenticated = status === 'authenticated';
  const isPaidUser = user?.role !== 'GUEST';
  const isSuperAdmin = user?.role === 'SUPERADMIN';
  const logout = () => signOut({ callbackUrl: '/products/quest/login' });

  const [mounted, setMounted] = useState(false);
  const [encuestasData, setEncuestasData] = useState<EncuestaData[]>([]);
  const [selectedPollster, setSelectedPollster] = useState('Todas');
  const [selectedProvince, setSelectedProvince] = useState('Todas');
  const [selectedChamber, setSelectedChamber] = useState('Todas');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '6M' | '1Y' | 'ALL'>('1M');
  const [comparisonCount, setComparisonCount] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string>('');
  const [reportMetadata, setReportMetadata] = useState<{ type: string; province?: string }>({ type: 'national' });
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadSurveys = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/surveys');
      const { surveys } = await res.json();
      const unifiedData = surveys
        .filter((d: any) => d.pollster)
        .map((d: any) => ({
          ...d,
          // Convertir date de ISO a formato simple YYYY-MM-DD
          date: d.date ? d.date.split('T')[0] : d.date,
          // Convertir scope y chamber a lowercase para compatibilidad
          scope: d.scope?.toLowerCase(),
          chamber: d.chamber?.toLowerCase(),
          // Normalizar nombres de encuestadoras
          pollster: d.pollster
            .replace(/Córdoba/i, 'Cordoba')
            .replace(/Federico Gonzalez y Asco(\.)?/, 'Federico Gonzalez y Asociados')
            .replace(/Federico Gonzalez y Asoc\./, 'Federico Gonzalez y Asociados')
            .trim()
        }));
      setEncuestasData(unifiedData);
      questAnalytics.dashboardView();
    } catch (err) {
      console.error('Error cargando encuestas:', err);
      questAnalytics.error('Failed to load surveys', 'dashboard');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    loadSurveys();
  }, []);

  const { CHAMBERS, POLLSTERS, PROVINCES_LIST } = useMemo(() => {
    const chambersList = ['Todas', ...Array.from(new Set(encuestasData.map(d => d.chamber).filter(Boolean)))];
    
    let relevantData = encuestasData;
    if (selectedChamber !== 'Todas') {
      relevantData = encuestasData.filter(d => d.chamber === selectedChamber);
    }
  
    const uniquePollsters = [...new Set(relevantData.map(d => d.pollster).filter(Boolean).map(p => {
        if (p.toLowerCase().includes('federico gonzalez')) return 'Federico Gonzalez y Asociados';
        if (p.toLowerCase().includes('zuban cordoba')) return 'Zuban Cordoba';
        return p;
    }))];

    const pollstersList = ['Todas', ...uniquePollsters].sort((a, b) => a.localeCompare(b));
    
    const provincesList = ['Todas', ...Array.from(new Set(relevantData.filter(e => e.scope === 'provincial').map(d => d.province).filter(Boolean))) as string[]].sort((a, b) => a.localeCompare(b));
  
    return {
      CHAMBERS: chambersList,
      POLLSTERS: pollstersList,
      PROVINCES_LIST: provincesList,
    };
  }, [encuestasData, selectedChamber]);

  useEffect(() => {
    // Cuando cambia la consultora, actualizar provincia automáticamente
    if (selectedPollster !== 'Todas') {
      const pollsterData = encuestasData.filter(e => {
          let pollster = e.pollster;
          if (pollster.toLowerCase().includes('federico gonzalez')) pollster = 'Federico Gonzalez y Asociados';
          if (pollster.toLowerCase().includes('zuban cordoba')) pollster = 'Zuban Cordoba';
          return pollster === selectedPollster;
      });

      const pollsterHasNationalData = pollsterData.some(d => d.scope === 'national');

      if (pollsterHasNationalData) {
        setSelectedProvince('Todas');
        return;
      }

      // Verificar si la provincia actual tiene datos para esta consultora
      const currentProvinceHasData = pollsterData.some(e => e.province === selectedProvince);

      if (!currentProvinceHasData || selectedProvince === 'Todas') {
        // Seleccionar la primera provincia con datos
        const provinces = Array.from(new Set(pollsterData.map(e => e.province).filter(p => p !== null && p !== undefined)));
        if (provinces.length > 0) {
          provinces.sort();
          setSelectedProvince(provinces[0] as string);
        } else {
          setSelectedProvince('Todas');
        }
      }
    }
  }, [selectedPollster, encuestasData]);

  const datosFiltrados = useMemo(() => {
    return encuestasData.filter(e => {
        let pollster = e.pollster;
        if (pollster.toLowerCase().includes('federico gonzalez')) pollster = 'Federico Gonzalez y Asociados';
        if (pollster.toLowerCase().includes('zuban cordoba')) pollster = 'Zuban Cordoba';

        const pollsterMatch = selectedPollster === 'Todas' || pollster === selectedPollster;

        if (selectedChamber === 'senadores') {
            return e.chamber === 'senadores' && pollsterMatch;
        }

        const chamberMatch = selectedChamber === 'Todas' || e.chamber === selectedChamber;
        
        if (selectedProvince !== 'Todas') {
            return chamberMatch && pollsterMatch && e.province === selectedProvince;
        }

        if(selectedPollster !== 'Todas' && selectedProvince === 'Todas') {
           const pollsterHasNationalData = encuestasData.some(d => {
             let dPollster = d.pollster.toLowerCase();
             if (dPollster.includes('federico gonzalez')) dPollster = 'federico gonzalez y asociados';
             return dPollster === selectedPollster.toLowerCase() && d.scope === 'national'
           });
           if (pollsterHasNationalData) {
             return pollsterMatch && chamberMatch && e.scope === 'national';
           }
        }

        // Si no hay provincia seleccionada, mostrar datos nacionales O provinciales (ambos)
        return chamberMatch && pollsterMatch;
    });
  }, [encuestasData, selectedChamber, selectedPollster, selectedProvince]);
  
  const datosGrafico = useMemo(() => {
    const sorted = datosFiltrados.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    let filtered = sorted;
    const now = new Date();

    if (timeframe === '1D') {
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      filtered = sorted.filter(d => new Date(d.date) >= oneDayAgo);
    } else if (timeframe === '1W') {
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = sorted.filter(d => new Date(d.date) >= oneWeekAgo);
    } else if (timeframe === '1M') {
      const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
      filtered = sorted.filter(d => new Date(d.date) >= oneMonthAgo);
    } else if (timeframe === '6M') {
      const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
      filtered = sorted.filter(d => new Date(d.date) >= sixMonthsAgo);
    } else if (timeframe === '1Y') {
      const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
      filtered = sorted.filter(d => new Date(d.date) >= oneYearAgo);
    }

    return filtered.map(d => ({
      date: new Date(d.date).toLocaleDateString('es-AR', { month: 'short', day: 'numeric' }),
      LLA: d.LLA,
      FP: d.FP,
      PU: d.PU,
      UCR: d.UCR,
      PRO: d.PRO,
      FIT: d.FIT,
      Provincial: d.Provincial,
      Others: d.Others
    }));
  }, [datosFiltrados, timeframe]);

  const pieChartSingleData = useMemo(() => {
    if (datosGrafico.length === 1) {
      const { date, ...rest } = datosGrafico[0];
      return rest;
    }
    return null;
  }, [datosGrafico]);

  // Información de consultoras y rango de fechas
  const pollsterInfo = useMemo(() => {
    if (datosFiltrados.length === 0) return null;

    // Obtener consultoras únicas que aportaron a estos datos
    const pollsters = Array.from(new Set(datosFiltrados.map(d => d.pollster))).sort();

    // Obtener rango de fechas
    const dates = datosFiltrados.map(d => new Date(d.date)).sort((a, b) => a.getTime() - b.getTime());
    const minDate = dates[0];
    const maxDate = dates[dates.length - 1];

    const formatDate = (date: Date) => {
      return date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return {
      pollsters,
      dateRange: `${formatDate(minDate)} - ${formatDate(maxDate)}`,
      count: datosFiltrados.length
    };
  }, [datosFiltrados]);

  const calcularPromedioUltimasEncuestas = (campo: PartyKey, datos: EncuestaData[]) => {
    if (datos.length === 0) return 0;

    // Filtrar solo datos de las últimas 2 semanas
    const dosSemanasAtras = new Date();
    dosSemanasAtras.setDate(dosSemanasAtras.getDate() - 14);

    const datosRecientes = datos.filter(d => new Date(d.date) >= dosSemanasAtras);

    if (datosRecientes.length === 0) {
      // Si no hay datos recientes, usar la última encuesta de cada consultora
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
    }

    // Para datos recientes, tomar la última encuesta de cada consultora dentro de las 2 semanas
    const ultimasEncuestasRecientes: { [key: string]: EncuestaData } = {};
    datosRecientes.forEach(encuesta => {
      const valor = encuesta[campo];
      if (valor !== null && typeof valor === 'number') {
        if (!ultimasEncuestasRecientes[encuesta.pollster] || new Date(encuesta.date) > new Date(ultimasEncuestasRecientes[encuesta.pollster].date)) {
          ultimasEncuestasRecientes[encuesta.pollster] = encuesta;
        }
      }
    });

    const valores = Object.values(ultimasEncuestasRecientes)
      .map(d => d[campo])
      .filter(v => v !== null && typeof v === 'number') as number[];

    return valores.length > 0 ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
  };

  const totalLLA = useMemo(() => calcularPromedioUltimasEncuestas('LLA', datosFiltrados), [datosFiltrados]);
  const totalFP = useMemo(() => calcularPromedioUltimasEncuestas('FP', datosFiltrados), [datosFiltrados]);

  const ultimaActualizacion = useMemo(() => {
      return new Date().toLocaleDateString('es-AR');
  }, []);

  const provincesMapData: ProvinceData[] = useMemo(() => {
    const datosProvinciales = encuestasData.filter(e => e.scope === 'provincial');
    console.log('Datos provinciales para el mapa:', datosProvinciales.length);
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
      const totalSample = ultimasEncuestas.reduce((sum, e) => sum + (e.sample || 0), 0);

      const promedios = {
        LLA: ultimasEncuestas.map(e => e.LLA).filter(v => v!=null).reduce((a, b) => a + (b as number), 0) / ultimasEncuestas.filter(e => e.LLA!=null).length || 0,
        FP: ultimasEncuestas.map(e => e.FP).filter(v => v!=null).reduce((a, b) => a + (b as number), 0) / ultimasEncuestas.filter(e => e.FP!=null).length || 0,
        PU: ultimasEncuestas.map(e => e.PU).filter(v => v!=null).reduce((a, b) => a + (b as number), 0) / ultimasEncuestas.filter(e => e.PU!=null).length || 0,
        Provincial: ultimasEncuestas.map(e => e.Provincial).filter(v => v!=null).reduce((a, b) => a + (b as number), 0) / ultimasEncuestas.filter(e => e.Provincial!=null).length || 0,
      };

      const maxPartido = Object.entries(promedios).reduce((a, b) => a[1] > b[1] ? a : b);

      const colores: { [key: string]: string } = {
        LLA: '#7c3aed', FP: '#3b82f6', PU: '#f97316', Provincial: '#849221'
      };

      const percentages: { [key: string]: number } = {};
      if (promedios.LLA > 0) percentages['LLA'] = Math.round(promedios.LLA * 10) / 10;
      if (promedios.FP > 0) percentages['FP'] = Math.round(promedios.FP * 10) / 10;
      if (promedios.PU > 0) percentages['PU'] = Math.round(promedios.PU * 10) / 10;
      if (promedios.Provincial > 0) percentages['Provincial'] = Math.round(promedios.Provincial * 10) / 10;

      return {
        name: prov,
        winner: maxPartido[0],
        color: colores[maxPartido[0]] || '#64748b',
        percentages,
        pollsters,
        totalSample,
        pollsterCount: pollsters.length
      };
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
      questAnalytics.filterChange('chamber', value);
      if (value === 'senadores') {
        setSelectedProvince('Todas');
      }
    }
  };

  const handleResetFilters = () => {
    setSelectedChamber('Todas');
    setSelectedPollster('Todas');
    setSelectedProvince('Todas');
    questAnalytics.filterChange('reset', 'all');
  };

  const handleGeneralReport = async () => {
    console.log('🔵 handleGeneralReport llamado');
    console.log('🔵 isPaidUser:', isPaidUser);
    console.log('🔵 encuestasData length:', encuestasData.length);

    if (!isPaidUser) {
      console.log('❌ Usuario no es premium, mostrando modal de upgrade');
      setShowUpgradeModal(true);
      return;
    }

    console.log('✅ Iniciando generación de informe...');
    setGeneratingReport(true);

    try {
      console.log('📤 Enviando request a API...');
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'national',
          encuestasData: encuestasData
        })
      });

      console.log('📥 Response status:', response.status);
      const data = await response.json();
      console.log('📥 Response data:', data);

      if (data.success) {
        console.log('✅ Informe generado exitosamente');
        setGeneratedReport(data.report);
        setReportMetadata({ type: 'national' });
        setShowReportModal(true);
        questAnalytics.reportGenerated('national');
      } else {
        console.error('❌ Error en la respuesta:', data.error);
        questAnalytics.error('Report generation failed', 'dashboard');
      }
    } catch (error) {
      console.error('❌ Error generando reporte:', error);
      questAnalytics.error('Report generation error', 'dashboard');
    } finally {
      console.log('🏁 Finalizando generación');
      setGeneratingReport(false);
    }
  };

  const handleProvinceClick = async (province: ProvinceData) => {
    console.log('🟢 handleProvinceClick llamado para:', province.name);
    console.log('🟢 isPaidUser:', isPaidUser);

    if (!isPaidUser) {
      console.log('❌ Usuario no es premium, mostrando modal de upgrade');
      setShowUpgradeModal(true);
      return;
    }

    console.log('✅ Iniciando generación de informe provincial...');
    setGeneratingReport(true);

    try {
      console.log('📤 Enviando request a API para provincia:', province.name);
      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'provincial',
          province: province.name,
          encuestasData: encuestasData
        })
      });

      console.log('📥 Response status:', response.status);
      const data = await response.json();
      console.log('📥 Response data:', data);

      if (data.success) {
        console.log('✅ Informe provincial generado exitosamente');
        setGeneratedReport(data.report);
        setReportMetadata({ type: 'provincial', province: province.name });
        setShowReportModal(true);
        questAnalytics.reportGenerated('provincial', province.name);
      } else {
        console.error('❌ Error en la respuesta:', data.error);
        questAnalytics.error('Provincial report failed', 'dashboard');
      }
    } catch (error) {
      console.error('❌ Error generando reporte provincial:', error);
      questAnalytics.error('Provincial report error', 'dashboard');
    } finally {
      console.log('🏁 Finalizando generación');
      setGeneratingReport(false);
    }
  };

  const handleLogout = () => {
    questAnalytics.logout();
    logout();
    router.push('/products/quest');
  };

  // Show loading state while checking authentication
  if (status === 'loading' || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated (useSession will redirect)
  if (!isAuthenticated) {
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
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                {isPaidUser ? (
                  <Crown className="h-4 w-4 text-yellow-500" />
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="hidden sm:inline">{user?.email}</span>
              </div>

              {isSuperAdmin && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/products/quest/analytics')}
                    className="gap-2"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span className="hidden md:inline">Analytics</span>
                  </Button>
                  <Button
                    variant={showUploadPanel ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowUploadPanel(!showUploadPanel)}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="hidden md:inline">{showUploadPanel ? 'Ocultar' : 'Cargar'}</span>
                  </Button>
                </>
              )}

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Banner para usuarios invitados */}
        {!isPaidUser && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GuestAccessBanner
              onUpgradeClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfIcQTtpjRfEVyI90e_7XrXRS1IJJAdNSjpWgBnSXYKE0ovWg/viewform', '_blank')}
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-end"
        >
          <Button onClick={handleGeneralReport} size="lg" className="gap-2">
            <FileText className="h-5 w-5" />
            Ver Informe General
          </Button>
        </motion.div>
        
        <div className="flex justify-end">
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
                      Los porcentajes mostrados en las tarjetas son promedios de la última encuesta de cada consultora.
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        <StatsCards
          totalLLA={totalLLA}
          totalFP={totalFP}
          lastUpdate={ultimaActualizacion}
        />

        {isSuperAdmin && showUploadPanel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <SurveyUploader onUploadSuccess={loadSurveys} />
          </motion.div>
        )}

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
                          El gráfico muestra la evolución temporal de todas las encuestas disponibles según el filtro.
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-wrap gap-4 mt-4 items-end">
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
                      if (handleFilterAction()) {
                        setSelectedPollster(value);
                        questAnalytics.filterChange('pollster', value);
                      }
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
                      if (handleFilterAction()) {
                        setSelectedProvince(value);
                        questAnalytics.filterChange('province', value);
                      }
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
                 <Button onClick={handleResetFilters} variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Restablecer
                </Button>
              </div>

              {/* Botones de Timeframe */}
              <div className="flex flex-wrap gap-2 mt-4 px-6">
                <Button
                  variant={timeframe === '1D' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setTimeframe('1D');
                    questAnalytics.filterChange('timeframe', '1D');
                  }}
                >
                  1D
                </Button>
                <Button
                  variant={timeframe === '1W' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setTimeframe('1W');
                    questAnalytics.filterChange('timeframe', '1W');
                  }}
                >
                  1S
                </Button>
                <Button
                  variant={timeframe === '1M' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setTimeframe('1M');
                    questAnalytics.filterChange('timeframe', '1M');
                  }}
                >
                  1M
                </Button>
                <Button
                  variant={timeframe === '6M' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setTimeframe('6M');
                    questAnalytics.filterChange('timeframe', '6M');
                  }}
                >
                  6M
                </Button>
                <Button
                  variant={timeframe === '1Y' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setTimeframe('1Y');
                    questAnalytics.filterChange('timeframe', '1Y');
                  }}
                >
                  1A
                </Button>
                <Button
                  variant={timeframe === 'ALL' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setTimeframe('ALL');
                    questAnalytics.filterChange('timeframe', 'ALL');
                  }}
                >
                  Todo
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {pollsterInfo && (
                <div className="mb-4 p-3 bg-muted/50 rounded-lg border border-border">
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-muted-foreground min-w-fit">Consultoras:</span>
                      <span className="text-foreground">
                        {pollsterInfo.pollsters.join(', ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-muted-foreground">Período:</span>
                      <span className="text-foreground">{pollsterInfo.dateRange}</span>
                      <span className="text-muted-foreground">({pollsterInfo.count} {pollsterInfo.count === 1 ? 'encuesta' : 'encuestas'})</span>
                    </div>
                  </div>
                </div>
              )}
              {datosGrafico.length > 0 ? (
                 (datosGrafico.length > 1) ? (
                    <PremiumLineChart data={datosGrafico} selectedProvince={selectedProvince} />
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
          transition={{ delay: 0.3 }}
        >
          <Card className="glassmorphism-light shadow-2xl border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Comparativo de Encuestadoras</CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Selecciona dos encuestadoras para comparar sus últimos sondeos.
              </p>
            </CardHeader>
            <CardContent>
              <PollsterComparisonTable
                data={encuestasData}
                isPremium={isPaidUser}
                comparisonCount={comparisonCount}
                onComparisonUsed={() => setComparisonCount(prev => prev + 1)}
                onUpgradeClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfIcQTtpjRfEVyI90e_7XrXRS1IJJAdNSjpWgBnSXYKE0ovWg/viewform', '_blank')}
              />
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
                Pasa el cursor sobre una provincia para ver los datos. Haz clic para generar un informe completo con Quest.
              </p>
            </CardHeader>
            <CardContent>
              <ArgentinaHeatmap provincesData={provincesMapData} onProvinceClick={handleProvinceClick} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Disclaimer Legal Colapsable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Collapsible open={isDisclaimerOpen} onOpenChange={setIsDisclaimerOpen}>
            <Card className="glassmorphism-light border-2">
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg">Información Legal y Transparencia</CardTitle>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                        isDisclaimerOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Sobre el origen de los datos, metodología y cumplimiento legal
                  </p>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <LegalDisclaimer wrapped={false} />
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
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
                <p className="text-sm text-muted-foreground">Accede a análisis avanzados, filtros personalizados, informes generados por Quest y mucho más.</p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button onClick={() => setShowUpgradeModal(false)} variant="outline" className="flex-1">Cerrar</Button>
                  <Button onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfIcQTtpjRfEVyI90e_7XrXRS1IJJAdNSjpWgBnSXYKE0ovWg/viewform', '_blank')} className="flex-1">Obtener Premium</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Modal de carga mientras se genera el informe */}
      <AnimatePresence>
        {generatingReport && (
          <Dialog open={generatingReport} onOpenChange={() => {}}>
            <DialogContent className="glassmorphism-solid" aria-describedby="generating-report-description">
              <DialogHeader>
                <DialogTitle className="sr-only">Generando Informe</DialogTitle>
                <DialogDescription id="generating-report-description" className="sr-only">
                  Quest está generando el informe electoral con datos curados por PLUS BI
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full"
                />
                <p className="mt-6 text-lg font-semibold">Quest está redactando tu informe...</p>
                <p className="mt-2 text-sm text-muted-foreground">Esto puede tomar unos segundos</p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Modal del informe generado */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0" aria-describedby="report-modal-description">
          <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-background z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src="/logo/quest.png" alt="Quest" width={40} height={40} />
                <div>
                  <DialogTitle className="text-2xl">
                    {reportMetadata.type === 'national'
                      ? 'Informe Electoral - Argentina'
                      : `Informe Electoral - ${reportMetadata.province}`}
                  </DialogTitle>
                  <DialogDescription id="report-modal-description">
                    Redactado especialmente por Quest con datos de PLUS BI - {new Date().toLocaleDateString('es-AR')}
                  </DialogDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => window.print()}>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setShowReportModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-headline prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-base prose-p:leading-relaxed prose-p:mb-4 prose-ul:my-4 prose-li:my-2 prose-strong:text-foreground prose-strong:font-semibold">
              <ReactMarkdown>{generatedReport}</ReactMarkdown>
            </article>

            <footer className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Image src="/logo/quest.png" alt="Quest" width={24} height={24} />
                <span className="font-semibold">Quest</span>
              </div>
              <p>Informe redactado especialmente por Quest con datos curados por el equipo de PLUS BI</p>
              <p className="mt-1">
                Este documento es confidencial y está destinado únicamente para el uso del destinatario.
              </p>
            </footer>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
