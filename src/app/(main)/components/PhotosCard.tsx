'use client';

import { useEffect, useRef, useState } from 'react';

import CardTitle from '~/src/components/ui/CardTitle';
import BoxCarousel, { type BoxCarouselRef, type CarouselItem } from '~/src/components/ui/BoxCarousel';
import { cn } from '~/src/util';

import Card from './Card';

// ── Stat icons ────────────────────────────────────────────────────────────────

function StarIcon() {
  return (
    <svg className="block h-[1em] w-[1em]" viewBox="0 0 64 64" aria-hidden>
      <path fill="currentColor" d="M62.799,23.737c-0.47-1.399-1.681-2.419-3.139-2.642l-16.969-2.593L35.069,2.265C34.419,0.881,33.03,0,31.504,0c-1.527,0-2.915,0.881-3.565,2.265l-7.623,16.238L3.347,21.096c-1.458,0.223-2.669,1.242-3.138,2.642c-0.469,1.4-0.115,2.942,0.916,4l12.392,12.707l-2.935,17.977c-0.242,1.488,0.389,2.984,1.62,3.854c1.23,0.87,2.854,0.958,4.177,0.228l15.126-8.365l15.126,8.365c0.597,0.33,1.254,0.492,1.908,0.492c0.796,0,1.592-0.242,2.269-0.72c1.231-0.869,1.861-2.365,1.619-3.854l-2.935-17.977l12.393-12.707C62.914,26.68,63.268,25.138,62.799,23.737z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="block h-[1em] w-[1em]" viewBox="0 0 16 16" aria-hidden>
      <path fill="currentColor" d="M8 0a8 8 0 100 16A8 8 0 008 0zm2.72 5.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-2-2a.75.75 0 011.06-1.06l1.47 1.47 3.97-3.97z" />
    </svg>
  );
}

// ── Category badge icons ──────────────────────────────────────────────────────

function IconLink() {
  return (
    <svg className="block h-full w-full" viewBox="0 0 32 32" aria-hidden>
      <path fill="none" opacity="0.8" stroke="currentColor" strokeWidth="3" d="M 4.5 4.5 C 4.5 4.5 30 0.048 30 8 C 30 16 2 16 2 24 C 2 32.035 27.5 27.5 27.5 27.5" />
      <circle fill="currentColor" cx="4.5" cy="4.5" r="4.5" />
      <circle fill="currentColor" cx="27.5" cy="27.5" r="4.5" />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg className="block h-full w-full" viewBox="0 0 20 20" aria-hidden>
      <circle fill="currentColor" opacity="0.8" cx="10" cy="3.5" r="2.5" />
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2">
        <ellipse cx="6.5" cy="13" rx="7" ry="4" transform="rotate(50, 6.5, 13)" />
        <ellipse cx="13.5" cy="13" rx="7" ry="4" transform="rotate(-50, 13.5, 13)" strokeDasharray="26.4 8.8" strokeDashoffset="-17.6" />
      </g>
    </svg>
  );
}

function IconRibbon() {
  return (
    <svg className="block h-full w-full" viewBox="0 0 40 40" aria-hidden>
      <path fill="currentColor" d="M 27.552 2.225 C 29.228 2.225 29.831 4.845 31.379 5.486 C 32.927 6.128 35.206 4.701 36.391 5.886 C 37.576 7.071 36.149 9.35 36.791 10.898 C 37.432 12.446 40.052 13.049 40.052 14.725 C 40.052 16.401 37.432 17.004 36.791 18.552 C 36.149 20.1 37.576 22.379 36.391 23.564 C 35.206 24.749 32.927 23.322 31.379 23.964 C 29.831 24.605 29.228 27.225 27.552 27.225 C 25.876 27.225 25.273 24.605 23.725 23.964 C 22.177 23.322 19.898 24.749 18.713 23.564 C 17.528 22.379 18.955 20.1 18.313 18.552 C 17.672 17.004 15.052 16.401 15.052 14.725 C 15.052 13.049 17.672 12.446 18.313 10.898 C 18.955 9.35 17.528 7.071 18.713 5.886 C 19.898 4.701 22.177 6.128 23.725 5.486 C 25.273 4.845 25.876 2.225 27.552 2.225 Z" transform="rotate(10, 27.6, 14.7)" />
      <g fill="none" opacity="0.8" stroke="currentColor" strokeLinecap="round" strokeWidth="3">
        <path d="M 15.255 23.668 C 11.883 26.637 7.678 28.147 2 27" />
        <path d="M 24 30 C 20.362 36.586 14 36 14 36" />
      </g>
    </svg>
  );
}

