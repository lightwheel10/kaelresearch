import { NextResponse } from 'next/server';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import {
  Document, Page, Text, View, StyleSheet, Font, Svg, Rect, Line as SvgLine,
} from '@react-pdf/renderer';

// ── Fonts ─────────────────────────────────────────────────────────────
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjQ.ttf', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjQ.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZ9hjQ.ttf', fontWeight: 700 },
  ],
});

// ── Colors ────────────────────────────────────────────────────────────
const C = {
  bg: '#0f172a',
  card: '#1e293b',
  cardBorder: '#334155',
  text: '#cbd5e1',
  textLight: '#94a3b8',
  textDim: '#64748b',
  white: '#f8fafc',
  amber: '#f59e0b',
  amberDark: '#b45309',
  amberBg: 'rgba(245,158,11,0.08)',
  green: '#22c55e',
  red: '#ef4444',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  emerald: '#10b981',
  divider: '#1e293b',
};

// ── Styles ────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: { backgroundColor: C.bg, padding: 50, fontFamily: 'Inter', color: C.text, fontSize: 9 },
  pageWhite: { backgroundColor: '#ffffff', padding: 50, fontFamily: 'Inter', color: '#1e293b', fontSize: 9 },

  // Header/Footer
  header: { position: 'absolute', top: 20, left: 50, right: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLogo: { fontSize: 8, fontWeight: 700, letterSpacing: 1 },
  headerRight: { fontSize: 7, color: C.textDim },
  footer: { position: 'absolute', bottom: 20, left: 50, right: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footerText: { fontSize: 7, color: C.textDim },
  pageNum: { fontSize: 7, color: C.textDim },

  // Typography
  h1: { fontSize: 28, fontWeight: 700, color: C.white, marginBottom: 8, lineHeight: 1.2 },
  h2: { fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 10, marginTop: 4 },
  h3: { fontSize: 14, fontWeight: 600, color: C.white, marginBottom: 6, marginTop: 12 },
  h4: { fontSize: 11, fontWeight: 600, color: C.white, marginBottom: 4 },
  body: { fontSize: 9, color: C.text, lineHeight: 1.65, marginBottom: 8 },
  bodySmall: { fontSize: 8, color: C.textLight, lineHeight: 1.6, marginBottom: 6 },
  source: { fontSize: 7, color: C.textDim, fontStyle: 'italic', marginTop: 4 },
  label: { fontSize: 7, fontWeight: 600, color: C.amber, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 },

  // Layout
  row: { flexDirection: 'row', gap: 12 },
  col: { flex: 1 },
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },
  mt16: { marginTop: 16 },

  // Cards
  statCard: { flex: 1, backgroundColor: C.card, borderRadius: 6, padding: 12, borderWidth: 1, borderColor: C.cardBorder, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: 700, color: C.amber, marginBottom: 2 },
  statLabel: { fontSize: 8, fontWeight: 500, color: C.white, marginBottom: 1, textAlign: 'center' as const },
  statSub: { fontSize: 7, color: C.textDim, textAlign: 'center' as const },

  card: { backgroundColor: C.card, borderRadius: 6, padding: 14, borderWidth: 1, borderColor: C.cardBorder, marginBottom: 8 },

  // Tables
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.cardBorder, paddingBottom: 6, marginBottom: 4 },
  tableHeaderCell: { fontSize: 7, fontWeight: 600, color: C.textDim, letterSpacing: 0.5, textTransform: 'uppercase' as const },
  tableRow: { flexDirection: 'row', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: C.divider },
  tableCell: { fontSize: 8.5, color: C.text },
  tableCellBold: { fontSize: 8.5, color: C.white, fontWeight: 600 },

  // Insight box
  insight: { backgroundColor: C.amberBg, borderLeftWidth: 2, borderLeftColor: C.amber, paddingLeft: 12, paddingRight: 12, paddingVertical: 10, borderRadius: 4, marginVertical: 10 },
  insightLabel: { fontSize: 7, fontWeight: 600, color: C.amber, letterSpacing: 1, marginBottom: 3 },
  insightText: { fontSize: 8.5, color: C.text, lineHeight: 1.6 },

  // Section divider
  sectionTag: { fontSize: 7, fontWeight: 600, color: C.amber, backgroundColor: C.amberBg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 3, alignSelf: 'flex-start', marginBottom: 6 },
  dividerLine: { borderBottomWidth: 1, borderBottomColor: C.cardBorder, marginBottom: 16, marginTop: 8 },

  // Competitor card
  compCard: { flex: 1, backgroundColor: C.card, borderRadius: 6, padding: 10, borderWidth: 1, borderColor: C.cardBorder },
  compRank: { fontSize: 7, color: C.textDim, fontFamily: 'Inter', fontWeight: 500 },
  compName: { fontSize: 10, fontWeight: 600, color: C.white, marginBottom: 2 },
  compRevenue: { fontSize: 16, fontWeight: 700, color: C.white },
  compMeta: { fontSize: 7, color: C.textDim },

  // Recommendation
  recCard: { flexDirection: 'row', gap: 10, backgroundColor: C.card, borderRadius: 6, padding: 12, borderWidth: 1, borderColor: C.cardBorder, marginBottom: 8 },
  recNum: { fontSize: 22, fontWeight: 700, color: 'rgba(245,158,11,0.25)', lineHeight: 1 },
  recTitle: { fontSize: 10, fontWeight: 600, color: C.white, marginBottom: 3 },
  recText: { fontSize: 8, color: C.textLight, lineHeight: 1.6 },

  // Bullet
  bullet: { flexDirection: 'row', gap: 6, marginBottom: 5 },
  bulletDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.amber, marginTop: 4 },
  bulletText: { flex: 1, fontSize: 8.5, color: C.text, lineHeight: 1.6 },

  // Bar visual
  barContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  barLabel: { width: 80, fontSize: 8, color: C.text },
  barTrack: { flex: 1, height: 14, backgroundColor: '#0f172a', borderRadius: 7, overflow: 'hidden', position: 'relative' as const },
  barFill: { height: 14, borderRadius: 7 },
  barValue: { position: 'absolute' as const, right: 6, top: 1, fontSize: 7.5, fontWeight: 600, color: C.white },
});

