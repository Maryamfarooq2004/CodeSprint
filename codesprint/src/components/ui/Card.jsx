import { motion } from 'framer-motion';
import React from "react";

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  ...props 
}) => {
  const variants = {
    default: 'glass',
    intense: 'glass-intense',
    glow: 'glass glow-cyan',
    pink: 'glass glow-pink'
  };
  
  const baseClasses = `p-6 rounded-xl border ${variants[variant]} ${className}`;
  
  const MotionCard = motion.div;
  
  return (
    <MotionCard
      className={baseClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      {...props}
    >
      {children}
    </MotionCard>
  );
};

export default Card;
