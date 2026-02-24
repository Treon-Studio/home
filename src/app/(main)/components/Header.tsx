'use client';

import Link from 'next/link';
import { ReactNode, useRef } from 'react';

import { LogoIcon } from '~/src/components/icons';
import VariableFontCursor from '~/src/components/ui/VariableFontCursor';
import useScroll from '~/src/hooks/useScroll';
import { cn } from '~/src/util';

import ThemeSwitcher from './ThemeSwitcher';

const headerTriggerY = 50;

export default function Header({ children }: { children?: ReactNode }) {
  const { y, directionY } = useScroll();
  const logoRef = useRef<HTMLAnchorElement>(null);

  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex flex-wrap justify-between rounded-bl-[32px] rounded-br-[32px] px-5 py-4 transition-all duration-300 ease-in-out',
        {
          'translate-y-[-128px]': y > headerTriggerY && directionY === 'down',
        },
      )}
    >
      <div className="absolute inset-0 z-[-1] rounded-bl-[32px] rounded-br-[32px] backdrop-blur mask-[linear-gradient(to_top,transparent,black_65%)]" />
      <Link
        ref={logoRef}
        href="/"
        className="flex items-center gap-2 rounded-full text-text-primary"
        aria-label="Go to Home page"
      >
        <LogoIcon
          className={cn('text-[#FF5A00] transition-all duration-300', {
            'text-theme-1': y > headerTriggerY,
          })}
        />
        <VariableFontCursor
          className="hidden pr-1 font-archivo md:inline"
          fontVariationMapping={{
            y: { name: 'wght', min: 100, max: 900 },
            x: { name: 'wdth', min: 75, max: 125 },
          }}
          containerRef={logoRef}
          radius={150}
        >
          TreonStudio
        </VariableFontCursor>
      </Link>
      {children && (
        <div className="order-3 mt-4 w-full lg:order-0 lg:mt-0 lg:w-auto">{children}</div>
      )}
      <ThemeSwitcher />
    </header>
  );
}
