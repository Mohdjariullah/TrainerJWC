import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const WEBHOOK_URL = 'https://primary-production-66f3.up.railway.app/webhook-test/7d0f1118-df2a-489a-bbcd-f175d6ac212f';
    
    const data = await request.json();
    console.log('Submitting to webhook:', data);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          ...data,
          source: 'form-wizard'
        }
      }),
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

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
// This file handles the form submission to a webhook URL.