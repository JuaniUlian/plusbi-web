import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sistema de Expediente Electrónico - Transformación Digital',
  description: 'Implementación de sistemas de expedientes electrónicos para gobiernos. +30 implementaciones, +40k usuarios, +10 millones de documentos gestionados. Instalación, soporte y capacitación completa.',
  keywords: ['expediente electrónico', 'digitalización gobierno', 'gestión documental', 'transformación digital sector público', 'expedientes digitales', 'firma electrónica', 'código abierto gobierno'],
  openGraph: {
    title: 'Sistema de Expediente Electrónico - PLUS BI',
    description: 'Transformación digital para gobiernos. +30 implementaciones exitosas, +10M documentos gestionados.',
    images: ['/logo/plusbi.png'],
  },
};

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
  Mail,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const content = {
    es: {
        badge: "Transformación Digital",
        title: "Sistema de Expediente Electrónico",
        subtitle: "Modernizando tus procesos para mejorar radicalmente la eficiencia. Instalamos, damos soporte y capacitamos en sistemas de expedientes electrónicos.",
        interactiveTitle: "Del Problema a la Solución",
        interactiveSubtitle: "Haz clic en un desafío para descubrir cómo lo solucionamos.",
        challenges: [
            { id: 'efficiency', challenge: "Ineficiencia y Lentitud", solution: "Velocidad y Resultados", description: "Digitalizamos los flujos de trabajo para agilizar trámites, reduciendo drásticamente los tiempos de espera y optimizando los procesos internos.", icon: <Zap className="text-green-600 size-6" /> },
            { id: 'costs', challenge: "Altos Costos Operativos", solution: "Bajos Costos Operativos", description: "Eliminamos gastos de impresión, almacenamiento físico y logística de documentos, generando ahorros significativos para la institución.", icon: <DollarSign className="text-green-600 size-6" /> },
            { id: 'transparency', challenge: "Baja Transparencia", solution: "Trazabilidad Completa", description: "Cada paso queda registrado. Nuestro sistema ofrece una trazabilidad total que permite auditorías rápidas y fomenta la confianza ciudadana.", icon: <Eye className="text-green-600 size-6" /> },
            { id: 'accessibility', challenge: "Accesibilidad Limitada", solution: "Acceso Distribuido", description: "Accede a la información desde cualquier lugar y en cualquier momento a través de un portal seguro y centralizado.", icon: <Cloud className="text-green-600 size-6" /> },
            { id: 'security', challenge: "Seguridad Deficiente", solution: "Altos Niveles de Seguridad", description: "Con encriptación de punta a punta y controles de acceso robustos, garantizamos la integridad y confidencialidad de la información.", icon: <Lock className="text-green-600 size-6" /> },
            { id: 'environment', challenge: "Impacto Ambiental", solution: "Responsabilidad Ecológica", description: "Al eliminar el papel, reducimos la huella de carbono y promovemos una gestión pública más sostenible y responsable.", icon: <Leaf className="text-green-600 size-6" /> },
        ],
        featuresTitle: "Características Clave",
        features: [
            { icon: <ShieldCheck className="text-foreground size-8"/>, title: "SEGURIDAD", description: "El sistema garantiza la seguridad de la información con encriptación y medidas de control de acceso." },
            { icon: <Cpu className="text-foreground size-8"/>, title: "TECNOLOGÍA DE CÓDIGO ABIERTO", description: "Basado en tecnología de código abierto, que garantiza flexibilidad y escalabilidad." },
            { icon: <Fingerprint className="text-foreground size-8"/>, title: "FIRMA ELECTRÓNICA", description: "Facilita la firma electrónica de documentos, agilizando procesos y asegurando la autenticidad." },
        ],
        benefitsTitle: "Beneficios para las Instituciones",
        benefits: [
            { icon: <TrendingUp className="text-primary size-10"/>, title: "EFICIENCIA", description: "Optimización de procesos y reducción de costos en la gestión documental." },
            { icon: <Eye className="text-primary size-10"/>, title: "TRANSPARENCIA", description: "Mejora en la trazabilidad y acceso a la información para los ciudadanos." },
            { icon: <Layers className="text-primary size-10"/>, title: "ESCALABILIDAD", description: "Adaptación a las necesidades específicas de diferentes instituciones provinciales." },
        ],
        kpisTitle: "KPIs Destacados",
        kpisSubtitle: "Un ecosistema robusto que soporta a cientos de miles de estudiantes y empleados.",
        kpis: [
            { value: "+30", label: "implementaciones" },
            { value: "+40k", label: "Usuarios" },
            { value: "+10 millones", label: "Documentos gestionados" },
        ],
        ctaTitle: "¿Tu organización necesita digitalizarse?",
        ctaSubtitle: "Deja atrás el papel y da el salto a la gestión digital. Contáctanos para una consulta.",
        ctaButton: "Más información sobre Expediente Electrónico",
    },
    en: {
        badge: "Digital Transformation",
        title: "Electronic File System",
        subtitle: "Modernizing your processes to radically improve efficiency. We install, support, and train on electronic file systems.",
        interactiveTitle: "From Problem to Solution",
        interactiveSubtitle: "Click on a challenge to discover how we solve it.",
        challenges: [
            { id: 'efficiency', challenge: "Inefficiency and Slowness", solution: "Speed and Results", description: "We digitize workflows to streamline procedures, drastically reducing waiting times and optimizing internal processes.", icon: <Zap className="text-green-600 size-6" /> },
            { id: 'costs', challenge: "High Operational Costs", solution: "Low Operational Costs", description: "We eliminate expenses on printing, physical storage, and document logistics, generating significant savings for the institution.", icon: <DollarSign className="text-green-600 size-6" /> },
            { id: 'transparency', challenge: "Low Transparency", solution: "Full Traceability", description: "Every step is recorded. Our system offers complete traceability that allows for quick audits and fosters public trust.", icon: <Eye className="text-green-600 size-6" /> },
            { id: 'accessibility', challenge: "Limited Accessibility", solution: "Distributed Access", description: "Access information from anywhere, at any time, through a secure and centralized portal.", icon: <Cloud className="text-green-600 size-6" /> },
            { id: 'security', challenge: "Poor Security", solution: "High Security Levels", description: "With end-to-end encryption and robust access controls, we guarantee the integrity and confidentiality of information.", icon: <Lock className="text-green-600 size-6" /> },
            { id: 'environment', challenge: "Environmental Impact", solution: "Ecological Responsibility", description: "By eliminating paper, we reduce the carbon footprint and promote more sustainable and responsible public management.", icon: <Leaf className="text-green-600 size-6" /> },
        ],
        featuresTitle: "Key Features",
        features: [
            { icon: <ShieldCheck className="text-foreground size-8"/>, title: "SECURITY", description: "The system guarantees information security with encryption and access control measures." },
            { icon: <Cpu className="text-foreground size-8"/>, title: "OPEN SOURCE TECHNOLOGY", description: "Based on open source technology, which guarantees flexibility and scalability." },
            { icon: <Fingerprint className="text-foreground size-8"/>, title: "ELECTRONIC SIGNATURE", description: "Facilitates the electronic signing of documents, speeding up processes and ensuring authenticity." },
        ],
        benefitsTitle: "Benefits for Institutions",
        benefits: [
            { icon: <TrendingUp className="text-primary size-10"/>, title: "EFFICIENCY", description: "Optimization of processes and reduction of costs in document management." },
            { icon: <Eye className="text-primary size-10"/>, title: "TRANSPARENCY", description: "Improvement in traceability and access to information for citizens." },
            { icon: <Layers className="text-primary size-10"/>, title: "SCALABILITY", description: "Adaptation to the specific needs of different provincial institutions." },
        ],
        kpisTitle: "Highlighted KPIs",
        kpisSubtitle: "A robust ecosystem supporting hundreds of thousands of students and employees.",
        kpis: [
            { value: "+30", label: "implementations" },
            { value: "+40k", label: "Users" },
            { value: "+10 million", label: "Managed documents" },
        ],
        ctaTitle: "Does your organization need to go digital?",
        ctaSubtitle: "Leave paper behind and make the leap to digital management. Contact us for a consultation.",
        ctaButton: "Learn more about Electronic File System",
    }
};

