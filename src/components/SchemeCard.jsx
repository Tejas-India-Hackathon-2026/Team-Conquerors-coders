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
  Laptop,
  Bookmark,
  Star,
  ArrowRight
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
  onOpenDetails,
  isSaved = false,
  onToggleBookmark
}) {
  const IconComponent = ICON_MAP[scheme.icon] || Sparkles;

  return (
    <div className="bg-white border border-slate-200/90 hover:border-orange-500/50 rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group card-hover-clean relative overflow-hidden text-left">
      
      {/* Top Ambient Highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/10 transition-all" />

      {/* Top Meta: Category + Level Badge + Bookmark + Audio Button */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border shadow-sm ${scheme.badgeColor || 'bg-slate-100 text-slate-800 border-slate-200'}`}>
              {scheme.categoryLabel}
            </span>
            <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              {scheme.level === 'state' ? '🏛️ बिहार सरकार' : '🇮🇳 केंद्र सरकार'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Bookmark / Star Button */}
            {onToggleBookmark && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(scheme.id);
                }}
                title={isSaved ? 'सेव सूची से हटाएं' : 'पसंदीदा में सेव करें'}
                className={`p-2 rounded-xl text-xs transition-all border ${
                  isSaved
                    ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-sm scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-amber-600 border-slate-200'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
              </button>
            )}

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
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm ${
                isPlayingAudio
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white animate-pulse shadow-orange-500/30'
                  : 'bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200'
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>सुन रहे हैं</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-orange-600" />
                  <span>सुनिये</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Scheme Title & Icon */}
        <div className="flex items-start gap-3.5 mb-3.5">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200/80 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-orange-100 transition-all shadow-sm">
            <IconComponent className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-orange-700 transition-colors leading-snug">
              {scheme.hindiName}
            </h3>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
              {scheme.name}
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed font-medium">
          {scheme.tagline}
        </p>

        {/* Total Benefit Highlight Box (Clean Amber Card) */}
        <div className="p-4 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border border-orange-200/80 rounded-2xl mb-4 group-hover:border-orange-300 transition-all shadow-inner">
          <span className="text-[10px] font-bold uppercase tracking-wider text-orange-800 block mb-0.5">
            सरकारी लाभ (Total Benefit):
          </span>
          <div className="text-lg sm:text-xl font-black text-orange-700">
            {scheme.benefit}
          </div>
          <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1 font-medium">
            {scheme.benefitDetail}
          </p>
        </div>

        {/* Who Qualifies Section */}
        <div className="mb-4">
          <div className="flex items-start gap-2 text-xs text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-snug">
              <strong className="text-slate-900">पात्रता:</strong> {scheme.whoQualifies}
            </span>
          </div>
        </div>

        {/* Reasons Badge (if returned from matcher) */}
        {scheme.reasons && scheme.reasons.length > 0 && (
          <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
            <Award className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-snug font-semibold">{scheme.reasons[0]}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2.5">
        <button
          onClick={() => onOpenDetails(scheme)}
          className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-lg"
        >
          <FileText className="w-4 h-4 text-orange-400 group-hover:text-white" />
          <span>पूरी जानकारी व कागज</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
        </button>

        <a
          href={scheme.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-2xl bg-slate-100 hover:bg-orange-500 text-slate-700 hover:text-white transition-all border border-slate-200 hover:border-orange-500 shadow-sm"
          title="सरकारी पोर्टल पर जाएं"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
