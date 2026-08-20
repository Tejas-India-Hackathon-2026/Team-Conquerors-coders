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
  Crown,
  Activity,
  Check,
  Headphones,
  Scale,
  ShieldAlert,
  SlidersHorizontal,
  Star,
  Bookmark
} from 'lucide-react';

import Navbar from './components/Navbar';
import VoiceHero from './components/VoiceHero';
import ExtractedProfile from './components/ExtractedProfile';
import SchemeCard from './components/SchemeCard';
import SchemeDetailModal from './components/SchemeDetailModal';
import SchemeDirectory from './components/SchemeDirectory';
import CscLocatorModal from './components/CscLocatorModal';
import AnalyticsModal from './components/AnalyticsModal';
import PricingModal from './components/PricingModal';
import AutoFormFillModal from './components/AutoFormFillModal';
import SchemeCompareModal from './components/SchemeCompareModal';
import GrievanceHelplineModal from './components/GrievanceHelplineModal';
import InteractiveWizardModal from './components/InteractiveWizardModal';
import SavedSchemesModal from './components/SavedSchemesModal';
import PanchayatFlyerModal from './components/PanchayatFlyerModal';
import AiCopilotFloatingWidget from './components/AiCopilotFloatingWidget';
import TeamModal from './components/TeamModal';
import Footer from './components/Footer';

