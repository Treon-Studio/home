'use client';

import { ComponentProps, ReactNode, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

import HighlightedText, { Controls } from '~/src/components/HighlightedHeading';
import Heading from '~/src/components/ui/Heading';
import { cn } from '~/src/util';

const staggerMs = 300;

export default function HomeHeading({ className, ...props }: ComponentProps<'h1'>) {
  const t = useTranslations('heading');
  const index = useRef(0);
  const textRefs = useRef(new Map<number, Controls>());
  const lines: (string | ReactNode)[] = [t('line1'), t('line2')];

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
      <span className="sr-only">{t('srOnly')}</span>
    </Heading>
  );
}
