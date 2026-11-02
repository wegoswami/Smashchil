import React from 'react';
import { X, Shield, FileText, Info, Mail, CheckCircle2 } from 'lucide-react';

export type LegalModalType = 'privacy' | 'terms' | 'about' | 'contact' | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl p-6 md:p-8 rounded-3xl bg-slate-900 border-2 border-slate-700 shadow-2xl flex flex-col gap-4 text-slate-200 max-h-[85vh] overflow-y-auto no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* --- PRIVACY POLICY --- */}
        {activeModal === 'privacy' && (
          <div className="space-y-4 text-xs leading-relaxed">
            <div className="flex items-center gap-2 text-rose-400 font-black text-lg border-b border-slate-800 pb-3">
              <Shield className="w-5 h-5" />
              <span>Privacy Policy — SmashChill</span>
            </div>

            <p className="text-slate-400">
              Last updated: November 2026. At SmashChill (accessible from https://smashchill.online), your privacy is of paramount importance to us. This Privacy Policy document outlines the types of information collected and how it is used.
            </p>

            <h4 className="text-sm font-bold text-white">1. Google AdSense & Third-Party Advertising</h4>
            <p className="text-slate-400">
              Google is one of our third-party vendors. It uses cookies, including DoubleClick DART cookies, to serve ads to our site visitors based on their visit to smashchill.online and other sites on the internet. Users may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy at{' '}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 underline"
              >
                https://policies.google.com/technologies/ads
              </a>.
            </p>

            <h4 className="text-sm font-bold text-white">2. Google Analytics (GA4)</h4>
            <p className="text-slate-400">
              We use Google Analytics (Tag ID: G-M32KPTKR7C) to collect anonymous website traffic metrics such as browser type, time on page, and general country location. No personally identifiable information (PII) is sold, stored, or distributed.
            </p>

            <h4 className="text-sm font-bold text-white">3. Local Storage</h4>
            <p className="text-slate-400">
              We store your high score, game preferences, unlocked weapons, and Zen Coins locally on your device via HTML5 LocalStorage. This data never leaves your personal browser.
            </p>

            <h4 className="text-sm font-bold text-white">4. GDPR & CCPA Compliance</h4>
            <p className="text-slate-400">
              Under GDPR and CCPA regulations, visitors have the right to request deletion of any telemetry data. You can clear your game scores anytime by resetting your browser cookies and storage.
            </p>

            <div className="pt-2 text-[11px] text-slate-500">
              If you have any questions regarding this policy, contact us at: support@smashchill.online
            </div>
          </div>
        )}

        {/* --- TERMS OF SERVICE --- */}
        {activeModal === 'terms' && (
          <div className="space-y-4 text-xs leading-relaxed">
            <div className="flex items-center gap-2 text-amber-400 font-black text-lg border-b border-slate-800 pb-3">
              <FileText className="w-5 h-5" />
              <span>Terms of Service — SmashChill</span>
            </div>

            <p className="text-slate-400">
              Welcome to SmashChill! By accessing or playing the games on smashchill.online, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h4 className="text-sm font-bold text-white">1. Free Entertainment Use</h4>
            <p className="text-slate-400">
              SmashChill is provided free of charge for casual stress-relief, relaxation, and entertainment purposes. You agree not to attempt to reverse engineer, scrape, or exploit the platform.
            </p>

            <h4 className="text-sm font-bold text-white">2. Intellectual Property</h4>
            <p className="text-slate-400">
              All game code, synthesized audio engines, logos, and UI designs are the intellectual property of SmashChill Arcade. Unauthorized commercial reproduction is prohibited.
            </p>

            <h4 className="text-sm font-bold text-white">3. Disclaimer</h4>
            <p className="text-slate-400">
              SmashChill is an interactive browser game intended for casual relaxation and is not a clinical substitute for medical or psychological therapy.
            </p>
          </div>
        )}

        {/* --- ABOUT US --- */}
        {activeModal === 'about' && (
          <div className="space-y-4 text-xs leading-relaxed">
            <div className="flex items-center gap-2 text-emerald-400 font-black text-lg border-b border-slate-800 pb-3">
              <Info className="w-5 h-5" />
              <span>About SmashChill Arcade</span>
            </div>

            <p className="text-slate-300">
              <strong>SmashChill</strong> was built with a simple, powerful mission: to give everyday people worldwide an instant, zero-consequence outlet to vent workplace burnout, daily frustration, and anxiety, followed by deep serene calming.
            </p>

            <div className="grid grid-cols-2 gap-3 my-2">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-base">🔨</span>
                <div className="font-bold text-white mt-1">Active Catharsis</div>
                <div className="text-[11px] text-slate-400">
                  Safely release physical frustration through rapid tapping and impact physics.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-base">🌸</span>
                <div className="font-bold text-white mt-1">Mindful Serenity</div>
                <div className="text-[11px] text-slate-400">
                  Restore autonomic equilibrium with soothing koi water ponds and pentatonic chimes.
                </div>
              </div>
            </div>

            <p className="text-slate-400">
              Our games are 100% web-native, lightweight, and engineered using the modern Web Audio API for latency-free auditory bliss on any device.
            </p>
          </div>
        )}

        {/* --- CONTACT US --- */}
        {activeModal === 'contact' && (
          <div className="space-y-4 text-xs leading-relaxed">
            <div className="flex items-center gap-2 text-sky-400 font-black text-lg border-b border-slate-800 pb-3">
              <Mail className="w-5 h-5" />
              <span>Contact Us / Feedback</span>
            </div>

            <p className="text-slate-400">
              Have feedback, game feature suggestions, or business advertising inquiries? We would love to hear from you!
            </p>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Official Support Email</label>
                <div className="text-sm font-mono text-amber-400 select-all">
                  contact@smashchill.online
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Developer Inquiries</label>
                <div className="text-xs text-slate-300">
                  SmashChill Global Arcade Team · Fast 24h response time.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>We actively review player feedback to build new stress-relief mini-games!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
