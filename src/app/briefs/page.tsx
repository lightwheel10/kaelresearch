import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Briefs — Kael Research",
  description: "Free market intelligence briefs from Kael Research. Sourced data, real analysis, actionable insights for founders and investors.",
};

const NAVY = "#1B2A4A";
const GOLD = "#C9A84C";

const briefs = [
  {
    title: "AI Code Assistants",
    date: "February 2026",
    description: "$8B market. Cursor at $29.3B valuation. GitHub Copilot losing enterprise share. Full competitive analysis, adoption data, investment activity, and pricing comparison.",
    href: "/brief/ai-code-assistants",
    tag: "Market Brief",
  },
];

export default function BriefsPage() {
  return (
    <main className="min-h-screen bg-white text-[#333] selection:bg-[#C9A84C]/20 selection:text-[#1B2A4A]">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span style={{ color: NAVY }}>KAEL</span>
            <span style={{ color: GOLD }}>RESEARCH</span>
          </a>
          <a href="/#pricing" className="text-white px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-90" style={{ backgroundColor: GOLD }}>
            Order a Report
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[3px] uppercase rounded border" style={{ color: GOLD, borderColor: "rgba(201,168,76,0.4)", backgroundColor: "rgba(201,168,76,0.06)" }}>
              Free Research
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: NAVY, fontFamily: "Georgia, serif" }}>
            Research Briefs
          </h1>
          <div className="mx-auto my-6 w-16 h-px" style={{ backgroundColor: GOLD }} />
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Free market intelligence — sourced data, real analysis. Each brief covers market sizing, competitive dynamics, adoption trends, and investment activity.
          </p>
        </div>

        {/* Brief Cards */}
        <div className="grid gap-6">
          {briefs.map((brief) => (
            <a key={brief.href} href={brief.href} className="block p-8 rounded-2xl bg-[#F9FAFB] border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md group">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold tracking-[2px] uppercase px-2 py-0.5 rounded border" style={{ color: GOLD, borderColor: "rgba(201,168,76,0.4)", backgroundColor: "rgba(201,168,76,0.06)" }}>
                  {brief.tag}
                </span>
                <span className="text-xs text-gray-400">{brief.date}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-[#C9A84C] transition-colors" style={{ color: NAVY, fontFamily: "Georgia, serif" }}>
                {brief.title}
              </h2>
              <p className="text-gray-500 leading-relaxed mb-4">{brief.description}</p>
              <span className="inline-block text-sm font-medium" style={{ color: GOLD }}>Read Brief →</span>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center p-10 rounded-2xl border border-gray-200 bg-[#F9FAFB]">
          <h3 className="text-2xl font-bold mb-3" style={{ color: NAVY, fontFamily: "Georgia, serif" }}>Need deeper analysis?</h3>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">Our full reports include 30+ pages of sourced analysis, data tables, competitive matrices, and strategic recommendations.</p>
          <a href="/#pricing" className="inline-block text-white px-6 py-3 rounded-full font-medium transition-opacity hover:opacity-90" style={{ backgroundColor: GOLD }}>
            View Pricing
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10" style={{ backgroundColor: NAVY }}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-lg font-bold text-white tracking-tight">KAEL <span style={{ color: GOLD }}>RESEARCH</span></span>
            <p className="text-white/50 text-sm mt-1">&copy; 2026 Kael Research. All rights reserved.</p>
          </div>
          <a href="mailto:kaeltiwari@kaelresearch.com" className="text-white/60 text-sm hover:text-white/80 transition-colors">kaeltiwari@kaelresearch.com</a>
        </div>
      </footer>
    </main>
  );
}
