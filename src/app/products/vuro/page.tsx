
'use client';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  FileEdit,
  Cpu,
  Fingerprint,
  Layers,
  BarChart2,
} from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const content = {
  es: {
    badge: "Próximamente",
    title: "Vuro",
    subtitle: "Un súper-agente de IA para expedientes públicos que automatiza completamente la creación, revisión, firma y publicación de decretos y resoluciones.",
    futureTitle: "El Futuro de la Administración Pública",
    futureSubtitle: "Vuro está diseñado para ser un ecosistema completo para la gestión de documentos oficiales con una eficiencia y transparencia sin precedentes.",
    features: [
      { icon: <Cpu className="size-8 text-primary mt-1 shrink-0"/>, title: "Orquestación", description: "Orquesta flujos de trabajo de varias etapas con un registro de auditoría completo." },
      { icon: <Layers className="size-8 text-primary mt-1 shrink-0"/>, title: "Validación", description: "Genera y valida formatos, normas aplicables, firmas requeridas y numeración." },
      { icon: <AlertTriangle className="size-8 text-primary mt-1 shrink-0"/>, title: "Asistencia", description: "Alerta sobre inconsistencias y proporciona sugerencias." },
      { icon: <FileEdit className="size-8 text-primary mt-1 shrink-0"/>, title: "Lenguaje Natural", description: "Entrada en lenguaje natural: sube documentos y proporciona instrucciones simples." },
      { icon: <Fingerprint className="size-8 text-primary mt-1 shrink-0"/>, title: "Integración", description: "Se integra con plataformas de firma digital." },
      { icon: <BarChart2 className="size-8 text-primary mt-1 shrink-0"/>, title: "Panel de Control", description: "Panel de control en tiempo real para seguir el progreso." },
    ]
  },
  en: {
    badge: "Coming Soon",
    title: "Vuro",
    subtitle: "An AI super-agent for public records that fully automates the creation, review, signing, and publication of decrees and resolutions.",
    futureTitle: "The Future of Public Administration",
    futureSubtitle: "Vuro is designed to be a complete ecosystem for managing official documents with unprecedented efficiency and transparency.",
    features: [
      { icon: <Cpu className="size-8 text-primary mt-1 shrink-0"/>, title: "Orchestration", description: "Orchestrates multi-stage workflows with a full audit trail." },
      { icon: <Layers className="size-8 text-primary mt-1 shrink-0"/>, title: "Validation", description: "Generates and validates formats, applicable norms, required signatures, and numbering." },
      { icon: <AlertTriangle className="size-8 text-primary mt-1 shrink-0"/>, title: "Assistance", description: "Alerts on inconsistencies and provides suggestions." },
      { icon: <FileEdit className="size-8 text-primary mt-1 shrink-0"/>, title: "Natural Language", description: "Natural language input: upload documents and provide simple instructions." },
      { icon: <Fingerprint className="size-8 text-primary mt-1 shrink-0"/>, title: "Integration", description: "Integrates with digital signature platforms." },
      { icon: <BarChart2 className="size-8 text-primary mt-1 shrink-0"/>, title: "Control Panel", description: "Real-time control panel for tracking progress." },
    ]
  }
}

export default function VuroPage() {
    const { language } = useLanguage();
    const c = content[language];

    return (
        <>
            <header className="py-20 md:py-32 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <Badge variant="secondary" className="bg-white/20 border-0 text-white">{c.badge}</Badge>
                    <h1 className="mt-4 text-4xl md:text-6xl font-bold font-headline">{c.title}</h1>
                    <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
                        {c.subtitle}
                    </p>
                </div>
            </header>
            <main className="py-16 md:py-24 bg-background">
                 <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-headline">{c.futureTitle}</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{c.futureSubtitle}</p>
                    </div>
                    <Card className="glassmorphism">
                        <CardContent className="p-10">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                {c.features.map(feature => (
                                    <div key={feature.title} className="flex gap-4 items-start">{feature.icon}<div><h4 className='font-semibold text-lg'>{feature.title}</h4><span>{feature.description}</span></div></div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                 </div>
            </main>
        </>
    );
}
