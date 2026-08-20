import React from 'react';
import { Sparkles, MapPin, Users, Volume2, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenCsc, onOpenTeam, onOpenDirectory, activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
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
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/30 rounded-full">
                  Bihar Edition
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                Voice-First AI Scheme Assistant
              </p>
            </div>
          </div>

          {/* Navigation Links / Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab(activeTab === 'directory' ? 'matcher' : 'directory')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'directory'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">सभी योजनाएं</span>
              <span className="md:hidden">योजनाएं</span>
            </button>

            <button
              onClick={onOpenCsc}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all flex items-center gap-1.5 hover:border-slate-700"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="hidden md:inline">CSC केंद्र खोजें</span>
              <span className="md:hidden">CSC</span>
            </button>

            <button
              onClick={onOpenTeam}
              className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-orange-500/10 to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20 text-orange-300 border border-orange-500/30 transition-all flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-orange-400" />
              <span className="hidden sm:inline">टीम व प्रोजेक्ट</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
