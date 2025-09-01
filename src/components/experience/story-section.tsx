
"use client";
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent } from '@/components/ui/card';

const storyContent = {
  es: [
    {
      year: '2025',
      paragraph: "En 2025, dimos un salto cualitativo con el lanzamiento de <strong>Mila</strong>. Esta herramienta de IA fue diseñada para transformar la gestión pública, permitiendo a los gobiernos revisar licitaciones y trámites con una eficiencia sin precedentes, garantizando transparencia y eliminando errores. Un hito que nos posicionó como líderes en la innovación GovTech."
    },
    {
      year: '2024',
      paragraph: "Para 2024, nuestra reputación nos llevó a colaborar con <strong>organismos internacionales</strong>, utilizando nuestra tecnología para medir fenómenos tan complejos como la conflictividad social. Hoy, seguimos creciendo, innovando y llevando nuestra experiencia a nuevos mercados, como lo hicimos en las <strong>elecciones de la Ciudad de México</strong>."
    },
    {
      year: '2023',
      paragraph: "El 2023 fue un año de consolidación. La fiabilidad de <strong>Quest</strong> quedó demostrada en las <strong>elecciones presidenciales de Argentina</strong>, donde nuestras proyecciones alcanzaron una precisión asombrosa. Al mismo tiempo, expandimos nuestro alcance para ayudar a cámaras empresariales a anticipar tendencias de mercado."
    },
    {
      year: '2022',
      paragraph: "Nuestro primer gran paso fue el desarrollo de Quest en 2022, una plataforma diseñada para analizar enormes volúmenes de datos. Rápidamente demostró su valía en el exigente mundo de las <strong>campañas políticas locales</strong>, donde la precisión es clave."
    },
    {
      year: '2021',
      paragraph: "En 2021, PLUS BI nació de una visión clara: <strong>transformar la toma de decisiones</strong> en el sector público y privado a través de la tecnología. No queríamos ser solo una consultora más; aspirábamos a ser pioneros en la aplicación de datos e inteligencia artificial para resolver problemas complejos."
    },
  ],
  en: [
     {
      year: '2025',
      paragraph: "In 2025, we took a qualitative leap forward with the launch of <strong>Mila</strong>. This AI tool was designed to transform public administration, enabling governments to review tenders and processes with unprecedented efficiency, ensuring transparency and eliminating errors. A milestone that positioned us as leaders in GovTech innovation."
    },
    {
      year: '2024',
      paragraph: "By 2024, our reputation led us to collaborate with <strong>international organizations</strong>, using our technology to measure phenomena as complex as social conflict. Today, we continue to grow, innovate, and bring our expertise to new markets, as we did in the <strong>Mexico City elections</strong>."
    },
    {
      year: '2023',
      paragraph: "2023 was a year of consolidation. <strong>Quest's</strong> reliability was demonstrated in <strong>Argentina's presidential elections</strong>, where our projections achieved astonishing accuracy. At the same time, we expanded our reach to help business chambers anticipate market trends."
    },
    {
      year: '2022',
      paragraph: "Our first major step was the development of Quest in 2022, a platform designed to analyze huge volumes of data. It quickly proved its worth in the demanding world of <strong>local political campaigns</strong>, where precision is key."
    },
    {
      year: '2021',
      paragraph: "In 2021, PLUS BI was born from a clear vision: to <strong>transform decision-making</strong> in the public and private sectors through technology. We didn't want to be just another consulting firm; we aspired to be pioneers in applying data and artificial intelligence to solve complex problems."
    },
  ]
};

interface StorySectionProps {
  activeYear: string;
}

export function StorySection({ activeYear }: StorySectionProps) {
  const { language } = useLanguage();
  const story = storyContent[language];
  const activeStory = story.find(s => s.year === activeYear);

  return (
    <Card className="glassmorphism h-full">
      <CardContent className="prose prose-lg text-muted-foreground p-8">
        {activeStory ? (
          <p 
             className="transition-opacity duration-500 opacity-100"
             dangerouslySetInnerHTML={{ __html: activeStory.paragraph }}
          />
        ) : (
          <p>Selecciona un año para ver la historia.</p>
        )}
      </CardContent>
    </Card>
  );
}
