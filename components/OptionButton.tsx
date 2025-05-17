'use client';

import { motion } from 'framer-motion';
import { useForm } from '@/context/FormContext';
import questions from '@/lib/questions';

interface OptionButtonProps {
  questionId: string;
  option: string;
}

export default function OptionButton({ questionId, option }: OptionButtonProps) {
  const { state, dispatch } = useForm();
  const question = questions.find(q => q.id === questionId);
  const isMultiSelect = question?.multiSelect;
  const maxSelections = question?.maxSelections || 1;

  // For multi-select, we need to check if this option is in the array of answers
  const currentAnswers = state.answers[questionId] || [];
  const isSelected = isMultiSelect 
    ? Array.isArray(currentAnswers) && currentAnswers.includes(option)
    : currentAnswers === option;

  const handleSelect = () => {
    if (isMultiSelect) {
      const answers = Array.isArray(currentAnswers) ? currentAnswers : [];

      if (isSelected) {
        // Remove the option if already selected
        dispatch({
          type: 'SET_ANSWER',
          questionId,
          answer: answers.filter(ans => ans !== option),
        });
      } else if (answers.length < maxSelections) {
        // Add the option if under max selections
        dispatch({
          type: 'SET_ANSWER',
          questionId,
          answer: [...answers, option],
        });

        // Only proceed to next question if we've selected enough options
        if (answers.length + 1 === maxSelections) {
          setTimeout(() => {
            dispatch({ type: 'NEXT_STEP' });
          }, 500);
        }
      }
    } else {
      // Single select behavior
      dispatch({
        type: 'SET_ANSWER',
        questionId,
        answer: option,
      });
      dispatch({ type: 'NEXT_STEP' });
    }
  };
  
  return (
    <motion.button
      onClick={handleSelect}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full py-4 px-8 text-center text-lg font-medium rounded-full transition-all ${
        isSelected
          ? 'bg-blue-500 text-white'
          : 'bg-[#333333] text-white hover:bg-[#444444]'
      }`}
      disabled={!isSelected && isMultiSelect && (currentAnswers as string[]).length >= maxSelections}
    >
      {option}
    </motion.button>
  );
}