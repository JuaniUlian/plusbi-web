"use client";

import Image from 'next/image';
import { Reveal } from '@/components/motion/reveal';
import { useLanguage } from '@/contexts/language-context';

const LOGOS = [
  { src: '/logos/pnud.jpg', alt: 'PNUD — Programa de las Naciones Unidas para el Desarrollo' },
  { src: '/logos/oei.jpg', alt: 'OEI — Organización de Estados Iberoamericanos' },
  { src: '/logos/caf.jpg', alt: 'CAF — Banco de Desarrollo de América Latina' },
  { src: '/logos/sigen.jpg', alt: 'SIGEN — Sindicatura General de la Nación' },
  { src: '/logos/entre-rios.png', alt: 'Gobierno de Entre Ríos' },
];

/** Sección de confianza: los organismos que trabajaron con PLUS BI, como en el deck. */
export function TrustedBy() {
  const { language } = useLanguage();

  return (
    <section aria-label={language === 'es' ? 'Han confiado en nuestro trabajo' : 'They have trusted our work'} className="bg-background">
      <div className="container max-w-6xl px-4 py-16 md:py-20">
        <Reveal>
          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {language === 'es' ? 'Han confiado en nuestro trabajo' : 'They have trusted our work'}
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {LOGOS.map((logo, i) => (
            <Reveal key={logo.alt} delay={0.05 + i * 0.08}>
              <div className="flex h-28 items-center justify-center rounded-2xl border border-black/5 bg-white p-5 card-elevated zoom-hover">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={90}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
