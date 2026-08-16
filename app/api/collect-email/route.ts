import { NextResponse } from 'next/server';
import { isValidEmail } from '@/lib/utils/email';

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

    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
        source: 'OverlayTool',
        subscribed: true,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('Loops API error:', data);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email collected successfully',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error collecting email');
    return NextResponse.json(
      { error: 'Failed to collect email' },
      { status: 500 }
    );
  }
}
