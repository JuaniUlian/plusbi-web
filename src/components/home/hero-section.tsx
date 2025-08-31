"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";

const content = {
    es: {
        badge: "Innovadores GovTech",
        title: "PLUS BI: Tecnología para una Sociedad más Justa",
        subtitle: "Integramos la innovación tecnológica con una visión profundamente humana para construir una administración pública más transparente y participativa.",
        productsButton: "Nuestros Productos",
        experienceButton: "Nuestra Experiencia",
    },
    en: {
        badge: "GovTech Innovators",
        title: "PLUS BI: Technology for a Fairer Society",
        subtitle: "We integrate technological innovation with a deeply human vision to build a more transparent and participatory public administration.",
        productsButton: "Our Products",
        experienceButton: "Our Experience",
    }
}

export function HeroSection() {
    const { language } = useLanguage();
    const c = content[language];

    return (
        <section
            id="hero"
            className="relative py-20 md:py-32 bg-primary/10"
            style={{backgroundImage: "url('/backgrounds/titulos.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}
        >
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <Badge variant="secondary" className="mb-4">{c.badge}</Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white font-headline tracking-tight">
                        {c.title}
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                        {c.subtitle}
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Button asChild size="lg">
                            <Link href="#products-wizard">
                                {c.productsButton} <ArrowRight className="ml-2 size-5" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/experience">
                                {c.experienceButton}
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