export default function ElectronicFilePage() {
    const { language } = useLanguage();
    const c = content[language];
    const [activeChallenge, setActiveChallenge] = useState(c.challenges[0].id);

    const generateMailto = () => {
        const subject = `Solicitud de información sobre ${c.title}`;
        const body = `Estimado Juan,\n\nMe gustaría recibir más información sobre el ${c.title}.\n\nMe interesa porque...\n\nSaludos.`;
        return `mailto:juan.ulian@pluscompol.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    const currentDisplay = c.challenges.find(item => item.id === activeChallenge);

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
            <main>
                <section className="py-16 md:py-24 bg-background" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold font-headline">{c.interactiveTitle}</h2>
                            <p className="mt-2 text-muted-foreground">{c.interactiveSubtitle}</p>
                        </div>
                        <Card className="grid md:grid-cols-2 shadow-xl glassmorphism overflow-hidden card-hud-effect">
                            <div className="p-8 border-r border-border/10">
                                <h3 className="font-semibold text-lg mb-4">El Desafío: Gestión Basada en Papel</h3>
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
                                            <Zap className={cn("size-5 shrink-0", activeChallenge === item.id ? "text-destructive" : "text-muted-foreground" )} />
                                            {item.challenge}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="p-8 bg-primary/5 flex flex-col justify-center">
                                {currentDisplay && (
                                    <>
                                        <h3 className="font-semibold text-lg mb-2">La Solución: Digitalización</h3>
                                        <div className="flex items-center gap-3 text-2xl font-bold text-primary mb-4">
                                            {currentDisplay.icon}
                                            <h4>{currentDisplay.solution}</h4>
                                        </div>
                                        <p className="text-muted-foreground">{currentDisplay.description}</p>
                                        
                                        {currentDisplay.id === 'efficiency' && (
                                            <div className="mt-4 pt-4 border-t border-border/10">
                                                <p className="text-sm font-bold text-foreground">Indicador de Éxito:</p>
                                                <p className="text-sm text-muted-foreground">Más de <strong>10 millones de documentos</strong> gestionados eficientemente en nuestras plataformas.</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </Card>
                    </div>
                </section>
                
                <section className="py-16 md:py-24 bg-primary/5" style={{backgroundImage: "url('/backgrounds/secciones b.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold font-headline text-white">{c.featuresTitle}</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                            {c.features.map(f => (
                                <Card key={f.title} className="text-center glassmorphism p-6 flex flex-col card-hud-effect">
                                  <CardHeader className="items-center p-0">
                                    <div className="bg-primary/10 rounded-full p-4 mb-4">
                                      {f.icon}
                                    </div>
                                    <CardTitle className="text-xl text-foreground">{f.title}</CardTitle>
                                  </CardHeader>
                                  <CardContent className="flex-grow p-0 mt-4">
                                    <p className="text-foreground">{f.description}</p>
                                  </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24 bg-background" style={{backgroundImage: "url('/backgrounds/cuerpo.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold font-headline">{c.benefitsTitle}</h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                           {c.benefits.map(b => (
                                <Card key={b.title} className="text-center glassmorphism p-6 flex flex-col items-center card-hud-effect">
                                  <div className="flex justify-center mb-4">{b.icon}</div>
                                  <CardHeader className="p-0">
                                    <h4 className="text-lg font-semibold">{b.title}</h4>
                                  </CardHeader>
                                  <CardContent className="p-0 mt-2">
                                    <p className="text-sm text-muted-foreground">{b.description}</p>
                                  </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold font-headline">{c.kpisTitle}</h3>
                            <p className="text-muted-foreground mt-2">{c.kpisSubtitle}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {c.kpis.map(kpi => (
                                <div key={kpi.label} className="p-6 bg-background rounded-lg shadow-md text-center glassmorphism card-hud-effect">
                                    <p className="text-4xl font-extrabold text-primary">{kpi.value}</p>
                                    <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">{kpi.label}</p>
                                </div>
                            ))}
                        </div>
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
