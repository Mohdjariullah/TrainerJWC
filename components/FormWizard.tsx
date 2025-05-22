'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from '@/context/FormContext';
import questions, { parentQuestions } from '@/lib/questions';
import OptionButton from '@/components/OptionButton';
import ProgressBar from '@/components/ProgressBar';
import { useState } from 'react';
import ContactForm from '@/components/ContactForm';
import RangeSlider from './RangeSlider';

export default function FormWizard() {
  const { state, dispatch } = useForm();
  const [showSummary, setShowSummary] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const currentQuestions = state.answers.role === 'Parent' ? parentQuestions : questions;
  const currentQuestion = currentQuestions[state.currentStep];
  const isFirstQuestion = state.currentStep === 0;
  const isLastQuestion = state.currentStep === currentQuestions.length - 1;
  
  // Add the missing isFormComplete function
  const isFormComplete = () => {
    if (!currentQuestion.isContactForm || !currentQuestion.fields) return true;
    
    const contactInfo = state.answers[currentQuestion.id] as Record<string, string> || {};
    
    return currentQuestion.fields.every(field => {
      // Last name is optional, all others are required
      if (field.name === 'lastName') return true;
      return !!contactInfo[field.name];
    });
  };
  
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
      const contactInfo = (state.answers.contact_info || {}) as {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
      };
      
      const formData = {
        answers: state.answers,
        contact: {
          firstName: contactInfo.firstName || '',
          lastName: contactInfo.lastName || '',
          email: contactInfo.email || '',
          phone: contactInfo.phone || ''
        },
        timestamp: new Date().toISOString()
      };

      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const webhookResponse = await response.json();

      if (webhookResponse.success) {
        setSubmissionStatus('success');
        localStorage.setItem('formState', JSON.stringify(state));
        window.location.href = '/summary';
      } else {
        throw new Error(webhookResponse.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error');
      setErrorMessage('There was an error submitting your evaluation. Please try again in a few minutes.');
    }
  };  // Show summary view
  if (showSummary) {
    return (
      <div className="min-h-screen flex flex-col bg-black">
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Review Your Answers</h2>
            
            <div className="space-y-6 mb-12 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {questions
                .filter((question) =>
                  question.text !== 'Pick-and-roll reads, late-clock creation, transition.' &&
                  question.text !== 'Using your physical tools (posting smaller guards, spacing vs. length, etc.).'
                )
                .map((question) => (
                  <div key={question.id} className="bg-[#2C2C2C] rounded-lg p-6">
                    <p className="text-gray-400 mb-3">{question.text}</p>
                    <div className="text-white text-lg">
                      {question.isContactForm ? (
                        <div className="grid grid-cols-2 gap-2">
                          {state.answers[question.id] && typeof state.answers[question.id] === 'object' && (
                            <>
                              <div className="text-gray-300">
                                <strong>Name:</strong>{' '}
                                {`${((state.answers[question.id] as unknown as import('@/types/form').ContactInfo)?.firstName || '')} ${((state.answers[question.id] as unknown as import('@/types/form').ContactInfo)?.lastName || '')}`}
                              </div>
                              <div className="text-gray-300">
                                <strong>Email:</strong> {(state.answers[question.id] as unknown as import('@/types/form').ContactInfo)?.email || ''}
                              </div>
                              <div className="text-gray-300">
                                <strong>Phone:</strong> {(state.answers[question.id] as unknown as import('@/types/form').ContactInfo)?.phone || ''}
                              </div>
                              <div className="text-gray-300">
                                <strong>Instagram:</strong> {(state.answers[question.id] as unknown as Record<string, string>)?.instagram || ''}
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="font-medium">
                          {Array.isArray(state.answers[question.id])
                            ? ((state.answers[question.id] as unknown) as string[]).join(", ")
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
            </div>            {submissionStatus === 'success' && (
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

  function handleNext(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    if (state.currentStep < currentQuestions.length - 1) {
      dispatch({ type: 'NEXT_STEP' });
    }
  }

  // Show question form
  return (
    <div className="min-h-screen flex flex-col bg-black pb-20">
      {/* Progress bar */}{state.currentStep > 0 && (
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
                <div className="w-full space-y-4">                {currentQuestion.isContactForm ? (
                  <ContactForm 
                    questionId={currentQuestion.id} 
                    fields={currentQuestion.fields || []}
                  />
                ) : (
                  currentQuestion.options?.some(option => option.includes('8-10')) ? (
                    <RangeSlider
                      onChange={(value) => {
                        dispatch({
                          type: 'SET_ANSWER',
                          questionId: currentQuestion.id,
                          answer: value.toString()
                        });
                      }}
                      isAthlete={state.answers.role === 'Athlete'}
                    />
                  ) : (
                    currentQuestion.options?.map((option) => (
                      <motion.div
                        key={option}
                        whileTap={{ backgroundColor: '#FCD34D' }}
                        transition={{ duration: 0.2 }}
                      >
                        <OptionButton 
                          key={option} 
                          questionId={currentQuestion.id} 
                          option={option}
                          className="bg-[#2C2C2C] hover:bg-[#3C3C3C] text-gray-200"
                        />
                      </motion.div>
                    ))
                  )
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed navigation buttons at bottom of screen - show for ALL questions */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t border-gray-800 p-2 z-50">
        <div className="max-w-md mx-auto flex px-4">
          {!isFirstQuestion && (
            <button
              onClick={handlePrevious}
              className="flex-1 mr-2 py-3 px-4 bg-[#1e293b] text-white font-medium rounded-lg transition-colors text-base"
            >
              Previous
            </button>
          )}
          
          {!isLastQuestion ? (
            <button
              onClick={(e) => handleNext(e)}
              className="flex-1 ml-2 py-3 px-4 bg-[#0D6EFD] text-white font-medium rounded-lg transition-colors text-base"
              disabled={!state.answers[currentQuestion.id]}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleReviewAnswers}
              className="flex-1 ml-2 py-3 px-4 bg-[#0D6EFD] text-white font-medium rounded-lg transition-colors text-base"
              disabled={currentQuestion.isContactForm && !isFormComplete()}
            >
              Review Answers
            </button>
          )}
        </div>
      </div>
    </div>
  );
};