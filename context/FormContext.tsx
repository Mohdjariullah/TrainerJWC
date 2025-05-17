'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import questions from '@/lib/questions';

// Define the shape of our form state
interface FormState {
  answers: Record<string, string | string[]>;
  currentStep: number;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

// Define the actions we can dispatch
type FormAction =
  | { type: 'SET_ANSWER'; questionId: string; answer: string | string[] }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'RESET_FORM' };

// Define the context interface
interface FormContextType {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
  totalSteps: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastStep: boolean;
}

// Initial state
const initialState: FormState = {
  answers: {},
  currentStep: 0,
  isSubmitting: false,
  isSubmitted: false,
  error: null,
};

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Reducer function to handle state updates
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.questionId]: action.answer,
        },
      };
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, questions.length - 1),
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: Math.min(Math.max(action.step, 0), questions.length - 1),
      };
    case 'SUBMIT_START':
      return {
        ...state,
        isSubmitting: true,
        error: null,
      };
    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
      };
    case 'SUBMIT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        error: action.error,
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
}

// Provider component
export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  
  // Derived state
  const totalSteps = questions.length;
  const canGoNext = !!state.answers[questions[state.currentStep]?.id];
  const canGoPrevious = state.currentStep > 0;
  const isLastStep = state.currentStep === totalSteps - 1;

  // Context value
  const value = {
    state,
    dispatch,
    totalSteps,
    canGoNext,
    canGoPrevious,
    isLastStep,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}

// Custom hook to use the form context
export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}