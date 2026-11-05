import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header, GameMode } from './components/Header';
import { WhackAStress } from './components/WhackAStress';
import type { WeaponSkin } from './components/ArmoryModal';
import type { LegalModalType } from './components/LegalModals';
import { ZenPetMascot } from './components/ZenPetMascot';
import { AsmrSoundboard } from './components/AsmrSoundboard';
import { CursorSparkles } from './components/CursorSparkles';
import { FeverBar } from './components/FeverBar';
import { AdBanner } from './components/AdBanner';
import { SeoContentSection } from './components/SeoContentSection';
import { CookieBanner } from './components/CookieBanner';
import { sound } from './utils/audio';

// Dynamic lazy imports for non-initial games to cut 400+ KiB from initial JS bundle
const HydraulicPress = lazy(() => import('./components/HydraulicPress').then(m => ({ default: m.HydraulicPress })));
const PopItFidget = lazy(() => import('./components/PopItFidget').then(m => ({ default: m.PopItFidget })));
const StressNinja = lazy(() => import('./components/StressNinja').then(m => ({ default: m.StressNinja })));
const SoapCarver = lazy(() => import('./components/SoapCarver').then(m => ({ default: m.SoapCarver })));
const SlapDummy = lazy(() => import('./components/SlapDummy').then(m => ({ default: m.SlapDummy })));
const RageRoom = lazy(() => import('./components/RageRoom').then(m => ({ default: m.RageRoom })));
const BubblePop = lazy(() => import('./components/BubblePop').then(m => ({ default: m.BubblePop })));
const ZenPond = lazy(() => import('./components/ZenPond').then(m => ({ default: m.ZenPond })));
const RantShredder = lazy(() => import('./components/RantShredder').then(m => ({ default: m.RantShredder })));
const SmashDuelPvp = lazy(() => import('./components/SmashDuelPvp').then(m => ({ default: m.SmashDuelPvp })));
const KineticSand = lazy(() => import('./components/KineticSand').then(m => ({ default: m.KineticSand })));
const NewtonCradle = lazy(() => import('./components/NewtonCradle').then(m => ({ default: m.NewtonCradle })));

// Dynamic lazy imports for modals (only loaded when clicked)
const LuckyWheelModal = lazy(() => import('./components/LuckyWheelModal').then(m => ({ default: m.LuckyWheelModal })));
const StatsModal = lazy(() => import('./components/StatsModal').then(m => ({ default: m.StatsModal })));
const LeaderboardModal = lazy(() => import('./components/LeaderboardModal').then(m => ({ default: m.LeaderboardModal })));
const RewardedAdModal = lazy(() => import('./components/RewardedAdModal').then(m => ({ default: m.RewardedAdModal })));
const ArmoryModal = lazy(() => import('./components/ArmoryModal').then(m => ({ default: m.ArmoryModal })));
const DailyQuestsModal = lazy(() => import('./components/DailyQuestsModal').then(m => ({ default: m.DailyQuestsModal })));
const LegalModals = lazy(() => import('./components/LegalModals').then(m => ({ default: m.LegalModals })));

const GameLoadingSkeleton: React.FC = () => (
  <div
    className="w-full max-w-4xl h-[420px] rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center p-6 gap-3 animate-pulse select-none"
    role="status"
    aria-label="Loading SmashChill Arcade Game"
  >
    <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center text-2xl shadow-inner">
      ⚡
    </div>
    <span className="text-xs font-mono font-bold text-slate-400">Loading SmashChill Arcade Game...</span>
  </div>
);

const DEFAULT_WEAPONS: WeaponSkin[] = [
  {
    id: 'iron_hammer',
    name: 'Iron Sledgehammer',
    icon: '🔨',
    type: 'hammer',
    description: 'Classic heavy forged iron mallet.',
    price: 0,
    unlocked: true,
    effect: 'Standard blunt force',
  },
  {
    id: 'thunder_mjolnir',
    name: "Thor's Mjolnir",
    icon: '⚡',
    type: 'hammer',
    description: 'Electrified divine lightning mallet.',
    price: 800,
    unlocked: false,
    effect: '+50% Lightning sparks',
  },
  {
    id: 'golden_sledge',
    name: 'Golden Sledge',
    icon: '🌟',
    type: 'hammer',
    description: 'Pure 24K gold luxury hammer.',
    price: 1500,
    unlocked: false,
    effect: '+20% Extra coin drops',
  },
  {
    id: 'laser_blade',
    name: 'Plasma Lightsaber',
    icon: '🪐',
    type: 'blade',
    description: 'Sci-fi energy beam sword.',
    price: 1200,
    unlocked: false,
    effect: 'Smooth cosmic slash trails',
  },
  {
    id: 'fish_slapper',
    name: 'Rubber Tuna Fish',
    icon: '🐟',
    type: 'hammer',
    description: 'Floppy fish for hilarious slaps.',
    price: 500,
    unlocked: false,
    effect: 'Squeaky cartoon boing sound',
  },
];

