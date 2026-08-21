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
  FileText,
  Play,
  Tv,
  Youtube,
  AlertTriangle,
  ArrowRight,
  ListOrdered,
  Info
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
  const [activeTab, setActiveTab] = useState('guide'); // 'guide' | 'docs' | 'video'
  const [checkedDocs, setCheckedDocs] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});
  const [isPlayingStepVoice, setIsPlayingStepVoice] = useState(false);

  if (!scheme) return null;

  const toggleDoc = (index) => {
    setCheckedDocs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleStep = (index) => {
    setCompletedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const totalDocs = scheme.documentsRequired?.length || 0;
  const readyDocs = Object.values(checkedDocs).filter(Boolean).length;
  const readinessPercent = totalDocs > 0 ? Math.round((readyDocs / totalDocs) * 100) : 100;

  const totalSteps = scheme.applySteps?.length || 0;
  const doneSteps = Object.values(completedSteps).filter(Boolean).length;

  const handleWhatsAppShare = () => {
    const text = `📢 *योजना साथी (Yojana Sathi)*\n\n📌 *योजना का नाम:* ${scheme.hindiName} (${scheme.name})\n💰 *लाभ:* ${scheme.benefit}\n🎯 *पात्रता:* ${scheme.whoQualifies}\n📄 *जरूरी दस्तावेज:* ${scheme.documentsRequired?.join(', ')}\n🔗 *आवेदन लिंक:* ${scheme.officialLink}\n\n_योजना साथी - बिहार के हर नागरिक का हक़_`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // Step-by-Step Voice Audio Walkthrough Generator
  const handlePlayStepByStepVoice = () => {
    if (isPlayingStepVoice) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingStepVoice(false);
      return;
    }

    if (!('speechSynthesis' in window)) {
      alert('आपके ब्राउज़र में वॉयस ऑडियो सपोर्ट नहीं है।');
      return;
    }

    window.speechSynthesis.cancel();

    const stepsText = scheme.applySteps?.map((step, idx) => `चरण ${idx + 1}: ${step}`).join('। ') || '';
    const fullVoiceScript = `${scheme.hindiName} में आवेदन करने के कुल ${totalSteps} आसान चरण हैं। ${stepsText}। आवेदन से पूर्व सभी आवश्यक कागजात तैयार रखें।`;

    const utterance = new SpeechSynthesisUtterance(fullVoiceScript);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlayingStepVoice(false);
    utterance.onerror = () => setIsPlayingStepVoice(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingStepVoice(true);
  };

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(scheme.hindiName + ' online apply form kaise bhare bihar full process')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-3xl bg-slate-900/95 border border-slate-700/80 rounded-3xl p-5 sm:p-8 shadow-2xl my-6 text-left max-h-[92vh] overflow-y-auto flex flex-col justify-between">
        
        {/* Close Button */}
        <button
          onClick={() => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            onClose();
          }}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Header Badges & Bookmark */}
          <div className="flex items-center justify-between gap-2 mb-3 pr-10 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${scheme.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                {scheme.categoryLabel}
              </span>
              <span className="text-xs font-semibold text-slate-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                {scheme.level === 'state' ? '🏛️ बिहार राज्य सरकार' : '🇮🇳 केंद्र सरकार'}
              </span>
            </div>

            {onToggleBookmark && (
              <button
                onClick={() => onToggleBookmark(scheme.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  isSaved
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 hover:text-amber-300 border-slate-800'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{isSaved ? 'सेव्ड (Saved)' : 'योजना सेव करें'}</span>
              </button>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {scheme.hindiName}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-400 mt-0.5">
            {scheme.name}
          </p>

          {/* Benefit Highlight Box */}
          <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-emerald-500/15 border border-orange-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                सरकारी लाभ (Total Benefit):
              </span>
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent mt-0.5">
                {scheme.benefit}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed font-medium">
                {scheme.benefitDetail}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onOpenAutoFormFill(scheme)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/25 hover:scale-105 transition-all"
              >
                <Mic className="w-4 h-4" />
                <span>आवाज़ से फॉर्म भरें</span>
              </button>
            </div>
          </div>

          {/* Audio Explanation Bar */}
          <div className="mb-4 p-3 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold text-slate-200">
                योजना परिचय अपनी भाषा में सुनें:
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
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isPlayingAudio
                  ? 'bg-orange-500 text-white animate-pulse'
                  : 'bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isPlayingAudio ? 'रोकें' : 'सुनिये (Audio)'}</span>
            </button>
          </div>

          {/* 3-Section Tab Navigation */}
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800 mb-5">
            <button
              onClick={() => setActiveTab('guide')}
              className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'guide'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <ListOrdered className="w-4 h-4" />
              <span>आवेदन गाइड</span>
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'docs'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>दस्तावेज़ ({readyDocs}/{totalDocs})</span>
            </button>

            <button
              onClick={() => setActiveTab('video')}
              className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Youtube className="w-4 h-4 text-red-400" />
              <span>यूट्यूब वीडियो</span>
            </button>
          </div>

          {/* TAB 1: STEP-BY-STEP APPLICATION GUIDE (Written & Voice Walkthrough) */}
          {activeTab === 'guide' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              
              {/* Voice Walkthrough Action Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-blue-500/15 border border-blue-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Volume2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-extrabold text-blue-200">
                      वॉयस फॉर्म गाइड (Voice Audio Walkthrough)
                    </h5>
                    <p className="text-[11px] text-slate-300">
                      आवाज़ में सुनें कि कौन सा स्टेप पहले और कैसे करना है।
                    </p>
                  </div>
                </div>

                <button
                  onClick={handlePlayStepByStepVoice}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 ${
                    isPlayingStepVoice
                      ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse shadow-rose-500/30'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/25'
                  }`}
                >
                  {isPlayingStepVoice ? <VolumeX className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingStepVoice ? 'रोकें (Stop)' : 'गाइड सुनें'}</span>
                </button>
              </div>

              {/* Step Checklist */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-1">
                  <span>कदम-दर-कदम प्रक्रिया ({doneSteps}/{totalSteps} पूर्ण):</span>
                  <span className="text-blue-400 font-medium">स्टेप पूरा होने पर टिक करें</span>
                </div>

                {scheme.applySteps?.map((step, idx) => {
                  const isDone = !!completedSteps[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleStep(idx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-100'
                          : 'bg-slate-950/70 hover:bg-slate-900 border-slate-800 text-slate-200'
                      }`}
                    >
                      <button className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-black text-[11px]">
                            {idx + 1}
                          </span>
                        )}
                      </button>
                      <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                        <span className={isDone ? 'line-through text-slate-400' : 'font-medium'}>
                          {step}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Important Caution Box */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-amber-300">जरूरी सावधानी:</span> आवेदन करते समय आधार कार्ड का नाम और बैंक पासबुक का नाम 100% मेल खाना चाहिए। बैंक खाते में DBT (आधार सीडिंग) अवश्य चालू रखें।
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: DOCUMENT CHECKLIST */}
          {activeTab === 'docs' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
                <span>अपने पास उपलब्ध कागजात पर टिक लगाएं:</span>
                <span className="text-emerald-400">{readyDocs} / {totalDocs} तैयार ({readinessPercent}%)</span>
              </div>

              <div className="space-y-2">
                {scheme.documentsRequired?.map((doc, idx) => {
                  const isChecked = !!checkedDocs[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleDoc(idx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200 font-semibold'
                          : 'bg-slate-950/70 hover:bg-slate-900 border-slate-800 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {isChecked ? (
                          <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-500 shrink-0" />
                        )}
                        <span className="text-xs sm:text-sm">
                          {doc}
                        </span>
                      </div>
                      {isChecked && (
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                          उपलब्ध है ✓
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: YOUTUBE VIDEO TUTORIALS */}
          {activeTab === 'video' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-red-500/15 via-rose-500/10 to-red-500/15 border border-red-500/30 text-center">
                <Youtube className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h4 className="text-sm sm:text-base font-extrabold text-white">
                  {scheme.hindiName} — ऑनलाइन फॉर्म भरने का वीडियो
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">
                  यूट्यूब पर देखें कि मोबाइल या कंप्यूटर से स्टेप-बाय-स्टेप रजिस्ट्रेशन और डॉक्यूमेंट अपलोड कैसे किया जाता है।
                </p>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={youtubeSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 hover:scale-105 transition-all"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>यूट्यूब पर लाइव वीडियो ट्यूटोरियल देखें</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Fast Tutorial Shortcuts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(scheme.hindiName + ' mobile se online apply kaise kare')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-red-500/40 flex items-center gap-3 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <Play className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white group-hover:text-red-300">
                      📱 मोबाइल से फॉर्म भरें
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      फोन से अप्लाई करने का 5 मिनट का वीडियो
                    </p>
                  </div>
                </a>

                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(scheme.hindiName + ' csc vasudha kendra apply status')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-red-500/40 flex items-center gap-3 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white group-hover:text-red-300">
                      🏢 CSC / वसुधा केंद्र से अप्लाई
                    </h5>
                    <p className="text-[11px] text-slate-400">
                      दुकान से रजिस्ट्रेशन व स्टेटस चेक गाइड
                    </p>
                  </div>
                </a>
              </div>

            </div>
          )}
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="pt-4 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleWhatsAppShare}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>व्हाट्सएप शेयर</span>
            </button>

            {onOpenFlyer && (
              <button
                onClick={() => onOpenFlyer(scheme)}
                className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 shadow"
                title="A4 विलेज पोस्टर"
              >
                <Printer className="w-3.5 h-3.5 text-blue-400" />
                <span>A4 पर्चा</span>
              </button>
            )}
          </div>

          <a
            href={scheme.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
          >
            <span>सरकारी पोर्टल पर फॉर्म भरें</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

    </div>
  );
}
