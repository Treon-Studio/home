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

export default function BioCard() {
  return (
    <Card className="flex flex-1 flex-col gap-4 bg-panel-background">
      <div className="relative">
        <Image
          alt="Treon Studio Team"
          src={PortraitSrc}
          placeholder="blur"
          className="h-full w-full rounded-md object-cover object-top"
          loading="eager"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
        <div className="absolute left-0 top-0 h-full w-full rounded-md bg-panel-overlay transition-colors duration-200" />
      </div>

      <p className="panel text-sm leading-6 text-text-primary">
        We are a technology partner helping unlock potential through thoughtful, future-ready
        technology. Our focus is on delivering human-centered solutions for SMEs, startups, and
        established businesses. From web development to mobile apps and design systems, we bring
        practical innovation with a growth mindset. Based in{' '}
        <TextLink className=" font-semibold hover:text-theme-1" href="https://treonstudio.com">
          Jakarta, Indonesia
        </TextLink>{' '}
        — ready to partner with you on your next digital journey.
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
