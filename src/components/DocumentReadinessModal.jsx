import React, { useState } from 'react';
import { 
  X, 
  FileCheck2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  ShieldCheck,
  CheckSquare,
  Square,
  Lock,
  Layers,
  HelpCircle
} from 'lucide-react';
import { SCHEMES_DATABASE } from '../data/schemes';

const CORE_DOCUMENTS = [
  { id: 'aadhaar', name: 'आधार कार्ड (Aadhaar Card)', icon: '🆔', description: 'पहचान व पते का मुख्य प्रमाण', matchKey: 'आधार' },
  { id: 'bank_passbook', name: 'बैंक पासबुक / DBT लिंक खाता', icon: '🏦', description: 'पेंशन, सब्सिडी व नकद लाभ हेतु', matchKey: 'बैंक' },
  { id: 'ration_card', name: 'राशन कार्ड (Ration Card / BPL)', icon: '🍚', description: 'खाद्यान्न, आवास व आयुष्मान हेतु', matchKey: 'राशन' },
  { id: 'land_record', name: 'जमीन की रसीद / LPC / खतियान', icon: '📜', description: 'PM-किसान, फसल सहायता, सिंचाई हेतु', matchKey: 'LPC' },
  { id: 'caste_certificate', name: 'जाति प्रमाण पत्र (Caste Certificate)', icon: '🏛️', description: 'SC/ST/EBC/OBC योजनाओं हेतु', matchKey: 'जाति' },
  { id: 'income_certificate', name: 'आय प्रमाण पत्र (Income Certificate)', icon: '💰', description: 'छात्रवृत्ति व आर्थिक सहायता हेतु', matchKey: 'आय' },
  { id: 'domicile_certificate', name: 'बिहार निवास प्रमाण पत्र (Residential)', icon: '🏡', description: 'बिहार राज्य योजनाओं हेतु', matchKey: 'निवास' },
  { id: 'disability_cert', name: 'दिव्यांगता प्रमाण पत्र / UDID कार्ड', icon: '♿', description: '40%+ दिव्यांग उपकरण व पेंशन हेतु', matchKey: 'दिव्यांग' },
  { id: 'marksheet', name: '10वीं / 12वीं अंक प्रमाण पत्र (Marksheet)', icon: '🎓', description: 'क्रेडिट कार्ड व स्कॉलरशिप हेतु', matchKey: '10' }
];

