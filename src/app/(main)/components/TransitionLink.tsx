'use client';

import { usePathname, useRouter } from 'next/navigation';

import { animatePageOut } from '~/src/utils/animations';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLAnchorElement>;
}

export default function TransitionLink({ href, children, className, ref }: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== href) {
      animatePageOut(href, router);
    }
  };

  return (
    <a href={href} ref={ref} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
