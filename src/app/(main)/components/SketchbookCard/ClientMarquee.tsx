'use client';

import { cn } from '~/src/util';

import './ClientMarquee.css';

const clients = [
  'Tokopedia',
  'Shopee',
  'Gojek',
  'Bukalapak',
  'Traveloka',
  'Blibli',
  'Dana',
  'OVO',
  'Tiket.com',
  'Telkom',
  'BCA',
  'Mandiri',
  'BNI',
  'Pertamina',
  'Astra',
  'Unilever',
  'Samsung',
  'XL Axiata',
  'Indosat',
  'Bank Jago',
  'Grab',
  'Halodoc',
  'Ruangguru',
  'Zenius',
];

const rows: string[][] = [
  clients.slice(0, 8),
  clients.slice(8, 16),
  clients.slice(16, 24),
];

type Props = {
  direction: 'left' | 'right';
  speed?: number;
  row: number;
};

export default function ClientMarquee({ direction, speed = 25, row }: Props) {
  const items = rows[row];
  const animationDuration = `${speed}s`;

  return (
    <div className="marquee-container overflow-hidden">
      <div
        className={cn('marquee-track flex w-max gap-4', direction === 'right' && 'marquee-reverse')}
        style={{ animationDuration }}
      >
        {[...items, ...items].map((client, i) => (
          <div
            key={`${client}-${i}`}
            className="flex h-12 shrink-0 items-center justify-center rounded-lg border border-panel-border bg-panel-background px-5 text-sm font-medium text-text-secondary transition-colors hover:border-text-muted hover:text-text-primary"
          >
            {client}
          </div>
        ))}
      </div>
    </div>
  );
}
