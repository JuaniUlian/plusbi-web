
'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  Mail,
  Zap,
  Eye,
  AlertCircle,
  Clock,
  ShieldCheck,
  Scale,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from '@/lib/utils';

const content = {
  es: {
    badge: "Validación de Documentos con IA",
    title: "Mila",
    subtitle: "La herramienta de IA para gobiernos que acelera procesos, previene errores y asegura el cumplimiento normativo. Mila valida decretos, licitaciones y otros documentos en minutos.",
    interactiveTitle: "Del Problema a la Solución",
    interactiveSubtitle: "Explora cómo Mila transforma los desafíos de la gestión pública.",
    challenges: [
        { id: 'errors', challenge: "Errores Manuales Costosos", solution: "Análisis Inteligente y Preciso", description: "Mila analiza los documentos punto por punto, detectando inconsistencias y riesgos que el ojo humano podría pasar por alto, evitando costosos errores.", challengeIcon: <AlertCircle className="size-8 text-destructive" />, solutionIcon: <ShieldCheck className="text-green-500 size-8" /> },
        { id: 'delays', challenge: "Procesos de Revisión Interminables", solution: "Validación en Minutos, No en Días", description: "Lo que antes tomaba semanas de idas y vueltas entre áreas, Mila lo resuelve en minutos. Acelera la aprobación de decretos, licitaciones y más.", challengeIcon: <Clock className="size-8 text-destructive" />, solutionIcon: <ShieldCheck className="text-green-500 size-8" /> },
        { id: 'compliance', challenge: "Incertidumbre Normativa", solution: "Cumplimiento Normativo Garantizado", description: "Mila vincula cada observación a la norma o regulación específica, ofreciendo un puntaje legal y asegurando que cada documento esté 100% en regla.", challengeIcon: <Scale className="size-8 text-destructive" />, solutionIcon: <ShieldCheck className="text-green-500 size-8" /> },
        { id: 'traceability', challenge: "Falta de Trazabilidad y Control", solution: "Control de Versiones y Edición Centralizada", description: "Edita y corrige directamente en la plataforma. Mila gestiona el historial de cambios y genera una versión final corregida, lista para compartir.", challengeIcon: <TrendingUp className="size-8 text-destructive" />, solutionIcon: <ShieldCheck className="text-green-500 size-8" /> },
    ],
    resultsTitle: "Resultados Reales",
    results: [
      { value: '+67%', label: 'Errores detectados vs revisión humana' },
      { value: '3 min vs 80 días', label: 'Tiempo de revisión MILA vs circuito tradicional' },
      { value: '+82%', label: 'Gobiernos reportan mejoras en control interno' },
      { value: '76%', label: 'Reducción de tiempos en validación' },
    ],
    diffTitle: "¿En qué se diferencia de ChatGPT y otras IA?",
    diffSubtitle: "MILA no es una IA genérica. Es una herramienta especializada diseñada para los desafíos legales y administrativos únicos del sector público.",
    diffPoints: [
      { text: "<strong>Entrenamiento especializado:</strong> Entrenada específicamente con tus regulaciones locales y criterios de auditoría interna." },
      { text: "<strong>Entiende documentos públicos:</strong> Identifica contratos, decretos y resoluciones con lógica jurídico-administrativa." },
      { text: "<strong>Detecta riesgos, no solo errores:</strong> Clasifica las observaciones por riesgo legal, operativo o de control con un sistema de semáforo." },
      { text: "<strong>Diseñada para gobiernos:</strong> Cada función está diseñada para secretarías legales, equipos técnicos y áreas administrativas del estado." },
    ],
    ctaTitle: "¿Listo para optimizar tus procesos?",
    ctaSubtitle: "Descubre cómo Mila puede reducir errores, acelerar validaciones y fortalecer el control interno en tu organización.",
    ctaButton: "Solicita una demo de Mila",
  },
  en: {
    badge: "AI Document Validation",
    title: "Mila",
    subtitle: "The AI tool for governments that accelerates processes, prevents errors, and ensures regulatory compliance. Mila validates decrees, tenders, and other documents in minutes.",
    interactiveTitle: "From Problem to Solution",
    interactiveSubtitle: "Explore how Mila transforms public management challenges.",
     challenges: [
        { id: 'errors', challenge: "Costly Manual Errors", solution: "Intelligent and Accurate Analysis", description: "Mila analyzes documents point by point, detecting inconsistencies and risks that the human eye might miss, avoiding costly mistakes.", challengeIcon: <AlertCircle className="size-8 text-destructive" />, solutionIcon: <ShieldCheck className="text-green-500 size-8" /> },
        { id: 'delays', challenge: "Endless Review Processes", solution: "Validation in Minutes, Not Days", description: "What used to take weeks of back-and-forth between departments, Mila resolves in minutes. It speeds up the approval of decrees, tenders, and more.", challengeIcon: <Clock className="size-8 text-destructive" />, solutionIcon: <ShieldCheck className="text-green-500 size-8" /> },
        { id: 'compliance', challenge: "Regulatory Uncertainty", solution: "Guaranteed Regulatory Compliance", description: "Mila links each observation to the specific norm or regulation, providing a legal score and ensuring every document is 100% compliant.", challengeIcon: <Scale className="size-8 text-destructive" />, solutionIcon: <ShieldCheck className="text-green-500 size-8" /> },
        { id: 'traceability', challenge: "Lack of Traceability and Control", solution: "Version Control and Centralized Editing", description: "Edit and correct directly on the platform. Mila manages the change history and generates a final, corrected version, ready to share.", challengeIcon: <TrendingUp className="size-8 text-destructive" />, solutionIcon: <ShieldCheck className="text-green-500 size-8" /> },
    ],
    resultsTitle: "Real Results",
    results: [
      { value: '+67%', label: 'More errors detected vs human review' },
      { value: '3 min vs 80 days', label: 'MILA review time vs traditional circuit' },
      { value: '+82%', label: 'Governments report improvements in internal control' },
      { value: '76%', label: 'Reduction in validation times' },
    ],
    diffTitle: "How is it different from ChatGPT and other AIs?",
    diffSubtitle: "MILA is not a generic AI. It's a specialized tool designed for the public sector's unique legal and administrative challenges.",
    diffPoints: [
      { text: "<strong>Specialized Training:</strong> Trained specifically with your local regulations and internal audit criteria." },
      { text: "<strong>Understands Public Documents:</strong> Identifies contracts, decrees, and resolutions with legal-administrative logic." },
      { text: "<strong>Detects Risks, Not Just Errors:</strong> Classifies observations by legal, operational, or control risk with a traffic-light system." },
      { text: "<strong>Designed for Governments:</strong> Every feature is designed for legal secretariats, technical teams, and administrative areas of the state." },
    ],
    ctaTitle: "Ready to optimize your processes?",
    ctaSubtitle: "Discover how Mila can reduce errors, speed up validations, and strengthen internal control in your organization.",
    ctaButton: "Request a Mila demo",
  }
}

