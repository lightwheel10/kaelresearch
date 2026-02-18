'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';

const NAVY = '#1B2A4A';
const CORAL = '#F43F5E';
const ELECTRIC = '#4F46E5';
const TEAL = '#0D9488';

const data = [
  { q: 'Q1', copilot: 55, cursor: 8 },
  { q: 'Q2', copilot: 52, cursor: 11 },
  { q: 'Q3', copilot: 49, cursor: 14 },
  { q: 'Q4', copilot: 46, cursor: 17 },
  { q: 'Q1\'25', copilot: 44, cursor: 19 },
  { q: 'Q2\'25', copilot: 42, cursor: 21 },
];

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
      position: 'relative',
    }}>
      {/* Top accent */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${CORAL}, ${ELECTRIC}, ${TEAL})` }} />

      {/* Header */}
      <div style={{ padding: '32px 48px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: NAVY, fontSize: 16, fontWeight: 800, letterSpacing: 0.5 }}>KAEL</span>
          <span style={{ color: CORAL, fontSize: 16, fontWeight: 800, letterSpacing: 0.5 }}>RESEARCH</span>
        </div>
        <span style={{ color: '#9CA3AF', fontSize: 12 }}>2025 Market Brief</span>
      </div>

      {/* Big editorial headline */}
      <div style={{ padding: '40px 48px 0' }}>
        <h1 style={{
          margin: 0, color: NAVY,
          fontSize: 52, fontWeight: 900, lineHeight: 1.1, letterSpacing: -1.5,
          maxWidth: 700,
        }}>
          GitHub Copilot lost<br />
          <span style={{ color: CORAL }}>13 percentage points</span><br />
          of market share in<br />
          a single year.
        </h1>
      </div>

      {/* Stats row */}
      <div style={{
        margin: '36px 48px 0',
        display: 'flex', gap: 0,
        background: NAVY, borderRadius: 16, overflow: 'hidden',
      }}>
        <div style={{ flex: 1, padding: '28px 32px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
            Q1 2024
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 48, fontWeight: 800, lineHeight: 1 }}>
            55<span style={{ fontSize: 24, fontWeight: 400 }}>%</span>
          </div>
        </div>
        <div style={{ flex: 1, padding: '28px 32px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
            Q2 2025
          </div>
          <div style={{ color: CORAL, fontSize: 48, fontWeight: 800, lineHeight: 1 }}>
            42<span style={{ fontSize: 24, fontWeight: 400, opacity: 0.6 }}>%</span>
          </div>
        </div>
        <div style={{ flex: 1, padding: '28px 32px' }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
            Change
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: CORAL, fontSize: 48, fontWeight: 800, lineHeight: 1 }}>↓13</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 16 }}>pp</span>
          </div>
        </div>
      </div>

      {/* Chart + Winners */}
      <div style={{ display: 'flex', flex: 1, padding: '28px 48px 0', gap: 32 }}>
        {/* Chart */}
        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="cG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={NAVY} stopOpacity={0.08} />
                  <stop offset="100%" stopColor={NAVY} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="cuG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ELECTRIC} stopOpacity={0.1} />
                  <stop offset="100%" stopColor={ELECTRIC} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="q" stroke="transparent" tick={{ fontSize: 11, fill: '#9CA3AF' }} tickLine={false} axisLine={false} />
              <YAxis stroke="transparent" tick={{ fontSize: 10, fill: '#D1D5DB' }} tickLine={false} axisLine={false} unit="%" domain={[0, 60]} />
              <Area type="monotone" dataKey="copilot" stroke={NAVY} fill="url(#cG)" strokeWidth={2.5} dot={{ r: 3.5, fill: '#FAFAF8', stroke: NAVY, strokeWidth: 2 }} />
              <Area type="monotone" dataKey="cursor" stroke={ELECTRIC} fill="url(#cuG)" strokeWidth={2} dot={{ r: 3, fill: '#FAFAF8', stroke: ELECTRIC, strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Winners sidebar */}
        <div style={{ width: 220, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
          <div style={{ color: '#9CA3AF', fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
            Taking share
          </div>
          {[
            { name: 'Cursor', val: '21%', delta: '+163%', color: ELECTRIC },
            { name: 'Windsurf', val: '12%', delta: '+140%', color: TEAL },
            { name: 'Augment', val: '8%', delta: '+167%', color: '#F59E0B' },
          ].map(c => (
            <div key={c.name} style={{
              padding: '14px 16px', borderRadius: 12,
              background: '#fff', border: '1px solid #E5E7EB',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ color: '#6B7280', fontSize: 11, fontWeight: 500 }}>{c.name}</div>
                <div style={{ color: NAVY, fontSize: 22, fontWeight: 800, lineHeight: 1, marginTop: 2 }}>{c.val}</div>
              </div>
              <div style={{
                background: `${c.color}12`, color: c.color,
                padding: '4px 8px', borderRadius: 6,
                fontSize: 11, fontWeight: 700,
              }}>
                {c.delta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '16px 48px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 16 }}>
          {[
            { label: 'Copilot', color: NAVY },
            { label: 'Cursor', color: ELECTRIC },
          ].map(i => (
            <div key={i.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 12, height: 3, borderRadius: 2, background: i.color }} />
              <span style={{ color: '#9CA3AF', fontSize: 10 }}>{i.label}</span>
            </div>
          ))}
        </div>
        <span style={{ color: '#D1D5DB', fontSize: 10 }}>kaelresearch.com</span>
      </div>
    </div>
  );
}
