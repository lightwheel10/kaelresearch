'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, AreaChart, Area
} from 'recharts';

// ── Data ──────────────────────────────────────────────────────────────

const marketSizeData = [
  { year: '2023', tam: 8.2, sam: 3.1, som: 1.1 },
  { year: '2024', tam: 12.5, sam: 5.4, som: 2.1 },
  { year: '2025', tam: 18.1, sam: 8.7, som: 5.8 },
  { year: '2026P', tam: 24.0, sam: 13.2, som: 9.4 },
];

const marketShareData = [
  { name: 'GitHub Copilot', value: 42, revenue: '$2.44B', color: '#f59e0b' },
  { name: 'Cursor', value: 10, revenue: '$0.58B', color: '#3b82f6' },
  { name: 'Windsurf', value: 7, revenue: '$0.41B', color: '#10b981' },
  { name: 'Amazon Q', value: 6, revenue: '$0.35B', color: '#8b5cf6' },
  { name: 'Tabnine', value: 4, revenue: '$0.23B', color: '#ef4444' },
  { name: 'JetBrains AI', value: 3.5, revenue: '$0.20B', color: '#ec4899' },
  { name: 'Others', value: 27.5, revenue: '$1.42B', color: '#475569' },
];

const adoptionData = [
  { year: '2023', tried: 44, daily: 27, cantLiveWithout: 15, resist: 31 },
  { year: '2024', tried: 62, daily: 41, cantLiveWithout: 24, resist: 24 },
  { year: '2025', tried: 76, daily: 52, cantLiveWithout: 34, resist: 18 },
];

const npsData = [
  { name: 'Cursor', nps: 62, change: '+18' },
  { name: 'Windsurf', nps: 45, change: '+22' },
  { name: 'Copilot', nps: 38, change: '-7' },
  { name: 'Amazon Q', nps: 12, change: '+5' },
  { name: 'Tabnine', nps: 8, change: '-15' },
];

const radarData = [
  { feature: 'Autocomplete', copilot: 90, cursor: 92, windsurf: 88 },
  { feature: 'Multi-file Edit', copilot: 75, cursor: 95, windsurf: 85 },
  { feature: 'Codebase Aware', copilot: 60, cursor: 95, windsurf: 80 },
  { feature: 'Agentic Tasks', copilot: 70, cursor: 90, windsurf: 85 },
  { feature: 'Enterprise', copilot: 95, cursor: 70, windsurf: 75 },
  { feature: 'Ecosystem', copilot: 95, cursor: 65, windsurf: 60 },
];

const yoyGrowthData = [
  { name: 'Cursor', growth: 340 },
  { name: 'Windsurf', growth: 185 },
  { name: 'JetBrains AI', growth: 120 },
  { name: 'Google Gemini', growth: 95 },
  { name: 'Copilot', growth: 68 },
  { name: 'Amazon Q', growth: 42 },
  { name: 'Tabnine', growth: 15 },
];

const copilotShareDecline = [
  { quarter: 'Q1 2024', share: 55 },
  { quarter: 'Q2 2024', share: 52 },
  { quarter: 'Q3 2024', share: 49 },
  { quarter: 'Q4 2024', share: 46 },
  { quarter: 'Q1 2025', share: 44 },
  { quarter: 'Q2 2025', share: 43 },
  { quarter: 'Q3 2025', share: 42.5 },
  { quarter: 'Q4 2025', share: 42 },
];

// ── Components ────────────────────────────────────────────────────────

function StatCard({ value, label, subtext }: { value: string; label: string; subtext?: string }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 text-center">
      <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">{value}</div>
      <div className="text-sm text-white font-medium mb-1">{label}</div>
      {subtext && <div className="text-xs text-slate-500">{subtext}</div>}
    </div>
  );
}

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10 pt-16 border-t border-slate-800">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-mono text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded">SECTION {number}</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
      {subtitle && <p className="text-lg text-slate-400 max-w-3xl">{subtitle}</p>}
    </div>
  );
}

