'use client';

import { useTranslations } from 'next-intl';

import Card from './Card';

const tools = [
  'Affinity Photo',
  'Figma',
  'Procreate',
  'Illustrator',
  'InDesign',
  'Notion',
  'Raycast',
];

export default function ToolsCard() {
  const t = useTranslations('tools');

  return (
    <Card>
      <div className="flex h-full flex-col gap-8">
        <div className="flex justify-between">
          <span className="text-text-secondary">{t('title')}</span>
        </div>
        <div className="relative h-56 overflow-hidden text-[2.5rem] leading-[1.2] md:h-[calc(3.5rem*5)] md:text-[3rem] md:leading-14 xl:h-56">
          <div className="track animate-[carousel-vertical_10s_linear_infinite]">
            {tools.concat(tools).map((tool, i) => (
              <div key={i} className="font-archivo font-medium text-text-primary">
                {tool}
              </div>
            ))}
          </div>
          <div className="absolute top-0 h-[100px] w-full [background:var(--panel-blend-layer)]" />
          <div className="absolute -bottom-px h-[100px] w-full rotate-180 [background:var(--panel-blend-layer)]" />
        </div>
        <p className="mt-auto leading-7 text-text-secondary">
          {t('description')}
        </p>
      </div>
    </Card>
  );
}
