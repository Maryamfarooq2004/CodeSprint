import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

// Async thunks for chapters operations
export const fetchChapters = createAsyncThunk(
  'chapters/fetchChapters',
  async (_, { rejectWithValue }) => {
    try {
      const chaptersRef = collection(db, 'chapters');
      const q = query(chaptersRef, orderBy('language'), orderBy('level'), orderBy('order'));
      const querySnapshot = await getDocs(q);
      
      const chapters = [];
      querySnapshot.forEach((doc) => {
        chapters.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return chapters;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchChaptersByLanguage = createAsyncThunk(
  'chapters/fetchChaptersByLanguage',
  async (language, { rejectWithValue }) => {
    try {
      const chaptersRef = collection(db, 'chapters');
      const q = query(
        chaptersRef, 
        where('language', '==', language),
        orderBy('level'), 
        orderBy('order')
      );
      const querySnapshot = await getDocs(q);
      
      const chapters = [];
      querySnapshot.forEach((doc) => {
        chapters.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return chapters;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchChaptersByLevel = createAsyncThunk(
  'chapters/fetchChaptersByLevel',
  async (level, { rejectWithValue }) => {
    try {
      const chaptersRef = collection(db, 'chapters');
      const q = query(
        chaptersRef, 
        where('level', '==', level),
        orderBy('language'), 
        orderBy('order')
      );
      const querySnapshot = await getDocs(q);
      
      const chapters = [];
      querySnapshot.forEach((doc) => {
        chapters.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return chapters;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  chapters: [],
  filteredChapters: [],
  selectedChapter: null,
  loading: false,
  error: null,
  filters: {
    language: 'all',
    level: 'all',
    category: 'all'
  }
};

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setSelectedChapter: (state, action) => {
      state.selectedChapter = action.payload;
    },
    clearSelectedChapter: (state) => {
      state.selectedChapter = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredChapters = filterChapters(state.chapters, state.filters);
    },
    clearFilters: (state) => {
      state.filters = {
        language: 'all',
        level: 'all',
        category: 'all'
      };
      state.filteredChapters = state.chapters;
    },
    searchChapters: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      if (!searchTerm) {
        state.filteredChapters = filterChapters(state.chapters, state.filters);
      } else {
        state.filteredChapters = state.chapters.filter(chapter =>
          chapter.title.toLowerCase().includes(searchTerm) ||
          chapter.category.toLowerCase().includes(searchTerm) ||
          chapter.snippet?.toLowerCase().includes(searchTerm)
        );
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all chapters
      .addCase(fetchChapters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChapters.fulfilled, (state, action) => {
        state.loading = false;
        state.chapters = action.payload;
        state.filteredChapters = filterChapters(action.payload, state.filters);
        state.error = null;
      })
      .addCase(fetchChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch chapters by language
      .addCase(fetchChaptersByLanguage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChaptersByLanguage.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredChapters = action.payload;
        state.error = null;
      })
      .addCase(fetchChaptersByLanguage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch chapters by level
      .addCase(fetchChaptersByLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChaptersByLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredChapters = action.payload;
        state.error = null;
      })
      .addCase(fetchChaptersByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

// Helper function to filter chapters
const filterChapters = (chapters, filters) => {
  return chapters.filter(chapter => {
    const languageMatch = filters.language === 'all' || chapter.language === filters.language;
    const levelMatch = filters.level === 'all' || chapter.level === filters.level;
    const categoryMatch = filters.category === 'all' || chapter.category === filters.category;
    
    return languageMatch && levelMatch && categoryMatch;
  });
};

// Selector functions
export const selectChaptersByCategory = (state) => {
  const chapters = state.chapters.filteredChapters;
  const categorized = {};
  
  chapters.forEach(chapter => {
    if (!categorized[chapter.category]) {
      categorized[chapter.category] = [];
    }
    categorized[chapter.category].push(chapter);
  });
  
  return categorized;
};

export const selectChaptersByLanguage = (state) => {
  const chapters = state.chapters.filteredChapters;
  const byLanguage = {};
  
  chapters.forEach(chapter => {
    if (!byLanguage[chapter.language]) {
      byLanguage[chapter.language] = [];
    }
    byLanguage[chapter.language].push(chapter);
  });
  
  return byLanguage;
};

export const {
  setSelectedChapter,
  clearSelectedChapter,
  setFilters,
  clearFilters,
  searchChapters,
  clearError
} = chaptersSlice.actions;

export default chaptersSlice.reducer;
