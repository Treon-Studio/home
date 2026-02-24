'use client';

import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';

import CardTitle from '~/src/components/ui/CardTitle';

import Card from './Card';

const Gravity = dynamic(() => import('~/src/components/ui/Gravity'), { ssr: false });
const MatterBody = dynamic(() => import('~/src/components/ui/Gravity').then((m) => ({ default: m.MatterBody })), {
  ssr: false,
});

const techStack = [
  { label: 'Web Development', color: '#0015ff' },
  { label: 'Mobile App', color: '#e794da' },
  { label: 'UI / UX', color: '#1f464d' },
  { label: 'Graphic Design', color: '#ff5941' },
  { label: 'Technical Writer', color: '#ffd726' },
];

export default function ExperienceCard() {
  return (
    <Card>
      <div className="flex flex-col justify-between gap-6">
        <div className="px-2">
          <CardTitle variant="mono" className="border-panel-border mb-10 pb-6">
            OUR SERVICES
          </CardTitle>
          <p className="text-text-primary text-2xl font-medium leading-snug tracking-[-0.05em]">
            Ship a <img src="/home/web-dev.webp" alt="web" className="inline-block h-8 w-8 align-middle" /> web app. Go
            live on <img src="/home/mobile.webp" alt="mobile" className="inline-block h-8 w-8 align-middle" /> mobile. Craft
            a <img src="/home/design.webp" alt="design" className="inline-block h-8 w-8 align-middle" /> design system. Document
            it with <img src="/home/technical-writer.webp" alt="writing" className="inline-block h-8 w-8 align-middle" /> clear technical
            writing. We handle the <img src="/home/rocket.webp" alt="build" className="inline-block h-8 w-8 align-middle" /> build — you
            focus on the vision. Just{' '}
            <a
              className="group text-main-accent inline-flex items-center underline decoration-main-accent/30 underline-offset-4 hover:decoration-main-accent"
              href="https://treonstudio.com"
              target="_blank"
              rel="noreferrer"
            >
              reach out
              <ArrowUpRight className="ml-0.5 h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
            </a>{' '}
            when you need us.
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
            {techStack.map((tech, i) => (
              <MatterBody
                key={tech.label}
                matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                x={`${15 + i * 14}%`}
                y={`${10 + (i % 3) * 15}%`}
                angle={i % 2 === 0 ? 0 : 10}
              >
                <div
                  className="cursor-grab rounded-full px-6 py-3 text-base font-medium text-white"
                  style={{ backgroundColor: tech.color }}
                >
                  {tech.label}
                </div>
              </MatterBody>
            ))}
          </Gravity>
        </div>
      </div>
    </Card>
  );
}
