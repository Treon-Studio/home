'use client';

import { ComponentProps, ReactNode, useEffect, useRef } from 'react';

import HighlightedText, { Controls } from '~/src/components/HighlightedHeading';
import Heading from '~/src/components/ui/Heading';
import { cn } from '~/src/util';

type Line = string | ReactNode;

const staggerMs = 300;

export default function Hheading({ className, ...props }: ComponentProps<'h1'>) {
  const index = useRef(0);
  const textRefs = useRef(new Map<number, Controls>());
  const lines: Line[] = ['Crafting digital', ' experiences'];

  useEffect(() => {
    if (index.current === lines.length) {
      return;
    }
    const interval = setInterval(() => {
      textRefs.current.get(index.current)?.start();
      index.current += 1;
    }, staggerMs);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <Heading className={cn('w-full', className)}>
      {lines.map((l, i) => (
        <HighlightedText
          aria-hidden
          className="font-archivo text-5xl md:text-7xl lg:text-8xl"
          ref={(e) => {
            textRefs.current.set(i, e!);
          }}
          key={i}
        >
          {l}
        </HighlightedText>
      ))}
      <span className="sr-only">Crafting digital experiences</span>
    </Heading>
  );
}
