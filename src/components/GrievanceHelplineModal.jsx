import React from 'react';
import { X, PhoneCall, ShieldAlert, AlertTriangle, ExternalLink, Building2, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function GrievanceHelplineModal({ onClose }) {
  const helplines = [
    {
      title: "बिहार मुख्यमंत्री जन शिकायत (CM Helpline)",
      number: "1076",
      desc: "किसी भी योजना में रिश्वत मांगने, ब्लॉक में काम न होने या शिकायत दर्ज कराने हेतु।",
      badge: "बिहार सरकार 24x7",
      color: "bg-orange-50/80 border-orange-200 text-orange-900"
    },
    {
      title: "किसान कॉल सेंटर (Kisan Call Center)",
      number: "1800-180-1551",
      desc: "फसल नुकसान, बीज सब्सिडी, खाद एवं PM-Kisan संबंधी कृषि विशेषज्ञों से निःशुल्क सलाह।",
      badge: "कृषि मंत्रालय टोल-फ्री",
      color: "bg-emerald-50/80 border-emerald-200 text-emerald-900"
    },
    {
      title: "आयुष्मान भारत स्वास्थ्य हेल्पलाइन",
      number: "14555",
      desc: "गोल्डन कार्ड बनाने, सूचीबद्ध अस्पताल खोजने और मुफ्त इलाज में बाधा आने पर तुरंत मदद।",
      badge: "NHA 24x7 टोल-फ्री",
      color: "bg-rose-50/80 border-rose-200 text-rose-900"
    },
    {
      title: "राष्ट्रीय साइबर वित्तीय धोखाधड़ी हेल्पलाइन",
      number: "1930",
      desc: "योजना के नाम पर ऑनलाइन फ्रॉड, फर्जी OTP या बैंक खाते से पैसे कटने पर तत्काल कॉल करें।",
      badge: "गृह मंत्रालय भारत सरकार",
      color: "bg-red-50/80 border-red-200 text-red-900"
    },
    {
      title: "महिला हेल्पलाइन (Women Helpline)",
      number: "181",
      desc: "घरेलू हिंसा, महिला उत्पीड़न, कानूनी सहायता एवं मातृत्व योजनाओं में आपातकालीन सहायता।",
      badge: "महिला एवं बाल विकास",
      color: "bg-purple-50/80 border-purple-200 text-purple-900"
    },
    {
      title: "दिव्यांगजन पुनर्वास हेल्पलाइन (ADIP/ALIMCO)",
      number: "1800-180-5122",
      desc: "मुफ्त मोटराइज्ड ट्राइसाइकिल, कृत्रिम अंग, व्हीलचेयर और UDID कार्ड सहायता।",
      badge: "दिव्यांगजन सशक्तिकरण",
      color: "bg-blue-50/80 border-blue-200 text-blue-900"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>जन शिकायत एवं आपातकालीन हेल्पलाइन डायरेक्टरी</span>
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          अधिकारी काम न करे या पैसे मांगे? सीधे शिकायत करें
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 mb-6 font-medium">
          सरकारी योजनाओं में दलाली और अवैध वसूली के खिलाफ सरकार के 100% आधिकारिक टोल-फ्री नंबर व ऑनलाइन पोर्टल:
        </p>

        {/* Helplines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {helplines.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl ${item.color} border flex flex-col justify-between shadow-sm`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="font-extrabold text-xs">{item.title}</h4>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 shadow-sm border border-slate-200">
                    {item.badge}
                  </span>
                </div>
                <p className="text-[11px] opacity-80 leading-snug mb-3 font-medium">
                  {item.desc}
                </p>
              </div>

              <a
                href={`tel:${item.number}`}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>कॉल करें: {item.number}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Online Grievance Portals */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-orange-600" />
            ऑनलाइन लिखित शिकायत दर्ज करने के आधिकारिक पोर्टल:
          </h4>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://lokshikayat.bihar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs text-slate-900 flex items-center justify-between font-bold shadow-sm transition-all"
            >
              <span>बिहार लोक शिकायत निवारण (RTPS)</span>
              <ExternalLink className="w-4 h-4 text-orange-600" />
            </a>

            <a
              href="https://pgportal.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-3.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs text-slate-900 flex items-center justify-between font-bold shadow-sm transition-all"
            >
              <span>केंद्रीय जन शिकायत पोर्टल (CPGRAMS)</span>
              <ExternalLink className="w-4 h-4 text-blue-600" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-200 text-center flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
          >
            बंद करें (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
