import React from 'react';
import { 
  Sparkles, 
  Bot, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award
} from 'lucide-react';

export default function AiSchemeAdvisorColumn({
  transcript,
  matchedSchemes = [],
  onOpenDetails,
  onOpenWizard
}) {
  const topMatches = matchedSchemes.slice(0, 3);

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col justify-between text-left select-none space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-black text-white">AI Scheme Advisor</h3>
        </div>
        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          Beta
        </span>
      </div>

      {/* Interactive Chat Stream */}
      <div className="space-y-3">
        
        {/* Bot Message */}
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 leading-relaxed font-medium">
            नमस्ते! 👋 मैं आपका AI साथी हूँ। अपने बारे में बताएं, मैं आपके लिए सबसे उपयुक्त योजना खोजूँगा।
          </div>
        </div>

        {/* User Query Bubble */}
        {transcript ? (
          <div className="flex items-start gap-2.5 justify-end">
            <div className="p-3 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-100 font-medium max-w-[85%] leading-relaxed">
              "{transcript}"
            </div>
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 text-xs">
              👨‍🌾
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2.5 justify-end">
            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 font-medium">
              "मैं बिहार का किसान हूँ, 2 बीघा जमीन है"
            </div>
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 text-xs">
              👨‍🌾
            </div>
          </div>
        )}

        {/* Profile Analysis Bar */}
        <div className="p-2.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Sparkles className="w-3 h-3" /> Analyzing your profile...
            </span>
            <span className="text-emerald-400">100%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-full" />
          </div>
        </div>

      </div>

      {/* Top 3 Matching Schemes List */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-300">
          <span>Top {topMatches.length > 0 ? topMatches.length : 3} Schemes for You</span>
          <span className="text-[10px] text-emerald-400 font-bold">AI Matched</span>
        </div>

        <div className="space-y-2">
          {topMatches.map((scheme, idx) => (
            <div
              key={scheme.id}
              onClick={() => onOpenDetails(scheme)}
              className="p-3 rounded-2xl bg-slate-950/80 hover:bg-slate-850 border border-slate-800/90 hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-between gap-2.5 group"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <span className="w-5 h-5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                    {scheme.hindiName}
                  </h4>
                  <p className="text-[11px] font-bold text-emerald-400 mt-0.5 truncate">
                    {scheme.benefit}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetails(scheme);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-[10px] transition-all shrink-0 border border-emerald-500/30"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <button
        onClick={onOpenWizard}
        className="w-full py-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
      >
        <span>View All Recommended Schemes</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
}
