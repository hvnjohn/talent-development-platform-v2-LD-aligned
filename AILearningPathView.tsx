import React, { useState } from 'react';
import { 
  Trophy, Award, Flame, Calendar, Sparkles, 
  CheckCircle2, Clock, ShieldCheck, DownloadCloud,
  GraduationCap, Star, Users, Medal
} from 'lucide-react';
import { LeaderboardUser, Badge, UserProfile } from '../types/lms';

interface LeaderboardGamificationViewProps {
  user: UserProfile;
  leaderboard: LeaderboardUser[];
  badges: Badge[];
}

export const LeaderboardGamificationView: React.FC<LeaderboardGamificationViewProps> = ({
  user,
  leaderboard,
  badges
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'weekly' | 'department'>('all');
  const [selectedBadgeFilter, setSelectedBadgeFilter] = useState<'all' | 'learning' | 'quiz' | 'streak'>('all');

  const top3 = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  const filteredBadges = badges.filter(b => 
    selectedBadgeFilter === 'all' ? true : b.category === selectedBadgeFilter
  );

  // Past 7 days streak mock
  const weekDays = [
    { day: 'T2 (05/10)', active: true, xp: 50 },
    { day: 'T3 (06/10)', active: true, xp: 80 },
    { day: 'T4 (07/10)', active: true, xp: 120 },
    { day: 'T5 (08/10)', active: true, xp: 60 },
    { day: 'T6 (09/10)', active: true, xp: 150, today: true },
    { day: 'T7 (10/10)', active: false, xp: 0 },
    { day: 'CN (11/10)', active: false, xp: 0 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>Hệ Thống Gamification Doanh Nghiệp</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bảng Xếp Hạng, Chuỗi Ngày Học & Huy Hiệu Thành Tích
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Tạo động lực học tập liên tục thông qua cơ chế tích lũy điểm thưởng XP, chuỗi ngày chuyên cần và vinh danh thành tích cá nhân.
        </p>
      </div>

      {/* 1. Daily Streak Tracker Card */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-2xl p-5 sm:p-6 text-slate-950 shadow-lg shadow-orange-500/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Flame className="w-8 h-8 fill-slate-950 text-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black">Chuỗi Chuyên Cần: {user.streakDays} Ngày Liên Tiếp!</h2>
                <span className="text-[10px] font-extrabold bg-slate-950 text-white px-2 py-0.5 rounded-full">
                  SIÊU CẤP
                </span>
              </div>
              <p className="text-xs text-slate-900/80 font-medium mt-0.5">
                Chỉ cần học 15 phút hoặc hoàn thành Daily Quiz mỗi ngày để không bị gián đoạn chuỗi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {weekDays.map((wd, idx) => (
              <div 
                key={idx}
                className={`p-2 sm:px-3 rounded-xl text-center backdrop-blur-md ${
                  wd.today 
                    ? 'bg-slate-950 text-white ring-2 ring-white font-bold' 
                    : wd.active 
                      ? 'bg-white/40 text-slate-950 font-semibold' 
                      : 'bg-white/15 text-slate-800/60'
                }`}
              >
                <p className="text-[10px] uppercase">{wd.day.split(' ')[0]}</p>
                <div className="my-1 flex justify-center">
                  {wd.active ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-950" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-900/30" />
                  )}
                </div>
                <span className="text-[9px] font-mono">{wd.active ? `+${wd.xp}` : '-'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Leaderboard Section with Podium */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Bảng Vinh Danh Học Tập (Leaderboard)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Xếp hạng theo tổng điểm XP tích lũy và số khóa học hoàn thành</p>
          </div>

          {/* Time Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'all' 
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Toàn công ty
            </button>
            <button
              onClick={() => setActiveTab('weekly')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'weekly' 
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Tuần này
            </button>
            <button
              onClick={() => setActiveTab('department')}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === 'department' 
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Khối Product & Tech
            </button>
          </div>
        </div>

        {/* Podium Top 3 */}
        <div className="py-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto items-end text-center">
          {/* Rank 2 (Silver) */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <img
                src={top3[1]?.avatar}
                alt={top3[1]?.name}
                className="w-14 sm:w-16 h-14 sm:h-16 rounded-full object-cover ring-4 ring-slate-300"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-900 font-extrabold text-[11px] w-6 h-6 rounded-full flex items-center justify-center shadow">
                2
              </span>
            </div>
            <p className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-2 truncate max-w-[100px]">{top3[1]?.name}</p>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{top3[1]?.xp} XP</span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-16 rounded-t-xl mt-2 flex items-center justify-center font-bold text-slate-400 text-xs">
              Hạng 2
            </div>
          </div>

          {/* Rank 1 (Gold) */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Medal className="w-5 h-5 text-amber-500 fill-amber-500" />
              </div>
              <img
                src={top3[0]?.avatar}
                alt={top3[0]?.name}
                className="w-16 sm:w-20 h-16 sm:h-20 rounded-full object-cover ring-4 ring-amber-400 shadow-lg shadow-amber-500/20"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 font-black text-xs w-6 h-6 rounded-full flex items-center justify-center shadow">
                1
              </span>
            </div>
            <p className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white mt-2 truncate max-w-[120px]">{top3[0]?.name}</p>
            <span className="text-xs font-black text-amber-600 dark:text-amber-400">{top3[0]?.xp} XP</span>
            <div className="w-full bg-amber-500/20 border-t-2 border-amber-400 h-24 rounded-t-xl mt-2 flex items-center justify-center font-black text-amber-700 dark:text-amber-400 text-sm">
              👑 Quán Quân
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <img
                src={top3[2]?.avatar}
                alt={top3[2]?.name}
                className="w-14 sm:w-16 h-14 sm:h-16 rounded-full object-cover ring-4 ring-amber-700/60"
              />
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-700 text-white font-extrabold text-[11px] w-6 h-6 rounded-full flex items-center justify-center shadow">
                3
              </span>
            </div>
            <p className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-2 truncate max-w-[100px]">{top3[2]?.name}</p>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{top3[2]?.xp} XP</span>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-12 rounded-t-xl mt-2 flex items-center justify-center font-bold text-slate-400 text-xs">
              Hạng 3
            </div>
          </div>
        </div>

        {/* Remaining Ranking Table */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800 pt-2">
          {remaining.map((entry) => (
            <div
              key={entry.userId}
              className={`py-3 px-3 rounded-xl flex items-center justify-between text-xs transition-colors ${
                entry.isCurrentUser 
                  ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 font-bold' 
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 font-bold text-slate-400 text-center">
                  #{entry.rank}
                </span>
                <img
                  src={entry.avatar}
                  alt={entry.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {entry.name} {entry.isCurrentUser && '(Bạn)'}
                  </p>
                  <p className="text-[11px] text-slate-400 font-normal">{entry.department}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div className="hidden sm:block">
                  <span className="text-slate-400 font-normal">{entry.completedCourses} khóa hoàn thành</span>
                </div>
                <div className="flex items-center gap-1 font-bold text-orange-600 dark:text-orange-400">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  <span>{entry.streakDays}d</span>
                </div>
                <span className="font-extrabold text-indigo-600 dark:text-indigo-400 min-w-16">
                  {entry.xp} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Badges & Achievements Showcase */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" />
              <span>Huy Hiệu Thành Tích Đã Mở Khóa ({badges.filter(b => b.progressPercent === 100).length}/{badges.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Thu thập đủ các huy hiệu để mở khóa phần thưởng văn hóa học tập</p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {(['all', 'learning', 'quiz', 'streak'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedBadgeFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedBadgeFilter === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {cat === 'all' ? 'Tất cả' : cat === 'learning' ? 'Học tập' : cat === 'quiz' ? 'Trắc nghiệm' : 'Chuỗi ngày'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBadges.map((badge) => {
            const isUnlocked = badge.progressPercent === 100;
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border flex items-start gap-3.5 transition-all ${
                  isUnlocked
                    ? 'bg-emerald-50/30 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-70'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold shrink-0 shadow-sm ${
                  isUnlocked
                    ? 'bg-gradient-to-tr from-amber-400 to-orange-500 text-white shadow-orange-500/20'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                }`}>
                  <Award className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white truncate">
                      {badge.title}
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      +{badge.xpReward} XP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {badge.description}
                  </p>

                  <div className="mt-2.5">
                    {isUnlocked ? (
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Đã mở khóa ngày {badge.unlockedAt}
                      </span>
                    ) : (
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>Tiến độ</span>
                          <span>{badge.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${badge.progressPercent}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
