import React from 'react';
import { X, Award, CheckCircle, Lightbulb, Users, Mic, Cpu, Globe, Rocket } from 'lucide-react';

export default function TeamModal({ onClose }) {
  const teamMembers = [
    {
      name: "Saket Shubham",
      role: "Team Lead",
      responsibility: "AI Integration, Prompt Engineering & Architecture",
      icon: "🤖",
      color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300"
    },
    {
      name: "Kishan Jee",
      role: "Voice & Speech Pipeline",
      responsibility: "Web Speech API, Multi-dialect STT & Testing",
      icon: "🎙️",
      color: "from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-300"
    },
    {
      name: "Raja Kumar / Suprachi",
      role: "Frontend UI/UX",
      responsibility: "Mobile-First Design, Voice Visualizer & Results UI",
      icon: "📱",
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300"
    },
    {
      name: "Aditya Prakash / Harshit",
      role: "Scheme Data & Docs",
      responsibility: "Scheme Database Curation, Eligibility Rules & Checklist",
      icon: "📚",
      color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl my-8 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
            Tejas India Hackathon 2026 · DPIIT Initiative
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Team Conqueror Coders
        </h2>
        <p className="text-sm font-semibold text-slate-400 mt-0.5">
          Government Engineering College, Jamui (Bihar)
        </p>

        {/* The Idea in One Line */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-emerald-500/15 border border-orange-500/30">
          <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
            THE IDEA IN ONE LINE
          </div>
          <p className="text-base sm:text-lg font-bold text-white italic">
            "बोलो अपनी ज़िंदगी के बारे में, AI बताएगा कौन से सरकारी योजना तुम्हारे लिए हैं — और कैसे अप्लाई करें।"
          </p>
        </div>

        {/* 5-Step Solution Flow */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            5-STEP USER FLOW (सिस्टम कैसे काम करता है)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <div className="text-xl mb-1">1. 🎙️</div>
              <div className="font-bold text-white">बोलना</div>
              <div className="text-[10px] text-slate-400 mt-0.5">User speaks</div>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <div className="text-xl mb-1">2. ✍️</div>
              <div className="font-bold text-white">टेक्स्ट बनना</div>
              <div className="text-[10px] text-slate-400 mt-0.5">STT in Realtime</div>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <div className="text-xl mb-1">3. 🧠</div>
              <div className="font-bold text-white">AI मैच</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Rules Engine</div>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
              <div className="text-xl mb-1">4. 📋</div>
              <div className="font-bold text-white">रिजल्ट + बोलकर</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Cards + Audio</div>
            </div>
            <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
              <div className="text-xl mb-1">5. ✅</div>
              <div className="font-bold text-white">अप्लाई गाइड</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Docs + CSC</div>
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            टीम सदस्य एवं जिम्मेदारियां (Team Roles)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl bg-gradient-to-br ${member.color} border flex items-start gap-3`}
              >
                <span className="text-2xl">{member.icon}</span>
                <div>
                  <h5 className="font-bold text-sm text-white">{member.name}</h5>
                  <span className="text-xs font-semibold text-slate-300 block">{member.role}</span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {member.responsibility}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-orange-400">34L+</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">MSMEs in Bihar</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-300">100+</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Govt Schemes</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">0</div>
            <div className="text-[10px] sm:text-xs text-slate-400 mt-0.5">Forms to Fill (Pure Voice)</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            बंद करें (Close)
          </button>
        </div>

      </div>
    </div>
  );
}
