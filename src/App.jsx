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
  Bookmark,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';

import DashboardSidebar from './components/DashboardSidebar';
import DashboardRightPanel from './components/DashboardRightPanel';
import DashboardStatsBar from './components/DashboardStatsBar';
import AiHeroHologram from './components/AiHeroHologram';
import ExploreCategoriesGrid from './components/ExploreCategoriesGrid';
import AiSchemeAdvisorColumn from './components/AiSchemeAdvisorColumn';
import SchemesFeedColumn from './components/SchemesFeedColumn';
import ApplicationTrackerColumn from './components/ApplicationTrackerColumn';
import DashboardFooterTrust from './components/DashboardFooterTrust';

import Navbar from './components/Navbar';
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
import DocumentReadinessModal from './components/DocumentReadinessModal';
import ApplicationTrackerModal from './components/ApplicationTrackerModal';
import Footer from './components/Footer';

import { speechRecognizer } from './services/speechRecognition.js';
import { speechSynthesizer } from './services/speechSynthesizer.js';
import { extractProfileFromText, matchSchemes } from './services/aiMatchingEngine.js';
import { SCHEMES_DATABASE } from './data/schemes.js';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'directory'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Voice & AI State
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [extractedProfile, setExtractedProfile] = useState(null);
  const [matchedSchemes, setMatchedSchemes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Bookmarks State
  const [savedSchemeIds, setSavedSchemeIds] = useState(() => {
    try {
      const saved = localStorage.getItem('yojana_sathi_saved_schemes');
      return saved ? JSON.parse(saved) : ['kanya-utthan', 'pm-kisan'];
    } catch (e) {
      return ['kanya-utthan', 'pm-kisan'];
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
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [flyerScheme, setFlyerScheme] = useState(null);
  const [autoFillScheme, setAutoFillScheme] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState(null);

  const resultsRef = useRef(null);
  const latestTranscriptRef = useRef('');

  // Auto-Match Default on Load so user immediately sees results
  useEffect(() => {
    const defaultProfile = extractProfileFromText('मैं बिहार का किसान हूँ');
    const { matchedSchemes: initMatches } = matchSchemes(defaultProfile, 'मैं बिहार का किसान हूँ');
    setExtractedProfile(defaultProfile);
    setMatchedSchemes(initMatches);
  }, []);

  // Voice Recognition Flow with 1.2s Silence Auto-Stop
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
        latestTranscriptRef.current = combined;
      },
      onStart: () => setIsListening(true),
      onEnd: () => {
        setIsListening(false);
        const text = latestTranscriptRef.current;
        if (text && text.trim().length >= 3) {
          handleAnalyze(text);
        }
      },
      onSilenceAutoSearch: (silenceText) => {
        setIsListening(false);
        const text = silenceText || latestTranscriptRef.current;
        if (text && text.trim().length >= 3) {
          handleAnalyze(text);
        }
      },
      onError: () => setIsListening(false)
    });
  };

  const handleStopListening = () => {
    speechRecognizer.stop();
    setIsListening(false);
    const text = latestTranscriptRef.current || transcript;
    if (text && text.trim().length >= 3) {
      handleAnalyze(text);
    }
  };

  // Main Scheme Matcher Dispatcher (Gemini AI + Local Semantic Hybrid)
  const handleAnalyze = async (textToAnalyze) => {
    const query = (textToAnalyze || transcript || '').trim();
    if (!query) return;

    setIsAnalyzing(true);
    speechSynthesizer.stop();
    setPlayingAudioId(null);

    try {
      // 1. Try Live Server API with Gemini 1.5
      const res = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: query, language: selectedLanguage })
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data?.matchedSchemes?.length > 0) {
          setExtractedProfile(json.data.profile);
          setMatchedSchemes(json.data.matchedSchemes);
          setHasSearched(true);
          setIsAnalyzing(false);

          triggerConfetti();
          speakResultsSummary(json.data.matchedSchemes.length);
          scrollToResults();
          return;
        }
      }
    } catch (e) {
      console.warn('Backend match unreachable, using high-performance client engine:', e.message);
    }

    // 2. High-Performance Client AI Semantic Matching Engine
    setTimeout(() => {
      const profile = extractProfileFromText(query);
      const { matchedSchemes: results } = matchSchemes(profile, query);

      setExtractedProfile(profile);
      setMatchedSchemes(results);
      setHasSearched(true);
      setIsAnalyzing(false);

      triggerConfetti();
      speakResultsSummary(results.length);
      scrollToResults();
    }, 250);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const scrollToResults = () => {
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const speakResultsSummary = (count) => {
    const speechText = `आपके विवरण के आधार पर ${count} सरकारी योजनाएं पहचानी गई हैं। सबसे उपयुक्त योजना का विवरण देखने के लिए नीचे कार्ड छुएं।`;
    handlePlayAudio('results-summary', speechText);
  };

  const handlePlayAudio = (id, hindiText) => {
    if (playingAudioId === id) {
      handleStopAudio();
      return;
    }
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

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative flex">
      
      {/* Background Radiance */}
      <div className="aurora-bg fixed inset-0 pointer-events-none" />

      {/* 1. LEFT NAVIGATION SIDEBAR (Desktop) */}
      <div className="hidden md:block shrink-0">
        <DashboardSidebar
          activeView={activeTab}
          setActiveView={setActiveTab}
          onOpenDocs={() => setIsDocsModalOpen(true)}
          onOpenTracker={() => setIsTrackerModalOpen(true)}
          onOpenCsc={() => setIsCscModalOpen(true)}
          onOpenHelpline={() => setIsHelplineModalOpen(true)}
          onOpenCompare={() => setIsCompareModalOpen(true)}
          onOpenWizard={() => setIsWizardModalOpen(true)}
          onOpenPricing={() => setIsPricingModalOpen(true)}
          isPremium={isPremium}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={(lang) => {
            setSelectedLanguage(lang);
            speechRecognizer.setLanguage(lang);
          }}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-slate-950/80 backdrop-blur-md">
          <div className="w-72 bg-[#0b101e] h-full shadow-2xl relative">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-300"
            >
              <X className="w-5 h-5" />
            </button>
            <DashboardSidebar
              activeView={activeTab}
              setActiveView={(v) => {
                setActiveTab(v);
                setIsMobileSidebarOpen(false);
              }}
              onOpenDocs={() => { setIsDocsModalOpen(true); setIsMobileSidebarOpen(false); }}
              onOpenTracker={() => { setIsTrackerModalOpen(true); setIsMobileSidebarOpen(false); }}
              onOpenCsc={() => { setIsCscModalOpen(true); setIsMobileSidebarOpen(false); }}
              onOpenHelpline={() => { setIsHelplineModalOpen(true); setIsMobileSidebarOpen(false); }}
              onOpenCompare={() => { setIsCompareModalOpen(true); setIsMobileSidebarOpen(false); }}
              onOpenWizard={() => { setIsWizardModalOpen(true); setIsMobileSidebarOpen(false); }}
              onOpenPricing={() => { setIsPricingModalOpen(true); setIsMobileSidebarOpen(false); }}
              isPremium={isPremium}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
          </div>
          <div className="flex-1" onClick={() => setIsMobileSidebarOpen(false)} />
        </div>
      )}

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        
        {/* Top Floating Dashboard Header */}
        <header className="sticky top-0 z-20 bg-[#070b14]/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                Namaste, Kishan! 👋
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium hidden sm:block">
                Yojana ki jaankari, ab sabke liye aasaan.
              </p>
            </div>
          </div>

          {/* Header Action Badges */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            <button
              onClick={() => setIsDocsModalOpen(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-emerald-950/40 text-emerald-300 border border-emerald-500/40 hidden sm:flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all"
            >
              <span>दस्तावेज़ चेकर</span>
            </button>

            <button
              onClick={() => setIsTrackerModalOpen(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-blue-950/40 text-blue-300 border border-blue-500/40 hidden sm:flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all"
            >
              <span>स्टेटस ट्रैकर</span>
            </button>

            <button
              onClick={() => setIsTeamModalOpen(true)}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-500/30 transition-all flex items-center gap-1.5"
            >
              <span>टीम</span>
            </button>

            <button
              onClick={() => setIsPricingModalOpen(true)}
              className="px-3 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md flex items-center gap-1"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>PRO</span>
            </button>
          </div>

        </header>

        {/* Scrollable Center Body with Panoramic 3-Column + Right Panel Layout */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {activeTab === 'directory' ? (
            <SchemeDirectory
              onSelectScheme={(scheme) => setSelectedSchemeDetail(scheme)}
              isPlayingAudio={playingAudioId}
              onPlayAudio={handlePlayAudio}
              onStopAudio={handleStopAudio}
              onBackToVoice={() => setActiveTab('dashboard')}
              savedSchemeIds={savedSchemeIds}
              onToggleBookmark={handleToggleBookmark}
            />
          ) : (
            <>
              {/* Top 4 Glowing Stat Cards */}
              <DashboardStatsBar
                totalSchemes={SCHEMES_DATABASE.length}
                totalCategories={12}
                inProgressCount={7}
                totalBenefits="₹ 1,25,000"
              />

              {/* Central Area + Right Sidebar Grid */}
              <div className="flex flex-col xl:flex-row items-start gap-6">
                
                {/* Center Column (Hero + Categories + 3 Power Columns) */}
                <div className="flex-1 space-y-6 w-full min-w-0">
                  
                  {/* AI Hologram Hero Card */}
                  <AiHeroHologram
                    isListening={isListening}
                    onStartListening={handleStartListening}
                    onStopListening={handleStopListening}
                    transcript={transcript}
                    onTranscriptChange={setTranscript}
                    onAnalyze={handleAnalyze}
                    isAnalyzing={isAnalyzing}
                  />

                  {/* Explore Categories Carousel / Grid */}
                  <ExploreCategoriesGrid
                    onSelectCategory={(catId) => {
                      const categoryQuery = `मुझे ${catId} से संबंधित सरकारी योजना बताएं`;
                      setTranscript(categoryQuery);
                      handleAnalyze(categoryQuery);
                    }}
                    onOpenDirectory={() => setActiveTab('directory')}
                  />

                  {/* Lower 3-Column Power Module Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    
                    {/* Column 1: AI Scheme Advisor */}
                    <AiSchemeAdvisorColumn
                      transcript={transcript}
                      matchedSchemes={matchedSchemes}
                      onOpenDetails={(scheme) => setSelectedSchemeDetail(scheme)}
                      onOpenWizard={() => setIsWizardModalOpen(true)}
                    />

                    {/* Column 2: All Schemes Filter Feed */}
                    <SchemesFeedColumn
                      onOpenDetails={(scheme) => setSelectedSchemeDetail(scheme)}
                      savedSchemeIds={savedSchemeIds}
                      onToggleBookmark={handleToggleBookmark}
                    />

                    {/* Column 3: Live Application Tracker */}
                    <ApplicationTrackerColumn
                      onOpenTracker={() => setIsTrackerModalOpen(true)}
                    />

                  </div>

                </div>

                {/* Right Sidebar Panel */}
                <div className="w-full xl:w-80 shrink-0">
                  <DashboardRightPanel
                    onOpenWizard={() => setIsWizardModalOpen(true)}
                    onOpenDocs={() => setIsDocsModalOpen(true)}
                    onOpenTracker={() => setIsTrackerModalOpen(true)}
                    onOpenHelpline={() => setIsHelplineModalOpen(true)}
                    onSelectCategory={(catId) => {
                      const q = `मुझे ${catId} की योजना चाहिए`;
                      setTranscript(q);
                      handleAnalyze(q);
                    }}
                  />
                </div>

              </div>

              {/* Matched Schemes Results Grid (Appears on Voice Search) */}
              <div ref={resultsRef} className="scroll-mt-24 space-y-4 pt-4">
                {hasSearched && (
                  <>
                    <ExtractedProfile
                      profile={extractedProfile}
                      totalMatched={matchedSchemes.length}
                    />

                    {/* Matched Scheme Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {matchedSchemes.map((scheme) => (
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
                  </>
                )}
              </div>

              {/* Bottom Security & Trust Bar */}
              <DashboardFooterTrust />
            </>
          )}

        </main>

        {/* Footer */}
        <Footer onOpenTeam={() => setIsTeamModalOpen(true)} />

      </div>

      {/* ========================================================================= */}
      {/* ALL INTERACTIVE APPLICATION MODALS (100% PRESERVED & CONNECTED) */}
      {/* ========================================================================= */}

      {/* Scheme Detail Modal (Written Guide + Step Voice + YouTube Video Hub) */}
      {selectedSchemeDetail && (
        <SchemeDetailModal
          scheme={selectedSchemeDetail}
          onClose={() => setSelectedSchemeDetail(null)}
          isPlayingAudio={playingAudioId === selectedSchemeDetail.id}
          onPlayAudio={handlePlayAudio}
          onStopAudio={handleStopAudio}
          onOpenAutoFormFill={(scheme) => {
            setSelectedSchemeDetail(null);
            setAutoFillScheme(scheme);
          }}
          onOpenFlyer={(scheme) => {
            setSelectedSchemeDetail(null);
            setFlyerScheme(scheme);
          }}
          isSaved={savedSchemeIds.includes(selectedSchemeDetail.id)}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* Auto Form Fill Modal */}
      {autoFillScheme && (
        <AutoFormFillModal
          scheme={autoFillScheme}
          extractedProfile={extractedProfile}
          onClose={() => setAutoFillScheme(null)}
          selectedLanguage={selectedLanguage}
        />
      )}

      {/* Panchayat Flyer Modal */}
      {flyerScheme && (
        <PanchayatFlyerModal
          scheme={flyerScheme}
          onClose={() => setFlyerScheme(null)}
        />
      )}

      {/* Saved Bookmarks Modal */}
      {isSavedModalOpen && (
        <SavedSchemesModal
          savedSchemeIds={savedSchemeIds}
          onClose={() => setIsSavedModalOpen(false)}
          onSelectScheme={(scheme) => {
            setSelectedSchemeDetail(scheme);
            setIsSavedModalOpen(false);
          }}
          onToggleBookmark={handleToggleBookmark}
          onClearAll={handleToggleBookmark}
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

      {/* Pricing Modal */}
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

      {/* Smart Document Readiness Modal */}
      {isDocsModalOpen && (
        <DocumentReadinessModal
          isOpen={isDocsModalOpen}
          onClose={() => setIsDocsModalOpen(false)}
          onSelectScheme={(scheme) => {
            setSelectedSchemeDetail(scheme);
            setIsDocsModalOpen(false);
          }}
        />
      )}

      {/* Live Application Status Tracker Modal */}
      {isTrackerModalOpen && (
        <ApplicationTrackerModal
          isOpen={isTrackerModalOpen}
          onClose={() => setIsTrackerModalOpen(false)}
        />
      )}

      {/* Team Modal */}
      {isTeamModalOpen && (
        <TeamModal
          onClose={() => setIsTeamModalOpen(false)}
          onOpenPricing={() => setIsPricingModalOpen(true)}
        />
      )}

      {/* 24x7 AI Voice Copilot Floating Widget */}
      <AiCopilotFloatingWidget />

    </div>
  );
}
