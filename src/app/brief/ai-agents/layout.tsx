import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Agents: Market Brief — Kael Research",
  description: "$7.6B market growing to $183B by 2033 at 49.6% CAGR. Cognition (Devin) at $10.2B valuation, Sierra AI at $150M ARR. Full analysis of autonomous AI systems across coding, customer support, and enterprise. Free brief by Kael Research.",
  alternates: { canonical: "https://kaelresearch.com/brief/ai-agents" },
  openGraph: {
    title: "AI Agents: Market Brief — Kael Research",
    description: "$7.6B market growing to $183B by 2033. Cognition at $10.2B. Sierra at $150M ARR. Full analysis inside.",
    url: "https://kaelresearch.com/brief/ai-agents",
    siteName: "Kael Research",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "AI Agents: Market Brief — Kael Research",
    description: "$7.6B market growing to $183B by 2033. Cognition at $10.2B. Sierra at $150M ARR. Full analysis inside.",
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
            "headline": "AI Agents: Market Brief",
            "author": { "@type": "Organization", "name": "Kael Research", "url": "https://kaelresearch.com" },
            "publisher": { "@type": "Organization", "name": "Kael Research", "url": "https://kaelresearch.com" },
            "datePublished": "2026-02-18",
            "description": "The AI agents market hit $7.6B in 2025 and is projected to reach $183B by 2033. Full competitive analysis with market sizing, investment activity, and adoption data.",
            "mainEntityOfPage": "https://kaelresearch.com/brief/ai-agents"
          })
        }}
      />
      {children}
      <noscript>
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Georgia, serif' }}>
          <h1>AI Agents: Market Brief — Kael Research</h1>
          <p>The AI agents market was valued at $7.63 billion in 2025 and is projected to reach $182.97 billion by 2033 at a 49.6% CAGR (Grand View Research). MarketsAndMarkets projects $52.62 billion by 2030.</p>
          <h2>Key Findings</h2>
          <ul>
            <li>Cognition (Devin) reached $155M ARR, valued at $10.2B with $696M total funding</li>
            <li>Sierra AI hit $150M ARR in January 2026, valued at $10B after $350M Series C</li>
            <li>Replit grew from $16M to $253M ARR in under a year via agent-driven pivot</li>
            <li>Total disclosed funding into AI agent startups in 2024-2025 exceeds $3 billion</li>
            <li>Gartner predicts 33% of enterprise software will include agentic AI by 2028</li>
            <li>Customer support is the most mature use case, followed by coding and sales</li>
          </ul>
          <h2>Competitive Field</h2>
          <p>Cognition (Devin): $155M ARR, $10.2B valuation, autonomous coding agent. Sierra AI: $150M ARR, $10B valuation, customer service agents. Replit: $253M ARR, $3B valuation, agent-driven app building. Anthropic: MCP protocol becoming the standard. OpenAI: Operator and Codex agents. LangChain: $1.25B valuation, agent infrastructure.</p>
          <h2>Investment Activity</h2>
          <p>Sierra AI Series C: $350M at $10B (Sep 2025). Cognition latest: $400M at $10.2B (Sep 2025). Replit growth: $250M at $3B (Sep 2025). Magic.dev Series B: $320M at $1.5B (Aug 2024). Harvey AI Series C: $100M at $3B (2025). LangChain Series B: $125M at $1.25B (Oct 2025).</p>
          <p>Published February 2026 by Kael Research. For full analysis, visit kaelresearch.com.</p>
        </div>
      </noscript>
    </>
  );
}
