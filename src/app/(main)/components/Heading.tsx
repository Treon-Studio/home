'use client';

import { ComponentProps, ReactNode, useEffect, useRef } from 'react';

import HighlightedText, { Controls } from '~/src/components/HighlightedHeading';
import Heading from '~/src/components/ui/Heading';
import MediaBetweenText from '~/src/components/ui/MediaBetweenText';
import useScreenSize from '~/src/hooks/useScreenSize';
import { cn } from '~/src/util';

type Line = string | ReactNode;

const staggerMs = 300;

export default function Hheading({ className, ...props }: ComponentProps<'h1'>) {
  const index = useRef(0);
  const textRefs = useRef(new Map<number, Controls>());
  const screenSize = useScreenSize();

  const lines: Line[] = [
    <MediaBetweenText
      key="media-line"
      firstText="Crafting ("
      secondText=") digital"
      mediaUrl="/home/workspace.png"
      mediaType="image"
      triggerType="hover"
      mediaContainerClassName={cn(
        'overflow-hidden mx-1 mt-1 sm:mx-2 sm:mt-2 rounded-lg',
        screenSize.lessThan('sm') ? 'h-[30px]' : 'h-[70px]',
      )}
      className="cursor-pointer"
      animationVariants={{
        initial: { width: 0 },
        animate: {
          width: screenSize.lessThan('sm') ? '40px' : '100px',
          transition: { duration: 0.4, type: 'spring', bounce: 0 },
        },
      }}
    />,
    ' experiences',
  ];

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
          className="font-archivo text-4xl lg:text-8xl"
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
