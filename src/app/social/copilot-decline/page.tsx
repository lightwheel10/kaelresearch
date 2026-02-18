'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, Tooltip, Legend, Cell
} from 'recharts';

const NAVY = '#1B2A4A';
const SLATE = '#4A6FA5';
const SAGE = '#7C9885';
const GOLD = '#C9A84C';
const LIGHT_NAVY = '#2A3F6A';

const marketShareData = [
  { quarter: 'Q1 2024', copilot: 55, cursor: 8, windsurf: 5, others: 32 },
  { quarter: 'Q2 2024', copilot: 52, cursor: 11, windsurf: 7, others: 30 },
  { quarter: 'Q3 2024', copilot: 49, cursor: 14, windsurf: 9, others: 28 },
  { quarter: 'Q4 2024', copilot: 46, cursor: 17, windsurf: 10, others: 27 },
  { quarter: 'Q1 2025', copilot: 44, cursor: 19, windsurf: 11, others: 26 },
  { quarter: 'Q2 2025', copilot: 42, cursor: 21, windsurf: 12, others: 25 },
];

export default function CopilotDecline() {
  return (
    <div style={{
      width: 1200,
      height: 627,
      background: `linear-gradient(135deg, ${NAVY} 0%, #0F1A2E 100%)`,
      fontFamily: "'Inter', -apple-system, sans-serif",
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Subtle grid pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        pointerEvents: 'none',
      }} />

      {/* Top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 40px 0',
        position: 'relative', zIndex: 1,
      }}>
        <div>
          <div style={{ color: GOLD, fontSize: 11, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase' }}>
            Kael Research
          </div>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: 1 }}>
          AI Code Assistants · Q2 2025
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, padding: '16px 40px 0', gap: 40, position: 'relative', zIndex: 1 }}>
        
        {/* Left: Big stat + context */}
        <div style={{ width: 340, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, marginBottom: 8, letterSpacing: 0.5 }}>
            Enterprise Market Share
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
            <span style={{ color: '#EF4444', fontSize: 72, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
              42%
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3L14 11H2L8 3Z" fill="#EF4444" transform="rotate(180 8 8)" />
            </svg>
            <span style={{ color: '#EF4444', fontSize: 15, fontWeight: 600 }}>
              −13pp from 55%
            </span>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>
              in 12 months
            </span>
          </div>

          {/* Mini competitor bars */}
          <div style={{ marginTop: 32 }}>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
              Who's gaining
            </div>
            {[
              { name: 'Cursor', share: 21, change: '+13pp', color: SLATE },
              { name: 'Windsurf', share: 12, change: '+7pp', color: SAGE },
              { name: 'Augment', share: 8, change: '+5pp', color: GOLD },
            ].map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, width: 60 }}>{c.name}</span>
                <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${c.share * 2.5}%`, height: '100%', background: c.color, borderRadius: 3 }} />
                </div>
                <span style={{ color: '#4ADE80', fontSize: 11, fontWeight: 600, width: 40, textAlign: 'right' }}>{c.change}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Chart */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
            GitHub Copilot Market Share Trend
          </div>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketShareData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="copilotGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="cursorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SLATE} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={SLATE} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="quarter" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} unit="%" domain={[0, 60]} />
                <Area type="monotone" dataKey="copilot" name="Copilot" stroke="#EF4444" fill="url(#copilotGrad)" strokeWidth={2.5} dot={{ r: 3, fill: '#EF4444', strokeWidth: 0 }} />
                <Area type="monotone" dataKey="cursor" name="Cursor" stroke={SLATE} fill="url(#cursorGrad)" strokeWidth={2} dot={{ r: 3, fill: SLATE, strokeWidth: 0 }} />
                <Area type="monotone" dataKey="windsurf" name="Windsurf" stroke={SAGE} fill="transparent" strokeWidth={2} dot={{ r: 3, fill: SAGE, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 40px 20px',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            { label: 'Copilot', color: '#EF4444' },
            { label: 'Cursor', color: SLATE },
            { label: 'Windsurf', color: SAGE },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color }} />
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: 10 }}>
          kaelresearch.com
        </div>
      </div>
    </div>
  );
}
