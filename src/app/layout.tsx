import { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, Inter, Libertinus_Serif } from 'next/font/google';

import './globals.css';

import Script from 'next/script';

import { LocaleProvider } from '~/src/providers/LocaleProvider';

import { ThemeProvider } from './(main)/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  axes: ['wdth'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-ibm-plex-mono',
});

const libertinusSerif = Libertinus_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-libertinus-serif',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'TreonStudio — Creative House from Indonesia',
  description:
    'TreonStudio adalah creative house dari Indonesia yang menghadirkan solusi digital — web development, mobile app, dan design system. Kami membantu brand, startup, dan UMKM membangun produk digital yang berdampak. Berbasis di Jakarta.',
  metadataBase:
    process.env.NODE_ENV === 'production' ? new URL('https://treonstudio.com') : undefined,
  keywords: [
    'TreonStudio', 'creative house Indonesia', 'software house Jakarta',
    'jasa pembuatan website', 'jasa web developer Jakarta', 'jasa bikin aplikasi',
    'web development Indonesia', 'mobile app development Jakarta',
    'design system agency', 'UI UX design Indonesia',
    'digital agency Jakarta', 'startup studio Indonesia',
    'jasa desain UI UX', 'react developer Indonesia', 'next.js agency',
  ],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'TreonStudio — Creative House from Indonesia',
    description: 'Creative house dari Indonesia — jasa web development, mobile app, dan design system untuk brand, startup, dan UMKM.',
    siteName: 'TreonStudio',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TreonStudio — Creative House from Indonesia',
    description: 'Creative house dari Indonesia — jasa web development, mobile app, dan design system untuk brand, startup, dan UMKM.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://treonstudio.com/#organization',
      name: 'TreonStudio',
      alternateName: ['Treon Studio', 'treon studio', 'treonstudio'],
      url: 'https://treonstudio.com',
      logo: 'https://treonstudio.com/favicon.ico',
      description:
        'TreonStudio adalah creative house dari Indonesia yang menghadirkan solusi digital — web development, mobile app, dan design system untuk brand, startup, dan UMKM.',
      foundingDate: '2024',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jakarta',
        addressRegion: 'DKI Jakarta',
        addressCountry: 'ID',
      },
      areaServed: [
        { '@type': 'Country', name: 'Indonesia' },
        { '@type': 'City', name: 'Jakarta' },
      ],
      sameAs: [
        'https://twitter.com/treonstudio',
        'https://github.com/treonstudio',
        'https://www.linkedin.com/company/treonstudio/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@treonstudio.com',
        telephone: '+6285158802425',
        contactType: 'customer service',
        availableLanguage: ['Indonesian', 'English'],
      },
      knowsAbout: [
        'Web Development',
        'Mobile App Development',
        'UI/UX Design',
        'Design System',
        'React',
        'Next.js',
        'React Native',
        'Flutter',
        'Branding',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://treonstudio.com/#website',
      url: 'https://treonstudio.com',
      name: 'TreonStudio',
      description: 'Creative House from Indonesia — Jasa Web Development, Mobile App, dan Design System',
      publisher: { '@id': 'https://treonstudio.com/#organization' },
      inLanguage: ['id', 'en'],
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://treonstudio.com/#service',
      name: 'TreonStudio',
      provider: { '@id': 'https://treonstudio.com/#organization' },
      serviceType: [
        'Web Development',
        'Mobile App Development',
        'UI/UX Design',
        'Design System',
        'Branding',
      ],
      areaServed: { '@type': 'Country', name: 'Indonesia' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Web Development',
              description: 'Jasa pembuatan website profesional — company profile, landing page, web app, dan e-commerce.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Mobile App Development',
              description: 'Jasa pembuatan aplikasi mobile iOS dan Android — React Native, Flutter, dan native development.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Design System & UI/UX',
              description: 'Jasa desain UI/UX dan pembuatan design system — component library, brand guidelines, dan design tokens.',
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${inter.variable} ${archivo.variable} ${ibmPlexMono.variable} ${libertinusSerif.variable} font-sans`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && (
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </body>
    </html>
  );
}
