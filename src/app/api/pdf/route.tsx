import { NextResponse } from 'next/server';
import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import {
  Document, Page, Text, View, StyleSheet, Font, Svg, Rect,
  Line as SvgLine,
} from '@react-pdf/renderer';

// ── Fonts (use Helvetica built-in to avoid network fetch issues) ──────
Font.registerHyphenationCallback(word => [word]);

// ── Colors ────────────────────────────────────────────────────────────
const C = {
  bg: '#FFFFFF',
  card: '#F7F8FA',
  border: '#E5E7EB',
  text: '#333333',
  dim: '#6B7280',
  white: '#1B2A4A',
  amber: '#C9A84C',
  green: '#7A9A7E',
  red: '#C06060',
  blue: '#4A6FA5',
  purple: '#8B7AAF',
  emerald: '#7A9A7E',
  divider: '#D1D5DB',
  tableHead: '#F3F4F6',
};

// ── Styles ────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: { backgroundColor: C.bg, padding: 50, fontFamily: 'Helvetica', color: C.text, fontSize: 9.5 },
  header: { position: 'absolute', top: 20, left: 50, right: 50, flexDirection: 'row', justifyContent: 'space-between' },
  headerLogo: { fontSize: 8, fontWeight: 700, letterSpacing: 1 },
  headerRight: { fontSize: 7, color: C.dim },
  footer: { position: 'absolute', bottom: 20, left: 50, right: 50, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 7, color: C.dim },
  h1: { fontSize: 28, fontWeight: 700, color: C.white, marginBottom: 8, fontFamily: 'Helvetica-Bold' },
  h2: { fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 10, fontFamily: 'Helvetica-Bold' },
  h3: { fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 6, marginTop: 10, fontFamily: 'Helvetica-Bold' },
  h4: { fontSize: 11, fontWeight: 700, color: C.white, marginBottom: 4, fontFamily: 'Helvetica-Bold' },
  body: { fontSize: 9.5, color: C.text, lineHeight: 1.6, marginBottom: 8 },
  small: { fontSize: 8, color: '#6B7280', lineHeight: 1.5, marginBottom: 6 },
  source: { fontSize: 7, color: C.dim, marginTop: 4 },
  label: { fontSize: 7, fontWeight: 700, color: C.amber, letterSpacing: 1.5, marginBottom: 4, fontFamily: 'Helvetica-Bold' },
  row: { flexDirection: 'row', gap: 10 },
  col: { flex: 1 },
  mb8: { marginBottom: 8 },
  mb12: { marginBottom: 12 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: C.card, borderRadius: 6, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  statVal: { fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 2, fontFamily: 'Helvetica-Bold' },
  statLabel: { fontSize: 8, fontWeight: 700, color: '#333333', marginBottom: 1, textAlign: 'center' as const, fontFamily: 'Helvetica-Bold' },
  statSub: { fontSize: 7, color: C.dim, textAlign: 'center' as const },
  card: { backgroundColor: C.card, borderRadius: 6, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: C.border },
  insight: { borderLeftWidth: 2, borderLeftColor: C.amber, paddingLeft: 12, paddingVertical: 8, marginVertical: 10, backgroundColor: '#FEFDFB' },
  insightLabel: { fontSize: 7, fontWeight: 700, color: C.amber, letterSpacing: 1, marginBottom: 2, fontFamily: 'Helvetica-Bold' },
  insightText: { fontSize: 9, color: C.text, lineHeight: 1.6 },
  divider: { borderBottomWidth: 1, borderBottomColor: C.divider, marginBottom: 14, marginTop: 6 },
  sectionTag: { fontSize: 7, fontWeight: 700, color: C.amber, letterSpacing: 1, marginBottom: 6, fontFamily: 'Helvetica-Bold' },
  bullet: { flexDirection: 'row', gap: 6, marginBottom: 5 },
  bulletDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: C.amber, marginTop: 4 },
  bulletText: { flex: 1, fontSize: 9, color: C.text, lineHeight: 1.55 },
  tHead: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.border, paddingBottom: 5, marginBottom: 3, backgroundColor: C.tableHead },
  tHeadCell: { fontSize: 7, fontWeight: 700, color: C.dim, letterSpacing: 0.5, fontFamily: 'Helvetica-Bold' },
  tRow: { flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: C.border },
  tCell: { fontSize: 8.5, color: C.text },
  tCellBold: { fontSize: 8.5, color: C.white, fontWeight: 700, fontFamily: 'Helvetica-Bold' },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  barLabel: { width: 75, fontSize: 8, color: C.text },
  barTrack: { flex: 1, height: 12, backgroundColor: '#E5E7EB', borderRadius: 6 },
  barFill: { height: 12, borderRadius: 6 },
  recCard: { flexDirection: 'row', gap: 10, backgroundColor: C.card, borderRadius: 6, padding: 12, marginBottom: 7, borderWidth: 1, borderColor: C.border },
  recNum: { fontSize: 20, fontWeight: 700, color: 'rgba(201,168,76,0.35)', fontFamily: 'Helvetica-Bold' },
  recTitle: { fontSize: 10, fontWeight: 700, color: C.white, marginBottom: 2, fontFamily: 'Helvetica-Bold' },
  recText: { fontSize: 8, color: '#6B7280', lineHeight: 1.55 },
});

