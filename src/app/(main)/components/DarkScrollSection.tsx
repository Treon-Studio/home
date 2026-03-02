'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

function lerpColor(a: [number, number, number], b: [number, number, number], t: number): string {
  const r = Math.round(a[0] + (b[0] - a[0]) * t);
  const g = Math.round(a[1] + (b[1] - a[1]) * t);
  const bl = Math.round(a[2] + (b[2] - a[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

const BG_FROM: [number, number, number] = [0, 0, 0]; // transparent → black
const TEXT_PRIMARY_FROM: [number, number, number] = [30, 30, 30];
const TEXT_PRIMARY_TO: [number, number, number] = [233, 233, 226];
const TEXT_MUTED_FROM: [number, number, number] = [74, 74, 74];
const TEXT_MUTED_TO: [number, number, number] = [160, 160, 158];

export default function DarkScrollSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 0.2'],
  });

  const applyColors = useCallback((t: number) => {
    const el = ref.current;
    if (!el) return;

    const clamped = Math.min(1, Math.max(0, t));
    el.style.background = `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,${clamped}) 320px, rgba(0,0,0,${clamped}) 100%)`;
    const primary = lerpColor(TEXT_PRIMARY_FROM, TEXT_PRIMARY_TO, clamped);
    const muted = lerpColor(TEXT_MUTED_FROM, TEXT_MUTED_TO, clamped);
    const contrast = lerpColor(TEXT_PRIMARY_TO, TEXT_PRIMARY_FROM, clamped);
    el.style.setProperty('--text-primary', primary);
    el.style.setProperty('--text-muted', muted);
    el.style.setProperty('--text-contrast', contrast);
    el.style.setProperty('--color-text-primary', primary);
    el.style.setProperty('--color-text-muted', muted);
    el.style.setProperty('--color-text-contrast', contrast);
    el.style.color = primary;

  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', applyColors);
    return unsubscribe;
  }, [scrollYProgress, applyColors]);

  return (
    <div
      ref={ref}
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mb-[500px] w-screen pt-80 pb-[500px] px-[calc(50vw-50%+1.25rem)]"
    >
      {children}
    </div>
  );
}
