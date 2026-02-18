'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';

const ELECTRIC = '#4F46E5';
const CORAL = '#F43F5E';
const TEAL = '#0D9488';
const AMBER = '#F59E0B';
const DARK = '#0F172A';

const marketShareData = [
  { quarter: 'Q1 \'24', copilot: 55, cursor: 8, windsurf: 5 },
  { quarter: 'Q2 \'24', copilot: 52, cursor: 11, windsurf: 7 },
  { quarter: 'Q3 \'24', copilot: 49, cursor: 14, windsurf: 9 },
  { quarter: 'Q4 \'24', copilot: 46, cursor: 17, windsurf: 10 },
  { quarter: 'Q1 \'25', copilot: 44, cursor: 19, windsurf: 11 },
  { quarter: 'Q2 \'25', copilot: 42, cursor: 21, windsurf: 12 },
];

export default function CopilotDecline() {
  return (
    <div style={{
      width: 1200,
      height: 627,
      background: '#FFFBF5',
      fontFamily: "'Inter', -apple-system, sans-serif",
      display: 'flex',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Bold left accent strip */}
      <div style={{
        width: 8, background: `linear-gradient(180deg, ${CORAL}, ${ELECTRIC}, ${TEAL})`,
        flexShrink: 0,
      }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '22px 40px 18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: DARK, fontSize: 15, fontWeight: 800, letterSpacing: 0.5 }}>KAEL</span>
            <span style={{ color: CORAL, fontSize: 15, fontWeight: 800, letterSpacing: 0.5 }}>RESEARCH</span>
          </div>
          <div style={{
            background: `${ELECTRIC}0D`, borderRadius: 6, padding: '4px 12px',
            border: `1px solid ${ELECTRIC}20`,
          }}>
            <span style={{ color: ELECTRIC, fontSize: 11, fontWeight: 600 }}>AI Code Assistants · 2025</span>
          </div>
        </div>

        {/* Main */}
        <div style={{ display: 'flex', flex: 1, padding: '0 40px', gap: 40 }}>
          
          {/* Left */}
          <div style={{ width: 360, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Overline */}
            <div style={{
              color: CORAL, fontSize: 11, fontWeight: 700, letterSpacing: 2,
              textTransform: 'uppercase', marginBottom: 10,
            }}>
              ● Market shift
            </div>

            <h1 style={{
              color: DARK, fontSize: 30, fontWeight: 800, lineHeight: 1.15, margin: 0,
              letterSpacing: -0.5,
            }}>
              Copilot lost <span style={{ color: CORAL }}>13 points</span> of enterprise share in one year
            </h1>

            {/* Big numbers row */}
            <div style={{
              display: 'flex', gap: 0, marginTop: 24,
              background: DARK, borderRadius: 12, overflow: 'hidden',
            }}>
              <div style={{ flex: 1, padding: '18px 24px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
                  Then
                </div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 38, fontWeight: 800, lineHeight: 1, letterSpacing: -1 }}>
                  55<span style={{ fontSize: 20, fontWeight: 400 }}>%</span>
                </div>
              </div>
              <div style={{ flex: 1, padding: '18px 24px' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
                  Now
                </div>
                <div style={{ color: CORAL, fontSize: 38, fontWeight: 800, lineHeight: 1, letterSpacing: -1 }}>
                  42<span style={{ fontSize: 20, fontWeight: 400, color: 'rgba(244,63,94,0.6)' }}>%</span>
                </div>
              </div>
            </div>

            {/* Winners */}
            <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
              {[
                { name: 'Cursor', val: '21%', color: ELECTRIC },
                { name: 'Windsurf', val: '12%', color: TEAL },
                { name: 'Augment', val: '8%', color: AMBER },
              ].map(c => (
                <div key={c.name} style={{
                  flex: 1, padding: '10px 12px', borderRadius: 8,
                  border: `1.5px solid ${c.color}30`, background: `${c.color}08`,
                }}>
                  <div style={{ color: '#6B7280', fontSize: 10, fontWeight: 600, marginBottom: 3 }}>{c.name}</div>
                  <div style={{ color: c.color, fontSize: 20, fontWeight: 800, lineHeight: 1 }}>{c.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chart */}
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            background: '#fff', borderRadius: 14,
            border: '1px solid #E5E7EB',
            padding: '16px 16px 8px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ color: DARK, fontSize: 13, fontWeight: 700 }}>Enterprise Market Share</span>
              <div style={{ display: 'flex', gap: 14 }}>
                {[
                  { label: 'Copilot', color: DARK },
                  { label: 'Cursor', color: ELECTRIC },
                  { label: 'Windsurf', color: TEAL },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 10, height: 3, borderRadius: 2, background: item.color }} />
                    <span style={{ color: '#9CA3AF', fontSize: 10, fontWeight: 500 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketShareData} margin={{ top: 10, right: 12, left: -8, bottom: 4 }}>
                  <defs>
                    <linearGradient id="copilotG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={DARK} stopOpacity={0.06} />
                      <stop offset="100%" stopColor={DARK} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cursorG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={ELECTRIC} stopOpacity={0.1} />
                      <stop offset="100%" stopColor={ELECTRIC} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="windG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={TEAL} stopOpacity={0.08} />
                      <stop offset="100%" stopColor={TEAL} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="quarter" stroke="transparent"
                    tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: 500 }}
                    tickLine={false} axisLine={false} dy={6}
                  />
                  <YAxis
                    stroke="transparent"
                    tick={{ fontSize: 11, fill: '#D1D5DB' }}
                    tickLine={false} axisLine={false}
                    unit="%" domain={[0, 60]} ticks={[0, 15, 30, 45, 60]}
                  />
                  <Area
                    type="monotone" dataKey="copilot"
                    stroke={DARK} fill="url(#copilotG)" strokeWidth={2.5}
                    dot={{ r: 4, fill: '#FFFBF5', stroke: DARK, strokeWidth: 2.5 }}
                  />
                  <Area
                    type="monotone" dataKey="cursor"
                    stroke={ELECTRIC} fill="url(#cursorG)" strokeWidth={2}
                    dot={{ r: 3.5, fill: '#FFFBF5', stroke: ELECTRIC, strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone" dataKey="windsurf"
                    stroke={TEAL} fill="url(#windG)" strokeWidth={1.5}
                    dot={{ r: 3, fill: '#FFFBF5', stroke: TEAL, strokeWidth: 1.5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '14px 40px', display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ color: '#D1D5DB', fontSize: 10 }}>kaelresearch.com</span>
        </div>
      </div>
    </div>
  );
}
