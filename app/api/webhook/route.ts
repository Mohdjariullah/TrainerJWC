import { NextResponse } from 'next/server';
import { calculatePoints, getProfileTier } from '@/lib/calculateProfile';

const WEBHOOK_URL = 'https://nomad77.app.n8n.cloud/webhook/939f601d-b8db-4a09-827d-8d06d0f96938';

export async function POST(request: Request) {
  try {
    // Get the request body
    const data = await request.json();
    
    // Add question numbers to the answers
    const numberedAnswers = {
      q1_role: data.answers.role,
      q2_age: data.answers.age,
      q3_dream_goal: data.answers.dream_goal,
      q4_training_status: data.answers.training_status,
      q5_investment_willingness: data.answers.investment_willingness,
      q6_confidence_pressure: data.answers.confidence_pressure?.toString() || '',
      q7_training_transfer: data.answers.training_transfer?.toString() || '',
      q8_self_direction: data.answers.self_direction?.toString() || '',
      q9_bounce_back: data.answers.bounce_back?.toString() || '',
      q10_competitive_drive: data.answers.competitive_drive?.toString() || '',
      q11_shooting_consistency: data.answers.shooting_consistency?.toString() || '',
      q12_finishing_contact: data.answers.finishing_contact?.toString() || '',
      q13_game_situations: data.answers.game_situations?.toString() || 'Not answered',
      q14_physical_tools: data.answers.physical_tools?.toString() || 'Not answered',
      q15_play_strengths: data.answers.play_strengths?.toString() || ''
    };

    const points = calculatePoints(data.answers);
    const profileTier = getProfileTier(points);
    
    const enrichedData = {
      answers: numberedAnswers,
      contact: data.contact,
      evaluation: {
        points,
        tier: profileTier
      },
      timestamp: new Date().toISOString()
    };

    console.log('Submitting to webhook:', enrichedData);
    console.log('Calculated Points:', points);
    console.log('Assigned Tier:', profileTier);

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