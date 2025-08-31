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
  CardContent,
} from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';
import Autoplay from "embla-carousel-autoplay"


const achievementsContent = {
    es: {
        title: "Capacidad Operativa y Resultados Reales",
        subtitle: "Nuestras soluciones ofrecen mejoras tangibles en eficiencia, control y transparencia.",
        achievements: [
            { value: '+67%', label: 'Más errores detectados vs revisión humana' },
            { value: '-99%', label: 'Reducción en tiempos de revisión de documentos' },
            { value: '+82%', label: 'De mejora en el control interno reportada por gobiernos' },
            { value: '76%', label: 'De reducción en tiempos de validación para circuitos internos' },
            { value: '+10M', label: 'De documentos gestionados en nuestras plataformas' },
            { value: '+7.1M', label: 'De puntos de datos analizados en campañas políticas' },
        ]
    },
    en: {
        title: "Operational Capacity & Real Results",
        subtitle: "Our solutions deliver tangible improvements in efficiency, control, and transparency.",
        achievements: [
            { value: '+67%', label: 'More errors detected vs human review' },
            { value: '-99%', label: 'Reduction in document review times' },
            { value: '+82%', label: 'Improvement in internal control reported by governments' },
            { value: '76%', label: 'Reduction in validation times for internal circuits' },
            { value: '+10M', label: 'Documents managed on our platforms' },
            { value: '+7.1M', label: 'Data points analyzed in political campaigns' },
        ]
    }
}

export function AchievementsSection() {
    const { language } = useLanguage();
    const c = achievementsContent[language];
    
    return (
        <section id="achievements" className="py-16 md:py-24 bg-background">
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
                                        <p className="text-5xl font-extrabold text-primary">
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
