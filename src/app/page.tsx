import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`min-h-screen bg-slate-900 text-slate-100 ${inter.className} selection:bg-emerald-500 selection:text-white`}>
      {/* Navigation */}
      <nav className="border-b border-slate-800 backdrop-blur-sm sticky top-0 z-50 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter text-white">
            KAEL<span className="text-emerald-500">RESEARCH</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <Link href="#services" className="hover:text-emerald-400 transition-colors">Services</Link>
            <Link href="#process" className="hover:text-emerald-400 transition-colors">Process</Link>
            <Link href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link>
            <Link 
              href="mailto:contact@kaelresearch.com" 
              className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              Request a Brief
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-900 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-900/30 rounded-full border border-emerald-800">
            AI-Powered Intelligence
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-8">
            Research & Intelligence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              That Drives Decisions
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            Institutional-grade market research, competitor analysis, and strategic intelligence — delivered in days, not weeks. Powered by AI. Verified by humans.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="mailto:contact@kaelresearch.com?subject=Research Brief Request"
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-emerald-900/20"
            >
              Request a Brief
            </Link>
            <Link 
              href="#services"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg border border-slate-700 transition-all"
            >
              See What We Do
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-900 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Deliver</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Deep research that gives you an unfair advantage. Every report is AI-accelerated and human-verified.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-900 transition-colors">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Market Research</h3>
              <p className="text-slate-400 leading-relaxed">
                TAM/SAM/SOM analysis, customer segments, pricing benchmarks, and market entry strategies backed by real data.
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-900 transition-colors">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Competitor Intelligence</h3>
              <p className="text-slate-400 leading-relaxed">
                Feature comparisons, pricing tracking, positioning analysis, and strategic moves — monitored continuously.
              </p>
            </div>

            {/* Service 3 */}
            <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 transition-all group hover:-translate-y-1">
              <div className="w-12 h-12 bg-emerald-900/50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-900 transition-colors">
                <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Strategic Analysis</h3>
              <p className="text-slate-400 leading-relaxed">
                Due diligence reports, investment memos, and go-to-market strategies for founders, PMs, and investors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="process" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
            <div className="h-1 w-20 bg-emerald-500 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative">
              <div className="text-6xl font-black text-slate-800/50 absolute -top-8 -left-4 z-0">01</div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                  Brief Us
                </h3>
                <p className="text-slate-400">
                  Tell us what you need — a market deep-dive, competitor breakdown, or strategic assessment. We scope it in 24 hours.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="text-6xl font-black text-slate-800/50 absolute -top-8 -left-4 z-0">02</div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                  We Research
                </h3>
                <p className="text-slate-400">
                  Our AI systems analyze thousands of data points. Human analysts verify every insight. You get a polished report in 3-5 days.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="text-6xl font-black text-slate-800/50 absolute -top-8 -left-4 z-0">03</div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                  You Decide
                </h3>
                <p className="text-slate-400">
                  Use the intelligence to make better decisions — faster. Need ongoing monitoring? We track changes and alert you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-900 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Transparent Pricing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Tier 1 */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-emerald-400 mb-2">One-Off Report</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$150</span>
                  <span className="text-slate-500">per report</span>
                </div>
                <p className="text-slate-400 text-sm mt-4">Single research deliverable on any topic.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Market sizing & analysis', 'Competitor landscape', '15-25 page PDF report', '1 round of revisions'].map((item) => (
                  <li key={item} className="flex items-center text-slate-300 text-sm">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="mailto:contact@kaelresearch.com?subject=One-Off Report" className="block w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white text-center rounded-lg font-medium transition-colors">
                Get Started
              </Link>
            </div>

            {/* Tier 2 */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-emerald-500/50 relative flex flex-col shadow-[0_0_30px_rgba(16,185,129,0.1)]">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-2xl">
                POPULAR
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium text-emerald-400 mb-2">Monthly Intelligence</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$500</span>
                  <span className="text-slate-500">/month</span>
                </div>
                <p className="text-slate-400 text-sm mt-4">Ongoing monitoring and monthly briefs.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['2 research reports/month', 'Weekly competitor alerts', 'Trend analysis dashboard', 'Slack/email delivery', 'Unlimited revisions'].map((item) => (
                  <li key={item} className="flex items-center text-slate-300 text-sm">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="mailto:contact@kaelresearch.com?subject=Monthly Intelligence" className="block w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-center rounded-lg font-medium transition-colors">
                Start Monitoring
              </Link>
            </div>

            {/* Tier 3 */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-medium text-emerald-400 mb-2">Deep Dive</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">$300</span>
                  <span className="text-slate-500">per report</span>
                </div>
                <p className="text-slate-400 text-sm mt-4">Comprehensive strategic analysis.</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                {['Due diligence reports', 'Investment memos', '30-50 page deliverable', 'Executive summary', '2 rounds of revisions'].map((item) => (
                  <li key={item} className="flex items-center text-slate-300 text-sm">
                    <svg className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="mailto:contact@kaelresearch.com?subject=Deep Dive Report" className="block w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white text-center rounded-lg font-medium transition-colors">
                Request Deep Dive
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Stop guessing. Start knowing.</h2>
          <p className="text-slate-400 mb-8">
            Get a sample report on your industry — free. See the quality before you commit.
          </p>
          <Link 
            href="mailto:contact@kaelresearch.com?subject=Free Sample Report" 
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-white rounded-full hover:bg-slate-200 transition-colors"
          >
            Get a Free Sample
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-white tracking-tighter">
                KAEL<span className="text-emerald-500">RESEARCH</span>
              </span>
              <p className="text-slate-500 text-sm mt-2">&copy; {new Date().getFullYear()} Kael Research. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="mailto:contact@kaelresearch.com" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">
                contact@kaelresearch.com
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
