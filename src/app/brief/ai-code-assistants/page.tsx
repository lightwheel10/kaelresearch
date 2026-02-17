'use client';

import React, { useState, useEffect, FormEvent, FC } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

/* ─── Color Palette ─── */
const NAVY = '#1B2A4A';
const GOLD = '#C9A84C';
const CHARCOAL = '#333333';
const SLATE_BLUE = '#4A6FA5';
const SAGE = '#7A9A7E';
const MUTED_GOLD = '#D4B96B';
const SOFT_NAVY = '#2C4A7C';

/* ─── Email Gate ─── */
const EmailGate: FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email address.'); setLoading(false); return; }
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source: 'brief_ai_code_assistants' }) });
      if (res.ok) { localStorage.setItem('kael_email', email); onSuccess(); } else { const data = await res.json(); setError(data.message || 'An error occurred.'); }
    } catch { setError('An error occurred. Please try again.'); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4" style={{ background: 'linear-gradient(135deg, #0F1A2E 0%, #1B2A4A 50%, #0F1A2E 100%)' }}>
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[3px] uppercase rounded border" style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.4)', backgroundColor: 'rgba(201,168,76,0.08)' }}>Market Brief</span>
        </div>
        <h1 className="text-2xl font-bold mb-2 tracking-wide"><span className="text-white">KAEL</span><span style={{ color: GOLD }}>RESEARCH</span></h1>
        <div className="mx-auto my-4 w-16 h-px" style={{ backgroundColor: GOLD }} />
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>AI Code Assistants Brief</h2>
        <p className="text-slate-400 mb-8">Enter your email to access our free market brief on the AI Code Assistant Market.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@company.com" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:outline-none" required disabled={loading} />
          <button type="submit" disabled={loading} className="w-full font-bold py-3 px-4 rounded-full disabled:opacity-50 transition-all hover:opacity-90" style={{ backgroundColor: GOLD, color: NAVY }}>{loading ? 'Unlocking...' : 'Access Brief'}</button>
        </form>
        {error && <p className="text-red-400 mt-4">{error}</p>}
        <p className="text-xs text-slate-500 mt-6">We respect your privacy. No spam.</p>
      </div>
    </div>
  );
};

/* ─── Helper Components ─── */
const ChartWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <div className="w-full h-80 sm:h-96">{mounted && children}</div>;
};

type Status = 'strong' | 'partial' | 'no';
const StatusIcon: FC<{ status: Status }> = ({ status }) => {
  const map: Record<Status, { color: string; label: string }> = { strong: { color: SAGE, label: 'Strong' }, partial: { color: MUTED_GOLD, label: 'Partial' }, no: { color: '#C0392B', label: 'No' } };
  const { color, label } = map[status];
  return (
    <div className="flex items-center justify-center gap-1.5 group relative">
      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} title={label} />
      <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4" style={{ color }}>{label}</span>
    </div>
  );
};

const SectionHeader: FC<{ number: string; title: string }> = ({ number, title }) => (
  <div className="relative mb-10">
    <div className="w-full h-px mb-8" style={{ backgroundColor: GOLD, opacity: 0.3 }} />
    <div className="flex items-baseline gap-4">
      <span className="text-3xl sm:text-5xl md:text-6xl font-bold leading-none select-none" style={{ color: GOLD, opacity: 0.15, fontFamily: 'Georgia, serif' }}>{number}</span>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>{title}</h2>
    </div>
  </div>
);

const KeyInsight: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-md p-5 sm:p-6 mt-8" style={{ borderLeft: `4px solid ${GOLD}`, backgroundColor: '#FFFBF0' }}>
    <p className="text-xs font-bold tracking-[2px] uppercase mb-2" style={{ color: GOLD }}>Key Insight</p>
    <p className="text-base leading-relaxed" style={{ color: CHARCOAL }}>{children}</p>
  </div>
);

const Src: FC<{ href: string; n: number }> = ({ href, n }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs align-super font-medium hover:underline" style={{ color: SLATE_BLUE }}>[{n}]</a>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 rounded-md shadow-lg text-sm bg-white border" style={{ borderColor: '#E5E7EB' }}>
        <p className="font-bold" style={{ color: NAVY }}>{label}</p>
        {payload.map((pld: any) => (<div key={pld.dataKey} style={{ color: pld.color }}>{`${pld.name}: ${pld.value.toLocaleString()}`}</div>))}
      </div>
    );
  }
  return null;
};

