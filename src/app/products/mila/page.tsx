
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Layers,
  ScanSearch,
  UserCheck,
  MessageCircleQuestion,
  Landmark,
  Lock,
  ShieldQuestion,
  History,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHero } from '@/components/shared/page-hero';
import { ContactSection } from '@/components/shared/contact-section';
import { Reveal, WordReveal } from '@/components/motion/reveal';
import { CountUp } from '@/components/motion/count-up';
import { ImpactChain } from '@/components/motion/impact-chain';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';

const content = {
  es: {
    heroBadge: 'Mila · Control inteligente',
    heroTitle: 'El expediente, leído antes de que lo firmes.',
    heroSubtitle:
      'Mila lo revisa completo, lo cruza con la norma y te entrega cada hallazgo con su evidencia. Usted decide.',
    heroCtaDemo: 'Solicitá una demo',
    heroCtaHow: 'Ver cómo funciona',

    problemEyebrow: '01 · El problema',
    problemTitle: 'En toda Latinoamérica hay una Gabriela.',
    problemP1: 'Síndica, contralora, auditora: su firma dice que un expediente está en orden.',
    problemP2:
      'Pero un expediente tiene cientos de páginas, y ella tiene decenas esperando. Entonces revisa una parte, firma, y el error aparece meses después, cuando ya se pagó, ya se contrató o ya se ejecutó.',
    problemP3: 'Con Mila, Gabriela revisa todo, y lo revisa antes.',
    problemStats: [
      { icon: FileText, value: 200, label: 'páginas por expediente' },
      { icon: Layers, value: 1000, label: 'expedientes esperando revisión' },
    ],

    approachEyebrow: '02 · El enfoque',
    approachTitle: 'Tecnología, más persona.',
    approachMachine: 'Mila',
    approachMachineItems: ['Lee todo', 'Lo compara con cada norma', 'Señala lo que falta'],
    approachHuman: 'La persona',
    approachHumanItems: ['Interpreta', 'Contrasta', 'Decide'],
    approachNote:
      'Así el auditor deja de ser quien llega al final a buscar culpables, y pasa a ser el socio de confianza del organismo.',

    howEyebrow: '03 · Cómo funciona',
    howTitle: 'Cuatro pasos, sin configuración previa.',
    howSteps: [
      { shot: 0, text: <><strong>Subí el expediente</strong>, completo o por partes.</> },
      { shot: 1, text: <><strong>Mila reconoce la norma</strong> que el expediente cita y arma el <em>programa de trabajo</em>.</> },
      { shot: 2, text: <><strong>Recibí los hallazgos</strong>, cada uno con artículo y evidencia, y aparte, lo que queda por verificar.</> },
      { shot: 2, text: <><strong>Decidí:</strong> aceptá, corregí o descartá con motivo, y registralo en el informe.</> },
    ],
    howShots: [
      { src: '/products/mila/mila-inicio-sesion.png', width: 1365, height: 630, alt: 'Pantalla real de Mila: inicio de una sesión nueva para cargar el expediente' },
      { src: '/products/mila/mila-programa-trabajo.png', width: 1365, height: 628, alt: 'Pantalla real de Mila: programa de trabajo de auditoría armado a partir de la norma del expediente' },
      { src: '/products/mila/mila-validacion-resultados.png', width: 1348, height: 629, alt: 'Pantalla real de Mila: resultado de una validación con observaciones graves, reglas sin respaldo y cumplimientos' },
    ],

    caseEyebrow: '04 · Validación',
    caseTitle: 'Usada donde el control importa.',
    caseLabel: 'En la práctica',
    casePrefix: 'revisados en',
    caseSeconds: '30 segundos',
    caseText:
      'En una licitación, faltaba la intervención del Tribunal de Cuentas, exigida por ordenanza. Una observación fundada alcanzó para revisar el proceso completo a tiempo.',
    caseInUseTitle: 'En uso hoy',
    caseInUse: [
      'Sindicatura General de la Nación (Argentina), en beta',
      'Universidades nacionales',
      'Organismos de control evaluando su implementación',
    ],
    caseOrigin: 'Nacida en Corrupción Cero (CAF), entre los 20 proyectos seleccionados de la región.',

    impactEyebrow: '05 · El impacto',
    impactTitle: 'Lo que gana cada uno.',
    impactStory: [
      {
        sentence: 'Gabriela dedica su tiempo a evaluar el riesgo y decidir, no a leer.',
        stat: { value: 76, suffix: '%', label: 'menos tiempo de validación' },
      },
      {
        sentence: 'El organismo corrige el error cuando todavía cuesta poco, y gana un aliado en vez de un controlador.',
        stat: { value: 67, prefix: '+', suffix: '%', label: 'más observaciones fundadas' },
      },
      {
        sentence: 'La ciudadanía puede confiar en lo que se firmó, porque cada decisión se puede explicar, hoy y dentro de tres años.',
      },
    ],
    impactClosing: 'Porque transparencia es confianza.',

    diffEyebrow: '06 · La diferencia',
    diffTitle: 'Hecha para quien firma.',
    diffItems: [
      {
        icon: ShieldQuestion,
        title: 'Dice lo que no sabe',
        text: 'Separa evidencia de señal y declara qué no pudo verificar.',
      },
      {
        icon: MessageCircleQuestion,
        title: 'Explica cada hallazgo',
        text: 'Con la norma, el documento y el razonamiento.',
      },
      {
        icon: History,
        title: 'Recuerda tu criterio',
        text: 'Cada descarte queda registrado y se considera la próxima vez.',
      },
      {
        icon: Lock,
        title: 'Protege lo sensible',
        text: 'La información confidencial queda dentro del organismo.',
      },
    ],

    chainEyebrow: 'Por qué lo hacemos',
    chainTitle: 'Cada minuto recuperado construye algo más grande.',
    chain: [
      { stage: 'La experiencia', stat: { value: 10, prefix: '+', suffix: 'M' }, text: 'documentos gestionados' },
      { stage: 'Lo que se encuentra', stat: { value: 67, prefix: '+', suffix: '%' }, text: 'más observaciones fundadas' },
      { stage: 'Lo que se recupera', stat: { value: 76, suffix: '%' }, text: 'menos tiempo' },
      { stage: 'Lo que construye', headline: 'Confianza', text: 'del organismo en su auditor y de la ciudadanía en el Estado' },
    ],

    contactSubtitle: 'Traé un expediente y lo revisamos juntos, en vivo. Respondemos en menos de 48 horas.',
  },
  en: {
    heroBadge: 'Mila · Intelligent oversight',
    heroTitle: 'The file, read before you sign it.',
    heroSubtitle:
      'Mila reviews all of it, checks it against the rules and hands you every finding with its evidence. You decide.',
    heroCtaDemo: 'Request a demo',
    heroCtaHow: 'See how it works',

    problemEyebrow: '01 · The problem',
    problemTitle: 'All across Latin America there is a Gabriela.',
    problemP1: 'Comptroller, controller, auditor: her signature says a file is in order.',
    problemP2:
      'But a file has hundreds of pages, and she has dozens waiting. So she reviews part of it, signs, and the error shows up months later, when it was already paid, already hired or already executed.',
    problemP3: 'With Mila, Gabriela reviews everything, and reviews it sooner.',
    problemStats: [
      { icon: FileText, value: 200, label: 'pages per file' },
      { icon: Layers, value: 1000, label: 'files waiting for review' },
    ],

    approachEyebrow: '02 · The approach',
    approachTitle: 'Technology, plus people.',
    approachMachine: 'Mila',
    approachMachineItems: ['Reads everything', 'Checks it against every rule', 'Flags what is missing'],
    approachHuman: 'The person',
    approachHumanItems: ['Interprets', 'Cross-checks', 'Decides'],
    approachNote:
      'So the auditor stops being the one who arrives at the end looking for someone to blame, and becomes the agency’s trusted partner.',

    howEyebrow: '03 · How it works',
    howTitle: 'Four steps, no prior setup.',
    howSteps: [
      { shot: 0, text: <><strong>Upload the file</strong>, whole or in parts.</> },
      { shot: 1, text: <><strong>Mila recognizes the regulation</strong> the file cites and builds the <em>audit work program</em>.</> },
      { shot: 2, text: <><strong>Get the findings</strong>, each with its article and evidence, and separately, what is left to verify.</> },
      { shot: 2, text: <><strong>Decide:</strong> accept, correct or dismiss with a reason, and record it in the report.</> },
    ],
    howShots: [
      { src: '/products/mila/mila-inicio-sesion.png', width: 1365, height: 630, alt: 'Real Mila screen: starting a new session to upload the file' },
      { src: '/products/mila/mila-programa-trabajo.png', width: 1365, height: 628, alt: 'Real Mila screen: audit work program built from the regulation the file cites' },
      { src: '/products/mila/mila-validacion-resultados.png', width: 1348, height: 629, alt: 'Real Mila screen: validation result with serious observations, unsupported rules and compliant items' },
    ],

    caseEyebrow: '04 · Validation',
    caseTitle: 'Used where oversight matters.',
    caseLabel: 'In practice',
    casePrefix: 'reviewed in',
    caseSeconds: '30 seconds',
    caseText:
      'In a tender, the intervention of the Court of Accounts, required by ordinance, was missing. One well-founded observation was enough to review the whole process in time.',
    caseInUseTitle: 'In use today',
    caseInUse: [
      'Office of the Comptroller General of Argentina (SIGEN), in beta',
      'National universities',
      'Oversight agencies evaluating implementation',
    ],
    caseOrigin: 'Born in Corrupción Cero (CAF), among the 20 selected projects of the region.',

    impactEyebrow: '05 · The impact',
    impactTitle: 'What each one gains.',
    impactStory: [
      {
        sentence: 'Gabriela spends her time assessing risk and deciding, not reading.',
        stat: { value: 76, suffix: '%', label: 'less validation time' },
      },
      {
        sentence: 'The agency fixes the error while it is still cheap, and gains an ally instead of a controller.',
        stat: { value: 67, prefix: '+', suffix: '%', label: 'more well-founded observations' },
      },
      {
        sentence: 'Citizens can trust what was signed, because every decision can be explained, today and three years from now.',
      },
    ],
    impactClosing: 'Because transparency is trust.',

    diffEyebrow: '06 · The difference',
    diffTitle: 'Built for whoever signs.',
    diffItems: [
      {
        icon: ShieldQuestion,
        title: 'It says what it doesn’t know',
        text: 'It separates evidence from signal and states what it could not verify.',
      },
      {
        icon: MessageCircleQuestion,
        title: 'It explains every finding',
        text: 'With the rule, the document and the reasoning.',
      },
      {
        icon: History,
        title: 'It remembers your judgment',
        text: 'Every dismissal is recorded and taken into account next time.',
      },
      {
        icon: Lock,
        title: 'It protects what is sensitive',
        text: 'Confidential information stays inside the agency.',
      },
    ],

    chainEyebrow: 'Why we do it',
    chainTitle: 'Every recovered minute builds something bigger.',
    chain: [
      { stage: 'The experience', stat: { value: 10, prefix: '+', suffix: 'M' }, text: 'documents managed' },
      { stage: 'What gets found', stat: { value: 67, prefix: '+', suffix: '%' }, text: 'more well-founded observations' },
      { stage: 'What gets recovered', stat: { value: 76, suffix: '%' }, text: 'less time' },
      { stage: 'What it builds', headline: 'Trust', text: 'of the agency in its auditor, and of citizens in the State' },
    ],

    contactSubtitle: 'Bring a file and we review it together, live. We reply within 48 hours.',
  },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mila-accent">{children}</p>
  );
}

