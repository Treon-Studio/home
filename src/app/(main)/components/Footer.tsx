'use client';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import FloatingNav from './FloatingNav';

export default function Footer({ children }: { children?: ReactNode }) {
  const t = useTranslations('footer');

  return (
    <>
      <div className="nav sticky bottom-5 z-11 mx-auto mb-5 rounded-full md:fixed md:bottom-8 md:left-1/2 md:mb-0 md:-translate-x-1/2">
        <FloatingNav />
      </div>
      <footer className="z-10 hidden justify-between px-5 pb-4 text-text-primary md:pb-8">
        <div className="flex items-center gap-2">
          <span className="text-xs [&_a]:underline">
            <a
              href="https://fonts.google.com/specimen/Archivo"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm"
            >
              Archivo
            </a>
            {t('pairedWith')}{' '}
            <a
              href="https://fonts.google.com/specimen/Inter"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm"
            >
              Inter
            </a>
          </span>
        </div>

        <div className="text-xs">
          {t('builtBy')}{' '}
          <a
            href="https://treonstudio.com"
            className="rounded-sm underline"
          >
            TreonStudio
          </a>
        </div>
      </footer>
    </>
  );
}
