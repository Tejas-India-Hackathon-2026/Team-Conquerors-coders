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
  Sparkles,
  Printer,
  Star,
  FileText
} from 'lucide-react';

export default function SchemeDetailModal({
  scheme,
  onClose,
  isPlayingAudio,
  onPlayAudio,
  onStopAudio,
  onOpenAutoFormFill,
  onOpenFlyer,
  isSaved = false,
  onToggleBookmark
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      
      <div className="relative w-full max-w-3xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges & Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3 pr-10 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${scheme.badgeColor}`}>
              {scheme.categoryLabel}
            </span>
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              {scheme.level === 'state' ? '🏛️ बिहार राज्य सरकार' : '🇮🇳 केंद्र सरकार'}
            </span>
          </div>

          {onToggleBookmark && (
            <button
              onClick={() => onToggleBookmark(scheme.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                isSaved
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-slate-100 text-slate-700 hover:text-amber-800 border-slate-200'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isSaved ? 'सेव्ड (Saved)' : 'योजना सेव करें'}</span>
            </button>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
          {scheme.hindiName}
        </h2>
        <p className="text-sm font-semibold text-slate-500 mt-1">
          {scheme.name}
        </p>

        {/* Voice Form Fill Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-2 border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-orange-800 uppercase tracking-wider">
              <Crown className="w-4 h-4 text-orange-600" />
              <span>प्रीमियम वॉयस फॉर्म असिस्टेंट (Auto-Fill)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 mt-0.5 font-semibold">
              साइबर कैफे में ₹200 देने के बजाय घर बैठे आवाज़ से पूरा फॉर्म भरें।
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {onOpenFlyer && (
              <button
                onClick={() => onOpenFlyer(scheme)}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 flex items-center gap-1.5 shadow-sm"
                title="A4 पोस्टर"
              >
                <Printer className="w-4 h-4 text-blue-600" />
                <span className="hidden sm:inline">A4 पर्चा</span>
              </button>
            )}

            <button
              onClick={() => onOpenAutoFormFill(scheme)}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shrink-0 shadow-md shadow-orange-500/20 hover:scale-105 transition-all"
            >
              <Mic className="w-4 h-4" />
              <span>आवाज़ से फॉर्म भरें</span>
            </button>
          </div>
        </div>

        {/* Audio Listen Bar */}
        <div className="mt-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-5 h-5 text-orange-600" />
            <span className="text-xs sm:text-sm font-bold text-slate-800">
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
                : 'bg-orange-100 hover:bg-orange-200 text-orange-800 border border-orange-200'
            }`}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isPlayingAudio ? 'रोकें (Stop)' : 'सुनिये (Audio)'}</span>
          </button>
        </div>

        {/* Benefit Highlight Box */}
        <div className="my-5 p-4 rounded-2xl bg-orange-50 border border-orange-200">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-800">
            सरकारी लाभ (Total Benefit):
          </span>
          <div className="text-2xl sm:text-3xl font-black text-orange-700 mt-0.5">
            {scheme.benefit}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed font-medium">
            {scheme.benefitDetail}
          </p>
        </div>

        {/* Interactive Document Checklist */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-emerald-600" />
              आवश्यक दस्तावेज चेकलिस्ट (Document Checklist):
            </h4>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              {readyDocs} / {totalDocs} तैयार ({readinessPercent}%)
            </span>
          </div>

          <p className="text-xs text-slate-500 mb-3">
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
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                    <span className="text-xs sm:text-sm">
                      {doc}
                    </span>
                  </div>
                  {isChecked && (
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
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
          <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            आवेदन कैसे करें (Step-by-Step Apply Guide):
          </h4>

          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            {scheme.applySteps?.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 border border-blue-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleWhatsAppShare}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>व्हाट्सएप पर शेयर करें</span>
          </button>

          <a
            href={scheme.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <span>सरकारी पोर्टल पर जाएं</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

    </div>
  );
}
