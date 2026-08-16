import { NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/utils/email';

function alreadyOnList(status: number, data: { message?: string; success?: boolean }) {
  const msg = (data.message || '').toLowerCase();
  return status === 409 || msg.includes('already');
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const LOOPS_API_KEY = process.env.LOOPS_API_KEY;

    if (!LOOPS_API_KEY) {
      console.error('Email subscribe is not configured');
      return NextResponse.json(
        { error: 'Unable to subscribe right now' },
        { status: 500 }
      );
    }

    const payload = {
      email: email.trim(),
      source: 'OverlayTool',
      subscribed: true,
    };

    // Update creates the contact if it is not already in the audience.
    const response = await fetch('https://app.loops.so/api/v1/contacts/update', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({} as { message?: string }));

    if (!response.ok && !alreadyOnList(response.status, data)) {
      console.error('Loops API error:', data);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email collected successfully',
      },
      { status: 200 }
    );

  } catch {
    console.error('Error collecting email');
    return NextResponse.json(
      { error: 'Failed to collect email' },
      { status: 500 }
    );
  }
}
