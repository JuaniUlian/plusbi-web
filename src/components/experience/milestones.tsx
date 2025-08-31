"use client";

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flag, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from '@/contexts/language-context';

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
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? c.items.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === c.items.length - 1 ? 0 : prevIndex + 1));
    };
    
    const visibleMilestones = 3;
    const getVisibleIndices = () => {
        const indices = [];
        for (let i = 0; i < visibleMilestones; i++) {
            indices.push((currentIndex + i) % c.items.length);
        }
        return indices;
    };

    const visibleIndices = getVisibleIndices();

    return (
        <Card className="shadow-lg w-full glassmorphism">
            <CardContent className="p-6">
                <h3 className="text-2xl font-bold font-headline mb-6 text-center">{c.title}</h3>
                <div className="relative flex items-center justify-center">
                    <Button variant="outline" size="icon" className="absolute left-0 z-10" onClick={handlePrev}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex justify-center items-stretch gap-4 w-full overflow-hidden">
                        {visibleIndices.map((index, i) => {
                             const milestone = c.items[index];
                             const isCenter = i === Math.floor(visibleMilestones / 2);
                             return (
                                <div key={index} className={`transition-all duration-300 ${isCenter ? 'scale-110 z-10' : 'scale-90 opacity-60'}`}>
                                    <Card className={`h-full flex flex-col items-center justify-center text-center p-4 ${isCenter ? 'bg-primary/10' : ''}`}>
                                        <Flag className={`size-6 mb-2 ${isCenter ? 'text-primary' : 'text-muted-foreground'}`} />
                                        <p className="font-bold text-lg">{milestone.year}</p>
                                        <p className="text-sm text-muted-foreground">{milestone.event}</p>
                                    </Card>
                                </div>
                             )
                        })}
                    </div>
                    <Button variant="outline" size="icon" className="absolute right-0 z-10" onClick={handleNext}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
