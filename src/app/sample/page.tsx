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
        <h1 className="text-2xl font-bold mb-2 tracking-wide">
          <span className="text-white">KAEL</span>
          <span style={{ color: GOLD }}>RESEARCH</span>
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>Unlock Premium Market Insights</h2>
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
            className="w-full font-bold py-3 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white"
            >
              Download PDF
            </a>
            <button
              onClick={() => router.push('/#pricing')}
              className="font-bold py-2 px-4 rounded-md text-sm"
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
  <footer className="border-t mt-16 sm:mt-24" style={{ backgroundColor: NAVY, borderColor: 'rgba(255,255,255,0.1)' }}>
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-400">
      <p className="text-lg font-bold tracking-wide">
        <span className="text-white">KAEL</span>
        <span style={{ color: GOLD }}>RESEARCH</span>
      </p>
      <p className="mt-2 text-sm text-slate-300">Copyright &copy; 2026. All rights reserved.</p>
      <a href="mailto:contact@kaelresearch.com" className="mt-2 text-sm text-slate-300 hover:underline">
        contact@kaelresearch.com
      </a>
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
    <div className="flex items-center justify-center">
       <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} title={label}></div>
       <span className="sr-only">{label}</span>
    </div>
  );
};

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
    
    const Section: FC<{ title: string; children: React.ReactNode, className?: string }> = ({ title, children, className }) => (
      <section className={`py-12 sm:py-16 border-b ${className}`} style={{ borderColor: '#E5E7EB' }}>
        <h2 className="text-3xl font-bold tracking-tight mb-8" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>{title}</h2>
        {children}
      </section>
    );

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

  return (
    <div className="font-sans" style={{ backgroundColor: '#FAFAFA', color: CHARCOAL }}>
      <ReportHeader />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 max-w-5xl">
        {/* Title Section */}
        <div className="text-center py-16 border-b" style={{ borderColor: '#E5E7EB' }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>
            The AI Code Assistant Market
          </h1>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mt-2" style={{ color: GOLD, fontFamily: 'Georgia, "Times New Roman", serif' }}>
            2026 Landscape Analysis
          </h2>
          <p className="mt-6 text-lg" style={{ color: '#6B7280' }}>Prepared by Kael Research — February 2026</p>
        </div>

        {/* Executive Summary */}
        <Section title="Executive Summary" className="max-w-none">
            <ul className="space-y-4 text-lg leading-relaxed" style={{ color: CHARCOAL }}>
                <li><strong style={{ color: NAVY }}>Market Growth:</strong> $2.1B (2024) to $5.8B (2025) to $9.4B projected (2026), driven by enterprise adoption and productivity gains.</li>
                <li><strong style={{ color: NAVY }}>GitHub Copilot:</strong> 42% market share, down from 55% in early 2024 as competition intensifies.</li>
                <li><strong style={{ color: NAVY }}>Cursor:</strong> Breakout story with 3.2M users, ~$200M ARR, and +340% YoY growth, signaling demand for integrated, codebase-aware tools.</li>
                <li><strong style={{ color: NAVY }}>Strategic Shift:</strong> The market is rapidly moving beyond simple &ldquo;assistants&rdquo; to more powerful agentic coding workflows.</li>
                <li><strong style={{ color: NAVY }}>Pricing Power:</strong> Free tiers haven&rsquo;t collapsed the market; developers and businesses are willing to pay $20-40/month for premium features.</li>
                <li><strong style={{ color: NAVY }}>M&A Activity:</strong> Expect 2-3 significant acquisitions by major cloud or platform players by the end of 2027.</li>
            </ul>
        </Section>
        
        {/* Market Sizing */}
        <Section title="Market Sizing">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Market Potential (TAM, SAM, SOM) in $USD Billions</h3>
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
                <div>
                    <h3 className="text-xl font-bold" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Key Factors</h3>
                    <h4 className="font-bold mt-4" style={{ color: SAGE }}>Growth Drivers</h4>
                    <ul className="list-disc list-outside pl-5 space-y-2 mt-2" style={{ color: CHARCOAL }}>
                        <li><strong style={{ color: NAVY }}>Scale:</strong> 32 Million developers worldwide presents a massive user base.</li>
                        <li><strong style={{ color: NAVY }}>Productivity:</strong> Reported gains of 27-55% are too significant for enterprises to ignore.</li>
                        <li><strong style={{ color: NAVY }}>Agentic Shift:</strong> Move to autonomous agents creates new, higher-value use cases.</li>
                    </ul>
                    <h4 className="font-bold mt-6" style={{ color: '#C0392B' }}>Growth Constraints</h4>
                    <ul className="list-disc list-outside pl-5 space-y-2 mt-2" style={{ color: CHARCOAL }}>
                        <li><strong style={{ color: NAVY }}>Security (34%):</strong> Concerns about code/IP leakage remain a primary barrier.</li>
                        <li><strong style={{ color: NAVY }}>Quality Plateau:</strong> Perceived leveling-off of core model quality.</li>
                        <li><strong style={{ color: NAVY }}>Resistance (18%):</strong> A segment of developers remains skeptical or resistant to adoption.</li>
                    </ul>
                </div>
            </div>
        </Section>

        {/* Competitive Landscape */}
        <Section title="Competitive Landscape">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Market Share by Revenue (2025)</h3>
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
                <div>
                    <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>GitHub Copilot Market Share Decline</h3>
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
        </Section>

        {/* Feature Comparison */}
        <Section title="Feature Comparison">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div>
                    <h3 className="text-xl font-bold mb-4 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Core Capabilities Score (0-100)</h3>
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
                 <div>
                    <h3 className="text-xl font-bold mb-6 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Feature Matrix</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-3 text-sm font-bold border-b-2" style={{ color: NAVY, borderColor: NAVY, backgroundColor: '#F9FAFB' }}>Feature</th>
                                    {Object.keys(featureMatrixData.competitors).map(c => <th key={c} className="p-3 text-sm font-bold text-center border-b-2" style={{ color: NAVY, borderColor: NAVY, backgroundColor: '#F9FAFB' }}>{c}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {featureMatrixData.features.map((feature, idx) => (
                                    <tr key={feature} className={idx % 2 === 0 ? 'bg-white' : ''} style={idx % 2 !== 0 ? { backgroundColor: '#F9FAFB' } : {}}>
                                        <td className="p-3 border-b text-sm font-medium" style={{ color: CHARCOAL, borderColor: '#E5E7EB' }}>{feature}</td>
                                        {Object.values(featureMatrixData.competitors).map((statuses, cIdx) => (
                                            <td key={cIdx} className="p-3 border-b text-center" style={{ borderColor: '#E5E7EB' }}><StatusIcon status={statuses[idx]} /></td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                 </div>
            </div>
        </Section>
        
        {/* Pricing */}
        <Section title="Pricing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Individual Tiers</h3>
                    <div className="space-y-3">
                        {Object.entries({ Copilot: 10, Cursor: 20, Windsurf: 15, 'Amazon Q': 19, Tabnine: 12 }).map(([name, price]) => (
                             <div key={name} className="flex justify-between items-center p-4 rounded-md bg-white border" style={{ borderColor: '#E5E7EB' }}>
                                <span className="font-medium" style={{ color: CHARCOAL }}>{name}</span>
                                <span className="font-bold" style={{ color: NAVY }}>${price}<span className="text-sm font-normal" style={{ color: '#6B7280' }}>/mo</span></span>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                     <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Enterprise Tiers</h3>
                     <div className="space-y-3">
                        {Object.entries({ 'Copilot Enterprise': 39, 'Copilot Business': 19, 'Cursor Business': 40, 'Windsurf Enterprise': '30-45' }).map(([name, price]) => (
                             <div key={name} className="flex justify-between items-center p-4 rounded-md bg-white border" style={{ borderColor: '#E5E7EB' }}>
                                <span className="font-medium" style={{ color: CHARCOAL }}>{name}</span>
                                <span className="font-bold" style={{ color: NAVY }}>{typeof price === 'number' ? `$${price}`: `$${price}`}<span className="text-sm font-normal" style={{ color: '#6B7280' }}>/u/mo</span></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>

        {/* Adoption Trends */}
        <Section title="Adoption Trends">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                    <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Developer Sentiment Over Time</h3>
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
                 <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold mb-4" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Net Promoter Score (NPS)</h3>
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
            <div className="mt-16">
                 <h3 className="text-xl font-bold mb-6 text-center" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Adoption by Company Size</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                    {[{size: '1-10', pct: '68%', primary: 'Cursor (34%)', seats: 4}, {size: '11-100', pct: '74%', primary: 'Copilot (41%)', seats: 28}, {size: '101-500', pct: '71%', primary: 'Copilot (48%)', seats: 95}, {size: '501-5K', pct: '78%', primary: 'Copilot (52%)', seats: 420}, {size: '5000+', pct: '65%', primary: 'Copilot (58%)', seats: 2100}].map(item =>(
                        <div key={item.size} className="bg-white p-4 rounded-lg border text-center" style={{ borderColor: '#E5E7EB' }}>
                            <p className="font-bold" style={{ color: NAVY }}>{item.size} <span className="text-xs" style={{ color: '#6B7280' }}>emp.</span></p>
                            <p className="text-3xl font-bold my-2" style={{ color: GOLD }}>{item.pct}</p>
                            <p className="text-xs" style={{ color: '#6B7280' }}>Primary: {item.primary}</p>
                            <p className="text-xs" style={{ color: '#6B7280' }}>Avg Seats: {item.seats}</p>
                        </div>
                    ))}
                 </div>
            </div>
        </Section>

        {/* Recommendations & Methodology */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
            <Section title="Strategic Recommendations" className="border-b-0 lg:border-b-0">
                <ol className="list-decimal list-outside space-y-6 pl-5 text-lg" style={{ color: CHARCOAL }}>
                    <li><span className="font-semibold" style={{ color: NAVY }}>Target a Niche.</span> The general-purpose assistant market is saturating. Focus on specific domains like security, data science, or legacy codebases.</li>
                    <li><span className="font-semibold" style={{ color: NAVY }}>Bet on Agents, Not Autocomplete.</span> Autocomplete is becoming a commodity. The next frontier is agentic workflows that execute complex multi-step tasks.</li>
                    <li><span className="font-semibold" style={{ color: NAVY }}>Dual-Tier Strategy.</span> Enterprise sales provide revenue, but a strong developer-focused free or individual tier is essential for distribution and mindshare.</li>
                    <li><span className="font-semibold" style={{ color: NAVY }}>Solve for Trust First.</span> SOC 2 Type II compliance, on-premise options, and transparent data handling are non-negotiable for enterprise adoption.</li>
                    <li><span className="font-semibold" style={{ color: NAVY }}>Build for a Model-Agnostic Future.</span> The best underlying model will constantly change. Abstract this away and build infrastructure for automatic model routing and fine-tuning.</li>
                </ol>
            </Section>
            <Section title="Methodology" className="border-b-0">
                 <ul className="list-disc list-outside space-y-4 pl-5 text-lg" style={{ color: CHARCOAL }}>
                    <li>Combination of primary and secondary research, including reports from Gartner, IDC, and Forrester, plus developer surveys from Stack Overflow and JetBrains.</li>
                    <li>34 structured interviews conducted with engineering leaders and senior developers from October 2025 to January 2026.</li>
                    <li>Bottom-up market sizing model based on developer population, adoption rates, and pricing tiers.</li>
                    <li>Hands-on, in-depth product testing of all major platforms covered in the report.</li>
                    <li>This research was conducted independently by Kael Research and was not sponsored by any of the companies mentioned.</li>
                </ul>
            </Section>
        </div>
        
        {/* CTA */}
        <div className="text-center py-16 sm:py-24 border-t mt-12" style={{ borderColor: '#E5E7EB' }}>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: NAVY, fontFamily: 'Georgia, "Times New Roman", serif' }}>Need This Level of Analysis for Your Market?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg" style={{ color: '#6B7280' }}>Our bespoke research reports give you the strategic advantage to lead, innovate, and capture market share.</p>
            <div className="mt-8 flex justify-center gap-4">
                <a href="/#pricing" className="font-bold py-3 px-6 rounded-md text-base" style={{ backgroundColor: GOLD, color: NAVY }}>
                    View Pricing
                </a>
                <a href="mailto:contact@kaelresearch.com" className="font-bold py-3 px-6 rounded-md text-base border" style={{ color: NAVY, borderColor: NAVY }}>
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
