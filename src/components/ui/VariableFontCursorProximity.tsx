'use client';

import { ReactNode, RefObject, useCallback, useEffect, useRef } from 'react';

import { cn } from '~/src/util';
import { useMousePositionRef } from '~/src/hooks/useMousePositionRef';

function parseFontVariationSettings(settings: string): Record<string, number> {
  const result: Record<string, number> = {};
  const pairs = settings.split(',').map((s) => s.trim());
  for (const pair of pairs) {
    const match = pair.match(/'([^']+)'\s+([-\d.]+)/);
    if (match) {
      result[match[1]] = parseFloat(match[2]);
    }
  }
  return result;
}

function interpolateSettings(
  from: Record<string, number>,
  to: Record<string, number>,
  t: number,
): string {
  return Object.keys(from)
    .map((key) => {
      const fromVal = from[key] ?? 0;
      const toVal = to[key] ?? fromVal;
      const value = fromVal + (toVal - fromVal) * t;
      return `'${key}' ${value}`;
    })
    .join(', ');
}

type Props = {
  children: ReactNode;
  className?: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  radius?: number;
  falloff?: 'linear' | 'gaussian' | 'exponential';
  containerRef?: RefObject<HTMLElement | null>;
};

export default function VariableFontCursorProximity({
  children,
  className,
  fromFontVariationSettings,
  toFontVariationSettings,
  radius = 200,
  falloff = 'linear',
  containerRef,
}: Props) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mousePos = useMousePositionRef(containerRef);
  const frameRef = useRef<number>(undefined);

  const fromSettings = parseFontVariationSettings(fromFontVariationSettings);
  const toSettings = parseFontVariationSettings(toFontVariationSettings);

  const getFalloff = useCallback(
    (distance: number): number => {
      if (distance >= radius) return 0;
      const normalized = 1 - distance / radius;
      switch (falloff) {
        case 'gaussian':
          return Math.exp(-((distance * distance) / (2 * (radius / 3) * (radius / 3))));
        case 'exponential':
          return Math.pow(normalized, 2);
        default:
          return normalized;
      }
    },
    [radius, falloff],
  );

  const update = useCallback(() => {
    const { x, y } = mousePos.current;

    charRefs.current.forEach((charEl) => {
      if (!charEl) return;

      const rect = charEl.getBoundingClientRect();
      const containerRect = containerRef?.current?.getBoundingClientRect();

      let charX: number, charY: number;
      if (containerRect) {
        charX = rect.left - containerRect.left + rect.width / 2;
        charY = rect.top - containerRect.top + rect.height / 2;
      } else {
        charX = rect.left + rect.width / 2;
        charY = rect.top + rect.height / 2;
      }

      const distance = Math.sqrt((x - charX) ** 2 + (y - charY) ** 2);
      const t = getFalloff(distance);

      charEl.style.fontVariationSettings = interpolateSettings(fromSettings, toSettings, t);
    });

    frameRef.current = requestAnimationFrame(update);
  }, [mousePos, getFalloff, fromSettings, toSettings, containerRef]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(update);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [update]);

  const text = typeof children === 'string' ? children : '';
  const chars = text.split('');

  return (
    <span ref={elementRef} className={cn(className)}>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            charRefs.current[i] = el;
          }}
          style={{ fontVariationSettings: fromFontVariationSettings }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
