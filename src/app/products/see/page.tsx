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

const seeFeatures = [
    { icon: <ShieldCheck className="text-primary"/>, title: "SECURITY", description: "The system guarantees information security with encryption and access control measures." },
    { icon: <Cpu className="text-primary"/>, title: "OPEN SOURCE TECHNOLOGY", description: "Based on open source technology, which guarantees flexibility and scalability." },
    { icon: <Fingerprint className="text-primary"/>, title: "ELECTRONIC SIGNATURE", description: "Facilitates the electronic signing of documents, speeding up processes and ensuring authenticity." },
];

const seeBenefits = [
    { icon: <TrendingUp className="text-primary"/>, title: "EFFICIENCY", description: "Optimization of processes and reduction of costs in document management." },
    { icon: <Eye className="text-primary"/>, title: "TRANSPARENCY", description: "Improvement in traceability and access to information for citizens." },
    { icon: <Layers className="text-primary"/>, title: "SCALABILITY", description: "Adaptation to the specific needs of different provincial institutions." },
];

const seeKpis = [
    { value: "30", label: "Implementations in universities" },
    { value: "+40k", label: "Users" },
    { value: "+10 million", label: "Managed documents" },
];

export default function ElectronicFilePage() {
    return (
        <>
            <header className="py-20 bg-primary/10 text-center">
                <div className="container mx-auto px-4">
                    <Badge>Digital Transformation</Badge>
                    <h1 className="mt-2 text-4xl md:text-5xl font-bold font-headline">Electronic File System</h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Modernizing your processes to radically improve efficiency. We install, support, and train on electronic file systems.
                    </p>
                </div>
            </header>
            <main className="py-16 md:py-24 bg-primary/5">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        <Card className="glassmorphism">
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
                        <Card className="border-primary bg-primary/5 glassmorphism">
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
                        <h3 className="text-2xl font-bold font-headline">Key Features</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                        {seeFeatures.map(f => <Card key={f.title} className="text-center glassmorphism"><CardHeader className='justify-center'>{f.icon}</CardHeader><CardContent><h4>{f.title}</h4><p className="text-sm text-muted-foreground">{f.description}</p></CardContent></Card>)}
                    </div>

                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold font-headline">Benefits for Institutions</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
                        {seeBenefits.map(b => <Card key={b.title} className="text-center glassmorphism"><CardHeader className='justify-center'>{b.icon}</CardHeader><CardContent><h4>{b.title}</h4><p className="text-sm text-muted-foreground">{b.description}</p></CardContent></Card>)}
                    </div>

                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold font-headline">Highlighted KPIs</h3>
                        <p className="text-muted-foreground mt-2">A robust ecosystem supporting hundreds of thousands of students and employees.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {seeKpis.map(kpi => (
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