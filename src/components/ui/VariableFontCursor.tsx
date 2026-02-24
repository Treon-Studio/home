'use client';

import { ElementType, useCallback, useRef } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

import { useMousePositionRef } from '~/src/hooks/useMousePositionRef';
import { cn } from '~/src/util';

interface FontVariationAxis {
  name: string;
  min: number;
  max: number;
}

interface FontVariationMapping {
  x: FontVariationAxis;
  y: FontVariationAxis;
}

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: ElementType;
  fontVariationMapping: FontVariationMapping;
  containerRef: React.RefObject<HTMLElement | null>;
  /** Activation radius in pixels around the container. Effect fades in within this range. */
  radius?: number;
  /** Lerp factor per frame (0–1). Lower = smoother/slower transition. */
  smoothing?: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function VariableFontCursor({
  children,
  as = 'span',
  fontVariationMapping,
  className,
  containerRef,
  radius = 120,
  smoothing = 0.12,
  ...props
}: Props) {
  const mousePositionRef = useMousePositionRef(containerRef);
  const spanRef = useRef<HTMLSpanElement>(null);

  // Smoothed values for lerp
  const currentX = useRef(
    (fontVariationMapping.x.min + fontVariationMapping.x.max) / 2,
  );
  const currentY = useRef(
    (fontVariationMapping.y.min + fontVariationMapping.y.max) / 2,
  );

  const defaultX = (fontVariationMapping.x.min + fontVariationMapping.x.max) / 2;
  const defaultY = (fontVariationMapping.y.min + fontVariationMapping.y.max) / 2;

  const getTargetValues = useCallback(
    (mx: number, my: number) => {
      const container = containerRef.current;
      if (!container) return { xValue: defaultX, yValue: defaultY, influence: 0 };

      const w = container.clientWidth;
      const h = container.clientHeight;

      // Distance from container bounds (0 if inside)
      const dx = Math.max(0, -mx, mx - w);
      const dy = Math.max(0, -my, my - h);
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 1 when inside, fades to 0 at radius edge
      const influence = Math.max(0, 1 - distance / radius);

      // Cursor-driven values (clamped to container)
      const xProgress = Math.min(Math.max(mx / w, 0), 1);
      const yProgress = Math.min(Math.max(my / h, 0), 1);

      const activeX =
        fontVariationMapping.x.min +
        (fontVariationMapping.x.max - fontVariationMapping.x.min) * xProgress;
      const activeY =
        fontVariationMapping.y.min +
        (fontVariationMapping.y.max - fontVariationMapping.y.min) * yProgress;

      // Blend between default and active based on proximity
      const xValue = defaultX + (activeX - defaultX) * influence;
      const yValue = defaultY + (activeY - defaultY) * influence;

      return { xValue, yValue, influence };
    },
    [fontVariationMapping, containerRef, radius, defaultX, defaultY],
  );

  useAnimationFrame(() => {
    if (!spanRef.current) return;

    const { xValue, yValue } = getTargetValues(
      mousePositionRef.current.x,
      mousePositionRef.current.y,
    );

    // Smooth lerp towards target
    currentX.current = lerp(currentX.current, xValue, smoothing);
    currentY.current = lerp(currentY.current, yValue, smoothing);

    spanRef.current.style.fontVariationSettings = `'${fontVariationMapping.x.name}' ${currentX.current}, '${fontVariationMapping.y.name}' ${currentY.current}`;
  });

  const MotionComponent = motion.create(as);

  return (
    <MotionComponent className={cn(className)} ref={spanRef} {...props}>
      {children}
    </MotionComponent>
  );
}