export default function MilaPage() {
  const { language } = useLanguage();
  const c = content[language];
  
  const generateMailto = () => {
    const subject = `Solicitud de demo de ${c.title}`;
    const body = `Estimados,\n\nMe gustaría coordinar una reunión para un demo de ${c.title}.\n\nMe interesa porque...\n\nSaludos.`;
    return `mailto:contacto@plusbi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <header className="py-20 bg-primary/10 text-center" style={{backgroundImage: "url('/backgrounds/titulos.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <Image src="/logo/mila.png" alt="Mila Logo" width={80} height={80} className="mb-4" />
          </div>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold font-headline text-white">{c.title}</h1>
          <Badge className="mt-4">{c.badge}</Badge>
          <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto">
            {c.subtitle}
          </p>
        </div>
      </header>
      <main>
        <section className="py-16 md:py-24 bg-background" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline">{c.interactiveTitle}</h2>
                    <p className="mt-2 text-muted-foreground">{c.interactiveSubtitle}</p>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-2xl mx-auto"
                >
                    <CarouselContent>
                        {c.challenges.map((item) => (
                            <CarouselItem key={item.id}>
                                <Card className="shadow-xl glassmorphism overflow-hidden m-1">
                                    <div className="p-6 text-center">
                                        <div className="inline-flex items-center gap-3">
                                           {item.challengeIcon}
                                           <h3 className="font-semibold text-lg">{item.challenge}</h3>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-primary/10 text-center">
                                        <div className="flex items-center justify-center gap-3 text-xl font-bold text-primary mb-2">
                                            {item.solutionIcon}
                                            <h4>{item.solution}</h4>
                                        </div>
                                        <p className="text-muted-foreground text-sm">{item.description}</p>
                                    </div>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-center gap-2 mt-4">
                        <CarouselPrevious />
                        <CarouselNext />
                    </div>
                </Carousel>
            
            <div className="text-center my-16">
                <h3 className="text-3xl font-bold font-headline mb-8">{c.resultsTitle}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {c.results.map(item => (
                    <Card key={item.label} className="p-4 glassmorphism">
                    <p className="text-4xl font-extrabold text-primary">{item.value}</p>
                    <p className="text-sm text-muted-foreground mt-2">{item.label}</p>
                    </Card>
                ))}
                </div>
            </div>
            <Card className="bg-primary/5 p-8 rounded-lg shadow-lg glassmorphism">
                <div>
                <h3 className="text-2xl font-bold font-headline">{c.diffTitle}</h3>
                <p className="mt-4 text-muted-foreground">{c.diffSubtitle}</p>
                <ul className="mt-6 space-y-4">
                    {c.diffPoints.map((point, index) => (
                    <li key={index} className="flex gap-3"><CheckCircle2 className="text-green-500 size-5 mt-0.5 shrink-0" /><span dangerouslySetInnerHTML={{ __html: point.text }} /></li>
                    ))}
                </ul>
                </div>
            </Card>
            </div>
        </section>
         <section className="py-16 md:py-24 bg-primary/10 text-center">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold font-headline">{c.ctaTitle}</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">{c.ctaSubtitle}</p>
                <Button asChild size="lg" className="mt-8">
                    <a href={generateMailto()}>{c.ctaButton} <Mail className="ml-2"/></a>
                </Button>
            </div>
        </section>
      </main>
    </>
  );
}
