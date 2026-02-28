'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import SneakPeekPhoto from '~/public/home/sneak_peek-3.png';
import { EyeIcon, EyeOffIcon } from '~/src/components/icons';
import CardTitle from '~/src/components/ui/CardTitle';
import Image from '~/src/components/ui/Image';
import { cn } from '~/src/util';

import Card from './Card';

import './cards.css';

import { remap } from '~/src/math';

const PixelatedReveal = dynamic(() => import('./PixelatedReveal'), { ssr: false });

const maxClicks = 5;

const submitClicks = (amount: number) => {
  const params = new URLSearchParams([
    ['pathname', '/#sneak-peek'],
    ['type', 'action'],
  ]).toString();

  return fetch('/api/stats?' + params, {
    method: 'POST',
    body: JSON.stringify({
      amount,
    }),
  });
};

export default function SneakPeekCard({ currentCount }: { currentCount: number }) {
  const t = useTranslations('sneakPeek');
  const [clickCount, setClickCount] = useState(0);
  const cycleClickCount = clickCount % (maxClicks + 1);

  const countRef = useRef(clickCount);
  const submitted = useRef(clickCount);

  const revealed = cycleClickCount === maxClicks;

  useEffect(() => {
    countRef.current = clickCount;
    if (revealed) {
      submitClicks(clickCount - submitted.current).then(() => {
        submitted.current = clickCount;
      });
    }
  }, [revealed, clickCount]);

  useEffect(() => {
    return () => {
      if (countRef.current > submitted.current) {
        submitClicks(countRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    setClickCount((c) => c + 1);
  };

  return (
    <Card className="flex flex-col">
      <CardTitle variant="mono" className="mb-2">
        {t('title')}
      </CardTitle>
      <div className="mb-20 flex items-start justify-between xl:mb-[120px]">
        <div className="font-archivo text-3xl md:text-4xl">
          {t('category')} <br className="hidden md:block" />
          {t('projectName')}
        </div>
      </div>
      <div className="relative flex flex-col gap-4">
                <div className="progress bg-panel-overlay text-text-contrast relative mb-4 rounded-full pr-2">
          <div
            className="progress-bar bg-text-primary absolute h-full min-w-[130px] rounded-full transition-all duration-300"
            style={
              {
                width: `calc(130px + ((100% - 130px) / ${maxClicks}) * ${Math.min(
                  cycleClickCount,
                  maxClicks,
                )})`,
              } as React.CSSProperties
            }
          />
          <button
            className="bg-text-primary text-text-contrast relative flex w-[130px] items-center gap-2 rounded-full px-2 py-[4px] text-sm"
            onClick={handleClick}
          >
            {revealed ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
            {revealed ? t('clickToHide') : t('clickToSee')}
          </button>
          <span
            className={cn(
              'absolute top-[4px] right-2 text-sm transition-all duration-500 ease-out',
              {
                '-translate-x-4 opacity-0': !revealed,
                'translate-x-0 opacity-100': revealed,
              },
            )}
          >
            {currentCount + clickCount} {t('clicks')}
          </span>
        </div>
      </div>

      <div className="relative h-full min-h-[284px] w-full overflow-hidden rounded-md">
        <Image
          src={SneakPeekPhoto}
          alt={t('projectAlt')}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px): 50vw, 284px"
          placeholder="blur"
          style={
            {
              filter: `grayscale(${remap(cycleClickCount, 0, maxClicks, 100, 0)}%) blur(${remap(
                cycleClickCount,
                0,
                maxClicks,
                5,
                0,
              )}px)`,
            } as React.CSSProperties
          }
          className={cn('object-cover object-center transition-all duration-300')}
        />

        <PixelatedReveal step={cycleClickCount} maxSteps={maxClicks} />
      </div>
    </Card>
  );
}
