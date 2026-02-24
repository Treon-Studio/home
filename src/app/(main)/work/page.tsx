import { Metadata } from 'next';

import ClientRendered from '~/src/components/ClientRendered';
import ViewLogger from '~/src/components/ViewCounter';

import WorkCoverFlow from './components/WorkCoverFlow';

export const metadata: Metadata = {
  title: 'Portfolio & Produk | TreonStudio — Jasa Web & Mobile Development Jakarta',
  description:
    'Lihat portfolio TreonStudio — dari Trenzo (market research), Investrack (investor relations), hingga Munaqadh (donasi). Jasa pembuatan website, aplikasi mobile, dan design system di Jakarta, Indonesia.',
  keywords: ['portfolio TreonStudio', 'jasa pembuatan website Jakarta', 'contoh website company profile', 'jasa bikin aplikasi mobile', 'Trenzo', 'Investrack'],
};

export default function Work() {
  return (
    <div className="flex flex-1 flex-col">
      <ViewLogger pathname="/work" />
      <main className="flex-1">
        <ClientRendered>
          <WorkCoverFlow />
        </ClientRendered>
      </main>
    </div>
  );
}
