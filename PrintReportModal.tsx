import React, { useState } from 'react';
import { 
  X, Printer, Download, BarChart3, CheckCircle2, 
  AlertCircle, Users, Clock, Award, Send, 
  Calendar, Building, FileSpreadsheet
} from 'lucide-react';

interface ReportExportModalProps {
  onClose: () => void;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({ onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Tháng 10/2026');
  const [remindedList, setRemindedList] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<string>('');

  const handlePrint = () => {
    window.print();
  };

  const handleSendReminder = (name: string) => {
    setRemindedList(prev => [...prev, name]);
    setShowToast(`Đã gửi thông báo đẩy & email nhắc nhở tiến độ tới ${name}`);
    setTimeout(() => setShowToast(''), 3000);
  };

  const handleSendAllReminders = () => {
    setRemindedList(['Lê Văn Nam', 'Đỗ Quang Hưng', 'Nguyễn Thị Hoa']);
    setShowToast('Đã gửi thông báo nhắc nhở tự động cho toàn bộ nhân sự chưa hoàn thành');
    setTimeout(() => setShowToast(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header (No Print) */}
        <div className="no-print p-4 sm:px-6 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Báo Cáo Đào Tạo & Tiến Độ Định Kỳ (L&D Executive Report)
              </h3>
              <p className="text-[11px] text-slate-400">
                Xuất file PDF chuẩn báo cáo định kỳ cho IT PO, Ban Giám Đốc và Bộ phận Nhân sự L&D
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In / Lưu PDF (A4)</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter bar (No Print) */}
        <div className="no-print px-6 py-2.5 bg-slate-100/60 dark:bg-slate-800/20 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-600 dark:text-slate-400">Kỳ báo cáo:</span>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="Tháng 10/2026">Tháng 10/2026 (Hiện tại)</option>
              <option value="Quý 3/2026">Quý 3/2026</option>
              <option value="Cả năm 2026">Tổng kết năm 2026</option>
            </select>
          </div>

          {showToast && (
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
              ✓ {showToast}
            </span>
          )}
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-white text-slate-900" id="report-print-content">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
            <div>
              <p className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                TẬP ĐOÀN CÔNG NGHỆ & DỊCH VỤ SỐ • PHÒNG L&D VÀ PHÁT TRIỂN SẢN PHẨM
              </p>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 uppercase tracking-tight">
                BÁO CÁO TIẾN ĐỘ ĐÀO TẠO & HOÀN THÀNH KHÓA HỌC
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Kỳ đánh giá: <strong>{selectedPeriod}</strong> • Ngày lập báo cáo: <strong>09/10/2026</strong> • Người lập: <strong>IT Product Owner</strong>
              </p>
            </div>

            <div className="text-right text-xs">
              <span className="px-2.5 py-1 rounded bg-slate-100 font-mono font-bold text-slate-800">
                LMS-REP-2026-Q4
              </span>
              <p className="text-[10px] text-slate-400 mt-1">Lưu hành nội bộ doanh nghiệp</p>
            </div>
          </div>

          {/* 1. Executive Summary KPI Grid */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              1. Chỉ số đào tạo trọng yếu (Executive Training KPIs)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[11px] text-slate-500 font-medium block">Tổng lượt đăng ký học</span>
                <p className="text-2xl font-black text-slate-900 mt-0.5">1,568</p>
                <span className="text-[10px] text-emerald-600 font-bold">+18% so với quý trước</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[11px] text-slate-500 font-medium block">Tỷ lệ hoàn thành đúng hạn</span>
                <p className="text-2xl font-black text-indigo-700 mt-0.5">86.4%</p>
                <span className="text-[10px] text-indigo-600 font-bold">Vượt mục tiêu 85%</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[11px] text-slate-500 font-medium block">Giờ học bình quân / nhân sự</span>
                <p className="text-2xl font-black text-slate-900 mt-0.5">18.2 giờ</p>
                <span className="text-[10px] text-slate-500">Kế hoạch: 16.0 giờ</span>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-[11px] text-slate-500 font-medium block">Tỷ lệ đỗ trắc nghiệm lần 1</span>
                <p className="text-2xl font-black text-emerald-700 mt-0.5">91.8%</p>
                <span className="text-[10px] text-emerald-600 font-bold">Điểm TB: 88.5%</span>
              </div>
            </div>
          </div>

          {/* 2. Department Breakdown Table */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              2. Tiến độ hoàn thành theo từng khối / phòng ban
            </h2>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Khối / Phòng ban</th>
                    <th className="p-3">Nhân sự</th>
                    <th className="p-3">Khóa bắt buộc (ISO)</th>
                    <th className="p-3">Tiến độ chung</th>
                    <th className="p-3">Đánh giá</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-bold">Product & Engineering</td>
                    <td className="p-3">48 người</td>
                    <td className="p-3 text-emerald-600 font-bold">100% hoàn thành</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full" style={{ width: '94%' }} />
                        </div>
                        <span className="font-bold">94%</span>
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-emerald-600">Xuất sắc</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">Data Analytics & AI</td>
                    <td className="p-3">24 người</td>
                    <td className="p-3 text-emerald-600 font-bold">100% hoàn thành</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full" style={{ width: '91%' }} />
                        </div>
                        <span className="font-bold">91%</span>
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-emerald-600">Tốt</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">QA & An Toàn Thông Tin</td>
                    <td className="p-3">30 người</td>
                    <td className="p-3 text-emerald-600 font-bold">98% hoàn thành</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-indigo-600 h-full" style={{ width: '87%' }} />
                        </div>
                        <span className="font-bold">87%</span>
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-indigo-600">Đạt yêu cầu</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold">Vận Hành & Kinh Doanh</td>
                    <td className="p-3">55 người</td>
                    <td className="p-3 text-amber-600 font-bold">78% hoàn thành</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-amber-500 h-full" style={{ width: '74%' }} />
                        </div>
                        <span className="font-bold">74%</span>
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-amber-600">Cần đốc thúc</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Action Required: Overdue Learners & Daily Reminder */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                3. Danh sách nhân sự chậm tiến độ & Cơ chế nhắc nhở hằng ngày
              </h2>
              <button
                onClick={handleSendAllReminders}
                className="no-print text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>Gửi thông báo nhắc nhở toàn bộ</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Học viên</th>
                    <th className="p-3">Phòng ban</th>
                    <th className="p-3">Khóa học vướng</th>
                    <th className="p-3">Tiến độ</th>
                    <th className="p-3 no-print">Thao tác nhắc nhở</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Lê Văn Nam', dept: 'Operations', course: 'An Toàn Thông Tin ISO 27001', pct: 20 },
                    { name: 'Đỗ Quang Hưng', dept: 'Operations', course: 'An Toàn Thông Tin ISO 27001', pct: 40 },
                    { name: 'Nguyễn Thị Hoa', dept: 'Customer Support', course: 'Nghị Định 13 Bảo Vệ Dữ Liệu', pct: 15 }
                  ].map((emp) => {
                    const isReminded = remindedList.includes(emp.name);
                    return (
                      <tr key={emp.name}>
                        <td className="p-3 font-bold">{emp.name}</td>
                        <td className="p-3 text-slate-500">{emp.dept}</td>
                        <td className="p-3 text-red-600 font-medium">{emp.course}</td>
                        <td className="p-3 font-bold">{emp.pct}%</td>
                        <td className="p-3 no-print">
                          <button
                            onClick={() => handleSendReminder(emp.name)}
                            disabled={isReminded}
                            className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                              isReminded 
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                            }`}
                          >
                            {isReminded ? '✓ Đã gửi nhắc' : 'Gửi nhắc nhở'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t border-slate-300 grid grid-cols-2 text-center text-xs">
            <div>
              <p className="font-bold text-slate-800 uppercase">Người lập báo cáo (IT PO)</p>
              <div className="h-16 flex items-center justify-center font-serif italic text-slate-600">
                Trần Minh Khang
              </div>
              <p className="text-[10px] text-slate-400">IT Product Owner</p>
            </div>

            <div>
              <p className="font-bold text-slate-800 uppercase">Phê duyệt (Giám đốc L&D)</p>
              <div className="h-16 flex items-center justify-center font-serif italic text-slate-600">
                Lê Hoàng Nam
              </div>
              <p className="text-[10px] text-slate-400">Head of People & Academy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
