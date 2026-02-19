'use client';

import { ReactNode, useState } from 'react';
import { motion, TargetAndTransition } from 'framer-motion';
import Image from 'next/image';

import { cn } from '~/src/util';

type MediaBetweenTextProps = {
  firstText: string;
  secondText: string;
  mediaUrl: string;
  mediaType?: 'image' | 'video';
  triggerType?: 'hover' | 'click' | 'always';
  mediaContainerClassName?: string;
  mediaContainerStyle?: React.CSSProperties;
  mediaClassName?: string;
  mediaStyle?: React.CSSProperties;
  className?: string;
  decorations?: ReactNode;
  animationVariants?: {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
  };
};

export default function MediaBetweenText({
  firstText,
  secondText,
  mediaUrl,
  mediaType = 'image',
  triggerType = 'hover',
  mediaContainerClassName,
  mediaContainerStyle,
  mediaClassName,
  mediaStyle,
  className,
  decorations,
  animationVariants = {
    initial: { width: 0 },
    animate: {
      width: '100px',
      transition: { duration: 0.4, type: 'spring', bounce: 0 },
    },
  },
}: MediaBetweenTextProps) {
  const [isActive, setIsActive] = useState(triggerType === 'always');

  const triggerProps =
    triggerType === 'hover'
      ? {
          onMouseEnter: () => setIsActive(true),
          onMouseLeave: () => setIsActive(false),
        }
      : triggerType === 'click'
        ? { onClick: () => setIsActive((prev) => !prev) }
        : {};

  return (
    <span
      className={cn(className)}
      style={{ WebkitTextFillColor: 'inherit', backgroundClip: 'inherit', WebkitBackgroundClip: 'inherit', background: 'inherit' }}
      {...triggerProps}
    >
      {firstText}
      <motion.span
        className={cn('inline-block align-middle', mediaContainerClassName)}
        style={{ WebkitTextFillColor: 'initial', background: 'none', ...mediaContainerStyle }}
        initial={animationVariants.initial}
        animate={isActive ? animationVariants.animate : animationVariants.initial}
        transition={{ duration: 0.4, type: 'spring', bounce: 0 }}
      >
        {mediaType === 'image' ? (
          <Image
            src={mediaUrl}
            alt=""
            width={400}
            height={300}
            className={cn('h-full w-full object-cover', mediaClassName)}
            style={mediaStyle}
            unoptimized
          />
        ) : (
          <video src={mediaUrl} autoPlay loop muted playsInline className={cn('h-full w-full object-cover', mediaClassName)} style={mediaStyle} />
        )}
        {decorations}
      </motion.span>
      {secondText}
    </span>
  );
}
