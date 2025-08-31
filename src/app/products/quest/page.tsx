
'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, ShieldCheck, Mail, Target, BarChart, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';

const content = {
  es: {
    badge: "Big Data & IA",
    title: "Quest",
    subtitle: "Accede a <strong>enormes volúmenes de datos</strong> para que, junto con tu asesor de Inteligencia Artificial, tomes las <strong>mejores decisiones</strong> desde tu smartphone o PC, ¡en cualquier momento!",
    leapTitle: "Da el salto de calidad",
    leapDescription: "<p>PLUS Quest es una plataforma que combina el poder del <strong>Big Data</strong>, la <strong>Inteligencia Artificial</strong> y la metodología de investigación desarrollada por PLUS.</p><p class='mt-2'>El resultado es la capacidad de <strong>predecir con precisión</strong> las tendencias del mercado, permitiéndote tomar decisiones informadas y estratégicas.</p>",
    powerTitle: "Potencia y Precisión",
    powerDescription: "<p>Quest tiene la capacidad de procesar <strong>millones de puntos de datos</strong> digitales de bases de datos públicas anónimas, proporcionando tendencias <strong>las 24 horas</strong>.</p><p class='mt-2'>Esto permite a los responsables de la toma de decisiones realizar su trabajo con <strong>precisión, rapidez y dinamismo</strong>, optimizando recursos y anticipándose a los cambios.</p>",
    caseTitle: "🇦🇷 Caso de Éxito: Elecciones Presidenciales de Argentina 2023",
    caseDescription: "<p>Realizamos un estudio diario entre enero y noviembre de 2023, recopilando más de <strong>7,100,000 puntos de datos</strong> sobre los candidatos presidenciales en Argentina, cubriendo todo el país.</p><p class='mt-2'>Esto proporcionó una <strong>visión sin precedentes</strong> del sentimiento y las tendencias de los votantes, demostrando la fiabilidad y el poder de Quest en entornos complejos.</p>",
    ctaTitle: "¿Listo para tomar decisiones basadas en datos?",
    ctaSubtitle: "Descubre cómo Quest puede darte la visión estratégica que necesitas para anticiparte al futuro.",
    ctaButton: "Solicita una demo de Quest",
  },
  en: {
    badge: "Big Data & AI",
    title: "Quest",
    subtitle: "Access <strong>huge volumes of data</strong> so you, along with your Artificial Intelligence advisor, can make the <strong>best decisions</strong> from your smartphone or PC, anytime!",
    leapTitle: "Take the leap in quality",
    leapDescription: "<p>PLUS Quest is a platform that combines the power of <strong>Big Data</strong>, <strong>Artificial Intelligence</strong>, and the research methodology developed by PLUS.</p><p class='mt-2'>The result is the ability to <strong>accurately predict</strong> market trends, allowing you to make informed and strategic decisions.</p>",
    powerTitle: "Power and Precision",
    powerDescription: "<p>Quest has the capacity to process <strong>millions of digital data points</strong> from anonymous public databases, providing <strong>24-hour trends</strong>.</p><p class='mt-2'>This allows decision-makers to carry out their work with <strong>accuracy, speed, and dynamism</strong>, optimizing resources and anticipating changes.</p>",
    caseTitle: "🇦🇷 Success Case: Argentine Presidential Elections 2023",
    caseDescription: "<p>A daily study was conducted between January and November 2023, collecting more than <strong>7,100,000 data points</strong> on presidential candidates in Argentina, covering the entire country.</p><p class='mt-2'>This provided <strong>unprecedented insight</strong> into voter sentiment and trends, demonstrating Quest's reliability and power in complex environments.</p>",
    ctaTitle: "Ready to make data-driven decisions?",
    ctaSubtitle: "Discover how Quest can give you the strategic insight you need to anticipate the future.",
    ctaButton: "Request a Quest demo",
  }
}

export default function QuestPage() {
  const { language } = useLanguage();
  const c = content[language];

  const generateMailto = () => {
    const subject = `Solicitud de demo de ${c.title}`;
    const body = `Estimados,\n\nMe gustaría coordinar una reunión para un demo de ${c.title}.\n\nMe interesa porque...\n\nSaludos.`;
    return `mailto:contacto@plusbi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <header className="py-20 bg-primary/10" style={{backgroundImage: "url('/backgrounds/titulos.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            <Image src="/logo/quest.png" alt="Quest Logo" width={80} height={80} className="mb-4" />
            <Badge>{c.badge}</Badge>
          </div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold font-headline text-white">{c.title}</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: c.subtitle }}/>
        </div>
      </header>
      <main>
        <section className="py-16 md:py-24 bg-background" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-bold flex items-center gap-3 mb-3"><Rocket className="text-primary size-7" /> {c.leapTitle}</h3>
                    <div className="text-muted-foreground text-base space-y-4" dangerouslySetInnerHTML={{ __html: c.leapDescription }} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold flex items-center gap-3 mb-3"><ShieldCheck className="text-primary size-7" /> {c.powerTitle}</h3>
                    <div className="text-muted-foreground text-base space-y-4" dangerouslySetInnerHTML={{ __html: c.powerDescription }} />
                </div>
                </div>
                <Card className="shadow-xl glassmorphism">
                <CardHeader>
                    <CardTitle className="text-xl">{c.caseTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Image
                    src="/stats/resultadosquest.png"
                    alt="Resultados de Quest en elecciones de Argentina"
                    width={600}
                    height={400}
                    className="rounded-lg mb-4"
                    data-ai-hint="election results chart"
                    />
                    <div className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: c.caseDescription }} />
                </CardContent>
                </Card>
            </div>
            </div>
        </section>
        <section className="py-16 md:py-24 bg-primary/10 text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold font-headline">{c.ctaTitle}</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">{c.ctaSubtitle}</p>
                <Button asChild size="lg" className="mt-8">
                    <a href={generateMailto()}>{c.ctaButton} <Mail className="ml-2"/></a>
                </Button>
            </div>
        </section>
      </main>
    </>
  );
}
