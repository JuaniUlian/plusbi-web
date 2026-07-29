
"use client";
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/language-context';
import { PageHero } from '@/components/shared/page-hero';
import { ContactSection } from '@/components/shared/contact-section';
import { MilestonesSection } from '@/components/experience/milestones-section';
import { StorySection } from '@/components/experience/story-section';
import { TeamSection } from '@/components/experience/team-section';

const content = {
  es: {
    badge: 'Nuestra experiencia',
    title: 'Desde 2021, del análisis político a la IA para gobiernos.',
    subtitle:
      'Empezamos haciendo consultoría política y social basada en datos. Hoy construimos las herramientas que usan organismos de control, gobiernos y universidades.',
    storyTitle: 'De la visión a la realidad',
    milestonesTitle: 'Hitos clave',
    teamTitle: 'El equipo',
    teamSubtitle: 'Las personas detrás de la innovación en PLUS BI.',
  },
  en: {
    badge: 'Our experience',
    title: 'Since 2021, from political analysis to AI for governments.',
    subtitle:
      'We started doing data-driven political and social consulting. Today we build the tools used by oversight agencies, governments and universities.',
    storyTitle: 'From vision to reality',
    milestonesTitle: 'Key milestones',
    teamTitle: 'The team',
    teamSubtitle: 'The people behind the innovation at PLUS BI.',
  }
}

export default function ExperiencePage() {
  const { language } = useLanguage();
  const c = content[language];
  const [activeYear, setActiveYear] = useState('2025');

  return (
    <>
      <PageHero
        eyebrow={<Badge variant="secondary" className="px-4 py-1.5 text-xs tracking-[0.15em] uppercase">{c.badge}</Badge>}
        title={c.title}
        subtitle={c.subtitle}
      />

      <section id="story-timeline" className="bg-card border-y border-black/5">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 lg:gap-16">
            <div className="mb-12 lg:mb-0">
              <div className="lg:sticky top-24">
                <h2 className="mb-8 font-headline text-3xl md:text-4xl font-extrabold tracking-tight">{c.storyTitle}</h2>
                <StorySection activeYear={activeYear} />
              </div>
            </div>
            <div>
              <h2 className="mb-8 font-headline text-3xl md:text-4xl font-extrabold tracking-tight">{c.milestonesTitle}</h2>
              <MilestonesSection activeYear={activeYear} setActiveYear={setActiveYear} />
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="bg-background">
        <div className="container max-w-5xl px-4 py-20 md:py-28">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tight">{c.teamTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{c.teamSubtitle}</p>
          </div>
          <TeamSection />
        </div>
      </section>

      <ContactSection />
    </>
  );
}
