import React, { useState, useEffect } from 'react';
import { 
  X, Clock, Award, CheckCircle2, XCircle, 
  AlertCircle, ArrowRight, ArrowLeft, RotateCcw, 
  HelpCircle, Sparkles
} from 'lucide-react';
import { Course, CourseQuiz, QuizQuestion } from '../types/lms';

interface QuizModalProps {
  course: Course;
  onClose: () => void;
  onPassQuiz: (courseId: string, scorePercent: number) => void;
  onViewCertificate: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  course,
  onClose,
  onPassQuiz,
  onViewCertificate
}) => {
  const quiz = course.quiz;
  if (!quiz) return null;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(quiz.durationMinutes * 60);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: optionIndex }));
  };

  // Submit test
  const totalQuestions = quiz.questions.length;
  const correctCount = quiz.questions.filter((q, idx) => selectedAnswers[idx] === q.correctAnswer).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = scorePercent >= quiz.passingScorePercent;

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (isPassed) {
      onPassQuiz(course.id, scorePercent);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setTimeLeftSeconds(quiz.durationMinutes * 60);
  };

  const currentQ: QuizQuestion = quiz.questions[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/40">
          <div>
            <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400">
              {course.code}
            </span>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
              {quiz.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-mono font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeftSeconds)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Result View if Submitted */}
          {isSubmitted ? (
            <div className="space-y-6 text-center py-4">
              <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg ${
                isPassed 
                  ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-emerald-500/30' 
                  : 'bg-gradient-to-tr from-red-500 to-rose-400 text-white shadow-red-500/30'
              }`}>
                {isPassed ? <Award className="w-10 h-10" /> : <RotateCcw className="w-10 h-10" />}
              </div>

              <div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  isPassed ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                }`}>
                  {isPassed ? 'ĐẠT YÊU CẦU - HOÀN THÀNH XUẤT SẮC' : 'CHƯA ĐẠT ĐIỂM CHUẨN'}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                  Kết quả: {scorePercent}% ({correctCount}/{totalQuestions} câu đúng)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  {isPassed 
                    ? `Chúc mừng bạn đã hoàn thành chuẩn năng lực khóa học. Điểm đạt tối thiểu là ${quiz.passingScorePercent}%. Hệ thống đã kích hoạt chứng chỉ điện tử chính thức.`
                    : `Điểm đạt chuẩn là ${quiz.passingScorePercent}%. Hãy xem lại giải thích chi tiết bên dưới và thử sức làm lại bài trắc nghiệm.`
                  }
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                {isPassed ? (
                  <>
                    <button
                      onClick={onViewCertificate}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4" />
                      <span>Xem & In Chứng Chỉ Tốt Nghiệp</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200"
                    >
                      Đóng
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleRetake}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Làm lại bài kiểm tra</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs"
                    >
                      Ôn lại bài học
                    </button>
                  </>
                )}
              </div>

              {/* Detailed Review Section */}
              <div className="text-left pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  Xem lại chi tiết đáp án & giải thích chuyên sâu:
                </h4>
                {quiz.questions.map((q, idx) => {
                  const isCorrect = selectedAnswers[idx] === q.correctAnswer;
                  return (
                    <div 
                      key={q.id}
                      className={`p-4 rounded-xl border text-xs space-y-2 ${
                        isCorrect 
                          ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60' 
                          : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800/60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          Câu {idx + 1}: {q.question}
                        </span>
                        {isCorrect ? (
                          <span className="flex items-center gap-1 font-bold text-emerald-600 shrink-0">
                            <CheckCircle2 className="w-4 h-4" /> Đúng (+20%)
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 font-bold text-red-600 shrink-0">
                            <XCircle className="w-4 h-4" /> Sai
                          </span>
                        )}
                      </div>

                      <div className="text-slate-600 dark:text-slate-400 space-y-1">
                        <p>
                          Đáp án bạn chọn:{' '}
                          <span className={isCorrect ? 'font-bold text-emerald-700 dark:text-emerald-400' : 'font-bold text-red-600'}>
                            {selectedAnswers[idx] !== undefined ? q.options[selectedAnswers[idx]] : 'Chưa chọn'}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="font-bold text-emerald-700 dark:text-emerald-400">
                            Đáp án đúng: {q.options[q.correctAnswer]}
                          </p>
                        )}
                      </div>

                      <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">Giải thích từ giảng viên: </span>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Ongoing Quiz Question View */
            <div className="space-y-6">
              {/* Question Navigation Bubbles */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Câu hỏi {currentIndex + 1} / {totalQuestions}
                </span>

                <div className="flex items-center gap-1.5">
                  {quiz.questions.map((_, idx) => {
                    const isAnswered = selectedAnswers[idx] !== undefined;
                    const isCurrent = idx === currentIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-indigo-600 text-white ring-2 ring-indigo-500/40'
                            : isAnswered
                              ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Question & Options */}
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-relaxed">
                  {currentQ.question}
                </h3>

                <div className="space-y-2.5">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(currentIndex, optIdx)}
                        className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 border ${
                          isSelected
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-600 text-indigo-900 dark:text-indigo-200 font-bold shadow-sm'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!isSubmitted && (
          <div className="p-4 sm:px-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/40">
            <button
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold hover:bg-white dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Câu trước</span>
            </button>

            <div className="flex items-center gap-2">
              {currentIndex < totalQuestions - 1 ? (
                <button
                  onClick={() => setCurrentIndex(i => Math.min(totalQuestions - 1, i + 1))}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white flex items-center gap-1.5"
                >
                  <span>Câu tiếp theo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white text-xs font-extrabold shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>Nộp bài & Chấm điểm</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
