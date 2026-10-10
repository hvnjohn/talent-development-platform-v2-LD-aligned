import React, { useState } from 'react';
import { ClipboardList, Wallet, CalendarDays } from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';

const card = 'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm';
const fmt = (n: number) => n.toLocaleString('en-US');

export const TrainingPlanningView: React.FC = () => {
  const { trainingCatalog, trainingSessions } = useTalent();
  const [tab, setTab] = useState<'tna' | 'budget' | 'calendar'>('tna');
  const srcs = ['Manager request', 'Performance results', 'Competency gap', 'Year training plan'];
  const [tna, setTna] = useState(trainingCatalog.slice(0, 6).map((c, i) => ({
    id: c.id, name: c.name, comp: c.competencyCode, src: srcs[i % 4], demand: 4 + i * 3, priority: i % 3 === 0 ? 'High' : 'Medium', approved: false,
  })));
  const [cost, setCost] = useState<Record<string, number>>({});
  const [budgetCap, setBudgetCap] = useState(120000000);
  const [budgetOk, setBudgetOk] = useState(false);
  const unit = (id: string) => cost[id] ?? 1500000;
  const plan = tna.filter(t => t.approved);
  const total = plan.reduce((a, t) => a + t.demand * unit(t.id), 0);
  const Tab = ({ k, label, icon: I }: { k: typeof tab; label: string; icon: any }) => (
    <button onClick={() => setTab(k)} className={`px-3 py-2 rounded-xl text-xs font-bold border inline-flex items-center gap-1.5 ${tab === k ? 'bg-teal-600 text-white border-transparent' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'}`}><I className="w-3.5 h-3.5" />{label}</button>
  );

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="inline-flex px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-400 font-bold text-xs mb-2">Process 03: Training & Learning (steps 1-2)</div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Training Needs Analysis, Plan & Budget</h2>
        <p className="text-sm text-slate-500 mt-1">The TNA step is often overlooked and is the No. 1 cause of ineffective training. Inputs: manager requests, performance results, competency gaps, year training plan. Delivery and learning records stay in the LMS (buy), so this prototype only shows the integration boundary.</p>
      </div>
      <div className="flex gap-2"><Tab k="tna" label="1. Training Needs Analysis" icon={ClipboardList} /><Tab k="budget" label="2. Plan & Budget" icon={Wallet} /><Tab k="calendar" label="Training Calendar" icon={CalendarDays} /></div>

      {tab === 'tna' && (
        <div className={card}>
          <table className="w-full text-xs text-left">
            <thead><tr className="text-slate-500"><th className="p-2">Course</th><th className="p-2">Competency</th><th className="p-2">Need source</th><th className="p-2">Learners</th><th className="p-2">Priority</th><th className="p-2">Add to plan</th></tr></thead>
            <tbody>{tna.map(t => (
              <tr key={t.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="p-2 font-bold">{t.name}</td><td className="p-2 font-mono">{t.comp}</td><td className="p-2">{t.src}</td><td className="p-2">{t.demand}</td>
                <td className="p-2"><span className={t.priority === 'High' ? 'text-rose-600 font-bold' : ''}>{t.priority}</span></td>
                <td className="p-2"><input type="checkbox" checked={t.approved} onChange={() => setTna(x => x.map(y => y.id === t.id ? { ...y, approved: !y.approved } : y))} /></td>
              </tr>))}</tbody>
          </table>
        </div>
      )}

      {tab === 'budget' && (
        <div className={card}>
          <div className="flex flex-wrap gap-4 items-center text-xs mb-3">
            <label className="font-bold">Annual budget (VND) <input type="number" value={budgetCap} onChange={e => { setBudgetCap(+e.target.value); setBudgetOk(false); }} className="ml-2 border rounded px-2 py-1 w-36 bg-transparent" /></label>
            <span>Planned: <b>{fmt(total)}</b></span>
            <span className={total > budgetCap ? 'text-rose-600 font-bold' : 'text-emerald-600 font-bold'}>{total > budgetCap ? 'Over budget' : 'Within budget'}</span>
            <button disabled={total > budgetCap || plan.length === 0} onClick={() => setBudgetOk(true)} className="px-3 py-1.5 rounded-lg font-bold bg-teal-600 text-white disabled:opacity-40">{budgetOk ? 'Budget approved' : 'Submit for approval'}</button>
          </div>
          {plan.length === 0 ? <p className="text-xs text-slate-500">Select courses in the TNA tab first.</p> : (
            <table className="w-full text-xs text-left">
              <thead><tr className="text-slate-500"><th className="p-2">Course</th><th className="p-2">Learners</th><th className="p-2">Cost / learner</th><th className="p-2">Subtotal</th></tr></thead>
              <tbody>{plan.map(t => (
                <tr key={t.id} className="border-t border-slate-100 dark:border-slate-800"><td className="p-2">{t.name}</td><td className="p-2">{t.demand}</td>
                  <td className="p-2"><input type="number" value={unit(t.id)} onChange={e => setCost({ ...cost, [t.id]: +e.target.value })} className="w-28 border rounded px-1 bg-transparent" /></td>
                  <td className="p-2 font-bold">{fmt(t.demand * unit(t.id))}</td></tr>))}</tbody>
            </table>)}
        </div>
      )}

      {tab === 'calendar' && (
        <div className={card}>
          <p className="text-xs text-slate-500 mb-3">{budgetOk ? 'Calendar published from the approved plan.' : 'Draft: approve the budget to publish and send registration notifications.'}</p>
          {trainingSessions.map(s => (
            <div key={s.id} className="flex justify-between text-xs py-2 border-t border-slate-100 dark:border-slate-800">
              <span><b>{s.date}</b> - {trainingCatalog.find(c => c.id === s.courseId)?.name} ({s.location})</span><span>{s.bookedSeats}/{s.totalSeats} seats</span>
            </div>))}
        </div>
      )}
    </div>
  );
};
