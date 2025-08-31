
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';


const teamContent = {
    es: {
        title: "Conoce a Nuestro Equipo",
        subtitle: "Nuestro equipo combina innovación tecnológica con una profunda visión humana, creando soluciones estratégicas y eficientes para problemas complejos.",
        buttonText: "Conoce más sobre nuestros expertos",
        team: [
            { name: 'Cristian Ulian', title: 'Especialista en Políticas Públicas y Desarrollo Local', avatar: '/team/cristian.jpeg' },
            { name: 'Juan Ignacio Ulian', title: 'Licenciado en Ciencia Política', avatar: '/team/juan.jpg' },
            { name: 'Alejandro Gonzalez Carril', title: 'Licenciado en Relaciones Internacionales y Ciencias Políticas', avatar: '/team/alejandro.jpeg' },
            { name: 'Analía Barberio', title: 'Especialista en Sistemas de Información y Transformación Digital', avatar: '/team/analia.jpg' },
            { name: 'Pablo Martinez', title: 'Desarrollador Fullstack', avatar: '/team/pablo.jpg' },
        ]
    },
    en: {
        title: "Meet Our Team",
        subtitle: "Our team combines technological innovation with deep human insight, creating strategic and efficient solutions for complex problems.",
        buttonText: "Learn More About Our Experts",
        team: [
            { name: 'Cristian Ulian', title: 'Specialist in Public Policies and Local Development', avatar: '/team/cristian.jpeg' },
            { name: 'Juan Ignacio Ulian', title: 'Bachelor in Political Science', avatar: '/team/juan.jpg' },
            { name: 'Alejandro Gonzalez Carril', title: 'Graduate in International Relations and Political Sciences', avatar: '/team/alejandro.jpeg' },
            { name: 'Analía Barberio', title: 'Information Systems and Digital Transformation Specialist', avatar: '/team/analia.jpg' },
            { name: 'Pablo Martinez', title: 'Fullstack Developer', avatar: '/team/pablo.jpg' },
        ]
    }
}

export function TeamSection() {
    const { language } = useLanguage();
    const c = teamContent[language];

    return (
        <section id="team" className="py-16 md:py-24 bg-primary/10" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">{c.title}</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        {c.subtitle}
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    {c.team.map((member, index) => (
                        <div key={member.name} className="text-center">
                            <Image
                                src={member.avatar}
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
                            {c.buttonText} <ArrowRight className="ml-2 size-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

    