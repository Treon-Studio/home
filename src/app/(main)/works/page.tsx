import { Metadata } from 'next';

import ClientRendered from '~/src/components/ClientRendered';
import ViewLogger from '~/src/components/ViewCounter';
import { getAllWorks } from '~/src/lib/works';

import ElasticGrid from './components/ElasticGrid';
import WorkCoverFlow from './components/WorkCoverFlow';

export const metadata: Metadata = {
  title: 'Portfolio & Produk | TreonStudio — Jasa Web & Mobile Development Jakarta',
  description:
    'Lihat portfolio TreonStudio — dari Radas, Investrack, hingga Grandecoco. Jasa pembuatan website, aplikasi mobile, dan design system di Jakarta, Indonesia.',
  keywords: ['portfolio TreonStudio', 'jasa pembuatan website Jakarta', 'contoh website company profile', 'jasa bikin aplikasi mobile', 'Radas', 'Investrack'],
  alternates: { canonical: '/works' },
  openGraph: {
    title: 'Portfolio & Produk | TreonStudio',
    description: 'Lihat portfolio TreonStudio — 20+ proyek digital untuk brand, startup, dan enterprise di Indonesia.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Produk | TreonStudio',
    description: 'Lihat portfolio TreonStudio — 20+ proyek digital untuk brand, startup, dan enterprise di Indonesia.',
  },
};

export default async function Work() {
  const allWorks = await getAllWorks();
  const works = allWorks.filter((w) => !w.hidden);

  return (
    <div className="flex flex-1 flex-col">
      <ViewLogger pathname="/works" />
      <main className="flex-1">
        <ClientRendered>
          <WorkCoverFlow works={works} />
        </ClientRendered>
        <ClientRendered>
          <ElasticGrid works={works} />
        </ClientRendered>
      </main>
    </div>
  );
}
