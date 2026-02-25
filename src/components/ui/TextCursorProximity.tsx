'use client';

import React, { CSSProperties, ElementType, forwardRef, useRef, useMemo } from 'react';
import { motion, MotionValue, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';

import { useMousePositionRef } from '~/src/hooks/useMousePositionRef';
import { cn } from '~/src/util';

type CSSPropertiesWithValues = {
  [K in keyof CSSProperties]: string | number;
};

interface StyleValue<T extends keyof CSSPropertiesWithValues> {
  from: CSSPropertiesWithValues[T];
  to: CSSPropertiesWithValues[T];
}

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  as?: ElementType;
  styles: Partial<{
    [K in keyof CSSPropertiesWithValues]: StyleValue<K>;
  }>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential' | 'gaussian';
}

const MAX_CHARS = 200;

function useMotionValueArray(length: number): MotionValue<number>[] {
  const values: MotionValue<number>[] = [];
  for (let i = 0; i < MAX_CHARS; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    values.push(useMotionValue(0));
  }
  return values.slice(0, length);
}

function useTransformedStyles(
  proximity: MotionValue<number>,
  styles: TextProps['styles'],
): Record<string, MotionValue> {
  const entries = Object.entries(styles);
  const transformed: Record<string, MotionValue> = {};

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    transformed[key] = useTransform(proximity, [0, 1], [value!.from, value!.to]);
  }

  return transformed;
}

function AnimatedLetter({
  letter,
  index,
  proximity,
  styles,
  letterRefs,
}: {
  letter: string;
  index: number;
  proximity: MotionValue<number>;
  styles: TextProps['styles'];
  letterRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
}) {
  const transformedStyles = useTransformedStyles(proximity, styles);

  return (
    <motion.span
      ref={(el: HTMLSpanElement | null) => {
        letterRefs.current[index] = el;
      }}
      className="inline-block"
      aria-hidden="true"
      style={transformedStyles}
    >
      {letter}
    </motion.span>
  );
}

const TextCursorProximity = forwardRef<HTMLSpanElement, TextProps>(
  ({ children, as, styles, containerRef, radius = 50, falloff = 'linear', className, ...props }, ref) => {
    const MotionComponent = useMemo(() => motion.create(as ?? 'span'), [as]);
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);

    const text = React.Children.toArray(children).join('');
    const nonSpaceCount = text.replace(/\s/g, '').length;

    const letterProximities = useMotionValueArray(nonSpaceCount);

    const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    const calculateFalloff = (distance: number): number => {
      const normalizedDistance = Math.min(Math.max(1 - distance / radius, 0), 1);

      switch (falloff) {
        case 'exponential':
          return Math.pow(normalizedDistance, 2);
        case 'gaussian':
          return Math.exp(-Math.pow(distance / (radius / 2), 2) / 2);
        case 'linear':
        default:
          return normalizedDistance;
      }
    };

    useAnimationFrame(() => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef || !letterProximities[index]) return;

        const rect = letterRef.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2 - containerRect.left;
        const letterCenterY = rect.top + rect.height / 2 - containerRect.top;

        const distance = calculateDistance(
          mousePositionRef.current.x,
          mousePositionRef.current.y,
          letterCenterX,
          letterCenterY,
        );

        const proximity = calculateFalloff(distance);
        letterProximities[index].set(proximity);
      });
    });

    const words = text.split(' ');
    let letterIndex = 0;

    return (
      <MotionComponent ref={ref} className={cn('', className)} {...props}>
        {words.map((word: string, wordIndex: number) => (
          <span key={wordIndex} className="inline-block" aria-hidden={true}>
            {word.split('').map((letter: string) => {
              const currentLetterIndex = letterIndex++;
              const proximity = letterProximities[currentLetterIndex];

              if (!proximity) return <span key={currentLetterIndex}>{letter}</span>;

              return (
                <AnimatedLetter
                  key={currentLetterIndex}
                  letter={letter}
                  index={currentLetterIndex}
                  proximity={proximity}
                  styles={styles}
                  letterRefs={letterRefs}
                />
              );
            })}
            {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        ))}
        <span className="sr-only">{text}</span>
      </MotionComponent>
    );
  },
);

TextCursorProximity.displayName = 'TextCursorProximity';
export default TextCursorProximity;
