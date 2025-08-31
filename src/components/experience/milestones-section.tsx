"use client";

import * as React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Rocket, Trophy, Lightbulb, TrendingUp, Globe, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const milestonesContent = {
    es: {
        years: [
            {
                year: '2021',
                items: [
                    {
                        title: 'Nacimiento de PLUS BI',
                        description: 'Fundamos la empresa con la misión de revolucionar la consultoría aplicando métodos y aplicaciones avanzadas.',
                        icon: <Rocket className="size-8 text-primary" />,
                    },
                ],
            },
            {
                year: '2022',
                items: [
                    {
                        title: 'Lanzamiento de Quest',
                        description: 'Presentamos nuestra plataforma de Big Data e IA, permitiendo análisis predictivos para el sector público y campañas políticas.',
                        icon: <Lightbulb className="size-8 text-primary" />,
                    },
                ],
            },
            {
                year: '2023',
                items: [
                    {
                        title: 'Caso de Éxito: Elecciones Argentinas',
                        description: 'Con Quest, nuestros clientes tuvieron un margen de error 1.42% en las proyecciones respecto a resultados finales.',
                        icon: <Trophy className="size-8 text-primary" />,
                    },
                    {
                        title: 'Lanzamiento de Mila',
                        description: 'Introducimos nuestra solución de IA para la validación de documentos legales en gobiernos, agilizando procesos y reduciendo errores.',
                        icon: <Building className="size-8 text-primary" />,
                    },
                ],
            },
            {
                year: '2024',
                items: [
                    {
                        title: 'Expansión de Servicios',
                        description: 'Comenzamos a ofrecer servicios de implementación para Sistemas de Expediente Electrónico, impulsando la transformación digital.',
                        icon: <TrendingUp className="size-8 text-primary" />,
                    },
                     {
                        title: 'Proyecciones en las Elecciones de la Ciudad de México',
                        description: 'Quest mostró su fiablidad respecto a sus proyecciones, obteniendo un margen de error del 3% respecto a resultados finales.',
                        icon: <Trophy className="size-8 text-primary" />,
                    },
                     {
                        title: 'Asesoramiento a Organismos Internacionales Multilaterales',
                        description: 'Utilización de Quest para medir índices de Conflictividad Social.',
                        icon: <Globe className="size-8 text-primary" />,
                    },
                ],
            },
            {
                year: '2025',
                items: [
                    {
                        title: 'Próximamente: Vuro',
                        description: 'Anunciamos el desarrollo de Vuro, un súper-agente de IA para automatizar el ciclo de vida completo de los documentos públicos.',
                        icon: <Globe className="size-8 text-primary" />,
                    },
                     {
                        title: "Mila es seleccionada en el Top 20 del programa 'Corrupción Cero' de la CAF",
                        description: "Programa en el que participaron empresas y startups de 17 países de América Latina y el Caribe, España y Corea del Sur.",
                        icon: <Award className="size-8 text-primary" />,
                    }
                ]
            }
        ],
    },
    en: {
        years: [
             {
                year: '2021',
                items: [
                    {
                        title: 'Birth of PLUS BI',
                        description: 'We founded the company with the mission to revolutionize consulting by applying advanced methods and applications.',
                        icon: <Rocket className="size-8 text-primary" />,
                    },
                ],
            },
            {
                year: '2022',
                items: [
                    {
                        title: 'Launch of Quest',
                        description: 'We introduced our Big Data and AI platform, enabling predictive analysis for the public sector and political campaigns.',
                        icon: <Lightbulb className="size-8 text-primary" />,
                    },
                ],
            },
            {
                year: '2023',
                items: [
                    {
                        title: 'Success Case: Argentine Elections',
                        description: 'With Quest, our clients had a 1.42% margin of error in their projections compared to the final results.',
                        icon: <Trophy className="size-8 text-primary" />,
                    },
                    {
                        title: 'Launch of Mila',
                        description: 'We introduced our AI solution for validating legal documents in governments, speeding up processes and reducing errors.',
                        icon: <Building className="size-8 text-primary" />,
                    },
                ],
            },
            {
                year: '2024',
                items: [
                    {
                        title: 'Service Expansion',
                        description: 'We began offering implementation services for Electronic File Systems, driving digital transformation.',
                        icon: <TrendingUp className="size-8 text-primary" />,
                    },
                    {
                        title: 'Projections in the Mexico City Elections',
                        description: 'Quest showed its reliability regarding its projections, obtaining a 3% margin of error compared to the final results.',
                        icon: <Trophy className="size-8 text-primary" />,
                    },
                    {
                        title: 'Advisory to Multilateral International Organizations',
                        description: 'Using Quest to measure Social Conflict indexes.',
                        icon: <Globe className="size-8 text-primary" />,
                    },
                ],
            },
            {
                year: '2025',
                items: [
                    {
                        title: 'Coming Soon: Vuro',
                        description: 'We announced the development of Vuro, an AI super-agent to automate the entire lifecycle of public documents.',
                        icon: <Globe className="size-8 text-primary" />,
                    },
                    {
                        title: "Mila is selected in the Top 20 of the CAF's 'Zero Corruption' program",
                        description: "A program in which companies and startups from 17 countries in Latin America and the Caribbean, Spain, and South Korea participated.",
                        icon: <Award className="size-8 text-primary" />,
                    }
                ]
            }
        ],
    },
};


export function MilestonesSection() {
    const { language } = useLanguage();
    const c = milestonesContent[language];
    const [activeYear, setActiveYear] = useState(c.years[0].year);

    const activeYearData = c.years.find(y => y.year === activeYear);

    return (
        <div className="grid md:grid-cols-3 gap-8 items-start max-w-5xl mx-auto">
            <div className="md:col-span-1 grid grid-cols-2 md:flex md:flex-col gap-2 md:sticky top-24">
                {c.years.map(item => (
                    <Button 
                        key={item.year}
                        variant={activeYear === item.year ? 'default' : 'outline'}
                        onClick={() => setActiveYear(item.year)}
                        className="w-full justify-start text-lg h-12"
                    >
                        {item.year}
                    </Button>
                ))}
            </div>
            <div className="md:col-span-2 space-y-4">
                 {activeYearData && activeYearData.items.map((item, index) => (
                    <Card key={index} className="shadow-lg glassmorphism">
                        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                           <div className="bg-primary/10 rounded-lg p-3 mt-1.5"> {item.icon}</div>
                            <div>
                                <CardTitle>{item.title}</CardTitle>
                                <p className="text-muted-foreground mt-2">{item.description}</p>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}