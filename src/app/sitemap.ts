import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const blogEntries = posts.map((post) => ({
    url: `https://kaelresearch.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: 'https://kaelresearch.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://kaelresearch.com/blog', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://kaelresearch.com/briefs', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://kaelresearch.com/brief/ai-code-assistants', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://kaelresearch.com/brief/ai-agents', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ...blogEntries,
    { url: 'https://kaelresearch.com/sample', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://kaelresearch.com/unsubscribe', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.1 },
  ]
}
