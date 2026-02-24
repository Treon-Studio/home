'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.cursor = 'wait';
    document.body.style.overflow = 'hidden';

    const timeout = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
      {children}
    </>
  );
}
