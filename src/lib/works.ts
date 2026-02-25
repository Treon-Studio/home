import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { remark } from 'remark';
import html from 'remark-html';

const worksDirectory = path.join(process.cwd(), 'content/works');

export type WorkPost = {
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
  contentHtml: string;
};

const window = new JSDOM('').window;
const purify = DOMPurify(window as unknown as Parameters<typeof DOMPurify>[0]);

export function getAllWorkSlugs(): string[] {
  const files = fsSync.readdirSync(worksDirectory);
  return files.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}

export async function getWorkBySlug(slug: string): Promise<WorkPost | null> {
  const filePath = path.join(worksDirectory, `${slug}.md`);

  if (!fsSync.existsSync(filePath)) return null;

  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = purify.sanitize(processedContent.toString());

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
    contentHtml,
  };
}

export async function getAllWorks(): Promise<WorkPost[]> {
  const slugs = getAllWorkSlugs();
  const works: WorkPost[] = [];

  for (const slug of slugs) {
    const post = await getWorkBySlug(slug);
    if (post) {
      works.push(post);
    }
  }

  return works;
}
