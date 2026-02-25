import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import matter from 'gray-matter';

const resourcesDirectory = path.join(process.cwd(), 'content/resources');

export type ResourcePost = {
  slug: string;
  title: string;
  description: string;
  filters: string[];
  tags: string[];
  link: string;
  aspect: number;
  preview: string;
  images: string[];
  hidden: boolean;
};

export function getAllResourceSlugs(): string[] {
  const files = fsSync.readdirSync(resourcesDirectory);
  return files.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}

export async function getResourceBySlug(slug: string): Promise<ResourcePost | null> {
  const filePath = path.join(resourcesDirectory, `${slug}.md`);

  if (!fsSync.existsSync(filePath)) return null;

  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data } = matter(fileContents);

  return {
    slug: data.slug || slug,
    title: data.title || slug,
    description: data.description || '',
    filters: data.filters || [],
    tags: data.tags || [],
    link: data.link || '',
    aspect: data.aspect ?? 1,
    preview: data.preview || '',
    images: data.images || [],
    hidden: data.hidden ?? false,
  };
}

export async function getAllResources(): Promise<ResourcePost[]> {
  const slugs = getAllResourceSlugs();
  const resources: ResourcePost[] = [];

  for (const slug of slugs) {
    const post = await getResourceBySlug(slug);
    if (post) {
      resources.push(post);
    }
  }

  return resources;
}
