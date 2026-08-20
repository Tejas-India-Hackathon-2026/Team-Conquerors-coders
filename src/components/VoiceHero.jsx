import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, RefreshCw, Send, HelpCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';
import { DEMO_PERSONAS } from '../data/personas';

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

  const handleSelectPersona = (persona) => {
    setActivePersonaId(persona.id);
    setTranscript(persona.transcript);
    // Auto-analyze when a persona is clicked for super smooth demo
    setTimeout(() => {
      onAnalyze(persona.transcript);
    }, 250);
  };

  const handleMicToggle = () => {
    if (isListening) {
      onStopListening();
    } else {
      setActivePersonaId(null);
      onStartListening();
    }
  };

  const handleClear = () => {
    setTranscript('');
    setActivePersonaId(null);
  };

  return (
    <section className="relative pt-6 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      
      {/* Glow Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-medium text-slate-300 mb-6 shadow-inner">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-orange-400 font-semibold">आवाज़ से योजना खोजें</span>
        <span className="text-slate-500">|</span>
        <span className="text-slate-400">Zero Typing, Pure Voice</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
        "बोलो अपनी ज़िंदगी के बारे में, <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
          AI बताएगा कौन सी सरकारी योजना
        </span>{' '}
        आपके लिए है"
      </h1>

      <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
        बिहार के किसान, छात्र, महिलाएं और बुजुर्ग — अब किसी फॉर्म या दफ्तर के चक्कर की जरूरत नहीं। अपनी भाषा में बोलें और तुरंत पाएं अपने हक़ की योजना।
      </p>

      {/* Voice Mic Section */}
      <div className="flex flex-col items-center justify-center my-6">
        
        {/* Language Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-2xl mb-6">
          <button
            onClick={() => setSelectedLanguage('hi-IN')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedLanguage === 'hi-IN'
                ? 'bg-orange-500 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🇮🇳 हिंदी (Hindi)
          </button>
          <button
            onClick={() => setSelectedLanguage('en-IN')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedLanguage === 'en-IN'
                ? 'bg-orange-500 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hinglish / English
          </button>
        </div>

        {/* Large Central Mic Button */}
        <div className="relative mb-4">
          {/* Pulsing Ripple Effect when listening */}
          {isListening && (
            <div className="absolute inset-0 rounded-full bg-orange-500/30 animate-ping pointer-events-none" />
          )}

          <button
            onClick={handleMicToggle}
            aria-label="Voice Input Button"
            className={`relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl ${
              isListening
                ? 'bg-gradient-to-tr from-orange-600 to-amber-500 mic-glow-active scale-105'
                : 'bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 hover:from-orange-600/30 hover:to-slate-800 border-2 border-orange-500/40 hover:border-orange-500 group hover:scale-105'
            }`}
          >
            {isListening ? (
              <>
                <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-bounce" />
                <span className="text-[11px] sm:text-xs font-bold text-white mt-1 uppercase tracking-wider">
                  रोकें (Stop)
                </span>
              </>
            ) : (
              <>
                <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400 group-hover:text-white transition-colors" />
                <span className="text-[11px] sm:text-xs font-bold text-slate-300 group-hover:text-white mt-1 uppercase tracking-wider">
                  बोलें (Speak)
                </span>
              </>
            )}
          </button>
        </div>

        {/* Audio Wave Visualizer */}
        <div className="h-8 mb-2">
          {isListening ? (
            <div className="flex flex-col items-center">
              <AudioVisualizer isActive={isListening} />
              <p className="text-xs text-orange-400 font-semibold animate-pulse">
                आपकी आवाज़ सुनी जा रही है... बोलते रहें
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-400">
              माइक बटन दबाएं और बताएं — जैसे: "मैं किसान हूँ, 2 बीघा जमीन है"
            </p>
          )}
        </div>

      </div>

      {/* Spoken Text Transcript Box */}
      <div className="max-w-3xl mx-auto mt-2 mb-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl text-left">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
            <span className="text-xs sm:text-sm font-bold text-slate-300">
              {isListening ? 'लाइव आवाज (Live Voice Input)' : 'आपका विवरण (Transcript / Input)'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {transcript && (
              <button
                onClick={handleClear}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> साफ करें
              </button>
            )}
          </div>
        </div>

        {/* Editable Transcript Textarea */}
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="माइक दबाकर बोलें या यहाँ लिखें (उदाहरण: 'मैं 12वीं पास लड़की हूँ, आगे कॉलेज में पढ़ना है' या '60 साल का हूँ, पेंशन चाहिए')..."
          rows={3}
          className="w-full bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5 text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/70 resize-none transition-all"
        />

        {/* Action Button to Match */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            हिंदी, भोजपुरी, मैथिली मिश्रित हिंदी या इंग्लिश — सभी समर्थित हैं
          </p>

          <button
            onClick={() => onAnalyze(transcript)}
            disabled={!transcript.trim() || isAnalyzing}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg ${
              transcript.trim() && !isAnalyzing
                ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 hover:from-orange-600 hover:to-emerald-700 text-white shadow-orange-500/20 hover:scale-[1.02]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> AI मिलान कर रहा है...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" /> योजनाएं खोजें (Find Schemes)
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Demo Persona Chips */}
      <div className="max-w-4xl mx-auto text-left">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
            ⚡ एक क्लिक में टेस्ट करें (Demo Personas):
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {DEMO_PERSONAS.map((persona) => {
            const isSelected = activePersonaId === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => handleSelectPersona(persona)}
                className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-orange-500/15 border-orange-500 text-orange-200 shadow-md shadow-orange-500/10'
                    : 'bg-slate-900/70 border-slate-800/80 hover:bg-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{persona.icon}</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-orange-400 rotate-90' : 'text-slate-600 group-hover:text-slate-400'}`} />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white leading-tight">
                    {persona.role}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                    {persona.englishSummary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
}
