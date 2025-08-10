CodeSprint – UI & Development Guidelines
1. Overall Look & Feel
Theme:

Background: #0F111A (deep dark)

Text: #E0E0E0 (light grey)

Accent Colors:

Cyan Glow: #00E5FF

Pink Glow: #FF6EC7

All colors should have subtle neon glow effects.

Design must be dark-mode-first, no light theme.

Typography:

Primary Font: "JetBrains Mono", monospace or "Fira Code", monospace

Consistent font sizes for hierarchy:

Headings: large, bold, letter spacing

Body: slightly smaller, high contrast

Use monospace font even for UI labels for the coding/gaming vibe.

Glassmorphism Effects:

Card Background: rgba(255, 255, 255, 0.05) with backdrop-filter: blur(10px)

Rounded Corners: border-radius: 1rem

Subtle inner shadow + border glow.

Animations:

Smooth transitions (200–300ms ease-in-out)

Glow intensifies on hover.

Collapsible panels slide smoothly.

Button click feedback (scale down 95% then back up).

2. Page-Level Layouts
2.1 Authentication Pages (Login / Signup)
Layout:

Full-screen centered card with glass background.

Split card: left side coding-themed graphic, right side form.

Optional animated background with subtle moving particles.

Elements:

Input fields styled with glassmorphism.

Glow border on focus.

Cyan submit button → hover pink glow.

Links for "Forgot Password" & "Sign Up / Log In" toggle.

2.2 Dashboard
Layout:

Sidebar navigation (glass, fixed left)

Main content scrollable area

Top nav with user avatar, display name, and quick stats.

Components:

Course progress cards

Quick access to games & challenges

Leaderboard snippet preview

2.3 Chapter Selection Page
Structure:

Collapsible sections per difficulty (Beginner, Intermediate, Advanced, etc.)

Each section:

Header with difficulty name, progress bar (0–100%), and description.

Expandable list of chapter cards.

Chapter Card:

Title, snippet preview, "Start" button

Status badge (Not Started, In Progress, Completed)

Glow on hover

Behavior:

Clicking "Start" → opens typing test

Progress updates in real time when chapter completed.

2.4 Typing Test Page
UI Zones:

Header Bar: chapter title, difficulty tag, and progress

Main Test Area:

Code snippet box (glass background, monospace)

Real-time highlighting:

Green: correct chars

Red: incorrect chars

Blinking cursor

On-Screen QWERTY Keyboard:

Keys glow when pressed

Stats Area:

Live WPM, Accuracy, Errors

Restart / Exit buttons

End-of-Test Modal:

Shows results with badge animations

Option to retry or go to next chapter

2.5 Games
Code Drop
Falling code snippets from top → type them before they hit bottom.

Increasing speed.

Firebase stores score.

Bug Hunter
Shows faulty code → click & fix errors before timer runs out.

Code Sniper
3 glass cards appear → cursor is sniper scope.

Shoot correct answer → glass shatter animation.

Firebase saves score.

2.6 Leaderboard
Layout:

Table with:

Rank

Avatar

Username

WPM

Accuracy

Progress %

Real-time updates from Firebase.

Features:

Highlight current user

Pagination

Filters (game, language, time range)

2.7 Stats & Profile
Show all-time progress graph

Weekly trends

Streak counter

Achievements grid (badges with tooltips)

Edit profile section

3. Component Design Rules
Buttons:

Primary: cyan glow → hover pink glow

Secondary: transparent glass with border

All rounded, bold text

Cards:

Glassmorphism always

Shadow + glow

Subtle hover lift effect

Progress Bars:

Glass background

Neon fill

Modals:

Full-screen blur behind

Glass panel center

Forms:

Floating labels

Input borders glow on focus

Tables:

Minimal borders

Glass rows

Hover highlight

4. Firebase Integration Rules
Auth:

Email/password + Google/GitHub providers

Redirect on login/logout

Store displayName & photoURL in Firestore profile

Firestore:

All reads/writes via secure rules

Indexed queries for leaderboard & chapters

Real-time listeners for:

Progress updates

Leaderboard

Challenges

Storage:

Profile pictures & assets

Cloud Functions:

Score validation

Challenge generation

5. Best Practices for Code
Folder Structure:

css
Copy
Edit
src/
  components/
  pages/
  features/
  hooks/
  services/
  store/
  styles/
React Rules:

Functional components only

Hooks for state & Firebase calls

Use Redux Toolkit for global state

Use React.lazy for lazy loading

Tailwind Rules:

No inline styles

Use responsive classes (sm:, md:, lg:)

Use dark: variants for glow adjustments

Performance:

Memoize heavy components

Code splitting by route

Preload critical assets