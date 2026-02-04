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

    // Option 1: Mailchimp
    // const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
    // const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
    // const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX; // e.g., 'us1'
    
    // const response = await fetch(
    //   `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${MAILCHIMP_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email_address: email,
    //       status: 'subscribed',
    //       tags: ['OverlayTool'],
    //     }),
    //   }
    // );

    // Option 2: ConvertKit
    // const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
    // const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;
    
    // const response = await fetch(
    //   `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       api_key: CONVERTKIT_API_KEY,
    //       email: email,
    //       tags: ['OverlayTool User'],
    //     }),
    //   }
    // );

    // Option 3: Beehiiv
    // const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
    // const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;
    
    // const response = await fetch(
    //   `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${BEEHIIV_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       reactivate_existing: false,
    //       send_welcome_email: true,
    //       utm_source: 'OverlayTool',
    //       utm_medium: 'tool_signup',
    //     }),
    //   }
    // );

    // Option 4: Resend (simplest for developers)
    // const RESEND_API_KEY = process.env.RESEND_API_KEY;
    // const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;
    
    // const response = await fetch(
    //   'https://api.resend.com/audiences/' + RESEND_AUDIENCE_ID + '/contacts',
    //   {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${RESEND_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       unsubscribed: false,
    //     }),
    //   }
    // );

    // Option 5: Loops
    // const LOOPS_API_KEY = process.env.LOOPS_API_KEY;
    
    // const response = await fetch(
    //   'https://app.loops.so/api/v1/contacts/create',
    //   {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${LOOPS_API_KEY}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       source: 'OverlayTool',
    //       subscribed: true,
    //     }),
    //   }
    // );

    // For now, just log it (uncomment one of the above)
    console.log('Email collected:', email);

    // Return success
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
