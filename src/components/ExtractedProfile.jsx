import React from 'react';
import { UserCheck, Tag, Sparkles, MapPin, Award } from 'lucide-react';

export default function ExtractedProfile({ profile, totalMatched }) {
  if (!profile || (!profile.extractedTags?.length && !profile.occupation)) {
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left info */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
              <UserCheck className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  AI द्वारा पहचाना गया नागरिक प्रोफाइल
                </h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Verified Match
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                आपकी आवाज़ के आधार पर निम्नलिखित पात्रता मापदंड निकाले गए:
              </p>
            </div>
          </div>

          {/* Right badge: Total schemes matched */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500/20 to-emerald-500/20 border border-orange-500/30 text-white shrink-0 self-start md:self-auto">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span className="text-xs sm:text-sm font-bold">
              <span className="text-orange-400 font-extrabold text-base">{totalMatched}</span> सरकारी योजनाएं पात्र हैं
            </span>
          </div>

        </div>

        {/* Tags list */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5 text-slate-500" />
            पहचाने गए विवरण:
          </span>
          {profile.extractedTags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-medium bg-slate-800/90 text-slate-200 border border-slate-700/70 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
