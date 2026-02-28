'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { NextIntlClientProvider } from 'next-intl';

import idMessages from '~/messages/id.json';
import enMessages from '~/messages/en.json';

type Locale = 'id' | 'en';

const messages: Record<Locale, typeof idMessages> = {
  id: idMessages,
  en: enMessages,
};

const LocaleContext = createContext<Locale>('id');
const SetLocaleContext = createContext<(locale: Locale) => void>(() => {});

export function useLocale() {
  return useContext(LocaleContext);
}

export function useSetLocale() {
  return useContext(SetLocaleContext);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('id');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale | null;
    if (stored === 'id' || stored === 'en') {
      setLocaleState(stored);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  return (
    <LocaleContext.Provider value={locale}>
      <SetLocaleContext.Provider value={setLocale}>
        <NextIntlClientProvider locale={locale} messages={messages[locale]}>
          {children}
        </NextIntlClientProvider>
      </SetLocaleContext.Provider>
    </LocaleContext.Provider>
  );
}
