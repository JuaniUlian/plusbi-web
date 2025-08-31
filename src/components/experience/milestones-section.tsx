"use client";

import { useLanguage } from '@/contexts/language-context';
import { Rocket, Trophy, Users, Lightbulb, TrendingUp, Globe, Building } from 'lucide-react';
import { cn } from '@/lib/utils';

const milestonesContent = {
    es: {
        items: [
            {
                year: '2021',
                title: 'Nacimiento de PLUS BI',
                description: 'Fundamos la empresa con la misión de revolucionar la consultoría aplicando métodos y aplicaciones avanzadas.',
                icon: <Rocket />,
            },
            {
                year: '2022',
                title: 'Lanzamiento de Quest',
                description: 'Presentamos nuestra plataforma de Big Data e IA, permitiendo análisis predictivos para el sector público y campañas políticas.',
                icon: <Lightbulb />,
            },
            {
                year: '2023',
                title: 'Caso de Éxito: Elecciones Argentinas',
                description: 'Analizamos más de 7.1 millones de puntos de datos durante las elecciones presidenciales, demostrando el poder de Quest.',
                icon: <Trophy />,
            },
             {
                year: '2023',
                title: 'Lanzamiento de Mila',
                description: 'Introducimos nuestra solución de IA para la validación de documentos legales en gobiernos, agilizando procesos y reduciendo errores.',
                icon: <Building />,
            },
            {
                year: '2024',
                title: 'Expansión de Servicios',
                description: 'Comenzamos a ofrecer servicios de implementación para Sistemas de Expediente Electrónico, impulsando la transformación digital.',
                icon: <TrendingUp />,
            },
            {
                year: '2025',
                title: 'Próximamente: Vuro',
                description: 'Anunciamos el desarrollo de Vuro, un súper-agente de IA para automatizar el ciclo de vida completo de los documentos públicos.',
                icon: <Globe />,
            }
        ],
    },
    en: {
        items: [
            {
                year: '2021',
                title: 'Birth of PLUS BI',
                description: 'We founded the company with the mission to revolutionize consulting by applying advanced methods and applications.',
                icon: <Rocket />,
            },
            {
                year: '2022',
                title: 'Launch of Quest',
                description: 'We introduced our Big Data and AI platform, enabling predictive analysis for the public sector and political campaigns.',
                icon: <Lightbulb />,
            },
            {
                year: '2023',
                title: 'Success Case: Argentine Elections',
                description: 'We analyzed over 7.1 million data points during the presidential elections, demonstrating the power of Quest.',
                icon: <Trophy />,
            },
            {
                year: '2023',
                title: 'Launch of Mila',
                description: 'We introduced our AI solution for validating legal documents in governments, speeding up processes and reducing errors.',
                icon: <Building />,
            },
            {
                year: '2024',
                title: 'Service Expansion',
                description: 'We began offering implementation services for Electronic File Systems, driving digital transformation.',
                icon: <TrendingUp />,
            },
            {
                year: '2025',
                title: 'Coming Soon: Vuro',
                description: 'We announced the development of Vuro, an AI super-agent to automate the entire lifecycle of public documents.',
                icon: <Globe />,
            }
        ],
    },
};


export function MilestonesSection() {
    const { language } = useLanguage();
    const c = milestonesContent[language];

    return (
        <div className="relative">
            {/* The vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-border -translate-x-1/2" aria-hidden="true"></div>

            <div className="space-y-12">
                {c.items.map((item, index) => (
                    <div
                        key={item.title}
                        className={cn(
                            "flex items-center w-full",
                            index % 2 === 0 ? "justify-start" : "justify-end"
                        )}
                    >
                        <div
                            className={cn(
                                "w-1/2 flex",
                                index % 2 === 0 ? "justify-end pr-8" : "justify-start pl-8"
                            )}
                        >
                            <div
                                className={cn(
                                    "p-6 rounded-lg shadow-lg w-full max-w-md glassmorphism",
                                    index % 2 === 0 ? "text-right" : "text-left"
                                )}
                            >
                                <p className="text-sm font-semibold text-primary">{item.year}</p>
                                <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                                <p className="text-muted-foreground mt-2">{item.description}</p>
                            </div>
                        </div>

                        {/* The circle and icon */}
                        <div className="absolute left-1/2 -translate-x-1/2 bg-background p-2 rounded-full border-2 border-border">
                            <div className="bg-primary text-primary-foreground p-3 rounded-full">
                                {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
