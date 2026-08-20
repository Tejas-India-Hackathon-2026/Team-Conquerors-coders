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
  Star
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
    <div className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 sm:p-7 transition-all duration-200 shadow-xl flex flex-col justify-between group hover:shadow-2xl hover:shadow-orange-500/5 relative">
      
      {/* Top Meta: Category + Match Badge + Audio TTS button + Bookmark Button */}
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
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-amber-300 border-slate-800'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
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

        {/* Tagline */}
        <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
          {scheme.tagline}
        </p>

        {/* Benefit Highlight Box */}
        <div className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-2xl mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            सरकारी लाभ (Total Benefit):
          </span>
          <div className="text-base sm:text-lg font-black bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            {scheme.benefit}
          </div>
        </div>

        {/* Who Qualifies Section */}
        <div className="mb-4">
          <div className="flex items-start gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-snug">
              <strong className="text-slate-200">पात्रता:</strong> {scheme.whoQualifies}
            </span>
          </div>
        </div>

        {/* Reasons Badge (if returned from matcher) */}
        {scheme.reasons && scheme.reasons.length > 0 && (
          <div className="mb-4 p-2.5 bg-orange-500/10 border border-orange-500/20 rounded-xl text-xs text-orange-300 flex items-start gap-2">
            <Award className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{scheme.reasons[0]}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={() => onOpenDetails(scheme)}
          className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700 hover:border-slate-600 shadow"
        >
          <FileText className="w-4 h-4 text-orange-400" />
          <span>पूरी जानकारी व कागज</span>
        </button>

        <a
          href={scheme.officialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white transition-all border border-orange-500/30"
          title="सरकारी पोर्टल पर जाएं"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}
