"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { CountUp } from './count-up';
import { cn } from '@/lib/utils';

export interface ChainStep {
  /** Etiqueta del eslabón: qué rol cumple en la teoría de cambio */
  stage: string;
  /** Número animado (opcional): { value, prefix, suffix, decimals } */
  stat?: { value: number; prefix?: string; suffix?: string; decimals?: number };
  /** Texto grande alternativo cuando no hay número */
  headline?: string;
  text: string;
}

interface ImpactChainProps {
  steps: ChainStep[];
  /** Clase de color del acento (ej. 'text-mila-accent') */
  accentText: string;
  /** Clase de fondo del conector (ej. 'bg-mila-accent') */
  accentBg: string;
  /** true si se renderiza sobre fondo oscuro */
  dark?: boolean;
}

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * Teoría de cambio como cadena causal: cada eslabón entra en secuencia y el
 * conector se dibuja entre medio. No son tiles sueltos: es un hilo con dirección.
 */
export function ImpactChain({ steps, accentText, accentBg, dark = false }: ImpactChainProps) {
  const reduce = useReducedMotion();

  return (
    <ol className="flex flex-col gap-0 lg:grid lg:gap-0" style={{ gridTemplateColumns: `repeat(${steps.length * 2 - 1}, auto)` }}>
      {steps.map((step, i) => (
        <li key={step.stage} className="contents">
          <motion.div
            className="max-w-xs"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px 0px' }}
            transition={{ duration: 0.6, delay: i * 0.35, ease: EASE }}
          >
            <p className={cn('text-xs font-semibold uppercase tracking-[0.2em]', accentText)}>
              {step.stage}
            </p>
            <p className="mt-3 text-4xl md:text-5xl">
              {step.stat ? (
                <CountUp
                  value={step.stat.value}
                  prefix={step.stat.prefix}
                  suffix={step.stat.suffix}
                  decimals={step.stat.decimals}
                  className={dark ? 'text-white' : 'text-foreground'}
                />
              ) : (
                <span className={cn('stat-number', dark ? 'text-white' : 'text-foreground')}>
                  {step.headline}
                </span>
              )}
            </p>
            <p className={cn('mt-3 text-sm leading-relaxed', dark ? 'text-white/70' : 'text-muted-foreground')}>
              {step.text}
            </p>
          </motion.div>

          {i < steps.length - 1 && (
            <motion.div
              aria-hidden
              className="my-6 flex items-center justify-start pl-2 lg:my-0 lg:justify-center lg:px-6 lg:pt-10"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true, margin: '-60px 0px' }}
              transition={{ duration: 0.4, delay: i * 0.35 + 0.25 }}
            >
              <span className={cn('hidden h-px w-10 origin-left lg:block', accentBg)} />
              <ArrowRight className={cn('hidden size-5 shrink-0 lg:block', accentText)} />
              <ArrowDown className={cn('size-5 shrink-0 lg:hidden', accentText)} />
            </motion.div>
          )}
        </li>
      ))}
    </ol>
  );
}
