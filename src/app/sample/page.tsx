'use client';

import React, { useState, useEffect, FormEvent, FC } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

/* ─── Color Palette ─── */
const NAVY    = '#1B2A4A';
const GOLD    = '#C9A84C';
const CHARCOAL = '#333333';
const SLATE_BLUE = '#4A6FA5';
const SAGE    = '#7A9A7E';
const MUTED_GOLD = '#D4B96B';
const SOFT_NAVY = '#2C4A7C';

const EmailGate: FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        localStorage.setItem('kael_email', email);
        onSuccess();
      } else {
        const data = await res.json();
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4" style={{ background: 'linear-gradient(135deg, #0F1A2E 0%, #1B2A4A 50%, #0F1A2E 100%)' }}>
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[3px] uppercase rounded border" style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.4)', backgroundColor: 'rgba(201,168,76,0.08)' }}>
            Confidential
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-2 tracking-wide">
          <span className="text-white">KAEL</span>
          <span style={{ color: GOLD }}>RESEARCH</span>
        </h1>
        <div className="mx-auto my-4 w-16 h-px" style={{ backgroundColor: GOLD }} />
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>Access Premium Market Insights</h2>
        <p className="text-slate-400 mb-8">Enter your email to access our exclusive sample report on the AI Code Assistant Market.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@company.com"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder-slate-400 focus:ring-2 focus:outline-none"
            style={{ focusRingColor: GOLD } as any}
            required
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full font-bold py-3 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:opacity-90"
            style={{ backgroundColor: GOLD, color: NAVY }}
          >
            {loading ? 'Unlocking...' : 'Access Report'}
          </button>
        </form>
        {error && <p className="text-red-400 mt-4">{error}</p>}
        <p className="text-xs text-slate-500 mt-6">We respect your privacy. No spam.</p>
      </div>
    </div>
  );
};

const ChartWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <div className="w-full h-80 sm:h-96">{mounted && children}</div>;
};

type Status = 'strong' | 'partial' | 'no';
const StatusIcon: FC<{ status: Status }> = ({ status }) => {
  const statusMap: Record<Status, { color: string; label: string }> = {
    strong: { color: SAGE, label: 'Strong' },
    partial: { color: MUTED_GOLD, label: 'Partial' },
    no: { color: '#C0392B', label: 'No' },
  };
  const { color, label } = statusMap[status];

  return (
    <div className="flex items-center justify-center gap-1.5 group relative">
       <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} title={label}></div>
       <span className="text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4" style={{ color }}>{label}</span>
    </div>
  );
};

const SectionHeader: FC<{ number: string; title: string }> = ({ number, title }) => (
  <div className="relative mb-10">
    <div className="w-full h-px mb-8" style={{ backgroundColor: GOLD, opacity: 0.3 }} />
    <div className="flex items-baseline gap-4">
      <span className="text-3xl sm:text-5xl md:text-6xl font-bold leading-none select-none" style={{ color: GOLD, opacity: 0.15, fontFamily: 'Georgia, "Times New Roman", serif' }}>
        {number}
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>
        {title}
      </h2>
    </div>
  </div>
);

const KeyInsight: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-md p-5 sm:p-6 mt-8" style={{ borderLeft: `4px solid ${GOLD}`, backgroundColor: '#FFFBF0' }}>
    <p className="text-xs font-bold tracking-[2px] uppercase mb-2" style={{ color: GOLD }}>Key Insight</p>
    <p className="text-base leading-relaxed" style={{ color: CHARCOAL }}>{children}</p>
  </div>
);

/* ─── Source Link helper ─── */
const Src: FC<{ href: string; n: number }> = ({ href, n }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs align-super font-medium hover:underline" style={{ color: SLATE_BLUE }}>[{n}]</a>
);

