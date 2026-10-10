import React, { useState } from 'react';
import { 
  Compass, BookOpen, Calendar, Award, CheckCircle2, 
  Sparkles, ArrowRight, TrendingUp, Sliders, CheckSquare,
  Users, Layers, ExternalLink
} from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';

export const LndManagementViews: React.FC = () => {
  const { 
    currentModule, trainingCatalog, trainingEnrollments, 
    trainingSessions, employees, selectedEmpId, 
    validateSkillLiftFromTraining, competencies, 
    getCompetencyLevel, setCurrentModule 
  } = useTalent();

  const [toastMsg, setToastMsg] = useState<string>('');
  const activeEmp = employees.find(e => e.id === selectedEmpId) || employees[0];

  const handleValidateSkillLift = (empId: number, compCode: string, courseName: string) => {
    validateSkillLiftFromTraining(empId, compCode);
    setToastMsg(`Success! Training effectiveness VALIDATED +1 Skill Level for [${compCode}] of ${activeEmp.name}. Radar chart and 9-Box calibrated accordingly.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Modules 07, 08 & 09: Learning & Development Delivery & Kirkpatrick ROI</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {currentModule === 58 ? '07. Assign Learning Paths & Curated Curricula' :
           currentModule === 59 ? '08. Deliver Training & Classroom Schedules' :
           '09. Kirkpatrick L1-L4 Evaluation & Validated Skill Lift'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Closed-Loop Integration: Training courses directly remediate IDP competency deficits, evaluate real-world workplace behavior, and unlock validated skill level adjustments (+1 Level).
        </p>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in">
          <span>✓ {toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="text-emerald-600 font-bold text-xs hover:text-emerald-800">&times;</button>
        </div>
      )}

      {/* MODULE 58: ASSIGN LEARNING PATHS */}
      {currentModule === 58 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Standardized Enterprise Learning Paths (Role-Specific)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {[
                { title: 'Path: People Analytics Foundation', comp: 'FUNC-HRA-001 & FUNC-DA-001', duration: '18 hours', courses: 'TRN-XL-01, TRN-HRM-01', desc: 'Designed for Junior HR Data Analysts to master standard metric dictionaries, headcount math, and automated Excel reporting.' },
                { title: 'Path: Personal Data Privacy & Decree 13 Compliance', comp: 'FUNC-HRA-003 & CORE-COM', duration: '18 hours', courses: 'TRN-PRV-01, TRN-COM-01', desc: 'Mandatory compliance certification for all specialists handling sensitive payroll, compensation, and national ID data.' },
                { title: 'Path: Analytics Leadership & Succession Bench', comp: 'LEAD-COA & CORE-COL', duration: '18 hours', courses: 'TRN-COA-01, TRN-COL-01', desc: 'Succession path for Senior HR Data Analysts preparing to step into the HR Analytics Manager role.' },
                { title: 'Path: Advanced BI Architecture & Predictive ML', comp: 'FUNC-DA-002 & FUNC-DA-003', duration: '28 hours', courses: 'TRN-PBI-01, TRN-PY-01', desc: 'Enterprise data modeling, star schema architecture, context-aware DAX, and automated Python ETL pipelines.' }
              ].map((p, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{p.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono">{p.duration}</span>
                  </div>
                  <p className="text-slate-500 text-[11px] leading-relaxed">{p.desc}</p>
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Courses: {p.courses}</span>
                    <button
                      onClick={() => setToastMsg(`Enrolled ${activeEmp.name} in [${p.title}]`)}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] shadow-sm transition-all"
                    >
                      + Assign to {activeEmp.name.split(' ').pop()}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 59: DELIVER TRAINING */}
      {currentModule === 59 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500" />
              <span>Upcoming Training Sessions & Workshop Rosters</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Course Code & Title</th>
                    <th className="p-3">Session Date</th>
                    <th className="p-3">Location / Delivery</th>
                    <th className="p-3">Lead Instructor / SME</th>
                    <th className="p-3 text-center">Capacity</th>
                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {trainingSessions.map(s => {
                    const course = trainingCatalog.find(c => c.id === s.courseId);
                    return (
                      <tr key={s.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-bold text-slate-900 dark:text-white">
                          {course?.name}
                          <span className="block font-mono text-[10px] text-slate-400">{s.courseId}</span>
                        </td>
                        <td className="p-3 font-mono">{s.date}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-400">{s.location}</td>
                        <td className="p-3 font-semibold text-amber-700 dark:text-amber-400">{s.trainer}</td>
                        <td className="p-3 text-center font-mono">
                          <span className="font-bold">{s.bookedSeats}</span> / {s.totalSeats}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setToastMsg(`Seat booked for ${activeEmp.name} in session ${s.date}`)}
                            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-sm transition-all"
                          >
                            Register {activeEmp.name.split(' ').pop()}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 60: ASSESS LEARNING EFFECTIVENESS (KIRKPATRICK L1 - L4) */}
      {currentModule === 60 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Kirkpatrick 4-Level Evaluation & Closed-Loop Skill Lift
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Validation Benchmark: Post-test score &ge; 70; Pre-to-post lift &ge; 15 pts; L3 observable behavior rating &ge; 3/5 stars.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="p-3">Learner</th>
                    <th className="p-3">Course Enrolled</th>
                    <th className="p-3 text-center">L1 Reaction</th>
                    <th className="p-3 text-center">L2 Pre &rarr; Post</th>
                    <th className="p-3 text-center">L3 Behavior</th>
                    <th className="p-3">L4 Business Impact</th>
                    <th className="p-3 text-center">Validate Skill Lift (+1)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {trainingEnrollments.map(e => {
                    const emp = employees.find(x => x.id === e.empId);
                    const course = trainingCatalog.find(c => c.id === e.courseId);
                    const compCode = course?.competencyCode || '';
                    const curLevel = getCompetencyLevel(e.empId, compCode);

                    const isEffective = (e.postTestScore || 0) >= 70 && ((e.postTestScore || 0) - (e.preTestScore || 0) >= 15) && (e.behaviorScore || 0) >= 3;

                    return (
                      <tr key={e.id} className="hover:bg-slate-50/50">
                        <td className="p-3 font-bold text-slate-900 dark:text-white">
                          {emp?.name}
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{course?.name}</span>
                          <span className="block font-mono text-[10px] text-slate-400">{course?.competencyCode}</span>
                        </td>
                        <td className="p-3 text-center font-bold text-amber-600">
                          {e.reactionScore ? `${e.reactionScore} / 5★` : 'Pending'}
                        </td>
                        <td className="p-3 text-center font-bold">
                          {e.postTestScore ? (
                            <span className="text-emerald-600 font-mono">
                              {e.preTestScore} &rarr; {e.postTestScore} (+{e.postTestScore - (e.preTestScore || 0)})
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono">Pre: {e.preTestScore} pts</span>
                          )}
                        </td>
                        <td className="p-3 text-center font-bold">
                          {e.behaviorScore ? `${e.behaviorScore} / 5★` : '-'}
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-400 text-[11px]">
                          {emp?.businessKpi[0]}: <strong>{emp?.businessKpi[1]} &rarr; {emp?.businessKpi[2]}</strong>
                        </td>
                        <td className="p-3 text-center">
                          {e.validatedLevelLift ? (
                            <span className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Validated L{curLevel}
                            </span>
                          ) : isEffective ? (
                            <button
                              onClick={() => handleValidateSkillLift(e.empId, compCode, course?.name || '')}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] shadow-sm animate-pulse"
                              title="Click to officially validate skill mastery and increment level by +1"
                            >
                              ✓ Validate L{curLevel} &rarr; L{Math.min(5, curLevel + 1)}
                            </button>
                          ) : (
                            <span className="text-slate-400 text-[10px]">In Progress</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
