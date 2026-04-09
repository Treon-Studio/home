import { Metadata } from 'next';

import { cn, preloadImage } from '~/src/util';

import Description from './components/Description';
import Stamps from './components/Stamps';
import SVGFilters from './components/SVGFilters';
import { collections, CollectionType } from './constants';

import './page.css';

export const metadata: Metadata = {
  title: 'Digital Stamps Collection | TreonStudio — Koleksi Perangko Digital',
  description:
    'Koleksi perangko digital TreonStudio — reinterpretasi perangko vintage sebagai seni digital. Eksplorasi tipografi, sejarah, dan desain dalam format modern.',
  keywords: [
    'digital stamps',
    'koleksi perangko digital',
    'vintage stamps art',
    'TreonStudio stamps',
    'philately digital',
    'seni perangko Indonesia',
  ],
  alternates: { canonical: '/stamps' },
  openGraph: {
    title: 'Digital Stamps Collection | TreonStudio',
    description:
      'Koleksi perangko digital — reinterpretasi perangko vintage sebagai seni digital. Eksplorasi tipografi, sejarah, dan desain.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Stamps Collection | TreonStudio',
    description:
      'Koleksi perangko digital — reinterpretasi perangko vintage sebagai seni digital. Eksplorasi tipografi, sejarah, dan desain.',
  },
};

const preloadCollection = (collection: CollectionType) => {
  collections[collection].stamps.forEach((stamp) => {
    preloadImage(stamp.src);
  });
};

export default function Page() {
  preloadCollection('typographic');

  return (
    <div
      className={cn(
        'stamps-page grain grid min-h-svh grid-cols-1 grid-rows-[auto_auto] gap-10 overflow-clip bg-stone-100  lg:h-screen lg:max-h-screen lg:grid-cols-[minmax(auto,600px)_1fr] lg:grid-rows-1 lg:gap-x-6 lg:pl-10 xl:gap-x-10',
      )}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `:root{background:#f5f5f4 !important;}`,
        }}
      />
      <div className="overflow-y-auto overflow-x-clip scrollbar-thin scrollbar-track-stone-100 scrollbar-thumb-stone-300">
        <Description className="mx-auto max-w-xl px-4 pt-4 lg:pb-10 lg:pt-5" />
      </div>
      <Stamps />

      <SVGFilters className="pointer-events-none absolute" />
    </div>
  );
}
