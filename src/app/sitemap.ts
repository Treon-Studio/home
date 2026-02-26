import { MetadataRoute } from 'next';

import { getAllWorkSlugs } from '~/src/lib/works';
import { getAllResourceSlugs } from '~/src/lib/resources';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_HOST || 'https://treonstudio.com';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/stamps`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const workSlugs = getAllWorkSlugs();
  const projectPages: MetadataRoute.Sitemap = workSlugs.map((slug) => ({
    url: `${baseUrl}/works/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const resourceSlugs = getAllResourceSlugs();
  const resourcePages: MetadataRoute.Sitemap = resourceSlugs.map((slug) => ({
    url: `${baseUrl}/resources/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...projectPages, ...resourcePages];
}
