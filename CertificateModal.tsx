import React from 'react';
import { 
  Printer, Moon, Sun, ChevronRight, UserCheck, 
  ShieldCheck, Download, FileCode
} from 'lucide-react';
import { useTalent } from '../../context/TalentContext';

export const TopHeader: React.FC = () => {
  const { 
    currentModule, employees, selectedEmpId, setSelectedEmpId, 
    darkMode, toggleDarkMode, setOpenPrintModal, setOpenHtmlModal 
  } = useTalent();

  const moduleNames: Record<number, [string, string]> = {
    65: ['Organization Foundation', '01. Business Growth & Headcount Planning'],
    66: ['Organization Foundation', '02. Define Org Structure & Job Levels'],
    52: ['Competency Management', '03.1 Competency Dictionary (Master Hierarchy)'],
    53: ['Competency Management', '03.2 Proficiency Scales & Observable Behaviors'],
    56: ['Competency Management', '03.3 Role Competency Matrix & Radar Analysis'],
    54: ['Competency Management', '04. Assessment Cycles (Self, Manager, Calibration & Lock)'],
    55: ['Competency Management', '05. Identify Competency Gaps & Risk Restrictions'],
    57: ['L&D Management', '06. Individual Development Plan (IDP 70-20-10)'],
    58: ['L&D Management', '07. Assign Learning Paths & Curricula'],
    59: ['L&D Management', '08. Deliver Training & Classroom Schedules'],
    60: ['L&D Management', '09. Kirkpatrick L1-L4 Evaluation & Skill Lift'],
    61: ['Performance & Succession', '10. Track Performance & Competency Trajectory'],
    62: ['Performance & Succession', '11. 9-Box Grid & Succession Bench Pipeline'],
    63: ['Performance & Succession', '12. Career Pathing & Promotion Readiness Index'],
    64: ['Executive Strategy', '13. Executive Talent Strategy Dashboard'],
    99: ['Architecture & Tech Specs', '14. Closed-Loop Architecture Guide (IT PO Spec)']
  };

  const [groupName, modTitle] = moduleNames[currentModule] || ['Talent Development', 'Module'];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Breadcrumbs */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs text-slate-400 hidden sm:inline font-medium">Talent Platform</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 hidden md:inline">
            {groupName}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden md:inline" />
          <h1 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white truncate">
            {modTitle}
          </h1>
        </div>

        {/* Right: Cycle status, Employee Selector, Print, HTML Download, Theme */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Assessment Cycle Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Cycle H1/2027 • Locked</span>
          </div>

          {/* Quick Employee Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <UserCheck className="w-3.5 h-3.5 text-amber-500 shrink-0 hidden sm:block" />
            <select
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(+e.target.value)}
              className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-1"
              title="Select an HR Data Analyst to inspect data across all functions"
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id} className="dark:bg-slate-900 text-slate-900 dark:text-white">
                  {emp.name} ({emp.code}) - {emp.role.replace('HR Data Analyst', 'HRDA')}
                </option>
              ))}
            </select>
          </div>

          {/* Standalone HTML File Trigger */}
          <button
            onClick={() => setOpenHtmlModal(true)}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all"
            title="Download complete standalone HTML file to save locally"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download HTML</span>
          </button>

          {/* Print / Export Report Modal Trigger */}
          <button
            onClick={() => setOpenPrintModal(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 transition-all"
            title="Export or print official Executive Talent Report (PDF)"
          >
            <Printer className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
