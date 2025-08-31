"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Flag } from "lucide-react";
import { useLanguage } from '@/contexts/language-context';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const milestonesContent = {
    es: {
        title: "Hitos",
        items: [
          { year: "2025", event: "🏆 Top 20 programa CAF 'Corrupción Cero'" },
          { year: "2024", event: "⭐ Asesoramiento a Organismos Internacionales Multilaterales" },
          { year: "2024", event: "🗳️ Proyecciones para las Elecciones de la Ciudad de México" },
          { year: "2023", event: "🇦🇷 Asesoramiento y mediciones en las Elecciones Presidenciales de Argentina" },
          { year: "2023", event: "📊 Proyecciones de tendencias de demanda de productos para Cámaras Empresariales Argentinas" },
          { year: "2022", event: "🏛️ Asesoramiento en campañas políticas locales" },
          { year: "2022", event: "🗺️ Mediciones de intención de voto para campañas políticas locales" },
        ]
    },
    en: {
        title: "Milestones",
        items: [
          { year: "2025", event: "🏆 Top 20 CAF Program 'Zero Corruption'" },
          { year: "2024", event: "⭐ Advice to Multilateral International Organizations" },
          { year: "2024", event: "🗳️ Projections for the Mexico City Elections" },
          { year: "2023", event: "🇦🇷 Advice and measurements in the Argentina’s Presidential Elections" },
          { year: "2023", event: "📊 Projections of product demand trends for Argentine Business Chambers" },
          { year: "2022", event: "🏛️ Advice on local political campaigns" },
          { year: "2022", event: "🗺️ Voting intention measurements for local political campaigns" },
        ]
    }
};

export function Milestones() {
    const { language } = useLanguage();
    const c = milestonesContent[language];

    return (
        <section className="py-16 md:py-24 bg-primary/5">
            <div className="container mx-auto px-4">
                 <h3 className="text-3xl font-bold font-headline mb-8 text-center">{c.title}</h3>
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 2000,
                      stopOnInteraction: true,
                    }),
                  ]}
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {c.items.map((milestone, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                        <div className="p-1 h-full">
                           <Card className={`h-full flex flex-col items-center justify-center text-center p-4 glassmorphism`}>
                                <Flag className={`size-6 mb-2 text-primary`} />
                                <p className="font-bold text-lg">{milestone.year}</p>
                                <p className="text-sm text-muted-foreground">{milestone.event}</p>
                            </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
