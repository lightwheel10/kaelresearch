import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://kaelresearch.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://kaelresearch.com/briefs', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://kaelresearch.com/brief/ai-code-assistants', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://kaelresearch.com/sample', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://kaelresearch.com/unsubscribe', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.1 },
  ]
}
