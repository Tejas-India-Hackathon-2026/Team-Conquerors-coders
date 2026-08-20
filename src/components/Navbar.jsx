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
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group"
            onClick={() => setActiveTab('matcher')}
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-400 to-emerald-500 p-[2px] shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl sm:text-2xl">🎙️</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                  योजना <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">साथी</span>
                </span>
                {isPremium ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-md shadow-orange-500/20">
                    <Crown className="w-3 h-3" /> PRO {isTrialActive ? '(TRIAL)' : ''}
                  </span>
                ) : (
                  <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/30 rounded-full">
                    Voice AI
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                Bihar & Central Govt Scheme Assistant
              </p>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-end">
            
            {/* 5-Step Finder Wizard */}
            <button
              onClick={onOpenWizard}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/30 transition-all flex items-center gap-1.5 shadow-sm hover:border-amber-400 hover:scale-105"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">स्मार्ट खोजक</span>
            </button>

            {/* Compare Tool */}
            <button
              onClick={onOpenCompare}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-1.5 shadow-sm hover:border-cyan-400 hover:scale-105"
            >
              <Scale className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">योजना तुलना</span>
            </button>

            {/* Saved Schemes */}
            <button
              onClick={onOpenSaved}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5 shadow-sm hover:border-amber-400"
            >
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="hidden sm:inline">सेव्ड ({savedCount})</span>
            </button>

            {/* Grievance & Helpline */}
            <button
              onClick={onOpenHelpline}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900/90 hover:bg-slate-800 text-rose-300 border border-rose-500/30 transition-all flex items-center gap-1.5 shadow-sm hover:border-rose-400"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden lg:inline">हेल्पलाइन</span>
            </button>

            {/* Pricing / Premium Upgrade */}
            <button
              onClick={onOpenPricing}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 shadow-md ${
                isPremium
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/25 hover:scale-105'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>{isPremium ? 'PRO' : 'प्रीमियम'}</span>
            </button>

            {/* All Schemes Directory */}
            <button
              onClick={() => setActiveTab(activeTab === 'directory' ? 'matcher' : 'directory')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                activeTab === 'directory'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/25'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{activeTab === 'directory' ? 'होम' : 'सभी 40+ योजनाएं'}</span>
            </button>

            {/* Team / Pitch */}
            <button
              onClick={onOpenTeam}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900/90 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 transition-all flex items-center gap-1.5 shadow-sm hover:border-emerald-400"
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">टीम</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
