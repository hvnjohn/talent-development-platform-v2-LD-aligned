import React, { useState } from 'react';
import { 
  Layers, CheckCircle2, ChevronRight, BookOpen, 
  Search, Sliders, ExternalLink, Sparkles, Eye, Plus, X, Check
} from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';

export const ProficiencyScalesView: React.FC = () => {
  const { 
    proficiencyLevels, competencies, behaviorDictionary, 
    addBehaviorIndicator, setCurrentModule 
  } = useTalent();

  const [activeTab, setActiveTab] = useState<'ladder' | 'matrix' | 'scale' | 'preview'>('ladder');
  const [selectedCompCode, setSelectedCompCode] = useState<string>('FUNC-HRA-003'); // Default to Decree 13 Data Privacy
  
  // Quick Add Indicator Form state
  const [addingLevelIdx, setAddingLevelIdx] = useState<number | null>(null);
  const [newIndicatorText, setNewIndicatorText] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string>('');

  // Fallback indicator generator for competencies without custom ones
  const getCompBehaviors = (code: string): string[][] => {
    if (behaviorDictionary[code]) {
      return behaviorDictionary[code];
    }
    const comp = competencies.find(c => c.code === code);
    const title = comp ? comp.name : code;
    return [
      [`Understand basic concepts, terminology, and operational standards of ${title}.`, `Execute basic routines under direct supervisor guidance.`],
      [`Perform standard recurring tasks in ${title} with limited supervision.`, `Recognize routine exceptions and resolve according to documented protocol.`],
      [`Execute end-to-end workflows in ${title} independently in production environments.`, `Deliver high quality outputs and troubleshoot complex issues autonomously.`],
      [`Lead optimization initiatives and cross-functional collaborations in ${title}.`, `Mentor and peer-review teammates on advanced practices and quality standards.`],
      [`Define enterprise architectural frameworks and statutory governance for ${title}.`, `Drive innovation and establish industry-standard benchmarks across the company.`]
    ];
  };

  const compBehaviors = getCompBehaviors(selectedCompCode);

  const handleAddIndicator = (levelIdx: number) => {
    if (!newIndicatorText.trim()) return;
    addBehaviorIndicator(selectedCompCode, levelIdx, newIndicatorText.trim());
    setToastMsg(`Added new observable indicator to Level ${levelIdx + 1}`);
    setNewIndicatorText('');
    setAddingLevelIdx(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Module 03.2: Proficiency Scales & Observable Behavioral Indicators</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          5-Level Proficiency Scale & Behavioral Indicator Library
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Ground abstract competency definitions into observable, measurable workplace actions. Add custom indicators, inspect progression ladders, and simulate objective multi-rater evaluations.
        </p>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <span>✓ {toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="text-emerald-600 font-bold text-xs hover:text-emerald-800">&times;</button>
        </div>
      )}

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Proficiency Tiers</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">5 Levels</p>
          <span className="text-[11px] text-slate-400">Basic (L1) to Expert (L5)</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Observable Indicators</span>
          <p className="text-2xl font-black text-amber-600 mt-1 font-mono">
            {Object.values(behaviorDictionary).reduce((acc, levels) => acc + levels.reduce((s, arr) => s + arr.length, 0), 0) + 20} Indicators
          </p>
          <span className="text-[11px] text-amber-600 font-semibold">Observable action verbs</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Mapping Density</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">2 - 5 Per Level</p>
          <span className="text-[11px] text-emerald-600 font-semibold">Addable & expandable</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500">Active Competencies</span>
          <p className="text-2xl font-black text-indigo-600 mt-1">{competencies.filter(c => c.parent !== null).length} Disciplines</p>
          <span className="text-[11px] text-slate-400">Mapped to Role Matrix</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('ladder')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'ladder'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          1. Level Ladder & Add Behaviors
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'matrix'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          2. Coverage Matrix (Mapping Catalog)
        </button>
        <button
          onClick={() => setActiveTab('scale')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'scale'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          3. Shared 5-Level Scale Definitions
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'preview'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          4. Self-Assessment UI Simulator
        </button>
      </div>

      {/* Tab 1: Level Ladder */}
      {activeTab === 'ladder' && (
        <div className="space-y-5">
          {/* Selector for Competency */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Inspect Competency Behaviors:</span>
              <select
                value={selectedCompCode}
                onChange={(e) => setSelectedCompCode(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs"
              >
                {competencies.filter(c => c.parent !== null && c.parent !== 1 && c.parent !== 2 && c.parent !== 3 && c.parent !== 4).map(c => (
                  <option key={c.id} value={c.code}>{c.name} ({c.code})</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setCurrentModule(56)}
              className="text-xs text-amber-600 font-bold hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View in Role Competency Matrix</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5-Level Vertical Cards */}
          <div className="space-y-4">
            {proficiencyLevels.map((lvl, idx) => {
              const behaviors = compBehaviors[idx] || [];
              const isAddingHere = addingLevelIdx === idx;

              return (
                <div
                  key={lvl.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-900 dark:text-amber-300 flex items-center justify-center font-bold text-xs font-mono">
                        L{lvl.sortOrder}
                      </span>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {lvl.name}
                      </h4>
                    </div>

                    <button
                      onClick={() => setAddingLevelIdx(isAddingHere ? null : idx)}
                      className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-600" />
                      <span>{isAddingHere ? 'Cancel' : '+ Add Indicator'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                    "{lvl.definition}"
                  </p>

                  {/* Add Indicator Input Form */}
                  {isAddingHere && (
                    <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs space-y-2 animate-in fade-in">
                      <label className="font-bold text-amber-900 dark:text-amber-200 block">
                        New Observable Workplace Indicator for Level {lvl.sortOrder}:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g., Applies Row-Level Security masking when deploying Power BI models..."
                          value={newIndicatorText}
                          onChange={(e) => setNewIndicatorText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddIndicator(idx);
                          }}
                          className="flex-1 p-2 rounded-lg bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-xs"
                        />
                        <button
                          onClick={() => handleAddIndicator(idx)}
                          className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Observable Behavioral Criteria ({behaviors.length}):
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {behaviors.map((bText, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bText}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Coverage Matrix */}
      {activeTab === 'matrix' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Behavior Indicator Coverage Matrix Across Competency Groups
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Competency</th>
                  <th className="p-3 text-center">L1 Basic</th>
                  <th className="p-3 text-center">L2 Developing</th>
                  <th className="p-3 text-center">L3 Proficient</th>
                  <th className="p-3 text-center">L4 Advanced</th>
                  <th className="p-3 text-center">L5 Expert</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {competencies.filter(c => c.parent !== null && c.parent !== 1 && c.parent !== 2 && c.parent !== 3 && c.parent !== 4).map(c => {
                  const bList = getCompBehaviors(c.code);
                  return (
                    <tr key={c.code} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-slate-900 dark:text-white">
                        {c.name}
                        <span className="block font-mono text-[10px] text-slate-400">{c.code}</span>
                      </td>
                      {[0, 1, 2, 3, 4].map(lIdx => (
                        <td key={lIdx} className="p-3 text-center font-mono font-bold text-slate-700 dark:text-slate-300">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px]">
                            {bList[lIdx]?.length || 2} indicators
                          </span>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Shared Definitions */}
      {activeTab === 'scale' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          {proficiencyLevels.map(lvl => (
            <div key={lvl.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-amber-500/15 text-amber-900 dark:text-amber-300 font-bold font-mono flex items-center justify-center text-xs">
                  L{lvl.sortOrder}
                </span>
                <span className="font-extrabold text-slate-900 dark:text-white">{lvl.name}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                {lvl.definition}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Self-Assessment Preview Simulator */}
      {activeTab === 'preview' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
            Employee Self-Assessment Interface Simulator (Observable Behavior Checklist)
          </h3>
          <p className="text-xs text-slate-400">
            Demonstrates how learners select behavioral evidence during assessment cycle steps.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">
              Which behaviors do you consistently demonstrate in daily workflows for "{competencies.find(c => c.code === selectedCompCode)?.name}"?
            </span>
            <div className="space-y-2">
              {compBehaviors.flatMap((list, lIdx) => list.map((bText, bIdx) => (
                <label key={`${lIdx}-${bIdx}`} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 cursor-pointer">
                  <input type="checkbox" defaultChecked={lIdx < 2} className="mt-0.5 accent-amber-600" />
                  <span className="leading-relaxed">
                    <strong className="text-amber-600 font-mono text-[11px] mr-1">[L{lIdx + 1}]</strong>
                    {bText}
                  </span>
                </label>
              )))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
