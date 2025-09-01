
'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  FileEdit,
  BarChart,
  Link2,
  Share2,
  Award,
  Mail,
  Zap,
  Eye,
  AlertCircle,
  Clock,
  ShieldCheck,
  Scale,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const content = {
  es: {
    badge: "Validación de Documentos con IA",
    title: "Mila",
    subtitle: "La herramienta de IA para gobiernos que acelera procesos, previene errores y asegura el cumplimiento normativo. Mila valida decretos, licitaciones y otros documentos en minutos.",
    interactiveTitle: "Del Problema a la Solución",
    interactiveSubtitle: "Haz clic en un desafío para descubrir cómo Mila lo resuelve.",
    challenges: [
        { id: 'errors', challenge: "Errores Manuales Costosos", solution: "Análisis Inteligente y Preciso", description: "Mila analiza los documentos punto por punto, detectando inconsistencias y riesgos que el ojo humano podría pasar por alto, evitando costosos errores.", solutionIcon: <Zap className="text-green-500 size-6" /> },
        { id: 'delays', challenge: "Procesos de Revisión Interminables", solution: "Validación en Minutos, No en Días", description: "Lo que antes tomaba semanas de idas y vueltas entre áreas, Mila lo resuelve en minutos. Acelera la aprobación de decretos, licitaciones y más.", solutionIcon: <Zap className="text-green-500 size-6" /> },
        { id: 'compliance', challenge: "Incertidumbre Normativa", solution: "Cumplimiento Normativo Garantizado", description: "Mila vincula cada observación a la norma o regulación específica, ofreciendo un puntaje legal y asegurando que cada documento esté 100% en regla.", solutionIcon: <Zap className="text-green-500 size-6" /> },
        { id: 'traceability', challenge: "Falta de Trazabilidad", solution: "Control de Versiones y Edición Centralizada", description: "Edita y corrige directamente en la plataforma. Mila gestiona el historial de cambios y genera una versión final corregida, lista para compartir.", solutionIcon: <Zap className="text-green-500 size-6" /> },
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
    interactiveSubtitle: "Click on a challenge to discover how Mila solves it.",
     challenges: [
        { id: 'errors', challenge: "Costly Manual Errors", solution: "Intelligent and Accurate Analysis", description: "Mila analyzes documents point by point, detecting inconsistencies and risks that the human eye might miss, avoiding costly mistakes.", solutionIcon: <Zap className="text-green-500 size-6" /> },
        { id: 'delays', challenge: "Endless Review Processes", solution: "Validation in Minutes, Not Days", description: "What used to take weeks of back-and-forth between departments, Mila resolves in minutes. It speeds up the approval of decrees, tenders, and more.", solutionIcon: <Zap className="text-green-500 size-6" /> },
        { id: 'compliance', challenge: "Regulatory Uncertainty", solution: "Guaranteed Regulatory Compliance", description: "Mila links each observation to the specific norm or regulation, providing a legal score and ensuring every document is 100% compliant.", solutionIcon: <Zap className="text-green-500 size-6" /> },
        { id: 'traceability', challenge: "Lack of Traceability", solution: "Version Control and Centralized Editing", description: "Edit and correct directly on the platform. Mila manages the change history and generates a final, corrected version, ready to share.", solutionIcon: <Zap className="text-green-500 size-6" /> },
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
  const [activeChallenge, setActiveChallenge] = useState(c.challenges[0].id);

  const generateMailto = () => {
    const subject = `Solicitud de demo de ${c.title}`;
    const body = `Estimados,\n\nMe gustaría coordinar una reunión para un demo de ${c.title}.\n\nMe interesa porque...\n\nSaludos.`;
    return `mailto:contacto@plusbi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const currentDisplay = c.challenges.find(item => item.id === activeChallenge);

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
                <Card className="grid md:grid-cols-2 shadow-xl glassmorphism overflow-hidden">
                    <div className="p-8 border-r border-border/10">
                        <h3 className="font-semibold text-lg mb-4">El Desafío de la Gestión Pública</h3>
                        <div className="space-y-2">
                            {c.challenges.map(item => (
                                <button 
                                    key={item.id}
                                    onClick={() => setActiveChallenge(item.id)}
                                    className={cn(
                                        "w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3",
                                        activeChallenge === item.id 
                                            ? "bg-primary/10 text-primary font-semibold" 
                                            : "hover:bg-primary/5"
                                    )}
                                >
                                    <ArrowRight className={cn("size-5 shrink-0", activeChallenge === item.id ? "text-primary" : "text-muted-foreground" )} />
                                    {item.challenge}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-8 bg-primary/5 flex flex-col justify-center">
                        {currentDisplay && (
                            <>
                                <h3 className="font-semibold text-lg mb-2">La Solución de Mila</h3>
                                <div className="flex items-center gap-3 text-2xl font-bold text-primary mb-4">
                                    {currentDisplay.solutionIcon}
                                    <h4>{currentDisplay.solution}</h4>
                                </div>
                                <p className="text-muted-foreground">{currentDisplay.description}</p>
                            </>
                        )}
                    </div>
                </Card>
            
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

    

    