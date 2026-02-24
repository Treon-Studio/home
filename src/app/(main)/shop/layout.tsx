import { Suspense } from 'react';

import Header from './components/Header';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      {children}
    </>
  );
}
