import React, { useState } from 'react';
import { X, Scale, CheckCircle2, ArrowRight, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';
import { SCHEMES_DATABASE } from '../data/schemes';

export default function SchemeCompareModal({ onClose, preSelectedScheme = null }) {
  const [scheme1Id, setScheme1Id] = useState(preSelectedScheme?.id || 'udyami-yojana');
  const [scheme2Id, setScheme2Id] = useState('pm-mudra-yojana');

  const s1 = SCHEMES_DATABASE.find(s => s.id === scheme1Id) || SCHEMES_DATABASE[0];
  const s2 = SCHEMES_DATABASE.find(s => s.id === scheme2Id) || SCHEMES_DATABASE[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-blue-400" />
            <span>योजना तुलना टूल (Scheme Comparison Engine)</span>
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white">
          दो सरकारी योजनाओं की आमने-सामने तुलना करें
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-6 font-medium">
          पता लगाएं कि आपके लिए कौन सी योजना अधिक फायदेमंद है और किसमें ज्यादा सब्सिडी या अनुदान मिलता है:
        </p>

        {/* Scheme Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          
          <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-orange-500/30">
            <label className="block text-xs font-bold text-orange-400 mb-1.5 uppercase">पहली योजना चुनें (Scheme 1):</label>
            <select
              value={scheme1Id}
              onChange={(e) => setScheme1Id(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 font-bold shadow-sm"
            >
              {SCHEMES_DATABASE.map((s) => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                  {s.hindiName} ({s.categoryLabel})
                </option>
              ))}
            </select>
          </div>

          <div className="p-3.5 bg-slate-950/70 rounded-2xl border border-blue-500/30">
            <label className="block text-xs font-bold text-blue-400 mb-1.5 uppercase">दूसरी योजना चुनें (Scheme 2):</label>
            <select
              value={scheme2Id}
              onChange={(e) => setScheme2Id(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-blue-500 font-bold shadow-sm"
            >
              {SCHEMES_DATABASE.map((s) => (
                <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                  {s.hindiName} ({s.categoryLabel})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Comparison Table */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden text-xs shadow-sm bg-slate-950/50">
          
          {/* Row 1: Header Titles */}
          <div className="grid grid-cols-2 bg-slate-950 border-b border-slate-800 p-4 font-black text-sm">
            <div className="text-orange-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              {s1.hindiName}
            </div>
            <div className="text-blue-400 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              {s2.hindiName}
            </div>
          </div>

          {/* Row 2: Benefit Comparison */}
          <div className="grid grid-cols-2 p-4 border-b border-slate-800 bg-slate-900/60 gap-4">
            <div>
              <span className="text-slate-400 uppercase tracking-wider block text-[10px] font-bold">सरकारी लाभ (Total Benefit):</span>
              <span className="text-base font-black text-orange-300 block mt-0.5">{s1.benefit}</span>
              <p className="text-slate-400 text-[11px] mt-1">{s1.benefitDetail}</p>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block text-[10px] font-bold">सरकारी लाभ (Total Benefit):</span>
              <span className="text-base font-black text-blue-300 block mt-0.5">{s2.benefit}</span>
              <p className="text-slate-400 text-[11px] mt-1">{s2.benefitDetail}</p>
            </div>
          </div>

          {/* Row 3: Eligibility & Age */}
          <div className="grid grid-cols-2 p-4 border-b border-slate-800 bg-slate-950/40 gap-4">
            <div>
              <span className="text-slate-400 uppercase tracking-wider block text-[10px] font-bold">पात्रता एवं उम्र सीमा:</span>
              <span className="text-white font-bold block mt-0.5">{s1.whoQualifies}</span>
              <span className="text-[11px] text-slate-400 block mt-1">उम्र: {s1.eligibility?.min_age || 18} से {s1.eligibility?.max_age || 100} वर्ष</span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block text-[10px] font-bold">पात्रता एवं उम्र सीमा:</span>
              <span className="text-white font-bold block mt-0.5">{s2.whoQualifies}</span>
              <span className="text-[11px] text-slate-400 block mt-1">उम्र: {s2.eligibility?.min_age || 18} से {s2.eligibility?.max_age || 100} वर्ष</span>
            </div>
          </div>

          {/* Row 4: Land & Prerequisites */}
          <div className="grid grid-cols-2 p-4 border-b border-slate-800 bg-slate-900/60 gap-4">
            <div>
              <span className="text-slate-400 uppercase tracking-wider block text-[10px] font-bold">जमीन / संपत्ति अनिवार्यता:</span>
              <span className="font-bold block mt-0.5 text-slate-200">
                {s1.eligibility?.land_required ? '⚠️ कृषि योग्य जमीन जरूरी' : '✓ किसी जमीन की जरूरत नहीं'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block text-[10px] font-bold">जमीन / संपत्ति अनिवार्यता:</span>
              <span className="font-bold block mt-0.5 text-slate-200">
                {s2.eligibility?.land_required ? '⚠️ कृषि योग्य जमीन जरूरी' : '✓ किसी जमीन की जरूरत नहीं'}
              </span>
            </div>
          </div>

          {/* Row 5: Documents Required */}
          <div className="grid grid-cols-2 p-4 border-b border-slate-800 bg-slate-950/40 gap-4">
            <div>
              <span className="text-slate-400 uppercase tracking-wider block text-[10px] font-bold">जरूरी दस्तावेज:</span>
              <ul className="mt-1 space-y-1 text-[11px] text-slate-300">
                {s1.documentsRequired?.slice(0, 4).map((d, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-slate-400 uppercase tracking-wider block text-[10px] font-bold">जरूरी दस्तावेज:</span>
              <ul className="mt-1 space-y-1 text-[11px] text-slate-300">
                {s2.documentsRequired?.slice(0, 4).map((d, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-blue-400 shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Row 6: Official Application Portals */}
          <div className="grid grid-cols-2 p-4 bg-slate-900/90 gap-4 items-center">
            <div>
              <a
                href={s1.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 underline"
              >
                <span>{s1.name} पोर्टल पर जाएं</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div>
              <a
                href={s2.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 underline"
              >
                <span>{s2.name} पोर्टल पर जाएं</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

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
