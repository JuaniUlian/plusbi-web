"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { useLanguage } from '@/contexts/language-context';

const content = {
  es: {
    slogan: "Innovación GovTech para una sociedad más justa y transparente.",
    navigation: "Navegación",
    home: "Inicio",
    products: "Productos",
    experience: "Experiencia",
    legal: "Legal",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
    letsTalk: "¿Hablamos?",
    letsTalkSub: "Construyamos juntos una administración más eficiente.",
    contact: "Agenda una reunión",
    copyright: `© ${new Date().getFullYear()} PLUS BI. Todos los derechos reservados.`,
  },
  en: {
    slogan: "GovTech innovation for a more just and transparent society.",
    navigation: "Navigation",
    home: "Home",
    products: "Products",
    experience: "Experience",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    letsTalk: "Let's Talk",
    letsTalkSub: "Let's build a more efficient administration together.",
    contact: "Schedule a meeting",
    copyright: `© ${new Date().getFullYear()} PLUS BI. All rights reserved.`,
  },
};


export function Footer() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <footer className="border-t bg-primary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl font-headline">PLUS BI</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              {c.slogan}
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
             <div>
              <h4 className="font-semibold mb-4 font-headline">{c.navigation}</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">{c.home}</Link></li>
                <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">{c.products}</Link></li>
                <li><Link href="/experience" className="text-muted-foreground hover:text-primary transition-colors">{c.experience}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-headline">{c.legal}</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{c.privacy}</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{c.terms}</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold mb-4 font-headline">{c.letsTalk}</h4>
              <p className="text-muted-foreground text-sm mb-4">{c.letsTalkSub}</p>
              <Button asChild>
                <a href="mailto:contacto@plusbi.com">{c.contact}</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            {c.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
