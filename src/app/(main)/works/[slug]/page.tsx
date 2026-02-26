import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import DynamicVHVarsSetter from '~/src/components/DynamicVHVarsSetter';
import { LinkIcon } from '~/src/components/icons';
import MousePositionVarsSetter from '~/src/components/MousePositionVarsSetter';
import Heading from '~/src/components/ui/Heading';
import Image from '~/src/components/ui/Image';
import Tag from '~/src/components/ui/Tag';
import ViewLogger from '~/src/components/ViewCounter';
import { getAllWorks, getAllWorkSlugs, getWorkBySlug } from '~/src/lib/works';

import Divider from '../components/Divider';
import PaginationCard from './components/PaginationCard';

function hostname(url: string): string {
  return new URL(url).hostname;
}

function intersection<T>(a: T[] = [], b: T[] = []): T[] {
  const s1 = new Set(b);
  return a.filter((x) => s1.has(x));
}

export async function generateStaticParams() {
  const slugs = getAllWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getWorkBySlug(slug);

  if (!project) return {};

  const title = `${project.title} | TreonStudio — Creative House from Indonesia`;
  const description = project.description
    || `Proyek ${project.title} oleh TreonStudio — creative house dari Jakarta, Indonesia.`;

  const url = `https://treonstudio.com/works/${slug}`;

  return {
    title,
    description,
    keywords: [
      project.title,
      ...project.tags,
      'TreonStudio',
      'portfolio',
      'proyek digital Indonesia',
    ],
    alternates: { canonical: `/works/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      images: project.preview ? [{ url: project.preview, width: 1200, height: 630, alt: project.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: project.preview ? [project.preview] : undefined,
    },
  };
}

export default async function Work({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = await getWorkBySlug(slug);

  if (!project || (project.hidden && process.env.NODE_ENV !== 'development')) {
    notFound();
  }

  const allWorks = await getAllWorks();
  const visibleWorks = allWorks.filter((w) => !w.hidden);

  const associatedProjects = visibleWorks.filter(
    (p) => intersection(p.tags, project.tags).length > 0,
  );
  const projectIndex = associatedProjects.findIndex((p) => p.slug === project.slug);
  const previousProject = projectIndex > 0 ? associatedProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < associatedProjects.length - 1 ? associatedProjects[projectIndex + 1] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: project.title,
    description: project.description,
    image: project.preview ? `https://treonstudio.com${project.preview}` : undefined,
    url: `https://treonstudio.com/works/${project.slug}`,
    author: {
      '@type': 'Organization',
      name: 'TreonStudio',
      url: 'https://treonstudio.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TreonStudio',
      logo: { '@type': 'ImageObject', url: 'https://treonstudio.com/favicon.ico' },
    },
    keywords: project.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewLogger pathname={`/works/${project.slug}`} />
      <DynamicVHVarsSetter />
      <MousePositionVarsSetter />
      <div className="flex-1 px-5 py-10 [html:has(&)_footer>*:not(.nav)]:invisible">
        <Heading className="mb-2 max-w-xl text-left text-5xl">{project.title}</Heading>
        <p className="max-w-xl text-left">{project.description}</p>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center ">
          {project.tags.length > 0 && (
            <div className="justify-left flex flex-wrap gap-2">
              {project.tags.map((t, i) => (
                <Tag key={i} className="text-sm">
                  {t}
                </Tag>
              ))}
            </div>
          )}
          {project.link && (
            <Tag asChild>
              <a
                className="flex items-center gap-2 text-sm"
                href={project.link}
                target="_blank"
                rel="noreferrer noopener"
              >
                {hostname(project.link)}
                <LinkIcon className="h-5 w-5" />
              </a>
            </Tag>
          )}
        </div>

        {project.contentHtml && (
          <div
            className="prose prose-neutral dark:prose-invert mt-12 max-w-xl"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />
        )}

        {project.images.length > 0 && (
          <div className="mt-[80px] flex flex-col gap-2 md:gap-4">
            {project.images.map((image, i) => (
              <div key={i} className="max-h-[700px] flex-1 [&:only-child_img]:object-cover">
                <Image
                  priority={i === 0}
                  src={image}
                  alt={`${project.title} - ${i + 1}`}
                  fill
                  className="!static m-auto max-h-full w-full object-cover"
                  sizes="(max-width: 1360px) 100vw, 1360px"
                />
              </div>
            ))}
          </div>
        )}

        <Divider className="mt-24 text-center text-sm">{project.title}</Divider>
        <div className="m-auto mt-20 flex max-w-3xl flex-col gap-9">
          {previousProject || nextProject ? (
            <Heading className="text-center text-4xl" as="h2">
              Explore other projects
            </Heading>
          ) : null}
          <div className="flex flex-col justify-center gap-6 md:flex-row md:*:max-w-[400px]">
            {previousProject && (
              <Link href={`/works/${previousProject.slug}`} className="flex-1 rounded-xl">
                <PaginationCard direction="left" project={previousProject} />
              </Link>
            )}
            {nextProject && (
              <Link href={`/works/${nextProject.slug}`} className="flex-1 rounded-xl">
                <PaginationCard direction="right" project={nextProject} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
