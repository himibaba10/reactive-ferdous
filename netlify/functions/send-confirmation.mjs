/**
 * Sends a branded confirmation email to the person who submitted the contact form.
 * Requires RESEND_API_KEY in Netlify environment variables.
 *
 * From-address uses the domain already verified in Resend DNS.
 */
const FROM = 'Ferdous Ahmed <contact@reactiveferdous.com>';
const SITE = 'https://portfolio.reactiveferdous.com';
const WHATSAPP = 'https://wa.me/8801997722621';
const CALENDLY = 'https://calendly.com/himibaba/new-meeting';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function confirmationHtml({ name }) {
  const greeting = name ? `Hi ${escapeHtml(name)},` : 'Hi there,';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We got your message</title>
</head>
<body style="margin:0;padding:0;background:#09090b;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#09090b;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#18181b;border:1px solid #3f3f46;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:28px 32px;background:#27272a;border-bottom:1px solid #3f3f46;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#e8f88b;">
                Ferdous Ahmed
              </p>
              <h1 style="margin:10px 0 0;font-size:28px;line-height:1.25;color:#fafafa;font-weight:700;">
                We got your message
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px;font-family:Arial,Helvetica,sans-serif;color:#d4d4d8;font-size:16px;line-height:1.6;">
              <p style="margin:0 0 16px;color:#fafafa;">${greeting}</p>
              <p style="margin:0 0 16px;">
                Thanks for reaching out. Your note is in my inbox and I&rsquo;ll reply personally within one business day — usually sooner.
              </p>
              <p style="margin:0 0 24px;">
                If your project is time-sensitive, book a free 30-minute call or message me on WhatsApp and we can talk through next steps right away.
              </p>
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 24px;">
                <tr>
                  <td style="border-radius:999px;background:#e8f88b;">
                    <a href="${CALENDLY}" style="display:inline-block;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#09090b;text-decoration:none;">
                      Book a free call
                    </a>
                  </td>
                  <td width="12"></td>
                  <td style="border-radius:999px;border:1px solid #52525b;">
                    <a href="${WHATSAPP}" style="display:inline-block;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:600;color:#e8f88b;text-decoration:none;">
                      WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:14px;color:#a1a1aa;">
                — Ferdous<br />
                <a href="${SITE}" style="color:#e8f88b;text-decoration:none;">portfolio.reactiveferdous.com</a>
                &nbsp;·&nbsp;
                <a href="mailto:contact@reactiveferdous.com" style="color:#e8f88b;text-decoration:none;">contact@reactiveferdous.com</a>
              </p>
            </td>
          </tr>
        </table>
        <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#71717a;">
          You received this because you submitted the contact form on my portfolio.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 503,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Confirmation email is not configured' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid JSON' }),
    };
  }

  // Honeypot — bots fill this; humans leave it empty.
  if (payload.company) {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ ok: true }),
    };
  }

  const name = String(payload.name || '').trim().slice(0, 100);
  const email = String(payload.email || '').trim().slice(0, 200);

  if (!isValidEmail(email)) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Valid email required' }),
    };
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
      html: confirmationHtml({ name }),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend error', response.status, detail);
    return {
      statusCode: 502,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Failed to send confirmation' }),
    };
  }

  return {
    statusCode: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true }),
  };
}
