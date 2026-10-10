import React, { useState } from 'react';
import { 
  Bell, Flame, Moon, Sun, Search, Sparkles, 
  HelpCircle, CheckCircle2, Award, BookOpen, 
  UserCheck, Shield, GraduationCap, X, ChevronDown, DownloadCloud
} from 'lucide-react';
import { UserProfile, UserRole, AppNotification } from '../types/lms';

interface HeaderProps {
  user: UserProfile;
  onRoleChange: (role: UserRole) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenDailyQuiz: () => void;
  onOpenOfflineManager: () => void;
  notifications: AppNotification[];
  onMarkNotificationRead: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigate: (viewId: string) => void;
  isOfflineMode: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onRoleChange,
  darkMode,
  onToggleDarkMode,
  onOpenDailyQuiz,
  onOpenOfflineManager,
  notifications,
  onMarkNotificationRead,
  searchQuery,
  onSearchChange,
  onNavigate,
  isOfflineMode
}) => {
  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const roleLabels: Record<UserRole, { label: string; icon: any; color: string; desc: string }> = {
    student: {
      label: 'Học viên (Employee)',
      icon: GraduationCap,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      desc: 'Học tập, làm trắc nghiệm, nhận chứng chỉ'
    },
    instructor: {
      label: 'Giảng viên (Trainer)',
      icon: BookOpen,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      desc: 'Quản lý bài giảng, tạo quiz, chấm điểm'
    },
    admin: {
      label: 'Quản trị viên (HR / PO)',
      icon: Shield,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      desc: 'Báo cáo toàn diện, phân quyền, xuất PDF'
    }
  };

  const currentRoleInfo = roleLabels[user.role];

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Offline Mode Alert Banner if active */}
      {isOfflineMode && (
        <div className="bg-amber-500 text-amber-950 dark:text-black font-semibold text-xs py-1 px-4 text-center flex items-center justify-center gap-2">
          <DownloadCloud className="w-3.5 h-3.5" />
          <span>Đang chạy ở Chế độ Ngoại tuyến (Offline Mode) - Chỉ hiển thị các bài giảng đã tải về máy</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand logo & tag */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/20">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent">
                EduCore LMS
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 uppercase tracking-wider">
                Enterprise PO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Hệ thống Đào tạo & Quản lý Khóa học Nội bộ
            </p>
          </div>
        </div>

        {/* Middle: Quick Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm khóa học, bài giảng, tài liệu, kỹ năng..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions: Gamification Streak, Daily Quiz, Role Switcher, Notifs, Theme, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak Flame Pill */}
          <div 
            onClick={() => onNavigate('gamification')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 cursor-pointer hover:scale-105 transition-transform"
            title="Chuỗi ngày học liên tục. Nhấn để xem Bảng xếp hạng & Huy hiệu"
          >
            <Flame className="w-4 h-4 text-orange-500 animate-pulse fill-orange-500" />
            <span className="text-xs font-bold">{user.streakDays} ngày</span>
          </div>

          {/* Daily Quiz Shortcut Button */}
          <button
            onClick={onOpenDailyQuiz}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-semibold transition-colors"
            title="Đố vui kiểm tra kiến thức hằng ngày (+50 XP)"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            <span>Quiz hôm nay</span>
            <span className="text-[10px] bg-violet-600 text-white px-1.5 rounded-full font-bold">+50 XP</span>
          </button>

          {/* Offline Manager Shortcut */}
          <button
            onClick={onOpenOfflineManager}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            title="Quản lý học ngoại tuyến (Offline)"
          >
            <DownloadCloud className="w-4 h-4" />
          </button>

          {/* Role Switcher Dropdown (Phân quyền người dùng theo yêu cầu của PO) */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${currentRoleInfo.color}`}
              title="Chuyển đổi vai trò người dùng (Phân quyền LMS)"
            >
              <currentRoleInfo.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-semibold">{currentRoleInfo.label.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 text-left">
                <div className="px-2 py-1.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Phân Quyền Người Dùng</p>
                  <p className="text-[11px] text-slate-400">Chọn vai trò để trải nghiệm giao diện tương ứng</p>
                </div>
                {(['student', 'instructor', 'admin'] as UserRole[]).map((r) => {
                  const roleConfig = roleLabels[r];
                  const Icon = roleConfig.icon;
                  const isSelected = user.role === r;
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        onRoleChange(r);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full flex items-start gap-2.5 px-2 py-2 rounded-lg text-xs transition-colors ${
                        isSelected 
                          ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className="w-4 h-4 mt-0.5 text-indigo-500 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span>{roleConfig.label}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                        </div>
                        <p className="text-[10px] text-slate-400 font-normal">{roleConfig.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => setShowNotifPopover(!showNotifPopover)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              aria-label="Thông báo"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>

            {showNotifPopover && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    Thông Báo & Nhắc Nhở ({unreadCount})
                  </span>
                  <button 
                    onClick={() => notifications.forEach(n => onMarkNotificationRead(n.id))}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Đọc tất cả
                  </button>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => onMarkNotificationRead(n.id)}
                      className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        n.isRead ? 'bg-transparent text-slate-500 dark:text-slate-400' : 'bg-indigo-50/70 dark:bg-indigo-950/40 text-slate-800 dark:text-slate-200 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-slate-900 dark:text-white">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.timeAgo}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối (giảm mỏi mắt)'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User profile avatar */}
          <div className="flex items-center gap-2 pl-1 border-l border-slate-200 dark:border-slate-800">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
            />
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-none">{user.name}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 leading-none">{user.jobTitle}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
