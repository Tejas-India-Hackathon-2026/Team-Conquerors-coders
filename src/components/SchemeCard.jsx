import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  ExternalLink, 
  FileText, 
  ChevronRight, 
  Award,
  Sparkles,
  Building2,
  Wheat,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Home,
  BookOpen,
  ShieldCheck,
  Users,
  CreditCard,
  Laptop
} from 'lucide-react';

const ICON_MAP = {
  Wheat: Wheat,
  HeartPulse: HeartPulse,
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  Home: Home,
  BookOpen: BookOpen,
  ShieldCheck: ShieldCheck,
  Users: Users,
  CreditCard: CreditCard,
  Laptop: Laptop
};

export default function SchemeCard({
  scheme,
  isPlayingAudio,
  onPlayAudio,
  onStopAudio,
  onOpenDetails
}) {
  const IconComponent = ICON_MAP[scheme.icon] || Sparkles;

  return (
    <div className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 sm:p-7 transition-all duration-200 shadow-xl flex flex-col justify-between group hover:shadow-2xl hover:shadow-orange-500/5">
      
      {/* Top Meta: Category + Match Badge + Audio TTS button */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${scheme.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
              {scheme.categoryLabel}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
              {scheme.level}
            </span>
          </div>

          {/* TTS Audio Speak Button */}
          <button
            onClick={() => {
              if (isPlayingAudio) {
                onStopAudio();
              } else {
                onPlayAudio(scheme.id, scheme.audioExplanationHindi);
              }
            }}
            aria-label="Listen Hindi Audio"
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
              isPlayingAudio
                ? 'bg-orange-500 text-white animate-pulse shadow-orange-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-orange-400 border border-slate-700'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>सुन रहे हैं</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>सुनिये (Audio)</span>
              </>
            )}
          </button>
        </div>

        {/* Scheme Title & Icon */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <IconComponent className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-orange-300 transition-colors leading-snug">
              {scheme.hindiName}
            </h3>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">
              {scheme.name}
            </p>
          </div>
        </div>

        {/* Big Benefit Box */}
        <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-emerald-500/10 border border-orange-500/20 rounded-2xl p-3.5 my-3.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            सरकारी लाभ (Benefit):
          </div>
          <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent mt-0.5">
            {scheme.benefit}
          </div>
          <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
            {scheme.benefitDetail}
          </p>
        </div>

        {/* Match Percentage & Why you qualify */}
        <div className="my-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              आप क्यों पात्र हैं (Eligibility Reason):
            </span>
            {scheme.matchScore && (
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full border ${scheme.matchColor}`}>
                {scheme.matchScore}% Match
              </span>
            )}
          </div>

          <ul className="space-y-1.5 bg-slate-950/60 rounded-2xl p-3 border border-slate-800/80">
            {scheme.reasons?.map((reason, idx) => (
              <li key={idx} className="text-xs text-slate-200 flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-400 text-sm leading-none mt-0.5">✔</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Required Documents preview */}
        <div className="my-3 text-xs text-slate-400">
          <span className="font-semibold text-slate-300 flex items-center gap-1 mb-1">
            <FileText className="w-3.5 h-3.5 text-orange-400" /> मुख्य दस्तावेज:
          </span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {scheme.documentsRequired?.slice(0, 3).map((doc, idx) => (
              <span key={idx} className="bg-slate-800/80 text-slate-300 px-2.5 py-1 rounded-lg text-[11px] border border-slate-700/60">
                {doc.split('(')[0].trim()}
              </span>
            ))}
            {scheme.documentsRequired?.length > 3 && (
              <span className="text-[11px] text-slate-400 px-1 py-0.5 self-center">
                +{scheme.documentsRequired.length - 3} और
              </span>
            )}
          </div>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="pt-4 mt-2 border-t border-slate-800/80">
        <button
          onClick={() => onOpenDetails(scheme)}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 transition-all"
        >
          <span>दस्तावेज चेकलिस्ट व आवेदन प्रक्रिया</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
