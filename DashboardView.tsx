import React, { useState } from 'react';
import { 
  Building2, TrendingUp, Users, Network, CheckCircle2, 
  ArrowRight, ShieldAlert, GitBranch, Layers, ChevronDown, 
  ChevronRight, Plus, Minus, UserCheck, AlertTriangle
} from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';

export const OrgPlanningView: React.FC = () => {
  const { currentModule, employees, setCurrentModule } = useTalent();

  // Headcount plan state (Editable inputs)
  const [headcountPlan, setHeadcountPlan] = useState<Record<string, number>>({
    'Junior HR Data Analyst': 2,
    'HR Data Analyst': 4,
    'Senior HR Data Analyst': 3,
    'HR Analytics Manager': 2,
    'Head of People Analytics': 1
  });

  // Interactive Tree Collapsible State
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({
    'head': false,
    'mgr-hanh': false,
    'mgr-huy': false
  });

  const toggleNode = (nodeKey: string) => {
    setCollapsedNodes(prev => ({ ...prev, [nodeKey]: !prev[nodeKey] }));
  };

  const collapseAll = () => {
    setCollapsedNodes({
      'head': true,
      'mgr-hanh': true,
      'mgr-huy': true
    });
  };

  const expandAll = () => {
    setCollapsedNodes({
      'head': false,
      'mgr-hanh': false,
      'mgr-huy': false
    });
  };

  const strategicInitiatives = [
    {
      title: 'Expand People Analytics into HR Operations & Talent Acquisition',
      target: '+18% enterprise operational efficiency in FY2027',
      impactRole: 'HR Data Analyst',
      addedHeadcount: 1,
      sourcing: 'Build: Internal upskilling from Junior via IDP'
    },
    {
      title: 'Automate enterprise HR KPI dashboards with Power BI',
      target: 'Save 250 manual hours/month; -10% service cost',
      impactRole: 'Junior HR Data Analyst',
      addedHeadcount: 1,
      sourcing: 'Hire: External recruitment with Power BI cert'
    },
    {
      title: 'Deploy predictive attrition modeling & smart headcount forecasting',
      target: 'Reduce key talent attrition by 4.5 pts',
      impactRole: 'Senior HR Data Analyst',
      addedHeadcount: 1,
      sourcing: 'Build: Promote HR Data Analyst upon IDP completion'
    },
    {
      title: 'Standardize personal data compliance under Decree 13/2023',
      target: '100% compliance audit pass; 0 data leak incidents',
      impactRole: 'HR Data Analyst',
      addedHeadcount: 0,
      sourcing: 'Mandatory certification across entire team'
    }
  ];

  const currentCount = (roleName: string) => 
    employees.filter(e => e.role.toLowerCase() === roleName.toLowerCase()).length;

  const isHeadcountView = currentModule === 65;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold text-xs mb-2">
          <Building2 className="w-3.5 h-3.5" />
          <span>Module {isHeadcountView ? '01' : '02'}: Organization Foundation</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isHeadcountView ? '01. Business Growth & Headcount Planning' : '02. Org Structure & Job Level Hierarchy (Job Family)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {isHeadcountView 
                ? 'Translate strategic enterprise growth targets into headcount allocation and role level hierarchies for the HR Data Analyst job family.'
                : 'Interactive hierarchical reporting lines, vacancy risk indicators, and collapsible talent structures for the People Analytics division.'}
            </p>
          </div>

          {/* Quick Module Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold shrink-0">
            <button
              onClick={() => setCurrentModule(65)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                isHeadcountView 
                  ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              01. Headcount Plan
            </button>
            <button
              onClick={() => setCurrentModule(66)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                !isHeadcountView 
                  ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              02. Org Structure Tree
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Current Headcount</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{employees.length} Staff</p>
          <span className="text-[11px] text-slate-400">100% in People Analytics domain</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Planned Headcount FY2027</span>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {Object.values(headcountPlan).reduce((a, b) => a + b, 0)} Roles
          </p>
          <span className="text-[11px] text-amber-600 font-bold">+5 net expansion roles</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Internal Sourcing (Build)</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">3 Staff (Build)</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Active in IDP pipeline</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">External Sourcing (Buy)</span>
          <p className="text-2xl font-black text-indigo-600 mt-1">2 Roles (Buy)</p>
          <span className="text-[11px] text-slate-400">Specialist MLOps & BI Lead</span>
        </div>
      </div>

      {/* Content based on Module Selected */}
      {isHeadcountView ? (
        <>
          {/* Strategic Initiatives Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>Strategic Growth Initiatives & Workforce Headcount Impact</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Initiative</th>
                    <th className="p-3">Target KPI</th>
                    <th className="p-3">Impacted Position</th>
                    <th className="p-3">Headcount Delta</th>
                    <th className="p-3">Sourcing Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {strategicInitiatives.map((ini, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">{ini.title}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">{ini.target}</td>
                      <td className="p-3 font-semibold text-amber-700 dark:text-amber-400">{ini.impactRole}</td>
                      <td className="p-3 font-bold text-indigo-600">+{ini.addedHeadcount}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{ini.sourcing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Headcount Plan Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Headcount Allocation by Job Level (Editable Workforce Plan)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Edit planned headcount numbers to observe automatic surplus/shortage calculations in real-time</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Job Title</th>
                    <th className="p-3">Grade</th>
                    <th className="p-3">Current</th>
                    <th className="p-3">Planned FY2027</th>
                    <th className="p-3">Gap Status</th>
                    <th className="p-3">Internal Pipeline (IDP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {Object.keys(headcountPlan).map(role => {
                    const cur = currentCount(role);
                    const plan = headcountPlan[role];
                    const diff = plan - cur;
                    const internalPipelines = employees.filter(e => e.targetRole === role && e.role !== role);

                    return (
                      <tr key={role}>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{role}</td>
                        <td className="p-3 font-mono text-slate-500">
                          {role.includes('Junior') ? 'G2' : role.includes('Senior') ? 'G4' : role.includes('Manager') ? 'G5' : role.includes('Head') ? 'G6' : 'G3'}
                        </td>
                        <td className="p-3 font-bold">{cur}</td>
                        <td className="p-3">
                          <input
                            type="number"
                            min={0}
                            value={plan}
                            onChange={(e) => setHeadcountPlan({ ...headcountPlan, [role]: Math.max(0, +e.target.value) })}
                            className="w-16 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-center"
                          />
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            diff > 0 ? 'bg-amber-100 text-amber-800' : diff < 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {diff > 0 ? `Shortage: ${diff}` : diff < 0 ? `Surplus: ${-diff}` : 'Balanced'}
                          </span>
                        </td>
                        <td className="p-3">
                          {internalPipelines.length > 0 ? (
                            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                              {internalPipelines.map(p => p.name).join(', ')} (Build via IDP)
                            </span>
                          ) : (
                            <span className="text-slate-400">External recruitment (Buy)</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setCurrentModule(66)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <span>View Collapsible Org Hierarchy Tree (Module 02)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Organization Chart Tree with Collapsible Nodes */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Network className="w-4 h-4 text-indigo-500" />
                <span>Reporting Line & Org Structure Tree (HR Data Analyst Family)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any section arrow or the Expand/Collapse buttons to toggle organizational branches
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={expandAll}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 font-sans text-xs space-y-3">
            {/* Level 0: Head */}
            <div 
              onClick={() => toggleNode('head')}
              className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 font-bold flex items-center justify-between text-amber-900 dark:text-amber-300 cursor-pointer hover:bg-amber-500/15 transition-all"
            >
              <div className="flex items-center gap-2">
                <button className="p-0.5 text-amber-700 dark:text-amber-300">
                  {collapsedNodes['head'] ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <span className="w-6 h-6 rounded-md bg-amber-600 text-white flex items-center justify-center font-mono text-[10px]">G6</span>
                <span className="text-sm">Head of People Analytics (Planned Role FY2027)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-200/60 dark:bg-amber-900/40">Reports to CHRO</span>
                <span className="text-[10px] text-amber-700 font-semibold hidden sm:inline">Click to {collapsedNodes['head'] ? 'expand' : 'collapse'}</span>
              </div>
            </div>

            {/* Level 1: Managers (Child of Head) */}
            {!collapsedNodes['head'] && (
              <div className="pl-6 space-y-4 border-l-2 border-slate-300 dark:border-slate-700 ml-3 transition-all animate-in fade-in">
                {/* Manager 1: Pham Thi Hanh */}
                <div className="space-y-2">
                  <div 
                    onClick={() => toggleNode('mgr-hanh')}
                    className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between text-indigo-900 dark:text-indigo-300 cursor-pointer hover:bg-indigo-500/15 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <button className="p-0.5 text-indigo-600">
                        {collapsedNodes['mgr-hanh'] ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-mono text-[10px]">G5</span>
                      <span className="font-bold">HR Analytics Manager: Pham Thi Hanh</span>
                      <span className="text-slate-500 font-normal hidden sm:inline">• People Analytics Team (3 Analysts)</span>
                    </div>
                    <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
                      Vacancy Risk: High (18 mos)
                    </span>
                  </div>

                  {/* Level 2: Team People Analytics */}
                  {!collapsedNodes['mgr-hanh'] && (
                    <div className="pl-6 space-y-2 border-l-2 border-slate-300 dark:border-slate-700 ml-3 animate-in fade-in">
                      <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center justify-center">G4</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            Pham Quoc Bao <span className="text-slate-400 font-normal">(Senior HRDA)</span>
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          Successor #1 for Manager Role (Ready Now)
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-mono font-bold flex items-center justify-center">G3</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            Tran Minh Khoa <span className="text-slate-400 font-normal">(HRDA)</span>
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                          Senior Readiness IDP (Closing Decree 13 gap)
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold flex items-center justify-center">G2</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            Nguyen Thi Lan <span className="text-slate-400 font-normal">(Junior HRDA)</span>
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                          Mentored 1-1 by Bao
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Manager 2: Do Quang Huy */}
                <div className="space-y-2">
                  <div 
                    onClick={() => toggleNode('mgr-huy')}
                    className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between text-indigo-900 dark:text-indigo-300 cursor-pointer hover:bg-indigo-500/15 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <button className="p-0.5 text-indigo-600">
                        {collapsedNodes['mgr-huy'] ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      <span className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center font-mono text-[10px]">G5</span>
                      <span className="font-bold">HR Analytics Manager: Do Quang Huy</span>
                      <span className="text-slate-500 font-normal hidden sm:inline">• HR Operations Analytics Team (2 Analysts)</span>
                    </div>
                    <span className="text-[10px] text-amber-600 font-bold bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                      Vacancy Risk: Medium
                    </span>
                  </div>

                  {/* Level 2: Team HR Ops Analytics */}
                  {!collapsedNodes['mgr-huy'] && (
                    <div className="pl-6 space-y-2 border-l-2 border-slate-300 dark:border-slate-700 ml-3 animate-in fade-in">
                      <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold flex items-center justify-center">G4</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            Vo Thanh Mai <span className="text-slate-400 font-normal">(Senior HRDA)</span>
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                          Top Performer (9-Box Star)
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-mono font-bold flex items-center justify-center">G3</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            Le Hoang Yen <span className="text-slate-400 font-normal">(HRDA)</span>
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          Manager Nominated for Senior Promotion
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
