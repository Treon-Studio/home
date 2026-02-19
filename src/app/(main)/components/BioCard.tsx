'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import PortraitSrc from '~/public/home/me.jpg';
import {
  ArrowRightIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from '~/src/components/icons';
import Button from '~/src/components/ui/Button';
import Image from '~/src/components/ui/Image';
import TextLink from '~/src/components/ui/TextLink';

import Card from './Card';

import './cards.css';

const social = [
  {
    url: 'https://twitter.com/treonstudio',
    Icon: TwitterIcon,
    attrs: { 'aria-label': 'Go to Twitter' },
  },
  {
    url: 'https://github.com/treonstudio',
    Icon: GithubIcon,
    attrs: { 'aria-label': 'Go to GitHub' },
  },
  {
    url: 'https://www.linkedin.com/company/treonstudio/',
    Icon: LinkedinIcon,
    attrs: { 'aria-label': 'Go to LinkedIn' },
  },
];

type Vertex = { x: number; y: number };

const labelMeta = [
  { text: 'Visionary', labelSide: 'left' as const },
  { text: 'Unifying', labelSide: 'right' as const },
  { text: 'Committed', labelSide: 'right' as const },
  { text: 'Clear', labelSide: 'left' as const },
];

// Each variant is 4 vertices: [Visionary, Unifying, Committed, Clear]
const shapeVariants: Vertex[][] = [
  [
    { x: 13, y: 28 },
    { x: 88, y: 10 },
    { x: 63, y: 92 },
    { x: 34, y: 78 },
  ],
  [
    { x: 10, y: 22 },
    { x: 85, y: 16 },
    { x: 68, y: 88 },
    { x: 30, y: 82 },
  ],
  [
    { x: 16, y: 32 },
    { x: 90, y: 8 },
    { x: 60, y: 95 },
    { x: 38, y: 74 },
  ],
  [
    { x: 12, y: 25 },
    { x: 86, y: 14 },
    { x: 66, y: 90 },
    { x: 32, y: 80 },
  ],
];

function toClipPath(vertices: Vertex[]) {
  return `polygon(${vertices.map((v) => `${v.x}% ${v.y}%`).join(', ')})`;
}

export default function BioCard() {
  const [variantIndex, setVariantIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVariantIndex((prev) => (prev + 1) % shapeVariants.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentVertices = shapeVariants[variantIndex];
  const clipPath = toClipPath(currentVertices);

  return (
    <Card className="flex flex-1 flex-col gap-4 bg-panel-background">
      <div className="relative">
        <Image
          alt="TreonStudio Team"
          src={PortraitSrc}
          placeholder="blur"
          className="h-full w-full object-cover object-top transition-[clip-path] duration-1000 ease-in-out"
          style={{ clipPath }}
          loading="eager"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
        <div
          className="absolute left-0 top-0 h-full w-full bg-panel-overlay transition-[clip-path] duration-1000 ease-in-out"
          style={{ clipPath }}
        />
        {currentVertices.map((vertex, i) => (
          <span
            key={labelMeta[i].text}
            className="absolute h-0 w-0 transition-all duration-1000 ease-in-out"
            style={{ top: `${vertex.y}%`, left: `${vertex.x}%` }}
          >
            <span
              className="absolute h-2.5 w-2.5 bg-[#FF5A00] sm:h-3 sm:w-3"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
            <span
              className="absolute whitespace-nowrap text-xs font-medium text-text-primary sm:text-sm"
              style={
                labelMeta[i].labelSide === 'left'
                  ? { right: 8, top: '50%', transform: 'translateY(-50%)' }
                  : { left: 8, top: '50%', transform: 'translateY(-50%)' }
              }
            >
              {labelMeta[i].text}
            </span>
          </span>
        ))}
      </div>

      <p className="panel text-sm leading-6 text-text-primary">
        We are TreonStudio — a creative house from Indonesia turning bold ideas into digital
        experiences that matter. From web and mobile to branding and design systems, we craft
        every pixel with purpose. Based in{' '}
        <TextLink className=" font-semibold hover:text-theme-1" href="https://treonstudio.com">
          Yogyakarta, Indonesia
        </TextLink>{' '}
        — let&apos;s create something extraordinary together.
      </p>
      <div className="mt-4 flex flex-col items-start justify-between text-text-primary md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm">Connect with us on</span>
          <div className="flex gap-2">
            {social.map(({ url, Icon, attrs }) => (
              <a
                target="_blank"
                rel="noreferrer noopener"
                key={url}
                href={`${url}`}
                className="hover cursor-pointer rounded-full transition-all duration-200 text-theme-2 hover:text-theme-1"
                {...attrs}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <Button className="mt-10 md:mt-0" iconRight={<ArrowRightIcon />} asChild>
          <Link href="/contact">Get in touch</Link>
        </Button>
      </div>
    </Card>
  );
}
