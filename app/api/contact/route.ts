import { NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/utils/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!name || !isValidEmail(email) || message.length < 4) {
      return NextResponse.json({ error: 'Please fill in name, a valid email, and a message.' }, { status: 400 });
    }

    const LOOPS_API_KEY = process.env.LOOPS_API_KEY;
    if (!LOOPS_API_KEY) {
      console.error('Contact form is not configured');
      return NextResponse.json({ error: 'Unable to send right now. Try again later.' }, { status: 500 });
    }

    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstName: name.slice(0, 80),
        source: 'ContactForm',
        subscribed: true,
        userGroup: 'contact',
      }),
    });

    if (!response.ok) {
      console.error('Contact form Loops error');
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
