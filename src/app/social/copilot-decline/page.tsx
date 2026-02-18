'use client';

import React from 'react';

export default function CopilotDecline() {
  return (
    <div style={{
      width: 1080,
      height: 1080,
      background: '#1B2A4A',
      fontFamily: "'Inter', -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 72px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative giant number in background */}
      <div style={{
        position: 'absolute',
        right: -40,
        top: -60,
        fontSize: 480,
        fontWeight: 900,
        color: 'rgba(255,255,255,0.03)',
        lineHeight: 1,
        letterSpacing: -20,
        userSelect: 'none',
      }}>
        13
      </div>

      {/* Top */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 48 }}>
          <span style={{ color: '#C9A84C', fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>KAEL RESEARCH</span>
        </div>
        
        <div style={{
          color: '#F43F5E',
          fontSize: 120,
          fontWeight: 900,
          lineHeight: 0.9,
          letterSpacing: -6,
        }}>
          −13
        </div>
        <div style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 32,
          fontWeight: 400,
          marginTop: 8,
          letterSpacing: -0.5,
        }}>
          percentage points
        </div>
      </div>

      {/* Middle — the story */}
      <div>
        <div style={{
          color: '#FFFFFF',
          fontSize: 44,
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: -1,
          maxWidth: 750,
        }}>
          GitHub Copilot&apos;s enterprise market share dropped from 55% to 42% in twelve months.
        </div>
        <div style={{
          color: 'rgba(255,255,255,0.35)',
          fontSize: 20,
          fontWeight: 400,
          marginTop: 20,
          lineHeight: 1.5,
          maxWidth: 600,
        }}>
          Cursor, Windsurf, and Augment are eating the gap. The AI code assistant market is no longer a one-player game.
        </div>
      </div>

      {/* Bottom */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', gap: 32 }}>
          {[
            { name: 'Cursor', val: '21%' },
            { name: 'Windsurf', val: '12%' },
            { name: 'Augment', val: '8%' },
          ].map(c => (
            <div key={c.name}>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>{c.name}</div>
              <div style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 800, lineHeight: 1.1 }}>{c.val}</div>
            </div>
          ))}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.15)', fontSize: 12 }}>
          kaelresearch.com
        </div>
      </div>
    </div>
  );
}
