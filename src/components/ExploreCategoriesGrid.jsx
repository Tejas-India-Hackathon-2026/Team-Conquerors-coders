import React from 'react';
import { 
  Wheat, 
  GraduationCap, 
  Heart, 
  Users, 
  Accessibility, 
  Briefcase,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function ExploreCategoriesGrid({
  onSelectCategory,
  onOpenDirectory
}) {
  const categories = [
    {
      id: 'kisan',
      title: 'Kisan (किसान)',
      count: '25+ Schemes',
      icon: Wheat,
      color: 'from-emerald-500/20 to-emerald-950/40 border-emerald-500/30 text-emerald-400',
      tag: 'खाद, बीज व फसल'
    },
    {
      id: 'student',
      title: 'Students (छात्र)',
      count: '40+ Schemes',
      icon: GraduationCap,
      color: 'from-blue-500/20 to-blue-950/40 border-blue-500/30 text-blue-400',
      tag: 'स्कॉलरशिप व क्रेडिट कार्ड'
    },
    {
      id: 'women',
      title: 'Women (महिलाएं)',
      count: '35+ Schemes',
      icon: Heart,
      color: 'from-pink-500/20 to-pink-950/40 border-pink-500/30 text-pink-400',
      tag: 'कन्या उत्थान व सुरक्षा'
    },
    {
      id: 'elderly',
      title: 'Senior Citizens (बुजुर्ग)',
      count: '18+ Schemes',
      icon: Users,
      color: 'from-amber-500/20 to-amber-950/40 border-amber-500/30 text-amber-400',
      tag: 'वृद्धजन पेंशन व वयोश्री'
    },
    {
      id: 'disability',
      title: 'Divyangjan (दिव्यांग)',
      count: '15+ Schemes',
      icon: Accessibility,
      color: 'from-purple-500/20 to-purple-950/40 border-purple-500/30 text-purple-400',
      tag: 'मुफ्त ट्राइसाइकिल व पेंशन'
    },
    {
      id: 'laborer',
      title: 'Common People (मजदूर)',
      count: '30+ Schemes',
      icon: Briefcase,
      color: 'from-cyan-500/20 to-cyan-950/40 border-cyan-500/30 text-cyan-400',
      tag: 'आवास, राशन व ई-श्रम'
    }
  ];

  return (
    <div className="space-y-3 text-left select-none">
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black text-white">Explore Categories</h3>
          <p className="text-[11px] text-slate-400 font-medium">Find schemes tailored to your role</p>
        </div>
        <button
          onClick={onOpenDirectory}
          className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`p-3.5 rounded-2xl bg-gradient-to-b ${cat.color} bg-slate-900/90 border hover:scale-105 transition-all cursor-pointer flex flex-col justify-between space-y-2 group shadow-md`}
            >
              <div className="w-8 h-8 rounded-xl bg-slate-950/80 flex items-center justify-center border border-slate-800">
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <h4 className="text-xs font-extrabold text-white group-hover:text-emerald-300 truncate">
                  {cat.title}
                </h4>
                <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
                  {cat.count}
                </span>
                <span className="text-[9px] font-medium text-slate-500 block truncate mt-0.5">
                  {cat.tag}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
