import Stripe from 'stripe';
import { randomBytes } from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function generateLicenceKey() {
  const seg = () => randomBytes(3).toString('hex').toUpperCase();
  return `ARB-${seg()}-${seg()}-${seg()}-${seg()}`;
}

async function sendEmail(to, licenceKey) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'ArbiBet <noreply@getarbibet.com>',
      to,
      subject: 'Your ArbiBet licence key',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#080a08;color:#d4dbd4;padding:40px;border-radius:12px">
          <h1 style="font-size:24px;color:#ffffff;margin-bottom:8px">You're in.</h1>
          <p style="color:#748074;margin-bottom:24px">Thanks for purchasing ArbiBet. Here's everything you need to get started.</p>

          <div style="background:#0e110e;border:1px solid #242924;border-radius:8px;padding:20px;margin-bottom:24px">
            <p style="font-size:11px;color:#3e463e;letter-spacing:2px;font-family:monospace;margin-bottom:8px">YOUR LICENCE KEY</p>
            <p style="font-size:20px;font-family:monospace;color:#00d472;letter-spacing:2px;margin:0">${licenceKey}</p>
          </div>

          <p style="color:#748074;margin-bottom:20px">Keep this safe — you'll need it on first launch and if you reinstall.</p>

          <p style="font-weight:600;color:#fff;margin-bottom:12px">Getting started in 3 steps:</p>
          <ol style="color:#748074;line-height:2;padding-left:20px">
            <li>Download and run <strong style="color:#fff">ArbiBet.exe</strong> from the link below</li>
            <li>Get a free API key at <a href="https://the-odds-api.com" style="color:#00d472">the-odds-api.com</a></li>
            <li>Enter your licence key and API key on first launch</li>
          </ol>

          <a href="https://drive.google.com/file/d/1zt0Y_Wg87mij4B_KGZpt4XsusqNNrmz1/view?usp=drive_link" style="display:inline-block;margin-top:28px;background:#00d472;color:#000;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px">
            Download ArbiBet
          </a>

          <p style="margin-top:32px;font-size:12px;color:#3e463e">
            Any issues? Reply to this email and we'll sort it out.<br/>
            — The ArbiBet Team
          </p>
        </div>
      `,
    }),
  });

  if (!res.ok) throw new Error(`Email failed: ${await res.text()}`);
}

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const rawBody = Buffer.concat(chunks);
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details?.email;

    if (email) {
      const licenceKey = generateLicenceKey();
      console.log(`LICENCE ISSUED: ${email} → ${licenceKey}`);
      try {
        await sendEmail(email, licenceKey);
      } catch (err) {
        console.error('Email error:', err.message);
      }
    }
  }

  res.status(200).json({ received: true });
}
