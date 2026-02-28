import { Metadata } from 'next';

import ViewLogger from '~/src/components/ViewCounter';

import Header from '../components/Header';
import ContactContent from './ContactContent';

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
      <ContactContent />
    </>
  );
}
