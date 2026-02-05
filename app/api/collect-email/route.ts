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

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    // Send welcome email with Resend (no audience needed!)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'OverlayTool <onboarding@resend.dev>', // Use resend.dev for testing
        to: [email],
        subject: 'Welcome to OverlayTool! 🎨',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #6366f1;">Welcome to OverlayTool!</h1>
            <p>Thanks for signing up. You're all set to start creating beautiful overlays.</p>
            <p>Here's what you can do:</p>
            <ul>
              <li>Create unlimited overlays</li>
              <li>Export instantly</li>
              <li>No tracking, ever</li>
            </ul>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/tool" 
               style="display: inline-block; background: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 16px;">
              Start Creating →
            </a>
            <p style="color: #6b7280; font-size: 14px; margin-top: 32px;">
              OverlayTool Team
            </p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      throw new Error('Failed to send welcome email');
    }

    console.log('Email sent successfully:', email);

    // Optional: Store in your database here
    // await db.emails.create({ email, createdAt: new Date() });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Welcome email sent!',
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
