import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// Correct relative path: src/features/leaderboard -> ../../firebase/config
import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    where
} from 'firebase/firestore';
import { db } from '../../firebase/config';

// Async thunks for leaderboard operations
export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetchLeaderboard',
  async ({ language = 'all', limitCount = 50 }, { rejectWithValue }) => {
    try {
      const leaderboardRef = collection(db, 'leaderboard');
      
      let q;
      if (language === 'all') {
        q = query(leaderboardRef, orderBy('bestWPM', 'desc'), limit(limitCount));
      } else {
        q = query(
          leaderboardRef, 
          where('language', '==', language),
          orderBy('bestWPM', 'desc'), 
          limit(limitCount)
        );
      }
      
      const querySnapshot = await getDocs(q);
      
      const leaderboard = [];
      querySnapshot.forEach((doc, index) => {
        leaderboard.push({
          id: doc.id,
          rank: index + 1,
          ...doc.data()
        });
      });
      
      return leaderboard;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAccuracyLeaderboard = createAsyncThunk(
  'leaderboard/fetchAccuracyLeaderboard',
  async ({ language = 'all', limitCount = 50 }, { rejectWithValue }) => {
    try {
      const leaderboardRef = collection(db, 'leaderboard');
      
      let q;
      if (language === 'all') {
        q = query(leaderboardRef, orderBy('avgAccuracy', 'desc'), limit(limitCount));
      } else {
        q = query(
          leaderboardRef, 
          where('language', '==', language),
          orderBy('avgAccuracy', 'desc'), 
          limit(limitCount)
        );
      }
      
      const querySnapshot = await getDocs(q);
      
      const leaderboard = [];
      querySnapshot.forEach((doc, index) => {
        leaderboard.push({
          id: doc.id,
          rank: index + 1,
          ...doc.data()
        });
      });
      
      return leaderboard;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateLeaderboard = createAsyncThunk(
  'leaderboard/updateLeaderboard',
  async ({ userId, username, wpm, accuracy, language, totalTests }, { rejectWithValue }) => {
    try {
      const leaderboardRef = doc(db, 'leaderboard', `${userId}_${language}`);
      
      // Check if entry exists
      const docSnap = await getDoc(leaderboardRef);
      
      let leaderboardData;
      
      if (docSnap.exists()) {
        const existingData = docSnap.data();
        
        // Update if new WPM is better
        const newBestWPM = Math.max(existingData.bestWPM || 0, wpm);
        const newTotalTests = (existingData.totalTests || 0) + 1;
        const newAvgAccuracy = (
          ((existingData.avgAccuracy || 0) * (existingData.totalTests || 0) + accuracy) / 
          newTotalTests
        );
        
        leaderboardData = {
          userId,
          username,
          bestWPM: newBestWPM,
          avgAccuracy: Math.round(newAvgAccuracy * 100) / 100,
          totalTests: newTotalTests,
          language,
          lastUpdated: new Date()
        };
      } else {
        // Create new entry
        leaderboardData = {
          userId,
          username,
          bestWPM: wpm,
          avgAccuracy: accuracy,
          totalTests: totalTests || 1,
          language,
          lastUpdated: new Date()
        };
      }
      
      await setDoc(leaderboardRef, leaderboardData);
      return leaderboardData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserRank = createAsyncThunk(
  'leaderboard/fetchUserRank',
  async ({ userId, language }, { rejectWithValue }) => {
    try {
      const leaderboardRef = collection(db, 'leaderboard');
      
      // Get user's entry
      const userDocRef = doc(db, 'leaderboard', `${userId}_${language}`);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        return { rank: null, entry: null };
      }
      
      const userData = userDoc.data();
      
      // Count how many users have better WPM
      let q;
      if (language === 'all') {
        q = query(
          leaderboardRef,
          where('bestWPM', '>', userData.bestWPM)
        );
      } else {
        q = query(
          leaderboardRef,
          where('language', '==', language),
          where('bestWPM', '>', userData.bestWPM)
        );
      }
      
      const higherScoresSnapshot = await getDocs(q);
      const rank = higherScoresSnapshot.size + 1;
      
      return {
        rank,
        entry: { ...userData, id: userDoc.id }
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  wpmLeaderboard: [],
  accuracyLeaderboard: [],
  userRank: null,
  userEntry: null,
  loading: false,
  error: null,
  filters: {
    language: 'all',
    timeRange: 'all-time'
  }
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearLeaderboard: (state) => {
      state.wpmLeaderboard = [];
      state.accuracyLeaderboard = [];
      state.userRank = null;
      state.userEntry = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch WPM leaderboard
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.wpmLeaderboard = action.payload;
        state.error = null;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch accuracy leaderboard
      .addCase(fetchAccuracyLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccuracyLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.accuracyLeaderboard = action.payload;
        state.error = null;
      })
      .addCase(fetchAccuracyLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update leaderboard
      .addCase(updateLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLeaderboard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        // Update local leaderboard if user improved
        const updatedEntry = action.payload;
        const existingIndex = state.wpmLeaderboard.findIndex(
          entry => entry.userId === updatedEntry.userId && entry.language === updatedEntry.language
        );
        
        if (existingIndex >= 0) {
          state.wpmLeaderboard[existingIndex] = updatedEntry;
          // Re-sort and update ranks
          state.wpmLeaderboard.sort((a, b) => b.bestWPM - a.bestWPM);
          state.wpmLeaderboard = state.wpmLeaderboard.map((entry, index) => ({
            ...entry,
            rank: index + 1
          }));
        }
      })
      .addCase(updateLeaderboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch user rank
      .addCase(fetchUserRank.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRank.fulfilled, (state, action) => {
        state.loading = false;
        state.userRank = action.payload.rank;
        state.userEntry = action.payload.entry;
        state.error = null;
      })
      .addCase(fetchUserRank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearError, clearLeaderboard } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
