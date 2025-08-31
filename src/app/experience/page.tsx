import { TeamSection } from "@/components/experience/team-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flag } from "lucide-react";

const milestones = [
  {
    year: "2024",
    events: [
      "⭐ Advice to Multilateral International Organizations",
      "🗳️ Projections for the Mexico City Elections",
    ],
  },
  {
    year: "2023",
    events: [
      "🇦🇷 Advice and measurements in the Argentina’s Presidential Elections",
      "📊 Projections of product demand trends for Argentine Business Chambers",
    ],
  },
  {
    year: "2022",
    events: [
      "🏛️ Advice on local political campaigns",
      "🗺️ Voting intention measurements for local political campaigns",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <>
      <header className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark font-headline">
            Our Experience
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Since 2021, revolutionizing business, political, and social consulting. We develop advanced methods and applications to transform strategy, communication, and implementation of information-based actions.
          </p>
        </div>
      </header>

      <section id="history" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                     <h2 className="text-3xl font-bold font-headline mb-4">Nuestra historia</h2>
                     <div className="space-y-4 text-muted-foreground">
                        <p>PLUS BI se conformó en 2021, y ya el primer día algo hizo click. Descubrimos que nuestras perspectivas no solo se complementaban, sino que se potenciaban.</p>
                        <p>Hoy, somos un equipo unido por una convicción profunda: cada avance hacia una gestión pública más transparente y participativa es un paso hacia una sociedad más justa.</p>
                        <p>Nuestro equipo se distingue por integrar la innovación tecnológica con una visión profundamente humana. Analía y Pablo tienen una sólida trayectoria en modernización institucional, creando soluciones que abordan problemáticas complejas de manera estratégica y eficiente. Cristian y Juan, con su experiencia en políticas públicas y trabajo comunitario, se aseguran de que cada proyecto se construya sobre valores de empatía y participación real.</p>
                     </div>
                </div>
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Milestones</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative border-l-2 border-primary/20 pl-6 space-y-10">
                            {milestones.map((milestone, index) => (
                                <div key={milestone.year} className="relative">
                                    <div className="absolute -left-[34px] top-1 bg-primary rounded-full p-2">
                                        <Flag className="text-primary-foreground size-5" />
                                    </div>
                                    <Badge variant="secondary" className="mb-2 text-base">{milestone.year}</Badge>
                                    <ul className="list-none space-y-2 mt-2">
                                        {milestone.events.map(event => (
                                            <li key={event} className="text-muted-foreground">{event}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      <section id="team" className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">The Team</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the experts driving innovation at PLUS BI.
            </p>
          </div>
          <TeamSection />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background text-center">
          <div className="container mx-auto px-4">
               <h2 className="text-3xl font-bold font-headline">Find out how we can help you!</h2>
               <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">Let's work together to build a more efficient and transparent administration.</p>
               <Button asChild size="lg" className="mt-8">
                <a href="mailto:contacto@plusbi.com">Contact Us</a>
              </Button>
          </div>
      </section>
    </>
  );
}