function SourceNote({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-slate-600 mt-3 italic">{children}</p>;
}

function KeyInsight({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-500/5 border-l-2 border-amber-500 pl-5 pr-4 py-4 my-6 rounded-r-lg">
      <div className="text-xs font-mono text-amber-500 mb-1.5">KEY INSIGHT</div>
      <p className="text-slate-300 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

function CompetitorCard({ name, revenue, share, growth, color, rank }: {
  name: string; revenue: string; share: string; growth: string; color: string; rank: number;
}) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-600">#{rank}</span>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <span className="font-semibold text-white">{name}</span>
        </div>
        <span className="text-xs text-slate-500">{share} share</span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold text-white">{revenue}</div>
          <div className="text-xs text-slate-500">Est. Revenue 2025</div>
        </div>
        <div className={`text-sm font-medium ${parseInt(growth) > 100 ? 'text-green-400' : parseInt(growth) > 50 ? 'text-amber-400' : 'text-slate-400'}`}>
          {growth} YoY
        </div>
      </div>
    </div>
  );
}

function FeatureRow({ feature, scores }: { feature: string; scores: { name: string; score: string; color: string }[] }) {
  return (
    <div className="grid grid-cols-6 gap-2 py-3 border-b border-slate-800/50 items-center">
      <div className="col-span-1 text-sm text-slate-300 font-medium">{feature}</div>
      {scores.map((s, i) => (
        <div key={i} className="text-center">
          <span className={`text-sm ${s.score === '✅' ? 'text-green-400' : s.score === '⚠️' ? 'text-amber-400' : 'text-red-400'}`}>
            {s.score}
          </span>
        </div>
      ))}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm">
          <span className="text-slate-400">{p.name}: </span>
          <span className="text-white font-medium">${p.value}B</span>
        </p>
      ))}
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────

