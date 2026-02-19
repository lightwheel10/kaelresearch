'use client';

import { useState, useEffect } from 'react';

export interface TOCItem {
  id: string;
  text: string;
}

export function MobileTOC({ items }: { items: TOCItem[] }) {
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;

  return (
    <div className="lg:hidden mb-10 rounded-lg border border-gray-200 bg-[#FAFAFA]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#1B2A4A] cursor-pointer"
      >
        Contents
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul className="px-4 pb-3 space-y-1.5 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="block py-0.5 text-gray-500 hover:text-[#C9A84C] transition-colors"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function DesktopTOC({ items }: { items: TOCItem[] }) {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="hidden lg:block w-48 shrink-0 ml-12">
      <div className="sticky top-28">
        <p className="text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-4">Contents</p>
        <ul className="space-y-2.5 text-[13px] leading-snug">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block transition-colors ${
                  active === item.id
                    ? 'text-[#C9A84C] font-medium'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
