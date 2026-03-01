'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LinkIcon } from '~/src/components/icons';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '~/src/components/ui/Drawer';
import ImageComponent from '~/src/components/ui/Image';
import Tag from '~/src/components/ui/Tag';
import { WorkPost } from '~/src/lib/works';

import './ElasticGrid.css';

// ──────────────── Configuration ────────────────
const LAG_BASE = 20;       // Base parallax offset (px) for outermost columns
const LAG_SCALE = 15;      // Additional offset per column distance from center
const MIN_SCALE_X = 0.7;
const MAX_SCALE_Y = 1.7;
const SCROLL_SENSITIVITY = 4000; // px/sec for full squeeze effect
const VELOCITY_THRESHOLD = 700;  // Dead-zone

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

export default function ElasticGrid({ works }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleDrawerOpenChange = useCallback((open: boolean) => {
    setDrawerOpen(open);
  }, []);

  const handleItemClick = useCallback((index: number) => {
    setSelectedIndex(index);
    setDrawerOpen(true);
  }, []);

  // Distribute works into columns (React-side, no DOM manipulation)
  const columns = useMemo(() => {
    // Repeat works to fill grid
    const repeated: { work: WorkPost; originalIndex: number }[] = [];
    const targetCount = Math.max(60, works.length);
    for (let i = 0; i < targetCount; i++) {
      const idx = i % works.length;
      repeated.push({ work: works[idx], originalIndex: idx });
    }

    // Distribute into 7 columns (desktop) — CSS handles responsive column count
    const colCount = 7;
    const cols: { work: WorkPost; originalIndex: number }[][] = Array.from(
      { length: colCount },
      () => [],
    );
    repeated.forEach((item, i) => {
      cols[i % colCount].push(item);
    });
    return cols;
  }, [works]);

  // ──────────────── GSAP: Parallax + Squeeze ────────────────
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const grid = gridRef.current;
    if (!grid) return;

    const colCount = columns.length;
    const mid = (colCount - 1) / 2;
    const triggers: ScrollTrigger[] = [];

    // Per-column parallax: outer columns move more
    columnRefs.current.forEach((col, i) => {
      if (!col) return;
      const distance = Math.abs(i - mid);
      const yOffset = LAG_BASE + distance * LAG_SCALE;

      const tween = gsap.fromTo(
        col,
        { y: yOffset },
        {
          y: -yOffset,
          ease: 'none',
          scrollTrigger: {
            trigger: grid,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5 + distance * 0.15, // Outer columns lag more
          },
        },
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    // Squeeze effect: track scroll velocity
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let velocity = 0;
    let rafId: number;

    function updateSqueeze() {
      const now = performance.now();
      const dt = (now - lastTime) / 1000; // seconds
      const dy = window.scrollY - lastScrollY;

      if (dt > 0) {
        const instantVel = dy / dt; // px/sec
        // Smooth the velocity
        velocity += (instantVel - velocity) * 0.3;
      }

      lastScrollY = window.scrollY;
      lastTime = now;

      const absVel = Math.abs(velocity);
      const vRaw = Math.max(0, absVel - VELOCITY_THRESHOLD);
      const v = Math.min(vRaw / SCROLL_SENSITIVITY, 1);

      const si = 1 + (MIN_SCALE_X - 1) * v;
      const sy = 1 + (MAX_SCALE_Y - 1) * v;
      const to = velocity < 0 ? '50% 0%' : '50% 100%';

      grid!.style.setProperty('--si', String(si));
      grid!.style.setProperty('--sy', String(sy));
      grid!.style.setProperty('--to', to);

      rafId = requestAnimationFrame(updateSqueeze);
    }

    rafId = requestAnimationFrame(updateSqueeze);

    return () => {
      cancelAnimationFrame(rafId);
      triggers.forEach((t) => t.kill());
    };
  }, [columns.length]);

  const selectedProject = selectedIndex !== null ? works[selectedIndex] : null;

  const contentBlocks = useMemo(() => {
    if (!selectedProject) return [];
    return buildContentBlocks(
      selectedProject.contentHtml || '',
      selectedProject.images || [],
    );
  }, [selectedProject]);

  return (
    <Drawer open={drawerOpen} onOpenChange={handleDrawerOpenChange}>
      <div ref={gridRef} className="elastic-grid">
        {columns.map((colItems, colIdx) => (
          <div
            key={colIdx}
            ref={(el) => { columnRefs.current[colIdx] = el; }}
            className="elastic-grid__column"
          >
            {colItems.map((item, itemIdx) => (
              <figure
                key={`${colIdx}-${itemIdx}`}
                className="elastic-grid__item"
                onClick={() => handleItemClick(item.originalIndex)}
              >
                <div
                  className="elastic-grid__item-img"
                  style={{ backgroundImage: `url(${item.work.preview})` }}
                />
                <figcaption className="elastic-grid__item-caption">
                  {item.work.title}
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>

      <DrawerContent className="min-h-[95%] max-h-[95%] justify-between gap-0 lg:max-w-[75%]">
        {selectedProject && (
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
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.05 }}
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
                    <ImageComponent
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
        )}
      </DrawerContent>
    </Drawer>
  );
}
