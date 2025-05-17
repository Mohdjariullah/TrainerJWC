type ContactInfo = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
};

export function displayAnswer(
  questionId: string,
  answer: string | string[] | ContactInfo | undefined,
  isContactForm?: boolean
) {
  if (!answer) return '';
  
  // Handle contact form
  if (isContactForm && typeof answer === 'object') {
    const info = answer as ContactInfo;
    return `${info.firstName || ''} ${info.lastName || ''} (${info.email || ''})`;
  }
  
  // Handle arrays (multi-select questions)
  if (Array.isArray(answer)) {
    return answer.join(', ');
  }
  
  // Handle single answers
  return String(answer);
}
