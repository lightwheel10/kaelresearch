import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendWelcomeEmail(to: string) {
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1B2A4A;">
      <div style="padding: 40px 30px; background: #0F1A2E;">
        <h1 style="color: #C9A84C; font-size: 24px; margin: 0;">Kael Research</h1>
      </div>
      
      <div style="padding: 30px; background: #ffffff;">
        <p style="font-size: 16px; line-height: 1.6;">Thanks for downloading our sample report.</p>
        
        <p style="font-size: 16px; line-height: 1.6;">
          We build market intelligence reports for companies that need real analysis, not recycled blog posts wrapped in charts. 
          Each report is built from primary data — patent filings, job postings, funding rounds, technical benchmarks — not summaries of other summaries.
        </p>

        <p style="font-size: 16px; line-height: 1.6;">
          If your team needs a custom report on a specific market, technology, or competitive landscape, reply to this email. 
          We'll scope it out and give you a timeline.
        </p>

        <p style="font-size: 16px; line-height: 1.6;">
          No sales calls. No 47-slide decks about our "methodology." Just the research.
        </p>

        <p style="font-size: 16px; line-height: 1.6; color: #666;">
          — Kael Research<br/>
          <a href="https://kaelresearch.com" style="color: #C9A84C;">kaelresearch.com</a>
        </p>
      </div>
      
      <div style="padding: 20px 30px; background: #f5f5f5; font-size: 12px; color: #999;">
        You're receiving this because you downloaded a report from Kael Research. 
        No spam, no newsletters — just this one email.
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: '"Kael Research" <contact@kaelresearch.com>',
    to,
    subject: 'Your report is ready — and a quick intro',
    html,
  });
}
