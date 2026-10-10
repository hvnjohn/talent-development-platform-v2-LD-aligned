import React from 'react';
import { 
  BarChart3, Users, TrendingUp, Award, ShieldCheck, 
  AlertTriangle, CheckCircle2, ArrowRight, Printer, Download
} from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';

export const ExecutiveDashboardView: React.FC = () => {
  const { 
    employees, roleMatrices, successionPositions, 
    trainingEnrollments, setOpenPrintModal, setOpenHtmlModal, setCurrentModule 
  } = useTalent();

  // Core Executive Metrics
  const totalEmployees = employees.length;
  const highPotentials = employees.filter(e => e.potentialRating === 3);
  const completedTraining = trainingEnrollments.filter(e => e.status === 'Completed').length;
  const trainingCompletionRate = Math.round((completedTraining / (trainingEnrollments.length || 1)) * 100);
  const effectiveTraining = trainingEnrollments.filter(e => (e.postTestScore || 0) >= 70).length;
  const effectivenessRate = Math.round((effectiveTraining / (completedTraining || 1)) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Module 13: Executive Talent Strategy Dashboard (C-Suite Overview)</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Enterprise Workforce Capability & Strategic Health Metrics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Consolidated strategic overview designed for the Chief Human Resources Officer (CHRO), Chief Executive Officer, and IT Product Owner on People Analytics talent pipeline health.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setOpenHtmlModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Save Standalone HTML</span>
          </button>

          <button
            onClick={() => setOpenPrintModal(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-600/20 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print C-Level PDF</span>
          </button>
        </div>
      </div>

      {/* 7 Core Executive KPIs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block">Workforce Index (WCI)</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">88.5%</p>
          <span className="text-[10px] text-emerald-600 font-bold">+4.2% vs H2 Cycle</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block">Training Completion</span>
          <p className="text-2xl font-black text-indigo-600 mt-1 font-mono">{trainingCompletionRate}%</p>
          <span className="text-[10px] text-indigo-500 font-semibold">{completedTraining} completed</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block">Kirkpatrick Efficacy</span>
          <p className="text-2xl font-black text-emerald-600 mt-1 font-mono">{effectivenessRate}%</p>
          <span className="text-[10px] text-emerald-600 font-bold">L2-L4 Validated</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block">Internal Build Ratio</span>
          <p className="text-2xl font-black text-amber-600 mt-1 font-mono">75.0%</p>
          <span className="text-[10px] text-amber-600 font-bold">Build &gt; Buy Strategy</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block">Bench Coverage</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">100%</p>
          <span className="text-[10px] text-emerald-600 font-bold">Ready-Now Identified</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block">HiPo Stars (9-Box)</span>
          <p className="text-2xl font-black text-purple-600 mt-1 font-mono">{highPotentials.length}</p>
          <span className="text-[10px] text-purple-600 font-semibold">Bao & Mai (Top Box)</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 block">Critical Risk Deficits</span>
          <p className="text-2xl font-black text-rose-600 mt-1 font-mono">1</p>
          <span className="text-[10px] text-rose-600 font-bold">Decree 13 (In Remediation)</span>
        </div>
      </div>

      {/* 2 Big Insight Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Team Capability Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Unit Competency Health & Capability Indices
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">People Analytics Center of Excellence (3 Analysts)</span>
                <span className="font-extrabold text-emerald-600 font-mono">89.2% Benchmark Met</span>
              </div>
              <p className="text-slate-500 text-[11px]">Specialists: Pham Quoc Bao, Tran Minh Khoa, Nguyen Thi Lan</p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div style={{ width: '89.2%' }} className="h-full bg-emerald-500 rounded-full" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-sm">HR Operations & Workforce Intelligence (2 Analysts)</span>
                <span className="font-extrabold text-emerald-600 font-mono">92.5% Benchmark Met</span>
              </div>
              <p className="text-slate-500 text-[11px]">Specialists: Vo Thanh Mai, Le Hoang Yen</p>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div style={{ width: '92.5%' }} className="h-full bg-indigo-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Critical Risk Alert & Succession Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Succession Bench Depth for Leadership Roles</span>
          </h3>

          <div className="space-y-3 text-xs">
            {successionPositions.filter(p => p.type === 'Succession').map(pos => (
              <div key={pos.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{pos.title}</span>
                  <span className="text-[10px] font-bold text-rose-600 font-mono">Risk: {pos.vacancyRisk}</span>
                </div>
                <p className="text-[11px] text-slate-500">Current Incumbent: {pos.incumbent}</p>
                <div className="pt-1 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-600 font-bold">Successor #1: Pham Quoc Bao</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">Ready Now (86%)</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => setCurrentModule(99)} // Jump to Module 14 IT PO Guide
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span>Inspect Closed-Loop Architecture Specifications (Module 14)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
