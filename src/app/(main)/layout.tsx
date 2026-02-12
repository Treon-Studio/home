import { Metadata } from 'next';

import Footer from './components/Footer';

import './layout.css';

export const metadata: Metadata = {
  title: 'Treon Studio - Digital Business Solutions',
  metadataBase:
    process.env.NODE_ENV === 'production' ? new URL('https://treonstudio.com') : undefined,
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="main bg-main-background">
      <div className="layout-container m-auto flex min-h-screen max-w-(--breakpoint-2xl) flex-col">
        {children}
        <Footer />
      </div>
    </div>
  );
}