/* ─── Brief Content ─── */
const BriefContent: FC = () => {
  /* ─── Data ─── */
  const marketSizingData = [
    { name: '2023', TAM: 6.8, SAM: 3.0, SOM: 0.8 },
    { name: '2024', TAM: 9.5, SAM: 4.5, SOM: 1.6 },
    { name: '2025', TAM: 12.8, SAM: 6.2, SOM: 2.8 },
    { name: '2026P', TAM: 16.3, SAM: 8.5, SOM: 4.2 },
  ];

  const marketShareData = [
    { name: 'GitHub Copilot', value: 42, revenue: '$2.0B*', yoy: '+55%*', color: NAVY },
    { name: 'Cursor', value: 10.5, revenue: '$500M', yoy: '+9,900%', color: SLATE_BLUE },
    { name: 'Windsurf (Codeium)', value: 1.7, revenue: '$82M', yoy: 'N/A', color: SAGE },
    { name: 'Amazon Q', value: 6, revenue: 'N/A', yoy: 'N/A', color: SOFT_NAVY },
    { name: 'Tabnine', value: 3, revenue: 'N/A', yoy: 'N/A', color: MUTED_GOLD },
    { name: 'JetBrains AI', value: 3, revenue: 'N/A', yoy: 'N/A', color: '#8B7355' },
    { name: 'Others', value: 33.8, revenue: 'N/A', yoy: 'N/A', color: '#9CA3AF' },
  ];

  const copilotDeclineData = [
    { name: 'Q1 24', value: 55 }, { name: 'Q2 24', value: 52 }, { name: 'Q3 24', value: 49 },
    { name: 'Q4 24', value: 46 }, { name: 'Q1 25', value: 44 }, { name: 'Q2 25', value: 43 },
    { name: 'Q3 25', value: 42.5 }, { name: 'Q4 25', value: 42 },
  ];

  const cursorValuationData = [
    { name: 'Aug 2024', value: 0.4 },
    { name: 'Dec 2024', value: 2.5 },
    { name: 'Jun 2025', value: 9.9 },
    { name: 'Nov 2025', value: 29.3 },
  ];

  const featureRadarData = [
    { subject: 'Autocomplete', Copilot: 90, Cursor: 92, Windsurf: 88, fullMark: 100 },
    { subject: 'Multi-file Edit', Copilot: 75, Cursor: 95, Windsurf: 85, fullMark: 100 },
    { subject: 'Codebase Aware', Copilot: 60, Cursor: 95, Windsurf: 80, fullMark: 100 },
    { subject: 'Agentic Tasks', Copilot: 70, Cursor: 90, Windsurf: 85, fullMark: 100 },
    { subject: 'Enterprise', Copilot: 95, Cursor: 70, Windsurf: 75, fullMark: 100 },
    { subject: 'Ecosystem', Copilot: 95, Cursor: 65, Windsurf: 60, fullMark: 100 },
  ];

  const adoptionTrendsData = [
    { name: '2023', tried: 44, daily: 27, 'cant-live-without': 15, resist: 31 },
    { name: '2024', tried: 62, daily: 41, 'cant-live-without': 24, resist: 24 },
    { name: '2025', tried: 76, daily: 52, 'cant-live-without': 34, resist: 18 },
  ];

  const npsData = [
    { name: 'Cursor', score: 62, color: SAGE },
    { name: 'Windsurf', score: 45, color: SAGE },
    { name: 'Copilot', score: 38, color: MUTED_GOLD },
    { name: 'Amazon Q', score: 12, color: MUTED_GOLD },
    { name: 'Tabnine', score: 8, color: '#C0392B' },
  ];

  const featureMatrixData = {
    features: ['Inline Autocomplete', 'Multi-file Editing', 'Codebase Awareness', 'Agentic Execution', 'Custom Model Support', 'On-premise'],
    competitors: {
      'Copilot': ['strong', 'strong', 'partial', 'strong', 'no', 'strong'] as Status[],
      'Cursor': ['strong', 'strong', 'strong', 'strong', 'strong', 'no'] as Status[],
      'Windsurf': ['strong', 'strong', 'strong', 'strong', 'partial', 'strong'] as Status[],
      'Amazon Q': ['partial', 'partial', 'partial', 'partial', 'no', 'strong'] as Status[],
      'Tabnine': ['strong', 'no', 'partial', 'no', 'strong', 'strong'] as Status[],
    }
  };

  const investmentData = [
    { company: 'Cursor (Anysphere)', event: 'Series D', amount: '$2.3B', valuation: '$29.3B', date: 'Nov 2025' },
    { company: 'Cursor (Anysphere)', event: 'Series C', amount: '~$900M', valuation: '$9.9B', date: 'Jun 2025' },
    { company: 'Cursor (Anysphere)', event: 'Series B', amount: '$105M', valuation: '$2.5B', date: 'Dec 2024' },
    { company: 'Augment Code', event: 'Series B', amount: '$252M', valuation: '~$2B (est.)', date: 'Mid 2025' },
    { company: 'Codeium (Windsurf)', event: 'Acquired by Cognition', amount: 'Undisclosed', valuation: '$1.25B (last round)', date: 'Jul 2025' },
    { company: 'Codeium (Windsurf)', event: 'Series C', amount: '$150M', valuation: '$1.25B', date: 'Aug 2024' },
    { company: 'Replit', event: 'Series B', amount: '$97.4M', valuation: '$1.16B', date: 'Apr 2023' },
    { company: 'Supermaven', event: 'Acquired by Cursor', amount: 'Undisclosed', valuation: '—', date: 'Late 2024' },
  ];

  const statCards = [
    { value: '$4.86B', label: 'Market Size (2023)' },
    { value: '27.1%', label: 'CAGR 2024–2030' },
    { value: '$500M', label: 'Cursor ARR' },
    { value: '76%', label: 'Dev Adoption Rate' },
  ];

  return (
    <div id="top" className="font-sans" style={{ backgroundColor: '#FAFAFA', color: CHARCOAL }}>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 max-w-5xl">

        {/* ═══ Title ═══ */}
        <div className="text-center py-16 sm:py-20">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[3px] uppercase rounded border" style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', backgroundColor: 'rgba(201,168,76,0.06)' }}>Market Brief</span>
          </div>
          <p className="text-xs font-bold tracking-[4px] uppercase mb-4" style={{ color: GOLD }}>Free Market Intelligence</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>AI Code Assistants</h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mt-2" style={{ color: GOLD, fontFamily: 'Georgia, serif' }}>2026 Market Brief</h2>
          <div className="mx-auto mt-8 mb-6 w-24 h-px" style={{ backgroundColor: GOLD }} />
          <p className="text-sm tracking-wide" style={{ color: '#6B7280' }}>February 2026</p>
          <p className="mt-3 text-sm" style={{ color: '#9CA3AF' }}>Prepared by Kael Research</p>
        </div>

        {/* ═══ 01 — Executive Summary ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="01" title="Executive Summary" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {statCards.map((s) => (
              <div key={s.label} className="bg-white rounded-lg p-6 text-center shadow-sm" style={{ borderTop: `3px solid ${GOLD}`, border: '1px solid #E5E7EB', borderTopColor: GOLD }}>
                <p className="text-xl sm:text-3xl md:text-4xl font-bold" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>{s.value}</p>
                <p className="text-sm mt-2" style={{ color: '#6B7280' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <p className="text-base leading-relaxed mb-6" style={{ color: CHARCOAL }}>
            Cursor — a company most VCs hadn&apos;t heard of in early 2024 — hit <strong>$500M ARR</strong> by May 2025 and raised at a <strong>$29.3 billion valuation</strong> by November. That single data point tells you everything about the velocity of this market.<Src href="https://sacra.com/c/cursor/" n={3} />
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: CHARCOAL }}>
            GitHub Copilot, which once looked like a lock for market dominance, is losing enterprise share to a wave of IDE-native competitors. Meanwhile, Cognition acquired Codeium/Windsurf<Src href="https://sacra.com/c/codeium/" n={5} />, consolidation is picking up, and open-source code models are eroding the moat that proprietary solutions thought they had.
          </p>

          <ul className="space-y-4 text-base leading-relaxed" style={{ color: CHARCOAL }}>
            {[
              { label: 'Market Growth:', text: <>The global AI code tools market was valued at <strong>$4.86B in 2023</strong> and is projected to reach <strong>$26.03B by 2030</strong>, growing at a <strong>27.1% CAGR</strong>.<Src href="https://www.grandviewresearch.com/industry-analysis/ai-code-tools-market-report" n={1} /></> },
              { label: 'Developer Adoption:', text: <><strong>76%</strong> of developers are using or planning to use AI tools, with <strong>62%</strong> currently using them daily.<Src href="https://survey.stackoverflow.co/2024/ai" n={4} /></> },
              { label: 'Strategic Shift:', text: 'The market is rapidly moving beyond simple autocomplete to agentic coding workflows — autonomous agents that can plan, execute, and iterate on multi-step tasks.' },
              { label: 'M&A Activity:', text: <>Cognition acquired Codeium/Windsurf in July 2025. OpenAI has been in talks to acquire Cursor. Expect continued consolidation through 2027.<Src href="https://sacra.com/c/codeium/" n={5} /></> },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: GOLD }} />
                <span><strong style={{ color: NAVY }}>{item.label}</strong> {item.text}</span>
              </li>
            ))}
          </ul>

          <KeyInsight>
            The AI code assistant market has crossed the adoption tipping point. With 76% of developers having tried these tools and 62% currently using them daily, the question is no longer &ldquo;if&rdquo; but &ldquo;which tool wins.&rdquo; Cursor&rsquo;s meteoric rise — 9,900% YoY growth — proves that deep IDE integration and codebase awareness, not just model quality, drive switching behavior.
          </KeyInsight>
        </section>

        {/* ═══ 02 — Market Sizing ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="02" title="Market Sizing" />
          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            <a href="https://www.grandviewresearch.com/industry-analysis/ai-code-tools-market-report" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>Grand View Research</a> sizes the global AI code tools market at <strong>$4.86 billion in 2023</strong>, projecting <strong>$26.03 billion by 2030</strong> at a <strong>27.1% CAGR</strong>. <strong>MarketsAndMarkets</strong> (January 2026) pegs it at <strong>$8.14 billion in 2025</strong>, growing to $127 billion by 2032 at a 48.1% CAGR. North America held the largest share at <strong>38%</strong> in 2023.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-2 flex flex-col">
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Market Potential (TAM, SAM, SOM) in $USD Billions</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm flex-1" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketSizingData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" unit="B" tickFormatter={(v) => `$${v}`} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
                      <Legend />
                      <Bar dataKey="TAM" fill={SLATE_BLUE} name="Total Addressable Market" />
                      <Bar dataKey="SAM" fill={SAGE} name="Serviceable Addressable Market" />
                      <Bar dataKey="SOM" fill={MUTED_GOLD} name="Serviceable Obtainable Market" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>
              <p className="text-xs mt-2 italic" style={{ color: '#9CA3AF' }}>TAM/SAM/SOM breakdowns are Kael Research estimates based on Grand View Research total market data.<Src href="https://www.grandviewresearch.com/industry-analysis/ai-code-tools-market-report" n={1} /></p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Key Factors</h3>
              <div className="bg-white rounded-lg p-5 shadow-sm mb-4 flex-1" style={{ borderLeft: `4px solid ${SAGE}`, border: '1px solid #E5E7EB', borderLeftColor: SAGE }}>
                <h4 className="font-bold mb-3" style={{ color: SAGE }}>Growth Drivers</h4>
                <ul className="space-y-2 text-sm" style={{ color: CHARCOAL }}>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><strong style={{ color: NAVY }}>Scale:</strong> GitHub has 100M+ developers<Src href="https://github.blog/news-insights/octoverse/octoverse-2024/" n={6} /></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><strong style={{ color: NAVY }}>Productivity:</strong> 81% cite productivity as the biggest benefit<Src href="https://survey.stackoverflow.co/2024/ai" n={4} /></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><strong style={{ color: NAVY }}>Agentic Shift:</strong> Autonomous agents create higher-value use cases</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-5 shadow-sm flex-1" style={{ borderLeft: '4px solid #C0392B', border: '1px solid #E5E7EB', borderLeftColor: '#C0392B' }}>
                <h4 className="font-bold mb-3" style={{ color: '#C0392B' }}>Growth Constraints</h4>
                <ul className="space-y-2 text-sm" style={{ color: CHARCOAL }}>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: '#C0392B' }} /><strong style={{ color: NAVY }}>Trust Gap:</strong> Only 43% trust AI accuracy<Src href="https://survey.stackoverflow.co/2024/ai" n={4} /></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: '#C0392B' }} /><strong style={{ color: NAVY }}>Complexity:</strong> 45% say AI is bad at complex tasks<Src href="https://survey.stackoverflow.co/2024/ai" n={4} /></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: '#C0392B' }} /><strong style={{ color: NAVY }}>Security:</strong> Code/IP leakage fears barrier to enterprise adoption</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 03 — Competitive Landscape ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="03" title="Competitive Landscape" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Estimated Market Share (2025)</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={marketShareData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={'80%'} labelLine={false}
                        label={typeof window !== 'undefined' && window.innerWidth < 768 ? false : ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
                          const RADIAN = Math.PI / 180;
                          const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          const data = marketShareData[index];
                          return (<text x={x} y={y} fill={data.color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={11}>{`${data.name} (${(percent * 100).toFixed(0)}%)`}</text>);
                        }}>
                        {marketShareData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(v: any, name: any, props: any) => [`${props.payload.revenue} (${v}%)`, props.payload.name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartWrapper>
                {/* Mobile legend */}
                <div className="sm:hidden mt-4 grid grid-cols-2 gap-2">
                  {marketShareData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2 text-xs">
                      <span className="flex-shrink-0 w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span style={{ color: CHARCOAL }}>{entry.name} ({entry.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Copilot Market Share Decline</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={copilotDeclineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" domain={[40, 60]} unit="%" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="value" name="Market Share (est.)" stroke={NAVY} fill={NAVY} fillOpacity={0.12} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>
            </div>
          </div>

          {/* Competitor Data Table */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Competitor Breakdown</h3>
            <div className="overflow-x-auto bg-white rounded-lg border shadow-sm" style={{ borderColor: '#E5E7EB', WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr style={{ backgroundColor: NAVY }}>
                    <th className="p-4 text-sm font-bold text-white">Company</th>
                    <th className="p-4 text-sm font-bold text-white text-right">Revenue (ARR)</th>
                    <th className="p-4 text-sm font-bold text-white text-right">Est. Share</th>
                    <th className="p-4 text-sm font-bold text-white text-right">YoY Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {marketShareData.map((entry, idx) => (
                    <tr key={entry.name} style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}>
                      <td className="p-4 text-sm font-medium border-t" style={{ color: CHARCOAL, borderColor: '#E5E7EB' }}>
                        <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color, verticalAlign: 'middle' }} />{entry.name}
                      </td>
                      <td className="p-4 text-sm text-right border-t font-medium" style={{ color: NAVY, borderColor: '#E5E7EB' }}>{entry.revenue}</td>
                      <td className="p-4 text-sm text-right border-t" style={{ color: CHARCOAL, borderColor: '#E5E7EB' }}>{entry.value}%</td>
                      <td className="p-4 text-sm text-right border-t font-medium" style={{ color: entry.yoy.startsWith('+') ? SAGE : '#6B7280', borderColor: '#E5E7EB' }}>{entry.yoy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3 italic" style={{ color: '#9CA3AF' }}>* Copilot revenue and YoY are Kael Research estimates. Cursor and Windsurf ARR sourced from <a href="https://sacra.com/c/cursor/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>Sacra</a>.</p>
          </div>

          <KeyInsight>
            GitHub Copilot still leads in total users, but growth has slowed. Enterprise customers report dissatisfaction with suggestion quality for large codebases. Cursor&rsquo;s enterprise pipeline — companies like Shopify, OpenAI, and Stripe — directly erodes Copilot&rsquo;s core market.
          </KeyInsight>
        </section>

        {/* ═══ 04 — Deep Dive: Cursor ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="04" title="Deep Dive: Cursor" />
          <p className="text-base leading-relaxed mb-6" style={{ color: CHARCOAL }}>
            Founded in 2022 by MIT students, <a href="https://sacra.com/c/cursor/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>Cursor</a> has become the fastest-growing SaaS company in history, reaching <strong>$500M ARR</strong> as of May 2025 — up from $300M just one month earlier. Revenue went from $1M ARR → $500M ARR in roughly 18 months. At $500M ARR, it trades at ~59x revenue.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {[
              { value: '$500M', label: 'ARR (May 2025)' },
              { value: '$29.3B', label: 'Valuation (Nov 2025)' },
              { value: '9,900%', label: 'YoY Growth (2024)' },
              { value: '$2.3B', label: 'Last Round Raised' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-lg p-5 text-center shadow-sm" style={{ borderTop: `3px solid ${SLATE_BLUE}`, border: '1px solid #E5E7EB', borderTopColor: SLATE_BLUE }}>
                <p className="text-lg sm:text-2xl md:text-3xl font-bold" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>{s.value}</p>
                <p className="text-xs mt-2" style={{ color: '#6B7280' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Valuation Trajectory ($B)</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cursorValuationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" unit="B" tickFormatter={(v) => `$${v}`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="value" name="Valuation" stroke={SLATE_BLUE} fill={SLATE_BLUE} fillOpacity={0.15} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartWrapper>
                <p className="text-xs text-center mt-2 italic" style={{ color: '#9CA3AF' }}>Source: <a href="https://sacra.com/c/cursor/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>Sacra</a></p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Key Facts</h3>
              <div className="space-y-3">
                {[
                  { label: 'Pricing', value: '$20/mo Pro, $40/mo Business' },
                  { label: 'Enterprise Users', value: 'OpenAI, Midjourney, Perplexity, Shopify' },
                  { label: 'Foundation', value: 'Built on VS Code fork, founded 2022' },
                  { label: 'Aug 2024 Valuation', value: '$400M' },
                  { label: 'Dec 2024 Valuation', value: '$2.5B' },
                  { label: 'Jun 2025 Valuation', value: '$9.9B' },
                  { label: 'Nov 2025 Valuation', value: '$29.3B (raised $2.3B)' },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 rounded-lg bg-white border shadow-sm gap-1" style={{ borderColor: '#E5E7EB' }}>
                    <span className="text-sm font-medium" style={{ color: '#6B7280' }}>{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: NAVY }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <KeyInsight>
            Cursor&rsquo;s valuation went from $400M to $29.3B in just 15 months — a 73x increase. Even AI companies — OpenAI, Midjourney, Perplexity — use Cursor for their own development. At 59x ARR, you need to believe revenue continues doubling.
          </KeyInsight>
        </section>

        {/* ═══ 05 — Feature Comparison ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="05" title="Feature Comparison" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Core Capabilities Score (0-100)</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm flex-1" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={featureRadarData}>
                      <PolarGrid stroke="#D1D5DB" />
                      <PolarAngleAxis dataKey="subject" stroke="#6B7280" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#D1D5DB" />
                      <Radar name="Copilot" dataKey="Copilot" stroke={NAVY} fill={NAVY} fillOpacity={0.3} />
                      <Radar name="Cursor" dataKey="Cursor" stroke={SLATE_BLUE} fill={SLATE_BLUE} fillOpacity={0.3} />
                      <Radar name="Windsurf" dataKey="Windsurf" stroke={SAGE} fill={SAGE} fillOpacity={0.3} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Feature Matrix</h3>
              <div className="overflow-x-auto bg-white rounded-lg border shadow-sm flex-1" style={{ borderColor: '#E5E7EB', WebkitOverflowScrolling: 'touch' }}>
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr style={{ backgroundColor: NAVY }}>
                      <th className="p-3 text-sm font-bold text-white">Feature</th>
                      {Object.keys(featureMatrixData.competitors).map(c => (
                        <th key={c} className="p-3 text-sm font-bold text-center text-white">{c}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {featureMatrixData.features.map((feature, idx) => (
                      <tr key={feature} style={{ backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}>
                        <td className="p-3 border-t text-sm font-medium" style={{ color: CHARCOAL, borderColor: '#E5E7EB' }}>{feature}</td>
                        {Object.values(featureMatrixData.competitors).map((statuses, cIdx) => (
                          <td key={cIdx} className="p-3 border-t text-center" style={{ borderColor: '#E5E7EB' }}><StatusIcon status={statuses[idx]} /></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 06 — Pricing Comparison ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="06" title="Pricing Comparison" />
          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            Pricing has converged around a freemium model with individual tiers at $10–$20/month and enterprise tiers at $19–$60/month per user. Developers willingly pay $20/mo for Cursor despite free alternatives, because codebase awareness and agentic features deliver measurable productivity gains.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Individual / Pro Tiers</h3>
              <div className="space-y-3">
                {[
                  { name: 'GitHub Copilot Individual', price: '$10/mo', note: 'Free for students & OSS maintainers' },
                  { name: 'Cursor Pro', price: '$20/mo', note: '' },
                  { name: 'Windsurf Pro', price: '$10/mo', note: '' },
                  { name: 'Windsurf Advanced', price: '$60/mo', note: 'Higher usage limits' },
                  { name: 'Tabnine Pro', price: '$12/mo', note: '' },
                ].map((item) => (
                  <div key={item.name} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 rounded-lg bg-white border shadow-sm gap-2" style={{ borderColor: '#E5E7EB', borderTop: `3px solid ${GOLD}` }}>
                    <div>
                      <span className="font-medium" style={{ color: CHARCOAL }}>{item.name}</span>
                      {item.note && <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{item.note}</p>}
                    </div>
                    <span className="text-2xl font-bold" style={{ color: NAVY }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Business / Enterprise Tiers</h3>
              <div className="space-y-3">
                {[
                  { name: 'GitHub Copilot Business', price: '$19/u/mo', note: 'IP indemnity, policy controls' },
                  { name: 'GitHub Copilot Enterprise', price: '$39/u/mo', note: 'Codebase-aware, knowledge bases' },
                  { name: 'Cursor Business', price: '$40/u/mo', note: 'Admin controls, SAML SSO' },
                  { name: 'Windsurf Enterprise', price: 'Custom', note: 'On-premise available' },
                  { name: 'Amazon Q Developer', price: '$19/u/mo', note: 'AWS integration, security scanning' },
                ].map((item) => (
                  <div key={item.name} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-5 rounded-lg bg-white border shadow-sm gap-2" style={{ borderColor: '#E5E7EB', borderTop: `3px solid ${GOLD}` }}>
                    <div>
                      <span className="font-medium" style={{ color: CHARCOAL }}>{item.name}</span>
                      {item.note && <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{item.note}</p>}
                    </div>
                    <span className="text-2xl font-bold" style={{ color: NAVY }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <KeyInsight>
            The &ldquo;race to free&rdquo; predicted by many analysts has not materialized. Instead, vendors are adding premium tiers at $40–60/mo for advanced capabilities. Pricing power remains strong because codebase awareness and agentic features deliver measurable productivity gains.
          </KeyInsight>
        </section>

        {/* ═══ 07 — Developer Adoption ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="07" title="Developer Adoption Trends" />
          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            According to the <a href="https://survey.stackoverflow.co/2024/ai" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>Stack Overflow 2024 Developer Survey</a>, <strong>76%</strong> of developers are using or planning to use AI tools, with <strong>62%</strong> currently using them (up from 44%). The primary use case is writing code (82%), with productivity cited as the biggest benefit by 81%.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Developer Sentiment Over Time</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={adoptionTrendsData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" unit="%" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line type="monotone" dataKey="tried" name="Using / Planning" stroke={SLATE_BLUE} />
                      <Line type="monotone" dataKey="daily" name="Currently Using" stroke={SAGE} />
                      <Line type="monotone" dataKey="cant-live-without" name="Can't Live Without" stroke={MUTED_GOLD} />
                      <Line type="monotone" dataKey="resist" name="Skeptical / Resistant" stroke="#C0392B" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartWrapper>
                <p className="text-xs text-center mt-2 italic" style={{ color: '#9CA3AF' }}>2023–2024 data from Stack Overflow Developer Survey. 2025 figures are Kael Research projections.<Src href="https://survey.stackoverflow.co/2024/ai" n={4} /></p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Net Promoter Score (NPS)</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={npsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" stroke="#6B7280" domain={[0, 70]} />
                      <YAxis dataKey="name" type="category" stroke="#6B7280" width={80} />
                      <Tooltip cursor={{ fill: '#F3F4F6' }} formatter={(v: any) => [`+${v}`, 'NPS']} />
                      <Bar dataKey="score" name="NPS">
                        {npsData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartWrapper>
                <p className="text-xs text-center mt-2 italic" style={{ color: '#9CA3AF' }}>NPS scores are Kael Research estimates.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '82%', label: 'Use AI for writing code' },
              { value: '43%', label: 'Trust AI accuracy' },
              { value: '45%', label: 'Say AI is bad at complex tasks' },
              { value: '81%', label: 'Cite productivity as #1 benefit' },
            ].map((s) => (
              <div key={s.label} className="p-5 rounded-lg border text-center shadow-sm" style={{ backgroundColor: '#F0F4FA', borderColor: '#E5E7EB' }}>
                <p className="text-xl sm:text-3xl font-bold" style={{ color: GOLD }}>{s.value}</p>
                <p className="text-xs mt-2" style={{ color: '#6B7280' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <KeyInsight>
            Enterprise adoption is highest in the 501-5K employee segment, but startups show the strongest preference for newer tools like Cursor, suggesting a bottom-up disruption pattern. Skepticism has dropped from 31% to an estimated 18% in just two years.
          </KeyInsight>
        </section>

        {/* ═══ 08 — Key Trends ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="08" title="Key Trends" />
          <div className="space-y-6">
            {[
              { title: 'The IDE is the new battleground', desc: 'The shift from "AI as plugin" (Copilot in VS Code) to "AI as the IDE" (Cursor, Windsurf) is a fundamental architectural change. When AI is the editor, it can do things plugins can\'t — multi-file edits, codebase-wide refactoring, inline diff previews.' },
              { title: 'Agentic coding is the next frontier', desc: 'The market is moving from "AI that suggests code" to "AI that writes, tests, and deploys code." This shift will expand the TAM significantly — agents can do the work of junior engineers, not just speed up senior ones.' },
              { title: 'Open-source models are closing the gap', desc: 'Meta\'s Code Llama, Mistral\'s Codestral, DeepSeek Coder V2, and StarCoder 2 now approach proprietary model quality. The model layer is commoditizing — differentiation is moving to the IDE experience.' },
              { title: 'Consolidation has started', desc: 'Cognition acquiring Codeium. Cursor acquiring Supermaven. These are early signals. Companies with strong enterprise books but weaker products are acquisition candidates.' },
              { title: 'Platform risk is real', desc: 'Microsoft owns VS Code, GitHub, and the enterprise distribution channel. If Microsoft makes Copilot free, it compresses the entire market.' },
            ].map((t, idx) => (
              <div key={t.title} className="bg-white rounded-lg p-6 shadow-sm border flex items-start gap-5" style={{ borderColor: '#E5E7EB', borderLeft: `4px solid ${GOLD}` }}>
                <span className="text-3xl font-bold leading-none flex-shrink-0 mt-0.5" style={{ color: GOLD, fontFamily: 'Georgia, serif', opacity: 0.7 }}>{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-bold text-lg" style={{ color: NAVY }}>{t.title}</p>
                  <p className="mt-1 leading-relaxed text-sm" style={{ color: CHARCOAL }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 09 — Investment Activity ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="09" title="Investment Activity" />
          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            Total disclosed funding into AI code assistant startups in 2024–2025 exceeds <strong>$4 billion</strong>. Cursor alone accounts for over $3.3B. Key investors with repeat exposure: Thrive Capital, Andreessen Horowitz, Index Ventures, Benchmark, General Catalyst.
          </p>
          <div className="overflow-x-auto bg-white rounded-lg border shadow-sm" style={{ borderColor: '#E5E7EB', WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-left border-collapse min-w-[700px]">
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
                  <tr key={`${row.company}-${row.event}`} style={{ backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F9FAFB' }}>
                    <td className="px-4 py-3 text-sm font-medium border-t" style={{ color: NAVY, borderColor: '#E5E7EB' }}>{row.company}</td>
                    <td className="px-4 py-3 text-sm border-t" style={{ color: CHARCOAL, borderColor: '#E5E7EB' }}>{row.event}</td>
                    <td className="px-4 py-3 text-sm text-right border-t font-medium" style={{ color: CHARCOAL, borderColor: '#E5E7EB' }}>{row.amount}</td>
                    <td className="px-4 py-3 text-sm text-right border-t" style={{ color: CHARCOAL, borderColor: '#E5E7EB' }}>{row.valuation}</td>
                    <td className="px-4 py-3 text-sm text-right border-t" style={{ color: '#6B7280', borderColor: '#E5E7EB' }}>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <KeyInsight>
            Late-stage entry is risky. Cursor at $29.3B is priced for perfection. For PE and growth equity, there may be opportunities to buy undervalued code intelligence companies being squeezed by the consolidation wave. The model layer is not the moat — the IDE experience and developer workflow are.
          </KeyInsight>
        </section>

        {/* ═══ 10 — What This Means ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="10" title="What This Means for Investors" />
          <div className="space-y-4">
            {[
              { title: 'Late-stage entry is risky.', desc: 'Cursor at $29.3B is priced for perfection. At 59x ARR, you need to believe revenue continues doubling — and that\'s before accounting for potential churn as AI models commoditize.' },
              { title: 'Enterprise is where the money is.', desc: 'Individual developer subscriptions drove early growth, but durable revenue runs through enterprise contracts — annual commitments, higher ARPU, lower churn.' },
              { title: 'Watch the consolidation.', desc: 'Cognition buying Codeium won\'t be the last deal. Tabnine, Sourcegraph/Cody, and smaller players are all potential targets.' },
              { title: 'The model layer is not the moat.', desc: 'Any company whose primary advantage is "we use GPT-4" is building on sand. The moat is in the IDE experience, the codebase graph, the developer workflow.' },
              { title: 'Don\'t ignore platform risk.', desc: 'Microsoft owns VS Code, GitHub, and the enterprise distribution channel. If Microsoft makes Copilot free, it compresses the entire market.' },
              { title: 'Adjacent opportunities matter.', desc: 'Code review, testing automation, CI/CD intelligence, and documentation generation are expanding alongside code assistants — often at more reasonable valuations.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border flex items-start gap-5" style={{ borderColor: '#E5E7EB', borderLeft: `4px solid ${GOLD}` }}>
                <span className="text-3xl font-bold leading-none flex-shrink-0 mt-0.5" style={{ color: GOLD, fontFamily: 'Georgia, serif', opacity: 0.7 }}>{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <p className="font-bold text-lg" style={{ color: NAVY }}>{item.title}</p>
                  <p className="mt-1 leading-relaxed" style={{ color: CHARCOAL }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <div className="rounded-xl py-16 sm:py-20 px-6 text-center -mx-4 sm:-mx-6 lg:-mx-8 mb-0" style={{ backgroundColor: '#F0F4FA' }}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Want the Full Report?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg" style={{ color: '#6B7280' }}>This is the free brief. The full report includes 30+ pages of analysis, data tables, competitive matrices, and strategic recommendations — delivered as a polished PDF.</p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a href="/#pricing" className="font-bold py-3 px-8 rounded-full text-base transition-all hover:opacity-90" style={{ backgroundColor: GOLD, color: NAVY }}>View Pricing</a>
            <a href="mailto:kaeltiwari@kaelresearch.com" className="font-bold py-3 px-8 rounded-full text-base border-2 transition-all hover:opacity-80" style={{ color: NAVY, borderColor: NAVY }}>Contact Us</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

/* ─── Main Export ─── */
export default function AICodeAssistantsBriefPage() {
  const [showBrief, setShowBrief] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem('kael_email')) setShowBrief(true);
    } catch { /* noop */ } finally { setIsLoading(false); }
  }, []);

  if (isLoading) return <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }} />;
  return showBrief ? <BriefContent /> : <EmailGate onSuccess={() => setShowBrief(true)} />;
}
