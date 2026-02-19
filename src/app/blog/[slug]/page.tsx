import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllSlugs, getPostBySlug, getAllPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import ReadingProgress from '@/components/blog/ReadingProgress';
import ShareButtons from '@/components/blog/ShareButtons';
import { MobileTOC, DesktopTOC, type TOCItem } from '@/components/blog/TableOfContents';
import type { ReactNode } from 'react';

const NAVY = '#1B2A4A';
const GOLD = '#C9A84C';

function extractTOC(content: string): TOCItem[] {
  const matches = content.matchAll(/^## (.+)$/gm);
  return [...matches].map((m) => ({
    text: m[1].trim(),
    id: m[1].trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
  }));
}

/* ─── MDX Components ─── */

function TLDRBox({ children }: { children?: ReactNode }) {
  return (
    <div
      className="not-prose rounded-lg px-5 py-4 mb-8 text-[15px] leading-relaxed border"
      style={{
        backgroundColor: 'rgba(201,168,76,0.04)',
        borderColor: 'rgba(201,168,76,0.2)',
        borderLeftWidth: '3px',
        borderLeftColor: GOLD,
      }}
    >
      {children}
    </div>
  );
}

function MDXParagraph({ children }: { children?: ReactNode }) {
  if (children && typeof children === 'object' && Array.isArray(children)) {
    const first = children[0];
    if (first && typeof first === 'object' && 'props' in first && first.props?.children) {
      const text = typeof first.props.children === 'string' ? first.props.children : '';
      if (text.startsWith('TL;DR:')) {
        return <TLDRBox><p className="m-0">{children}</p></TLDRBox>;
      }
    }
  }
  if (children && typeof children === 'string' && children.startsWith('TL;DR:')) {
    return <TLDRBox><p className="m-0">{children}</p></TLDRBox>;
  }
  return <p>{children}</p>;
}

function MDXH2({ children }: { children?: ReactNode }) {
  const text = typeof children === 'string' ? children : String(children ?? '');
  const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  return <h2 id={id} className="scroll-mt-24">{children}</h2>;
}

function ScrollTable({ children }: { children?: ReactNode }) {
  return (
    <div className="relative my-6 -mx-2">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="m-0">{children}</table>
      </div>
    </div>
  );
}

const mdxComponents = {
  p: MDXParagraph,
  h2: MDXH2,
  table: ScrollTable,
};

/* ─── Page ─── */

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
  const tocItems = extractTOC(post.content);

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-white text-[#333] selection:bg-[#C9A84C]/20 selection:text-[#1B2A4A]">
      <ReadingProgress />
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
            author: { '@type': 'Person', name: post.author, url: 'https://linkedin.com/in/kaeltiwari' },
            publisher: { '@type': 'Organization', name: 'Kael Research', url: 'https://kaelresearch.com' },
            mainEntityOfPage: `https://kaelresearch.com/blog/${slug}`,
            keywords: post.tags.join(', '),
          }),
        }}
      />

      {/* Content wrapper — article + TOC sidebar */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 lg:flex lg:gap-0">

        {/* Main article column */}
        <article className="max-w-[680px] mx-auto lg:mx-0 lg:flex-1 min-w-0" id="article-content">

          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-400">
            <Link href="/blog" className="hover:text-gray-600 transition-colors">Blog</Link>
            <span className="mx-2">›</span>
            <span className="text-gray-500 line-clamp-1">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold tracking-[2px] uppercase px-2 py-0.5 rounded border"
                  style={{ color: GOLD, borderColor: 'rgba(201,168,76,0.3)', backgroundColor: 'rgba(201,168,76,0.06)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1
              className="text-[28px] sm:text-[34px] md:text-[40px] font-bold tracking-tight leading-[1.15] mb-5"
              style={{ color: NAVY, fontFamily: 'Georgia, serif' }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400">
              <span className="text-gray-600">{post.author}</span>
              <span>·</span>
              <time dateTime={post.date}>{formattedDate}</time>
              <span>·</span>
              <span>{post.readingTime}</span>
              <span>·</span>
              <span style={{ color: GOLD }}>Updated monthly</span>
            </div>
          </header>

          {/* Mobile TOC */}
          <MobileTOC items={tocItems} />

          {/* MDX body */}
          <div
            className="prose prose-gray max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-[22px] prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-[16px] prose-p:leading-[1.75]
              prose-a:text-[#C9A84C] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#1B2A4A]
              prose-blockquote:border-l-[#C9A84C] prose-blockquote:text-gray-500 prose-blockquote:font-normal
              prose-code:text-[#1B2A4A] prose-code:bg-gray-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[14px] prose-code:font-normal
              prose-table:text-sm prose-th:text-left prose-th:font-semibold prose-th:text-[#1B2A4A] prose-th:bg-gray-50 prose-th:px-3 prose-th:py-2.5 prose-td:px-3 prose-td:py-2 prose-td:border-t prose-td:border-gray-100"
          >
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              components={mdxComponents}
            />
          </div>

          {/* Divider */}
          <div className="mt-14 mb-8 h-px bg-gray-200" />

          {/* Share + Subscribe row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <ShareButtons title={post.title} slug={slug} />
            <a
              href="/#newsletter"
              className="text-xs font-medium hover:underline whitespace-nowrap"
              style={{ color: GOLD }}
            >
              Get monthly updates →
            </a>
          </div>

          {/* Author */}
          <div className="flex items-center gap-4 p-5 rounded-xl bg-[#FAFAFA] border border-gray-100 mb-10">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
              style={{ backgroundColor: NAVY, color: GOLD }}
            >
              K
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-sm" style={{ color: NAVY }}>{post.author}</p>
              <p className="text-xs text-gray-400 mt-0.5">AI market intelligence for investors and founders</p>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="text-center p-8 rounded-xl border border-gray-200 bg-[#FAFAFA]">
            <h3
              className="text-lg font-bold mb-2"
              style={{ color: NAVY, fontFamily: 'Georgia, serif' }}
            >
              Want more analysis like this?
            </h3>
            <p className="text-gray-500 mb-5 text-sm max-w-sm mx-auto">
              Weekly AI market intelligence with sourced data. Free.
            </p>
            <a
              href="/#newsletter"
              className="inline-block text-white px-5 py-2.5 rounded-full text-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD }}
            >
              Subscribe Free
            </a>
          </div>
        </article>

        {/* Desktop TOC sidebar */}
        <DesktopTOC items={tocItems} />
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="max-w-[680px] mx-auto px-6 pb-20">
          <h2
            className="text-xl font-bold mb-6"
            style={{ color: NAVY, fontFamily: 'Georgia, serif' }}
          >
            More from Kael Research
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="block p-5 rounded-xl bg-[#FAFAFA] border border-gray-200 hover:border-gray-300 transition-all group"
              >
                <p className="text-xs text-gray-400 mb-2">
                  {new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {p.readingTime}
                </p>
                <h3
                  className="text-[15px] font-bold leading-snug group-hover:text-[#C9A84C] transition-colors"
                  style={{ color: NAVY }}
                >
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
