import React, { useState } from 'react';
import { 
  Building2, Layers, Compass, Users, BarChart3, 
  ChevronDown, ChevronRight, Download, FileCode,
  ShieldCheck, Sparkles, CheckCircle2
} from 'lucide-react';
import { useTalent } from '../../context/TalentContext';

export const SidebarNav: React.FC = () => {
  const { currentModule, setCurrentModule, employees, selectedEmpId, setOpenHtmlModal } = useTalent();

  // Accordion groups state
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    org: true,
    competency: true,
    lnd: true,
    talent: true,
    perf: true,
    insights: true
  });

  const toggleGroup = (key: string) => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navGroups = [
    {
      id: 'org', title: 'Foundation', icon: Building2,
      badgeColor: 'border-blue-500/30 text-blue-600 bg-blue-500/10',
      items: [
        { id: 65, num: '00.1', title: 'Business Growth & Headcount', sub: 'Target-to-capacity planning' },
        { id: 66, num: '00.2', title: 'Org Structure & Job Levels', sub: 'Reporting lines, job family & grades' }
      ]
    },
    {
      id: 'competency', title: 'Process 01: Competencies', icon: Layers,
      badgeColor: 'border-purple-500/30 text-purple-600 bg-purple-500/10',
      items: [
        { id: 52, num: '01.1', title: 'Competency Framework', sub: 'Dictionary: Core, Func, Lead, Digital' },
        { id: 53, num: '01.1', title: 'Proficiency Scales & Behaviors', sub: 'Levels & observable indicators' },
        { id: 56, num: '01.1', title: 'Role Competency Matrix', sub: 'Role benchmarks & Radar' },
        { id: 54, num: '01.2', title: 'Competency Assessment', sub: 'Self -> Manager -> Calibration -> Locked' },
        { id: 55, num: '01.3', title: 'Identify Skill Gaps', sub: 'Heatmap, readiness & risk' },
        { id: 57, num: '01.4', title: 'Development Planning (IDP)', sub: '70-20-10, approval, tracking' }
      ]
    },
    {
      id: 'perf', title: 'Process 02: Performance', icon: Users,
      badgeColor: 'border-blue-500/30 text-blue-600 bg-blue-500/10',
      items: [
        { id: 70, num: '02', title: 'Performance Evaluation Cycle', sub: 'Goals, check-in, final, calibration, appeal' },
        { id: 61, num: '02.5', title: 'Performance & KPI Growth', sub: 'Competency trajectory vs business KPIs' }
      ]
    },
    {
      id: 'lnd', title: 'Process 03: Training & Learning', icon: Compass,
      badgeColor: 'border-teal-500/30 text-teal-600 bg-teal-500/10',
      items: [
        { id: 71, num: '03.1', title: 'TNA, Plan & Budget', sub: 'Needs analysis, budget approval, calendar' },
        { id: 58, num: '03.3', title: 'Assign Learning Paths', sub: 'Curated curriculum (LMS: buy)' },
        { id: 59, num: '03.4', title: 'Deliver Training & Sessions', sub: 'Classroom & virtual sessions' },
        { id: 60, num: '03.5', title: 'Assessment & Skill Lift', sub: 'Kirkpatrick L1-L4, validated +1' }
      ]
    },
    {
      id: 'talent', title: 'Process 04: Career & Succession', icon: Sparkles,
      badgeColor: 'border-amber-500/30 text-amber-600 bg-amber-500/10',
      items: [
        { id: 63, num: '04.1', title: 'Career Path & Promotion', sub: 'Readiness index & nominations' },
        { id: 62, num: '04.3', title: '9-Box (HiPo) & Succession', sub: 'Calibration & bench pipeline' }
      ]
    },
    {
      id: 'insights', title: 'Process 05: Dashboard & Architecture', icon: BarChart3,
      badgeColor: 'border-rose-500/30 text-rose-600 bg-rose-500/10',
      items: [
        { id: 64, num: '05', title: 'Executive Talent Dashboard', sub: 'Who is ready in 6 months?' },
        { id: 99, num: '06', title: 'Closed-Loop Architecture (PO)', sub: 'Data flow & ERD for IT PO' }
      ]
    }
  ];

  const currentEmp = employees.find(e => e.id === selectedEmpId);

  return (
    <aside className="w-80 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between py-4 px-3 h-[calc(100vh-4rem)] sticky top-16 transition-colors overflow-y-auto">
      <div className="space-y-4">
        {/* Platform Identity */}
        <div className="px-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white font-black text-sm flex items-center justify-center shadow-md shadow-orange-500/20">
              TD
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                  Talent Platform
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-400 font-bold uppercase tracking-wider">
                  HR Analytics
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">Enterprise Closed-Loop Suite</p>
            </div>
          </div>
        </div>

        {/* Offline Standalone HTML Quick Trigger */}
        <div className="px-2">
          <button
            onClick={() => setOpenHtmlModal(true)}
            className="w-full p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Download className="w-3.5 h-3.5 group-hover:animate-bounce" />
              </div>
              <div className="text-left truncate">
                <p className="font-extrabold text-[11px] leading-tight text-slate-900 dark:text-white">Save Standalone HTML</p>
                <p className="text-[9.5px] text-emerald-700 dark:text-emerald-400 font-normal">Offline single-file prototype</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 font-bold">.HTML</span>
          </button>
        </div>

        {/* Accordion Menu */}
        <div className="space-y-3">
          {navGroups.map((group) => {
            const isOpen = !!openGroups[group.id];
            const hasActiveChild = group.items.some(i => i.id === currentModule);

            return (
              <div key={group.id} className="space-y-1">
                {/* Group Header Button */}
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    hasActiveChild 
                      ? 'text-amber-700 dark:text-amber-400' 
                      : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <group.icon className="w-3.5 h-3.5" />
                    <span>{group.title}</span>
                  </div>
                  {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>

                {/* Sub Items with Elegant Numbered Badges */}
                {isOpen && (
                  <div className="space-y-1 pl-1">
                    {group.items.map((item) => {
                      const isActive = currentModule === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setCurrentModule(item.id)}
                          className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all group ${
                            isActive
                              ? 'bg-amber-500/10 text-amber-950 dark:text-amber-200 font-bold border border-amber-500/30 shadow-sm'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 font-medium'
                          }`}
                        >
                          {/* Polished Double-digit Number Badge */}
                          <div className={`min-w-8 h-6 px-1.5 rounded-md flex items-center justify-center text-[10.5px] font-mono font-extrabold shrink-0 mt-0.5 border transition-all ${
                            isActive
                              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-transparent shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 group-hover:border-amber-400/50 group-hover:text-amber-600'
                          }`}>
                            {item.num}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="text-xs leading-snug truncate">{item.title}</p>
                            <p className="text-[10px] text-slate-400 truncate font-normal leading-tight mt-0.5">
                              {item.sub}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Employee Context Pill at bottom */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center gap-2.5">
          <img
            src={currentEmp?.avatar}
            alt={currentEmp?.name}
            className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-amber-500/40"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate leading-none">
              {currentEmp?.name}
            </p>
            <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium truncate mt-1">
              {currentEmp?.role}
            </p>
          </div>
          <span className="text-[10px] font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-500">
            {currentEmp?.code}
          </span>
        </div>
      </div>
    </aside>
  );
};
