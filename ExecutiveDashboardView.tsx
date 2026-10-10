import React, { useState } from 'react';
import { 
  BookOpen, Plus, Search, ChevronRight, ChevronDown, 
  Copy, Trash2, CheckCircle2, ExternalLink, Layers, 
  Sparkles, Edit3, X, Check, Save
} from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';
import { CompetencyNode } from '../../../types/talent';

export const CompetencyDictionaryView: React.FC = () => {
  const { 
    competencies, addCompetency, updateCompetency, 
    deleteCompetency, setCurrentModule 
  } = useTalent();

  const [searchQ, setSearchQ] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number>(223); // Default to HR Data Privacy Decree 13
  const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    21: true,
    22: true
  });
  const [toastMsg, setToastMsg] = useState<string>('');

  // Editing state for selected node
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editForm, setEditForm] = useState({ name: '', code: '', def: '' });

  // Creation modal state
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [newForm, setNewForm] = useState({
    name: '',
    code: '',
    def: '',
    parent: 22, // Default parent: People & HR Analytics
    category: 'Functional' as const
  });

  const toggleExpand = (id: number) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getChildren = (parentId: number | null) => 
    competencies.filter(c => c.parent === parentId).sort((a, b) => a.order - b.order);

  const selectedNode = competencies.find(c => c.id === selectedId) || competencies[0];

  const getPath = (id: number): CompetencyNode[] => {
    const path: CompetencyNode[] = [];
    let cur = competencies.find(c => c.id === id);
    while (cur) {
      path.unshift(cur);
      cur = cur.parent !== null ? competencies.find(c => c.id === cur?.parent) : undefined;
    }
    return path;
  };

  const path = selectedNode ? getPath(selectedNode.id) : [];

  const startEdit = () => {
    if (!selectedNode) return;
    setEditForm({
      name: selectedNode.name,
      code: selectedNode.code,
      def: selectedNode.def || ''
    });
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (!selectedNode) return;
    updateCompetency(selectedNode.id, {
      name: editForm.name,
      code: editForm.code,
      def: editForm.def
    });
    setIsEditing(false);
    setToastMsg(`Updated competency "${editForm.name}" successfully!`);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newForm.name.trim() || !newForm.code.trim()) return;

    const parentNode = competencies.find(c => c.id === newForm.parent);
    const created = addCompetency({
      name: newForm.name,
      code: newForm.code.toUpperCase(),
      def: newForm.def,
      parent: newForm.parent,
      category: parentNode?.category || 'Functional',
      status: 'A',
      date: new Date().toISOString().split('T')[0],
      order: competencies.filter(c => c.parent === newForm.parent).length + 1
    });

    // Automatically expand parent node and select newly created item
    setExpandedNodes(prev => ({ ...prev, [newForm.parent]: true }));
    setSelectedId(created.id);
    setIsCreating(false);
    setNewForm({ name: '', code: '', def: '', parent: 22, category: 'Functional' });
    setToastMsg(`Created new competency "${created.name}" (${created.code}) successfully!`);
  };

  const handleDelete = () => {
    if (!selectedNode) return;
    if (window.confirm(`Are you sure you want to delete "${selectedNode.name}" (${selectedNode.code})?`)) {
      const codeToDelete = selectedNode.code;
      deleteCompetency(selectedNode.id);
      setSelectedId(221); // Fallback to HR Metrics
      setToastMsg(`Competency "${codeToDelete}" removed.`);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Module 03.1: Competency Dictionary (Master Hierarchy)</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Competency Tree & Profile Metadata (CF-01 & CF-04)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              The enterprise Single Source of Truth defining Core, Functional (Data Analytics & HR Analytics), Leadership, and Digital competencies.
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-amber-600/20 self-start sm:self-auto transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create New Competency</span>
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <span>✓ {toastMsg}</span>
          <button onClick={() => setToastMsg('')} className="text-emerald-600 font-bold text-xs hover:text-emerald-800">&times;</button>
        </div>
      )}

      {/* 2-Column Layout: Left Hierarchy Tree + Right Node Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Tree View (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by code or name..."
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
            <button
              onClick={() => {
                const all: Record<number, boolean> = {};
                competencies.forEach(c => all[c.id] = true);
                setExpandedNodes(all);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-[11px] whitespace-nowrap hover:bg-slate-200"
            >
              Expand All
            </button>
          </div>

          {/* Tree Recursive Renderer */}
          <div className="space-y-1 max-h-[580px] overflow-y-auto text-xs pr-1">
            {getChildren(null).map(rootCat => {
              const rootChildren = getChildren(rootCat.id);
              const isRootOpen = expandedNodes[rootCat.id];

              return (
                <div key={rootCat.id} className="space-y-1">
                  {/* Level 1: Category */}
                  <div
                    onClick={() => {
                      setSelectedId(rootCat.id);
                      setIsEditing(false);
                    }}
                    className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer font-bold transition-all ${
                      selectedId === rootCat.id
                        ? 'bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/40 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(rootCat.id);
                        }}
                        className="p-0.5 text-slate-400 hover:text-slate-700"
                      >
                        {isRootOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                      <span>{rootCat.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">{rootCat.code}</span>
                  </div>

                  {/* Level 2 & 3: Children */}
                  {isRootOpen && (
                    <div className="pl-4 space-y-1 border-l-2 border-slate-200 dark:border-slate-800 ml-3">
                      {rootChildren.map(grp => {
                        const grpChildren = getChildren(grp.id);
                        const isGrpOpen = expandedNodes[grp.id];

                        return (
                          <div key={grp.id} className="space-y-1">
                            <div
                              onClick={() => {
                                setSelectedId(grp.id);
                                setIsEditing(false);
                              }}
                              className={`p-2 rounded-lg flex items-center justify-between cursor-pointer transition-all ${
                                selectedId === grp.id
                                  ? 'bg-amber-500/20 text-amber-950 dark:text-amber-300 font-bold border border-amber-500/30'
                                  : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold'
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                {grpChildren.length > 0 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleExpand(grp.id);
                                    }}
                                  >
                                    {isGrpOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                                  </button>
                                )}
                                <span>{grp.name}</span>
                              </div>
                              <span className="font-mono text-[10px] text-slate-400">{grp.code}</span>
                            </div>

                            {/* Level 3: Competencies */}
                            {isGrpOpen && grpChildren.length > 0 && (
                              <div className="pl-4 space-y-1 border-l-2 border-slate-200 dark:border-slate-800 ml-3">
                                {grpChildren.map(comp => (
                                  <div
                                    key={comp.id}
                                    onClick={() => {
                                      setSelectedId(comp.id);
                                      setIsEditing(false);
                                    }}
                                    className={`p-2 rounded-lg flex items-center justify-between cursor-pointer text-xs transition-all ${
                                      selectedId === comp.id
                                        ? 'bg-amber-500/20 text-amber-950 dark:text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                                        : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                                    }`}
                                  >
                                    <span className="truncate pr-2">{comp.name}</span>
                                    <span className="font-mono text-[10px] text-slate-400 shrink-0">{comp.code}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Node Details & Editable Form (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono">
                  Level {path.length}: {path.length === 1 ? 'Category' : path.length === 2 ? 'Competency Group' : 'Competency Item'}
                </span>
                <span className="text-xs font-mono font-bold text-amber-600">
                  {selectedNode?.code}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {path.map(p => p.name).join(' › ')}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!isEditing ? (
                <button
                  onClick={startEdit}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Edit Profile</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={saveEdit}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            {selectedNode?.name}
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Competency Code:
              </label>
              <input
                type="text"
                readOnly={!isEditing}
                value={isEditing ? editForm.code : selectedNode?.code}
                onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                className={`w-full p-2.5 rounded-xl font-mono font-bold border ${
                  isEditing 
                    ? 'bg-white dark:bg-slate-900 border-amber-500 focus:outline-none ring-2 ring-amber-500/20' 
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Standard Competency Name:
              </label>
              <input
                type="text"
                readOnly={!isEditing}
                value={isEditing ? editForm.name : selectedNode?.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className={`w-full p-2.5 rounded-xl font-bold border ${
                  isEditing 
                    ? 'bg-white dark:bg-slate-900 border-amber-500 focus:outline-none ring-2 ring-amber-500/20' 
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Definition & Behavioral Scope (CF-04):
              </label>
              <textarea
                rows={3}
                readOnly={!isEditing}
                value={isEditing ? editForm.def : (selectedNode?.def || 'Standard behavioral guidelines defined in proficiency scale dictionary.')}
                onChange={(e) => setEditForm({ ...editForm, def: e.target.value })}
                className={`w-full p-2.5 rounded-xl leading-relaxed text-slate-700 dark:text-slate-300 border ${
                  isEditing 
                    ? 'bg-white dark:bg-slate-900 border-amber-500 focus:outline-none ring-2 ring-amber-500/20' 
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Status:
                </label>
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-bold text-center border border-emerald-200 dark:border-emerald-800">
                  Active (Production)
                </div>
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Effective Date:
                </label>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-center font-mono border border-slate-200 dark:border-slate-700">
                  {selectedNode?.date || '2026-10-07'}
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <button
              onClick={() => {
                setCurrentModule(53); // Jump to 3.2 Scales & Behaviors
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <span>View 5 Levels & Indicators (3.2)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const cloned = addCompetency({
                    name: `${selectedNode.name} (Copy)`,
                    code: `${selectedNode.code}-V2`,
                    def: selectedNode.def,
                    parent: selectedNode.parent,
                    category: selectedNode.category,
                    status: 'A',
                    date: new Date().toISOString().split('T')[0],
                    order: selectedNode.order + 1
                  });
                  setSelectedId(cloned.id);
                  setToastMsg(`Cloned node ${selectedNode.code} to ${cloned.code}`);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Clone</span>
              </button>

              <button
                onClick={handleDelete}
                className="px-3 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 font-semibold text-xs flex items-center gap-1 hover:bg-rose-50 dark:hover:bg-rose-950/40"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Create New Competency */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Create New Competency Node
                </h3>
              </div>
              <button 
                onClick={() => setIsCreating(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNew} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Parent Group / Category *
                </label>
                <select
                  value={newForm.parent}
                  onChange={(e) => setNewForm({ ...newForm, parent: +e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold"
                >
                  <option value={22}>Functional: People & HR Analytics (FUNC-HRA)</option>
                  <option value={21}>Functional: Data Analytics Mastery (FUNC-DA)</option>
                  <option value={1}>Core Competencies (CORE)</option>
                  <option value={3}>Leadership Competencies (LEAD)</option>
                  <option value={4}>Digital & AI Competencies (DIG)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Competency Code * (e.g., FUNC-HRA-004)
                </label>
                <input
                  type="text"
                  required
                  placeholder="FUNC-HRA-004"
                  value={newForm.code}
                  onChange={(e) => setNewForm({ ...newForm, code: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Competency Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="HR Analytics Architecture & Cloud Pipelines"
                  value={newForm.name}
                  onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Definition & Behavioral Scope (CF-04)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the operational expectations, tools, and observable behavioral output for this capability..."
                  value={newForm.def}
                  onChange={(e) => setNewForm({ ...newForm, def: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md shadow-amber-600/20"
                >
                  Create & Save Competency
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
