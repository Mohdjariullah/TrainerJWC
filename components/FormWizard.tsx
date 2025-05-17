'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from '@/context/FormContext';
import questions from '@/lib/questions';
import OptionButton from '@/components/OptionButton';
import ProgressBar from '@/components/ProgressBar';
import { useState } from 'react';

interface ContactInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

interface FormAnswers {
  [key: string]: string | string[] | ContactInfo;
  contact_info?: ContactInfo;
}

export default function FormWizard() {
  const { state, dispatch } = useForm();
  const [showSummary, setShowSummary] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const currentQuestion = questions[state.currentStep];
  const isFirstQuestion = state.currentStep === 0;
  const isLastQuestion = state.currentStep === questions.length - 1;
  
  const handlePrevious = () => {
    if (state.currentStep > 0) {
      dispatch({ type: 'PREV_STEP' });
      if (showSummary) {
        setShowSummary(false);
      }
    }
  };

  const handleReviewAnswers = () => {
    setShowSummary(true);
  };
  const handleSubmit = async () => {
    try {
      setSubmissionStatus('loading');
      
      // Get contact info from the last question
      const contactInfo = state.answers.contact_info || {};
      
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Form answers
          answers: {
            role: state.answers.role,
            age: state.answers.age,
            skill_level: state.answers.skill_level,
            dream_goal: state.answers.dream_goal,
            training_status: state.answers.training_status,
            commitment_level: state.answers.commitment_level,
            investment_willingness: state.answers.investment_willingness,
            program_preferences: state.answers.program_preferences,
            hesitation_reason: state.answers.hesitation_reason,
            level_up: state.answers.level_up,
          },
          // Contact information
          contact: {
            firstName: contactInfo.firstName || '',
            lastName: contactInfo.lastName || '',
            email: contactInfo.email || '',
            phone: contactInfo.phone || ''
          },
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      const result = await response.json();
      if (result.success) {
        setSubmissionStatus('success');
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error');
      setErrorMessage('There was an error submitting your evaluation. Please try again in a few minutes.');
    }
  };
  // Show summary view
  if (showSummary) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Review Your Answers</h2>
            
            <div className="space-y-6 mb-12 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {questions.map((question) => (
                <div key={question.id} className="bg-[#2C2C2C] rounded-lg p-6">                  <p className="text-gray-400 mb-3">{question.text}</p>
                  <div className="text-white text-lg">
                    {question.isContactForm ? (
                      <div className="grid grid-cols-2 gap-2">
                        {state.answers[question.id] && typeof state.answers[question.id] === 'object' && (
                          <>
                            <div className="text-gray-300">
                              <strong>Name:</strong>{' '}
                              {`${(state.answers[question.id] as any).firstName || ''} ${(state.answers[question.id] as any).lastName || ''}`}
                            </div>
                            <div className="text-gray-300">
                              <strong>Email:</strong> {(state.answers[question.id] as any).email || ''}
                            </div>
                            <div className="text-gray-300">
                              <strong>Phone:</strong> {(state.answers[question.id] as any).phone || ''}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="font-medium">
                        {Array.isArray(state.answers[question.id])
                          ? (state.answers[question.id] as string[]).join(", ")
                          : state.answers[question.id] as string}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevious}
                className="px-6 py-3 bg-[#2C2C2C] text-white rounded-full hover:bg-[#3C3C3C] transition-colors"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                disabled={submissionStatus === 'loading'}
                className={`px-8 py-3 bg-[#0D6EFD] text-white rounded-full font-medium ${
                  submissionStatus === 'loading' 
                    ? 'opacity-75 cursor-wait' 
                    : 'hover:opacity-90 transition-opacity'
                }`}
              >
                {submissionStatus === 'loading' ? 'Submitting...' : 'Submit'}
              </button>
            </div>

            {submissionStatus === 'success' && (
              <div className="mt-8 p-4 bg-green-900/50 border border-green-500 text-green-100 rounded-lg text-center">
                Thank you! Your responses have been submitted successfully.
              </div>
            )}

            {submissionStatus === 'error' && (
              <div className="mt-8 p-4 bg-red-900/50 border border-red-500 text-red-100 rounded-lg text-center">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show question form
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Progress bar fixed at top */}      {state.currentStep > 0 && (
        <div className="w-full py-6 border-b border-[#2C2C2C]">
          <div className="max-w-2xl mx-auto">
            <ProgressBar currentStep={state.currentStep} totalSteps={questions.length} />
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              {currentQuestion.title && (
                <h2 className="text-lg text-gray-400 mb-3 italic">{currentQuestion.title}</h2>
              )}
              <h1 className="text-4xl font-bold text-white mb-12 text-center max-w-3xl">{currentQuestion.text}</h1>
                <div className="w-full space-y-4">
                {currentQuestion.isContactForm ? (
                  <div className="bg-[#1A1A1A] rounded-lg p-8 space-y-6">
                    {currentQuestion.fields?.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <label htmlFor={field.name} className="block text-gray-300 text-sm">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          required={field.required}
                          className="w-full px-4 py-3 bg-[#2C2C2C] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder={`Enter your ${field.label.toLowerCase()}`}
                          onChange={(e) => {
                            dispatch({
                              type: 'SET_ANSWER',
                              questionId: currentQuestion.id,
                              answer: {
                                ...state.answers[currentQuestion.id],
                                [field.name]: e.target.value
                              }
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  currentQuestion.options?.map((option) => (
                    <OptionButton 
                      key={option} 
                      questionId={currentQuestion.id} 
                      option={option} 
                    />
                  ))
                )}
              </div>

              <div className="mt-12 flex gap-4">
                {!isFirstQuestion && (
                  <button
                    onClick={handlePrevious}
                    className="px-6 py-2 text-white bg-[#2C2C2C] rounded-md hover:bg-[#3C3C3C]"
                  >
                    Previous
                  </button>
                )}
                {isLastQuestion && state.answers[currentQuestion.id] && (
                  <button
                    onClick={handleReviewAnswers}
                    className="px-6 py-2 text-white bg-[#0D6EFD] rounded-md hover:opacity-90"
                  >
                    Review Answers
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}