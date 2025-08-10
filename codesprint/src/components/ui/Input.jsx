import { forwardRef } from 'react';
import React from "react";

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const baseClasses = 'w-full px-4 py-3 font-mono bg-transparent border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent placeholder-gray-500';
  
  const borderClasses = error 
    ? 'border-red-400 glow-pink' 
    : 'border-gray-600 hover:border-gray-500 focus:glow-cyan';
  
  const classes = `${baseClasses} ${borderClasses} ${className}`;
  
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-mono font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={classes}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400 font-mono">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
