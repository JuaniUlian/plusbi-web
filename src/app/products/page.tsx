
'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';

const content = {
  es: {
    title: "Nuestros Productos",
    subtitle: "Soluciones avanzadas para revolucionar la gestión del sector público y privado.",
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
        link: 'products/mila',
        tag: 'Validación con IA'
      },
      {
        name: 'Vuro',
        description: 'Súper-agente de IA para expedientes públicos, próximamente.',
        icon: '/logo/plusbi.png',
        link: '/products/vuro',
        tag: 'Automatización con IA'
      },
      {
        name: 'Sistema de Expediente Electrónico',
        description: 'Instalamos, damos soporte y capacitamos en sistemas de expedientes electrónicos.',
        icon: '/logo/plusbi.png',
        link: '/products/see',
        tag: 'Transformación Digital'
      },
    ],
    learnMore: "Conocer más"
  },
  en: {
    title: "Our Products",
    subtitle: "Advanced solutions to revolutionize public and private sector management.",
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
        tag: 'AI Validation'
      },
      {
        name: 'Vuro',
        description: 'AI super-agent for public records, coming soon.',
        icon: '/logo/plusbi.png',
        link: '/products/vuro',
        tag: 'AI Automation'
      },
      {
        name: 'Electronic File System',
        description: 'We install, support, and train in electronic file systems.',
        icon: '/logo/plusbi.png',
        link: '/products/see',
        tag: 'Digital Transformation'
      },
    ],
    learnMore: "Learn More"
  }
}

export default function ProductsPage() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <>
      <header className="py-20 bg-primary/10" style={{backgroundImage: "url('/backgrounds/titulos.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-headline">
            {c.title}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {c.subtitle}
          </p>
        </div>
      </header>
      <main className="py-16 md:py-24" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {c.products.map((product) => (
              <Card key={product.name} className="flex flex-col text-center shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 glassmorphism">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 rounded-full p-3 flex items-center justify-center mb-4">
                    <Image src={product.icon} alt={`${product.name} logo`} width={64} height={64}/>
                  </div>
                  <div>
                    <CardTitle className="text-2xl flex flex-col items-center gap-2">{product.name} <Badge variant="secondary">{product.tag}</Badge></CardTitle>
                     <p className="text-muted-foreground mt-3 max-w-xs mx-auto">{product.description}</p>
                  </div>
                </CardHeader>
                 <CardFooter className="mt-auto justify-center">
                   <Button asChild variant="link">
                     <Link href={product.link}>{c.learnMore} <ChevronRight className="size-4 ml-1" /></Link>
                   </Button>
                 </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
