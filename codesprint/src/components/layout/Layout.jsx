import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import React from "react";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      {/* Animated background particles */}
      <div className="particles fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/6 right-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-35 animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 left-1/6 w-2 h-2 bg-pink-300 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
      
      <Navbar />
      
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      
      <Footer />
      
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0.75rem',
            color: '#E0E0E0',
            fontFamily: 'JetBrains Mono, monospace',
          },
          success: {
            iconTheme: {
              primary: '#00E5FF',
              secondary: '#0F111A',
            },
          },
          error: {
            iconTheme: {
              primary: '#FF6EC7',
              secondary: '#0F111A',
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;
