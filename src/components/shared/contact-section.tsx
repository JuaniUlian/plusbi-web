"use client";

import { useState } from 'react';
import { Copy, Check, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { CONTACT_EMAIL } from '@/lib/products';
import { Reveal } from '@/components/motion/reveal';

const content = {
  es: {
    title: '¿Hablamos?',
    subtitle: 'Contanos tu desafío y te respondemos en menos de 48 horas.',
    write: 'Escribinos',
    copy: 'Copiar',
    copied: 'Copiado',
  },
  en: {
    title: "Let's talk",
    subtitle: 'Tell us your challenge and we reply within 48 hours.',
    write: 'Write to us',
    copy: 'Copy',
    copied: 'Copied',
  },
};

/** Sección de contacto canónica: email protagonista, visible y copiable. Sin formularios. */
export function ContactSection() {
  const { language } = useLanguage();
  const c = content[language];
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard no disponible: el email queda visible como texto */
    }
  }

  return (
    <section id="contacto" className="mesh-brand scroll-mt-20">
      <div className="container max-w-3xl px-4 py-20 md:py-28 text-center">
        <Reveal>
          <h2 className="font-headline text-3xl font-extrabold tracking-tight md:text-5xl">{c.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{c.subtitle}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex flex-col items-center gap-5 rounded-2xl glass p-8 md:p-10">
            <p className="select-all break-all text-xl font-bold tracking-tight md:text-2xl">
              {CONTACT_EMAIL}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <a href={`mailto:${CONTACT_EMAIL}`}>
                  <Mail aria-hidden />
                  {c.write}
                </a>
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={copyEmail}>
                {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
                {copied ? c.copied : c.copy}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
