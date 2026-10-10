import React, { useState } from 'react';
import { 
  Play, Pause, CheckCircle, CheckCircle2, ChevronDown, 
  ChevronUp, ArrowLeft, DownloadCloud, FileText, 
  HelpCircle, MessageSquare, Award, Clock, 
  Sparkles, BookOpen, Volume2, Maximize, FastForward,
  CornerDownRight, Send, ThumbsUp
} from 'lucide-react';
import { Course, CourseModule, Lesson } from '../types/lms';

interface CoursePlayerViewProps {
  course: Course;
  initialLessonId?: string;
  onBack: () => void;
  onToggleLessonCompleted: (courseId: string, lessonId: string) => void;
  onToggleDownloadLesson: (courseId: string, lessonId: string) => void;
  onStartQuiz: (course: Course) => void;
  onViewCertificate: () => void;
  isOfflineMode: boolean;
}

export const CoursePlayerView: React.FC<CoursePlayerViewProps> = ({
  course,
  initialLessonId,
  onBack,
  onToggleLessonCompleted,
  onToggleDownloadLesson,
  onStartQuiz,
  onViewCertificate,
  isOfflineMode
}) => {
  // Find initial lesson or default to first lesson
  const allLessons = course.modules.flatMap(m => m.lessons);
  const defaultLesson = allLessons.find(l => l.id === initialLessonId) || allLessons[0];
  const [currentLesson, setCurrentLesson] = useState<Lesson>(defaultLesson);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.modules[0]?.id || '']: true,
    [course.modules[1]?.id || '']: true
  });
  const [activeTab, setActiveTab] = useState<'content' | 'resources' | 'notes' | 'discussion'>('content');
  const [userNote, setUserNote] = useState<string>('Cần áp dụng RICE Score vào sprint refinement tuần tới với team Dev.');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const [commentInput, setCommentInput] = useState<string>('');

  // Course completion calculation
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter(l => l.isCompleted).length;
  const progressPercent = Math.round((completedLessons / (totalLessons || 1)) * 100);
  const isCourseFinished = progressPercent === 100;

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  return (
    <div className="space-y-4 pb-16">
      {/* Top Breadcrumb & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:px-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Quay lại danh sách khóa học"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                {course.code}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{course.category}</span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate max-w-xl">
              {course.title}
            </h1>
          </div>
        </div>

        {/* Right completion indicator & Final Quiz Button */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Tiến độ: {progressPercent}% ({completedLessons}/{totalLessons} bài)
            </span>
            <div className="w-32 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
              <div 
                className={`h-full rounded-full transition-all ${
                  isCourseFinished ? 'bg-emerald-500' : 'bg-indigo-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {course.quiz && (
            <button
              onClick={() => onStartQuiz(course)}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Bài kiểm tra trắc nghiệm</span>
            </button>
          )}

          {isCourseFinished && course.certificateAvailable && (
            <button
              onClick={onViewCertificate}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Chứng chỉ tốt nghiệp</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Runner Layout: Left Player + Right Syllabus Accordion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Player & Interactive Content (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* 1. Media Player Component */}
          <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-800 text-white">
            {currentLesson.type === 'video' ? (
              <div className="relative aspect-video bg-slate-900 flex flex-col justify-between p-4 group">
                {/* Simulated Video Canvas */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-indigo-600/80 group-hover:bg-indigo-600 flex items-center justify-center mx-auto mb-3 cursor-pointer transition-transform group-hover:scale-110 shadow-lg shadow-indigo-600/50" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
                    </div>
                    <p className="text-sm font-bold text-white max-w-md mx-auto line-clamp-1">
                      {currentLesson.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Chất lượng 1080p Full HD • Giảng viên: {course.instructorName}
                    </p>
                  </div>
                </div>

                {/* Top overlay */}
                <div className="relative z-10 flex items-center justify-between text-xs text-slate-300">
                  <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                    {course.code} • Bài {currentLesson.id}
                  </span>
                  {currentLesson.isDownloaded && (
                    <span className="flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                      <DownloadCloud className="w-3 h-3" /> Đã lưu ngoại tuyến ({currentLesson.fileSizeMb || 45} MB)
                    </span>
                  )}
                </div>

                {/* Bottom Controls Bar */}
                <div className="relative z-10 space-y-2 pt-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                  {/* Progress scrubber */}
                  <div className="w-full bg-slate-700/80 h-1.5 rounded-full overflow-hidden cursor-pointer">
                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: isPlaying ? '55%' : '35%' }} />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-indigo-400">
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <Volume2 className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                      <span className="text-[11px] text-slate-400 font-mono">08:42 / {currentLesson.durationMinutes}:00</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setVideoSpeed(s => s === 1 ? 1.25 : s === 1.25 ? 1.5 : s === 1.5 ? 2 : 1)}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 font-bold"
                        title="Tốc độ phát bài giảng"
                      >
                        {videoSpeed}x
                      </button>
                      <Maximize className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            ) : currentLesson.type === 'quiz' ? (
              <div className="p-8 text-center bg-gradient-to-br from-indigo-950 to-slate-900 aspect-video flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{currentLesson.title}</h3>
                <p className="text-xs text-slate-300 max-w-md mb-6 leading-relaxed">
                  Bài kiểm tra trắc nghiệm tổng kết điều kiện tốt nghiệp khóa học. Cần đạt tối thiểu 80% để cấp chứng chỉ xác thực.
                </p>
                <button
                  onClick={() => onStartQuiz(course)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-lg transition-all"
                >
                  Bắt đầu làm bài trắc nghiệm ngay &rarr;
                </button>
              </div>
            ) : (
              <div className="p-8 bg-slate-900 aspect-video flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Tài liệu đọc chuyên sâu</span>
                  <h3 className="text-lg font-bold text-white mt-1">{currentLesson.title}</h3>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                    {currentLesson.textContent || 'Bài đọc phân tích lý thuyết, case study thực tế và các biểu mẫu quy chuẩn doanh nghiệp.'}
                  </p>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Thời gian đọc ước tính: {currentLesson.durationMinutes} phút
                </div>
              </div>
            )}
          </div>

          {/* 2. Lesson Title & Actions Toolbar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Bài học hiện tại
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {currentLesson.title}
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Mark Completed Toggle */}
              <button
                onClick={() => onToggleLessonCompleted(course.id, currentLesson.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  currentLesson.isCompleted
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${currentLesson.isCompleted ? 'text-emerald-500' : 'text-white'}`} />
                <span>{currentLesson.isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}</span>
              </button>

              {/* Download for Offline Toggle */}
              <button
                onClick={() => onToggleDownloadLesson(course.id, currentLesson.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                  currentLesson.isDownloaded
                    ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
                title="Tải bài học để học khi không có kết nối Internet"
              >
                <DownloadCloud className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {currentLesson.isDownloaded ? 'Đã lưu offline' : 'Tải offline'}
                </span>
              </button>
            </div>
          </div>

          {/* 3. Bottom Tabs: Nội dung chi tiết, Tài liệu đính kèm, Ghi chú, Thảo luận */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 gap-6 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('content')}
                className={`py-3 border-b-2 transition-colors ${
                  activeTab === 'content'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Tổng quan & Tóm lược
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`py-3 border-b-2 transition-colors ${
                  activeTab === 'resources'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Tài liệu đính kèm (3)
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`py-3 border-b-2 transition-colors ${
                  activeTab === 'notes'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Ghi chú cá nhân
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                className={`py-3 border-b-2 transition-colors ${
                  activeTab === 'discussion'
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Hỏi đáp bài này
              </button>
            </div>

            <div className="p-5 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5">
                      Trọng tâm kiến thức bài giảng
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {currentLesson.textContent || course.shortSummary}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40">
                    <h5 className="font-bold text-indigo-900 dark:text-indigo-200 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>PO Best Practice từ Giảng viên</span>
                    </h5>
                    <p className="text-[11px] text-indigo-800 dark:text-indigo-300">
                      Khi làm việc với các bên liên quan (Business Stakeholders), Product Owner cần phân định rõ ràng giữa "Nhu cầu kinh doanh (Business Need)" và "Giải pháp kỹ thuật (Technical Solution)". Hãy tập trung mô tả rõ mục tiêu giá trị trước khi chốt chi tiết màn hình giao diện.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-indigo-500" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Slide bài giảng (PDF)</p>
                        <p className="text-[10px] text-slate-400">Dung lượng: 3.4 MB • Cập nhật 2026</p>
                      </div>
                    </div>
                    <button className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-semibold text-[11px]">
                      Tải về
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-indigo-500" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">Template User Story & RICE Matrix (.xlsx)</p>
                        <p className="text-[10px] text-slate-400">File mẫu bảng tính áp dụng cho Sprint</p>
                      </div>
                    </div>
                    <button className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-semibold text-[11px]">
                      Tải về
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-3">
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Ghi chú cá nhân này được tự động lưu vào tài khoản của bạn để ôn tập trước khi thi.
                  </p>
                  <textarea
                    rows={4}
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                    placeholder="Nhập ghi chú quan trọng trong bài học này..."
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 text-xs"
                  />
                  <div className="flex justify-end">
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Đã lưu tự động
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'discussion' && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Đặt câu hỏi thảo luận về bài học này..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                    />
                    <button 
                      onClick={() => setCommentInput('')}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-800 dark:text-slate-200">Lê Hoàng Yến (Senior BA)</span>
                        <span className="text-[10px] text-slate-400">1 ngày trước</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        Bài giảng rất dễ hiểu! Cho mình hỏi thêm là nếu stakeholder liên tục thay đổi tiêu chí nghiệm thu giữa sprint thì nên giải quyết thế nào ạ?
                      </p>
                      <div className="mt-2 pl-3 border-l-2 border-indigo-500 text-[11px] text-indigo-900 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/20 p-2 rounded">
                        <span className="font-bold">{course.instructorName} (Giảng viên):</span> Stakeholder không được tự ý sửa AC khi Sprint đã bắt đầu. Mọi thay đổi phạm vi cần qua trao đổi với PO và có thể phải swap story tương đương nếu Sprint Goal bị ảnh hưởng!
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Syllabus & Course Modules Accordion (4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Đề Cương & Bài Giảng
            </h3>
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>{course.modules.length} chương • {totalLessons} bài học</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400">{progressPercent}% Hoàn thành</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[700px] overflow-y-auto">
            {course.modules.map((module, mIdx) => {
              const isExpanded = !!expandedModules[module.id];
              const modLessonsCount = module.lessons.length;
              const modCompletedCount = module.lessons.filter(l => l.isCompleted).length;

              return (
                <div key={module.id} className="text-xs">
                  {/* Module Accordion Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-3.5 text-left flex items-start justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors font-bold text-slate-800 dark:text-slate-200"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="line-clamp-2 leading-snug">{module.title}</p>
                      <span className="text-[10px] text-slate-400 font-normal mt-0.5 inline-block">
                        {modCompletedCount}/{modLessonsCount} bài hoàn thành
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {/* Lessons List under Module */}
                  {isExpanded && (
                    <div className="bg-slate-50/50 dark:bg-slate-950/40 px-2 py-1 space-y-1">
                      {module.lessons.map((lesson) => {
                        const isCurrent = currentLesson.id === lesson.id;
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => setCurrentLesson(lesson)}
                            className={`p-2.5 rounded-xl cursor-pointer flex items-center justify-between gap-2 transition-all ${
                              isCurrent
                                ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-900 dark:text-indigo-200 font-semibold'
                                : 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleLessonCompleted(course.id, lesson.id);
                                }}
                                className="shrink-0"
                                title={lesson.isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
                              >
                                {lesson.isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                                )}
                              </button>

                              <div className="min-w-0">
                                <p className={`truncate text-xs ${isCurrent ? 'font-bold' : 'font-normal'}`}>
                                  {lesson.title}
                                </p>
                                <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                  {lesson.type === 'video' ? 'Video' : lesson.type === 'quiz' ? 'Trắc nghiệm' : 'Bài đọc'} • {lesson.durationMinutes} phút
                                </span>
                              </div>
                            </div>

                            {lesson.isDownloaded && (
                              <span title="Đã tải offline">
                                <DownloadCloud className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              </span>
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

          {/* Quick Final Test Trigger Card inside Syllabus */}
          {course.quiz && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-amber-50/60 dark:bg-amber-950/20 text-center">
              <p className="text-xs font-bold text-amber-900 dark:text-amber-200">
                Chứng Chỉ Hoàn Thành Khóa Học
              </p>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5 mb-2.5">
                Vượt qua bài trắc nghiệm với điểm số trên {course.quiz.passingScorePercent}% để cấp chứng nhận.
              </p>
              <button
                onClick={() => onStartQuiz(course)}
                className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>Làm bài kiểm tra (Quiz)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
