
"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/language-context';
import { MilestonesSection } from '@/components/experience/milestones-section';
import { StorySection } from '@/components/experience/story-section';
import { TeamSection } from '@/components/experience/team-section';

const content = {
  es: {
    title: "Nuestra Experiencia",
    subtitle: "Desde 2021, revolucionando la consultoría empresarial, política y social.",
    storyTitle: "De la Visión a la Realidad",
    milestonesTitle: "Hitos Clave",
    teamTitle: "El Equipo",
    teamSubtitle: "Conoce a los expertos que impulsan la innovación en PLUS BI.",
    ctaTitle: "¡Descubre cómo podemos ayudarte!",
    ctaSubtitle: "Trabajemos juntos para construir una administración más eficiente y transparente.",
    contactButton: "Contáctanos",
  },
  en: {
    title: "Our Experience",
    subtitle: "Since 2021, revolutionizing business, political, and social consulting.",
    storyTitle: "From Vision to Reality",
    milestonesTitle: "Key Milestones",
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
  const [activeYear, setActiveYear] = useState('2025');

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
                 <div className="text-center lg:text-left mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">{c.storyTitle}</h2>
                 </div>
                 <StorySection activeYear={activeYear} />
               </div>
            </div>

            <div>
              <div className="text-center lg:text-left mb-8">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{c.milestonesTitle}</h2>
              </div>
              <MilestonesSection activeYear={activeYear} setActiveYear={setActiveYear} />
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
