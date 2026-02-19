'use client';

import { useState } from 'react';

export interface TOCItem {
  id: string;
  text: string;
}

export function MobileTOC({ items }: { items: TOCItem[] }) {
  const [open, setOpen] = useState(false);
  if (items.length === 0) return null;

  return (
    <div className="md:hidden mb-8 border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-[#1B2A4A] bg-[#FAFAFA] cursor-pointer"
      >
        On this page
        <span className="text-gray-400">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <ul className="px-5 py-3 space-y-2 text-sm border-t border-gray-200">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-gray-500 hover:text-[#C9A84C] transition-colors">
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
  if (items.length === 0) return null;

  return (
    <nav className="hidden md:block sticky top-[100px] self-start w-56 shrink-0 ml-8">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#1B2A4A] mb-3">On this page</p>
      <ul className="space-y-2 text-sm border-l-2 border-gray-200 pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-gray-400 hover:text-[#C9A84C] transition-colors">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
