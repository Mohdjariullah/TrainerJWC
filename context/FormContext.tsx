'use client';

import React, { createContext, useContext, useReducer } from 'react';
import questions, { parentQuestions } from '@/lib/questions';
import { FormState, ContactInfo } from '@/types/form';

type FormAction = 
  | { type: 'SET_ANSWER'; questionId: string; answer: string | string[] | ContactInfo }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'RESET_FORM' };

const initialState: FormState = {
  currentStep: 0,
  answers: {},
  isSubmitting: false,
  isSubmitted: false,
  error: null
};

const FormContext = createContext<{
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
}>({
  state: initialState,
  dispatch: () => null
});

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
      const questionSet = state.answers.role === 'Parent' ? parentQuestions : questions;
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, questionSet.length - 1),
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: action.step,
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

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
}
