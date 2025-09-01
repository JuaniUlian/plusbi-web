
      
"use client";
import { useState } from 'react';
import { TeamSection } from "@/components/experience/team-section";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/language-context';
import { MilestonesSection } from '@/components/experience/milestones-section';

const content = {
  es: {
    title: "Nuestra Experiencia",
    subtitle: "Desde 2021, revolucionando la consultoría empresarial, política y social.",
    storyTitle: "Nuestra Historia: De la Visión a la Realidad",
    story: [
      "En 2021, PLUS BI nació de una visión clara: transformar la toma de decisiones en el sector público y privado a través de la tecnología. No queríamos ser solo una consultora más; aspirábamos a ser pioneros en la aplicación de datos e inteligencia artificial para resolver problemas complejos.",
      "Nuestro primer gran paso fue el desarrollo de Quest en 2022, una plataforma diseñada para analizar enormes volúmenes de datos. Rápidamente demostró su valía en el exigente mundo de las campañas políticas locales, donde la precisión es clave.",
      "El 2023 fue un año de consolidación. La fiabilidad de Quest quedó demostrada en las elecciones presidenciales de Argentina, donde nuestras proyecciones alcanzaron una precisión asombrosa. Al mismo tiempo, expandimos nuestro alcance para ayudar a cámaras empresariales a anticipar tendencias de mercado.",
      "Para 2024, nuestra reputación nos llevó a colaborar con organismos internacionales, utilizando nuestra tecnología para medir fenómenos tan complejos como la conflictividad social. Hoy, seguimos creciendo, innovando y llevando nuestra experiencia a nuevos mercados, como lo hicimos en las elecciones de la Ciudad de México.",
      "Mirando hacia el futuro, en 2025 lanzamos Mila, una herramienta de IA que redefine la validación de documentos, y que ya ha sido reconocida internacionalmente por su potencial para combatir la corrupción. Nuestra historia es una de crecimiento constante, impulsada por el deseo de generar un impacto real y positivo."
    ],
    milestonesTitle: "Hitos Clave",
    milestonesSubtitle: "Un recorrido interactivo por nuestros logros más importantes. Selecciona un año para explorar.",
    teamTitle: "El Equipo",
    teamSubtitle: "Conoce a los expertos que impulsan la innovación en PLUS BI.",
    ctaTitle: "¡Descubre cómo podemos ayudarte!",
    ctaSubtitle: "Trabajemos juntos para construir una administración más eficiente y transparente.",
    contactButton: "Contáctanos",
  },
  en: {
    title: "Our Experience",
    subtitle: "Since 2021, revolutionizing business, political, and social consulting.",
    storyTitle: "Our Story: From Vision to Reality",
    story: [
      "In 2021, PLUS BI was born from a clear vision: to transform decision-making in the public and private sectors through technology. We didn't want to be just another consulting firm; we aspired to be pioneers in applying data and artificial intelligence to solve complex problems.",
      "Our first major step was the development of Quest in 2022, a platform designed to analyze huge volumes of data. It quickly proved its worth in the demanding world of local political campaigns, where precision is key.",
      "2023 was a year of consolidation. Quest's reliability was demonstrated in Argentina's presidential elections, where our projections achieved astonishing accuracy. At the same time, we expanded our reach to help business chambers anticipate market trends.",
      "By 2024, our reputation led us to collaborate with international organizations, using our technology to measure phenomena as complex as social conflict. Today, we continue to grow, innovate, and bring our expertise to new markets, as we did in the Mexico City elections.",
      "Looking to the future, in 2025 we launched Mila, an AI tool that redefines document validation, and has already been internationally recognized for its potential to combat corruption. Our story is one of constant growth, driven by the desire to generate a real and positive impact."
    ],
    milestonesTitle: "Key Milestones",
    milestonesSubtitle: "An interactive journey through our most important achievements. Select a year to explore.",
    teamTitle: "The Team",
    teamSubtitle: "Meet the experts driving innovation at PLUS BI.",
    ctaTitle: "Find out how we can help you!",
    ctaSubtitle: "Let's work together to build a more efficient and transparent administration.",
    contactButton: "Contact Us",
  }
}

export default function ExperiencePage() {
  const { language } = useLanguage();
  const c = content[language];

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

      <section id="story-timeline" className="py-16 md:py-24 bg-background" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 lg:gap-16">
            <div className="mb-12 lg:mb-0">
              <div className="lg:sticky top-24">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">{c.storyTitle}</h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  {c.story.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
              </div>
            </div>

            <div>
              <div className="text-center lg:text-left mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold font-headline">{c.milestonesTitle}</h2>
                  <p className="mt-2 text-lg text-muted-foreground">
                      {c.milestonesSubtitle}
                  </p>
              </div>
              <MilestonesSection />
            </div>
          </div>
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
