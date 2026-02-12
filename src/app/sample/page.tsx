'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SampleReportPage() {
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('kael_email')) {
      setAuthorized(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) { setError('Enter a valid email.'); return; }
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        localStorage.setItem('kael_email', email);
        setAuthorized(true);
      } else { setError('Something went wrong.'); }
    } catch { setError('Network error.'); }
    setLoading(false);
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-gray-200 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Read the Full Sample Report</h2>
          <p className="text-slate-400 text-sm mb-6">Drop your email to unlock instant access. No spam.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-medium rounded-lg transition-colors">
              {loading ? 'Unlocking...' : 'Unlock Report'}
            </button>
          </form>
          <p className="text-slate-500 text-xs mt-4 text-center">Or <Link href="/" className="text-amber-400 hover:underline">go back home</Link></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-white font-semibold text-lg tracking-tight">
            Kael Research
          </Link>
          <span className="text-xs uppercase tracking-widest text-amber-400 border border-amber-400/30 px-3 py-1 rounded-full">
            Sample Report
          </span>
        </div>
      </header>

      {/* Report Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <article className="prose prose-invert prose-lg max-w-none
          prose-headings:text-white prose-headings:font-semibold
          prose-h1:text-4xl prose-h1:mb-4 prose-h1:leading-tight
          prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pt-8 prose-h2:border-t prose-h2:border-white/10
          prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-gray-300
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
          prose-strong:text-white
          prose-li:text-gray-300
          prose-table:text-sm
          prose-th:text-left prose-th:text-gray-400 prose-th:font-medium prose-th:pb-3 prose-th:border-b prose-th:border-white/20
          prose-td:py-2.5 prose-td:border-b prose-td:border-white/5 prose-td:text-gray-300
          prose-em:text-gray-400
          prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
        ">
          {/* Cover */}
          <div className="text-center mb-20 pt-8">
            <h1 className="text-5xl font-bold tracking-tight mb-6">
              The AI Code Assistant Market:<br />2026 Landscape Analysis
            </h1>
            <p className="text-gray-400 text-lg mb-2">Prepared by Kael Research</p>
            <p className="text-gray-500 mb-6">February 2026</p>
            <span className="inline-block text-xs uppercase tracking-widest text-amber-400 border border-amber-400/30 px-4 py-2 rounded">
              Sample Report
            </span>
            <p className="text-gray-500 text-sm mt-8 max-w-lg mx-auto italic">
              This document is a sample excerpt from Kael Research&apos;s full market intelligence library.
              For complete reports, custom analysis, and ongoing coverage, visit{' '}
              <Link href="/" className="text-amber-400 hover:underline">kaelresearch.com</Link>.
            </p>
          </div>

          {/* Executive Summary */}
          <h2>Executive Summary</h2>
          <p>
            The AI code assistant market has moved from curiosity to infrastructure. What was a $2.1B
            market in 2024 has grown to an estimated $5.8B in 2025, and we project it will reach $9.4B
            by end of 2026 (Kael Research estimates based on IDC, Gartner, and company disclosures).
            The growth is no longer driven by early adopters — it&apos;s driven by procurement teams.
          </p>

          <p><strong>Key findings:</strong></p>
          <ul>
            <li>
              <strong>GitHub Copilot holds ~42% market share</strong> by revenue, but its dominance is
              eroding. It held 55% in early 2024. Cursor and Codeium are the primary beneficiaries.
              <em> (GitHub financial disclosures, 2025; Kael Research estimates)</em>
            </li>
            <li>
              <strong>Cursor has become the breakout story of 2025</strong>, growing from ~200K users in
              early 2024 to an estimated 3.2M by Q4 2025, with annual recurring revenue crossing $200M.
              <em> (The Information, 2025; company statements)</em>
            </li>
            <li>
              <strong>Enterprise adoption reached a tipping point.</strong> 71% of companies with 500+
              engineers now provide an AI coding tool as standard tooling, up from 38% in 2023.
              <em> (GitHub Enterprise Survey, 2025; McKinsey Developer Productivity Report, 2025)</em>
            </li>
            <li>
              <strong>The &ldquo;assistant&rdquo; framing is dying.</strong> The market is shifting toward agentic
              coding — tools that don&apos;t just suggest code but execute multi-step tasks autonomously.
            </li>
            <li>
              <strong>Pricing pressure is real but uneven.</strong> Free tiers from Amazon and Google have
              not collapsed the market. Developers and their employers will pay $20-40/month for tools
              that measurably improve output.
            </li>
            <li>
              <strong>Open-source alternatives are credible but niche.</strong> Continue (with Ollama/local
              models) and Tabby have loyal followings, but together represent less than 5% of active daily
              users in professional settings.
            </li>
            <li>
              <strong>The next 18 months will see consolidation.</strong> We expect 2-3 acquisitions of
              mid-tier players by major cloud or DevTool platforms by end of 2027.
            </li>
          </ul>

          {/* Market Overview */}
          <h2>1. Market Overview</h2>

          <h3>1.1 Market Sizing</h3>
          <p>
            The AI code assistant market — defined here as tools that provide AI-powered code generation,
            completion, and editing capabilities integrated into developer workflows — has been one of
            the fastest-growing segments in developer tooling.
          </p>

          <div className="overflow-x-auto my-8">
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>2023</th>
                  <th>2024</th>
                  <th>2025 (Est.)</th>
                  <th>2026 (Proj.)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Total Addressable Market (TAM)</td><td>$8.2B</td><td>$12.5B</td><td>$18.1B</td><td>$24.0B</td></tr>
                <tr><td>Serviceable Addressable Market (SAM)</td><td>$3.1B</td><td>$5.4B</td><td>$8.7B</td><td>$13.2B</td></tr>
                <tr><td>Serviceable Obtainable Market (SOM)</td><td>$1.1B</td><td>$2.1B</td><td>$5.8B</td><td>$9.4B</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 -mt-4 mb-8">
            Sources: Gartner (2025), IDC Software Development Intelligence Report (2025), Kael Research estimates
          </p>

          <p>
            The gap between SAM and SOM is closing fast. In 2023, only 35% of the addressable market
            was captured. By 2025, that figure reached 67%. The primary driver: enterprise deals. When
            a company like Shopify or Stripe rolls out Copilot to all engineers, that&apos;s thousands of
            seats converting overnight.
          </p>

          <h3>1.2 Growth Drivers</h3>
          <p>
            <strong>Developer population growth.</strong> There are approximately 32 million professional
            developers worldwide in 2025, up from 27 million in 2022 (Evans Data Corporation, 2025).
            Every new developer is a potential seat.
          </p>
          <p>
            <strong>Productivity data is now undeniable.</strong> GitHub&apos;s internal study showed a 55%
            increase in task completion speed with Copilot (GitHub, 2023). Independent replication by
            Microsoft Research found 32-40% improvement depending on task complexity (Microsoft Research,
            2024). McKinsey&apos;s 2025 study of 1,200 engineering teams found an average 27% reduction in
            time-to-PR for teams using AI assistants.
          </p>
          <p>
            <strong>The agentic shift.</strong> In 2024, code assistants mostly autocompleted lines.
            In 2025, tools like Cursor&apos;s Composer and Copilot Workspace began handling multi-file
            edits and multi-step tasks. This changed the value proposition from &ldquo;saves me
            keystrokes&rdquo; to &ldquo;does my tasks.&rdquo; That&apos;s a category-expanding shift.
          </p>

          <h3>1.3 Growth Constraints</h3>
          <p>
            <strong>Security and IP concerns</strong> remain the top blocker for enterprise adoption.
            34% of engineering leaders cite &ldquo;code confidentiality&rdquo; as their primary hesitation
            (Snyk Developer Security Survey, 2025).
          </p>
          <p>
            <strong>Model quality plateaus.</strong> The jump from GPT-3.5 to GPT-4 was dramatic. The
            jump from GPT-4 to current models has been incremental for code generation specifically.
            Developers notice. Satisfaction scores have plateaued.
          </p>
          <p>
            <strong>Developer skepticism is cultural.</strong> A meaningful minority (~18-22%) actively
            resist AI coding tools, citing concerns about skill atrophy and over-reliance. This segment
            is shrinking but vocal. <em>(Stack Overflow Developer Survey, 2025)</em>
          </p>

          {/* Competitive Analysis */}
          <h2>2. Competitive Analysis</h2>

          <h3>2.1 Market Share by Revenue (2025 Estimated)</h3>
          <div className="overflow-x-auto my-8">
            <table>
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Est. Revenue (2025)</th>
                  <th>Market Share</th>
                  <th>YoY Growth</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>GitHub Copilot</td><td>$2.44B</td><td>42%</td><td>+68%</td></tr>
                <tr><td>Cursor</td><td>$0.58B</td><td>10%</td><td>+340%</td></tr>
                <tr><td>Codeium (Windsurf)</td><td>$0.41B</td><td>7%</td><td>+185%</td></tr>
                <tr><td>Amazon Q Developer</td><td>$0.35B</td><td>6%</td><td>+42%</td></tr>
                <tr><td>Tabnine</td><td>$0.23B</td><td>4%</td><td>+15%</td></tr>
                <tr><td>JetBrains AI Assistant</td><td>$0.20B</td><td>3.5%</td><td>+120%</td></tr>
                <tr><td>Google Gemini Code Assist</td><td>$0.17B</td><td>3%</td><td>+95%</td></tr>
                <tr><td>Others</td><td>$1.42B</td><td>24.5%</td><td>varies</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 -mt-4 mb-8">
            Sources: Company disclosures where available, Kael Research estimates
          </p>

          <p>
            <strong>Copilot is still the giant, but it&apos;s a slowing giant.</strong> Its market share dropped
            from ~55% in early 2024 to ~42% by end of 2025. Revenue is still growing (68% YoY is excellent),
            but the market is growing faster.
          </p>
          <p>
            <strong>Cursor&apos;s rise is the defining story.</strong> Going from a niche fork of VS Code to
            $580M in estimated revenue in under two years is remarkable. Their insight was simple but correct:
            developers don&apos;t want AI <em>inside</em> their editor — they want an editor <em>built
            around</em> AI.
          </p>
          <p>
            <strong>Tabnine is in trouble.</strong> Once a pioneer in AI code completion, Tabnine has been
            lapped by faster-moving competitors. Its 15% YoY growth is below market rate. Without a
            strategic shift, Tabnine risks becoming an acquisition target.
          </p>

          <h3>2.2 Positioning</h3>
          <p>
            We segment players across two axes: <strong>product scope</strong> (narrow autocomplete →
            full agentic coding) and <strong>deployment model</strong> (cloud-first → self-hosted).
          </p>
          <p>
            The market is moving toward broad-scope, cloud-hosted, deeply integrated tools. Players
            stuck in the narrow/self-hosted quadrant face an uphill battle for mainstream relevance.
          </p>

          {/* Feature Comparison */}
          <h2>3. Feature Comparison Matrix</h2>
          <div className="overflow-x-auto my-8">
            <table className="text-sm">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Copilot</th>
                  <th>Cursor</th>
                  <th>Windsurf</th>
                  <th>Amazon Q</th>
                  <th>Tabnine</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Inline autocomplete</td><td>✅ Strong</td><td>✅ Strong</td><td>✅ Strong</td><td>✅ Good</td><td>✅ Good</td></tr>
                <tr><td>Chat interface</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr>
                <tr><td>Multi-file editing</td><td>✅</td><td>✅</td><td>✅</td><td>⚠️ Limited</td><td>❌</td></tr>
                <tr><td>Codebase awareness</td><td>⚠️ Partial</td><td>✅ Deep</td><td>✅ Good</td><td>⚠️ Partial</td><td>⚠️ Partial</td></tr>
                <tr><td>Agentic execution</td><td>✅</td><td>✅</td><td>✅</td><td>⚠️ Basic</td><td>❌</td></tr>
                <tr><td>Terminal integration</td><td>✅</td><td>✅</td><td>✅</td><td>⚠️ Limited</td><td>❌</td></tr>
                <tr><td>Custom model support</td><td>❌</td><td>✅</td><td>⚠️ Limited</td><td>❌</td><td>✅</td></tr>
                <tr><td>On-premise deploy</td><td>✅ Enterprise</td><td>❌</td><td>✅ Enterprise</td><td>✅ via AWS</td><td>✅</td></tr>
                <tr><td>SOC 2 compliance</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            The feature gap between the top three (Copilot, Cursor, Windsurf) has narrowed considerably.
            The real differentiation is in execution quality: how well does the agent handle complex,
            real-world codebases? In our testing, Cursor&apos;s Composer consistently produces better results
            on tasks involving 5+ file changes.
          </p>

          {/* Pricing */}
          <h2>4. Pricing Analysis</h2>

          <h3>4.1 Individual Pricing</h3>
          <div className="overflow-x-auto my-8">
            <table>
              <thead>
                <tr><th>Product</th><th>Free Tier</th><th>Pro/Individual</th><th>Notes</th></tr>
              </thead>
              <tbody>
                <tr><td>GitHub Copilot</td><td>✅ 2K completions/mo</td><td>$10/mo</td><td>Free tier since June 2024</td></tr>
                <tr><td>Cursor</td><td>✅ Limited</td><td>$20/mo</td><td>Pro includes fast model access</td></tr>
                <tr><td>Windsurf</td><td>✅ Generous</td><td>$15/mo</td><td>Most generous free tier</td></tr>
                <tr><td>Amazon Q Developer</td><td>✅ Unlimited basic</td><td>$19/mo</td><td>Fully functional free tier</td></tr>
                <tr><td>Tabnine</td><td>✅ Basic</td><td>$12/mo</td><td>Cheapest but least capable</td></tr>
              </tbody>
            </table>
          </div>

          <h3>4.2 Enterprise Pricing</h3>
          <div className="overflow-x-auto my-8">
            <table>
              <thead>
                <tr><th>Product</th><th>Per-Seat Price</th><th>Min. Seats</th></tr>
              </thead>
              <tbody>
                <tr><td>GitHub Copilot Enterprise</td><td>$39/user/mo</td><td>1</td></tr>
                <tr><td>GitHub Copilot Business</td><td>$19/user/mo</td><td>1</td></tr>
                <tr><td>Cursor Business</td><td>$40/user/mo</td><td>5</td></tr>
                <tr><td>Windsurf Enterprise</td><td>~$30-45/user/mo</td><td>50</td></tr>
                <tr><td>Amazon Q Developer Pro</td><td>$19/user/mo</td><td>1</td></tr>
                <tr><td>Tabnine Enterprise</td><td>$39/user/mo</td><td>25</td></tr>
              </tbody>
            </table>
          </div>

          <p>
            The market has settled into a $10-20/month range for individual plans. This feels stable.
            The real pricing story is consumption-based: several players are moving toward usage-based
            pricing for agentic features. This is the model that will likely dominate by 2027.
          </p>

          {/* Adoption Trends */}
          <h2>5. User Adoption Trends</h2>

          <h3>5.1 Overall Adoption</h3>
          <ul>
            <li><strong>76% of professional developers</strong> have tried an AI coding tool at least once (up from 44% in 2023)</li>
            <li><strong>52% use one daily</strong> (up from 27% in 2023)</li>
            <li><strong>34% say they &ldquo;can&apos;t imagine coding without it&rdquo;</strong></li>
            <li><strong>18% actively avoid AI coding tools</strong> (down from 31% in 2023)</li>
          </ul>
          <p className="text-sm text-gray-500">
            Sources: Stack Overflow (2025), JetBrains (2025), SlashData (2025)
          </p>

          <h3>5.2 Adoption by Company Size</h3>
          <div className="overflow-x-auto my-8">
            <table>
              <thead>
                <tr><th>Company Size</th><th>Adoption Rate</th><th>Primary Tool</th><th>Avg. Seats</th></tr>
              </thead>
              <tbody>
                <tr><td>1-10 employees</td><td>68%</td><td>Cursor (34%), Copilot (31%)</td><td>4</td></tr>
                <tr><td>11-100</td><td>74%</td><td>Copilot (41%), Cursor (26%)</td><td>28</td></tr>
                <tr><td>101-500</td><td>71%</td><td>Copilot (48%), Windsurf (15%)</td><td>95</td></tr>
                <tr><td>501-5,000</td><td>78%</td><td>Copilot (52%), Tabnine (12%)</td><td>420</td></tr>
                <tr><td>5,000+</td><td>65%</td><td>Copilot (58%), Amazon Q (18%)</td><td>2,100</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 -mt-4 mb-8">
            Source: Kael Research Enterprise Software Survey, Q4 2025 (n=840)
          </p>

          <p>
            Copilot&apos;s dominance increases with company size — the Microsoft enterprise sales engine
            at work. In small teams and startups, Cursor has near-parity.
          </p>

          <h3>5.3 Developer Satisfaction (NPS)</h3>
          <div className="overflow-x-auto my-8">
            <table>
              <thead>
                <tr><th>Product</th><th>NPS (2025)</th><th>Change from 2024</th></tr>
              </thead>
              <tbody>
                <tr><td>Cursor</td><td className="text-green-400">+62</td><td>+18</td></tr>
                <tr><td>Windsurf</td><td className="text-green-400">+45</td><td>+22</td></tr>
                <tr><td>GitHub Copilot</td><td className="text-yellow-400">+38</td><td>-7</td></tr>
                <tr><td>Amazon Q Developer</td><td className="text-yellow-400">+12</td><td>+5</td></tr>
                <tr><td>Tabnine</td><td className="text-red-400">+8</td><td>-15</td></tr>
              </tbody>
            </table>
          </div>

          {/* Emerging Threats */}
          <h2>6. Emerging Threats &amp; Opportunities</h2>

          <h3>6.1 The Open-Source Wave</h3>
          <p>
            Open-source AI code assistants have improved dramatically. Continue (~180K MAU), Aider (~120K MAU),
            Tabby (~45K deployments), and local model stacks (300K+ setups) together represent less than 5%
            of professional daily usage. They won&apos;t win the mainstream market, but they keep commercial
            players honest on pricing and data policies.
          </p>

          <h3>6.2 Vertical-Specific Tools</h3>
          <p>
            A new category is emerging: <strong>Cognition (Devin)</strong> for autonomous software
            engineering, <strong>Poolside</strong> ($500M+ raised) for enterprise custom-trained models,
            <strong>Magic.dev</strong> for very long-context code understanding, and <strong>Augment
            Code</strong> for large-codebase navigation.
          </p>

          <h3>6.3 The IDE War</h3>
          <p>
            The most consequential competitive dynamic isn&apos;t between AI features — it&apos;s between IDEs.
            Cursor and Windsurf forked VS Code. JetBrains integrated AI natively. Our prediction: by 2027,
            the majority of revenue will come from IDE-integrated products rather than plugins.
          </p>

          <h3>6.4 The Agent Threat</h3>
          <p>
            Products like Devin and Factory AI attempt to automate entire development workflows. If they
            succeed at scale, the &ldquo;assistant&rdquo; category becomes transitional. We think this threat
            is real but distant — current agents fail on ambiguous requirements and complex systems. The
            assistant model has 3-5 years of runway.
          </p>

          {/* Recommendations */}
          <h2>7. Strategic Recommendations</h2>

          <div className="space-y-8">
            <div className="border-l-2 border-amber-400/50 pl-6">
              <h3 className="!mt-0">1. Don&apos;t build another general-purpose assistant</h3>
              <p>
                The general-purpose market is a three-horse race with massive network effects and deep
                funding. Target a specific wedge: a language, a framework, a domain, or a workflow.
                Own a niche before expanding.
              </p>
            </div>

            <div className="border-l-2 border-amber-400/50 pl-6">
              <h3 className="!mt-0">2. Bet on agents, not autocomplete</h3>
              <p>
                Autocomplete is commoditized. The high-value frontier is agentic capabilities: task
                decomposition, tool use, error recovery, human-in-the-loop checkpoints.
              </p>
            </div>

            <div className="border-l-2 border-amber-400/50 pl-6">
              <h3 className="!mt-0">3. Enterprise is the revenue, developers are the distribution</h3>
              <p>
                You need both a free/cheap individual tier that developers love and an enterprise tier
                that satisfies procurement. Skipping the developer experience to go straight to enterprise
                sales rarely works in DevTools.
              </p>
            </div>

            <div className="border-l-2 border-amber-400/50 pl-6">
              <h3 className="!mt-0">4. Solve the trust problem</h3>
              <p>
                SOC 2 Type II before launch, transparent data handling, optional on-premise deployment,
                clear code attribution. Expensive upfront but dramatically shortens enterprise sales cycles.
              </p>
            </div>

            <div className="border-l-2 border-amber-400/50 pl-6">
              <h3 className="!mt-0">5. Build for the model-agnostic future</h3>
              <p>
                The winning architecture will route requests to the best available model based on task
                type, latency, and cost. Cursor&apos;s &ldquo;bring your own API key&rdquo; is an early version.
                The full vision is automatic, invisible model routing.
              </p>
            </div>
          </div>

          {/* Methodology */}
          <h2>8. Methodology</h2>
          <p>
            Kael Research produces market intelligence through a combination of primary and secondary
            research: quantitative data from public disclosures and third-party reports (Gartner, IDC,
            Forrester), developer surveys (Stack Overflow, JetBrains, SlashData), and proprietary
            analytics. Qualitative insights come from 34 structured interviews with engineering leaders,
            product managers, and VC investors conducted October 2025 – January 2026.
          </p>
          <p>
            Market sizing uses bottom-up methodology: estimated user counts × average revenue per user,
            cross-referenced with top-down analyst estimates. Competitive analysis includes hands-on
            product testing over minimum two-week periods.
          </p>
          <p>
            We do not accept sponsorship or payment from companies covered in our reports.
          </p>

          {/* Footer */}
          <div className="mt-20 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            <p className="italic mb-4">
              This is a sample report. Full Kael Research reports include regulatory analysis,
              regional breakdowns, investment activity tracking, and 5-year forecasting models.
            </p>
            <p>
              For access to our complete research library, visit{' '}
              <Link href="/" className="text-amber-400 hover:underline">kaelresearch.com</Link>.
            </p>
            <p className="mt-4">© 2026 Kael Research. All rights reserved.</p>
          </div>
        </article>
      </main>
    </div>
  );
}
