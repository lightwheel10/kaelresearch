'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from 'recharts';

const NAVY = '#1B2A4A';
const SLATE = '#4A6FA5';
const SAGE = '#7C9885';
const GOLD = '#C9A84C';
const RED = '#DC3545';
const BG = '#F8F9FA';
const CARD_BG = '#FFFFFF';
const TEXT_PRIMARY = '#1A1A2E';
const TEXT_SECONDARY = '#6B7280';
const TEXT_MUTED = '#9CA3AF';
const BORDER = '#E5E7EB';

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
      background: BG,
      fontFamily: "'Inter', 'Segoe UI', -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Top accent line */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${NAVY}, ${SLATE}, ${GOLD})` }} />

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 44px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: NAVY, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: GOLD, fontSize: 13, fontWeight: 800 }}>K</span>
          </div>
          <span style={{ color: NAVY, fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Kael Research
          </span>
        </div>
        <div style={{
          background: `${NAVY}08`, border: `1px solid ${NAVY}15`, borderRadius: 20,
          padding: '5px 14px',
        }}>
          <span style={{ color: TEXT_SECONDARY, fontSize: 11, fontWeight: 500 }}>
            AI Code Assistants · Q2 2025
          </span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, padding: '0 44px', gap: 36 }}>
        
        {/* Left panel */}
        <div style={{ width: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ color: TEXT_SECONDARY, fontSize: 12, fontWeight: 500, marginBottom: 4 }}>
            GitHub Copilot · Enterprise Share
          </div>
          
          {/* Big number */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
            <span style={{ color: TEXT_PRIMARY, fontSize: 64, fontWeight: 800, lineHeight: 1, letterSpacing: -2 }}>
              42
            </span>
            <span style={{ color: TEXT_MUTED, fontSize: 28, fontWeight: 400 }}>%</span>
          </div>
          
          {/* Change badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
            <div style={{
              background: '#FEE2E2', borderRadius: 6,
              padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <span style={{ color: RED, fontSize: 9 }}>▼</span>
              <span style={{ color: RED, fontSize: 12, fontWeight: 700 }}>−13pp</span>
            </div>
            <span style={{ color: TEXT_MUTED, fontSize: 12 }}>from 55% in 12 months</span>
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: 1, background: BORDER, margin: '24px 0 20px' }} />

          {/* Competitor gains */}
          <div style={{ color: TEXT_MUTED, fontSize: 10, fontWeight: 600, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>
            Who{"'"}s taking share
          </div>
          {[
            { name: 'Cursor', to: 21, change: '+13pp', color: SLATE },
            { name: 'Windsurf', to: 12, change: '+7pp', color: SAGE },
            { name: 'Augment', to: 8, change: '+5pp', color: GOLD },
          ].map(c => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: c.color, marginRight: 10, flexShrink: 0 }} />
              <span style={{ color: TEXT_PRIMARY, fontSize: 13, fontWeight: 600, width: 70 }}>{c.name}</span>
              <div style={{ flex: 1, height: 6, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden', marginRight: 12 }}>
                <div style={{
                  width: `${c.to * 3.5}%`, height: '100%',
                  background: `linear-gradient(90deg, ${c.color}90, ${c.color})`,
                  borderRadius: 3,
                }} />
              </div>
              <span style={{ color: TEXT_PRIMARY, fontSize: 13, fontWeight: 700, width: 36, textAlign: 'right' }}>{c.to}%</span>
              <span style={{ color: '#16A34A', fontSize: 11, fontWeight: 600, width: 42, textAlign: 'right' }}>{c.change}</span>
            </div>
          ))}
        </div>

        {/* Right: Chart card */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          background: CARD_BG, borderRadius: 12, border: `1px solid ${BORDER}`,
          padding: '20px 20px 12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ color: TEXT_PRIMARY, fontSize: 13, fontWeight: 600 }}>Market Share Trend</span>
            <div style={{ display: 'flex', gap: 16 }}>
              {[
                { label: 'Copilot', color: NAVY },
                { label: 'Cursor', color: SLATE },
                { label: 'Windsurf', color: SAGE },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 12, height: 2.5, background: item.color, borderRadius: 1 }} />
                  <span style={{ color: TEXT_MUTED, fontSize: 10, fontWeight: 500 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketShareData} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
                <defs>
                  <linearGradient id="copilotGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={NAVY} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={NAVY} stopOpacity={0.01} />
                  </linearGradient>
                  <linearGradient id="cursorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SLATE} stopOpacity={0.1} />
                    <stop offset="100%" stopColor={SLATE} stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis
                  dataKey="quarter" stroke="transparent"
                  tick={{ fontSize: 11, fill: TEXT_MUTED, fontWeight: 500 }}
                  tickLine={false} axisLine={false} dy={8}
                />
                <YAxis
                  stroke="transparent"
                  tick={{ fontSize: 11, fill: TEXT_MUTED }}
                  tickLine={false} axisLine={false}
                  unit="%" domain={[0, 60]} ticks={[0, 15, 30, 45, 60]}
                />
                <Area
                  type="monotone" dataKey="copilot" name="Copilot"
                  stroke={NAVY} fill="url(#copilotGrad)" strokeWidth={2.5}
                  dot={{ r: 4, fill: '#fff', stroke: NAVY, strokeWidth: 2 }}
                />
                <Area
                  type="monotone" dataKey="cursor" name="Cursor"
                  stroke={SLATE} fill="url(#cursorGrad)" strokeWidth={2}
                  dot={{ r: 3, fill: '#fff', stroke: SLATE, strokeWidth: 2 }}
                />
                <Area
                  type="monotone" dataKey="windsurf" name="Windsurf"
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
        display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
        padding: '14px 44px 18px',
      }}>
        <span style={{ color: TEXT_MUTED, fontSize: 10, fontWeight: 500 }}>
          kaelresearch.com
        </span>
      </div>
    </div>
  );
}
