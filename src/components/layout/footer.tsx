import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';

export function Footer() {
  return (
    <footer className="border-t bg-primary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl font-headline">PLUS BI</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Innovación GovTech para una sociedad más justa y transparente.
            </p>
          </div>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
             <div>
              <h4 className="font-semibold mb-4 font-headline">Navegación</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Inicio</Link></li>
                <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Productos</Link></li>
                <li><Link href="/experience" className="text-muted-foreground hover:text-primary transition-colors">Experiencia</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 font-headline">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidad</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Términos de Servicio</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-semibold mb-4 font-headline">¿Hablamos?</h4>
              <p className="text-muted-foreground text-sm mb-4">Construyamos juntos una administración más eficiente.</p>
              <Button asChild>
                <a href="mailto:contacto@plusbi.com">Agenda una reunión</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PLUS BI. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
