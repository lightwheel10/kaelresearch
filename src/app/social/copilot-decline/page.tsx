'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts';

const NAVY = '#1B2A4A';
const SLATE = '#4A6FA5';
const SAGE = '#7C9885';
const GOLD = '#C9A84C';
const RED = '#E85D5D';
const WHITE = '#FFFFFF';

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
      background: `linear-gradient(160deg, #0F1A2E 0%, ${NAVY} 40%, #162240 100%)`,
      fontFamily: "'Inter', 'Segoe UI', -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Subtle dot grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
      }} />

      {/* Top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '28px 44px 0',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 3, height: 18, background: GOLD, borderRadius: 2 }} />
          <span style={{ color: GOLD, fontSize: 12, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase' }}>
            Kael Research
          </span>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 500, letterSpacing: 0.5 }}>
          AI Code Assistants · Market Brief · Q2 2025
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, padding: '20px 44px 0', gap: 48, position: 'relative', zIndex: 1 }}>
        
        {/* Left panel */}
        <div style={{ width: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: 20 }}>
          <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 500, letterSpacing: 0.3, marginBottom: 6 }}>
            GitHub Copilot · Enterprise Share
          </div>
          
          {/* Big number */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ color: WHITE, fontSize: 68, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
              42
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 32, fontWeight: 300 }}>%</span>
          </div>
          
          {/* Change indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <div style={{
              background: 'rgba(232,93,93,0.15)', borderRadius: 4,
              padding: '3px 8px', display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <span style={{ color: RED, fontSize: 10 }}>▼</span>
              <span style={{ color: RED, fontSize: 12, fontWeight: 600 }}>13pp</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>from 55% · 12 months</span>
          </div>

          {/* Divider */}
          <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />

          {/* Competitor gains */}
          <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>
            Gaining Share
          </div>
          {[
            { name: 'Cursor', from: 8, to: 21, color: SLATE },
            { name: 'Windsurf', from: 5, to: 12, color: SAGE },
            { name: 'Augment', from: 3, to: 8, color: GOLD },
          ].map(c => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, width: 70, fontWeight: 500 }}>{c.name}</span>
              <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden', marginRight: 12 }}>
                <div style={{ width: `${c.to * 3}%`, height: '100%', background: `linear-gradient(90deg, ${c.color}88, ${c.color})`, borderRadius: 2 }} />
              </div>
              <span style={{ color: c.color, fontSize: 12, fontWeight: 700, width: 32, textAlign: 'right' }}>{c.to}%</span>
            </div>
          ))}
        </div>

        {/* Right: Chart */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, marginTop: 8 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketShareData} margin={{ top: 8, right: 16, left: -8, bottom: 4 }}>
                <defs>
                  <linearGradient id="copilotGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={WHITE} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={WHITE} stopOpacity={0.01} />
                  </linearGradient>
                  <linearGradient id="cursorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SLATE} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={SLATE} stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="quarter"
                  stroke="transparent"
                  tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.35)', fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                  dy={8}
                />
                <YAxis
                  stroke="transparent"
                  tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.25)' }}
                  tickLine={false}
                  axisLine={false}
                  unit="%"
                  domain={[0, 60]}
                  ticks={[0, 15, 30, 45, 60]}
                />
                <Area
                  type="monotone" dataKey="copilot" name="Copilot"
                  stroke={WHITE} fill="url(#copilotGrad)" strokeWidth={2.5}
                  dot={{ r: 4, fill: NAVY, stroke: WHITE, strokeWidth: 2 }}
                  activeDot={{ r: 5, fill: WHITE }}
                />
                <Area
                  type="monotone" dataKey="cursor" name="Cursor"
                  stroke={SLATE} fill="url(#cursorGrad)" strokeWidth={2}
                  dot={{ r: 3, fill: NAVY, stroke: SLATE, strokeWidth: 2 }}
                />
                <Area
                  type="monotone" dataKey="windsurf" name="Windsurf"
                  stroke={SAGE} fill="transparent" strokeWidth={1.5}
                  strokeDasharray="4 3"
                  dot={{ r: 3, fill: NAVY, stroke: SAGE, strokeWidth: 1.5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '0 44px 22px',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {[
            { label: 'Copilot', color: WHITE },
            { label: 'Cursor', color: SLATE },
            { label: 'Windsurf', color: SAGE },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 2, background: item.color, borderRadius: 1 }} />
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.15)', fontSize: 10, fontWeight: 500, letterSpacing: 0.5 }}>
          kaelresearch.com
        </div>
      </div>
    </div>
  );
}
