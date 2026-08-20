import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Printer, Sparkles, ExternalLink, Volume2, VolumeX, Star } from 'lucide-react';
import { SCHEMES_DATABASE } from '../data/schemes';

export default function SavedSchemesModal({
  onClose,
  savedSchemeIds = [],
  onRemoveBookmark,
  onClearAllBookmarks,
  onOpenDetails,
  isPlayingAudio,
  onPlayAudio,
  onStopAudio
}) {
  const savedSchemes = SCHEMES_DATABASE.filter(s => savedSchemeIds.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span>आपकी पसंदीदा योजनाएं (Saved Schemes)</span>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              सहेजी गई सरकारी योजनाएं ({savedSchemes.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-medium">
              ऑफ़लाइन उपलब्ध — आप जब चाहें इनकी जानकारी देख सकते हैं या आवेदन पर्ची निकाल सकते हैं:
            </p>
          </div>

          {savedSchemes.length > 0 && (
            <button
              onClick={onClearAllBookmarks}
              className="text-xs text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 self-start sm:self-auto bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>सभी हटाएं (Clear All)</span>
            </button>
          )}
        </div>

        {/* Saved List */}
        {savedSchemes.length === 0 ? (
          <div className="text-center py-16 bg-slate-950/60 border border-slate-800 rounded-3xl p-6">
            <Bookmark className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-300">कोई योजना सेव नहीं की गई है</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              होमपेज या डायरेक्टरी में किसी भी योजना कार्ड पर बने स्टार (⭐) बटन को दबाकर उसे यहाँ सेव करें।
            </p>
            <button
              onClick={onClose}
              className="mt-5 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20"
            >
              योजनाएं देखें (Browse Schemes)
            </button>
          </div>
        ) : (
          <div className="space-y-3.5">
            {savedSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="p-4 bg-slate-950/70 hover:bg-slate-850 rounded-2xl border border-slate-800 hover:border-orange-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group shadow-sm"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${scheme.badgeColor}`}>
                      {scheme.categoryLabel}
                    </span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {scheme.level === 'state' ? 'बिहार सरकार' : 'केंद्र सरकार'}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-black text-white group-hover:text-orange-300 transition-colors">
                    {scheme.hindiName}
                  </h4>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">
                    लाभ: {scheme.benefit}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {scheme.tagline}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <button
                    onClick={() => {
                      if (isPlayingAudio === scheme.id) {
                        onStopAudio();
                      } else {
                        onPlayAudio(scheme.id, scheme.audioExplanationHindi);
                      }
                    }}
                    className={`p-2 rounded-xl text-xs font-bold transition-all ${
                      isPlayingAudio === scheme.id
                        ? 'bg-orange-500 text-white animate-pulse'
                        : 'bg-slate-900 hover:bg-slate-800 text-orange-400 border border-slate-800'
                    }`}
                    title="आवाज़ में सुनें"
                  >
                    {isPlayingAudio === scheme.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenDetails(scheme);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
                  >
                    <span>विवरण</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRemoveBookmark(scheme.id)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors"
                    title="हटाएं"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            बंद करें (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
