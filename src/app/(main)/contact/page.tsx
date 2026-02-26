import { Metadata } from 'next';

import CopyToClipboard from '~/src/components/CopyToClipboard';
import Button from '~/src/components/ui/Button';
import ViewLogger from '~/src/components/ViewCounter';

import Header from '../components/Header';

const links = [
  { label: 'Twitter', href: 'https://twitter.com/treonstudio' },
  { label: 'GitHub', href: 'https://github.com/treonstudio' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/treonstudio/' },
  { label: 'WhatsApp', href: 'https://wa.me/6285158802425' },
];

const email = 'hello@treonstudio.com';

export const metadata: Metadata = {
  title: 'Hubungi Kami | TreonStudio — Jasa Web Developer & Design Jakarta',
  description:
    'Hubungi TreonStudio untuk konsultasi gratis. Jasa pembuatan website, aplikasi mobile, dan design system di Jakarta, Indonesia. WhatsApp, email, atau social media — kami siap bantu wujudkan ide digitalmu.',
  keywords: ['kontak TreonStudio', 'hubungi web developer Jakarta', 'konsultasi jasa website', 'hire developer Indonesia'],
  openGraph: {
    title: 'Hubungi Kami | TreonStudio',
    description: 'Hubungi TreonStudio untuk konsultasi gratis — jasa web development, mobile app, dan design system di Jakarta.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hubungi Kami | TreonStudio',
    description: 'Hubungi TreonStudio untuk konsultasi gratis — jasa web development, mobile app, dan design system di Jakarta.',
  },
};

export default function Contact() {
  return (
    <>
      <Header />
      <ViewLogger pathname="/contact" />
      <main className="flex flex-1 flex-col px-11 py-8">
        <div className="flex flex-1 flex-col items-center justify-center text-text-primary">
          <h1>Let&apos;s create something extraordinary</h1>
          <div className="mb-[100px] flex flex-col items-center gap-6 text-center md:mb-8 md:flex-row ">
            <a
              href="mailto:hello@treonstudio.com"
              className="rounded-lg font-archivo text-[clamp(2.25rem,2vw+1rem,3.75rem)]"
            >
              hello@treonstudio.com
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-1">
            <CopyToClipboard content={email} label="Copy email" />
            {links.map(({ label, ...rest }) => {
              const linkProps = { ...rest, target: '_blank', rel: 'noopener noreferrer' };
              return (
                <Button key={label} asChild>
                  <a {...linkProps}>{label}</a>
                </Button>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
