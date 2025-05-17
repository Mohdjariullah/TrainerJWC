'use client';

import { useForm } from '@/context/FormContext';

interface Field {
  name: string;
  label: string;
  type: string;
  required?: boolean;
}

interface ContactFormProps {
  questionId: string;
  fields: Field[];
}

export default function ContactForm({ questionId, fields }: ContactFormProps) {
  const { state, dispatch } = useForm();
  
  const handleChange = (fieldName: string, value: string) => {
    const answer = state.answers[questionId];
    const currentValues = (answer && typeof answer === 'object' && !Array.isArray(answer)) ? answer as Record<string, string> : {};
    dispatch({
      type: 'SET_ANSWER',
      questionId,
      answer: {
        ...currentValues,
        [fieldName]: value
      }
    });
  };

  return (
    <div className="bg-[#1A1A1A] rounded-lg p-8 space-y-6">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label htmlFor={field.name} className="block text-gray-300 text-sm">
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            required={field.required}
            value={
              (state.answers[questionId] &&
                typeof state.answers[questionId] === 'object' &&
                !Array.isArray(state.answers[questionId])
                  ? (state.answers[questionId] as Record<string, string>)[field.name]
                  : ''
              ) || ''
            }
            className="w-full px-4 py-3 bg-[#2C2C2C] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            placeholder={`Enter your ${field.label.toLowerCase()}`}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
