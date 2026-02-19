import { Metadata } from 'next';

import ClientRendered from '~/src/components/ClientRendered';
import ViewLogger from '~/src/components/ViewCounter';

import ProjectsGrid from './components/ProjectsGrid';
import { Filter, projects } from './constants';

export const metadata: Metadata = {
  title: 'Portfolio & Produk | TreonStudio — Jasa Web & Mobile Development Jakarta',
  description:
    'Lihat portfolio TreonStudio — dari Trenzo (market research), Investrack (investor relations), hingga Munaqadh (donasi). Jasa pembuatan website, aplikasi mobile, dan design system di Jakarta, Indonesia.',
  keywords: ['portfolio TreonStudio', 'jasa pembuatan website Jakarta', 'contoh website company profile', 'jasa bikin aplikasi mobile', 'Trenzo', 'Investrack'],
};

export default async function Work({ searchParams }: { searchParams: Promise<{ f?: Filter }> }) {
  const params = await searchParams;
  const filteredProjects = projects.filter((p) => {
    if (p.hidden) {
      return false;
    }

    if (!params?.f || params?.f === 'all') {
      return true;
    }

    return p?.filters.includes(params?.f);
  });

  return (
    <div className="flex flex-1 flex-col">
      <ViewLogger pathname="/work" />
      <main className="flex-1">
        {/* todo: hotfix, remove client rendered */}
        <ClientRendered>
          <ProjectsGrid projects={filteredProjects} />
        </ClientRendered>
      </main>
    </div>
  );
}
