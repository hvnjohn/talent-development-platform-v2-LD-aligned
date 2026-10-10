import React from 'react';
import { 
  LayoutDashboard, BookOpen, Sparkles, Trophy, 
  MessageSquare, FileText, Award, BarChart3, 
  HelpCircle, Lightbulb, DownloadCloud, ShieldAlert,
  Zap, CalendarCheck
} from 'lucide-react';
import { UserRole } from '../types/lms';

interface SidebarProps {
  currentView: string;
  onNavigate: (viewId: string) => void;
  role: UserRole;
  downloadedCount: number;
  onOpenOfflineManager: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  role,
  downloadedCount,
  onOpenOfflineManager
}) => {
  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard Học Viên', icon: LayoutDashboard, badge: '' },
    { id: 'courses', label: 'Danh Sách Khóa Học', icon: BookOpen, badge: '5 khóa' },
    { id: 'ai-path', label: 'Lộ Trình AI Cá Nhân', icon: Sparkles, badge: 'AI Gen' },
    { id: 'daily-quiz', label: 'Đố Vui Hằng Ngày', icon: Zap, badge: '+50 XP' },
    { id: 'gamification', label: 'Bảng Xếp Hạng & Huy Hiệu', icon: Trophy, badge: 'Top 4' },
    { id: 'forum', label: 'Diễn Đàn Thảo Luận', icon: MessageSquare, badge: 'Hỏi đáp' },
    { id: 'resources', label: 'Kho Tài Liệu & Ebook', icon: FileText, badge: 'Tài liệu' },
    { id: 'certificates', label: 'Chứng Chỉ Đã Cấp', icon: Award, badge: 'Verified' },
    { id: 'reports', label: 'Báo Cáo & Xuất PDF', icon: BarChart3, badge: 'PO / HR' },
    { id: 'it-po-specs', label: 'Gợi Ý Tính Năng Cho PO', icon: Lightbulb, badge: 'Roadmap' },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between py-4 px-3 h-[calc(100vh-4rem)] sticky top-16 transition-colors overflow-y-auto">
      <div className="space-y-6">
        {/* Navigation Group */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Khám Phá Học Tập
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
              v2.4 PO
            </span>
          </div>

          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/20' 
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : item.badge === 'AI Gen'
                          ? 'bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                          : item.badge === '+50 XP'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* PO Quick Tip Widget */}
        <div className="px-3 py-3 rounded-xl bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-blue-50/60 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/50">
          <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-bold text-xs mb-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>IT PO Note</span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
            Hệ thống hỗ trợ chuẩn SCORM/xAPI, SSO SAML, và xuất dữ liệu báo cáo định kỳ cho ban lãnh đạo.
          </p>
          <button 
            onClick={() => onNavigate('it-po-specs')}
            className="mt-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Xem kiến trúc & specs</span> &rarr;
          </button>
        </div>
      </div>

      {/* Bottom Offline Box */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={onOpenOfflineManager}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all text-left"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <DownloadCloud className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Học Ngoại Tuyến</p>
              <p className="text-[10px] text-slate-400">{downloadedCount} bài học đã lưu</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            Sẵn sàng
          </span>
        </button>
      </div>
    </aside>
  );
};
