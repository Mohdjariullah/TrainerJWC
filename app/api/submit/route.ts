





// Deprecated: This file is no longer used.


import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // const WEBHOOK_URL = 'https://primary-production-66f3.up.railway.app/webhook/0ce94605-f289-4dd0-aade-3ff35149a73b';
    const WEBHOOK_URL = 'https://primary-production-66f3.up.railway.app/webhook-test/7d0f1118-df2a-489a-bbcd-f175d6ac212f';    
    // Get the request body
    const data = await request.json();
    console.log('Raw form data:', data);    // Make the webhook call with wrapped data format n8n expects
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: data  // n8n expects data in a wrapper object
      })
    });

    // Log the n8n response for debugging
    const webhookResponse = await response.text();
    console.log('n8n response status:', response.status);
    console.log('n8n response body:', webhookResponse);
    
    return new Response(webhookResponse, {
      status: response.status,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { 
        error: 'Error forwarding to webhook',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
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