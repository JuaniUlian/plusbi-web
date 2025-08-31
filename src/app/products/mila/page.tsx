
'use client';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  CheckCircle2,
  AlertTriangle,
  FileEdit,
  BarChart,
  Link2,
  Share2,
  Award,
} from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const content = {
  es: {
    badge: "Validación de Documentos con IA",
    title: "Mila",
    subtitle: "La herramienta de IA para gobiernos que acelera procesos, previene errores y asegura el cumplimiento normativo. Mila valida decretos, licitaciones y otros documentos en minutos.",
    featuresTitle: "Características",
    featuresSubtitle: "Descubre cómo Mila transforma la validación de documentos con sus potentes funciones impulsadas por IA.",
    features: [
      { icon: <BarChart className="text-primary" />, title: 'Análisis inteligente', description: 'Divide los documentos en bloques y analiza punto por punto para detectar errores y riesgos.' },
      { icon: <AlertTriangle className="text-primary" />, title: 'Alertas automáticas', description: 'Clasifica los errores en niveles de riesgo (rojo, amarillo, verde) para que sepas qué atender primero.' },
      { icon: <FileEdit className="text-primary" />, title: 'Edición ágil', description: 'Editá y corregí desde la plataforma, con control de versiones y sugerencias integradas.' },
      { icon: <Award className="text-primary" />, title: 'Puntaje legal', description: 'Recibí una puntuación por documento o bloque, según el cumplimiento normativo.' },
      { icon: <Link2 className="text-primary" />, title: 'Normas vinculadas', description: 'MILA te muestra en qué norma o resolución se basa cada sugerencia.' },
      { icon: <Share2 className="text-primary" />, title: 'Exportá y compartí', description: 'Generá una versión corregida del documento para compartir fácilmente.' },
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
    ]
  },
  en: {
    badge: "AI Document Validation",
    title: "Mila",
    subtitle: "The AI tool for governments that accelerates processes, prevents errors, and ensures regulatory compliance. Mila validates decrees, tenders, and other documents in minutes.",
    featuresTitle: "Features",
    featuresSubtitle: "Discover how Mila transforms document validation with its powerful, AI-driven features.",
    features: [
      { icon: <BarChart className="text-primary" />, title: 'Intelligent Analysis', description: 'Divides documents into blocks and analyzes them point by point to detect errors and risks.' },
      { icon: <AlertTriangle className="text-primary" />, title: 'Automatic Alerts', description: 'Classifies errors into risk levels (red, yellow, green) so you know what to address first.' },
      { icon: <FileEdit className="text-primary" />, title: 'Agile Editing', description: 'Edit and correct from the platform, with version control and integrated suggestions.' },
      { icon: <Award className="text-primary" />, title: 'Legal Score', description: 'Receive a score per document or block, according to regulatory compliance.' },
      { icon: <Link2 className="text-primary" />, title: 'Linked Regulations', description: 'MILA shows you which regulation or resolution each suggestion is based on.' },
      { icon: <Share2 className="text-primary" />, title: 'Export and Share', description: 'Generate a corrected version of the document to share easily.' },
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
    ]
  }
}

export default function MilaPage() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <>
      <header className="py-20 bg-primary/10 text-center">
        <div className="container mx-auto px-4">
          <Badge>{c.badge}</Badge>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold font-headline">{c.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {c.subtitle}
          </p>
        </div>
      </header>
      <main className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-headline mb-4">{c.featuresTitle}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{c.featuresSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {c.features.map(item => (
              <Card key={item.title} className="flex gap-4 p-6 items-start glassmorphism">
                <div className="bg-primary/10 p-3 rounded-lg h-fit">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-lg">{item.title}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mb-16">
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
          <Card className="grid md:grid-cols-2 gap-12 items-center bg-primary/5 p-8 rounded-lg shadow-lg glassmorphism">
            <div>
              <h3 className="text-2xl font-bold font-headline">{c.diffTitle}</h3>
              <p className="mt-4 text-muted-foreground">{c.diffSubtitle}</p>
              <ul className="mt-6 space-y-4">
                {c.diffPoints.map((point, index) => (
                   <li key={index} className="flex gap-3"><CheckCircle2 className="text-green-500 size-5 mt-0.5 shrink-0" /><span dangerouslySetInnerHTML={{ __html: point.text }} /></li>
                ))}
              </ul>
            </div>
            <Image
              src="/backgrounds/mila-interface.png"
              alt="Mila interface diagram"
              width={500}
              height={500}
              className="rounded-lg"
              data-ai-hint="interface diagram"
            />
          </Card>
        </div>
      </main>
    </>
  );
}
