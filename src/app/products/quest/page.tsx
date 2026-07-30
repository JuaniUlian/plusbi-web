
'use client';

import Link from 'next/link';
import {
  Target,
  Building2,
  TrendingUp,
  Users,
  Vote,
  Search,
  Lightbulb,
  Database,
  GitCompareArrows,
  Map,
  LogIn,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHero } from '@/components/shared/page-hero';
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
    caseTitle: 'Elecciones presidenciales 2023: la prueba de fuego.',
    caseValue: '+7,1M',
    caseLabel: 'puntos de datos analizados',
    caseText:
      'Entre enero y noviembre de 2023 realizamos un estudio diario sobre los candidatos presidenciales de Argentina, cubriendo todo el país. Una visión del sentimiento del votante que las encuestas sueltas no pueden dar.',

    useEyebrow: '03 · Para quién',
    useTitle: 'Gobernar y hacer campaña son dos deportes distintos.',
    useGovTitle: 'Para gobiernos',
    useGovItems: [
      { icon: Building2, text: 'Visualizá el estado de tu gestión y el impacto de tus políticas.' },
      { icon: TrendingUp, text: 'Detectá tendencias para anticipar conflictos sociales o económicos.' },
      { icon: Users, text: 'Entendé las demandas reales de la población antes de decidir.' },
    ],
    useCampTitle: 'Para campañas',
    useCampItems: [
      { icon: Target, text: 'Identificá los territorios clave para enfocar recursos y presupuesto.' },
      { icon: Vote, text: 'Conocé el perfil y las preocupaciones de cada segmento del electorado.' },
      { icon: Search, text: 'Monitoreá el posicionamiento y la estrategia de tus adversarios.' },
      { icon: Lightbulb, text: 'Ajustá tu mensaje con recomendaciones de IA por audiencia.' },
    ],
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
    caseTitle: '2023 presidential elections: the acid test.',
    caseValue: '+7.1M',
    caseLabel: 'data points analyzed',
    caseText:
      'Between January and November 2023 we ran a daily study on Argentina’s presidential candidates, covering the whole country. A view of voter sentiment that isolated polls cannot give.',

    useEyebrow: '03 · Who it is for',
    useTitle: 'Governing and campaigning are two different sports.',
    useGovTitle: 'For governments',
    useGovItems: [
      { icon: Building2, text: 'Visualize the state of your administration and the impact of your policies.' },
      { icon: TrendingUp, text: 'Detect trends to anticipate social or economic conflicts.' },
      { icon: Users, text: 'Understand the real demands of the population before deciding.' },
    ],
    useCampTitle: 'For campaigns',
    useCampItems: [
      { icon: Target, text: 'Identify the key territories to focus resources and budget.' },
      { icon: Vote, text: 'Know the profile and concerns of every segment of the electorate.' },
      { icon: Search, text: 'Monitor your opponents’ positioning and strategy.' },
      { icon: Lightbulb, text: 'Adjust your message with AI recommendations per audience.' },
    ],
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
        <Button asChild size="lg" className="bg-quest hover:bg-quest/90 text-white">
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
          <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[5fr_7fr]">
            <Reveal y={40}>
              <div className="rounded-2xl glass p-10 text-center">
                <CountUp value={7.1} prefix="+" suffix="M" decimals={1} className="text-6xl md:text-7xl text-quest" />
                <p className="mt-3 text-base text-muted-foreground">{c.caseLabel}</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-muted-foreground">{c.caseText}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 · Para quién */}
      <section className="bg-card border-y border-black/5">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <Eyebrow>{c.useEyebrow}</Eyebrow>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
            {c.useTitle}
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-black/5 bg-background p-8 card-elevated">
              <h3 className="font-headline text-xl font-bold">{c.useGovTitle}</h3>
              <ul className="mt-6 space-y-5">
                {c.useGovItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.text} className="flex gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-quest/10 text-quest">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="rounded-2xl border border-black/5 bg-background p-8 card-elevated">
              <h3 className="font-headline text-xl font-bold">{c.useCampTitle}</h3>
              <ul className="mt-6 space-y-5">
                {c.useCampItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.text} className="flex gap-4">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-quest/10 text-quest">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
