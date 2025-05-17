interface FormAnswers {
  [key: string]: string | string[];
}

interface SubmissionResult {
  success: boolean;
  message: string;
}

export async function submitToWebhook(formAnswers: FormAnswers): Promise<SubmissionResult> {
  try {
    console.log('Preparing to send form answers:', formAnswers);

    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        formData: formAnswers,
      }),
    });

    // Log the response for debugging
    const responseText = await response.text();
    console.log('Webhook response:', {
      status: response.status,
      statusText: response.statusText,
      body: responseText
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}, response: ${responseText}`);
    }

    return {
      success: true,
      message: 'Your evaluation has been submitted successfully! We\'ll be in touch soon.',
    };
  } catch (error) {
    // Log the full error for debugging
    console.error('Detailed submission error:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    // Return a more specific error message if possible
    let errorMessage = 'There was an error submitting your evaluation. ';
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
        errorMessage += 'Please check your internet connection and try again.';
      } else if (error.message.includes('404')) {
        errorMessage += 'The submission endpoint could not be found. Please contact support.';
      } else if (error.message.includes('500')) {
        errorMessage += 'The server encountered an error. Please try again in a few minutes.';
      } else {
        errorMessage += 'Please try again or contact support if the problem persists.';
      }
    }

    return {
      success: false,
      message: errorMessage
    };
  }
}
