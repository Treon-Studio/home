'use client';

import dynamic from 'next/dynamic';

import CardTitle from '~/src/components/ui/CardTitle';

import Card from './Card';

import './PantoneCard.css';

const Logo3D = dynamic(() => import('~/src/components/ui/Logo3D'), { ssr: false });

export default function PantoneCard() {
  return (
    <Card containerClassName="z-3 pantone-card" className="!p-0 overflow-hidden">
      <Logo3D className="min-h-[250px] w-full" bgColor="transparent" fgColor="#FF5A00" />
    </Card>
  );
}
