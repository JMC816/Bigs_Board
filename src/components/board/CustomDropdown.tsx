import { useState, useRef, useEffect } from 'react';
import { CustomDropdownProps } from '../../types/components';

const CustomDropdown = ({ 
  label,
  value, 
  options, 
  onChange, 
  className = '' 
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <label className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">
          {label}:
        </label>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm bg-white text-left flex justify-between items-center"
          >
            <span>{options.find(opt => opt.value === value)?.label || value}</span>
            <svg className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        
          {isOpen && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-[9999] w-full sm:w-auto min-w-full">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full px-2 py-1 text-xs sm:text-sm text-left hover:bg-gray-100 ${
                    value === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomDropdown;

