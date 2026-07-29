import { NextResponse } from 'next/server';

const CONTACT_TO = 'juan.ulian@pluscompol.com';

/**
 * Recibe el formulario de contacto y lo envía por email vía Resend.
 * Requiere RESEND_API_KEY en el entorno; opcionalmente CONTACT_FROM
 * (remitente verificado en Resend, por defecto onboarding@resend.dev).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim().slice(0, 120);
  const organization = String(body.organization ?? '').trim().slice(0, 160);
  const email = String(body.email ?? '').trim().slice(0, 160);
  const message = String(body.message ?? '').trim().slice(0, 2000);
  const honeypot = String(body.website ?? '');

  // Bots completan el campo oculto: respondemos ok sin enviar nada
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'invalid_fields' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? 'PLUS BI Web <onboarding@resend.dev>',
      to: [CONTACT_TO],
      reply_to: email,
      subject: `Contacto web: ${name}${organization ? ` (${organization})` : ''}`,
      text: `Nombre: ${name}\nOrganismo: ${organization || '-'}\nEmail: ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
