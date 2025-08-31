import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

export default function VuroPage() {
    return (
        <>
            <header className="py-20 md:py-32 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <Badge variant="secondary" className="bg-white/20 border-0 text-white">Coming Soon</Badge>
                    <h1 className="mt-4 text-4xl md:text-6xl font-bold font-headline">Vuro</h1>
                    <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto">
                        An AI super-agent for public records that fully automates the creation, review, signing, and publication of decrees and resolutions.
                    </p>
                </div>
            </header>
            <main className="py-16 md:py-24 bg-background">
                 <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold font-headline">The Future of Public Administration</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Vuro is designed to be a complete ecosystem for managing official documents with unprecedented efficiency and transparency.</p>
                    </div>
                    <Card className="glassmorphism">
                        <CardContent className="p-10">
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                <div className="flex gap-4 items-start"><Cpu className="size-8 text-primary mt-1 shrink-0"/><div><h4 className='font-semibold text-lg'>Orchestration</h4><span>Orchestrates multi-stage workflows with a full audit trail.</span></div></div>
                                <div className="flex gap-4 items-start"><Layers className="size-8 text-primary mt-1 shrink-0"/><div><h4 className='font-semibold text-lg'>Validation</h4><span>Generates and validates formats, applicable norms, required signatures, and numbering.</span></div></div>
                                <div className="flex gap-4 items-start"><AlertTriangle className="size-8 text-primary mt-1 shrink-0"/><div><h4 className='font-semibold text-lg'>Assistance</h4><span>Alerts on inconsistencies and provides suggestions.</span></div></div>
                                <div className="flex gap-4 items-start"><FileEdit className="size-8 text-primary mt-1 shrink-0"/><div><h4 className='font-semibold text-lg'>Natural Language</h4><span>Natural language input: upload documents and provide simple instructions.</span></div></div>
                                <div className="flex gap-4 items-start"><Fingerprint className="size-8 text-primary mt-1 shrink-0"/><div><h4 className='font-semibold text-lg'>Integration</h4><span>Integrates with digital signature platforms.</span></div></div>
                                <div className="flex gap-4 items-start"><BarChart2 className="size-8 text-primary mt-1 shrink-0"/><div><h4 className='font-semibold text-lg'>Control Panel</h4><span>Real-time control panel for tracking progress.</span></div></div>
                            </div>
                        </CardContent>
                    </Card>
                 </div>
            </main>
        </>
    );
}
