import {
    CodeBracketIcon,
    GlobeAltIcon,
    HeartIcon,
    StarIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import React from "react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="glass-intense border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-xl font-mono font-bold text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text">
              CodeSprint
            </div>
            <p className="text-gray-400 font-mono text-sm leading-relaxed">
              Master coding with gamified typing practice. Level up your skills in JavaScript, Python, and C++.
            </p>
          </div>
          
          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-mono font-semibold text-white">Features</h3>
            <ul className="space-y-2 text-sm font-mono text-gray-400">
              <li>
                <Link to="/courses" className="hover:text-cyan-400 transition-colors duration-200">
                  Typing Courses
                </Link>
              </li>
              <li>
                <Link to="/games" className="hover:text-cyan-400 transition-colors duration-200">
                  Coding Games
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-cyan-400 transition-colors duration-200">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-cyan-400 transition-colors duration-200">
                  Progress Tracking
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Languages */}
          <div className="space-y-4">
            <h3 className="font-mono font-semibold text-white">Languages</h3>
            <ul className="space-y-2 text-sm font-mono text-gray-400">
              <li className="flex items-center space-x-2">
                <CodeBracketIcon className="w-4 h-4" />
                <span>JavaScript</span>
              </li>
              <li className="flex items-center space-x-2">
                <CodeBracketIcon className="w-4 h-4" />
                <span>Python</span>
              </li>
              <li className="flex items-center space-x-2">
                <CodeBracketIcon className="w-4 h-4" />
                <span>C++</span>
              </li>
              <li className="flex items-center space-x-2">
                <CodeBracketIcon className="w-4 h-4" />
                <span>More coming soon</span>
              </li>
            </ul>
          </div>
          
          {/* Stats */}
          <div className="space-y-4">
            <h3 className="font-mono font-semibold text-white">Community</h3>
            <div className="space-y-2 text-sm font-mono text-gray-400">
              <div className="flex items-center space-x-2">
                <StarIcon className="w-4 h-4" />
                <span>1000+ Challenges</span>
              </div>
              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="w-4 h-4" />
                <span>Global Leaderboard</span>
              </div>
              <div className="flex items-center space-x-2">
                <HeartIcon className="w-4 h-4" />
                <span>Open Source</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm font-mono text-gray-400">
            © {currentYear} CodeSprint. Built with ❤️ for developers.
          </div>
          
          <div className="flex items-center space-x-6 text-sm font-mono text-gray-400">
            <Link 
              to="/privacy" 
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              Terms
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
