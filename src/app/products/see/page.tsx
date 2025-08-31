
'use client';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ShieldCheck,
  Cpu,
  Fingerprint,
  TrendingUp,
  Eye,
  Layers,
  Zap,
  DollarSign,
  Cloud,
  Users,
  Lock,
  Leaf,
} from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const content = {
    es: {
        badge: "Transformación Digital",
        title: "Sistema de Expediente Electrónico",
        subtitle: "Modernizando tus procesos para mejorar radicalmente la eficiencia. Instalamos, damos soporte y capacitamos en sistemas de expedientes electrónicos.",
        challengeTitle: "El Desafío: Gestión Basada en Papel",
        challengePoints: [
            { icon: <Zap className="text-destructive size-4" />, text: "Ineficiencia y Lentitud" },
            { icon: <DollarSign className="text-destructive size-4" />, text: "Altos Costos Operativos" },
            { icon: <Eye className="text-destructive size-4" />, text: "Baja Transparencia" },
            { icon: <Users className="text-destructive size-4" />, text: "Accesibilidad Limitada" },
            { icon: <Lock className="text-destructive size-4" />, text: "Seguridad Deficiente" },
            { icon: <Leaf className="text-destructive size-4" />, text: "Impacto Ambiental" },
        ],
        solutionTitle: "La Solución: Digitalización",
        solutionPoints: [
            { icon: <Zap className="text-green-600 size-4" />, text: "Velocidad y Resultados" },
            { icon: <DollarSign className="text-green-600 size-4" />, text: "Bajos Costos Operativos" },
            { icon: <Eye className="text-green-600 size-4" />, text: "Trazabilidad Completa" },
            { icon: <Cloud className="text-green-600 size-4" />, text: "Acceso Distribuido" },
            { icon: <Lock className="text-green-600 size-4" />, text: "Altos Niveles de Seguridad" },
            { icon: <Leaf className="text-green-600 size-4" />, text: "Responsabilidad Ecológica" },
        ],
        featuresTitle: "Características Clave",
        features: [
            { icon: <ShieldCheck className="text-primary"/>, title: "SEGURIDAD", description: "El sistema garantiza la seguridad de la información con encriptación y medidas de control de acceso." },
            { icon: <Cpu className="text-primary"/>, title: "TECNOLOGÍA DE CÓDIGO ABIERTO", description: "Basado en tecnología de código abierto, que garantiza flexibilidad y escalabilidad." },
            { icon: <Fingerprint className="text-primary"/>, title: "FIRMA ELECTRÓNICA", description: "Facilita la firma electrónica de documentos, agilizando procesos y asegurando la autenticidad." },
        ],
        benefitsTitle: "Beneficios para las Instituciones",
        benefits: [
            { icon: <TrendingUp className="text-primary"/>, title: "EFICIENCIA", description: "Optimización de procesos y reducción de costos en la gestión documental." },
            { icon: <Eye className="text-primary"/>, title: "TRANSPARENCIA", description: "Mejora en la trazabilidad y acceso a la información para los ciudadanos." },
            { icon: <Layers className="text-primary"/>, title: "ESCALABILIDAD", description: "Adaptación a las necesidades específicas de diferentes instituciones provinciales." },
        ],
        kpisTitle: "KPIs Destacados",
        kpisSubtitle: "Un ecosistema robusto que soporta a cientos de miles de estudiantes y empleados.",
        kpis: [
            { value: "30", label: "Implementaciones en universidades" },
            { value: "+40k", label: "Usuarios" },
            { value: "+10 millones", label: "Documentos gestionados" },
        ],
    },
    en: {
        badge: "Digital Transformation",
        title: "Electronic File System",
        subtitle: "Modernizing your processes to radically improve efficiency. We install, support, and train on electronic file systems.",
        challengeTitle: "The Challenge: Paper-Based Management",
        challengePoints: [
            { icon: <Zap className="text-destructive size-4" />, text: "Inefficiency and Slowness" },
            { icon: <DollarSign className="text-destructive size-4" />, text: "High Operational Costs" },
            { icon: <Eye className="text-destructive size-4" />, text: "Low Transparency" },
            { icon: <Users className="text-destructive size-4" />, text: "Limited Accessibility" },
            { icon: <Lock className="text-destructive size-4" />, text: "Poor Security" },
            { icon: <Leaf className="text-destructive size-4" />, text: "Environmental Impact" },
        ],
        solutionTitle: "The Solution: Digitalization",
        solutionPoints: [
            { icon: <Zap className="text-green-600 size-4" />, text: "Speed and Results" },
            { icon: <DollarSign className="text-green-600 size-4" />, text: "Low Operational Costs" },
            { icon: <Eye className="text-green-600 size-4" />, text: "Full Traceability" },
            { icon: <Cloud className="text-green-600 size-4" />, text: "Distributed Access" },
            { icon: <Lock className="text-green-600 size-4" />, text: "High Security Levels" },
            { icon: <Leaf className="text-green-600 size-4" />, text: "Ecological Responsibility" },
        ],
        featuresTitle: "Key Features",
        features: [
            { icon: <ShieldCheck className="text-primary"/>, title: "SECURITY", description: "The system guarantees information security with encryption and access control measures." },
            { icon: <Cpu className="text-primary"/>, title: "OPEN SOURCE TECHNOLOGY", description: "Based on open source technology, which guarantees flexibility and scalability." },
            { icon: <Fingerprint className="text-primary"/>, title: "ELECTRONIC SIGNATURE", description: "Facilitates the electronic signing of documents, speeding up processes and ensuring authenticity." },
        ],
        benefitsTitle: "Benefits for Institutions",
        benefits: [
            { icon: <TrendingUp className="text-primary"/>, title: "EFFICIENCY", description: "Optimization of processes and reduction of costs in document management." },
            { icon: <Eye className="text-primary"/>, title: "TRANSPARENCY", description: "Improvement in traceability and access to information for citizens." },
            { icon: <Layers className="text-primary"/>, title: "SCALABILITY", description: "Adaptation to the specific needs of different provincial institutions." },
        ],
        kpisTitle: "Highlighted KPIs",
        kpisSubtitle: "A robust ecosystem supporting hundreds of thousands of students and employees.",
        kpis: [
            { value: "30", label: "Implementations in universities" },
            { value: "+40k", label: "Users" },
            { value: "+10 million", label: "Managed documents" },
        ],
    }
};

