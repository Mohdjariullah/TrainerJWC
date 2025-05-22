import { NextResponse } from 'next/server';
import { calculatePoints, getProfileTier } from '@/lib/calculateProfile';

const WEBHOOK_URL = 'https://nomad77.app.n8n.cloud/webhook/939f601d-b8db-4a09-827d-8d06d0f96938';

export async function POST(request: Request) {
  try {
    // Get the request body
    const data = await request.json();
    
    console.log('Original data received:', data);
    
    // Get Instagram value from contact_info object
    const contactInfo = data.answers.contact_info || {};
    const instagram = contactInfo.instagram || '';
    
    // Map the answers to the expected format
    const answers = {
      q1_role: data.answers.role || 'Athlete', // Default to Athlete if not specified
      q2_age: data.answers.age || '14-18 (High School)', // Default to high school age if not specified
      q3_dream_goal: data.answers.dream_goal || '',
      q4_training_status: data.answers.training_status || '',
      q5_investment_willingness: data.answers.investment_willingness || '',
      q6_confidence_pressure: data.answers.confidence_pressure?.toString() || '',
      q7_training_transfer: data.answers.training_transfer?.toString() || '',
      q8_self_direction: data.answers.self_direction?.toString() || '',
      q9_bounce_back: data.answers.bounce_back?.toString() || '',
      q10_competitive_drive: data.answers.competitive_drive?.toString() || '',
      q11_shooting_consistency: data.answers.shooting_consistency?.toString() || '',
      q12_finishing_contact: data.answers.finishing_contact?.toString() || '',
      q13_game_situations: data.answers.game_situations?.toString() || '',
      q14_physical_tools: data.answers.physical_tools?.toString() || '',
      q15_play_strengths: data.answers.play_strengths?.toString() || ''
    };

    // Make sure we're calculating points with the complete data
    const calculationData = {
      ...data.answers,
      role: data.answers.role || 'Athlete',
      age: data.answers.age || '14-18 (High School)'
    };
    
    const points = calculatePoints(calculationData);
    const profileTier = getProfileTier(points);
    
    const enrichedData = {
      answers,
      contact: {
        firstName: data.contact?.firstName || contactInfo.firstName || '',
        lastName: data.contact?.lastName || contactInfo.lastName || '',
        email: data.contact?.email || contactInfo.email || '',
        phone: data.contact?.phone || contactInfo.phone || '',
        instagram: instagram // Add Instagram field from contact_info
      },
      evaluation: {
        points,
        tier: profileTier
      },
      timestamp: new Date().toISOString()
    };

    console.log('Submitting to webhook:', enrichedData);
    console.log('Calculated Points:', points);
    console.log('Assigned Tier:', profileTier);
    console.log('Instagram Username:', instagram);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: enrichedData
      }),
    });

    // Log the n8n response for debugging
    const webhookResponse = await response.text();
    console.log('n8n response status:', response.status);
    console.log('n8n response body:', webhookResponse);

    return NextResponse.json({ 
      success: true,
      points,
      tier: profileTier
    });
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
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
}
// This file handles the form submission to a webhook URL.