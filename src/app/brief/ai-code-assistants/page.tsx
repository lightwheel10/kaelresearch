import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Code Assistants: Market Brief — Kael Research",
  description:
    "The AI code assistant market hit $8B in 2025. Cursor raised at $29.3B. GitHub Copilot is losing share. Full market analysis with investment activity, competitive field, and adoption data.",
  openGraph: {
    title: "AI Code Assistants: Market Brief — Kael Research",
    description:
      "The AI code assistant market hit $8B. Cursor raised at $29.3B. Full analysis inside.",
    url: "https://kaelresearch.com/brief/ai-code-assistants",
    siteName: "Kael Research",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "AI Code Assistants: Market Brief — Kael Research",
    description:
      "The AI code assistant market hit $8B. Cursor raised at $29.3B. Full analysis inside.",
  },
};

const NAVY = "#1B2A4A";
const GOLD = "#C9A84C";

const investmentData = [
  { company: "Cursor (Anysphere)", event: "Series D", amount: "$2.3B", valuation: "$29.3B", date: "Nov 2025" },
  { company: "Cursor (Anysphere)", event: "Series C", amount: "~$900M", valuation: "$9.9B", date: "Jun 2025" },
  { company: "Cursor (Anysphere)", event: "Series B", amount: "$105M", valuation: "$2.5B", date: "Dec 2024" },
  { company: "Augment Code", event: "Series B", amount: "$252M", valuation: "~$2B (est.)", date: "Mid 2025" },
  { company: "Codeium (Windsurf)", event: "Acquired by Cognition", amount: "Undisclosed", valuation: "$1.25B (last round)", date: "Jul 2025" },
  { company: "Codeium (Windsurf)", event: "Series C", amount: "$150M", valuation: "$1.25B", date: "Aug 2024" },
  { company: "Replit", event: "Series B", amount: "$97.4M", valuation: "$1.16B", date: "Apr 2023" },
  { company: "Supermaven", event: "Acquired by Cursor", amount: "Undisclosed", valuation: "—", date: "Late 2024" },
];

