'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import AnimatedPathText from '~/src/components/ui/AnimatedPathText';

const rectPath =
  'M 20,20 L 180,20 A 20,20 0 0,1 200,40 L 200,160 A 20,20 0 0,1 180,180 L 20,180 A 20,20 0 0,1 0,160 L 0,40 A 20,20 0 0,1 20,20';

export default function WaitlistSection() {
  const t = useTranslations('waitlist');
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const buttonCopy = {
    idle: t('subscribe'),
    loading: (
      <motion.div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
    ),
    success: t('done'),
  } as const;

  const handleSubmit = useCallback(() => {
    if (buttonState === 'success') return;

    setButtonState('loading');

    setTimeout(() => {
      setButtonState('success');
    }, 1750);

    setTimeout(() => {
      setButtonState('idle');
      setEmail('');
    }, 3500);
  }, [buttonState]);

  return (
    <section className="flex justify-center py-24">
      <div className="relative flex aspect-square w-full max-w-[480px] items-center justify-center">
        <AnimatedPathText
          path={rectPath}
          svgClassName="absolute inset-0"
          viewBox="-20 0 240 200"
          text={t('animatedText')}
          textClassName="text-[10.6px] lowercase text-text-primary"
          duration={20}
          preserveAspectRatio="xMidYMid meet"
          textAnchor="start"
        />

        <div className="relative w-full px-16">
          <div className="space-y-2">
            <input
              type="email"
              placeholder={t('enterEmail')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-text-primary placeholder:text-text-muted w-full rounded-lg border bg-transparent px-4 py-2 text-sm focus:outline-none sm:text-base"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={buttonState === 'loading'}
              className="bg-text-primary text-text-contrast flex h-10 w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors sm:text-base"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                  initial={{ opacity: 0, y: -25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 25 }}
                  key={buttonState}
                >
                  {buttonCopy[buttonState]}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
