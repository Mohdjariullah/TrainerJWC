'use client';

import { useState } from "react";

interface RangeSliderProps {
  onChange: (value: number) => void;
  isAthlete?: boolean;
}

export default function RangeSlider({ onChange }: RangeSliderProps) {
  const [value, setValue] = useState(5);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };


  return (
    <div className="w-full">
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
        onChange={(e) => handleValueChange(parseInt(e.target.value))}
      />
      <div className="flex justify-between px-2 mt-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <span key={num} className="text-sm text-gray-400">{num}</span>
        ))}
      </div>
    </div>
  );
}