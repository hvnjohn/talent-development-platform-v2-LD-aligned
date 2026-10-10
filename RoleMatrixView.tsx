import React, { useState } from 'react';
import { 
  Users, TrendingUp, GitFork, Award, CheckCircle2, 
  Sparkles, ArrowRight, ShieldCheck, UserCheck, 
  ChevronRight, Sliders, AlertCircle
} from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';

export const PerformanceSuccessionViews: React.FC = () => {
  const { 
    currentModule, employees, selectedEmpId, setSelectedEmpId, 
    successionPositions, calculateCompetencyFit, 
    calculatePromotionReadiness, calibrate9Box, 
    nominations, addPromotionNomination, advanceNomination,
    getCompetencyLevel, roleMatrices
  } = useTalent();

  const [calibratingEmpId, setCalibratingEmpId] = useState<number>(4); // Default to Pham Quoc Bao
  const [selectedPerf, setSelectedPerf] = useState<number>(3); // 1-3
  const [selectedPot, setSelectedPot] = useState<number>(3); // 1-3
  const [calibReason, setCalibReason] = useState<string>('Bao demonstrated exemplary technical leadership by deploying the ML attrition model with 84% accuracy and mentoring junior analysts.');
  const [toastMsg, setToastMsg] = useState<string>('');

  const activeEmp = employees.find(e => e.id === selectedEmpId) || employees[0];
  const readiness = calculatePromotionReadiness(activeEmp);

  // 9-Box Matrix Label Definitions in English
  const nineBoxLabels: Record<string, { label: string; desc: string; color: string }> = {
    '3-3': { label: 'Star', desc: 'High performance & exceptional leadership potential', color: 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/40' },
    '3-2': { label: 'High Performer', desc: 'Outstanding deliverable quality, strong growth potential', color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-400/30' },
    '3-1': { label: 'Solid Professional', desc: 'Dependable subject matter expert in current role', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-400/30' },
    '2-3': { label: 'Future Star', desc: 'High potential; requires further domain seasoning', color: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30' },
    '2-2': { label: 'Core Player', desc: 'Reliable, steady contributor meeting expectations', color: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700' },
    '2-1': { label: 'Effective Contributor', desc: 'Meets role requirements; standard output pace', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700' },
    '1-3': { label: 'Enigma / Rough Diamond', desc: 'Very high raw potential lacking consistent output', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-400/30' },
    '1-2': { label: 'Inconsistent Performer', desc: 'Requires closer coaching and concrete goals', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-400/30' },
    '1-1': { label: 'Talent Risk', desc: 'Underperforming; requires Performance Improvement Plan (PIP)', color: 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/40' }
  };

  const handleSaveCalibration = () => {
    calibrate9Box(calibratingEmpId, selectedPerf, selectedPot, calibReason);
    const emp = employees.find(e => e.id === calibratingEmpId);
    setToastMsg(`Successfully calibrated 9-Box placement for ${emp?.name}. Succession bench rankings updated!`);
  };

  // Career Ladder for People Analytics
  const careerLadder = [
    { role: 'Junior HR Data Analyst', grade: 'G2', years: '0 - 2 yrs' },
    { role: 'HR Data Analyst', grade: 'G3', years: '2 - 4 yrs' },
    { role: 'Senior HR Data Analyst', grade: 'G4', years: '4 - 6 yrs' },
    { role: 'HR Analytics Manager', grade: 'G5', years: '6 - 9 yrs' },
    { role: 'Head of People Analytics', grade: 'G6', years: '10+ yrs' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2">
          <Users className="w-3.5 h-3.5" />
          <span>Modules 10, 11 & 12: Performance Trajectory, 9-Box Grid & Succession Bench</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {currentModule === 61 ? '10. Track Performance & Competency Trajectory' :
           currentModule === 62 ? '11. 9-Box Grid Calibration & Succession Bench Planning' :
           '12. Career Pathing & Promotion Readiness Index'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Evaluate leadership potential, calibrate bench depth for mission-critical roles, and automatically calculate multi-factor Promotion Readiness Indices.
        </p>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in">
          <span>✓ {toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="text-emerald-600 font-bold text-xs hover:text-emerald-800">&times;</button>
        </div>
      )}

      {/* MODULE 61: PERFORMANCE TRACKING */}
      {currentModule === 61 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Historical Performance Rating Trajectory (Last 4 Cycles)
              </h3>
              <p className="text-xs text-slate-400">Inspecting Analyst: <strong>{activeEmp.name}</strong> ({activeEmp.role})</p>

              <div className="flex items-end justify-between gap-3 h-48 pt-6 pb-2 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                {['H2 2024', 'H1 2025', 'H2 2025', 'H1 2026'].map((period, idx) => {
                  const rating = activeEmp.performanceRatings[idx] || 3;
                  const heightPct = (rating / 5) * 100;
                  return (
                    <div key={period} className="flex-1 flex flex-col items-center gap-2">
                      <span className="font-extrabold text-xs text-amber-600 font-mono">{rating}.0 / 5</span>
                      <div className="w-full max-w-[48px] bg-slate-200 dark:bg-slate-700 h-32 rounded-t-lg overflow-hidden flex items-end">
                        <div style={{ height: `${heightPct}%` }} className="w-full bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-lg transition-all" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{period}</span>
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-bold text-amber-900 dark:text-amber-200 block mb-0.5">Direct Business KPI Impact:</span>
                {activeEmp.businessKpi[0]}: Improved from <strong>{activeEmp.businessKpi[1]}</strong> down to <strong>{activeEmp.businessKpi[2]}</strong> following compliance and privacy retraining.
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  AI Talent Diagnostic & Performance Insights
                </h3>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">Key Technical Strengths:</span>
                  {activeEmp.role.includes('Senior') 
                    ? 'Predictive attrition modeling and advanced DAX calculations rank in the top 5th percentile across the enterprise.' 
                    : 'Fast learner who consistently completes self-paced learning paths ahead of deadlines with high practical retention.'}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">Room for Professional Growth:</span>
                  Ensure rigorous compliance checks under Decree 13 before releasing public datasets, and lead technical coaching circles on internal forums to develop leadership presence.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 62: 9-BOX & SUCCESSION PLANNING */}
      {currentModule === 62 && (
        <div className="space-y-6">
          {/* 9-Box Grid & Calibration Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 9-Box Grid (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    9-Box Talent Matrix (Performance vs Potential)
                  </h3>
                  <p className="text-xs text-slate-400">Y-Axis: Potential (1-3) • X-Axis: Performance (1-3)</p>
                </div>
              </div>

              {/* 3x3 Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                {[3, 2, 1].map(pot => (
                  [1, 2, 3].map(perf => {
                    const key = `${pot}-${perf}`;
                    const config = nineBoxLabels[key];
                    const matchedEmps = employees.filter(e => {
                      const empPerf = (e.performanceRatings[3] || 3) >= 4 ? 3 : (e.performanceRatings[3] || 3) >= 3 ? 2 : 1;
                      return e.potentialRating === pot && empPerf === perf;
                    });

                    return (
                      <div
                        key={key}
                        className={`p-2.5 rounded-xl border min-h-[90px] flex flex-col justify-between text-xs transition-all ${config.color}`}
                      >
                        <span className="font-bold text-[10px] uppercase leading-tight line-clamp-1">{config.label}</span>
                        <div className="space-y-1 my-1">
                          {matchedEmps.map(emp => (
                            <button
                              key={emp.id}
                              onClick={() => {
                                setCalibratingEmpId(emp.id);
                                setSelectedPerf(perf);
                                setSelectedPot(pot);
                              }}
                              className={`w-full px-2 py-1 rounded text-left font-bold text-[11px] truncate flex items-center justify-between transition-colors ${
                                calibratingEmpId === emp.id ? 'bg-amber-600 text-white shadow-sm' : 'bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900'
                              }`}
                            >
                              <span>{emp.name.split(' ').slice(-2).join(' ')}</span>
                              <span className="text-[9px] opacity-75 font-mono">{emp.role.split(' ')[0]}</span>
                            </button>
                          ))}
                        </div>
                        <span className="text-[9px] opacity-60 text-right">{matchedEmps.length} talent{matchedEmps.length !== 1 ? 's' : ''}</span>
                      </div>
                    );
                  })
                ))}
              </div>
            </div>

            {/* Right: Calibration Form (5 cols) */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Committee Talent Calibration Form
              </h3>
              <p className="text-xs text-slate-400">
                Calibrating placement for: <strong>{employees.find(e => e.id === calibratingEmpId)?.name}</strong>
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Calibrated Performance Level:
                  </label>
                  <select
                    value={selectedPerf}
                    onChange={(e) => setSelectedPerf(+e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  >
                    <option value={3}>Level 3: Exceeds Benchmark (Ratings 4-5)</option>
                    <option value={2}>Level 2: Meets Expectations (Rating 3)</option>
                    <option value={1}>Level 1: Needs Improvement (Ratings 1-2)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Calibrated Growth Potential:
                  </label>
                  <select
                    value={selectedPot}
                    onChange={(e) => setSelectedPot(+e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                  >
                    <option value={3}>Level 3: High Potential (Ready for larger enterprise scope)</option>
                    <option value={2}>Level 2: Medium Potential (Lateral growth & specialized mastery)</option>
                    <option value={1}>Level 1: Specialist in current grade</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Calibration Committee Justification:
                  </label>
                  <textarea
                    rows={3}
                    value={calibReason}
                    onChange={(e) => setCalibReason(e.target.value)}
                    placeholder="Document evidence supporting 9-box calibration decision..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                </div>

                <button
                  onClick={handleSaveCalibration}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Save Calibration & Update Bench
                </button>
              </div>
            </div>
          </div>

          {/* Succession Bench Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Mission-Critical Roles: Succession Pipeline & Bench Depth</span>
            </h3>

            <div className="space-y-4">
              {successionPositions.filter(p => p.type === 'Succession').map(pos => {
                const candidates = employees
                  .filter(e => e.role !== pos.title)
                  .map(e => ({
                    emp: e,
                    fit: calculateCompetencyFit(e, 'HR Analytics Manager'),
                    readiness: calculatePromotionReadiness(e)
                  }))
                  .sort((a, b) => b.readiness.score - a.readiness.score);

                return (
                  <div key={pos.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                          Target Role: {pos.title}
                        </h4>
                        <p className="text-xs text-slate-400">
                          Current Incumbent: <strong>{pos.incumbent}</strong> • Vacancy Risk: <strong className="text-rose-600">{pos.vacancyRisk}</strong>
                        </p>
                      </div>
                      <span className="text-[11px] text-slate-500 italic max-w-sm">{pos.notes}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-700">
                            <th className="pb-2">Successor Candidate</th>
                            <th className="pb-2">Current Role</th>
                            <th className="pb-2 text-center">Competency Fit</th>
                            <th className="pb-2 text-center">Readiness Index</th>
                            <th className="pb-2">Succession Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {candidates.slice(0, 3).map(({ emp, fit, readiness }, cIdx) => (
                            <tr key={emp.id}>
                              <td className="py-2.5 font-bold text-slate-900 dark:text-white">
                                {cIdx === 0 && '👑 '} {emp.name}
                              </td>
                              <td className="py-2.5 text-slate-500">{emp.role}</td>
                              <td className="py-2.5 text-center font-bold text-indigo-600 font-mono">
                                {Math.round(fit * 100)}%
                              </td>
                              <td className="py-2.5 text-center">
                                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] font-mono ${
                                  readiness.category === 'Ready Now' ? 'bg-emerald-100 text-emerald-800' :
                                  readiness.category === 'Ready Soon' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {readiness.score}% ({readiness.category})
                                </span>
                              </td>
                              <td className="py-2.5 text-slate-600 dark:text-slate-300">
                                {cIdx === 0 ? 'Primary Successor (Active IDP in place)' : 'Secondary Pipeline (12-24 mo horizon)'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 63: CAREER PATH & PROMOTION READINESS */}
      {currentModule === 63 && (
        <div className="space-y-6">
          {/* Career Ladder */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Professional Career Ladder: People Analytics Family
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              {careerLadder.map((step, idx) => {
                const isCurrent = activeEmp.role.toLowerCase() === step.role.toLowerCase();
                const isTarget = activeEmp.targetRole.toLowerCase() === step.role.toLowerCase();

                return (
                  <React.Fragment key={step.role}>
                    <div className={`p-3 rounded-xl border flex flex-col justify-between ${
                      isCurrent 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-950 dark:text-amber-300 font-bold'
                        : isTarget
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-950 dark:text-emerald-300 font-bold'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-black/10 dark:bg-white/10">{step.grade}</span>
                        {isCurrent && <span className="text-[10px] text-amber-700 dark:text-amber-400 font-black">CURRENT</span>}
                        {isTarget && <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-black">TARGET</span>}
                      </div>
                      <p className="font-bold">{step.role}</p>
                      <span className="text-[10px] text-slate-400 mt-0.5">{step.years}</span>
                    </div>

                    {idx < careerLadder.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Promotion Readiness Card for Active Employee */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                  Promotion Readiness Index (Multi-Criteria Evaluation)
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {activeEmp.name} &rarr; Target: {activeEmp.targetRole}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Target Readiness Horizon: <strong>{activeEmp.careerHorizon}</strong>
                </p>
              </div>

              <div className="text-right">
                <span className="text-3xl font-black text-amber-600 font-mono">{readiness.score}%</span>
                <span className={`block text-xs font-bold ${readiness.category === 'Ready Now' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {readiness.category}
                </span>
              </div>
            </div>

            {/* Breakdown weights */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                Multi-Factor Evaluation Weights:
              </h4>

              <div className="space-y-2.5 text-xs">
                {readiness.breakdown.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-medium">
                      <span className="text-slate-700 dark:text-slate-300">
                        {item.label} <span className="text-slate-400 text-[11px]">(Weight: {Math.round(item.weight * 100)}%)</span>
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white font-mono">{item.value}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${item.value}%` }} 
                        className={`h-full rounded-full transition-all ${
                          item.value >= 80 ? 'bg-emerald-500' : item.value >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                        }`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nomination Action */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {nominations.some(n => n.empId === activeEmp.id) ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Nomination Submitted (Status: {nominations.find(n => n.empId === activeEmp.id)?.status})
                  </span>
                  <button
                    onClick={() => advanceNomination(activeEmp.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Advance to HR Committee Approval
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addPromotionNomination(activeEmp.id, activeEmp.targetRole)}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>Submit Formal Promotion Nomination for {activeEmp.targetRole}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
