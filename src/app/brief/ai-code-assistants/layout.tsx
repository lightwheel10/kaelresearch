import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Code Assistants: Market Brief — Kael Research",
  description: "The AI code assistant market hit $8B in 2025. Cursor raised at $29.3B. GitHub Copilot is losing enterprise share. Full market analysis with competitive field, adoption data, investment activity, and pricing comparison. Free brief by Kael Research.",
  alternates: { canonical: "https://kaelresearch.com/brief/ai-code-assistants" },
  openGraph: {
    title: "AI Code Assistants: Market Brief — Kael Research",
    description: "The AI code assistant market hit $8B. Cursor raised at $29.3B. Full competitive analysis inside.",
    url: "https://kaelresearch.com/brief/ai-code-assistants",
    siteName: "Kael Research",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "AI Code Assistants: Market Brief — Kael Research",
    description: "The AI code assistant market hit $8B. Cursor raised at $29.3B. Full analysis inside.",
  },
};

export default function BriefLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "AI Code Assistants: Market Brief",
            "author": { "@type": "Organization", "name": "Kael Research", "url": "https://kaelresearch.com" },
            "publisher": { "@type": "Organization", "name": "Kael Research", "url": "https://kaelresearch.com" },
            "datePublished": "2026-02-18",
            "description": "The AI code assistant market hit $8B in 2025. Full competitive analysis with market sizing, adoption data, investment activity.",
            "mainEntityOfPage": "https://kaelresearch.com/brief/ai-code-assistants"
          })
        }}
      />
      {children}
      <noscript>
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Georgia, serif' }}>
          <h1>AI Code Assistants: Market Brief — Kael Research</h1>
          <p>The AI code assistant market was valued at $4.86 billion in 2023 and is projected to reach $26 billion by 2030 at a 27.1% CAGR (Grand View Research). MarketsAndMarkets estimates $8.14 billion in 2025.</p>
          <h2>Key Findings</h2>
          <ul>
            <li>Cursor (Anysphere) reached $500M ARR by May 2025, raised $2.3B at $29.3B valuation in November 2025</li>
            <li>GitHub Copilot has ~42% market share but declining from ~55% in early 2024</li>
            <li>76% of developers are using or planning to use AI coding tools (Stack Overflow 2024)</li>
            <li>62% of developers actively use AI tools daily, up from 44% in 2023</li>
            <li>Cognition acquired Codeium/Windsurf ($82M ARR, 800K+ developers) in July 2025</li>
            <li>Total funding in AI code assistants exceeded $4 billion in 2024-2025</li>
          </ul>
          <h2>Competitive Field</h2>
          <p>GitHub Copilot (Microsoft): 1.8M+ paid subscribers, $10-39/mo. Cursor (Anysphere): $500M ARR, fastest-growing SaaS in history. Codeium/Windsurf: $82M ARR, acquired by Cognition. Amazon Q Developer. Tabnine (~$50M ARR). Augment Code ($252M raised). Replit ($1.16B valuation).</p>
          <h2>Investment Activity</h2>
          <p>Cursor Series D: $2.3B at $29.3B (Nov 2025). Cursor Series C: ~$900M at $9.9B (Jun 2025). Augment Code Series B: $252M (Mid 2025). Codeium Series C: $150M at $1.25B (Aug 2024). Replit Series B: $97.4M at $1.16B (Apr 2023).</p>
          <p>Published February 2026 by Kael Research. For full analysis, visit kaelresearch.com.</p>
        </div>
      </noscript>
    </>
  );
}
