
'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, ShieldCheck, Mail, Target, BarChart, CheckCircle, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';

const content = {
  es: {
    badge: "Big Data & IA para Gobiernos",
    title: "Quest",
    subtitle: "La plataforma de inteligencia para la <strong>toma de decisiones</strong> en el sector público. Gobierna con datos, no con intuición.",
    videoTitle: "Quest en Acción",
    leapTitle: "Decisiones Inteligentes para Gobiernos Modernos",
    leapDescription: "<p>Quest transforma <strong>grandes volúmenes de datos</strong> —ya sean de fuentes públicas o de tus propias bases de datos— en visualizaciones claras e intuitivas para que puedas entender el presente y anticiparte al futuro.</p>",
    analysisTitle: "Del Análisis a la Acción",
    analysisDescription: "<p>Quest no solo muestra datos, sino que te dice qué hacer con ellos. Obtén <strong>recomendaciones automáticas</strong> generadas por IA, desde <strong>sugerencias de políticas públicas</strong> listas para implementar hasta <strong>ajustes precisos para tu campaña electoral</strong>.</p>",
    powerTitle: "Potencia y Precisión",
    powerDescription: "<p>Funciona tanto para la gestión diaria de gobiernos e instituciones como para el dinamismo de las campañas políticas, optimizando recursos y maximizando tu impacto.</p>",
    caseTitle: "🇦🇷 Caso de Éxito: Elecciones Presidenciales de Argentina 2023",
    caseDescription: "<p>Realizamos un estudio diario entre enero y noviembre de 2023, recopilando más de <strong>7,100,000 puntos de datos</strong> sobre los candidatos presidenciales en Argentina, cubriendo todo el país.</p><p class='mt-2'>Esto proporcionó una <strong>visión sin precedentes</strong> del sentimiento y las tendencias de los votantes, demostrando la fiabilidad y el poder de Quest en entornos complejos.</p>",
    ctaTitle: "¿Listo para tomar decisiones basadas en datos?",
    ctaSubtitle: "Descubre cómo Quest puede darte la visión estratégica que necesitas para anticiparte al futuro.",
    ctaButton: "Solicita una demo de Quest",
  },
  en: {
    badge: "Big Data & AI for Governments",
    title: "Quest",
    subtitle: "The intelligence platform for <strong>decision-making</strong> in the public sector. Govern with data, not intuition.",
    videoTitle: "Quest in Action",
    leapTitle: "Smart Decisions for Modern Governments",
    leapDescription: "<p>Quest transforms <strong>large volumes of data</strong>—whether from public sources or your own databases—into clear and intuitive visualizations so you can understand the present and anticipate the future.</p>",
    analysisTitle: "From Analysis to Action",
    analysisDescription: "<p>Quest doesn't just show you data; it tells you what to do with it. Get <strong>automatic AI-generated recommendations</strong>, from ready-to-implement <strong>public policy suggestions</strong> to <strong>precise adjustments for your electoral campaign</strong>.</p>",
    powerTitle: "Power and Precision",
    powerDescription: "<p>It works for the daily management of governments and institutions as well as for the fast-paced dynamics of political campaigns, optimizing resources and maximizing your impact.</p>",
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
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-white">{c.title}</h1>
          <Badge className="mt-4">{c.badge}</Badge>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: c.subtitle }}/>
        </div>
      </header>
      <main>
        <section className="py-16 md:py-24 bg-background" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                      <div>
                          <h3 className="text-2xl font-bold flex items-center gap-3 mb-3"><Target className="text-primary size-7" /> {c.leapTitle}</h3>
                          <div className="text-muted-foreground text-base space-y-4" dangerouslySetInnerHTML={{ __html: c.leapDescription }} />
                      </div>
                       <div>
                          <h3 className="text-2xl font-bold flex items-center gap-3 mb-3"><Lightbulb className="text-primary size-7" /> {c.analysisTitle}</h3>
                          <div className="text-muted-foreground text-base space-y-4" dangerouslySetInnerHTML={{ __html: c.analysisDescription }} />
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
        <section className="py-16 md:py-24 bg-primary/5" style={{backgroundImage: "url('/backgrounds/secciones b.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
           <div className="container mx-auto px-4">
               <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold font-headline text-white">{c.videoTitle}</h2>
              </div>
              <div className="flex justify-center">
                  <Card className="shadow-xl glassmorphism p-4 w-full max-w-4xl">
                      <div className="aspect-w-16 aspect-h-9">
                          <iframe 
                              className="w-full h-full rounded-lg"
                              src="https://www.youtube.com/embed/2HKqp_RgOC0" 
                              title="YouTube video player" 
                              frameBorder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowFullScreen
                              style={{ minHeight: '480px' }}
                          ></iframe>
                      </div>
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
