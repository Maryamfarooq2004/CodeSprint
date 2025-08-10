import {
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    BookOpenIcon,
    HomeIcon,
    PlayIcon,
    TrophyIcon,
    UserIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import React from "react";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import Button from '../ui/Button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
    setIsMobileMenuOpen(false);
  };
  
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Courses', href: '/courses', icon: BookOpenIcon },
    { name: 'Games', href: '/games', icon: PlayIcon },
    { name: 'Leaderboard', href: '/leaderboard', icon: TrophyIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ];
  
  const isActive = (href) => location.pathname === href;
  
  return (
    <nav className="glass-intense border-b border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-mono font-bold text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text"
            >
              CodeSprint
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-mono text-sm transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-3">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full border border-cyan-400/30"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 flex items-center justify-center text-black font-mono font-bold text-sm">
                      {user?.displayName?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <span className="font-mono text-sm text-gray-300">
                    {user?.displayName || 'User'}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden md:flex items-center space-x-2"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-gray-700 glass-intense"
        >
          <div className="px-4 py-4 space-y-3">
            {isAuthenticated ? (
              <>
                {/* User info */}
                <div className="flex items-center space-x-3 pb-3 border-b border-gray-700">
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full border border-cyan-400/30"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 flex items-center justify-center text-black font-mono font-bold">
                      {user?.displayName?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                  <div>
                    <div className="font-mono text-white font-medium">
                      {user?.displayName || 'User'}
                    </div>
                    <div className="font-mono text-sm text-gray-400">
                      {user?.email}
                    </div>
                  </div>
                </div>
                
                {/* Navigation items */}
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg font-mono transition-all duration-200 ${
                        isActive(item.href)
                          ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
                
                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg font-mono text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 w-full"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  className="w-full justify-center"
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  onClick={() => {
                    navigate('/signup');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
