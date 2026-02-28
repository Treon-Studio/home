'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import GooeySvgFilter from '~/src/components/ui/GooeySvgFilter';
import useMatchMedia from '~/src/hooks/useMatchMedia';

import BlogDrawer, { type BlogData } from './BlogDrawer';
import Card from './Card';

const TAB_KEYS = ['engineering', 'design', 'inside'] as const;

const TAB_FILES = [
  ['trenzo-v2-launch.md', 'investrack-redesign.md', 'munaqadh-payment.md', 'radas-toolkit.md'],
  ['trenzo-mvp.md', 'kopod-first-episode.md', 'muslimfy-beta.md', 'design-system-v1.md'],
  ['treonstudio-founded.md', 'first-client-project.md', 'brand-identity.md', 'team-building.md'],
];

export default function SkewedStampsCard({ blogs = {} }: { blogs?: Record<string, BlogData> }) {
  const t = useTranslations('stamps');
  const [activeTab, setActiveTab] = useState(0);
  const mobile = useMatchMedia('(max-width: 768px)', false);
  const [isSafari, setIsSafari] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <>
    <Card className="!p-0 overflow-hidden">
      <div className="relative flex h-full flex-col p-5 font-sans text-xs sm:text-sm md:text-base">
        <GooeySvgFilter id="gooey-filter" strength={mobile ? 8 : 15} />

        <div className="relative w-full flex-1">
          <div className="absolute inset-0 flex flex-col" style={{ filter: 'url(#gooey-filter)' }}>
            <div className="flex w-full">
              {TAB_KEYS.map((_, index) => (
                <div key={index} className="relative h-8 flex-1 md:h-10">
                  {activeTab === index && (
                    <motion.div
                      layoutId="active-gooey-tab"
                      className="absolute inset-0 bg-[#efefef]"
                      transition={{
                        type: 'spring',
                        bounce: 0.0,
                        duration: isSafari ? 0 : 0.4,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="w-full flex-1 overflow-hidden bg-[#efefef] text-text-secondary">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="p-5 md:p-8"
                >
                  <div className="mt-2 space-y-2 sm:mt-4">
                    <ul>
                      {TAB_FILES[activeTab].map((file) => (
                        <li
                          key={file}
                          role="button"
                          tabIndex={0}
                          className="border-b border-text-secondary/20 pt-2 pb-1 text-text-primary cursor-pointer hover:text-theme-1 transition-colors"
                          onClick={() => {
                            setSelectedFile(file);
                            setDrawerOpen(true);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedFile(file);
                              setDrawerOpen(true);
                            }
                          }}
                        >
                          {file}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="relative flex w-full">
            {TAB_KEYS.map((key, index) => (
              <button key={index} onClick={() => setActiveTab(index)} className="h-8 flex-1 md:h-10">
                <span
                  className={`flex h-full w-full items-center justify-center ${
                    activeTab === index ? 'text-text-primary' : 'text-text-secondary'
                  }`}
                >
                  {t(key)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
    <BlogDrawer open={drawerOpen} onOpenChange={setDrawerOpen} fileName={selectedFile} blogs={blogs} />
    </>
  );
}
