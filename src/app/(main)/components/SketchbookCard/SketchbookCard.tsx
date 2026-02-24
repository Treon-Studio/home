'use client';

import { AnimatedGridPattern } from '~/src/components/ui/AnimatedGridPattern';
import CardTitle from '~/src/components/ui/CardTitle';
import MarqueeAlongSvgPath from '~/src/components/ui/MarqueeAlongSvgPath';
import { cn } from '~/src/util';

import Card from '../Card';

const path =
  'M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5';

const imgs = [
  { src: '/home/clients/emoroa.png' },
  { src: '/home/clients/frame-414.png' },
  { src: '/home/clients/frame-416.png' },
  { src: '/home/clients/frame-417.png' },
  { src: '/home/clients/frame-419.png' },
  { src: '/home/clients/frame-420.png' },
  { src: '/home/clients/frame-422.png' },
  { src: '/home/clients/frame-423.png' },
  { src: '/home/clients/frame-424.png' },
  { src: '/home/clients/karim.png' },
  { src: '/home/clients/mask-group.png' },
  { src: '/home/clients/mata-air.png' },
  { src: '/home/clients/sozo.png' },
  { src: '/home/clients/tenang.png' },
];

export default function SketchbookCard() {
  return (
    <Card id="previous-client" containerClassName="min-w-0 overflow-hidden">
      <div className="flex h-full w-full min-w-0 flex-col gap-3 overflow-hidden">
        <div className="relative flex h-full min-h-[300px] w-full min-w-0 items-center justify-center overflow-hidden">
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              'mask-[radial-gradient(500px_circle_at_center,white,transparent)]',
              'inset-x-0 inset-y-[-30%] h-[200%] skew-y-12',
            )}
          />
          <MarqueeAlongSvgPath
            path={path}
            viewBox="0 -50 996 330"
            baseVelocity={8}
            slowdownOnHover={true}
            draggable={true}
            repeat={1}
            dragSensitivity={0.1}
            className="h-full w-full scale-105"
            responsive
            grabCursor
          >
            {imgs.map((img, i) => (
              <div key={i} className="h-[84px] w-[84px] overflow-hidden rounded-lg duration-300 ease-in-out hover:scale-150">
                <img
                  src={img.src}
                  alt={`Client ${i}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </MarqueeAlongSvgPath>
        </div>
        <div className="flex items-center justify-between gap-2">
          <CardTitle variant="mono">Previous Client</CardTitle>
        </div>
      </div>
    </Card>
  );
}