function IconCoil() {
  return (
    <svg className="block h-full w-full" viewBox="0 0 16 16" aria-hidden>
      <circle fill="currentColor" cx="10.5" cy="2.5" r="2.5" />
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
        <ellipse cx="8" cy="3.75" rx="6.5" ry="2.25" transform="rotate(5, 8, 3.75)" strokeDasharray="14.57 14.57" strokeDashoffset="-7.28" />
        <ellipse cx="8" cy="8.25" rx="6.5" ry="2.25" transform="rotate(5, 8, 8.25)" />
        <ellipse cx="8" cy="12.75" rx="6.5" ry="2.25" transform="rotate(5, 8, 12.75)" />
      </g>
    </svg>
  );
}

function IconDocument() {
  return (
    <svg className="block h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg className="block h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  );
}

function IconTerminal() {
  return (
    <svg className="block h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg className="block h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg className="block h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  );
}

function IconPalette() {
  return (
    <svg className="block h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="13.5" cy="6.5" r="1" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r="1" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r="1" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

const categoryIcons: Record<string, React.ReactNode> = {
  link:     <IconLink />,
  people:   <IconPeople />,
  ribbon:   <IconRibbon />,
  coil:     <IconCoil />,
  building: <IconBuilding />,
  terminal: <IconTerminal />,
  home:     <IconHome />,
  chat:     <IconChat />,
  palette:  <IconPalette />,
  document: <IconDocument />,
};

function CategoryBadge({ iconName, accentColor }: { iconName: string; accentColor: string }) {
  return (
    <div className="relative h-12 w-12 shrink-0">
      {/* 8-pointed star background (white) */}
      <svg className="absolute inset-0 h-full w-full text-white" viewBox="0 0 100 100" aria-hidden>
        <path fill="currentColor" strokeLinejoin="round" d="M 49.988 0 C 56.69 0 59.1 10.477 65.292 13.042 C 71.484 15.607 80.596 9.902 85.335 14.641 C 90.074 19.38 84.369 28.492 86.934 34.684 C 89.499 40.876 99.976 43.286 99.976 49.988 C 99.976 56.69 89.499 59.1 86.934 65.292 C 84.369 71.484 90.074 80.596 85.335 85.335 C 80.596 90.074 71.484 84.369 65.292 86.934 C 59.1 89.499 56.69 99.976 49.988 99.976 C 43.286 99.976 40.876 89.499 34.684 86.934 C 28.492 84.369 19.38 90.074 14.641 85.335 C 9.902 80.596 15.607 71.484 13.042 65.292 C 10.477 59.1 0 56.69 0 49.988 C 0 43.286 10.477 40.876 13.042 34.684 C 15.607 28.492 9.902 19.38 14.641 14.641 C 19.38 9.902 28.492 15.607 34.684 13.042 C 40.876 10.477 43.286 0 49.988 0 Z" />
      </svg>
      {/* Small icon centered at 30% width */}
      <span
        className="absolute left-1/2 top-1/2 block -translate-x-1/2 -translate-y-1/2"
        style={{ width: '30%', color: accentColor }}
      >
        {categoryIcons[iconName]}
      </span>
    </div>
  );
}

// ── Background SVG patterns ───────────────────────────────────────────────────

function BgCirclesCorner({ color }: { color: string }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-auto w-full" viewBox="0 0 316 316" aria-hidden>
      <g fill="none" stroke={color} strokeLinecap="round" strokeWidth="5">
        <path d="M 323.074 256.963 C 312.956 263.991 295.834 280.024 295.479 292.107 C 294.971 309.41 311.806 311.371 322.384 317.098" />
        <path d="M 322.384 225.723 C 303.276 230.431 291.393 236.843 273.403 256.963 C 252.542 280.29 261.674 308.503 261.674 315.536" />
        <path d="M 320.316 193.268 C 285.716 194.491 258.866 221.733 245.117 244.813 C 225.414 277.888 238.218 316.923 236.839 320.568" />
        <path d="M 321.006 147.971 C 301.136 149.81 258.571 170.234 231.318 197.955 C 189.23 240.768 190.427 315.532 187.856 321.35" />
        <path d="M 323.764 101.113 C 285.498 101.275 236.306 121.433 195.446 163.591 C 144.032 216.636 154.999 289.235 145.772 320.568" />
        <path d="M 320.316 48 C 307.75 49.984 222.602 48.394 158.881 119.856 C 96.203 190.147 104.486 309.571 103 321.35" />
      </g>
    </svg>
  );
}

function BgGrassLeft({ color }: { color: string }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-auto w-full" viewBox="0 0 316 316" aria-hidden>
      <g fill="none" stroke={color} strokeLinecap="round" strokeWidth="13">
        <path d="M 38.058 7.993 C 28.089 11.316 0.838 21.446 -9.778 21.446" />
        <path d="M 54.502 25.931 C 36.784 32.374 9.564 33.659 -9.031 34.9" />
        <path d="M 40.3 44.617 C 32.596 47.185 20.108 49.102 12.645 49.102 C 11.724 49.102 -11.273 49.849 -11.273 49.849" />
        <path d="M 70.197 55.828 C 44.513 59.371 10.302 63.302 -15.01 63.302" />
        <path d="M 38.805 78.251 C 29.458 78.251 19.421 80.494 10.403 80.494 C 9.638 80.494 -11.273 81.241 -11.273 81.241" />
        <path d="M 146.436 76.009 C 98.755 87.302 33.852 89.444 -15.011 93.2" />
        <path d="M 92.62 96.191 C 64.188 99.928 19.045 106.654 -12.021 106.654" />
        <path d="M 127.002 110.623 C 86.185 118.524 29.402 125.223 -11.273 121.835" />
        <path d="M 123.265 126.33 C 81.9 132.793 33.25 138.54 -9.031 141.279" />
        <path d="M 129.245 137.299 C 105.14 140.135 80.943 144.406 56.743 146.268 C 35.936 147.869 15.883 150.753 -5.294 150.753" />
        <path d="M 144.193 148.51 C 104.716 148.51 68.301 160.469 28.341 160.469 C 18.874 160.469 8.423 162.712 -0.062 162.712 C -0.691 162.712 -9.031 162.712 -9.031 162.712" />
        <path d="M 138.214 168.691 C 86.225 174.993 43.197 175.802 -9.03 179.156" />
        <path d="M 138.961 185.135 C 108.316 187.377 77.638 189.2 47.027 191.862 C 27.053 193.599 12.579 197.094 -7.535 197.094" />
        <path d="M 192.029 200.083 C 138.506 205.436 85.211 206.11 31.331 206.81 C 14.889 207.024 5.881 207.212 -10.526 208.305" />
        <path d="M 148.678 215.032 C 110.861 217.395 72.943 217.687 35.068 218.769 C 17.607 219.268 6.926 222.506 -10.526 222.506" />
        <path d="M 187.545 234.465 C 164.527 234.465 142.438 237.455 120.275 237.455 C 75.157 237.455 32.388 235.96 -11.273 235.96" />
        <path d="M 195.766 254.646 C 142.507 254.646 90.644 258.383 35.815 258.383 C 23.34 258.383 -12.021 257.636 -12.021 257.636" />
        <path d="M 180.818 274.079 C 141.514 274.079 99.399 278.564 61.228 278.564 C 36.924 278.564 14.485 276.322 -7.536 276.322" />
        <path d="M 210.715 289.028 C 204.148 289.875 157.957 296.233 142.698 297.25 C 90.954 300.699 39.787 298.087 -10.525 298.745" />
        <path d="M 229.401 295.755 C 188.963 295.755 159.401 307.714 104.579 308.461 C 64.791 309.003 28.292 309.956 -11.273 309.956" />
        <path d="M 218.189 311.202 C 210.762 311.202 181.915 317.374 162.132 321.666 C 148.352 324.656 113.549 327.646 113.549 327.646" />
      </g>
    </svg>
  );
}

function BgCirclesTop({ color }: { color: string }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-auto w-full" viewBox="0 0 648 648" aria-hidden>
      <g fill="none" stroke={color} strokeLinecap="round">
        <path strokeWidth="10" d="M 453.754 -21.507 C 426.967 6.445 420.959 57.037 331.465 60.601 C 234.771 64.452 225.579 0.318 214.418 -28.495" />
        <path strokeWidth="10" d="M 156.767 -33.735 C 167.249 11.104 188.994 80.565 217.912 111.263 C 239.879 134.581 286.462 149.302 307.007 147.95" />
        <path strokeWidth="10" d="M 307.007 128.398 C 331.812 142.719 401.333 127.174 443.273 102.193 C 482.243 78.981 545.369 8.9 555.079 -28.829" />
        <path strokeWidth="10" d="M 68.545 -23.06 C 69.207 -20.985 69.087 78.639 108.725 135.914 C 148.883 193.94 180.333 225.897 241.496 225.01" />
        <path strokeWidth="13" d="M 289.538 242.287 C 349.575 238.65 410.797 237.601 509.657 175.902 C 594.584 122.899 644.472 14.236 663.391 -28.494" />
        <path strokeWidth="10" d="M -2.208 -47.265 C 0.121 58.718 67.059 227.084 132.309 281.167 C 179.791 320.523 209.414 320.27 289.537 300.383" />
        <path strokeWidth="15" d="M 279.055 313.722 C 311.054 325.465 444.581 310.019 502.669 285.771 C 635.523 230.313 649.997 179.204 658.147 173.963" />
        <path strokeWidth="10" d="M -40.642 217.539 C -33.11 240.221 37.621 309.223 86.887 336.334 C 137.474 364.172 230.737 391.311 284.496 376.743" />
        <path strokeWidth="13" d="M 255.671 376.584 C 304.19 396.955 402.82 394.656 501.796 360.633 C 566.99 338.222 659.371 264.987 690.471 247.08" />
      </g>
    </svg>
  );
}

