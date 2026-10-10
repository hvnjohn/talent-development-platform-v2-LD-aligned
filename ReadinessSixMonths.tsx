import React, { useState } from 'react';
import { 
  X, Download, Copy, Check, FileCode, 
  ExternalLink, Sparkles, ShieldCheck, Laptop
} from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';

export const DownloadHtmlModal: React.FC = () => {
  const { openHtmlModal, setOpenHtmlModal, employees, selectedEmpId } = useTalent();
  const [copied, setCopied] = useState<boolean>(false);

  if (!openHtmlModal) return null;

  const currentEmp = employees.find(e => e.id === selectedEmpId) || employees[0];

  const generateFullHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Talent Development Platform - HR Data Analyst Benchmark</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen">
  <!-- Top Bar -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white font-black text-sm flex items-center justify-center shadow-sm">TD</div>
        <div>
          <span class="font-extrabold text-sm text-slate-900">Talent Development Platform</span>
          <span class="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold uppercase">HR Data Analyst Prototype</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">✓ Cycle H1/2027 Locked</span>
        <span class="text-xs font-mono bg-slate-100 px-2 py-1 rounded border border-slate-200">Offline Single-File HTML</span>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <div class="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">
    <!-- Sidebar Menu with Numbering -->
    <aside class="md:col-span-1 space-y-2">
      <div class="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <p class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Navigation Matrix</p>
        <nav class="space-y-1 text-xs">
          <button onclick="switchTab('tab-01')" class="tab-btn w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-bold bg-amber-50 text-amber-900 border border-amber-300">
            <span class="mono px-1.5 py-0.5 rounded bg-amber-600 text-white text-[10px]">01-02</span>
            <span>Org & Headcount Plan</span>
          </button>
          <button onclick="switchTab('tab-03')" class="tab-btn w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-medium text-slate-700 hover:bg-slate-100">
            <span class="mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]">03</span>
            <span>Competency Framework</span>
          </button>
          <button onclick="switchTab('tab-04')" class="tab-btn w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-medium text-slate-700 hover:bg-slate-100">
            <span class="mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]">04</span>
            <span>Assessment Cycle</span>
          </button>
          <button onclick="switchTab('tab-05')" class="tab-btn w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-medium text-slate-700 hover:bg-slate-100">
            <span class="mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]">05</span>
            <span>Competency Gap Heatmap</span>
          </button>
          <button onclick="switchTab('tab-06')" class="tab-btn w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-medium text-slate-700 hover:bg-slate-100">
            <span class="mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]">06</span>
            <span>70-20-10 IDP Plan</span>
          </button>
          <button onclick="switchTab('tab-07')" class="tab-btn w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-medium text-slate-700 hover:bg-slate-100">
            <span class="mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]">07-09</span>
            <span>L&D & Kirkpatrick ROI</span>
          </button>
          <button onclick="switchTab('tab-10')" class="tab-btn w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-medium text-slate-700 hover:bg-slate-100">
            <span class="mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]">10-12</span>
            <span>9-Box Grid & Succession</span>
          </button>
          <button onclick="switchTab('tab-13')" class="tab-btn w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-medium text-slate-700 hover:bg-slate-100">
            <span class="mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]">13</span>
            <span>Executive Dashboard</span>
          </button>
          <button onclick="switchTab('tab-14')" class="tab-btn w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2 font-medium text-slate-700 hover:bg-slate-100">
            <span class="mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]">14</span>
            <span>Closed-Loop Tech Spec</span>
          </button>
        </nav>
      </div>

      <!-- Active Employee Profile Card -->
      <div class="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
        <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sample Benchmark Profile</p>
        <div class="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" class="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500">
          <div>
            <h4 class="font-extrabold text-xs text-slate-900">Tran Minh Khoa</h4>
            <p class="text-[11px] text-amber-600 font-semibold">HR Data Analyst (G3)</p>
          </div>
        </div>
        <div class="pt-2 border-t border-slate-100 text-[11px] space-y-1 text-slate-600">
          <div class="flex justify-between"><span>Target Role:</span><span class="font-bold text-slate-800">Senior HRDA</span></div>
          <div class="flex justify-between"><span>Promotion Readiness:</span><span class="font-bold text-amber-600">76% (Ready Soon)</span></div>
          <div class="flex justify-between"><span>Critical Gap:</span><span class="font-bold text-rose-600">Decree 13 Privacy</span></div>
        </div>
      </div>
    </aside>

    <!-- Main Content Tab Area -->
    <main class="md:col-span-3 space-y-6">
      <!-- TAB 01-02: Organization & Headcount -->
      <div id="tab-01" class="tab-content bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span class="text-[10px] font-mono px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">MODULE 01 & 02</span>
            <h2 class="text-xl font-black text-slate-900 mt-1">Business Growth & Headcount Planning (HRDA Track)</h2>
          </div>
          <span class="text-xs px-2.5 py-1 bg-slate-100 font-bold rounded">FY2027 Staffing Plan</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span class="text-slate-400 font-bold block">Approved Target</span>
            <span class="text-2xl font-black text-slate-900">12 Specialists</span>
            <span class="text-emerald-600 block text-[10px] mt-1 font-semibold">+3 New positions planned</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span class="text-slate-400 font-bold block">Current On-board</span>
            <span class="text-2xl font-black text-blue-600">5 Analysts</span>
            <span class="text-slate-500 block text-[10px] mt-1 font-semibold">1 Junior, 2 Mid, 2 Senior</span>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span class="text-slate-400 font-bold block">Sourcing Strategy</span>
            <span class="text-2xl font-black text-amber-600">67% Build</span>
            <span class="text-slate-500 block text-[10px] mt-1 font-semibold">Internal IDP upskilling first</span>
          </div>
        </div>
      </div>

      <!-- TAB 03: Competency Framework -->
      <div id="tab-03" class="tab-content hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span class="text-[10px] font-mono px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-bold">MODULE 03</span>
            <h2 class="text-xl font-black text-slate-900 mt-1">HR Data Analyst Competency Architecture</h2>
          </div>
          <span class="text-xs px-2.5 py-1 bg-amber-50 text-amber-800 font-bold rounded border border-amber-200">5-Level Proficiency Scale</span>
        </div>
        <div class="space-y-3 text-xs">
          <div class="p-3 rounded-xl border border-slate-200 bg-slate-50">
            <div class="flex justify-between font-bold text-slate-800">
              <span>FUNC-HRA-003: HR Data Privacy & Decree 13 Compliance</span>
              <span class="text-rose-600 font-mono">CRITICAL BENCHMARK</span>
            </div>
            <p class="text-slate-600 text-[11px] mt-1">Ability to lawfully protect sensitive employee data, configure Row-Level Security (RLS), and run mandatory pre-release privacy audits.</p>
          </div>
          <div class="p-3 rounded-xl border border-slate-200 bg-slate-50">
            <div class="flex justify-between font-bold text-slate-800">
              <span>FUNC-DA-002: Power BI & Advanced DAX Modeling</span>
              <span class="text-amber-600 font-mono">CRITICAL BENCHMARK</span>
            </div>
            <p class="text-slate-600 text-[11px] mt-1">Architect star-schema models, author context-aware DAX metrics, and publish automated self-service workspaces.</p>
          </div>
          <div class="p-3 rounded-xl border border-slate-200 bg-slate-50">
            <div class="flex justify-between font-bold text-slate-800">
              <span>FUNC-HRA-002: Workforce Planning & Predictive Attrition Modeling</span>
              <span class="text-blue-600 font-mono">HIGH BENCHMARK</span>
            </div>
            <p class="text-slate-600 text-[11px] mt-1">Analyze turnover drivers, build regression & ML models for turnover hazard, and model headcount capacity.</p>
          </div>
        </div>
      </div>

      <!-- TAB 04: Assessment Cycles -->
      <div id="tab-04" class="tab-content hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span class="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">MODULE 04</span>
        <h2 class="text-xl font-black text-slate-900">5-Stage Assessment & Calibration Workflow</h2>
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          <div class="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center">
            <div class="mono font-bold text-slate-400">STEP 1</div>
            <p class="font-bold text-slate-800 mt-1">Initiation</p>
            <span class="text-[10px] text-emerald-600 font-bold">Done</span>
          </div>
          <div class="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center">
            <div class="mono font-bold text-slate-400">STEP 2</div>
            <p class="font-bold text-slate-800 mt-1">Self Assessment</p>
            <span class="text-[10px] text-emerald-600 font-bold">Done</span>
          </div>
          <div class="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center">
            <div class="mono font-bold text-slate-400">STEP 3</div>
            <p class="font-bold text-slate-800 mt-1">Manager Review</p>
            <span class="text-[10px] text-emerald-600 font-bold">Done</span>
          </div>
          <div class="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center">
            <div class="mono font-bold text-slate-400">STEP 4</div>
            <p class="font-bold text-slate-800 mt-1">Calibration</p>
            <span class="text-[10px] text-emerald-600 font-bold">Done</span>
          </div>
          <div class="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-center">
            <div class="mono font-bold text-emerald-600">STEP 5</div>
            <p class="font-bold text-emerald-900 mt-1">Locked Baseline</p>
            <span class="text-[10px] text-emerald-700 font-bold">Active Baseline</span>
          </div>
        </div>
      </div>

      <!-- TAB 05: Competency Gap Heatmap -->
      <div id="tab-05" class="tab-content hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span class="text-[10px] font-mono px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-bold">MODULE 05</span>
        <h2 class="text-xl font-black text-slate-900">Competency Gap Analysis & Risk Restrictions</h2>
        <div class="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
          <p class="font-bold">⚠️ Critical Task Restriction Triggered for Tran Minh Khoa</p>
          <p class="text-[11px]">Due to Level 1 vs Target Level 3 on FUNC-HRA-003 (Decree 13 Data Privacy), Khoa is restricted from publishing unmasked employee reports until IDP milestone certification is validated.</p>
        </div>
        <table class="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
          <thead class="bg-slate-100 font-bold text-slate-700">
            <tr>
              <th class="p-2.5">Competency Code & Title</th>
              <th class="p-2.5 text-center">Target</th>
              <th class="p-2.5 text-center">Current</th>
              <th class="p-2.5 text-center">Gap</th>
              <th class="p-2.5 text-center">Importance</th>
              <th class="p-2.5">Action Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr>
              <td class="p-2.5 font-bold">FUNC-HRA-003 Privacy & Decree 13</td>
              <td class="p-2.5 text-center font-mono">3</td>
              <td class="p-2.5 text-center font-mono text-rose-600 font-bold">1</td>
              <td class="p-2.5 text-center font-mono font-bold text-rose-600">-2</td>
              <td class="p-2.5 text-center"><span class="px-2 py-0.5 bg-rose-100 text-rose-800 rounded text-[10px] font-bold">Critical</span></td>
              <td class="p-2.5 text-amber-700 font-semibold">In IDP (TRN-PRV-01)</td>
            </tr>
            <tr>
              <td class="p-2.5 font-bold">FUNC-DA-002 Power BI & DAX</td>
              <td class="p-2.5 text-center font-mono">3</td>
              <td class="p-2.5 text-center font-mono text-emerald-600 font-bold">3</td>
              <td class="p-2.5 text-center font-mono font-bold text-emerald-600">0</td>
              <td class="p-2.5 text-center"><span class="px-2 py-0.5 bg-rose-100 text-rose-800 rounded text-[10px] font-bold">Critical</span></td>
              <td class="p-2.5 text-emerald-600 font-semibold">Benchmark Met ✓</td>
            </tr>
            <tr>
              <td class="p-2.5 font-bold">FUNC-HRA-002 Workforce Planning</td>
              <td class="p-2.5 text-center font-mono">3</td>
              <td class="p-2.5 text-center font-mono text-amber-600 font-bold">2</td>
              <td class="p-2.5 text-center font-mono font-bold text-amber-600">-1</td>
              <td class="p-2.5 text-center"><span class="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-[10px] font-bold">High</span></td>
              <td class="p-2.5 text-amber-700 font-semibold">TRN-WFA-01 Done (+1 LIFT)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- TAB 06: 70-20-10 IDP Plan -->
      <div id="tab-06" class="tab-content hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span class="text-[10px] font-mono px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">MODULE 06</span>
        <h2 class="text-xl font-black text-slate-900">Individual Development Plan (IDP 70-20-10)</h2>
        <div class="grid grid-cols-3 gap-3 text-center text-xs">
          <div class="p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <span class="font-extrabold text-amber-800 text-base">70%</span>
            <p class="font-semibold text-slate-700 text-[11px] mt-1">On-The-Job Experiential (OJT)</p>
          </div>
          <div class="p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <span class="font-extrabold text-blue-800 text-base">20%</span>
            <p class="font-semibold text-slate-700 text-[11px] mt-1">Coaching & Mentoring</p>
          </div>
          <div class="p-3 bg-purple-50 border border-purple-200 rounded-xl">
            <span class="font-extrabold text-purple-800 text-base">10%</span>
            <p class="font-semibold text-slate-700 text-[11px] mt-1">Formal LMS Courses & Certs</p>
          </div>
        </div>
      </div>

      <!-- TAB 07-09: L&D and Kirkpatrick -->
      <div id="tab-07" class="tab-content hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span class="text-[10px] font-mono px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold">MODULE 07, 08 & 09</span>
        <h2 class="text-xl font-black text-slate-900">Training Operations & Kirkpatrick L1-L4 Evaluation</h2>
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p class="font-bold text-slate-500">L1: Reaction</p>
            <p class="text-xl font-black text-slate-900">4.8 / 5.0</p>
            <p class="text-[10px] text-slate-500">Post-course survey</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p class="font-bold text-slate-500">L2: Learning Lift</p>
            <p class="text-xl font-black text-emerald-600">+32 Pts</p>
            <p class="text-[10px] text-slate-500">Pre 50 &rarr; Post 82</p>
          </div>
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <p class="font-bold text-slate-500">L3: Behavior Check</p>
            <p class="text-xl font-black text-blue-600">4 / 5 Stars</p>
            <p class="text-[10px] text-slate-500">Manager 30-day review</p>
          </div>
          <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-300">
            <p class="font-bold text-emerald-800">L4: Validated Lift</p>
            <p class="text-xl font-black text-emerald-700">+1 Level</p>
            <p class="text-[10px] text-emerald-700 font-semibold">Synced to Radar & 9-Box</p>
          </div>
        </div>
      </div>

      <!-- TAB 10-12: 9-Box Grid & Succession -->
      <div id="tab-10" class="tab-content hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span class="text-[10px] font-mono px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-bold">MODULE 10, 11 & 12</span>
        <h2 class="text-xl font-black text-slate-900">9-Box Grid Calibration & Succession Bench</h2>
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
          <div class="flex justify-between items-center">
            <span class="font-bold text-slate-800">Candidate: Pham Quoc Bao</span>
            <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">9-Box: Star (High-High)</span>
          </div>
          <p class="text-slate-600 text-[11px]">Succession Position: Ready-Now successor for HR Analytics Manager role (12-18 month horizon).</p>
        </div>
      </div>

      <!-- TAB 13: Executive Dashboard -->
      <div id="tab-13" class="tab-content hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span class="text-[10px] font-mono px-2 py-0.5 bg-rose-100 text-rose-800 rounded font-bold">MODULE 13</span>
        <h2 class="text-xl font-black text-slate-900">C-Level Executive Talent Strategy Dashboard</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span class="text-slate-400 font-bold">Capability Index (WCI)</span>
            <p class="text-2xl font-black text-slate-900">88.5%</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span class="text-slate-400 font-bold">L&D Effectiveness</span>
            <p class="text-2xl font-black text-emerald-600">92.0%</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span class="text-slate-400 font-bold">Bench Pipeline Health</span>
            <p class="text-2xl font-black text-indigo-600">83.3%</p>
          </div>
          <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span class="text-slate-400 font-bold">High Potential Ratio</span>
            <p class="text-2xl font-black text-purple-600">60.0%</p>
          </div>
        </div>
      </div>

      <!-- TAB 14: IT PO Spec -->
      <div id="tab-14" class="tab-content hidden bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <span class="text-[10px] font-mono px-2 py-0.5 bg-slate-200 text-slate-800 rounded font-bold">MODULE 14 (PO ARCHITECTURE)</span>
        <h2 class="text-xl font-black text-slate-900">Closed-Loop Event Bus & Microservices Architecture</h2>
        <div class="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto">
[Phase 1: Setup] Headcount Plan -> Job Architecture -> Competency Tree -> Role Matrix
      |
[Phase 2: Review] Assessment Cycle (Self -> Mgr -> Calibration) -> Final Level
      |
[Phase 3: Gap] Target vs Final Level -> Gap Detected -> Task Restriction Event
      |
[Phase 4: Growth] IDP 70-20-10 -> L&D Course -> Kirkpatrick L1-L4 Evaluation
      |
[Phase 5: Sync] Skill LIFT (+1) Event -> Auto-syncs to Radar Chart & 9-Box Matrix
      |
[Phase 6: Advance] 9-Box Talent Review -> Promotion Readiness Index -> Executive Succession
        </div>
      </div>
    </main>
  </div>

  <script>
    function switchTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.getElementById(tabId).classList.remove('hidden');
      
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-50', 'text-amber-900', 'border', 'border-amber-300', 'font-bold');
        btn.classList.add('text-slate-700', 'font-medium');
      });
      event.currentTarget.classList.add('bg-amber-50', 'text-amber-900', 'border', 'border-amber-300', 'font-bold');
      event.currentTarget.classList.remove('text-slate-700', 'font-medium');
    }
  </script>
