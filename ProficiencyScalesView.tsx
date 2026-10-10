import React from 'react';
import { useTalent } from '../../../context/TalentContext';

const BUCKETS = [
  { k: 'Ready Now', min: 80, c: 'bg-emerald-500' }, { k: 'Ready 1-2 years', min: 65, c: 'bg-sky-500' },
  { k: 'Ready 3-5 years', min: 50, c: 'bg-amber-500' }, { k: 'More development needed', min: 0, c: 'bg-slate-400' },
];

export const ReadinessSixMonths: React.FC = () => {
  const { employees, calculatePromotionReadiness } = useTalent();
  const rows = employees.map(e => ({ e, s: calculatePromotionReadiness(e).score }));
  const bucket = (s: number) => BUCKETS.find(b => s >= b.min)!.k;
  const ready = rows.filter(r => bucket(r.s) === 'Ready Now');
  return (
    <div className="mb-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-wider text-rose-600">The question L&D cannot answer today</p>
      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Who is ready for a management position in the next 6 months?</h3>
      <p className="text-sm mt-1">{ready.length ? ready.map(r => `${r.e.name} (${Math.round(r.s)})`).join(', ') : 'No one is Ready Now yet.'}</p>
      <div className="flex gap-2 mt-3 text-[11px]">
        {BUCKETS.map(b => { const n = rows.filter(r => bucket(r.s) === b.k).length; return (
          <div key={b.k} className="flex-1"><div className={`h-2 rounded ${b.c}`} style={{ opacity: 0.4 + (n / Math.max(1, rows.length)) }} /><b>{n}</b> {b.k}</div>); })}
      </div>
      <p className="text-[10px] text-slate-400 mt-2">Buckets use the same 4 tiers as the L&D document. Score thresholds are placeholders to be set with L&D.</p>
    </div>
  );
};