function BgGrassBottom({ color }: { color: string }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-auto w-full" viewBox="0 0 316 316" aria-hidden>
      <g fill="none" stroke={color} strokeLinecap="round" strokeWidth="13">
        <path d="M -6.788 282.052 C -4.546 287.782 -3.008 293.841 -0.062 299.243 C 2.784 304.461 7.448 315.401 11.897 320.919" />
        <path d="M 13.392 285.042 C 18.647 299.491 19.377 303.987 26.846 316.434" />
        <path d="M 10.403 255.892 C 18.126 268.1 26.574 279.879 33.573 292.516 C 35.596 296.17 35.483 300.719 37.31 304.475 C 40.002 310.008 43.788 314.939 47.027 320.171" />
        <path d="M 47.774 287.284 C 52.002 297.502 56.227 307.722 60.481 317.929" />
        <path d="M 44.785 246.175 C 49.675 260.848 53.297 270.703 58.986 284.294 C 62.728 293.233 71.281 316.622 72.44 322.414" />
        <path d="M 22.362 188.622 C 27.594 199.086 38.539 219.041 43.29 229.732 C 50.345 245.606 53.425 264.204 61.228 279.81 C 69.402 296.159 76.224 306.065 84.399 322.414" />
        <path d="M 57.491 238.701 C 65.657 255.035 73.049 271.488 79.167 288.779 C 81.587 295.619 92.457 316.107 95.611 322.414" />
        <path d="M 56.743 183.391 C 61.975 193.108 68.145 202.375 72.44 212.541 C 78.515 226.917 85.369 245.441 91.872 259.629 C 97.075 270.981 108.605 311.031 114.297 322.413" />
        <path d="M 76.177 184.138 C 91.78 212.061 100.554 238.605 111.306 268.598 C 118.802 289.509 130.625 308.273 138.214 329.14" />
        <path d="M 90.378 170.684 C 108.895 223.385 130.34 274.872 147.931 327.646" />
        <path d="M 109.064 164.705 C 117.024 184.794 123.722 205.386 132.234 225.247 C 139.142 241.365 146.972 257.16 152.415 273.83 C 157.772 290.237 160.922 307.862 165.122 324.656" />
        <path d="M 127.002 161.715 C 143.25 201.521 158.521 243.342 169.606 285.042 C 173.147 298.361 175.233 312.033 178.575 325.403" />
        <path d="M 127.002 110.142 C 134.904 130.974 137.653 139.537 143.446 160.968 C 148.766 180.652 158.894 207.104 164.374 226.742 C 166.031 232.679 196.951 328.3 193.524 323.161" />
        <path d="M 154.657 140.039 C 163.385 172.455 172.915 205.005 183.06 237.206 C 188.364 254.039 192.591 271.982 198.009 288.779 C 202.031 301.247 204.588 314.046 209.968 326.151" />
        <path d="M 162.879 110.142 C 170.428 135.111 177.653 150.814 184.555 175.916 C 189.521 193.975 199.588 216.203 204.735 234.217 C 206.413 240.09 219.23 293.229 223.421 324.656" />
        <path d="M 178.576 97.436 C 184.541 117.818 186.068 130.379 192.777 150.504 C 198.384 167.325 205.75 183.56 210.715 200.582 C 218.341 226.729 225.946 251.506 234.633 277.567 C 239.81 293.097 241.1 310.166 245.097 326.151" />
        <path d="M 201.746 97.436 C 216.896 140.495 222.925 154.097 234.633 198.339 C 236.468 205.274 245.266 234.076 247.339 240.943 C 255.447 267.801 256.223 296.658 263.035 323.908" />
        <path d="M 209.968 66.044 C 223.005 97.55 231.599 127.905 239.865 160.968 C 241.465 167.367 241.733 174.075 243.602 180.401 C 251.476 207.05 259.968 233.866 266.025 261.124 C 271.118 284.044 271.769 300.15 276.489 323.161" />
        <path d="M 233.886 94.446 C 240.842 112.533 245.303 130.951 251.824 149.009 C 265.074 185.702 278.609 222.356 287.701 260.376 C 293.14 283.122 293.587 296.067 299.66 321.665" />
        <path d="M 232.391 54.832 C 249.313 84.694 259.24 114.525 269.015 147.514 C 277.557 176.343 285.967 204.684 292.185 234.216 C 294.359 244.54 294.882 255.198 295.923 265.609 C 297.71 283.484 301.952 301.449 304.144 319.424" />
        <path d="M 234.633 18.207 C 244.82 45.939 250.435 69.483 259.298 97.436 C 268.537 126.574 281.018 154.417 288.448 184.138 C 299.023 226.437 304.722 269.632 310.871 312.697" />
        <path d="M 274.994 51.095 C 279.304 69.235 288.942 111.507 292.185 129.575 C 295.806 149.748 301.384 169.764 304.144 190.118 C 308.269 220.536 307.823 250.37 313.861 280.557" />
        <path d="M 277.984 16.713 C 284.96 35.897 289.433 56.171 295.175 75.76 C 301.339 96.792 305.05 117.67 308.629 139.292 C 312.635 163.498 317.1 187.626 321.335 211.793" />
        <path d="M 287.701 -4.963 C 298.101 20.171 317.937 70.676 322.083 99.678" />
        <path d="M 304.892 -2.721 C 310.622 13.972 316.353 30.665 322.083 47.358" />
      </g>
    </svg>
  );
}

