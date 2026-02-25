import { Metadata } from 'next';

import ClientRendered from '~/src/components/ClientRendered';
import ViewLogger from '~/src/components/ViewCounter';
import { getAllResources } from '~/src/lib/resources';

import ResourcesGrid from './components/ResourcesGrid';

export const metadata: Metadata = {
  title: 'Resources & Tools | TreonStudio — Creative House from Indonesia',
  description:
    'Kumpulan resource, tools, dan template dari TreonStudio untuk developer, desainer, dan kreator digital Indonesia. Gratis dan open source.',
  keywords: ['developer tools Indonesia', 'free design resources', 'template website gratis', 'TreonStudio resources'],
};

export default async function Shop({ searchParams }: { searchParams: Promise<{ f?: string }> }) {
  const params = await searchParams;
  const allResources = await getAllResources();

  const filteredResources = allResources.filter((r) => {
    if (r.hidden) {
      return false;
    }

    if (!params?.f || params?.f === 'all') {
      return true;
    }

    return r.filters.includes(params.f);
  });

  return (
    <div className="flex flex-1 flex-col">
      <ViewLogger pathname="/shop" />
      <main className="flex-1">
        <ClientRendered>
          <ResourcesGrid resources={filteredResources} />
        </ClientRendered>
      </main>
    </div>
  );
}
