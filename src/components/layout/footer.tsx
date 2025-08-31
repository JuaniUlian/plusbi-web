
"use client";

import { useLanguage } from '@/contexts/language-context';

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="border-t bg-primary/5 text-white" style={{backgroundImage: "url('/backgrounds/titulos.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="container mx-auto px-4 py-12 bg-black/50 rounded-lg">
        {/* Content removed to only show the background */}
      </div>
    </footer>
  );
}
