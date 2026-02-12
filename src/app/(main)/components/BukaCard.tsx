import CardTitle from '~/src/components/ui/CardTitle';

import Card from './Card';

export default function BukaCard() {
  return (
    <Card className="h-full">
      <div className="flex h-full flex-col justify-between gap-7">
        <div className="flex justify-between">
          <CardTitle variant="mono" className="border-panel-border">
            Our Manifesto
          </CardTitle>
        </div>
        <div className="font-archivo text-3xl md:text-4xl">
          Creative &amp; <br />
          Technology
        </div>
        <p className="text-text-primary text-sm">
          We believe great products are born at the intersection of creativity and technology.
          Combining bold design thinking with cutting-edge development to build digital experiences
          that truly matter.
        </p>
      </div>
    </Card>
  );
}
