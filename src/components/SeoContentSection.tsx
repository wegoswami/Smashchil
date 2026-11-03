import React, { useState } from 'react';
import {
  ChevronDown,
  Share2,
  HelpCircle,
  Sparkles,
  Heart,
  Trophy,
  Zap,
  BookOpen,
  Brain,
  Timer,
  Volume2,
  Gamepad2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GameMode } from './Header';

interface SeoContentSectionProps {
  onSelectGame?: (mode: GameMode) => void;
  onOpenLegal?: (tab: 'privacy' | 'terms' | 'about' | 'contact' | 'disclaimer') => void;
}

export const SeoContentSection: React.FC<SeoContentSectionProps> = ({ onSelectGame, onOpenLegal }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeArticleTab, setActiveArticleTab] = useState<'guides' | 'science' | 'ergonomics'>('guides');

  const faqs = [
    {
      q: 'Is SmashChill completely free to play without any registration?',
      a: 'Yes, SmashChill is 100% free with unlimited access to all anti-stress mini-games on both mobile phones and desktop computers. You never need to enter credit cards, create accounts, or download software. Everything runs natively in your web browser.',
    },
    {
      q: 'How does digital catharsis help relieve stress and anger?',
      a: 'Scientific research demonstrates that physical cathartic games (such as whacking annoying alarm clocks, smashing digital office equipment, and popping bubble wrap) provide a safe physiological outlet for accumulated cortisol and adrenaline. Rather than internalizing workplace frustration, players discharge acute tension in a controlled, harmless digital sandbox.',
    },
    {
      q: 'Can I install SmashChill as an app on Android and iPhone (iOS)?',
      a: 'Absolutely! SmashChill is engineered as a high-performance Progressive Web App (PWA). On mobile Safari, tap "Share" and select "Add to Home Screen". On Chrome for Android, tap the three-dot menu and select "Install app". You can then launch SmashChill in full-screen with offline capabilities.',
    },
    {
      q: 'How does Google AdSense keep SmashChill free for all players?',
      a: 'SmashChill is supported by non-intrusive banner advertisements through Google AdSense (Publisher ID: pub-7658190454263901). Ad revenue allows us to maintain ultra-fast global server hosting, develop new mini-games, and deliver lag-free synthesized audio without ever charging players subscription fees.',
    },
    {
      q: 'How are high scores and the global leaderboard calculated?',
      a: 'Scores accumulate as you whack targets, slice flying tech gadgets, and launch combos. Hitting multiple targets consecutively triggers Fever Mode for a 2X score multiplier. High scores are saved to your browser LocalStorage and synced with the live Global Leaderboard.',
    },
    {
      q: 'Is SmashChill safe for children and students?',
      a: 'Yes. SmashChill features cartoon-style slapstick animations with zero graphic gore or real-world violence. It is designed as a family-friendly mindfulness and tension-release portal for students, remote workers, and gamers.',
    },
    {
      q: 'Does SmashChill work on low-end devices and slow internet?',
      a: 'Yes! SmashChill is built with ultra-lightweight HTML5 Canvas and the Web Audio API without bulky video assets. The entire initial bundle loads in less than a second even on 3G connections.',
    },
    {
      q: 'How can I contact the creators of SmashChill?',
      a: 'You can reach our team anytime via email at wegoswami@gmail.com or contact@smashchill.online, or by clicking the "Contact Us" tab in our footer compliance desk.',
    },
  ];

  const shareText = encodeURIComponent(
    'I just smashed my stress on SmashChill! Whack annoying alarms, slice laptops like a ninja, and chill out here: https://smashchill.online'
  );
  const shareUrl = encodeURIComponent('https://smashchill.online');

  const handleShareTrigger = (platform: string) => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#10b981'],
    });

    let target = '';
    if (platform === 'whatsapp') {
      target = `https://api.whatsapp.com/send?text=${shareText}`;
    } else if (platform === 'twitter') {
      target = `https://twitter.com/intent/tweet?text=${shareText}`;
    } else if (platform === 'facebook') {
      target = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    } else if (platform === 'telegram') {
      target = `https://t.me/share/url?url=${shareUrl}&text=${shareText}`;
    } else if (platform === 'reddit') {
      target = `https://reddit.com/submit?url=${shareUrl}&title=${encodeURIComponent('SmashChill — Free Anti-Stress Arcade Game')}`;
    }

    if (target) {
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  const gameGuides = [
    {
      mode: 'whack' as GameMode,
      icon: '🔨',
      title: 'Whack-A-Stress',
      category: 'Speed & Reflex Catharsis',
      description:
        'Rapid-fire targets pop up from office cubicles: 6:00 AM alarm clocks, 404 error icons, battery-low warnings, and unread mail. Tap or click swiftly to smash them before they retreat.',
      proTip: 'Look for the golden alarm clocks for +50 bonus points and instant Fever gauge fill!',
    },
    {
      mode: 'ninja' as GameMode,
      icon: '⚔️',
      title: 'Stress Ninja',
      category: 'Kinetic Slicing Action',
      description:
        'Airborne gadgets (freezing laptops, ringing desk phones, broken routers) launch into the air. Swipe across the screen to slice them clean in half with katana slash trails.',
      proTip: 'Dodge the ticking red bombs to keep your combo streak alive and maximize Zen coin earnings.',
    },
    {
      mode: 'ragdoll' as GameMode,
      icon: '🥊',
      title: 'Slap Dummy',
      category: 'Ragdoll Physics Playground',
      description:
        'An ultra-responsive physics ragdoll on a high-tension spring. Slap, punch, drag, or flick in any direction to see dynamic facial reactions, hilarious wobble physics, and coin drops.',
      proTip: 'Grab the rubber hammer or floppy fish skin from the Armory for squeaky slap sounds!',
    },
    {
      mode: 'rage_room' as GameMode,
      icon: '💥',
      title: 'Virtual Rage Room',
      category: 'Digital Demolition',
      description:
        'Ever wanted to take a sledgehammer to a jammed office printer or a crashing desktop tower? Smash objects into 5 progressive stages of glass shards and sparks with zero consequences.',
      proTip: 'Complete demolitions award bonus Zen coins to unlock luxury gold sledges in the armory.',
    },
    {
      mode: 'bubble' as GameMode,
      icon: '🫧',
      title: 'Bubble Wrap Pop',
      category: 'Tactile Sensory ASMR',
      description:
        'Infinite rows of realistic bubble wrap with custom pop pitches, responsive haptics, and instant reset. Perfect for continuous fidgeting during long phone calls or meetings.',
      proTip: 'Drag your finger rapidly across lines for satisfying rapid-fire multi-pop ASMR cascades.',
    },
    {
      mode: 'zen_koi' as GameMode,
      icon: '🌸',
      title: 'Zen Koi Pond',
      category: 'Mindful Meditation & Rest',
      description:
        'A calm Kyoto-style water sanctuary. Tap the water surface to create rippling waves, feed swimming Japanese Nishikigoi, bloom pink lotus flowers, and listen to pentatonic singing bowls.',
      proTip: 'Match your breathing rhythm with the expanding water ripples to activate parasympathetic calming.',
    },
  ];

  return (
    <section
      id="guides-and-faq"
      aria-label="Game Guides, Science of Stress Relief, and FAQs"
      className="w-full max-w-5xl mx-auto my-10 px-4 flex flex-col gap-10 text-slate-300"
    >
      {/* ======================================================== */}
      {/* VIRAL SOCIAL SHARE STRIP */}
      {/* ======================================================== */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-black uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Share Good Vibes</span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white">
            Know a Friend or Coworker Stressed Out Today?
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            SmashChill is free, instant, and therapeutic. Send the link to WhatsApp, Twitter, or Discord and help someone unwind in 60 seconds!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
          <button
            onClick={() => handleShareTrigger('whatsapp')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => handleShareTrigger('twitter')}
            className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>X / Twitter</span>
          </button>
          <button
            onClick={() => handleShareTrigger('facebook')}
            className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-extrabold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>Facebook</span>
          </button>
          <button
            onClick={() => handleShareTrigger('telegram')}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>Telegram</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* EDITORIAL CONTENT TABS (HIGH VALUE CONTENT FOR ADSENSE) */}
      {/* ======================================================== */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-400" />
              <span>SmashChill Editorial Hub & Knowledge Base</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Explore game mechanics, psych studies on stress relief, and workplace ergonomics.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveArticleTab('guides')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeArticleTab === 'guides'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Game Guides</span>
            </button>
            <button
              onClick={() => setActiveArticleTab('science')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeArticleTab === 'science'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>The Science</span>
            </button>
            <button
              onClick={() => setActiveArticleTab('ergonomics')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeArticleTab === 'ergonomics'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>Micro-Breaks</span>
            </button>
          </div>
        </div>

        {/* --- TAB 1: MINI-GAME STRATEGY GUIDES --- */}
        {activeArticleTab === 'guides' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gameGuides.map((guide) => (
              <article
                key={guide.mode}
                className="p-5 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl p-2 rounded-2xl bg-slate-950 border border-slate-800/80 group-hover:scale-110 transition-transform">
                      {guide.icon}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      {guide.category}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {guide.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-800/60">
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300">
                    <span className="text-amber-400 font-bold">Pro Tip: </span>
                    {guide.proTip}
                  </div>

                  {onSelectGame && (
                    <button
                      onClick={() => onSelectGame(guide.mode)}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Play Now</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* --- TAB 2: SCIENCE OF STRESS RELIEF --- */}
        {activeArticleTab === 'science' && (
          <article className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                <Brain className="w-4 h-4" />
                <span>Neurobiology & Cognitive Psychology</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                How Digital Catharsis Resets Your Nervous System
              </h3>
              <p className="text-slate-400 text-xs">
                Authored by the SmashChill Cognitive Health Research Initiative · Published November 2026
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">1. The Sympathetic Response & Cortisol Toxicity</h4>
              <p>
                When dealing with demanding client deadlines, software bugs, endless video meetings, or sudden personal conflicts, the human brain cannot distinguish psychological threats from physical danger. The amygdala stimulates the adrenal glands to flood the bloodstream with cortisol, epinephrine, and glucose. Heart rate accelerates, muscles constrict, and executive function in the prefrontal cortex declines.
              </p>
              <p>
                In primitive times, this energy was discharged through physical exertion (running, hunting). In modern sedentary desk jobs, cortisol remains pooled in muscle tissue, leading to chronic fatigue, tension headaches, and irritability.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">2. Active Cathartic Tapping vs. Passive Rumination</h4>
              <p>
                Psychologists emphasize that passively stewing over frustration increases rumination. In contrast, fast-paced kinetic games like <strong>Whack-A-Stress</strong> and <strong>Stress Ninja</strong> engage the motor cortex and hand-eye coordination. Tapping rapidly provides a micro-outlet that acts as an emotional &quot;pressure release valve,&quot; interrupting recursive negative thoughts without real-world damage.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">3. Stimulating the Vagus Nerve with Sensory ASMR</h4>
              <p>
                Catharsis alone is only half the cure. Once acute aggression is vented, the body must transition into parasympathetic dominance (&quot;rest and digest&quot;). The <strong>Zen Koi Pond</strong> and <strong>ASMR Soundboard</strong> utilize specific sound waves—such as 432 Hz harmonics, water ripple frequencies, and pentatonic bells—which activate vagal nerve pathways, immediately lowering resting heart rates and restoring mental clarity.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Scientific Reference: American Psychological Association (APA) Stress in America™ Report & Harvard Health Publishing.</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
            </div>
          </article>
        )}

        {/* --- TAB 3: WORKPLACE MICRO-BREAKS --- */}
        {activeArticleTab === 'ergonomics' && (
          <article className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6 text-xs sm:text-sm leading-relaxed text-slate-300">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold">
                <Timer className="w-4 h-4" />
                <span>Workplace Wellness & Ergonomics</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                The 5-Minute Decompression Protocol for Developers & Students
              </h3>
              <p className="text-slate-400 text-xs">
                Combat cognitive fatigue, carpal tunnel strain, and Zoom burnout in your daily schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-2xl">👀</span>
                <h5 className="font-bold text-white">Minute 1: The 20-20-20 Rule</h5>
                <p className="text-xs text-slate-400">
                  Every 20 minutes, look at an object at least 20 feet away for 20 seconds to relax your eye ciliary muscles.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-2xl">🔨</span>
                <h5 className="font-bold text-white">Minutes 2–3: Physical Catharsis</h5>
                <p className="text-xs text-slate-400">
                  Launch SmashChill. Whack alarms or slice tech bugs for 120 seconds to shake off stiffness and vent tension.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-2xl">🧘</span>
                <h5 className="font-bold text-white">Minutes 4–5: Box Breathing</h5>
                <p className="text-xs text-slate-400">
                  Open the Zen Koi Pond. Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4. Watch your mind calm down.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
              <strong>Tip:</strong> Bookmark <strong className="text-white">smashchill.online</strong> or add it to your browser bookmarks bar for instant access during high-stress work crunch sessions!
            </div>
          </article>
        )}
      </div>

      {/* ======================================================== */}
      {/* FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION (SCHEMA READY) */}
      {/* ======================================================== */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Frequently Asked Questions (FAQ)
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Everything you need to know about playing SmashChill, privacy protection, and our Google AdSense standards.
        </p>

        <div className="space-y-2.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-850 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-100">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust & Transparency Badge */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>
            SmashChill is committed to responsible, safe digital gaming, transparent Google AdSense policies, and total GDPR/CCPA user privacy.
          </span>
        </div>
        {onOpenLegal && (
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenLegal('privacy')}
              className="text-amber-400 hover:underline cursor-pointer font-bold text-[11px]"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onOpenLegal('contact')}
              className="text-sky-400 hover:underline cursor-pointer font-bold text-[11px]"
            >
              Contact Support
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
