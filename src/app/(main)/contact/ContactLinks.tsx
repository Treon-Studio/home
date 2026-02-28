'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';

import VariableFontCursorProximity from '~/src/components/ui/VariableFontCursorProximity';

const links = [
  { label: 'Email', href: 'mailto:hello@treonstudio.com' },
  { label: 'Twitter', href: 'https://twitter.com/treonstudio' },
  { label: 'GitHub', href: 'https://github.com/treonstudio' },
  { label: 'Layers', href: 'https://layers.to/treonstudio' },
  { label: 'Figma', href: 'https://www.figma.com/@treonstudio' },
  { label: 'Behance', href: 'https://www.behance.net/treonstudio' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/treonstudio/' },
  { label: 'WhatsApp', href: 'https://wa.me/6285158802425' },
  { label: 'Tokopedia', href: 'https://www.tokopedia.com/treonstudio' },
  { label: 'Shopee', href: 'https://shopee.co.id/treonstudio' },
  { label: 'Envato', href: 'https://codecanyon.net/user/treonstudio' },
];

export default function ContactLinks() {
  const t = useTranslations('contactLinks');
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-1">
      <p className="mb-4 text-base">{t('orReachUsThrough')}</p>
      {links.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full border-b border-dashed border-gray-300 pb-2 text-center md:border-0 md:pb-0"
        >
          <VariableFontCursorProximity
            containerRef={containerRef}
            className="font-archivo text-2xl leading-tight uppercase md:text-3xl lg:text-4xl"
            fromFontVariationSettings="'wght' 400, 'wdth' 85"
            toFontVariationSettings="'wght' 900, 'wdth' 125"
            radius={150}
            falloff="gaussian"
          >
            {label}
          </VariableFontCursorProximity>
        </a>
      ))}
    </div>
  );
}
