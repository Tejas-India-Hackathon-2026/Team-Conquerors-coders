import React from 'react';
import { Sparkles, MapPin, Users, BarChart3, Crown, ShieldAlert, Scale, SlidersHorizontal, Star } from 'lucide-react';

export default function Navbar({ 
  onOpenCsc, 
  onOpenTeam, 
  onOpenAnalytics, 
  onOpenPricing, 
  onOpenDirectory, 
  onOpenCompare,
  onOpenHelpline,
  onOpenWizard,
  onOpenSaved,
  savedCount = 0,
  activeTab, 
  setActiveTab,
  isPremium,
  isTrialActive
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('matcher')}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-blue-600 to-emerald-600 p-[2px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl sm:text-2xl">🎙️</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight bg-gradient-to-r from-orange-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
                  योजना साथी
                </span>
                {isPremium ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow">
                    <Crown className="w-3 h-3" /> PRO {isTrialActive ? '(TRIAL)' : ''}
                  </span>
                ) : (
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/30 rounded-full">
                    Voice-First AI
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                Bihar & Central Scheme Assistant
              </p>
            </div>
          </div>

          {/* Navigation Links / Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
            
            {/* 5-Step Finder Wizard */}
            <button
              onClick={onOpenWizard}
              className="px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">स्मार्ट खोजक</span>
            </button>

            {/* Compare Tool */}
            <button
              onClick={onOpenCompare}
              className="px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1.5"
            >
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">योजना तुलना</span>
            </button>

            {/* Saved / Bookmarked Schemes */}
            <button
              onClick={onOpenSaved}
              className="px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1.5"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="hidden sm:inline">सेव्ड ({savedCount})</span>
            </button>

            {/* Helpline & Grievance */}
            <button
              onClick={onOpenHelpline}
              className="px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-500/30 transition-all flex items-center gap-1.5"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden lg:inline">हेल्पलाइन</span>
            </button>

            {/* Pricing / Premium Upgrade */}
            <button
              onClick={onOpenPricing}
              className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 shadow-md ${
                isPremium
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-amber-500/20 hover:scale-105'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>{isPremium ? 'PRO' : 'प्रीमियम'}</span>
            </button>

            {/* All Schemes Directory */}
            <button
              onClick={() => setActiveTab(activeTab === 'directory' ? 'matcher' : 'directory')}
              className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'directory'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{activeTab === 'directory' ? 'होम' : 'सभी 40+ योजनाएं'}</span>
            </button>

            {/* Team / Pitch */}
            <button
              onClick={onOpenTeam}
              className="px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-500/10 to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20 text-orange-300 border border-orange-500/30 transition-all flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">टीम</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
