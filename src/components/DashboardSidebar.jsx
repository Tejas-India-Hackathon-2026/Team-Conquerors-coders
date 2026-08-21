import React from 'react';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  Layers, 
  Sparkles, 
  Clock, 
  FileCheck2, 
  Calculator, 
  MapPin, 
  ShieldAlert, 
  Globe, 
  Moon, 
  Crown, 
  Scale, 
  SlidersHorizontal,
  ChevronRight,
  UserCheck
} from 'lucide-react';

export default function DashboardSidebar({
  activeView,
  setActiveView,
  onOpenDocs,
  onOpenTracker,
  onOpenCsc,
  onOpenHelpline,
  onOpenCompare,
  onOpenWizard,
  onOpenPricing,
  isPremium,
  selectedLanguage,
  setSelectedLanguage
}) {
  const navItems = [
    { id: 'dashboard', label: 'डैशबोर्ड (Dashboard)', icon: LayoutDashboard, action: () => setActiveView('dashboard') },
    { id: 'schemes', label: 'सभी 45+ योजनाएं (Schemes)', icon: FileSpreadsheet, action: () => setActiveView('directory') },
    { id: 'categories', label: 'श्रेणियां (Categories)', icon: Layers, action: () => setActiveView('dashboard') },
    { id: 'advisor', label: 'AI स्कीम सलाहकार (AI Advisor)', icon: Sparkles, badge: 'AI', action: () => setActiveView('dashboard') },
    { id: 'status', label: 'आवेदन स्थिति (App Status)', icon: Clock, action: onOpenTracker },
    { id: 'documents', label: 'दस्तावेज़ चेकर (Documents)', icon: FileCheck2, action: onOpenDocs },
    { id: 'wizard', label: 'स्मार्ट खोजक (5-Step Wizard)', icon: SlidersHorizontal, action: onOpenWizard },
    { id: 'compare', label: 'योजना तुलना (Compare)', icon: Scale, action: onOpenCompare },
    { id: 'csc', label: 'नजदीकी केंद्र (Nearby Help)', icon: MapPin, action: onOpenCsc },
    { id: 'helpline', label: 'शिकायत व हेल्पलाइन (Helpline)', icon: ShieldAlert, action: onOpenHelpline },
  ];

  return (
    <aside className="w-64 lg:w-72 bg-[#0b101e]/95 border-r border-slate-800/90 flex flex-col justify-between shrink-0 h-screen sticky top-0 text-left select-none z-30 shadow-2xl backdrop-blur-2xl">
      
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveView('dashboard')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-600 p-[2px] shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <span className="text-xl">🌿</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-lg text-white tracking-tight">
                JAN <span className="text-emerald-400">SUVIDHA</span>
              </h1>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              सबके लिए, हर योजना (Yojana Sathi)
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Links Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = (item.id === 'dashboard' && activeView === 'dashboard') ||
                           (item.id === 'schemes' && activeView === 'directory');

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                isActive
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-850/80 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold border border-emerald-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Premium Upgrade Button in Sidebar */}
        <div className="pt-2">
          <button
            onClick={onOpenPricing}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-extrabold bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 text-amber-300 border border-amber-500/30 hover:border-amber-400 shadow-sm transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>PRO प्रीमियम सदस्य</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-black">
              ACTIVE
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Controls & User Profile */}
      <div className="p-4 border-t border-slate-800/80 space-y-3 bg-slate-950/70">
        
        {/* Language & Dark Mode Toggles */}
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <div className="flex items-center gap-1.5 font-bold">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-900 text-slate-200 text-xs rounded-lg px-2 py-1 border border-slate-700 outline-none cursor-pointer"
            >
              <option value="hi-IN">🇮🇳 हिन्दी</option>
              <option value="bho-IN">🌾 भोजपुरी</option>
              <option value="en-IN">🇬🇧 English</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <Moon className="w-3.5 h-3.5" />
            <span className="text-[11px]">Dark Mode</span>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px] shrink-0">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-bold text-white text-xs">
              👨‍🌾
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-extrabold text-white truncate">Kishan Kumar</span>
              <UserCheck className="w-3 h-3 text-emerald-400 shrink-0" />
            </div>
            <p className="text-[10px] text-slate-400 font-medium truncate">Patna, Bihar</p>
          </div>
        </div>

      </div>

    </aside>
  );
}
