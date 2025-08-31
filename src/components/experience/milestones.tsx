
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Award, BarChartHorizontal, Building, Star, Trophy, Vote } from "lucide-react";
import { useLanguage } from '@/contexts/language-context';

const milestonesContent = {
    es: {
        title: "Hitos",
        items: [
          { year: "2022", event: "🏛️ Asesoramiento en campañas políticas locales", icon: <Building /> },
          { year: "2022", event: "🗺️ Mediciones de intención de voto para campañas políticas locales", icon: <BarChartHorizontal /> },
          { year: "2023", event: "🇦🇷 Asesoramiento y mediciones en las Elecciones Presidenciales de Argentina", icon: <Vote /> },
          { year: "2023", event: "📊 Proyecciones de tendencias de demanda de productos para Cámaras Empresariales Argentinas", icon: <BarChartHorizontal /> },
          { year: "2024", event: "⭐ Asesoramiento a Organismos Internacionales Multilaterales", icon: <Star /> },
          { year: "2024", event: "🗳️ Proyecciones para las Elecciones de la Ciudad de México", icon: <Vote /> },
          { year: "2025", event: "🏆 Top 20 programa CAF 'Corrupción Cero'", icon: <Trophy /> },
        ]
    },
    en: {
        title: "Milestones",
        items: [
          { year: "2022", event: "🏛️ Advice on local political campaigns", icon: <Building /> },
          { year: "2022", event: "🗺️ Voting intention measurements for local political campaigns", icon: <BarChartHorizontal /> },
          { year: "2023", event: "🇦🇷 Advice and measurements in the Argentina’s Presidential Elections", icon: <Vote /> },
          { year: "2023", event: "📊 Projections of product demand trends for Argentine Business Chambers", icon: <BarChartHorizontal /> },
          { year: "2024", event: "⭐ Advice to Multilateral International Organizations", icon: <Star /> },
          { year: "2024", event: "🗳️ Projections for the Mexico City Elections", icon: <Vote /> },
          { year: "2025", event: "🏆 Top 20 CAF Program 'Zero Corruption'", icon: <Trophy /> },
        ]
    }
};

export function Milestones() {
    const { language } = useLanguage();
    const c = milestonesContent[language];

    return (
        <Card className="glassmorphism p-6 h-full">
            <h3 className="text-3xl font-bold font-headline mb-6 text-center">{c.title}</h3>
            <div className="relative pl-6">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20"></div>
                {c.items.map((milestone, index) => (
                    <div key={index} className="mb-8 relative">
                        <div className="absolute -left-[34px] top-1.5 flex items-center justify-center bg-primary text-primary-foreground rounded-full size-8 border-4 border-background">
                           {milestone.icon}
                        </div>
                        <p className="font-bold text-lg text-primary">{milestone.year}</p>
                        <p className="text-sm text-muted-foreground mt-1">{milestone.event}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}
