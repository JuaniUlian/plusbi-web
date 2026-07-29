
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { LanguageSwitcher, useLanguage } from "@/contexts/language-context";

const navItemsContent = {
  es: [
    { href: "/", label: "Inicio" },
    { href: "/products", label: "Productos" },
    { href: "/experience", label: "Experiencia" },
  ],
  en: [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/experience", label: "Experience" },
  ]
}

const headerContent = {
  es: {
    contact: "Contáctanos",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  en: {
    contact: "Contact Us",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  }
}

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const navItems = navItemsContent[language];
  const c = headerContent[language];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 glass">
      <div className="container flex h-16 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-9 w-9 text-primary" />
          <span className="font-bold text-xl font-headline tracking-tight">PLUS BI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2.5 transition-colors hover:text-foreground hover:bg-secondary/70",
                pathname === item.href ? "text-foreground bg-secondary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button asChild className="hidden md:inline-flex">
            <Link href="/#contacto">{c.contact}</Link>
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="!size-5" />
                <span className="sr-only">{c.openMenu}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="p-4">
                <div className="flex justify-between items-center mb-8">
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                    <Logo className="h-9 w-9 text-primary" />
                    <span className="font-bold text-lg font-headline">PLUS BI</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="!size-5" />
                    <span className="sr-only">{c.closeMenu}</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-4 py-3 text-lg font-medium transition-colors hover:bg-secondary",
                        pathname === item.href ? "bg-secondary text-foreground" : "text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Button asChild className="w-full mt-8">
                  <Link href="/#contacto" onClick={() => setIsMobileMenuOpen(false)}>{c.contact}</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
