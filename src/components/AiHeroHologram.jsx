import React from 'react';
import { 
  Sparkles, 
  Mic, 
  MicOff, 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Cpu,
  Volume2
} from 'lucide-react';

export default function AiHeroHologram({
  isListening,
  onStartListening,
  onStopListening,
  transcript,
  onTranscriptChange,
  onAnalyze,
  isAnalyzing
}) {
  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-slate-900/95 via-[#0b1626]/90 to-slate-900/95 border border-emerald-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden text-left select-none">
      
      {/* Background Holographic Glow */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left Text & Voice Input Hub */}
        <div className="flex-1 space-y-4 max-w-xl">
          
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm">
              <Cpu className="w-3.5 h-3.5" /> AI Powered
            </span>
            <span className="text-xs font-bold text-slate-400">• Smart</span>
            <span className="text-xs font-bold text-slate-400">• Secure</span>
            <span className="text-xs font-bold text-slate-400">• Voice First</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight">
            Find the Right <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Scheme for You
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            हमारी AI तकनीक आपकी उम्र, पेशा, जमीन और परिवार की स्थिति समझकर सबसे सटीक सरकारी योजनाएं खोजती है।
          </p>

          {/* Voice Bar Input */}
          <div className="p-2 rounded-2xl bg-slate-950/80 border border-slate-700/80 flex items-center gap-2 shadow-inner">
            <button
              onClick={isListening ? onStopListening : onStartListening}
              className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold transition-all shrink-0 ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/30'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
              }`}
              title={isListening ? 'माइक बंद करें' : 'माइक चालू करें'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={transcript}
              onChange={(e) => onTranscriptChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && transcript.trim().length >= 2) {
                  onAnalyze(transcript);
                }
              }}
              placeholder={isListening ? 'आपकी आवाज सुनी जा रही है... बोलें' : 'अपनी भाषा में बोलें या टाइप करें (उदा: मैं किसान हूँ...)'}
              className="flex-1 bg-transparent text-white text-xs sm:text-sm font-medium placeholder-slate-500 outline-none px-2"
            />

            <button
              onClick={() => onAnalyze(transcript)}
              disabled={isAnalyzing}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all shrink-0"
            >
              <span>{isAnalyzing ? 'खोज रहे हैं...' : 'खोजें'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400 font-semibold pt-1">
            <span className="flex items-center gap-1 text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" /> 1.2s ऑटो-सर्च एक्टिव
            </span>
            <span>• 45+ योजनाएं डेटाबेस</span>
            <span>• 100% निशुल्क</span>
          </div>

        </div>

        {/* Right Futuristic Holographic Tree Visualizer */}
        <div className="relative w-56 sm:w-64 h-56 sm:h-64 flex items-center justify-center shrink-0">
          
          {/* Outer Ring Pulses */}
          <div className={`absolute inset-0 rounded-full border border-emerald-500/20 ${isListening ? 'animate-ping duration-1000' : ''}`} />
          <div className="absolute inset-4 rounded-full border border-teal-500/30 animate-pulse" />
          <div className="absolute inset-10 rounded-full bg-gradient-to-b from-emerald-500/10 to-transparent border border-emerald-400/40" />

          {/* Central Holographic Icon Center */}
          <div className="relative w-32 h-32 rounded-3xl bg-slate-950/90 border-2 border-emerald-400/60 flex flex-col items-center justify-center p-3 shadow-2xl shadow-emerald-500/30 group">
            <div className="text-4xl mb-1 filter drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]">
              🌳
            </div>
            <span className="text-[10px] font-black text-emerald-300 tracking-wider uppercase text-center">
              AI SCHEME TREE
            </span>
            <span className="text-[8px] text-slate-400 font-bold">
              245+ NODES CONNECTED
            </span>
          </div>

          {/* Orbiting Scheme Nodes */}
          <div className="absolute top-2 left-6 px-2 py-1 rounded-lg bg-slate-900/90 border border-emerald-500/40 text-[9px] font-bold text-emerald-300 shadow">
            🌾 किसान
          </div>
          <div className="absolute top-4 right-4 px-2 py-1 rounded-lg bg-slate-900/90 border border-blue-500/40 text-[9px] font-bold text-blue-300 shadow">
            🎓 छात्र
          </div>
          <div className="absolute bottom-4 left-4 px-2 py-1 rounded-lg bg-slate-900/90 border border-purple-500/40 text-[9px] font-bold text-purple-300 shadow">
            ♿ दिव्यांग
          </div>
          <div className="absolute bottom-2 right-6 px-2 py-1 rounded-lg bg-slate-900/90 border border-amber-500/40 text-[9px] font-bold text-amber-300 shadow">
            👴 बुजुर्ग
          </div>

        </div>

      </div>

    </div>
  );
}