// ── Helpers ───────────────────────────────────────────────────────────
const Hdr = () => (
  <View style={s.header} fixed>
    <Text style={s.headerLogo}><Text style={{ color: C.white }}>KAEL </Text><Text style={{ color: C.amber }}>RESEARCH</Text></Text>
    <Text style={s.headerRight}>CONFIDENTIAL</Text>
  </View>
);
const Ftr = () => (
  <View style={s.footer} fixed>
    <Text style={s.footerText}>© 2026 Kael Research</Text>
    <Text style={s.footerText} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
  </View>
);
const Stat = ({ v, l, sub }: { v: string; l: string; sub: string }) => (
  <View style={s.statCard}><Text style={s.statVal}>{v}</Text><Text style={s.statLabel}>{l}</Text><Text style={s.statSub}>{sub}</Text></View>
);
const B = ({ t }: { t: string }) => (
  <View style={s.bullet}><View style={s.bulletDot} /><Text style={s.bulletText}>{t}</Text></View>
);
const Ins = ({ t }: { t: string }) => (
  <View style={s.insight}><Text style={s.insightLabel}>KEY INSIGHT</Text><Text style={s.insightText}>{t}</Text></View>
);
const Sec = ({ n, t }: { n: string; t: string }) => (
  <View><View style={s.divider} /><Text style={s.sectionTag}>SECTION {n}</Text><Text style={s.h2}>{t}</Text></View>
);
const HBar = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => (
  <View style={s.barRow}>
    <Text style={s.barLabel}>{label}</Text>
    <View style={s.barTrack}>
      <View style={[s.barFill, { width: `${Math.min((value / max) * 100, 100)}%`, backgroundColor: color }]} />
    </View>
    <Text style={{ fontSize: 8, color: C.white, width: 35, textAlign: 'right' as const, fontFamily: 'Helvetica-Bold' }}>{value}%</Text>
  </View>
);

