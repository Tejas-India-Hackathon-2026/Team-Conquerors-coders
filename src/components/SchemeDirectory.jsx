import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Filter, 
  Volume2, 
  ArrowLeft, 
  SlidersHorizontal, 
  Building2, 
  Landmark, 
  Layers, 
  ArrowUpDown,
  CheckCircle2,
  Users,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Scale
} from 'lucide-react';
import { SCHEMES_DATABASE, SCHEME_CATEGORIES } from '../data/schemes';
import SchemeCard from './SchemeCard';

export default function SchemeDirectory({
  onSelectScheme,
  isPlayingAudio,
  onPlayAudio,
  onStopAudio,
  onBackToVoice,
  onOpenCompare,
  savedSchemeIds = [],
  onToggleBookmark
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [beneficiaryFilter, setBeneficiaryFilter] = useState('all');

  const filteredSchemes = SCHEMES_DATABASE.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || scheme.level === selectedLevel;

    let matchesBeneficiary = true;
    if (beneficiaryFilter === 'women') matchesBeneficiary = scheme.category === 'women' || scheme.eligibility?.gender === 'female';
    if (beneficiaryFilter === 'kisan') matchesBeneficiary = scheme.category === 'kisan';
    if (beneficiaryFilter === 'student') matchesBeneficiary = scheme.category === 'student';
    if (beneficiaryFilter === 'elderly') matchesBeneficiary = scheme.category === 'elderly';
    if (beneficiaryFilter === 'disability') matchesBeneficiary = scheme.category === 'disability' || scheme.eligibility?.disability_required;
    if (beneficiaryFilter === 'business') matchesBeneficiary = scheme.category === 'business';
    if (beneficiaryFilter === 'laborer') matchesBeneficiary = scheme.category === 'employment';

    const matchesSearch = 
      scheme.hindiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.benefit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.whoQualifies.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesLevel && matchesBeneficiary && matchesSearch;
  });

  filteredSchemes.sort((a, b) => {
    if (sortBy === 'alpha') {
      return a.hindiName.localeCompare(b.hindiName);
    }
    if (sortBy === 'benefit') {
      const getNum = str => parseInt((str.match(/\d+/g) || ['0']).join(''), 10);
      return getNum(b.benefit) - getNum(a.benefit);
    }
    return 0;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Header & Back Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <button
            onClick={onBackToVoice}
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← आवाज़ से खोजें (Back to Voice Search)</span>
          </button>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              सरकारी योजना डायरेक्टरी (myScheme 2.0)
            </h2>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold shadow-sm">
              {filteredSchemes.length} योजनाएं उपलब्ध
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            बिहार सरकार एवं केंद्र सरकार की सभी योजनाओं की संपूर्ण, सत्यापित एवं आसान सूची
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="योजना, लाभ या दस्तावेज खोजें..."
            className="w-full bg-slate-900/90 border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Filter Row 1: State vs Central Selector + Sort Dropdown */}
      <div className="p-4 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        
        {/* State / Central Level Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setSelectedLevel('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedLevel === 'all' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            सभी स्तर (All 40+)
          </button>
          <button
            onClick={() => setSelectedLevel('state')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              selectedLevel === 'state' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>बिहार राज्य सरकार</span>
          </button>
          <button
            onClick={() => setSelectedLevel('central')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              selectedLevel === 'central' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>केंद्र सरकार (Central)</span>
          </button>
        </div>

        {/* Beneficiary Quick Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'सभी लाभार्थी' },
            { id: 'women', label: '👩 महिला / बेटी' },
            { id: 'kisan', label: '🌾 किसान' },
            { id: 'student', label: '🎓 विद्यार्थी' },
            { id: 'elderly', label: '👴 बुजुर्ग' },
            { id: 'disability', label: '♿ दिव्यांगजन' },
            { id: 'business', label: '💼 कारोबारी' },
            { id: 'laborer', label: '🔨 मजदूर' }
          ].map((b) => (
            <button
              key={b.id}
              onClick={() => setBeneficiaryFilter(b.id)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all border shadow-sm ${
                beneficiaryFilter === b.id
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

      </div>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {SCHEME_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Schemes Cards Grid */}
      {filteredSchemes.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-sm">
          <p className="text-slate-300 font-bold text-base">इस फ़िल्टर में कोई योजना नहीं मिली।</p>
          <p className="text-xs text-slate-500 mt-1">फ़िल्टर रीसेट करें या कोई अन्य कीवर्ड खोजें।</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedLevel('all');
              setBeneficiaryFilter('all');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow"
          >
            सभी फ़िल्टर साफ़ करें (Reset Filters)
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              isPlayingAudio={isPlayingAudio === scheme.id}
              onPlayAudio={onPlayAudio}
              onStopAudio={onStopAudio}
              onOpenDetails={onSelectScheme}
              isSaved={savedSchemeIds.includes(scheme.id)}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      )}

    </section>
  );
}
