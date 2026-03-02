'use client';

import { useEffect } from 'react';

import { animatePageIn } from '~/src/utils/animations';

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return (
    <div>
      <div id="banner-1" className="pointer-events-none fixed inset-0 z-10 h-screen w-1/4 will-change-transform bg-neutral-950" />
      <div id="banner-2" className="pointer-events-none fixed inset-0 z-10 h-screen w-1/4 will-change-transform bg-neutral-950 left-1/4" />
      <div id="banner-3" className="pointer-events-none fixed inset-0 z-10 h-screen w-1/4 will-change-transform bg-neutral-950 left-2/4" />
      <div id="banner-4" className="pointer-events-none fixed inset-0 z-10 h-screen w-1/4 will-change-transform bg-neutral-950 left-3/4" />
      {children}
    </div>
  );
}
