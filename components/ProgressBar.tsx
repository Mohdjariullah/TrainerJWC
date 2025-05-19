'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // Subtract 1 from both current step and total steps to exclude the role question
  const adjustedCurrentStep = currentStep - 1;
  const adjustedTotalSteps = totalSteps - 1;
  const progress = Math.round(((adjustedCurrentStep) / adjustedTotalSteps) * 100);
  
  return (
    <div className="w-full px-4 sm:px-6">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>Question {adjustedCurrentStep} of {adjustedTotalSteps}</span>
        <span>{progress}% Complete</span>
      </div>
      
      <div 
        className="h-[6px] w-full bg-[#2C2C2C] rounded-full overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-label={`Question ${adjustedCurrentStep} of ${adjustedTotalSteps}`}
      >
        <div 
          className="h-full bg-[#FCD34D] transition-all duration-500 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}