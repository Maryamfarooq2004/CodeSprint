import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    handleKeyPress,
    pauseTest,
    resetTest,
    resumeTest,
    updateInput
} from '../features/typing/typingSlice';

export const useTypingTest = () => {
  const dispatch = useDispatch();
  const typingState = useSelector((state) => state.typing);
  const inputRef = useRef(null);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    
    dispatch(updateInput({ 
      input: value, 
      key: lastChar 
    }));
    
    if (lastChar) {
      dispatch(handleKeyPress({ key: lastChar }));
    }
  };
  
  const handleKeyDown = (e) => {
    // Prevent certain default behaviors
    if (e.key === 'Tab') {
      e.preventDefault();
    }
    
    // Handle special keys
    if (e.key === 'Escape') {
      dispatch(pauseTest());
    }
  };
  
  const resetTypingTest = () => {
    dispatch(resetTest());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  const pauseTypingTest = () => {
    dispatch(pauseTest());
  };
  
  const resumeTypingTest = () => {
    dispatch(resumeTest());
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Auto-focus on mount and when test starts
  useEffect(() => {
    if (inputRef.current && !typingState.isCompleted) {
      inputRef.current.focus();
    }
  }, [typingState.isCompleted]);
  
  return {
    ...typingState,
    inputRef,
    handleInputChange,
    handleKeyDown,
    resetTypingTest,
    pauseTypingTest,
    resumeTypingTest
  };
};
