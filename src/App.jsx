import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RefreshCw, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle2, 
  Volume2, 
  VolumeX,
  Printer, 
  Layers,
  Activity,
  Check,
  Headphones
} from 'lucide-react';

import Navbar from './components/Navbar';
import VoiceHero from './components/VoiceHero';
import ExtractedProfile from './components/ExtractedProfile';
import SchemeCard from './components/SchemeCard';
import SchemeDetailModal from './components/SchemeDetailModal';
import SchemeDirectory from './components/SchemeDirectory';
import CscLocatorModal from './components/CscLocatorModal';
import AnalyticsModal from './components/AnalyticsModal';
import TeamModal from './components/TeamModal';
import Footer from './components/Footer';

import { speechRecognizer } from './services/speechRecognition';
import { speechSynthesizer } from './services/speechSynthesizer';
import { extractProfileFromText, matchSchemes } from './services/aiMatchingEngine';
import { SCHEMES_DATABASE } from './data/schemes';

export default function App() {
  // State
  const [activeTab, setActiveTab] = useState('matcher'); // 'matcher' | 'directory'
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [extractedProfile, setExtractedProfile] = useState(null);
  const [matchedSchemes, setMatchedSchemes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Modals & Audio
  const [selectedSchemeDetail, setSelectedSchemeDetail] = useState(null);
  const [isCscModalOpen, setIsCscModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState(null);

  const resultsRef = useRef(null);

  // Initialize Speech Recognizer callbacks
  useEffect(() => {
    speechRecognizer.onResultCallback = ({ combined }) => {
      setTranscript(combined);
    };

    speechRecognizer.onStartCallback = () => {
      setIsListening(true);
    };

    speechRecognizer.onEndCallback = () => {
      setIsListening(false);
    };

    speechRecognizer.onErrorCallback = (err) => {
      console.warn('Speech error callback:', err);
      setIsListening(false);
    };

    return () => {
      speechRecognizer.stop();
      speechSynthesizer.stop();
    };
  }, []);

  // Handle Starting Speech
  const handleStartListening = () => {
    speechSynthesizer.stop();
    setPlayingAudioId(null);
    speechRecognizer.start({
      lang: selectedLanguage,
      initialText: transcript,
      onResult: ({ combined }) => {
        setTranscript(combined);
      },
      onStart: () => setIsListening(true),
      onEnd: () => setIsListening(false),
      onError: () => setIsListening(false)
    });
  };

  // Handle Stopping Speech
  const handleStopListening = () => {
    speechRecognizer.stop();
    setIsListening(false);
  };

  // Run AI Matching with Auto Voice Readout
  const handleAnalyze = async (textToAnalyze) => {
    const text = textToAnalyze || transcript;
    if (!text.trim()) return;

    speechRecognizer.stop();
    setIsListening(false);
    setIsAnalyzing(true);
    speechSynthesizer.stop();
    setPlayingAudioId(null);

    // Try backend API first, fallback to client engine
    let foundProfile = null;
    let foundMatches = [];

    try {
      const apiRes = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text })
      });

      if (apiRes.ok) {
        const json = await apiRes.json();
        if (json.success && json.data && json.data.matchedSchemes?.length > 0) {
          const clientProfile = extractProfileFromText(text);
          foundProfile = { ...json.data.profile, extractedTags: clientProfile.extractedTags };
          foundMatches = json.data.matchedSchemes;
        }
      }
    } catch (err) {
      // Fallback
    }

    if (!foundMatches || foundMatches.length === 0) {
      const clientProfile = extractProfileFromText(text);
      const result = matchSchemes(clientProfile, text);
      foundProfile = result.profile;
      foundMatches = result.matchedSchemes;
    }

    setExtractedProfile(foundProfile);
    setMatchedSchemes(foundMatches);
    setHasSearched(true);
    setIsAnalyzing(false);

    // Confetti celebration
    if (foundMatches.length > 0) {
      try {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }

    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // AUTOMATIC VOICE READOUT: Speak out the results automatically for illiterate citizens!
    setTimeout(() => {
      speechSynthesizer.speakResultsSummary(foundMatches, {
        onStart: (id) => setPlayingAudioId(id),
        onEnd: () => setPlayingAudioId(null)
      });
    }, 500);
  };

  // Audio Playback handler
  const handlePlayAudio = (id, hindiText) => {
    setPlayingAudioId(id);
    speechSynthesizer.speak(hindiText, {
      id,
      onStart: (currentId) => setPlayingAudioId(currentId),
      onEnd: () => setPlayingAudioId(null),
      onError: () => setPlayingAudioId(null)
    });
  };

  const handleStopAudio = () => {
    speechSynthesizer.stop();
    setPlayingAudioId(null);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Navigation */}
      <Navbar
        onOpenCsc={() => setIsCscModalOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsModalOpen(true)}
        onOpenTeam={() => setIsTeamModalOpen(true)}
        onOpenDirectory={() => setActiveTab('directory')}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Body */}
      <main className="flex-grow">
        
        {activeTab === 'directory' ? (
          /* Scheme Catalog Directory View */
          <SchemeDirectory
            onSelectScheme={(scheme) => setSelectedSchemeDetail(scheme)}
            isPlayingAudio={playingAudioId}
            onPlayAudio={handlePlayAudio}
            onStopAudio={handleStopAudio}
            onBackToVoice={() => setActiveTab('matcher')}
          />
        ) : (
          /* Voice Assistant Matcher View */
          <>
            <VoiceHero
              isListening={isListening}
              transcript={transcript}
              setTranscript={setTranscript}
              onStartListening={handleStartListening}
              onStopListening={handleStopListening}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={(lang) => {
                setSelectedLanguage(lang);
                speechRecognizer.setLanguage(lang);
              }}
            />

            {/* Results Section */}
            <div ref={resultsRef} className="scroll-mt-24">
              {hasSearched && (
                <>
                  {/* Extracted Profile Tags */}
                  <ExtractedProfile
                    profile={extractedProfile}
                    totalMatched={matchedSchemes.length}
                  />

                  {/* Matched Schemes Results Grid */}
                  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    
                    {/* Auto-Audio Notification Bar for Non-readers */}
                    {playingAudioId === 'results-summary' && (
                      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-emerald-500/20 border-2 border-orange-500/40 flex items-center justify-between gap-3 shadow-xl animate-pulse">
                        <div className="flex items-center gap-3">
                          <Volume2 className="w-6 h-6 text-orange-400 shrink-0" />
                          <span className="text-sm sm:text-base font-bold text-white">
                            🔊 योजना साथी आपको रिजल्ट बोलकर सुना रहा है... सुनते रहें!
                          </span>
                        </div>
                        <button
                          onClick={handleStopAudio}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700"
                        >
                          रोकें (Stop)
                        </button>
                      </div>
                    )}

                    {/* Results Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                          <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                            आपके लिए पहचानी गई सरकारी योजनाएं
                          </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 mt-1">
                          नीचे दी गई योजनाओं में आप सीधे आवेदन कर सरकारी लाभ प्राप्त कर सकते हैं:
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {matchedSchemes.length > 0 && (
                          <button
                            onClick={handlePrintSlip}
                            className="text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow"
                          >
                            <Printer className="w-4 h-4 text-emerald-400" />
                            <span>पात्रता पर्ची प्रिंट करें (Print Slip)</span>
                          </button>
                        )}

                        <button
                          onClick={() => setActiveTab('directory')}
                          className="text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
                        >
                          <Layers className="w-4 h-4 text-orange-400" />
                          <span>सभी 10+ योजनाएं</span>
                        </button>
                      </div>
                    </div>

                    {/* Matched Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {matchedSchemes.map((scheme) => (
                        <SchemeCard
                          key={scheme.id}
                          scheme={scheme}
                          isPlayingAudio={playingAudioId === scheme.id}
                          onPlayAudio={handlePlayAudio}
                          onStopAudio={handleStopAudio}
                          onOpenDetails={(s) => setSelectedSchemeDetail(s)}
                        />
                      ))}
                    </div>

                  </section>
                </>
              )}
            </div>
          </>
        )}

      </main>

      {/* Detail Modal */}
      {selectedSchemeDetail && (
        <SchemeDetailModal
          scheme={selectedSchemeDetail}
          onClose={() => setSelectedSchemeDetail(null)}
          isPlayingAudio={playingAudioId === selectedSchemeDetail.id}
          onPlayAudio={handlePlayAudio}
          onStopAudio={handleStopAudio}
        />
      )}

      {/* CSC Locator Modal */}
      {isCscModalOpen && (
        <CscLocatorModal
          onClose={() => setIsCscModalOpen(false)}
        />
      )}

      {/* Analytics Modal */}
      {isAnalyticsModalOpen && (
        <AnalyticsModal
          onClose={() => setIsAnalyticsModalOpen(false)}
        />
      )}

      {/* Team / Pitch Modal */}
      {isTeamModalOpen && (
        <TeamModal
          onClose={() => setIsTeamModalOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer onOpenTeam={() => setIsTeamModalOpen(true)} />

    </div>
  );
}