export default function MilaPage() {
  const { language } = useLanguage();
  const c = content[language];
  const [activeStep, setActiveStep] = useState(0);
  const activeShot = c.howSteps[activeStep].shot;

  return (
    <div className="flex flex-col">
      <PageHero
        mesh="mila"
        eyebrow={
          <span className="flex flex-col items-center gap-5">
            <Image
              src="/products/mila/mila-logo.png"
              alt="MILA"
              width={110}
              height={110}
              priority
              className="h-20 w-auto drop-shadow-[0_12px_40px_rgba(232,113,58,0.35)] md:h-24"
            />
            <Badge className="glass-dark border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-white hover:bg-white/10">
              {c.heroBadge}
            </Badge>
          </span>
        }
        title={<span className="font-headline font-extrabold"><WordReveal text={c.heroTitle} delay={0.1} /></span>}
        subtitle={c.heroSubtitle}
      >
        <Button asChild size="lg" className="bg-mila-accent text-white shadow-lg shadow-mila-accent/30 hover:bg-mila-accent/90 hover:shadow-xl hover:shadow-mila-accent/40">
          <Link href="#contacto">{c.heroCtaDemo}</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
          <Link href="#como-funciona">{c.heroCtaHow}</Link>
        </Button>
      </PageHero>

      {/* 01 · El problema — Gabriela */}
      <section className="bg-background">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Reveal>
            <Eyebrow>{c.problemEyebrow}</Eyebrow>
            <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight text-balance">
              {c.problemTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
            <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>{c.problemP1}</p>
              <p>{c.problemP2}</p>
              <p className="font-semibold text-mila-accent">{c.problemP3}</p>
            </Reveal>
            <div className="flex flex-col justify-center gap-5">
              {c.problemStats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.label} delay={0.1 + i * 0.12}>
                    <div className="flex items-center gap-5 rounded-2xl border border-black/5 bg-card p-6 card-elevated">
                      <Icon className="size-7 shrink-0 text-mila" aria-hidden />
                      <div className="flex items-baseline gap-4">
                        <CountUp value={s.value} prefix="+" className="text-3xl md:text-4xl text-mila" />
                        <span className="text-sm leading-snug text-muted-foreground">{s.label}</span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 02 · El enfoque */}
      <section className="bg-card border-y border-black/5">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Eyebrow>{c.approachEyebrow}</Eyebrow>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight">{c.approachTitle}</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-mila p-8 md:p-10 text-white card-elevated">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">{c.approachMachine}</p>
              <ul className="mt-6 space-y-4">
                {c.approachMachineItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg">
                    <ScanSearch className="size-5 shrink-0 text-mila-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-black/5 bg-background p-8 md:p-10 card-elevated">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mila-accent">{c.approachHuman}</p>
              <ul className="mt-6 space-y-4">
                {c.approachHumanItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg">
                    <UserCheck className="size-5 shrink-0 text-mila-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-base md:text-lg leading-relaxed text-muted-foreground">{c.approachNote}</p>
        </div>
      </section>

      {/* 03 · Cómo funciona — cada paso muestra su pantalla real */}
      <section id="como-funciona" className="mesh-mila text-white scroll-mt-20">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Reveal>
            <Eyebrow>{c.howEyebrow}</Eyebrow>
            <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight text-balance">{c.howTitle}</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[4fr_8fr] lg:items-center">
            <ol className="flex flex-col gap-3">
              {c.howSteps.map((step, i) => (
                <Reveal key={i} delay={0.1 + i * 0.12}>
                  <li>
                    <button
                      type="button"
                      onClick={() => setActiveStep(i)}
                      onMouseEnter={() => setActiveStep(i)}
                      aria-pressed={activeStep === i}
                      className={cn(
                        'flex w-full gap-5 rounded-xl p-4 text-left transition-colors',
                        activeStep === i ? 'bg-white/10' : 'hover:bg-white/5'
                      )}
                    >
                      <span className="stat-number text-2xl text-mila-accent">{String(i + 1).padStart(2, '0')}</span>
                      <p
                        className={cn(
                          'text-base leading-relaxed transition-colors [&_strong]:font-bold [&_strong]:text-white',
                          activeStep === i ? 'text-white/90' : 'text-white/65'
                        )}
                      >
                        {step.text}
                      </p>
                    </button>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.2} y={40}>
              <figure className="grid overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                {c.howShots.map((shot, i) => (
                  <Image
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    aria-hidden={activeShot !== i}
                    className={cn(
                      'h-auto w-full transition-opacity duration-500 [grid-area:1/1]',
                      activeShot === i ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                ))}
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 · Validación */}
      <section className="bg-background">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Eyebrow>{c.caseEyebrow}</Eyebrow>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight">{c.caseTitle}</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[7fr_5fr]">
            <div className="rounded-2xl bg-mila p-8 md:p-12 text-white card-elevated">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mila-accent">{c.caseLabel}</p>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <CountUp value={22} prefix="$" suffix="M" className="text-6xl md:text-8xl" />
                <span className="text-xl md:text-2xl text-white/75">
                  {c.casePrefix} <strong className="text-mila-accent">{c.caseSeconds}</strong>
                </span>
              </div>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-white/85">{c.caseText}</p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-black/5 bg-card p-7 card-elevated">
                <div className="flex items-center gap-3">
                  <Landmark className="size-6 shrink-0 text-mila" aria-hidden />
                  <p className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">{c.caseInUseTitle}</p>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {c.caseInUse.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-mila-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-black/5 bg-card p-7 card-elevated">
                <div className="flex items-center gap-4">
                  <Image src="/logos/caf.jpg" alt="CAF — Banco de Desarrollo de América Latina" width={72} height={72} className="rounded-lg" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{c.caseOrigin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 · El impacto — qué gana cada actor */}
      <section className="bg-card border-y border-black/5">
        <div className="container max-w-3xl px-4 py-20 md:py-28">
          <Reveal>
            <Eyebrow>{c.impactEyebrow}</Eyebrow>
            <h2 className="mt-4 font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-balance">{c.impactTitle}</h2>
          </Reveal>
          <ol className="relative mt-14 flex flex-col gap-14 border-l-2 border-mila/15 pl-8 md:pl-12">
            {c.impactStory.map((step, i) => (
              <Reveal key={step.sentence} delay={i * 0.12}>
                <li className="relative">
                  <span
                    aria-hidden
                    className={
                      'absolute -left-[41px] top-1.5 size-4 rounded-full border-2 border-card md:-left-[57px] ' +
                      (i === c.impactStory.length - 1 ? 'bg-mila-accent' : 'bg-mila')
                    }
                  />
                  <p className="font-headline text-2xl md:text-3xl font-extrabold leading-snug tracking-tight text-balance">
                    {step.sentence}
                  </p>
                  {step.stat && (
                    <p className="mt-4 inline-flex items-baseline gap-2.5 rounded-full bg-mila/5 px-5 py-2">
                      <CountUp
                        value={step.stat.value}
                        prefix={step.stat.prefix}
                        suffix={step.stat.suffix}
                        className="text-xl text-mila-accent"
                      />
                      <span className="text-sm text-muted-foreground">{step.stat.label}</span>
                    </p>
                  )}
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.4}>
            <p className="mt-14 font-headline text-2xl md:text-3xl font-extrabold tracking-tight text-mila-accent">
              {c.impactClosing}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 06 · La diferencia */}
      <section className="bg-background">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Eyebrow>{c.diffEyebrow}</Eyebrow>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight">{c.diffTitle}</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {c.diffItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-6 rounded-2xl border border-black/5 bg-card p-7 card-elevated">
                  <Icon className="size-8 shrink-0 text-mila" aria-hidden />
                  <div>
                    <h3 className="font-headline text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Por qué lo hacemos — mismo formato que el home */}
      <section className="mesh-brand">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Reveal>
            <Eyebrow>{c.chainEyebrow}</Eyebrow>
            <h2 className="mt-4 font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
              {c.chainTitle}
            </h2>
          </Reveal>
          <div className="mt-14">
            <ImpactChain steps={c.chain} accentText="text-mila-accent" accentBg="bg-mila-accent" />
          </div>
        </div>
      </section>

      <ContactSection subtitle={c.contactSubtitle} />
    </div>
  );
}
