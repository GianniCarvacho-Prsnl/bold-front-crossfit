import React from 'react';

interface WeightInputProps {
  weight: number;
  unit: 'kg' | 'lb';
  onWeightChange: (value: number) => void;
  onUnitChange: (unit: 'kg' | 'lb') => void;
}

function WeightInput({ weight, unit, onWeightChange, onUnitChange }: WeightInputProps) {
  return (
    <div className="flex space-x-2">
      <div className="flex-1">
        <input
          type="number"
          value={weight}
          onChange={(e) => onWeightChange(Number(e.target.value))}
          min="0"
          step="0.5"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter weight"
        />
      </div>
      <div className="flex rounded-md shadow-sm">
        <button
          type="button"
          onClick={() => onUnitChange('kg')}
          className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
            unit === 'kg'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          kg
        </button>
        <button
          type="button"
          onClick={() => onUnitChange('lb')}
          className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
            unit === 'lb'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          lb
        </button>
      </div>
    </div>
  );
}

export default WeightInput;