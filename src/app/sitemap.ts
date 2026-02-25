import { MetadataRoute } from 'next';

import { getAllWorkSlugs } from '~/src/lib/works';
import { getAllResourceSlugs } from '~/src/lib/resources';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_HOST || 'https://treonstudio.com';

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2025-02-18'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date('2025-02-18'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2025-02-18'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date('2025-02-18'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/stamps`,
      lastModified: new Date('2025-02-18'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const workSlugs = getAllWorkSlugs();
  const projectPages: MetadataRoute.Sitemap = workSlugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date('2025-02-18'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const resourceSlugs = getAllResourceSlugs();
  const resourcePages: MetadataRoute.Sitemap = resourceSlugs.map((slug) => ({
    url: `${baseUrl}/shop/${slug}`,
    lastModified: new Date('2025-02-18'),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...projectPages, ...resourcePages];
}
