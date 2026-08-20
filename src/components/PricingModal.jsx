import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  Check, 
  Sparkles, 
  Zap, 
  Building2, 
  ShieldCheck, 
  Mic, 
  Languages, 
  FileText, 
  Printer, 
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export default function PricingModal({ onClose, isPremium, onActivateTrial, onActivatePremium }) {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [justActivated, setJustActivated] = useState(false);

  const handleActivate = (planType) => {
    if (planType === 'trial') {
      onActivateTrial();
    } else {
      onActivatePremium();
    }
    setJustActivated(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider mb-3">
            <Crown className="w-4 h-4 text-amber-600" />
            <span>सब्सक्रिप्शन व प्रीमियम प्लान (Revenue Engine)</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            साइबर कैफे की लूट बंद — <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 bg-clip-text text-transparent">
              घर बैठे आवाज़ से भरें सरकारी फॉर्म
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
            गांव के साइबर कैफे 1 फॉर्म भरने का ₹200 से ₹300 लेते हैं। योजना साथी में मात्र ₹19 या ₹29/माह में पूरा काम खुद आवाज़ से करें।
          </p>
        </div>

        {/* Comparison Alert Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-start gap-2.5 text-slate-600">
            <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-black shrink-0">✕</div>
            <div>
              <span className="font-bold text-rose-900 block">साइबर कैफे / दलाल:</span>
              ₹200-₹300 प्रति फॉर्म, लंबी लाइन, स्पेलिंग की गलतियां जिससे फॉर्म रिजेक्ट हो जाता है।
            </div>
          </div>

          <div className="flex items-start gap-2.5 text-slate-700">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black shrink-0">✓</div>
            <div>
              <span className="font-bold text-emerald-900 block">योजना साथी AI प्रीमियम:</span>
              ₹19 या ₹29/माह, अपनी मातृभाषा (भोजपुरी/मैथिली) में स्टेप-बाय-स्टेप आवाज़ गाइड + AI ऑटो-फिल!
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          
          {/* Plan 1: Free Tier */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">मुफ्त सेवा (Free)</div>
              <div className="text-2xl font-black text-slate-900 mt-1">₹0 <span className="text-xs font-normal text-slate-500">/ हमेशा फ्री</span></div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">बुनियादी योजना खोज व जानकारी</p>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>आवाज़ से 40+ योजनाओं की खोज</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>पात्रता चेक व कारण</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>दस्तावेज चेकलिस्ट</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <X className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>आवाज़ से स्टेप-बाय-स्टेप फॉर्म फिलिंग</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <X className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>AI दस्तावेज ऑटो-स्कैन</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              वर्तमान प्लान (Current)
            </button>
          </div>

          {/* Plan 2: Citizen Premium (Highlighted) */}
          <div className="relative bg-gradient-to-b from-orange-50 via-amber-50 to-white border-2 border-orange-500 rounded-3xl p-5 flex flex-col justify-between shadow-xl ring-2 ring-orange-400/20 scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow">
              सर्वाधिक लोकप्रिय (Most Popular)
            </div>

            <div>
              <div className="text-xs font-black text-orange-800 uppercase tracking-wider flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-orange-600" /> नागरिक प्रीमियम (Citizen Pro)
              </div>
              <div className="text-3xl font-black text-slate-900 mt-1">
                ₹29 <span className="text-xs font-bold text-slate-500">/ महीना</span>
                <span className="text-[11px] font-extrabold text-emerald-700 block mt-0.5">या ₹19 प्रति फॉर्म</span>
              </div>
              <p className="text-[11px] text-orange-800 font-bold mt-1">3 दिन का फ्री ट्रायल शामिल!</p>

              <div className="mt-4 pt-4 border-t border-orange-200 space-y-2.5 text-xs text-slate-800">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="font-bold">आवाज़ से पूरा फॉर्म भरने का AI गाइड</span>
                </div>
                <div className="flex items-center gap-2">
                  <Languages className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>भोजपुरी, मैथिली, मगही 24x7 सपोर्ट</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>AI डॉक्यूमेंट स्कैनर (आधार/रसीद ऑटो-फिल)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>1-क्लिक आधिकारिक आवेदन पर्ची (PDF Slip)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>व्हाट्सएप पर तत्काल स्टेटस अलर्ट</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button
                onClick={() => handleActivate('trial')}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{justActivated ? 'ट्रायल एक्टिवेट हो गया!' : '3 दिन का फ्री ट्रायल शुरू करें'}</span>
              </button>

              <button
                onClick={() => handleActivate('premium')}
                className="w-full py-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 font-bold text-xs transition-colors"
              >
                ₹29 में तुरंत प्रीमियम खरीदें
              </button>
            </div>
          </div>

          {/* Plan 3: CSC & Panchayat Enterprise */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-blue-600" /> CSC / पंचायत SaaS
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">₹499 <span className="text-xs font-normal text-slate-500">/ महीना</span></div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">मुखिया, CSC VLEs एवं NGO कैम्प्स</p>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>असीमित फॉर्म ऑटो-फिलिंग</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>पूरे गांव/पंचायत का बल्क प्रोफाइलिंग</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>सरकारी पोर्टल पर डायरेक्ट XML/JSON एक्सपोर्ट</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>जिलेवार रीच एनालिटिक्स डैशबोर्ड</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleActivate('enterprise')}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              CSC Enterprise शुरू करें
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">100% सुरक्षित भुगतान | UPI, QR, PhonePe, Paytm समर्थित</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 underline font-bold"
          >
            अभी नहीं (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
