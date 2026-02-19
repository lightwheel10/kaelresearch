import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — Kael Research',
  description: 'AI market intelligence, model pricing analysis, and industry research for investors and founders.',
  alternates: { canonical: 'https://kaelresearch.com/blog' },
  openGraph: {
    title: 'Blog — Kael Research',
    description: 'AI market intelligence, model pricing analysis, and industry research.',
    url: 'https://kaelresearch.com/blog',
    type: 'website',
  },
};

const NAVY = '#1B2A4A';
const GOLD = '#C9A84C';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#333] selection:bg-[#C9A84C]/20 selection:text-[#1B2A4A]">
      <Header />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-16 text-center">
          <div className="mb-6">
            <span
              className="inline-block px-3 py-1 text-[10px] font-bold tracking-[3px] uppercase rounded border"
              style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.4)', backgroundColor: 'rgba(201,168,76,0.06)' }}
            >
              Blog
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
            style={{ color: NAVY, fontFamily: 'Georgia, serif' }}
          >
            Research &amp; Analysis
          </h1>
          <div className="mx-auto my-6 w-16 h-px" style={{ backgroundColor: GOLD }} />
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Data-driven analysis of AI markets, model economics, and industry trends. Every claim sourced, every number verified.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">First post coming soon.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-8 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md group"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold tracking-[2px] uppercase px-2 py-0.5 rounded border"
                      style={{
                        color: GOLD,
                        borderColor: 'rgba(201,168,76,0.4)',
                        backgroundColor: 'rgba(201,168,76,0.06)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-xs text-gray-400">· {post.readingTime}</span>
                </div>
                <h2
                  className="text-2xl font-bold mb-3 group-hover:text-[#C9A84C] transition-colors"
                  style={{ color: NAVY, fontFamily: 'Georgia, serif' }}
                >
                  {post.title}
                </h2>
                <p className="text-gray-500 leading-relaxed mb-4">{post.description}</p>
                <span className="inline-block text-sm font-medium" style={{ color: GOLD }}>
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 text-center p-10 rounded-2xl border border-gray-200 bg-white">
          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: NAVY, fontFamily: 'Georgia, serif' }}
          >
            Get weekly AI market analysis
          </h3>
          <p className="text-gray-500 mb-6 max-w-lg mx-auto">
            Every week we break down one AI market with sourced data and specific takeaways. Free.
          </p>
          <a
            href="/#newsletter"
            className="inline-block text-white px-6 py-3 rounded-full font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            Subscribe Free
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
