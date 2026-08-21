import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Bookmark, 
  Star, 
  ExternalLink, 
  Layers, 
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../data/schemes.js';

export default function SchemesFeedColumn({
  onOpenDetails,
  savedSchemeIds = [],
  onToggleBookmark
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'kisan' | 'student' | 'women' | 'elderly'

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'kisan', label: 'Kisan' },
    { id: 'student', label: 'Students' },
    { id: 'women', label: 'Women' },
    { id: 'elderly', label: 'Senior' }
  ];

  const filteredSchemes = useMemo(() => {
    return SCHEMES_DATABASE.filter(s => {
      const matchesFilter = selectedFilter === 'all' || s.category === selectedFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        s.hindiName.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.benefit.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    }).slice(0, 4);
  }, [searchQuery, selectedFilter]);

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col justify-between text-left select-none space-y-4">
      
      {/* Header & Search Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-black text-white">All Schemes Directory</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-bold">45+ Available</span>
        </div>

        {/* Search Input Box */}
        <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search schemes by name, keyword..."
            className="w-full bg-transparent text-white text-xs font-medium placeholder-slate-500 outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all shrink-0 ${
                selectedFilter === f.id
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Mini Cards Feed */}
      <div className="space-y-2.5">
        {filteredSchemes.map((scheme) => {
          const isSaved = savedSchemeIds.includes(scheme.id);
          return (
            <div
              key={scheme.id}
              onClick={() => onOpenDetails(scheme)}
              className="p-3.5 rounded-2xl bg-slate-950/80 hover:bg-slate-850 border border-slate-800/90 hover:border-blue-500/40 transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-300 truncate">
                    {scheme.hindiName}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                      {scheme.categoryLabel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {scheme.level === 'state' ? 'Bihar Govt' : 'Central Govt'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleBookmark) onToggleBookmark(scheme.id);
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 transition-colors"
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                <span className="text-xs font-black text-emerald-400">
                  {scheme.benefit}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetails(scheme);
                  }}
                  className="px-3 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-[10px] transition-all border border-emerald-500/30"
                >
                  Apply Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Schemes Button */}
      <button
        onClick={() => onOpenDetails(filteredSchemes[0])}
        className="w-full py-2.5 rounded-xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/30 hover:border-blue-400 text-blue-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
      >
        <span>Explore All 45+ Schemes</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

    </div>
  );
}
