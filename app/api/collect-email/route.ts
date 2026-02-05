import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const LOOPS_API_KEY = process.env.LOOPS_API_KEY;

    if (!LOOPS_API_KEY) {
      console.error('LOOPS_API_KEY is missing');
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Add contact to Loops
    const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOOPS_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        source: 'OverlayTool',
        subscribed: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Loops API error:', data);
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: response.status }
      );
    }

    console.log('Email added to Loops successfully:', email);

    return NextResponse.json(
      {
        success: true,
        message: 'Email collected successfully',
        email: email
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error collecting email:', error);
    return NextResponse.json(
      { error: 'Failed to collect email' },
      { status: 500 }
    );
  }
}
