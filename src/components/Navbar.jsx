import React from 'react';
import { Sparkles, MapPin, Users, BarChart3, Crown, ShieldAlert, Scale, SlidersHorizontal, Star, Sun, Moon } from 'lucide-react';

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
  isTrialActive,
  isDarkMode = false,
  onToggleTheme
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('matcher')}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-blue-600 to-emerald-600 p-[2px] shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <span className="text-xl sm:text-2xl">🎙️</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-2xl tracking-tight text-slate-900">
                  योजना <span className="text-orange-600">साथी</span>
                </span>
                {isPremium ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-sm">
                    <Crown className="w-3 h-3" /> PRO {isTrialActive ? '(TRIAL)' : ''}
                  </span>
                ) : (
                  <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 border border-orange-200 rounded-full">
                    Voice AI
                  </span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                बिहार एवं केंद्र सरकार योजना पोर्टल
              </p>
            </div>
          </div>

          {/* Navigation Links / Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-end">
            
            {/* 5-Step Finder Wizard */}
            <button
              onClick={onOpenWizard}
              className="px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden md:inline">स्मार्ट खोजक</span>
            </button>

            {/* Compare Tool */}
            <button
              onClick={onOpenCompare}
              className="px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-cyan-50 hover:bg-cyan-100 text-cyan-900 border border-cyan-200 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Scale className="w-3.5 h-3.5 text-cyan-600" />
              <span className="hidden md:inline">योजना तुलना</span>
            </button>

            {/* Saved / Bookmarked Schemes */}
            <button
              onClick={onOpenSaved}
              className="px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="hidden sm:inline">सेव्ड ({savedCount})</span>
            </button>

            {/* Helpline & Grievance */}
            <button
              onClick={onOpenHelpline}
              className="px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden lg:inline">हेल्पलाइन</span>
            </button>

            {/* Pricing / Premium Upgrade */}
            <button
              onClick={onOpenPricing}
              className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 shadow-sm ${
                isPremium
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/20 hover:scale-105'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-300" />
              <span>{isPremium ? 'PRO' : 'प्रीमियम'}</span>
            </button>

            {/* All Schemes Directory */}
            <button
              onClick={() => setActiveTab(activeTab === 'directory' ? 'matcher' : 'directory')}
              className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                activeTab === 'directory'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span className="hidden sm:inline">{activeTab === 'directory' ? 'होम' : 'सभी 40+ योजनाएं'}</span>
            </button>

            {/* Team / Pitch */}
            <button
              onClick={onOpenTeam}
              className="px-2.5 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-orange-50 hover:bg-orange-100 text-orange-900 border border-orange-200 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Users className="w-3.5 h-3.5 text-orange-600" />
              <span className="hidden sm:inline">टीम</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
