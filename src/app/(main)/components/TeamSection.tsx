'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

import ScrollAndSwapText from '~/src/components/ui/ScrollAndSwapText';
import VerticalCutReveal from '~/src/components/ui/VerticalCutReveal';

type SectionData = {
  sticker: string;
  stickerSize?: number;
  descriptionKey: string;
  items: { name: string; roleKey: string }[];
  layout?: 'list' | 'cloud';
};

const sections: SectionData[] = [
  {
    sticker: '/home/cat-smile.png',
    descriptionKey: 'section1Description',
    items: [
      { name: 'Muhammad Ridho', roleKey: 'creative' },
      { name: 'Rizky Ananda', roleKey: 'engineer' },
      { name: 'Fajar Nugraha', roleKey: 'engineer' },
      { name: 'Dwi Kartika', roleKey: 'designer' },
      { name: 'Andi Pratama', roleKey: 'engineer' },
      { name: 'Siti Nurhaliza', roleKey: 'designer' },
      { name: 'Budi Santoso', roleKey: 'engineer' },
      { name: 'Putri Ayu', roleKey: 'creative' },
      { name: 'Reza Firmansyah', roleKey: 'engineer' },
      { name: 'Nadia Safitri', roleKey: 'designer' },
      { name: 'Arif Rahman', roleKey: 'engineer' },
      { name: 'Dian Purnama', roleKey: 'creative' },
      { name: 'Yoga Permana', roleKey: 'engineer' },
      { name: 'Lestari Dewi', roleKey: 'designer' },
      { name: 'Hendra Wijaya', roleKey: 'engineer' },
    ],
  },
  {
    sticker: '/home/insight.png',
    stickerSize: 180,
    descriptionKey: 'section2Description',
    items: [
      { name: 'Ahmad Fauzi', roleKey: 'strategy' },
      { name: 'Diana Kusuma', roleKey: 'business' },
      { name: 'Rahmat Hidayat', roleKey: 'technology' },
    ],
  },
  {
    sticker: '/home/cat-smile.png',
    layout: 'cloud',
    descriptionKey: 'section3Description',
    items: [
      { name: 'Banua Dev', roleKey: 'community' },
      { name: 'Emroa', roleKey: 'hospitality' },
      { name: 'Bird New Media', roleKey: 'media' },
      { name: 'Kalografi', roleKey: 'creative' },
      { name: 'Raion Digital', roleKey: 'agency' },
    ],
  },
];

function LogoCloud({ items, isInView }: { items: { name: string; role: string }[]; isInView: boolean }) {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const totalPages = Math.ceil(items.length / perPage);
  const currentItems = items.slice(page * perPage, page * perPage + perPage);

  useEffect(() => {
    if (!isInView || totalPages <= 1) return;
    const interval = setInterval(() => {
      setPage((p) => (p + 1) % totalPages);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView, totalPages]);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid min-h-[80px] grid-cols-3 gap-x-12 md:gap-x-16">
        <AnimatePresence mode="wait">
          {currentItems.map(({ name, role }, index) => (
            <motion.div
              key={`${page}-${index}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              className="flex flex-col items-center justify-center gap-1"
            >
              <span className="text-center text-lg font-bold tracking-tight md:text-xl">{name}</span>
              <span className="text-text-muted text-xs uppercase tracking-wider">{role}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SectionBlock({ sticker, stickerSize, description, items, layout }: {
  sticker: string;
  stickerSize?: number;
  description: string;
  items: { name: string; role: string }[];
  layout?: 'list' | 'cloud';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="mb-24 last:mb-0">
      <div ref={ref} className="mb-20 flex flex-col items-center">
        <Image
          src={sticker}
          alt=""
          width={stickerSize || 120}
          height={stickerSize || 120}
          className="mb-4 object-contain"
        />
        <div className="max-w-lg text-center text-base leading-relaxed md:text-lg">
          <VerticalCutReveal
            containerClassName="justify-center"
            splitBy="words"
            staggerDuration={0.08}
            staggerFrom="first"
            autoStart={isInView}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 21,
            }}
          >
            {description}
          </VerticalCutReveal>
        </div>
      </div>

      {layout === 'cloud' ? (
        <LogoCloud items={items} isInView={isInView} />
      ) : (
        <div className="flex flex-col items-center justify-center text-2xl leading-none uppercase sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {items.map(({ name, role }, index) => (
            <div key={index} className="flex flex-col items-center md:block md:relative">
              <ScrollAndSwapText
                offset={['0 1', '0.5 0.5']}
                className="font-bold leading-tight"
              >
                {name}
              </ScrollAndSwapText>
              <span className="text-text-muted text-[10px] font-medium uppercase tracking-wider sm:text-xs md:absolute md:top-2.5 md:left-full md:ml-2 md:text-sm md:whitespace-nowrap">
                ({role})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TeamSection() {
  const t = useTranslations('team');

  return (
    <section className="relative px-6 py-16 text-text-primary">
      {sections.map((section, index) => (
        <SectionBlock
          key={index}
          sticker={section.sticker}
          stickerSize={section.stickerSize}
          description={t(section.descriptionKey)}
          items={section.items.map((item) => ({
            name: item.name,
            role: t(item.roleKey),
          }))}
          layout={section.layout}
        />
      ))}
    </section>
  );
}
