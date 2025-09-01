"use client";

import * as React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Rocket, Trophy, Lightbulb, TrendingUp, Globe, Building, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const milestonesContent = {
    es: {
        years: [
             {
                year: '2025',
                items: [
                     {
                        title: "Mila es seleccionada en el Top 20 del programa 'Corrupción Cero' de la CAF",
                        description: "Programa en el que participaron empresas y startups de 17 países de América Latina y el Caribe, España y Corea del Sur.",
                        icon: <Award className="size-8 text-primary" />,
                    },
                    {
                        title: 'Lanzamiento de Mila',
                        description: 'Introducimos nuestra solución de IA para la validación de documentos legales en gobiernos, agilizando procesos y reduciendo errores.',
                        icon: <Lightbulb className="size-8 text-primary" />,
                    },
                ]
            },
            {
                year: '2024',
                items: [
                     {
                        title: 'Asesoramiento a Organismos Internacionales Multilaterales',
                        description: 'Utilización de Quest para medir índices de Conflictividad Social.',
                        icon: <Globe className="size-8 text-primary" />,
                    },
                     {
                        title: 'Proyecciones en las Elecciones de la Ciudad de México',
                        description: 'Quest mostró su fiablidad respecto a sus proyecciones, obteniendo un margen de error del 3% respecto a resultados finales.',
                        icon: <Trophy className="size-8 text-primary" />,
                    },
                ],
            },
            {
                year: '2023',
                items: [
                    {
                        title: 'Asesoramiento en Elecciones Presidenciales de Argentina',
                        description: 'Con Quest, nuestros clientes tuvieron un margen de error 1.42% en las proyecciones respecto a resultados finales.',
                        icon: <Trophy className="size-8 text-primary" />,
                    },
                    {
                        title: 'Proyecciones de tendencias de demanda de productos para Cámaras Empresariales Argentinas',
                        description: '',
                        icon: <TrendingUp className="size-8 text-primary" />
                    }
                ],
            },
            {
                year: '2022',
                items: [
                    {
                        title: 'Asesoramiento en campañas políticas locales',
                        description: '',
                        icon: <Building className="size-8 text-primary" />,
                    },
                    {
                        title: 'Mediciones de intención de voto para campañas políticas locales',
                        description: '',
                        icon: <Target className="size-8 text-primary" />,
                    },
                ],
            },
            {
                year: '2021',
                items: [
                    {
                        title: 'Nacimiento de PLUS BI',
                        description: 'Fundamos la empresa en Julio con la misión de revolucionar la consultoría aplicando métodos y aplicaciones avanzadas.',
                        icon: <Rocket className="size-8 text-primary" />,
                    },
                ],
            },
        ],
    },
    en: {
        years: [
             {
                year: '2025',
                items: [
                    {
                        title: "Mila is selected in the Top 20 of the CAF's 'Zero Corruption' program",
                        description: "A program in which companies and startups from 17 countries in Latin America and the Caribbean, Spain, and South Korea participated.",
                        icon: <Award className="size-8 text-primary" />,
                    },
                    {
                        title: 'Launch of Mila',
                        description: 'We introduced our AI solution for validating legal documents in governments, speeding up processes and reducing errors.',
                        icon: <Lightbulb className="size-8 text-primary" />,
                    },
                ]
            },
            {
                year: '2024',
                items: [
                    {
                        title: 'Advice to Multilateral International Organizations',
                        description: 'Using Quest to measure Social Conflict indexes.',
                        icon: <Globe className="size-8 text-primary" />,
                    },
                    {
                        title: 'Projections in the Mexico City Elections',
                        description: 'Quest showed its reliability regarding its projections, obtaining a 3% margin of error compared to the final results.',
                        icon: <Trophy className="size-8 text-primary" />,
                    },
                ],
            },
            {
                year: '2023',
                items: [
                    {
                        title: "Advice and measurements in the Argentina’s Presidential Elections",
                        description: 'With Quest, our clients had a 1.42% margin of error in their projections compared to the final results.',
                        icon: <Trophy className="size-8 text-primary" />,
                    },
                    {
                        title: 'Projections of product demand trends for Argentine Business Chambers',
                        description: '',
                        icon: <TrendingUp className="size-8 text-primary" />
                    }
                ],
            },
            {
                year: '2022',
                items: [
                    {
                        title: 'Advice on local political campaigns',
                        description: '',
                        icon: <Building className="size-8 text-primary" />,
                    },
                     {
                        title: 'Voting intention measurements for local political campaigns',
                        description: '',
                        icon: <Target className="size-8 text-primary" />,
                    },
                ],
            },
            {
                year: '2021',
                items: [
                    {
                        title: 'Birth of PLUS BI',
                        description: 'We founded the company in July with the mission to revolutionize consulting by applying advanced methods and applications.',
                        icon: <Rocket className="size-8 text-primary" />,
                    },
                ],
            },
        ],
    },
};

interface MilestonesSectionProps {
    activeYear: string;
    setActiveYear: (year: string) => void;
}

export function MilestonesSection({ activeYear, setActiveYear }: MilestonesSectionProps) {
    const { language } = useLanguage();
    const c = milestonesContent[language];

    const activeYearData = c.years.find(y => y.year === activeYear);

    return (
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {c.years.map(item => (
                    <Button
                        key={item.year}
                        variant={activeYear === item.year ? 'default' : 'outline'}
                        onClick={() => setActiveYear(item.year)}
                        className={cn(
                            "w-full justify-center text-md h-12 transition-all duration-200 glassmorphism",
                            activeYear === item.year ? 'text-white font-bold' : 'bg-transparent text-foreground hover:bg-primary/10'
                        )}
                        style={activeYear === item.year ? {
                            backgroundImage: "url('/backgrounds/titulos.jpeg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        } : {}}
                    >
                        {item.year}
                    </Button>
                ))}
            </div>
            <div className="space-y-4">
                 {activeYearData && activeYearData.items.map((item, index) => (
                    <Card key={index} className="shadow-lg glassmorphism">
                        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                           <div className="bg-primary/10 rounded-lg p-3 mt-1.5 shrink-0"> {item.icon}</div>
                            <div>
                                <CardTitle>{item.title}</CardTitle>
                                {item.description && <CardDescription className="text-muted-foreground mt-2">{item.description}</CardDescription>}
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
