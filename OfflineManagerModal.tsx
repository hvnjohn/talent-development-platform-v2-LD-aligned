import React, { useState } from 'react';
import { 
  X, Printer, Share2, Copy, Check, 
  Award, ShieldCheck, QrCode, Sparkles, ExternalLink
} from 'lucide-react';
import { Certificate } from '../types/lms';

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(certificate.verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Top Action Bar (No Print) */}
        <div className="no-print p-4 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
              Chứng Chỉ Điện Tử Đã Xác Thực (Verified Certificate)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-indigo-600/20 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In / Tải PDF</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã sao chép link' : 'Sao chép link'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="p-4 sm:p-8 overflow-y-auto flex justify-center bg-slate-100/60 dark:bg-slate-950/60">
          <div 
            id="certificate-print-area"
            className="w-full max-w-3xl bg-[#faf8f5] text-slate-900 p-8 sm:p-12 rounded-2xl shadow-xl border-8 border-double border-amber-600/60 relative overflow-hidden text-center"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.05) 0%, transparent 70%)'
            }}
          >
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600" />
            <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600" />
            <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600" />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600" />

            {/* Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-600/30 text-amber-900 font-extrabold text-[11px] tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>EDUCORE LEARNING & DEVELOPMENT ACADEMY</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-wider text-slate-900 uppercase">
              CHỨNG NHẬN HOÀN THÀNH
            </h2>
            <p className="text-xs font-serif italic text-amber-900/80 tracking-widest mt-1 uppercase">
              CERTIFICATE OF COMPLETION & COMPETENCY MASTERY
            </p>

            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto my-6" />

            <p className="text-xs text-slate-600 font-sans tracking-wide">
              Chứng chỉ này được trân trọng trao tặng cho học viên:
            </p>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 my-2 font-serif underline decoration-amber-500/50 decoration-2 underline-offset-8">
              {certificate.studentName}
            </h3>
            <p className="text-xs font-mono font-semibold text-slate-500">
              Mã nhân sự: {certificate.studentId}
            </p>

            <p className="text-xs text-slate-600 font-sans tracking-wide mt-6 max-w-lg mx-auto leading-relaxed">
              Vì đã hoàn thành xuất sắc toàn bộ bài giảng và vượt qua kỳ sát hạch đánh giá năng lực tiêu chuẩn nội bộ của khóa học:
            </p>

            <h4 className="text-lg sm:text-xl font-bold text-slate-900 my-2 font-sans">
              "{certificate.courseTitle}"
            </h4>
            <p className="text-xs font-mono text-indigo-700 font-bold">
              Mã khóa học: {certificate.courseCode} • Điểm sát hạch: {certificate.scorePercent}%
            </p>

            {/* Bottom Signatures & Seal Section */}
            <div className="mt-12 pt-6 border-t border-amber-600/20 grid grid-cols-3 items-end text-center">
              {/* Left Sign: Instructor */}
              <div>
                <div className="font-serif italic text-base text-slate-800 mb-1">
                  {certificate.instructorName}
                </div>
                <div className="w-28 h-px bg-slate-400 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800 uppercase">Giảng Viên Chuyên Môn</p>
                <p className="text-[10px] text-slate-500 font-mono">Lead Instructor</p>
              </div>

              {/* Middle: Luxury Gold Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-1 shadow-lg shadow-amber-500/30 flex items-center justify-center text-slate-950 relative">
                  <div className="w-full h-full rounded-full border border-dashed border-amber-900 flex flex-col items-center justify-center text-center p-1">
                    <ShieldCheck className="w-6 h-6 text-slate-950" />
                    <span className="text-[8px] font-black tracking-tighter uppercase leading-none mt-0.5">
                      VERIFIED
                    </span>
                    <span className="text-[7px] font-bold text-amber-950">2026 SEAL</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 mt-2">
                  Ngày cấp: {certificate.completionDate}
                </span>
              </div>

              {/* Right Sign: Director */}
              <div>
                <div className="font-serif italic text-base text-slate-800 mb-1">
                  {certificate.directorName}
                </div>
                <div className="w-28 h-px bg-slate-400 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800 uppercase">Giám Đốc Đào Tạo L&D</p>
                <p className="text-[10px] text-slate-500 font-mono">Head of Academy</p>
              </div>
            </div>

            {/* Footer Verification Code */}
            <div className="mt-8 pt-4 border-t border-amber-600/10 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 gap-2">
              <span className="font-mono">
                Số hiệu chứng chỉ: <strong className="text-slate-800">{certificate.certificateCode}</strong>
              </span>
              <span className="flex items-center gap-1 text-indigo-700 font-medium">
                <ExternalLink className="w-3 h-3" /> Tra cứu xác thực tại: educore.company.internal/verify
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
