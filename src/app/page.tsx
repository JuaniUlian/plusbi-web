
'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { BrowserFrame } from '@/components/shared/browser-frame';
import { QuestDashboardMock } from '@/components/shared/quest-dashboard-mock';
import { TrustedBy } from '@/components/shared/trusted-by';
import { ContactSection } from '@/components/shared/contact-section';
import { Reveal, WordReveal } from '@/components/motion/reveal';
import { CountUp } from '@/components/motion/count-up';
import { ImpactChain } from '@/components/motion/impact-chain';

const content = {
  es: {
    heroEyebrow: 'PLUS BI · Tecnología para un mejor Gobierno',
    heroTitle: 'Le devolvemos el tiempo a quienes gobiernan.',
    heroSubtitle:
      'Nos encargamos del trabajo pesado de la gestión pública — leer, revisar, cruzar datos — para que tu equipo se dedique a decidir.',
    heroCtaProducts: 'Descubrí cómo',
    heroCtaTalk: 'Hablemos',
    chaptersTitle: 'Tres herramientas, una convicción.',
    chaptersSubtitle: 'Que cada hora recuperada vuelva a la gestión. Este es el camino.',
    chapters: {
      mila: {
        number: '01',
        product: 'Mila',
        whisper: 'La firma de una auditora sostiene expedientes de miles de páginas.',
        title: 'El control público puede ser instantáneo.',
        text: 'Mila lee el expediente completo, lo cruza con toda tu normativa y devuelve cada hallazgo con su cita legal y evidencia. El criterio final siempre es de la persona — pero llega con todo analizado.',
        cta: 'Conocé Mila',
      },
      quest: {
        number: '02',
        product: 'Quest',
        whisper: 'Las decisiones de cuatro años se toman con encuestas de hace dos semanas.',
        title: 'La foto electoral del país, al día.',
        text: 'Quest reúne encuestas y datos electorales de todo el país, los cruza por provincia, cámara y encuestadora, y los convierte en un tablero vivo. Decidís con la información de hoy.',
        cta: 'Conocé Quest',
        statData: 'puntos de datos analizados en campañas',
        statProvinces: 'provincias con datos electorales',
      },
      see: {
        number: '03',
        product: 'Expediente Electrónico',
        whisper: 'El expediente que hoy duerme en un archivo puede viajar en un clic.',
        title: 'El papel ya es opcional.',
        text: 'Instalamos, damos soporte y capacitamos en sistemas de expediente electrónico de código abierto. Trámites trazables, auditables y accesibles desde cualquier lugar.',
        cta: 'Conocé el sistema',
        statImpl: 'implementaciones',
        statUsers: 'usuarios activos',
        statDocs: 'documentos gestionados',
      },
    },
    milaShotAlt: 'Pantalla real de Mila mostrando un hallazgo crítico con su cita normativa y evidencia',
    chainEyebrow: 'Por qué lo hacemos',
    chainTitle: 'Cada minuto recuperado construye algo más grande.',
    chain: [
      { stage: 'La experiencia', stat: { value: 10, prefix: '+', suffix: 'M' }, text: 'documentos gestionados en las plataformas de PLUS BI' },
      { stage: 'Lo que tu equipo encuentra', stat: { value: 67, prefix: '+', suffix: '%' }, text: 'más errores detectados antes de firmar' },
      { stage: 'Lo que recupera', stat: { value: 76, suffix: '%' }, text: 'menos tiempo de validación por expediente' },
      { stage: 'Lo que construye', headline: 'Confianza', text: 'expedientes en tiempo y forma, obras que se terminan, servicios que llegan' },
    ],
    wizardTitle: 'Contanos tu desafío.',
    wizardSubtitle: 'Describilo con tus palabras y te decimos qué herramienta lo resuelve.',
  },
  en: {
    heroEyebrow: 'PLUS BI · Technology for better Government',
    heroTitle: 'We give time back to those who govern.',
    heroSubtitle:
      'We take care of public administration’s heavy lifting — reading, reviewing, cross-checking data — so your team can focus on deciding.',
    heroCtaProducts: 'See how',
    heroCtaTalk: "Let's talk",
    chaptersTitle: 'Three tools, one conviction.',
    chaptersSubtitle: 'Every recovered hour should go back into governing. This is the path.',
    chapters: {
      mila: {
        number: '01',
        product: 'Mila',
        whisper: 'An auditor’s signature carries files thousands of pages long.',
        title: 'Public oversight can be instant.',
        text: 'Mila reads the whole file, checks it against all your regulations and returns every finding with its legal citation and evidence. The final judgment is always human — but it arrives fully analyzed.',
        cta: 'Meet Mila',
      },
      quest: {
        number: '02',
        product: 'Quest',
        whisper: 'Four-year decisions are made with two-week-old polls.',
        title: 'The country’s electoral picture, up to date.',
        text: 'Quest gathers polls and electoral data from the whole country, cross-references them by province, chamber and pollster, and turns them into a live dashboard. You decide with today’s information.',
        cta: 'Meet Quest',
        statData: 'data points analyzed in campaigns',
        statProvinces: 'provinces with electoral data',
      },
      see: {
        number: '03',
        product: 'Electronic Records',
        whisper: 'The file sleeping in an archive today could travel in one click.',
        title: 'Paper is now optional.',
        text: 'We install, support and train teams on open-source electronic record systems. Procedures that are traceable, auditable and accessible from anywhere.',
        cta: 'Meet the system',
        statImpl: 'implementations',
        statUsers: 'active users',
        statDocs: 'documents managed',
      },
    },
    milaShotAlt: 'Real Mila screen showing a critical finding with its legal citation and evidence',
    chainEyebrow: 'Why we do it',
    chainTitle: 'Every recovered minute builds something bigger.',
    chain: [
      { stage: 'The experience', stat: { value: 10, prefix: '+', suffix: 'M' }, text: 'documents managed on PLUS BI platforms' },
      { stage: 'What your team finds', stat: { value: 67, prefix: '+', suffix: '%' }, text: 'more errors detected before signing' },
      { stage: 'What it recovers', stat: { value: 76, suffix: '%' }, text: 'less validation time per file' },
      { stage: 'What it builds', headline: 'Trust', text: 'files done on time, public works finished, services delivered' },
    ],
    wizardTitle: 'Tell us your challenge.',
    wizardSubtitle: 'Describe it in your own words and we tell you which tool solves it.',
  },
};

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

