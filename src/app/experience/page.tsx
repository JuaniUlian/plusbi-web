"use client";
import { TeamSection } from "@/components/experience/team-section";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/language-context';
import { Milestones } from "@/components/experience/milestones";

const content = {
  es: {
    title: "Nuestra Experiencia",
    subtitle: "Desde 2021, revolucionando la consultoría empresarial, política y social. Desarrollamos métodos y aplicaciones avanzadas para transformar la estrategia, la comunicación y la implementación de acciones basadas en información.",
    historyTitle: "Nuestra historia",
    historyP1: "PLUS BI se conformó en 2021, y ya el primer día algo hizo click. Descubrimos que nuestras perspectivas no solo se complementaban, sino que se potenciaban.",
    historyP2: "Hoy, somos un equipo unido por una convicción profunda: cada avance hacia una gestión pública más transparente y participativa es un paso hacia una sociedad más justa.",
    historyP3: "Nuestro equipo se distingue por integrar la innovación tecnológica con una visión profundamente humana. Analía y Pablo tienen una sólida trayectoria en modernización institucional, creando soluciones que abordan problemáticas complejas de manera estratégica y eficiente. Cristian y Juan, con su experiencia en políticas públicas y trabajo comunitario, se aseguran de que cada proyecto se construya sobre valores de empatía y participación real.",
    milestonesTitle: "Hitos",
    teamTitle: "El Equipo",
    teamSubtitle: "Conoce a los expertos que impulsan la innovación en PLUS BI.",
    ctaTitle: "¡Descubre cómo podemos ayudarte!",
    ctaSubtitle: "Trabajemos juntos para construir una administración más eficiente y transparente.",
    contactButton: "Contáctanos"
  },
  en: {
    title: "Our Experience",
    subtitle: "Since 2021, revolutionizing business, political, and social consulting. We develop advanced methods and applications to transform strategy, communication, and implementation of information-based actions.",
    historyTitle: "Our History",
    historyP1: "PLUS BI was formed in 2021, and on the very first day, something just clicked. We discovered that our perspectives not only complemented each other, but amplified one another.",
    historyP2: "Today, we are a team united by a deep conviction: every step towards a more transparent and participatory public management is a step towards a more just society.",
    historyP3: "Our team stands out for integrating technological innovation with a profoundly human vision. Analía and Pablo have a solid track record in institutional modernization, creating solutions that address complex issues strategically and efficiently. Cristian and Juan, with their experience in public policy and community work, ensure that every project is built on values of empathy and real participation.",
    milestonesTitle: "Milestones",
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

  return (
    <>
      <header className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark font-headline">
            {c.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>
      </header>

      <section id="history" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                 <h2 className="text-3xl font-bold font-headline mb-4 text-center">{c.historyTitle}</h2>
                 <div className="space-y-4 text-muted-foreground text-lg">
                    <p>{c.historyP1}</p>
                    <p>{c.historyP2}</p>
                    <p>{c.historyP3}</p>
                 </div>
            </div>
        </div>
      </section>

      <Milestones />

      <section id="team" className="py-16 md:py-24 bg-primary/5">
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

      <section className="py-16 md:py-24 bg-background text-center">
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
