import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// Correct relative path: src/features/progress -> ../../firebase/config
import {
    addDoc,
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../../firebase/config';
// Correct relative path: features/progress -> up 2 levels to reach project root firebase folder

// Progress slice handles user typing/course progress tracking

// Async thunks for progress operations
export const fetchUserProgress = createAsyncThunk(
  'progress/fetchUserProgress',
  async (userId, { rejectWithValue }) => {
    try {
      const progressRef = collection(db, 'users', userId, 'progress');
      const querySnapshot = await getDocs(progressRef);
      
      const progress = [];
      querySnapshot.forEach((doc) => {
        progress.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return progress;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveChapterProgress = createAsyncThunk(
  'progress/saveChapterProgress',
  async ({ userId, chapterId, wpm, accuracy, completed }, { rejectWithValue }) => {
    try {
      const progressRef = collection(db, 'users', userId, 'progress');
      
      // Check if progress already exists for this chapter
      const q = query(progressRef, where('chapterId', '==', chapterId));
      const querySnapshot = await getDocs(q);
      
      const progressData = {
        chapterId,
        completed,
        wpm: wpm || 0,
        accuracy: accuracy || 0,
        updatedAt: new Date()
      };
      
      if (!querySnapshot.empty) {
        // Update existing progress
        const existingDoc = querySnapshot.docs[0];
        const existingData = existingDoc.data();
        
        // Only update if new stats are better or chapter is completed
        if (completed || wpm > (existingData.wpm || 0) || accuracy > (existingData.accuracy || 0)) {
          await updateDoc(doc(db, 'users', userId, 'progress', existingDoc.id), progressData);
          return { id: existingDoc.id, ...progressData };
        }
        return { id: existingDoc.id, ...existingData };
      } else {
        // Create new progress entry
        const docRef = await addDoc(progressRef, progressData);
        return { id: docRef.id, ...progressData };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserStats = createAsyncThunk(
  'progress/fetchUserStats',
  async (userId, { rejectWithValue }) => {
    try {
      const statsRef = collection(db, 'users', userId, 'typing_stats');
      const q = query(statsRef, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const stats = [];
      querySnapshot.forEach((doc) => {
        stats.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return stats;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveTypingSession = createAsyncThunk(
  'progress/saveTypingSession',
  async ({ userId, chapterId, wpm, accuracy, errors, attempts }, { rejectWithValue }) => {
    try {
      const statsRef = collection(db, 'users', userId, 'typing_stats');
      
      const sessionData = {
        chapterId,
        wpm,
        accuracy,
        errors: errors || 0,
        attempts: attempts || 1,
        timestamp: new Date()
      };
      
      const docRef = await addDoc(statsRef, sessionData);
      return { id: docRef.id, ...sessionData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetUserProgress = createAsyncThunk(
  'progress/resetUserProgress',
  async (userId, { rejectWithValue }) => {
    try {
      // This would typically involve deleting all progress documents
      // For now, we'll just return an empty array
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  progress: [],
  typingStats: [],
  loading: false,
  error: null,
  totalProgress: 0,
  averageWPM: 0,
  averageAccuracy: 0,
  totalSessions: 0,
  streak: 0,
  completedChapters: [],
  bestWPM: 0,
  totalTimeSpent: 0
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateLocalProgress: (state, action) => {
      const { chapterId, wpm, accuracy, completed } = action.payload;
      const existingIndex = state.progress.findIndex(p => p.chapterId === chapterId);
      
      if (existingIndex >= 0) {
        state.progress[existingIndex] = {
          ...state.progress[existingIndex],
          wpm: Math.max(state.progress[existingIndex].wpm || 0, wpm),
          accuracy: Math.max(state.progress[existingIndex].accuracy || 0, accuracy),
          completed: completed || state.progress[existingIndex].completed,
          updatedAt: new Date()
        };
      } else {
        state.progress.push({
          chapterId,
          wpm,
          accuracy,
          completed,
          updatedAt: new Date()
        });
      }
      
      // Update derived stats
      state.completedChapters = state.progress.filter(p => p.completed).map(p => p.chapterId);
      state.totalProgress = state.completedChapters.length;
      state.bestWPM = Math.max(...state.progress.map(p => p.wpm || 0), 0);
      
      const validStats = state.progress.filter(p => p.wpm > 0);
      if (validStats.length > 0) {
        state.averageWPM = Math.round(
          validStats.reduce((sum, p) => sum + p.wpm, 0) / validStats.length
        );
        state.averageAccuracy = Math.round(
          validStats.reduce((sum, p) => sum + p.accuracy, 0) / validStats.length * 100
        ) / 100;
      }
    },
    calculateStats: (state) => {
      // Calculate derived statistics
      state.completedChapters = state.progress.filter(p => p.completed).map(p => p.chapterId);
      state.totalProgress = state.completedChapters.length;
      state.totalSessions = state.typingStats.length;
      state.bestWPM = Math.max(...state.progress.map(p => p.wpm || 0), 0);
      
      if (state.typingStats.length > 0) {
        state.averageWPM = Math.round(
          state.typingStats.reduce((sum, stat) => sum + stat.wpm, 0) / state.typingStats.length
        );
        state.averageAccuracy = Math.round(
          state.typingStats.reduce((sum, stat) => sum + stat.accuracy, 0) / state.typingStats.length * 100
        ) / 100;
      }
      
      // Calculate streak (consecutive days with at least one session)
      state.streak = calculateStreak(state.typingStats);
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch user progress
      .addCase(fetchUserProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
        progressSlice.caseReducers.calculateStats(state);
        state.error = null;
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save chapter progress
      .addCase(saveChapterProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveChapterProgress.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProgress = action.payload;
        const existingIndex = state.progress.findIndex(p => p.chapterId === updatedProgress.chapterId);
        
        if (existingIndex >= 0) {
          state.progress[existingIndex] = updatedProgress;
        } else {
          state.progress.push(updatedProgress);
        }
        
        progressSlice.caseReducers.calculateStats(state);
        state.error = null;
      })
      .addCase(saveChapterProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user stats
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading = false;
        state.typingStats = action.payload;
        progressSlice.caseReducers.calculateStats(state);
        state.error = null;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Save typing session
      .addCase(saveTypingSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveTypingSession.fulfilled, (state, action) => {
        state.loading = false;
        state.typingStats.unshift(action.payload);
        progressSlice.caseReducers.calculateStats(state);
        state.error = null;
      })
      .addCase(saveTypingSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset user progress
      .addCase(resetUserProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetUserProgress.fulfilled, (state) => {
        state.loading = false;
        state.progress = [];
        state.typingStats = [];
        progressSlice.caseReducers.calculateStats(state);
        state.error = null;
      })
      .addCase(resetUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Helper function to calculate streak
const calculateStreak = (stats) => {
  if (stats.length === 0) return 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const sessionDates = stats
    .map(stat => {
      const date = stat.timestamp?.toDate ? stat.timestamp.toDate() : new Date(stat.timestamp);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    })
    .filter((date, index, array) => array.indexOf(date) === index) // Remove duplicates
    .sort((a, b) => b - a); // Sort descending
  
  let streak = 0;
  let currentDate = today.getTime();
  
  for (const sessionDate of sessionDates) {
    if (sessionDate === currentDate) {
      streak++;
      currentDate -= 24 * 60 * 60 * 1000; // Go back one day
    } else if (sessionDate === currentDate + 24 * 60 * 60 * 1000) {
      // Session was yesterday when we expect today (streak continues)
      streak++;
      currentDate = sessionDate - 24 * 60 * 60 * 1000;
    } else {
      break; // Streak broken
    }
  }
  
  return streak;
};

export const { clearError, updateLocalProgress, calculateStats } = progressSlice.actions;
export default progressSlice.reducer;
