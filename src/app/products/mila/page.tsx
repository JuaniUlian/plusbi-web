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

const milaFeatures = [
  { icon: <BarChart className="text-primary" />, title: 'Análisis inteligente', description: 'Divide los documentos en bloques y analiza punto por punto para detectar errores y riesgos.' },
  { icon: <AlertTriangle className="text-primary" />, title: 'Alertas automáticas', description: 'Clasifica los errores en niveles de riesgo (rojo, amarillo, verde) para que sepas qué atender primero.' },
  { icon: <FileEdit className="text-primary" />, title: 'Edición ágil', description: 'Editá y corregí desde la plataforma, con control de versiones y sugerencias integradas.' },
  { icon: <Award className="text-primary" />, title: 'Puntaje legal', description: 'Recibí una puntuación por documento o bloque, según el cumplimiento normativo.' },
  { icon: <Link2 className="text-primary" />, title: 'Normas vinculadas', description: 'MILA te muestra en qué norma o resolución se basa cada sugerencia.' },
  { icon: <Share2 className="text-primary" />, title: 'Exportá y compartí', description: 'Generá una versión corregida del documento para compartir fácilmente.' },
];

const milaResults = [
  { value: '+67%', label: 'Errores detectados vs revisión humana' },
  { value: '3 min vs 80 días', label: 'Tiempo de revisión MILA vs circuito tradicional' },
  { value: '+82%', label: 'Gobiernos reportan mejoras en control interno' },
  { value: '76%', label: 'Reducción de tiempos en validación' },
];

export default function MilaPage() {
  return (
    <>
      <header className="py-20 bg-primary/10 text-center">
        <div className="container mx-auto px-4">
          <Badge>AI Document Validation</Badge>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold font-headline">Mila</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            The AI tool for governments that accelerates processes, prevents errors, and ensures regulatory compliance. Mila validates decrees, tenders, and other documents in minutes.
          </p>
        </div>
      </header>
      <main className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-headline mb-4">Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Discover how Mila transforms document validation with its powerful, AI-driven features.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {milaFeatures.map(item => (
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
            <h3 className="text-3xl font-bold font-headline mb-8">Real Results</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {milaResults.map(item => (
                <Card key={item.label} className="p-4 glassmorphism">
                  <p className="text-4xl font-extrabold text-primary">{item.value}</p>
                  <p className="text-sm text-muted-foreground mt-2">{item.label}</p>
                </Card>
              ))}
            </div>
          </div>
          <Card className="grid md:grid-cols-2 gap-12 items-center bg-primary/5 p-8 rounded-lg shadow-lg glassmorphism">
            <div>
              <h3 className="text-2xl font-bold font-headline">¿En qué se diferencia de ChatGPT y otras IA?</h3>
              <p className="mt-4 text-muted-foreground">MILA is not a generic AI. It's a specialized tool designed for the public sector's unique legal and administrative challenges.</p>
              <ul className="mt-6 space-y-4">
                <li className="flex gap-3"><CheckCircle2 className="text-green-500 size-5 mt-0.5 shrink-0" /><span><strong>Entrenamiento especializado:</strong> Trained specifically with your local regulations and internal audit criteria.</span></li>
                <li className="flex gap-3"><CheckCircle2 className="text-green-500 size-5 mt-0.5 shrink-0" /><span><strong>Entiende documentos públicos:</strong> Identifies contracts, decrees, and resolutions with legal-administrative logic.</span></li>
                <li className="flex gap-3"><CheckCircle2 className="text-green-500 size-5 mt-0.5 shrink-0" /><span><strong>Detecta riesgos, no solo errores:</strong> Classifies observations by legal, operational, or control risk with a traffic-light system.</span></li>
                <li className="flex gap-3"><CheckCircle2 className="text-green-500 size-5 mt-0.5 shrink-0" /><span><strong>Diseñada para gobiernos:</strong> Every feature is designed for legal secretariats, technical teams, and administrative areas of the state.</span></li>
              </ul>
            </div>
            <Image
              src="https://picsum.photos/500/500?random=11"
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