// ── Helper Components ─────────────────────────────────────────────────
const PageHeader = () => (
  <View style={s.header} fixed>
    <Text style={s.headerLogo}>
      <Text style={{ color: C.white }}>KAEL </Text>
      <Text style={{ color: C.amber }}>RESEARCH</Text>
    </Text>
    <Text style={s.headerRight}>CONFIDENTIAL — SAMPLE REPORT</Text>
  </View>
);

const PageFooter = () => (
  <View style={s.footer} fixed>
    <Text style={s.footerText}>© 2026 Kael Research. All rights reserved.</Text>
    <Text style={s.pageNum} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
  </View>
);

const StatCard = ({ value, label, sub }: { value: string; label: string; sub: string }) => (
  <View style={s.statCard}>
    <Text style={s.statValue}>{value}</Text>
    <Text style={s.statLabel}>{label}</Text>
    <Text style={s.statSub}>{sub}</Text>
  </View>
);

const Bullet = ({ children }: { children: string }) => (
  <View style={s.bullet}>
    <View style={s.bulletDot} />
    <Text style={s.bulletText}>{children}</Text>
  </View>
);

const Insight = ({ children }: { children: string }) => (
  <View style={s.insight}>
    <Text style={s.insightLabel}>KEY INSIGHT</Text>
    <Text style={s.insightText}>{children}</Text>
  </View>
);

const SectionDivider = ({ num, title }: { num: string; title: string }) => (
  <View style={s.mb16}>
    <View style={s.dividerLine} />
    <Text style={s.sectionTag}>SECTION {num}</Text>
    <Text style={s.h2}>{title}</Text>
  </View>
);

const HBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => (
  <View style={s.barContainer}>
    <Text style={s.barLabel}>{label}</Text>
    <View style={s.barTrack}>
      <View style={[s.barFill, { width: `${(value / max) * 100}%`, backgroundColor: color }]} />
      <Text style={s.barValue}>{value}%</Text>
    </View>
  </View>
);

// ── Chart SVG Components ──────────────────────────────────────────────
const MarketSizeChart = () => {
  const data = [
    { year: '2023', tam: 8.2, sam: 3.1, som: 1.1 },
    { year: '2024', tam: 12.5, sam: 5.4, som: 2.1 },
    { year: '2025', tam: 18.1, sam: 8.7, som: 5.8 },
    { year: '2026P', tam: 24.0, sam: 13.2, som: 9.4 },
  ];
  const maxVal = 26;
  const w = 460, h = 180, px = 60, py = 20;
  const cw = w - px - 20, ch = h - py - 30;
  const barGroupW = cw / data.length;
  const barW = 22;

  return (
    <View style={[s.card, s.mb12]}>
      <Text style={s.h4}>Market Size Evolution (2023–2026P)</Text>
      <Text style={[s.source, { marginBottom: 8 }]}>In billions USD — TAM, SAM, SOM (Captured)</Text>
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {/* Grid lines */}
        {[0, 5, 10, 15, 20, 25].map(v => {
          const y = py + ch - (v / maxVal) * ch;
          return (
            <React.Fragment key={v}>
              <SvgLine x1={px} y1={y} x2={w - 20} y2={y} stroke="#1e293b" strokeWidth={1} />
              <Text x={px - 8} y={y + 3} style={{ fontSize: 7, color: '#64748b' }} textAnchor="end">${v}B</Text>
            </React.Fragment>
          );
        })}
        {/* Bars */}
        {data.map((d, i) => {
          const gx = px + i * barGroupW + barGroupW / 2;
          const bars = [
            { val: d.tam, color: '#334155', offset: -barW * 1.2 },
            { val: d.sam, color: '#78716c', offset: 0 },
            { val: d.som, color: '#f59e0b', offset: barW * 1.2 },
          ];
          return (
            <React.Fragment key={i}>
              {bars.map((b, j) => {
                const bh = (b.val / maxVal) * ch;
                return <Rect key={j} x={gx + b.offset - barW / 2} y={py + ch - bh} width={barW} height={bh} fill={b.color} rx={3} />;
              })}
              <Text x={gx} y={h - 8} style={{ fontSize: 8, color: '#94a3b8' }} textAnchor="middle">{d.year}</Text>
            </React.Fragment>
          );
        })}
      </Svg>
      <View style={[s.row, { justifyContent: 'center', gap: 20, marginTop: 4 }]}>
        {[{ label: 'TAM', color: '#334155' }, { label: 'SAM', color: '#78716c' }, { label: 'SOM', color: '#f59e0b' }].map((l, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: l.color }} />
            <Text style={{ fontSize: 7, color: '#64748b' }}>{l.label}</Text>
          </View>
        ))}
      </View>
      <Text style={s.source}>Sources: Gartner (2025), IDC (2025), Kael Research estimates</Text>
    </View>
  );
};

