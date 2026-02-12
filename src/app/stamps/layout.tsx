import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#e7e5e4',
};

export const metadata: Metadata = {
  title: 'Treon Studio / Case Studies',
  description:
    'Explore our case studies showcasing successful digital solutions for SMEs, startups, and established businesses across Indonesia.',
};

export default function StampsLayout({ children }: { children: React.ReactNode }) {
  return <div className="stamps-layout">{children}</div>;
}
