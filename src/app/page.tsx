
'use client';
import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  FileCheck2,
  ChevronRight,
  Database,
  Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AiWizard from '@/components/ai-wizard';
import { useLanguage } from '@/contexts/language-context';
import { TeamSection } from '@/components/home/team-section';
import { AchievementsSection } from '@/components/home/achievements-section';
import { HeroSection } from '@/components/home/hero-section';
import { useEffect, useState } from 'react';

const content = {
  es: {
    productsTitle: "Nuestros Productos",
    productsSubtitle: "Desarrollamos herramientas avanzadas para transformar la estrategia, la comunicación y la implementación de acciones basadas en información.",
    products: [
      {
        name: 'Quest',
        description: 'Accede a enormes volúmenes de datos para tomar las mejores decisiones.',
        icon: <Database className="size-8 text-primary" />,
        link: '/products/quest',
        tag: 'Análisis de Datos'
      },
      {
        name: 'Mila',
        description: 'Solución con IA para gobiernos que valida documentos en minutos.',
        icon: <FileCheck2 className="size-8 text-primary" />,
        link: '/products/mila',
        tag: 'Validación Inteligente'
      },
      {
        name: 'Vuro',
        description: 'Súper-agente de IA para expedientes públicos, próximamente.',
        icon: <BrainCircuit className="size-8 text-primary" />,
        link: '/products/vuro',
        tag: 'Automatización Total'
      },
      {
        name: 'Sistema de Expediente Electrónico',
        description: 'Instalamos, damos soporte y capacitamos en sistemas de expedientes electrónicos.',
        icon: <Briefcase className="size-8 text-primary" />,
        link: '/products/see',
        tag: 'Transformación Digital'
      },
    ],
    learnMore: "Conocer más",
    aiWizardSection: {
        badge: "Núcleo de IA",
        title: "Encuentra el Producto Adecuado",
        description: "Responde una simple pregunta y nuestro asistente de IA te recomendará el producto de PLUS BI que mejor se adapte a tus necesidades.",
        quote: "\"Lenguaje claro y simple para entender qué buscas y qué producto podría servirte, generando un lead de contacto.\""
    }
  },
  en: {
    productsTitle: "Our Products",
    productsSubtitle: "We develop advanced tools to transform strategy, communication, and implementation of actions based on information.",
    products: [
      {
        name: 'Quest',
        description: 'Access huge volumes of data to make the best decisions.',
        icon: <Database className="size-8 text-primary" />,
        link: '/products/quest',
        tag: 'Data Analysis'
      },
      {
        name: 'Mila',
        description: 'AI solution for governments that validates documents in minutes.',
        icon: <FileCheck2 className="size-8 text-primary" />,
        link: '/products/mila',
        tag: 'Intelligent Validation'
      },
      {
        name: 'Vuro',
        description: 'AI super-agent for public records, coming soon.',
        icon: <BrainCircuit className="size-8 text-primary" />,
        link: '/products/vuro',
        tag: 'Total Automation'
      },
      {
        name: 'Electronic File System',
        description: 'We install, support, and train in electronic file systems.',
        icon: <Briefcase className="size-8 text-primary" />,
        link: '/products/see',
        tag: 'Digital Transformation'
      },
    ],
    learnMore: "Learn More",
    aiWizardSection: {
        badge: "AI Core",
        title: "Find the Right Product",
        description: "Answer a simple question and our AI assistant will recommend the PLUS BI product that best suits your needs.",
        quote: "\"Clear, simple language to understand what you're looking for and what product might serve you best, generating a contact lead.\""
    }
  }
};


export default function Home() {
  const { language } = useLanguage();
  const c = content[language];
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])


  return (
    <div className="flex flex-col">
      <HeroSection />

      <AchievementsSection />
      
      <section id="products-wizard" className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Products Section (Left) */}
            <div className="lg:col-span-8">
              <div className="text-center lg:text-left mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">{c.productsTitle}</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  {c.productsSubtitle}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {c.products.map((product) => (
                  <Card key={product.name} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 glassmorphism flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div className="mx-auto bg-primary/10 rounded-full size-16 flex items-center justify-center mb-4">
                          {product.icon}
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

            {/* AI Wizard Section (Right) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="text-center mb-6">
                  <Badge variant="secondary" className="mb-4 bg-accent/20 text-accent-foreground">{c.aiWizardSection.badge}</Badge>
                  <h2 className="text-2xl font-bold font-headline">
                    {c.aiWizardSection.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {c.aiWizardSection.description}
                  </p>
                </div>
                <div>
                  {isClient && <AiWizard />}
                </div>
                <div className="mt-4 border-l-4 border-primary/40 pl-4 text-left">
                     <p className="text-muted-foreground italic text-xs">{c.aiWizardSection.quote}</p>
                </div>
            </div>

          </div>
        </div>
      </section>

      <TeamSection/>
    </div>
  );
}
