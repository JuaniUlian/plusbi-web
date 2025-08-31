
'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, ShieldCheck, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';

const content = {
  es: {
    badge: "Big Data & IA",
    title: "Quest",
    subtitle: "¡Accede a enormes volúmenes de datos para que, junto con tu asesor de Inteligencia Artificial, tomes las mejores decisiones desde tu smartphone o PC, en cualquier momento!",
    leapTitle: "Da el salto de calidad",
    leapDescription: "PLUS Quest es una plataforma que combina el poder del Big Data, la Inteligencia Artificial y la metodología de investigación desarrollada por PLUS. El resultado es la capacidad de predecir con precisión las tendencias del mercado.",
    powerTitle: "Potencia y Precisión",
    powerDescription: "Quest tiene la capacidad de procesar millones de puntos de datos digitales de bases de datos públicas anónimas, proporcionando tendencias las 24 horas. Esto permite a los responsables de la toma de decisiones realizar su trabajo con precisión, rapidez y dinamismo.",
    caseTitle: "🇦🇷 Caso de Éxito: Elecciones Presidenciales de Argentina 2023",
    caseDescription: "Un estudio diario realizado entre enero y noviembre de 2023, recopilando más de <strong>7,100,000 puntos de datos</strong> sobre los candidatos presidenciales en Argentina, cubriendo todo el país. Esto proporcionó una visión sin precedentes del sentimiento y las tendencias de los votantes.",
    ctaTitle: "¿Listo para tomar decisiones basadas en datos?",
    ctaSubtitle: "Descubre cómo Quest puede darte la visión estratégica que necesitas para anticiparte al futuro.",
    ctaButton: "Solicita una demo de Quest",
  },
  en: {
    badge: "Big Data & AI",
    title: "Quest",
    subtitle: "Access huge volumes of data so you, along with your Artificial Intelligence advisor, can make the best decisions from your smartphone or PC, anytime!",
    leapTitle: "Take the leap in quality",
    leapDescription: "PLUS Quest is a platform that combines the power of Big Data, Artificial Intelligence, and the research methodology developed by PLUS. The result is the ability to accurately predict market trends.",
    powerTitle: "Power and Precision",
    powerDescription: "Quest has the capacity to process millions of digital data points from anonymous public databases, providing 24-hour trends. This allows decision-makers to carry out their work accurately, quickly, and dynamically.",
    caseTitle: "🇦🇷 Success Case: Argentine Presidential Elections 2023",
    caseDescription: "A daily study conducted between January and November 2023, collecting more than <strong>7,100,000 data points</strong> on presidential candidates in Argentina, covering the entire country. This provided unparalleled insight into voter sentiment and trends.",
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
          <Badge>{c.badge}</Badge>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold font-headline text-white">{c.title}</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>
      </header>
      <main>
        <section className="py-16 md:py-24 bg-background" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                <div>
                    <h3 className="text-2xl font-semibold flex items-center gap-3"><Rocket className="text-primary size-7" /> {c.leapTitle}</h3>
                    <p className="text-muted-foreground mt-2 text-lg">{c.leapDescription}</p>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold flex items-center gap-3"><ShieldCheck className="text-primary size-7" /> {c.powerTitle}</h3>
                    <p className="text-muted-foreground mt-2 text-lg">{c.powerDescription}</p>
                </div>
                </div>
                <Card className="shadow-xl glassmorphism">
                <CardHeader>
                    <CardTitle>{c.caseTitle}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Image
                    src="/stats/quest-argentina-map.png"
                    alt="Argentina map with data points"
                    width={600}
                    height={400}
                    className="rounded-lg mb-4"
                    data-ai-hint="argentina map"
                    />
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: c.caseDescription }} />
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
