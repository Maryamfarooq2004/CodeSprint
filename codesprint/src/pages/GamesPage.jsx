import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import React from "react";


const miniGames = [
  { id: 'speed', title: 'Speed Burst', desc: 'Type as many words as you can in 30s.' },
  { id: 'precision', title: 'Precision Mode', desc: 'Perfect accuracy challenge.' },
  { id: 'memory', title: 'Memory Snippet', desc: 'Memorize then type without looking.' },
  { id: 'syntax', title: 'Syntax Cleanser', desc: 'Remove errors from obfuscated code.' }
];

const GamesPage = () => (
  <div className="min-h-screen py-10 px-4">
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-mono font-bold text-white">Games</h1>
        <p className="text-gray-400 font-mono text-sm">Arcade style practice modes (alpha).</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {miniGames.map(g => (
          <Card key={g.id} className="p-5 flex flex-col gap-3 border border-white/10 hover:border-cyan-400/40 transition">
            <h3 className="font-mono font-semibold text-white text-sm">{g.title}</h3>
            <p className="text-xs font-mono text-gray-400 flex-1">{g.desc}</p>
            <Button size="sm" disabled variant="secondary">Coming Soon</Button>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default GamesPage;
