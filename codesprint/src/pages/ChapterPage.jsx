import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { fetchChapters, setSelectedChapter } from '../features/chapters/chaptersSlice';
import { saveChapterProgress, saveTypingSession } from '../features/progress/progressSlice';
import React from "react";


const ChapterPage = () => {
  const { chapterId } = useParams();
  const dispatch = useDispatch();
  const { chapters } = useSelector(state => state.chapters);
  const { user } = useSelector(state => state.auth);
  const progress = useSelector(state => state.progress.progress);
  const typingStats = useSelector(state => state.progress.typingStats);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [finished, setFinished] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (chapters.length === 0) dispatch(fetchChapters());
  }, [dispatch]);

  const chapter = useMemo(() => chapters.find(c => c.id === chapterId), [chapters, chapterId]);

  useEffect(()=> {
    if (chapter) dispatch(setSelectedChapter(chapter));
  }, [chapter]);

  const targetText = chapter?.snippet || chapter?.text || 'No snippet available.';
  const words = targetText.trim().split(/\s+/);
  const correctWords = input.trim().split(/\s+/).filter((w,i)=> w === words[i]).length;
  const accuracy = input.length ? Math.round((correctWords/words.length)*100) : 0;
  const elapsedSec = startTime ? (Date.now() - startTime)/1000 : 0;
  const wpm = elapsedSec > 0 ? Math.round((correctWords / elapsedSec) * 60) : 0;

  const complete = input.trim() === targetText.trim();

  const handleChange = (e) => {
    if (!startTime) setStartTime(Date.now());
    const val = e.target.value;
    if (val.length > targetText.length) return; // prevent overflow
    setInput(val);
    if (val.trim() === targetText.trim() && !finished) {
      setFinished(true);
      setAttempts(a=>a+1);
      if (user) {
        dispatch(saveTypingSession({ userId: user.uid, chapterId, wpm, accuracy, errors: 0, attempts: attempts+1 }));
        dispatch(saveChapterProgress({ userId: user.uid, chapterId, wpm, accuracy, completed: true }));
      }
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-mono font-bold text-white">{chapter?.title || 'Chapter'}</h1>
          <p className="text-sm font-mono text-gray-400">{chapter?.description || 'Practice typing for this concept.'}</p>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <h2 className="text-sm font-mono text-gray-300">Snippet</h2>
            <pre className="font-mono text-xs bg-black/40 border border-white/10 rounded p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap selection:bg-cyan-500/30">
{targetText}
            </pre>
          </div>
          <div className="space-y-3">
            <h2 className="text-sm font-mono text-gray-300">Type Here</h2>
            <textarea
              className="w-full h-40 font-mono text-xs resize-none bg-white/5 border border-white/10 rounded p-3 focus:outline-none focus:border-cyan-400/50 text-gray-200 tracking-wide"
              value={input}
              onChange={handleChange}
              placeholder="Start typing the snippet..."
              disabled={finished}
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-white/5 border border-white/10 rounded p-2 flex flex-col"><span className="text-gray-400">WPM</span><span className="text-cyan-400 text-lg">{wpm}</span></div>
              <div className="bg-white/5 border border-white/10 rounded p-2 flex flex-col"><span className="text-gray-400">Accuracy</span><span className="text-pink-400 text-lg">{accuracy}%</span></div>
              <div className="bg-white/5 border border-white/10 rounded p-2 flex flex-col"><span className="text-gray-400">Progress</span><span className="text-green-400 text-lg">{Math.min(100, Math.round((input.length/targetText.length)*100))}%</span></div>
              <div className="bg-white/5 border border-white/10 rounded p-2 flex flex-col"><span className="text-gray-400">Attempts</span><span className="text-yellow-300 text-lg">{attempts}</span></div>
            </div>
            {finished && (
              <div className="flex flex-wrap gap-3 pt-2">
                <Button onClick={()=>{setInput(''); setFinished(false); setStartTime(null);}} variant="secondary" size="sm">Retry</Button>
                <Button to="/courses" size="sm">Back to Courses</Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChapterPage;