export default function App() {
  const [activeMode, setActiveMode] = useState<GameMode>('whack');
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(sound.getBgmPlaying());
  const [isStatsOpen, setIsStatsOpen] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isRewardedAdOpen, setIsRewardedAdOpen] = useState<boolean>(false);
  const [isArmoryOpen, setIsArmoryOpen] = useState<boolean>(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState<boolean>(false);
  const [isWheelOpen, setIsWheelOpen] = useState<boolean>(false);
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [feverCharge, setFeverCharge] = useState<number>(35);
  const [isFeverActive, setIsFeverActive] = useState<boolean>(false);

  const feverTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const boostFever = (amount = 12) => {
    setFeverCharge((prev) => Math.min(100, prev + amount));
  };

  const activateFever = () => {
    setIsFeverActive(true);
    if (feverTimerRef.current) clearTimeout(feverTimerRef.current);
    feverTimerRef.current = setTimeout(() => {
      setIsFeverActive(false);
      setFeverCharge(0);
    }, 10000);
  };

  useEffect(() => {
    return () => {
      if (feverTimerRef.current) clearTimeout(feverTimerRef.current);
    };
  }, []);

  // Pro Coin Wallet System
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('smashchill_coins');
    return saved ? parseInt(saved, 10) : 450;
  });

  const [weapons, setWeapons] = useState<WeaponSkin[]>(() => {
    const saved = localStorage.getItem('smashchill_weapons');
    return saved ? JSON.parse(saved) : DEFAULT_WEAPONS;
  });

  const [equippedHammer, setEquippedHammer] = useState<string>(() => {
    return localStorage.getItem('smashchill_equipped_hammer') || 'iron_hammer';
  });

  // Save coins & armory
  useEffect(() => {
    localStorage.setItem('smashchill_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('smashchill_weapons', JSON.stringify(weapons));
  }, [weapons]);

  useEffect(() => {
    localStorage.setItem('smashchill_equipped_hammer', equippedHammer);
  }, [equippedHammer]);

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
    setCoins((c) => c + 500);
    setSessionStats((prev) => ({
      ...prev,
      itemsSmashed: prev.itemsSmashed + 20,
    }));
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Google RankBrain Dwell-Time & Engagement Booster
  useEffect(() => {
    const defaultTitle = 'SmashChill — Smash Stress & Find Calm | Free Online Arcade';
    const awayTitle = '⚡ Come back & smash stress! — SmashChill';

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = awayTitle;
      } else {
        document.title = defaultTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const [gameFilter, setGameFilter] = useState<'all' | 'smash' | 'chill'>('all');

  const games: {
    id: GameMode;
    title: string;
    subtitle: string;
    icon: string;
    bg: string;
    category: 'smash' | 'chill';
    badge?: string;
  }[] = [
    {
      id: 'whack',
      title: 'Whack-A-Stress',
      subtitle: 'Hammer alarms & toxic emails!',
      icon: '🔨',
      bg: 'from-amber-500/20 to-rose-500/20 border-amber-500/50',
      category: 'smash',
    },
    {
      id: 'pvp',
      title: '1v1 Smash Duel',
      subtitle: 'Play with friends or online!',
      icon: '⚔️',
      bg: 'from-rose-600/30 via-purple-600/20 to-sky-600/30 border-rose-500/60',
      category: 'smash',
      badge: 'MULTIPLAYER',
    },
    {
      id: 'press',
      title: 'Hydraulic Press',
      subtitle: 'Squash alarms & cans at 10,000 PSI!',
      icon: '🚜',
      bg: 'from-red-500/20 to-amber-500/20 border-red-500/50',
      category: 'smash',
      badge: 'VIRAL',
    },
    {
      id: 'popit',
      title: 'Pop-It 3D Fidget',
      subtitle: 'Rainbow silicone bubbles with flip board!',
      icon: '🌈',
      bg: 'from-pink-500/20 to-purple-500/20 border-pink-500/50',
      category: 'chill',
      badge: 'TRENDING',
    },
    {
      id: 'sand',
      title: 'Kinetic Sand ASMR',
      subtitle: 'Slice crunchy rainbow layered sand!',
      icon: '🏖️',
      bg: 'from-teal-500/20 to-emerald-500/20 border-teal-500/50',
      category: 'chill',
      badge: 'NEW',
    },
    {
      id: 'newton',
      title: "Newton's Cradle",
      subtitle: 'Chrome sphere momentum collisions!',
      icon: '⚖️',
      bg: 'from-indigo-500/20 to-slate-500/20 border-indigo-500/50',
      category: 'chill',
      badge: 'PHYSICS',
    },
    {
      id: 'ninja',
      title: 'Stress Ninja',
      subtitle: 'Swipe & slice flying laptops!',
      icon: '🥷',
      bg: 'from-sky-500/20 to-indigo-500/20 border-sky-500/50',
      category: 'smash',
    },
    {
      id: 'soap',
      title: 'Soap Slicer ASMR',
      subtitle: 'Slice crisp textured kinetic cubes!',
      icon: '🧼',
      bg: 'from-teal-500/20 to-emerald-500/20 border-teal-500/50',
      category: 'chill',
      badge: 'ASMR',
    },
    {
      id: 'slap',
      title: 'Slap Dummy',
      subtitle: 'Wobble ragdoll & open slap!',
      icon: '🥊',
      bg: 'from-rose-500/20 to-pink-500/20 border-rose-500/50',
      category: 'smash',
    },
    {
      id: 'smash',
      title: 'Smash Room',
      subtitle: 'Sledgehammer PC destruction!',
      icon: '💥',
      bg: 'from-purple-500/20 to-red-500/20 border-purple-500/50',
      category: 'smash',
    },
    {
      id: 'bubble',
      title: 'Bubble Pop',
      subtitle: 'Endless sensory popping!',
      icon: '🫧',
      bg: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/50',
      category: 'chill',
    },
    {
      id: 'zen',
      title: 'Koi Zen Pond',
      subtitle: 'Feed fish & bloom lotus buds!',
      icon: '🌸',
      bg: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/50',
      category: 'chill',
    },
    {
      id: 'shredder',
      title: 'Rant Shredder',
      subtitle: 'Vent thoughts, shred & rocket launch!',
      icon: '📄',
      bg: 'from-orange-500/20 to-red-500/20 border-orange-500/50',
      category: 'smash',
      badge: 'THERAPY',
    },
  ];

  const visibleGames =
    gameFilter === 'all' ? games : games.filter((g) => g.category === gameFilter);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Interactive Cursor Particle Sparks */}
      <CursorSparkles activeMode={activeMode} />

      {/* Pro Arcade Header */}
      <Header
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isBgmPlaying={isBgmPlaying}
        onToggleBgm={handleToggleBgm}
        coins={coins}
        onOpenArmory={() => setIsArmoryOpen(true)}
        onOpenQuests={() => setIsQuestsOpen(true)}
        onOpenWheel={() => setIsWheelOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        onOpenLegal={(tab) => setLegalModal(tab)}
      />

      {/* Main Arcade Experience */}
      <main className="flex-1 flex flex-col items-center justify-start py-4 px-3 sm:px-6">
        {/* Pro Fever / Overdrive Bar */}
        <FeverBar
          feverCharge={feverCharge}
          isFeverActive={isFeverActive}
          onActivateFever={activateFever}
        />

        {/* Category Filter Navigation */}
        <div className="w-full max-w-4xl flex items-center justify-between gap-2 mb-3 px-1">
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 text-xs font-bold" role="group" aria-label="Game category filter">
            <button
              onClick={() => {
                setGameFilter('all');
                sound.playBonk();
              }}
              aria-label={`Show all ${games.length} anti-stress games`}
              aria-pressed={gameFilter === 'all'}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                gameFilter === 'all'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🎮 All ({games.length})
            </button>
            <button
              onClick={() => {
                setGameFilter('smash');
                sound.playBonk();
              }}
              aria-label={`Filter ${games.filter((g) => g.category === 'smash').length} smash action games`}
              aria-pressed={gameFilter === 'smash'}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                gameFilter === 'smash'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              💥 Smash ({games.filter((g) => g.category === 'smash').length})
            </button>
            <button
              onClick={() => {
                setGameFilter('chill');
                sound.playBonk();
              }}
              aria-label={`Filter ${games.filter((g) => g.category === 'chill').length} soothing chill games`}
              aria-pressed={gameFilter === 'chill'}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                gameFilter === 'chill'
                  ? 'bg-teal-500 text-slate-950 font-black shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌸 Chill ({games.filter((g) => g.category === 'chill').length})
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-slate-400">
            <span>Instant Play</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-amber-400">100% Free</span>
          </div>
        </div>

        {/* Game Selection Cards Strip - Responsive across Mobile, Tablet, Laptop & Desktop */}
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-5" role="region" aria-label="Arcade games selector">
          {visibleGames.map((g) => {
            const isCurrent = activeMode === g.id;
            return (
              <button
                key={g.id}
                onClick={() => {
                  setActiveMode(g.id);
                  sound.playBonk();
                }}
                aria-label={`Play ${g.title} (${g.subtitle})`}
                aria-current={isCurrent ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                  isCurrent
                    ? `bg-gradient-to-b ${g.bg} scale-102 shadow-xl border-white text-white`
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:scale-101'
                }`}
              >
                {/* Badge if present */}
                {g.badge && (
                  <span className="absolute -top-1.5 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-sm ring-2 ring-slate-950">
                    {g.badge}
                  </span>
                )}
                <span className="text-3xl filter drop-shadow">{g.icon}</span>
                <span className="text-xs font-black mt-1 text-center truncate w-full">
                  {g.title}
                </span>
                <span className="text-[10px] text-slate-400 text-center truncate w-full mt-0.5 opacity-80">
                  {g.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Game Stage with Suspense code splitting */}
        <div className="w-full flex justify-center min-h-[420px]">
          <Suspense fallback={<GameLoadingSkeleton />}>
            {activeMode === 'whack' && (
              <WhackAStress onWatchAd={() => setIsRewardedAdOpen(true)} />
            )}

            {activeMode === 'pvp' && (
              <SmashDuelPvp
                onDuelWin={(reward) => {
                  boostFever(35);
                  setCoins((c) => c + reward);
                  setSessionStats((s) => ({ ...s, itemsSmashed: s.itemsSmashed + 15 }));
                }}
              />
            )}

            {activeMode === 'sand' && (
              <KineticSand
                onSandSliced={() => {
                  boostFever(3);
                  setCoins((c) => c + 2);
                }}
              />
            )}

            {activeMode === 'newton' && (
              <NewtonCradle
                onBallHit={() => {
                  boostFever(1);
                  setCoins((c) => c + 1);
                }}
              />
            )}

            {activeMode === 'press' && (
              <HydraulicPress
                onItemCrushed={() => {
                  boostFever(22);
                  setCoins((c) => c + 30);
                  setSessionStats((s) => ({ ...s, itemsSmashed: s.itemsSmashed + 1 }));
                }}
                onWatchAd={() => setIsRewardedAdOpen(true)}
              />
            )}

            {activeMode === 'popit' && (
              <PopItFidget
                onPop={() => {
                  boostFever(2);
                  setCoins((c) => c + 1);
                  setSessionStats((s) => ({ ...s, bubblesPopped: s.bubblesPopped + 1 }));
                }}
              />
            )}

            {activeMode === 'ninja' && (
              <StressNinja onWatchAd={() => setIsRewardedAdOpen(true)} />
            )}

            {activeMode === 'soap' && (
              <SoapCarver
                lang="hi"
                onCubeCut={() => {
                  boostFever(3);
                  setCoins((c) => c + 2);
                }}
              />
            )}

            {activeMode === 'slap' && (
              <SlapDummy
                onSlapHit={() => {
                  boostFever(8);
                  setCoins((c) => c + 5);
                }}
              />
            )}

            {activeMode === 'smash' && (
              <RageRoom
                lang="hi"
                onItemSmashed={() => {
                  boostFever(25);
                  setCoins((c) => c + 25);
                  setSessionStats((s) => ({ ...s, itemsSmashed: s.itemsSmashed + 1 }));
                }}
              />
            )}

            {activeMode === 'bubble' && (
              <BubblePop
                lang="hi"
                onBubblePopped={() => {
                  boostFever(2);
                  setCoins((c) => c + 1);
                  setSessionStats((s) => ({ ...s, bubblesPopped: s.bubblesPopped + 1 }));
                }}
              />
            )}

            {activeMode === 'zen' && <ZenPond />}

            {activeMode === 'shredder' && (
              <RantShredder
                lang="hi"
                onRantDestroyed={() => {
                  boostFever(30);
                  setCoins((c) => c + 50);
                  setSessionStats((s) => ({ ...s, rantsDestroyed: s.rantsDestroyed + 1 }));
                }}
              />
            )}
          </Suspense>
        </div>

        {/* Pro Instant ASMR Soundboard */}
        <AsmrSoundboard />

        {/* Responsive In-Feed / Leaderboard Ad Banner */}
        <AdBanner
          format="leaderboard"
          onRewardClick={() => setIsRewardedAdOpen(true)}
          className="mt-4"
        />

        {/* On-Page SEO Content, Viral Share & Google FAQ Section */}
        <SeoContentSection
          onSelectGame={(mode) => {
            setActiveMode(mode);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenLegal={(tab) => setLegalModal(tab)}
        />
      </main>

      {/* Bottom Arcade Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 px-6 py-5 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="font-extrabold text-slate-200">⚡ SMASHCHILL ARCADE</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Free Anti-Stress Decompression Platform</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-emerald-400 font-medium">Domain: smashchill.online</span>
          </div>

          {/* Quick links & Legal compliance pages */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-slate-400 font-medium text-[11px]">
            <a
              href="#guides-and-faq"
              className="text-amber-400 hover:text-amber-300 hover:underline cursor-pointer transition-colors"
            >
              Wellness Blog
            </a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <a
              href="#guides-and-faq"
              className="text-slate-300 hover:text-amber-300 hover:underline cursor-pointer transition-colors"
            >
              Game Guides & FAQ
            </a>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => setIsArmoryOpen(true)}
              className="text-slate-300 hover:text-amber-300 hover:underline cursor-pointer transition-colors"
            >
              Armory
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-amber-400 hover:underline cursor-pointer transition-colors"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-amber-400 hover:underline cursor-pointer transition-colors"
            >
              Terms
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => setLegalModal('about')}
              className="hover:text-amber-400 hover:underline cursor-pointer transition-colors"
            >
              About
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => setLegalModal('contact')}
              className="hover:text-amber-400 hover:underline cursor-pointer transition-colors"
            >
              Contact
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => setLegalModal('disclaimer')}
              className="hover:text-amber-400 hover:underline cursor-pointer transition-colors"
            >
              Disclaimer
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => setLegalModal('dmca')}
              className="hover:text-amber-400 hover:underline cursor-pointer transition-colors"
            >
              DMCA
            </button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-3 pt-3 border-t border-slate-900/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>&copy; {new Date().getFullYear()} SmashChill Arcade. All rights reserved. Therapeutic stress-relief digital games.</span>
          <div className="flex items-center gap-3">
            <span className="text-slate-400">SmashChill Interactive Studio</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => setLegalModal('contact')}
              className="text-amber-400/90 hover:underline cursor-pointer"
            >
              Contact Support
            </button>
          </div>
        </div>
      </footer>

      {/* Lazy Loaded Interactive Modals wrapped in Suspense */}
      <Suspense fallback={null}>
        {/* Armory Modal */}
        <ArmoryModal
          isOpen={isArmoryOpen}
          onClose={() => setIsArmoryOpen(false)}
          coins={coins}
          setCoins={setCoins}
          equippedHammer={equippedHammer}
          setEquippedHammer={setEquippedHammer}
          weapons={weapons}
          setWeapons={setWeapons}
        />

        {/* Daily Quests Modal */}
        <DailyQuestsModal
          isOpen={isQuestsOpen}
          onClose={() => setIsQuestsOpen(false)}
          coins={coins}
          setCoins={setCoins}
          sessionStats={sessionStats}
        />

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

        {/* Lucky Zen Spin Wheel Modal */}
        <LuckyWheelModal
          isOpen={isWheelOpen}
          onClose={() => setIsWheelOpen(false)}
          coins={coins}
          setCoins={setCoins}
          onActivateFeverBonus={activateFever}
        />

        {/* Legal Modals (Privacy, Terms, About, Contact, Disclaimer, DMCA) */}
        <LegalModals
          activeModal={legalModal}
          onClose={() => setLegalModal(null)}
          onSwitchTab={(tab) => setLegalModal(tab)}
        />
      </Suspense>

      {/* Cookie Consent Banner */}
      <CookieBanner onOpenPrivacy={() => setLegalModal('privacy')} />

      {/* Interactive Desk Companion Mascot */}
      <ZenPetMascot
        totalSmashed={sessionStats.itemsSmashed + sessionStats.rantsDestroyed + sessionStats.bubblesPopped}
      />
    </div>
  );
}
