'use client';

import CardTitle from '~/src/components/ui/CardTitle';
import MarqueeAlongSvgPath from '~/src/components/ui/MarqueeAlongSvgPath';

import Card from '../Card';

const path =
  'M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5';

const imgs = [
  {
    src: 'https://cdn.cosmos.so/b9909337-7a53-48bc-9672-33fbd0f040a1?format=jpeg',
  },
  {
    src: 'https://cdn.cosmos.so/ecdc9dd7-2862-4c28-abb1-dcc0947390f3?format=jpeg',
  },
  {
    src: 'https://cdn.cosmos.so/79de41ec-baa4-4ac0-a9a4-c090005ca640?format=jpeg',
  },
  {
    src: 'https://cdn.cosmos.so/1a18b312-21cd-4484-bce5-9fb7ed1c5e01?format=jpeg',
  },
  {
    src: 'https://cdn.cosmos.so/d765f64f-7a66-462f-8b2d-3d7bc8d7db55?format=jpeg',
  },
  {
    src: 'https://cdn.cosmos.so/6b9f08ea-f0c5-471f-a620-71221ff1fb65?format=jpeg',
  },
  {
    src: 'https://cdn.cosmos.so/40a09525-4b00-4666-86f0-3c45f5d77605?format=jpeg',
  },
  {
    src: 'https://cdn.cosmos.so/14f05ab6-b4d0-4605-9007-8a2190a249d0?format=jpeg',
  },
  {
    src: 'https://cdn.cosmos.so/d05009a2-a2f8-4a4c-a0de-e1b0379dddb8?format=jpeg',
  },
  {
    src: 'https://cdn.cosmos.so/ba646e35-efc2-494a-961b-b40f597e6fc9?format=jpeg',
  },
  {
    src: 'https://cdn.cosmos.so/e899f9c3-ed48-4899-8c16-fbd5a60705da?format=jpeg',
  },
  {
    src: 'https://cdn.cosmos.so/24e83c11-c607-45cd-88fb-5059960b56a0?format=jpeg',
  },
  {
    src: 'https://cdn.cosmos.so/cd346bce-f415-4ea7-8060-99c5f7c1741a?format=jpeg',
  },
];

export default function SketchbookCard() {
  return (
    <Card id="previous-client" containerClassName="min-w-0 overflow-hidden">
      <div className="flex h-full w-full min-w-0 flex-col gap-3 overflow-hidden">
        <div className="relative flex h-full min-h-[300px] w-full min-w-0 items-center justify-center overflow-hidden">
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
