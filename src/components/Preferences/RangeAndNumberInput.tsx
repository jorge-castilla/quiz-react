import React, { ChangeEvent } from 'react';

interface RangeAndNumberInputProps {
  value: number;
  onChange: (newValue: number) => void;
}

const RangeAndNumberInput: React.FC<RangeAndNumberInputProps> = ({
  value,
  onChange,
}) => {
  const minValue: number = 5;
  const maxValue: number = 20;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => { 
    if (event.target.value === '') {
      onChange(0);
    } else {
      const numericValue = parseInt(event.target.value);
      if (!isNaN(numericValue)) {
        onChange(numericValue);
      }
    }
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const numericValue = Number(event.target.value);
    if (numericValue < minValue) {
      onChange(minValue);
    } else if (numericValue > maxValue) {
      onChange(maxValue);
    }
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      <input
        type="range"
        min={minValue}
        max={maxValue}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className="col-span-4 mr-4"
      />
      <input
        className="bg-slate-800 text-white rounded-md py-2 px-2"
        type="string"
        max={maxValue}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default RangeAndNumberInput;
