import { Provider, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { useAuthState } from './hooks/useAuthState';
import { store } from './store';


// Pages
import ChapterPage from './pages/ChapterPage';
import CoursesPage from './pages/CoursesPage';
import DashboardPage from './pages/DashboardPage';
import GamesPage from './pages/GamesPage';
import LandingPage from './pages/LandingPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import React from 'react';



function App() {
  // Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Auth Route Component (redirect if already logged in)
function AuthRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}

// Auth State Provider Component
function AuthStateProvider({ children }) {
  useAuthState();
  return children;
}
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthStateProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public routes */}
              <Route index element={<LandingPage />} />
              
              {/* Auth routes */}
              <Route path="/login" element={
                <AuthRoute>
                  <LoginPage />
                </AuthRoute>
              } />
              <Route path="/signup" element={
                <AuthRoute>
                  <SignupPage />
                </AuthRoute>
              } />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />
              <Route path="/courses" element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              } />
              <Route path="/chapter/:chapterId" element={
                <ProtectedRoute>
                  <ChapterPage />
                </ProtectedRoute>
              } />
              <Route path="/games" element={
                <ProtectedRoute>
                  <GamesPage />
                </ProtectedRoute>
              } />
              <Route path="/leaderboard" element={
                <ProtectedRoute>
                  <LeaderboardPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              
              {/* 404 route */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </AuthStateProvider>
      </BrowserRouter>
    </Provider>
  );
}



export default App;

