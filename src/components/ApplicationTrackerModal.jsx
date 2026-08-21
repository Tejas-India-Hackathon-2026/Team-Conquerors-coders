import React, { useState } from 'react';
import { 
  X, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  HelpCircle, 
  ArrowUpRight, 
  ShieldAlert, 
  FileText,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const TRACKING_PORTALS = [
  {
    id: 'pm-kisan-status',
    title: 'PM-किसान 19वीं किस्त स्थिति (Know Your Status)',
    portal: 'pmkisan.gov.in',
    tag: 'कृषि एवं किसान',
    url: 'https://pmkisan.gov.in/BeneficiaryStatus_New.aspx',
    desc: 'पंजीकरण संख्या या आधार से चेक करें कि आपकी अगली किस्त बैंक में आई या नहीं।'
  },
  {
    id: 'bihar-rtps-status',
    title: 'बिहार RTPS प्रमाण पत्र स्थिति (जाति, आय, निवास)',
    portal: 'serviceonline.bihar.gov.in',
    tag: 'प्रमाण पत्र ट्रैकर',
    url: 'https://serviceonline.bihar.gov.in',
    desc: 'आवेदन संख्या (Application Ref No.) डालकर जांचें कि प्रमाण पत्र बना या नहीं और डाउनलोड करें।'
  },
  {
    id: 'student-credit-status',
    title: 'बिहार स्टूडेंट क्रेडिट कार्ड (DRCC) स्थिति',
    portal: '7nishchay-yuvaupmission.bihar.gov.in',
    tag: 'उच्च शिक्षा लोन',
    url: 'https://www.7nishchay-yuvaupmission.bihar.gov.in',
    desc: '₹4 लाख शिक्षा ऋण आवेदन का जिला निबंधन सह परामर्श केंद्र (DRCC) स्टेटस।'
  },
  {
    id: 'kanya-utthan-status',
    title: 'मुख्यमंत्री कन्या उत्थान (स्नातक / 12th) भुगतान स्थिति',
    portal: 'medhasoft.bih.nic.in',
    tag: 'छात्रा प्रोत्साहन',
    url: 'http://medhasoft.bih.nic.in',
    desc: 'कॉलेज/यूनिवर्सिटी से सत्यापन और खाते में ₹25,000 / ₹50,000 आने की लाइव स्थिति।'
  },
  {
    id: 'rcms-ration-status',
    title: 'बिहार नया राशन कार्ड आवेदन स्थिति (RCMS)',
    portal: 'epds.bihar.gov.in',
    tag: 'राशन कार्ड',
    url: 'http://epds.bihar.gov.in',
    desc: 'प्रखंड आपूर्ति पदाधिकारी (BSO) और SDO स्तर पर नया राशन कार्ड सत्यापन स्टेटस।'
  },
  {
    id: 'ayushman-card-status',
    title: 'आयुष्मान कार्ड e-KYC व डाउनलोड पोर्टल (BIS 2.0)',
    portal: 'beneficiary.nha.gov.in',
    tag: 'मुफ्त इलाज कार्ड',
    url: 'https://beneficiary.nha.gov.in',
    desc: 'राशन कार्ड नंबर डालकर परिवार के सभी सदस्यों का ₹5 लाख आयुष्मान कार्ड बनाएं और डाउनलोड करें।'
  }
];

const CITIZEN_FAQS = [
  {
    q: 'आधार कार्ड में मोबाइल नंबर लिंक नहीं है, तो योजना का लाभ कैसे मिलेगा?',
    a: 'नजदीकी पोस्ट ऑफिस (डाकघर) या CSC केंद्र पर ₹50 देकर तुरंत मोबाइल नंबर लिंक कराएं। कई योजनाओं (जैसे PM-किसान) में आप CSC केंद्र पर अंगूठा लगाकर (बायोमेट्रिक e-KYC) से भी आवेदन कर सकते हैं।'
  },
  {
    q: 'LPC (भू-स्वामित्व प्रमाण पत्र) ऑनलाइन कैसे बनवाएं?',
    a: 'बिहार भूमि सुधार पोर्टल (biharbhumi.bihar.gov.in) पर जाएं। अपनी जमाबंदी संख्या दर्ज करें और "Apply LPC" पर क्लिक करें। CO कार्यालय से 10 से 15 दिनों में ऑनलाइन LPC जारी हो जाता है।'
  },
  {
    q: 'बैंक खाते में DBT / NPCI लिंक नहीं है तो क्या करें?',
    a: 'अपनी बैंक शाखा में जाकर "Aadhaar NPCI Mapping Form" जमा करें, या इंडिया पोस्ट पेमेंट्स बैंक (IPPB) में मात्र 5 मिनट में बायोमेट्रिक से नया DBT-इनेबल्ड खाता खुलवाएं।'
  },
  {
    q: 'दिव्यांगता प्रमाण पत्र और UDID कार्ड कैसे बनता है?',
    a: 'स्वावलंबन पोर्टल (swavlambancard.gov.in) पर ऑनलाइन आवेदन करें। इसके बाद अपने जिला सदर अस्पताल के मेडिकल बोर्ड में जांच करवाएं। वहां से 40%+ का UDID कार्ड जारी होगा।'
  },
  {
    q: 'राशन कार्ड में नए सदस्य का नाम कैसे जोड़ें?',
    a: 'RTPS पोर्टल (serviceonline.bihar.gov.in) पर प्रपत्र "ख" (Form-B) ऑनलाइन भरें और नए सदस्य का आधार कार्ड व जन्म प्रमाण पत्र अपलोड करें।'
  }
];

export default function ApplicationTrackerModal({ isOpen, onClose }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-900/95 border border-slate-700/80 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  आवेदन स्थिति ट्रैकर व समस्या समाधान
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full">
                  Live Hub
                </span>
              </div>
              <p className="text-xs text-slate-400">
                सीधे सरकारी पोर्टल पर अपनी अर्जी का लाइव स्टेटस देखें और ग्रामीण समस्याओं के हल जानें
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
          
          {/* Section 1: Live Status Direct Links */}
          <div>
            <h4 className="text-sm font-black text-blue-400 mb-3 flex items-center gap-2">
              <Search className="w-4 h-4" />
              आधिकारिक आवेदन ट्रैकिंग लिंक्स (1-Click Live Status):
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TRACKING_PORTALS.map(item => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mb-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
                    <span>{item.portal}</span>
                    <span className="text-blue-400 font-bold">{item.tag}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Section 2: Rural Citizen FAQ & Solution Hub */}
          <div>
            <h4 className="text-sm font-black text-amber-400 mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              ग्रामीण नागरिक समाधान केंद्र (Common Problems & Solutions):
            </h4>

            <div className="space-y-2.5">
              {CITIZEN_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-200 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-amber-400 font-black">Q{idx + 1}.</span>
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-3.5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-900/40">
                        <strong className="text-emerald-400">समाधान: </strong>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>🛡️ सभी लिंक्स आधिकारिक सरकारी पोर्टल्स (.gov.in / .nic.in) पर रीडायरेक्ट करते हैं।</span>
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all"
          >
            बंद करें (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
