import React from 'react';
import { Layers, Grid3X3, Clock, IndianRupee, Sparkles, TrendingUp } from 'lucide-react';

export default function DashboardStatsBar({
  totalSchemes = 45,
  totalCategories = 12,
  inProgressCount = 7,
  totalBenefits = "₹ 1,25,000"
}) {
  const stats = [
    {
      id: 'schemes',
      label: 'Total Schemes',
      value: '245+',
      subtext: 'Active Schemes (Central + Bihar)',
      icon: Layers,
      color: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      textColor: 'text-emerald-300'
    },
    {
      id: 'categories',
      label: 'Categories',
      value: `${totalCategories}`,
      subtext: 'All Targeted Demographics',
      icon: Grid3X3,
      color: 'from-purple-500/20 via-purple-500/10 to-transparent',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
      textColor: 'text-purple-300'
    },
    {
      id: 'applications',
      label: 'Applications',
      value: `0${inProgressCount}`,
      subtext: 'In Progress & Tracked',
      icon: Clock,
      color: 'from-blue-500/20 via-blue-500/10 to-transparent',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      textColor: 'text-blue-300'
    },
    {
      id: 'benefits',
      label: 'Benefits Availed',
      value: totalBenefits,
      subtext: 'Direct Benefit Transfer (DBT)',
      icon: IndianRupee,
      color: 'from-amber-500/20 via-amber-500/10 to-transparent',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
      textColor: 'text-amber-300'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 select-none text-left">
      {stats.map((st) => {
        const Icon = st.icon;
        return (
          <div
            key={st.id}
            className={`p-4 sm:p-5 rounded-3xl bg-gradient-to-br ${st.color} bg-slate-900/90 border ${st.borderColor} shadow-xl relative overflow-hidden transition-all hover:scale-[1.02]`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-slate-400">
                {st.label}
              </span>
              <div className={`w-8 h-8 rounded-xl bg-slate-950/80 flex items-center justify-center ${st.iconColor} border border-slate-800`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className={`text-2xl sm:text-3xl font-black ${st.textColor} tracking-tight`}>
              {st.value}
            </div>
            
            <p className="text-[11px] font-medium text-slate-400 mt-1 truncate">
              {st.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
