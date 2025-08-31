import Image from 'next/image';
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

const products = [
  {
    name: 'Quest',
    description: 'Access huge volumes of data to make the best decisions.',
    icon: <Database className="size-8 text-primary" />,
    link: '/products#quest',
  },
  {
    name: 'Mila',
    description: 'AI solution for governments that validates documents in minutes.',
    icon: <FileCheck2 className="size-8 text-primary" />,
    link: '/products#mila',
  },
  {
    name: 'Vuro',
    description: 'AI super-agent for public records, coming soon.',
    icon: <BrainCircuit className="size-8 text-primary" />,
    link: '/products#vuro',
  },
  {
    name: 'Sistema de Expediente Electrónico',
    description: 'We install, support, and train in electronic file systems.',
    icon: <Briefcase className="size-8 text-primary" />,
    link: '/products#sudocu',
  },
];

const achievements = [
  {
    value: '+67%',
    label: 'Errors detected vs human review',
    product: 'Mila',
  },
  {
    value: '3 min vs 80 days',
    label: 'Review time: MILA vs traditional circuit',
    product: 'Mila',
  },
  {
    value: '+82%',
    label: 'Governments report improvements in internal control',
    product: 'Mila',
  },
  {
    value: '76%',
    label: 'Reduction in validation times for internal circuits',
    product: 'Mila',
  },
  {
    value: '+10 million',
    label: 'Documents managed',
    product: 'SUDOCU',
  },
  {
    value: '7.1M',
    label: 'Data points on presidential candidates in Argentina',
    product: 'Quest',
  },
];

const team = [
  {
    name: 'Cristian Ulian',
    title: 'Specialist in Public Policies and Local Development',
    img: 'https://picsum.photos/100/100?random=1',
  },
  {
    name: 'Juan Ignacio Ulian',
    title: 'Bachelor in Political Science',
    img: 'https://picsum.photos/100/100?random=2',
  },
  {
    name: 'Alejandro Gonzalez Carril',
    title: 'Graduate in International Relations and Political Sciences',
    img: 'https://picsum.photos/100/100?random=3',
  },
  {
    name: 'Analía Barberio',
    title: 'Information Systems and Digital Transformation Specialist',
    img: 'https://picsum.photos/100/100?random=4',
  },
   {
    name: 'Pablo Martinez',
    title: 'Fullstack Developer',
    img: 'https://picsum.photos/100/100?random=5',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section
        id="hero"
        className="relative py-20 md:py-32 bg-primary/10"
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">GovTech Innovators</Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-dark font-headline tracking-tight">
              PLUS BI: Technology for a Fairer Society
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We integrate technological innovation with a deeply human vision to build a more transparent and participatory public administration.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="#products">
                  Our Products <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/experience">
                  Our Experience
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="achievements" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">
              Operational Capacity & Real Results
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our solutions deliver tangible improvements in efficiency, control, and transparency.
            </p>
          </div>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {achievements.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="flex flex-col justify-between h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="text-4xl font-extrabold text-primary">
                          {item.value}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-base text-muted-foreground">{item.label}</p>
                      </CardContent>
                      <CardFooter>
                         <Badge variant="outline">{item.product}</Badge>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>
      
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
              <Card key={product.name} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 rounded-full size-16 flex items-center justify-center mb-4">
                    {product.icon}
                  </div>
                  <CardTitle>{product.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{product.description}</p>
                </CardContent>
                 <CardFooter className="justify-center">
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <Badge variant="secondary" className="mb-4 bg-accent/20 text-accent-foreground">AI Core</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">
                Find the Right Product for Your Needs
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                As an AI-Core company, we want to help you from the very first moment. Answer three simple questions and our AI assistant will recommend the PLUS BI product that best suits your needs.
              </p>
               <div className="mt-6 border-l-4 border-primary pl-4">
                 <p className="text-muted-foreground italic">"Clear, simple language to understand what you're looking for and what product might serve you best, generating a contact lead."</p>
               </div>
            </div>
            <AiWizard />
          </div>
        </div>
      </section>

      <section id="team" className="py-16 md:py-24 bg-primary/10">
         <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Meet Our Team</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our team combines technological innovation with deep human insight, creating strategic and efficient solutions for complex problems.
            </p>
          </div>
           <div className="flex flex-wrap justify-center gap-8">
             {team.map((member) => (
              <div key={member.name} className="text-center">
                <Image
                  src={member.img}
                  alt={`Photo of ${member.name}`}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 border-4 border-background shadow-lg"
                  data-ai-hint="profile picture"
                />
                <h4 className="font-bold text-lg">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.title}</p>
              </div>
            ))}
           </div>
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link href="/experience#team">
                  Learn More About Our Experts <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
