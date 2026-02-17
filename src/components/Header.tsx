'use client';

import React, { useState } from 'react';

const NAVY = '#1B2A4A';
const GOLD = '#C9A84C';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span style={{ color: NAVY }}>KAEL</span>
          <span style={{ color: GOLD }}>RESEARCH</span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="/briefs" className="hover:text-[#1B2A4A] transition-colors">Research</a>
          <a href="/#pricing" className="hover:text-[#1B2A4A] transition-colors">Pricing</a>
          <a
            href="/sample"
            className="text-white px-5 py-2.5 rounded-full transition-colors"
            style={{ backgroundColor: GOLD }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8953f')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = GOLD)}
          >
            Get a Free Sample
          </a>
        </div>

        <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 p-6 flex flex-col gap-4">
          <a href="/briefs" className="text-left text-gray-600 hover:text-[#1B2A4A]">Research</a>
          <a href="/#pricing" className="text-left text-gray-600 hover:text-[#1B2A4A]">Pricing</a>
          <a href="/sample" className="text-white px-5 py-2.5 rounded-full w-full text-center" style={{ backgroundColor: GOLD }}>Get a Free Sample</a>
        </div>
      )}
    </nav>
  );
}
