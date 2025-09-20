
'use client';
import Link from 'next/link';
import {
  ChevronRight,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AiWizard from '@/components/ai-wizard';
import { useLanguage } from '@/contexts/language-context';
import { AchievementsSection } from '@/app/home/achievements-section';
import { HeroSection } from '@/components/home/hero-section';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const content = {
  es: {
    productsTitle: "Nuestros Productos",
    productsSubtitle: "¿No estás seguro de qué producto necesitas? Somos una empresa AI Core, y te la dejamos a disposición para ayudarte. Describe tu desafío o problema y nuestro asistente te recomendará la herramienta de PLUS BI perfecta para resolverlo.",
    products: [
      {
        name: 'Quest',
        description: 'Accede a enormes volúmenes de datos para tomar las mejores decisiones.',
        icon: '/logo/quest.png',
        link: '/products/quest',
        tag: 'Análisis de Datos'
      },
      {
        name: 'Mila',
        description: 'Solución con IA para gobiernos que valida documentos en minutos.',
        icon: '/logo/mila.png',
        link: '/products/mila',
        tag: 'Validación Inteligente'
      },
      {
        name: 'Vuro',
        description: 'Súper-agente de IA para expedientes públicos, próximamente.',
        icon: '/logo/plusbi.png',
        link: '/products/vuro',
tag: 'Automatización Total'
      },
      {
        name: 'Sistema de Expediente Electrónico',
        description: 'Instalamos, damos soporte y capacitamos en sistemas de expedientes electrónicos.',
        icon: '/logo/plusbi.png',
        link: '/products/see',
        tag: 'Transformación Digital'
      },
    ],
    learnMore: "Conocer más",
    contact: "Contactar",
    aiWizardSection: {
        badge: "Núcleo de IA",
        title: "Encuentra el Producto Adecuado",
        description: "Responde una simple pregunta y nuestro asistente de IA te recomendará el producto de PLUS BI que mejor se adapte a tus necesidades.",
        quote: "\"Lenguaje claro y simple para entender qué buscas y qué producto podría servirte, generando un lead de contacto.\""
    },
    ctaTitle: "¿Listo para transformar tu organización?",
    ctaSubtitle: "Hablemos de cómo nuestras soluciones pueden ayudar a su gobierno a alcanzar tus objetivos de eficiencia, transparencia y modernización.",
    ctaButton: "Agenda una reunión",
  },
  en: {
    productsTitle: "Our Products",
    productsSubtitle: "Not sure which product you need? We are an AI Core company, and we make it available to help you. Describe your challenge or problem and our assistant will recommend the perfect PLUS BI tool to solve it.",
    products: [
      {
        name: 'Quest',
        description: 'Access huge volumes of data to make the best decisions.',
        icon: '/logo/quest.png',
        link: '/products/quest',
        tag: 'Data Analysis'
      },
      {
        name: 'Mila',
        description: 'AI solution for governments that validates documents in minutes.',
        icon: '/logo/mila.png',
        link: '/products/mila',
        tag: 'Intelligent Validation'
      },
      {
        name: 'Vuro',
        description: 'AI super-agent for public records, coming soon.',
        icon: '/logo/plusbi.png',
        link: '/products/vuro',
        tag: 'Total Automation'
      },
      {
        name: 'Electronic File System',
        description: 'We install, support, and train in electronic file systems.',
        icon: '/logo/plusbi.png',
        link: '/products/see',
        tag: 'Digital Transformation'
      },
    ],
    learnMore: "Learn More",
    contact: "Contact",
    aiWizardSection: {
        badge: "AI Core",
        title: "Find the Right Product",
        description: "Answer a simple question and our AI assistant will recommend the PLUS BI product that best suits your needs.",
        quote: "\"Clear, simple language to understand what you're looking for and what product might serve you best, generating a contact lead.\""
    },
    ctaTitle: "Ready to transform your organization?",
    ctaSubtitle: "Let's talk about how our GovTech solutions can help you achieve your goals of efficiency, transparency, and modernization.",
    ctaButton: "Schedule a meeting",
  }
};


export default function Home() {
  const { language } = useLanguage();
  const c = content[language];

  const generateMailto = () => {
    const subject = "Solicitud de reunión general";
    const body = "Hola, equipo de PLUS BI.\n\nMe gustaría agendar una reunión para discutir cómo sus soluciones pueden ayudar a mi organización.\n\nSaludos.";
    return `mailto:juan.ulian@pluscompol.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex flex-col">
      <HeroSection />

      <AchievementsSection />
      
      <section id="products-wizard" className="py-16 md:py-24 bg-primary/5" style={{backgroundImage: "url('/backgrounds/secciones b.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-white">{c.productsTitle}</h2>
            <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
              {c.productsSubtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto mb-12">
              <div>
                <AiWizard />
              </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {c.products.map((product) => (
              <Card key={product.name} className="text-center glassmorphism flex flex-col card-hud-effect">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="mx-auto bg-primary/10 rounded-full p-2 flex items-center justify-center mb-4">
                      <Image src={product.icon} alt={`${product.name} logo`} width={48} height={48} />
                    </div>
                  </div>
                  <CardTitle>{product.name}</CardTitle>
                   <Badge variant="secondary" className="w-fit mx-auto">{product.tag}</Badge>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{product.description}</p>
                </CardContent>
                 <CardFooter className="justify-center mt-auto">
                    <Button asChild variant="link">
                        <Link href={product.link}>{c.learnMore} <ChevronRight className="size-4 ml-1" /></Link>
                    </Button>
                 </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background text-center" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
          <div className="container mx-auto px-4">
               <h2 className="text-3xl font-bold font-headline">{c.ctaTitle}</h2>
               <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">{c.ctaSubtitle}</p>
               <Button asChild size="lg" className="mt-8">
                <a href={generateMailto()}>{c.ctaButton}</a>
              </Button>
          </div>
      </section>
    </div>
  );
}
