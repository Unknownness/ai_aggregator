import React from 'react';
import { clsx } from 'clsx';

const Select = React.forwardRef(({
  label,
  error,
  helperText,
  options = [],
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={clsx(
          'w-full px-3 py-2 border rounded-lg shadow-sm',
          'bg-white dark:bg-gray-800',
          'text-gray-900 dark:text-white',
          'border-gray-300 dark:border-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value || option.id || option}
            value={option.value || option.id || option}
          >
            {option.label || option.name || option}
          </option>
        ))}
      </select>
      {(error || helperText) && (
        <p className={clsx(
          'mt-1 text-sm',
          error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
        )}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;