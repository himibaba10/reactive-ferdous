/**
 * Modern Netlify Function (Request/Response API).
 * Available at /api/confirm-contact after deploy.
 * Requires RESEND_API_KEY in Netlify env (Functions scope).
 */

const FROM = 'Ferdous Ahmed <contact@reactiveferdous.com>';
const SITE = 'https://portfolio.reactiveferdous.com';
const WHATSAPP = 'https://wa.me/8801997722621';
const CALENDLY = 'https://calendly.com/himibaba/new-meeting';

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  if (req.method === 'GET') {
    return Response.json(
      {
        ok: true,
        function: 'send-confirmation',
        hasResendKey: Boolean(process.env.RESEND_API_KEY),
      },
      { headers: corsHeaders() }
    );
  }

  if (req.method !== 'POST') {
    return Response.json(
      { error: 'Method not allowed' },
      { status: 405, headers: corsHeaders() }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: 'Confirmation email is not configured' },
      { status: 503, headers: corsHeaders() }
    );
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return Response.json(
      { error: 'Invalid JSON' },
      { status: 400, headers: corsHeaders() }
    );
  }

  if (payload.company) {
    return Response.json({ ok: true }, { headers: corsHeaders() });
  }

  const name = String(payload.name || '').trim().slice(0, 100);
  const email = String(payload.email || '').trim().slice(0, 200);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: 'Valid email required' },
      { status: 400, headers: corsHeaders() }
    );
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [email],
      reply_to: 'contact@reactiveferdous.com',
      subject: 'We got your message — Ferdous Ahmed',
      html: confirmationHtml(name),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend error', response.status, detail);
    return Response.json(
      { error: 'Failed to send confirmation', detail },
      { status: 502, headers: corsHeaders() }
    );
  }

  return Response.json({ ok: true }, { headers: corsHeaders() });
};

export const config = {
  path: '/api/confirm-contact',
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function confirmationHtml(name) {
  const greeting = name ? `Hi ${escapeHtml(name)},` : 'Hi there,';
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>We got your message</title></head>
<body style="margin:0;padding:0;background:#09090b;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#09090b;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#18181b;border:1px solid #3f3f46;border-radius:16px;overflow:hidden;">
        <tr><td style="padding:28px 32px;background:#27272a;border-bottom:1px solid #3f3f46;">
          <p style="margin:0;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#e8f88b;">Ferdous Ahmed</p>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.25;color:#fafafa;">We got your message</h1>
        </td></tr>
        <tr><td style="padding:28px 32px;color:#d4d4d8;font-size:16px;line-height:1.6;">
          <p style="margin:0 0 16px;color:#fafafa;">${greeting}</p>
          <p style="margin:0 0 16px;">Thanks for reaching out. Your note is in my inbox and I&rsquo;ll reply personally within one business day — usually sooner.</p>
          <p style="margin:0 0 24px;">If your project is time-sensitive, book a free 30-minute call or message me on WhatsApp.</p>
          <p style="margin:0 0 24px;">
            <a href="${CALENDLY}" style="display:inline-block;padding:12px 22px;background:#e8f88b;color:#09090b;font-weight:700;text-decoration:none;border-radius:999px;">Book a free call</a>
            &nbsp;
            <a href="${WHATSAPP}" style="display:inline-block;padding:12px 22px;border:1px solid #52525b;color:#e8f88b;font-weight:600;text-decoration:none;border-radius:999px;">WhatsApp</a>
          </p>
          <p style="margin:0;font-size:14px;color:#a1a1aa;">— Ferdous<br />
            <a href="${SITE}" style="color:#e8f88b;text-decoration:none;">portfolio.reactiveferdous.com</a>
            · <a href="mailto:contact@reactiveferdous.com" style="color:#e8f88b;text-decoration:none;">contact@reactiveferdous.com</a>
          </p>
        </td></tr>
      </table>
      <p style="margin:20px 0 0;font-size:12px;color:#71717a;">You received this because you submitted the contact form on my portfolio.</p>
    </td></tr>
  </table>
</body></html>`;
}
