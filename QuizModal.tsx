import React from 'react';
import { 
  Award, ShieldCheck, Printer, CheckCircle2, 
  ExternalLink, Calendar, BookOpen, ArrowRight
} from 'lucide-react';
import { Certificate, Course } from '../types/lms';

interface MyCertificatesViewProps {
  certificates: Certificate[];
  courses: Course[];
  onOpenCertificateModal: (cert: Certificate) => void;
  onOpenCourse: (courseId: string) => void;
}

export const MyCertificatesView: React.FC<MyCertificatesViewProps> = ({
  certificates,
  courses,
  onOpenCertificateModal,
  onOpenCourse
}) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Hồ Sơ Năng Lực & Chứng Chỉ Đã Cấp</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Chứng Chỉ Hoàn Thành Khóa Học (Verified Certificates)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Tất cả chứng chỉ được cấp sau khi bạn hoàn thành toàn bộ bài giảng và vượt qua kỳ sát hạch trắc nghiệm nội bộ đạt chuẩn.
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/30 dark:border-amber-500/20 p-6 shadow-md shadow-amber-500/5 relative overflow-hidden flex flex-col justify-between space-y-5"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/10 to-transparent pointer-events-none rounded-bl-full" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                  {cert.certificateCode}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" /> Đã xác thực 100%
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-snug">
                {cert.courseTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Học viên: <strong className="text-slate-800 dark:text-slate-200">{cert.studentName}</strong> • Điểm sát hạch: <strong className="text-emerald-600">{cert.scorePercent}%</strong>
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Ngày cấp: {cert.completionDate}</span>
                <span>Ký duyệt: {cert.instructorName}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => onOpenCertificateModal(cert)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Award className="w-4 h-4" />
                <span>Xem & In Chứng Chỉ PDF</span>
              </button>
            </div>
          </div>
        ))}

        {/* Locked Certificate Opportunities */}
        {courses.filter(c => !certificates.some(cert => cert.courseTitle === c.title)).map((lockedCourse) => (
          <div
            key={lockedCourse.id}
            className="bg-slate-50/70 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4 opacity-75 hover:opacity-100 transition-opacity"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {lockedCourse.code}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Chưa mở khóa
                </span>
              </div>

              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">
                {lockedCourse.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Điều kiện nhận chứng nhận: Hoàn thành bài giảng và đạt tối thiểu 80% trong bài kiểm tra trắc nghiệm cuối khóa.
              </p>
            </div>

            <button
              onClick={() => onOpenCourse(lockedCourse.id)}
              className="py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Vào học để lấy chứng chỉ</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
