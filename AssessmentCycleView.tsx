import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, AlertTriangle, Sparkles, 
  Clock, ArrowRight, UserCheck, ShieldCheck, 
  Send, Sliders, Calendar, Play
} from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';
import { IDPAction } from '../../../types/talent';

export const IDPView: React.FC = () => {
  const { 
    idpPlans, employees, selectedEmpId, setSelectedEmpId, 
    updateIDPActionProgress, setCurrentModule 
  } = useTalent();

  const [activePlanId, setActivePlanId] = useState<string>('IDP-2026-014');
  const [activeSubTab, setActiveSubTab] = useState<'plan' | 'ai' | 'approval' | 'timeline'>('plan');
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [aiGeneratedGoal, setAiGeneratedGoal] = useState<string>('');

  const currentEmp = employees.find(e => e.id === selectedEmpId) || employees[0];
  const activePlan = idpPlans.find(p => p.id === activePlanId) || idpPlans[0];

  // 70-20-10 Learning Mix Calculation
  const totalActions = activePlan.actions.length;
  const ojtCount = activePlan.actions.filter(a => a.type === 'ojt').length;
  const coachCount = activePlan.actions.filter(a => a.type === 'coach').length;
  const formalCount = activePlan.actions.filter(a => a.type === 'formal').length;

  const ojtPct = totalActions ? Math.round((ojtCount / totalActions) * 100) : 70;
  const coachPct = totalActions ? Math.round((coachCount / totalActions) * 100) : 20;
  const formalPct = totalActions ? Math.round((formalCount / totalActions) * 100) : 10;

  // Plan overall progress %
  const planProgress = totalActions 
    ? Math.round(activePlan.actions.reduce((sum, a) => sum + a.progress, 0) / totalActions) 
    : 0;

  const handleGenerateAiIDP = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setIsAiGenerating(false);
      setAiGeneratedGoal(
        `Advance professional capability for promotion to ${activePlan.targetRole || 'Senior HR Data Analyst'}: Prioritize remediating Decree 13 compliance deficits (L1 to L3) by completing formal data privacy certification, bi-weekly 1-on-1 coaching, and leading Row-Level Security (RLS) audits on enterprise production dashboards.`
      );
    }, 800);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2">
          <FileText className="w-3.5 h-3.5" />
          <span>Module 06: Individual Development Plan (IDP 70-20-10 Framework)</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              70-20-10 Development Architecture & Multi-Tier Approval
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Action-oriented talent acceleration integrating 70% experiential on-the-job projects, 20% mentorship and coaching, and 10% structured formal coursework.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{activePlan.status} (Active Plan)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Plan Header Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-amber-600">{activePlan.id}</span>
              <span className="text-xs text-slate-400">• Period: {activePlan.period}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 uppercase">
                Priority: {activePlan.priority}
              </span>
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-1">
              {activePlan.goal}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Target Role: <strong className="text-slate-800 dark:text-slate-200">{activePlan.targetRole}</strong> • Deadline: <strong>{activePlan.targetDate}</strong>
            </p>
          </div>

          {/* Quick Plan Switcher */}
          <div className="flex items-center gap-2">
            <select
              value={activePlanId}
              onChange={(e) => setActivePlanId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
            >
              {idpPlans.map(p => (
                <option key={p.id} value={p.id}>
                  {p.id} ({p.empId === 2 ? 'Khoa - HRDA' : p.empId === 4 ? 'Bao - Senior' : 'Other'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 70-20-10 Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              70-20-10 Development Balance Breakdown:
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              OJT: {ojtPct}% • Coaching: {coachPct}% • Formal: {formalPct}%
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
            <div style={{ width: `${ojtPct}%` }} className="bg-amber-500" title={`70% On-The-Job Experiential (${ojtCount} tasks)`} />
            <div style={{ width: `${coachPct}%` }} className="bg-emerald-500" title={`20% Mentoring & Coaching (${coachCount} tasks)`} />
            <div style={{ width: `${formalPct}%` }} className="bg-indigo-600" title={`10% Formal Coursework (${formalCount} courses)`} />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>On-The-Job (70%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Coaching (20%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                <span>Formal Coursework (10%)</span>
              </span>
            </div>

            <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
              Overall Progress: {planProgress}%
            </span>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveSubTab('plan')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'plan'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          1. Action Items Matrix ({activePlan.actions.length} Tasks)
        </button>
        <button
          onClick={() => setActiveSubTab('ai')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'ai'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          2. AI IDP Copilot (Automated Goal Formulation)
        </button>
        <button
          onClick={() => setActiveSubTab('approval')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'approval'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          3. Multi-Tier Approval Stepper
        </button>
        <button
          onClick={() => setActiveSubTab('timeline')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeSubTab === 'timeline'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          4. Governance Audit Trail
        </button>
      </div>

      {/* SUBTAB 1: ACTION PLAN ITEMS */}
      {activeSubTab === 'plan' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Targeted Development Activities & Milestone Checkpoints
            </h3>
            <span className="text-xs text-slate-400">
              Drag sliders to update progress (Synchronizes with Training Operations in Modules 08 & 09)
            </span>
          </div>

          <div className="space-y-3">
            {activePlan.actions.map(action => {
              const isDone = action.progress === 100;
              return (
                <div
                  key={action.id}
                  className={`p-4 rounded-xl border transition-all text-xs space-y-3 ${
                    isDone 
                      ? 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60' 
                      : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        action.type === 'formal' ? 'bg-indigo-100 text-indigo-800' :
                        action.type === 'coach' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {action.type === 'formal' ? '10% Formal' : action.type === 'coach' ? '20% Coaching' : '70% OJT'}
                      </span>
                      {action.stretch && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          Stretch Assignment
                        </span>
                      )}
                      <span className="font-bold text-slate-900 dark:text-white">{action.area}</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      <span>Owner: <strong className="text-slate-700 dark:text-slate-300">{action.owner}</strong></span>
                      <span>Target: <strong className="font-mono">{action.due}</strong></span>
                    </div>
                  </div>

                  <p className="font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                    {action.item}
                  </p>

                  {/* Interactive Slider */}
                  <div className="flex items-center gap-4 pt-1">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={5}
                      value={action.progress}
                      onChange={(e) => updateIDPActionProgress(activePlan.id, action.id, +e.target.value)}
                      className="flex-1 accent-amber-600 cursor-pointer"
                    />
                    <span className="font-extrabold text-amber-600 dark:text-amber-400 w-12 text-right font-mono">
                      {action.progress}%
                    </span>
                    {isDone && (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400">
              Formal courses automatically publish to Module 08 (Training Delivery Schedules).
            </span>
            <button
              onClick={() => setCurrentModule(58)} // Jump to Module 07
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>Explore Course Catalogs (Modules 07 & 08)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* SUBTAB 2: AI IDP COPILOT */}
      {activeSubTab === 'ai' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              AI IDP Copilot: Automated 70-20-10 Roadmap Generation
            </h3>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
            Synthesizes H1/2027 assessment outcomes, detected competency gaps, and target promotion milestones into personalized SMART objectives with pre-mapped experiential tasks.
          </p>

          <button
            onClick={handleGenerateAiIDP}
            disabled={isAiGenerating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-600/20 disabled:opacity-50 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAiGenerating ? 'AI Synthesizing Competency Gaps...' : 'Synthesize SMART Development Plan'}</span>
          </button>

          {aiGeneratedGoal && (
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs space-y-3 animate-in fade-in">
              <span className="font-bold text-amber-900 dark:text-amber-200 block">
                AI Generated Strategic Development Objective:
              </span>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-serif text-sm italic">
                "{aiGeneratedGoal}"
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => alert('SMART Objective applied to active IDP plan.')}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs shadow-sm hover:bg-amber-700 transition-all"
                >
                  Adopt as Active Objective
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: APPROVAL FLOW */}
      {activeSubTab === 'approval' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Four-Stage IDP Approval & Verification Workflow
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">1. Draft Created</span>
              <p className="text-[11px] text-slate-500">Submitted by Employee</p>
              <span className="text-[10px] font-bold text-emerald-600">✓ Submitted</span>
            </div>

            <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">2. Manager Endorsement</span>
              <p className="text-[11px] text-slate-500">Pham Thi Hanh (Manager)</p>
              <span className="text-[10px] font-bold text-emerald-600">✓ Endorsed</span>
            </div>

            <div className="p-4 rounded-xl border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">3. HRBP Budget Review</span>
              <p className="text-[11px] text-slate-500">Training Budget Allocated</p>
              <span className="text-[10px] font-bold text-emerald-600">✓ Approved</span>
            </div>

            <div className="p-4 rounded-xl border border-amber-400 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/20 space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-400">4. Active Execution</span>
              <p className="text-[11px] text-slate-500">Deadline: March 31, 2027</p>
              <span className="text-[10px] font-bold text-amber-600">In Progress</span>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: TIMELINE */}
      {activeSubTab === 'timeline' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Governance Audit Log & Milestone Sign-Offs
          </h3>

          <div className="space-y-3 pl-4 border-l-2 border-slate-200 dark:border-slate-800 ml-2 text-xs">
            {activePlan.log.map((log, idx) => (
              <div key={idx} className="relative pl-4 space-y-0.5">
                <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-600" />
                <span className="font-mono text-[10px] text-slate-400">{log.date}</span>
                <p className="font-bold text-slate-900 dark:text-white">
                  {log.who} - <span className="font-normal text-slate-600 dark:text-slate-400">{log.event}</span>
                </p>
                {log.comment && (
                  <p className="text-slate-500 italic text-[11px]">"{log.comment}"</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
