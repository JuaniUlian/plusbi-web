
      
"use client";
import { useState } from 'react';
import { TeamSection } from "@/components/experience/team-section";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/language-context';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Rocket,
  TrendingUp,
  Globe,
  Trophy,
  Users,
  Building,
  Lightbulb,
  Briefcase,
  Vote,
  Target,
  FileText,
  Award,
  CheckCircle,
} from "lucide-react";


const content = {
  es: {
    title: "Nuestra Experiencia",
    subtitle: "Desde 2021, revolucionando la consultoría empresarial, política y social.",
    teamTitle: "El Equipo",
    teamSubtitle: "Conoce a los expertos que impulsan la innovación en PLUS BI.",
    ctaTitle: "¡Descubre cómo podemos ayudarte!",
    ctaSubtitle: "Trabajemos juntos para construir una administración más eficiente y transparente.",
    contactButton: "Contáctanos",
    historyTitle: "Nuestra Historia",
    historySubtitle: "Un viaje de innovación y crecimiento.",
    milestonesByYear: [
      {
        year: "2021",
        summary: "PLUS BI se conformó en 2021, y ya el primer día algo hizo click. Descubrimos que nuestras perspectivas no solo se complementaban, sino que se potenciaban, sentando las bases de una visión compartida.",
        items: [
          { event: "Nacimiento de PLUS BI", icon: <Rocket /> },
          { event: "Definición de la visión y misión de la empresa", icon: <Target /> },
        ],
      },
      {
        year: "2022",
        summary: "Durante 2022, comenzamos a dar nuestros primeros pasos firmes, ofreciendo asesoramiento en campañas políticas locales y realizando nuestras primeras mediciones de intención de voto, sentando las bases de nuestra metodología.",
        items: [
          { event: "Asesoramiento en campañas políticas locales", icon: <Users /> },
          { event: "Primeras mediciones de intención de voto", icon: <Vote /> },
        ],
      },
      {
        year: "2023",
        summary: "Este fue un año de consolidación y proyectos de alto impacto. Brindamos asesoramiento y mediciones clave en las Elecciones Presidenciales de Argentina, demostrando nuestra capacidad para manejar proyectos de gran escala y alta complejidad.",
        items: [
          { event: "Asesoramiento en Elecciones Presidenciales de Argentina", icon: <Globe /> },
          { event: "Proyecciones de tendencias de demanda para Cámaras Empresariales", icon: <Building /> },
          { event: "Desarrollo del producto 'Quest' para análisis de datos", icon: <Lightbulb /> },
        ],
      },
      {
        year: "2024",
        summary: "Nuestra experiencia nos abrió las puertas a nuevos desafíos. Comenzamos a brindar asesoramiento a Organismos Internacionales Multilaterales y aplicamos nuestros modelos de proyección en las Elecciones de la Ciudad de México.",
        items: [
          { event: "Asesoramiento a Organismos Internacionales Multilaterales", icon: <Briefcase /> },
          { event: "Proyecciones en las Elecciones de la Ciudad de México", icon: <Vote /> },
          { event: "Lanzamiento de 'Mila' para validación de documentos", icon: <FileText /> },
        ],
      },
      {
        year: "2025",
        summary: "Nuestro compromiso con la transparencia y la innovación fue reconocido al ser seleccionados en el Top 20 del programa 'Corrupción Cero' de la CAF. Este hito nos impulsa a seguir creando soluciones que transforman la gestión pública.",
        items: [
          { event: "Seleccionados en el Top 20 del programa 'Corrupción Cero' de la CAF", icon: <Award /> },
          { event: "Inicio del desarrollo de 'Vuro', nuestro súper-agente de IA", icon: <Rocket /> },
          { event: "Consolidación como referentes en GovTech en LATAM", icon: <Trophy /> },
        ],
      },
    ],
  },
  en: {
    title: "Our Experience",
    subtitle: "Since 2021, revolutionizing business, political, and social consulting.",
    teamTitle: "The Team",
    teamSubtitle: "Meet the experts driving innovation at PLUS BI.",
    ctaTitle: "Find out how we can help you!",
    ctaSubtitle: "Let's work together to build a more efficient and transparent administration.",
    contactButton: "Contact Us",
    historyTitle: "Our History",
    historySubtitle: "A journey of innovation and growth.",
    milestonesByYear: [
       {
        year: "2021",
        summary: "PLUS BI was formed in 2021, and on the very first day, something just clicked. We discovered that our perspectives not only complemented but potentiated each other, laying the groundwork for a shared vision.",
        items: [
          { event: "Birth of PLUS BI", icon: <Rocket /> },
          { event: "Definition of the company's vision and mission", icon: <Target /> },
        ],
      },
      {
        year: "2022",
        summary: "During 2022, we took our first firm steps, offering advice on local political campaigns and conducting our first voting intention measurements, laying the foundation for our methodology.",
        items: [
          { event: "Advisory on local political campaigns", icon: <Users /> },
          { event: "First measurements of voting intention", icon: <Vote /> },
        ],
      },
      {
        year: "2023",
        summary: "This was a year of consolidation and high-impact projects. We provided key advice and measurements in the Argentine Presidential Elections, demonstrating our ability to handle large-scale and highly complex projects.",
        items: [
          { event: "Advisory in Argentine Presidential Elections", icon: <Globe /> },
          { event: "Demand trend projections for Business Chambers", icon: <Building /> },
          { event: "Development of the 'Quest' product for data analysis", icon: <Lightbulb /> },
        ],
      },
      {
        year: "2024",
        summary: "Our experience opened doors to new challenges. We began advising Multilateral International Organizations and applied our projection models in the Mexico City Elections.",
        items: [
          { event: "Advisory to Multilateral International Organizations", icon: <Briefcase /> },
          { event: "Projections in the Mexico City Elections", icon: <Vote /> },
          { event: "Launch of 'Mila' for document validation", icon: <FileText /> },
        ],
      },
      {
        year: "2025",
        summary: "Our commitment to transparency and innovation was recognized by being selected in the Top 20 of the CAF 'Zero Corruption' program. This milestone drives us to continue creating solutions that transform public management.",
        items: [
          { event: "Selected in the Top 20 of the CAF 'Zero Corruption' program", icon: <Award /> },
          { event: "Start of development of 'Vuro', our AI super-agent", icon: <Rocket /> },
          { event: "Consolidation as GovTech leaders in LATAM", icon: <Trophy /> },
        ],
      },
    ]
  }
}

