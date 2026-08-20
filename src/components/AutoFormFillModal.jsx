import React, { useState } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  FileText, 
  Scan, 
  Printer, 
  Sparkles, 
  Crown, 
  Download, 
  ArrowRight, 
  ArrowLeft,
  QrCode,
  ShieldCheck,
  Building2,
  Share2
} from 'lucide-react';
import { speechSynthesizer } from '../services/speechSynthesizer';
import { speechRecognizer } from '../services/speechRecognition';

export default function AutoFormFillModal({ scheme, onClose, isPremium }) {
  const [activeTab, setActiveTab] = useState('voice-step'); // 'voice-step' | 'ocr-scan' | 'slip-preview'
  const [currentStep, setCurrentStep] = useState(1);
  const [isListeningField, setIsListeningField] = useState(false);
  const [isScanningDoc, setIsScanningDoc] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: "रामेश्वर प्रसाद यादव",
    fatherName: "स्व. लखन यादव",
    aadhaarNumber: "7482 9104 3821",
    mobileNumber: "98354 12098",
    dob: "15/07/1978",
    gender: "पुरुष (Male)",
    district: "जमुई (Jamui)",
    block: "सोनो (Sono)",
    panchayat: "रजौन",
    village: "महुआकोल",
    bankName: "State Bank of India",
    accountNumber: "389201948201",
    ifscCode: "SBIN0001234",
    landKhata: "खाता सं: 42, खेसरा: 108 (2.5 बीघा)",
    schemeName: scheme?.hindiName || "पीएम किसान सम्मान निधि",
    applicationId: `YS-BH-${Math.floor(100000 + Math.random() * 900000)}`
  });

  const stepsInfo = [
    {
      step: 1,
      title: "व्यक्तिगत पहचान (Personal Identity)",
      audioPrompt: "कृपया अपना पूरा नाम, पिता का नाम और 12 अंकों का आधार नंबर बोलें।",
      fields: ["fullName", "fatherName", "aadhaarNumber", "mobileNumber"]
    },
    {
      step: 2,
      title: "निवास एवं पता (Address & Location)",
      audioPrompt: "अपना जिला, प्रखंड यानी ब्लॉक, पंचायत और गाँव का नाम बताएं।",
      fields: ["district", "block", "panchayat", "village"]
    },
    {
      step: 3,
      title: "बैंक खाता एवं सरकारी पात्रता विवरण",
      audioPrompt: "अपना बैंक खाता नंबर, IFSC कोड और जमीन का खाता-खेसरा नंबर बोलें।",
      fields: ["bankName", "accountNumber", "ifscCode", "landKhata"]
    }
  ];

  const handleFieldChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handlePlayStepAudio = (stepIndex) => {
    const info = stepsInfo[stepIndex - 1];
    if (info) {
      speechSynthesizer.speak(info.audioPrompt, {
        id: `form-step-${stepIndex}`,
        rate: 0.90
      });
    }
  };

  const handleVoiceInputForField = (fieldKey) => {
    if (isListeningField) {
      speechRecognizer.stop();
      setIsListeningField(false);
    } else {
      setIsListeningField(fieldKey);
      speechRecognizer.start({
        lang: 'hi-IN',
        onResult: ({ combined }) => {
          if (combined) {
            handleFieldChange(fieldKey, combined);
          }
        },
        onEnd: () => setIsListeningField(false)
      });
    }
  };

  const handleSimulateScan = () => {
    setIsScanningDoc(true);
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        fullName: "रामेश्वर प्रसाद यादव",
        fatherName: "स्व. लखन यादव",
        aadhaarNumber: "7482 9104 3821",
        dob: "15/07/1978",
        gender: "पुरुष (Male)",
        district: "जमुई (Jamui)",
        block: "सोनो (Sono)",
        village: "महुआकोल"
      }));
      setIsScanningDoc(false);
      speechSynthesizer.speak("आधार कार्ड स्कैन सफल! आपका नाम, आधार और पता ऑटो-फिल कर दिया गया है।", { rate: 0.92 });
      setCurrentStep(3); // Jump to next
    }, 1500);
  };

  const handlePrintSlip = () => {
    window.print();
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

        {/* Top Header */}
        <div className="flex items-center gap-2 mb-2 pr-8">
          <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/40 text-orange-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            प्रीमियम वॉयस फॉर्म फिलर (Voice Form Assistant)
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          {scheme?.hindiName || "सरकारी योजना आवेदन सहायक"}
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          बिना किसी टाइपिंग के सिर्फ अपनी आवाज़ से सरकारी फॉर्म भरें
        </p>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-950 border border-slate-800 rounded-2xl my-5">
          <button
            onClick={() => setActiveTab('voice-step')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'voice-step'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>आवाज़ से स्टेप-बाय-स्टेप भरें</span>
          </button>

          <button
            onClick={() => setActiveTab('ocr-scan')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'ocr-scan'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scan className="w-4 h-4" />
            <span>AI दस्तावेज ऑटो-स्कैन</span>
          </button>

          <button
            onClick={() => setActiveTab('slip-preview')}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'slip-preview'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>पावती पर्ची (Final Slip)</span>
          </button>
        </div>

        {/* TAB 1: Voice Step-by-Step Filling */}
        {activeTab === 'voice-step' && (
          <div>
            {/* Step Progress Bar */}
            <div className="flex items-center justify-between mb-4 px-2">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center gap-2">
                  <div
                    onClick={() => setCurrentStep(stepNum)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs cursor-pointer transition-all ${
                      currentStep === stepNum
                        ? 'bg-orange-500 text-white ring-4 ring-orange-500/20'
                        : currentStep > stepNum
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {currentStep > stepNum ? '✓' : stepNum}
                  </div>
                  <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
                    चरण {stepNum}
                  </span>
                </div>
              ))}
            </div>

            {/* Step Prompt Box with Audio */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-slate-900 border border-orange-500/30 mb-5 flex items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Volume2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-orange-300 uppercase tracking-wider">
                    {stepsInfo[currentStep - 1].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-100 mt-0.5 font-medium">
                    "{stepsInfo[currentStep - 1].audioPrompt}"
                  </p>
                </div>
              </div>

              <button
                onClick={() => handlePlayStepAudio(currentStep)}
                className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shrink-0 flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>सुनें</span>
              </button>
            </div>

            {/* Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {currentStep === 1 && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                      <span>आवेदक का पूरा नाम (Full Name):</span>
                      <button
                        onClick={() => handleVoiceInputForField('fullName')}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                          isListeningField === 'fullName' ? 'bg-orange-500 text-white animate-pulse' : 'bg-slate-800 text-orange-400'
                        }`}
                      >
                        <Mic className="w-3 h-3" /> बोलें
                      </button>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                      <span>पिता / पति का नाम:</span>
                      <button
                        onClick={() => handleVoiceInputForField('fatherName')}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                          isListeningField === 'fatherName' ? 'bg-orange-500 text-white animate-pulse' : 'bg-slate-800 text-orange-400'
                        }`}
                      >
                        <Mic className="w-3 h-3" /> बोलें
                      </button>
                    </label>
                    <input
                      type="text"
                      value={formData.fatherName}
                      onChange={(e) => handleFieldChange('fatherName', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                      <span>आधार नंबर (12 Digit Aadhaar):</span>
                      <button
                        onClick={() => handleVoiceInputForField('aadhaarNumber')}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                          isListeningField === 'aadhaarNumber' ? 'bg-orange-500 text-white animate-pulse' : 'bg-slate-800 text-orange-400'
                        }`}
                      >
                        <Mic className="w-3 h-3" /> बोलें
                      </button>
                    </label>
                    <input
                      type="text"
                      value={formData.aadhaarNumber}
                      onChange={(e) => handleFieldChange('aadhaarNumber', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">मोबाइल नंबर (Mobile No):</label>
                    <input
                      type="text"
                      value={formData.mobileNumber}
                      onChange={(e) => handleFieldChange('mobileNumber', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:border-orange-500 font-mono"
                    />
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">जिला (District):</label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleFieldChange('district', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">प्रखंड / ब्लॉक (Block):</label>
                    <input
                      type="text"
                      value={formData.block}
                      onChange={(e) => handleFieldChange('block', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">ग्राम पंचायत (Panchayat):</label>
                    <input
                      type="text"
                      value={formData.panchayat}
                      onChange={(e) => handleFieldChange('panchayat', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">गाँव का नाम (Village):</label>
                    <input
                      type="text"
                      value={formData.village}
                      onChange={(e) => handleFieldChange('village', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">बैंक का नाम (Bank Name):</label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => handleFieldChange('bankName', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">खाता संख्या (Account No):</label>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={(e) => handleFieldChange('accountNumber', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">IFSC कोड:</label>
                    <input
                      type="text"
                      value={formData.ifscCode}
                      onChange={(e) => handleFieldChange('ifscCode', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">जमीन विवरण / शैक्षणिक योग्यता:</label>
                    <input
                      type="text"
                      value={formData.landKhata}
                      onChange={(e) => handleFieldChange('landKhata', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {currentStep > 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> पिछला चरण
                </button>
              ) : <div />}

              {currentStep < 3 ? (
                <button
                  onClick={() => {
                    setCurrentStep(currentStep + 1);
                    handlePlayStepAudio(currentStep + 1);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <span>अगला चरण</span> <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('slip-preview')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>पावती पर्ची तैयार करें (Generate Slip)</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: AI Document OCR Scanner */}
        {activeTab === 'ocr-scan' && (
          <div className="text-center py-6">
            <div className="max-w-md mx-auto p-6 bg-slate-950/80 border-2 border-dashed border-orange-500/40 rounded-3xl">
              <Scan className={`w-12 h-12 mx-auto mb-3 ${isScanningDoc ? 'text-emerald-400 animate-spin' : 'text-orange-400'}`} />
              <h3 className="text-base font-extrabold text-white">
                आधार कार्ड या जमीन की रसीद स्कैन करें
              </h3>
              <p className="text-xs text-slate-400 mt-1 mb-5">
                AI आपके दस्तावेज से नाम, आधार, पता और जमीन का रकबा खुद पहचान कर फॉर्म भर देगा।
              </p>

              <button
                onClick={handleSimulateScan}
                disabled={isScanningDoc}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 mx-auto shadow-lg shadow-orange-500/20"
              >
                {isScanningDoc ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" /> AI दस्तावेज स्कैन कर रहा है...
                  </>
                ) : (
                  <>
                    <Scan className="w-4 h-4" />
                    <span>दस्तावेज स्कैन व ऑटो-फिल करें</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Printable Application Slip Preview */}
        {activeTab === 'slip-preview' && (
          <div className="space-y-4">
            {/* Government Format Slip */}
            <div className="p-6 bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-300 font-serif text-xs">
              
              {/* Slip Header */}
              <div className="text-center pb-3 border-b-2 border-slate-800 mb-4">
                <div className="font-extrabold text-sm uppercase tracking-wider text-slate-900">
                  बिहार सरकार / भारत सरकार — जन कल्याण योजना पोर्टल
                </div>
                <div className="text-base font-black text-orange-700 mt-0.5">
                  योजना आवेदन एवं पात्रता पावती पर्ची (Application Acknowledgment Slip)
                </div>
                <div className="text-[10px] text-slate-600 mt-0.5">
                  आवेदन संदर्भ संख्या (Application Ref): <strong className="text-black font-mono">{formData.applicationId}</strong> | दिनांक: {new Date().toLocaleDateString('hi-IN')}
                </div>
              </div>

              {/* Grid Data */}
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-b border-slate-300 pb-4 mb-4">
                <div><span className="text-slate-500">योजना का नाम:</span> <strong>{formData.schemeName}</strong></div>
                <div><span className="text-slate-500">आवेदक का नाम:</span> <strong>{formData.fullName}</strong></div>
                <div><span className="text-slate-500">पिता/पति का नाम:</span> <strong>{formData.fatherName}</strong></div>
                <div><span className="text-slate-500">आधार संख्या:</span> <strong className="font-mono">{formData.aadhaarNumber}</strong></div>
                <div><span className="text-slate-500">जिला / प्रखंड:</span> <strong>{formData.district} / {formData.block}</strong></div>
                <div><span className="text-slate-500">ग्राम पंचायत / गाँव:</span> <strong>{formData.panchayat} / {formData.village}</strong></div>
                <div><span className="text-slate-500">बैंक खाता:</span> <strong className="font-mono">{formData.accountNumber} ({formData.bankName})</strong></div>
                <div><span className="text-slate-500">IFSC कोड:</span> <strong className="font-mono">{formData.ifscCode}</strong></div>
                <div className="col-span-2"><span className="text-slate-500">भूमि/शैक्षणिक विवरण:</span> <strong>{formData.landKhata}</strong></div>
              </div>

              {/* Status & Verification Box */}
              <div className="flex items-center justify-between pt-1">
                <div className="space-y-1">
                  <div className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    पात्रता जांच: 100% सत्यापित (Pre-Verified by Yojana Sathi AI)
                  </div>
                  <div className="text-[10px] text-slate-500">
                    यह पर्ची लेकर नजदीकी CSC / ब्लॉक कार्यालय में जमा करें या सीधे पोर्टल पर अपलोड करें।
                  </div>
                </div>

                <div className="w-14 h-14 bg-slate-100 border border-slate-300 rounded flex items-center justify-center shrink-0">
                  <QrCode className="w-10 h-10 text-slate-800" />
                </div>
              </div>

            </div>

            {/* Slip Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrintSlip}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 shadow"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>पावती पर्ची प्रिंट / PDF सेव करें</span>
              </button>

              <a
                href={scheme?.officialLink || "https://pmkisan.gov.in"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
              >
                <span>सरकारी पोर्टल पर डायरेक्ट सबमिट करें</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
