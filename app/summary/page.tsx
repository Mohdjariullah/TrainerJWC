'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@/context/FormContext';
import questions from '@/lib/questions';

export default function SummaryPage() {
  const router = useRouter();
  const { state } = useForm();
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Handle form submission
  const handleSubmit = async () => {
    setSubmissionStatus('loading');
    
    try {
      // Webhook URL for form submission
      const webhookUrl = 'https://your-webhook-url.com/submit-form'; // Replace with your actual webhook URL
      
      // Send form data to the webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state.answers),
      });
      
      if (response.ok) {
        setSubmissionStatus('success');
      } else {
        setSubmissionStatus('error');
        setErrorMessage('Error submitting the form. Please try again later.');
      }
    } catch {
      setSubmissionStatus('error');
      setErrorMessage('Error submitting the form. Please try again later.');
    }
  };
  
  const handleBack = () => {
    router.push(`/step/${questions.length - 1}`);
  };
  
  // Render the summary page
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Summary</h1>
      
      <div className="space-y-4 mb-8">
        {questions.map((question) => (
          <div key={question.id} className="border-b pb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{question.text}</h2>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
              {state.answers[question.id] || 'Not answered'}
            </p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <button 
          onClick={handleBack}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-all shadow-sm hover:shadow"
        >
          Back
        </button>
        
        <button 
          onClick={handleSubmit} 
          disabled={submissionStatus === 'loading'}
          className={`px-6 py-2 rounded-md transition-all shadow-sm ${
            submissionStatus === 'loading' 
              ? 'bg-blue-400 text-white cursor-wait' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow'
          }`}
        >
          {submissionStatus === 'loading' ? 'Submitting...' : 'Submit'}
        </button>
      </div>
      
      {submissionStatus === 'success' && (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-md">
          Form submitted successfully! Thank you for your responses.
        </div>
      )}
      
      {submissionStatus === 'error' && (
        <div className="mt-6 p-4 bg-red-100 text-red-800 rounded-md">
          {errorMessage}
        </div>
      )}
    </div>
  );
}