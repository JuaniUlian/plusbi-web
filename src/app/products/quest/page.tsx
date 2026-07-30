
'use client';

import Link from 'next/link';
import {
  TrendingUp,
  Database,
  GitCompareArrows,
  Map,
  LogIn,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHero } from '@/components/shared/page-hero';
import { QuestDashboardMock } from '@/components/shared/quest-dashboard-mock';
import { ContactSection } from '@/components/shared/contact-section';
import { Reveal, WordReveal } from '@/components/motion/reveal';
import { CountUp } from '@/components/motion/count-up';
import { useLanguage } from '@/contexts/language-context';

const content = {
  es: {
    heroBadge: 'Quest · Análisis de datos',
    heroTitle: 'La foto electoral del país, al día.',
    heroSubtitle:
      'Las decisiones de cuatro años no merecen encuestas de hace dos semanas. Quest reúne encuestas y datos electorales de todo el país en un tablero vivo, para gobernar y hacer campaña con la información de hoy.',
    heroCtaDashboard: 'Acceder al dashboard',
    heroCtaDemo: 'Solicitá una presentación',

    whatEyebrow: '01 · La solución',
    whatTitle: 'Toda la conversación electoral del país, en un solo lugar.',
    whatItems: [
      {
        icon: Database,
        title: 'Base de encuestas centralizada',
        text: 'La base de encuestas más grande de Argentina, actualizada permanentemente.',
      },
      {
        icon: GitCompareArrows,
        title: 'Comparación entre consultoras',
        text: 'Metodologías, sesgos y aciertos históricos de cada encuestadora, lado a lado.',
      },
      {
        icon: TrendingUp,
        title: 'Tendencias día a día',
        text: 'Evolución de intención de voto por candidato, espacio y territorio.',
      },
      {
        icon: Map,
        title: 'Informes por provincia',
        text: 'Mapa de calor y estado de situación de cada distrito, con su historia electoral.',
      },
    ],

    caseEyebrow: '02 · La prueba',
    caseTitle: '2023: cuando nadie sabía qué creer, Quest lo vio venir.',
    caseStatLabel: 'puntos de diferencia entre nuestro pronóstico y el resultado final de la presidencial',
    caseText:
      'Un año de encuestas contradictorias, tres candidatos con chances reales y un país entero sin certezas. Quest siguió más de 7 millones de puntos de datos, todos los días, en todas las provincias. Cuando se contaron los votos, nuestro pronóstico estaba a un punto y medio del resultado.',
    caseKicker: 'Esa es la diferencia entre opinar y saber.',

    useEyebrow: '03 · Para quién',
    useTitle: 'Gobernar y hacer campaña son dos deportes distintos. Quest juega los dos.',
    useSubtitle: 'Elegí tu cancha y mirá cómo cambia el tablero:',
  },
  en: {
    heroBadge: 'Quest · Data analysis',
    heroTitle: 'The country’s electoral picture, up to date.',
    heroSubtitle:
      'Four-year decisions deserve better than two-week-old polls. Quest gathers polls and electoral data from the whole country on a live dashboard, so you govern and campaign with today’s information.',
    heroCtaDashboard: 'Access the dashboard',
    heroCtaDemo: 'Request a presentation',

    whatEyebrow: '01 · The solution',
    whatTitle: 'The country’s entire electoral conversation, in one place.',
    whatItems: [
      {
        icon: Database,
        title: 'Centralized poll database',
        text: 'The largest poll database in Argentina, permanently updated.',
      },
      {
        icon: GitCompareArrows,
        title: 'Pollster comparison',
        text: 'Methodologies, biases and historical accuracy of every pollster, side by side.',
      },
      {
        icon: TrendingUp,
        title: 'Day-by-day trends',
        text: 'Evolution of voting intention by candidate, party and territory.',
      },
      {
        icon: Map,
        title: 'Reports by province',
        text: 'Heatmap and situation report for every district, with its electoral history.',
      },
    ],

    caseEyebrow: '02 · The proof',
    caseTitle: '2023: when nobody knew what to believe, Quest saw it coming.',
    caseStatLabel: 'points of difference between our forecast and the final presidential result',
    caseText:
      'A year of contradictory polls, three candidates with real chances and a whole country without certainty. Quest tracked over 7 million data points, every day, in every province. When the votes were counted, our forecast was a point and a half from the result.',
    caseKicker: 'That is the difference between guessing and knowing.',

    useEyebrow: '03 · Who it is for',
    useTitle: 'Governing and campaigning are two different sports. Quest plays both.',
    useSubtitle: 'Pick your field and watch the board change:',
  },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-quest">{children}</p>
  );
}

export default function QuestPage() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <div className="flex flex-col">
      <PageHero
        mesh="quest"
        eyebrow={
          <Badge className="border-transparent bg-quest/10 px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-quest hover:bg-quest/10">
            {c.heroBadge}
          </Badge>
        }
        title={<span className="font-headline font-extrabold"><WordReveal text={c.heroTitle} delay={0.1} /></span>}
        subtitle={c.heroSubtitle}
      >
        <Button asChild size="lg" className="bg-quest text-white shadow-lg shadow-quest/25 hover:bg-quest/90 hover:shadow-xl hover:shadow-quest/30">
          <Link href="/products/quest/login">
            <LogIn aria-hidden />
            {c.heroCtaDashboard}
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="#contacto">{c.heroCtaDemo}</Link>
        </Button>
      </PageHero>

      {/* 01 · La solución */}
      <section className="bg-card border-y border-black/5">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Reveal>
            <Eyebrow>{c.whatEyebrow}</Eyebrow>
            <h2 className="mt-4 font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
              {c.whatTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {c.whatItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={(i % 2) * 0.12}>
                  <div className="flex h-full gap-5 rounded-2xl border border-black/5 bg-background p-7 card-elevated card-hover">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-quest/10 text-quest">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-headline text-lg font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 02 · La prueba */}
      <section className="mesh-quest">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Reveal>
            <Eyebrow>{c.caseEyebrow}</Eyebrow>
            <h2 className="mt-4 font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
              {c.caseTitle}
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[5fr_7fr]">
            <Reveal y={40}>
              <div className="rounded-2xl glass p-10 text-center">
                <CountUp value={1.47} decimals={2} className="text-7xl md:text-8xl text-quest" />
                <p className="mt-3 text-base leading-snug text-muted-foreground">{c.caseStatLabel}</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-muted-foreground">{c.caseText}</p>
              <p className="mt-5 font-headline text-xl font-bold text-quest">{c.caseKicker}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 · Para quién — mock interactivo con modos */}
      <section className="bg-card border-y border-black/5">
        <div className="container max-w-4xl px-4 py-20 md:py-28 text-center">
          <Reveal>
            <div className="flex justify-center"><Eyebrow>{c.useEyebrow}</Eyebrow></div>
            <h2 className="mt-4 font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
              {c.useTitle}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{c.useSubtitle}</p>
          </Reveal>
          <Reveal delay={0.15} y={40} className="mt-10 text-left">
            <QuestDashboardMock defaultMode="gobierno" />
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
