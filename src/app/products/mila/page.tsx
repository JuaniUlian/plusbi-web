
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  Layers,
  AlertTriangle,
  ScanSearch,
  UserCheck,
  MessageCircleQuestion,
  Landmark,
  Lock,
  TrafficCone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHero } from '@/components/shared/page-hero';
import { ContactSection } from '@/components/shared/contact-section';
import { Reveal, WordReveal } from '@/components/motion/reveal';
import { CountUp } from '@/components/motion/count-up';
import { ImpactChain } from '@/components/motion/impact-chain';
import { useLanguage } from '@/contexts/language-context';

const content = {
  es: {
    heroBadge: 'Mila · Control inteligente',
    heroTitle: 'Detecta irregularidades en minutos.',
    heroSubtitle:
      'Toda tu normativa. Todo el expediente. Mila hace el trabajo pesado sobre los documentos de tu organismo, para que decidas con toda la información ya analizada.',
    heroCtaDemo: 'Solicitá una demo',
    heroCtaHow: 'Ver cómo funciona',

    martaEyebrow: '01 · El problema',
    martaTitle: 'En toda Latinoamérica hay una Marta.',
    martaP1:
      'Síndica, contralora, auditora, revisora de cuentas. El nombre cambia; la responsabilidad es la misma: su firma dice que un expediente está en orden.',
    martaP2:
      'Las normas son muchísimas y los expedientes, más todavía. Entonces revisa lo estructural, o busca los problemas donde suelen esconderse.',
    martaP3: 'Marta no debería tener que elegir qué parte controlar.',
    martaStats: [
      { icon: FileText, value: 200, label: 'páginas por expediente, con 15 anexos técnicos' },
      { icon: Layers, value: 1000, label: 'expedientes esperando revisión manual' },
    ],
    martaWarning:
      'Cuando algo se escapa: la obra que no se termina, el servicio que no llega, la confianza en el Estado que se deteriora.',

    approachEyebrow: '02 · El enfoque',
    approachTitle: 'Tecnología, más persona.',
    approachMachine: 'Lo repetitivo, la máquina',
    approachMachineItems: ['Leer el expediente completo', 'Cruzarlo con cada norma', 'Rastrear lo que falta'],
    approachHuman: 'El juicio, la persona',
    approachHumanItems: ['El criterio', 'La experiencia', 'La resolución'],
    approachNote:
      'Mila no reemplaza al auditor ni decide por él: le saca el cuello de botella. Y aprende de su criterio con cada validación.',

    howEyebrow: '03 · La solución',
    howTitle: 'Subís un expediente. Mila lo audita en minutos.',
    howSubtitle: 'Tres pasos, sin manuales ni configuración previa.',
    howSteps: [
      { title: 'Subí el expediente', text: 'Carpetas completas o documentos sueltos: vos definís el alcance.' },
      { title: 'Elegí tu normativa', text: 'Tus grupos de reglas, extraídos de tus propias leyes y pliegos.' },
      { title: 'Recibí los hallazgos', text: 'Por nivel de riesgo, con cita normativa y evidencia textual. En minutos.' },
    ],
    howShotAlt: 'Pantalla real de Mila: hallazgo crítico con cita normativa, evidencia y nivel de riesgo',
    howDemo: 'Queré ver la plataforma completa: pedí una demo en vivo.',

    caseEyebrow: '04 · Validación',
    caseTitle: 'Usada donde el control importa.',
    caseLabel: 'Caso real',
    caseAmount: '$22M',
    casePrefix: 'auditado en',
    caseSeconds: '30 segundos',
    caseText:
      'En un expediente real, Mila detectó que faltaba la intervención documentada del Tribunal de Cuentas — exigida por ordenanza, pero omitida. Eso solo ya justificaba la revisión completa del proceso.',
    caseInUseTitle: 'En uso hoy',
    caseInUse: [
      'Sindicatura General de la Nación (Argentina), en implementación beta',
      'Universidades nacionales: compras y contrataciones',
      'Organismos de control evaluando su implementación',
    ],
    caseOrigin: 'Nacida en Corrupción Cero (CAF), entre los 20 proyectos seleccionados de la región.',

    chainEyebrow: '05 · El impacto',
    chainTitle: 'De minutos ganados a confianza recuperada.',
    chainSteps: [
      { stage: 'El insumo', stat: { value: 10, prefix: '+', suffix: 'M' }, text: 'documentos gestionados en las plataformas de PLUS BI' },
      { stage: 'El resultado', stat: { value: 67, prefix: '+', suffix: '%' }, text: 'más errores detectados que la revisión manual' },
      { stage: 'El efecto', stat: { value: 76, suffix: '%' }, text: 'menos tiempo de validación por expediente' },
      { stage: 'El impacto', headline: 'Confianza', text: 'expedientes en tiempo y forma: obras que se terminan, servicios que llegan' },
    ],

    diffEyebrow: '06 · La diferencia',
    diffTitle: 'No es una IA genérica.',
    diffItems: [
      {
        icon: ScanSearch,
        title: 'Entrenada con tu normativa',
        text: 'Extrae reglas de tus propias leyes, ordenanzas y pliegos — no de un corpus genérico de internet.',
      },
      {
        icon: TrafficCone,
        title: 'Clasifica por riesgo',
        text: 'Cada hallazgo llega con severidad (crítico, alto, medio), cita normativa y evidencia textual.',
      },
      {
        icon: MessageCircleQuestion,
        title: 'Explica sus hallazgos',
        text: 'Preguntale “¿por qué este hallazgo?” y te responde. Marcá falsos positivos y aprende de tu criterio.',
      },
      {
        icon: Lock,
        title: 'Datos sensibles, protegidos',
        text: 'Modelos locales filtran la información sensible antes de cualquier análisis. Despliegue on-premise o nube privada.',
      },
    ],
  },
  en: {
    heroBadge: 'Mila · Intelligent oversight',
    heroTitle: 'Detect irregularities in minutes.',
    heroSubtitle:
      'All your regulations. The whole file. Mila does the heavy lifting on your agency’s documents, so you decide with all the information already analyzed.',
    heroCtaDemo: 'Request a demo',
    heroCtaHow: 'See how it works',

    martaEyebrow: '01 · The problem',
    martaTitle: 'All across Latin America there is a Marta.',
    martaP1:
      'Comptroller, auditor, account reviewer. The name changes; the responsibility is the same: her signature says a file is in order.',
    martaP2:
      'The rules are endless and the files even more so. So she reviews the structure, or looks for problems where they usually hide.',
    martaP3: 'Marta should not have to choose which part to control.',
    martaStats: [
      { icon: FileText, value: 200, label: 'pages per file, with 15 technical annexes' },
      { icon: Layers, value: 1000, label: 'files waiting for manual review' },
    ],
    martaWarning:
      'When something slips through: the public work that never finishes, the service that never arrives, the trust in the State that erodes.',

    approachEyebrow: '02 · The approach',
    approachTitle: 'Technology, plus people.',
    approachMachine: 'The repetitive part: the machine',
    approachMachineItems: ['Read the whole file', 'Check it against every rule', 'Track what is missing'],
    approachHuman: 'The judgment: the person',
    approachHumanItems: ['The criteria', 'The experience', 'The resolution'],
    approachNote:
      'Mila does not replace the auditor or decide for them: it removes the bottleneck. And it learns from their judgment with every validation.',

    howEyebrow: '03 · The solution',
    howTitle: 'Upload a file. Mila audits it in minutes.',
    howSubtitle: 'Three steps, no manuals, no prior setup.',
    howSteps: [
      { title: 'Upload the file', text: 'Whole folders or individual documents: you define the scope.' },
      { title: 'Pick your regulations', text: 'Your rule groups, extracted from your own laws and tender documents.' },
      { title: 'Get the findings', text: 'By risk level, with legal citation and textual evidence. In minutes.' },
    ],
    howShotAlt: 'Real Mila screen: critical finding with legal citation, evidence and risk level',
    howDemo: 'Want to see the full platform? Ask for a live demo.',

    caseEyebrow: '04 · Validation',
    caseTitle: 'Used where oversight matters.',
    caseLabel: 'Real case',
    caseAmount: '$22M',
    casePrefix: 'audited in',
    caseSeconds: '30 seconds',
    caseText:
      'In a real file, Mila detected the missing documented intervention of the Court of Accounts — required by ordinance, but omitted. That alone justified a full review of the process.',
    caseInUseTitle: 'In use today',
    caseInUse: [
      'Office of the Comptroller General of Argentina (SIGEN), beta implementation',
      'National universities: procurement and hiring',
      'Oversight agencies evaluating implementation',
    ],
    caseOrigin: 'Born in Corrupción Cero (CAF), among the 20 selected projects of the region.',

    chainEyebrow: '05 · The impact',
    chainTitle: 'From minutes saved to trust regained.',
    chainSteps: [
      { stage: 'The input', stat: { value: 10, prefix: '+', suffix: 'M' }, text: 'documents managed on PLUS BI platforms' },
      { stage: 'The result', stat: { value: 67, prefix: '+', suffix: '%' }, text: 'more errors detected than manual review' },
      { stage: 'The effect', stat: { value: 76, suffix: '%' }, text: 'less validation time per file' },
      { stage: 'The impact', headline: 'Trust', text: 'files done on time: public works finished, services delivered' },
    ],

    diffEyebrow: '06 · The difference',
    diffTitle: 'Not a generic AI.',
    diffItems: [
      {
        icon: ScanSearch,
        title: 'Trained on your regulations',
        text: 'It extracts rules from your own laws, ordinances and tender documents — not from a generic internet corpus.',
      },
      {
        icon: TrafficCone,
        title: 'Classifies by risk',
        text: 'Every finding comes with severity (critical, high, medium), legal citation and textual evidence.',
      },
      {
        icon: MessageCircleQuestion,
        title: 'Explains its findings',
        text: 'Ask “why this finding?” and it answers. Flag false positives and it learns from your judgment.',
      },
      {
        icon: Lock,
        title: 'Sensitive data, protected',
        text: 'Local models filter sensitive information before any analysis. On-premise or private cloud deployment.',
      },
    ],
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
        <Button asChild size="lg" className="bg-mila-accent text-white hover:bg-mila-accent/90">
          <Link href="#contacto">{c.heroCtaDemo}</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
          <Link href="#como-funciona">{c.heroCtaHow}</Link>
        </Button>
      </PageHero>

      {/* 01 · El problema — Marta */}
      <section className="bg-background">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Reveal>
            <Eyebrow>{c.martaEyebrow}</Eyebrow>
            <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight text-balance">
              {c.martaTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[6fr_5fr] lg:gap-16">
            <Reveal className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>{c.martaP1}</p>
              <p>{c.martaP2}</p>
              <p className="font-semibold text-mila-accent">{c.martaP3}</p>
            </Reveal>
            <div className="flex flex-col gap-5">
              {c.martaStats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.label} delay={0.1 + i * 0.12}>
                    <div className="flex items-center gap-5 rounded-2xl border border-black/5 bg-card p-6 card-elevated">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mila/10 text-mila">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <div className="flex items-baseline gap-4">
                        <CountUp value={s.value} prefix="+" className="text-3xl md:text-4xl text-mila" />
                        <span className="text-sm leading-snug text-muted-foreground">{s.label}</span>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
              <Reveal delay={0.35}>
                <div className="flex items-center gap-5 rounded-2xl bg-mila p-6 text-white card-elevated">
                  <AlertTriangle className="size-6 shrink-0 text-mila-accent" aria-hidden />
                  <p className="text-sm md:text-base leading-relaxed">{c.martaWarning}</p>
                </div>
              </Reveal>
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

      {/* 03 · La solución — pasos + una sola pantalla (el resto se muestra en demo) */}
      <section id="como-funciona" className="mesh-mila text-white scroll-mt-20">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Reveal>
            <Eyebrow>{c.howEyebrow}</Eyebrow>
            <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight text-balance">{c.howTitle}</h2>
            <p className="mt-4 max-w-2xl text-lg text-white/70">{c.howSubtitle}</p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[4fr_8fr] lg:items-center">
            <ol className="flex flex-col gap-8">
              {c.howSteps.map((step, i) => (
                <Reveal key={step.title} delay={0.1 + i * 0.15}>
                  <li className="flex gap-5">
                    <span className="stat-number text-2xl text-mila-accent">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">{step.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
              <Reveal delay={0.55}>
                <li className="flex gap-5">
                  <span aria-hidden className="w-[2.1rem]" />
                  <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                    <Link href="#contacto">{c.howDemo}</Link>
                  </Button>
                </li>
              </Reveal>
            </ol>
            <Reveal delay={0.2} y={40}>
              <figure className="overflow-hidden rounded-2xl border border-white/15 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
                <Image
                  src="/products/mila/mila-07-hallazgo.png"
                  alt={c.howShotAlt}
                  width={1347}
                  height={632}
                  className="w-full h-auto"
                />
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
                  <span className="flex size-11 items-center justify-center rounded-xl bg-mila/10 text-mila">
                    <Landmark className="size-5" aria-hidden />
                  </span>
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

      {/* 05 · Teoría de cambio */}
      <section className="bg-card border-y border-black/5">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Reveal>
            <Eyebrow>{c.chainEyebrow}</Eyebrow>
            <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight text-balance">{c.chainTitle}</h2>
          </Reveal>
          <div className="mt-14">
            <ImpactChain steps={c.chainSteps} accentText="text-mila-accent" accentBg="bg-mila-accent" />
          </div>
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
                <div key={item.title} className="flex gap-5 rounded-2xl border border-black/5 bg-card p-7 card-elevated">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mila/10 text-mila">
                    <Icon className="size-5" aria-hidden />
                  </span>
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

      <ContactSection />
    </div>
  );
}
