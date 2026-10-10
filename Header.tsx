import React, { useState } from 'react';
import { 
  Search, Filter, BookOpen, Clock, Users, Star, 
  Award, Shield, CheckCircle2, DownloadCloud, Sparkles,
  ArrowRight, Play, Eye
} from 'lucide-react';
import { Course, CourseCategory, CourseLevel } from '../types/lms';

interface CourseCatalogViewProps {
  courses: Course[];
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenCourse: (courseId: string) => void;
  onEnrollCourse: (courseId: string) => void;
  onViewCourseDetail: (course: Course) => void;
  isOfflineMode: boolean;
}

export const CourseCatalogView: React.FC<CourseCatalogViewProps> = ({
  courses,
  enrolledCourseIds,
  completedCourseIds,
  searchQuery,
  onSearchChange,
  onOpenCourse,
  onEnrollCourse,
  onViewCourseDetail,
  isOfflineMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [selectedLevel, setSelectedLevel] = useState<string>('Tất cả');
  const [filterMandatoryOnly, setFilterMandatoryOnly] = useState<boolean>(false);
  const [filterCertificateOnly, setFilterCertificateOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'duration'>('popular');

  const categories = [
    'Tất cả',
    'Product & Agile',
    'Kỹ thuật & Lập trình',
    'Bảo mật & Tuân thủ',
    'Dữ liệu & AI',
    'Kỹ năng mềm & Lãnh đạo'
  ];

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    // If in offline mode, show courses with at least 1 downloaded lesson
    if (isOfflineMode) {
      const hasDownloaded = course.modules.some(m => m.lessons.some(l => l.isDownloaded));
      if (!hasDownloaded) return false;
    }

    // Category filter
    if (selectedCategory !== 'Tất cả' && course.category !== selectedCategory) {
      return false;
    }

    // Level filter
    if (selectedLevel !== 'Tất cả' && course.level !== selectedLevel) {
      return false;
    }

    // Mandatory filter
    if (filterMandatoryOnly && !course.isMandatory) {
      return false;
    }

    // Certificate filter
    if (filterCertificateOnly && !course.certificateAvailable) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = course.title.toLowerCase().includes(q);
      const matchDesc = course.description.toLowerCase().includes(q);
      const matchCode = course.code.toLowerCase().includes(q);
      const matchInstructor = course.instructorName.toLowerCase().includes(q);
      const matchSkills = course.skillsGained.some(s => s.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCode && !matchInstructor && !matchSkills) {
        return false;
      }
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'duration') return b.totalDurationMinutes - a.totalDurationMinutes;
    return b.enrolledCount - a.enrolledCount;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header Title & Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Kho Khóa Học Doanh Nghiệp (Course Catalog)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Chương trình đào tạo chuẩn hóa nội bộ cho Product Owners, Kỹ sư phần mềm, BAs và Quản lý.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sắp xếp:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="popular">Phổ biến nhất</option>
            <option value="rating">Đánh giá cao nhất</option>
            <option value="duration">Thời lượng dài nhất</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Secondary Filter Bar */}
      <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
            <Filter className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-semibold">Bộ lọc nâng cao:</span>
          </div>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
          >
            <option value="Tất cả">Cấp độ: Tất cả</option>
            <option value="Cơ bản">Cơ bản</option>
            <option value="Trung cấp">Trung cấp</option>
            <option value="Nâng cao">Nâng cao</option>
          </select>

          {/* Toggle Mandatory */}
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={filterMandatoryOnly}
              onChange={(e) => setFilterMandatoryOnly(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Khóa học bắt buộc (ISO & Tuân thủ)</span>
          </label>

          {/* Toggle Certificate */}
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={filterCertificateOnly}
              onChange={(e) => setFilterCertificateOnly(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span>Có cấp chứng chỉ hoàn thành</span>
          </label>
        </div>

        <div className="text-slate-400 font-medium text-[11px]">
          Hiển thị <span className="font-bold text-slate-800 dark:text-slate-200">{filteredCourses.length}</span> khóa học
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">Không tìm thấy khóa học phù hợp</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Thử thay đổi từ khóa tìm kiếm hoặc bỏ bớt các bộ lọc danh mục phía trên.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Tất cả');
              setSelectedLevel('Tất cả');
              setFilterMandatoryOnly(false);
              setFilterCertificateOnly(false);
              onSearchChange('');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);
            const isCompleted = completedCourseIds.includes(course.id);

            // Compute completed lessons percentage
            const totalL = course.modules.reduce((s, m) => s + m.lessons.length, 0);
            const compL = course.modules.reduce((s, m) => s + m.lessons.filter(l => l.isCompleted).length, 0);
            const progressPct = Math.round((compL / (totalL || 1)) * 100);

            return (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail & Badges */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {course.category}
                      </span>
                      {course.isMandatory && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white shadow-sm">
                          Bắt buộc
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200">
                        {course.level}
                      </span>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="font-mono text-[11px] opacity-90">{course.code}</span>
                      <span className="flex items-center gap-1 font-bold text-amber-300">
                        <Star className="w-3.5 h-3.5 fill-amber-300" />
                        {course.rating} ({course.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {course.shortSummary}
                    </p>

                    {/* Skills Pills */}
                    <div className="flex flex-wrap gap-1">
                      {course.skillsGained.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                      {course.skillsGained.length > 3 && (
                        <span className="text-[10px] text-slate-400 self-center">
                          +{course.skillsGained.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Instructor Info */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                      <img
                        src={course.instructorAvatar}
                        alt={course.instructorName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div className="text-[11px] leading-tight truncate">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{course.instructorName}</p>
                        <p className="text-slate-400 text-[10px] truncate">{course.instructorTitle}</p>
                      </div>
                    </div>

                    {/* Progress Bar if Enrolled */}
                    {isEnrolled && (
                      <div className="pt-1">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                          <span>Tiến độ: {progressPct}%</span>
                          <span>{compL}/{totalL} bài</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              isCompleted ? 'bg-emerald-500' : 'bg-indigo-600'
                            }`}
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{course.totalDurationMinutes} phút</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewCourseDetail(course)}
                      className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs transition-colors"
                      title="Xem đề cương & đánh giá"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    {isEnrolled ? (
                      <button
                        onClick={() => onOpenCourse(course.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm shadow-indigo-600/20 transition-all"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>{isCompleted ? 'Học lại' : 'Tiếp tục'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onEnrollCourse(course.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white font-semibold text-xs transition-colors"
                      >
                        Đăng ký học
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