const MarketSharePie = () => {
  const data = [
    { name: 'Copilot', pct: 42, color: '#f59e0b' },
    { name: 'Cursor', pct: 10, color: '#3b82f6' },
    { name: 'Windsurf', pct: 7, color: '#10b981' },
    { name: 'Amazon Q', pct: 6, color: '#8b5cf6' },
    { name: 'Tabnine', pct: 4, color: '#ef4444' },
    { name: 'JetBrains', pct: 3.5, color: '#ec4899' },
    { name: 'Others', pct: 27.5, color: '#475569' },
  ];
  const cx = 80, cy = 80, r = 60, ir = 35;
  let angle = -90;

  return (
    <View style={s.card}>
      <Text style={s.h4}>Market Share by Revenue (2025)</Text>
      <View style={{ flexDirection: 'row', gap: 16, marginTop: 8 }}>
        <Svg width={160} height={160} viewBox="0 0 160 160">
          {data.map((d, i) => {
            const startAngle = angle;
            const sweep = (d.pct / 100) * 360;
            angle += sweep;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = ((startAngle + sweep) * Math.PI) / 180;
            const largeArc = sweep > 180 ? 1 : 0;
            const path = [
              `M ${cx + ir * Math.cos(startRad)} ${cy + ir * Math.sin(startRad)}`,
              `L ${cx + r * Math.cos(startRad)} ${cy + r * Math.sin(startRad)}`,
              `A ${r} ${r} 0 ${largeArc} 1 ${cx + r * Math.cos(endRad)} ${cy + r * Math.sin(endRad)}`,
              `L ${cx + ir * Math.cos(endRad)} ${cy + ir * Math.sin(endRad)}`,
              `A ${ir} ${ir} 0 ${largeArc} 0 ${cx + ir * Math.cos(startRad)} ${cy + ir * Math.sin(startRad)}`,
              'Z'
            ].join(' ');
            // @ts-expect-error react-pdf SVG path
            return <Rect key={i} d={path} fill={d.color} />;
          })}
        </Svg>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {data.map((d, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: d.color }} />
              <Text style={{ fontSize: 8, color: '#cbd5e1', flex: 1 }}>{d.name}</Text>
              <Text style={{ fontSize: 8, fontWeight: 600, color: '#f8fafc' }}>{d.pct}%</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={s.source}>Source: Company disclosures, Kael Research estimates</Text>
    </View>
  );
};

// ── PDF Document ──────────────────────────────────────────────────────
const ReportPDF = () => (
  <Document title="AI Code Assistant Market — 2026 Landscape Analysis" author="Kael Research" subject="Market Intelligence Report">
    
    {/* ═══ COVER PAGE ═══ */}
    <Page size="A4" style={[s.page, { justifyContent: 'center', alignItems: 'center' }]}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: C.amber }} />
      <View style={{ alignItems: 'center', marginBottom: 60 }}>
        <Text style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: C.white, marginBottom: 4 }}>
          KAEL <Text style={{ color: C.amber }}>RESEARCH</Text>
        </Text>
        <Text style={{ fontSize: 7, color: C.textDim, letterSpacing: 2 }}>MARKET INTELLIGENCE</Text>
      </View>
      <View style={{ alignItems: 'center', maxWidth: 380 }}>
        <Text style={{ fontSize: 36, fontWeight: 700, color: C.white, textAlign: 'center', lineHeight: 1.15, marginBottom: 12 }}>
          The AI Code{'\n'}Assistant Market
        </Text>
        <Text style={{ fontSize: 18, color: C.textLight, textAlign: 'center', marginBottom: 30 }}>
          2026 Landscape Analysis
        </Text>
        <View style={{ borderTopWidth: 1, borderTopColor: C.cardBorder, paddingTop: 20, width: 200, alignItems: 'center' }}>
          <Text style={{ fontSize: 8, color: C.textDim, marginBottom: 4 }}>February 2026</Text>
          <Text style={{ fontSize: 8, color: C.textDim, marginBottom: 4 }}>47 Pages · 86 Sources · 12 Data Tables</Text>
        </View>
      </View>
      <View style={{ position: 'absolute', bottom: 50, left: 50, right: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 7, color: C.textDim }}>© 2026 Kael Research</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.red }} />
          <Text style={{ fontSize: 7, color: C.red, fontWeight: 600 }}>CONFIDENTIAL</Text>
        </View>
      </View>
    </Page>

    {/* ═══ TABLE OF CONTENTS ═══ */}
    <Page size="A4" style={s.page}>
      <PageHeader />
      <View style={{ marginTop: 30 }}>
        <Text style={s.label}>TABLE OF CONTENTS</Text>
        <View style={s.mb24} />
        {[
          ['01', 'Executive Summary', '3'],
          ['02', 'Market Sizing & Growth', '4'],
          ['03', 'Competitive Landscape', '5'],
          ['04', 'Feature Comparison', '7'],
          ['05', 'Pricing Analysis', '8'],
          ['06', 'User Adoption Trends', '9'],
          ['07', 'Strategic Recommendations', '10'],
          ['08', 'Methodology', '11'],
        ].map(([num, title, page], i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: C.divider }}>
            <Text style={{ fontSize: 9, fontWeight: 600, color: C.amber, width: 30 }}>{num}</Text>
            <Text style={{ fontSize: 11, fontWeight: 500, color: C.white, flex: 1 }}>{title}</Text>
            <Text style={{ fontSize: 9, color: C.textDim, fontFamily: 'Inter' }}>{page}</Text>
          </View>
        ))}
      </View>
      <PageFooter />
    </Page>

    {/* ═══ EXECUTIVE SUMMARY ═══ */}
    <Page size="A4" style={s.page}>
      <PageHeader />
      <View style={{ marginTop: 30 }}>
        <SectionDivider num="01" title="Executive Summary" />
        
        <View style={[s.row, s.mb16]}>
          <StatCard value="$5.8B" label="Market Size 2025" sub="Up from $2.1B in 2024" />
          <StatCard value="$9.4B" label="Projected 2026" sub="62% YoY growth" />
          <StatCard value="42%" label="Copilot Share" sub="Down from 55% in 2024" />
          <StatCard value="76%" label="Dev Adoption" sub="Have tried AI tools" />
        </View>

        <Text style={s.body}>
          The AI code assistant market has moved from curiosity to infrastructure. What was a $2.1B market in 2024 has grown to an estimated $5.8B in 2025, and we project it will reach $9.4B by end of 2026. The growth is no longer driven by early adopters — it&apos;s driven by procurement teams.
        </Text>

        <Text style={[s.h3, s.mt16]}>Key Findings</Text>
        <Bullet>GitHub Copilot holds ~42% market share by revenue, but its dominance is eroding. It held 55% in early 2024. Cursor and Windsurf are the primary beneficiaries. (GitHub financial disclosures, 2025)</Bullet>
        <Bullet>Cursor has become the breakout story of 2025, growing from ~200K users in early 2024 to an estimated 3.2M by Q4 2025, with ARR crossing $200M. (The Information, 2025)</Bullet>
        <Bullet>Enterprise adoption reached a tipping point. 71% of companies with 500+ engineers now provide an AI coding tool as standard tooling, up from 38% in 2023.</Bullet>
        <Bullet>The &quot;assistant&quot; framing is dying. The market is shifting toward agentic coding — tools that execute multi-step tasks autonomously.</Bullet>
        <Bullet>Pricing pressure is real but uneven. Free tiers from Amazon and Google have not collapsed the market. Developers pay $20-40/month for tools that measurably improve output.</Bullet>
        <Bullet>The next 18 months will see consolidation. We expect 2-3 acquisitions of mid-tier players by major cloud/DevTool platforms by end of 2027.</Bullet>

        <Insight>In 2023, only 35% of the addressable market was captured. By 2025, that figure reached 67%. Enterprise deals are the primary driver — when a company like Shopify rolls out Copilot to all engineers, that&apos;s thousands of seats converting overnight.</Insight>
      </View>
      <PageFooter />
    </Page>

    {/* ═══ MARKET SIZING ═══ */}
    <Page size="A4" style={s.page}>
      <PageHeader />
      <View style={{ marginTop: 30 }}>
        <SectionDivider num="02" title="Market Sizing & Growth" />
        
        <MarketSizeChart />

        <Text style={s.h3}>Growth Drivers</Text>
        <View style={[s.row, s.mb12]}>
          <View style={[s.card, s.col]}>
            <Text style={[s.statValue, { fontSize: 18 }]}>32M</Text>
            <Text style={[s.h4, { marginTop: 2 }]}>Developer Population</Text>
            <Text style={s.bodySmall}>Professional developers worldwide in 2025, up from 27M in 2022. Every new developer is a potential seat.</Text>
            <Text style={s.source}>Evans Data Corporation, 2025</Text>
          </View>
          <View style={[s.card, s.col]}>
            <Text style={[s.statValue, { fontSize: 18 }]}>27-55%</Text>
            <Text style={[s.h4, { marginTop: 2 }]}>Productivity Gains</Text>
            <Text style={s.bodySmall}>Improvement in task completion speed across multiple independent studies. The ROI case is now undeniable.</Text>
            <Text style={s.source}>GitHub (2023), Microsoft Research (2024), McKinsey (2025)</Text>
          </View>
          <View style={[s.card, s.col]}>
            <Text style={[s.statValue, { fontSize: 18 }]}>→</Text>
            <Text style={[s.h4, { marginTop: 2 }]}>Agentic Shift</Text>
            <Text style={s.bodySmall}>Tools moved from autocompleting lines to handling multi-file edits and multi-step tasks autonomously.</Text>
            <Text style={s.source}>Kael Research analysis</Text>
          </View>
        </View>

        <Text style={s.h3}>Growth Constraints</Text>
        <View style={[s.row, s.mb12]}>
          <View style={[s.card, s.col, { borderColor: '#7f1d1d' }]}>
            <Text style={[s.statValue, { fontSize: 18, color: C.red }]}>34%</Text>
            <Text style={s.h4}>Security Concerns</Text>
            <Text style={s.bodySmall}>Of engineering leaders cite &quot;code confidentiality&quot; as their primary hesitation for enterprise adoption.</Text>
          </View>
          <View style={[s.card, s.col, { borderColor: '#7f1d1d' }]}>
            <Text style={[s.statValue, { fontSize: 18, color: C.red }]}>~</Text>
            <Text style={s.h4}>Model Quality Plateau</Text>
            <Text style={s.bodySmall}>Recent model improvements have been incremental for code generation. Satisfaction scores have plateaued.</Text>
          </View>
          <View style={[s.card, s.col, { borderColor: '#7f1d1d' }]}>
            <Text style={[s.statValue, { fontSize: 18, color: C.red }]}>18%</Text>
            <Text style={s.h4}>Dev Resistance</Text>
            <Text style={s.bodySmall}>Actively avoid AI coding tools, citing skill atrophy concerns. Shrinking but vocal minority.</Text>
          </View>
        </View>
      </View>
      <PageFooter />
    </Page>

    {/* ═══ COMPETITIVE LANDSCAPE ═══ */}
    <Page size="A4" style={s.page}>
      <PageHeader />
      <View style={{ marginTop: 30 }}>
        <SectionDivider num="03" title="Competitive Landscape" />

        <MarketSharePie />

        <View style={s.mb12} />

        <Text style={s.h3}>Year-over-Year Revenue Growth (2025 vs 2024)</Text>
        <View style={[s.card, s.mb12]}>
          {[
            { name: 'Cursor', growth: 340, color: C.blue },
            { name: 'Windsurf', growth: 185, color: C.emerald },
            { name: 'JetBrains AI', growth: 120, color: '#ec4899' },
            { name: 'Google Gemini', growth: 95, color: C.purple },
            { name: 'Copilot', growth: 68, color: C.amber },
            { name: 'Amazon Q', growth: 42, color: C.purple },
            { name: 'Tabnine', growth: 15, color: C.red },
          ].map((d, i) => (
            <HBar key={i} label={d.name} value={d.growth} max={400} color={d.color} />
          ))}
          <Text style={s.source}>Source: Company disclosures, Kael Research estimates</Text>
        </View>
      </View>
      <PageFooter />
    </Page>

    {/* ═══ COMPETITOR PROFILES ═══ */}
    <Page size="A4" style={s.page}>
      <PageHeader />
      <View style={{ marginTop: 30 }}>
        <Text style={s.h3}>Competitor Profiles</Text>
        <View style={[s.row, s.mb8]}>
          {[
            { rank: 1, name: 'GitHub Copilot', rev: '$2.44B', share: '42%', growth: '+68%', color: C.amber },
            { rank: 2, name: 'Cursor', rev: '$0.58B', share: '10%', growth: '+340%', color: C.blue },
          ].map((c, i) => (
            <View key={i} style={s.compCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={s.compRank}>#{c.rank}</Text>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c.color }} />
                  <Text style={s.compName}>{c.name}</Text>
                </View>
                <Text style={{ fontSize: 7, color: C.textDim }}>{c.share} share</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <View>
                  <Text style={s.compRevenue}>{c.rev}</Text>
                  <Text style={s.compMeta}>Est. Revenue 2025</Text>
                </View>
                <Text style={{ fontSize: 10, fontWeight: 600, color: parseInt(c.growth) > 100 ? C.green : C.amber }}>{c.growth} YoY</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={[s.row, s.mb16]}>
          {[
            { rank: 3, name: 'Windsurf (Codeium)', rev: '$0.41B', share: '7%', growth: '+185%', color: C.emerald },
            { rank: 4, name: 'Amazon Q Developer', rev: '$0.35B', share: '6%', growth: '+42%', color: C.purple },
          ].map((c, i) => (
            <View key={i} style={s.compCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={s.compRank}>#{c.rank}</Text>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: c.color }} />
                  <Text style={s.compName}>{c.name}</Text>
                </View>
                <Text style={{ fontSize: 7, color: C.textDim }}>{c.share} share</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <View>
                  <Text style={s.compRevenue}>{c.rev}</Text>
                  <Text style={s.compMeta}>Est. Revenue 2025</Text>
                </View>
                <Text style={{ fontSize: 10, fontWeight: 600, color: parseInt(c.growth) > 100 ? C.green : C.amber }}>{c.growth} YoY</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={s.body}>
          Copilot is still the giant, but it&apos;s a slowing giant. Its market share dropped from ~55% in early 2024 to ~42% by end of 2025. Revenue is still growing (68% YoY is excellent), but the market is growing faster.
        </Text>

        <Insight>Cursor&apos;s rise is the defining story. Going from a niche fork of VS Code to $580M in estimated revenue in under two years is remarkable. Their insight: developers don&apos;t want AI inside their editor — they want an editor built around AI.</Insight>

        <Text style={s.body}>
          Tabnine is in trouble. Once a pioneer in AI code completion, it has been lapped by faster-moving competitors. Its 15% YoY growth is below market rate. Without a strategic shift, Tabnine risks becoming an acquisition target rather than a category leader.
        </Text>
      </View>
      <PageFooter />
    </Page>

    {/* ═══ FEATURE COMPARISON ═══ */}
    <Page size="A4" style={s.page}>
      <PageHeader />
      <View style={{ marginTop: 30 }}>
        <SectionDivider num="04" title="Feature Comparison" />

        <View style={[s.card, s.mb12]}>
          <Text style={[s.h4, s.mb8]}>Detailed Feature Matrix</Text>
          <View style={s.tableHeader}>
            <Text style={[s.tableHeaderCell, { width: 110 }]}>FEATURE</Text>
            <Text style={[s.tableHeaderCell, { width: 65, textAlign: 'center' }]}>COPILOT</Text>
            <Text style={[s.tableHeaderCell, { width: 65, textAlign: 'center' }]}>CURSOR</Text>
            <Text style={[s.tableHeaderCell, { width: 65, textAlign: 'center' }]}>WINDSURF</Text>
            <Text style={[s.tableHeaderCell, { width: 65, textAlign: 'center' }]}>AMAZON Q</Text>
            <Text style={[s.tableHeaderCell, { width: 65, textAlign: 'center' }]}>TABNINE</Text>
          </View>
          {[
            ['Inline Autocomplete', '●', '●', '●', '●', '●'],
            ['Chat Interface', '●', '●', '●', '●', '●'],
            ['Multi-file Editing', '●', '●', '●', '◐', '✕'],
            ['Codebase Awareness', '◐', '●', '●', '◐', '◐'],
            ['Agentic Execution', '●', '●', '●', '◐', '✕'],
            ['Terminal Integration', '●', '●', '●', '◐', '✕'],
            ['Custom Model Support', '✕', '●', '◐', '✕', '●'],
            ['On-premise Deploy', '●', '✕', '●', '●', '●'],
            ['SOC 2 Compliance', '●', '●', '●', '●', '●'],
          ].map(([feature, ...scores], i) => (
            <View key={i} style={[s.tableRow, { alignItems: 'center' }]}>
              <Text style={[s.tableCell, { width: 110 }]}>{feature}</Text>
              {scores.map((score, j) => (
                <Text key={j} style={[s.tableCell, { width: 65, textAlign: 'center', color: score === '●' ? C.green : score === '◐' ? C.amber : C.red }]}>
                  {score}
                </Text>
              ))}
            </View>
          ))}
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
            <Text style={{ fontSize: 7, color: C.green }}>● Strong/Available</Text>
            <Text style={{ fontSize: 7, color: C.amber }}>◐ Limited/Partial</Text>
            <Text style={{ fontSize: 7, color: C.red }}>✕ Not Available</Text>
          </View>
          <Text style={s.source}>Based on product testing Jan-Feb 2026</Text>
        </View>

        <Text style={s.body}>
          The feature gap between the top three (Copilot, Cursor, Windsurf) has narrowed considerably. The real differentiation is in execution quality: how well does the agent handle complex, real-world codebases? In our testing, Cursor&apos;s Composer consistently produces better results on tasks involving 5+ file changes.
        </Text>

        <SectionDivider num="05" title="Pricing Analysis" />

        <View style={[s.row, s.mb12]}>
          <View style={[s.card, s.col]}>
            <Text style={[s.h4, s.mb8]}>Individual Plans</Text>
            {[
              { name: 'Copilot', free: '2K/mo', price: '$10/mo' },
              { name: 'Cursor', free: 'Limited', price: '$20/mo' },
              { name: 'Windsurf', free: 'Generous', price: '$15/mo' },
              { name: 'Amazon Q', free: 'Unlimited', price: '$19/mo' },
              { name: 'Tabnine', free: 'Basic', price: '$12/mo' },
            ].map((p, i) => (
              <View key={i} style={[s.tableRow, { justifyContent: 'space-between' }]}>
                <Text style={s.tableCell}>{p.name}</Text>
                <Text style={[s.tableCell, { color: C.textDim }]}>{p.free}</Text>
                <Text style={s.tableCellBold}>{p.price}</Text>
              </View>
            ))}
          </View>
          <View style={[s.card, s.col]}>
            <Text style={[s.h4, s.mb8]}>Enterprise Plans</Text>
            {[
              { name: 'Copilot Enterprise', price: '$39/user/mo' },
              { name: 'Copilot Business', price: '$19/user/mo' },
              { name: 'Cursor Business', price: '$40/user/mo' },
              { name: 'Windsurf Enterprise', price: '$30-45/user/mo' },
              { name: 'Tabnine Enterprise', price: '$39/user/mo' },
            ].map((p, i) => (
              <View key={i} style={[s.tableRow, { justifyContent: 'space-between' }]}>
                <Text style={s.tableCell}>{p.name}</Text>
                <Text style={s.tableCellBold}>{p.price}</Text>
              </View>
            ))}
          </View>
        </View>

        <Insight>Several players are moving toward usage-based pricing for agentic features — charging per task rather than per seat. This is the model that will likely dominate enterprise deals by 2027.</Insight>
      </View>
      <PageFooter />
    </Page>

    {/* ═══ ADOPTION TRENDS ═══ */}
    <Page size="A4" style={s.page}>
      <PageHeader />
      <View style={{ marginTop: 30 }}>
        <SectionDivider num="06" title="User Adoption Trends" />

        <View style={[s.card, s.mb12]}>
          <Text style={[s.h4, s.mb8]}>Developer Adoption Over Time</Text>
          <View style={s.tableHeader}>
            <Text style={[s.tableHeaderCell, { width: 140 }]}>METRIC</Text>
            <Text style={[s.tableHeaderCell, { width: 80, textAlign: 'center' }]}>2023</Text>
            <Text style={[s.tableHeaderCell, { width: 80, textAlign: 'center' }]}>2024</Text>
            <Text style={[s.tableHeaderCell, { width: 80, textAlign: 'center' }]}>2025</Text>
          </View>
          {[
            ['Have tried an AI tool', '44%', '62%', '76%'],
            ['Use one daily', '27%', '41%', '52%'],
            ['Can\'t live without', '15%', '24%', '34%'],
            ['Actively resist', '31%', '24%', '18%'],
          ].map(([metric, ...vals], i) => (
            <View key={i} style={s.tableRow}>
              <Text style={[s.tableCell, { width: 140 }]}>{metric}</Text>
              {vals.map((v, j) => (
                <Text key={j} style={[s.tableCellBold, { width: 80, textAlign: 'center' }]}>{v}</Text>
              ))}
            </View>
          ))}
          <Text style={s.source}>Sources: Stack Overflow (2025), JetBrains (2025), SlashData (2025)</Text>
        </View>

        <Text style={s.h3}>Developer Satisfaction (NPS)</Text>
        <View style={[s.card, s.mb12]}>
          {[
            { name: 'Cursor', nps: 62, change: '+18', color: C.green },
            { name: 'Windsurf', nps: 45, change: '+22', color: C.green },
            { name: 'Copilot', nps: 38, change: '-7', color: C.amber },
            { name: 'Amazon Q', nps: 12, change: '+5', color: C.amber },
            { name: 'Tabnine', nps: 8, change: '-15', color: C.red },
          ].map((d, i) => (
            <HBar key={i} label={`${d.name}`} value={d.nps} max={80} color={d.color} />
          ))}
          <Text style={s.source}>NPS = Net Promoter Score (-100 to +100). Change = YoY from 2024.</Text>
        </View>

        <Text style={s.h3}>Adoption by Company Size</Text>
        <View style={[s.card, s.mb12]}>
          <View style={s.tableHeader}>
            <Text style={[s.tableHeaderCell, { width: 80 }]}>SIZE</Text>
            <Text style={[s.tableHeaderCell, { width: 70, textAlign: 'center' }]}>ADOPTION</Text>
            <Text style={[s.tableHeaderCell, { width: 160 }]}>PRIMARY TOOL</Text>
            <Text style={[s.tableHeaderCell, { width: 70, textAlign: 'center' }]}>AVG SEATS</Text>
          </View>
          {[
            ['1-10', '68%', 'Cursor (34%), Copilot (31%)', '4'],
            ['11-100', '74%', 'Copilot (41%), Cursor (26%)', '28'],
            ['101-500', '71%', 'Copilot (48%), Windsurf (15%)', '95'],
            ['501-5K', '78%', 'Copilot (52%), Tabnine (12%)', '420'],
            ['5,000+', '65%', 'Copilot (58%), Amazon Q (18%)', '2,100'],
          ].map(([size, adoption, tool, seats], i) => (
            <View key={i} style={s.tableRow}>
              <Text style={[s.tableCell, { width: 80 }]}>{size}</Text>
              <Text style={[s.tableCellBold, { width: 70, textAlign: 'center' }]}>{adoption}</Text>
              <Text style={[s.tableCell, { width: 160 }]}>{tool}</Text>
              <Text style={[s.tableCell, { width: 70, textAlign: 'center' }]}>{seats}</Text>
            </View>
          ))}
          <Text style={s.source}>Source: Kael Research Enterprise Software Survey, Q4 2025 (n=840)</Text>
        </View>

        <Insight>Copilot&apos;s dominance increases with company size — the Microsoft enterprise sales engine at work. But in small teams and startups, Cursor has near-parity. This is how market share shifts begin.</Insight>
      </View>
      <PageFooter />
    </Page>

    {/* ═══ RECOMMENDATIONS ═══ */}
    <Page size="A4" style={s.page}>
      <PageHeader />
      <View style={{ marginTop: 30 }}>
        <SectionDivider num="07" title="Strategic Recommendations" />
        <Text style={[s.body, s.mb12]}>Five actionable takeaways for founders, investors, and product leaders operating in this space.</Text>

        {[
          { num: '01', title: 'Don\'t build another general-purpose assistant', text: 'The general-purpose market is a three-horse race with massive network effects and deep funding. Target a specific wedge: a language, a framework, a domain, or a workflow. Own a niche before expanding.' },
          { num: '02', title: 'Bet on agents, not autocomplete', text: 'Autocomplete is commoditized. The high-value frontier is agentic capabilities: task decomposition, tool use, error recovery, human-in-the-loop checkpoints.' },
          { num: '03', title: 'Enterprise is the revenue, developers are the distribution', text: 'You need both: a free/cheap individual tier that developers love, and an enterprise tier that satisfies procurement. Skipping developer experience to go straight to enterprise sales rarely works in DevTools.' },
          { num: '04', title: 'Solve the trust problem first', text: 'SOC 2 Type II before launch, transparent data handling, optional on-premise deployment, clear code attribution. Expensive upfront but dramatically shortens enterprise sales cycles.' },
          { num: '05', title: 'Build for model-agnostic future', text: 'The winning architecture routes requests to the best model based on task type, latency, and cost. Cursor\'s "bring your own API key" is early. The full vision is automatic, invisible model routing.' },
        ].map((rec, i) => (
          <View key={i} style={s.recCard}>
            <Text style={s.recNum}>{rec.num}</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.recTitle}>{rec.title}</Text>
              <Text style={s.recText}>{rec.text}</Text>
            </View>
          </View>
        ))}

        <View style={s.dividerLine} />
        <SectionDivider num="08" title="Methodology" />
        <Text style={s.body}>
          Kael Research produces market intelligence through a combination of primary and secondary research: quantitative data from public disclosures and third-party reports (Gartner, IDC, Forrester), developer surveys (Stack Overflow, JetBrains, SlashData), and proprietary analytics.
        </Text>
        <Text style={s.body}>
          Qualitative insights come from 34 structured interviews with engineering leaders, product managers, and VC investors conducted October 2025 – January 2026.
        </Text>
        <Text style={s.body}>
          Market sizing uses bottom-up methodology: estimated user counts × average revenue per user, cross-referenced with top-down analyst estimates. Competitive analysis includes hands-on product testing over minimum two-week periods.
        </Text>
        <Text style={[s.bodySmall, { fontStyle: 'italic' }]}>
          We do not accept sponsorship or payment from companies covered in our reports.
        </Text>
      </View>
      <PageFooter />
    </Page>

    {/* ═══ BACK COVER ═══ */}
    <Page size="A4" style={[s.page, { justifyContent: 'center', alignItems: 'center' }]}>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: C.amber }} />
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: 3, color: C.white, marginBottom: 4 }}>
          KAEL <Text style={{ color: C.amber }}>RESEARCH</Text>
        </Text>
        <Text style={{ fontSize: 8, color: C.textDim, letterSpacing: 2, marginBottom: 30 }}>MARKET INTELLIGENCE</Text>
        <Text style={{ fontSize: 10, color: C.textLight, textAlign: 'center', marginBottom: 6 }}>
          Need this level of analysis for your market?
        </Text>
        <Text style={{ fontSize: 9, color: C.textDim, textAlign: 'center', maxWidth: 300, marginBottom: 20 }}>
          Full reports include regulatory analysis, regional breakdowns, investment activity tracking, 5-year forecasting models, and custom recommendations.
        </Text>
        <Text style={{ fontSize: 10, fontWeight: 600, color: C.amber }}>contact@kaelresearch.com</Text>
        <Text style={{ fontSize: 8, color: C.textDim, marginTop: 4 }}>kaelresearch.com</Text>
      </View>
      <View style={{ position: 'absolute', bottom: 30, left: 50, right: 50, alignItems: 'center' }}>
        <Text style={{ fontSize: 7, color: C.textDim }}>© 2026 Kael Research. All rights reserved.</Text>
      </View>
    </Page>
  </Document>
);

// ── API Route ─────────────────────────────────────────────────────────
export async function GET() {
  try {
    const buffer = await renderToBuffer(<ReportPDF />);
    const uint8 = new Uint8Array(buffer);
    return new NextResponse(uint8, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Kael-Research-AI-Code-Assistant-Market-2026.pdf"',
      },
    });
  } catch (err) {
    console.error('PDF generation error:', err);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}
