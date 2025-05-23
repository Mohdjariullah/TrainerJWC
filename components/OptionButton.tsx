'use client';

import { useForm } from '@/context/FormContext';

interface OptionButtonProps {
  questionId: string;
  option: string;
  className?: string;
}

export default function OptionButton({ option, questionId }: OptionButtonProps) {
  const { state, dispatch } = useForm();
  const isSelected = state.answers[questionId] === option;

  const handleClick = () => {
    dispatch({ type: 'SET_ANSWER', questionId, answer: option });
    dispatch({ type: 'NEXT_STEP' });
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full px-6 py-4 rounded-lg text-left transition-all duration-200 ${
        isSelected ? 'bg-[#E0B936FF] text-black' : 'bg-[#2C2C2C] text-gray-200 hover:bg-[#3C3C3C]'
      }`}
    >
      {option}
    </button>
  );
}