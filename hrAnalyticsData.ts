import React from 'react';
import { 
  X, DownloadCloud, Trash2, HardDrive, Wifi, 
  WifiOff, CheckCircle2, AlertCircle, Play
} from 'lucide-react';
import { Course } from '../types/lms';

interface OfflineManagerModalProps {
  courses: Course[];
  onClose: () => void;
  onOpenLesson: (courseId: string, lessonId: string) => void;
  onRemoveDownload: (courseId: string, lessonId: string) => void;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
}

export const OfflineManagerModal: React.FC<OfflineManagerModalProps> = ({
  courses,
  onClose,
  onOpenLesson,
  onRemoveDownload,
  isOfflineMode,
  onToggleOfflineMode
}) => {
  // Collect all downloaded lessons
  const downloadedItems: { course: Course; lesson: any }[] = [];
  courses.forEach(c => {
    c.modules.forEach(m => {
      m.lessons.forEach(l => {
        if (l.isDownloaded) {
          downloadedItems.push({ course: c, lesson: l });
        }
      });
    });
  });

  const totalSizeMb = downloadedItems.reduce((acc, item) => acc + (item.lesson.fileSizeMb || 35), 0);
  const maxStorageMb = 2048; // 2GB
  const usedPercent = Math.min(100, Math.round((totalSizeMb / maxStorageMb) * 100));

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:px-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <DownloadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Quản Lý Học Ngoại Tuyến (Offline Learning Mode)
              </h3>
              <p className="text-[11px] text-slate-400">
                Lưu bài giảng vào bộ nhớ thiết bị để học khi đi công tác hoặc mất mạng
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Offline Mode Simulator Toggle */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {isOfflineMode ? (
                <WifiOff className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
              ) : (
                <Wifi className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
              )}
              <div>
                <p className="font-bold text-xs text-slate-900 dark:text-white">
                  Giả Lập Chế Độ Ngoại Tuyến (Offline Simulator)
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isOfflineMode 
                    ? 'Đang bật: Hệ thống chỉ cho phép mở các bài giảng đã tải về máy'
                    : 'Đang tắt: Ứng dụng chạy trực tuyến bình thường'}
                </p>
              </div>
            </div>

            <button
              onClick={onToggleOfflineMode}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors shrink-0 ${
                isOfflineMode 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300'
              }`}
            >
              {isOfflineMode ? 'Bật Offline' : 'Tắt Offline'}
            </button>
          </div>

          {/* Storage Meter */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-indigo-500" />
                <span>Dung lượng đã sử dụng:</span>
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {totalSizeMb} MB / {maxStorageMb} MB ({usedPercent}%)
              </span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all" 
                style={{ width: `${usedPercent}%` }} 
              />
            </div>
          </div>

          {/* Downloaded Lessons List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-900 dark:text-white">
                Danh Sách Bài Học Đã Lưu ({downloadedItems.length})
              </span>
              <span className="text-[11px] text-slate-400">Sẵn sàng phát không cần mạng</span>
            </div>

            {downloadedItems.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                Chưa có bài học nào được tải về máy. Hãy bấm nút "Tải offline" trong trình phát bài giảng.
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto">
                {downloadedItems.map(({ course, lesson }) => (
                  <div
                    key={`${course.id}-${lesson.id}`}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white truncate">
                        {lesson.title}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {course.title} • {lesson.fileSizeMb || 45} MB
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onOpenLesson(course.id, lesson.id);
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[11px] flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Mở học</span>
                      </button>

                      <button
                        onClick={() => onRemoveDownload(course.id, lesson.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                        title="Xóa bản tải về"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold text-xs"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
