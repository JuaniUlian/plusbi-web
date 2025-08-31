import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, ShieldCheck } from 'lucide-react';

export default function QuestPage() {
  return (
    <>
      <header className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <Badge>Big Data & AI</Badge>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold font-headline">Quest</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Access huge volumes of data so you, along with your Artificial Intelligence advisor, can make the best decisions from your smartphone or PC, anytime!
          </p>
        </div>
      </header>
      <main className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold flex items-center gap-3"><Rocket className="text-primary size-7" /> Take the leap in quality</h3>
                <p className="text-muted-foreground mt-2 text-lg">PLUS Quest is a platform that combines the power of Big Data, Artificial Intelligence, and the research methodology developed by PLUS. The result is the ability to accurately predict market trends.</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold flex items-center gap-3"><ShieldCheck className="text-primary size-7" /> Power and Precision</h3>
                <p className="text-muted-foreground mt-2 text-lg">Quest has the capacity to process millions of digital data points from anonymous public databases, providing 24-hour trends. This allows decision-makers to carry out their work accurately, quickly, and dynamically.</p>
              </div>
            </div>
            <Card className="shadow-xl glassmorphism">
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
      </main>
    </>
  );
}
