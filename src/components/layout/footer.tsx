
"use client";

import Link from 'next/link';
import { Logo } from './logo';
import { useLanguage } from '@/contexts/language-context';
import { PRODUCTS, CONTACT_EMAIL } from '@/lib/products';

const footerContent = {
  es: {
    slogan: "Tecnología para un mejor Gobierno.",
    productsTitle: "Productos",
    companyTitle: "Empresa",
    home: "Inicio",
    experience: "Experiencia",
    contactTitle: "Contacto",
    copyright: "© 2026 PLUS BI. Todos los derechos reservados."
  },
  en: {
    slogan: "Technology for better Government.",
    productsTitle: "Products",
    companyTitle: "Company",
    home: "Home",
    experience: "Experience",
    contactTitle: "Contact",
    copyright: "© 2026 PLUS BI. All rights reserved."
  }
}

export function Footer() {
  const { language } = useLanguage();
  const c = footerContent[language];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <Logo className="h-9 w-9" />
              <span className="font-bold text-lg font-headline">PLUS BI</span>
            </Link>
            <p className="text-sm text-primary-foreground/70 max-w-xs">{c.slogan}</p>
          </div>

          <nav aria-label={c.productsTitle}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground/50 mb-4">{c.productsTitle}</h3>
            <ul className="space-y-3 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <Link href={p.href} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    {p.name[language]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-primary-foreground/50 mb-4">{c.contactTitle}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors break-all">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <Link href="/experience" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  {c.experience}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/15 mt-12 pt-8 text-sm text-primary-foreground/50">
          <p>{c.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
