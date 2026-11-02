import React, { useState, useEffect } from 'react';
import { Header, GameMode } from './components/Header';
import { WhackAStress } from './components/WhackAStress';
import { StressNinja } from './components/StressNinja';
import { SlapDummy } from './components/SlapDummy';
import { RageRoom } from './components/RageRoom';
import { BubblePop } from './components/BubblePop';
import { ZenPond } from './components/ZenPond';
import { StatsModal } from './components/StatsModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { RewardedAdModal } from './components/RewardedAdModal';
import { AdBanner } from './components/AdBanner';
import { sound } from './utils/audio';

export default function App() {
  const [activeMode, setActiveMode] = useState<GameMode>('whack');
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(sound.getBgmPlaying());
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isRewardedAdOpen, setIsRewardedAdOpen] = useState<boolean>(false);

  const [sessionStats, setSessionStats] = useState({
    itemsSmashed: 14,
    rantsDestroyed: 5,
    bubblesPopped: 42,
    breathsTaken: 8,
  });

  const [userHighScore, setUserHighScore] = useState<number>(() => {
    const whackBest = parseInt(localStorage.getItem('whack_highscore') || '0', 10);
    const ninjaBest = parseInt(localStorage.getItem('ninja_highscore') || '0', 10);
    return Math.max(whackBest, ninjaBest, 1200);
  });

  const handleToggleBgm = () => {
    const next = sound.toggleBgm();
    setIsBgmPlaying(next);
  };

  const handleRewardClaimed = () => {
    setUserHighScore((prev) => prev * 2);
    setSessionStats((prev) => ({
      ...prev,
      itemsSmashed: prev.itemsSmashed + 20,
    }));
  };

  const games: { id: GameMode; title: string; subtitle: string; icon: string; bg: string }[] = [
    {
      id: 'whack',
      title: 'Whack-A-Stress',
      subtitle: 'Hammer alarms & toxic emails!',
      icon: '🔨',
      bg: 'from-amber-500/20 to-rose-500/20 border-amber-500/50',
    },
    {
      id: 'ninja',
      title: 'Stress Ninja',
      subtitle: 'Swipe & slice flying laptops!',
      icon: '⚔️',
      bg: 'from-sky-500/20 to-indigo-500/20 border-sky-500/50',
    },
    {
      id: 'slap',
      title: 'Slap Dummy',
      subtitle: 'Wobble ragdoll & open slap!',
      icon: '🥊',
      bg: 'from-rose-500/20 to-pink-500/20 border-rose-500/50',
    },
    {
      id: 'smash',
      title: 'Smash Room',
      subtitle: 'Sledgehammer PC destruction!',
      icon: '💥',
      bg: 'from-purple-500/20 to-red-500/20 border-purple-500/50',
    },
    {
      id: 'bubble',
      title: 'Bubble Pop',
      subtitle: 'Endless sensory popping!',
      icon: '🫧',
      bg: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/50',
    },
    {
      id: 'zen',
      title: 'Koi Zen Pond',
      subtitle: 'Feed fish & bloom lotus buds!',
      icon: '🌸',
      bg: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/50',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Arcade Header with BGM and Leaderboard Ranking */}
      <Header
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
      />

      {/* Main Arcade Experience */}
      <main className="flex-1 flex flex-col items-center justify-start py-4 px-3 sm:px-6">
        {/* Game Selection Cards Strip */}
        <div className="w-full max-w-4xl grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
          {games.map((g) => {
            const isCurrent = activeMode === g.id;
            return (
              <button
                key={g.id}
                onClick={() => {
                  setActiveMode(g.id);
                  sound.playBonk();
                }}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                  isCurrent
                    ? `bg-gradient-to-b ${g.bg} scale-105 shadow-lg border-white text-white`
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <span className="text-2xl sm:text-3xl filter drop-shadow">{g.icon}</span>
                <span className="text-[11px] font-black mt-1 text-center truncate w-full">
                  {g.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Game Stage */}
        <div className="w-full flex justify-center">
          {activeMode === 'whack' && (
            <WhackAStress onWatchAd={() => setIsRewardedAdOpen(true)} />
          )}

          {activeMode === 'ninja' && (
            <StressNinja onWatchAd={() => setIsRewardedAdOpen(true)} />
          )}

          {activeMode === 'slap' && <SlapDummy />}

          {activeMode === 'smash' && (
            <RageRoom
              lang="hi"
              onItemSmashed={() =>
                setSessionStats((s) => ({ ...s, itemsSmashed: s.itemsSmashed + 1 }))
              }
            />
          )}

          {activeMode === 'bubble' && (
            <BubblePop
              lang="hi"
              onBubblePopped={() =>
                setSessionStats((s) => ({ ...s, bubblesPopped: s.bubblesPopped + 1 }))
              }
            />
          )}

          {activeMode === 'zen' && <ZenPond />}
        </div>

        {/* Responsive In-Feed / Leaderboard Ad Banner */}
        <AdBanner
          format="leaderboard"
          onRewardClick={() => setIsRewardedAdOpen(true)}
          className="mt-6"
        />
      </main>

      {/* Bottom Arcade Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-6 py-3 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300">CATHARSIS ARCADE</span>
            <span aria-hidden="true">·</span>
            <span>Worldwide Stress Relief & Ranking Games</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <button
              onClick={() => setIsLeaderboardOpen(true)}
              className="text-amber-400 font-bold hover:underline cursor-pointer"
            >
              Global Leaderboard
            </button>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-bold">100% Vercel & AdSense Ready</span>
          </div>
        </div>
      </footer>

      {/* Worldwide Live Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        userHighScore={userHighScore}
      />

      {/* Rewarded Ad Sponsor Modal */}
      <RewardedAdModal
        isOpen={isRewardedAdOpen}
        onClose={() => setIsRewardedAdOpen(false)}
        onRewardClaimed={handleRewardClaimed}
      />

      {/* High Scores & Stats Modal */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        lang="hi"
        sessionStats={sessionStats}
      />
    </div>
  );
}
