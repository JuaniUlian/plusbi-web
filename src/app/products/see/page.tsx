
'use client';

import Link from 'next/link';
import {
  ShieldCheck,
  Cpu,
  Fingerprint,
  Eye,
  Zap,
  DollarSign,
  Cloud,
  Lock,
  Leaf,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHero } from '@/components/shared/page-hero';
import { ContactSection } from '@/components/shared/contact-section';
import { useLanguage } from '@/contexts/language-context';

const content = {
  es: {
    heroBadge: 'Expediente Electrónico · Transformación digital',
    heroTitle: 'El expediente que necesitás hoy está en papel, en otro edificio.',
    heroSubtitle:
      'Cada trámite que viaja en papel es tiempo de tu equipo y del ciudadano. Instalamos, damos soporte y capacitamos en sistemas de expediente electrónico — más de 10 millones de documentos ya gestionados en nuestras plataformas.',
    heroCta: 'Hablemos de tu digitalización',

    challengesEyebrow: '01 · Del problema a la solución',
    challengesTitle: 'Elegí tu dolor. Te contamos cómo se resuelve.',
    challenges: [
      {
        id: 'efficiency',
        icon: Zap,
        challenge: 'Ineficiencia y lentitud',
        solution: 'Velocidad y resultados',
        description:
          'Digitalizamos los flujos de trabajo para agilizar trámites, reduciendo drásticamente los tiempos de espera y optimizando los procesos internos.',
      },
      {
        id: 'costs',
        icon: DollarSign,
        challenge: 'Altos costos operativos',
        solution: 'Ahorro real',
        description:
          'Eliminamos gastos de impresión, almacenamiento físico y logística de documentos, generando ahorros significativos para la institución.',
      },
      {
        id: 'transparency',
        icon: Eye,
        challenge: 'Baja transparencia',
        solution: 'Trazabilidad completa',
        description:
          'Cada paso queda registrado. Trazabilidad total que permite auditorías rápidas y fomenta la confianza ciudadana.',
      },
      {
        id: 'accessibility',
        icon: Cloud,
        challenge: 'Accesibilidad limitada',
        solution: 'Acceso desde cualquier lugar',
        description:
          'La información disponible en cualquier momento a través de un portal seguro y centralizado.',
      },
      {
        id: 'security',
        icon: Lock,
        challenge: 'Seguridad deficiente',
        solution: 'Encriptación y control de acceso',
        description:
          'Encriptación de punta a punta y controles de acceso robustos garantizan la integridad y confidencialidad de la información.',
      },
      {
        id: 'environment',
        icon: Leaf,
        challenge: 'Impacto ambiental',
        solution: 'Gestión sin papel',
        description:
          'Al eliminar el papel, reducimos la huella de carbono y promovemos una gestión pública más sostenible.',
      },
    ],

    featuresEyebrow: '02 · Cómo lo hacemos',
    featuresTitle: 'Tecnología probada, sin ataduras.',
    features: [
      {
        icon: ShieldCheck,
        title: 'Seguridad',
        text: 'Encriptación y medidas de control de acceso que protegen la información del organismo.',
      },
      {
        icon: Cpu,
        title: 'Código abierto',
        text: 'Basado en tecnología open source: flexibilidad, escalabilidad y cero dependencia de un proveedor.',
      },
      {
        icon: Fingerprint,
        title: 'Firma electrónica',
        text: 'Firma electrónica de documentos integrada, que agiliza procesos y asegura autenticidad.',
      },
    ],

    kpisEyebrow: '03 · Resultados',
    kpisTitle: 'Un ecosistema que ya funciona.',
    kpis: [
      { value: '+30', label: 'implementaciones' },
      { value: '+40k', label: 'usuarios activos' },
      { value: '+10M', label: 'documentos gestionados' },
    ],
  },
  en: {
    heroBadge: 'Electronic Records · Digital transformation',
    heroTitle: 'The file you need today is on paper, in another building.',
    heroSubtitle:
      'Every procedure that travels on paper costs your team’s and the citizen’s time. We install, support and train teams on electronic record systems — over 10 million documents already managed on our platforms.',
    heroCta: 'Let’s talk about your digitalization',

    challengesEyebrow: '01 · From problem to solution',
    challengesTitle: 'Pick your pain. We’ll tell you how it gets solved.',
    challenges: [
      {
        id: 'efficiency',
        icon: Zap,
        challenge: 'Inefficiency and slowness',
        solution: 'Speed and results',
        description:
          'We digitize workflows to streamline procedures, drastically reducing waiting times and optimizing internal processes.',
      },
      {
        id: 'costs',
        icon: DollarSign,
        challenge: 'High operating costs',
        solution: 'Real savings',
        description:
          'We eliminate printing, physical storage and document logistics expenses, generating significant savings.',
      },
      {
        id: 'transparency',
        icon: Eye,
        challenge: 'Low transparency',
        solution: 'Full traceability',
        description:
          'Every step is recorded. Complete traceability enables quick audits and builds public trust.',
      },
      {
        id: 'accessibility',
        icon: Cloud,
        challenge: 'Limited accessibility',
        solution: 'Access from anywhere',
        description:
          'Information available at any time through a secure, centralized portal.',
      },
      {
        id: 'security',
        icon: Lock,
        challenge: 'Poor security',
        solution: 'Encryption and access control',
        description:
          'End-to-end encryption and robust access controls guarantee the integrity and confidentiality of information.',
      },
      {
        id: 'environment',
        icon: Leaf,
        challenge: 'Environmental impact',
        solution: 'Paperless management',
        description:
          'By eliminating paper we reduce the carbon footprint and promote more sustainable public management.',
      },
    ],

    featuresEyebrow: '02 · How we do it',
    featuresTitle: 'Proven technology, no lock-in.',
    features: [
      {
        icon: ShieldCheck,
        title: 'Security',
        text: 'Encryption and access control measures that protect the agency’s information.',
      },
      {
        icon: Cpu,
        title: 'Open source',
        text: 'Based on open source technology: flexibility, scalability and zero vendor lock-in.',
      },
      {
        icon: Fingerprint,
        title: 'Electronic signature',
        text: 'Built-in electronic document signing that speeds up processes and ensures authenticity.',
      },
    ],

    kpisEyebrow: '03 · Results',
    kpisTitle: 'An ecosystem that already works.',
    kpis: [
      { value: '+30', label: 'implementations' },
      { value: '+40k', label: 'active users' },
      { value: '+10M', label: 'documents managed' },
    ],
  },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-see">{children}</p>
  );
}

