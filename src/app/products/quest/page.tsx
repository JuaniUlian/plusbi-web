import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quest - Análisis de Datos para Gobiernos y Campañas',
  description: 'Quest es la plataforma de inteligencia de datos para toma de decisiones en el sector público. Análisis en tiempo real para gobiernos y campañas electorales. Más de 7M de puntos de datos en elecciones argentinas 2023.',
  keywords: ['Quest', 'análisis de datos gobierno', 'big data sector público', 'inteligencia electoral', 'campañas políticas', 'toma de decisiones datos', 'analytics gobierno Argentina'],
  openGraph: {
    title: 'Quest - Plataforma de Inteligencia para Gobiernos',
    description: 'Análisis de datos en tiempo real para gobiernos y campañas electorales. Caso de éxito: 7M+ puntos de datos en elecciones Argentina 2023.',
    images: ['/logo/quest.png'],
  },
};

'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Target, Building2, TrendingUp, Users, Vote, Search, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const content = {
  es: {
    badge: "Análisis de Datos",
    title: "Quest",
    subtitle: "La plataforma de inteligencia para la <strong>toma de decisiones</strong> en el sector público. Gobierna con datos, no con intuición.",
    videoTitle: "Quest en Acción",
    useCasesTitle: "Descubre lo que Quest puede hacer por ti",
    useCasesSubtitle: "Selecciona tu área para ver cómo Quest transforma datos en decisiones estratégicas.",
    tabs: {
      governments: "Para Gobiernos",
      campaigns: "Para Campañas Electorales"
    },
    govPoints: [
      { icon: <Building2 className="text-primary size-8" />, title: "Gestión Eficiente", description: "Visualiza el estado de tu gestión y el impacto de tus políticas en tiempo real." },
      { icon: <TrendingUp className="text-primary size-8" />, title: "Anticipación de Crisis", description: "Detecta tendencias y patrones para prever conflictos sociales o económicos." },
      { icon: <Users className="text-primary size-8" />, title: "Conocimiento Ciudadano", description: "Comprende las demandas y el sentir de la población para guiar tus acciones." },
      { icon: <Lightbulb className="text-primary size-8" />, title: "Recomendaciones de IA", description: "Recibe sugerencias de políticas públicas basadas en evidencia y datos." },
    ],
    campaignPoints: [
        { icon: <Target className="text-primary size-8" />, title: "Optimización de Recursos", description: "Identifica las áreas geográficas clave para enfocar tus esfuerzos y tu presupuesto." },
        { icon: <Vote className="text-primary size-8" />, title: "Segmentación de Votantes", description: "Conoce el perfil y las preocupaciones de distintos segmentos del electorado." },
        { icon: <Search className="text-primary size-8" />, title: "Análisis de Competencia", description: "Monitorea el posicionamiento y la estrategia de tus adversarios." },
        { icon: <Lightbulb className="text-primary size-8" />, title: "Mensajes Efectivos", description: "Ajusta tu discurso con recomendaciones de IA para conectar con cada audiencia." },
    ],
    caseTitle: "🇦🇷 Caso de Éxito: Elecciones Presidenciales de Argentina 2023",
    caseDescription: "<p>Realizamos un estudio diario entre enero y noviembre de 2023, recopilando más de <strong>7,100,000 puntos de datos</strong> sobre los candidatos presidenciales en Argentina, cubriendo todo el país.</p><p class='mt-2'>Esto proporcionó una <strong>visión sin precedentes</strong> del sentimiento y las tendencias de los votantes, demostrando la fiabilidad y el poder de Quest en entornos complejos.</p>",
    ctaTitle: "¿Listo para tomar decisiones basadas en datos?",
    ctaSubtitle: "Descubre cómo Quest puede darte la visión estratégica que necesitas para anticiparte al futuro.",
    ctaButton: "Solicita una presentación de Quest",
  },
  en: {
    badge: "Data Analysis",
    title: "Quest",
    subtitle: "The intelligence platform for <strong>decision-making</strong> in the public sector. Govern with data, not intuition.",
    videoTitle: "Quest in Action",
    useCasesTitle: "Discover what Quest can do for you",
    useCasesSubtitle: "Select your area to see how Quest turns data into strategic decisions.",
    tabs: {
      governments: "For Governments",
      campaigns: "For Electoral Campaigns"
    },
    govPoints: [
      { icon: <Building2 className="text-primary size-8" />, title: "Efficient Management", description: "Visualize the state of your administration and the impact of your policies in real-time." },
      { icon: <TrendingUp className="text-primary size-8" />, title: "Crisis Anticipation", description: "Detect trends and patterns to foresee social or economic conflicts." },
      { icon: <Users className="text-primary size-8" />, title: "Citizen Insight", description: "Understand the demands and sentiments of the population to guide your actions." },
      { icon: <Lightbulb className="text-primary size-8" />, title: "AI Recommendations", description: "Receive evidence-based public policy suggestions generated by AI." },
    ],
    campaignPoints: [
        { icon: <Target className="text-primary size-8" />, title: "Resource Optimization", description: "Identify key geographical areas to focus your efforts and budget." },
        { icon: <Vote className="text-primary size-8" />, title: "Voter Segmentation", description: "Know the profile and concerns of different voter segments." },
        { icon: <Search className="text-primary size-8" />, title: "Competitor Analysis", description: "Monitor the positioning and strategy of your opponents." },
        { icon: <Lightbulb className="text-primary size-8" />, title: "Effective Messaging", description: "Adjust your discourse with AI recommendations to connect with each audience." },
    ],
    caseTitle: "🇦🇷 Success Case: Argentine Presidential Elections 2023",
    caseDescription: "<p>A daily study was conducted between January and November 2023, collecting more than <strong>7,100,000 data points</strong> on presidential candidates in Argentina, covering the entire country.</p><p class='mt-2'>This provided <strong>unprecedented insight</strong> into voter sentiment and trends, demonstrating Quest's reliability and power in complex environments.</p>",
    ctaTitle: "Ready to make data-driven decisions?",
    ctaSubtitle: "Discover how Quest can give you the strategic insight you need to anticipate the future.",
    ctaButton: "Request a Quest presentation",
  }
}

