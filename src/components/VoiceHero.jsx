import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RefreshCw, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight,
  Headphones,
  Info,
  Zap,
  Radio
} from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';
import { DEMO_PERSONAS } from '../data/personas';
import { speechSynthesizer } from '../services/speechSynthesizer';

export default function VoiceHero({
  isListening,
  transcript,
  setTranscript,
  onStartListening,
  onStopListening,
  onAnalyze,
  isAnalyzing,
  selectedLanguage,
  setSelectedLanguage
}) {
  const [activePersonaId, setActivePersonaId] = useState(null);
  const [isSpeakingGuide, setIsSpeakingGuide] = useState(false);

  const handleSelectPersona = (persona) => {
    setActivePersonaId(persona.id);
    setTranscript(persona.transcript);
    speechSynthesizer.speak(persona.transcript, {
      id: `persona-${persona.id}`,
      onStart: () => {},
      onEnd: () => {
        onAnalyze(persona.transcript);
      }
    });
    onAnalyze(persona.transcript);
  };

  const handleMicToggle = () => {
    speechSynthesizer.stop();
    setIsSpeakingGuide(false);
    if (isListening) {
      onStopListening();
    } else {
      setActivePersonaId(null);
      onStartListening();
    }
  };

  const handleClear = () => {
    speechSynthesizer.stop();
    setTranscript('');
    setActivePersonaId(null);
  };

  const handlePlayVoiceGuide = () => {
    if (isSpeakingGuide) {
      speechSynthesizer.stop();
      setIsSpeakingGuide(false);
    } else {
      setIsSpeakingGuide(true);
      speechSynthesizer.speakWelcome({
        onStart: () => setIsSpeakingGuide(true),
        onEnd: () => setIsSpeakingGuide(false)
      });
    }
  };

  return (
    <section className="relative pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center z-10">
      
      {/* Top Banner Audio Guide Pill */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={handlePlayVoiceGuide}
          className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center gap-2.5 transition-all shadow-md ${
            isSpeakingGuide
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white animate-pulse shadow-orange-500/30'
              : 'bg-white hover:bg-orange-50 border border-orange-200 text-orange-800 hover:text-orange-900 shadow-sm hover:scale-105'
          }`}
        >
          {isSpeakingGuide ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-orange-600 animate-bounce" />}
          <span>{isSpeakingGuide ? 'आवाज़ रोकें (Stop Voice Guide)' : '🔊 योजना साथी कैसे काम करता है? (आवाज़ में सुनें)'}</span>
        </button>
      </div>

      {/* Main Official Clean Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
        "बोलिए अपनी भाषा में, <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 bg-clip-text text-transparent">
          AI बताएगा आपका सरकारी हक़
        </span>"
      </h1>

      <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
        लिखना या पढ़ना नहीं आता? कोई बात नहीं! बस नीचे बने बड़े माइक को दबाएं और अपनी भाषा में बोलें — <strong>AI स्वतः आपकी योजनाएं खोज देगा।</strong>
      </p>

      {/* Large Voice Mic Pedestal */}
      <div className="flex flex-col items-center justify-center my-4">
        
        {/* Language Switcher Pill */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-2xl mb-8 shadow-md">
          <button
            onClick={() => setSelectedLanguage('hi-IN')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedLanguage === 'hi-IN'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🇮🇳 हिंदी / भोजपुरी / मैथिली</span>
          </button>
          <button
            onClick={() => setSelectedLanguage('en-IN')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedLanguage === 'en-IN'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 scale-105'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Hinglish / English</span>
          </button>
        </div>

        {/* Central Glowing Mic Button with Concentric Sound Ripples */}
        <div className="relative mb-6 flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48">
          
          {/* Ripples when active */}
          {isListening && (
            <>
              <div className="mic-ripple-ring-light" />
              <div className="mic-ripple-ring-light" />
              <div className="mic-ripple-ring-light" />
            </>
          )}

          <button
            onClick={handleMicToggle}
            aria-label="Voice Input Button"
            className={`relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer ${
              isListening
                ? 'bg-gradient-to-tr from-orange-600 via-amber-500 to-emerald-600 scale-105 ring-8 ring-orange-500/20 shadow-[0_10px_40px_rgba(249,115,22,0.4)]'
                : 'bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 border-4 border-white shadow-[0_12px_30px_rgba(249,115,22,0.35)] group hover:scale-105'
            }`}
          >
            {isListening ? (
              <>
                <Mic className="w-14 h-14 sm:w-16 sm:h-16 text-white animate-bounce" />
                <span className="text-xs sm:text-sm font-black text-white mt-1 uppercase tracking-wider">
                  रोकें (Tap to Stop)
                </span>
              </>
            ) : (
              <>
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all mb-1">
                  <Mic className="w-9 h-9 sm:w-10 sm:h-10 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                  माइक दबाएं और बोलें
                </span>
              </>
            )}
          </button>
        </div>

        {/* Audio Wave Visualizer & Live Sound Status */}
        <div className="h-12 mb-3 flex flex-col items-center justify-center">
          {isListening ? (
            <div className="flex flex-col items-center animate-in fade-in duration-300">
              <AudioVisualizer isActive={isListening} />
              <p className="text-xs sm:text-sm text-emerald-800 font-extrabold mt-1.5 flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 px-4 py-1 rounded-full shadow-sm">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span>आपकी आवाज़ सुनी जा रही है... बोलते ही स्वतः खोज हो जाएगी!</span>
              </p>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              👉 <strong className="text-orange-700">बोलकर बताएं:</strong> "मैं किसान हूँ, 2 बीघा जमीन है" या "12वीं पास बेटी की स्कॉलरशिप"
            </p>
          )}
        </div>

      </div>

      {/* Spoken Text Transcript Box (Clean White Panel) */}
      <div className="max-w-3xl mx-auto mt-2 mb-10 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 text-left shadow-xl shadow-slate-200/50">
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className={`w-3 h-3 rounded-full ${isListening ? 'bg-emerald-500 animate-ping' : 'bg-orange-500'}`} />
            <span className="text-xs sm:text-sm font-extrabold text-slate-900">
              {isListening ? '🎤 आप बोल रहे हैं (Live Voice Recognition)...' : '📝 आपकी बात (Spoken Voice Transcript):'}
            </span>
          </div>

          {transcript && (
            <button
              onClick={handleClear}
              className="text-xs font-bold text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-rose-200 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" /> नया बोलें (Clear)
            </button>
          )}
        </div>

        {/* Editable Transcript Textarea */}
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="माइक दबाकर बोलें... (जैसे ही बोलना बंद करेंगे, AI अपने आप खोज शुरू कर देगा)"
          rows={3}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all resize-none font-medium leading-relaxed"
        />

        {/* Action Button to Match */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
            <Info className="w-4 h-4 text-orange-600 shrink-0" />
            हिंदी, भोजपुरी, मगही, मैथिली — बोलते ही <strong>Auto-Search</strong> शुरू हो जाती है!
          </p>

          <button
            onClick={() => onAnalyze(transcript)}
            disabled={!transcript.trim() || isAnalyzing}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md ${
              transcript.trim() && !isAnalyzing
                ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 hover:from-orange-600 hover:to-emerald-700 text-white shadow-orange-500/20 hover:scale-[1.02] active:scale-95'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
            }`}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> AI योजनाएं ढूंढ रहा है...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" /> योजनाएं खोजें (Find My Schemes)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Persona Cards for Illiterate Citizens (Clean White Tiles) */}
      <div className="max-w-4xl mx-auto text-left">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-500" />
              बोलना नहीं चाहते? बस अपना चित्र कार्ड छूएं:
            </span>
          </div>
          <span className="text-xs text-slate-600 font-bold hidden sm:inline bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            1-Tap Voice Audio
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {DEMO_PERSONAS.map((persona) => {
            const isSelected = activePersonaId === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => handleSelectPersona(persona)}
                className={`p-4 rounded-3xl border transition-all text-left flex flex-col justify-between group relative overflow-hidden card-hover-clean ${
                  isSelected
                    ? 'bg-orange-50 border-orange-500 shadow-md ring-2 ring-orange-500/20 scale-105'
                    : 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">{persona.avatar}</span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-orange-500 group-hover:text-white text-slate-500 flex items-center justify-center transition-colors shadow-sm">
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {persona.nameHindi}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                    {persona.tagline}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
}
