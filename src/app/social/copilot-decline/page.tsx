'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts';

const NAVY = '#1B2A4A';
const SLATE = '#4A6FA5';
const SAGE = '#7C9885';
const GOLD = '#C9A84C';

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
      background: '#FFFFFF',
      fontFamily: "'Inter', -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header — matches website nav exactly */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 44px',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: NAVY, fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>KAEL</span>
          <span style={{ color: GOLD, fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>RESEARCH</span>
        </div>
        <span style={{ color: '#9CA3AF', fontSize: 12, fontWeight: 500 }}>
          AI Code Assistants · Q2 2025
        </span>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, padding: '28px 44px 0', gap: 44 }}>
        
        {/* Left: Stats */}
        <div style={{ width: 310, display: 'flex', flexDirection: 'column' }}>
          <h2 style={{
            color: NAVY, fontSize: 22, fontWeight: 700, lineHeight: 1.3, margin: 0,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}>
            GitHub Copilot Is Losing<br />Enterprise Market Share
          </h2>
          
          {/* Big number */}
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <span style={{ color: NAVY, fontSize: 72, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>42</span>
            <span style={{ color: '#9CA3AF', fontSize: 32, fontWeight: 300 }}>%</span>
          </div>
          <div style={{ color: '#6B7280', fontSize: 13, marginTop: 4 }}>
            down from <span style={{ color: NAVY, fontWeight: 600 }}>55%</span> twelve months ago
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: 1, background: '#E5E7EB', margin: '24px 0 18px' }} />

          {/* Competitor gains */}
          <div style={{ color: '#9CA3AF', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>
            Gaining Ground
          </div>
          {[
            { name: 'Cursor', to: 21, from: 8, color: SLATE },
            { name: 'Windsurf', to: 12, from: 5, color: SAGE },
            { name: 'Augment', to: 8, from: 3, color: GOLD },
          ].map(c => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 11 }}>
              <div style={{ width: 3, height: 16, borderRadius: 2, background: c.color, marginRight: 10 }} />
              <span style={{ color: NAVY, fontSize: 13, fontWeight: 600, width: 72 }}>{c.name}</span>
              <div style={{ flex: 1, height: 5, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginRight: 14 }}>
                <div style={{
                  width: `${c.to * 4}%`, height: '100%',
                  background: c.color, borderRadius: 3,
                }} />
              </div>
              <span style={{ color: NAVY, fontSize: 14, fontWeight: 700, width: 34, textAlign: 'right' }}>{c.to}%</span>
            </div>
          ))}
        </div>

        {/* Right: Chart */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          background: '#FAFAFA', borderRadius: 10,
          border: '1px solid #E5E7EB',
          padding: '18px 18px 10px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ color: NAVY, fontSize: 14, fontWeight: 600, fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Market Share Trend
            </span>
            <div style={{ display: 'flex', gap: 18 }}>
              {[
                { label: 'Copilot', color: NAVY },
                { label: 'Cursor', color: SLATE },
                { label: 'Windsurf', color: SAGE },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 14, height: 3, background: item.color, borderRadius: 2 }} />
                  <span style={{ color: '#6B7280', fontSize: 10, fontWeight: 500 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketShareData} margin={{ top: 10, right: 14, left: -6, bottom: 4 }}>
                <defs>
                  <linearGradient id="copilotFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={NAVY} stopOpacity={0.08} />
                    <stop offset="100%" stopColor={NAVY} stopOpacity={0.01} />
                  </linearGradient>
                  <linearGradient id="cursorFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SLATE} stopOpacity={0.06} />
                    <stop offset="100%" stopColor={SLATE} stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="quarter" stroke="transparent"
                  tick={{ fontSize: 11, fill: '#9CA3AF', fontWeight: 500 }}
                  tickLine={false} axisLine={false} dy={6}
                />
                <YAxis
                  stroke="transparent"
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  tickLine={false} axisLine={false}
                  unit="%" domain={[0, 60]} ticks={[0, 15, 30, 45, 60]}
                />
                <Area
                  type="monotone" dataKey="copilot"
                  stroke={NAVY} fill="url(#copilotFill)" strokeWidth={2.5}
                  dot={{ r: 4, fill: '#fff', stroke: NAVY, strokeWidth: 2 }}
                />
                <Area
                  type="monotone" dataKey="cursor"
                  stroke={SLATE} fill="url(#cursorFill)" strokeWidth={2}
                  dot={{ r: 3, fill: '#fff', stroke: SLATE, strokeWidth: 2 }}
                />
                <Area
                  type="monotone" dataKey="windsurf"
                  stroke={SAGE} fill="transparent" strokeWidth={1.5}
                  strokeDasharray="4 3"
                  dot={{ r: 3, fill: '#fff', stroke: SAGE, strokeWidth: 1.5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '16px 44px',
        display: 'flex', justifyContent: 'flex-end',
      }}>
        <span style={{ color: '#D1D5DB', fontSize: 10 }}>kaelresearch.com</span>
      </div>
    </div>
  );
}
