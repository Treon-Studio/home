'use client';

import { useTranslations } from 'next-intl';

import { LogoIcon } from '~/src/components/icons';

import Card from './Card';

export default function BukaCard() {
  const t = useTranslations('buka');

  return (
    <Card className="relative flex h-full flex-col !bg-white !p-0 overflow-hidden">
      <div className="flex-1">
        {/* Speech bubble */}
        <div className="relative rounded-b-2xl bg-[#D8F3DC] p-5">
          <p className="mb-3 font-libertinus-serif text-xs italic text-[#3D1220]/60">
            {t('title')}
          </p>
          <blockquote className="font-semibold leading-[1.3] text-[#3D1220] md:text-lg">
            {t('quote')}
          </blockquote>

          {/* Smooth curved tail */}
          <svg
            className="absolute -bottom-[18px] left-1/3"
            width="40"
            height="22"
            viewBox="0 0 40 22"
            fill="none"
          >
            <path
              d="M0,0 L0,14 Q0,21 7,21 Q20,18 40,0 Z"
              fill="#D8F3DC"
            />
          </svg>
        </div>
      </div>

      {/* Client info */}
      <div className="flex items-center justify-between px-5 pb-5 pt-6">
        <div>
          <p className="text-sm font-semibold text-[#3D1220]">{t('name')}</p>
          <p className="text-xs text-[#3D1220]/60">{t('role')}</p>
        </div>
        <LogoIcon className="h-5 w-5 text-[#3D1220]/30" />
      </div>
    </Card>
  );
}
