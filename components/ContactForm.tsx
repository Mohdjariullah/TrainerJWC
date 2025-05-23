'use client';

import { useForm } from '@/context/FormContext';
import { PhoneInput } from '@/components/phone-input';
import type { Value } from 'react-phone-number-input';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ContactInfo } from '@/types/form';

interface ContactFormProps {
  questionId: string;
  fields: Array<{
    name: string;
    label: string;
    type: string;
    required?: boolean;
  }>;
}

export default function ContactForm({ questionId, fields }: ContactFormProps) {
  const { state, dispatch } = useForm();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (fieldName: string, value: string) => {
    const existing = getContactValues();
    dispatch({
      type: 'SET_ANSWER',
      questionId,
      answer: {
        ...existing,
        [fieldName]: value,
      } as ContactInfo
    });
  };

  const handlePhoneChange = (value: Value) => {
    handleChange('phone', value?.toString() || '');
  };

  const getContactValues = (): Partial<ContactInfo> => {
    const answer = state.answers[questionId];
    if (answer && typeof answer === 'object' && !Array.isArray(answer)) {
      return answer as Partial<ContactInfo>;
    }
    return {};
  };

  const getValue = (fieldName: string): string => {
    const values = getContactValues();
    return values[fieldName as keyof ContactInfo] || '';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const labelVariants = {
    focused: { y: -5, scale: 0.9, color: '#FFE44D' },
    blurred: { y: 0, scale: 1, color: '#9CA3AF' }
  };

  const allFields = fields.some(field => field.name === 'instagram') 
    ? fields 
    : [...fields, { 
        name: 'instagram', 
        label: 'Instagram Username', 
        type: 'text', 
        required: false 
      }];

  return (
    <motion.div 
      className="bg-[#1A1A1A] rounded-lg p-4 sm:p-8 space-y-4 sm:space-y-6 shadow-lg w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {allFields.map((field, index) => (
        <motion.div 
          key={field.name} 
          className="space-y-2 relative"
          variants={itemVariants}
          custom={index}
        >
          <motion.label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-300"
            variants={labelVariants}
            animate={focusedField === field.name ? 'focused' : 'blurred'}
          >
            {field.label} {field.name !== 'lastName' && field.name !== 'instagram' && <span className="text-red-500">*</span>}
          </motion.label>

          {field.type === 'tel' ? (
            <PhoneInput
              value={getValue(field.name)}
              onChange={handlePhoneChange}
              countryCallingCodeEditable={false}
              international
              defaultCountry="US"
              onFocus={() => setFocusedField(field.name)}
              onBlur={() => setFocusedField(null)}
              required={field.name !== 'lastName' && field.name !== 'instagram'}
            />
          ) : (
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                required={field.required && field.name !== 'lastName' && field.name !== 'instagram'}
                value={getValue(field.name)}
                onChange={(e) => handleChange(field.name, e.target.value)}
                placeholder={field.name === 'instagram' ? '@yourusername' : `Enter your ${field.label.toLowerCase()}`}
                className="w-full px-4 py-3 bg-[#2C2C2C] border border-[#FFE44D]/30 rounded-lg text-white focus:outline-none focus:border-[#FFE44D] transition-all duration-200"
                onFocus={() => setFocusedField(field.name)}
                onBlur={() => setFocusedField(null)}
              />
            </motion.div>
          )}
          
          {getValue(field.name) && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-3 top-9 text-green-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"></path>
              </svg>
            </motion.div>
          )}
        </motion.div>
      ))}
      
      <motion.div 
        className="text-xs text-gray-400 text-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Your information is secure and will only be used to provide you with a personalized training plan.
      </motion.div>
    </motion.div>
  );
}
