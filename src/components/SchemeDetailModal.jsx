import React, { useState } from 'react';
import { 
  X, 
  CheckSquare, 
  Square, 
  ExternalLink, 
  Share2, 
  Volume2, 
  VolumeX, 
  Building2, 
  FileCheck2, 
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  Mic,
  Crown,
  Sparkles
} from 'lucide-react';

export default function SchemeDetailModal({
  scheme,
  onClose,
  isPlayingAudio,
  onPlayAudio,
  onStopAudio,
  onOpenAutoFormFill
}) {
  const [checkedDocs, setCheckedDocs] = useState({});

  if (!scheme) return null;

  const toggleDoc = (index) => {
    setCheckedDocs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const totalDocs = scheme.documentsRequired?.length || 0;
  const readyDocs = Object.values(checkedDocs).filter(Boolean).length;
  const readinessPercent = totalDocs > 0 ? Math.round((readyDocs / totalDocs) * 100) : 100;

  const handleWhatsAppShare = () => {
    const text = `📢 *योजना साथी (Yojana Sathi)*\n\n📌 *योजना का नाम:* ${scheme.hindiName} (${scheme.name})\n💰 *लाभ:* ${scheme.benefit}\n🎯 *पात्रता:* ${scheme.whoQualifies}\n📄 *जरूरी दस्तावेज:* ${scheme.documentsRequired?.join(', ')}\n🔗 *आवेदन लिंक:* ${scheme.officialLink}\n\n_योजना साथी - बिहार के हर नागरिक का हक़_`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex items-center gap-2 mb-3 pr-10 flex-wrap">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${scheme.badgeColor}`}>
            {scheme.categoryLabel}
          </span>
          <span className="text-xs font-semibold text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            {scheme.level}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          {scheme.hindiName}
        </h2>
        <p className="text-sm font-semibold text-slate-400 mt-1">
          {scheme.name}
        </p>

        {/* Voice Form Fill Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 via-amber-500/15 to-emerald-500/20 border-2 border-orange-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>प्रीमियम वॉयस फॉर्म असिस्टेंट (Auto-Fill)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5 font-semibold">
              साइबर कैफे में ₹200 देने के बजाय घर बैठे आवाज़ से पूरा फॉर्म भरें।
            </p>
          </div>

          <button
            onClick={() => onOpenAutoFormFill(scheme)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-md shadow-orange-500/20 hover:scale-105 transition-all"
          >
            <Mic className="w-4 h-4" />
            <span>आवाज़ से फॉर्म भरें</span>
          </button>
        </div>

        {/* Audio Listen Bar */}
        <div className="mt-3 p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-5 h-5 text-orange-400" />
            <span className="text-xs sm:text-sm font-semibold text-slate-200">
              योजना की पूरी जानकारी अपनी भाषा में सुनें:
            </span>
          </div>
          <button
            onClick={() => {
              if (isPlayingAudio) {
                onStopAudio();
              } else {
                onPlayAudio(scheme.id, scheme.audioExplanationHindi);
              }
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isPlayingAudio
                ? 'bg-orange-500 text-white animate-pulse'
                : 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isPlayingAudio ? 'रोकें (Stop)' : 'सुनिये (Audio)'}</span>
          </button>
        </div>

        {/* Benefit Highlight Box */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-emerald-500/15 border border-orange-500/30">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            सरकारी लाभ (Total Benefit):
          </span>
          <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent mt-0.5">
            {scheme.benefit}
          </div>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
            {scheme.benefitDetail}
          </p>
        </div>

        {/* Interactive Document Checklist */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-400" />
              आवश्यक दस्तावेज चेकलिस्ट (Document Checklist):
            </h4>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {readyDocs} / {totalDocs} तैयार ({readinessPercent}%)
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-3">
            जो दस्तावेज आपके पास पहले से उपलब्ध हैं, उन पर टिक करें:
          </p>

          <div className="space-y-2">
            {scheme.documentsRequired?.map((doc, idx) => {
              const isChecked = !!checkedDocs[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleDoc(idx)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isChecked
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                      : 'bg-slate-950/60 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                    <span className="text-xs sm:text-sm font-medium">
                      {doc}
                    </span>
                  </div>
                  {isChecked && (
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      उपलब्ध है
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Application Walkthrough */}
        <div className="mb-6">
          <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
            आवेदन कैसे करें (Step-by-Step Apply Guide):
          </h4>

          <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            {scheme.applySteps?.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <span className="w-6 h-6 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleWhatsAppShare}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>व्हाट्सएप पर शेयर करें</span>
          </button>

          <a
            href={scheme.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all"
          >
            <span>सरकारी पोर्टल पर जाएं</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

    </div>
  );
}
