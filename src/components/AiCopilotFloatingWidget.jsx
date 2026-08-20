import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Bot, 
  User,
  HelpCircle
} from 'lucide-react';
import { speechSynthesizer } from '../services/speechSynthesizer';
import { speechRecognizer } from '../services/speechRecognition';

export default function AiCopilotFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'नमस्ते! मैं योजना साथी AI सहायक हूँ। आप मुझसे किसी भी सरकारी योजना, आवश्यक दस्तावेज, आवेदन में आ रही परेशानी या शिकायत के बारे में पूछ सकते हैं।'
    }
  ]);

  const quickQuestions = [
    "आधार में नाम गलत है, क्या करें?",
    "ब्लॉक में अधिकारी पैसे मांग रहे हैं?",
    "PM सूर्य घर सोलर सब्सिडी?",
    "फसल नुकसान का मुआवजा कैसे लें?"
  ];

  const handleSendMessage = async (customQuery = null) => {
    const query = (customQuery || inputText).trim();
    if (!query || isLoading) return;

    setMessages(prev => [...prev, { sender: 'user', text: query }]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/copilot-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query })
      });

      if (res.ok) {
        const json = await res.json();
        const aiAnswer = json.data?.answer || "योजना साथी AI आपकी पूरी सहायता के लिए उपलब्ध है।";
        
        setMessages(prev => [...prev, { sender: 'ai', text: aiAnswer }]);
        speechSynthesizer.speak(aiAnswer, { rate: 0.93 });
      } else {
        throw new Error('Server error');
      }
    } catch (e) {
      const fallbackAns = "सर्वर से कनेक्ट होने में समस्या आई, लेकिन आप नजदीकी CSC केंद्र या सीएम हेल्पलाइन 1076 पर संपर्क कर सकते हैं।";
      setMessages(prev => [...prev, { sender: 'ai', text: fallbackAns }]);
      speechSynthesizer.speak(fallbackAns, { rate: 0.93 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVoice = () => {
    if (isListening) {
      speechRecognizer.stop();
      setIsListening(false);
    } else {
      speechRecognizer.start({
        lang: 'hi-IN',
        onResult: ({ combined }) => {
          if (combined) {
            setInputText(combined);
          }
        },
        onEnd: () => {
          setIsListening(false);
        }
      });
      setIsListening(true);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-slate-900 hover:bg-orange-600 text-white font-black text-xs shadow-2xl shadow-slate-900/30 hover:scale-105 transition-all border-2 border-white cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span>AI सहायक से पूछें (Voice Co-pilot)</span>
        </button>
      )}

      {/* Expanded Chat Drawer Modal */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[380px] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] animate-in fade-in zoom-in-95 duration-200 text-left">
          
          {/* Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <span>योजना साथी AI को-पायलट</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </h4>
                <span className="text-[10px] text-slate-500 font-semibold">Gemini 1.5 + myScheme AI Engine</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                speechSynthesizer.stop();
              }}
              className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-900 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-[#fbfbfd]">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-[11px] text-orange-600 p-2 font-bold">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>AI योजना साथी सोच रहा है...</span>
              </div>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-slate-50 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap text-[10px] font-bold bg-white hover:bg-orange-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full shrink-0 shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <button
              onClick={handleToggleVoice}
              className={`p-2.5 rounded-xl transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-slate-100 hover:bg-orange-50 text-orange-600 border border-slate-200'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="अपनी समस्या बोलें या लिखें..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:border-orange-500 focus:bg-white"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputText.trim()}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-orange-600 disabled:opacity-50 text-white"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
