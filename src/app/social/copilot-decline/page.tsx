'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Label,
} from 'recharts';

const NAVY = '#1B2A4A';
const CORAL = '#F43F5E';
const ELECTRIC = '#6366F1';
const TEAL = '#14B8A6';

const data = [
  { q: 'Q1 \'24', copilot: 55, cursor: 8, windsurf: 5 },
  { q: 'Q2 \'24', copilot: 52, cursor: 11, windsurf: 7 },
  { q: 'Q3 \'24', copilot: 49, cursor: 14, windsurf: 9 },
  { q: 'Q4 \'24', copilot: 46, cursor: 17, windsurf: 10 },
  { q: 'Q1 \'25', copilot: 44, cursor: 19, windsurf: 11 },
  { q: 'Q2 \'25', copilot: 42, cursor: 21, windsurf: 12 },
];

/* Custom dot that shows value label on first and last points */
const LabelDot = ({ cx, cy, index, dataKey, payload }: any) => {
  if (index !== 0 && index !== data.length - 1) return null;
  const val = payload[dataKey];
  const colors: Record<string, string> = { copilot: NAVY, cursor: ELECTRIC, windsurf: TEAL };
  const color = colors[dataKey] || NAVY;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill="#fff" stroke={color} strokeWidth={3} />
      <rect x={cx - 22} y={cy - 28} width={44} height={22} rx={6} fill={color} />
      <text x={cx} y={cy - 14} textAnchor="middle" fill="#fff" fontSize={12} fontWeight={700}>{val}%</text>
    </g>
  );
};

export default function CopilotDecline() {
  return (
    <div style={{
      width: 1080,
      height: 1080,
      background: '#FAFAF8',
      fontFamily: "'Inter', -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Accent bar */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${CORAL}, ${ELECTRIC}, ${TEAL})` }} />

      {/* Header */}
      <div style={{ padding: '28px 56px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: NAVY, fontSize: 15, fontWeight: 800 }}>KAEL</span>
          <span style={{ color: CORAL, fontSize: 15, fontWeight: 800 }}>RESEARCH</span>
        </div>
        <span style={{ color: '#9CA3AF', fontSize: 11 }}>AI Code Assistants · 2025</span>
      </div>

      {/* Headline */}
      <div style={{ padding: '28px 56px 0' }}>
        <h1 style={{
          margin: 0, color: NAVY,
          fontSize: 46, fontWeight: 900, lineHeight: 1.1, letterSpacing: -1.5,
        }}>
          Copilot lost <span style={{ color: CORAL }}>13 points</span><br />
          of enterprise share in a year
        </h1>
      </div>

      {/* THE CHART — big, bold, center stage */}
      <div style={{
        flex: 1, margin: '24px 40px 0',
        background: '#fff', borderRadius: 16,
        border: '1px solid #E8E8E8',
        padding: '24px 24px 16px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Chart legend */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 8, paddingLeft: 40 }}>
          {[
            { label: 'GitHub Copilot', color: NAVY },
            { label: 'Cursor', color: ELECTRIC },
            { label: 'Windsurf', color: TEAL },
          ].map(i => (
            <div key={i.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 16, height: 4, borderRadius: 2, background: i.color }} />
              <span style={{ color: '#6B7280', fontSize: 12, fontWeight: 600 }}>{i.label}</span>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 40, right: 30, left: 0, bottom: 8 }}>
              <defs>
                <linearGradient id="copilotFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={NAVY} stopOpacity={0.25} />
                  <stop offset="50%" stopColor={NAVY} stopOpacity={0.08} />
                  <stop offset="100%" stopColor={NAVY} stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="cursorFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ELECTRIC} stopOpacity={0.3} />
                  <stop offset="50%" stopColor={ELECTRIC} stopOpacity={0.1} />
                  <stop offset="100%" stopColor={ELECTRIC} stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="tealFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={TEAL} stopOpacity={0.25} />
                  <stop offset="50%" stopColor={TEAL} stopOpacity={0.08} />
                  <stop offset="100%" stopColor={TEAL} stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="q" stroke="transparent"
                tick={{ fontSize: 13, fill: '#9CA3AF', fontWeight: 600 }}
                tickLine={false} axisLine={false} dy={6}
              />
              <YAxis
                stroke="transparent"
                tick={{ fontSize: 12, fill: '#D1D5DB' }}
                tickLine={false} axisLine={false}
                unit="%" domain={[0, 60]} ticks={[0, 15, 30, 45, 60]}
              />
              <Area
                type="monotone" dataKey="copilot"
                stroke={NAVY} fill="url(#copilotFill)" strokeWidth={3.5}
                dot={<LabelDot dataKey="copilot" />}
                activeDot={false}
              />
              <Area
                type="monotone" dataKey="cursor"
                stroke={ELECTRIC} fill="url(#cursorFill)" strokeWidth={3}
                dot={<LabelDot dataKey="cursor" />}
                activeDot={false}
              />
              <Area
                type="monotone" dataKey="windsurf"
                stroke={TEAL} fill="url(#tealFill)" strokeWidth={2.5}
                dot={<LabelDot dataKey="windsurf" />}
                activeDot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div style={{
        margin: '16px 40px 0',
        background: '#fff', borderRadius: 14, overflow: 'hidden',
        border: '1px solid #E8E8E8',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
        display: 'flex',
      }}>
        {[
          { label: 'Copilot', val: '42%', sub: 'was 55%', color: NAVY },
          { label: 'Cursor', val: '21%', sub: 'was 8%', color: ELECTRIC },
          { label: 'Windsurf', val: '12%', sub: 'was 5%', color: TEAL },
          { label: 'Augment', val: '8%', sub: 'was 3%', color: '#F59E0B' },
        ].map((c, i) => (
          <div key={c.label} style={{
            flex: 1, padding: '18px 24px',
            borderRight: i < 3 ? '1px solid #E8E8E8' : 'none',
          }}>
            <div style={{ color: '#9CA3AF', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>
              {c.label}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ color: c.color, fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{c.val}</span>
              <span style={{ color: '#D1D5DB', fontSize: 12 }}>{c.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '14px 56px 24px', display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ color: '#D1D5DB', fontSize: 10 }}>kaelresearch.com</span>
      </div>
    </div>
  );
}
