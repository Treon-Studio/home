import gsap from 'gsap';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const BANNERS = ['#banner-1', '#banner-2', '#banner-3', '#banner-4'];

export const animatePageIn = () => {
  const tl = gsap.timeline();

  tl.set(BANNERS, { yPercent: 0 }).to(BANNERS, {
    yPercent: 100,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power2.inOut',
    force3D: true,
  });
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const tl = gsap.timeline();

  tl.set(BANNERS, { yPercent: -100 }).to(BANNERS, {
    yPercent: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: 'power2.inOut',
    force3D: true,
    onComplete: () => {
      router.push(href);
    },
  });
};
