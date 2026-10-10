import React, { useState } from 'react';
import { Target, CheckCircle2, Scale, Megaphone, ArrowRight, MessageSquare } from 'lucide-react';
import { useTalent } from '../../../context/TalentContext';

const STEPS = ['1. Set Goals (KPI/OKR)', '2. Mid-term Check-in', '3. Final Assessment', '4. Calibration & Ranking', '5. Connect to Development'];
const card = 'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm';
const btn = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 text-white hover:bg-amber-700';
const grade = (s: number) => (s >= 4.5 ? 'A' : s >= 3.5 ? 'B' : s >= 2.5 ? 'C' : 'D');

export const PerformanceEvaluationView: React.FC = () => {
  const { employees, setCurrentModule } = useTalent();
  const [step, setStep] = useState(0);
  const [cycle, setCycle] = useState('H1 2026 (6-month cycle)');
  const [goals, setGoals] = useState([
    { id: 1, type: 'KPI', text: 'Monthly HR dashboard delivered on time', weight: 40, signed: true, progress: 70 },
    { id: 2, type: 'OKR', text: 'Attrition model accuracy >= 80%', weight: 40, signed: false, progress: 45 },
    { id: 3, type: 'KPI', text: 'Complete 2 mandatory trainings', weight: 20, signed: false, progress: 50 },
  ]);
  const [checkin, setCheckin] = useState<Record<number, string>>({ 1: 'On track', 2: 'Needs support: data access' });
  const [ratings, setRatings] = useState(employees.slice(0, 6).map((e, i) => ({
    id: e.id, name: e.name, dept: e.team, self: 3 + (i % 2), mgr: 3 + ((i + 1) % 3) * 0.5, fb11: i % 3 !== 2, calib: 0, appeal: '' as '' | 'Open' | 'Resolved', notified: false,
  })));
  const [toast, setToast] = useState('');
  const flash = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2500); };
  const totalW = goals.reduce((a, g) => a + g.weight, 0);
  const signedCnt = goals.filter(g => g.signed).length;
  const upd = (id: number, p: object) => setRatings(r => r.map(x => (x.id === id ? { ...x, ...p } : x)));

  return (
    <div className="space-y-6 pb-12">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold text-xs mb-2">
          <Target className="w-3.5 h-3.5" /><span>Process 02: Performance Evaluation</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Performance Evaluation Cycle</h2>
        <p className="text-sm text-slate-500 mt-1">Start: set goals, Mid-term: check-in, End of term: full review, Post-review: development. Replaces Excel and the in-house tool.</p>
      </div>

      <div className={`${card} flex flex-wrap items-center gap-4 text-xs`}>
        <label className="font-bold">Cycle
          <select value={cycle} onChange={e => setCycle(e.target.value)} className="ml-2 border rounded-lg px-2 py-1 bg-transparent">
            <option>H1 2026 (6-month cycle)</option><option>FY 2026 (1-year cycle)</option>
          </select>
        </label>
        <span>Goals signed: <b>{signedCnt}/{goals.length}</b></span>
        <span>1:1 held: <b>{ratings.filter(r => r.fb11).length}/{ratings.length}</b></span>
        <span>Notified: <b>{ratings.filter(r => r.notified).length}/{ratings.length}</b></span>
        <div className="flex-1 min-w-32 h-2 rounded bg-slate-200 dark:bg-slate-800"><div className="h-2 rounded bg-blue-500" style={{ width: `${(ratings.filter(r => r.notified).length / ratings.length) * 100}%` }} /></div>
      </div>

      <div className="flex flex-wrap gap-2">
        {STEPS.map((s, i) => (
          <button key={s} onClick={() => setStep(i)} className={`px-3 py-2 rounded-xl text-xs font-bold border ${step === i ? 'bg-blue-600 text-white border-transparent' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'}`}>{s}</button>
        ))}
      </div>

      {step === 0 && (
        <div className={card}>
          <h3 className="font-extrabold text-sm mb-3">Goals set by HR + Manager + Employee (employee confirms and signs)</h3>
          <table className="w-full text-xs text-left">
            <thead><tr className="text-slate-500"><th className="p-2">Type</th><th className="p-2">Goal</th><th className="p-2">Weight %</th><th className="p-2">Employee sign-off</th></tr></thead>
            <tbody>{goals.map(g => (
              <tr key={g.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="p-2 font-bold">{g.type}</td><td className="p-2">{g.text}</td><td className="p-2">{g.weight}</td>
                <td className="p-2">{g.signed ? <span className="text-emerald-600 font-bold inline-flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Signed</span>
                  : <button className={btn} onClick={() => { setGoals(gs => gs.map(x => x.id === g.id ? { ...x, signed: true } : x)); flash('Employee confirmed and signed the goal'); }}>Confirm & sign</button>}</td>
              </tr>))}</tbody>
          </table>
          <p className={`text-xs mt-3 font-bold ${totalW === 100 ? 'text-emerald-600' : 'text-rose-600'}`}>Total weight: {totalW}% {totalW === 100 ? '(valid)' : '(must equal 100%)'}</p>
        </div>
      )}

      {step === 1 && (
        <div className={card}>
          <h3 className="font-extrabold text-sm mb-3">Mid-term check-in & goal adjustment (Manager + Employee)</h3>
          {goals.map(g => (
            <div key={g.id} className="grid grid-cols-12 gap-3 items-center py-2 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div className="col-span-4">{g.text}</div>
              <div className="col-span-3"><input type="range" min={0} max={100} value={g.progress} onChange={e => setGoals(gs => gs.map(x => x.id === g.id ? { ...x, progress: +e.target.value } : x))} className="w-full" /> {g.progress}%</div>
              <input className="col-span-5 border rounded-lg px-2 py-1 bg-transparent" placeholder="Check-in note / adjustment" value={checkin[g.id] || ''} onChange={e => setCheckin({ ...checkin, [g.id]: e.target.value })} />
            </div>))}
        </div>
      )}

      {step === 2 && (
        <div className={card}>
          <h3 className="font-extrabold text-sm mb-3">Final assessment: self-assessment + independent manager rating + mandatory 1:1 feedback</h3>
          <table className="w-full text-xs text-left">
            <thead><tr className="text-slate-500"><th className="p-2">Employee</th><th className="p-2">Self</th><th className="p-2">Manager</th><th className="p-2">1:1 feedback</th></tr></thead>
            <tbody>{ratings.map(r => (
              <tr key={r.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="p-2 font-bold">{r.name}<div className="font-normal text-slate-400">{r.dept}</div></td>
                <td className="p-2">{r.self}</td>
                <td className="p-2"><input type="number" min={1} max={5} step={0.5} value={r.mgr} onChange={e => upd(r.id, { mgr: +e.target.value })} className="w-16 border rounded px-1 bg-transparent" /></td>
                <td className="p-2"><button onClick={() => upd(r.id, { fb11: !r.fb11 })} className={`px-2 py-1 rounded-lg font-bold ${r.fb11 ? 'bg-emerald-500/10 text-emerald-700' : 'bg-rose-500/10 text-rose-700'}`}><MessageSquare className="w-3 h-3 inline mr-1" />{r.fb11 ? 'Done' : 'Required'}</button></td>
              </tr>))}</tbody>
          </table>
        </div>
      )}

      {step === 3 && (
        <div className={card}>
          <h3 className="font-extrabold text-sm mb-1 flex items-center gap-2"><Scale className="w-4 h-4" />Calibration session (HR Manager presiding) and ranking</h3>
          <p className="text-xs text-slate-500 mb-3">Final score = manager rating + calibration adjustment. Employees can file a complaint, which goes to appeal.</p>
          <table className="w-full text-xs text-left">
            <thead><tr className="text-slate-500"><th className="p-2">Rank</th><th className="p-2">Employee</th><th className="p-2">Manager</th><th className="p-2">Calibration</th><th className="p-2">Final / Grade</th><th className="p-2">Appeal</th></tr></thead>
            <tbody>{[...ratings].sort((a, b) => (b.mgr + b.calib) - (a.mgr + a.calib)).map((r, i) => {
              const f = Math.min(5, Math.max(1, r.mgr + r.calib));
              return (
                <tr key={r.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="p-2 font-bold">#{i + 1}</td><td className="p-2">{r.name}</td><td className="p-2">{r.mgr}</td>
                  <td className="p-2"><select value={r.calib} onChange={e => upd(r.id, { calib: +e.target.value })} className="border rounded bg-transparent"><option value={-0.5}>-0.5</option><option value={0}>0</option><option value={0.5}>+0.5</option></select></td>
                  <td className="p-2 font-bold">{f} / {grade(f)}</td>
                  <td className="p-2">{r.appeal === '' ? <button className="underline text-slate-500" onClick={() => upd(r.id, { appeal: 'Open' })}>File complaint</button>
                    : r.appeal === 'Open' ? <button className={btn} onClick={() => upd(r.id, { appeal: 'Resolved' })}>Resolve appeal</button> : <span className="text-emerald-600 font-bold">Resolved</span>}</td>
                </tr>);
            })}</tbody>
          </table>
        </div>
      )}

      {step === 4 && (
        <div className={card}>
          <h3 className="font-extrabold text-sm mb-3 flex items-center gap-2"><Megaphone className="w-4 h-4" />Notify results, then link to IDP and Training</h3>
          {ratings.map(r => {
            const f = Math.min(5, Math.max(1, r.mgr + r.calib));
            return (
              <div key={r.id} className="flex flex-wrap items-center gap-3 py-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold w-40">{r.name}</span><span className="w-16">Grade {grade(f)}</span>
                <button className={btn} disabled={r.appeal === 'Open'} onClick={() => { upd(r.id, { notified: true }); flash(`Result sent to ${r.name}`); }}>{r.notified ? 'Notified' : 'Notify employee'}</button>
                <button className="inline-flex items-center gap-1 font-bold text-amber-700" onClick={() => setCurrentModule(57)}>Create IDP <ArrowRight className="w-3 h-3" /></button>
                <button className="inline-flex items-center gap-1 font-bold text-teal-700" onClick={() => setCurrentModule(71)}>Feed TNA <ArrowRight className="w-3 h-3" /></button>
              </div>);
          })}
        </div>
      )}
      {toast && <div className="fixed bottom-6 right-6 bg-slate-900 text-white text-xs px-4 py-2 rounded-xl shadow-lg">{toast}</div>}
    </div>
  );
};
