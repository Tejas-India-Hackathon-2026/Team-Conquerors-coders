import React, { useState } from 'react';
import { X, MapPin, PhoneCall, Building, ExternalLink, ShieldCheck, Info } from 'lucide-react';
import { BIHAR_DISTRICTS, CSC_HELPLINES } from '../data/biharDistricts';

export default function CscLocatorModal({ onClose }) {
  const [selectedDistrictId, setSelectedDistrictId] = useState('jamui');

  const currentDistrict = BIHAR_DISTRICTS.find(d => d.id === selectedDistrictId) || BIHAR_DISTRICTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shadow-sm">
            <MapPin className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              बिहार CSC एवं DRCC केंद्र खोजें
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              फॉर्म भरने, e-KYC एवं भौतिक सत्यापन हेतु निकटतम केंद्र
            </p>
          </div>
        </div>

        {/* District Selector */}
        <div className="my-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            अपना जिला चुनें (Select Bihar District):
          </label>
          <select
            value={selectedDistrictId}
            onChange={(e) => setSelectedDistrictId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-3.5 text-sm sm:text-base text-white focus:outline-none focus:border-emerald-500 transition-all font-bold shadow-sm"
          >
            {BIHAR_DISTRICTS.map((dist) => (
              <option key={dist.id} value={dist.id} className="bg-slate-900 text-white">
                {dist.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selected District Details Card */}
        <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 my-4 space-y-3 shadow-sm">
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">
              जिला मुख्यालय: {currentDistrict.headquarters}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {currentDistrict.cscCount}+ सक्रिय CSC केंद्र
            </span>
          </div>

          <div className="flex items-start gap-2.5 pt-2">
            <Building className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-white">
                DRCC केंद्र (जिला निबंधन एवं परामर्श केंद्र):
              </h5>
              <p className="text-xs text-slate-200 mt-0.5 font-bold">
                {currentDistrict.drccLocation}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                (स्टूडेंट क्रेडिट कार्ड, उद्यमी योजना व कुशल युवा कार्यक्रम सत्यापन हेतु)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-2 border-t border-emerald-500/20">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300">
              जिला हेल्पलाइन: <span className="font-bold text-white">{currentDistrict.helpline}</span>
            </span>
          </div>

        </div>

        {/* State / National Helplines */}
        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-orange-400" />
            महत्वपूर्ण सरकारी टोल-फ्री हेल्पलाइन नंबर:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-medium">CSC राष्ट्रीय सहायता:</span>
              <span className="font-bold text-white">{CSC_HELPLINES.nationalTollFree}</span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 font-medium">बिहार RTPS सेवा:</span>
              <span className="font-bold text-white">{CSC_HELPLINES.biharRTPSHelp}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
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
