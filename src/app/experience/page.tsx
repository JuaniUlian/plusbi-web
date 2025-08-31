
"use client";
import { useState } from 'react';
import { TeamSection } from "@/components/experience/team-section";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/language-context';
import { Milestones, type MilestoneItem } from "@/components/experience/milestones";
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { AnimatePresence, motion } from "framer-motion";

const content = {
  es: {
    title: "Nuestra Experiencia",
    subtitle: "Desde 2021, revolucionando la consultoría empresarial, política y social.",
    teamTitle: "El Equipo",
    teamSubtitle: "Conoce a los expertos que impulsan la innovación en PLUS BI.",
    ctaTitle: "¡Descubre cómo podemos ayudarte!",
    ctaSubtitle: "Trabajemos juntos para construir una administración más eficiente y transparente.",
    contactButton: "Contáctanos"
  },
  en: {
    title: "Our Experience",
    subtitle: "Since 2021, revolutionizing business, political, and social consulting.",
    teamTitle: "The Team",
    teamSubtitle: "Meet the experts driving innovation at PLUS BI.",
    ctaTitle: "Find out how we can help you!",
    ctaSubtitle: "Let's work together to build a more efficient and transparent administration.",
    contactButton: "Contact Us"
  }
}

export default function ExperiencePage() {
  const { language } = useLanguage();
  const c = content[language];
  const [activeMilestone, setActiveMilestone] = useState<MilestoneItem | null>(null);

  const handleActiveMilestoneChange = (milestone: MilestoneItem | null) => {
    setActiveMilestone(milestone);
  };

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
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <Card className="glassmorphism p-8 sticky top-24">
              <CardContent className="p-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeMilestone ? activeMilestone.year : "initial"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeMilestone ? (
                      <div>
                        <h3 className="text-2xl font-bold font-headline text-primary">{activeMilestone.event}</h3>
                        <p className="text-muted-foreground font-semibold mt-1">{activeMilestone.year}</p>
                        <div className="mt-4 text-muted-foreground prose" dangerouslySetInnerHTML={{ __html: activeMilestone.description }} />
                      </div>
                    ) : (
                       <div>
                        <h3 className="text-2xl font-bold font-headline">Nuestra Historia</h3>
                        <p className="mt-4 text-muted-foreground">PLUS BI se conformó en 2021, y ya el primer día algo hizo click. Descubrimos que nuestras perspectivas no solo se complementaban, sino que se potenciaban. Hoy, somos un equipo unido por una convicción profunda: cada avance hacia una gestión pública más transparente y participativa es un paso hacia una sociedad más justa.</p>
                        <p className="mt-2 text-muted-foreground">Navega por nuestros hitos para descubrir nuestra historia.</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card>
            <Milestones onActiveMilestoneChange={handleActiveMilestoneChange} />
          </div>
        </div>
      </section>

      <section id="team" className="py-16 md:py-24 bg-primary/5" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">{c.teamTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
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
