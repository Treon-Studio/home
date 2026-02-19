import { LogoIcon } from '~/src/components/icons';

import Card from './Card';

export default function BukaCard() {
  return (
    <Card className="relative flex h-full flex-col !bg-white !p-0 overflow-hidden">
      <div className="flex-1">
        {/* Speech bubble */}
        <div className="relative rounded-b-2xl bg-[#F5C6D0] p-5">
          <p className="mb-3 font-libertinus-serif text-xs italic text-[#3D1220]/60">
            Success Story
          </p>
          <blockquote className="font-semibold leading-[1.3] text-[#3D1220] md:text-lg">
            &ldquo;I thought getting noticed on social media was a matter of luck, but I
            didn&apos;t start seeing results until I actually created a research-backed social
            strategy.&rdquo;
          </blockquote>

          {/* Smooth curved tail */}
          <svg
            className="absolute -bottom-[18px] left-1/3"
            width="40"
            height="22"
            viewBox="0 0 40 22"
            fill="none"
          >
            <path
              d="M0,0 L0,14 Q0,21 7,21 Q20,18 40,0 Z"
              fill="#F5C6D0"
            />
          </svg>
        </div>
      </div>

      {/* Client info */}
      <div className="flex items-center justify-between px-5 pb-5 pt-6">
        <div>
          <p className="text-sm font-semibold text-[#3D1220]">Lorna Alvarado</p>
          <p className="text-xs text-[#3D1220]/60">Owner Virtru Interior</p>
        </div>
        <LogoIcon className="h-5 w-5 text-[#3D1220]/30" />
      </div>
    </Card>
  );
}