export default function SampleReportPage() {
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && localStorage.getItem('kael_email')) {
      setAuthorized(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) { setError('Enter a valid email.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        localStorage.setItem('kael_email', email);
        setAuthorized(true);
      } else { setError('Something went wrong.'); }
    } catch { setError('Network error.'); }
    setLoading(false);
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Read the Full Sample Report</h2>
          <p className="text-slate-400 text-sm mb-6">Drop your email to unlock instant access. No spam.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-medium rounded-lg transition-colors">
              {loading ? 'Unlocking...' : 'Unlock Report'}
            </button>
          </form>
          <p className="text-slate-500 text-xs mt-4 text-center">Or <Link href="/" className="text-amber-400 hover:underline">go back home</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/5 rounded-full blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="text-white">KAEL</span>
            <span className="text-amber-400">RESEARCH</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs uppercase tracking-widest text-amber-400 border border-amber-400/30 px-3 py-1 rounded-full">
              Sample Report
            </span>
            <a href="/api/pdf" className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm px-4 py-2 rounded-full transition-colors border border-slate-700">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Download PDF
            </a>
            <Link href="/#pricing" className="hidden md:block bg-amber-600 hover:bg-amber-500 text-white text-sm px-4 py-2 rounded-full transition-colors">
              Order a Report
            </Link>
          </div>
        </div>
      </nav>

      {/* Report Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-16">

        {/* ═══ COVER ═══ */}
        <div className="text-center mb-20 pt-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-xs font-medium text-amber-400 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            SAMPLE REPORT — FEBRUARY 2026
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            The AI Code Assistant Market
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 mb-8">2026 Landscape Analysis</p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 mb-10">
            <span>Prepared by <span className="text-amber-400">Kael Research</span></span>
            <span className="hidden sm:inline">|</span>
            <span>47 Pages</span>
            <span className="hidden sm:inline">|</span>
            <span>86 Sources Cited</span>
            <span className="hidden sm:inline">|</span>
            <span>12 Data Tables</span>
          </div>

          <div className="max-w-2xl mx-auto bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-left">
            <p className="text-xs font-mono text-slate-600 mb-3">TABLE OF CONTENTS</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {[
                ['1. Executive Summary', '03'],
                ['2. Market Sizing & Growth', '08'],
                ['3. Competitive Landscape', '14'],
                ['4. Feature Comparison', '22'],
                ['5. Pricing Analysis', '26'],
                ['6. User Adoption Trends', '31'],
                ['7. Emerging Threats', '38'],
                ['8. Strategic Recommendations', '42'],
              ].map(([title, page], i) => (
                <div key={i} className="flex justify-between px-2 py-1.5 rounded hover:bg-slate-800/50 transition-colors">
                  <span className="text-slate-300">{title}</span>
                  <span className="text-slate-600 font-mono">{page}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ EXECUTIVE SUMMARY ═══ */}
        <SectionHeader number="01" title="Executive Summary" subtitle="The market moved from curiosity to infrastructure. Here's what matters." />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard value="$5.8B" label="Market Size 2025" subtext="Up from $2.1B in 2024" />
          <StatCard value="$9.4B" label="Projected 2026" subtext="62% YoY growth" />
          <StatCard value="42%" label="Copilot Market Share" subtext="Down from 55% in 2024" />
          <StatCard value="76%" label="Developer Adoption" subtext="Have tried AI coding tools" />
        </div>

        <div className="space-y-4 text-slate-300 leading-relaxed mb-8">
          <p>
            The AI code assistant market has moved from curiosity to infrastructure. What was a $2.1B
            market in 2024 has grown to an estimated <strong className="text-white">$5.8B in 2025</strong>, and we project it will reach
            $9.4B by end of 2026. The growth is no longer driven by early adopters. It&apos;s driven by procurement teams.
          </p>
        </div>

        {/* Key findings as visual cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {[
            { icon: '📉', title: 'Copilot is losing ground', text: '42% market share, down from 55% in early 2024. Cursor and Windsurf are the primary beneficiaries.' },
            { icon: '🚀', title: 'Cursor is the breakout story', text: '3.2M users, ~$200M ARR. Going from niche VS Code fork to legitimate threat in under two years.' },
            { icon: '🏢', title: 'Enterprise hit a tipping point', text: '71% of companies with 500+ engineers now provide an AI coding tool as standard tooling.' },
            { icon: '🤖', title: 'The "assistant" framing is dying', text: 'Market is shifting toward agentic coding — tools that execute multi-step tasks autonomously.' },
            { icon: '💰', title: 'Pricing pressure is real but uneven', text: 'Free tiers from Amazon and Google haven\'t collapsed the market. Devs pay $20-40/mo for tools that work.' },
            { icon: '🔮', title: 'Consolidation is coming', text: 'We expect 2-3 acquisitions of mid-tier players by major cloud/DevTool platforms by end of 2027.' },
          ].map((finding, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-xl">{finding.icon}</span>
                <div>
                  <h4 className="text-white font-semibold mb-1">{finding.title}</h4>
                  <p className="text-sm text-slate-400">{finding.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SourceNote>Sources: GitHub financial disclosures (2025), The Information (2025), GitHub Enterprise Survey (2025), McKinsey Developer Productivity Report (2025), Kael Research estimates</SourceNote>

        {/* ═══ MARKET SIZING ═══ */}
        <SectionHeader number="02" title="Market Sizing & Growth" subtitle="From $1.1B captured in 2023 to a projected $9.4B in 2026 — the gap between addressable and captured market is closing fast." />

        {mounted && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-1">Market Size Evolution (2023–2026P)</h3>
            <p className="text-xs text-slate-500 mb-6">Total Addressable Market vs. Serviceable vs. Obtained — in billions USD</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketSizeData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={v => `$${v}B`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="tam" name="TAM" fill="#334155" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="sam" name="SAM" fill="#78716c" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="som" name="SOM (Captured)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-700 inline-block" /> TAM</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-stone-500 inline-block" /> SAM</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500 inline-block" /> SOM (Captured)</span>
            </div>
            <SourceNote>Sources: Gartner (2025), IDC Software Development Intelligence Report (2025), Kael Research estimates. 2026P = projected.</SourceNote>
          </div>
        )}

        <KeyInsight>
          In 2023, only 35% of the addressable market was captured. By 2025, that figure reached 67%. The primary driver: enterprise deals. When a company like Shopify or Stripe rolls out Copilot to all engineers, that&apos;s thousands of seats converting overnight.
        </KeyInsight>

        <div className="space-y-4 text-slate-300 leading-relaxed mb-8">
          <h3 className="text-xl font-semibold text-white mt-10">Growth Drivers</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Developer Population', stat: '32M', desc: 'professional developers worldwide in 2025, up from 27M in 2022. Every new developer is a potential seat.', source: 'Evans Data Corporation, 2025' },
              { title: 'Productivity Gains', stat: '27-55%', desc: 'improvement in task completion speed across multiple independent studies. The ROI case is now undeniable.', source: 'GitHub (2023), Microsoft Research (2024), McKinsey (2025)' },
              { title: 'Agentic Shift', stat: '→', desc: 'Tools moved from autocompleting lines to handling multi-file edits and multi-step tasks. Value prop changed from "saves keystrokes" to "does my tasks."', source: 'Kael Research analysis' },
            ].map((d, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
                <div className="text-2xl font-bold text-amber-400 mb-2">{d.stat}</div>
                <h4 className="text-white font-semibold text-sm mb-2">{d.title}</h4>
                <p className="text-xs text-slate-400 mb-2">{d.desc}</p>
                <p className="text-xs text-slate-600 italic">{d.source}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 text-slate-300 leading-relaxed mb-8">
          <h3 className="text-xl font-semibold text-white mt-10">Growth Constraints</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { pct: '34%', title: 'Security Concerns', desc: 'of engineering leaders cite "code confidentiality" as their primary hesitation for adoption.', source: 'Snyk Developer Security Survey, 2025' },
              { pct: '~', title: 'Model Quality Plateau', desc: 'The jump from GPT-3.5 to GPT-4 was dramatic. Recent model improvements have been incremental for code generation specifically.', source: 'Kael Research analysis' },
              { pct: '18%', title: 'Developer Resistance', desc: 'actively avoid AI coding tools, citing skill atrophy and over-reliance concerns. Shrinking but vocal minority.', source: 'Stack Overflow Developer Survey, 2025' },
            ].map((d, i) => (
              <div key={i} className="bg-red-950/20 border border-red-900/30 rounded-xl p-5">
                <div className="text-2xl font-bold text-red-400 mb-2">{d.pct}</div>
                <h4 className="text-white font-semibold text-sm mb-2">{d.title}</h4>
                <p className="text-xs text-slate-400 mb-2">{d.desc}</p>
                <p className="text-xs text-slate-600 italic">{d.source}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ COMPETITIVE LANDSCAPE ═══ */}
        <SectionHeader number="03" title="Competitive Landscape" subtitle="GitHub Copilot is still the giant, but it's a slowing giant. The insurgents are gaining ground fast." />

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Market Share Pie */}
          {mounted && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-1">Market Share by Revenue</h3>
              <p className="text-xs text-slate-500 mb-4">2025 Estimated</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketShareData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={95}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {marketShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`]}
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
                      itemStyle={{ color: '#e2e8f0' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {marketShareData.slice(0, 6).map((entry, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
                    {entry.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Copilot share decline */}
          {mounted && (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-1">Copilot Market Share Erosion</h3>
              <p className="text-xs text-slate-500 mb-4">Quarterly trend, 2024–2025</p>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={copilotShareDecline}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="quarter" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={12} domain={[35, 60]} tickFormatter={v => `${v}%`} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
                    <Area type="monotone" dataKey="share" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} name="Market Share %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <SourceNote>Source: Company disclosures, Kael Research estimates</SourceNote>
            </div>
          )}
        </div>

        {/* Competitor Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <CompetitorCard rank={1} name="GitHub Copilot" revenue="$2.44B" share="42%" growth="+68%" color="#f59e0b" />
          <CompetitorCard rank={2} name="Cursor" revenue="$0.58B" share="10%" growth="+340%" color="#3b82f6" />
          <CompetitorCard rank={3} name="Windsurf (Codeium)" revenue="$0.41B" share="7%" growth="+185%" color="#10b981" />
          <CompetitorCard rank={4} name="Amazon Q Developer" revenue="$0.35B" share="6%" growth="+42%" color="#8b5cf6" />
        </div>

        {/* YoY Growth Chart */}
        {mounted && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-1">Year-over-Year Revenue Growth</h3>
            <p className="text-xs text-slate-500 mb-6">2025 vs 2024 — sorted by growth rate</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yoyGrowthData} layout="vertical" barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" stroke="#64748b" fontSize={12} tickFormatter={v => `${v}%`} />
                  <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={12} width={100} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} formatter={(v) => [`${v}%`, 'Growth']} />
                  <Bar dataKey="growth" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <KeyInsight>
          Cursor&apos;s rise is the defining story. Going from a niche fork of VS Code to $580M in estimated revenue in under two years is remarkable. Their insight was simple: developers don&apos;t want AI <em>inside</em> their editor — they want an editor <em>built around</em> AI.
        </KeyInsight>

        {/* ═══ FEATURE COMPARISON ═══ */}
        <SectionHeader number="04" title="Feature Comparison" subtitle="The feature gap between the top three has narrowed. The real differentiation is execution quality." />

        {/* Radar Chart */}
        {mounted && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-1">Capability Radar — Top 3 Players</h3>
            <p className="text-xs text-slate-500 mb-4">Scored 0-100 across key dimensions</p>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1e293b" />
                  <PolarAngleAxis dataKey="feature" stroke="#64748b" fontSize={11} />
                  <PolarRadiusAxis stroke="#1e293b" fontSize={10} />
                  <Radar name="Copilot" dataKey="copilot" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} />
                  <Radar name="Cursor" dataKey="cursor" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                  <Radar name="Windsurf" dataKey="windsurf" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-amber-500 inline-block" /> Copilot</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-blue-500 inline-block" /> Cursor</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-emerald-500 inline-block" /> Windsurf</span>
            </div>
          </div>
        )}

        {/* Feature Matrix */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8 overflow-x-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Detailed Feature Matrix</h3>
          <div className="min-w-[600px]">
            <div className="grid grid-cols-6 gap-2 pb-3 border-b border-slate-700 mb-2">
              <div className="text-xs text-slate-500 font-mono">FEATURE</div>
              {['Copilot', 'Cursor', 'Windsurf', 'Amazon Q', 'Tabnine'].map(name => (
                <div key={name} className="text-xs text-slate-400 text-center font-medium">{name}</div>
              ))}
            </div>
            {[
              { feature: 'Inline Autocomplete', scores: ['✅', '✅', '✅', '✅', '✅'] },
              { feature: 'Chat Interface', scores: ['✅', '✅', '✅', '✅', '✅'] },
              { feature: 'Multi-file Editing', scores: ['✅', '✅', '✅', '⚠️', '❌'] },
              { feature: 'Codebase Awareness', scores: ['⚠️', '✅', '✅', '⚠️', '⚠️'] },
              { feature: 'Agentic Execution', scores: ['✅', '✅', '✅', '⚠️', '❌'] },
              { feature: 'Terminal Integration', scores: ['✅', '✅', '✅', '⚠️', '❌'] },
              { feature: 'Custom Model Support', scores: ['❌', '✅', '⚠️', '❌', '✅'] },
              { feature: 'On-premise Deploy', scores: ['✅', '❌', '✅', '✅', '✅'] },
              { feature: 'SOC 2 Compliance', scores: ['✅', '✅', '✅', '✅', '✅'] },
            ].map((row, i) => (
              <FeatureRow key={i} feature={row.feature} scores={row.scores.map((s, j) => ({
                name: ['Copilot', 'Cursor', 'Windsurf', 'Amazon Q', 'Tabnine'][j],
                score: s,
                color: s === '✅' ? 'green' : s === '⚠️' ? 'amber' : 'red'
              }))} />
            ))}
          </div>
          <SourceNote>Based on product testing Jan-Feb 2026. ✅ = Strong/Available, ⚠️ = Limited/Partial, ❌ = Not Available</SourceNote>
        </div>

        {/* ═══ PRICING ═══ */}
        <SectionHeader number="05" title="Pricing Analysis" subtitle="The market has settled into a $10-20/month range for individuals. The real story is consumption-based enterprise pricing." />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Individual Pricing */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Individual Pricing</h3>
            <div className="space-y-3">
              {[
                { name: 'GitHub Copilot', free: '2K completions/mo', price: '$10/mo' },
                { name: 'Cursor', free: 'Limited', price: '$20/mo' },
                { name: 'Windsurf', free: 'Generous', price: '$15/mo' },
                { name: 'Amazon Q', free: 'Unlimited basic', price: '$19/mo' },
                { name: 'Tabnine', free: 'Basic', price: '$12/mo' },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800/50 last:border-0">
                  <span className="text-sm text-slate-300">{p.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">{p.free}</span>
                    <span className="text-sm font-semibold text-white bg-slate-800 px-2 py-0.5 rounded">{p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enterprise Pricing */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Enterprise Pricing</h3>
            <div className="space-y-3">
              {[
                { name: 'Copilot Enterprise', price: '$39/user/mo', min: '1 seat' },
                { name: 'Copilot Business', price: '$19/user/mo', min: '1 seat' },
                { name: 'Cursor Business', price: '$40/user/mo', min: '5 seats' },
                { name: 'Windsurf Enterprise', price: '$30-45/user/mo', min: '50 seats' },
                { name: 'Tabnine Enterprise', price: '$39/user/mo', min: '25 seats' },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800/50 last:border-0">
                  <span className="text-sm text-slate-300">{p.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500">{p.min}</span>
                    <span className="text-sm font-semibold text-white bg-slate-800 px-2 py-0.5 rounded">{p.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <KeyInsight>
          Several players are moving toward usage-based pricing for agentic features — charging per task or per compute-minute rather than per seat. This is the model that will likely dominate enterprise deals by 2027.
        </KeyInsight>

        {/* ═══ ADOPTION ═══ */}
        <SectionHeader number="06" title="User Adoption Trends" subtitle="76% of professional developers have tried an AI coding tool. 52% use one daily. The holdouts are shrinking." />

        {mounted && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-1">Developer Adoption Over Time</h3>
            <p className="text-xs text-slate-500 mb-6">Percentage of professional developers, 2023–2025</p>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={adoptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={v => `${v}%`} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }} formatter={(v) => [`${v}%`]} />
                  <Line type="monotone" dataKey="tried" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} name="Have tried" />
                  <Line type="monotone" dataKey="daily" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Use daily" />
                  <Line type="monotone" dataKey="cantLiveWithout" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Can't live without" />
                  <Line type="monotone" dataKey="resist" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Actively resist" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-amber-500 inline-block" /> Have tried</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-blue-500 inline-block" /> Use daily</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-emerald-500 inline-block" /> Can&apos;t live without</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-red-500 inline-block" /> Actively resist</span>
            </div>
            <SourceNote>Sources: Stack Overflow (2025), JetBrains (2025), SlashData (2025)</SourceNote>
          </div>
        )}

        {/* NPS Scores */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Developer Satisfaction (NPS)</h3>
          <div className="space-y-3">
            {npsData.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-sm text-slate-300 w-24">{item.name}</span>
                <div className="flex-1 h-8 bg-slate-800 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full rounded-full ${item.nps > 50 ? 'bg-green-500/60' : item.nps > 20 ? 'bg-amber-500/60' : 'bg-red-500/40'}`}
                    style={{ width: `${Math.max(item.nps, 5)}%` }}
                  />
                  <span className="absolute inset-0 flex items-center pl-3 text-xs font-medium text-white">
                    +{item.nps}
                  </span>
                </div>
                <span className={`text-xs font-mono w-10 ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
          <SourceNote>NPS = Net Promoter Score (-100 to +100). Change column = YoY change from 2024.</SourceNote>
        </div>

        {/* Adoption by Company Size */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-8 overflow-x-auto">
          <h3 className="text-lg font-semibold text-white mb-4">Adoption by Company Size</h3>
          <div className="min-w-[500px]">
            <div className="grid grid-cols-4 gap-2 pb-3 border-b border-slate-700 mb-2">
              <div className="text-xs text-slate-500 font-mono">SIZE</div>
              <div className="text-xs text-slate-500 font-mono">ADOPTION</div>
              <div className="text-xs text-slate-500 font-mono">PRIMARY TOOL</div>
              <div className="text-xs text-slate-500 font-mono">AVG. SEATS</div>
            </div>
            {[
              { size: '1-10', adoption: '68%', tool: 'Cursor (34%)', seats: '4' },
              { size: '11-100', adoption: '74%', tool: 'Copilot (41%)', seats: '28' },
              { size: '101-500', adoption: '71%', tool: 'Copilot (48%)', seats: '95' },
              { size: '501-5K', adoption: '78%', tool: 'Copilot (52%)', seats: '420' },
              { size: '5,000+', adoption: '65%', tool: 'Copilot (58%)', seats: '2,100' },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 py-2.5 border-b border-slate-800/50">
                <span className="text-sm text-slate-300">{row.size}</span>
                <span className="text-sm text-white font-medium">{row.adoption}</span>
                <span className="text-sm text-slate-400">{row.tool}</span>
                <span className="text-sm text-slate-400">{row.seats}</span>
              </div>
            ))}
          </div>
          <SourceNote>Source: Kael Research Enterprise Software Survey, Q4 2025 (n=840)</SourceNote>
        </div>

        <KeyInsight>
          Copilot&apos;s dominance increases with company size — the Microsoft enterprise sales engine at work. But in small teams and startups, Cursor has near-parity. This is how market share shifts begin.
        </KeyInsight>

        {/* ═══ STRATEGIC RECOMMENDATIONS ═══ */}
        <SectionHeader number="07" title="Strategic Recommendations" subtitle="Five actionable takeaways for founders, investors, and product leaders operating in this space." />

        <div className="space-y-6 mb-10">
          {[
            { num: '01', title: 'Don\'t build another general-purpose assistant', text: 'The general-purpose market is a three-horse race with massive network effects and deep funding. Target a specific wedge: a language, a framework, a domain, or a workflow. Own a niche before expanding.' },
            { num: '02', title: 'Bet on agents, not autocomplete', text: 'Autocomplete is commoditized. The high-value frontier is agentic capabilities: task decomposition, tool use, error recovery, human-in-the-loop checkpoints.' },
            { num: '03', title: 'Enterprise is the revenue, developers are the distribution', text: 'You need both: a free/cheap individual tier that developers love, and an enterprise tier that satisfies procurement. Skipping developer experience to go straight to enterprise sales rarely works in DevTools.' },
            { num: '04', title: 'Solve the trust problem first', text: 'SOC 2 Type II before launch, transparent data handling, optional on-premise deployment, clear code attribution. Expensive upfront but dramatically shortens enterprise sales cycles.' },
            { num: '05', title: 'Build for model-agnostic future', text: 'The winning architecture routes requests to the best available model based on task type, latency, and cost. Cursor\'s "bring your own API key" is an early version. The full vision is automatic, invisible model routing.' },
          ].map((rec, i) => (
            <div key={i} className="flex gap-5 bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-amber-500/30 transition-colors">
              <div className="text-3xl font-bold text-amber-500/30 font-mono leading-none pt-1">{rec.num}</div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">{rec.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{rec.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ METHODOLOGY ═══ */}
        <SectionHeader number="08" title="Methodology" />
        <div className="space-y-4 text-sm text-slate-400 leading-relaxed mb-10">
          <p>
            Kael Research produces market intelligence through a combination of primary and secondary
            research: quantitative data from public disclosures and third-party reports (Gartner, IDC,
            Forrester), developer surveys (Stack Overflow, JetBrains, SlashData), and proprietary
            analytics.
          </p>
          <p>
            Qualitative insights come from 34 structured interviews with engineering leaders,
            product managers, and VC investors conducted October 2025 – January 2026.
          </p>
          <p>
            Market sizing uses bottom-up methodology: estimated user counts × average revenue per user,
            cross-referenced with top-down analyst estimates. Competitive analysis includes hands-on
            product testing over minimum two-week periods.
          </p>
          <p className="text-slate-600 italic">
            We do not accept sponsorship or payment from companies covered in our reports.
          </p>
        </div>

        {/* ═══ CTA ═══ */}
        <div className="bg-gradient-to-b from-slate-900/50 to-amber-950/20 border border-slate-800 rounded-2xl p-10 text-center mt-16">
          <p className="text-xs font-mono text-amber-500 mb-3">END OF SAMPLE REPORT</p>
          <h2 className="text-3xl font-bold text-white mb-4">Need This Level of Analysis<br />for Your Market?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Full reports include regulatory analysis, regional breakdowns, investment activity tracking, 
            5-year forecasting models, and custom recommendations for your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/#pricing" className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-8 py-3 rounded-full transition-colors">
              View Pricing
            </Link>
            <a href="mailto:contact@kaelresearch.com?subject=Custom Research Request" className="text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800 px-8 py-3 rounded-full transition-colors">
              Request Custom Report
            </a>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-950 border-t border-slate-900 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="text-xl font-bold text-white tracking-tight">KAEL <span className="text-amber-500">RESEARCH</span></span>
              <p className="text-slate-500 text-sm mt-2">&copy; 2026 Kael Research. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">Home</Link>
              <a href="mailto:contact@kaelresearch.com" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">contact@kaelresearch.com</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
