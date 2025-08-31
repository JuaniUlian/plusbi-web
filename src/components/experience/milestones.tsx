
"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Rocket,
  TrendingUp,
  Globe,
  Trophy,
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

const milestonesContent = {
  es: {
    items: [
      {
        year: "2022",
        event: "Nacimiento y Primeros Pasos",
        icon: <Rocket />,
        description:
          "<p><strong>PLUS BI se conformó en 2021</strong>, y ya el primer día algo hizo click. Descubrimos que nuestras perspectivas no solo se complementaban, sino que se potenciaban.</p><p class='mt-2'>Durante 2022, comenzamos a dar nuestros primeros pasos, ofreciendo <strong>asesoramiento en campañas políticas locales</strong> y realizando nuestras primeras <strong>mediciones de intención de voto</strong>, sentando las bases de nuestra metodología.</p>",
      },
      {
        year: "2023",
        event: "Consolidación y Proyectos de Alto Impacto",
        icon: <TrendingUp />,
        description:
          "<p>Este fue un año de consolidación. Brindamos <strong>asesoramiento y mediciones clave en las Elecciones Presidenciales de Argentina</strong>, demostrando nuestra capacidad para manejar proyectos de gran escala.</p><p class='mt-2'>Además, desarrollamos <strong>proyecciones de tendencias de demanda</strong> para importantes Cámaras Empresariales Argentinas, diversificando nuestro campo de acción.</p>",
      },
      {
        year: "2024",
        event: "Expansión Internacional",
        icon: <Globe />,
        description:
          "<p>Nuestra experiencia nos abrió las puertas a nuevos desafíos. Comenzamos a brindar <strong>asesoramiento a Organismos Internacionales Multilaterales</strong> y aplicamos nuestros modelos de proyección en las <strong>Elecciones de la Ciudad de México</strong>, validando nuestra metodología en un nuevo contexto político y social.</p>",
      },
      {
        year: "2025",
        event: "Innovación y Reconocimiento",
        icon: <Trophy />,
        description:
          "<p>Nuestro compromiso con la transparencia y la innovación fue reconocido al ser seleccionados en el <strong>Top 20 del programa 'Corrupción Cero' de la CAF</strong>.</p><p class='mt-2'>Este hito no solo valida nuestro trabajo, sino que nos impulsa a seguir creando soluciones como <strong>Mila</strong>, que transforman la gestión pública. Nuestra pasión y propósito nos guían para construir un futuro más justo y equitativo para todos.</p>",
      },
    ],
  },
  en: {
    items: [
      {
        year: "2022",
        event: "Birth and First Steps",
        icon: <Rocket />,
        description:
          "<p><strong>PLUS BI was formed in 2021</strong>, and on the very first day, something just clicked. We discovered our perspectives complemented and enhanced each other.</p><p class='mt-2'>During 2022, we took our first steps, offering <strong>advice on local political campaigns</strong> and conducting our first <strong>voting intention measurements</strong>, laying the foundation for our methodology.</p>",
      },
      {
        year: "2023",
        event: "Consolidation and High-Impact Projects",
        icon: <TrendingUp />,
        description:
          "<p>This was a year of consolidation. We provided key <strong>advice and measurements in the Argentine Presidential Elections</strong>, demonstrating our ability to handle large-scale projects.</p><p class='mt-2'>Additionally, we developed <strong>demand trend projections</strong> for major Argentine Business Chambers, diversifying our field of action.</p>",
      },
      {
        year: "2024",
        event: "International Expansion",
        icon: <Globe />,
        description:
          "<p>Our experience opened doors to new challenges. We began <strong>advising Multilateral International Organizations</strong> and applied our projection models to the <strong>Mexico City Elections</strong>, validating our methodology in a new political and social context.</p>",
      },
      {
        year: "2025",
        event: "Innovation and Recognition",
        icon: <Trophy />,
        description:
          "<p>Our commitment to transparency and innovation was recognized by being selected in the <strong>Top 20 of the CAF 'Zero Corruption' program</strong>.</p><p class='mt-2'>This milestone not only validates our work but also drives us to continue creating solutions like <strong>Mila</strong> that transform public management. Our passion and purpose guide us to build a more just and equitable future for all.</p>",
      },
    ],
  },
};

export type MilestoneItem = {
  year: string;
  event: string;
  icon: React.ReactNode;
  description: string;
};

type MilestonesProps = {
  onActiveMilestoneChange: (milestone: MilestoneItem | null) => void;
};

export function Milestones({ onActiveMilestoneChange }: MilestonesProps) {
  const { language } = useLanguage();
  const c = milestonesContent[language];
  const milestoneRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    onActiveMilestoneChange(c.items[0]);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = milestoneRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index > -1) {
              onActiveMilestoneChange(c.items[index]);
            }
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: '-50% 0px -50% 0px', // trigger when milestone is in the vertical center
        threshold: 0,
      }
    );

    milestoneRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      milestoneRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      onActiveMilestoneChange(null);
    };
  }, [c.items, onActiveMilestoneChange]);

  return (
    <div className="relative pl-8">
      <div className="absolute left-[3.1rem] top-0 bottom-0 w-0.5 bg-primary/20" style={{ transform: "translateX(-50%)" }}></div>
      {c.items.map((milestone, index) => {
        return (
          <div
            key={index}
            ref={(el) => (milestoneRefs.current[index] = el)}
            className="mb-24 relative"
          >
            <div
              className="absolute -left-1 top-0 flex items-center justify-center bg-primary text-primary-foreground rounded-full size-12 border-4 border-background"
            >
              <div className="transform transition-transform duration-300">
                {milestone.icon}
              </div>
            </div>
            <div className="ml-12">
              <p className="font-bold text-2xl text-primary">{milestone.year}</p>
              <p className="text-md text-muted-foreground font-semibold mt-1">{milestone.event}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
