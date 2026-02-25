import { useEffect, useState } from 'react';

import usePrevious from './usePrevious';

type ScrollValues = {
  x: number;
  y: number;
};

type ScrollState = ScrollValues & {
  directionY: 'up' | 'down';
};

const listenerOptions = {
  passive: true,
};

const getScrollValues = (el: HTMLElement | Window): ScrollValues => {
  if ('scrollX' in el) {
    return {
      x: el.scrollX,
      y: el.scrollY,
    };
  } else if ('scrollLeft' in el) {
    return {
      x: el.scrollLeft,
      y: el.scrollTop,
    };
  }
  return {
    x: 0,
    y: 0,
  };
};

export default function useScroll(root?: HTMLElement): ScrollState {
  const [scroll, setScroll] = useState({ x: 0, y: 0 });
  const prevScrollY = usePrevious(scroll.y);

  useEffect(() => {
    const target = root || window;
    let rafId = 0;
    let ticking = false;

    const updateScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          setScroll(getScrollValues(target!));
          ticking = false;
        });
      }
    };

    if (target) {
      setScroll(getScrollValues(target));
      target.addEventListener('scroll', updateScroll, listenerOptions);
    }

    return () => {
      if (target) {
        target.removeEventListener('scroll', updateScroll);
      }
      cancelAnimationFrame(rafId);
    };
  }, [root]);

  return {
    ...scroll,
    directionY: (prevScrollY || -1) < scroll.y ? 'down' : 'up',
  };
}
