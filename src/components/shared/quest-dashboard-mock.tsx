"use client";

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Building2, Megaphone, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CountUp } from '@/components/motion/count-up';
import { useLanguage } from '@/contexts/language-context';

type Mode = 'gobierno' | 'campana';

const content = {
  es: {
    modeGov: 'Para gobiernos',
    modeCamp: 'Para campañas',
    gov: {
      title: 'Gestión · Imagen y demandas',
      updated: 'Actualizado hoy',
      panelA: 'Evolución de imagen de gestión',
      panelB: 'Demandas por tema',
      series: ['Imagen positiva', 'Imagen negativa', 'Ns/Nc'],
      chips: ['Anticipá conflictos', 'Priorizá demandas reales', 'Medí el impacto de tus políticas'],
    },
    camp: {
      title: 'Intención de voto · Nacional',
      updated: 'Actualizado hoy',
      panelA: 'Tendencia de intención de voto',
      panelB: 'Comparación de consultoras',
      series: ['Espacio A', 'Espacio B', 'Otros'],
      chips: ['Territorios clave', 'Segmentos del electorado', 'Estrategia del adversario'],
    },
    provinces: 'provincias',
    dataPoints: 'puntos de datos',
  },
  en: {
    modeGov: 'For governments',
    modeCamp: 'For campaigns',
    gov: {
      title: 'Government · Approval and demands',
      updated: 'Updated today',
      panelA: 'Approval trend',
      panelB: 'Demands by topic',
      series: ['Positive', 'Negative', 'No answer'],
      chips: ['Anticipate conflicts', 'Prioritize real demands', 'Measure policy impact'],
    },
    camp: {
      title: 'Voting intention · National',
      updated: 'Updated today',
      panelA: 'Voting intention trend',
      panelB: 'Pollster comparison',
      series: ['Party A', 'Party B', 'Others'],
      chips: ['Key territories', 'Voter segments', 'Opponent strategy'],
    },
    provinces: 'provinces',
    dataPoints: 'data points',
  },
};

// Series ficticias — solo forma, sin datos reales
const LINES: Record<Mode, { d: string; cls: string; w: number }[]> = {
  campana: [
    { d: 'M0,64 C30,60 60,52 90,48 C120,44 150,40 180,34 C210,28 240,26 270,22', cls: 'stroke-quest', w: 2.5 },
    { d: 'M0,40 C30,42 60,46 90,44 C120,42 150,48 180,50 C210,52 240,50 270,54', cls: 'stroke-primary/70', w: 2 },
    { d: 'M0,78 C30,76 60,78 90,74 C120,70 150,72 180,70 C210,68 240,70 270,68', cls: 'stroke-muted-foreground/40', w: 1.5 },
  ],
  gobierno: [
    { d: 'M0,52 C30,50 60,42 90,46 C120,50 150,38 180,36 C210,34 240,30 270,32', cls: 'stroke-quest', w: 2.5 },
    { d: 'M0,50 C30,54 60,58 90,54 C120,50 150,58 180,60 C210,62 240,64 270,62', cls: 'stroke-primary/70', w: 2 },
    { d: 'M0,80 C30,80 60,78 90,80 C120,82 150,80 180,78 C210,80 240,78 270,80', cls: 'stroke-muted-foreground/40', w: 1.5 },
  ],
};

const BARS: Record<Mode, number[]> = {
  campana: [66, 48, 82, 37, 58],
  gobierno: [78, 62, 45, 34, 22],
};

interface QuestDashboardMockProps {
  className?: string;
  /** Modo inicial */
  defaultMode?: Mode;
}

/**
 * Tablero de Quest mockeado e interactivo: dos modos (gobiernos / campañas)
 * que cambian el contenido. Representa el producto sin exponer pantallas
 * reales ni datos de clientes — series y nombres genéricos.
 */
