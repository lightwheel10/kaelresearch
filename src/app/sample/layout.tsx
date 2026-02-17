import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sample Report: AI Code Assistants — Kael Research",
  description: "Free sample of Kael Research's market intelligence. Full report on the $8B AI code assistant market: market sizing, competitive landscape, Cursor deep dive, feature comparison, pricing analysis, developer adoption trends, and investment activity.",
  alternates: { canonical: "https://kaelresearch.com/sample" },
  openGraph: {
    title: "Sample Report: AI Code Assistants — Kael Research",
    description: "Free sample market report. $8B AI code assistant market analysis with competitive landscape, pricing, and investment data.",
    url: "https://kaelresearch.com/sample",
    siteName: "Kael Research",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Sample Report: AI Code Assistants — Kael Research",
    description: "Free sample market report. $8B AI code assistant market with full competitive analysis.",
  },
};

export default function SampleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "AI Code Assistants: Sample Market Report",
            "author": { "@type": "Organization", "name": "Kael Research", "url": "https://kaelresearch.com" },
            "publisher": { "@type": "Organization", "name": "Kael Research", "url": "https://kaelresearch.com" },
            "datePublished": "2026-02-18",
            "description": "Sample market intelligence report on the AI code assistant market by Kael Research.",
            "mainEntityOfPage": "https://kaelresearch.com/sample"
          })
        }}
      />
      {children}
      <noscript>
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Georgia, serif' }}>
          <h1>AI Code Assistants: Sample Market Report — Kael Research</h1>
          <p>This is a sample of Kael Research&apos;s market intelligence reports. Our reports combine sourced data, verified numbers, and actionable strategy for venture capital and growth equity investors.</p>
          <h2>Report Overview</h2>
          <p>The AI code assistant market was valued at $4.86 billion in 2023 and is projected to reach $26 billion by 2030 at a 27.1% CAGR. MarketsAndMarkets estimates $8.14 billion in 2025.</p>
          <h2>What&apos;s Inside</h2>
          <ul>
            <li>Executive Summary with key market metrics ($4.86B market size, 27.1% CAGR, $500M Cursor ARR, 76% developer adoption)</li>
            <li>Market Sizing: TAM/SAM/SOM analysis with growth drivers and constraints</li>
            <li>Competitive Landscape: Market share analysis, competitor breakdown with revenue data</li>
            <li>Deep Dive: Cursor — $400M to $29.3B valuation in 15 months</li>
            <li>Deep Dive: Codeium/Windsurf — $82M ARR, acquired by Cognition</li>
            <li>Feature Comparison: Radar charts and feature matrix across 5 competitors</li>
            <li>Pricing Comparison: Individual ($10-20/mo) and Enterprise ($19-60/mo) tiers</li>
            <li>Developer Adoption Trends: Stack Overflow survey data, NPS scores</li>
            <li>Investment Activity: $4B+ total funding, key deals and valuations</li>
            <li>Strategic Recommendations for investors</li>
          </ul>
          <p>Published February 2026 by Kael Research. Visit kaelresearch.com for more.</p>
        </div>
      </noscript>
    </>
  );
}
