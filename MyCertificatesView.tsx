import React, { useState } from 'react';
import { 
  CheckSquare, CheckCircle2, AlertTriangle, ArrowRight, 
  ArrowLeft, Lock, FileText, Users, Sliders, ExternalLink, Save
} from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';

export const AssessmentCycleView: React.FC = () => {
  const { 
    assessmentData, employees, selectedEmpId, setSelectedEmpId, 
    competencies, setCurrentModule, lockAssessmentCycle, updateAssessmentScore 
  } = useTalent();

  const [activeStep, setActiveStep] = useState<number>(3); // Default to Step 3: Manager Review
  const [showOutliersOnly, setShowOutliersOnly] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');

  const currentEmp = employees.find(e => e.id === selectedEmpId) || employees[0];
  const empScores = (assessmentData.scores as any)[String(currentEmp.id)] || {};

  const steps = [
    { num: 1, title: '01. Cycle Initiation', desc: 'Define assessment scope & auto-map cohort' },
    { num: 2, title: '02. Self-Evaluation', desc: 'Employee level selection & behavior evidence' },
    { num: 3, title: '03. Manager Review', desc: 'Variance analysis & critical incident review' },
    { num: 4, title: '04. Calibration Board', desc: 'Cross-department bias elimination review' },
    { num: 5, title: '05. Final Baseline Lock', desc: 'Freeze scores & sync competency profiles' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2">
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Module 04: Competency Assessment Cycle (Multi-Rater Governance)</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {assessmentData.cycleName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Standardized 5-stage evaluation workflow enforcing objectivity from self-reflection to Calibration Committee approval and locked capability baselines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Assessment Cycle Active</span>
            </span>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in">
          <span>✓ {toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="text-emerald-600 font-bold text-xs hover:text-emerald-800">&times;</button>
        </div>
      )}

      {/* 5-Step Stepper Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {steps.map(s => {
          const isCurrent = activeStep === s.num;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isCurrent
                  ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded font-mono ${isCurrent ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  Step {s.num}
                </span>
                <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-white' : 'text-emerald-500'}`} />
              </div>
              <p className="font-extrabold text-xs truncate">{s.title.split('. ')[1]}</p>
              <p className={`text-[10px] truncate mt-0.5 ${isCurrent ? 'text-amber-100' : 'text-slate-400'}`}>
                {s.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Employee Context Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={currentEmp.avatar}
            alt={currentEmp.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500"
          />
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">{currentEmp.name}</h4>
            <p className="text-slate-400 text-[11px]">{currentEmp.role} • Team: {currentEmp.team} • Code: {currentEmp.code}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 hidden sm:inline font-semibold">Active Candidate:</span>
          <select
            value={selectedEmpId}
            onChange={(e) => setSelectedEmpId(+e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs"
          >
            {employees.map(e => (
              <option key={e.id} value={e.id}>{e.name} ({e.role.split(' ')[0]})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Step Content */}
      {/* STEP 1: CYCLE INITIATION */}
      {activeStep === 1 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Cycle Initiation & Scope Definition
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Assessment cycle '{assessmentData.cycleName}' covers all 5 personnel across the People Analytics and HR Operations Analytics job family. Standardized rating window: October 1 to November 15, 2026.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Eligible Participants:</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">5 Employees</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Assigned Roles:</span>
              <p className="text-lg font-bold text-amber-600 mt-1">Junior, Mid, Senior, Manager</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block">Scale Standard:</span>
              <p className="text-lg font-bold text-emerald-600 mt-1">5-Level Behavioral Scale</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: SELF EVALUATION */}
      {activeStep === 2 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Employee Self-Evaluation (Candidate: {currentEmp.name})
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Adjust your self-assessed proficiency levels and input behavioral reflection notes.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Competency</th>
                  <th className="p-3 text-center">Self-Rating (Input)</th>
                  <th className="p-3">Self-Reflection & Behavioral Evidence (Input)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {Object.keys(empScores).map(code => {
                  const rec = empScores[code];
                  const comp = competencies.find(c => c.code === code);
                  return (
                    <tr key={code} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">
                        {comp ? comp.name : code}
                        <span className="block font-mono text-[10px] text-slate-400">{code}</span>
                      </td>
                      <td className="p-3 text-center">
                        <select
                          value={rec.self}
                          onChange={(e) => {
                            updateAssessmentScore(currentEmp.id, code, +e.target.value, rec.mg, rec.note, rec.justification);
                            setToastMsg(`Updated self-rating for ${code} to L${e.target.value}`);
                          }}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-amber-600 font-mono"
                        >
                          {[1, 2, 3, 4, 5].map(l => (
                            <option key={l} value={l}>L{l}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={rec.note || ''}
                          onChange={(e) => {
                            updateAssessmentScore(currentEmp.id, code, rec.self, rec.mg, e.target.value, rec.justification);
                          }}
                          placeholder="Provide evidence or projects completed..."
                          className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* STEP 3: MANAGER REVIEW */}
      {activeStep === 3 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Manager Evaluation & Variance Analysis (Editable Manager Ratings)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Governance Rules: Variance = 0 (Consensus); Variance &plusmn;1 (Notice); Variance &ge; 2 (Critical Outlier: Mandatory incident justification required).
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Competency</th>
                    <th className="p-3 text-center">Self-Rating</th>
                    <th className="p-3 text-center">Manager Rating (Input)</th>
                    <th className="p-3 text-center">Variance</th>
                    <th className="p-3">Self-Reflection & Behavioral Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {Object.keys(empScores).map(code => {
                    const rec = empScores[code];
                    const comp = competencies.find(c => c.code === code);
                    const variance = rec.mg - rec.self;
                    const isHighVariance = Math.abs(variance) >= 2;

                    return (
                      <tr key={code} className={isHighVariance ? 'bg-red-50/40 dark:bg-red-950/20' : 'hover:bg-slate-50/50'}>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">
                          {comp ? comp.name : code}
                          <span className="block font-mono text-[10px] text-slate-400">{code}</span>
                        </td>
                        <td className="p-3 text-center font-bold">L{rec.self}</td>
                        <td className="p-3 text-center">
                          <select
                            value={rec.mg}
                            onChange={(e) => {
                              updateAssessmentScore(currentEmp.id, code, rec.self, +e.target.value, rec.note, rec.justification);
                              setToastMsg(`Updated manager rating for ${code} to L${e.target.value}`);
                            }}
                            className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-extrabold text-indigo-600 font-mono text-center cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5].map(l => (
                              <option key={l} value={l}>L{l}</option>
                            ))}
                          </select>
                        </td>
                        <td className="p-3 text-center font-mono">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            isHighVariance 
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' 
                              : variance === 0 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : 'bg-amber-100 text-amber-800'
                          }`}>
                            {variance > 0 ? `+${variance}` : variance} {isHighVariance ? '⚠ Outlier' : ''}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-400">
                          {rec.note || '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Required: Critical Justification Alert (Demo case for Tran Minh Khoa: FUNC-HRA-003) */}
          {currentEmp.id === 2 && (
            <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800/80 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-extrabold text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>MANDATORY GOVERNANCE OVERRIDE ON RECORD: Decree 13 Privacy (FUNC-HRA-003)</span>
              </div>
              <p className="text-xs text-rose-800 dark:text-rose-200">
                Self evaluated as <strong>L3 (Proficient)</strong>, but Line Manager assigned <strong>L1 (Basic)</strong> &rarr; Net variance of -2 levels.
              </p>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Official Manager Justification: </span>
                  <input
                    type="text"
                    value={empScores['FUNC-HRA-003']?.justification || ''}
                    onChange={(e) => {
                      updateAssessmentScore(currentEmp.id, 'FUNC-HRA-003', empScores['FUNC-HRA-003'].self, empScores['FUNC-HRA-003'].mg, empScores['FUNC-HRA-003'].note, e.target.value);
                    }}
                    className="w-full mt-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>
                <div>
                  <span className="font-bold text-rose-600">Recorded Incident Log (Audit Trail): </span>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed italic">
                    "{empScores['FUNC-HRA-003']?.criticalIncident}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 4: CALIBRATION MEETING */}
      {activeStep === 4 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Cross-Team Calibration Board (Mitigating Rater Bias)
            </h3>
            <p className="text-xs text-slate-400">
              Joint committee composed of HR Business Partners, Function Leads, and Compliance Officers to normalize grading leniency or strictness across business units.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300">People Analytics Unit:</span>
                <p className="text-slate-500">Benchmark Mean: L3.1 • Manager Rating Mean: L2.9</p>
                <span className="text-[10px] text-emerald-600 font-bold">Standard Gaussian Distribution (Neutral)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300">HR Operations Analytics Unit:</span>
                <p className="text-slate-500">Benchmark Mean: L3.2 • Manager Rating Mean: L3.4</p>
                <span className="text-[10px] text-amber-600 font-bold">Slight Leniency Skew (+0.2 delta normalized)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: FINAL LOCK */}
      {activeStep === 5 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-5 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto">
            <h3 className="font-black text-lg text-slate-900 dark:text-white">
              Assessment Cycle Formally Locked
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              All competency ratings have been frozen as the verified baseline. Data is synchronized across <strong>Skill Profiles</strong>, activating <strong>Competency Gap Analysis (Module 05)</strong> and <strong>IDP 70-20-10 (Module 06)</strong>.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setCurrentModule(55)} // Jump directly to Module 05 Identify Gaps
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 mx-auto shadow-md transition-all"
            >
              <span>Inspect Competency Gap Heatmap (Module 05)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
