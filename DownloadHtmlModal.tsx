import React from 'react';
import { X, Printer, ShieldCheck, Award, Users, BarChart3 } from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';

export const PrintReportModal: React.FC = () => {
  const { 
    openPrintModal, setOpenPrintModal, employees, 
    selectedEmpId, calculatePromotionReadiness, 
    calculateCompetencyFit, assessmentData, successionPositions 
  } = useTalent();

  if (!openPrintModal) return null;

  const currentEmp = employees.find(e => e.id === selectedEmpId) || employees[0];
  const readiness = calculatePromotionReadiness(currentEmp);
  const compFit = calculateCompetencyFit(currentEmp, currentEmp.targetRole);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header (No Print) */}
        <div className="no-print p-4 sm:px-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              Executive Talent Strategy & Capability Report
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF (A4)</span>
            </button>
            <button
              onClick={() => setOpenPrintModal(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Canvas */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-6 bg-white text-slate-900 text-xs">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
            <div>
              <p className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                ENTERPRISE DIGITAL PLATFORMS • WORKFORCE CAPABILITY CENTER
              </p>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 uppercase tracking-tight">
                TALENT DEVELOPMENT & SUCCESSION STRATEGY REPORT
              </h1>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Job Discipline Family: <strong>People Analytics & HR Data Analyst</strong> • Cycle: <strong>H1/2027</strong> • Generation Date: <strong>October 10, 2026</strong>
              </p>
            </div>

            <div className="text-right text-[11px]">
              <span className="px-2 py-0.5 rounded bg-slate-100 font-mono font-bold text-slate-800">
                TALENT-REP-2026-H1
              </span>
              <p className="text-[10px] text-slate-400 mt-1">C-Suite Confidential Document</p>
            </div>
          </div>

          {/* 1. Executive Summary KPIs */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              1. Function Capability Health Overview (Executive Diagnostics)
            </h2>
            <div className="grid grid-cols-4 gap-3">
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 block">Workforce Index (WCI)</span>
                <p className="text-xl font-black text-slate-900 mt-0.5 font-mono">88.5%</p>
                <span className="text-[9px] text-emerald-600 font-bold">Surpasses 85% Target</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 block">IDP Completion Rate</span>
                <p className="text-xl font-black text-indigo-700 mt-0.5 font-mono">84.0%</p>
                <span className="text-[9px] text-indigo-600 font-bold">70-20-10 Balanced</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 block">Bench Depth Coverage</span>
                <p className="text-xl font-black text-emerald-700 mt-0.5 font-mono">100%</p>
                <span className="text-[9px] text-emerald-600 font-bold">Ready-Now Identified</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[10px] text-slate-500 block">HiPo Stars (9-Box)</span>
                <p className="text-xl font-black text-purple-700 mt-0.5 font-mono">2 Talent(s)</p>
                <span className="text-[9px] text-purple-600 font-bold">Bao & Mai (Stars)</span>
              </div>
            </div>
          </div>

          {/* 2. Individual Talent Profile for Selected Employee */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              2. Individual Capability & Promotion Readiness Profile: {currentEmp.name} ({currentEmp.code})
            </h2>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="grid grid-cols-4 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-400">Current Role:</span>
                  <p className="font-bold text-slate-900">{currentEmp.role}</p>
                </div>
                <div>
                  <span className="text-slate-400">Target Role:</span>
                  <p className="font-bold text-amber-700">{currentEmp.targetRole}</p>
                </div>
                <div>
                  <span className="text-slate-400">Promotion Readiness:</span>
                  <p className="font-bold text-emerald-700 font-mono">{readiness.score}% ({readiness.category})</p>
                </div>
                <div>
                  <span className="text-slate-400">9-Box Placement:</span>
                  <p className="font-bold text-purple-700">Performance 4.0 • Potential Tier {currentEmp.potentialRating}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[11px]">
                <span className="font-bold text-slate-800">Direct Business KPI Impact: </span>
                <span>{currentEmp.businessKpi[0]} improved from <strong>{currentEmp.businessKpi[1]}</strong> down to <strong>{currentEmp.businessKpi[2]}</strong></span>
              </div>
            </div>
          </div>

          {/* 3. Succession Plan Summary */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              3. Critical Role Succession Bench Pipeline
            </h2>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-100 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Target Role</th>
                    <th className="p-2.5">Current Incumbent</th>
                    <th className="p-2.5">Vacancy Risk</th>
                    <th className="p-2.5">Primary Successor</th>
                    <th className="p-2.5">Readiness Index</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {successionPositions.filter(p => p.type === 'Succession').map(pos => (
                    <tr key={pos.id}>
                      <td className="p-2.5 font-bold">{pos.title}</td>
                      <td className="p-2.5 text-slate-600">{pos.incumbent}</td>
                      <td className="p-2.5 font-bold text-rose-600 font-mono">{pos.vacancyRisk}</td>
                      <td className="p-2.5 font-bold text-emerald-700">Pham Quoc Bao (Senior HRDA)</td>
                      <td className="p-2.5 font-bold text-slate-800 font-mono">86% (Ready Now)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t border-slate-300 grid grid-cols-2 text-center text-xs">
            <div>
              <p className="font-bold text-slate-800 uppercase">IT Product Owner</p>
              <div className="h-14 flex items-center justify-center font-serif italic text-slate-600 text-base">
                Tran Minh Khang
              </div>
              <p className="text-[10px] text-slate-400">Head of Talent Platform & Analytics Systems</p>
            </div>
            <div>
              <p className="font-bold text-slate-800 uppercase">Chief Human Resources Officer (CHRO)</p>
              <div className="h-14 flex items-center justify-center font-serif italic text-slate-600 text-base">
                Pham Thi Hanh
              </div>
              <p className="text-[10px] text-slate-400">Executive VP of People & Organization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
