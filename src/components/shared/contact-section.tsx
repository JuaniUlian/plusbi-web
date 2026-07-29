"use client";

import { useState } from 'react';
import { Copy, Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/language-context';
import { CONTACT_EMAIL } from '@/lib/products';

const content = {
  es: {
    title: '¿Hablamos?',
    subtitle: 'Contanos tu desafío y te respondemos en menos de 48 horas.',
    name: 'Nombre',
    org: 'Organismo o empresa',
    email: 'Tu email',
    message: '¿Qué problema querés resolver?',
    send: 'Enviar mensaje',
    sending: 'Enviando…',
    sentTitle: 'Mensaje enviado',
    sentDesc: 'Gracias por escribirnos. Te respondemos a la brevedad.',
    errorTitle: 'No pudimos enviar el mensaje',
    errorDesc: 'Escribinos directamente al email de abajo.',
    orEmail: 'O escribinos directo a',
    copy: 'Copiar email',
    copied: 'Email copiado',
  },
  en: {
    title: "Let's talk",
    subtitle: 'Tell us your challenge and we reply within 48 hours.',
    name: 'Name',
    org: 'Organization or company',
    email: 'Your email',
    message: 'What problem do you want to solve?',
    send: 'Send message',
    sending: 'Sending…',
    sentTitle: 'Message sent',
    sentDesc: 'Thanks for reaching out. We will get back to you shortly.',
    errorTitle: "We couldn't send your message",
    errorDesc: 'Write to us directly at the email below.',
    orEmail: 'Or email us directly at',
    copy: 'Copy email',
    copied: 'Email copied',
  },
};

/** Sección de contacto canónica con formulario + email visible. Nunca mailto como único canal. Ver DESIGN.md. */
export function ContactSection() {
  const { language } = useLanguage();
  const c = content[language];
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      toast({ title: c.sentTitle, description: c.sentDesc });
      form.reset();
    } catch {
      toast({ title: c.errorTitle, description: c.errorDesc, variant: 'destructive' });
    } finally {
      setSending(false);
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard no disponible: el email queda visible como texto */
    }
  }

  return (
    <section id="contacto" className="mesh-brand scroll-mt-20">
      <div className="container max-w-2xl px-4 py-20 md:py-28 text-center">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight md:text-5xl">{c.title}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{c.subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4 text-left glass rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">{c.name}</label>
              <Input id="contact-name" name="name" required maxLength={120} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="contact-org" className="mb-1.5 block text-sm font-medium">{c.org}</label>
              <Input id="contact-org" name="organization" maxLength={160} autoComplete="organization" />
            </div>
          </div>
          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">{c.email}</label>
            <Input id="contact-email" name="email" type="email" required maxLength={160} autoComplete="email" />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">{c.message}</label>
            <Textarea id="contact-message" name="message" required rows={4} maxLength={2000} />
          </div>
          {/* Honeypot anti-spam: oculto para humanos */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <Button type="submit" size="lg" disabled={sending} className="w-full sm:w-auto">
            <Send aria-hidden />
            {sending ? c.sending : c.send}
          </Button>
        </form>

        <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          {c.orEmail}
          <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-foreground underline-offset-4 hover:underline">
            {CONTACT_EMAIL}
          </a>
          <Button type="button" variant="ghost" size="sm" onClick={copyEmail}>
            {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
            {copied ? c.copied : c.copy}
          </Button>
        </p>
      </div>
    </section>
  );
}
