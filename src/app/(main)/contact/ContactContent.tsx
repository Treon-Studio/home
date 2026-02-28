'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import ContactLinks from './ContactLinks';

export default function ContactContent() {
  const t = useTranslations('contact');

  return (
    <main className="flex flex-1 flex-col px-11 py-8">
      <div className="-mt-8 flex flex-col items-center">
        <Image
          src="/home/phone.png"
          alt={t('phoneAlt')}
          width={200}
          height={400}
          className="-mt-32 object-contain"
          priority
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center text-text-primary">
        <h1>{t('title')}</h1>
        <div className="mb-[100px] flex flex-col items-center gap-6 text-center md:mb-8 md:flex-row">
          <a
            href="mailto:hello@treonstudio.com"
            className="rounded-lg font-archivo text-[clamp(2.25rem,2vw+1rem,3.75rem)]"
          >
            hello@treonstudio.com
          </a>
        </div>

        <ContactLinks />
      </div>
    </main>
  );
}
