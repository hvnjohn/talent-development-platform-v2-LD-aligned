import React, { useState } from 'react';
import { 
  X, Sparkles, Flame, CheckCircle2, XCircle, 
  HelpCircle, Award, ArrowRight, Calendar
} from 'lucide-react';
import { DailyQuizQuestion } from '../types/lms';

interface DailyQuizModalProps {
  quizData: DailyQuizQuestion;
  onClose: () => void;
  onAnswerCorrect: (xpEarned: number) => void;
  streakDays: number;
}

export const DailyQuizModal: React.FC<DailyQuizModalProps> = ({
  quizData,
  onClose,
  onAnswerCorrect,
  streakDays
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const isCorrect = selectedOption === quizData.correctAnswer;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === quizData.correctAnswer) {
      onAnswerCorrect(quizData.xpReward);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:px-6 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm">Đố Vui Kiến Thức Hôm Nay</span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full">
                  +{quizData.xpReward} XP
                </span>
              </div>
              <p className="text-[11px] text-violet-200 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3 h-3" /> Chủ đề: {quizData.topic}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Question Text */}
          <div>
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">
              Câu hỏi nhanh (Daily Brain Workout)
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-relaxed">
              {quizData.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {quizData.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isOptionCorrect = idx === quizData.correctAnswer;

              let btnStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60';
              if (isAnswered) {
                if (isOptionCorrect) {
                  btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-900 dark:text-red-200 font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`w-full p-3.5 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswered && isOptionCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isOptionCorrect && (
                    <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Result & Explanation */}
          {isAnswered && (
            <div className={`p-4 rounded-2xl border text-xs space-y-2 animate-in fade-in duration-200 ${
              isCorrect 
                ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60'
                : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-800 dark:text-emerald-300">
                      Chính xác! Bạn được cộng +{quizData.xpReward} XP
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-red-800 dark:text-red-300">
                      Chưa chính xác! Xem giải thích bên dưới
                    </span>
                  </>
                )}
              </div>

              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                <strong>Giải thích:</strong> {quizData.explanation}
              </p>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold">
                  <Flame className="w-3.5 h-3.5 fill-orange-500" />
                  Chuỗi học tập đã tăng lên: {streakDays + 1} ngày!
                </span>
                <button
                  onClick={onClose}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs"
                >
                  Xong
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
