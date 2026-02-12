import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://kaelresearch.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://kaelresearch.com/sample', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]
}