export default function ExperiencePage() {
  const { language } = useLanguage();
  const c = content[language];
  const [activeYear, setActiveYear] = useState(c.milestonesByYear[0].year);

  const activeYearData = c.milestonesByYear.find(m => m.year === activeYear);

  return (
    <>
      <header className="py-20 bg-primary/10" style={{backgroundImage: "url('/backgrounds/titulos.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-headline">
            {c.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>
      </header>

      <section id="history" className="py-16 md:py-24 bg-background" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{c.historyTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {c.historySubtitle}
            </p>
          </div>
          
          <Tabs value={activeYear} onValueChange={setActiveYear} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 mb-8">
              {c.milestonesByYear.map((milestone) => (
                <TabsTrigger key={milestone.year} value={milestone.year}>{milestone.year}</TabsTrigger>
              ))}
            </TabsList>

            <div className="grid md:grid-cols-5 gap-8 items-start">
              <div className="md:col-span-2">
                <Card className="glassmorphism p-8 sticky top-24">
                  <CardContent className="p-0">
                      {activeYearData && (
                         <div>
                          <h3 className="text-2xl font-bold font-headline text-primary">Resumen del {activeYearData.year}</h3>
                          <p className="mt-4 text-muted-foreground">{activeYearData.summary}</p>
                        </div>
                      )}
                  </CardContent>
                </Card>
              </div>
              <div className="md:col-span-3">
                {c.milestonesByYear.map((milestone) => (
                  <TabsContent key={milestone.year} value={milestone.year}>
                    <Card className="glassmorphism">
                      <CardContent className="p-8 space-y-6">
                         <h3 className="text-2xl font-bold font-headline text-primary mb-4">Hitos del {milestone.year}</h3>
                         {milestone.items.map((item, index) => (
                          <div key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0 bg-primary/10 text-primary p-3 rounded-full">
                               {item.icon}
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">{item.event}</h4>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      <section id="team" className="py-16 md:py-24 bg-primary/5" style={{backgroundImage: "url('/backgrounds/secciones b.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-white">{c.teamTitle}</h2>
            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
              {c.teamSubtitle}
            </p>
          </div>
          <TeamSection />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background text-center" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="container mx-auto px-4">
               <h2 className="text-3xl font-bold font-headline">{c.ctaTitle}</h2>
               <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">{c.ctaSubtitle}</p>
               <Button asChild size="lg" className="mt-8">
                <a href="mailto:contacto@plusbi.com">{c.contactButton}</a>
              </Button>
          </div>
      </section>
    </>
  );
}

    