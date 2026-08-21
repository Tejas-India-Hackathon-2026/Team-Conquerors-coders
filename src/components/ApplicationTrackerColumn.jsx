import React from 'react';
import { CheckCircle2, Clock, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function ApplicationTrackerColumn({
  onOpenTracker
}) {
  const steps = [
    { id: 1, title: 'Application Submitted', date: '12 May 2026', desc: 'Your application has been submitted successfully.', status: 'completed' },
    { id: 2, title: 'Under Verification', date: '18 May 2026', desc: 'Your application is under process by the concerned department.', status: 'completed' },
    { id: 3, title: 'Approved', date: '25 May 2026', desc: 'Congratulations! Your application has been approved.', status: 'current' },
    { id: 4, title: 'Benefits Disbursed', date: 'Upcoming', desc: 'The benefit will be credited to your bank account soon.', status: 'pending' },
  ];

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-5 shadow-xl flex flex-col justify-between text-left select-none space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-black text-white">Application Tracker</h3>
        </div>
        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          Live Status
        </span>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-4 py-1">
        {steps.map((st, idx) => (
          <div key={st.id} className="relative flex items-start gap-3">
            
            {/* Step Icon & Connecting Line */}
            <div className="relative flex flex-col items-center">
              {st.status === 'completed' ? (
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              ) : st.status === 'current' ? (
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center animate-pulse shadow-md shadow-emerald-500/30">
                  3
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700 text-slate-500 flex items-center justify-center text-xs">
                  4
                </div>
              )}

              {idx < steps.length - 1 && (
                <div className={`w-[2px] h-9 mt-1 ${st.status === 'completed' ? 'bg-emerald-500/50' : 'bg-slate-800'}`} />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h5 className={`text-xs font-bold ${st.status === 'pending' ? 'text-slate-400' : 'text-white'}`}>
                  {st.title}
                </h5>
                <span className="text-[10px] text-slate-500 font-medium shrink-0">{st.date}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                {st.desc}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Approval Congrats Box */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-emerald-500/15 border border-emerald-500/30 text-center space-y-2">
        <h5 className="text-xs font-black text-emerald-300">
          Congratulations! 🎉
        </h5>
        <p className="text-[11px] text-slate-300">
          Your PM-Kisan & Student Credit Card application has been approved.
        </p>

        <button
          onClick={onOpenTracker}
          className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/25 transition-all"
        >
          <span>View Live Tracker</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
