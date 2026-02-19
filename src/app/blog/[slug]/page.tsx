import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllSlugs, getPostBySlug, getAllPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

const NAVY = '#1B2A4A';
const GOLD = '#C9A84C';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Kael Research`,
    description: post.description,
    alternates: { canonical: `https://kaelresearch.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://kaelresearch.com/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      siteName: 'Kael Research',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !post.published) notFound();

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-white text-[#333] selection:bg-[#C9A84C]/20 selection:text-[#1B2A4A]">
      <Header />

      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: {
              '@type': 'Person',
              name: post.author,
              url: 'https://linkedin.com/in/kaeltiwari',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Kael Research',
              url: 'https://kaelresearch.com',
            },
            mainEntityOfPage: `https://kaelresearch.com/blog/${slug}`,
            keywords: post.tags.join(', '),
          }),
        }}
      />

      <article className="max-w-3xl mx-auto px-6 pt-28 pb-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/blog" className="hover:text-gray-600 transition-colors">
            Blog
          </Link>
          <span className="mx-2">→</span>
          <span className="text-gray-500">{post.title}</span>
        </nav>

        {/* Post header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {post.tags.map((tag) => (
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
          </div>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight"
            style={{ color: NAVY, fontFamily: 'Georgia, serif' }}
          >
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formattedDate}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-6 w-full h-px bg-gray-200" />
        </header>

        {/* MDX content */}
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#1B2A4A] prose-blockquote:border-l-[#C9A84C] prose-blockquote:text-gray-600 prose-code:text-[#1B2A4A] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-table:text-sm prose-th:text-left prose-th:font-semibold prose-th:text-[#1B2A4A] prose-td:py-2"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </div>

        {/* Author + CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-[#FAFAFA] border border-gray-200">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0"
              style={{ backgroundColor: NAVY, color: GOLD }}
            >
              K
            </div>
            <div>
              <p className="font-bold" style={{ color: NAVY }}>
                {post.author}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                CEO at Kael Research. Writes about AI markets, model economics, and where the money is going.
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 text-center p-10 rounded-2xl border border-gray-200 bg-[#FAFAFA]">
          <h3
            className="text-xl font-bold mb-3"
            style={{ color: NAVY, fontFamily: 'Georgia, serif' }}
          >
            Want more analysis like this?
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
            Weekly AI market intelligence — sourced data, not summaries. Free.
          </p>
          <a
            href="/#newsletter"
            className="inline-block text-white px-6 py-3 rounded-full font-medium transition-opacity hover:opacity-90 text-sm"
            style={{ backgroundColor: GOLD }}
          >
            Subscribe Free
          </a>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <h2
            className="text-2xl font-bold mb-8"
            style={{ color: NAVY, fontFamily: 'Georgia, serif' }}
          >
            More from Kael Research
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="block p-6 rounded-2xl bg-[#FAFAFA] border border-gray-200 hover:border-gray-300 transition-all hover:shadow-md group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-gray-400">
                    {new Date(p.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-xs text-gray-400">· {p.readingTime}</span>
                </div>
                <h3
                  className="text-lg font-bold mb-2 group-hover:text-[#C9A84C] transition-colors"
                  style={{ color: NAVY }}
                >
                  {p.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
