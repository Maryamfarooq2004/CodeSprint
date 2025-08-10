import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import chaptersSlice from '../features/chapters/chaptersSlice';
import leaderboardSlice from '../features/leaderboard/leaderboardSlice';
import progressSlice from '../features/progress/progressSlice';
import typingSlice from '../features/typing/typingSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chapters: chaptersSlice,
    leaderboard: leaderboardSlice,
    progress: progressSlice,
    typing: typingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
