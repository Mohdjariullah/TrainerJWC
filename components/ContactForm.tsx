'use client';

import { useForm } from '@/context/FormContext';
import { PhoneInput } from '@/components/phone-input';
import type { Value } from 'react-phone-number-input';

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

type ContactValues = Record<string, string>;

export default function ContactForm({ questionId, fields }: ContactFormProps) {
  const { state, dispatch } = useForm();

  // Handle input change for a specific field
  const handleChange = (fieldName: string, value: string) => {
    const existing = getContactValues();
    dispatch({
      type: 'SET_ANSWER',
      questionId,
      answer: {
        ...existing,
        [fieldName]: value,
      },
    });
  };

  // Handle phone number specifically (Value type may be string | undefined)
  const handlePhoneChange = (value: Value) => {
    handleChange('phone', value?.toString() || '');
  };

  // Safely extract contact object from state
  const getContactValues = (): ContactValues => {
    const answer = state.answers[questionId];
    if (answer && typeof answer === 'object' && !Array.isArray(answer)) {
      return answer as ContactValues;
    }
    return {};
  };

  const getValue = (fieldName: string): string => {
    const values = getContactValues();
    return values[fieldName] || '';
  };

  return (
    <div className="bg-[#1A1A1A] rounded-lg p-8 space-y-6">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-300"
          >
            {field.label}
          </label>

          {field.type === 'tel' ? (
            <PhoneInput
              value={getValue(field.name)}
              onChange={handlePhoneChange}
              countryCallingCodeEditable={false}
              international
              defaultCountry="US"
              className="!text-white !bg-[#2C2C2C] !border !border-gray-700 rounded-lg w-full px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              required={field.required}
              value={getValue(field.name)}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              className="w-full px-4 py-3 bg-[#2C2C2C] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          )}
        </div>
      ))}
    </div>
  );
}
