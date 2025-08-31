import Link from 'next/link';
import {
  ArrowRight,
  BrainCircuit,
  FileCheck2,
  ChevronRight,
  Database,
  Briefcase,
  Flag,
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import AiWizard from '@/components/ai-wizard';
import { HomeContent } from '@/content/home-content';
import { LanguageSwitcher, useLanguage } from '@/contexts/language-context';
import { TeamSection } from '@/components/home/team-section';
import { AchievementsSection } from '@/components/home/achievements-section';
import { HeroSection } from '@/components/home/hero-section';

const products = [
  {
    name: 'Quest',
    description: 'Access huge volumes of data to make the best decisions.',
    icon: <Database className="size-8 text-primary" />,
    link: '/products/quest',
    tag: 'Big Data'
  },
  {
    name: 'Mila',
    description: 'AI solution for governments that validates documents in minutes.',
    icon: <FileCheck2 className="size-8 text-primary" />,
    link: '/products/mila',
    tag: 'AI Agent'
  },
  {
    name: 'Vuro',
    description: 'AI super-agent for public records, coming soon.',
    icon: <BrainCircuit className="size-8 text-primary" />,
    link: '/products/vuro',
    tag: 'AI Agent'
  },
  {
    name: 'Sistema de Expediente Electrónico',
    description: 'We install, support, and train in electronic file systems.',
    icon: <Briefcase className="size-8 text-primary" />,
    link: '/products/see',
    tag: 'Digitalización'
  },
];


export default function Home() {

  return (
    <div className="flex flex-col">
      <HeroSection />

      <AchievementsSection />
      
      <section id="products" className="py-16 md:py-24 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">What We Do</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We develop advanced tools to transform strategy, communication, and implementation of actions based on information.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
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
                     <Link href={product.link}>Learn More <ChevronRight className="size-4 ml-1" /></Link>
                   </Button>
                 </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="ai-wizard" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-accent/20 text-accent-foreground">AI Core</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Find the Right Product for Your Needs
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                As an AI-Core company, we want to help you from the very first moment. Answer three simple questions and our AI assistant will recommend the PLUS BI product that best suits your needs.
              </p>
               <div className="mt-6 border-l-4 border-primary pl-4 text-left">
                 <p className="text-muted-foreground italic">"Clear, simple language to understand what you're looking for and what product might serve you best, generating a contact lead."</p>
               </div>
            </div>
            <div className='mt-8 max-w-2xl mx-auto'>
              <AiWizard />
            </div>
        </div>
      </section>

      <TeamSection/>
    </div>
  );
}
