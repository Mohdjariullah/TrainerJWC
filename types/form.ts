export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface FormAnswers {
  [key: string]: string | string[] | ContactInfo | undefined;
  contact_info?: ContactInfo;
}

export interface FormState {
  currentStep: number;
  answers: FormAnswers;
}
