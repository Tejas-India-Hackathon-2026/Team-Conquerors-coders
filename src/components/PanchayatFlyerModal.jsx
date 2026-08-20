import React from 'react';
import { X, Printer, Share2, QrCode, FileText, CheckCircle2, Building2, PhoneCall } from 'lucide-react';

export default function PanchayatFlyerModal({ scheme, onClose }) {
  if (!scheme) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = `📢 *ग्राम पंचायत जन सूचना (Panchayat Public Notice)*\n\n📌 *योजना:* ${scheme.hindiName}\n💰 *कुल सरकारी लाभ:* ${scheme.benefit}\n🎯 *पात्रता:* ${scheme.whoQualifies}\n📄 *दस्तावेज:* ${scheme.documentsRequired?.join(', ')}\n🔗 *पोर्टल:* ${scheme.officialLink}\n\n_योजना साथी - बिहार के हर नागरिक का हक़_`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
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
          <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-4 h-4" />
            <span>ग्राम पंचायत सूचना पर्चा (A4 Village Notice Flyer)</span>
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          पंचायत भवन व चौपाल हेतु आधिकारिक सूचना पर्चा
        </h2>
        <p className="text-xs text-slate-400 mb-5">
          इस A4 पर्चे को प्रिंट करके पंचायत भवन, वसुधा केंद्र या सार्वजनिक स्थल पर चिपकाया जा सकता है:
        </p>

        {/* Print Layout Sheet (A4 Flyer Look) */}
        <div className="p-6 sm:p-8 bg-white text-slate-900 rounded-2xl shadow-2xl border-4 border-double border-orange-800 font-serif my-4">
          
          {/* Header Seal */}
          <div className="text-center pb-4 border-b-2 border-slate-900">
            <div className="text-xs font-extrabold tracking-widest text-slate-700 uppercase">
              बिहार सरकार / भारत सरकार — जन कल्याण अभियान
            </div>
            <div className="text-xl sm:text-2xl font-black text-orange-800 mt-1">
              {scheme.hindiName}
            </div>
            <div className="text-xs font-bold text-slate-600">
              ({scheme.name}) | स्तर: {scheme.level === 'state' ? 'बिहार राज्य सरकार' : 'केंद्र सरकार'}
            </div>
          </div>

          {/* Big Benefit Box */}
          <div className="my-4 p-4 bg-orange-50 border-2 border-dashed border-orange-500 rounded-xl text-center">
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider block">
              ★ कुल सरकारी अनुदान / लाभ ★
            </span>
            <div className="text-2xl sm:text-3xl font-black text-orange-700 mt-0.5">
              {scheme.benefit}
            </div>
            <p className="text-xs text-slate-800 mt-1 font-sans font-medium">
              {scheme.benefitDetail}
            </p>
          </div>

          {/* Eligibility & Qualifications */}
          <div className="mb-4">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-400 pb-1 mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              कौन-कौन आवेदन कर सकते हैं (पात्रता)?
            </h4>
            <p className="text-xs text-slate-800 font-sans leading-relaxed">
              {scheme.whoQualifies}
            </p>
          </div>

          {/* Documents Checklist Grid */}
          <div className="mb-4">
            <h4 className="font-black text-sm text-slate-900 border-b border-slate-400 pb-1 mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-700" />
              आवेदन हेतु आवश्यक कागजात (Documents Required):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-sans">
              {scheme.documentsRequired?.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 p-1.5 bg-slate-100 rounded">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-800 font-medium">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Notice & QR Code */}
          <div className="pt-3 border-t-2 border-slate-900 flex items-center justify-between gap-4 text-xs font-sans">
            <div>
              <p className="font-bold text-slate-900">आवेदन कहाँ करें?</p>
              <p className="text-[11px] text-slate-700">
                नजदीकी वसुधा केंद्र (CSC), प्रखंड (ब्लॉक) कार्यालय या सीधे आधिकारिक पोर्टल पर।
              </p>
              <p className="text-[10px] text-slate-600 mt-0.5">
                टोल-फ्री हेल्पलाइन: <strong>1076</strong> (बिहार सीएम हेल्पलाइन) / <strong>1800-180-1551</strong>
              </p>
            </div>

            <div className="text-center shrink-0">
              <div className="w-16 h-16 bg-slate-100 border border-slate-400 rounded flex items-center justify-center mx-auto mb-1">
                <QrCode className="w-12 h-12 text-slate-900" />
              </div>
              <span className="text-[9px] font-bold text-slate-600">स्कैन कर आवेदन करें</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <button
            onClick={handleWhatsAppShare}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
          >
            <Share2 className="w-4 h-4" />
            <span>व्हाट्सएप पर शेयर करें</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>A4 सूचना पर्चा प्रिंट / PDF सेव करें</span>
          </button>
        </div>

      </div>
    </div>
  );
}
