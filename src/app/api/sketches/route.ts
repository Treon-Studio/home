import { NextResponse } from 'next/server';

const MAX_SIZE = 500 * 1024; // 500KB

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const svgFile = formData.get('svg') as File;

    if (!svgFile) {
      return NextResponse.json({ message: 'SVG file is required.' }, { status: 400 });
    }

    if (svgFile.size > MAX_SIZE) {
      return NextResponse.json({ message: 'SVG file is too large.' }, { status: 413 });
    }

    // Mock response - sketch upload disabled
    console.log('Sketch upload received (storage disabled)');

    return NextResponse.json(
      {
        message: 'Sketch received (storage disabled).',
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}
