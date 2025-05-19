'use client';

import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RangeSliderProps {
  onChange: (value: number) => void;
  isAthlete?: boolean;
}

export default function RangeSlider({ onChange, isAthlete }: RangeSliderProps) {
  const [value, setValue] = useState([5]);

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    onChange(newValue[0]);
  };

  const getLabel = (value: number) => {
    if (isAthlete) {
      if (value >= 8) return 'College-ready';
      if (value >= 5) return 'Developing';
      return 'Beginner';
    } else {
      if (value >= 8) return 'Strongly Agree';
      if (value >= 5) return 'Somewhat Agree';
      return 'Disagree';
    }
  };

  return (
    <div className="w-full space-y-6">
      <AnimatePresence mode="wait">
        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-white text-lg font-medium">{value[0]}</span>
          <span className="text-white text-lg">{getLabel(value[0])}</span>
        </motion.div>
      </AnimatePresence>
      
      <Slider
        defaultValue={value}
        max={10}
        min={1}
        step={1}
        onValueChange={handleValueChange}
        className="w-full transition-all duration-200 ease-in-out"
      />

      <div className="flex justify-between text-sm text-gray-400">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <motion.span 
            key={num} 
            className="cursor-pointer hover:text-white transition-colors"
            onClick={() => handleValueChange([num])}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {num}
          </motion.span>
        ))}
      </div>
    </div>
  );
}