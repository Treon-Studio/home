import Link from 'next/link';

import MousePositionVarsSetter from '~/src/components/MousePositionVarsSetter';
import Button from '~/src/components/ui/Button';
import ViewCounter from '~/src/components/ViewCounter';

import {
  BioCard,
  BukaCard,
  CodeCard,
  ColorThemeCard,
  ExperienceCard,
  NotesCard,
  PantoneCard,
  PhotosCard,
  SketchbookCard,
  SkewedStampsCard,
  SneakPeekCard,
  StatusCard,
  ToolsCard,
} from './components';
import Header from './components/Header';
import Heading from './components/Heading';

import './page.css';

import { Metadata } from 'next';

import { getAllBlogs } from '~/src/lib/blog';
import SystemMetricsCollector from '~/src/lib/SystemMetricsCollector';
import { withTimeout } from '~/src/util';

import { Filter } from './work/constants';

type FilterHref = `/work?f=${Filter}`;

const projectLinks: Array<{ label: string; href: FilterHref }> = [
  { label: 'Products', href: '/work?f=products' },
  { label: 'Community', href: '/work?f=community' },
  { label: 'Services', href: '/work?f=services' },
];

const getCards = ({ sketchbookCard }: { sketchbookCard: boolean }) => [
  { gridArea: '👋', Component: BioCard },
  { gridArea: '👔', Component: ExperienceCard },
  { gridArea: '💬', Component: StatusCard },
  { gridArea: '🖌️', Component: PantoneCard },
  { gridArea: '🎨', Component: ColorThemeCard },
  { gridArea: '👀', Component: SneakPeekCard },
  { gridArea: '🖼️', Component: PhotosCard },
  { gridArea: '💯', Component: BukaCard },
  { gridArea: '🧪', Component: CodeCard },
  { gridArea: '👩‍💻', Component: sketchbookCard ? SketchbookCard : ToolsCard },
  { gridArea: '💌', Component: SkewedStampsCard },
  { gridArea: '📝', Component: NotesCard },
];

const fetchSneakPeekCount = ({ timeout = 1000 }) => {
  const responsePromise = fetch(
    process.env.NEXT_PUBLIC_HOST +
      '/api/stats?' +
      new URLSearchParams([
        ['pathname', '/#sneak-peek'],
        ['type', 'action'],
      ]),
    { cache: 'no-store' },
  )
    .then((res) => res.json())
    .then((res) => res.count)
    .catch((e) => {
      console.error(e);
      return 0;
    });

  return withTimeout(responsePromise, 0, timeout);
};

const fetchSystemMetrics = ({ timeout = 1000 }) => {
  const responsePromise = SystemMetricsCollector.collect().catch((e) => {
    console.error(e);
    return SystemMetricsCollector.default({ reason: e?.message ?? 'collector error' });
  });

  return withTimeout(
    responsePromise,
    SystemMetricsCollector.default({ reason: `timeout ${timeout}ms` }),
    timeout,
  );
};

export const metadata: Metadata = {
  title: 'About | TreonStudio — Creative House & Software House Jakarta',
  description:
    'TreonStudio adalah creative house & software house di Jakarta, Indonesia. Kami bantu brand, startup, dan UMKM membangun website, aplikasi mobile, dan design system yang berdampak.',
  keywords: ['about TreonStudio', 'software house Jakarta', 'creative house Indonesia', 'tentang TreonStudio', 'digital agency Jakarta'],
};

export default async function Home() {
  const [currentCount, metrics, blogs] = await Promise.all([
    fetchSneakPeekCount({ timeout: 1000 }),
    fetchSystemMetrics({ timeout: 1000 }),
    getAllBlogs(),
  ]);

  return (
    <div>
      <Header />
      <ViewCounter pathname="/" />
      <MousePositionVarsSetter />
      <div className="glow pointer-events-none fixed h-[400px] w-[400px] rounded-full blur-3xl" />
      <div className="flex flex-col px-5 py-5 md:py-12">
        <main className="pb-12">
          <Heading className="mb-[1.6rem] md:mb-20" />
          <div className="home-cards">
            {getCards({ sketchbookCard: true }).map(({ gridArea, Component }, i) => (
              <div key={i} style={{ gridArea }}>
                <Component currentCount={currentCount || 0} metrics={metrics} blogs={blogs} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
