'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import { LinkIcon } from '~/src/components/icons';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '~/src/components/ui/Drawer';
import Image from '~/src/components/ui/Image';
import Tag from '~/src/components/ui/Tag';
import { useViewLogger } from '~/src/components/ViewCounter';
import useMatchMedia from '~/src/hooks/useMatchMedia';
import { ResourcePost } from '~/src/lib/resources';
import { cn } from '~/src/util';

import Card from '../../work/components/Card';

function hostname(url: string): string {
  return new URL(url).hostname;
}

type Props = {
  resources: ResourcePost[];
};

export default function ResourcesGrid({ resources }: Props) {
  const titleRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const mobile = useMatchMedia('(max-width: 768px)', false);
  const containerRef = useRef<HTMLDivElement>(null);

  function setTitleHeight(i: number) {
    cardRefs.current
      .get(i)
      ?.style.setProperty(
        '--title-height',
        titleRefs.current.get(i)?.clientHeight?.toString() || '0',
      );
  }

  useEffect(() => {
    cardRefs.current.forEach((_, i) => {
      setTitleHeight(i);
    });
  }, []);

  const [openResource, setOpenResource] = useState<string>('');
  useViewLogger(openResource);

  return (
    <div className="flex-1 px-5 py-10" ref={containerRef}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 750: 2, 900: 3 }}>
        <Masonry gutter={mobile ? '0.5rem' : '1rem'}>
          {resources.map((resource, i) => (
            <Drawer
              key={resource.slug}
              onOpenChange={(open) => {
                if (open) {
                  setOpenResource(resource.slug);
                }
              }}
            >
              <DrawerContent className="min-h-[95%] max-h-[95%] justify-between gap-4 lg:max-w-[75%]">
                <div className="mx-auto flex w-[85%] flex-col gap-2 pt-4">
                  <DrawerTitle className="text-sm font-semibold leading-tight">
                    {resource.title}
                  </DrawerTitle>
                  {resource.description && (
                    <DrawerDescription className="text-xs opacity-50">
                      {resource.description}
                    </DrawerDescription>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    {resource.tags?.map((t) => (
                      <Tag key={t} className="text-sm text-text-secondary">
                        {t}
                      </Tag>
                    ))}
                    {resource.link && (
                      <Tag asChild>
                        <a
                          className="flex items-center gap-2 text-sm underline"
                          href={resource.link}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {hostname(resource.link)}
                          <LinkIcon className="h-5 w-5" />
                        </a>
                      </Tag>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="mx-auto mb-16 flex max-w-[85%] flex-col">
                    <AnimatePresence mode="wait">
                      <div className="flex w-full flex-col gap-8">
                        {resource.images?.map((image, imgIndex) => (
                          <motion.div
                            key={imgIndex}
                            initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                            transition={{
                              duration: 1,
                              ease: 'easeOut',
                              delay: 0.25,
                            }}
                            className="relative w-full overflow-hidden rounded-3xl"
                          >
                            <Image
                              alt={`${resource.title} - ${imgIndex + 1}`}
                              src={image}
                              fill
                              className="!static h-full w-full"
                              sizes="(max-width: 768px) 100vw, 700px"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </AnimatePresence>
                  </div>
                </div>
              </DrawerContent>
              <DrawerTrigger asChild disabled={!resource.images?.length}>
                <motion.button
                  key={resource.slug}
                  initial={{ translateY: 75, opacity: 0 }}
                  animate={{ translateY: 0, opacity: 1 }}
                  exit={{ translateY: 75, opacity: 0 }}
                  transition={{
                    ease: 'easeOut',
                    duration: 0.5,
                    delay: i * 0.1,
                  }}
                  onAnimationComplete={() => setTitleHeight(i)}
                  className={cn('relative flex w-full rounded-lg text-left md:rounded-2xl', {
                    group: !resource.hidden,
                    'group/hidden cursor-default': resource.hidden,
                  })}
                  style={{ aspectRatio: resource.aspect || 'initial' }}
                >
                  <Card
                    ref={(e) => {
                      cardRefs.current.set(i, e!);
                    }}
                    containerClassName="h-full w-full"
                    className="h-full w-full overflow-hidden"
                  >
                    <div className="h-full w-full translate-y-0 overflow-hidden rounded transition-all duration-300 group-hover:translate-y-[calc(var(--title-height)*-1px)] group-focus-visible:translate-y-[calc(var(--title-height)*-1px)] md:rounded-lg">
                      <div className="relative h-full w-full translate-y-0 overflow-hidden rounded transition-all duration-300 group-hover:translate-y-[calc(var(--title-height)*1px)] group-hover/hidden:blur-[2px] group-focus-visible:translate-y-[calc(var(--title-height)*1px)] group-focus-visible/hidden:blur-[2px] md:rounded-xl">
                        <Image
                          alt={resource.title}
                          src={resource.preview}
                          quality={100}
                          fill
                          className="object-cover object-top group-hover/hidden:opacity-50 group-focus-visible/hidden:opacity-50"
                          sizes="(max-width: 900px): 50vw, (max-width: 1200px) 33vw, 420px"
                          priority={i < 3}
                        />
                      </div>
                    </div>
                    <div
                      className="title absolute bottom-0 left-0 w-full translate-y-full rounded-tl-md rounded-tr-md p-2 px-3 text-text-primary transition-all duration-300 group-hover:translate-y-[-4px] group-focus-visible:translate-y-[-4px]"
                      ref={(e) => {
                        titleRefs.current.set(i, e!);
                      }}
                    >
                      {resource.title}
                    </div>
                    <Tag className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-xs opacity-0 transition-all duration-300 group-hover/hidden:opacity-100 group-focus-visible/hidden:opacity-100 sm:text-sm">
                      Coming Soon
                    </Tag>
                  </Card>
                </motion.button>
              </DrawerTrigger>
            </Drawer>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
