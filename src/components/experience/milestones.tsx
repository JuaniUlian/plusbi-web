
"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChartHorizontal,
  Building,
  Star,
  Trophy,
  Vote,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

const milestonesContent = {
  es: {
    title: "Nuestra Historia y Hitos",
    items: [
      {
        year: "2022",
        event: "Nacimiento de PLUS BI y Primeros Pasos",
        icon: <Building />,
        description:
          "<strong>PLUS BI se conformó en 2021</strong>, y ya el primer día algo hizo click. Descubrimos que nuestras perspectivas no solo se complementaban, sino que se potenciaban. Durante 2022, comenzamos a dar nuestros primeros pasos, ofreciendo <strong>asesoramiento en campañas políticas locales</strong> y realizando nuestras primeras <strong>mediciones de intención de voto</strong>, sentando las bases de nuestra metodología.",
      },
      {
        year: "2023",
        event: "Consolidación y Proyectos de Alto Impacto",
        icon: <Vote />,
        description:
          "Este fue un año de consolidación. Brindamos <strong>asesoramiento y mediciones clave en las Elecciones Presidenciales de Argentina</strong>, demostrando nuestra capacidad para manejar proyectos de gran escala. Además, desarrollamos <strong>proyecciones de tendencias de demanda</strong> para importantes Cámaras Empresariales Argentinas, diversificando nuestro campo de acción.",
      },
      {
        year: "2024",
        event: "Expansión y Reconocimiento Internacional",
        icon: <Star />,
        description:
          "Nuestra experiencia nos abrió las puertas a nuevos desafíos. Comenzamos a brindar <strong>asesoramiento a Organismos Internacionales Multilaterales</strong> y aplicamos nuestros modelos de proyección en las <strong>Elecciones de la Ciudad de México</strong>, validando nuestra metodología en un nuevo contexto político y social.",
      },
      {
        year: "2025",
        event: "Innovación y Futuro: El Reconocimiento a Mila",
        icon: <Trophy />,
        description:
          "Nuestro compromiso con la transparencia y la innovación fue reconocido al ser seleccionados en el <strong>Top 20 del programa 'Corrupción Cero' de la CAF</strong>. Este hito no solo valida nuestro trabajo, sino que nos impulsa a seguir creando soluciones como <strong>Mila</strong>, que transforman la gestión pública. Nuestra pasión y propósito nos guían para construir un futuro más justo y equitativo para todos.",
      },
    ],
  },
  en: {
    title: "Our History & Milestones",
    items: [
      {
        year: "2022",
        event: "The Birth of PLUS BI and First Steps",
        icon: <Building />,
        description:
          "<strong>PLUS BI was formed in 2021</strong>, and on the very first day, something just clicked. We discovered our perspectives complemented and enhanced each other. During 2022, we took our first steps, offering <strong>advice on local political campaigns</strong> and conducting our first <strong>voting intention measurements</strong>, laying the foundation for our methodology.",
      },
      {
        year: "2023",
        event: "Consolidation and High-Impact Projects",
        icon: <Vote />,
        description:
          "This was a year of consolidation. We provided key <strong>advice and measurements in the Argentine Presidential Elections</strong>, demonstrating our ability to handle large-scale projects. Additionally, we developed <strong>demand trend projections</strong> for major Argentine Business Chambers, diversifying our field of action.",
      },
      {
        year: "2024",
        event: "Expansion and International Recognition",
        icon: <Star />,
        description:
          "Our experience opened doors to new challenges. We began <strong>advising Multilateral International Organizations</strong> and applied our projection models to the <strong>Mexico City Elections</strong>, validating our methodology in a new political and social context.",
      },
      {
        year: "2025",
        event: "Innovation and Future: The Recognition of Mila",
        icon: <Trophy />,
        description:
          "Our commitment to transparency and innovation was recognized by being selected in the <strong>Top 20 of the CAF 'Zero Corruption' program</strong>. This milestone not only validates our work but also drives us to continue creating solutions like <strong>Mila</strong> that transform public management. Our passion and purpose guide us to build a more just and equitable future for all.",
      },
    ],
  },
};

export function Milestones() {
  const { language } = useLanguage();
  const c = milestonesContent[language];
  const [openYear, setOpenYear] = useState<string | null>(c.items[0].year);

  const toggleYear = (year: string) => {
    setOpenYear(prev => (prev === year ? null : year));
  };

  return (
    <Card className="glassmorphism p-6 md:p-8 w-full">
      <CardHeader className="text-center p-0 mb-8">
        <CardTitle className="text-3xl font-bold font-headline">
          {c.title}
        </CardTitle>
      </CardHeader>
      <div className="relative pl-8">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>
        {c.items.map((milestone, index) => {
          const isOpen = openYear === milestone.year;
          return (
            <div key={index} className="mb-4 relative">
              <div
                className="absolute -left-[2px] top-0 flex items-center justify-center bg-primary text-primary-foreground rounded-full size-8 border-4 border-background cursor-pointer"
                onClick={() => toggleYear(milestone.year)}
              >
                <div className="transform transition-transform duration-300">
                  {milestone.icon}
                </div>
              </div>
              <div className="ml-12">
                <Button
                  variant="ghost"
                  className="w-full justify-between items-center text-left p-0 h-auto"
                  onClick={() => toggleYear(milestone.year)}
                >
                  <div>
                    <p className="font-bold text-lg text-primary">{milestone.year}</p>
                    <p className="text-md text-muted-foreground font-semibold">{milestone.event}</p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "size-5 text-primary transition-transform duration-300",
                      isOpen ? "rotate-180" : ""
                    )}
                  />
                </Button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    isOpen ? "max-h-[500px] pt-4" : "max-h-0 pt-0"
                  )}
                >
                  <CardContent className="p-4 bg-primary/5 rounded-lg">
                    <p
                      className="text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: milestone.description }}
                    />
                  </CardContent>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
