import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

const meshClass = {
  brand: 'mesh-brand',
  mila: 'mesh-mila text-white',
  quest: 'mesh-quest',
  see: 'mesh-see',
} as const;

interface PageHeroProps {
  /** Eyebrow arriba del título (badge de producto o etiqueta de sección) */
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  /** CTAs u otro contenido bajo el subtítulo */
  children?: ReactNode;
  mesh?: keyof typeof meshClass;
  align?: 'center' | 'left';
  className?: string;
}

/**
 * Header canónico de página — orden fijo: eyebrow → h1 → subtítulo → CTAs.
 * Ver DESIGN.md.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  mesh = 'brand',
  align = 'center',
  className,
}: PageHeroProps) {
  const centered = align === 'center';
  return (
    <section className={cn(meshClass[mesh], 'relative overflow-hidden', className)}>
      <div
        className={cn(
          'container max-w-5xl px-4 py-20 md:py-28',
          centered ? 'text-center' : 'text-left'
        )}
      >
        {eyebrow && (
          <div className={cn('mb-6 flex', centered ? 'justify-center' : 'justify-start')}>
            {eyebrow}
          </div>
        )}
        <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-6xl text-balance">
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              'mt-6 text-lg md:text-xl leading-relaxed text-balance',
              mesh === 'mila' ? 'text-white/80' : 'text-muted-foreground',
              centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
            )}
          >
            {subtitle}
          </p>
        )}
        {children && (
          <div
            className={cn(
              'mt-9 flex flex-wrap items-center gap-4',
              centered && 'justify-center'
            )}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
