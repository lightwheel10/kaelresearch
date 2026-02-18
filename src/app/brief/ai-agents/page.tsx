'use client';

import React, { useState, useEffect, FormEvent, FC } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
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
      const res = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source: 'brief_ai_agents' }) });
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
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>AI Agents Brief</h2>
        <p className="text-slate-400 mb-8">Enter your email to access our free market brief on the AI Agents market.</p>
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

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 rounded-md shadow-lg text-sm bg-white border" style={{ borderColor: '#E5E7EB' }}>
        <p className="font-bold" style={{ color: NAVY }}>{label}</p>
        {payload.map((pld: any) => (<div key={pld.dataKey} style={{ color: pld.color }}>{`${pld.name}: ${typeof pld.value === 'number' ? pld.value.toLocaleString() : pld.value}`}</div>))}
      </div>
    );
  }
  return null;
};

/* ─── Brief Content ─── */
const BriefContent: FC = () => {
  /* ─── Data ─── */
  const marketSizingData = [
    { name: '2025', GrandView: 7.63, MandM: 5.2 },
    { name: '2027P', GrandView: 17.0, MandM: 11.1 },
    { name: '2029P', GrandView: 55.0, MandM: 28.5 },
    { name: '2030P', GrandView: 82.0, MandM: 52.6 },
    { name: '2033P', GrandView: 183.0, MandM: 0 },
  ];

  const fundingData = [
    { name: 'Q1 2024', amount: 0.21 },
    { name: 'Q2 2024', amount: 0.45 },
    { name: 'Q3 2024', amount: 0.65 },
    { name: 'Q4 2024', amount: 0.35 },
    { name: 'Q1 2025', amount: 0.28 },
    { name: 'Q2 2025', amount: 0.38 },
    { name: 'Q3 2025', amount: 1.13 },
  ];

  const competitiveRadarData = [
    { subject: 'Revenue', Cognition: 85, Sierra: 82, Replit: 95, OpenAI: 60, fullMark: 100 },
    { subject: 'Growth Rate', Cognition: 80, Sierra: 90, Replit: 98, OpenAI: 65, fullMark: 100 },
    { subject: 'Funding', Cognition: 90, Sierra: 85, Replit: 70, OpenAI: 95, fullMark: 100 },
    { subject: 'Autonomy', Cognition: 95, Sierra: 88, Replit: 85, OpenAI: 70, fullMark: 100 },
    { subject: 'Enterprise', Cognition: 75, Sierra: 92, Replit: 60, OpenAI: 85, fullMark: 100 },
    { subject: 'Moat', Cognition: 90, Sierra: 88, Replit: 65, OpenAI: 80, fullMark: 100 },
  ];

  const adoptionByUseCase = [
    { name: 'Customer Support', value: 35, color: NAVY },
    { name: 'Coding Agents', value: 28, color: SLATE_BLUE },
    { name: 'Sales & Marketing', value: 18, color: SAGE },
    { name: 'Enterprise Workflow', value: 12, color: MUTED_GOLD },
    { name: 'Legal & Other', value: 7, color: SOFT_NAVY },
  ];

  const investmentData = [
    { company: 'Sierra AI', event: 'Series C', amount: '$350M', valuation: '$10.0B', date: 'Sep 2025' },
    { company: 'Cognition (Devin)', event: 'Latest Round', amount: '$400M', valuation: '$10.2B', date: 'Sep 2025' },
    { company: 'Cognition (Devin)', event: 'Series C', amount: '~$500M', valuation: '$9.8B', date: 'Aug 2025' },
    { company: 'Replit', event: 'Growth Round', amount: '$250M', valuation: '$3.0B', date: 'Sep 2025' },
    { company: 'Magic.dev', event: 'Series B', amount: '$320M', valuation: '$1.5B', date: 'Aug 2024' },
    { company: 'Harvey AI', event: 'Series C', amount: '$100M', valuation: '$3.0B', date: '2025' },
    { company: 'LangChain', event: 'Series B', amount: '$125M', valuation: '$1.25B', date: 'Oct 2025' },
    { company: 'Adept AI', event: 'Total Raised', amount: '$415M', valuation: '$1.0B', date: '2023–2024' },
    { company: 'CrewAI', event: 'Series A', amount: '$18M', valuation: '—', date: 'Jul 2024' },
    { company: 'Cognition (Devin)', event: 'Series A', amount: '$196M', valuation: '$2.0B', date: 'Mar–Apr 2024' },
  ];

  const statCards = [
    { value: '$7.6B', label: 'Market Size (2025)' },
    { value: '49.6%', label: 'CAGR to 2033' },
    { value: '$155M', label: 'Cognition ARR' },
    { value: '$3B+', label: 'Funding (2024–25)' },
  ];

  const playerProfiles = [
    {
      name: 'Cognition (Devin)',
      arr: '$155M ARR',
      valuation: '$10.2B',
      funding: '$696M total',
      desc: 'Autonomous coding agent that processes tickets, writes, tests, and deploys code. Acquired Windsurf/Codeium for the IDE and enterprise base. Built SWE-1.5, their own coding model served via Cerebras at 950 tokens/sec.',
      edge: 'Vertical integration: custom model + IDE + codebase understanding.',
    },
    {
      name: 'Sierra AI',
      arr: '$150M ARR',
      valuation: '$10.0B',
      funding: '$350M Series C',
      desc: 'Autonomous customer service agents handling chat and voice — processing refunds, updating subscriptions, taking real actions in backend systems. Customers include WeightWatchers, Sonos, SiriusXM.',
      edge: 'Outcome-based pricing (charge per resolution) + voice overtook text by Sep 2025.',
    },
    {
      name: 'Replit',
      arr: '$253M ARR',
      valuation: '$3.0B',
      funding: '$250M growth round',
      desc: 'Browser-based IDE with Replit Agent that builds full apps from natural language. Revenue went from $16M to $253M in under a year — 15.8x growth. Mobile Agent launched Feb 2025.',
      edge: 'Demand signal is massive, but gross margins fluctuate between 36% and negative 14%.',
    },
    {
      name: 'LangChain',
      arr: '—',
      valuation: '$1.25B',
      funding: '$260M total',
      desc: 'Picks-and-shovels play for agents. LangGraph provides stateful agent orchestration. LangSmith offers observability. Under threat from model providers building their own orchestration (OpenAI Agents SDK).',
      edge: 'Developer community + infrastructure layer, but must convert to enterprise revenue.',
    },
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>AI Agents</h1>
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
            The AI agents market — autonomous systems that plan, reason, and execute multi-step tasks — was worth <strong>$7.6 billion in 2025</strong>. Grand View Research projects it will hit <strong>$183 billion by 2033</strong>, a 49.6% CAGR. This is the fastest-growing category in enterprise software.
          </p>
          <p className="text-base leading-relaxed mb-6" style={{ color: CHARCOAL }}>
            But the numbers don&apos;t capture what&apos;s actually happening. In 2024, &ldquo;AI agent&rdquo; was mostly a buzzword — demos that broke on contact with real work. By early 2026, Cognition&apos;s Devin is at <strong>$155M ARR</strong>. Sierra AI hit <strong>$150M ARR</strong> selling autonomous customer service agents to enterprise brands. Replit&apos;s agent-driven pivot took them from $16M to <strong>$253M ARR</strong> in a single year. These aren&apos;t projections. These are receipts.
          </p>

          <ul className="space-y-4 text-base leading-relaxed" style={{ color: CHARCOAL }}>
            {[
              { label: 'Market Growth:', text: <>Grand View Research sizes the market at <strong>$7.63B in 2025</strong>, projecting <strong>$183B by 2033</strong> at 49.6% CAGR. MarketsAndMarkets projects <strong>$52.6B by 2030</strong>.</> },
              { label: 'Vertical vs. Horizontal:', text: 'The market is splitting into vertical agents that own specific workflows (customer support, coding, legal) and horizontal platforms for building agents (LangGraph, CrewAI). The vertical players are generating real revenue.' },
              { label: 'Enterprise Adoption:', text: <>Gartner predicts <strong>33% of enterprise software</strong> will include agentic AI by 2028, up from less than 1% in 2024. AI agents will autonomously handle 15% of day-to-day work decisions by 2028.</> },
              { label: 'Capital Concentration:', text: <>Total disclosed funding exceeds <strong>$3 billion</strong> in 2024–2025. Cognition, Sierra, and Magic.dev alone account for over $1.5B. Founders Fund and Greenoaks Capital are the most aggressive backers.</> },
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: GOLD }} />
                <span><strong style={{ color: NAVY }}>{item.label}</strong> {item.text}</span>
              </li>
            ))}
          </ul>

          <KeyInsight>
            The agent market has moved past the demo stage. Companies like Sierra ($150M ARR with outcome-based pricing) prove that enterprises will pay for AI that actually does the work — not just assists it. The vertical players solving complete workflow problems are generating real revenue while horizontal frameworks still search for durable business models.
          </KeyInsight>
        </section>

        {/* ═══ 02 — Market Sizing ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="02" title="Market Sizing" />
          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            Three credible estimates frame the opportunity. <strong>Grand View Research</strong> sizes the market at $7.63B in 2025, projecting $183B by 2033. <strong>MarketsAndMarkets</strong> scopes a narrower segment at $52.6B by 2030. North America holds 39.6% of the market. Actual AI agent product revenue across trackable companies is probably $1–2B as of early 2026 — the analyst figures include infrastructure, services, and adjacent spending.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-2 flex flex-col">
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Market Projections ($B) — Grand View vs. MarketsAndMarkets</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm flex-1" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketSizingData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" unit="B" tickFormatter={(v) => `$${v}`} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
                      <Legend />
                      <Bar dataKey="GrandView" fill={SLATE_BLUE} name="Grand View Research" />
                      <Bar dataKey="MandM" fill={SAGE} name="MarketsAndMarkets" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>
              <p className="text-xs mt-2 italic" style={{ color: '#9CA3AF' }}>MarketsAndMarkets forecast ends at 2030. Grand View Research projects through 2033.</p>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Key Factors</h3>
              <div className="bg-white rounded-lg p-5 shadow-sm mb-4 flex-1" style={{ borderLeft: `4px solid ${SAGE}`, border: '1px solid #E5E7EB', borderLeftColor: SAGE }}>
                <h4 className="font-bold mb-3" style={{ color: SAGE }}>Growth Drivers</h4>
                <ul className="space-y-2 text-sm" style={{ color: CHARCOAL }}>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><strong style={{ color: NAVY }}>Autonomy:</strong> Agents that take real actions, not just suggest</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><strong style={{ color: NAVY }}>Voice:</strong> Sierra&apos;s voice agents overtook text — $340B call center TAM</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><strong style={{ color: NAVY }}>Infrastructure:</strong> MCP, Agents SDK forming the agent runtime layer</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-5 shadow-sm flex-1" style={{ borderLeft: '4px solid #C0392B', border: '1px solid #E5E7EB', borderLeftColor: '#C0392B' }}>
                <h4 className="font-bold mb-3" style={{ color: '#C0392B' }}>Growth Constraints</h4>
                <ul className="space-y-2 text-sm" style={{ color: CHARCOAL }}>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: '#C0392B' }} /><strong style={{ color: NAVY }}>Reliability:</strong> Full autonomy remains 2–3 years away for most use cases</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: '#C0392B' }} /><strong style={{ color: NAVY }}>Unit Economics:</strong> Replit&apos;s margins fluctuate to negative 14% from LLM costs</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: '#C0392B' }} /><strong style={{ color: NAVY }}>Multi-Agent:</strong> Coordination overhead creates reliability problems in production</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 03 — Competitive Field ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="03" title="Competitive Field" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Competitive Strength (0–100)</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={competitiveRadarData}>
                      <PolarGrid stroke="#D1D5DB" />
                      <PolarAngleAxis dataKey="subject" stroke="#6B7280" tick={{ fontSize: 10 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#D1D5DB" tick={{ fontSize: 9 }} />
                      <Radar name="Cognition" dataKey="Cognition" stroke={NAVY} fill={NAVY} fillOpacity={0.25} />
                      <Radar name="Sierra" dataKey="Sierra" stroke={SLATE_BLUE} fill={SLATE_BLUE} fillOpacity={0.25} />
                      <Radar name="Replit" dataKey="Replit" stroke={SAGE} fill={SAGE} fillOpacity={0.25} />
                      <Radar name="OpenAI" dataKey="OpenAI" stroke={MUTED_GOLD} fill={MUTED_GOLD} fillOpacity={0.25} />
                      <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartWrapper>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 justify-items-center mt-2 px-2">
                  {[
                    { name: 'Cognition', color: NAVY },
                    { name: 'Sierra', color: SLATE_BLUE },
                    { name: 'Replit', color: SAGE },
                    { name: 'OpenAI', color: MUTED_GOLD },
                  ].map(item => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-xs" style={{ color: '#6B7280' }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-center mt-2 italic" style={{ color: '#9CA3AF' }}>Scores are Kael Research assessments based on public data.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Adoption by Use Case (2025 Revenue Share)</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={adoptionByUseCase} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={'80%'} labelLine={false}
                        label={typeof window !== 'undefined' && window.innerWidth < 768 ? false : ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
                          const RADIAN = Math.PI / 180;
                          const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                          const x = cx + radius * Math.cos(-midAngle * RADIAN);
                          const y = cy + radius * Math.sin(-midAngle * RADIAN);
                          const data = adoptionByUseCase[index];
                          return (<text x={x} y={y} fill={data.color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={11}>{`${data.name} (${(percent * 100).toFixed(0)}%)`}</text>);
                        }}>
                        {adoptionByUseCase.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(v: any, name: any) => [`${v}%`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartWrapper>
                {/* Mobile legend */}
                <div className="sm:hidden mt-4 grid grid-cols-2 gap-2">
                  {adoptionByUseCase.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2 text-xs">
                      <span className="flex-shrink-0 w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span style={{ color: CHARCOAL }}>{entry.name} ({entry.value}%)</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-center mt-2 italic" style={{ color: '#9CA3AF' }}>Revenue share estimates based on trackable company revenue by segment.</p>
            </div>
          </div>

          <KeyInsight>
            Customer support is where agents first proved they could generate real revenue at scale. Sierra processed hundreds of millions of AI calls by late 2025. But coding agents are catching up fast — Cognition and Replit together represent over $400M in agent-driven ARR. The vertical winners are already separating from the pack.
          </KeyInsight>
        </section>

        {/* ═══ 04 — Key Player Profiles ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="04" title="Key Player Profiles" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {playerProfiles.map((p) => (
              <div key={p.name} className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#E5E7EB', borderTop: `3px solid ${GOLD}` }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>{p.name}</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 rounded" style={{ backgroundColor: '#F0F4FA' }}>
                    <p className="text-xs" style={{ color: '#6B7280' }}>ARR</p>
                    <p className="text-sm font-bold" style={{ color: NAVY }}>{p.arr}</p>
                  </div>
                  <div className="text-center p-2 rounded" style={{ backgroundColor: '#F0F4FA' }}>
                    <p className="text-xs" style={{ color: '#6B7280' }}>Valuation</p>
                    <p className="text-sm font-bold" style={{ color: NAVY }}>{p.valuation}</p>
                  </div>
                  <div className="text-center p-2 rounded" style={{ backgroundColor: '#F0F4FA' }}>
                    <p className="text-xs" style={{ color: '#6B7280' }}>Funding</p>
                    <p className="text-sm font-bold" style={{ color: NAVY }}>{p.funding}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-3" style={{ color: CHARCOAL }}>{p.desc}</p>
                <div className="rounded p-3" style={{ backgroundColor: '#FFFBF0', borderLeft: `3px solid ${GOLD}` }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: GOLD }}>Edge</p>
                  <p className="text-sm" style={{ color: CHARCOAL }}>{p.edge}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Other Notable Players</h3>
            {[
              { name: 'Anthropic', desc: 'Built the infrastructure layer — Claude Computer Use (Oct 2024) and MCP (Nov 2024). MCP is now the de facto standard for connecting agents to external tools. Positioning as the agent runtime rather than competing with vertical players.' },
              { name: 'OpenAI', desc: 'Operator (Jan 2025) for browser-based tasks. Codex agent mode for background coding. Agents SDK for building blocks. Advantage: 200M+ weekly ChatGPT users as a funnel. Disadvantage: agents are a feature of a broader platform, not the core product.' },
              { name: 'Harvey AI', desc: 'Legal AI agents. $310M total raised, $3B valuation. Active customers include Allen & Overy and other Am Law 100 firms. One of the clearest examples of vertical agents finding product-market fit outside code.' },
              { name: 'Adept AI', desc: 'Raised $415M for general-purpose computer-use agents. Most of the founding team was acqui-hired by Amazon in 2024. A cautionary tale about raising too much too early.' },
            ].map((p) => (
              <div key={p.name} className="bg-white rounded-lg p-5 shadow-sm border flex flex-col sm:flex-row sm:items-start gap-3" style={{ borderColor: '#E5E7EB', borderLeft: `4px solid ${SLATE_BLUE}` }}>
                <span className="font-bold text-sm flex-shrink-0 sm:w-28" style={{ color: NAVY }}>{p.name}</span>
                <p className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 05 — Investment Activity ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="05" title="Investment Activity" />
          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            Total disclosed funding into AI agent startups in 2024–2025 exceeds <strong>$3 billion</strong>. The concentration at the top is extreme: Cognition, Sierra, and Magic.dev alone account for over $1.5B. Founders Fund is the most aggressive investor, leading multiple Cognition rounds. Greenoaks Capital is the lead backer for Sierra. Sequoia, a16z, and Benchmark appear across multiple cap tables.
          </p>

          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, serif' }}>Quarterly Funding Activity ($B)</h3>
            <div className="bg-white rounded-lg border p-4 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
              <ChartWrapper>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fundingData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" unit="B" tickFormatter={(v) => `$${v}`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="amount" name="Funding ($B)" stroke={GOLD} fill={GOLD} fillOpacity={0.15} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartWrapper>
              <p className="text-xs text-center mt-2 italic" style={{ color: '#9CA3AF' }}>Includes disclosed rounds from tracked AI agent companies. Q3 2025 spike driven by Sierra, Cognition, and Replit rounds.</p>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg border shadow-sm" style={{ borderColor: '#E5E7EB', WebkitOverflowScrolling: 'touch' as any }}>
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
            Valuations at the top are stretched. Sierra at $10B on $150M ARR (67x). Cognition at $10.2B on $155M ARR (66x). These multiples price in continued hypergrowth. If either company&apos;s growth slows, the compression will be severe. Late-stage entry carries real risk.
          </KeyInsight>
        </section>

        {/* ═══ 06 — Enterprise Adoption ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="06" title="Enterprise Adoption" />
          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            Enterprise adoption of AI agents is early but accelerating. The pattern mirrors what happened with code assistants in 2023–2024: pilot programs expanding into production deployments. Companies aren&apos;t buying &ldquo;AI agents&rdquo; as a category — they&apos;re buying solutions to specific workflow problems that happen to be powered by agents.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { title: 'Customer Support', status: 'Most Mature', desc: 'Sierra, Intercom Fin, and Zendesk AI agents handle real conversations at scale. WeightWatchers reports Sierra agents match or exceed human CSAT scores. Voice interactions overtook text at Sierra by September 2025.', color: SAGE },
              { title: 'Coding Agents', status: 'Rapidly Growing', desc: 'Cognition\'s Devin handles tickets and deploys code autonomously. Cursor background agents run tasks while devs work on other things. The shift from "AI assists" to "AI does the work while you review" is underway.', color: SLATE_BLUE },
              { title: 'Sales & Marketing', status: 'Gaining Traction', desc: 'Salesforce Agentforce (Sep 2024) deploys agents for lead qualification and outreach. Reported significant new bookings impact in Q4 2025. The enterprise go-to-market for agent products is proven here.', color: MUTED_GOLD },
              { title: 'Enterprise Workflow', status: 'Emerging', desc: 'ServiceNow, KPMG, and Siemens building agent platforms for finance, procurement, HR, and IT automation. Siemens\' industrial AI agents (May 2025) manage manufacturing workflows without human oversight.', color: SOFT_NAVY },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#E5E7EB', borderLeft: `4px solid ${item.color}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold" style={{ color: NAVY }}>{item.title}</h3>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded" style={{ color: item.color, backgroundColor: `${item.color}15` }}>{item.status}</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <KeyInsight>
            The common thread across every successful agent deployment: clear task definitions and measurable outcomes. Customer support (resolution rate), coding (tests pass or fail), and legal (document accuracy) work because you can verify the output. General &ldquo;knowledge work automation&rdquo; lags because the tasks are fuzzier and harder to evaluate.
          </KeyInsight>
        </section>

        {/* ═══ 07 — Key Trends ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="07" title="Key Trends" />
          <div className="space-y-6">
            {[
              { title: 'Code agents are the proving ground', desc: 'Software development is where agents first demonstrated real autonomy. The task is well-defined, the feedback loop is tight (tests pass or fail), and the output is verifiable. Devin, Cursor background agents, Replit Agent, and Copilot Workspace all proved agents can ship production code.' },
              { title: 'Computer use is the next interface', desc: 'Anthropic\'s computer use, OpenAI\'s Operator, and Google\'s Project Mariner all bet on agents operating software through the screen. This eliminates the integration bottleneck — no APIs needed. The technology works but remains slow and error-prone. Give it 12–18 months.' },
              { title: 'Multi-agent systems: overhyped today, important tomorrow', desc: 'CrewAI, AutoGen, and LangGraph enable multiple agents to collaborate. The demos impress. Production deployments are rare. Single agent systems held 59% market share in 2025. Multi-agent will matter, but not yet.' },
              { title: 'Agent infrastructure is becoming a category', desc: 'MCP (Anthropic), Agents SDK (OpenAI), LangGraph, and observability tools like LangSmith are forming a dedicated infrastructure layer. The parallel to the cloud infrastructure boom is clear: the companies selling shovels tend to build more durable businesses.' },
              { title: 'Voice agents are a sleeper hit', desc: 'Sierra\'s voice agents overtook text within a year of launch. Call centers spend $340B globally. AI voice agents handling even simple calls — appointment scheduling, order status, basic troubleshooting — represent genuine labor replacement, not just productivity enhancement.' },
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

        {/* ═══ 08 — What This Means for Investors ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="08" title="What This Means for Investors" />
          <div className="space-y-4">
            {[
              { title: 'The agent market is real, not a rebrand.', desc: 'Unlike the chatbot hype of 2016–2018, today\'s AI agents generate measurable revenue and demonstrate measurable autonomy. Sierra at $150M ARR with outcome-based pricing is proof enterprises pay for AI that does the work.' },
              { title: 'Vertical agents are the better bet.', desc: 'Companies that own a complete workflow build stronger moats than general-purpose frameworks. Sierra\'s value is in backend integrations, voice infrastructure, and enterprise sales — not the base LLM. Same for Cognition: the IDE, the custom model, and codebase understanding are the moat.' },
              { title: 'Valuations are stretched at the top.', desc: 'Sierra at 67x ARR. Cognition at 66x. These multiples price in continued hypergrowth. If growth decelerates, the compression will be severe. Late-stage entry carries meaningful risk.' },
              { title: 'The infrastructure layer offers better risk-adjusted returns.', desc: 'LangChain at $1.25B on $260M total funding is more reasonable than application-layer valuations. But infrastructure plays face platform risk — OpenAI and Anthropic building their own agent SDKs is a direct threat.' },
              { title: 'Watch the voice agent space.', desc: 'Call centers are a $340B global industry. If AI agents replace even 20% of call center labor, that\'s a $68B market in customer service alone. This isn\'t productivity enhancement — it\'s headcount replacement, a different and larger economic argument.' },
              { title: 'Avoid the "agent wrapper" trap.', desc: 'Companies that take an LLM, add a planning loop, and call it an agent are 2023\'s ChatGPT wrappers revisited. Winners are building proprietary models (Cognition\'s SWE-1.5), proprietary data loops (Sierra\'s interaction data), or proprietary infrastructure (Anthropic\'s MCP).' },
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

          <KeyInsight>
            The AI agents market in February 2026 looks a lot like cloud computing in 2010: obviously important, growing fast, with a few clear leaders and a long tail of companies that won&apos;t survive. The winners are already separating from the pack. The window to invest at reasonable valuations is closing.
          </KeyInsight>
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
export default function AIAgentsBriefPage() {
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