</body>
</html>`;
  };

  const handleDownload = () => {
    const htmlContent = generateFullHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Talent_Development_Platform_HRDA.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const htmlContent = generateFullHtml();
    navigator.clipboard.writeText(htmlContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                Save Standalone HTML Prototype
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Self-contained, offline single-file HTML file with zero server dependencies
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpenHtmlModal(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto text-xs">
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Laptop className="w-4 h-4 text-emerald-500" />
                <span>Double-Click & Run Offline</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Save directly to your computer. Open directly in Chrome, Edge, Safari, or Firefox without needing Node.js or any local server.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>All 14 Modules Included</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Includes interactive tabs for Org Foundation, Competencies, Gaps, 70-20-10 IDP, Kirkpatrick ROI, and 9-Box Grid.
              </p>
            </div>
          </div>

          {/* File summary */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-emerald-900 dark:text-emerald-300">Target File Name:</span>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">Talent_Development_Platform_HRDA.html</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-emerald-800/80 dark:text-emerald-400/80">
              <span>Encoding: UTF-8 Single-file</span>
              <span>Styling: Tailwind CSS CDN embedded</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleDownload}
              className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download .HTML to My Computer</span>
            </button>

            <button
              onClick={handleCopy}
              className="w-full sm:w-auto py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copied ? 'Copied HTML Code!' : 'Copy Raw Code'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
