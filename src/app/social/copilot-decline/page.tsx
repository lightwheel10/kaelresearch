'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList,
} from 'recharts';

const NAVY = '#1B2A4A';
const CORAL = '#F43F5E';
const ELECTRIC = '#6366F1';
const TEAL = '#14B8A6';
const AMBER = '#F59E0B';

/* Org adoption data — Aug 2025 surveys */
const adoptionData = [
  { name: 'Cursor', value: 43, color: ELECTRIC },
  { name: 'Copilot', value: 37, color: NAVY },
  { name: 'Windsurf', value: 12, color: TEAL },
  { name: 'Others', value: 8, color: '#D1D5DB' },
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
    }}>
      {/* Accent bar */}
      <div style={{ height: 5, background: `linear-gradient(90deg, ${CORAL}, ${ELECTRIC}, ${TEAL})` }} />

      {/* Header */}
      <div style={{ padding: '28px 56px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: NAVY, fontSize: 15, fontWeight: 800 }}>KAEL</span>
          <span style={{ color: CORAL, fontSize: 15, fontWeight: 800 }}>RESEARCH</span>
        </div>
        <span style={{ color: '#9CA3AF', fontSize: 11 }}>AI Code Assistants · Enterprise Adoption 2025</span>
      </div>

      {/* Headline */}
      <div style={{ padding: '28px 56px 0' }}>
        <h1 style={{
          margin: 0, color: NAVY,
          fontSize: 44, fontWeight: 900, lineHeight: 1.1, letterSpacing: -1.5,
        }}>
          Cursor just <span style={{ color: ELECTRIC }}>overtook</span> Copilot<br />
          in enterprise adoption
        </h1>
        <p style={{
          margin: '12px 0 0', color: '#6B7280', fontSize: 16, lineHeight: 1.5, maxWidth: 600,
        }}>
          43% of engineering orgs now use Cursor vs 37% for GitHub Copilot.
          First time a challenger has led since the AI coding boom started.
        </p>
      </div>

      {/* THE CHART — horizontal bar chart */}
      <div style={{
        flex: 1, margin: '28px 40px 0',
        background: '#fff', borderRadius: 16,
        border: '1px solid #E8E8E8',
        padding: '32px 40px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div style={{ fontSize: 11, color: '#9CA3AF', fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 }}>
          ORGANIZATIONAL ADOPTION RATE
        </div>
        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={adoptionData} layout="vertical" margin={{ top: 0, right: 60, left: 0, bottom: 0 }} barSize={56}>
              <XAxis type="number" domain={[0, 50]} hide />
              <YAxis
                type="category" dataKey="name" width={100}
                tick={{ fontSize: 18, fill: NAVY, fontWeight: 700 }}
                tickLine={false} axisLine={false}
              />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {adoptionData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={(v) => `${v}%`}
                  style={{ fontSize: 22, fontWeight: 800, fill: NAVY }}
                />
              </Bar>
            </BarChart>
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
          { label: 'Copilot subscribers', val: '4.7M', sub: 'paid users', color: NAVY },
          { label: 'Cursor revenue', val: '$100M', sub: 'ARR (2024)', color: ELECTRIC },
          { label: 'Copilot share', val: '42%', sub: 'paid tools mkt', color: CORAL },
          { label: 'Cursor share', val: '18%', sub: 'paid tools mkt', color: TEAL },
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
        <span style={{ color: '#D1D5DB', fontSize: 10 }}>Sources: GitHub, industry surveys, Anysphere financials</span>
        <span style={{ color: '#D1D5DB', fontSize: 10 }}>kaelresearch.com</span>
      </div>
    </div>
  );
}
