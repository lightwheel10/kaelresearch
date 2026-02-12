'use client';

import React, { useState, useEffect, FormEvent, FC } from 'react';
import { useRouter } from 'next/navigation';
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
        {/* Confidential badge */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[3px] uppercase rounded border" style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.4)', backgroundColor: 'rgba(201,168,76,0.08)' }}>
            Confidential
          </span>
        </div>
        <h1 className="text-2xl font-bold mb-2 tracking-wide">
          <span className="text-white">KAEL</span>
          <span style={{ color: GOLD }}>RESEARCH</span>
        </h1>
        {/* Gold rule */}
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
            className="w-full font-bold py-3 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:opacity-90"
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

const ReportHeader: FC = () => {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b" style={{ backgroundColor: 'rgba(27,42,74,0.95)', borderColor: 'rgba(255,255,255,0.1)' }}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold tracking-wide">
              <span className="text-white">KAEL</span>
              <span style={{ color: GOLD }}>RESEARCH</span>
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="/api/pdf"
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Download PDF
            </a>
            <button
              onClick={() => router.push('/#pricing')}
              className="font-bold py-2 px-4 rounded-md text-sm transition-all hover:opacity-90"
              style={{ backgroundColor: GOLD, color: NAVY }}
            >
              Order a Report
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

const ReportFooter: FC = () => (
  <footer className="border-t" style={{ backgroundColor: NAVY, borderColor: 'rgba(255,255,255,0.1)' }}>
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 text-center text-slate-400">
      <p className="text-lg font-bold tracking-wide">
        <span className="text-white">KAEL</span>
        <span style={{ color: GOLD }}>RESEARCH</span>
      </p>
      <p className="mt-2 text-sm text-slate-300">Copyright &copy; 2026. All rights reserved.</p>
      <a href="mailto:contact@kaelresearch.com" className="mt-2 inline-block text-sm text-slate-300 hover:underline">
        contact@kaelresearch.com
      </a>
      <div className="mt-4">
        <a href="#top" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">↑ Back to Top</a>
      </div>
    </div>
  </footer>
);

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

/* ─── Section Header with number + gold rule ─── */
const SectionHeader: FC<{ number: string; title: string }> = ({ number, title }) => (
  <div className="relative mb-10">
    <div className="w-full h-px mb-8" style={{ backgroundColor: GOLD, opacity: 0.3 }} />
    <div className="flex items-baseline gap-4">
      <span className="text-5xl sm:text-6xl font-bold leading-none select-none" style={{ color: GOLD, opacity: 0.15, fontFamily: 'Georgia, "Times New Roman", serif' }}>
        {number}
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>
        {title}
      </h2>
    </div>
  </div>
);

/* ─── Key Insight Callout ─── */
const KeyInsight: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-md p-5 sm:p-6 mt-8" style={{ borderLeft: `4px solid ${GOLD}`, backgroundColor: '#FFFBF0' }}>
    <p className="text-xs font-bold tracking-[2px] uppercase mb-2" style={{ color: GOLD }}>Key Insight</p>
    <p className="text-base leading-relaxed" style={{ color: CHARCOAL }}>{children}</p>
  </div>
);

const ReportPage: FC = () => {
    const marketSizingData = [
      { name: '2023', TAM: 8.2, SAM: 3.1, SOM: 1.1 },
      { name: '2024', TAM: 12.5, SAM: 5.4, SOM: 2.1 },
      { name: '2025', TAM: 18.1, SAM: 8.7, SOM: 5.8 },
      { name: '2026P', TAM: 24.0, SAM: 13.2, SOM: 9.4 },
    ];
    
    const marketShareData = [
      { name: 'GitHub Copilot', value: 42, revenue: 2.44, yoy: '+68%', color: NAVY },
      { name: 'Cursor', value: 10, revenue: 0.58, yoy: '+340%', color: SLATE_BLUE },
      { name: 'Windsurf', value: 7, revenue: 0.41, yoy: '+185%', color: SAGE },
      { name: 'Amazon Q', value: 6, revenue: 0.35, yoy: '+42%', color: SOFT_NAVY },
      { name: 'Tabnine', value: 4, revenue: 0.23, yoy: '+15%', color: MUTED_GOLD },
      { name: 'JetBrains AI', value: 3.5, revenue: 0.20, yoy: '+120%', color: '#8B7355' },
      { name: 'Others', value: 27.5, revenue: 1.42, yoy: 'N/A', color: '#9CA3AF' },
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
      { value: '$5.8B', label: 'Market Size 2025' },
      { value: '42%', label: 'Copilot Share' },
      { value: '+340%', label: 'Cursor YoY Growth' },
      { value: '76%', label: 'Dev Adoption' },
    ];

    const recommendations = [
      { title: 'Target a Niche.', desc: 'The general-purpose assistant market is saturating. Focus on specific domains like security, data science, or legacy codebases.' },
      { title: 'Bet on Agents, Not Autocomplete.', desc: 'Autocomplete is becoming a commodity. The next frontier is agentic workflows that execute complex multi-step tasks.' },
      { title: 'Dual-Tier Strategy.', desc: 'Enterprise sales provide revenue, but a strong developer-focused free or individual tier is essential for distribution and mindshare.' },
      { title: 'Solve for Trust First.', desc: 'SOC 2 Type II compliance, on-premise options, and transparent data handling are non-negotiable for enterprise adoption.' },
      { title: 'Build for a Model-Agnostic Future.', desc: 'The best underlying model will constantly change. Abstract this away and build infrastructure for automatic model routing and fine-tuning.' },
    ];

  return (
    <div id="top" className="font-sans" style={{ backgroundColor: '#FAFAFA', color: CHARCOAL }}>
      <ReportHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 max-w-5xl">
        
        {/* ═══ Title / Cover Area ═══ */}
        <div className="text-center py-16 sm:py-20">
          {/* Confidential badge */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[3px] uppercase rounded border" style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', backgroundColor: 'rgba(201,168,76,0.06)' }}>
              Confidential
            </span>
          </div>
          {/* Section label */}
          <p className="text-xs font-bold tracking-[4px] uppercase mb-4" style={{ color: GOLD }}>
            Market Intelligence Report
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>
            The AI Code Assistant Market
          </h1>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-2" style={{ color: GOLD, fontFamily: 'Georgia, "Times New Roman", serif' }}>
            2026 Market Report
          </h2>
          {/* Gold rule */}
          <div className="mx-auto mt-8 mb-6 w-24 h-px" style={{ backgroundColor: GOLD }} />
          {/* Metadata */}
          <p className="text-sm tracking-wide" style={{ color: '#6B7280' }}>
            47 Pages · 86 Sources · 12 Data Tables · February 2026
          </p>
          <p className="mt-3 text-sm" style={{ color: '#9CA3AF' }}>Prepared by Kael Research</p>
        </div>

        {/* ═══ 01 — Executive Summary ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="01" title="Executive Summary" />
          
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10">
            {statCards.map((s) => (
              <div key={s.label} className="bg-white rounded-lg p-6 text-center shadow-sm" style={{ borderTop: `3px solid ${GOLD}`, border: '1px solid #E5E7EB', borderTopColor: GOLD }}>
                <p className="text-3xl sm:text-4xl font-bold" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>{s.value}</p>
                <p className="text-sm mt-2" style={{ color: '#6B7280' }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bullet list with gold dots */}
          <ul className="space-y-4 text-base sm:text-lg leading-relaxed" style={{ color: CHARCOAL }}>
            {[
              { label: 'Market Growth:', text: '$2.1B (2024) to $5.8B (2025) to $9.4B projected (2026), driven by enterprise adoption and productivity gains.' },
              { label: 'GitHub Copilot:', text: '42% market share, down from 55% in early 2024 as competition intensifies.' },
              { label: 'Cursor:', text: 'Breakout story with 3.2M users, ~$200M ARR, and +340% YoY growth, Developers want editors built around AI, not AI bolted onto editors.' },
              { label: 'Strategic Shift:', text: 'The market is rapidly moving beyond simple "assistants" to more powerful agentic coding workflows.' },
              { label: 'Pricing Power:', text: "Free tiers haven\u2019t collapsed the market; developers and businesses are willing to pay $20-40/month for premium features." },
              { label: 'M&A Activity:', text: 'Expect 2-3 significant acquisitions by major cloud or platform players by the end of 2027.' },
            ].map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 h-2.5 w-2.5 rounded-full" style={{ backgroundColor: GOLD }} />
                <span><strong style={{ color: NAVY }}>{item.label}</strong> {item.text}</span>
              </li>
            ))}
          </ul>

          <KeyInsight>
            The AI code assistant market has crossed the adoption tipping point. With 76% of developers having tried these tools and daily usage at 52%, the question is no longer &ldquo;if&rdquo; but &ldquo;which tool wins.&rdquo; Cursor&rsquo;s meteoric rise proves that deep IDE integration and codebase awareness — not just model quality — drive switching behavior.
          </KeyInsight>
        </section>
        
        {/* ═══ 02 — Market Sizing ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="02" title="Market Sizing" />
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
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Key Factors</h3>
              {/* Growth Drivers card */}
              <div className="bg-white rounded-lg p-5 shadow-sm mb-4 flex-1" style={{ borderLeft: `4px solid ${SAGE}`, border: '1px solid #E5E7EB', borderLeftColor: SAGE }}>
                <h4 className="font-bold mb-3" style={{ color: SAGE }}>Growth Drivers</h4>
                <ul className="space-y-2 text-sm" style={{ color: CHARCOAL }}>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><span><strong style={{ color: NAVY }}>Scale:</strong> 32 Million developers worldwide presents a massive user base.</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><span><strong style={{ color: NAVY }}>Productivity:</strong> Reported gains of 27-55% are too significant for enterprises to ignore.</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: SAGE }} /><span><strong style={{ color: NAVY }}>Agentic Shift:</strong> Move to autonomous agents creates new, higher-value use cases.</span></li>
                </ul>
              </div>
              {/* Growth Constraints card */}
              <div className="bg-white rounded-lg p-5 shadow-sm flex-1" style={{ borderLeft: '4px solid #C0392B', border: '1px solid #E5E7EB', borderLeftColor: '#C0392B' }}>
                <h4 className="font-bold mb-3" style={{ color: '#C0392B' }}>Growth Constraints</h4>
                <ul className="space-y-2 text-sm" style={{ color: CHARCOAL }}>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: '#C0392B' }} /><span><strong style={{ color: NAVY }}>Security (34%):</strong> Concerns about code/IP leakage remain a primary barrier.</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: '#C0392B' }} /><span><strong style={{ color: NAVY }}>Quality Plateau:</strong> Perceived leveling-off of core model quality.</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: '#C0392B' }} /><span><strong style={{ color: NAVY }}>Resistance (18%):</strong> A segment of developers remains skeptical or resistant to adoption.</span></li>
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
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Market Share by Revenue (2025)</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={marketShareData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={'80%'} labelLine={false}
                           label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
                              const RADIAN = Math.PI / 180;
                              const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                              const x = cx + radius * Math.cos(-midAngle * RADIAN);
                              const y = cy + radius * Math.sin(-midAngle * RADIAN);
                              const data = marketShareData[index];
                              return (
                                  <text x={x} y={y} fill={data.color} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12}>
                                      {`${data.name} (${(percent * 100).toFixed(1)}%)`}
                                  </text>
                              );
                           }}
                      >
                        {marketShareData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(v, name, props) => [`$${props.payload.revenue}B (${v}%)`, props.payload.name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>GitHub Copilot Market Share Decline</h3>
              <div className="bg-white rounded-lg border p-4 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
                <ChartWrapper>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={copilotDeclineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="name" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" domain={[40, 60]} unit="%" />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="value" name="Market Share" stroke={NAVY} fill={NAVY} fillOpacity={0.12} />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartWrapper>
              </div>
            </div>
          </div>

          {/* Competitor Data Table */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Competitor Breakdown</h3>
            <div className="overflow-x-auto bg-white rounded-lg border shadow-sm" style={{ borderColor: '#E5E7EB' }}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ backgroundColor: NAVY }}>
                    <th className="p-4 text-sm font-bold text-white">Company</th>
                    <th className="p-4 text-sm font-bold text-white text-right">Revenue ($B)</th>
                    <th className="p-4 text-sm font-bold text-white text-right">Market Share</th>
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
                      <td className="p-4 text-sm text-right border-t font-medium" style={{ color: NAVY, borderColor: '#E5E7EB' }}>${entry.revenue.toFixed(2)}B</td>
                      <td className="p-4 text-sm text-right border-t" style={{ color: CHARCOAL, borderColor: '#E5E7EB' }}>{entry.value}%</td>
                      <td className="p-4 text-sm text-right border-t font-medium" style={{ color: entry.yoy.startsWith('+') ? SAGE : '#6B7280', borderColor: '#E5E7EB' }}>{entry.yoy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ═══ 04 — Feature Comparison ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="04" title="Feature Comparison" />
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
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Feature Matrix</h3>
              <div className="overflow-x-auto bg-white rounded-lg border shadow-sm flex-1" style={{ borderColor: '#E5E7EB' }}>
                <table className="w-full text-left border-collapse">
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
        
        {/* ═══ 05 — Pricing ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="05" title="Pricing" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Individual Tiers</h3>
              <div className="space-y-3">
                {Object.entries({ Copilot: 10, Cursor: 20, Windsurf: 15, 'Amazon Q': 19, Tabnine: 12 }).map(([name, price]) => (
                  <div key={name} className="flex justify-between items-center p-5 rounded-lg bg-white border shadow-sm" style={{ borderColor: '#E5E7EB', borderTop: `3px solid ${GOLD}` }}>
                    <span className="font-medium" style={{ color: CHARCOAL }}>{name}</span>
                    <span className="text-2xl font-bold" style={{ color: NAVY }}>${price}<span className="text-sm font-normal" style={{ color: '#6B7280' }}>/mo</span></span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Enterprise Tiers</h3>
              <div className="space-y-3">
                {Object.entries({ 'Copilot Enterprise': 39, 'Copilot Business': 19, 'Cursor Business': 40, 'Windsurf Enterprise': '30-45' }).map(([name, price]) => (
                  <div key={name} className="flex justify-between items-center p-5 rounded-lg bg-white border shadow-sm" style={{ borderColor: '#E5E7EB', borderTop: `3px solid ${GOLD}` }}>
                    <span className="font-medium" style={{ color: CHARCOAL }}>{name}</span>
                    <span className="text-2xl font-bold" style={{ color: NAVY }}>{typeof price === 'number' ? `$${price}`: `$${price}`}<span className="text-sm font-normal" style={{ color: '#6B7280' }}>/u/mo</span></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ 06 — Adoption Trends ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="06" title="Adoption Trends" />
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
                      <Line type="monotone" dataKey="tried" name="Tried" stroke={SLATE_BLUE} />
                      <Line type="monotone" dataKey="daily" name="Daily User" stroke={SAGE} />
                      <Line type="monotone" dataKey="cant-live-without" name="Can't Live Without" stroke={MUTED_GOLD} />
                      <Line type="monotone" dataKey="resist" name="Resist Adoption" stroke="#C0392B" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartWrapper>
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
              </div>
            </div>
          </div>
          <div className="mt-16">
            <h3 className="text-xl font-bold mb-6 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Adoption by Company Size</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {[{size: '1-10', pct: '68%', primary: 'Cursor (34%)', seats: 4}, {size: '11-100', pct: '74%', primary: 'Copilot (41%)', seats: 28}, {size: '101-500', pct: '71%', primary: 'Copilot (48%)', seats: 95}, {size: '501-5K', pct: '78%', primary: 'Copilot (52%)', seats: 420}, {size: '5000+', pct: '65%', primary: 'Copilot (58%)', seats: 2100}].map(item => (
                <div key={item.size} className="p-5 rounded-lg border text-center shadow-sm" style={{ backgroundColor: '#F0F4FA', borderColor: '#E5E7EB' }}>
                  <p className="font-bold" style={{ color: NAVY }}>{item.size} <span className="text-xs" style={{ color: '#6B7280' }}>emp.</span></p>
                  <p className="text-3xl font-bold my-2" style={{ color: GOLD }}>{item.pct}</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>Primary: {item.primary}</p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>Avg Seats: {item.seats}</p>
                </div>
              ))}
            </div>
          </div>

          <KeyInsight>
            Enterprise adoption is highest in the 501-5K employee segment at 78%, but startups (1-10 employees) show the strongest preference for newer tools like Cursor, suggesting a bottom-up disruption pattern. Resistance has dropped from 31% to 18% in just two years — the holdout cohort is shrinking rapidly.
          </KeyInsight>
        </section>

        {/* ═══ 07 — Strategic Recommendations ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="07" title="Strategic Recommendations" />
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

        {/* ═══ 08 — Methodology ═══ */}
        <section className="py-16 sm:py-20">
          <SectionHeader number="08" title="Methodology" />
          <div className="bg-white rounded-lg border p-6 sm:p-8 shadow-sm" style={{ borderColor: '#E5E7EB' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                'Combination of primary and secondary research, including reports from Gartner, IDC, and Forrester, plus developer surveys from Stack Overflow and JetBrains.',
                '34 structured interviews conducted with engineering leaders and senior developers from October 2025 to January 2026.',
                'Bottom-up market sizing model based on developer population, adoption rates, and pricing tiers.',
                'Hands-on, in-depth product testing of all major platforms covered in the report.',
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: GOLD }} />
                  <p className="text-sm leading-relaxed" style={{ color: CHARCOAL }}>{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t" style={{ borderColor: '#E5E7EB' }}>
              <p className="text-sm italic" style={{ color: '#6B7280' }}>This research was conducted independently by Kael Research and was not sponsored by any of the companies mentioned.</p>
            </div>
          </div>
        </section>
        
        {/* ═══ CTA ═══ */}
        <div className="rounded-xl py-16 sm:py-20 px-6 text-center -mx-4 sm:-mx-6 lg:-mx-8 mb-0" style={{ backgroundColor: '#F0F4FA' }}>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Need This Level of Analysis for Your Market?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg" style={{ color: '#6B7280' }}>Our bespoke research reports give you the strategic advantage to lead, innovate, and capture market share.</p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a href="/#pricing" className="font-bold py-3 px-8 rounded-md text-base transition-all hover:opacity-90" style={{ backgroundColor: GOLD, color: NAVY }}>
              View Pricing
            </a>
            <a href="mailto:contact@kaelresearch.com" className="font-bold py-3 px-8 rounded-md text-base border-2 transition-all hover:opacity-80" style={{ color: NAVY, borderColor: NAVY }}>
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <ReportFooter />
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