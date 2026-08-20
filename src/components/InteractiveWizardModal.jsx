import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  MapPin, 
  ShieldCheck, 
  Briefcase, 
  Wallet,
  Volume2
} from 'lucide-react';
import { speechSynthesizer } from '../services/speechSynthesizer';

export default function InteractiveWizardModal({ onClose, onCompleteWizard }) {
  const [step, setStep] = useState(1);
  const [wizardData, setWizardData] = useState({
    gender: 'female',
    age: 22,
    location: 'rural',
    socialCategory: 'general',
    isDivyang: false,
    occupation: 'student',
    educationLevel: '12th_pass',
    hasRationCard: true,
    incomeLevel: 'low'
  });

  const handleSelect = (key, value) => {
    setWizardData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      let synthesized = "";
      if (wizardData.gender === 'female') synthesized += "महिला ";
      else synthesized += "पुरुष ";
      synthesized += `उम्र ${wizardData.age} वर्ष `;
      if (wizardData.location === 'rural') synthesized += "ग्रामीण ";
      else synthesized += "शहरी ";
      if (wizardData.isDivyang) synthesized += "दिव्यांगजन ";
      if (wizardData.socialCategory !== 'general') synthesized += `${wizardData.socialCategory} वर्ग `;
      
      if (wizardData.occupation === 'student') synthesized += "विद्यार्थी 12वीं पास छात्रवृत्ति ";
      if (wizardData.occupation === 'farmer') synthesized += "किसान खेती जमीन ";
      if (wizardData.occupation === 'laborer') synthesized += "दिहाड़ी मजदूर श्रमिक लेबर कार्ड ";
      if (wizardData.occupation === 'shopkeeper') synthesized += "दुकानदार मुद्रा लोन ";
      if (wizardData.occupation === 'unemployed') synthesized += "बेरोजगार युवा उद्यमी रोजगार ";
      if (wizardData.occupation === 'elderly') synthesized += "बुजुर्ग वृद्ध पेंशन ";

      if (wizardData.hasRationCard) synthesized += "राशन कार्ड अस्पताल इलाज ";

      onCompleteWizard(synthesized);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span>myScheme 5-Step Smart Finder (योजना खोजक)</span>
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white">
          5 आसान सवालों में अपनी सभी सरकारी योजनाएं खोजें
        </h2>
        
        {/* Progress Dots */}
        <div className="flex items-center gap-2 my-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all ${
                i === step ? 'bg-orange-500 shadow-lg shadow-orange-500/50' : i < step ? 'bg-emerald-500' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Gender & Age */}
        {step === 1 && (
          <div className="space-y-4 my-6">
            <h3 className="text-sm font-bold text-slate-200">1. आपका लिंग और उम्र क्या है?</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSelect('gender', 'female')}
                className={`p-4 rounded-2xl border text-center font-bold text-sm transition-all ${
                  wizardData.gender === 'female'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 ring-2 ring-rose-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-2xl block mb-1">👩</span>
                महिला / छात्रा (Female)
              </button>

              <button
                type="button"
                onClick={() => handleSelect('gender', 'male')}
                className={`p-4 rounded-2xl border text-center font-bold text-sm transition-all ${
                  wizardData.gender === 'male'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-300 ring-2 ring-blue-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-2xl block mb-1">👨</span>
                पुरुष / छात्र (Male)
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">अपनी आयु (उम्र) चुनें: <strong className="text-orange-400 font-bold">{wizardData.age} वर्ष</strong></label>
              <input
                type="range"
                min="5"
                max="85"
                value={wizardData.age}
                onChange={(e) => handleSelect('age', parseInt(e.target.value, 10))}
                className="w-full accent-orange-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold">
                <span>5 वर्ष</span>
                <span>25 वर्ष</span>
                <span>50 वर्ष</span>
                <span>85 वर्ष</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Location */}
        {step === 2 && (
          <div className="space-y-4 my-6">
            <h3 className="text-sm font-bold text-slate-200">2. आप कहाँ रहते हैं?</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSelect('location', 'rural')}
                className={`p-5 rounded-2xl border text-center font-bold text-sm transition-all ${
                  wizardData.location === 'rural'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-3xl block mb-1">🌾</span>
                ग्रामीण क्षेत्र (गाँव / पंचायत)
              </button>

              <button
                type="button"
                onClick={() => handleSelect('location', 'urban')}
                className={`p-5 rounded-2xl border text-center font-bold text-sm transition-all ${
                  wizardData.location === 'urban'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-300 ring-2 ring-blue-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="text-3xl block mb-1">🏢</span>
                शहरी क्षेत्र (शहर / नगर पालिका)
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Social Category */}
        {step === 3 && (
          <div className="space-y-4 my-6">
            <h3 className="text-sm font-bold text-slate-200">3. आपका सामाजिक वर्ग क्या है?</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'general', label: 'सामान्य (General)' },
                { id: 'obc', label: 'ओबीसी (OBC / पिछड़ा)' },
                { id: 'ebc', label: 'ईबीसी (EBC / अत्यंत पिछड़ा)' },
                { id: 'sc', label: 'अनुसूचित जाति (SC)' },
                { id: 'st', label: 'अनुसूचित जनजाति (ST)' },
                { id: 'minority', label: 'अल्पसंख्यक (Minority)' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelect('socialCategory', cat.id)}
                  className={`p-3 rounded-xl border text-center font-bold transition-all ${
                    wizardData.socialCategory === cat.id
                      ? 'bg-orange-500/20 border-orange-500 text-orange-300 ring-2 ring-orange-500/30'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 p-3 bg-slate-950/60 rounded-xl border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wizardData.isDivyang}
                  onChange={(e) => handleSelect('isDivyang', e.target.checked)}
                  className="w-4 h-4 accent-orange-500"
                />
                <span className="text-xs text-slate-300 font-bold">
                  क्या आप 40% या अधिक दिव्यांग (Divyangjan) हैं?
                </span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 4: Occupation */}
        {step === 4 && (
          <div className="space-y-4 my-6">
            <h3 className="text-sm font-bold text-slate-200">4. आपका मुख्य पेशा (काम) क्या है?</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {[
                { id: 'student', label: 'विद्यार्थी / छात्रा', icon: '🎓' },
                { id: 'farmer', label: 'किसान / खेती', icon: '🌾' },
                { id: 'laborer', label: 'मजदूर / श्रमिक', icon: '🔨' },
                { id: 'shopkeeper', label: 'दुकानदार / वेंडर', icon: '🏪' },
                { id: 'unemployed', label: 'बेरोजगार युवा', icon: '💼' },
                { id: 'elderly', label: 'बुजुर्ग (60+)', icon: '👴' }
              ].map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => handleSelect('occupation', occ.id)}
                  className={`p-3.5 rounded-xl border text-center font-bold transition-all ${
                    wizardData.occupation === occ.id
                      ? 'bg-orange-500/20 border-orange-500 text-orange-300 ring-2 ring-orange-500/30'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-xl block mb-1">{occ.icon}</span>
                  {occ.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5: Ration & Income */}
        {step === 5 && (
          <div className="space-y-4 my-6">
            <h3 className="text-sm font-bold text-slate-200">5. राशन कार्ड एवं वार्षिक आय</h3>
            
            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 cursor-pointer">
                <span className="text-xs text-slate-200 font-bold">
                  क्या आपके परिवार के पास राशन कार्ड (BPL / अंत्योदय) है?
                </span>
                <input
                  type="checkbox"
                  checked={wizardData.hasRationCard}
                  onChange={(e) => handleSelect('hasRationCard', e.target.checked)}
                  className="w-5 h-5 accent-emerald-500"
                />
              </label>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-2 font-bold">पारिवारिक वार्षिक आय:</span>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleSelect('incomeLevel', 'bpl')}
                    className={`py-2 rounded-lg border font-bold ${
                      wizardData.incomeLevel === 'bpl' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ₹1 लाख से कम
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelect('incomeLevel', 'low')}
                    className={`py-2 rounded-lg border font-bold ${
                      wizardData.incomeLevel === 'low' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ₹1L से ₹2.5L
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelect('incomeLevel', 'middle')}
                    className={`py-2 rounded-lg border font-bold ${
                      wizardData.incomeLevel === 'middle' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ₹2.5L से अधिक
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> पिछला
            </button>
          ) : <div />}

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-orange-500/25"
          >
            <span>{step === 5 ? 'योजनाएं खोजें (Find Schemes)' : 'अगला सवाल'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