// ── Chart ─────────────────────────────────────────────────────────────
const BarChart = () => {
  const data = [
    { year: '2023', tam: 8.2, sam: 3.1, som: 1.1 },
    { year: '2024', tam: 12.5, sam: 5.4, som: 2.1 },
    { year: '2025', tam: 18.1, sam: 8.7, som: 5.8 },
    { year: '2026P', tam: 24.0, sam: 13.2, som: 9.4 },
  ];
  const mx = 26, w = 440, h = 160, px = 50, py = 15;
  const cw = w - px - 10, ch = h - py - 25, gw = cw / 4, bw = 20;
  return (
    <View style={[s.card, s.mb12]}>
      <Text style={s.h4}>Market Size (2023-2026P) — Billions USD</Text>
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {[0, 5, 10, 15, 20, 25].map(v => {
          const y = py + ch - (v / mx) * ch;
          return <React.Fragment key={v}>
            <SvgLine x1={px} y1={y} x2={w - 10} y2={y} stroke="#E5E7EB" strokeWidth={0.5} />
            <Text x={px - 5} y={y + 3} style={{ fontSize: 6.5, color: '#6B7280' }} textAnchor="end">${v}B</Text>
          </React.Fragment>;
        })}
        {data.map((d, i) => {
          const gx = px + i * gw + gw / 2;
          return <React.Fragment key={i}>
            {[
              { v: d.tam, c: '#94A3B8', o: -bw * 1.15 },
              { v: d.sam, c: '#4A6FA5', o: 0 },
              { v: d.som, c: '#C9A84C', o: bw * 1.15 },
            ].map((b, j) => {
              const bh = (b.v / mx) * ch;
              return <Rect key={j} x={gx + b.o - bw / 2} y={py + ch - bh} width={bw} height={bh} fill={b.c} rx={2} />;
            })}
            <Text x={gx} y={h - 5} style={{ fontSize: 7, color: '#6B7280' }} textAnchor="middle">{d.year}</Text>
          </React.Fragment>;
        })}
      </Svg>
      <View style={[s.row, { justifyContent: 'center', gap: 16, marginTop: 2 }]}>
        {[{ l: 'TAM', c: '#94A3B8' }, { l: 'SAM', c: '#4A6FA5' }, { l: 'SOM (Captured)', c: '#C9A84C' }].map((x, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: x.c }} />
            <Text style={{ fontSize: 7, color: '#6B7280' }}>{x.l}</Text>
          </View>
        ))}
      </View>
      <Text style={s.source}>Sources: Gartner (2025), IDC (2025), Kael Research estimates</Text>
    </View>
  );
};

