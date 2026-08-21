import React from 'react';
import { ShieldCheck, Cpu, Smartphone, Globe } from 'lucide-react';

export default function DashboardFooterTrust() {
  const items = [
    {
      id: 1,
      icon: ShieldCheck,
      title: '100% Secure',
      desc: 'Your data is safe with 256-bit encryption',
      color: 'text-emerald-400 border-emerald-500/30'
    },
    {
      id: 2,
      icon: Cpu,
      title: 'AI Powered',
      desc: 'Google Gemini & Semantic Recommendations',
      color: 'text-purple-400 border-purple-500/30'
    },
    {
      id: 3,
      icon: Smartphone,
      title: 'Easy to Use',
      desc: 'Voice First, zero typing needed',
      color: 'text-blue-400 border-blue-500/30'
    },
    {
      id: 4,
      icon: Globe,
      title: 'Multi Language',
      desc: 'Hindi, Bhojpuri, Maithili & English',
      color: 'text-amber-400 border-amber-500/30'
    }
  ];

  return (
    <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl select-none text-left">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-2xl bg-slate-950 flex items-center justify-center shrink-0 border ${item.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-black text-white truncate">{item.title}</h5>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