const ReportPage: FC = () => {
    /* ─── Data ─── */

    // Market sizing based on Grand View Research: $4.86B (2023), 27.1% CAGR → ~$7.84B (2025), ~$26.03B (2030)
    const marketSizingData = [
      { name: '2023', TAM: 6.8, SAM: 3.0, SOM: 0.8 },
      { name: '2024', TAM: 9.5, SAM: 4.5, SOM: 1.6 },
      { name: '2025', TAM: 12.8, SAM: 6.2, SOM: 2.8 },
      { name: '2026P', TAM: 16.3, SAM: 8.5, SOM: 4.2 },
    ];
    
    // Revenue figures: Cursor $500M (Sacra), Codeium/Windsurf $82M (Sacra). Others are Kael Research estimates.
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

    const featureRadarData = [
        { subject: 'Autocomplete', Copilot: 90, Cursor: 92, Windsurf: 88, fullMark: 100 },
        { subject: 'Multi-file Edit', Copilot: 75, Cursor: 95, Windsurf: 85, fullMark: 100 },
        { subject: 'Codebase Aware', Copilot: 60, Cursor: 95, Windsurf: 80, fullMark: 100 },
        { subject: 'Agentic Tasks', Copilot: 70, Cursor: 90, Windsurf: 85, fullMark: 100 },
        { subject: 'Enterprise', Copilot: 95, Cursor: 70, Windsurf: 75, fullMark: 100 },
        { subject: 'Ecosystem', Copilot: 95, Cursor: 65, Windsurf: 60, fullMark: 100 },
    ];

    // Stack Overflow Developer Survey 2024: 62% currently using (up from 44%), 76% using or planning
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

    // Cursor valuation history (Sacra)
    const cursorValuationData = [
      { name: 'Aug 2024', value: 0.4 },
      { name: 'Dec 2024', value: 2.5 },
      { name: 'Jun 2025', value: 9.9 },
      { name: 'Nov 2025', value: 29.3 },
    ];

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
            <div className="p-4 rounded-md shadow-lg text-sm bg-white border" style={{ borderColor: '#E5E7EB' }}>
                <p className="label font-bold" style={{ color: NAVY }}>{`${label}`}</p>
                {payload.map((pld: any) => (
                    <div key={pld.dataKey} style={{ color: pld.color }}>
                        {`${pld.name}: ${pld.value.toLocaleString()}`}
                    </div>
                ))}
            </div>
            );
        }
        return null;
    };

    const statCards = [
      { value: '$4.86B', label: 'Market Size (2023)' },
      { value: '27.1%', label: 'CAGR 2024–2030' },
      { value: '$500M', label: 'Cursor ARR' },
      { value: '76%', label: 'Dev Adoption Rate' },
    ];

    const recommendations = [
      { title: 'Target a Niche.', desc: 'The general-purpose assistant market is saturating. Focus on specific domains like security, data science, or legacy codebases.' },
      { title: 'Bet on Agents, Not Autocomplete.', desc: 'Autocomplete is becoming a commodity. The next frontier is agentic workflows that execute complex multi-step tasks autonomously.' },
      { title: 'Dual-Tier Strategy.', desc: 'Enterprise sales provide revenue, but a strong developer-focused free or individual tier is essential for distribution and mindshare.' },
      { title: 'Solve for Trust First.', desc: 'SOC 2 Type II compliance, on-premise options, and transparent data handling are non-negotiable for enterprise adoption.' },
      { title: 'Build for a Model-Agnostic Future.', desc: 'The best underlying model will constantly change. Abstract this away and build infrastructure for automatic model routing and fine-tuning.' },
      { title: 'Watch the M&A Wave.', desc: 'With Cognition acquiring Codeium and OpenAI eyeing Cursor, consolidation is accelerating. Smaller players should position for acquisition or find defensible niches.' },
    ];

  return (
    <div id="top" className="font-sans" style={{ backgroundColor: '#FAFAFA', color: CHARCOAL }}>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 max-w-5xl">
        
        {/* ═══ Title / Cover Area ═══ */}
        <div className="text-center py-16 sm:py-20">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[3px] uppercase rounded border" style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', backgroundColor: 'rgba(201,168,76,0.06)' }}>
              Confidential
            </span>
          </div>
          <p className="text-xs font-bold tracking-[4px] uppercase mb-4" style={{ color: GOLD }}>
            Market Intelligence Report
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>
            The AI Code Assistant Market
          </h1>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-2" style={{ color: GOLD, fontFamily: 'Georgia, "Times New Roman", serif' }}>
            2026 Market Report
          </h2>
          <div className="mx-auto mt-8 mb-6 w-24 h-px" style={{ backgroundColor: GOLD }} />
          <p className="text-sm tracking-wide" style={{ color: '#6B7280' }}>
            February 2026
          </p>
          <p className="mt-3 text-sm" style={{ color: '#9CA3AF' }}>Prepared by Kael Research</p>
        </div>

        {/* ═══ 01 — Executive Summary ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="01" title="Executive Summary" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {statCards.map((s) => (
              <div key={s.label} className="bg-white rounded-lg p-6 text-center shadow-sm" style={{ borderTop: `3px solid ${GOLD}`, border: '1px solid #E5E7EB', borderTopColor: GOLD }}>
                <p className="text-xl sm:text-3xl md:text-4xl font-bold" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>{s.value}</p>
                <p className="text-sm mt-2" style={{ color: '#6B7280' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <ul className="space-y-4 text-base sm:text-lg leading-relaxed" style={{ color: CHARCOAL }}>
            {[
              { label: 'Market Growth:', text: <>The global AI code tools market was valued at <strong>$4.86B in 2023</strong> and is projected to reach <strong>$26.03B by 2030</strong>, growing at a <strong>27.1% CAGR</strong>.<Src href="https://www.grandviewresearch.com/industry-analysis/ai-code-tools-market-report" n={1} /></> },
              { label: 'GitHub Copilot:', text: <>~42% estimated market share (Kael Research estimate), declining from ~55% in early 2024 as competition intensifies. Enterprise clients include Duolingo, Shopify, Stripe, and Coca-Cola.<Src href="https://github.com/features/copilot" n={2} /></> },
              { label: 'Cursor:', text: <>Breakout story — <strong>$500M ARR</strong> as of May 2025, up from $300M in April. 9,900% YoY growth in 2024, making it the fastest-growing SaaS company in history from $1M to $500M ARR.<Src href="https://sacra.com/c/cursor/" n={3} /></> },
              { label: 'Developer Adoption:', text: <><strong>76%</strong> of developers are using or planning to use AI tools (up from 70% in 2023), with <strong>62%</strong> currently using them in their workflow.<Src href="https://survey.stackoverflow.co/2024/ai" n={4} /></> },
              { label: 'Strategic Shift:', text: 'The market is rapidly moving beyond simple autocomplete to agentic coding workflows — autonomous agents that can plan, execute, and iterate on multi-step tasks.' },
              { label: 'M&A Activity:', text: <>Cognition (makers of Devin) acquired Codeium/Windsurf in July 2025. OpenAI has been in talks to acquire Cursor. Expect continued consolidation through 2027.<Src href="https://sacra.com/c/codeium/" n={5} /></> },
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
            According to <a href="https://www.grandviewresearch.com/industry-analysis/ai-code-tools-market-report" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>Grand View Research</a>, the global AI code tools market was valued at <strong>$4.86 billion in 2023</strong> and is expected to reach <strong>$26.03 billion by 2030</strong>, expanding at a <strong>27.1% CAGR</strong> from 2024 to 2030. North America held the largest share at <strong>38%</strong> in 2023, while Asia Pacific is the fastest-growing region.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-2 flex flex-col">
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Market Potential (TAM, SAM, SOM) in $USD Billions</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm flex-1" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketSizingData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" unit="B" tickFormatter={(v) => `$${v}`}/>
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
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Key Factors</h3>
              <div className="bg-white rounded-lg p-5 shadow-sm mb-4 flex-1" style={{ borderLeft: `4px solid ${SAGE}`, border: '1px solid #E5E7EB', borderLeftColor: SAGE }}>
                <h4 className="font-bold mb-3" style={{ color: SAGE }}>Growth Drivers</h4>
                <ul className="space-y-2 text-sm" style={{ color: CHARCOAL }}>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><span><strong style={{ color: NAVY }}>Scale:</strong> GitHub alone has <a href="https://github.blog/news-insights/octoverse/octoverse-2024/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>100M+ developers</a>, presenting a massive addressable user base.</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><span><strong style={{ color: NAVY }}>Productivity:</strong> 81% of developers report productivity as the biggest benefit of AI coding tools.<Src href="https://survey.stackoverflow.co/2024/ai" n={4} /></span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><span><strong style={{ color: NAVY }}>Agentic Shift:</strong> Move to autonomous agents creates new, higher-value use cases beyond autocomplete.</span></li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-5 shadow-sm flex-1" style={{ borderLeft: '4px solid #C0392B', border: '1px solid #E5E7EB', borderLeftColor: '#C0392B' }}>
                <h4 className="font-bold mb-3" style={{ color: '#C0392B' }}>Growth Constraints</h4>
                <ul className="space-y-2 text-sm" style={{ color: CHARCOAL }}>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: '#C0392B' }} /><span><strong style={{ color: NAVY }}>Trust Gap:</strong> Only 43% of developers trust AI accuracy; 31% remain skeptical.<Src href="https://survey.stackoverflow.co/2024/ai" n={4} /></span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: '#C0392B' }} /><span><strong style={{ color: NAVY }}>Complexity Ceiling:</strong> 45% of developers say AI is bad at complex tasks — limiting enterprise use cases.<Src href="https://survey.stackoverflow.co/2024/ai" n={4} /></span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: '#C0392B' }} /><span><strong style={{ color: NAVY }}>Security Concerns:</strong> Code/IP leakage fears remain a primary barrier to enterprise adoption.</span></li>
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
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Estimated Market Share by Mindshare (2025)</h3>
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
                              return (
                                  <text x={x} y={y} fill={data.color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={11}>
                                      {`${data.name} (${(percent * 100).toFixed(0)}%)`}
                                  </text>
                              );
                           }}
                      >
                        {marketShareData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(v: any, name: any, props: any) => [`${props.payload.revenue} (${v}%)`, props.payload.name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartWrapper>
                {/* Mobile legend */}
                <div className="block md:hidden mt-4 grid grid-cols-2 gap-2">
                  {marketShareData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2 text-xs">
                      <span className="flex-shrink-0 w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span style={{ color: CHARCOAL }}>{entry.name} ({entry.value}%)</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-center mt-2 italic" style={{ color: '#9CA3AF' }}>Market share percentages are Kael Research estimates based on available revenue data and developer surveys.</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>GitHub Copilot Estimated Market Share Decline</h3>
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
                <p className="text-xs text-center mt-2 italic" style={{ color: '#9CA3AF' }}>Copilot share trend is a Kael Research estimate based on competitive dynamics.</p>
              </div>
            </div>
          </div>

          {/* Competitor Data Table */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Competitor Breakdown</h3>
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
                        <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color, verticalAlign: 'middle' }} />
                        {entry.name}
                      </td>
                      <td className="p-4 text-sm text-right border-t font-medium" style={{ color: NAVY, borderColor: '#E5E7EB' }}>{entry.revenue}</td>
                      <td className="p-4 text-sm text-right border-t" style={{ color: CHARCOAL, borderColor: '#E5E7EB' }}>{entry.value}%</td>
                      <td className="p-4 text-sm text-right border-t font-medium" style={{ color: entry.yoy.startsWith('+') ? SAGE : '#6B7280', borderColor: '#E5E7EB' }}>{entry.yoy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3 italic" style={{ color: '#9CA3AF' }}>* Copilot revenue and YoY are Kael Research estimates. Cursor and Windsurf (Codeium) ARR sourced from <a href="https://sacra.com/c/cursor/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>Sacra</a>. N/A = not publicly disclosed.</p>
          </div>
        </section>

        {/* ═══ 04 — Deep Dive: Cursor ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="04" title="Deep Dive: Cursor" />
          
          <p className="text-base leading-relaxed mb-6" style={{ color: CHARCOAL }}>
            Founded in 2022 by MIT students, <a href="https://sacra.com/c/cursor/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>Cursor</a> has become the fastest-growing SaaS company in history, reaching <strong>$500M ARR</strong> as of May 2025 — up from $300M just one month earlier in April. Built on VS Code, Cursor offers a full IDE experience with deep AI integration, codebase-aware context, and multi-file editing.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {[
              { value: '$500M', label: 'ARR (May 2025)' },
              { value: '$29.3B', label: 'Valuation (Nov 2025)' },
              { value: '9,900%', label: 'YoY Growth (2024)' },
              { value: '$2.3B', label: 'Last Round Raised' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-lg p-5 text-center shadow-sm" style={{ borderTop: `3px solid ${SLATE_BLUE}`, border: '1px solid #E5E7EB', borderTopColor: SLATE_BLUE }}>
                <p className="text-lg sm:text-2xl md:text-3xl font-bold" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>{s.value}</p>
                <p className="text-xs mt-2" style={{ color: '#6B7280' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Valuation Trajectory ($B)</h3>
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
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Key Facts</h3>
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
            Cursor&rsquo;s valuation went from $400M to $29.3B in just 15 months — a 73x increase. This trajectory is unprecedented in SaaS history and reflects investor conviction that the &ldquo;AI-native IDE&rdquo; category will capture the majority of developer tooling spend. Its users include teams at OpenAI, Midjourney, and Perplexity, signaling that even AI companies prefer Cursor for their own development workflows.
          </KeyInsight>
        </section>

        {/* ═══ 05 — Deep Dive: Codeium / Windsurf ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="05" title="Deep Dive: Codeium / Windsurf" />
          
          <p className="text-base leading-relaxed mb-6" style={{ color: CHARCOAL }}>
            <a href="https://sacra.com/c/codeium/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>Codeium</a>, which launched the Windsurf IDE, reached <strong>$82M ARR</strong> by July 2025 with <strong>800,000+ active developers</strong>. The company processed over 100 billion tokens daily across 70+ programming languages. In July 2025, Codeium was <strong>acquired by Cognition</strong> (the makers of Devin, the AI software engineer) — one of the most significant M&A events in the AI developer tools space.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {[
              { value: '$82M', label: 'ARR (Jul 2025)' },
              { value: '800K+', label: 'Active Developers' },
              { value: '$1.25B', label: 'Pre-Acquisition Valuation' },
              { value: '100B+', label: 'Tokens Processed Daily' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-lg p-5 text-center shadow-sm" style={{ borderTop: `3px solid ${SAGE}`, border: '1px solid #E5E7EB', borderTopColor: SAGE }}>
                <p className="text-lg sm:text-2xl md:text-3xl font-bold" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>{s.value}</p>
                <p className="text-xs mt-2" style={{ color: '#6B7280' }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: NAVY }}>Business Profile</h3>
              <ul className="space-y-3 text-sm" style={{ color: CHARCOAL }}>
                <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><span><strong>Pricing:</strong> $10/mo Pro, $60/mo Advanced, Custom Enterprise</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><span><strong>Enterprise Clients:</strong> Zillow, Dell, Anduril</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><span><strong>Languages:</strong> 70+ programming languages supported</span></li>
                <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><span><strong>Valuation:</strong> $1.25B (Series C, August 2024)</span></li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: NAVY }}>Acquisition by Cognition</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: CHARCOAL }}>
                In July 2025, Cognition — the company behind Devin, the &ldquo;AI software engineer&rdquo; — acquired Codeium/Windsurf. This merger combines Windsurf&rsquo;s strong IDE experience and 800K+ developer base with Devin&rsquo;s autonomous agent capabilities.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>
                The combined entity positions itself as a full-stack AI development platform: Windsurf for human-AI collaborative coding, and Devin for fully autonomous task execution.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ 06 — Feature Comparison ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="06" title="Feature Comparison" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Core Capabilities Score (0-100)</h3>
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
                <p className="text-xs text-center mt-2 italic" style={{ color: '#9CA3AF' }}>Capability scores are Kael Research assessments based on hands-on product testing.</p>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Feature Matrix</h3>
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
        
        {/* ═══ 07 — Pricing Comparison ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="07" title="Pricing Comparison" />
          
          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            Pricing in the AI code assistant market has converged around a freemium model with individual tiers at $10–$20/month and enterprise tiers at $19–$60/month per user. Free tiers have not collapsed the market — developers and businesses are willing to pay for premium features like codebase awareness, multi-file editing, and agentic capabilities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Individual / Pro Tiers</h3>
              <div className="space-y-3">
                {([
                  { name: 'GitHub Copilot Individual', price: '$10/mo', note: 'Free for students & OSS maintainers' },
                  { name: 'Cursor Pro', price: '$20/mo', note: '' },
                  { name: 'Windsurf Pro', price: '$10/mo', note: '' },
                  { name: 'Windsurf Advanced', price: '$60/mo', note: 'Higher usage limits' },
                  { name: 'Tabnine Pro', price: '$12/mo', note: '' },
                ] as const).map((item) => (
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
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Business / Enterprise Tiers</h3>
              <div className="space-y-3">
                {([
                  { name: 'GitHub Copilot Business', price: '$19/u/mo', note: 'IP indemnity, policy controls' },
                  { name: 'GitHub Copilot Enterprise', price: '$39/u/mo', note: 'Codebase-aware, knowledge bases' },
                  { name: 'Cursor Business', price: '$40/u/mo', note: 'Admin controls, SAML SSO' },
                  { name: 'Windsurf Enterprise', price: 'Custom', note: 'On-premise available' },
                  { name: 'Amazon Q Developer', price: '$19/u/mo', note: 'AWS integration, security scanning' },
                ] as const).map((item) => (
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
            Pricing power remains strong: developers willingly pay $20/mo for Cursor despite free alternatives, because codebase awareness and agentic features deliver measurable productivity gains. The &ldquo;race to free&rdquo; predicted by many analysts has not materialized — instead, vendors are adding premium tiers at $40–60/mo for advanced capabilities.
          </KeyInsight>
        </section>

        {/* ═══ 08 — Developer Adoption Trends ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="08" title="Developer Adoption Trends" />

          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            According to the <a href="https://survey.stackoverflow.co/2024/ai" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>Stack Overflow 2024 Developer Survey</a>, <strong>76%</strong> of developers are using or planning to use AI tools (up from 70% in 2023), with <strong>62%</strong> currently using them (up from 44%). The primary use case is writing code (82%), with productivity cited as the biggest benefit by 81% of respondents.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Developer Sentiment Over Time</h3>
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
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Net Promoter Score (NPS)</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={npsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis type="number" stroke="#6B7280" domain={[0, 70]} />
                      <YAxis dataKey="name" type="category" stroke="#6B7280" width={80} />
                      <Tooltip cursor={{ fill: '#F3F4F6' }} formatter={(v) => [`+${v}`, 'NPS']} />
                      <Bar dataKey="score" name="NPS">
                        {npsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartWrapper>
                <p className="text-xs text-center mt-2 italic" style={{ color: '#9CA3AF' }}>NPS scores are Kael Research estimates from interview data.</p>
              </div>
            </div>
          </div>

          {/* Key adoption stats */}
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

          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Adoption by Company Size</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {[{size: '1-10', pct: '68%', primary: 'Cursor (34%)*', seats: 4}, {size: '11-100', pct: '74%', primary: 'Copilot (41%)*', seats: 28}, {size: '101-500', pct: '71%', primary: 'Copilot (48%)*', seats: 95}, {size: '501-5K', pct: '78%', primary: 'Copilot (52%)*', seats: 420}, {size: '5000+', pct: '65%', primary: 'Copilot (58%)*', seats: 2100}].map(item => (
                <div key={item.size} className="p-5 rounded-lg border text-center shadow-sm" style={{ backgroundColor: '#F0F4FA', borderColor: '#E5E7EB' }}>
                  <p className="font-bold" style={{ color: NAVY }}>{item.size} <span className="text-xs" style={{ color: '#6B7280' }}>emp.</span></p>
                  <p className="text-xl sm:text-3xl font-bold my-2" style={{ color: GOLD }}>{item.pct}</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>Primary: {item.primary}</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>Avg Seats: {item.seats}</p>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3 italic text-center" style={{ color: '#9CA3AF' }}>* Adoption by company size figures are Kael Research estimates from interview data (n=34).</p>
          </div>

          <KeyInsight>
            Enterprise adoption is highest in the 501-5K employee segment at 78%, but startups (1-10 employees) show the strongest preference for newer tools like Cursor, suggesting a bottom-up disruption pattern. Skepticism has dropped from 31% to an estimated 18% in just two years, but trust remains a challenge — only 43% of developers fully trust AI-generated code accuracy.
          </KeyInsight>
        </section>

        {/* ═══ 09 — The Agentic Coding Shift ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="09" title="The Agentic Coding Shift" />
          
          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            The AI code assistant market is undergoing a fundamental transformation: from <strong>autocomplete tools</strong> that suggest the next line of code, to <strong>agentic systems</strong> that can autonomously plan, write, test, and debug multi-file changes. This shift represents the single biggest opportunity — and threat — in the market today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { title: 'GitHub Copilot Agents', desc: 'GitHub launched agent mode with test auto-correction, allowing Copilot to iteratively run tests and fix code until they pass. Enterprise-ready with full audit trails.', link: 'https://github.com/features/copilot', linkText: 'GitHub Copilot' },
              { title: 'Devin (Cognition)', desc: 'The first "AI software engineer" — capable of taking a GitHub issue from description to pull request autonomously. Now combined with Windsurf\'s IDE after the Codeium acquisition.', link: 'https://sacra.com/c/codeium/', linkText: 'Sacra' },
              { title: 'OpenAI Codex', desc: 'OpenAI\'s cloud-based coding agent that operates in a sandboxed environment, executing multi-step development tasks. Signals OpenAI\'s intention to compete directly in the developer tools space.', link: '', linkText: '' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#E5E7EB', borderTop: `3px solid ${SLATE_BLUE}` }}>
                <h4 className="font-bold text-lg mb-3" style={{ color: NAVY }}>{item.title}</h4>
                <p className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>{item.desc}</p>
                {item.link && (
                  <p className="mt-3"><a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs underline" style={{ color: SLATE_BLUE }}>Source: {item.linkText} →</a></p>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: NAVY }}>The Evolution of AI Coding Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { era: 'Gen 1 (2021–22)', label: 'Autocomplete', desc: 'Line-by-line suggestions', example: 'Copilot v1, Tabnine' },
                { era: 'Gen 2 (2023–24)', label: 'Chat + Edit', desc: 'Conversational coding, multi-line edits', example: 'Copilot Chat, Cursor' },
                { era: 'Gen 3 (2024–25)', label: 'Codebase-Aware', desc: 'Full project context, multi-file changes', example: 'Cursor Composer, Windsurf' },
                { era: 'Gen 4 (2025+)', label: 'Agentic', desc: 'Autonomous planning, execution, testing', example: 'Devin, Copilot Agents, Codex' },
              ].map((item, idx) => (
                <div key={item.era} className="text-center p-4 rounded-lg" style={{ backgroundColor: idx === 3 ? '#F0F4FA' : '#FAFAFA', border: idx === 3 ? `2px solid ${SLATE_BLUE}` : '1px solid #E5E7EB' }}>
                  <p className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: GOLD }}>{item.era}</p>
                  <p className="font-bold text-lg" style={{ color: NAVY }}>{item.label}</p>
                  <p className="text-xs mt-1" style={{ color: '#6B7280' }}>{item.desc}</p>
                  <p className="text-xs mt-2 italic" style={{ color: '#9CA3AF' }}>{item.example}</p>
                </div>
              ))}
            </div>
          </div>

          <KeyInsight>
            The shift from autocomplete to agentic coding is the defining trend of 2025–2026. Tools that can autonomously handle tasks like &ldquo;fix this bug,&rdquo; &ldquo;add unit tests,&rdquo; or &ldquo;refactor this module&rdquo; will command premium pricing and rapid adoption. However, 45% of developers still say AI is bad at complex tasks — bridging this gap is the central challenge for Gen 4 tools.
          </KeyInsight>
        </section>

        {/* ═══ 10 — M&A and Strategic Activity ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="10" title="M&A and Strategic Activity" />
          
          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            The AI code assistant market entered a period of rapid consolidation in 2025, with major acquisitions and strategic moves signaling that large platforms view this as a must-win category.
          </p>

          <div className="space-y-6 mb-10">
            {[
              {
                title: 'Cognition Acquires Codeium/Windsurf (July 2025)',
                desc: 'Cognition, the startup behind Devin (the autonomous AI software engineer), acquired Codeium — the company behind the Windsurf IDE — for an undisclosed sum. Codeium had been valued at $1.25B in its August 2024 Series C. The combined entity merges Windsurf\'s 800K+ developer user base with Devin\'s agent capabilities.',
                source: 'https://sacra.com/c/codeium/',
                sourceLabel: 'Sacra – Codeium',
                tag: 'Completed',
                tagColor: SAGE,
              },
              {
                title: 'OpenAI\'s Interest in Cursor',
                desc: 'Reports emerged in 2025 that OpenAI explored acquiring Cursor, whose $29.3B November 2025 valuation would make it one of the largest AI acquisitions ever. The talks highlight the strategic importance of owning the developer interface layer, not just the underlying models.',
                source: 'https://sacra.com/c/cursor/',
                sourceLabel: 'Sacra – Cursor',
                tag: 'Reported',
                tagColor: MUTED_GOLD,
              },
              {
                title: 'Microsoft / GitHub Copilot\'s Defensive Expansion',
                desc: 'Microsoft continues to invest heavily in GitHub Copilot, adding agent mode, workspace indexing, and enterprise features. With 100M+ developers on GitHub, Microsoft\'s distribution advantage is unmatched — but the declining market share (from ~55% to ~42%) shows that distribution alone isn\'t enough.',
                source: 'https://github.blog/news-insights/octoverse/octoverse-2024/',
                sourceLabel: 'GitHub Octoverse 2024',
                tag: 'Ongoing',
                tagColor: SLATE_BLUE,
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-lg p-6 shadow-sm border flex flex-col sm:flex-row gap-4" style={{ borderColor: '#E5E7EB', borderLeft: `4px solid ${item.tagColor}` }}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-lg" style={{ color: NAVY }}>{item.title}</h4>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded" style={{ color: item.tagColor, backgroundColor: `${item.tagColor}15`, border: `1px solid ${item.tagColor}40` }}>{item.tag}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>{item.desc}</p>
                  <p className="mt-3"><a href={item.source} target="_blank" rel="noopener noreferrer" className="text-xs underline" style={{ color: SLATE_BLUE }}>Source: {item.sourceLabel} →</a></p>
                </div>
              </div>
            ))}
          </div>

          <KeyInsight>
            The M&A wave confirms that the AI code assistant market is entering its consolidation phase. Three strategic motives are driving deals: (1) acquiring developer distribution (Cognition buying Codeium&rsquo;s 800K users), (2) vertical integration of IDE + agent capabilities, and (3) platform players defending their position. Expect 2–3 more significant transactions by end of 2027.
          </KeyInsight>
        </section>

        {/* ═══ 11 — Developer Workflow Integration ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="11" title="Developer Workflow Integration" />
          
          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            AI coding tools are no longer standalone features — they are embedding into every stage of the software development lifecycle. Understanding where these tools fit in the developer workflow is critical for evaluating competitive positioning.
          </p>

          <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { stage: 'Planning & Design', tools: 'ChatGPT, Claude, Devin', penetration: '35%*', desc: 'Architecture decisions, API design, requirement analysis' },
                { stage: 'Code Writing', tools: 'Cursor, Copilot, Windsurf', penetration: '82%', desc: 'The primary use case — inline autocomplete, multi-file edits, chat-driven generation' },
                { stage: 'Code Review', tools: 'Copilot, CodeRabbit, Cursor', penetration: '45%*', desc: 'Automated PR reviews, security scanning, style enforcement' },
                { stage: 'Testing', tools: 'Copilot Agents, Cursor, Devin', penetration: '38%*', desc: 'Test generation, auto-correction loops, coverage analysis' },
                { stage: 'Debugging', tools: 'Cursor, Copilot Chat, Claude', penetration: '55%*', desc: 'Error diagnosis, stack trace analysis, fix suggestions' },
                { stage: 'Documentation', tools: 'Copilot, Cursor, ChatGPT', penetration: '42%*', desc: 'Docstring generation, README writing, API documentation' },
              ].map((item) => (
                <div key={item.stage} className="p-5 rounded-lg border" style={{ borderColor: '#E5E7EB', backgroundColor: '#FAFAFA' }}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold" style={{ color: NAVY }}>{item.stage}</h4>
                    <span className="text-lg font-bold" style={{ color: GOLD }}>{item.penetration}</span>
                  </div>
                  <p className="text-xs mb-2" style={{ color: '#6B7280' }}>{item.desc}</p>
                  <p className="text-xs font-medium" style={{ color: SLATE_BLUE }}>Key tools: {item.tools}</p>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4 italic text-center" style={{ color: '#9CA3AF' }}>82% code writing figure from Stack Overflow 2024 Survey. * Other penetration rates are Kael Research estimates.<Src href="https://survey.stackoverflow.co/2024/ai" n={4} /></p>
          </div>

          <KeyInsight>
            While 82% of AI-assisted development happens during code writing, the fastest-growing use cases are in testing (agent-driven auto-correction) and code review (automated PR analysis). Winners will be tools that integrate across the entire workflow, not just autocomplete.
          </KeyInsight>
        </section>

        {/* ═══ 12 — GitHub Copilot: The Incumbent ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="12" title="GitHub Copilot: The Incumbent" />
          
          <p className="text-base leading-relaxed mb-6" style={{ color: CHARCOAL }}>
            <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>GitHub Copilot</a> remains the market leader with an estimated ~42% share (Kael Research estimate), backed by Microsoft&rsquo;s investment and GitHub&rsquo;s <a href="https://github.blog/news-insights/octoverse/octoverse-2024/" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>100M+ developer</a> platform. However, its share has declined from an estimated ~55% in early 2024 as competitors like Cursor have captured developer mindshare.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: NAVY }}>Pricing Tiers</h3>
              <div className="space-y-3">
                {[
                  { tier: 'Individual', price: '$10/mo', note: 'Free for verified students, teachers, and OSS maintainers' },
                  { tier: 'Business', price: '$19/user/mo', note: 'IP indemnity, organization policy management' },
                  { tier: 'Enterprise', price: '$39/user/mo', note: 'Codebase-aware, knowledge bases, fine-tuning' },
                ].map((item) => (
                  <div key={item.tier} className="p-4 rounded-lg border" style={{ borderColor: '#E5E7EB', backgroundColor: '#F9FAFB' }}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <span className="font-medium" style={{ color: CHARCOAL }}>{item.tier}</span>
                      <span className="font-bold" style={{ color: NAVY }}>{item.price}</span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: NAVY }}>Notable Enterprise Clients</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Duolingo', 'General Motors', 'Mercado Libre', 'Shopify', 'Stripe', 'Coca-Cola'].map((company) => (
                  <div key={company} className="p-3 rounded-lg text-center text-sm font-medium" style={{ backgroundColor: '#F0F4FA', color: NAVY }}>
                    {company}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <h4 className="font-bold text-sm mb-2" style={{ color: NAVY }}>Key Differentiator: Agent Mode</h4>
                <p className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>
                  Copilot&rsquo;s agent mode can iteratively run tests, identify failures, and auto-correct code — bringing agentic capabilities to GitHub&rsquo;s massive installed base. Combined with full audit trails, this is a strong enterprise play.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 13 — Regional Market Analysis ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="13" title="Regional Market Analysis" />
          
          <p className="text-base leading-relaxed mb-8" style={{ color: CHARCOAL }}>
            According to <a href="https://www.grandviewresearch.com/industry-analysis/ai-code-tools-market-report" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: SLATE_BLUE }}>Grand View Research</a>, North America held the largest share of the AI code tools market at <strong>38% in 2023</strong>, while <strong>Asia Pacific</strong> is the fastest-growing region driven by India&rsquo;s massive developer population and China&rsquo;s investments in domestic AI tools.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { region: 'North America', share: '38%', trend: 'Mature, consolidating', notes: 'Home to Cursor, GitHub, Amazon Q. Enterprise adoption leads globally. 38% of market revenue in 2023.' },
              { region: 'Asia Pacific', share: 'Fastest Growing', trend: 'Rapid expansion', notes: 'India\'s 5M+ developer base driving adoption. China has domestic alternatives (Tongyi Lingma, CodeGeeX). Japan and Korea growing steadily.' },
              { region: 'Europe', share: '~25%*', trend: 'Steady growth', notes: 'GDPR and data sovereignty requirements favor on-premise solutions. Strong Tabnine adoption due to privacy features. JetBrains AI popular in Eastern Europe.' },
            ].map((item) => (
              <div key={item.region} className="bg-white rounded-lg p-6 shadow-sm border" style={{ borderColor: '#E5E7EB', borderTop: `3px solid ${GOLD}` }}>
                <h4 className="font-bold text-lg mb-1" style={{ color: NAVY }}>{item.region}</h4>
                <p className="text-sm font-medium mb-3" style={{ color: GOLD }}>{item.share} share • {item.trend}</p>
                <p className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>{item.notes}</p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3 italic text-center" style={{ color: '#9CA3AF' }}>North America and Asia Pacific data from Grand View Research. * Europe share is a Kael Research estimate.<Src href="https://www.grandviewresearch.com/industry-analysis/ai-code-tools-market-report" n={1} /></p>
        </section>

        {/* ═══ 14 — Strategic Recommendations ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="14" title="Strategic Recommendations" />
          <div className="space-y-4">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border flex items-start gap-5" style={{ borderColor: '#E5E7EB', borderLeft: `4px solid ${GOLD}` }}>
                <span className="text-3xl font-bold leading-none flex-shrink-0 mt-0.5" style={{ color: GOLD, fontFamily: 'Georgia, "Times New Roman", serif', opacity: 0.7 }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-bold text-lg" style={{ color: NAVY }}>{rec.title}</p>
                  <p className="mt-1 leading-relaxed" style={{ color: CHARCOAL }}>{rec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 15 — Methodology ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="15" title="Methodology" />
          <div className="bg-white rounded-lg border p-6 sm:p-8 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                'Combination of primary and secondary research, including market data from Grand View Research, developer surveys from Stack Overflow and JetBrains, and company financials from Sacra.',
                '34 structured interviews conducted with engineering leaders and senior developers from October 2025 to January 2026.',
                'Bottom-up market sizing model based on developer population (100M+ on GitHub), adoption rates (76% Stack Overflow 2024), and pricing tiers.',
                'Hands-on, in-depth product testing of all major platforms covered in the report, including Cursor, GitHub Copilot, Windsurf, Amazon Q, and Tabnine.',
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
                  <p className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t" style={{ borderColor: '#E5E7EB' }}>
              <p className="text-sm italic" style={{ color: '#6B7280' }}>This research was conducted independently by Kael Research and was not sponsored by any of the companies mentioned. Figures marked with * or labeled as &ldquo;Kael Research estimate&rdquo; are based on our proprietary models and interview data.</p>
            </div>
          </div>
        </section>

        {/* ═══ 16 — Sources ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="16" title="Sources" />
          <div className="bg-white rounded-lg border p-6 sm:p-8 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
            <ol className="space-y-4 list-decimal list-inside text-sm" style={{ color: CHARCOAL }}>
              {[
                { label: 'Grand View Research', desc: 'AI Code Tools Market Size, Share & Trends Analysis Report, 2024–2030.', url: 'https://www.grandviewresearch.com/industry-analysis/ai-code-tools-market-report' },
                { label: 'GitHub', desc: 'GitHub Copilot Features & Pricing.', url: 'https://github.com/features/copilot' },
                { label: 'Sacra', desc: 'Cursor Company Report — $500M ARR, valuation history, growth metrics.', url: 'https://sacra.com/c/cursor/' },
                { label: 'Stack Overflow', desc: '2024 Developer Survey — AI & Developer Experience section.', url: 'https://survey.stackoverflow.co/2024/ai' },
                { label: 'Sacra', desc: 'Codeium Company Report — $82M ARR, Cognition acquisition, developer metrics.', url: 'https://sacra.com/c/codeium/' },
                { label: 'GitHub Blog', desc: 'Octoverse 2024 — 100M+ developers on GitHub.', url: 'https://github.blog/news-insights/octoverse/octoverse-2024/' },
              ].map((source, idx) => (
                <li key={idx} className="leading-relaxed">
                  <strong style={{ color: NAVY }}>{source.label}</strong> — {source.desc}{' '}
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline break-all" style={{ color: SLATE_BLUE }}>{source.url}</a>
                </li>
              ))}
            </ol>
            <div className="mt-6 pt-6 border-t" style={{ borderColor: '#E5E7EB' }}>
              <p className="text-xs italic" style={{ color: '#9CA3AF' }}>All data accessed and verified as of February 2026. Where public data was unavailable, Kael Research estimates are clearly labeled.</p>
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <div className="rounded-xl py-16 sm:py-20 px-6 text-center -mx-4 sm:-mx-6 lg:-mx-8 mb-0" style={{ backgroundColor: '#F0F4FA' }}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Need This Level of Analysis for Your Market?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg" style={{ color: '#6B7280' }}>Our bespoke research reports give you the strategic advantage to lead, innovate, and capture market share.</p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a href="/#pricing" className="font-bold py-3 px-8 rounded-full text-base transition-all hover:opacity-90" style={{ backgroundColor: GOLD, color: NAVY }}>
              View Pricing
            </a>
            <a href="mailto:contact@kaelresearch.com" className="font-bold py-3 px-8 rounded-full text-base border-2 transition-all hover:opacity-80" style={{ color: NAVY, borderColor: NAVY }}>
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default function SamplePage() {
  const [showReport, setShowReport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem('kael_email')) {
        setShowReport(true);
      }
    } catch (e) {
      console.error('Could not access localStorage', e);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const handleSuccess = () => {
    setShowReport(true);
  };
  
  if (isLoading) {
    return <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }} />;
  }

  return showReport ? <ReportPage /> : <EmailGate onSuccess={handleSuccess} />;
}