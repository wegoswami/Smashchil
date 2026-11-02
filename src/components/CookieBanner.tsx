import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const accepted = localStorage.getItem('smashchill_cookie_consent');
    if (!accepted) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('smashchill_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 z-50 max-w-md p-4 rounded-2xl bg-slate-900/95 border-2 border-slate-700 shadow-2xl backdrop-blur-md flex flex-col gap-3 text-slate-200 animate-in fade-in slide-in-from-bottom-5 duration-300 select-none">
      <div className="flex items-start gap-2.5">
        <Cookie className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed text-slate-300">
          <span>We use cookies to save your high scores, analyze traffic, and support advertising via Google AdSense. See our </span>
          <button
            onClick={onOpenPrivacy}
            className="text-amber-400 underline font-bold hover:text-amber-300 cursor-pointer"
          >
            Privacy Policy
          </button>.
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={handleAccept}
          className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow"
        >
          Accept & Play
        </button>
      </div>
    </div>
  );
};
