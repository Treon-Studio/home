'use client';

import { motion } from 'framer-motion';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LinkIcon } from '~/src/components/icons';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '~/src/components/ui/Drawer';
import { CoverFlow, type CoverFlowItem } from '~/src/components/ui/CoverFlow';
import Image from '~/src/components/ui/Image';
import Tag from '~/src/components/ui/Tag';
import { WorkPost } from '~/src/lib/works';

function hostname(url: string): string {
  return new URL(url).hostname;
}

function buildContentBlocks(
  contentHtml: string,
  images: string[],
): Array<{ type: 'html'; content: string } | { type: 'image'; src: string }> {
  if (!contentHtml || contentHtml.trim().length === 0) {
    return images.map((src) => ({ type: 'image', src }));
  }

  const sections = contentHtml
    .split(/<hr\s*\/?\s*>/gi)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const blocks: Array<{ type: 'html'; content: string } | { type: 'image'; src: string }> = [];
  let imgIdx = 0;

  const gaps = sections.length > 1 ? sections.length - 1 : 1;
  const imagesPerGap = images.length / gaps;

  for (let i = 0; i < sections.length; i++) {
    blocks.push({ type: 'html', content: sections[i] });

    if (i < sections.length - 1 && imgIdx < images.length) {
      const targetImgCount = Math.round(imagesPerGap * (i + 1));
      while (imgIdx < targetImgCount && imgIdx < images.length) {
        blocks.push({ type: 'image', src: images[imgIdx] });
        imgIdx++;
      }
    }
  }

  while (imgIdx < images.length) {
    blocks.push({ type: 'image', src: images[imgIdx] });
    imgIdx++;
  }

  return blocks;
}

type Props = {
  works: WorkPost[];
};

export default function WorkCoverFlow({ works }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const workSlug = searchParams.get('name');
    if (workSlug) {
      const idx = works.findIndex((w) => w.slug === workSlug);
      if (idx !== -1) {
        setSelectedIndex(idx);
        setDrawerOpen(true);
      }
    }
  }, [searchParams, works]);

  const updateUrl = useCallback(
    (slug: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) {
        params.set('name', slug);
      } else {
        params.delete('name');
      }
      const query = params.toString();
      router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const handleDrawerOpenChange = useCallback(
    (open: boolean) => {
      setDrawerOpen(open);
      if (!open) {
        updateUrl(null);
      }
    },
    [updateUrl],
  );

  const items: CoverFlowItem[] = works.map((work, i) => ({
    id: i + 1,
    image: work.preview,
    title: work.title,
    subtitle: work.tags?.slice(0, 2).join(' / '),
  }));

  // ScrollTrigger: pin section + drive carousel index from page scroll
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section || items.length === 0) return;

    // Scroll distance = 150px per item (tunable)
    const scrollPerItem = 150;
    const totalScroll = scrollPerItem * (items.length - 1);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${totalScroll}`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress; // 0 → 1
        const idx = Math.round(progress * (items.length - 1));
        setScrollIndex(idx);
      },
    });

    triggerRef.current = trigger;

    return () => {
      trigger.kill();
      triggerRef.current = null;
    };
  }, [items.length]);

  const selectedProject = selectedIndex !== null ? works[selectedIndex] : null;

  const contentBlocks = useMemo(() => {
    if (!selectedProject) return [];
    return buildContentBlocks(
      selectedProject.contentHtml || '',
      selectedProject.images || [],
    );
  }, [selectedProject]);

  return (
    <div ref={sectionRef} className="flex h-svh w-full items-center overflow-hidden">
      <Drawer open={drawerOpen} onOpenChange={handleDrawerOpenChange}>
        <CoverFlow
          items={items}
          itemWidth={250}
          itemHeight={300}
          initialIndex={scrollIndex}
          enableReflection={false}
          enableScroll={false}
          scrollThreshold={100}
          onItemClick={(_item, index) => {
            setSelectedIndex(index);
            setDrawerOpen(true);
            updateUrl(works[index].slug);
          }}
        />

        <DrawerContent className="min-h-[95%] max-h-[95%] justify-between gap-0 lg:max-w-[75%]">
          {selectedProject && (
            <>
              <div className="flex-1 overflow-y-auto">
                <div className="mx-auto mb-16 flex max-w-[85%] flex-col gap-8 py-6 sm:max-w-[80%]">
                  <motion.div
                    key={selectedProject.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="flex flex-col gap-3"
                  >
                    <div>
                      <DrawerTitle className="text-lg font-bold leading-tight sm:text-xl">
                        {selectedProject.title}
                      </DrawerTitle>
                      {selectedProject.tagline && (
                        <p className="mt-1 text-sm font-medium opacity-70 sm:text-base">
                          {selectedProject.tagline}
                        </p>
                      )}
                      {selectedProject.description && (
                        <DrawerDescription className="mt-2 text-xs opacity-50 sm:text-sm">
                          {selectedProject.description}
                        </DrawerDescription>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {selectedProject.tags?.map((t) => (
                        <Tag key={t} className="text-xs text-text-secondary">
                          {t}
                        </Tag>
                      ))}
                      {selectedProject.link && (
                        <Tag asChild>
                          <a
                            className="flex items-center gap-1.5 text-xs underline"
                            href={selectedProject.link}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {hostname(selectedProject.link)}
                            <LinkIcon className="h-4 w-4" />
                          </a>
                        </Tag>
                      )}
                    </div>
                  </motion.div>
                  {contentBlocks.map((block, idx) =>
                    block.type === 'html' ? (
                      <motion.div
                        key={`html-${idx}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.3 + idx * 0.05,
                        }}
                        className="work-case-study prose prose-sm prose-neutral dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: block.content }}
                      />
                    ) : (
                      <motion.div
                        key={`img-${idx}`}
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.7,
                          ease: [0.25, 0.46, 0.45, 0.94],
                          delay: 0.3 + idx * 0.05,
                        }}
                        className="relative w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10"
                      >
                        <Image
                          alt={`${selectedProject.title} - ${idx}`}
                          src={block.src}
                          fill
                          className="!static h-full w-full"
                          sizes="(max-width: 768px) 100vw, 700px"
                        />
                      </motion.div>
                    ),
                  )}
                </div>
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
