'use client';

import { useRouter } from 'next/navigation';
import { useForm } from '@/context/FormContext';

export default function NavigationButtons() {
  const router = useRouter();
  const { state, dispatch } = useForm();

  // Define the total number of steps here
  const totalSteps = 5; // <-- Set this to your actual number of steps

  const canGoPrevious = state.currentStep > 0;
  const canGoNext = state.currentStep < totalSteps - 1;
  const isLastStep = state.currentStep === totalSteps - 1;
  
  const handlePrevious = () => {
    if (canGoPrevious) {
      dispatch({ type: 'PREV_STEP' });
      router.push(`/step/${state.currentStep - 1}`);
    }
  };
  
  const handleNext = () => {
    if (canGoNext) {
      dispatch({ type: 'NEXT_STEP' });
      
      if (isLastStep) {
        router.push('/summary');
      } else {
        router.push(`/step/${state.currentStep + 1}`);
      }
    }
  };
  
  return (
    <div className="flex justify-between mt-8 w-full">
      <button
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        className={`px-6 py-2 rounded-md transition-all shadow-sm ${
          canGoPrevious
            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70'
        }`}
        aria-label="Go to previous step"
      >
        Previous
      </button>
      
      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className={`px-6 py-2 rounded-md transition-all shadow-sm ${
          canGoNext
            ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow'
            : 'bg-blue-300 text-white cursor-not-allowed opacity-70'
        }`}
        aria-label={state.currentStep === totalSteps - 1 ? 'Review your answers' : 'Go to next step'}
      >
        {state.currentStep === totalSteps - 1 ? 'Review Answers' : 'Next'}
      </button>
    </div>
  );
}