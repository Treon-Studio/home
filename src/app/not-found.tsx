import { Press_Start_2P } from 'next/font/google';

import Header from './(main)/components/Header';
import PongGame from './PongGame';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start',
});

export default function NotFound() {
  return (
    <div className={`${pressStart2P.variable} bg-main-background min-h-screen`}>
      <div className="m-auto max-w-(--breakpoint-2xl)">
        <Header />
        <main className="flex flex-1 flex-col items-center px-5 py-6">
          <PongGame />
        </main>
      </div>
    </div>
  );
}
