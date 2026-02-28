'use client';

import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

import CardTitle from '~/src/components/ui/CardTitle';

import Card from './Card';

const Gravity = dynamic(() => import('~/src/components/ui/Gravity'), { ssr: false });
const MatterBody = dynamic(() => import('~/src/components/ui/Gravity').then((m) => ({ default: m.MatterBody })), {
  ssr: false,
});

const techStackKeys = [
  { key: 'webDevelopment' as const, color: '#0015ff' },
  { key: 'mobileApp' as const, color: '#e794da' },
  { key: 'uiUx' as const, color: '#1f464d' },
  { key: 'graphicDesign' as const, color: '#ff5941' },
  { key: 'technicalWriter' as const, color: '#ffd726' },
];

export default function ExperienceCard() {
  const t = useTranslations('experience');

  return (
    <Card>
      <div className="flex flex-col justify-between gap-6">
        <div className="px-2">
          <CardTitle variant="mono" className="border-panel-border mb-10 pb-6">
            {t('title')}
          </CardTitle>
          <p className="text-text-primary text-2xl font-medium leading-snug tracking-[-0.05em]">
            {t('descriptionStart')}<img src="/home/web-dev.webp" alt="web" className="inline-block h-8 w-8 align-middle" /> {t('webApp')}{t('descriptionMid1')}<img src="/home/mobile.webp" alt="mobile" className="inline-block h-8 w-8 align-middle" /> {t('mobile')}{t('descriptionMid2')}<img src="/home/design.webp" alt="design" className="inline-block h-8 w-8 align-middle" /> {t('designSystem')}{t('descriptionMid3')}<img src="/home/technical-writer.webp" alt="writing" className="inline-block h-8 w-8 align-middle" /> {t('technicalWriting')}{t('descriptionMid4')}<img src="/home/rocket.webp" alt="build" className="inline-block h-8 w-8 align-middle" /> {t('build')}{t('descriptionEnd')}
            <a
              className="group text-main-accent inline-flex items-center underline decoration-main-accent/30 underline-offset-4 hover:decoration-main-accent"
              href="https://treonstudio.com"
              target="_blank"
              rel="noreferrer"
            >
              {t('reachOut')}
              <ArrowUpRight className="ml-0.5 h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            {t('whenYouNeedUs')}
          </p>
        </div>

        <div className="relative h-[280px] w-full overflow-hidden rounded-md">
          <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full" grabCursor>
            <MatterBody
              matterBodyOptions={{ isStatic: true, friction: 1 }}
              isDraggable={false}
              x="50%"
              y="95%"
            >
              <span className="select-none text-[7rem] font-serif font-bold leading-none text-text-primary">
                Treon
              </span>
            </MatterBody>
            {techStackKeys.map((tech, i) => (
              <MatterBody
                key={tech.key}
                matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                x={`${15 + i * 14}%`}
                y={`${10 + (i % 3) * 15}%`}
                angle={i % 2 === 0 ? 0 : 10}
              >
                <div
                  className="cursor-grab rounded-full px-6 py-3 text-base font-medium text-white"
                  style={{ backgroundColor: tech.color }}
                >
                  {t(tech.key)}
                </div>
              </MatterBody>
            ))}
          </Gravity>
        </div>
      </div>
    </Card>
  );
}
