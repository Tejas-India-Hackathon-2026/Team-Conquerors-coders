import React from 'react';
import { Heart, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenTeam }) {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950 py-10 px-4 sm:px-6 lg:px-8 text-center">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left */}
        <div className="flex items-center gap-2 text-left">
          <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-sm">
            🇮🇳
          </div>
          <div>
            <div className="font-extrabold text-sm text-white">योजना साथी (Yojana Sathi)</div>
            <div className="text-xs text-slate-400">बिहार एवं भारत के प्रत्येक नागरिक के लिए 100% निःशुल्क सेवा</div>
          </div>
        </div>

        {/* Center Credits */}
        <div className="text-xs text-slate-400 flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>by</span>
          <button
            onClick={onOpenTeam}
            className="font-bold text-orange-400 hover:text-orange-300 underline transition-colors"
          >
            Team Conqueror Coders (GEC Jamui)
          </button>
        </div>

        {/* Right */}
        <div className="text-xs text-slate-400">
          DPIIT Initiative · Tejas India Hackathon 2026
        </div>

      </div>
    </footer>
  );
}
