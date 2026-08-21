import React from 'react';
import { 
  UserCheck, 
  ShieldCheck, 
  FileText, 
  Clock, 
  UploadCloud, 
  BellRing, 
  Sparkles, 
  ArrowRight,
  ChevronRight,
  Wheat,
  HeartPulse,
  GraduationCap,
  Accessibility
} from 'lucide-react';

export default function DashboardRightPanel({
  onOpenWizard,
  onOpenDocs,
  onOpenTracker,
  onOpenHelpline,
  onSelectCategory
}) {
  const updates = [
    {
      id: 1,
      icon: Wheat,
      title: 'PM Kisan Yojana',
      desc: '19th Installment Released across all districts',
      time: '2h ago',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 2,
      icon: HeartPulse,
      title: 'Ayushman Bharat 2.0',
      desc: 'Senior Citizen (70+) Free Hospital Cards Active',
      time: '5h ago',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    },
    {
      id: 3,
      icon: GraduationCap,
      title: 'Scholarship 2026',
      desc: 'Post Matric & Kanya Utthan Last Date Extended',
      time: '1d ago',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    {
      id: 4,
      icon: Accessibility,
      title: 'ADIP Divyang Camp',
      desc: 'Free Motorized Tricycle Distribution in Jamui & Patna',
      time: '2d ago',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    }
  ];

  return (
    <div className="w-full xl:w-80 space-y-4 text-left select-none">
      
      {/* Citizen Welcome Card with Profile Completion */}
      <div className="p-5 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 p-[2px] shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center text-2xl">
              👨‍🌾
            </div>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400">Welcome Back!</span>
            <h3 className="text-base font-black text-white leading-tight">
              Kishan Kumar
            </h3>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30 mt-0.5">
              <UserCheck className="w-3 h-3" /> Verified Citizen
            </span>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-300">Profile Completion</span>
            <span className="text-emerald-400">80%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[80%] transition-all duration-1000" />
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            Quick Actions
          </h4>
          <p className="text-[11px] text-slate-500 font-medium">Customize your experience</p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onOpenWizard}
            className="p-3 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 hover:border-emerald-400 transition-all flex flex-col items-start gap-2 group text-left"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold leading-tight">Check Eligibility</span>
          </button>

          <button
            onClick={onOpenWizard}
            className="p-3 rounded-2xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 hover:border-purple-400 transition-all flex flex-col items-start gap-2 group text-left"
          >
            <FileText className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold leading-tight">Apply Scheme</span>
          </button>

          <button
            onClick={onOpenTracker}
            className="p-3 rounded-2xl bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/30 text-blue-300 hover:border-blue-400 transition-all flex flex-col items-start gap-2 group text-left"
          >
            <Clock className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold leading-tight">Track Application</span>
          </button>

          <button
            onClick={onOpenDocs}
            className="p-3 rounded-2xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 hover:border-amber-400 transition-all flex flex-col items-start gap-2 group text-left"
          >
            <UploadCloud className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold leading-tight">Upload Document</span>
          </button>
        </div>
      </div>

      {/* Important Updates Feed */}
      <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Important Updates
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">Live government notifications</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 cursor-pointer hover:underline">
            View All
          </span>
        </div>

        <div className="space-y-2.5">
          {updates.map((up) => {
            const Icon = up.icon;
            return (
              <div
                key={up.id}
                className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start gap-3"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${up.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h5 className="text-xs font-extrabold text-white truncate">{up.title}</h5>
                    <span className="text-[10px] text-slate-500 shrink-0 font-medium">{up.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug mt-0.5 truncate">{up.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