export default function SeePage() {
  const { language } = useLanguage();
  const c = content[language];
  const [activeChallenge, setActiveChallenge] = useState(c.challenges[0].id);
  const active = c.challenges.find((ch) => ch.id === activeChallenge) ?? c.challenges[0];
  const ActiveIcon = active.icon;

  return (
    <div className="flex flex-col">
      <PageHero
        mesh="see"
        eyebrow={
          <Badge className="border-transparent bg-see/10 px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-see hover:bg-see/10">
            {c.heroBadge}
          </Badge>
        }
        title={<span className="font-serif font-bold">{c.heroTitle}</span>}
        subtitle={c.heroSubtitle}
      >
        <Button asChild size="lg" className="bg-see hover:bg-see/90 text-white">
          <Link href="#contacto">{c.heroCta}</Link>
        </Button>
      </PageHero>

      {/* 01 · Del problema a la solución */}
      <section className="bg-card border-y border-black/5">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Eyebrow>{c.challengesEyebrow}</Eyebrow>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
            {c.challengesTitle}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[5fr_7fr]">
            <div className="flex flex-col gap-2" role="tablist" aria-label={c.challengesTitle}>
              {c.challenges.map((ch) => {
                const Icon = ch.icon;
                const isActive = ch.id === activeChallenge;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveChallenge(ch.id)}
                    className={cn(
                      'flex min-h-11 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      isActive
                        ? 'bg-see/10 text-see'
                        : 'text-muted-foreground hover:bg-secondary'
                    )}
                  >
                    <Icon className="size-5 shrink-0" aria-hidden />
                    {ch.challenge}
                  </button>
                );
              })}
            </div>
            <div className="rounded-2xl border border-black/5 bg-background p-8 md:p-10 card-elevated">
              <span className="flex size-12 items-center justify-center rounded-xl bg-see/10 text-see">
                <ActiveIcon className="size-6" aria-hidden />
              </span>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {active.challenge}
              </p>
              <h3 className="mt-2 font-headline text-2xl md:text-3xl font-bold text-see">
                {active.solution}
              </h3>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted-foreground">
                {active.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · Cómo lo hacemos */}
      <section className="bg-background">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Eyebrow>{c.featuresEyebrow}</Eyebrow>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-extrabold tracking-tight">
            {c.featuresTitle}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {c.features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="rounded-2xl border border-black/5 bg-card p-7 card-elevated">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-see/10 text-see">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-headline text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 · Resultados */}
      <section className="mesh-see border-y border-black/5">
        <div className="container max-w-5xl px-4 py-20 md:py-28 text-center">
          <Eyebrow>{c.kpisEyebrow}</Eyebrow>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-extrabold tracking-tight">
            {c.kpisTitle}
          </h2>
          <dl className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {c.kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-2xl glass p-8">
                <dd className="stat-number text-5xl md:text-6xl text-see">{kpi.value}</dd>
                <dt className="mt-2 text-sm uppercase tracking-[0.12em] text-muted-foreground">{kpi.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
