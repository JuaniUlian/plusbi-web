"use client";

import Link from 'next/link';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';

const footerContent = {
  es: {
    slogan: "Innovación GovTech para una sociedad más justa y transparente.",
    contactTitle: "¿Hablamos?",
    contactSubtitle: "Construyamos juntos una administración más eficiente.",
    contactButton: "Agenda una reunión",
    copyright: "© 2025 PLUS BI. Todos los derechos reservados."
  },
  en: {
    slogan: "GovTech innovation for a more just and transparent society.",
    contactTitle: "Let's talk?",
    contactSubtitle: "Let's build a more efficient administration together.",
    contactButton: "Schedule a meeting",
    copyright: "© 2025 PLUS BI. All rights reserved."
  }
}

export function Footer() {
  const { language } = useLanguage();
  const c = footerContent[language];

  return (
    <footer 
      className="border-t border-white/20 text-white" 
      style={{backgroundImage: "url('/backgrounds/titulos.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}
    >
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="flex flex-col items-center gap-8 mb-8">
            <div className="space-y-4">
                <Link href="/" className="inline-flex items-center gap-2">
                    <Logo className="h-8 w-8" />
                    <span className="font-bold text-lg font-headline">PLUS BI</span>
                </Link>
                <p className="text-sm text-white/70 max-w-xs mx-auto">{c.slogan}</p>
            </div>
            
            <div className="flex flex-col items-center">
                 <h3 className="font-semibold mb-2 text-lg">{c.contactTitle}</h3>
                 <p className="text-sm text-white/70 mb-4 max-w-xs">{c.contactSubtitle}</p>
                 <Button asChild variant="secondary">
                     <a href="mailto:contacto@plusbi.com">{c.contactButton}</a>
                 </Button>
            </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-sm text-white/50">
            <p>{c.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
