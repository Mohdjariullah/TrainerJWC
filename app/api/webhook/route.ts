import { NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://primary-production-66f3.up.railway.app/webhook/0ce94605-f289-4dd0-aade-3ff35149a73b';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    console.log('Submitting to webhook:', formData);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Webhook responded with status: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
