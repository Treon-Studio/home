import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#e7e5e4',
};

export const metadata: Metadata = {
  title: 'Case Studies | TreonStudio — Studi Kasus Proyek Digital Indonesia',
  description:
    'Studi kasus proyek digital TreonStudio — bagaimana kami membantu brand dan startup di Indonesia membangun produk digital yang berdampak. Web, mobile, dan design system.',
  keywords: ['studi kasus web development', 'case study digital agency', 'contoh proyek website Indonesia', 'TreonStudio case studies'],
};

export default function StampsLayout({ children }: { children: React.ReactNode }) {
  return <div className="stamps-layout">{children}</div>;
}