export default function DocumentReadinessModal({ isOpen, onClose, onSelectScheme }) {
  const [selectedDocIds, setSelectedDocIds] = useState(['aadhaar', 'bank_passbook']);

  if (!isOpen) return null;

  const toggleDoc = (docId) => {
    setSelectedDocIds(prev => 
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  const selectAll = () => {
    setSelectedDocIds(CORE_DOCUMENTS.map(d => d.id));
  };

  const clearAll = () => {
    setSelectedDocIds([]);
  };

  // Evaluate each scheme based on selected documents
  const evaluatedSchemes = SCHEMES_DATABASE.map(scheme => {
    const requiredDocs = scheme.documentsRequired || [];
    let missingCount = 0;
    const missingList = [];

    requiredDocs.forEach(req => {
      const lower = req.toLowerCase();
      let isAvailable = false;

      if (lower.includes('आधार') && selectedDocIds.includes('aadhaar')) isAvailable = true;
      else if (lower.includes('बैंक') && selectedDocIds.includes('bank_passbook')) isAvailable = true;
      else if (lower.includes('राशन') && selectedDocIds.includes('ration_card')) isAvailable = true;
      else if ((lower.includes('lpc') || lower.includes('जमीन') || lower.includes('खतियान') || lower.includes('रसीद')) && selectedDocIds.includes('land_record')) isAvailable = true;
      else if (lower.includes('जाति') && selectedDocIds.includes('caste_certificate')) isAvailable = true;
      else if (lower.includes('आय') && selectedDocIds.includes('income_certificate')) isAvailable = true;
      else if (lower.includes('निवास') && selectedDocIds.includes('domicile_certificate')) isAvailable = true;
      else if ((lower.includes('दिव्यांग') || lower.includes('udid')) && selectedDocIds.includes('disability_cert')) isAvailable = true;
      else if ((lower.includes('अंक') || lower.includes('10') || lower.includes('12') || lower.includes('marksheet')) && selectedDocIds.includes('marksheet')) isAvailable = true;
      else if (!lower.includes('आधार') && !lower.includes('बैंक') && !lower.includes('राशन') && !lower.includes('lpc') && !lower.includes('जाति') && !lower.includes('आय') && !lower.includes('निवास') && !lower.includes('दिव्यांग') && !lower.includes('udid')) {
        // Generic docs like photos
        isAvailable = true;
      }

      if (!isAvailable) {
        missingCount++;
        missingList.push(req);
      }
    });

    return {
      ...scheme,
      missingCount,
      missingList,
      isReadyNow: missingCount === 0
    };
  });

  const readySchemes = evaluatedSchemes.filter(s => s.isReadyNow);
  const unlockableWithOneDoc = evaluatedSchemes.filter(s => s.missingCount === 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-900/95 border border-slate-700/80 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <FileCheck2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  स्मार्ट दस्तावेज़ रेडीनेस चेकर
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                  Haqdarshak Standard
                </span>
              </div>
              <p className="text-xs text-slate-400">
                चुनें आपके पास अभी कौन से कागजात हैं — AI बताएगा आप <strong>आज ही किन योजनाओं में अप्लाई</strong> कर सकते हैं!
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Document Checklist Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-extrabold text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                आपके पास उपलब्ध दस्तावेज़ (Select Available Documents):
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={selectAll}
                  className="text-xs font-bold text-emerald-400 hover:underline"
                >
                  सभी चुनें
                </button>
                <span className="text-slate-600">|</span>
                <button 
                  onClick={clearAll}
                  className="text-xs font-bold text-slate-400 hover:underline"
                >
                  सब हटाएं
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {CORE_DOCUMENTS.map(doc => {
                const isChecked = selectedDocIds.includes(doc.id);
                return (
                  <button
                    key={doc.id}
                    onClick={() => toggleDoc(doc.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-white shadow-sm ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <span className="text-xl shrink-0 mt-0.5">{doc.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm font-bold truncate">
                        {doc.name}
                      </div>
                      <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {doc.description}
                      </div>
                    </div>
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-base">
                {readySchemes.length}
              </div>
              <div>
                <div className="text-xs font-black text-emerald-300">
                  आज ही अप्लाई कर सकते हैं (100% Ready)
                </div>
                <div className="text-[11px] text-slate-400">
                  सभी आवश्यक दस्तावेज़ आपके पास मौजूद हैं
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-base">
                {unlockableWithOneDoc.length}
              </div>
              <div>
                <div className="text-xs font-black text-amber-300">
                  सिर्फ 1 दस्तावेज़ चाहिए (Unlock with 1 Doc)
                </div>
                <div className="text-[11px] text-slate-400">
                  एक अतिरिक्त कागजात बनवाते ही ये योजनाएं खुल जाएंगी
                </div>
              </div>
            </div>
          </div>

          {/* 🟢 Schemes Ready Today */}
          <div>
            <h4 className="text-sm font-black text-emerald-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              आज ही आवेदन योग्य योजनाएं ({readySchemes.length}):
            </h4>

            {readySchemes.length === 0 ? (
              <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800 text-center text-slate-400 text-xs">
                कृपया ऊपर कम से कम आधार और बैंक पासबुक चुनें।
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {readySchemes.slice(0, 8).map(scheme => (
                  <div 
                    key={scheme.id}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-emerald-500/30 hover:border-emerald-400 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-extrabold text-white line-clamp-1">
                          {scheme.hindiName}
                        </span>
                        <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                          {scheme.benefit}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 line-clamp-1 mb-2">
                        {scheme.tagline}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onSelectScheme(scheme);
                        onClose();
                      }}
                      className="mt-2 text-xs font-bold text-emerald-400 hover:text-white flex items-center gap-1.5 self-end"
                    >
                      आवेदन विधि देखें <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🟡 Schemes Needing Just 1 More Document */}
          {unlockableWithOneDoc.length > 0 && (
            <div>
              <h4 className="text-sm font-black text-amber-400 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                सिर्फ 1 दस्तावेज़ से खुलने वाली योजनाएं ({unlockableWithOneDoc.length}):
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {unlockableWithOneDoc.slice(0, 6).map(scheme => (
                  <div 
                    key={scheme.id}
                    className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/30 hover:border-amber-400 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-extrabold text-white line-clamp-1">
                        {scheme.hindiName}
                      </span>
                      <span className="text-[10px] font-bold text-amber-400">
                        {scheme.benefit}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 mt-2">
                      <strong>जरूरत:</strong> {scheme.missingList[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>💡 बिहार RTPS पोर्टल (serviceonline.bihar.gov.in) से आय, जाति व निवास ऑनलाइन बनवाएं।</span>
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all"
          >
            बंद करें (Done)
          </button>
        </div>

      </div>
    </div>
  );
}
