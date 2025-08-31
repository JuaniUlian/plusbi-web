import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
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
  Rocket,
  ShieldCheck,
  Zap,
  DollarSign,
  Cloud,
  Users,
  Eye,
  Lock,
  Leaf,
  Layers,
  Fingerprint,
  Cpu,
  TrendingUp,
  Award,
  BarChart2,
} from 'lucide-react';

const QuestSection = () => (
  <section id="quest" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Badge>Big Data & AI</Badge>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold font-headline">Quest</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Access huge volumes of data so you, along with your Artificial Intelligence advisor, can make the best decisions from your smartphone or PC, anytime!
          </p>
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2"><Rocket className="text-primary" /> Take the leap in quality</h3>
              <p className="text-muted-foreground mt-2">PLUS Quest is a platform that combines the power of Big Data, Artificial Intelligence, and the research methodology developed by PLUS. The result is the ability to accurately predict market trends.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold flex items-center gap-2"><ShieldCheck className="text-primary" /> Power and Precision</h3>
              <p className="text-muted-foreground mt-2">Quest has the capacity to process millions of digital data points from anonymous public databases, providing 24-hour trends. This allows decision-makers to carry out their work accurately, quickly, and dynamically.</p>
            </div>
          </div>
        </div>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>🇦🇷 Success Case: Argentine Presidential Elections 2023</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              src="https://picsum.photos/600/400?random=10"
              alt="Argentina map with data points"
              width={600}
              height={400}
              className="rounded-lg mb-4"
              data-ai-hint="argentina map"
            />
            <p className="text-muted-foreground">
              A daily study conducted between January and November 2023, collecting more than <strong>7,100,000 data points</strong> on presidential candidates in Argentina, covering the entire country. This provided unparalleled insight into voter sentiment and trends.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

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

const MilaSection = () => (
  <section id="mila" className="py-16 md:py-24 bg-primary/5">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <Badge>AI Document Validation</Badge>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold font-headline">Mila</h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          The AI tool for governments that accelerates processes, prevents errors, and ensures regulatory compliance. Mila validates decrees, tenders, and other documents in minutes.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {milaFeatures.map(item => (
          <div key={item.title} className="flex gap-4">
            <div className="bg-primary/10 p-3 rounded-full h-fit">{item.icon}</div>
            <div>
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
       <div className="text-center mb-16">
        <h3 className="text-2xl font-bold font-headline mb-8">Resultados Reales</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {milaResults.map(item => (
            <div key={item.label} className="p-4 bg-background rounded-lg shadow-md">
              <p className="text-3xl font-extrabold text-primary">{item.value}</p>
              <p className="text-sm text-muted-foreground mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-12 items-center bg-background p-8 rounded-lg shadow-lg">
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
      </div>
    </div>
  </section>
);


const VuroSection = () => (
    <section id="vuro" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
            <Card className="text-center bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-2xl overflow-hidden">
                <CardHeader>
                    <Badge variant="secondary" className="mx-auto bg-white/20 border-0 text-white">Próximamente</Badge>
                    <CardTitle className="mt-4 text-3xl md:text-4xl font-bold font-headline">Vuro</CardTitle>
                    <CardDescription className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
                        An AI super-agent for public records that fully automates the creation, review, signing, and publication of decrees and resolutions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
                        <div className="flex gap-3 items-start"><Cpu className="size-5 mt-1 shrink-0"/><span>Orchestrates multi-stage workflows with a full audit trail.</span></div>
                        <div className="flex gap-3 items-start"><Layers className="size-5 mt-1 shrink-0"/><span>Generates and validates formats, applicable norms, required signatures, and numbering.</span></div>
                        <div className="flex gap-3 items-start"><AlertTriangle className="size-5 mt-1 shrink-0"/><span>Alerts on inconsistencies and provides suggestions.</span></div>
                        <div className="flex gap-3 items-start"><FileEdit className="size-5 mt-1 shrink-0"/><span>Natural language input: upload documents and provide simple instructions.</span></div>
                        <div className="flex gap-3 items-start"><Fingerprint className="size-5 mt-1 shrink-0"/><span>Integrates with digital signature platforms.</span></div>
                        <div className="flex gap-3 items-start"><BarChart2 className="size-5 mt-1 shrink-0"/><span>Real-time control panel for tracking progress.</span></div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </section>
);

const sudocuFeatures = [
    { icon: <ShieldCheck className="text-primary"/>, title: "SEGURIDAD", description: "SUDOCU garantiza la seguridad de la información con medidas de encriptación y control de acceso." },
    { icon: <Cpu className="text-primary"/>, title: "TECNOLOGÍA OPEN SOURCE", description: "SUDOCU se basa en tecnología open source, lo que garantiza flexibilidad y escalabilidad." },
    { icon: <Fingerprint className="text-primary"/>, title: "FIRMA ELECTRÓNICA", description: "SUDOCU facilita la firma electrónica de documentos, agilizando los procesos y asegurando la autenticidad." },
];

const sudocuBenefits = [
    { icon: <TrendingUp className="text-primary"/>, title: "EFICIENCIA", description: "Optimización de procesos y reducción de costos en la gestión documental." },
    { icon: <Eye className="text-primary"/>, title: "TRANSPARENCIA", description: "Mejora en la trazabilidad y el acceso a la información para la ciudadanía." },
    { icon: <Layers className="text-primary"/>, title: "ESCALABILIDAD", description: "Adaptación a las necesidades específicas de diferentes instituciones provinciales." },
];

const sudocuKpis = [
    { value: "30", label: "Implementaciones en universidades" },
    { value: "+40 mil", label: "Usuarios" },
    { value: "+10 millones", label: "Documentos gestionados" },
];

const SudocuSection = () => (
    <section id="sudocu" className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto px-4">
             <div className="text-center mb-12">
                <Badge>Digital Transformation</Badge>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold font-headline">Sistema de Gestión Documental</h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    Modernizing your processes to radically improve efficiency. We install, support, and train on the SUDOCU electronic file system.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <Card>
                    <CardHeader><CardTitle>The Challenge: Paper-Based Management</CardTitle></CardHeader>
                    <CardContent className="space-y-3 text-muted-foreground">
                        <p className="flex items-center gap-2"><Zap className="text-destructive size-4" /> Inefficiency and Slowness</p>
                        <p className="flex items-center gap-2"><DollarSign className="text-destructive size-4" /> High Operational Costs</p>
                        <p className="flex items-center gap-2"><Eye className="text-destructive size-4" /> Low Transparency</p>
                        <p className="flex items-center gap-2"><Users className="text-destructive size-4" /> Limited Accessibility</p>
                        <p className="flex items-center gap-2"><Lock className="text-destructive size-4" /> Poor Security</p>
                        <p className="flex items-center gap-2"><Leaf className="text-destructive size-4" /> Environmental Impact</p>
                    </CardContent>
                </Card>
                <Card className="border-primary bg-primary/5">
                    <CardHeader><CardTitle>The Solution: Digitalization</CardTitle></CardHeader>
                     <CardContent className="space-y-3 text-foreground">
                        <p className="flex items-center gap-2"><Zap className="text-green-600 size-4" /> Speed and Results</p>
                        <p className="flex items-center gap-2"><DollarSign className="text-green-600 size-4" /> Low Operational Costs</p>
                        <p className="flex items-center gap-2"><Eye className="text-green-600 size-4" /> Full Traceability</p>
                        <p className="flex items-center gap-2"><Cloud className="text-green-600 size-4" /> Distributed Access</p>
                        <p className="flex items-center gap-2"><Lock className="text-green-600 size-4" /> High Security Levels</p>
                        <p className="flex items-center gap-2"><Leaf className="text-green-600 size-4" /> Ecological Responsibility</p>
                    </CardContent>
                </Card>
            </div>
            
            <div className="text-center mb-12">
                <h3 className="text-2xl font-bold font-headline">Características Destacadas</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                {sudocuFeatures.map(f => <Card key={f.title} className="text-center"><CardHeader>{f.icon}</CardHeader><CardContent><h4>{f.title}</h4><p className="text-sm text-muted-foreground">{f.description}</p></CardContent></Card>)}
            </div>

            <div className="text-center mb-12">
                <h3 className="text-2xl font-bold font-headline">Beneficios para las Instituciones</h3>
            </div>
             <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                {sudocuBenefits.map(b => <Card key={b.title} className="text-center"><CardHeader>{b.icon}</CardHeader><CardContent><h4>{b.title}</h4><p className="text-sm text-muted-foreground">{b.description}</p></CardContent></Card>)}
            </div>

            <div className="text-center mb-12">
                 <h3 className="text-2xl font-bold font-headline">KPIs Destacados</h3>
                 <p className="text-muted-foreground mt-2">A robust ecosystem supporting hundreds of thousands of students and employees.</p>
            </div>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {sudocuKpis.map(kpi => (
                    <div key={kpi.label} className="p-6 bg-background rounded-lg shadow-md text-center">
                        <p className="text-4xl font-extrabold text-primary">{kpi.value}</p>
                        <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">{kpi.label}</p>
                    </div>
                ))}
            </div>

        </div>
    </section>
);

export default function ProductsPage() {
  return (
    <>
      <header className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary-dark font-headline">
            Our Products
          </h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced solutions to revolutionize public and private sector management.
          </p>
        </div>
      </header>
      <QuestSection />
      <MilaSection />
      <VuroSection />
      <SudocuSection />
    </>
  );
}
