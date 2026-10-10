import React, { useState } from 'react';
import { 
  Lightbulb, Code2, Database, ListChecks, CheckCircle2, 
  ArrowRight, Shield, Layers, FileCode, Sparkles, 
  GitBranch, Users, Bot, Zap, Clock
} from 'lucide-react';

export const ITPOSpecsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'erd' | 'userstories' | 'kpis'>('roadmap');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-xs mb-2">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Tài Liệu Chuyên Sâu Cho IT Product Owner</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Gợi Ý Tính Năng, Kiến Trúc & Roadmap Dành Riêng Cho IT PO
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Tài liệu đặc tả nghiệp vụ, kiến trúc dữ liệu và chiến lược phân kỳ tính năng (Release Planning) cho hệ thống LMS nội bộ doanh nghiệp.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            activeTab === 'roadmap'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          1. Phân Kỳ Tính Năng (Roadmap MVP & Phase 2)
        </button>
        <button
          onClick={() => setActiveTab('erd')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            activeTab === 'erd'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          2. Thiết Kế Cơ Sở Dữ Liệu (ERD Schema)
        </button>
        <button
          onClick={() => setActiveTab('userstories')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            activeTab === 'userstories'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          3. Mẫu User Stories & Acceptance Criteria
        </button>
        <button
          onClick={() => setActiveTab('kpis')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            activeTab === 'kpis'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          4. Chỉ Số Đo Lường Thành Công (LMS KPIs)
        </button>
      </div>

      {/* Tab 1: Roadmap */}
      {activeTab === 'roadmap' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Sprint 1 - 4
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Phase 1: Core MVP Nội Bộ</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Có trong Prototype
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Dashboard học viên:</strong> Tổng quan tiến độ, khóa đang học, tiếp tục bài giảng.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Danh sách khóa học:</strong> Phân loại theo category, level, tìm kiếm từ khóa.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Trình phát bài giảng:</strong> Video/Article, đánh dấu hoàn thành, tài liệu đính kèm.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Quiz trắc nghiệm:</strong> Giới hạn thời gian, tính điểm tự động, giải thích đáp án.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Cấp chứng chỉ:</strong> Mã xác thực duy nhất, xem trước chứng chỉ vàng, in PDF.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Phân quyền người dùng:</strong> Học viên (Student), Giảng viên, Quản trị viên HR.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Sprint 5 - 8
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Phase 2: Gamification & AI</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-bold">
                Có trong Prototype
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Chuỗi ngày học (Daily Streak):</strong> Tăng động lực học mỗi ngày, giảm tỷ lệ bỏ dở.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Bảng xếp hạng (Leaderboard):</strong> Vinh danh top học viên theo tháng và khối phòng ban.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Huy hiệu (Badges):</strong> Thưởng điểm XP cho các cột mốc: 100% quiz, 7 ngày streak.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>AI Learning Path:</strong> Tự động phân tích Skill Gap để vẽ lộ trình thăng tiến.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Đố vui hằng ngày:</strong> 1 câu hỏi nhanh mỗi sáng, cộng +50 XP và giữ streak.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Diễn đàn Q&A:</strong> Thảo luận với câu trả lời được xác thực bởi giảng viên.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                  Sprint 9 - 12
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Phase 3: Tích Hợp Doanh Nghiệp</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-100 text-violet-800 font-bold">
                Mở rộng tiếp
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span><strong>Đăng nhập một chạm SSO:</strong> Đồng bộ tài khoản Google Workspace / Microsoft Entra ID.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span><strong>Chatbot Slack / Teams:</strong> Tự động gửi tin nhắn nhắc nhở deadline học tập hàng tuần.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span><strong>Chuẩn SCORM & xAPI:</strong> Nhập gói bài giảng tương tác từ Articulate Storyline / iSpring.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span><strong>Đồng bộ HRIS / Nhân sự:</strong> Tự động gán khóa học khi nhân viên mới onboard.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 2: ERD Schema */}
      {activeTab === 'erd' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200">
            <strong>Gợi ý kiến trúc cơ sở dữ liệu (PostgreSQL / Relational ORM)</strong>: Thiết kế chuẩn hóa 3NF để đảm bảo khả năng mở rộng hàng chục nghìn lượt làm bài quiz và theo dõi tiến độ không bị xung đột khóa.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-2 border border-slate-800">
              <span className="text-amber-400 font-bold font-sans">1. Bảng Users & Roles</span>
              <pre className="text-[11px] leading-relaxed overflow-x-auto text-emerald-400">
{`CREATE TABLE users (
  id UUID PRIMARY KEY,
  employee_code VARCHAR(20) UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  department VARCHAR(50),
  job_title VARCHAR(50),
  role VARCHAR(20) DEFAULT 'student',
  current_xp INT DEFAULT 0,
  streak_days INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);`}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-2 border border-slate-800">
              <span className="text-amber-400 font-bold font-sans">2. Bảng Courses, Modules & Lessons</span>
              <pre className="text-[11px] leading-relaxed overflow-x-auto text-emerald-400">
{`CREATE TABLE courses (
  id UUID PRIMARY KEY,
  code VARCHAR(20) UNIQUE,
  title VARCHAR(200) NOT NULL,
  category VARCHAR(50),
  level VARCHAR(20),
  is_mandatory BOOLEAN DEFAULT FALSE,
  total_duration_minutes INT,
  passing_score_percent INT DEFAULT 80
);

CREATE TABLE lessons (
  id UUID PRIMARY KEY,
  module_id UUID REFERENCES modules(id),
  title VARCHAR(200),
  lesson_type VARCHAR(20), -- video, article, quiz
  duration_minutes INT,
  content_url TEXT
);`}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-2 border border-slate-800">
              <span className="text-amber-400 font-bold font-sans">3. Bảng Tiến Độ (Enrollments & Progress)</span>
              <pre className="text-[11px] leading-relaxed overflow-x-auto text-emerald-400">
{`CREATE TABLE enrollments (
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  progress_percent INT DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  enrolled_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  PRIMARY KEY (user_id, course_id)
);

CREATE TABLE lesson_progress (
  user_id UUID REFERENCES users(id),
  lesson_id UUID REFERENCES lessons(id),
  is_completed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, lesson_id)
);`}
              </pre>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-2 border border-slate-800">
              <span className="text-amber-400 font-bold font-sans">4. Bảng Bài Thi & Chứng Chỉ (Quizzes & Certs)</span>
              <pre className="text-[11px] leading-relaxed overflow-x-auto text-emerald-400">
{`CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  quiz_id UUID,
  score_percent INT,
  is_passed BOOLEAN,
  answers_json JSONB,
  attempted_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE certificates (
  id UUID PRIMARY KEY,
  certificate_code VARCHAR(50) UNIQUE,
  user_id UUID REFERENCES users(id),
  course_id UUID REFERENCES courses(id),
  score_percent INT,
  issued_at TIMESTAMP DEFAULT NOW()
);`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: User Stories */}
      {activeTab === 'userstories' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                US-LMS-01 (Priority: High)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                Sprint 1
              </span>
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Là một Học viên (Employee), tôi muốn làm bài kiểm tra trắc nghiệm cuối khóa để đánh giá mức độ tiếp thu và nhận chứng chỉ hoàn thành.
            </h3>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1 font-mono text-slate-700 dark:text-slate-300">
              <p><strong>Given:</strong> Học viên đã hoàn thành tối thiểu 80% các bài giảng trong khóa học</p>
              <p><strong>When:</strong> Bấm vào nút "Làm bài kiểm tra (Quiz)"</p>
              <p><strong>Then:</strong> Hệ thống mở giao diện thi có đồng hồ đếm ngược, hiển thị từng câu hỏi với 4 đáp án lựa chọn</p>
              <p><strong>And:</strong> Khi nộp bài, nếu điểm số &ge; 80%, hệ thống tự động ghi nhận đỗ và cấp Chứng chỉ có số hiệu tra cứu.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                US-LMS-02 (Priority: Medium)
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                Sprint 2
              </span>
            </div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Là một IT Product Owner, tôi muốn AI tự động đề xuất lộ trình học tập cá nhân hóa dựa trên vị trí hiện tại và mục tiêu phát triển.
            </h3>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1 font-mono text-slate-700 dark:text-slate-300">
              <p><strong>Given:</strong> Nhân sự chọn vị trí hiện tại (vd: Junior PO) và mục tiêu (vd: Senior PO)</p>
              <p><strong>When:</strong> Bấm nút "Tạo lộ trình bằng AI"</p>
              <p><strong>Then:</strong> Hệ thống phân tích Skill Gap và trả về timeline theo tuần kèm các khóa học nội bộ tương ứng</p>
              <p><strong>And:</strong> Cho phép nhân sự bấm đăng ký học 1 chạm cho từng giai đoạn.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: KPIs */}
      {activeTab === 'kpis' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold text-xs">1</span>
              <span>Course Completion Rate (Tỷ lệ hoàn thành)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tỷ lệ học viên hoàn thành khóa học so với tổng số lượt đăng ký. Benchmark nội bộ khuyến nghị: &gt; 80% đối với khóa kỹ năng và 100% đối với khóa tuân thủ bắt buộc (ISO 27001).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">2</span>
              <span>First-Time Pass Rate (Đỗ trắc nghiệm lần đầu)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tỷ lệ học viên vượt qua bài kiểm tra trắc nghiệm ngay trong lần thi đầu tiên mà không cần thi lại. Giúp đánh giá chất lượng bài giảng của giảng viên có thực sự dễ hiểu không.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs">3</span>
              <span>Daily Active Learners & Streak Retention</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Số nhân viên đăng nhập học tập mỗi ngày nhờ tính năng Daily Streak và Daily Quiz. Đo lường mức độ hình thành thói quen học tập vi mô (Microlearning) trong tổ chức.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold text-xs">4</span>
              <span>Time-to-Competency (Thời gian đạt chuẩn năng lực)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Thời gian trung bình để một nhân viên mới onboard đạt đủ chứng chỉ để độc lập nhận task dự án thực tế. Giảm từ 3 tháng xuống còn 4-6 tuần nhờ bài giảng tự học trực tuyến.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
