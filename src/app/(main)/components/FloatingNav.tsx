'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSelectedLayoutSegment } from 'next/navigation';

import useScroll from '~/src/hooks/useScroll';

import './FloatingNav.css';

import { ArrowRightIcon } from '~/src/components/icons';
import { cn } from '~/src/util';

const links = {
  '/work': { label: 'Works' },
  '/': { label: 'About' },
  '/shop': { label: 'Resources' },
  '/contact': { label: 'Contact' },
};

export default function Navbar() {
  const pathSegment = `/${useSelectedLayoutSegment() || ''}` as keyof typeof links;
  const { y } = useScroll();
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [highlight, setHighlight] = useState({ left: 0, width: 0 });

  const updateHighlight = useCallback(() => {
    const nav = navRef.current;
    const activeLink = linkRefs.current.get(pathSegment);
    if (nav && activeLink) {
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setHighlight({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
      });
    }
  }, [pathSegment]);

  useEffect(() => {
    updateHighlight();
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [updateHighlight]);

  return (
    <>
      <nav ref={navRef} className="border-panel-border bg-panel-background shadow-card relative z-1 flex items-center rounded-full border p-1">
        <div
          className="bg-theme-3 absolute h-[90%] rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${highlight.width}px`,
            left: `${highlight.left}px`,
          }}
        />
        {Object.entries(links).map(([path, l]) => (
          <Link
            href={path}
            key={l.label}
            ref={(el) => {
              if (el) linkRefs.current.set(path, el);
            }}
            className="text-text-primary z-1 rounded-full px-4 py-1.5 text-sm text-center"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className={cn(
          'anchor-top absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-300',
          {
            'right-0 opacity-0': y < 50,
            'xs:-right-10 xs:top-1/2 -top-6 right-0': y > 50,
          },
        )}
      >
        <span className="bg-theme-3 relative z-1 flex h-8 w-8 items-center justify-end rounded-full px-2">
          <ArrowRightIcon className="text-text-primary h-6 w-6 -rotate-90" />
        </span>
      </button>
    </>
  );
}