export function QuestDashboardMock({ className, defaultMode = 'campana' }: QuestDashboardMockProps) {
  const { language } = useLanguage();
  const t = content[language];
  const [mode, setMode] = useState<Mode>(defaultMode);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });
  const reduce = useReducedMotion();

  const m = mode === 'gobierno' ? t.gov : t.camp;
  const lines = LINES[mode];
  const bars = BARS[mode];

  return (
    <div ref={ref} className={cn('flex flex-col gap-4', className)}>
      {/* Pills de modo — la interacción principal */}
      <div className="flex justify-center gap-2" role="tablist" aria-label="Quest: modo de uso">
        {([
          { id: 'gobierno' as Mode, label: t.modeGov, icon: Building2 },
          { id: 'campana' as Mode, label: t.modeCamp, icon: Megaphone },
        ]).map((tab) => {
          const Icon = tab.icon;
          const isActive = mode === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setMode(tab.id)}
              className={cn(
                'inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quest focus-visible:ring-offset-2',
                isActive
                  ? 'bg-quest text-white shadow-[0_8px_24px_rgba(234,88,12,0.35)]'
                  : 'border border-border bg-card text-muted-foreground hover:border-quest/40 hover:text-foreground'
              )}
            >
              <Icon className="size-4" aria-hidden />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        className="overflow-hidden rounded-2xl border border-black/10 bg-white card-elevated zoom-hover"
        role="img"
        aria-label={language === 'es'
          ? `Representación ilustrativa del tablero de Quest en modo ${mode === 'gobierno' ? 'gobiernos' : 'campañas'}`
          : `Illustrative representation of the Quest dashboard in ${mode === 'gobierno' ? 'government' : 'campaign'} mode`}
      >
        {/* Barra de browser */}
        <div className="flex items-center gap-2 border-b border-black/5 bg-secondary/60 px-4 py-2.5">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-black/15" />
            <span className="size-2.5 rounded-full bg-black/15" />
            <span className="size-2.5 rounded-full bg-black/15" />
          </span>
          <span aria-hidden className="mx-auto hidden truncate rounded-md bg-white/80 px-3 py-0.5 text-xs text-muted-foreground sm:block">
            quest.plusbi.ar
          </span>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode}
            aria-hidden
            className="p-5 md:p-6"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-foreground">{m.title}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-quest/10 px-3 py-1 text-[11px] font-semibold text-quest">
                <TrendingUp className="size-3" />
                {m.updated}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-[7fr_5fr]">
              {/* Líneas de tendencia con dibujo animado */}
              <div className="rounded-xl border border-black/5 bg-secondary/30 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {m.panelA}
                </p>
                <svg viewBox="0 0 270 96" className="mt-2 w-full" fill="none">
                  {[24, 48, 72].map((y) => (
                    <line key={y} x1="0" y1={y} x2="270" y2={y} className="stroke-black/5" strokeWidth="1" />
                  ))}
                  {lines.map((line) => (
                    <motion.path
                      key={line.d}
                      d={line.d}
                      className={line.cls}
                      strokeWidth={line.w}
                      strokeLinecap="round"
                      initial={reduce ? undefined : { pathLength: 0 }}
                      animate={reduce ? undefined : { pathLength: inView ? 1 : 0 }}
                      transition={{ duration: 1.4, ease: 'easeOut', delay: 0.15 }}
                    />
                  ))}
                </svg>
                <div className="mt-3 flex flex-wrap gap-4">
                  {m.series.map((name, i) => (
                    <span key={name} className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span
                        className={
                          'size-2 rounded-full ' +
                          (i === 0 ? 'bg-quest' : i === 1 ? 'bg-primary/70' : 'bg-muted-foreground/40')
                        }
                      />
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Barras comparativas */}
              <div className="rounded-xl border border-black/5 bg-secondary/30 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {m.panelB}
                </p>
                <div className="mt-3 flex flex-col gap-2.5">
                  {bars.map((width, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="h-2 w-8 rounded-full bg-black/10" />
                      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-black/5">
                        <motion.div
                          className="h-full rounded-full bg-quest/70"
                          initial={reduce ? undefined : { width: 0 }}
                          animate={{ width: inView || reduce ? `${width}%` : 0 }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chips del modo activo — qué hacés con esto */}
            <div className="mt-5 flex flex-wrap gap-2">
              {m.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-quest/25 bg-quest/5 px-3.5 py-1.5 text-xs font-medium text-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-8 border-t border-black/5 pt-4">
              <p>
                <CountUp value={24} className="text-2xl text-quest" />
                <span className="ml-2 text-xs text-muted-foreground">{t.provinces}</span>
              </p>
              <p>
                <CountUp value={7.1} prefix="+" suffix="M" decimals={1} className="text-2xl text-quest" />
                <span className="ml-2 text-xs text-muted-foreground">{t.dataPoints}</span>
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
