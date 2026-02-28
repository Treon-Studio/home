'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';

import TextCursorProximity from '~/src/components/ui/TextCursorProximity';

import Card from './Card';

const styles = {
  title: {
    filter: {
      from: 'blur(0px)',
      to: 'blur(8px)',
    },
  },
  details: {
    filter: {
      from: 'blur(0px)',
      to: 'blur(4px)',
    },
  },
};

export default function ColorThemeCard() {
  const t = useTranslations('colorTheme');
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Card className="!p-0 overflow-hidden">
      <div
        ref={containerRef}
        className="flex min-h-[210px] w-full select-none flex-col justify-between bg-[#FF5A00] p-5 text-white"
      >
        <div className="-space-y-2 flex flex-col justify-center uppercase">
          <TextCursorProximity
            className="text-xl font-bold will-change-transform sm:text-2xl md:text-3xl"
            styles={styles.title}
            falloff="gaussian"
            radius={100}
            containerRef={containerRef}
          >
            {t('house')}
          </TextCursorProximity>
          <TextCursorProximity
            className="text-xl font-bold will-change-transform sm:text-2xl md:text-3xl"
            styles={styles.title}
            falloff="gaussian"
            radius={100}
            containerRef={containerRef}
          >
            {t('ofTreon')}
          </TextCursorProximity>
        </div>

        <div className="flex w-full justify-between font-medium">
          <div className="flex w-full flex-col text-xs leading-tight sm:text-sm">
            <TextCursorProximity
              className="text-left"
              styles={styles.details}
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            >
              {t('location')}
            </TextCursorProximity>
            <TextCursorProximity
              className="text-right"
              styles={styles.details}
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            >
              {t('address')}
            </TextCursorProximity>
            <TextCursorProximity
              className="text-left"
              styles={styles.details}
              falloff="exponential"
              radius={70}
              containerRef={containerRef}
            >
              {t('contactInfo')}
            </TextCursorProximity>
          </div>
        </div>
      </div>
    </Card>
  );
}