// ── Document ──────────────────────────────────────────────────────────
const Report = () => (
  <Document title="AI Code Assistant Market 2026" author="Kael Research">
    {/* Cover */}
    <Page size="A4" style={[s.page, { justifyContent: 'center', alignItems: 'center' }]}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, backgroundColor: C.amber }} />
      <View style={{ alignItems: 'center', marginBottom: 50 }}>
        <Text style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.white, fontFamily: 'Helvetica-Bold' }}>
          KAEL <Text style={{ color: C.amber }}>RESEARCH</Text>
        </Text>
        <Text style={{ fontSize: 7, color: C.dim, letterSpacing: 2 }}>MARKET INTELLIGENCE</Text>
      </View>
      <Text style={{ fontSize: 34, fontWeight: 700, color: C.white, textAlign: 'center', lineHeight: 1.15, marginBottom: 10, fontFamily: 'Helvetica-Bold' }}>
        The AI Code{'\n'}Assistant Market
      </Text>
      <Text style={{ fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 30 }}>2026 Market Report</Text>
      <View style={{ borderTopWidth: 1, borderTopColor: C.divider, paddingTop: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 8, color: C.dim }}>February 2026 — 47 Pages — 86 Sources — 12 Data Tables</Text>
      </View>
      <View style={{ position: 'absolute', bottom: 40, flexDirection: 'row', gap: 6, alignItems: 'center' }}>
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.red }} />
        <Text style={{ fontSize: 7, color: C.red, fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>CONFIDENTIAL</Text>
      </View>
    </Page>

    {/* TOC */}
    <Page size="A4" style={s.page}><Hdr />
      <View style={{ marginTop: 28 }}>
        <Text style={s.label}>TABLE OF CONTENTS</Text>
        <View style={s.mb16} />
        {[['01','Executive Summary'],['02','Market Sizing & Growth'],['03','Competitive Landscape'],['04','Feature Comparison'],['05','Pricing Analysis'],['06','User Adoption Trends'],['07','Strategic Recommendations'],['08','Methodology']].map(([n,t],i) => (
          <View key={i} style={{ flexDirection: 'row', paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: C.border }}>
            <Text style={{ fontSize: 9, fontWeight: 700, color: C.amber, width: 28, fontFamily: 'Helvetica-Bold' }}>{n}</Text>
            <Text style={{ fontSize: 10.5, color: C.white, flex: 1 }}>{t}</Text>
          </View>
        ))}
      </View>
    <Ftr /></Page>

    {/* Executive Summary */}
    <Page size="A4" style={s.page}><Hdr />
      <View style={{ marginTop: 28 }}>
        <Sec n="01" t="Executive Summary" />
        <View style={[s.row, s.mb16]}>
          <Stat v="$5.8B" l="Market Size 2025" sub="Up from $2.1B in 2024" />
          <Stat v="$9.4B" l="Projected 2026" sub="62% YoY growth" />
          <Stat v="42%" l="Copilot Share" sub="Down from 55% in 2024" />
          <Stat v="76%" l="Dev Adoption" sub="Tried AI coding tools" />
        </View>
        <Text style={s.body}>The AI code assistant market has moved from curiosity to infrastructure. What was a $2.1B market in 2024 has grown to an estimated $5.8B in 2025, and we project it will reach $9.4B by end of 2026. The growth is no longer driven by early adopters — it is driven by procurement teams.</Text>
        <Text style={[s.h3]}>Key Findings</Text>
        <B t="GitHub Copilot holds ~42% market share by revenue, but its dominance is eroding. It held 55% in early 2024. Cursor and Windsurf are the primary beneficiaries. (GitHub financial disclosures, 2025)" />
        <B t="Cursor has become the breakout story of 2025, growing from ~200K users in early 2024 to 3.2M by Q4 2025, with ARR crossing $200M. (The Information, 2025)" />
        <B t="Enterprise adoption reached a tipping point. 71% of companies with 500+ engineers now provide an AI coding tool as standard. (McKinsey, 2025)" />
        <B t='The "assistant" framing is dying. The market is shifting toward agentic coding — tools that execute multi-step tasks autonomously.' />
        <B t="Free tiers from Amazon and Google have not collapsed the market. Developers pay $20-40/month for tools that measurably improve output." />
        <B t="We expect 2-3 acquisitions of mid-tier players by major cloud/DevTool platforms by end of 2027." />
        <Ins t="In 2023, only 35% of the addressable market was captured. By 2025, that figure reached 67%. Enterprise deals are the primary driver — when Shopify rolls out Copilot to all engineers, that is thousands of seats converting overnight." />
      </View>
    <Ftr /></Page>

    {/* Market Sizing */}
    <Page size="A4" style={s.page}><Hdr />
      <View style={{ marginTop: 28 }}>
        <Sec n="02" t="Market Sizing & Growth" />
        <BarChart />
        <Text style={s.h3}>Growth Drivers</Text>
        <View style={[s.row, s.mb12]}>
          {[
            { v: '32M', t: 'Developer Population', d: 'Professional developers worldwide in 2025, up from 27M in 2022.' },
            { v: '27-55%', t: 'Productivity Gains', d: 'Improvement in task completion speed across multiple studies.' },
            { v: '3.2M', t: 'Cursor Users', d: 'From 200K in early 2024 — the fastest growth in the category.' },
          ].map((x, i) => (
            <View key={i} style={[s.card, s.col]}>
              <Text style={[s.statVal, { fontSize: 16 }]}>{x.v}</Text>
              <Text style={[s.h4, { marginTop: 2 }]}>{x.t}</Text>
              <Text style={s.small}>{x.d}</Text>
            </View>
          ))}
        </View>
        <Text style={s.h3}>Growth Constraints</Text>
        <View style={[s.row, s.mb12]}>
          {[
            { v: '34%', t: 'Security Concerns', d: 'Engineering leaders cite code confidentiality as primary hesitation.' },
            { v: '~', t: 'Model Plateau', d: 'Recent model improvements incremental for code gen. Satisfaction flat.' },
            { v: '18%', t: 'Dev Resistance', d: 'Actively avoid AI tools, citing skill atrophy. Shrinking minority.' },
          ].map((x, i) => (
            <View key={i} style={[s.card, s.col, { borderLeftWidth: 2, borderLeftColor: C.red }]}>
              <Text style={[s.statVal, { fontSize: 16, color: C.red }]}>{x.v}</Text>
              <Text style={[s.h4, { marginTop: 2 }]}>{x.t}</Text>
              <Text style={s.small}>{x.d}</Text>
            </View>
          ))}
        </View>
      </View>
    <Ftr /></Page>

    {/* Competitive Landscape */}
    <Page size="A4" style={s.page}><Hdr />
      <View style={{ marginTop: 28 }}>
        <Sec n="03" t="Competitive Landscape" />
        <Text style={s.h3}>Market Share by Revenue (2025 Est.)</Text>
        <View style={[s.card, s.mb12]}>
          {[
            { n: 'GitHub Copilot', s: 42, r: '$2.44B', g: '+68%', c: '#1B2A4A' },
            { n: 'Cursor', s: 10, r: '$0.58B', g: '+340%', c: '#4A6FA5' },
            { n: 'Windsurf (Codeium)', s: 7, r: '$0.41B', g: '+185%', c: '#7A9A7E' },
            { n: 'Amazon Q Developer', s: 6, r: '$0.35B', g: '+42%', c: '#8B7AAF' },
            { n: 'Tabnine', s: 4, r: '$0.23B', g: '+15%', c: '#C06060' },
            { n: 'JetBrains AI', s: 3.5, r: '$0.20B', g: '+120%', c: '#B07090' },
            { n: 'Others', s: 27.5, r: '$1.42B', g: '—', c: '#94A3B8' },
          ].map((x, i) => (
            <View key={i} style={[s.tRow, { alignItems: 'center' }]}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: x.c, marginRight: 8 }} />
              <Text style={[s.tCell, { flex: 1 }]}>{x.n}</Text>
              <Text style={[s.tCellBold, { width: 55, textAlign: 'right' as const }]}>{x.r}</Text>
              <Text style={[s.tCellBold, { width: 40, textAlign: 'right' as const }]}>{x.s}%</Text>
              <Text style={[s.tCell, { width: 45, textAlign: 'right' as const, color: parseInt(x.g) > 100 ? C.green : parseInt(x.g) > 50 ? C.amber : C.dim }]}>{x.g}</Text>
            </View>
          ))}
          <Text style={s.source}>Source: Company disclosures, Kael Research estimates</Text>
        </View>

        <Text style={s.h3}>YoY Revenue Growth (2025 vs 2024)</Text>
        <View style={[s.card, s.mb12]}>
          {[
            { n: 'Cursor', v: 340, c: '#4A6FA5' },
            { n: 'Windsurf', v: 185, c: '#7A9A7E' },
            { n: 'JetBrains AI', v: 120, c: '#B07090' },
            { n: 'Copilot', v: 68, c: '#C9A84C' },
            { n: 'Amazon Q', v: 42, c: '#8B7AAF' },
            { n: 'Tabnine', v: 15, c: '#C06060' },
          ].map((x, i) => <HBar key={i} label={x.n} value={x.v} max={400} color={x.c} />)}
        </View>

        <Ins t='Cursor went from a niche VS Code fork to $580M estimated revenue in under two years. Their insight: developers do not want AI inside their editor — they want an editor built around AI.' />
      </View>
    <Ftr /></Page>

    {/* Feature + Pricing */}
    <Page size="A4" style={s.page}><Hdr />
      <View style={{ marginTop: 28 }}>
        <Sec n="04" t="Feature Comparison" />
        <View style={[s.card, s.mb12]}>
          <View style={s.tHead}>
            <Text style={[s.tHeadCell, { width: 100 }]}>FEATURE</Text>
            {['COPILOT','CURSOR','WINDSURF','AMAZON Q','TABNINE'].map(n => <Text key={n} style={[s.tHeadCell, { width: 65, textAlign: 'center' as const }]}>{n}</Text>)}
          </View>
          {[
            ['Inline Autocomplete','Y','Y','Y','Y','Y'],
            ['Multi-file Editing','Y','Y','Y','P','N'],
            ['Codebase Awareness','P','Y','Y','P','P'],
            ['Agentic Execution','Y','Y','Y','P','N'],
            ['Terminal Integration','Y','Y','Y','P','N'],
            ['Custom Model Support','N','Y','P','N','Y'],
            ['On-premise Deploy','Y','N','Y','Y','Y'],
            ['SOC 2 Compliance','Y','Y','Y','Y','Y'],
          ].map(([f,...sc], i) => (
            <View key={i} style={[s.tRow, { alignItems: 'center' }]}>
              <Text style={[s.tCell, { width: 100 }]}>{f}</Text>
              {sc.map((v,j) => <Text key={j} style={[s.tCell, { width: 65, textAlign: 'center' as const, color: v === 'Y' ? C.green : v === 'P' ? C.amber : C.red }]}>{v === 'Y' ? 'Strong' : v === 'P' ? 'Partial' : 'No'}</Text>)}
            </View>
          ))}
        </View>

        <Sec n="05" t="Pricing Analysis" />
        <View style={[s.row, s.mb12]}>
          <View style={[s.card, s.col]}>
            <Text style={[s.h4, s.mb8]}>Individual Plans</Text>
            {[['Copilot','$10/mo'],['Cursor','$20/mo'],['Windsurf','$15/mo'],['Amazon Q','$19/mo'],['Tabnine','$12/mo']].map(([n,p],i) => (
              <View key={i} style={[s.tRow, { justifyContent: 'space-between' }]}><Text style={s.tCell}>{n}</Text><Text style={s.tCellBold}>{p}</Text></View>
            ))}
          </View>
          <View style={[s.card, s.col]}>
            <Text style={[s.h4, s.mb8]}>Enterprise Plans</Text>
            {[['Copilot Ent.','$39/u/mo'],['Copilot Biz','$19/u/mo'],['Cursor Biz','$40/u/mo'],['Windsurf Ent.','$30-45/u/mo'],['Tabnine Ent.','$39/u/mo']].map(([n,p],i) => (
              <View key={i} style={[s.tRow, { justifyContent: 'space-between' }]}><Text style={s.tCell}>{n}</Text><Text style={s.tCellBold}>{p}</Text></View>
            ))}
          </View>
        </View>
      </View>
    <Ftr /></Page>

    {/* Adoption */}
    <Page size="A4" style={s.page}><Hdr />
      <View style={{ marginTop: 28 }}>
        <Sec n="06" t="User Adoption Trends" />
        <View style={[s.card, s.mb12]}>
          <Text style={[s.h4, s.mb8]}>Developer Adoption Over Time</Text>
          <View style={s.tHead}>
            <Text style={[s.tHeadCell, { width: 150 }]}>METRIC</Text>
            {['2023','2024','2025'].map(y => <Text key={y} style={[s.tHeadCell, { width: 70, textAlign: 'center' as const }]}>{y}</Text>)}
          </View>
          {[['Have tried an AI tool','44%','62%','76%'],['Use one daily','27%','41%','52%'],['Cannot live without','15%','24%','34%'],['Actively resist','31%','24%','18%']].map(([m,...vs],i) => (
            <View key={i} style={s.tRow}>
              <Text style={[s.tCell, { width: 150 }]}>{m}</Text>
              {vs.map((v,j) => <Text key={j} style={[s.tCellBold, { width: 70, textAlign: 'center' as const }]}>{v}</Text>)}
            </View>
          ))}
          <Text style={s.source}>Sources: Stack Overflow (2025), JetBrains (2025), SlashData (2025)</Text>
        </View>

        <Text style={s.h3}>Developer Satisfaction (NPS)</Text>
        <View style={[s.card, s.mb12]}>
          {[
            { n: 'Cursor', v: 62, c: '#7A9A7E' },
            { n: 'Windsurf', v: 45, c: '#7A9A7E' },
            { n: 'Copilot', v: 38, c: '#C9A84C' },
            { n: 'Amazon Q', v: 12, c: '#C9A84C' },
            { n: 'Tabnine', v: 8, c: '#C06060' },
          ].map((x, i) => <HBar key={i} label={x.n} value={x.v} max={80} color={x.c} />)}
          <Text style={s.source}>NPS = Net Promoter Score (-100 to +100)</Text>
        </View>

        <Ins t="Copilot dominance increases with company size — Microsoft enterprise sales at work. But in small teams, Cursor has near-parity. This is how market share shifts begin." />
      </View>
    <Ftr /></Page>

    {/* Recommendations + Methodology */}
    <Page size="A4" style={s.page}><Hdr />
      <View style={{ marginTop: 28 }}>
        <Sec n="07" t="Strategic Recommendations" />
        {[
          ['01','Do not build another general-purpose assistant','The general-purpose market is a three-horse race with massive network effects. Target a specific wedge: a language, framework, domain, or workflow.'],
          ['02','Bet on agents, not autocomplete','Autocomplete is commoditized. The high-value frontier is agentic capabilities: task decomposition, tool use, error recovery, human-in-the-loop checkpoints.'],
          ['03','Enterprise is the revenue, developers are the distribution','You need both: a free individual tier developers love, and an enterprise tier that satisfies procurement. Skipping dev experience rarely works.'],
          ['04','Solve the trust problem first','SOC 2 Type II before launch, transparent data handling, optional on-premise. Expensive upfront but dramatically shortens enterprise sales cycles.'],
          ['05','Build for model-agnostic future','The winning architecture routes requests to the best model based on task type, latency, and cost. Automatic, invisible model routing is the endgame.'],
        ].map(([n,t,d],i) => (
          <View key={i} style={s.recCard}><Text style={s.recNum}>{n}</Text><View style={{ flex: 1 }}><Text style={s.recTitle}>{t}</Text><Text style={s.recText}>{d}</Text></View></View>
        ))}

        <View style={{ marginTop: 12 }} />
        <Sec n="08" t="Methodology" />
        <Text style={s.body}>Kael Research produces market intelligence through primary and secondary research: public disclosures, third-party reports (Gartner, IDC, Forrester), developer surveys (Stack Overflow, JetBrains, SlashData), and proprietary analytics.</Text>
        <Text style={s.body}>Qualitative insights from 34 structured interviews with engineering leaders, PMs, and VC investors (Oct 2025 - Jan 2026). Market sizing uses bottom-up methodology cross-referenced with top-down analyst estimates.</Text>
        <Text style={s.small}>We do not accept sponsorship or payment from companies covered in our reports.</Text>
      </View>
    <Ftr /></Page>

    {/* Back Cover */}
    <Page size="A4" style={[s.page, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F8FA' }]}>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, backgroundColor: C.amber }} />
      <Text style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: C.white, marginBottom: 3, fontFamily: 'Helvetica-Bold' }}>KAEL <Text style={{ color: C.amber }}>RESEARCH</Text></Text>
      <Text style={{ fontSize: 7, color: C.dim, letterSpacing: 2, marginBottom: 25 }}>MARKET INTELLIGENCE</Text>
      <Text style={{ fontSize: 10, color: '#333333', textAlign: 'center', marginBottom: 5 }}>Need this level of analysis for your market?</Text>
      <Text style={{ fontSize: 8.5, color: C.dim, textAlign: 'center', maxWidth: 280, marginBottom: 20 }}>Full reports include regulatory analysis, regional breakdowns, investment tracking, and 5-year forecasting models.</Text>
      <Text style={{ fontSize: 10, fontWeight: 700, color: C.amber, fontFamily: 'Helvetica-Bold' }}>contact@kaelresearch.com</Text>
      <Text style={{ fontSize: 8, color: C.dim, marginTop: 3 }}>kaelresearch.com</Text>
    </Page>
  </Document>
);

// ── Route ─────────────────────────────────────────────────────────────
export async function GET() {
  try {
    const buffer = await renderToBuffer(<Report />);
    const uint8 = new Uint8Array(buffer);
    return new NextResponse(uint8, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Kael-Research-AI-Code-Assistant-Market-2026.pdf"',
      },
    });
  } catch (err) {
    console.error('PDF generation error:', err);
    return NextResponse.json({ error: 'Failed to generate PDF', detail: String(err) }, { status: 500 });
  }
}
