'use client';

import React, { useState } from 'react';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

function CheckIcon({ color = "text-gray-400" }: { color?: string }) {
  return (
    <svg className={`w-4 h-4 ${color} flex-shrink-0 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function EmailModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'sample_download' }),
      });
      if (res.ok) {
        localStorage.setItem('kael_email', email);
        onSuccess();
      } else {
        setError('Something went wrong. Try again.');
      }
    } catch {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#1B2A4A', fontFamily: 'Georgia, serif' }}>Get the Free Sample Report</h3>
        <p className="text-gray-500 text-sm mb-6">
          Enter your email and the full sample report is yours. No spam, no sequences.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] transition-colors"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#C9A84C' }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8953f')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C9A84C')}
          >
            {loading ? 'Sending...' : 'Send Me the Report'}
          </button>
        </form>
        <p className="text-gray-400 text-xs mt-4 text-center">We send one thing: the report. That's it.</p>
      </div>
    </div>
  );
}

function ContactModal({ isOpen, onClose, defaultMessage = '' }: { isOpen: boolean; onClose: () => void; defaultMessage?: string }) {
  const [form, setForm] = useState({ name: '', email: '', message: defaultMessage });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  // Update message when defaultMessage changes
  React.useEffect(() => {
    if (defaultMessage) {
      setForm(f => ({ ...f, message: defaultMessage }));
    }
  }, [defaultMessage]);

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setSent(false);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError('Something went wrong. Try again.');
      }
    } catch {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        {sent ? (
          <div className="text-center py-4">
            <svg className="w-8 h-8 mx-auto mb-3" style={{ color: '#C9A84C' }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1B2A4A' }}>Message Sent!</h3>
            <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
            <button onClick={onClose} className="mt-4 px-6 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors">Close</button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#1B2A4A', fontFamily: 'Georgia, serif' }}>Get in Touch</h3>
            <p className="text-gray-500 text-sm mb-6">Tell us what you're working on. We'll scope it within 24 hours.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@company.com"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="What do you need researched?"
                required
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#C9A84C' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8953f')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C9A84C')}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [defaultMessage, setDefaultMessage] = useState('');
  const router = useRouter();

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

  const handleSampleClick = () => {
    if (typeof window !== 'undefined' && localStorage.getItem('kael_email')) {
      router.push('/sample');
      return;
    }
    setShowEmailModal(true);
  };

  const handleEmailSuccess = () => {
    setShowEmailModal(false);
    router.push('/sample');
  };

  const handlePricingClick = (plan: string) => {
    if (plan === 'starter') {
      setDefaultMessage("Hi, I'm interested in the Weekly AI Brief ($49/mo). Here's what sectors I'm most interested in:\n\n[Describe your focus areas]");
    } else if (plan === 'growth') {
      setDefaultMessage("Hi, I'm interested in a Research Retainer ($3K/mo). Here's what my team needs:\n\n[Describe your ongoing research needs]");
    } else {
      setDefaultMessage("Hi, I need a Strategic Project ($10K+). Here's the scope:\n\n[Describe your topic and what decisions it will inform]");
    }
    setShowContactModal(true);
  };

  return (
    <main className={`min-h-screen bg-white text-[#333333] ${inter.className} selection:bg-[#C9A84C]/20 selection:text-[#1B2A4A] overflow-x-hidden`}>
      
      <EmailModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} onSuccess={handleEmailSuccess} />
      <ContactModal isOpen={showContactModal} onClose={() => { setShowContactModal(false); setDefaultMessage(''); }} defaultMessage={defaultMessage} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span style={{ color: '#1B2A4A' }}>KAEL</span>
            <span style={{ color: '#C9A84C' }}>RESEARCH</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-[#1B2A4A] transition-colors">How It Works</button>
            <a href="/briefs" className="hover:text-[#1B2A4A] transition-colors">Research</a>
            <button onClick={() => scrollToSection('newsletter')} className="hover:text-[#1B2A4A] transition-colors">Newsletter</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-[#1B2A4A] transition-colors">Pricing</button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#1B2A4A] transition-colors">FAQ</button>
            <button
              onClick={handleSampleClick}
              className="text-white px-5 py-2.5 rounded-full transition-colors"
              style={{ backgroundColor: '#C9A84C' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8953f')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C9A84C')}
            >
              Get a Free Sample
            </button>
          </div>

          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 p-6 flex flex-col gap-4">
            <button onClick={() => scrollToSection('how-it-works')} className="text-left text-gray-600 hover:text-[#1B2A4A]">How It Works</button>
            <a href="/briefs" className="text-left text-gray-600 hover:text-[#1B2A4A]">Research</a>
            <button onClick={() => scrollToSection('pricing')} className="text-left text-gray-600 hover:text-[#1B2A4A]">Pricing</button>
            <button onClick={() => scrollToSection('faq')} className="text-left text-gray-600 hover:text-[#1B2A4A]">FAQ</button>
            <button onClick={handleSampleClick} className="text-white px-5 py-2.5 rounded-full w-full" style={{ backgroundColor: '#C9A84C' }}>Get a Free Sample</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9FAFB] border border-gray-200 text-xs font-medium mb-8" style={{ color: '#C9A84C' }}>
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#C9A84C' }}></span>
            </span>
            Now accepting Q2 2026 clients
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8" style={{ color: '#1B2A4A', fontFamily: 'Georgia, serif' }}>
            Market Intelligence.<br />
            <span style={{ color: '#C9A84C' }}>Decisions Made Certain.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Sourced data. Verified numbers. Actionable strategy. We deliver the research your competitors wish they had — ready for investors, boards, and product teams. In 3 days.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleSampleClick}
              className="w-full sm:w-auto text-white text-lg font-medium px-8 py-4 rounded-full transition-colors"
              style={{ backgroundColor: '#C9A84C' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8953f')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C9A84C')}
            >
              Get a Free Sample Report
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="w-full sm:w-auto bg-transparent hover:bg-gray-50 text-gray-600 hover:text-[#1B2A4A] text-lg font-medium px-8 py-4 rounded-full border border-gray-300 hover:border-gray-400 transition-colors"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-6 border-t border-gray-100 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: '#1B2A4A', fontFamily: 'Georgia, serif' }}>Sound Familiar?</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Investor meeting in 5 days",
                desc: "You need TAM numbers, competitor analysis, and a market map. You've been Googling for 3 hours and have 47 tabs open.",
                icon: (
                  <svg className="w-6 h-6" style={{ color: '#C9A84C' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Competitor just raised $20M",
                desc: "What are they building? Who are they hiring? Where are they expanding? Your team is guessing.",
                icon: (
                  <svg className="w-6 h-6" style={{ color: '#C9A84C' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )
              },
              {
                title: "Board wants a GTM strategy",
                desc: "For a new market you've never operated in. Due Thursday. You're one person.",
                icon: (
                  <svg className="w-6 h-6" style={{ color: '#C9A84C' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                )
              }
            ].map((card, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white border border-gray-200 transition-colors hover:border-gray-300 group">
                <div className="w-12 h-12 bg-[#F9FAFB] border border-gray-200 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#C9A84C]/10 transition-colors">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1B2A4A' }}>{card.title}</h3>
                <p className="text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-lg">
            You could spend 20 hours stitching together half-sourced data. 
            <span className="block sm:inline font-medium mt-2 sm:mt-0 sm:ml-2" style={{ color: '#1B2A4A' }}>Or you could let us handle it.</span>
          </p>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ color: '#1B2A4A', fontFamily: 'Georgia, serif' }}>ChatGPT vs. Kael Research</h2>
          
          <div className="grid md:grid-cols-2 gap-0 border border-gray-200 rounded-3xl overflow-hidden bg-white shadow-lg">
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-200 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-400/40" />
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-500">DIY with ChatGPT</h3>
              </div>
              
              <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200 font-mono text-sm text-gray-500 italic">
                &quot;The developer tools market is estimated to be worth $45 billion...&quot;
              </div>

              <ul className="space-y-4">
                {["No source cited", "Number may be hallucinated", "No segment breakdown", "Generic, surface-level"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-500">
                    <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-8 border-t border-gray-200 text-gray-400 text-sm">
                Time spent: ~6 hours of prompting and verifying
              </div>
            </div>

            <div className="p-8 md:p-12 relative">
              <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: '#C9A84C' }} />
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border" style={{ backgroundColor: '#C9A84C10', borderColor: '#C9A84C40' }}>
                  <span className="font-bold" style={{ color: '#C9A84C' }}>K</span>
                </div>
                <h3 className="text-xl font-semibold" style={{ color: '#C9A84C' }}>Kael Research</h3>
              </div>

              <div className="mb-8 p-4 rounded-xl border font-mono text-sm" style={{ backgroundColor: '#C9A84C08', borderColor: '#C9A84C30', color: '#1B2A4A' }}>
                &quot;The developer tools market reached $48.7B in 2025 (Gartner, Feb 2026), growing at 14.2% CAGR, with infrastructure...&quot;
              </div>

              <ul className="space-y-4">
                {[
                  "Every claim sourced",
                  "Triple-checked by AI, then verified by a human",
                  "Full segment breakdown with data tables",
                  "Specific next steps you can actually act on"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3" style={{ color: '#333333' }}>
                    <svg className="w-5 h-5 shrink-0" style={{ color: '#C9A84C' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t text-sm font-medium" style={{ borderColor: '#C9A84C30', color: '#C9A84C' }}>
                Delivered in 3 business days as a polished PDF
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16" style={{ color: '#1B2A4A', fontFamily: 'Georgia, serif' }}>How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-200 via-[#C9A84C]/30 to-gray-200" />
            
            {[
              { step: "01", title: "Brief Us", desc: "Tell us what decision you're trying to make. We scope it in 24 hours." },
              { step: "02", title: "We Go Deep", desc: "Three AI models cross-check thousands of sources against each other. Then a human analyst goes through every number and claim." },
              { step: "03", title: "You Decide", desc: "You get a PDF with sourced data, clear analysis, and specific recommendations. Put it in front of investors as-is." }
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white border border-gray-200 font-bold text-xl flex items-center justify-center mb-6 shadow-sm z-10" style={{ color: '#C9A84C' }}>
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#1B2A4A' }}>{item.title}</h3>
                <p className="text-gray-500 max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Report Mockup */}
      <section className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          <div className="w-full md:w-1/2 relative group cursor-pointer" onClick={handleSampleClick}>
            <div className="relative bg-white text-gray-900 p-8 rounded-lg shadow-lg border border-gray-200 transition-transform duration-300 hover:scale-[1.02] min-h-[500px] flex flex-col">
              <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                <span className="font-bold tracking-tight" style={{ color: '#1B2A4A' }}>KAEL <span style={{ color: '#C9A84C' }}>RESEARCH</span></span>
                <span className="text-xs font-mono text-red-600 border border-red-200 bg-red-50 px-2 py-1 rounded">CONFIDENTIAL</span>
              </div>
              
              <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif', color: '#1B2A4A' }}>SaaS Market Analysis:</h3>
              <h4 className="text-xl text-gray-500 mb-12">Developer Tools 2026 Outlook</h4>
              
              <div className="space-y-3 font-mono text-sm text-gray-500 mb-auto">
                {[
                  ["Executive Summary", "03"],
                  ["Market Sizing (TAM/SAM)", "06"],
                  ["Competitor Matrix", "12"],
                  ["Pricing Analysis", "20"],
                  ["Strategic Recommendations", "28"]
                ].map(([title, page], i) => (
                  <div key={i} className="flex justify-between border-b border-dotted border-gray-300 pb-1">
                    <span>{title}</span>
                    <span>{page}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 flex gap-4 text-xs text-gray-400">
                <span>Prepared for: Client Name</span>
                <span className="ml-auto">Feb 2026</span>
              </div>

              <div className="absolute inset-0 bg-black/0 hover:bg-black/[0.02] rounded-lg transition-colors flex items-end justify-center pb-6">
                <span className="text-white text-sm font-medium px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: '#C9A84C' }}>
                  Click to read the full report
                </span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 md:pl-10">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#1B2A4A', fontFamily: 'Georgia, serif' }}>What You Actually Get</h2>
            <p className="text-gray-500 text-lg mb-10">
              Not a data dump. Every report tells a clear story — what's happening, why it matters, and what you should do about it.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Pages of Analysis", val: "30+" },
                { label: "Data Tables", val: "8+" },
                { label: "Sources Cited", val: "50+" },
                { label: "Delivery Time", val: "3 Days" }
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#F9FAFB] border border-gray-200">
                  <div className="text-2xl font-bold mb-1" style={{ color: '#1B2A4A' }}>{stat.val}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSampleClick}
              className="mt-8 text-white font-medium px-6 py-3 rounded-full transition-colors"
              style={{ backgroundColor: '#C9A84C' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8953f')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C9A84C')}
            >
              Read the Full Sample
            </button>
          </div>
        </div>
      </section>

      {/* Latest Research */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: '#1B2A4A', fontFamily: 'Georgia, serif' }}>Latest Research</h2>
          <p className="text-gray-500 text-center mb-12">Free market briefs — sourced data, real analysis.</p>
          <div className="max-w-2xl mx-auto">
            <a href="/brief/ai-code-assistants" className="block p-8 rounded-2xl bg-[#F9FAFB] border border-gray-200 hover:border-gray-300 transition-colors group">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold tracking-[2px] uppercase px-2 py-0.5 rounded border" style={{ color: '#C9A84C', borderColor: 'rgba(201,168,76,0.4)', backgroundColor: 'rgba(201,168,76,0.06)' }}>Market Brief</span>
                <span className="text-xs text-gray-400">February 2026</span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[#C9A84C] transition-colors" style={{ color: '#1B2A4A' }}>AI Code Assistants</h3>
              <p className="text-gray-500 text-sm leading-relaxed">$8B market. Cursor at $29.3B valuation. GitHub Copilot losing enterprise share. Full competitive analysis, adoption data, and investment activity.</p>
              <span className="inline-block mt-4 text-sm font-medium" style={{ color: '#C9A84C' }}>Read the brief →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9FAFB] border border-gray-200 text-xs font-medium mb-6" style={{ color: '#C9A84C' }}>
            Free weekly research
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1B2A4A', fontFamily: 'Georgia, serif' }}>AI Market Intelligence, Weekly</h2>
          <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
            Every week we break down one AI market with real numbers, sourced data, and specific takeaways. Built for founders and investors who need to make decisions, not just stay informed.
          </p>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const input = (e.target as HTMLFormElement).querySelector('input') as HTMLInputElement;
            const email = input?.value;
            if (!email || !email.includes('@')) return;
            try {
              const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source: 'newsletter_signup' }),
              });
              if (res.ok) {
                input.value = '';
                alert('You\'re in. Check your inbox for a welcome email.');
              }
            } catch { /* ignore */ }
          }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 text-white font-medium rounded-lg transition-colors whitespace-nowrap"
              style={{ backgroundColor: '#C9A84C' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8953f')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C9A84C')}
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-gray-400 text-xs mt-3">No spam. Unsubscribe anytime. We also send the free sample report as a welcome gift.</p>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1B2A4A', fontFamily: 'Georgia, serif' }}>When You Need More Than a Newsletter</h2>
            <p className="text-gray-500">From weekly briefs to full research retainers. Start free, upgrade when ready.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
            <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
              <h3 className="text-lg font-medium text-gray-500 mb-2">Weekly AI Brief</h3>
              <div className="text-3xl font-bold mb-6" style={{ color: '#1B2A4A' }}>$49<span className="text-sm text-gray-400 font-normal"> /month</span></div>
              <p className="text-sm text-gray-500 mb-8 h-10">Curated AI market research delivered weekly. Built for founders making decisions.</p>
              <button onClick={() => handlePricingClick('starter')} className="w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium transition-colors mb-8" style={{ color: '#1B2A4A' }}>Start Reading</button>
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex gap-2"><CheckIcon /> Weekly market analysis</li>
                <li className="flex gap-2"><CheckIcon /> Competitor tracking alerts</li>
                <li className="flex gap-2"><CheckIcon /> Sourced data, not summaries</li>
                <li className="flex gap-2"><CheckIcon /> Sector deep-dives monthly</li>
                <li className="flex gap-2"><CheckIcon /> Cancel anytime</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border-2 relative" style={{ borderColor: '#C9A84C' }}>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-md" style={{ backgroundColor: '#C9A84C' }}>
                Most Popular
              </div>
              <h3 className="text-lg font-medium mb-2" style={{ color: '#C9A84C' }}>Research Retainer</h3>
              <div className="text-3xl font-bold mb-6" style={{ color: '#1B2A4A' }}>$3K<span className="text-sm text-gray-400 font-normal"> /month</span></div>
              <p className="text-sm text-gray-500 mb-8 h-10">Your own research analyst on retainer. Custom reports, competitive intel, market maps on demand.</p>
              <button
                onClick={() => handlePricingClick('growth')}
                className="w-full py-3 rounded-lg text-white font-medium transition-colors mb-8"
                style={{ backgroundColor: '#C9A84C' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8953f')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#C9A84C')}
              >
                Let&apos;s Talk
              </button>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2"><CheckIcon color="text-[#C9A84C]" /> 2 custom reports/month</li>
                <li className="flex gap-2"><CheckIcon color="text-[#C9A84C]" /> Weekly competitor alerts</li>
                <li className="flex gap-2"><CheckIcon color="text-[#C9A84C]" /> 3-day priority delivery</li>
                <li className="flex gap-2"><CheckIcon color="text-[#C9A84C]" /> Monthly strategy call</li>
                <li className="flex gap-2"><CheckIcon color="text-[#C9A84C]" /> Unlimited revisions</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-colors">
              <h3 className="text-lg font-medium text-gray-500 mb-2">Strategic Project</h3>
              <div className="text-3xl font-bold mb-6" style={{ color: '#1B2A4A' }}>$10K+<span className="text-sm text-gray-400 font-normal"> one-off</span></div>
              <p className="text-sm text-gray-500 mb-8 h-10">Board-ready analysis. The kind of research you put in front of investors or acquirers.</p>
              <button onClick={() => handlePricingClick('deep-dive')} className="w-full py-3 rounded-lg bg-[#1B2A4A] hover:bg-[#243757] text-white font-medium transition-colors mb-8">Request a Scope</button>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-2"><CheckIcon /> 30-50 pages</li>
                <li className="flex gap-2"><CheckIcon /> Executive summary + appendix</li>
                <li className="flex gap-2"><CheckIcon /> Due diligence grade</li>
                <li className="flex gap-2"><CheckIcon /> Raw data access</li>
                <li className="flex gap-2"><CheckIcon /> 50+ sources cited</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 relative bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#1B2A4A', fontFamily: 'Georgia, serif' }}>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "How is this different from just using ChatGPT?", a: "ChatGPT makes up numbers. It sounds confident, but try putting those figures in a pitch deck — they fall apart under scrutiny. We run three AI models against each other to catch errors, pull from real databases, and then a human checks every number before it goes out. You get citations, not vibes." },
              { q: "What sources do you use?", a: "Public filings, industry databases (Statista, Gartner, etc.), patent records, job postings, app store data, social signals, verified reviews, and more. Every source is cited in the report." },
              { q: "How fast can I get a report?", a: "Standard delivery is 5 business days. Growth plan clients get priority 3-day turnaround. Need it faster? Talk to us." },
              { q: "Can I request any topic?", a: "Pretty much anything in tech and business. SaaS, fintech, healthtech, e-commerce, dev tools, consumer apps. Send us the brief and we'll tell you within 24 hours if we can do it and what it'll cover." },
              { q: "What if I'm not satisfied?", a: "Every plan comes with revision rounds. If the report misses the mark, we fix it — no extra charge. We're building a business on repeat clients, so burning you on the first report would be stupid." }
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                <button onClick={() => toggleFaq(i)} className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none">
                  <span className="font-medium" style={{ color: '#1B2A4A' }}>{faq.q}</span>
                  <svg className={`w-5 h-5 transform transition-transform duration-200 flex-shrink-0 ${openFaqIndex === i ? 'rotate-180' : ''}`} style={{ color: '#C9A84C' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${openFaqIndex === i ? 'max-h-48 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24" style={{ background: 'linear-gradient(to bottom, #F9FAFB, #F0EDE4)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ color: '#1B2A4A', fontFamily: 'Georgia, serif' }}>Ready to Move with Confidence?</h2>
          <p className="text-xl text-gray-500 mb-10">See the quality of our work firsthand. Download a free sample report.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleSampleClick}
              className="px-8 py-4 text-lg font-bold text-white rounded-full transition-colors"
              style={{ backgroundColor: '#1B2A4A' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#243757')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1B2A4A')}
            >
              Get Your Free Sample
            </button>
            <button onClick={() => setShowContactModal(true)} className="px-8 py-4 text-lg font-medium text-gray-600 border border-gray-300 hover:bg-white hover:text-[#1B2A4A] rounded-full transition-colors">
              Talk to Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: '#1B2A4A' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <span className="text-xl font-bold text-white tracking-tight">KAEL <span style={{ color: '#C9A84C' }}>RESEARCH</span></span>
              <p className="text-white/50 text-sm mt-2">{'\u00A9'} 2026 Kael Research. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6">
              <button onClick={() => setShowContactModal(true)} className="text-white/60 hover:text-[#C9A84C] text-sm transition-colors">Contact</button>
              <span className="text-white/60 text-sm">kaeltiwari@kaelresearch.com</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
