import Link from 'next/link';
import {
  Database,
  FileCheck2,
  BrainCircuit,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const products = [
  {
    name: 'Quest',
    description: 'Access huge volumes of data to make the best decisions.',
    icon: <Database className="size-10 text-primary" />,
    link: '/products/quest',
    tag: 'Análisis de Datos'
  },
  {
    name: 'Mila',
    description: 'AI solution for governments that validates documents in minutes.',
    icon: <FileCheck2 className="size-10 text-primary" />,
    link: '/products/mila',
    tag: 'Validación con IA'
  },
  {
    name: 'Vuro',
    description: 'AI super-agent for public records, coming soon.',
    icon: <BrainCircuit className="size-10 text-primary" />,
    link: '/products/vuro',
    tag: 'Automatización con IA'
  },
  {
    name: 'Sistema de Expediente Electrónico',
    description: 'We install, support, and train in electronic file systems.',
    icon: <Briefcase className="size-10 text-primary" />,
    link: '/products/see',
    tag: 'Transformación Digital'
  },
];

export default function ProductsPage() {
  return (
    <>
      <header className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark font-headline">
            Our Products
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced solutions to revolutionize public and private sector management.
          </p>
        </div>
      </header>
      <main className="py-16 md:py-24">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <Card key={product.name} className="flex flex-col text-left shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 glassmorphism">
                <CardHeader className="flex-row items-start gap-6">
                  <div className="bg-primary/10 rounded-lg p-4 flex items-center justify-center">
                    {product.icon}
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-4">{product.name} <Badge variant="secondary">{product.tag}</Badge></CardTitle>
                     <p className="text-muted-foreground mt-2">{product.description}</p>
                  </div>
                </CardHeader>
                 <CardFooter className="mt-auto justify-end">
                   <Button asChild variant="link">
                     <Link href={product.link}>Learn More <ChevronRight className="size-4 ml-1" /></Link>
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
