"use client";
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';
import React from 'react';

const storyContent = {
  es: [
    {
      year: '2025',
      paragraph: "Mirando hacia el futuro, en 2025 lanzamos Mila, una herramienta de IA que redefine la validación de documentos, y que ya ha sido reconocida internacionalmente por su potencial para combatir la corrupción. Nuestra historia es una de crecimiento constante, impulsada por el deseo de generar un impacto real y positivo."
    },
    {
      year: '2024',
      paragraph: "Para 2024, nuestra reputación nos llevó a colaborar con organismos internacionales, utilizando nuestra tecnología para medir fenómenos tan complejos como la conflictividad social. Hoy, seguimos creciendo, innovando y llevando nuestra experiencia a nuevos mercados, como lo hicimos en las elecciones de la Ciudad de México."
    },
    {
      year: '2023',
      paragraph: "El 2023 fue un año de consolidación. La fiabilidad de Quest quedó demostrada en las elecciones presidenciales de Argentina, donde nuestras proyecciones alcanzaron una precisión asombrosa. Al mismo tiempo, expandimos nuestro alcance para ayudar a cámaras empresariales a anticipar tendencias de mercado."
    },
    {
      year: '2022',
      paragraph: "Nuestro primer gran paso fue el desarrollo de Quest en 2022, una plataforma diseñada para analizar enormes volúmenes de datos. Rápidamente demostró su valía en el exigente mundo de las campañas políticas locales, donde la precisión es clave."
    },
    {
      year: '2021',
      paragraph: "En 2021, PLUS BI nació de una visión clara: transformar la toma de decisiones en el sector público y privado a través de la tecnología. No queríamos ser solo una consultora más; aspirábamos a ser pioneros en la aplicación de datos e inteligencia artificial para resolver problemas complejos."
    },
  ],
  en: [
     {
      year: '2025',
      paragraph: "Looking to the future, in 2025 we launched Mila, an AI tool that redefines document validation, and has already been internationally recognized for its potential to combat corruption. Our story is one of constant growth, driven by the desire to generate a real and positive impact."
    },
    {
      year: '2024',
      paragraph: "By 2024, our reputation led us to collaborate with international organizations, using our technology to measure phenomena as complex as social conflict. Today, we continue to grow, innovate, and bring our expertise to new markets, as we did in the Mexico City elections."
    },
    {
      year: '2023',
      paragraph: "2023 was a year of consolidation. Quest's reliability was demonstrated in Argentina's presidential elections, where our projections achieved astonishing accuracy. At the same time, we expanded our reach to help business chambers anticipate market trends."
    },
    {
      year: '2022',
      paragraph: "Our first major step was the development of Quest in 2022, a platform designed to analyze huge volumes of data. It quickly proved its worth in the demanding world of local political campaigns, where precision is key."
    },
    {
      year: '2021',
      paragraph: "In 2021, PLUS BI was born from a clear vision: to transform decision-making in the public and private sectors through technology. We didn't want to be just another consulting firm; we aspired to be pioneers in applying data and artificial intelligence to solve complex problems."
    },
  ]
};

interface StorySectionProps {
  activeYear: string;
}

export function StorySection({ activeYear }: StorySectionProps) {
  const { language } = useLanguage();
  const story = storyContent[language];

  return (
    <div className="prose prose-lg text-muted-foreground space-y-4">
      {story.map((item, index) => (
        <p
          key={index}
          className={cn(
            "transition-opacity duration-500",
            activeYear === item.year ? "opacity-100 font-semibold text-foreground" : "opacity-50"
          )}
        >
          {item.paragraph}
        </p>
      ))}
    </div>
  );
}
