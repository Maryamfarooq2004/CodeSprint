import {
    ChartBarIcon,
    CodeBracketIcon,
    PlayIcon,
    RocketLaunchIcon,
    SparklesIcon,
    TrophyIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import React from "react";


const LandingPage = () => {
  const features = [
    {
      icon: CodeBracketIcon,
      title: 'Multi-Language Support',
      description: 'Practice typing with real code in JavaScript, Python, and C++',
      color: 'cyan'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Gamified Learning',
      description: 'Level up your skills with engaging games and challenges',
      color: 'pink'
    },
    {
      icon: TrophyIcon,
      title: 'Global Leaderboard',
      description: 'Compete with developers worldwide and track your progress',
      color: 'purple'
    },
    {
      icon: ChartBarIcon,
      title: 'Progress Tracking',
      description: 'Detailed analytics of your typing speed and accuracy',
      color: 'cyan'
    },
    {
      icon: PlayIcon,
      title: 'Interactive Games',
      description: 'Code Drop, Bug Hunter, and Code Sniper mini-games',
      color: 'pink'
    },
    {
      icon: SparklesIcon,
      title: 'Real-time Feedback',
      description: 'Instant feedback with syntax highlighting and error detection',
      color: 'purple'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '10K+' },
    { label: 'Code Challenges', value: '500+' },
    { label: 'Languages', value: '3' },
    { label: 'Games', value: '5' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-mono font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text mb-6"
            >
              CodeSprint
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl text-gray-300 font-mono mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Master coding through gamified typing practice. Improve your speed, accuracy, and muscle memory with real code snippets.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/signup">
                <Button size="lg" className="px-8 py-4 text-lg">
                  Start Coding
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-cyan-400/20 rounded-lg rotate-12 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-16 h-16 border border-pink-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-20 w-12 h-12 border border-purple-400/20 rounded-lg rotate-45 animate-pulse" style={{ animationDelay: '2s' }} />
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-mono font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-mono text-sm lg:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white mb-4">
              Why Choose CodeSprint?
            </h2>
            <p className="text-xl text-gray-300 font-mono max-w-2xl mx-auto">
              The most comprehensive platform for improving your coding typing skills
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full p-8 hover:glow-cyan">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${
                      feature.color === 'cyan' ? 'from-cyan-400 to-cyan-600' :
                      feature.color === 'pink' ? 'from-pink-400 to-pink-600' :
                      'from-purple-400 to-purple-600'
                    } flex items-center justify-center mb-6`}>
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    
                    <h3 className="text-xl font-mono font-semibold text-white mb-4">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 font-mono leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center p-12 bg-gradient-to-r from-cyan-400/10 to-pink-400/10 border-cyan-400/20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white mb-4">
                Ready to Level Up?
              </h2>
              <p className="text-xl text-gray-300 font-mono mb-8 max-w-2xl mx-auto">
                Join thousands of developers improving their coding speed and accuracy every day.
              </p>
              <Link to="/signup">
                <Button size="lg" className="px-12 py-4 text-lg">
                  Get Started Free
                </Button>
              </Link>
            </motion.div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
