import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

import HavgrimPreview from '~/public/work/havgrim/preview.png';
import Havgrim01 from '~/public/work/havgrim/havgrim_01.png';
import Havgrim02 from '~/public/work/havgrim/havgrim_02.png';
import Havgrim03 from '~/public/work/havgrim/havgrim_03.png';
import HighRoadsPreview from '~/public/work/high-roads/preview.png';
import HighRoads01 from '~/public/work/high-roads/highroads_01.jpg';
import HighRoads02 from '~/public/work/high-roads/highroads_02.jpg';
import HighRoads03 from '~/public/work/high-roads/highroads_03.jpg';
import MidnightStudioPreview from '~/public/work/midnight-studio/midnight-studio_preview.png';
import MidnightStudio00 from '~/public/work/midnight-studio/midnight-studio_00.png';
import MidnightStudio01 from '~/public/work/midnight-studio/midnight-studio_01.png';
import MidnightStudio02 from '~/public/work/midnight-studio/midnight-studio_02.png';
import StampsPreview from '~/public/work/stamps/preview.png';
import Stamps00 from '~/public/work/stamps/stamps_00.png';
import Stamps01 from '~/public/work/stamps/stamps_01.png';
import InfinumPostersPreview from '~/public/work/infinum-posters/preview.png';
import InfinumPosters01 from '~/public/work/infinum-posters/infinum-posters_01.png';
import InfinumPosters02 from '~/public/work/infinum-posters/infinum-posters_02.png';
import InfinumPosters03 from '~/public/work/infinum-posters/infinum-posters_03.png';
import ElizabethsFlowersPreview from '~/public/work/elizabeths-flowers/preview.png';
import ElizabethsFlowers01 from '~/public/work/elizabeths-flowers/elizabethsflowers_01.png';
import ElizabethsFlowers02 from '~/public/work/elizabeths-flowers/elizabethsflowers_02.png';
import ElizabethsFlowers03 from '~/public/work/elizabeths-flowers/elizabethsflowers_03.png';
import OperaPostersPreview from '~/public/work/opera-posters/preview.png';
import OperaPosters01 from '~/public/work/opera-posters/posters_01.png';
import OperaPosters02 from '~/public/work/opera-posters/posters_02.png';
import MemoriesPosterPreview from '~/public/work/memories-poster/preview.png';
import MemoriesPoster00 from '~/public/work/memories-poster/memories-poster_00.png';

export const filters = ['all', 'templates', 'tools', 'assets'] as const;

export type Filter = (typeof filters)[number];

export type Resource = {
  title: string;
  description?: ReactNode;
  slug: string;
  filters: Filter[];
  preview: StaticImageData;
  aspect?: number;
  images?: StaticImageData[];
  tags?: string[];
  link?: string;
  hidden?: boolean;
};

export const resources: Resource[] = [
  {
    title: 'Flavour — Restaurant Website Template',
    slug: 'flavour-restaurant-template',
    preview: HavgrimPreview,
    images: [Havgrim01, Havgrim02, Havgrim03],
    filters: ['templates'],
    description:
      'Elegant restaurant website template with menu showcase, reservation system, and gallery. Perfect for cafes, bars, and fine dining.',
    link: 'https://treonstudio.com',
    tags: ['Next.js', 'Restaurant', 'Booking'],
    aspect: 0.9,
  },
  {
    title: 'Wanderlust — Travel Blog Starter',
    slug: 'wanderlust-travel-blog',
    preview: HighRoadsPreview,
    images: [HighRoads01, HighRoads02, HighRoads03],
    filters: ['templates'],
    description:
      'Travel blog starter with rich media support, map integration, and itinerary builder. MDX-powered content with image optimization.',
    link: 'https://treonstudio.com',
    tags: ['Blog', 'MDX', 'Travel'],
    aspect: 1.1,
  },
  {
    title: 'Noir — Dark Mode UI Kit',
    slug: 'noir-dark-ui-kit',
    preview: MidnightStudioPreview,
    images: [MidnightStudio00, MidnightStudio01, MidnightStudio02],
    filters: ['assets'],
    description:
      'Premium dark mode UI kit with 120+ components. Includes dashboard layouts, form elements, data tables, and chart widgets for Figma.',
    link: 'https://treonstudio.com',
    tags: ['Figma', 'UI Kit', 'Dark Mode'],
    aspect: 1.0,
  },
  {
    title: 'Stampify — Sticker & Badge Pack',
    slug: 'stampify-sticker-badge-pack',
    preview: StampsPreview,
    images: [Stamps00, Stamps01],
    filters: ['assets'],
    description:
      'Collection of 50+ hand-drawn sticker and badge illustrations. Available in PNG, SVG, and Figma formats for web and print.',
    link: 'https://treonstudio.com',
    tags: ['Illustrations', 'Stickers', 'SVG'],
    aspect: 1.2,
  },
  {
    title: 'Poster Machine — Generative Poster CLI',
    slug: 'poster-machine-cli',
    preview: InfinumPostersPreview,
    images: [InfinumPosters01, InfinumPosters02, InfinumPosters03],
    filters: ['tools'],
    description:
      'CLI tool for generating unique poster designs from templates. Supports batch export, color palette randomization, and typography presets.',
    link: 'https://treonstudio.com',
    tags: ['CLI', 'Generative', 'Design Tools'],
    aspect: 0.8,
  },
  {
    title: 'Bloom — E-commerce Starter Kit',
    slug: 'bloom-ecommerce-starter',
    preview: ElizabethsFlowersPreview,
    images: [ElizabethsFlowers01, ElizabethsFlowers02, ElizabethsFlowers03],
    filters: ['templates'],
    description:
      'Full-stack e-commerce starter with product catalog, cart, checkout, and Stripe payments. Built with Next.js App Router and Prisma.',
    link: 'https://treonstudio.com',
    tags: ['E-commerce', 'Stripe', 'Prisma'],
    aspect: 1.0,
  },
  {
    title: 'Overture — Event Landing Page',
    slug: 'overture-event-landing',
    preview: OperaPostersPreview,
    images: [OperaPosters01, OperaPosters02],
    filters: ['templates'],
    description:
      'High-impact event landing page with countdown timer, speaker lineup, schedule grid, and ticket integration. Fully responsive.',
    link: 'https://treonstudio.com',
    tags: ['Event', 'Landing Page', 'Marketing'],
    aspect: 1.0,
  },
  {
    title: 'Rewind — Retro Texture Pack',
    slug: 'rewind-retro-texture-pack',
    preview: MemoriesPosterPreview,
    images: [MemoriesPoster00],
    filters: ['assets'],
    description:
      'Vintage-inspired texture pack with 30+ grain overlays, paper textures, and halftone patterns. Perfect for adding character to digital designs.',
    link: 'https://treonstudio.com',
    tags: ['Textures', 'Retro', 'Design Assets'],
    aspect: 0.9,
  },
];
