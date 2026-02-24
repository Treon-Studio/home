'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

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

import { projects, type StaticProject } from '../constants';

const staticProjects = projects.filter(
  (p): p is StaticProject & { hidden?: boolean } => !p.hidden && p.type !== 'component',
);

const items: CoverFlowItem[] = staticProjects.map((project, i) => ({
  id: i + 1,
  image: project.preview.src,
  title: project.title,
  subtitle: project.tags?.slice(0, 2).join(' / '),
}));

function hostname(url: string): string {
  return new URL(url).hostname;
}

export default function WorkCoverFlow() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedProject = selectedIndex !== null ? staticProjects[selectedIndex] : null;

  return (
    <div className="flex h-[calc(100svh-240px)] w-full items-center overflow-hidden">
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <CoverFlow
          items={items}
          itemWidth={250}
          itemHeight={300}
          initialIndex={3}
          enableReflection={false}
          enableScroll={true}
          scrollThreshold={100}
          onItemClick={(_item, index) => {
            setSelectedIndex(index);
            setDrawerOpen(true);
          }}
        />

        <DrawerContent className="min-h-[95%] max-h-[95%] justify-between gap-4 lg:max-w-[75%]">
          {selectedProject && (
            <>
              <div className="mx-auto flex w-[85%] flex-col gap-2 pt-4">
                <DrawerTitle className="text-sm font-semibold leading-tight">
                  {selectedProject.title}
                </DrawerTitle>
                {selectedProject.description && (
                  <DrawerDescription className="text-xs opacity-50">
                    {selectedProject.description}
                  </DrawerDescription>
                )}
                <div className="flex flex-wrap items-center gap-2">
                  {selectedProject.tags?.map((t) => (
                    <Tag key={t} className="text-sm text-text-secondary">
                      {t}
                    </Tag>
                  ))}
                  {selectedProject.link && (
                    <Tag asChild>
                      <a
                        className="flex items-center gap-2 text-sm underline"
                        href={selectedProject.link}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {hostname(selectedProject.link)}
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
                      {selectedProject.images?.map((image, imgIndex) => (
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
                            alt={`${selectedProject.title} - ${imgIndex + 1}`}
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
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
