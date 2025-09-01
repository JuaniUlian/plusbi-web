
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Card,
} from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import Autoplay from "embla-carousel-autoplay"
import { TrendingUp, CheckCircle, Database, FileCheck, Users } from 'lucide-react';


const achievementsContent = {
    es: {
        title: "Capacidad Operativa y Resultados",
        subtitle: "Nuestras soluciones ofrecen mejoras tangibles en eficiencia, control y transparencia.",
        achievements: [
            { value: '+67%', label: 'Más errores detectados vs revisión humana', icon: <FileCheck className="size-8 text-primary" /> },
            { value: '+82%', label: 'De mejora en el control interno reportada por gobiernos', icon: <TrendingUp className="size-8 text-primary" /> },
            { value: '76%', label: 'De reducción en tiempos de validación para circuitos internos', icon: <CheckCircle className="size-8 text-primary" /> },
            { value: '+10M', label: 'De documentos gestionados en nuestras plataformas', icon: <Database className="size-8 text-primary" /> },
            { value: '+7.1M', label: 'De puntos de datos analizados en campañas políticas', icon: <Users className="size-8 text-primary" /> },
        ]
    },
    en: {
        title: "Operational Capacity & Results",
        subtitle: "Our solutions deliver tangible improvements in efficiency, control, and transparency.",
        achievements: [
            { value: '+67%', label: 'More errors detected vs human review', icon: <FileCheck className="size-8 text-primary" /> },
            { value: '+82%', label: 'Improvement in internal control reported by governments', icon: <TrendingUp className="size-8 text-primary" /> },
            { value: '76%', label: 'Reduction in validation times for internal circuits', icon: <CheckCircle className="size-8 text-primary" /> },
            { value: '+10M', label: 'Documents managed on our platforms', icon: <Database className="size-8 text-primary" /> },
            { value: '+7.1M', label: 'Data points analyzed in political campaigns', icon: <Users className="size-8 text-primary" /> },
        ]
    }
}

export function AchievementsSectionClient() {
    const { language } = useLanguage();
    const c = achievementsContent[language];
    
    return (
        <section id="achievements" className="py-16 md:py-24 bg-background" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">
                        {c.title}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        {c.subtitle}
                    </p>
                </div>
                <Carousel
                    plugins={[
                        Autoplay({
                          delay: 2000,
                          stopOnInteraction: true,
                        }),
                    ]}
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent>
                        {c.achievements.map((item, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 h-full">
                                    <Card className="flex flex-col justify-center text-center items-center h-full shadow-lg hover:shadow-xl transition-shadow duration-300 glassmorphism p-6">
                                        <div className="bg-primary/10 rounded-full p-4 mb-4">
                                            {item.icon}
                                        </div>
                                        <p className="text-4xl font-extrabold text-primary">
                                            {item.value}
                                        </p>
                                        <p className="text-base text-muted-foreground mt-2">{item.label}</p>
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
    );
}

    
