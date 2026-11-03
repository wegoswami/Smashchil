import React from 'react';
import { Volume2, VolumeX, Trophy, Music, Maximize, Minimize, Shield, Gift, HelpCircle } from 'lucide-react';
import { sound } from '../utils/audio';

export type GameMode = 'whack' | 'ninja' | 'slap' | 'smash' | 'bubble' | 'zen';

interface HeaderProps {
  activeMode: GameMode;
  setActiveMode: (mode: GameMode) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
  coins: number;
  onOpenArmory: () => void;
  onOpenQuests: () => void;
  onOpenLeaderboard: () => void;
  onOpenStats: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onOpenLegal?: (tab: 'about' | 'contact' | 'privacy') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeMode,
  setActiveMode,
  isMuted,
  setIsMuted,
  isBgmPlaying,
  onToggleBgm,
  coins,
  onOpenArmory,
  onOpenQuests,
  onOpenLeaderboard,
  onOpenStats,
  isFullscreen,
  onToggleFullscreen,
  onOpenLegal,
}) => {
  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  const games: { id: GameMode; label: string; icon: string }[] = [
    { id: 'whack', label: 'Whack-A-Stress', icon: '🔨' },
    { id: 'ninja', label: 'Stress Ninja', icon: '⚔️' },
    { id: 'slap', label: 'Slap Dummy', icon: '🥊' },
    { id: 'smash', label: 'Smash Room', icon: '💥' },
    { id: 'bubble', label: 'Bubble Pop', icon: '🫧' },
    { id: 'zen', label: 'Zen Pond', icon: '🌸' },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-4 px-3 sm:px-6 py-3 bg-slate-950/90 backdrop-blur-md border-b-2 border-slate-800 select-none">
      {/* Zone 1: Wordmark */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setActiveMode('whack')}
          className="text-lg sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
        >
          <span>⚡ SMASHCHILL</span>
          <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-rose-600/30 text-rose-400 border border-rose-500/40 font-bold uppercase tracking-wider">
            PRO
          </span>
        </button>
      </div>

      {/* Zone 2: Fast game switcher links */}
      <nav className="hidden xl:flex items-center gap-2 text-xs font-bold text-slate-300">
        {games.map((g) => {
          const isActive = activeMode === g.id;
          return (
            <button
              key={g.id}
              onClick={() => {
                setActiveMode(g.id);
                sound.playBonk();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-600 text-white shadow-md scale-105'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span>{g.icon}</span>
              <span>{g.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Coins, Armory, Quests, BGM & Fullscreen */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Coin wallet */}
        <button
          onClick={onOpenArmory}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 text-amber-400 text-xs font-black font-mono tabular-nums transition-colors cursor-pointer shadow-inner"
          title="Open Armory"
        >
          <span>🪙</span>
          <span>{coins.toLocaleString()}</span>
        </button>

        {/* Armory */}
        <button
          onClick={onOpenArmory}
          title="Weapon Armory"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer hidden sm:flex items-center gap-1 text-xs font-bold"
        >
          <Shield className="w-4 h-4 text-amber-400" />
          <span>Gear</span>
        </button>

        {/* Daily Quests */}
        <button
          onClick={onOpenQuests}
          title="Daily Quests & Streak"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
        >
          <Gift className="w-4 h-4 text-emerald-400" />
          <span className="hidden md:inline">Quests</span>
        </button>

        {/* Lo-Fi Music Toggle */}
        <button
          onClick={onToggleBgm}
          title={isBgmPlaying ? 'Pause Lo-Fi BGM' : 'Play Lo-Fi BGM'}
          className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
            isBgmPlaying
              ? 'bg-purple-600/30 border-purple-500 text-purple-300 animate-pulse'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
          aria-label="Lo-Fi BGM"
        >
          <Music className="w-4 h-4" />
          <span className="hidden lg:inline">{isBgmPlaying ? 'BGM ON' : 'BGM'}</span>
        </button>

        {/* Audio Sound FX Toggle */}
        <button
          onClick={handleToggleSound}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>

        {/* Worldwide Leaderboard button */}
        <button
          onClick={onOpenLeaderboard}
          className="flex items-center gap-1 px-3 py-1.5 sm:py-2 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 shrink-0"
        >
          <Trophy className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ranks</span>
        </button>

        {/* Help & Compliance Desk */}
        {onOpenLegal && (
          <button
            onClick={() => onOpenLegal('about')}
            title="About & Help"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
            aria-label="About and Help"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
          </button>
        )}

        {/* Fullscreen Pro Toggle */}
        <button
          onClick={onToggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer hidden sm:block"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