export default function ElectronicFilePage() {
    const { language } = useLanguage();
    const c = content[language];

    return (
        <>
            <header className="py-20 bg-primary/10 text-center" style={{backgroundImage: "url('/backgrounds/titulos.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="container mx-auto px-4">
                    <Badge>{c.badge}</Badge>
                    <h1 className="mt-2 text-4xl md:text-5xl font-bold font-headline text-white">{c.title}</h1>
                    <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto">
                        {c.subtitle}
                    </p>
                </div>
            </header>
            <main className="py-16 md:py-24 bg-primary/5" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <Card className="glassmorphism">
                            <CardHeader><CardTitle>{c.challengeTitle}</CardTitle></CardHeader>
                            <CardContent className="space-y-3 text-muted-foreground">
                                {c.challengePoints.map(p => <p key={p.text} className="flex items-center gap-2">{p.icon} {p.text}</p>)}
                            </CardContent>
                        </Card>
                        <Card className="border-primary bg-primary/5 glassmorphism">
                            <CardHeader><CardTitle>{c.solutionTitle}</CardTitle></CardHeader>
                            <CardContent className="space-y-3 text-foreground">
                                {c.solutionPoints.map(p => <p key={p.text} className="flex items-center gap-2">{p.icon} {p.text}</p>)}
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold font-headline">{c.featuresTitle}</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                        {c.features.map(f => <Card key={f.title} className="text-center glassmorphism"><CardHeader className='justify-center'>{f.icon}</CardHeader><CardContent><h4>{f.title}</h4><p className="text-sm text-muted-foreground">{f.description}</p></CardContent></Card>)}
                    </div>

                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold font-headline">{c.benefitsTitle}</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                        {c.benefits.map(b => <Card key={b.title} className="text-center glassmorphism"><CardHeader className='justify-center'>{b.icon}</CardHeader><CardContent><h4>{b.title}</h4><p className="text-sm text-muted-foreground">{b.description}</p></CardContent></Card>)}
                    </div>

                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold font-headline">{c.kpisTitle}</h3>
                        <p className="text-muted-foreground mt-2">{c.kpisSubtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {c.kpis.map(kpi => (
                            <div key={kpi.label} className="p-6 bg-background rounded-lg shadow-md text-center glassmorphism">
                                <p className="text-4xl font-extrabold text-primary">{kpi.value}</p>
                                <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">{kpi.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
