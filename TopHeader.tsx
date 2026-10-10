import React, { useState } from 'react';
import { 
  Grid3X3, Star, CheckCircle2, AlertTriangle, 
  Layers, ArrowRight, UserCheck, ShieldCheck, Plus, Trash2, Edit3, X, Check
} from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';
import { ImportanceLevel, RoleCompetencyItem } from '../../../types/talent';

export const RoleMatrixView: React.FC = () => {
  const { 
    roleMatrices, employees, selectedEmpId, setSelectedEmpId, 
    getCompetencyLevel, competencies, setCurrentModule,
    addRoleCompetencyItem, updateRoleCompetencyItem, removeRoleCompetencyItem
  } = useTalent();

  const [selectedRoleIndex, setSelectedRoleIndex] = useState<number>(1); // Default to HR Data Analyst (Mid)
  const currentRole = roleMatrices[selectedRoleIndex] || roleMatrices[0];
  const activeEmp = employees.find(e => e.id === selectedEmpId) || employees[0];

  // Add Item to Role Matrix Form state
  const [isAddingItem, setIsAddingItem] = useState<boolean>(false);
  const [newItemCode, setNewItemCode] = useState<string>('FUNC-DA-003');
  const [newItemTarget, setNewItemTarget] = useState<number>(3);
  const [newItemImp, setNewItemImp] = useState<ImportanceLevel>('High');
  const [newItemReq, setNewItemReq] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState<string>('');

  const getCompName = (code: string) => {
    const comp = competencies.find(c => c.code === code);
    return comp ? comp.name : code;
  };

  // Radar Chart calculations for the selected role
  const items = currentRole.items;
  const numItems = Math.max(items.length, 3);
  const radius = 130;
  const centerX = 200;
  const centerY = 190;

  const getCoordinates = (index: number, level: number) => {
    const angle = (Math.PI * 2 / numItems) * index - Math.PI / 2;
    const r = (level / 5) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle)
    };
  };

  // Generate polygon points for Target Levels
  const targetPolygonPoints = items.map((item, idx) => {
    const coords = getCoordinates(idx, item.target);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  // Generate polygon points for Employee Current Validated Levels
  const currentPolygonPoints = items.map((item, idx) => {
    const level = getCompetencyLevel(activeEmp.id, item.code);
    const coords = getCoordinates(idx, level);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    addRoleCompetencyItem(currentRole.id, {
      code: newItemCode,
      target: newItemTarget,
      imp: newItemImp,
      req: newItemReq
    });
    setToastMsg(`Added ${newItemCode} (Target: L${newItemTarget}) to ${currentRole.name}`);
    setIsAddingItem(false);
  };

  const handleRemove = (compCode: string) => {
    if (window.confirm(`Remove ${compCode} requirement from ${currentRole.name}?`)) {
      removeRoleCompetencyItem(currentRole.id, compCode);
      setToastMsg(`Removed ${compCode} from role matrix.`);
    }
  };

  // Available competencies to add
  const availableToAdd = competencies.filter(c => 
    c.parent !== null && 
    c.parent !== 1 && c.parent !== 2 && c.parent !== 3 && c.parent !== 4 &&
    !currentRole.items.some(i => i.code === c.code)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2">
          <Grid3X3 className="w-3.5 h-3.5" />
          <span>Module 03.3: Role Competency Matrix & Radar Comparison</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Role Benchmark Standards & Multi-Dimensional Radar Analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Define and customize competency requirements for each job title, adjusting Target Proficiency Levels (1-5), Criticality weightings, and mandatory prerequisites.
            </p>
          </div>

          <button
            onClick={() => setIsAddingItem(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-600/20 self-start sm:self-auto transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Benchmark Requirement</span>
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <span>✓ {toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="text-emerald-600 font-bold text-xs hover:text-emerald-800">&times;</button>
        </div>
      )}

      {/* Role Picker Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold">
        {roleMatrices.map((role, idx) => (
          <button
            key={role.id}
            onClick={() => setSelectedRoleIndex(idx)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedRoleIndex === idx
                ? 'bg-amber-600 text-white shadow-sm shadow-amber-600/30'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            {role.name} ({role.grade})
          </button>
        ))}
      </div>

      {/* 2-Column Layout: Left Table + Right SVG Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Role Competencies Table (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Role Benchmark Profile: {currentRole.name}
              </h3>
              <p className="text-xs text-slate-400">
                Department: {currentRole.dept} • Family: {currentRole.family} • Grade: {currentRole.grade} • Last updated: {currentRole.updated}
              </p>
            </div>
            <span className="text-xs font-bold text-amber-600 font-mono">
              {currentRole.items.length} Competencies
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Competency Title</th>
                  <th className="p-3">Code</th>
                  <th className="p-3 text-center">Target Level (1-5)</th>
                  <th className="p-3">Criticality</th>
                  <th className="p-3 text-center">Mandatory</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {currentRole.items.map(item => (
                  <tr key={item.code} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {getCompName(item.code)}
                    </td>
                    <td className="p-3 font-mono text-slate-400">{item.code}</td>
                    <td className="p-3 text-center">
                      <select
                        value={item.target}
                        onChange={(e) => updateRoleCompetencyItem(currentRole.id, item.code, +e.target.value, item.imp, item.req)}
                        className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-extrabold text-amber-700 dark:text-amber-400 font-mono text-center cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5].map(lvl => (
                          <option key={lvl} value={lvl}>L{lvl}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <select
                        value={item.imp}
                        onChange={(e) => updateRoleCompetencyItem(currentRole.id, item.code, item.target, e.target.value as ImportanceLevel, item.req)}
                        className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px] font-bold cursor-pointer"
                      >
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={item.req}
                        onChange={(e) => updateRoleCompetencyItem(currentRole.id, item.code, item.target, item.imp, e.target.checked)}
                        className="accent-amber-600 cursor-pointer"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleRemove(item.code)}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded"
                        title="Remove requirement"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Interactive SVG Radar Comparison (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Competency Radar Analysis
              </h3>
              <p className="text-xs text-slate-400">
                Overlay of Target Benchmark vs Validated Level for {activeEmp.name}
              </p>
            </div>

            {/* Quick Switch Employee */}
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <select
                value={selectedEmpId}
                onChange={(e) => setSelectedEmpId(+e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold border border-slate-200 dark:border-slate-700"
              >
                {employees.map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* SVG Radar */}
          <div className="flex justify-center p-2">
            <svg viewBox="0 0 400 380" className="w-full max-w-sm h-auto select-none">
              {/* Concentric circles 1 to 5 */}
              {[1, 2, 3, 4, 5].map(lvl => (
                <circle
                  key={lvl}
                  cx={centerX}
                  cy={centerY}
                  r={(lvl / 5) * radius}
                  fill="none"
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  strokeDasharray={lvl === 5 ? 'none' : '3 3'}
                />
              ))}

              {/* Axis lines and labels */}
              {items.map((item, idx) => {
                const outer = getCoordinates(idx, 5);
                const labelPos = getCoordinates(idx, 5.8);
                return (
                  <g key={item.code}>
                    <line
                      x1={centerX}
                      y1={centerY}
                      x2={outer.x}
                      y2={outer.y}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800"
                    />
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor={labelPos.x < centerX - 10 ? 'end' : labelPos.x > centerX + 10 ? 'start' : 'middle'}
                      dominantBaseline="middle"
                      className="text-[9px] font-mono fill-slate-500 dark:fill-slate-400"
                    >
                      {item.code.replace('FUNC-', '').replace('CORE-', '')}
                    </text>
                  </g>
                );
              })}

              {/* Target Polygon (Orange Dashed) */}
              <polygon
                points={targetPolygonPoints}
                fill="rgba(217, 99, 30, 0.15)"
                stroke="#d9631e"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Current Employee Validated Polygon (Emerald Solid) */}
              <polygon
                points={currentPolygonPoints}
                fill="rgba(16, 185, 129, 0.25)"
                stroke="#10b981"
                strokeWidth="2"
              />

              {/* Data points */}
              {items.map((item, idx) => {
                const targetCoord = getCoordinates(idx, item.target);
                const currentCoord = getCoordinates(idx, getCompetencyLevel(activeEmp.id, item.code));
                return (
                  <g key={idx}>
                    <circle cx={targetCoord.x} cy={targetCoord.y} r="3" fill="#d9631e" />
                    <circle cx={currentCoord.x} cy={currentCoord.y} r="3.5" fill="#10b981" />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="w-3 h-0.5 bg-[#d9631e] inline-block border-t border-dashed" />
              <span>Role Benchmark (Target)</span>
            </span>
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span>Validated Capability ({activeEmp.name.split(' ').pop()})</span>
            </span>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setCurrentModule(55)} // Jump to Gaps
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <span>Explore Competency Gaps & Heatmap (Module 05)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal: Add Requirement to Role Matrix */}
      {isAddingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Add Benchmark to {currentRole.name}
              </h3>
              <button onClick={() => setIsAddingItem(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Select Competency *
                </label>
                <select
                  value={newItemCode}
                  onChange={(e) => setNewItemCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold"
                >
                  {availableToAdd.length > 0 ? (
                    availableToAdd.map(c => (
                      <option key={c.id} value={c.code}>{c.name} ({c.code})</option>
                    ))
                  ) : (
                    competencies.filter(c => c.parent !== null).map(c => (
                      <option key={c.id} value={c.code}>{c.name} ({c.code})</option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Target Proficiency Level (1 to 5) *
                </label>
                <select
                  value={newItemTarget}
                  onChange={(e) => setNewItemTarget(+e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                >
                  <option value={1}>Level 1: Basic</option>
                  <option value={2}>Level 2: Developing</option>
                  <option value={3}>Level 3: Proficient</option>
                  <option value={4}>Level 4: Advanced</option>
                  <option value={5}>Level 5: Expert</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Criticality Weighting
                </label>
                <select
                  value={newItemImp}
                  onChange={(e) => setNewItemImp(e.target.value as ImportanceLevel)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold"
                >
                  <option value="Critical">Critical (Immediate Operational / Statutory Risk)</option>
                  <option value="High">High (Core Performance Driver)</option>
                  <option value="Medium">Medium (Standard Operational Expectation)</option>
                  <option value="Low">Low (Supportive Competency)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="chk-req"
                  checked={newItemReq}
                  onChange={(e) => setNewItemReq(e.target.checked)}
                  className="accent-amber-600"
                />
                <label htmlFor="chk-req" className="font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Mandatory Prerequisite for Role Qualification
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingItem(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md shadow-amber-600/20"
                >
                  Add Requirement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
