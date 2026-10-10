import React from 'react';
import { 
  Lightbulb, Network, Database, GitBranch, CheckCircle2, 
  ArrowRight, Layers, Sparkles, Shield, Cpu, RefreshCw
} from 'lucide-react';

export const POArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Technical Architecture Specification (Dedicated to IT Product Owner)</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Closed-Loop Talent Lifecycle: Microservices & Event Architecture
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Comprehensive technical blueprint detailing cross-functional event pipelines, entity relationship models (ERD), and closed-loop data synchronization across all 14 modules.
        </p>
      </div>

      {/* 1. Closed-Loop Flowchart Diagram */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Network className="w-5 h-5 text-indigo-500" />
          <span>1. Event-Driven Data Pipeline & Function Cross-Links</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {/* Step 1 */}
          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/80 bg-amber-50/50 dark:bg-amber-950/20 space-y-2">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-amber-600 text-white">PHASE 1</span>
            <h4 className="font-bold text-slate-900 dark:text-white">Role Benchmarking</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              <strong>01. Headcount</strong> & <strong>02. Org Levels</strong> &rarr; <strong>03.1 Dictionary</strong> &rarr; <strong>03.3 Role Matrix</strong> establishing target levels (L1-L5), criticality tags, and mandatory prerequisites.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-2">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-600 text-white">PHASE 2</span>
            <h4 className="font-bold text-slate-900 dark:text-white">Evaluation & Gap Detection</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              <strong>04. Assessment Cycle</strong> (Self &rarr; Manager &rarr; Calibration &rarr; Lock) &rarr; Triggers <strong>05. Gap Analysis</strong>. Critical deficits &ge; 2 (e.g., Decree 13) immediately dispatch an Automated Task Restriction event!
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-2">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white">PHASE 3</span>
            <h4 className="font-bold text-slate-900 dark:text-white">70-20-10 IDP & Training</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              Identified gaps stream directly into <strong>06. IDP Plans</strong> &rarr; Schedules <strong>07. Learning Paths</strong> & <strong>08. Classroom Delivery</strong> &rarr; <strong>09. Kirkpatrick L1-L4 Evaluation</strong> (Pre/Post exams & observable behavior checks).
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-800/80 bg-purple-50/50 dark:bg-purple-950/20 space-y-2">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-purple-600 text-white">PHASE 4</span>
            <h4 className="font-bold text-slate-900 dark:text-white">Validated Lift & Succession</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              Upon validated training ROI, dispatch <strong>Skill Lift Event (+1 Level)</strong> &rarr; Updates radar charts &rarr; Recalibrates <strong>11. 9-Box Grid</strong>, promotes talent on <strong>Succession Bench</strong>, and advances <strong>12. Promotion Readiness</strong>!
            </p>
          </div>
        </div>
      </div>

      {/* 2. Key Database Entities (ERD Schema) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-amber-500" />
          <span>2. Relational Database Schema & Foreign Key Mapping (PostgreSQL / Cloud SQL)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-1.5 border border-slate-800">
            <span className="text-amber-400 font-bold font-sans">competency_dictionary</span>
            <p className="text-emerald-400 text-[11px]">id, parent_id, code, name, category, definition, status</p>
            <span className="text-amber-400 font-bold font-sans block pt-2">proficiency_levels</span>
            <p className="text-emerald-400 text-[11px]">id, sort_order, level_name, definition</p>
            <span className="text-amber-400 font-bold font-sans block pt-2">behavior_indicators</span>
            <p className="text-emerald-400 text-[11px]">id, competency_id, level_id, indicator_text</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-1.5 border border-slate-800">
            <span className="text-amber-400 font-bold font-sans">role_competency_matrix</span>
            <p className="text-emerald-400 text-[11px]">role_id, competency_code, target_level, importance, is_required</p>
            <span className="text-amber-400 font-bold font-sans block pt-2">assessment_results</span>
            <p className="text-emerald-400 text-[11px]">cycle_id, employee_id, competency_code, self_level, manager_level, calibrated_level, final_level</p>
            <span className="text-amber-400 font-bold font-sans block pt-2">gap_analysis</span>
            <p className="text-emerald-400 text-[11px]">employee_id, competency_code, gap, is_restricted</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-1.5 border border-slate-800">
            <span className="text-amber-400 font-bold font-sans">idp_plans & actions</span>
            <p className="text-emerald-400 text-[11px]">plan_id, employee_id, goal, 70_20_10_type, progress, status</p>
            <span className="text-amber-400 font-bold font-sans block pt-2">training_effectiveness</span>
            <p className="text-emerald-400 text-[11px]">enrollment_id, pre_test, post_test, reaction, behavior, is_level_lifted</p>
            <span className="text-amber-400 font-bold font-sans block pt-2">succession_nominations</span>
            <p className="text-emerald-400 text-[11px]">position_id, candidate_id, fit_score, readiness_category</p>
          </div>
        </div>
      </div>

      {/* 3. Unique Feature Innovations */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <span>3. Recommended Architectural Innovations for IT Product Owners</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-rose-500" />
              <span>Automated Task Restriction Hook (Risk Mitigation Engine)</span>
            </h4>
            <p className="leading-relaxed text-slate-500 dark:text-slate-400">
              When a competency tagged as <em>Critical</em> and <em>Mandatory</em> (e.g., Decree 13 Data Privacy) displays a deficit of &ge; 2 levels, the system automatically dispatches an authorization lock prohibiting production release access until remedial training is formally validated. Prevents regulatory compliance liabilities.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-emerald-500" />
              <span>Continuous Skill Validation Hook (Dynamic Profile Elevation)</span>
            </h4>
            <p className="leading-relaxed text-slate-500 dark:text-slate-400">
              Rather than forcing learners to wait 12 months for the next annual assessment cycle, when a specialist completes Kirkpatrick Level 2-4 validation, a certified skill lift (+1 Level) event is dispatched immediately, instantaneously elevating succession readiness and 9-box standing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
