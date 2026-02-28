'use client';

import dayjs from 'dayjs';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import CardTitle from '~/src/components/ui/CardTitle';

import Card from './Card';

const formatDate = (unixTimestamp: string) => {
  const date = new Date(parseInt(unixTimestamp) * 1000);
  return dayjs(date).format('DD/MMM/YYYY');
};

export default function NotesCard() {
  const t = useTranslations('notes');
  const lastUpdated = process.env.NEXT_PUBLIC_BUILD_TIME;

  return (
    <Card className="">
      <div className="flex flex-col justify-between gap-5">
        <CardTitle variant="mono">{t('title')}</CardTitle>
        <p className="text-sm leading-5 text-text-primary">
          {t('description')}{' '}
          <a
            href="https://treonstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-0.5 rounded text-text-secondary transition-colors hover:text-text-primary"
          >
            {lastUpdated ? formatDate(lastUpdated!) : t('na')}
            <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        </p>
      </div>
    </Card>
  );
}
