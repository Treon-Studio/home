'use client';

import React, {
  ComponentPropsWithoutRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';

import { cn } from '~/src/util';

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: 'spring', stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} layout className="w-full">
      {children}
    </motion.div>
  );
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  /** Milliseconds between each new item appearing */
  delay?: number;
  /** Maximum number of items visible at once */
  maxVisible?: number;
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, maxVisible = 5, ...props }: AnimatedListProps) => {
    const [count, setCount] = useState(0);
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children],
    );

    // Increment forever — no stop condition
    useEffect(() => {
      const timeout = setTimeout(() => {
        setCount((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }, [count, delay]);

    // Always show the last `maxVisible` items, newest on top
    const itemsToShow = useMemo(() => {
      const items: React.ReactElement[] = [];
      const n = Math.min(count + 1, maxVisible);
      for (let i = 0; i < n; i++) {
        const seqNum = count - i;
        const original = childrenArray[seqNum % childrenArray.length] as React.ReactElement;
        // Give each sequence position a stable unique key so framer-motion
        // tracks enter/exit correctly as items cycle through
        items.push(React.cloneElement(original, { key: `item-${seqNum}` }));
      }
      return items;
    }, [count, childrenArray, maxVisible]);

    return (
      <div className={cn('flex w-full flex-col gap-2', className)} {...props}>
        <AnimatePresence>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={item.key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedList.displayName = 'AnimatedList';
