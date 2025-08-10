import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import { fetchChapters } from '../features/chapters/chaptersSlice';
import { fetchUserProgress, fetchUserStats } from '../features/progress/progressSlice';
import React from "react";


const Stat = ({ label, value, accent }) => (
  <div className="flex flex-col p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
    <span className="text-xs uppercase tracking-wide text-gray-400 font-mono">{label}</span>
    <span className={`text-xl font-mono font-semibold mt-1 ${accent || 'text-white'}`}>{value}</span>
  </div>
);

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const progressState = useSelector(state => state.progress);
  const chaptersState = useSelector(state => state.chapters);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserProgress(user.uid));
      dispatch(fetchUserStats(user.uid));
    }
    if (chaptersState.chapters.length === 0) {
      dispatch(fetchChapters());
    }
  }, [user, dispatch]);

  const completed = progressState.completedChapters?.length || 0;
  const totalChapters = chaptersState.chapters.length || 0;
  const completionPct = totalChapters ? Math.round((completed / totalChapters) * 100) : 0;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-pink-400 text-transparent bg-clip-text">Welcome{user?.displayName ? `, ${user.displayName}` : ''}</h1>
          <p className="text-gray-400 font-mono text-sm">Track your learning velocity and typing mastery.</p>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          <Stat label="Chapters" value={`${completed}/${totalChapters}`} />
          <Stat label="Completion" value={`${completionPct}%`} accent="text-cyan-400" />
            <Stat label="Best WPM" value={progressState.bestWPM || 0} accent="text-pink-400" />
          <Stat label="Current Streak" value={progressState.streak || 0} accent="text-yellow-300" />
        </div>

        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-lg font-semibold text-white">Overall Progress</h2>
            <span className="text-xs text-gray-400 font-mono">{completionPct}%</span>
          </div>
          <ProgressBar value={completionPct} className="h-3" />
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-mono text-gray-300 mb-2">Recent Sessions</h3>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {progressState.typingStats?.slice(0,8).map(stat => (
                  <div key={stat.id} className="flex justify-between text-xs font-mono bg-white/5 px-3 py-2 rounded border border-white/10">
                    <span className="text-gray-400">{stat.chapterId || '—'}</span>
                    <span className="text-cyan-400">{stat.wpm} wpm</span>
                    <span className="text-pink-400">{stat.accuracy}%</span>
                  </div>
                ))}
                {progressState.typingStats?.length === 0 && <p className="text-gray-500 text-xs font-mono">No sessions yet.</p>}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-mono text-gray-300 mb-2">Chapter Progress</h3>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {chaptersState.chapters.slice(0,12).map(ch => {
                  const done = progressState.completedChapters?.includes(ch.id);
                  return (
                    <div key={ch.id} className="flex items-center gap-3 text-xs font-mono bg-white/5 px-3 py-2 rounded border border-white/10">
                      <span className={`w-2 h-2 rounded-full ${done ? 'bg-cyan-400 glow' : 'bg-gray-600'}`}></span>
                      <span className="flex-1 truncate text-gray-300">{ch.title}</span>
                      {done && <span className="text-cyan-400">Done</span>}
                    </div>
                  );
                })}
                {chaptersState.chapters.length === 0 && <p className="text-gray-500 text-xs font-mono">Loading chapters...</p>}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
