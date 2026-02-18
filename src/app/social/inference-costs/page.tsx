'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList,
} from 'recharts';

const NAVY = '#1B2A4A';
const CORAL = '#F43F5E';
const TEAL = '#14B8A6';
const ELECTRIC = '#6366F1';

/* Real pricing data — sources: openai.com/api/pricing, ai.google.dev/pricing, together.ai/pricing */
const data = [
  { model: 'GPT-4', sub: 'Mar 2023', cost: 30.00, color: NAVY },
  { model: 'GPT-4.1', sub: 'Apr 2025', cost: 2.00, color: NAVY },
  { model: 'GPT-5 mini', sub: 'Now', cost: 0.25, color: ELECTRIC },
  { model: 'Gemini 2.0\nFlash', sub: 'Now', cost: 0.10, color: TEAL },
  { model: 'GPT-4.1\nnano', sub: 'Now', cost: 0.10, color: CORAL },
];

export default function InferenceCosts() {
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
      <div style={{ height: 5, background: `linear-gradient(90deg, ${TEAL}, ${ELECTRIC}, ${CORAL})` }} />

      {/* Header */}
      <div style={{ padding: '28px 56px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: NAVY, fontSize: 15, fontWeight: 800 }}>KAEL</span>
          <span style={{ color: CORAL, fontSize: 15, fontWeight: 800 }}>RESEARCH</span>
        </div>
        <span style={{ color: '#9CA3AF', fontSize: 11 }}>AI Inference Pricing · Feb 2026</span>
      </div>

      {/* Headline */}
      <div style={{ padding: '36px 56px 0' }}>
        <h1 style={{
          margin: 0, color: NAVY,
          fontSize: 50, fontWeight: 900, lineHeight: 1.1, letterSpacing: -2,
        }}>
          GPT-4 cost $30 per million tokens.<br />
          now it&apos;s <span style={{ color: TEAL }}>$0.10.</span>
        </h1>
        <p style={{
          margin: '20px 0 0', color: '#6B7280', fontSize: 18, lineHeight: 1.5, maxWidth: 700,
        }}>
          300x cheaper in under 3 years. every startup&apos;s unit economics just changed.
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
          cost per 1M input tokens (USD) — from official pricing pages
        </div>

        <div style={{ flex: 1 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 30, right: 20, left: 20, bottom: 8 }} barSize={85}>
              <XAxis
                dataKey="model" stroke="transparent"
                tick={{ fontSize: 13, fill: NAVY, fontWeight: 700 }}
                tickLine={false} axisLine={false} dy={8}
              />
              <YAxis hide domain={[0, 35]} />
              <Bar dataKey="cost" radius={[10, 10, 0, 0]}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={i >= 2 ? 1 : 0.65} />
                ))}
                <LabelList
                  dataKey="cost"
                  position="top"
                  formatter={(v: any) => v >= 1 ? `$${v}` : `$${v.toFixed(2)}`}
                  style={{ fontSize: 20, fontWeight: 800, fill: NAVY }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline labels */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 4 }}>
          {data.map(d => (
            <span key={d.model} style={{ color: '#9CA3AF', fontSize: 11, fontWeight: 500, textAlign: 'center', width: 85 }}>
              {d.sub}
            </span>
          ))}
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
          { label: 'Cost drop', val: '300x', sub: 'in 3 years', color: TEAL },
          { label: 'Claude Sonnet 4', val: '$3', sub: '/1M input', color: ELECTRIC },
          { label: 'Llama 4 hosted', val: '$0.27', sub: '/1M input', color: '#F59E0B' },
          { label: 'DeepSeek V3.1', val: '$0.60', sub: '/1M input', color: CORAL },
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
        <span style={{ color: '#D1D5DB', fontSize: 10 }}>sources: openai.com/api/pricing, ai.google.dev/pricing, together.ai/pricing, anthropic.com</span>
        <span style={{ color: '#D1D5DB', fontSize: 10 }}>kaelresearch.com</span>
      </div>
    </div>
  );
}
