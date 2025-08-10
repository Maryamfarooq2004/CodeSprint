import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import { fetchChapters, searchChapters, setFilters } from '../features/chapters/chaptersSlice';
import React from "react";


const filterPill = 'px-3 py-1 rounded-full text-xs font-mono border transition-all';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { chapters, filteredChapters, filters, loading } = useSelector(state => state.chapters);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (chapters.length === 0) dispatch(fetchChapters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchChapters(search));
  }, [search]);

  const list = filteredChapters.length ? filteredChapters : chapters;
  const languages = Array.from(new Set(chapters.map(c => c.language))).sort();
  const levels = Array.from(new Set(chapters.map(c => c.level))).sort();

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-mono font-bold text-white">Courses</h1>
          <p className="text-gray-400 text-sm font-mono">Browse chapters by language & difficulty.</p>
        </div>

        <Card className="p-5 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs uppercase text-gray-400 font-mono">Search</label>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Variables, loops..." className="mt-1 w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-cyan-400" />
            </div>
            <div>
              <label className="text-xs uppercase text-gray-400 font-mono">Language</label>
              <div className="flex flex-wrap gap-2 mt-1">
                <button onClick={()=>dispatch(setFilters({language:'all'}))} className={`${filterPill} ${filters.language==='all'?'bg-cyan-500/20 text-cyan-300 border-cyan-400':'border-white/10 text-gray-400 hover:border-cyan-400/40'}`}>All</button>
                {languages.map(l => (
                  <button key={l} onClick={()=>dispatch(setFilters({language:l}))} className={`${filterPill} ${filters.language===l?'bg-cyan-500/20 text-cyan-300 border-cyan-400':'border-white/10 text-gray-400 hover:border-cyan-400/40'}`}>{l}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs uppercase text-gray-400 font-mono">Level</label>
              <div className="flex flex-wrap gap-2 mt-1">
                <button onClick={()=>dispatch(setFilters({level:'all'}))} className={`${filterPill} ${filters.level==='all'?'bg-pink-500/20 text-pink-300 border-pink-400':'border-white/10 text-gray-400 hover:border-pink-400/40'}`}>All</button>
                {levels.map(l => (
                  <button key={l} onClick={()=>dispatch(setFilters({level:l}))} className={`${filterPill} ${filters.level===l?'bg-pink-500/20 text-pink-300 border-pink-400':'border-white/10 text-gray-400 hover:border-pink-400/40'}`}>{l}</button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {loading && <p className="text-gray-500 font-mono col-span-full">Loading chapters...</p>}
          {!loading && list.map(ch => (
            <Card key={ch.id} className="p-5 flex flex-col gap-3 hover:border-cyan-400/40 transition border border-white/10">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-mono font-semibold text-white text-sm leading-snug">{ch.title}</h3>
                <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">{ch.language}</span>
              </div>
              <p className="text-xs text-gray-400 font-mono line-clamp-3">{ch.description || ch.snippet || 'Practice typing with this concept.'}</p>
              <div className="flex justify-between items-center mt-auto text-[10px] font-mono text-gray-500">
                <span className="px-2 py-1 rounded bg-pink-500/10 text-pink-300 border border-pink-400/30">L{ch.level}</span>
                <Link to={`/chapter/${ch.id}`} className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 hover:bg-cyan-500/30 transition">Start</Link>
              </div>
            </Card>
          ))}
          {!loading && list.length === 0 && (
            <p className="text-gray-500 font-mono col-span-full text-sm">No chapters match filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
