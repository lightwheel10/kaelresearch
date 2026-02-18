'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList,
} from 'recharts';

const NAVY = '#1B2A4A';
const CORAL = '#F43F5E';
const MUTED = '#94A3B8';

const data = [
  { year: '2023', favorable: 77, color: NAVY },
  { year: '2024', favorable: 72, color: NAVY },
  { year: '2025', favorable: 60, color: CORAL },
];

export default function AISentimentDrop() {
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
      <div style={{ height: 5, background: `linear-gradient(90deg, ${CORAL}, ${NAVY})` }} />

      {/* Header */}
      <div style={{ padding: '28px 56px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: NAVY, fontSize: 15, fontWeight: 800 }}>KAEL</span>
          <span style={{ color: CORAL, fontSize: 15, fontWeight: 800 }}>RESEARCH</span>
        </div>
        <span style={{ color: '#9CA3AF', fontSize: 11 }}>Stack Overflow Developer Survey · 2025</span>
      </div>

      {/* Headline */}
      <div style={{ padding: '36px 56px 0' }}>
        <h1 style={{
          margin: 0, color: NAVY,
          fontSize: 52, fontWeight: 900, lineHeight: 1.1, letterSpacing: -2,
        }}>
          devs use AI more than ever.<br />
          they like it <span style={{ color: CORAL }}>less than ever.</span>
        </h1>
        <p style={{
          margin: '20px 0 0', color: '#6B7280', fontSize: 18, lineHeight: 1.5, maxWidth: 700,
        }}>
          favorability dropped 17 points in two years while adoption hit 84%.
          the honeymoon is over.
        </p>
      </div>

      {/* Chart */}
      <div style={{
        flex: 1, margin: '32px 40px 0',
        background: '#fff', borderRadius: 16,
        border: '1px solid #E8E8E8',
        padding: '32px 40px 24px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ color: '#9CA3AF', fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>
          % of developers favorable toward AI tools
        </div>

        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 30, right: 20, left: 20, bottom: 8 }} barSize={120}>
              <XAxis
                dataKey="year" stroke="transparent"
                tick={{ fontSize: 20, fill: NAVY, fontWeight: 700 }}
                tickLine={false} axisLine={false} dy={8}
              />
              <YAxis hide domain={[0, 100]} />
              <Bar dataKey="favorable" radius={[12, 12, 0, 0]}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={i === 2 ? 1 : 0.7} />
                ))}
                <LabelList
                  dataKey="favorable"
                  position="top"
                  formatter={(v: number) => `${v}%`}
                  style={{ fontSize: 28, fontWeight: 800, fill: NAVY }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom stats */}
      <div style={{
        margin: '16px 40px 0',
        background: '#fff', borderRadius: 14, overflow: 'hidden',
        border: '1px solid #E8E8E8',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
        display: 'flex',
      }}>
        {[
          { label: 'Use AI daily', val: '51%', sub: 'of pro devs', color: NAVY },
          { label: 'Distrust accuracy', val: '46%', sub: 'vs 33% trust', color: CORAL },
          { label: '#1 frustration', val: '66%', sub: '"almost right"', color: '#F59E0B' },
          { label: 'Vibe coding?', val: '72%', sub: 'say no', color: MUTED },
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
      <div style={{ padding: '14px 56px 24px', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#D1D5DB', fontSize: 10 }}>source: Stack Overflow Developer Survey 2023–2025 (n=65,000+)</span>
        <span style={{ color: '#D1D5DB', fontSize: 10 }}>kaelresearch.com</span>
      </div>
    </div>
  );
}
