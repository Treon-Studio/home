'use client';

import { useEffect, useState } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

export default function useScreenSize() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const update = () => setWidth(window.innerWidth);
    update();

    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(update, 150);
    };

    window.addEventListener('resize', debouncedUpdate);
    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(timeoutId);
    };
  }, []);

  return {
    width,
    lessThan: (bp: Breakpoint) => width < breakpoints[bp],
    greaterThan: (bp: Breakpoint) => width >= breakpoints[bp],
  };
}
