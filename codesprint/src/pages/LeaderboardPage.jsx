import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/ui/Card';
import { fetchChapters } from '../features/chapters/chaptersSlice';
import { fetchAccuracyLeaderboard, fetchLeaderboard, setFilters } from '../features/leaderboard/leaderboardSlice';
import React from "react";


const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const { wpmLeaderboard, accuracyLeaderboard, filters, loading } = useSelector(state => state.leaderboard);
  const { chapters } = useSelector(state => state.chapters);
  const [tab, setTab] = useState('wpm');

  useEffect(() => {
    if (chapters.length === 0) dispatch(fetchChapters());
  }, []);

  useEffect(() => {
    dispatch(fetchLeaderboard({ language: filters.language }));
    dispatch(fetchAccuracyLeaderboard({ language: filters.language }));
  }, [filters.language]);

  const languages = Array.from(new Set(chapters.map(c => c.language))).sort();
  const list = tab === 'wpm' ? wpmLeaderboard : accuracyLeaderboard;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-mono font-bold text-white">Leaderboard</h1>
          <p className="text-gray-400 text-sm font-mono">Global rankings by typing performance.</p>
        </div>
        <Card className="p-5 space-y-4">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex gap-2">
              <button onClick={()=>setTab('wpm')} className={`px-4 py-2 rounded font-mono text-xs border ${tab==='wpm'?'bg-cyan-500/20 text-cyan-300 border-cyan-400':'border-white/10 text-gray-400 hover:border-cyan-400/40'}`}>Best WPM</button>
              <button onClick={()=>setTab('accuracy')} className={`px-4 py-2 rounded font-mono text-xs border ${tab==='accuracy'?'bg-pink-500/20 text-pink-300 border-pink-400':'border-white/10 text-gray-400 hover:border-pink-400/40'}`}>Accuracy</button>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <span className="text-xs font-mono text-gray-400">Language:</span>
              <button onClick={()=>dispatch(setFilters({language:'all'}))} className={`text-xs px-3 py-1 rounded border font-mono ${filters.language==='all'?'bg-white/10 text-white border-cyan-400':'border-white/10 text-gray-400 hover:border-cyan-400/40'}`}>All</button>
              {languages.map(l => (
                <button key={l} onClick={()=>dispatch(setFilters({language:l}))} className={`text-xs px-3 py-1 rounded border font-mono ${filters.language===l?'bg-white/10 text-white border-cyan-400':'border-white/10 text-gray-400 hover:border-cyan-400/40'}`}>{l}</button>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-400">
                  <th className="px-3 py-1">#</th>
                  <th className="px-3 py-1">User</th>
                  <th className="px-3 py-1">Language</th>
                  {tab==='wpm'? <th className="px-3 py-1">Best WPM</th>: <th className="px-3 py-1">Avg Accuracy</th>}
                  <th className="px-3 py-1">Tests</th>
                  <th className="px-3 py-1">Updated</th>
                </tr>
              </thead>
              <tbody>
                {list.map(entry => (
                  <tr key={entry.id} className="bg-white/5 border border-white/10 rounded hover:bg-white/10 transition">
                    <td className="px-3 py-2 text-cyan-400 font-semibold">{entry.rank || '-'}</td>
                    <td className="px-3 py-2 text-gray-200">{entry.username || entry.userId?.slice(0,6)}</td>
                    <td className="px-3 py-2 text-gray-400">{entry.language || '—'}</td>
                    {tab==='wpm'? <td className="px-3 py-2 text-pink-400">{entry.bestWPM || 0}</td> : <td className="px-3 py-2 text-pink-400">{entry.avgAccuracy || 0}%</td>}
                    <td className="px-3 py-2 text-gray-400">{entry.totalTests || 0}</td>
                    <td className="px-3 py-2 text-gray-500">{entry.lastUpdated?.seconds ? new Date(entry.lastUpdated.seconds*1000).toLocaleDateString() : (entry.lastUpdated? new Date(entry.lastUpdated).toLocaleDateString() : '—')}</td>
                  </tr>
                ))}
                {!loading && list.length === 0 && (
                  <tr><td colSpan={6} className="px-3 py-6 text-center text-gray-500">No entries yet.</td></tr>
                )}
                {loading && (
                  <tr><td colSpan={6} className="px-3 py-6 text-center text-gray-500">Loading...</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LeaderboardPage;