import { speechRecognizer } from './services/speechRecognition.js';
import { speechSynthesizer } from './services/speechSynthesizer.js';
import { extractProfileFromText, matchSchemes } from './services/aiMatchingEngine.js';
import { SCHEMES_DATABASE } from './data/schemes.js';

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

  // Bookmarking / Offline Saved Schemes State
  const [savedSchemeIds, setSavedSchemeIds] = useState(() => {
    try {
      const saved = localStorage.getItem('yojana_sathi_saved_schemes');
      return saved ? JSON.parse(saved) : ['kanya-utthan', 'pm-kisan-samman'];
    } catch (e) {
      return ['kanya-utthan', 'pm-kisan-samman'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('yojana_sathi_saved_schemes', JSON.stringify(savedSchemeIds));
    } catch (e) {}
  }, [savedSchemeIds]);

  const handleToggleBookmark = (schemeId) => {
    setSavedSchemeIds(prev => {
      if (prev.includes(schemeId)) {
        return prev.filter(id => id !== schemeId);
      } else {
        return [...prev, schemeId];
      }
    });
  };

  const handleClearAllBookmarks = () => {
    setSavedSchemeIds([]);
  };

  // Subscription / Premium State
  const [isPremium, setIsPremium] = useState(true);
  const [isTrialActive, setIsTrialActive] = useState(true);

  // Modals & Navigation
  const [selectedSchemeDetail, setSelectedSchemeDetail] = useState(null);
  const [isCscModalOpen, setIsCscModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isHelplineModalOpen, setIsHelplineModalOpen] = useState(false);
  const [isWizardModalOpen, setIsWizardModalOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [flyerScheme, setFlyerScheme] = useState(null);
  const [autoFillScheme, setAutoFillScheme] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState(null);

  const resultsRef = useRef(null);
  const latestTranscriptRef = useRef('');

  useEffect(() => {
    latestTranscriptRef.current = transcript;
  }, [transcript]);

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

  // Handle Starting Speech — FRESH START (Clears old accumulated text)
  const handleStartListening = () => {
    speechSynthesizer.stop();
    setPlayingAudioId(null);
    setTranscript('');
    latestTranscriptRef.current = '';
    speechRecognizer.reset();

    speechRecognizer.start({
      lang: selectedLanguage,
      resetFresh: true,
      onResult: ({ combined }) => {
        setTranscript(combined);
      },
      onStart: () => setIsListening(true),
      onEnd: () => {
        setIsListening(false);
        if (latestTranscriptRef.current && latestTranscriptRef.current.trim().length >= 4) {
          handleAnalyze(latestTranscriptRef.current);
        }
      },
      onSilenceAutoSearch: (silenceText) => {
        if (silenceText && silenceText.trim().length >= 4) {
          speechRecognizer.stop();
          setIsListening(false);
          handleAnalyze(silenceText);
        }
      },
      onError: () => setIsListening(false)
    });
  };

  // Handle Stopping Speech — Auto Trigger Search!
  const handleStopListening = () => {
    speechRecognizer.stop();
    setIsListening(false);
    if (transcript && transcript.trim().length >= 3) {
      handleAnalyze(transcript);
    }
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

    // Emotion-aware celebratory confetti
    const isDistress = foundProfile?.marital_status === 'widow' || foundProfile?.disability_status || foundProfile?.has_pucca_house === false;
    if (foundMatches.length > 0 && !isDistress) {
      try {
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      } catch (e) {}
    }

    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    // Emotion-aware Voice narration
    setTimeout(() => {
      speechSynthesizer.speakResultsSummary(foundMatches, {
        rawTranscript: text,
        profile: foundProfile,
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
    <div className="min-h-screen flex flex-col bg-[#060911] text-slate-100 font-sans selection:bg-orange-500 selection:text-white relative">
      
      {/* Ambient Lighting Mesh Glow */}
      <div className="ambient-bg-glow" />
      
      {/* Navigation */}
      <Navbar
        onOpenCsc={() => setIsCscModalOpen(true)}
        onOpenAnalytics={() => setIsAnalyticsModalOpen(true)}
        onOpenPricing={() => setIsPricingModalOpen(true)}
        onOpenTeam={() => setIsTeamModalOpen(true)}
        onOpenDirectory={() => setActiveTab('directory')}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenHelpline={() => setIsHelplineModalOpen(true)}
        onOpenWizard={() => setIsWizardModalOpen(true)}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        savedCount={savedSchemeIds.length}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isPremium={isPremium}
        isTrialActive={isTrialActive}
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

            {/* Results Section / Featured Schemes Grid */}
            <div ref={resultsRef} className="scroll-mt-24">
              {hasSearched ? (
                <>
                  {/* Extracted Profile Tags */}
                  <ExtractedProfile
                    profile={extractedProfile}
                    totalMatched={matchedSchemes.length}
                  />

                  {/* Matched Schemes Results Grid */}
                  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                    
                    {/* Auto-Audio Notification Bar */}
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
                            आपके लिए पहचानी गई सरकारी योजनाएं ({matchedSchemes.length})
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
                          onClick={() => setIsCompareModalOpen(true)}
                          className="text-xs font-bold text-cyan-300 hover:text-white bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-900 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
                        >
                          <Scale className="w-4 h-4 text-cyan-400" />
                          <span>योजना तुलना</span>
                        </button>

                        <button
                          onClick={() => setActiveTab('directory')}
                          className="text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5"
                        >
                          <Layers className="w-4 h-4 text-orange-400" />
                          <span>सभी 40+ योजनाएं</span>
                        </button>
                      </div>
                    </div>

                    {/* Matched Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(matchedSchemes.length > 0 ? matchedSchemes : SCHEMES_DATABASE.slice(0, 6)).map((scheme) => (
                        <SchemeCard
                          key={scheme.id}
                          scheme={scheme}
                          isPlayingAudio={playingAudioId === scheme.id}
                          onPlayAudio={handlePlayAudio}
                          onStopAudio={handleStopAudio}
                          onOpenDetails={(s) => setSelectedSchemeDetail(s)}
                          isSaved={savedSchemeIds.includes(scheme.id)}
                          onToggleBookmark={handleToggleBookmark}
                        />
                      ))}
                    </div>

                  </section>
                </>
              ) : (
                /* DEFAULT STATE: Always show Top Featured Schemes on load */
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                        <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                          बिहार एवं केंद्र की लोकप्रिय सरकारी योजनाएं
                        </h2>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        माइक दबाकर अपनी बात बोलें या नीचे दी गई योजनाओं की पूरी जानकारी देखें:
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('directory')}
                      className="text-xs font-bold text-orange-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-orange-500/40 px-4 py-2.5 rounded-2xl transition-all flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <Layers className="w-4 h-4" />
                      <span>सभी 40+ योजनाएं डायरेक्टरी देखें →</span>
                    </button>
                  </div>

                  {/* Featured Schemes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SCHEMES_DATABASE.slice(0, 6).map((scheme) => (
                      <SchemeCard
                        key={scheme.id}
                        scheme={scheme}
                        isPlayingAudio={playingAudioId === scheme.id}
                        onPlayAudio={handlePlayAudio}
                        onStopAudio={handleStopAudio}
                        onOpenDetails={(s) => setSelectedSchemeDetail(s)}
                        isSaved={savedSchemeIds.includes(scheme.id)}
                        onToggleBookmark={handleToggleBookmark}
                      />
                    ))}
                  </div>
                </section>
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
          onOpenAutoFormFill={(s) => {
            setSelectedSchemeDetail(null);
            setAutoFillScheme(s);
          }}
          onOpenFlyer={(s) => {
            setSelectedSchemeDetail(null);
            setFlyerScheme(s);
          }}
          isSaved={savedSchemeIds.includes(selectedSchemeDetail.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* Auto Form Fill & Voice Assistant Modal */}
      {autoFillScheme && (
        <AutoFormFillModal
          scheme={autoFillScheme}
          onClose={() => setAutoFillScheme(null)}
          isPremium={isPremium}
        />
      )}

      {/* Panchayat Notice A4 Flyer Modal */}
      {flyerScheme && (
        <PanchayatFlyerModal
          scheme={flyerScheme}
          onClose={() => setFlyerScheme(null)}
        />
      )}

      {/* Saved / Bookmarked Schemes Drawer */}
      {isSavedModalOpen && (
        <SavedSchemesModal
          onClose={() => setIsSavedModalOpen(false)}
          savedSchemeIds={savedSchemeIds}
          onRemoveBookmark={handleToggleBookmark}
          onClearAllBookmarks={handleClearAllBookmarks}
          onOpenDetails={(s) => setSelectedSchemeDetail(s)}
          isPlayingAudio={playingAudioId}
          onPlayAudio={handlePlayAudio}
          onStopAudio={handleStopAudio}
        />
      )}

      {/* Scheme Comparison Modal */}
      {isCompareModalOpen && (
        <SchemeCompareModal
          onClose={() => setIsCompareModalOpen(false)}
        />
      )}

      {/* Grievance & Helpline Modal */}
      {isHelplineModalOpen && (
        <GrievanceHelplineModal
          onClose={() => setIsHelplineModalOpen(false)}
        />
      )}

      {/* 5-Step Smart Finder Wizard */}
      {isWizardModalOpen && (
        <InteractiveWizardModal
          onClose={() => setIsWizardModalOpen(false)}
          onCompleteWizard={(synthesizedQuery) => {
            setTranscript(synthesizedQuery);
            handleAnalyze(synthesizedQuery);
          }}
        />
      )}

      {/* Pricing / Subscription Modal */}
      {isPricingModalOpen && (
        <PricingModal
          onClose={() => setIsPricingModalOpen(false)}
          isPremium={isPremium}
          onActivateTrial={() => {
            setIsPremium(true);
            setIsTrialActive(true);
          }}
          onActivatePremium={() => {
            setIsPremium(true);
            setIsTrialActive(false);
          }}
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
          onOpenPricing={() => setIsPricingModalOpen(true)}
        />
      )}

      {/* Always-On 24x7 AI Voice Copilot Floating Widget */}
      <AiCopilotFloatingWidget />

      {/* Footer */}
      <Footer onOpenTeam={() => setIsTeamModalOpen(true)} />

    </div>
  );
}
