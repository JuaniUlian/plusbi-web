
'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AiWizard from '@/components/ai-wizard';
import { useLanguage } from '@/contexts/language-context';
import { PageHero } from '@/components/shared/page-hero';
import { ProductCard } from '@/components/shared/product-card';
import { BrowserFrame } from '@/components/shared/browser-frame';
import { ContactSection } from '@/components/shared/contact-section';
import { PRODUCTS } from '@/lib/products';

const content = {
  es: {
    heroEyebrow: 'GovTech · IA para el sector público',
    heroTitle: 'Tecnología para un mejor Gobierno.',
    heroSubtitle:
      '¿Cuántas horas perdió tu equipo esta semana leyendo expedientes, cruzando datos o buscando papeles? Creemos que gobernar bien no debería depender del trabajo repetitivo. Nuestras herramientas de IA hacen el trabajo pesado, para que las personas pongan el criterio.',
    heroCtaProducts: 'Ver productos',
    heroCtaTalk: 'Hablemos',
    stats: [
      { value: '+67%', label: 'más errores detectados que la revisión manual', product: 'Mila' },
      { value: '76%', label: 'menos tiempo de validación de expedientes', product: 'Mila' },
      { value: '+10M', label: 'documentos gestionados en nuestras plataformas', product: 'PLUS BI' },
      { value: '+7,1M', label: 'puntos de datos analizados en campañas', product: 'Quest' },
    ],
    productsTitle: 'Empezamos por el dolor, no por la tecnología.',
    productsSubtitle:
      'Cada producto nació de un problema real de la gestión pública. Elegí el tuyo.',
    milaQuote: 'En toda Latinoamérica hay una Marta.',
    milaText:
      'Síndica, contralora, auditora: su firma dice que un expediente está en orden, pero las normas son muchísimas y los expedientes, más todavía. Mila lee todo el expediente, lo cruza con toda tu normativa y le muestra qué cumple, qué no y en qué página mirar — con la cita legal al lado.',
    milaCta: 'Conocé Mila',
    milaShotAlt:
      'Pantalla real de Mila mostrando un hallazgo crítico con su cita normativa y evidencia',
    questQuote: 'La encuesta que citás en la reunión ya tiene dos semanas.',
    questText:
      'Quest reúne encuestas y datos electorales de todo el país, los cruza por provincia, cámara y encuestadora, y te los muestra en un tablero vivo. Decidís con la foto de hoy, no con la del mes pasado.',
    questCta: 'Conocé Quest',
    wizardTitle: '¿No sabés por dónde empezar?',
    wizardSubtitle:
      'Contale tu problema a nuestro asistente y te recomienda la herramienta indicada.',
  },
  en: {
    heroEyebrow: 'GovTech · AI for the public sector',
    heroTitle: 'Technology for better Government.',
    heroSubtitle:
      'How many hours did your team lose this week reading files, cross-checking data or chasing paper? We believe governing well should not depend on repetitive work. Our AI tools do the heavy lifting, so people can apply their judgment.',
    heroCtaProducts: 'See products',
    heroCtaTalk: "Let's talk",
    stats: [
      { value: '+67%', label: 'more errors detected than manual review', product: 'Mila' },
      { value: '76%', label: 'less time spent validating files', product: 'Mila' },
      { value: '+10M', label: 'documents managed on our platforms', product: 'PLUS BI' },
      { value: '+7.1M', label: 'data points analyzed in campaigns', product: 'Quest' },
    ],
    productsTitle: 'We start from the pain, not the technology.',
    productsSubtitle:
      'Every product was born from a real problem in public administration. Pick yours.',
    milaQuote: 'All across Latin America there is a Marta.',
    milaText:
      'Comptroller, auditor, reviewer: her signature says a file is in order, but the rules are endless and the files even more so. Mila reads the whole file, checks it against all your regulations and shows what complies, what does not and which page to look at — with the legal citation next to it.',
    milaCta: 'Meet Mila',
    milaShotAlt:
      'Real Mila screen showing a critical finding with its legal citation and evidence',
    questQuote: 'The poll you quote in meetings is already two weeks old.',
    questText:
      'Quest gathers polls and electoral data from the whole country, cross-references them by province, chamber and pollster, and shows them on a live dashboard. You decide with today’s picture, not last month’s.',
    questCta: 'Meet Quest',
    wizardTitle: 'Not sure where to start?',
    wizardSubtitle:
      'Tell our assistant your problem and it will recommend the right tool.',
  },
};

export default function Home() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <div className="flex flex-col">
      <PageHero
        eyebrow={<Badge variant="secondary" className="px-4 py-1.5 text-xs tracking-[0.15em] uppercase">{c.heroEyebrow}</Badge>}
        title={c.heroTitle}
        subtitle={c.heroSubtitle}
      >
        <Button asChild size="lg">
          <Link href="#productos">{c.heroCtaProducts}</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="#contacto">{c.heroCtaTalk}</Link>
        </Button>
      </PageHero>

      <section aria-label="Resultados" className="border-y border-black/5 bg-card">
        <div className="container max-w-6xl px-4 py-12 md:py-16">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {c.stats.map((s) => (
              <div key={s.label} className="text-center">
                <dd className="stat-number text-4xl md:text-5xl text-primary">{s.value}</dd>
                <dt className="mt-2 text-sm leading-snug text-muted-foreground">{s.label}</dt>
                <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
                  {s.product}
                </span>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="productos" className="scroll-mt-20">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-2xl">
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight text-balance">
              {c.productsTitle}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{c.productsSubtitle}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-black/5">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[5fr_7fr]">
            <div>
              <p className="font-serif text-2xl md:text-3xl leading-snug text-mila">{c.milaQuote}</p>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">{c.milaText}</p>
              <Button asChild size="lg" className="mt-8 bg-mila hover:bg-mila/90 text-white">
                <Link href="/products/mila">
                  {c.milaCta}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
            <BrowserFrame
              src="/products/mila/mila-07-hallazgo.png"
              alt={c.milaShotAlt}
              url="mila.docufy.ar"
              width={1347}
              height={632}
            />
          </div>
        </div>
      </section>

      <section className="mesh-quest">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[7fr_5fr]">
            <div className="order-2 lg:order-1 rounded-2xl glass p-8 md:p-10">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="stat-number text-4xl md:text-5xl text-quest">24</p>
                  <p className="mt-1 text-sm text-muted-foreground">provincias con datos electorales</p>
                </div>
                <div>
                  <p className="stat-number text-4xl md:text-5xl text-quest">+7,1M</p>
                  <p className="mt-1 text-sm text-muted-foreground">puntos de datos analizados</p>
                </div>
                <div className="col-span-2 border-t border-black/5 pt-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {language === 'es'
                      ? 'Encuestas, resultados y tendencias por provincia, cámara y encuestadora — en un solo tablero.'
                      : 'Polls, results and trends by province, chamber and pollster — on a single dashboard.'}
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="font-serif text-2xl md:text-3xl leading-snug text-quest">{c.questQuote}</p>
              <p className="mt-5 text-base md:text-lg leading-relaxed text-muted-foreground">{c.questText}</p>
              <Button asChild size="lg" className="mt-8 bg-quest hover:bg-quest/90 text-white">
                <Link href="/products/quest">
                  {c.questCta}
                  <ArrowRight aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="products-wizard" className="bg-card border-y border-black/5 scroll-mt-20">
        <div className="container max-w-3xl px-4 py-20 md:py-28 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight">{c.wizardTitle}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{c.wizardSubtitle}</p>
          <div className="mt-10 text-left">
            <AiWizard />
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}
