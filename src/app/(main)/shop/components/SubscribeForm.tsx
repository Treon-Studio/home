'use client';

import { useState } from 'react';

import Button from '~/src/components/ui/Button';
import Input from '~/src/components/ui/Input';
import { cn } from '~/src/util';

export default function SubscribeForm({ className = '' }: { className?: string }) {
  const [message, setMessage] = useState('');

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setMessage('Coming soon! Stay tuned.');
    setTimeout(() => setMessage(''), 3000);
  }

  return (
    <form className={cn(className)} onSubmit={handleSubscribe}>
      <Input
        type="email"
        placeholder="Enter email"
        containerClassName="w-full"
        className="w-full"
        action={<Button buttonClassName="bg-theme-4">Subscribe</Button>}
      />
      {message && (
        <p className="mt-2 text-sm text-text-secondary">{message}</p>
      )}
    </form>
  );
}
