"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Button } from '@/components/ui/button';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}
    >
      <span className={language === 'es' ? 'text-foreground' : 'text-muted-foreground/60'}>ES</span>
      <span aria-hidden className="text-muted-foreground/40">·</span>
      <span className={language === 'en' ? 'text-foreground' : 'text-muted-foreground/60'}>EN</span>
    </Button>
  );
};
