import React, { useState } from 'react';
import { 
  X, Star, Clock, Users, BookOpen, Award, 
  CheckCircle2, ThumbsUp, Send, Play
} from 'lucide-react';
import { Course, CourseReview } from '../types/lms';

interface CourseDetailModalProps {
  course: Course;
  onClose: () => void;
  onStartCourse: (courseId: string) => void;
  onAddReview: (courseId: string, rating: number, comment: string) => void;
  isEnrolled: boolean;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onStartCourse,
  onAddReview,
  isEnrolled
}) => {
  const [activeTab, setActiveTab] = useState<'syllabus' | 'reviews'>('syllabus');
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [hoverRating, setHoverRating] = useState<number>(0);

  const reviews = course.reviews || [];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddReview(course.id, newRating, newComment.trim());
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header with image */}
        <div className="relative h-44 sm:h-52 overflow-hidden shrink-0">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 uppercase">
              {course.category}
            </span>
            <h2 className="text-base sm:text-lg font-extrabold mt-1 leading-snug">
              {course.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1 font-bold text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-300" /> {course.rating} ({course.reviewCount} đánh giá)
              </span>
              <span>•</span>
              <span>{course.totalDurationMinutes} phút</span>
              <span>•</span>
              <span>{course.level}</span>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'syllabus'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Đề cương khóa học & Kỹ năng
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 border-b-2 transition-all ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            Đánh giá từ đồng nghiệp ({reviews.length})
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          {activeTab === 'syllabus' ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">
                  Mô tả khóa học
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  {course.description}
                </p>
              </div>

              {/* Skills Gained */}
              <div>
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white mb-2">
                  Kỹ năng đạt được sau khóa học
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {course.skillsGained.map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modules breakdown */}
              <div>
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white mb-2">
                  Nội dung chi tiết từng chương
                </h4>
                <div className="space-y-2">
                  {course.modules.map((m, idx) => (
                    <div key={m.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <p className="font-bold text-slate-900 dark:text-white">{m.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{m.lessons.length} bài học</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Write Review Form */}
              <form onSubmit={handleSubmitReview} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                  Viết đánh giá của bạn về khóa học này
                </h4>

                {/* Stars selector */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-amber-400 focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          (hoverRating || newRating) >= star ? 'fill-amber-400' : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">
                    {newRating} / 5 sao
                  </span>
                </div>

                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Chia sẻ cảm nhận về tính thực tiễn, chất lượng bài giảng..."
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-indigo-500"
                />

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Gửi đánh giá</span>
                  </button>
                </div>
              </form>

              {/* Reviews List */}
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={rev.userAvatar}
                          alt={rev.userName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{rev.userName}</p>
                          <p className="text-[10px] text-slate-400">{rev.userTitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{rev.rating}.0</span>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-xs">
                      {rev.comment}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>{rev.date}</span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" /> {rev.likes} đồng tình
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs"
          >
            Đóng
          </button>

          <button
            onClick={() => {
              onStartCourse(course.id);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>{isEnrolled ? 'Vào học ngay' : 'Đăng ký & Bắt đầu học'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