// ── HighlightCard ─────────────────────────────────────────────────────────────

interface HLCardProps {
  color: string;
  patternColor: string;
  bgPattern: 'circles-corner' | 'grass-left' | 'circles-top' | 'grass-bottom' | 'dots-scattered';
  iconName: string;
  label: string;
  title: string;
  description: string;
  rating: number;
  completion: number;
}

function BgDotsScattered({ color }: { color: string }) {
  // Grid of small scattered dots across the card
  const dots: [number, number, number][] = [
    [40,30,3],[90,20,4],[150,50,3],[200,25,5],[260,40,3],[290,80,4],
    [20,90,4],[70,110,3],[130,85,5],[180,110,4],[240,90,3],[300,60,4],
    [50,160,3],[110,140,4],[170,165,3],[230,150,5],[280,170,3],
    [30,220,4],[85,200,3],[145,230,4],[205,210,3],[260,235,4],[295,200,3],
    [15,275,3],[70,260,5],[135,285,3],[190,270,4],[245,290,3],[285,265,4],
    [55,320,4],[120,310,3],[175,325,4],[235,315,3],[270,310,5],
  ];
  return (
    <svg className="pointer-events-none absolute inset-0 h-auto w-full" viewBox="0 0 316 350" aria-hidden>
      {dots.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={color} />
      ))}
    </svg>
  );
}

