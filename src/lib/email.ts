import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to: string, pdfBuffer?: Buffer) {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1B2A4A;">
      <div style="padding: 40px 30px; background: #0F1A2E;">
        <h1 style="color: #C9A84C; font-size: 24px; margin: 0;">Kael Research</h1>
      </div>
      
      <div style="padding: 30px; background: #ffffff;">
        <p style="font-size: 16px; line-height: 1.6;">Here's the sample report you requested. It's attached as a PDF.</p>
        
        <p style="font-size: 16px; line-height: 1.6;">
          This one covers the AI Code Assistant market — competitor positioning, 
          patent filings, hiring signals, pricing models. We pulled data from 86 primary sources 
          to put it together.
        </p>

        <p style="font-size: 16px; line-height: 1.6;">
          If you need something similar for a different market or technology, 
          reply to this email with a rough brief. We'll tell you what's possible 
          and how long it would take. No pitch deck, no discovery call.
        </p>

        <p style="font-size: 16px; line-height: 1.6; color: #666;">
          — Kael Research<br/>
          <a href="https://kaelresearch.com" style="color: #C9A84C;">kaelresearch.com</a>
        </p>
      </div>
      
      <div style="padding: 20px 30px; background: #f5f5f5; font-size: 12px; color: #999;">
        You got this because you downloaded a report from kaelresearch.com. One email, that's it.
      </div>
    </div>
  `;

  const attachments = pdfBuffer
    ? [
        {
          filename: 'Kael-Research-AI-Code-Assistants-2026.pdf',
          content: pdfBuffer,
        },
      ]
    : [];

  await resend.emails.send({
    from: 'Kael Research <contact@kaelresearch.com>',
    to,
    subject: 'Your report — AI Code Assistants 2026',
    html,
    attachments,
  });
}
