import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const pathname = searchParams.get('pathname');

    if (!pathname) {
      return NextResponse.json({ message: 'Pathname is required.' }, { status: 400 });
    }

    // Return mock count
    return NextResponse.json({ count: 0 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);

  try {
    const pathname = searchParams.get('pathname');

    if (!pathname) {
      return NextResponse.json({ message: 'Pathname is required.' }, { status: 400 });
    }

    // Return mock response
    return NextResponse.json({ count: 0 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}
