"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/language-context';

const steps = {
  es: [
    { src: '/products/mila/mila-01-inicio.png', label: 'Empezá desde el inicio', detail: '“¿Qué necesita validar hoy?” — sin manuales, sin configuración previa.' },
    { src: '/products/mila/mila-02-alcance.png', label: 'Elegí el expediente', detail: 'Carpetas completas o documentos sueltos: vos definís el alcance.' },
    { src: '/products/mila/mila-03-alcance-seleccion.png', label: 'Confirmá el alcance', detail: 'Le ponés nombre al expediente y queda trazado en el historial.' },
    { src: '/products/mila/mila-04-reglas.png', label: 'Elegí tu normativa', detail: 'Tus grupos de reglas, extraídos de tus propias leyes y pliegos.' },
    { src: '/products/mila/mila-05-confirmar.png', label: 'Revisá y lanzá', detail: 'Un resumen claro antes de empezar. Tiempo estimado: minutos.' },
    { src: '/products/mila/mila-06-resultados.png', label: 'Mirá los resultados', detail: 'Hallazgos por nivel de riesgo, resumen ejecutivo y hasta informe con formato SIGEN.' },
    { src: '/products/mila/mila-07-hallazgo.png', label: 'Cada hallazgo, con evidencia', detail: 'Cita normativa, descripción y evidencia textual. Y si dudás: “¿Por qué este hallazgo?”' },
  ],
  en: [
    { src: '/products/mila/mila-01-inicio.png', label: 'Start from the home screen', detail: '“What do you need to validate today?” — no manuals, no prior setup.' },
    { src: '/products/mila/mila-02-alcance.png', label: 'Pick the file', detail: 'Whole folders or individual documents: you define the scope.' },
    { src: '/products/mila/mila-03-alcance-seleccion.png', label: 'Confirm the scope', detail: 'Name the file and it stays traced in the history.' },
    { src: '/products/mila/mila-04-reglas.png', label: 'Pick your regulations', detail: 'Your rule groups, extracted from your own laws and tender documents.' },
    { src: '/products/mila/mila-05-confirmar.png', label: 'Review and launch', detail: 'A clear summary before starting. Estimated time: minutes.' },
    { src: '/products/mila/mila-06-resultados.png', label: 'See the results', detail: 'Findings by risk level, executive summary, even SIGEN-format reports.' },
    { src: '/products/mila/mila-07-hallazgo.png', label: 'Every finding, with evidence', detail: 'Legal citation, description and textual evidence. In doubt? “Why this finding?”' },
  ],
};

/**
 * Recorrido por el producto con screenshots reales — avanza solo mientras está
 * en pantalla, se detiene al primer click del usuario, accesible por teclado.
 */
export function MilaWizardTour() {
  const { language } = useLanguage();
  const [active, setActive] = useState(0);
  const [userTookOver, setUserTookOver] = useState(false);
  const s = steps[language];
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: '-120px 0px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (userTookOver || reduce || !inView) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % s.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [userTookOver, reduce, inView, s.length]);

  const selectStep = (i: number) => {
    setUserTookOver(true);
    setActive(i);
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 gap-8 lg:grid-cols-[4fr_8fr] lg:items-start">
      <ol className="flex flex-col gap-1" aria-label={language === 'es' ? 'Pasos del recorrido' : 'Tour steps'}>
        {s.map((step, i) => (
          <li key={step.src}>
            <button
              type="button"
              onClick={() => selectStep(i)}
              aria-current={active === i ? 'step' : undefined}
              className={cn(
                'w-full rounded-xl px-4 py-3 text-left transition-colors min-h-11',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                active === i ? 'bg-white/15' : 'hover:bg-white/5'
              )}
            >
              <span className="flex items-baseline gap-3">
                <span
                  className={cn(
                    'stat-number text-sm',
                    active === i ? 'text-mila-accent' : 'text-white/40'
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className={cn('block text-sm font-semibold', active === i ? 'text-white' : 'text-white/70')}>
                    {step.label}
                  </span>
                  {active === i && (
                    <span className="mt-1 block text-sm leading-snug text-white/60">{step.detail}</span>
                  )}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
      <figure className="relative overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
        {/* Reserva el alto con la primera imagen; las demás crossfadean encima */}
        <Image
          src={s[0].src}
          alt=""
          aria-hidden
          width={1347}
          height={632}
          className="invisible w-full h-auto"
        />
        <AnimatePresence initial={false}>
          <motion.div
            key={s[active].src}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Image
              src={s[active].src}
              alt={s[active].label}
              width={1347}
              height={632}
              className="w-full h-auto"
            />
          </motion.div>
        </AnimatePresence>
        {/* Barra de progreso del paso activo */}
        {!reduce && !userTookOver && (
          <motion.div
            key={`progress-${active}`}
            aria-hidden
            className="absolute bottom-0 left-0 h-1 bg-mila-accent"
            initial={{ width: '0%' }}
            animate={{ width: inView ? '100%' : '0%' }}
            transition={{ duration: 4.5, ease: 'linear' }}
          />
        )}
        <figcaption className="sr-only">{s[active].detail}</figcaption>
      </figure>
    </div>
  );
}
