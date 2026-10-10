import React, { useState } from 'react';
import { 
  AlertTriangle, ShieldAlert, CheckCircle2, ArrowRight, 
  Layers, Users, Sparkles, Plus, ExternalLink, HelpCircle
} from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';

export const CompetencyGapView: React.FC = () => {
  const { 
    employees, selectedEmpId, setSelectedEmpId, 
    calculateGap, competencies, queueGapToIDP, 
    setCurrentModule, getRoleMatrixForEmployee 
  } = useTalent();

  const [viewMode, setViewMode] = useState<'individual' | 'heatmap'>('individual');
  const [toastMsg, setToastMsg] = useState<string>('');

  const activeEmp = employees.find(e => e.id === selectedEmpId) || employees[0];
  const roleMatrix = getRoleMatrixForEmployee(activeEmp);

  // Missing behaviors database in English
  const missingBehaviorsMap: Record<string, string[]> = {
    'FUNC-HRA-003': [
      'Apply Decree 13/2023 regulations and corporate privacy policies when architecting new dashboards',
      'Execute mandatory Pre-Release Privacy Check protocol before publishing datasets to line managers',
      'Configure Row-Level Security (RLS) and dynamic data masking for sensitive compensation and identity attributes'
    ],
    'FUNC-HRA-002': [
      'Conduct multi-source turnover root cause analysis integrating exit interview transcripts and engagement survey signals',
      'Build time-series forecasting models to project headcount requirements for subsequent quarters'
    ],
    'CORE-PS': [
      'Apply 5-Whys methodology and structured Root Cause Analysis (RCA) on recurring workforce reporting discrepancies'
    ]
  };

  const getCompName = (code: string) => 
    competencies.find(c => c.code === code)?.name || code;

  // Compute gaps for active employee
  const empGaps = (roleMatrix?.items || []).map(item => {
    const calc = calculateGap(activeEmp.id, item.code);
    return {
      ...item,
      current: calc.current,
      target: calc.target,
      gap: calc.gap
    };
  });

  // Critical gaps (gap >= 2 on Critical & Required)
  const criticalRestrictions = empGaps.filter(g => g.gap >= 2 && g.imp === 'Critical' && g.req);

  // Calculate Overall Readiness Index %
  const totalWeight = empGaps.filter(g => g.req).reduce((s, g) => s + (g.imp === 'Critical' ? 4 : g.imp === 'High' ? 3 : 2), 0);
  const metWeight = empGaps.filter(g => g.req && g.gap <= 0).reduce((s, g) => s + (g.imp === 'Critical' ? 4 : g.imp === 'High' ? 3 : 2), 0);
  const readinessIndex = totalWeight ? Math.round((metWeight / totalWeight) * 100) : 75;

  const handleQueueIDP = (code: string, type: 'course' | 'coach' | 'ojt', text: string) => {
    queueGapToIDP(activeEmp.id, code, type, text);
    setToastMsg(`Action queued to ${activeEmp.name}'s IDP: [${text}]`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Module 05: Competency Gap Analysis & Operational Risk Alerts</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Identify Skill Gaps & Automated Task Restrictions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Compare calibrated baseline levels against role benchmarks, surface critical operational risks, and automatically convert deficits into actionable 70-20-10 IDP plans.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('individual')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'individual' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Individual: {activeEmp.name.split(' ').pop()}
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'heatmap' ? 'bg-amber-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Team Capability Heatmap
            </button>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in">
          <span>✓ {toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="text-emerald-600 font-bold text-xs hover:text-emerald-800">&times;</button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Overall Readiness Index</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{readinessIndex}%</p>
          <span className="text-[11px] text-slate-400">Weighted by role criticality</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Total Skill Gaps</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {empGaps.filter(g => g.gap > 0 && g.req).length} Competencies
          </p>
          <span className="text-[11px] text-amber-600 font-semibold">Actionable via IDP</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Critical Gaps (Gap &ge; 2)</span>
          <p className="text-2xl font-black text-rose-600 mt-1">
            {empGaps.filter(g => g.gap >= 2 && g.req).length} Severe Deficits
          </p>
          <span className="text-[11px] text-rose-600 font-bold">Mandatory L&D intervention</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Active Task Restrictions</span>
          <p className="text-2xl font-black text-rose-700 dark:text-rose-400 mt-1">
            {criticalRestrictions.length > 0 ? '1 Analyst' : '0'}
          </p>
          <span className="text-[11px] text-slate-400">Restricted sensitive data access</span>
        </div>
      </div>

      {/* Critical Restriction Warning Card (Decree 13 Privacy Alert) */}
      {criticalRestrictions.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800/80 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-extrabold text-sm">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
            <span>MANDATORY GOVERNANCE RESTRICTION ON FILE</span>
          </div>
          <p className="text-xs text-rose-800 dark:text-rose-200 leading-relaxed">
            Analyst <strong>{activeEmp.name}</strong> has a <strong>2-level deficit</strong> in <strong>HR Data Privacy & Decree 13 Compliance (FUNC-HRA-003)</strong>. In compliance with corporate data protection protocol, this analyst is temporarily <strong>restricted from independently publishing unmasked compensation datasets or granting workspace access to line managers</strong> until formal training certification is validated.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => handleQueueIDP('FUNC-HRA-003', 'course', 'Urgent Training: TRN-PRV-01 HR Data Privacy and Decree 13 Compliance')}
              className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              + Queue TRN-PRV-01 to IDP Now
            </button>
            <button
              onClick={() => handleQueueIDP('FUNC-HRA-003', 'coach', 'Assign 1-on-1 Privacy Mentor: Pham Quoc Bao')}
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 font-semibold text-xs shadow-sm transition-all"
            >
              + Assign Senior Mentor
            </button>
          </div>
        </div>
      )}

      {/* Main View Mode */}
      {viewMode === 'individual' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Table: Gaps List (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Competency Gap Breakdown: {activeEmp.name} ({activeEmp.role})
                </h3>
                <p className="text-xs text-slate-400">
                  Gap = Role Target Level - Calibrated Final Level
                </p>
              </div>

              <select
                value={selectedEmpId}
                onChange={(e) => setSelectedEmpId(+e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold border border-slate-200 dark:border-slate-700"
              >
                {employees.map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Competency</th>
                    <th className="p-3 text-center">Current</th>
                    <th className="p-3 text-center">Target</th>
                    <th className="p-3 text-center">Gap</th>
                    <th className="p-3">Risk Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {empGaps.map(g => {
                    const isRed = g.gap >= 2;
                    const isYellow = g.gap === 1;
                    const isMet = g.gap <= 0;

                    return (
                      <tr key={g.code} className={isRed ? 'bg-red-50/30 dark:bg-red-950/20' : 'hover:bg-slate-50/50'}>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">
                          {getCompName(g.code)}
                          <span className="block font-mono text-[10px] text-slate-400">{g.code} • {g.imp} Priority</span>
                        </td>
                        <td className="p-3 text-center font-bold">L{g.current}</td>
                        <td className="p-3 text-center font-bold text-amber-600">L{g.target}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            isRed ? 'bg-rose-100 text-rose-800 font-black' :
                            isYellow ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {g.gap > 0 ? `-${g.gap}` : 'Met'}
                          </span>
                        </td>
                        <td className="p-3">
                          {isRed ? (
                            <span className="font-bold text-rose-600">Critical Gap</span>
                          ) : isYellow ? (
                            <span className="font-semibold text-amber-600">Moderate Gap</span>
                          ) : (
                            <span className="font-semibold text-emerald-600">Benchmark Satisfied</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Behavioral Gap Closure & IDP Queue (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Observable Behaviors Required for Closure
            </h3>
            <p className="text-xs text-slate-400">
              Specific behavioral indicators missing during the calibrated assessment cycle:
            </p>

            <div className="space-y-3">
              {empGaps.filter(g => g.gap > 0).map(g => {
                const behaviors = missingBehaviorsMap[g.code] || [
                  `Demonstrate proficient application of ${getCompName(g.code)} in production deliverables`,
                  `Mentor junior team members and document standard operating procedures`
                ];

                return (
                  <div key={g.code} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{getCompName(g.code)}</span>
                      <span className="text-[10px] font-bold text-amber-600 font-mono">Target: L{g.target}</span>
                    </div>

                    <ul className="space-y-1 pl-4 list-disc text-slate-600 dark:text-slate-400 text-[11px]">
                      {behaviors.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex justify-end gap-1.5">
                      <button
                        onClick={() => handleQueueIDP(g.code, 'ojt', `On-The-Job Task: Apply ${getCompName(g.code)}`)}
                        className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[10px]"
                      >
                        + Add to IDP
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCurrentModule(57)} // Jump to Module 06 IDP
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>Navigate to Individual Development Plan (Module 06 IDP)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Heatmap Mode */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Team Capability Heatmap (People Analytics Function)
          </h3>
          <p className="text-xs text-slate-400">
            Legend: Red = Gap &ge; 2; Amber = Gap of 1; Green = Benchmark satisfied or exceeded:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Analyst</th>
                  <th className="p-3">Level</th>
                  <th className="p-3 text-center">Decree 13 Privacy</th>
                  <th className="p-3 text-center">Workforce Analytics</th>
                  <th className="p-3 text-center">Power BI DAX</th>
                  <th className="p-3 text-center">Python Reconciliation</th>
                  <th className="p-3 text-center">HR Metrics & KPIs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {emp.name}
                    </td>
                    <td className="p-3 text-slate-500 font-mono text-[11px]">{emp.role.split(' ')[0]}</td>
                    {['FUNC-HRA-003', 'FUNC-HRA-002', 'FUNC-DA-002', 'FUNC-DA-003', 'FUNC-HRA-001'].map(code => {
                      const calc = calculateGap(emp.id, code);
                      const isRed = calc.gap >= 2;
                      const isYellow = calc.gap === 1;

                      return (
                        <td key={code} className="p-3 text-center">
                          <span className={`px-2.5 py-1 rounded-lg font-bold text-[10px] inline-block font-mono ${
                            isRed ? 'bg-rose-100 text-rose-800 font-black' :
                            isYellow ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            L{calc.current} / L{calc.target}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
