'use client';

import { useState } from 'react';

export default function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://kaelresearch.com/blog/${slug}`;

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <span className="text-xs uppercase tracking-wider font-medium">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[#1B2A4A] transition-colors"
      >
        𝕏 Post
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[#1B2A4A] transition-colors"
      >
        LinkedIn
      </a>
      <button onClick={copy} className="hover:text-[#1B2A4A] transition-colors cursor-pointer">
        {copied ? '✓ Copied!' : 'Copy link'}
      </button>
    </div>
  );
}
