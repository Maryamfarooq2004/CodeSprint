import { useSelector } from 'react-redux';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import React from "react";


const ProfilePage = () => {
  const { user } = useSelector(state => state.auth);
  const progress = useSelector(state => state.progress);

  if (!user) return <div className="p-10 text-center text-sm font-mono text-gray-500">No user session.</div>;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <img src={user.photoURL || 'https://api.dicebear.com/7.x/thumbs/svg?seed='+user.uid} alt="avatar" className="w-20 h-20 rounded-full border border-white/10 object-cover" />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-mono font-bold text-white">{user.displayName || 'Anonymous User'}</h1>
            <p className="text-sm text-gray-400 font-mono">{user.email}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4 flex flex-col gap-1">
            <span className="text-xs font-mono text-gray-400 uppercase">Chapters Completed</span>
            <span className="text-xl font-mono text-cyan-400">{progress.completedChapters?.length || 0}</span>
          </Card>
          <Card className="p-4 flex flex-col gap-1">
            <span className="text-xs font-mono text-gray-400 uppercase">Best WPM</span>
            <span className="text-xl font-mono text-pink-400">{progress.bestWPM || 0}</span>
          </Card>
          <Card className="p-4 flex flex-col gap-1">
            <span className="text-xs font-mono text-gray-400 uppercase">Streak</span>
            <span className="text-xl font-mono text-yellow-300">{progress.streak || 0}</span>
          </Card>
        </div>

        <Card className="p-6 space-y-4">
          <h2 className="font-mono text-lg font-semibold text-white">Account</h2>
          <div className="grid gap-3 text-sm font-mono text-gray-300">
            <div className="flex justify-between"><span>User ID</span><span className="text-gray-500 truncate max-w-xs">{user.uid}</span></div>
            <div className="flex justify-between"><span>Email Verified</span><span className="text-gray-400">{user.emailVerified ? 'Yes' : 'No'}</span></div>
            <div className="flex justify-between"><span>Provider</span><span className="text-gray-400">{user.providerId || (user.providerData && user.providerData[0]?.providerId)}</span></div>
          </div>
          <div className="pt-2 flex flex-wrap gap-3">
            <Button size="sm" to="/dashboard">Back</Button>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default ProfilePage;