function ChapterMarker({ number, accentBg }: { number: string; accentBg: string }) {
  return (
    <div aria-hidden className="absolute -left-[41px] top-1 hidden lg:flex">
      <span className={`flex size-8 items-center justify-center rounded-full text-xs font-bold text-white ${accentBg}`}>
        {number}
      </span>
    </div>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const c = content[language];
  const reduce = useReducedMotion();

  const threadRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: threadRef,
    offset: ['start 0.75', 'end 0.7'],
  });
  const threadScale = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <div className="flex flex-col overflow-x-clip">
      {/* Hero */}
      <section className="relative mesh-brand overflow-hidden">
        {!reduce && (
          <>
            <motion.div
              aria-hidden
              className="absolute -top-32 right-[-10%] size-[420px] rounded-full bg-accent/15 blur-3xl"
              animate={{ y: [0, 26, 0], x: [0, -14, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden
              className="absolute bottom-[-20%] left-[-8%] size-[380px] rounded-full bg-primary/10 blur-3xl"
              animate={{ y: [0, -22, 0], x: [0, 16, 0] }}
              transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
        <div className="container relative max-w-5xl px-4 py-24 md:py-36 text-center">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {c.heroEyebrow}
          </motion.p>
          <h1 className="mt-6 font-headline text-4xl font-extrabold tracking-tight md:text-7xl text-balance">
            <WordReveal text={c.heroTitle} delay={0.15} />
          </h1>
          <motion.p
            className="mx-auto mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-muted-foreground text-balance"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
          >
            {c.heroSubtitle}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
          >
            <Button asChild size="lg">
              <Link href="#historia">{c.heroCtaProducts}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#contacto">{c.heroCtaTalk}</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* El hilo: tres capítulos conectados */}
      <section id="historia" className="scroll-mt-20 bg-card border-y border-black/5">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Reveal>
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
              {c.chaptersTitle}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">{c.chaptersSubtitle}</p>
          </Reveal>

          <div ref={threadRef} className="relative mt-16 lg:pl-16">
            {/* Línea que crece con el scroll */}
            <div aria-hidden className="absolute left-[15px] top-0 hidden h-full w-px bg-border lg:block" />
            <motion.div
              aria-hidden
              className="absolute left-[15px] top-0 hidden h-full w-px origin-top bg-gradient-to-b from-mila via-quest to-see lg:block"
              style={reduce ? undefined : { scaleY: threadScale }}
            />

            <div className="flex flex-col gap-24 md:gap-32">
              {/* 01 · Mila */}
              <div className="relative">
                <ChapterMarker number={c.chapters.mila.number} accentBg="bg-mila" />
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[5fr_7fr]">
                  <div>
                    <Reveal>
                      <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-mila">
                        <span className="flex size-8 items-center justify-center rounded-lg border border-mila/15 bg-white p-1">
                          <Image src="/products/mila/mila-logo-dark.png" alt="" aria-hidden width={28} height={28} className="size-6 object-contain" />
                        </span>
                        {c.chapters.mila.product}
                      </p>
                      <p className="mt-4 font-headline text-lg italic leading-snug text-muted-foreground">
                        {c.chapters.mila.whisper}
                      </p>
                      <h3 className="mt-4 font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
                        {c.chapters.mila.title}
                      </h3>
                      <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                        {c.chapters.mila.text}
                      </p>
                    </Reveal>
                    <Reveal delay={0.15}>
                      <div className="mt-6 flex gap-10">
                        <p>
                          <CountUp value={67} prefix="+" suffix="%" className="text-3xl text-mila" />
                          <span className="mt-1 block max-w-[10rem] text-xs leading-snug text-muted-foreground">
                            {language === 'es' ? 'más errores detectados' : 'more errors detected'}
                          </span>
                        </p>
                        <p>
                          <CountUp value={76} suffix="%" className="text-3xl text-mila" />
                          <span className="mt-1 block max-w-[10rem] text-xs leading-snug text-muted-foreground">
                            {language === 'es' ? 'menos tiempo de validación' : 'less validation time'}
                          </span>
                        </p>
                      </div>
                      <Button asChild size="lg" className="mt-8 bg-mila text-white shadow-lg shadow-mila/25 hover:bg-mila/90 hover:shadow-xl hover:shadow-mila/30">
                        <Link href="/products/mila">
                          {c.chapters.mila.cta}
                          <ArrowRight aria-hidden />
                        </Link>
                      </Button>
                    </Reveal>
                  </div>
                  <Reveal delay={0.1} y={40}>
                    <BrowserFrame
                      src="/products/mila/mila-07-hallazgo.png"
                      alt={c.milaShotAlt}
                      url="mila.docufy.ar"
                      width={1347}
                      height={632}
                    />
                  </Reveal>
                </div>
              </div>

              {/* 02 · Quest — el mock es el protagonista, con modos interactivos */}
              <div className="relative">
                <ChapterMarker number={c.chapters.quest.number} accentBg="bg-quest" />
                <div className="mx-auto max-w-3xl text-center">
                  <Reveal>
                    <p className="flex items-center justify-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-quest">
                      <span className="flex size-8 items-center justify-center rounded-lg border border-quest/15 bg-white p-1">
                        <Image src="/logo/quest.png" alt="" aria-hidden width={28} height={28} className="size-6 object-contain" />
                      </span>
                      {c.chapters.quest.product}
                    </p>
                    <p className="mt-4 font-headline text-lg italic leading-snug text-muted-foreground">
                      {c.chapters.quest.whisper}
                    </p>
                    <h3 className="mt-4 font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
                      {c.chapters.quest.title}
                    </h3>
                    <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                      {c.chapters.quest.text}
                    </p>
                  </Reveal>
                </div>
                <Reveal delay={0.15} y={40} className="mx-auto mt-10 max-w-3xl">
                  <QuestDashboardMock />
                </Reveal>
                <Reveal delay={0.2} className="mt-8 text-center">
                  <Button asChild size="lg" className="bg-quest text-white shadow-lg shadow-quest/25 hover:bg-quest/90 hover:shadow-xl hover:shadow-quest/30">
                    <Link href="/products/quest">
                      {c.chapters.quest.cta}
                      <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                </Reveal>
              </div>

              {/* 03 · Expediente Electrónico */}
              <div className="relative">
                <ChapterMarker number={c.chapters.see.number} accentBg="bg-see" />
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[5fr_7fr]">
                  <div>
                    <Reveal>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-see">
                        {c.chapters.see.product}
                      </p>
                      <p className="mt-4 font-headline text-lg italic leading-snug text-muted-foreground">
                        {c.chapters.see.whisper}
                      </p>
                      <h3 className="mt-4 font-headline text-3xl md:text-4xl font-extrabold tracking-tight text-balance">
                        {c.chapters.see.title}
                      </h3>
                      <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">
                        {c.chapters.see.text}
                      </p>
                      <Button asChild size="lg" className="mt-8 bg-see text-white shadow-lg shadow-see/25 hover:bg-see/90 hover:shadow-xl hover:shadow-see/30">
                        <Link href="/products/see">
                          {c.chapters.see.cta}
                          <ArrowRight aria-hidden />
                        </Link>
                      </Button>
                    </Reveal>
                  </div>
                  <Reveal delay={0.1} y={40}>
                    <div className="rounded-2xl glass p-8 md:p-10">
                      <div className="grid grid-cols-3 gap-6 text-center">
                        <p>
                          <CountUp value={30} prefix="+" className="text-3xl md:text-4xl text-see" />
                          <span className="mt-2 block text-xs leading-snug text-muted-foreground">{c.chapters.see.statImpl}</span>
                        </p>
                        <p>
                          <CountUp value={40} prefix="+" suffix="k" className="text-3xl md:text-4xl text-see" />
                          <span className="mt-2 block text-xs leading-snug text-muted-foreground">{c.chapters.see.statUsers}</span>
                        </p>
                        <p>
                          <CountUp value={10} prefix="+" suffix="M" className="text-3xl md:text-4xl text-see" />
                          <span className="mt-2 block text-xs leading-snug text-muted-foreground">{c.chapters.see.statDocs}</span>
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustedBy />

      {/* Teoría de cambio */}
      <section className="mesh-brand">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{c.chainEyebrow}</p>
            <h2 className="mt-4 font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
              {c.chainTitle}
            </h2>
          </Reveal>
          <div className="mt-14">
            <ImpactChain
              steps={c.chain}
              accentText="text-accent"
              accentBg="bg-accent"
            />
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
