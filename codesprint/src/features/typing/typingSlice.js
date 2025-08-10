import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChapter: null,
  codeSnippet: '',
  userInput: '',
  currentIndex: 0,
  startTime: null,
  endTime: null,
  isActive: false,
  isPaused: false,
  wpm: 0,
  accuracy: 0,
  errors: 0,
  totalChars: 0,
  correctChars: 0,
  mistakes: [],
  isCompleted: false,
  timeElapsed: 0,
  showKeyboard: true,
  keyboardHighlight: null,
  results: {
    wpm: 0,
    accuracy: 0,
    errors: 0,
    timeElapsed: 0,
    totalWords: 0,
    correctWords: 0
  }
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    initializeTest: (state, action) => {
      const { chapter } = action.payload;
      state.currentChapter = chapter;
      state.codeSnippet = chapter.content;
      state.userInput = '';
      state.currentIndex = 0;
      state.startTime = null;
      state.endTime = null;
      state.isActive = false;
      state.isPaused = false;
      state.wpm = 0;
      state.accuracy = 0;
      state.errors = 0;
      state.totalChars = 0;
      state.correctChars = 0;
      state.mistakes = [];
      state.isCompleted = false;
      state.timeElapsed = 0;
      state.keyboardHighlight = null;
    },
    
    startTest: (state) => {
      if (!state.startTime) {
        state.startTime = Date.now();
      }
      state.isActive = true;
      state.isPaused = false;
    },
    
    pauseTest: (state) => {
      state.isActive = false;
      state.isPaused = true;
    },
    
    resumeTest: (state) => {
      state.isActive = true;
      state.isPaused = false;
    },
    
    resetTest: (state) => {
      const chapter = state.currentChapter;
      Object.assign(state, initialState);
      if (chapter) {
        state.currentChapter = chapter;
        state.codeSnippet = chapter.content;
      }
    },
    
    updateInput: (state, action) => {
      const { input, key } = action.payload;
      
      // Start test on first keystroke
      if (!state.isActive && !state.isCompleted) {
        typingSlice.caseReducers.startTest(state);
      }
      
      state.userInput = input;
      state.currentIndex = input.length;
      
      // Update keyboard highlight
      if (state.currentIndex < state.codeSnippet.length) {
        state.keyboardHighlight = state.codeSnippet[state.currentIndex].toLowerCase();
      } else {
        state.keyboardHighlight = null;
      }
      
      // Calculate stats in real-time
      typingSlice.caseReducers.calculateStats(state);
      
      // Check if test is completed
      if (input.length >= state.codeSnippet.length) {
        typingSlice.caseReducers.completeTest(state);
      }
    },
    
    handleKeyPress: (state, action) => {
      const { key } = action.payload;
      
      if (state.isCompleted || !state.isActive) return;
      
      const expectedChar = state.codeSnippet[state.currentIndex];
      
      if (key === expectedChar) {
        state.correctChars++;
      } else {
        state.errors++;
        state.mistakes.push({
          position: state.currentIndex,
          expected: expectedChar,
          typed: key,
          timestamp: Date.now() - (state.startTime || Date.now())
        });
      }
      
      state.totalChars++;
    },
    
    calculateStats: (state) => {
      if (!state.startTime || state.userInput.length === 0) {
        state.wpm = 0;
        state.accuracy = 0;
        return;
      }
      
      const currentTime = Date.now();
      const timeElapsed = (currentTime - state.startTime) / 1000 / 60; // in minutes
      state.timeElapsed = Math.floor((currentTime - state.startTime) / 1000);
      
      // Calculate WPM (words per minute)
      // Standard: 5 characters = 1 word
      const wordsTyped = state.userInput.length / 5;
      state.wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
      
      // Calculate accuracy
      let correctChars = 0;
      let totalChars = Math.min(state.userInput.length, state.codeSnippet.length);
      
      for (let i = 0; i < totalChars; i++) {
        if (state.userInput[i] === state.codeSnippet[i]) {
          correctChars++;
        }
      }
      
      state.accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;
      state.correctChars = correctChars;
      state.totalChars = totalChars;
    },
    
    completeTest: (state) => {
      state.isActive = false;
      state.isCompleted = true;
      state.endTime = Date.now();
      
      // Calculate final stats
      typingSlice.caseReducers.calculateStats(state);
      
      const timeElapsed = (state.endTime - state.startTime) / 1000 / 60; // in minutes
      const wordsTyped = state.codeSnippet.length / 5;
      const finalWPM = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
      
      // Count actual errors (incorrect characters)
      let actualErrors = 0;
      for (let i = 0; i < Math.min(state.userInput.length, state.codeSnippet.length); i++) {
        if (state.userInput[i] !== state.codeSnippet[i]) {
          actualErrors++;
        }
      }
      
      state.results = {
        wpm: finalWPM,
        accuracy: state.accuracy,
        errors: actualErrors,
        timeElapsed: Math.floor((state.endTime - state.startTime) / 1000),
        totalWords: Math.round(state.codeSnippet.length / 5),
        correctWords: Math.round(state.correctChars / 5)
      };
    },
    
    toggleKeyboard: (state) => {
      state.showKeyboard = !state.showKeyboard;
    },
    
    setKeyboardHighlight: (state, action) => {
      state.keyboardHighlight = action.payload;
    },
    
    clearResults: (state) => {
      state.results = {
        wpm: 0,
        accuracy: 0,
        errors: 0,
        timeElapsed: 0,
        totalWords: 0,
        correctWords: 0
      };
    }
  }
});

// Selectors
export const selectTypingState = (state) => state.typing;

export const selectCurrentChar = (state) => {
  const typing = state.typing;
  if (typing.currentIndex < typing.codeSnippet.length) {
    return typing.codeSnippet[typing.currentIndex];
  }
  return null;
};

export const selectProgress = (state) => {
  const typing = state.typing;
  if (typing.codeSnippet.length === 0) return 0;
  return Math.round((typing.currentIndex / typing.codeSnippet.length) * 100);
};

export const selectCharacterStatus = (state, index) => {
  const typing = state.typing;
  
  if (index < typing.userInput.length) {
    return typing.userInput[index] === typing.codeSnippet[index] ? 'correct' : 'incorrect';
  } else if (index === typing.currentIndex) {
    return 'current';
  } else {
    return 'pending';
  }
};

export const {
  initializeTest,
  startTest,
  pauseTest,
  resumeTest,
  resetTest,
  updateInput,
  handleKeyPress,
  calculateStats,
  completeTest,
  toggleKeyboard,
  setKeyboardHighlight,
  clearResults
} = typingSlice.actions;

export default typingSlice.reducer;
