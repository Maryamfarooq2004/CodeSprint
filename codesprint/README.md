# CodeSprint - Gamified Typing & Coding Practice Platform

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.1.0-orange.svg)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.11-blue.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.1-yellow.svg)](https://vitejs.dev/)

A modern, gamified platform for improving coding typing skills with real code snippets in JavaScript, Python, and C++. Built with React, Firebase, and featuring a beautiful glassmorphism dark theme.

## 🚀 Features

### ✨ Core Features
- **Multi-Language Support**: Practice with JavaScript, Python, and C++ code
- **Real-time Typing Test**: Live WPM, accuracy, and error tracking
- **Gamified Learning**: XP system, achievements, and progress tracking
- **Global Leaderboard**: Compete with developers worldwide
- **Interactive Games**: Code Drop, Bug Hunter, and Code Sniper mini-games
- **Progress Analytics**: Detailed statistics and improvement trends

### 🎮 Game Modes
- **Code Drop**: Type falling code snippets before they hit the bottom
- **Bug Hunter**: Find and fix syntax errors within time limits
- **Code Sniper**: Shoot correct code snippets with precision

### 📊 Analytics & Progress
- Real-time WPM and accuracy tracking
- Historical performance data
- Streak counters and achievement system
- Progress visualization with charts
- Personalized improvement suggestions

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1, Redux Toolkit, React Router v7
- **Styling**: Tailwind CSS 4.1.11, Framer Motion animations
- **Backend**: Firebase (Firestore, Auth, Storage, Hosting)
- **Build Tool**: Vite 7.1.1
- **Icons**: Heroicons, Lucide React
- **Notifications**: React Hot Toast

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Firebase account and project

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/Maryamfarooq2004/CodeSprint.git
cd CodeSprint/codesprint
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Firebase Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password, Google, GitHub)
3. Create a Firestore database
4. Enable Storage
5. Copy your Firebase config and update \`src/firebase/config.js\`

### 4. Environment Setup
The Firebase configuration is already set up in \`src/firebase/config.js\`. Update with your Firebase project credentials.

### 5. Database Setup
Initialize your Firestore database with the schema defined in \`database.md\`:

#### Collections Structure:
- \`/users/{uid}\` - User profiles
- \`/chapters/{chapterId}\` - Course content
- \`/users/{uid}/progress/{progressId}\` - User progress
- \`/users/{uid}/typing_stats/{statId}\` - Typing session logs
- \`/leaderboard/{entryId}\` - Global rankings

### 6. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit \`http://localhost:5173\` to see the application.

## 🏗️ Project Structure

\`\`\`
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Button, Card, Input, etc.)
│   └── layout/          # Layout components (Navbar, Footer, Layout)
├── features/            # Redux slices and feature logic
│   ├── auth/            # Authentication state management
│   ├── chapters/        # Course content management
│   ├── leaderboard/     # Leaderboard functionality
│   ├── progress/        # User progress tracking
│   └── typing/          # Typing test logic
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # Firebase service functions
├── store/               # Redux store configuration
├── firebase/            # Firebase configuration
└── styles/              # Global styles and themes
\`\`\`

## 🎨 Design System

### Color Palette
- **Background**: \`#0F111A\` (Deep dark)
- **Text Primary**: \`#E0E0E0\` (Light grey)
- **Accent Cyan**: \`#00E5FF\` (Neon cyan)
- **Accent Pink**: \`#FF6EC7\` (Vibrant pink)
- **Glass Background**: \`rgba(255, 255, 255, 0.05)\`

### Typography
- **Primary Font**: JetBrains Mono (monospace)
- **Consistent hierarchy** with proper contrast ratios
- **Accessibility-first** design with focus states

### UI Components
- **Glassmorphism effects** with backdrop blur
- **Neon glow animations** on hover
- **Smooth transitions** (200-300ms)
- **Responsive design** with mobile-first approach

## 🔧 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

## 🚀 Deployment

### Firebase Hosting
1. Install Firebase CLI:
   \`\`\`bash
   npm install -g firebase-tools
   \`\`\`

2. Login and initialize:
   \`\`\`bash
   firebase login
   firebase init hosting
   \`\`\`

3. Build and deploy:
   \`\`\`bash
   npm run build
   firebase deploy
   \`\`\`

## 📚 Usage Guide

### For Users
1. **Sign up** with email or social authentication
2. **Choose a course** from available programming languages
3. **Start typing** and track your real-time progress
4. **Play games** to make learning more engaging
5. **Check leaderboard** to see your global ranking
6. **Monitor progress** in your profile dashboard

### For Developers
1. **Fork the repository** and create your branch
2. **Follow the code style** with ESLint configuration
3. **Add new features** following the existing architecture
4. **Test thoroughly** before submitting pull requests
5. **Update documentation** for new features

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit changes: \`git commit -m 'Add amazing feature'\`
4. Push to branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **JetBrains Mono** for the beautiful monospace font
- **Heroicons** for the comprehensive icon library
- **Framer Motion** for smooth animations
- **Firebase** for the robust backend infrastructure
- **Tailwind CSS** for the utility-first styling approach

## 📞 Support

- 📧 Email: support@codesprint.dev
- 🐛 Issues: [GitHub Issues](https://github.com/Maryamfarooq2004/CodeSprint/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Maryamfarooq2004/CodeSprint/discussions)

---

**Built with ❤️ by developers, for developers**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