export default function QuestPage() {
  const { language } = useLanguage();
  const c = content[language];

  const generateMailto = () => {
    const subject = `Solicitud de presentación de ${c.title}`;
    const body = `Estimado Juan,\n\nMe gustaría coordinar una reunión para una presentación de ${c.title}.\n\nMe interesa porque...\n\nSaludos.`;
    return `mailto:juan.ulian@pluscompol.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
              <div className="grid md:grid-cols-2 gap-12 items-start">
                  
                  <Tabs defaultValue="governments" className="w-full">
                    <Card className="shadow-xl glassmorphism h-full flex flex-col card-hud-effect">
                        <CardHeader className="text-center">
                            <CardTitle>{c.useCasesTitle}</CardTitle>
                            <CardDescription>{c.useCasesSubtitle}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="governments">{c.tabs.governments}</TabsTrigger>
                                <TabsTrigger value="campaigns">{c.tabs.campaigns}</TabsTrigger>
                            </TabsList>
                            <TabsContent value="governments" className="flex-grow mt-6">
                                <ul className="space-y-6">
                                    {c.govPoints.map((point) => (
                                        <li key={point.title} className="flex items-start gap-4">
                                            <div className="bg-primary/10 p-3 rounded-lg h-fit">{point.icon}</div>
                                            <div>
                                                <h4 className="font-semibold text-lg">{point.title}</h4>
                                                <p className="text-muted-foreground text-sm mt-1">{point.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </TabsContent>
                            <TabsContent value="campaigns" className="flex-grow mt-6">
                                <ul className="space-y-6">
                                     {c.campaignPoints.map((point) => (
                                        <li key={point.title} className="flex items-start gap-4">
                                            <div className="bg-primary/10 p-3 rounded-lg h-fit">{point.icon}</div>
                                            <div>
                                                <h4 className="font-semibold text-lg">{point.title}</h4>
                                                <p className="text-muted-foreground text-sm mt-1">{point.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </TabsContent>
                        </CardContent>
                    </Card>
                  </Tabs>

                  <Card className="shadow-xl glassmorphism card-hud-effect">
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
                  <Card className="shadow-xl glassmorphism p-4 w-full max-w-4xl card-hud-effect">
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
