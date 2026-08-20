import React, { useState } from 'react';
import { Search, Sparkles, Filter, Volume2, ArrowLeft } from 'lucide-react';
import { SCHEMES_DATABASE, SCHEME_CATEGORIES } from '../data/schemes';
import SchemeCard from './SchemeCard';

export default function SchemeDirectory({
  onSelectScheme,
  isPlayingAudio,
  onPlayAudio,
  onStopAudio,
  onBackToVoice
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSchemes = SCHEMES_DATABASE.filter(scheme => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesSearch = 
      scheme.hindiName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.benefit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.whoQualifies.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Back Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={onBackToVoice}
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← आवाज़ से खोजें (Back to Voice Search)</span>
          </button>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            सरकारी योजना डायरेक्टरी (Bihar & Central)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            सत्यापित 10+ सरकारी योजनाओं की पूरी सूची, पात्रता और लाभ
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="योजना का नाम या कीवर्ड खोजें..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
        {SCHEME_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
            }`}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Schemes Grid */}
      {filteredSchemes.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 border border-slate-800 rounded-3xl">
          <p className="text-slate-400 text-sm">कोई योजना नहीं मिली। कृपया कोई अन्य शब्द खोजें।</p>
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
            />
          ))}
        </div>
      )}

    </section>
  );
}
