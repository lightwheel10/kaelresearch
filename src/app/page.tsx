'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function CheckIcon({ color = "text-slate-500" }: { color?: string }) {
  return (
    <svg className={`w-4 h-4 ${color} flex-shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <main className={`min-h-screen bg-slate-950 text-slate-50 ${inter.className} selection:bg-amber-500/30 selection:text-emerald-200 overflow-x-hidden`}>
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/5 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-slate-800/20 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="text-white">KAEL</span>
            <span className="text-amber-400">RESEARCH</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-white transition-colors">How It Works</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition-colors">Pricing</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-white transition-colors">FAQ</button>
            <button className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-full transition-all  hover:">
              Get a Free Sample
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 p-6 flex flex-col gap-4">
            <button onClick={() => scrollToSection('how-it-works')} className="text-left text-slate-300 hover:text-white">How It Works</button>
            <button onClick={() => scrollToSection('pricing')} className="text-left text-slate-300 hover:text-white">Pricing</button>
            <button onClick={() => scrollToSection('faq')} className="text-left text-slate-300 hover:text-white">FAQ</button>
            <button className="bg-amber-600 text-white px-5 py-2.5 rounded-full w-full">Get a Free Sample</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-xs font-medium text-amber-400 mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Now accepting Q2 2026 clients
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            You Could Google It.<br />
            <span className="text-white">Or You Could Know It.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Your competitors are making decisions with gut feelings and ChatGPT hallucinations. 
            Get research that's sourced, verified, and ready for your board meeting ΓÇö in 3 days.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-amber-600 hover:bg-amber-500 text-white text-lg font-medium px-8 py-4 rounded-full transition-all  hover:">
              Get a Free Sample Report
            </button>
            <button 
              onClick={() => scrollToSection('comparison')}
              className="w-full sm:w-auto bg-transparent hover:bg-slate-900 text-slate-300 hover:text-white text-lg font-medium px-8 py-4 rounded-full border border-slate-800 hover:border-slate-700 transition-all"
            >
              See Example Output
            </button>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-6 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Sound Familiar?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Investor meeting in 5 days",
                desc: "You need TAM numbers, competitor analysis, and a market map. You've been Googling for 3 hours and have 47 tabs open.",
                icon: (
                  <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Competitor just raised $20M",
                desc: "What are they building? Who are they hiring? Where are they expanding? Your team is guessing.",
                icon: (
                  <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              },
              {
                title: "Board wants a GTM strategy",
                desc: "For a new market you've never operated in. Due Thursday. You're one person.",
                icon: (
                  <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              }
            ].map((card, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 transition-all hover:bg-slate-900/80 group">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-900/20 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-100">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-lg">
            You could spend 20 hours stitching together half-sourced data. 
            <span className="block sm:inline text-white font-medium mt-2 sm:mt-0 sm:ml-2">Or you could spend $149 and have it Tuesday.</span>
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20 skew-y-3 transform origin-top-left scale-110 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">ChatGPT vs. Kael Research</h2>
          
          <div className="grid md:grid-cols-2 gap-0 border border-slate-800 rounded-3xl overflow-hidden bg-slate-950 shadow-2xl">
            {/* Left: ChatGPT */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-800 bg-red-950/5 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20" />
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-300">DIY with ChatGPT</h3>
              </div>
              
              <div className="mb-8 p-4 bg-slate-900/50 rounded-xl border border-slate-800 font-mono text-sm text-slate-400 italic">
                "The developer tools market is estimated to be worth $45 billion..."
              </div>

              <ul className="space-y-4">
                {[
                  "No source cited",
                  "Number may be hallucinated",
                  "No segment breakdown",
                  "Generic, surface-level"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-400">
                    <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-slate-800/50 text-slate-500 text-sm">
                Time spent: ~6 hours of prompting and verifying
              </div>
            </div>

            {/* Right: Kael */}
            <div className="p-8 md:p-12 bg-amber-950/5 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-amber-900/30 flex items-center justify-center border border-amber-500/20">
                  <span className="text-amber-400 font-bold">K</span>
                </div>
                <h3 className="text-xl font-semibold text-amber-400">Kael Research</h3>
              </div>

              <div className="mb-8 p-4 bg-amber-950/20 rounded-xl border border-amber-500/20 font-mono text-sm text-amber-100">
                "The developer tools market reached $48.7B in 2025 (Gartner, Feb 2026), growing at 14.2% CAGR, with infrastructure..."
              </div>

              <ul className="space-y-4">
                {[
                  "Every claim sourced",
                  "Cross-verified by 3 AI models + human analyst",
                  "Full segment breakdown with data tables",
                  "Actionable strategic recommendations"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-200">
                    <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-amber-900/30 text-amber-400/80 text-sm font-medium">
                Delivered: 3 business days, board-ready PDF
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-slate-800 via-amber-900 to-slate-800" />
            
            {[
              {
                step: "01",
                title: "Brief Us",
                desc: "Tell us what decision you're trying to make. We scope it in 24 hours."
              },
              {
                step: "02",
                title: "We Go Deep",
                desc: "3 SOTA AI models analyze thousands of sources. Human analysts verify every claim."
              },
              {
                step: "03",
                title: "You Decide",
                desc: "Receive a polished, sourced PDF. Data tables, strategy, ready for investors."
              }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-amber-400 font-bold text-xl flex items-center justify-center mb-6 shadow-lg z-10">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Report Mockup */}
      <section className="py-24 px-6 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          {/* Document Mockup */}
          <div className="w-full md:w-1/2 relative group perspective-1000">
            <div className="absolute inset-0 bg-amber-500/20 blur-[50px] rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative bg-white text-slate-900 p-8 rounded-lg shadow-2xl transform transition-transform duration-500 md:group-hover:rotate-y-2 md:group-hover:rotate-x-2 min-h-[500px] flex flex-col">
              <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-4">
                <span className="font-bold tracking-tight">KAEL RESEARCH</span>
                <span className="text-xs font-mono text-red-600 border border-red-200 bg-red-50 px-2 py-1 rounded">CONFIDENTIAL</span>
              </div>
              
              <h3 className="text-3xl font-serif font-bold mb-2">SaaS Market Analysis:</h3>
              <h4 className="text-xl text-slate-600 mb-12">Developer Tools 2026 Outlook</h4>
              
              <div className="space-y-3 font-mono text-sm text-slate-600 mb-auto">
                <div className="flex justify-between border-b border-dotted border-slate-300 pb-1">
                  <span>Executive Summary</span>
                  <span>03</span>
                </div>
                <div className="flex justify-between border-b border-dotted border-slate-300 pb-1">
                  <span>Market Sizing (TAM/SAM)</span>
                  <span>08</span>
                </div>
                <div className="flex justify-between border-b border-dotted border-slate-300 pb-1">
                  <span>Competitor Matrix</span>
                  <span>15</span>
                </div>
                <div className="flex justify-between border-b border-dotted border-slate-300 pb-1">
                  <span>Pricing Analysis</span>
                  <span>24</span>
                </div>
                <div className="flex justify-between border-b border-dotted border-slate-300 pb-1">
                  <span>Strategic Recommendations</span>
                  <span>42</span>
                </div>
              </div>
              
              <div className="mt-12 flex gap-4 text-xs text-slate-400">
                <span>Prepared for: Client Name</span>
                <span className="ml-auto">Feb 2026</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="w-full md:w-1/2 md:pl-10">
            <h2 className="text-3xl font-bold mb-6">Board-Ready Intelligence</h2>
            <p className="text-slate-400 text-lg mb-10">
              We don't just dump data. We synthesize it into a coherent narrative backed by hard numbers.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Pages of Analysis", val: "47" },
                { label: "Data Tables", val: "12" },
                { label: "Sources Cited", val: "86" },
                { label: "Delivery Time", val: "3 Days" }
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-2xl font-bold text-white mb-1">{stat.val}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-slate-400">No retainers required. Pay per report or subscribe for continuous intelligence.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            {/* Starter */}
            <div className="p-8 rounded-2xl bg-slate-900/30 border border-slate-800 hover:border-slate-700 transition-colors">
              <h3 className="text-lg font-medium text-slate-300 mb-2">Starter</h3>
              <div className="text-3xl font-bold text-white mb-6">$149<span className="text-sm text-slate-500 font-normal"> /report</span></div>
              <p className="text-sm text-slate-400 mb-8 h-10">Perfect for quick validation of a single hypothesis or market.</p>
              <button className="w-full py-3 rounded-lg border border-slate-700 hover:bg-slate-800 text-white font-medium transition-colors mb-8">Get Started</button>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex gap-2"><CheckIcon /> Single topic coverage</li>
                <li className="flex gap-2"><CheckIcon /> 15-25 pages</li>
                <li className="flex gap-2"><CheckIcon /> 5-day delivery</li>
                <li className="flex gap-2"><CheckIcon /> 1 revision round</li>
                <li className="flex gap-2"><CheckIcon /> 30+ verified sources</li>
              </ul>
            </div>

            {/* Growth */}
            <div className="p-8 rounded-2xl bg-slate-900 border border-amber-500/50 relative ">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg">
                Most Popular
              </div>
              <h3 className="text-lg font-medium text-amber-400 mb-2">Growth</h3>
              <div className="text-3xl font-bold text-white mb-6">$499<span className="text-sm text-slate-500 font-normal"> /month</span></div>
              <p className="text-sm text-slate-400 mb-8 h-10">For teams that need ongoing competitor tracking and market updates.</p>
              <button className="w-full py-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium transition-colors mb-8 ">Subscribe Now</button>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-2"><CheckIcon color="text-amber-400" /> 2 deep-dive reports/mo</li>
                <li className="flex gap-2"><CheckIcon color="text-amber-400" /> Weekly competitor alerts</li>
                <li className="flex gap-2"><CheckIcon color="text-amber-400" /> 3-day priority delivery</li>
                <li className="flex gap-2"><CheckIcon color="text-amber-400" /> Unlimited revisions</li>
                <li className="flex gap-2"><CheckIcon color="text-amber-400" /> Slack/email delivery</li>
              </ul>
            </div>

            {/* Deep Dive */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <h3 className="text-lg font-medium text-slate-300 mb-2">Deep Dive</h3>
              <div className="text-3xl font-bold text-white mb-6">$299<span className="text-sm text-slate-500 font-normal"> /report</span></div>
              <p className="text-sm text-slate-400 mb-8 h-10">Investment-grade due diligence and strategic analysis.</p>
              <a href="mailto:contact@kaelresearch.com?subject=Deep Dive Report" className="block w-full py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-center font-medium transition-colors mb-8 border border-slate-700">Request Deep Dive</a>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-2"><CheckIcon /> 30-50 pages</li>
                <li className="flex gap-2"><CheckIcon /> Executive summary + appendix</li>
                <li className="flex gap-2"><CheckIcon /> 2 revision rounds</li>
                <li className="flex gap-2"><CheckIcon /> Raw data access</li>
                <li className="flex gap-2"><CheckIcon /> 86+ sources cited</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "How is this different from just using ChatGPT?", a: "ChatGPT is a generalist that hallucinates numbers. We use 3 specialized models cross-referenced against each other, connected to real data sources, and every claim is verified by a human analyst before delivery. You get sourced facts, not plausible fiction." },
              { q: "What sources do you use?", a: "Public filings, industry databases (Statista, Gartner, etc.), patent records, job postings, app store data, social signals, verified reviews, and more. Every source is cited in the report." },
              { q: "How fast can I get a report?", a: "Standard delivery is 5 business days. Growth plan clients get priority 3-day turnaround. Need it faster? Talk to us." },
              { q: "Can I request any topic?", a: "If it can be researched, we can cover it. SaaS, fintech, healthtech, e-commerce, developer tools, consumer apps — you name it. We scope feasibility within 24 hours of your brief." },
              { q: "What if I'm not satisfied?", a: "Every plan includes revision rounds. If the report doesn't meet the brief, we revise it at no extra cost. We'd rather over-deliver than lose your trust." }
            ].map((faq, i) => (
              <div key={i} className="border border-slate-800 rounded-lg bg-slate-900/50 overflow-hidden">
                <button onClick={() => toggleFaq(i)} className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none">
                  <span className="text-white font-medium">{faq.q}</span>
                  <svg className={`w-5 h-5 text-amber-500 transform transition-transform duration-200 flex-shrink-0 ${openFaqIndex === i ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === i ? 'max-h-48 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-slate-950 to-amber-950/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stop Googling.<br />Start Knowing.</h2>
          <p className="text-xl text-slate-400 mb-10">Get a sample report on your industry — free. See the quality before you commit.</p>
          <a href="mailto:contact@kaelresearch.com?subject=Free Sample Report Request" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-950 bg-white hover:bg-slate-200 rounded-full transition-all ">
            Request Your Free Sample
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="text-xl font-bold text-white tracking-tight">KAEL <span className="text-amber-500">RESEARCH</span></span>
              <p className="text-slate-500 text-sm mt-2">{'\u00A9'} 2026 Kael Research. All rights reserved.</p>
            </div>
            <a href="mailto:contact@kaelresearch.com" className="text-slate-400 hover:text-amber-400 text-sm transition-colors">contact@kaelresearch.com</a>
          </div>
        </div>
      </footer>
    </main>
  );
}


