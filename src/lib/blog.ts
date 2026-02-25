import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';
import { remark } from 'remark';
import html from 'remark-html';

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  description: string;
  contentHtml: string;
};

const window = new JSDOM('').window;
const purify = DOMPurify(window as unknown as Parameters<typeof DOMPurify>[0]);

export function getAllBlogSlugs(): string[] {
  const files = fsSync.readdirSync(blogsDirectory);
  return files.filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogsDirectory, `${slug}.md`);

  if (!fsSync.existsSync(filePath)) return null;

  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = purify.sanitize(processedContent.toString());

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    description: data.description || '',
    contentHtml,
  };
}

export async function getAllBlogs(): Promise<Record<string, BlogPost>> {
  const slugs = getAllBlogSlugs();
  const blogs: Record<string, BlogPost> = {};

  for (const slug of slugs) {
    const post = await getBlogBySlug(slug);
    if (post) {
      blogs[`${slug}.md`] = post;
    }
  }

  return blogs;
}
