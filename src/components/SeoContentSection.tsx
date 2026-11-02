import React, { useState } from 'react';
import { ChevronDown, Share2, HelpCircle, Sparkles, Heart, Trophy, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SeoContentSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Is SmashChill completely free to play?',
      a: 'Yes, SmashChill is 100% free with unlimited access to all 6 anti-stress mini-games on both mobile and desktop. No registration, app install, or payment is required.',
    },
    {
      q: 'How does SmashChill help reduce stress and anger?',
      a: 'Psychological research shows that physical cathartic games (such as whacking annoying icons or breaking breakable digital objects) safely discharge accumulated emotional energy without real-world consequences. Combined with the Zen Pond and ASMR audio, it triggers deep autonomic nervous system relaxation within minutes.',
    },
    {
      q: 'Can I play SmashChill offline or add it to my phone home screen?',
      a: 'Yes! SmashChill is built as a Progressive Web App (PWA). You can tap "Add to Home Screen" on your mobile browser (Safari or Chrome) to launch it just like a native mobile app.',
    },
    {
      q: 'How are high scores and global rankings calculated?',
      a: 'Points earned in Whack-A-Stress, Stress Ninja, and Slap Dummy accumulate into your high score. You can post your nickname and country flag to the live Global Leaderboard to rank against players across 140 countries.',
    },
    {
      q: 'Does SmashChill work on low-spec phones and slow internet?',
      a: 'Absolutely! SmashChill uses browser-native Web Audio API synthesis and canvas physics with zero heavy video downloads, meaning it loads in under 1 second even on 3G connections.',
    },
  ];

  const shareText = encodeURIComponent(
    'I just smashed my stress on SmashChill! Whack annoying alarms, slice laptops like a ninja, and chill out here: https://smashchill.vercel.app'
  );
  const shareUrl = encodeURIComponent('https://smashchill.vercel.app');

  const handleShareTrigger = (platform: string) => {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fbbf24', '#38bdf8'],
    });

    let target = '';
    if (platform === 'whatsapp') {
      target = `https://api.whatsapp.com/send?text=${shareText}`;
    } else if (platform === 'twitter') {
      target = `https://twitter.com/intent/tweet?text=${shareText}`;
    } else if (platform === 'telegram') {
      target = `https://t.me/share/url?url=${shareUrl}&text=${shareText}`;
    } else if (platform === 'reddit') {
      target = `https://reddit.com/submit?url=${shareUrl}&title=${encodeURIComponent('SmashChill — Free Anti-Stress Arcade Game')}`;
    }

    if (target) {
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      aria-label="Game Guide & Frequently Asked Questions"
      className="w-full max-w-4xl mx-auto my-8 px-4 flex flex-col gap-8 text-slate-300"
    >
      {/* Viral Social Share Strip */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950/30 to-slate-900 border border-rose-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h3 className="text-sm font-black text-white flex items-center justify-center sm:justify-start gap-2">
            <Share2 className="w-4 h-4 text-rose-400" />
            <span>Challenge Friends & Share the Stress Relief!</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Send this to a stressed coworker or friend needing a quick laugh.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleShareTrigger('whatsapp')}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-transform hover:scale-105 active:scale-95 shadow flex items-center gap-1.5 cursor-pointer"
          >
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => handleShareTrigger('twitter')}
            className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs transition-transform hover:scale-105 active:scale-95 shadow flex items-center gap-1.5 cursor-pointer"
          >
            <span>X / Twitter</span>
          </button>
          <button
            onClick={() => handleShareTrigger('telegram')}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition-transform hover:scale-105 active:scale-95 shadow flex items-center gap-1.5 cursor-pointer"
          >
            <span>Telegram</span>
          </button>
        </div>
      </div>

      {/* SEO Rich Editorial Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-sm mb-2">
            🔨
          </div>
          <h3 className="text-sm font-extrabold text-white">Instant Catharsis</h3>
          <p className="text-slate-400">
            Smash monitors, whack early morning alarms, and slice laggy tech. Tapping triggers an immediate physical release of workday frustration and tension.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm mb-2">
            🫧
          </div>
          <h3 className="text-sm font-extrabold text-white">Sensory ASMR</h3>
          <p className="text-slate-400">
            Enjoy tactile bubble wrap pops, kinetic soap cutting, and soothing Web Audio API synthesized harmonics tuned to relieve cognitive burnout.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-2">
            🌸
          </div>
          <h3 className="text-sm font-extrabold text-white">Zen Mind Garden</h3>
          <p className="text-slate-400">
            Feed swimming koi fish, bloom radiant pink lotus flowers, and tune into ambient rainfall and lo-fi melodies to ground your mind in serenity.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section (Indexed by Google) */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-extrabold text-white">
            Frequently Asked Questions (FAQ) & Game Guide
          </h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-950/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-white hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-400 border-t border-slate-800/60 pt-3 leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
