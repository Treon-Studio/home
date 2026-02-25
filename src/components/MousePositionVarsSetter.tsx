'use client';

import { useEffect, useRef } from 'react';

export const relativeMouseClassname = 'relative-mouse';

export default function MousePositionVarsSetter() {
  const cachedElements = useRef<{ el: HTMLElement; bcr: DOMRect }[]>([]);
  const rafId = useRef(0);

  useEffect(() => {
    let dirty = true;

    const observer = new MutationObserver(() => {
      dirty = true;
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const handler = ({ clientX, clientY }: MouseEvent) => {
      if (dirty) {
        const elements = document.querySelectorAll('.' + relativeMouseClassname);
        cachedElements.current = Array.from(elements).map((el) => ({
          el: el as HTMLElement,
          bcr: el.getBoundingClientRect(),
        }));
        dirty = false;
      }

      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        for (const { el } of cachedElements.current) {
          const bcr = el.getBoundingClientRect();
          const x = clientX - bcr.left;
          const y = clientY - bcr.top;

          el.style.setProperty('--mouse-x', `${x}px`);
          el.style.setProperty('--mouse-y', `${y}px`);
        }
      });
    };

    window.addEventListener('mousemove', handler, { passive: true });

    const scrollHandler = () => {
      dirty = true;
    };
    window.addEventListener('scroll', scrollHandler, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handler);
      window.removeEventListener('scroll', scrollHandler);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  return null;
}