const bgComponents = {
  'circles-corner': BgCirclesCorner,
  'grass-left':     BgGrassLeft,
  'circles-top':    BgCirclesTop,
  'grass-bottom':   BgGrassBottom,
  'dots-scattered': BgDotsScattered,
};

function HighlightCard({ color, patternColor, bgPattern, iconName, label, title, description, rating, completion }: HLCardProps) {
  const BgComponent = bgComponents[bgPattern];

  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-5 font-light"
      style={{ backgroundColor: color }}
    >
      <BgComponent color={patternColor} />

      {/* Header */}
      <div className="relative z-10 flex items-start justify-between gap-3">
        <span className="text-base text-white">{label}</span>
        <CategoryBadge iconName={iconName} accentColor={color} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col text-white">
        <h2 className="mb-1 font-libertinus text-4xl font-normal leading-tight [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:1] overflow-hidden">
          {title}
        </h2>
        <p className="mb-5 text-sm leading-snug opacity-90 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
          {description}
        </p>
        <div className="flex items-center gap-3 text-sm font-normal">
          <StarIcon />
          <CheckCircleIcon />
        </div>
      </div>
    </div>
  );
}

// ── Slide configs ─────────────────────────────────────────────────────────────
const slideConfigs: HLCardProps[] = [
  {
    color: 'hsl(4, 56%, 48%)',
    patternColor: 'hsl(4, 56%, 43%)',
    bgPattern: 'circles-corner',
    iconName: 'building',
    label: 'Construction SaaS',
    title: 'Investrack',
    description: 'A whitelabel-ready SaaS platform for managing construction projects, teams, and timelines end-to-end.',
    rating: 4.6,
    completion: 0.45,
  },
  {
    color: 'hsl(225, 58%, 53%)',
    patternColor: 'hsl(225, 58%, 48%)',
    bgPattern: 'grass-left',
    iconName: 'document',
    label: 'Document Management',
    title: 'DokuKita',
    description: 'A centralized document management platform to store, organize, and collaborate on team files with ease.',
    rating: 4.8,
    completion: 0.72,
  },
  {
    color: 'hsl(262, 44%, 53%)',
    patternColor: 'hsl(262, 44%, 48%)',
    bgPattern: 'circles-top',
    iconName: 'home',
    label: 'Rental SaaS',
    title: 'Warum',
    description: 'A rental property management SaaS built specifically for Indonesian landlords to manage tenants and payments.',
    rating: 4.3,
    completion: 0.58,
  },
  {
    color: 'hsl(200, 58%, 48%)',
    patternColor: 'hsl(200, 58%, 42%)',
    bgPattern: 'grass-bottom',
    iconName: 'chat',
    label: 'CRM Tools',
    title: 'Meja',
    description: 'A modern CRM tool to handle customer conversations, support tickets, and sales analytics in one place.',
    rating: 4.7,
    completion: 0.63,
  },
  {
    color: 'hsl(320, 60%, 58%)',
    patternColor: 'hsl(320, 60%, 52%)',
    bgPattern: 'dots-scattered',
    iconName: 'palette',
    label: 'Design System',
    title: 'Bungas',
    description: 'A plug-and-play UI Kit for web and mobile built on design tokens for consistent, scalable interfaces.',
    rating: 4.5,
    completion: 0.35,
  },
];

