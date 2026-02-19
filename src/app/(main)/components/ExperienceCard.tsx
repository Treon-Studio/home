'use client';

import { ArrowUpRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

import CardTitle from '~/src/components/ui/CardTitle';
import Tag from '~/src/components/ui/Tag';

import Card from './Card';

const Gravity = dynamic(() => import('~/src/components/ui/Gravity'), { ssr: false });
const MatterBody = dynamic(() => import('~/src/components/ui/Gravity').then((m) => ({ default: m.MatterBody })), {
  ssr: false,
});

type Position = {
  title: ReactNode;
  company?: { name: string; href: string };
  from: string;
  to?: string;
  muted?: boolean;
};

const positions: Position[] = [
  {
    title: 'Web Development',
    company: { name: 'from $60/mo', href: 'https://treonstudio.com' },
    from: 'Active',
  },
  {
    title: 'Mobile Development',
    company: { name: 'from $180/mo', href: 'https://treonstudio.com' },
    from: 'Active',
  },
  {
    title: 'Design System',
    company: { name: 'from $306/mo', href: 'https://treonstudio.com' },
    from: 'Active',
  },
  {
    title: (
      <a
        className="group text-text-primary/50 hover:text-main-accent inline-flex items-center"
        href="https://treonstudio.com"
        target="_blank"
        rel="noreferrer"
      >
        View all services
        <ArrowUpRight className="ml-0.5 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    ),
    from: '',
    to: '',
    muted: true,
  },
];

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
          <ul className="flex flex-col">
            {positions.map((p, i) => (
              <li
                key={i}
                className="border-panel-border flex flex-row items-center justify-between border-b py-2 text-sm last-of-type:border-none"
              >
                <span className="flex flex-1 flex-wrap items-center gap-2 whitespace-nowrap">
                  {!p.to && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="bg-main-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                      <span className="bg-main-accent relative inline-flex h-1.5 w-1.5 rounded-full"></span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <span className={p.muted ? 'text-text-primary/60' : 'text-text-primary'}>
                      {p.title} {p.company && typeof p.title === 'string' && '—'}{' '}
                    </span>
                    {p.company ? (
                      <Tag asChild className="bg-transparent p-0">
                        {p.company.href ? (
                          <a
                            className="text-md group text-text-primary hover:text-main-accent inline-flex items-center"
                            href={p.company.href}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {p.company.name}
                            <ArrowUpRight className="ml-0.5 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                          </a>
                        ) : (
                          <span className="text-xs">{p.company.name}</span>
                        )}
                      </Tag>
                    ) : null}
                  </span>
                </span>
                <span className={p.muted ? 'text-text-primary/60' : 'text-text-primary'}>
                  <span className="xs:block hidden">{p.from}</span>
                </span>
              </li>
            ))}
          </ul>
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
