import React from 'react';
import { 
  Play, BookOpen, Clock, Award, Flame, CheckCircle, 
  ArrowRight, Sparkles, AlertCircle, TrendingUp, Users,
  ChevronRight, Star, ShieldCheck, DownloadCloud, Trophy
} from 'lucide-react';
import { Course, UserProfile, LeaderboardUser, Badge } from '../types/lms';

interface DashboardViewProps {
  user: UserProfile;
  courses: Course[];
  leaderboard: LeaderboardUser[];
  badges: Badge[];
  onOpenCourse: (courseId: string, lessonId?: string) => void;
  onOpenDailyQuiz: () => void;
  onNavigate: (viewId: string) => void;
  onViewCertificate: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  courses,
  leaderboard,
  badges,
  onOpenCourse,
  onOpenDailyQuiz,
  onNavigate,
  onViewCertificate
}) => {
  // Compute enrolled courses
  const enrolledCourses = courses.filter(c => user.enrolledCourseIds.includes(c.id));
  const activeCourse = enrolledCourses[0] || courses[0];

  // Recommendations: courses user hasn't enrolled in yet
  const recommendedCourses = courses.filter(c => !user.enrolledCourseIds.includes(c.id)).slice(0, 3);

  // Mandatory course check
  const mandatoryCourse = courses.find(c => c.isMandatory && !user.completedCourseIds.includes(c.id));

  // Calculate overall stats
  const totalLessons = activeCourse.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = activeCourse.modules.reduce((sum, m) => sum + m.lessons.filter(l => l.isCompleted).length, 0);
  const activeCourseProgress = Math.round((completedLessons / (totalLessons || 1)) * 100);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Hero Welcome & Motivational Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white p-6 sm:p-8 shadow-xl shadow-indigo-600/10">
        <div className="absolute right-0 top-0 -mt-6 -mr-6 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Lộ trình phát triển IT PO & Tech Leader 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Chào ngày mới, {user.name}! 👋
            </h1>
            <p className="mt-2 text-sm text-indigo-100 leading-relaxed">
              Bạn đang duy trì chuỗi học tập <span className="font-bold text-amber-300">{user.streakDays} ngày liên tiếp</span>. Chỉ còn 1 bài học nữa để hoàn thành mục tiêu phát triển chuyên môn tuần này!
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenCourse(activeCourse.id)}
                className="px-4 py-2.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs shadow-md transition-all flex items-center gap-2 group"
              >
                <Play className="w-3.5 h-3.5 fill-indigo-700 transition-transform group-hover:scale-110" />
                <span>Tiếp tục: {activeCourse.title.split(':')[0]}</span>
              </button>

              <button
                onClick={onOpenDailyQuiz}
                className="px-4 py-2.5 rounded-xl bg-indigo-500/30 hover:bg-indigo-500/40 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Làm Quiz ngày (+50 XP)</span>
              </button>
            </div>
          </div>

          {/* Quick User Level Widget */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 sm:w-64 shrink-0 text-center sm:text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-indigo-200">Cấp độ học viên</span>
              <span className="text-xs font-extrabold bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full">
                Level {user.level}
              </span>
            </div>
            <p className="text-lg font-extrabold text-white">{user.xp.toLocaleString()} XP</p>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mt-2">
              <div className="bg-amber-400 h-full rounded-full transition-all" style={{ width: '72%' }} />
            </div>
            <p className="text-[11px] text-indigo-200 mt-1.5 flex justify-between">
              <span>Hạng {leaderboard.find(l => l.isCurrentUser)?.rank || 4} toàn công ty</span>
              <span>250 XP lên Level {user.level + 1}</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Mandatory Course Alert if not completed */}
      {mandatoryCourse && (
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-900 dark:text-amber-200">
                Khóa học tuân thủ bắt buộc nội bộ: {mandatoryCourse.title}
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-200/80 dark:bg-amber-800/60 text-amber-900 dark:text-amber-200 text-[10px] font-bold">
                Hạn chót: 30/10
              </span>
            </div>
            <p className="text-amber-800 dark:text-amber-300 mt-0.5">
              Toàn bộ cán bộ nhân viên ban Công nghệ & Sản phẩm cần hoàn thành bài kiểm tra đạt 100% để cấp chứng nhận tuân thủ bảo mật ISO 27001.
            </p>
          </div>
          <button
            onClick={() => onOpenCourse(mandatoryCourse.id)}
            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shrink-0 transition-colors"
          >
            Vào học ngay
          </button>
        </div>
      )}

      {/* 3. Core KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Khóa Đang Học</span>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{user.enrolledCourseIds.length}</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <CheckCircle className="w-3 h-3" /> Đã hoàn thành 1 khóa
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tiến Độ Trung Bình</span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">68%</p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '68%' }} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Thời Lượng Tích Lũy</span>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">14.5 giờ</p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            +3.2 giờ trong 7 ngày qua
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Chứng Chỉ Đã Cấp</span>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white">1 chứng nhận</p>
          <button
            onClick={onViewCertificate}
            className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline mt-1 font-semibold flex items-center gap-1"
          >
            <span>Xem chứng chỉ vàng</span> &rarr;
          </button>
        </div>
      </div>

      {/* 4. Active Learning In-Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Khóa Học Đang Theo Học</span>
            </h2>
            <button
              onClick={() => onNavigate('courses')}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>Tất cả khóa học</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {enrolledCourses.map((course) => {
              const totalL = course.modules.reduce((s, m) => s + m.lessons.length, 0);
              const compL = course.modules.reduce((s, m) => s + m.lessons.filter(l => l.isCompleted).length, 0);
              const pct = Math.round((compL / (totalL || 1)) * 100);

              return (
                <div 
                  key={course.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full sm:w-28 h-20 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                        {course.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {course.code}
                      </span>
                      {course.certificateAvailable && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                          Có Chứng Chỉ
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Giảng viên: {course.instructorName} • {course.totalDurationMinutes} phút
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full transition-all" 
                          style={{ width: `${pct}%` }} 
                        />
                      </div>
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                        {pct}% ({compL}/{totalL} bài)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => onOpenCourse(course.id)}
                      className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm shadow-indigo-600/20 transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>{pct === 100 ? 'Học lại' : 'Vào học'}</span>
                    </button>
                    {pct === 100 && (
                      <button
                        onClick={onViewCertificate}
                        className="px-3 py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold text-xs transition-colors"
                        title="Xem chứng chỉ"
                      >
                        <Award className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Smart AI Recommended Courses */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-500" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Gợi Ý Khóa Học Thông Minh Theo Vị Trí (AI Recommendation)
                </h2>
              </div>
              <button
                onClick={() => onNavigate('ai-path')}
                className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-semibold"
              >
                Tạo lộ trình đầy đủ &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedCourses.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={rec.thumbnail}
                      alt={rec.title}
                      className="w-full h-32 rounded-lg object-cover mb-3"
                    />
                    <div className="flex items-center justify-between mb-1 text-[11px] text-slate-500">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{rec.category}</span>
                      <span className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3 h-3 fill-amber-500" /> {rec.rating} ({rec.reviewCount})
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2">
                      {rec.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {rec.shortSummary}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {rec.totalDurationMinutes} phút • {rec.level}
                    </span>
                    <button
                      onClick={() => onOpenCourse(rec.id)}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                      Khám phá &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Right Column: Gamification Leaderboard & Badges */}
        <div className="space-y-6">
          {/* Daily Quiz Teaser Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-lg shadow-violet-500/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wider">
                Thử Thách Hôm Nay
              </span>
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-amber-300" /> +50 XP
              </span>
            </div>
            <h3 className="font-extrabold text-sm mt-1">Đố Vui Kiến Thức IT PO Hằng Ngày</h3>
            <p className="text-xs text-violet-100 mt-1 leading-snug">
              Chỉ 1 câu hỏi nhanh về Velocity & Story Points trong Sprint để duy trì ngọn lửa streak!
            </p>
            <button
              onClick={onOpenDailyQuiz}
              className="mt-3 w-full py-2 rounded-lg bg-white text-indigo-700 hover:bg-violet-50 font-bold text-xs shadow transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Bắt đầu thử thách ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Leaderboard Snippet */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Bảng Xếp Hạng Tháng Này</span>
              </h3>
              <button
                onClick={() => onNavigate('gamification')}
                className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Chi tiết
              </button>
            </div>

            <div className="space-y-2.5">
              {leaderboard.slice(0, 4).map((entry) => (
                <div
                  key={entry.userId}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                    entry.isCurrentUser 
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 font-semibold' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                      entry.rank === 1 ? 'bg-amber-400 text-slate-950 font-extrabold' :
                      entry.rank === 2 ? 'bg-slate-300 text-slate-900' :
                      entry.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {entry.rank}
                    </span>
                    <img
                      src={entry.avatar}
                      alt={entry.name}
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 truncate leading-tight">
                        {entry.name}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">{entry.department}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{entry.xp} XP</span>
                    <p className="text-[10px] text-slate-400">{entry.streakDays}d streak</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Badges Unlocked */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
              <h3 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>Huy Hiệu Gần Đây</span>
              </h3>
              <button
                onClick={() => onNavigate('gamification')}
                className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Xem tất cả
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {badges.slice(0, 3).map((badge) => (
                <div
                  key={badge.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 flex flex-col items-center"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center font-bold mb-1.5 shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{badge.title}</p>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">+{badge.xpReward} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
