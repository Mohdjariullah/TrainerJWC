import type { ContactInfo } from '../types/form';

interface AnswerDisplayProps {
  question: {
    id: string;
    isContactForm?: boolean;
    text: string;
  };
  answer: string | string[] | ContactInfo;
}

export default function AnswerDisplay({ question, answer }: AnswerDisplayProps) {
  if (question.isContactForm && answer) {
    return (
      <div className="space-y-2">
        {Object.entries(answer).map(([key, value]) => (
          <div key={key} className="text-gray-300">
            <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
            {value as string}
          </div>
        ))}
      </div>
    );
  }

  if (Array.isArray(answer)) {
    return <>{answer.join(", ")}</>;
  }

  return <>{answer || ''}</>;
}
