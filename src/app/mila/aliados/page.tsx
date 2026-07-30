import Image from 'next/image';
import {
  ScanSearch,
  UserCheck,
  Check,
  Wrench,
  Search,
  GraduationCap,
  Sparkles,
  Users,
  Gift,
  Mail,
  FileText,
  Layers,
  AlertTriangle,
} from 'lucide-react';
import { MilaWizardTour } from '@/components/shared/mila-wizard-tour';
import { CONTACT_EMAIL } from '@/lib/products';

/**
 * Versión web del deck de MILA para aliados. No indexada (ver layout).
 * Reemplaza el PDF: actualizable, compartible por link/QR. Solo español.
 */
export default function MilaAliadosPage() {
  return (
    <div className="flex flex-col bg-[hsl(218,61%,13%)] text-white">
      {/* Portada */}
      <section className="mesh-mila">
        <div className="container max-w-5xl px-4 py-24 md:py-36 text-center">
          <Image
            src="/products/mila/mila-logo.png"
            alt="MILA"
            width={140}
            height={140}
            priority
            className="mx-auto h-28 w-auto drop-shadow-[0_12px_40px_rgba(232,113,58,0.35)]"
          />
          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-white/50">by PLUS BI</p>
          <h1 className="mt-8 font-headline text-4xl md:text-6xl font-bold tracking-tight text-balance">
            Detecta irregularidades{' '}
            <span className="text-mila-accent">en minutos.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-white/80">
            <strong className="text-white">Toda tu normativa. Todo el expediente.</strong> MILA hace
            el trabajo pesado, para que usted decida con toda la información ya analizada.
          </p>
          <p className="mt-10 text-sm text-white/40">Presentación 2026</p>
        </div>
      </section>

      {/* 01 · El problema */}
      <section className="bg-background text-foreground">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mila-accent">01 · El problema</p>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight">
            En toda Latinoamérica hay una Marta.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[6fr_5fr]">
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Síndica, contralora, auditora, revisora de cuentas. El nombre cambia; la
                responsabilidad es la misma:{' '}
                <strong className="text-foreground">su firma dice que un expediente está en orden.</strong>
              </p>
              <p>
                Las normas son muchísimas y los expedientes, más todavía. Entonces revisa lo
                estructural, o busca los problemas donde suelen esconderse.
              </p>
              <p className="font-semibold text-mila-accent">
                Marta no debería tener que elegir qué parte controlar.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-5 rounded-2xl border border-black/5 bg-card p-6 card-elevated">
                <FileText className="size-8 shrink-0 text-mila-accent" aria-hidden />
                <div className="flex items-baseline gap-4">
                  <span className="stat-number text-3xl md:text-4xl text-mila">+200</span>
                  <span className="text-sm text-muted-foreground">páginas por expediente, con 15 anexos técnicos</span>
                </div>
              </div>
              <div className="flex items-center gap-5 rounded-2xl border border-black/5 bg-card p-6 card-elevated">
                <Layers className="size-8 shrink-0 text-mila-accent" aria-hidden />
                <div className="flex items-baseline gap-4">
                  <span className="stat-number text-3xl md:text-4xl text-mila">+1.000</span>
                  <span className="text-sm text-muted-foreground">expedientes esperando revisión manual</span>
                </div>
              </div>
              <div className="flex items-center gap-5 rounded-2xl bg-mila p-6 text-white card-elevated">
                <AlertTriangle className="size-6 shrink-0 text-mila-accent" aria-hidden />
                <p className="text-sm md:text-base">
                  Cuando algo se escapa:{' '}
                  <span className="font-semibold text-mila-accent">
                    la obra que no se termina, el servicio que no llega, la confianza en el Estado.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · El enfoque */}
      <section className="mesh-mila">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mila-accent">02 · El enfoque</p>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight">
            Tecnología, <span className="text-mila-accent">más persona.</span>
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl glass-dark p-8 md:p-10">
              <div className="flex flex-col items-center gap-3 text-center">
                <ScanSearch className="size-10 text-mila-accent" aria-hidden />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                  Lo repetitivo, la máquina
                </p>
              </div>
              <ul className="mt-8 space-y-4 text-lg">
                {['Leer el expediente completo', 'Cruzarlo con cada norma', 'Rastrear lo que falta'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="size-5 shrink-0 text-mila-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-background p-8 md:p-10 text-foreground card-elevated">
              <div className="flex flex-col items-center gap-3 text-center">
                <UserCheck className="size-10 text-mila-accent" aria-hidden />
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mila-accent">
                  El juicio, la persona
                </p>
              </div>
              <ul className="mt-8 space-y-4 text-lg">
                {['El criterio', 'La experiencia', 'La resolución'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="size-5 shrink-0 text-mila-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 03 · La solución */}
      <section className="bg-[hsl(218,61%,13%)]">
        <div className="container max-w-7xl px-4 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mila-accent">03 · La solución</p>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight text-balance">
            Subís un expediente. <span className="text-mila-accent">MILA lo audita en minutos.</span>
          </h2>
          <div className="mt-12">
            <MilaWizardTour />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {['Qué cumple', 'Qué no cumple', 'En qué página mirar'].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full glass-dark px-6 py-3 text-sm font-medium"
              >
                <Check className="size-4 text-mila-accent" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · Validación */}
      <section className="bg-background text-foreground">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mila-accent">04 · Validación</p>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight">
            Usada donde el control importa.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[7fr_5fr]">
            <div className="rounded-2xl bg-mila p-8 md:p-12 text-white card-elevated">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mila-accent">Caso real</p>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <span className="stat-number text-6xl md:text-8xl">$22M</span>
                <span className="text-xl md:text-2xl text-white/75">
                  auditado en <strong className="text-mila-accent">30 segundos</strong>
                </span>
              </div>
              <p className="mt-6 text-base md:text-lg leading-relaxed text-white/85">
                MILA detectó que faltaba la intervención documentada del{' '}
                <strong>Tribunal de Cuentas</strong>, exigida por ordenanza, pero omitida. Eso solo
                ya justificaba la revisión completa del proceso.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-black/5 bg-card p-7 card-elevated text-center">
                <Image src="/logos/caf.jpg" alt="CAF" width={96} height={96} className="mx-auto rounded-lg" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">Origen</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Nacida en <strong className="text-foreground">Corrupción Cero (CAF)</strong>, entre
                  los 20 proyectos seleccionados de la región.
                </p>
              </div>
              <div className="rounded-2xl border border-black/5 bg-card p-7 card-elevated">
                <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  En uso hoy
                </p>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Image src="/logos/sigen.jpg" alt="SIGEN" width={48} height={48} className="rounded-lg" />
                    <span>Sindicatura General de la Nación, Argentina (beta)</span>
                  </div>
                  <p><strong className="text-foreground">Universidades nacionales</strong>: compras y contrataciones</p>
                  <p><strong className="text-foreground">Organismos de control</strong> evaluando implementación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 · Quiénes están detrás */}
      <section className="mesh-mila">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mila-accent">05 · Quiénes están detrás</p>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight">
            Tecnología para un mejor Gobierno.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { value: '+67%', label: 'más errores detectados vs revisión humana' },
              { value: '76%', label: 'de reducción en tiempos de validación' },
              { value: '+10M', label: 'documentos gestionados en nuestras plataformas' },
            ].map((s) => (
              <div key={s.value} className="rounded-2xl glass-dark p-8 text-center">
                <p className="stat-number text-5xl md:text-6xl text-mila-accent">{s.value}</p>
                <p className="mt-3 text-sm leading-snug text-white/75">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            Han confiado en nuestro trabajo
          </p>
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-5">
            {[
              { src: '/logos/pnud.jpg', alt: 'PNUD' },
              { src: '/logos/oei.jpg', alt: 'OEI' },
              { src: '/logos/caf.jpg', alt: 'CAF' },
              { src: '/logos/sigen.jpg', alt: 'SIGEN' },
              { src: '/logos/entre-rios.png', alt: 'Gobierno de Entre Ríos' },
            ].map((logo) => (
              <div key={logo.alt} className="flex items-center justify-center rounded-2xl bg-white p-5 shadow-[0_0_46px_rgba(240,138,87,0.25)]">
                <Image src={logo.src} alt={logo.alt} width={120} height={80} className="max-h-16 w-auto object-contain" />
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {[
              { name: 'Juan Ignacio Ulian', role: 'Founder · Politólogo · UNDP/OEI' },
              { name: 'Analía Barberio', role: 'CTO · Ciberseguridad · CAF, BID, PNUD' },
              { name: 'Pablo Martínez', role: 'Tech Lead · Sistemas públicos · CAF, BID' },
            ].map((person) => (
              <div key={person.name} className="rounded-2xl glass-dark p-6">
                <p className="text-lg font-semibold">{person.name}</p>
                <p className="mt-1 text-sm text-white/60">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 · Cómo empezar */}
      <section className="bg-background text-foreground">
        <div className="container max-w-6xl px-4 py-20 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mila-accent">06 · Cómo empezar</p>
          <h2 className="mt-4 font-headline text-3xl md:text-5xl font-bold tracking-tight">
            Uso por asiento, todo incluido.
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-black/5 bg-card p-8 md:p-12 card-elevated text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Suscripción anual
              </p>
              <div className="mt-6 flex items-baseline justify-center gap-3">
                <span className="stat-number text-6xl md:text-7xl text-mila">USD 100</span>
                <span className="text-lg text-muted-foreground">/ persona / mes</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Para el equipo de control del organismo</p>
              <ul className="mx-auto mt-8 max-w-xs space-y-4 text-left text-base text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Wrench className="size-5 shrink-0 text-mila-accent" aria-hidden />
                  Puesta a punto con tu normativa
                </li>
                <li className="flex items-center gap-3">
                  <Search className="size-5 shrink-0 text-mila-accent" aria-hidden />
                  Análisis de expedientes
                </li>
                <li className="flex items-center gap-3">
                  <GraduationCap className="size-5 shrink-0 text-mila-accent" aria-hidden />
                  Capacitación y soporte
                </li>
              </ul>
            </div>
            <div className="rounded-2xl bg-mila p-8 md:p-12 text-white card-elevated text-center">
              <div className="flex flex-col items-center gap-3">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-mila-accent">
                  Aliados fundadores
                </p>
                <span className="rounded-full border border-mila-accent/50 bg-mila-accent/10 px-5 py-1.5 text-sm font-semibold text-mila-accent">
                  5 primeros
                </span>
              </div>
              <p className="mt-8 font-headline text-3xl md:text-4xl font-bold">
                Llegar primero <span className="text-mila-accent">tiene privilegios.</span>
              </p>
              <ul className="mx-auto mt-8 max-w-sm space-y-4 text-left text-base text-white/85">
                <li className="flex items-center gap-3">
                  <Sparkles className="size-5 shrink-0 text-mila-accent" aria-hidden />
                  Acceso completo
                </li>
                <li className="flex items-center gap-3">
                  <Users className="size-5 shrink-0 text-mila-accent" aria-hidden />
                  Co-creación del producto
                </li>
                <li className="flex items-center gap-3">
                  <Gift className="size-5 shrink-0 text-mila-accent" aria-hidden />
                  Por cada asiento contratado, dos más sin costo el primer año
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Próximos pasos */}
      <section className="mesh-mila">
        <div className="container max-w-4xl px-4 py-24 md:py-36 text-center">
          <Image
            src="/products/mila/mila-logo.png"
            alt=""
            aria-hidden
            width={100}
            height={100}
            className="mx-auto h-20 w-auto drop-shadow-[0_0_50px_rgba(240,138,87,0.45)]"
          />
          <h2 className="mt-10 font-headline text-5xl md:text-7xl font-bold tracking-tight">¿Arrancamos?</h2>
          <div className="mx-auto mt-10 h-px w-32 bg-gradient-to-r from-transparent via-mila-accent to-transparent" />
          <p className="mt-10 text-2xl md:text-3xl font-bold text-mila-accent">plusbi.ar/products/mila</p>
          <p className="mt-8 inline-flex flex-wrap items-center justify-center gap-3 rounded-full glass-dark px-8 py-4 text-base">
            <Mail className="size-5 text-mila-accent" aria-hidden />
            <span className="font-semibold">Juan Ignacio Ulian</span>
            <span className="text-white/50">·</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/80 underline-offset-4 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
