"use client";

import Link from 'next/link';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';

const footerContent = {
  es: {
    slogan: "Innovación GovTech para una sociedad más justa y transparente.",
    navigation: "Navegación",
    home: "Inicio",
    products: "Productos",
    experience: "Experiencia",
    contactTitle: "¿Hablamos?",
    contactSubtitle: "Construyamos juntos una administración más eficiente.",
    contactButton: "Agenda una reunión",
    copyright: "© 2025 PLUS BI. Todos los derechos reservados."
  },
  en: {
    slogan: "GovTech innovation for a more just and transparent society.",
    navigation: "Navigation",
    home: "Home",
    products: "Products",
    experience: "Experience",
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
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
                <Link href="/" className="flex items-center gap-2">
                    <Logo className="h-8 w-8" />
                    <span className="font-bold text-lg font-headline">PLUS BI</span>
                </Link>
                <p className="text-sm text-white/70">{c.slogan}</p>
            </div>
            <div>
                <h3 className="font-semibold mb-4">{c.navigation}</h3>
                <nav className="flex flex-col space-y-2">
                    <Link href="/" className="text-sm hover:underline text-white/70">{c.home}</Link>
                    <Link href="/products" className="text-sm hover:underline text-white/70">{c.products}</Link>
                    <Link href="/experience" className="text-sm hover:underline text-white/70">{c.experience}</Link>
                </nav>
            </div>
            <div>
                 <h3 className="font-semibold mb-4">{c.contactTitle}</h3>
                 <p className="text-sm text-white/70 mb-4">{c.contactSubtitle}</p>
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
