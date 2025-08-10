import { motion } from 'framer-motion';
import React from "react";

const ProgressBar = ({ 
  progress = 0, 
  className = '',
  size = 'md',
  variant = 'cyan',
  showPercentage = true,
  animated = true
}) => {
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };
  
  const variants = {
    cyan: 'bg-gradient-to-r from-cyan-400 to-cyan-600',
    pink: 'bg-gradient-to-r from-pink-400 to-pink-600',
    gradient: 'bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400'
  };
  
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-mono text-gray-400">Progress</span>
          <span className="text-sm font-mono text-cyan-400">{Math.round(clampedProgress)}%</span>
        </div>
      )}
      <div className={`w-full ${sizes[size]} bg-gray-800 rounded-full overflow-hidden border border-gray-700`}>
        <motion.div
          className={`h-full ${variants[variant]} ${animated ? 'transition-all duration-300' : ''}`}
          initial={animated ? { width: 0 } : undefined}
          animate={{ width: `${clampedProgress}%` }}
          transition={animated ? { duration: 0.5, ease: 'easeOut' } : undefined}
          style={!animated ? { width: `${clampedProgress}%` } : undefined}
        >
          {variant === 'gradient' && (
            <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 animate-pulse" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
