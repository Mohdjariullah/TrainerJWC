export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  instagram?: string;
}

export interface FormAnswers {
  [key: string]: string | string[] | ContactInfo | undefined;
  contact_info?: ContactInfo;
}

export interface FormState {
  currentStep: number;
  answers: FormAnswers;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

// Animation types
export type AnimationVariant = 'hidden' | 'visible' | 'exit';

export interface AnimationProps {
  initial?: AnimationVariant;
  animate?: AnimationVariant;
  exit?: AnimationVariant;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string;
    type?: string;
    stiffness?: number;
    damping?: number;
  };
}
