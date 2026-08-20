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
  Zap
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
      // Starts fresh and clears old text
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
    <section className="relative pt-4 pb-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      
      {/* Glow Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Spoken Audio Helper Pill for Illiterate Users */}
      <div className="flex items-center justify-center gap-2 mb-5">
        <button
          onClick={handlePlayVoiceGuide}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md ${
            isSpeakingGuide
              ? 'bg-orange-500 text-white animate-pulse shadow-orange-500/30'
              : 'bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-emerald-500/20 border border-orange-500/40 text-orange-300 hover:text-white hover:bg-orange-500/30'
          }`}
        >
          {isSpeakingGuide ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-orange-400" />}
          <span>{isSpeakingGuide ? 'आवाज़ रोकें (Stop Audio Guide)' : '🔊 आवाज़ में सुनें (Listen How It Works)'}</span>
        </button>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3 leading-tight">
        "बोलिए अपनी भाषा में, <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
          AI बताएगा आपका सरकारी हक़
        </span>"
      </h1>

      <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
        लिखना या पढ़ना नहीं आता? कोई बात नहीं! बस नीचे बने माइक को दबाएं और अपनी भाषा में बोलें — <strong>AI अपने आप योजनाएं खोज देगा।</strong>
      </p>

      {/* Large Voice Mic Button Section */}
      <div className="flex flex-col items-center justify-center my-4">
        
        {/* Language Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl mb-5 shadow-inner">
          <button
            onClick={() => setSelectedLanguage('hi-IN')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedLanguage === 'hi-IN'
                ? 'bg-orange-500 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🇮🇳 हिंदी / भोजपुरी / मैथिली
          </button>
          <button
            onClick={() => setSelectedLanguage('en-IN')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedLanguage === 'en-IN'
                ? 'bg-orange-500 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hinglish / English
          </button>
        </div>

        {/* Central Giant Mic Button */}
        <div className="relative mb-3">
          {isListening && (
            <div className="absolute inset-0 rounded-full bg-orange-500/30 animate-ping pointer-events-none" />
          )}

          <button
            onClick={handleMicToggle}
            aria-label="Voice Input Button"
            className={`relative z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl ${
              isListening
                ? 'bg-gradient-to-tr from-orange-600 via-amber-500 to-emerald-500 mic-glow-active scale-105 ring-4 ring-emerald-400/40'
                : 'bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 hover:from-orange-600/40 hover:to-slate-800 border-4 border-orange-500/50 hover:border-orange-500 group hover:scale-105'
            }`}
          >
            {isListening ? (
              <>
                <Mic className="w-12 h-12 sm:w-14 sm:h-14 text-white animate-bounce" />
                <span className="text-xs sm:text-sm font-extrabold text-white mt-1 uppercase tracking-wider">
                  रोकें / खोजें (Stop & Search)
                </span>
              </>
            ) : (
              <>
                <Mic className="w-12 h-12 sm:w-14 sm:h-14 text-orange-400 group-hover:text-white transition-colors" />
                <span className="text-xs sm:text-sm font-extrabold text-slate-200 group-hover:text-white mt-1 uppercase tracking-wider">
                  माइक दबाएं और बोलें
                </span>
              </>
            )}
          </button>
        </div>

        {/* Audio Wave Visualizer & Guidance */}
        <div className="h-10 mb-2">
          {isListening ? (
            <div className="flex flex-col items-center">
              <AudioVisualizer isActive={isListening} />
              <p className="text-xs text-emerald-400 font-bold animate-pulse mt-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" /> आपकी आवाज़ सुनी जा रही है... बोलते ही अपने आप खोज हो जाएगी!
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-400 font-medium">
              👉 माइक दबाकर बताएं: जैसे "मैं किसान हूँ, 2 बीघा जमीन है" या "12वीं पास बेटी है"
            </p>
          )}
        </div>

      </div>

      {/* Spoken Text Transcript Box */}
      <div className="max-w-3xl mx-auto mt-2 mb-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl text-left">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${isListening ? 'bg-emerald-400 animate-ping' : 'bg-orange-400'}`} />
            <span className="text-xs sm:text-sm font-bold text-slate-200">
              {isListening ? '🎤 आप बोल रहे हैं (Live Voice Recognition)...' : '📝 आपकी बात (Spoken Voice Transcript):'}
            </span>
          </div>

          {transcript && (
            <button
              onClick={handleClear}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700 hover:border-rose-500/50"
            >
              <RefreshCw className="w-3.5 h-3.5" /> नया बोलें (Clear / Reset)
            </button>
          )}
        </div>

        {/* Editable Transcript Textarea */}
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="माइक दबाकर बोलें... (बोलते ही 2 सेकंड में योजनाएं अपने आप खुल जाएंगी)"
          rows={3}
          className="w-full bg-slate-950/70 border border-slate-800 rounded-2xl p-3.5 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all resize-none"
        />

        {/* Action Button to Match */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-orange-400 shrink-0" />
            हिंदी, भोजपुरी, मगही, मैथिली — बोलते ही <strong>Auto-Search (स्वतः खोज)</strong> शुरू हो जाती है!
          </p>

          <button
            onClick={() => onAnalyze(transcript)}
            disabled={!transcript.trim() || isAnalyzing}
            className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
              transcript.trim() && !isAnalyzing
                ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 hover:from-orange-600 hover:to-emerald-700 text-white shadow-orange-500/25 hover:scale-[1.02]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> AI योजनाएं ढूंढ रहा है...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" /> योजनाएं खोजें (Find My Schemes)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Voice Cards for Illiterate Users (चित्र व आवाज़ वाले बड़े कार्ड्स) */}
      <div className="max-w-4xl mx-auto text-left">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-amber-400">✨ बोलना नहीं चाहते? बस अपना चित्र कार्ड चुनें:</span>
          </div>
          <span className="text-[11px] text-slate-400 font-semibold hidden sm:inline">1-Tap Voice Audio</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {DEMO_PERSONAS.map((persona) => {
            const isSelected = activePersonaId === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => handleSelectPersona(persona)}
                className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'bg-orange-500/20 border-orange-500 shadow-lg shadow-orange-500/10'
                    : 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl sm:text-3xl">{persona.avatar}</span>
                  <div className="w-6 h-6 rounded-full bg-slate-800 group-hover:bg-orange-500 group-hover:text-white text-slate-400 flex items-center justify-center transition-colors">
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-orange-400 transition-colors">
                    {persona.nameHindi}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
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
