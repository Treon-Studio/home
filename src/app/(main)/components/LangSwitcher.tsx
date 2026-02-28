'use client';

import { useLocale, useSetLocale } from '~/src/providers/LocaleProvider';
import useDidMount from '~/src/hooks/useDidMount';
import { cn } from '~/src/util';

const langs = [
  { label: 'ID', value: 'id' as const },
  { label: 'EN', value: 'en' as const },
];

export default function LangSwitcher() {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const didMount = useDidMount();

  const activeIndex = langs.findIndex(({ value }) => value === locale);

  const highlightWidth = '2.25rem';
  const highlightOffset = `${0.25 + activeIndex * (2.25 + 0.25)}rem`;

  return (
    <div className="border-panel-border bg-panel-background shadow-card relative flex items-center gap-1 rounded-full border p-1">
      {didMount && (
        <div
          className="bg-theme-3 absolute h-7 rounded-full transition-[left] duration-300 ease-out"
          style={{
            width: highlightWidth,
            left: highlightOffset,
          }}
        />
      )}

      {langs.map(({ label, value }) => {
        const isActive = didMount && locale === value;
        return (
          <button
            className={cn(
              'relative z-1 rounded-full px-3 py-1 text-xs font-medium transition-colors',
              {
                'text-text-primary': isActive,
                'text-text-muted hover:text-text-primary': !isActive,
              },
            )}
            key={value}
            aria-label={`Switch to ${label}`}
            onClick={() => setLocale(value)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
