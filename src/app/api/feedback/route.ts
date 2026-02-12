import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  message: z.string().trim().min(1).max(1000),
  hp: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.formData().catch(() => new FormData());

    const data = Object.fromEntries(body);
    const parsed = schema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid payload.' }, { status: 400 });
    }

    if (parsed.data.hp && parsed.data.hp.length > 0) {
      return NextResponse.json({}, { status: 204 });
    }

    // Mock response - feedback received
    console.log('Feedback received:', parsed.data.message);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