const slides: CarouselItem[] = slideConfigs.map((config, i) => ({
  id: String(i),
  type: 'custom' as const,
  content: <HighlightCard {...config} />,
}));

// ── PhotosCard ────────────────────────────────────────────────────────────────

export default function PhotosCard() {
  const carouselRef = useRef<BoxCarouselRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setSize({ width, height: width });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Card className="flex flex-col gap-5">
      <div className="flex flex-col items-start justify-between gap-2 xxs:flex-row xxs:items-center">
        <CardTitle variant="mono">Our Products</CardTitle>
        <div className="flex items-center justify-center gap-[6px]">
          {slides.map((p, i) => (
            <button
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => carouselRef.current?.goTo(i)}
              key={p.id}
              className={cn('h-[10px] rounded-full transition-all duration-150', {
                'w-[10px] bg-panel-overlay': i !== currentIndex,
                'h-[6px] w-[30px] bg-theme-1': i === currentIndex,
              })}
            />
          ))}
        </div>
      </div>

      <div ref={containerRef} className="w-full overflow-hidden rounded-md">
        {size.width > 0 && (
          <BoxCarousel
            ref={carouselRef}
            items={slides}
            width={size.width}
            height={size.width}
            direction="top"
            autoPlay
            autoPlayInterval={3000}
            onIndexChange={setCurrentIndex}
            enableDrag
            perspective={1000}
            className="rounded-md"
          />
        )}
      </div>
    </Card>
  );
}
