import React, { useEffect, useState } from 'react';
import { ExternalLink, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface AdBannerProps {
  format?: 'leaderboard' | 'rectangle';
  adClient?: string;
  adSlot?: string;
  className?: string;
  onRewardClick?: () => void;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  format = 'leaderboard',
  adClient = 'ca-pub-0000000000000000',
  adSlot = '1234567890',
  className = '',
  onRewardClick,
}) => {
  const [adLoaded, setAdLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      // If adsbygoogle is loaded, attempt real ad render
      const win = window as unknown as { adsbygoogle?: unknown[] };
      if (win.adsbygoogle && typeof win.adsbygoogle.push === 'function') {
        win.adsbygoogle.push({});
        setAdLoaded(true);
      }
    } catch {
      // Fallback banner displayed
    }
  }, []);

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full flex flex-col items-center justify-center my-3 select-none ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 mb-1">
        <span>Sponsor</span>
        <span aria-hidden="true">·</span>
        <span>Ad</span>
      </div>

      {format === 'leaderboard' ? (
        /* 728x90 Leaderboard on desktop, 320x50 on mobile */
        <div className="relative w-full max-w-[728px] h-[60px] sm:h-[80px] rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 shadow-md flex items-center justify-between px-4 sm:px-6 overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-2">
                <span>Catharsis Premium Gear & Stress Reliever</span>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Featured
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Level up your focus with ergonomic gaming keyboards & mindful noise-canceling headsets.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onRewardClick ? (
              <button
                onClick={onRewardClick}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-transform hover:scale-105 active:scale-95 shadow cursor-pointer flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Claim 2X Boost</span>
              </button>
            ) : (
              <a
                href="#learn-more"
                onClick={(e) => e.preventDefault()}
                className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-colors flex items-center gap-1"
              >
                <span>Learn More</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}
          </div>
        </div>
      ) : (
        /* 300x250 Medium Rectangle */
        <div className="relative w-full max-w-[320px] h-[200px] rounded-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 shadow-lg p-5 flex flex-col justify-between text-center overflow-hidden">
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="font-bold">GAMER DECOMPRESS</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[9px]">AD</span>
          </div>

          <div className="my-auto flex flex-col items-center">
            <span className="text-4xl mb-1.5 animate-bounce">⚡</span>
            <h4 className="text-sm font-black text-white">Daily Zen Coffee & Focus</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Zero jitter, pure calm focus for work and gaming sessions.
            </p>
          </div>

          {onRewardClick ? (
            <button
              onClick={onRewardClick}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black text-xs shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Watch Video for 2X Multiplier 🎁
            </button>
          ) : (
            <a
              href="#sponsored"
              onClick={(e) => e.preventDefault()}
              className="w-full py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs transition-colors block"
            >
              Visit Sponsor
            </a>
          )}
        </div>
      )}
    </aside>
  );
};
