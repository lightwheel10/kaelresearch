const fs = require('fs');

// Fix sample page CTA buttons
let sample = fs.readFileSync('src/app/sample/page.tsx', 'utf8');
sample = sample.replaceAll('rounded-md text-base transition-all hover:opacity-90', 'rounded-full text-base transition-all hover:opacity-90');
sample = sample.replaceAll('rounded-md text-base border-2 transition-all hover:opacity-80', 'rounded-full text-base border-2 transition-all hover:opacity-80');
fs.writeFileSync('src/app/sample/page.tsx', sample);

// Fix brief page - remove BriefHeader/BriefFooter, add shared components
let brief = fs.readFileSync('src/app/brief/ai-code-assistants/page.tsx', 'utf8');
brief = brief.replace("import { useRouter } from 'next/navigation';\n", '');
// Add imports after first import line
brief = brief.replace(
  "import React, { useState, useEffect, FormEvent, FC } from 'react';",
  "import React, { useState, useEffect, FormEvent, FC } from 'react';\nimport Header from '@/components/Header';\nimport Footer from '@/components/Footer';"
);
// Remove BriefHeader component
const bh1 = brief.indexOf('const BriefHeader: FC');
const bh2 = brief.indexOf('\nconst ChartWrapper: FC');
if (bh1 > -1 && bh2 > -1) brief = brief.slice(0, bh1) + brief.slice(bh2 + 1);
// Remove BriefFooter - it's between BriefHeader and ChartWrapper but we already removed BriefHeader
// Actually BriefFooter is part of the block we removed. Let's check.
if (brief.includes('const BriefFooter')) {
  const bf1 = brief.indexOf('const BriefFooter: FC');
  const bf2 = brief.indexOf('\nconst ChartWrapper: FC');
  if (bf1 > -1 && bf2 > -1) brief = brief.slice(0, bf1) + brief.slice(bf2 + 1);
}
// Replace usages
brief = brief.replace('<BriefHeader />', '<Header />');
brief = brief.replace('<BriefFooter />', '<Footer />');
// Fix CTA buttons
brief = brief.replaceAll('rounded-md text-base transition-all hover:opacity-90', 'rounded-full text-base transition-all hover:opacity-90');
brief = brief.replaceAll('rounded-md text-base border-2 transition-all hover:opacity-80', 'rounded-full text-base border-2 transition-all hover:opacity-80');
fs.writeFileSync('src/app/brief/ai-code-assistants/page.tsx', brief);

// Fix briefs listing page
let briefs = fs.readFileSync('src/app/briefs/page.tsx', 'utf8');
// Add imports
briefs = briefs.replace(
  'import type { Metadata } from "next";',
  'import type { Metadata } from "next";\nimport Header from "@/components/Header";\nimport Footer from "@/components/Footer";'
);
// Replace nav with Header
const navStart = briefs.indexOf('      {/* Header */}');
const navEnd = briefs.indexOf('      <div className="max-w-4xl');
if (navStart > -1 && navEnd > -1) {
  briefs = briefs.slice(0, navStart) + '      <Header />\n\n' + briefs.slice(navEnd);
}
// Replace footer with Footer
const footStart = briefs.indexOf('      {/* Footer */}');
if (footStart === -1) {
  // Try finding the footer tag
  const fStart = briefs.indexOf('      <footer className="py-10"');
  const fEnd = briefs.indexOf('</footer>') + '</footer>'.length;
  if (fStart > -1 && fEnd > -1) {
    briefs = briefs.slice(0, fStart) + '      <Footer />' + briefs.slice(fEnd);
  }
}
// Change max-w-4xl to max-w-5xl in content area
briefs = briefs.replace('<div className="max-w-4xl mx-auto px-6 pt-28 pb-20">', '<div className="max-w-5xl mx-auto px-6 pt-28 pb-20">');
// Change bg-white to bg-[#FAFAFA]
briefs = briefs.replace('className="min-h-screen bg-white text-[#333]', 'className="min-h-screen bg-[#FAFAFA] text-[#333]');
fs.writeFileSync('src/app/briefs/page.tsx', briefs);

console.log('All fixes applied');