export default function AICodeAssistantsBrief() {
  return (
    <main className="min-h-screen bg-white text-[#333] selection:bg-[#C9A84C]/20 selection:text-[#1B2A4A]">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span style={{ color: NAVY }}>KAEL</span>
            <span style={{ color: GOLD }}>RESEARCH</span>
          </a>
          <a
            href="/#pricing"
            className="text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            Order a Report
          </a>
        </div>
      </nav>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Title block */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[10px] font-bold tracking-[2px] uppercase px-3 py-1 rounded border"
              style={{ color: GOLD, borderColor: "rgba(201,168,76,0.4)", backgroundColor: "rgba(201,168,76,0.06)" }}
            >
              Market Brief
            </span>
            <span className="text-sm text-gray-400">February 2026</span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4"
            style={{ color: NAVY, fontFamily: 'Georgia, serif' }}
          >
            AI Code Assistants
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed max-w-3xl">
            The AI code assistant market has gone from a curiosity to an $8 billion sector in under three years. This brief covers market sizing, the competitive field, adoption patterns, key trends, and recent investment activity.
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-0.5 mb-12" style={{ backgroundColor: GOLD }} />

        {/* Executive Summary */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>
            Executive Summary
          </h2>
          <p className="text-base leading-relaxed text-gray-600 mb-4">
            Cursor — a company most VCs hadn&apos;t heard of in early 2024 — hit $500M ARR by May 2025 and raised at a $29.3 billion valuation by November. That single data point tells you everything about the velocity of this market. Developer tools have never moved this fast.
          </p>
          <p className="text-base leading-relaxed text-gray-600 mb-4">
            What makes this moment interesting for investors isn&apos;t just the growth. It&apos;s the structural shift. GitHub Copilot, which once looked like a lock for market dominance, is losing enterprise share to a wave of IDE-native competitors that offer deeper integration and more control. Meanwhile, Cognition acquired Codeium/Windsurf, consolidation is picking up, and open-source code models are eroding the moat that proprietary solutions thought they had.
          </p>
          <p className="text-base leading-relaxed text-gray-600">
            The bottom line: this is a real market with real revenue, but valuations are stretched and the competitive dynamics are shifting fast.
          </p>
        </section>

        {/* Market Size */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>
            Market Size &amp; Growth
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { val: "$4.86B", label: "Market Size (2023)" },
              { val: "$8.14B", label: "Market Size (2025)" },
              { val: "27.1%", label: "CAGR to 2030" },
              { val: "38%", label: "North America Share" },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
                <div className="text-2xl font-bold" style={{ color: NAVY }}>{s.val}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-base leading-relaxed text-gray-600 mb-4">
            <strong>Grand View Research</strong> sizes the global AI code tools market at $4.86 billion in 2023, projecting $26 billion by 2030 at a 27.1% CAGR. <strong>MarketsAndMarkets</strong> (January 2026) pegs it at $8.14 billion in 2025, growing to $127 billion by 2032 at a 48.1% CAGR.
          </p>
          <p className="text-base leading-relaxed text-gray-600">
            A more grounded way to size this: GitHub Copilot alone generates an estimated $400–500M in annual revenue. Cursor is at $500M ARR. Add Codeium ($82M), Tabnine (~$50M), Amazon Q Developer, and the long tail, and you get roughly $1.5–2B in actual product revenue today. Two players account for more than half of all revenue.
          </p>
        </section>

        {/* Competitive Field */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>
            Competitive Field
          </h2>

          {[
            {
              name: "GitHub Copilot (Microsoft)",
              text: "The incumbent. 1.8M+ paid subscribers as of late 2025. Priced at $10/month individual, $19/month business, $39/month enterprise. But developers increasingly report that purpose-built alternatives outperform it on complex tasks — multi-file edits, codebase-aware suggestions, and agentic workflows.",
            },
            {
              name: "Cursor (Anysphere)",
              text: "The breakout story. Revenue went from $1M ARR → $500M ARR in roughly 18 months. Raised $2.3B in November 2025 at a $29.3B valuation. Users include engineering teams at OpenAI, Shopify, Midjourney, and Perplexity. At $500M ARR, it trades at ~59x revenue.",
            },
            {
              name: "Codeium / Windsurf → Cognition",
              text: "Reached $82M ARR with 800,000+ active developers and 1,000+ enterprise customers including Zillow, Dell, and Anduril. Acquired by Cognition (makers of Devin) in July 2025 — signaling consolidation between code assistants and autonomous coding agents.",
            },
            {
              name: "Amazon Q Developer",
              text: "Rebranded from CodeWhisperer in April 2024. Free tier for individuals, enterprise tier integrates with AWS services. The strategic play: lock developers into the AWS ecosystem.",
            },
            {
              name: "Tabnine",
              text: "The original AI code completion tool, predating Copilot by years. Pivoted toward enterprise with on-premise deployment and privacy-first positioning. ~$50M ARR range. In a market moving toward agentic coding, Tabnine's autocomplete-centric model looks increasingly dated.",
            },
            {
              name: "Others",
              text: "Sourcegraph/Cody (enterprise code intelligence), Replit (AI-native IDE for prototyping, $1.16B valuation), JetBrains AI Assistant, Augment Code ($252M raised, enterprise agents), Qodo (test generation), and a long tail of smaller players.",
            },
          ].map((c) => (
            <div key={c.name} className="mb-8">
              <h3 className="text-lg font-semibold mb-2" style={{ color: NAVY }}>{c.name}</h3>
              <p className="text-base leading-relaxed text-gray-600">{c.text}</p>
            </div>
          ))}
        </section>

        {/* Enterprise Adoption */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>
            Enterprise Adoption
          </h2>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
            <p className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: GOLD }}>
              Stack Overflow 2024 Developer Survey
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { val: "76%", label: "Using or planning to use AI tools" },
                { val: "62%", label: "Actively using AI tools today" },
                { val: "81%", label: "Cite increased productivity" },
                { val: "45%", label: "Say AI is bad at complex tasks" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold" style={{ color: NAVY }}>{s.val}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-base leading-relaxed text-gray-600 mb-4">
            Large enterprises (5,000+ engineers) tend to standardize on Copilot or Amazon Q due to existing vendor relationships. Mid-market companies (100–1,000 engineers) increasingly choose Cursor or Codeium for better performance. Startups overwhelmingly default to Cursor.
          </p>
          <p className="text-base leading-relaxed text-gray-600">
            A notable pattern: many organizations now run multiple tools simultaneously. A developer might use Copilot for inline completions while using Cursor for complex refactoring tasks. Market share isn&apos;t zero-sum at the individual level.
          </p>
        </section>

        {/* Key Trends */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>
            Key Trends
          </h2>
          {[
            {
              title: "1. Copilot's enterprise grip is loosening",
              text: "GitHub Copilot still leads in total users, but growth has slowed. Enterprise customers report dissatisfaction with suggestion quality for large codebases. Cursor's enterprise pipeline — companies like Shopify, OpenAI, and Stripe — directly erodes Copilot's core market.",
            },
            {
              title: "2. The IDE is the new battleground",
              text: 'The shift from "AI as plugin" (Copilot in VS Code) to "AI as the IDE" (Cursor, Windsurf) represents a fundamental architectural change. When AI is the editor, it can do things plugins can\'t — multi-file edits, codebase-wide refactoring, inline diff previews.',
            },
            {
              title: "3. Agentic coding is the next frontier",
              text: 'The market is moving from "AI that suggests code" to "AI that writes, tests, and deploys code." This shift will expand the TAM significantly — agents can do the work of junior engineers, not just speed up senior ones.',
            },
            {
              title: "4. Open-source models are closing the gap",
              text: "Meta's Code Llama, Mistral's Codestral, DeepSeek Coder V2, and StarCoder 2 now approach proprietary model quality for many coding tasks. The model layer is commoditizing — differentiation is moving to the IDE experience and workflow integration.",
            },
            {
              title: "5. Consolidation has started",
              text: "Cognition acquiring Codeium. Cursor acquiring Supermaven. These are early signals. Companies with strong enterprise books but weaker products (Tabnine, Sourcegraph) are acquisition candidates.",
            },
          ].map((t) => (
            <div key={t.title} className="mb-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: NAVY }}>{t.title}</h3>
              <p className="text-base leading-relaxed text-gray-600">{t.text}</p>
            </div>
          ))}
        </section>

        {/* Investment Activity */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>
            Investment Activity
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr style={{ backgroundColor: NAVY }}>
                  <th className="px-4 py-3 text-sm font-bold text-white">Company</th>
                  <th className="px-4 py-3 text-sm font-bold text-white">Event</th>
                  <th className="px-4 py-3 text-sm font-bold text-white text-right">Amount</th>
                  <th className="px-4 py-3 text-sm font-bold text-white text-right">Valuation</th>
                  <th className="px-4 py-3 text-sm font-bold text-white text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {investmentData.map((row, i) => (
                  <tr key={`${row.company}-${row.event}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 text-sm font-medium border-t border-gray-100" style={{ color: NAVY }}>{row.company}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100">{row.event}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100 text-right font-medium">{row.amount}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 border-t border-gray-100 text-right">{row.valuation}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 border-t border-gray-100 text-right">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Total disclosed funding into AI code assistant startups in 2024–2025 exceeds <strong>$4 billion</strong>. Cursor alone accounts for over $3.3B. Key investors with repeat exposure: Thrive Capital, Andreessen Horowitz, Index Ventures, Benchmark, General Catalyst.
          </p>
        </section>

        {/* What This Means */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>
            What This Means for Investors
          </h2>
          {[
            { title: "Late-stage entry is risky.", text: "Cursor at $29.3B is priced for perfection. At 59x ARR, you need to believe revenue continues doubling — and that's before accounting for potential churn as AI models commoditize." },
            { title: "Enterprise is where the money is.", text: "Individual developer subscriptions drove early growth, but durable revenue runs through enterprise contracts — annual commitments, higher ARPU, lower churn." },
            { title: "Watch the consolidation.", text: "Cognition buying Codeium won't be the last deal. Tabnine, Sourcegraph/Cody, and smaller players are all potential targets. For PE and growth equity, there may be opportunities to buy undervalued code intelligence companies." },
            { title: "The model layer is not the moat.", text: 'Any company whose primary advantage is "we use GPT-4" or "we fine-tuned a model" is building on sand. The moat is in the IDE experience, the codebase graph, the developer workflow.' },
            { title: "Don't ignore platform risk.", text: "Microsoft owns VS Code, GitHub, and the enterprise distribution channel. If Microsoft makes Copilot free, it compresses the entire market." },
            { title: "Adjacent opportunities matter.", text: "Code review, testing automation, CI/CD intelligence, and documentation generation are expanding alongside code assistants — often at more reasonable valuations." },
          ].map((item) => (
            <div key={item.title} className="mb-5 flex items-start gap-3">
              <span className="mt-2 flex-shrink-0 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: GOLD }} />
              <p className="text-base leading-relaxed text-gray-600">
                <strong style={{ color: NAVY }}>{item.title}</strong> {item.text}
              </p>
            </div>
          ))}
        </section>

        {/* Divider */}
        <div className="w-16 h-0.5 mb-12" style={{ backgroundColor: GOLD }} />

        {/* CTA */}
        <section className="text-center py-12 px-6 bg-gray-50 border border-gray-200 rounded-2xl">
          <h2 className="text-2xl font-bold mb-3" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>
            Want the Full Report?
          </h2>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">
            This is the free brief. The full report includes 30+ pages of analysis, data tables, competitive matrices, and strategic recommendations — delivered as a polished PDF.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/#pricing"
              className="text-white px-6 py-3 rounded-full font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD }}
            >
              View Pricing
            </a>
            <a
              href="mailto:kaeltiwari@kaelresearch.com"
              className="text-gray-600 px-6 py-3 rounded-full font-medium border border-gray-300 hover:bg-white transition-colors"
            >
              Contact Us
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            kaeltiwari@kaelresearch.com — Custom analysis available.
          </p>
        </section>
      </article>

      {/* Footer */}
      <footer className="py-10" style={{ backgroundColor: NAVY }}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-lg font-bold text-white tracking-tight">
              KAEL <span style={{ color: GOLD }}>RESEARCH</span>
            </span>
            <p className="text-white/50 text-sm mt-1">&copy; 2026 Kael Research. All rights reserved.</p>
          </div>
          <a href="mailto:kaeltiwari@kaelresearch.com" className="text-white/60 text-sm hover:text-white/80 transition-colors">
            kaeltiwari@kaelresearch.com
          </a>
        </div>
      </footer>
    </main>
  );
}
