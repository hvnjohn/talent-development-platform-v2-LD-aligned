import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, BookOpen, CheckCircle, Clock, 
  Target, Award, RefreshCw, ChevronRight, Zap, CheckCircle2,
  Calendar, Layers, ShieldCheck
} from 'lucide-react';
import { Course, LearningPath } from '../types/lms';

interface AILearningPathViewProps {
  courses: Course[];
  onOpenCourse: (courseId: string) => void;
  onEnrollCourse: (courseId: string) => void;
  enrolledCourseIds: string[];
}

export const AILearningPathView: React.FC<AILearningPathViewProps> = ({
  courses,
  onOpenCourse,
  onEnrollCourse,
  enrolledCourseIds
}) => {
  const [currentRole, setCurrentRole] = useState<string>('Junior Product Owner / BA');
  const [targetRole, setTargetRole] = useState<string>('Senior Product Owner / Tech Lead');
  const [timeHorizon, setTimeHorizon] = useState<string>('6 tháng');
  const [selectedSkillFocus, setSelectedSkillFocus] = useState<string[]>([
    'Agile Scrum & INVEST', 
    'Generative AI for PO', 
    'Microservices & System Design'
  ]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPath, setGeneratedPath] = useState<LearningPath | null>({
    id: 'path-po-senior-2026',
    roleTitle: 'Junior Product Owner / BA',
    targetRole: 'Senior Product Owner / Tech Lead',
    targetLevel: 'Chuyên gia Cấp 3 (Senior Grade)',
    totalWeeks: 24,
    summary: 'Lộ trình phát triển toàn diện từ quản trị Backlog cơ bản đến làm chủ kiến trúc hệ thống phân tán và ứng dụng Generative AI để tăng tốc độ phân rã yêu cầu.',
    aiReasoning: 'Phân tích năng lực hiện tại cho thấy bạn đã hoàn thành Agile Scrum PO cơ bản. Để nâng cấp lên Senior PO, khoảng cách năng lực lớn nhất nằm ở (1) Kiến trúc kỹ thuật Microservices để đối thoại chuẩn cùng Tech Leads và (2) Kỹ năng đàm phán giải quyết mâu thuẫn Stakeholders.',
    steps: [
      {
        stepNumber: 1,
        title: 'Giai đoạn 1: Chuẩn Hóa Quản Trị Agile & Kỹ Năng INVEST',
        estimatedWeeks: 4,
        description: 'Làm chủ kỹ thuật viết User Story INVEST, tiêu chí nghiệm thu Given-When-Then và xếp hạng ưu tiên RICE.',
        competencyFocus: 'Backlog Refinement & Story Mapping',
        linkedCourseId: 'crs-001',
        isCompleted: true
      },
      {
        stepNumber: 2,
        title: 'Giai đoạn 2: Ứng Dụng Generative AI Tự Động Hóa Tài Liệu PO',
        estimatedWeeks: 6,
        description: 'Sử dụng AI để tự động tạo Acceptance Criteria, phân tích log lỗi hệ thống và sinh test cases cho QA.',
        competencyFocus: 'Prompt Engineering & AI Productivity',
        linkedCourseId: 'crs-004',
        isCompleted: false
      },
      {
        stepNumber: 3,
        title: 'Giai đoạn 3: Đàm Phán & Giao Tiếp Đa Phòng Ban Cho Quản Lý Dự Án',
        estimatedWeeks: 6,
        description: 'Kỹ năng thuyết phục Business Stakeholders, quản lý kỳ vọng phạm vi và giải quyết mâu thuẫn giữa Sales và Tech.',
        competencyFocus: 'Stakeholder Alignment & Conflict Resolution',
        linkedCourseId: 'crs-005',
        isCompleted: false
      },
      {
        stepNumber: 4,
        title: 'Giai đoạn 4: Hiểu Biết Kiến Trúc Microservices & Chịu Tải',
        estimatedWeeks: 8,
        description: 'Trang bị tư duy kỹ thuật chuyên sâu về Event-Driven, Saga Pattern và Caching để ra quyết định sản phẩm không bị phụ thuộc hoàn toàn vào Tech Lead.',
        competencyFocus: 'System Design & High Availability',
        linkedCourseId: 'crs-002',
        isCompleted: false
      }
    ]
  });

  const availableSkills = [
    'Agile Scrum & INVEST',
    'Generative AI for PO',
    'Microservices & System Design',
    'An toàn bảo mật & Nghị định 13',
    'Đàm phán Stakeholders',
    'Data Analytics & SQL'
  ];

  const handleToggleSkill = (skill: string) => {
    setSelectedSkillFocus(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPath({
        id: `path-${Date.now()}`,
        roleTitle: currentRole,
        targetRole: targetRole,
        targetLevel: 'Mục tiêu chiến lược FY2027',
        totalWeeks: timeHorizon === '3 tháng' ? 12 : timeHorizon === '6 tháng' ? 24 : 48,
        summary: `Lộ trình học tập tăng tốc được AI tối ưu hóa riêng cho ${currentRole} muốn nâng cấp lên ${targetRole} trong ${timeHorizon}.`,
        aiReasoning: `Hệ sinh thái LMS tự động kết nối các khóa học nội bộ với chuẩn competency khung năng lực của công ty, ưu tiên các kỹ năng: ${selectedSkillFocus.join(', ')}.`,
        steps: [
          {
            stepNumber: 1,
            title: `Bước 1: Nền tảng chuyên môn cho ${targetRole.split('/')[0]}`,
            estimatedWeeks: 4,
            description: 'Hoàn thiện các kỹ năng bắt buộc và nắm vững khung làm việc cốt lõi.',
            competencyFocus: selectedSkillFocus[0] || 'Core Foundation',
            linkedCourseId: 'crs-001',
            isCompleted: true
          },
          {
            stepNumber: 2,
            title: 'Bước 2: Nâng cấp kỹ thuật và công cụ số hóa / AI',
            estimatedWeeks: 6,
            description: 'Tận dụng AI và tự động hóa để tăng năng suất làm việc nhóm gấp đôi.',
            competencyFocus: selectedSkillFocus[1] || 'Productivity & AI',
            linkedCourseId: 'crs-004',
            isCompleted: false
          },
          {
            stepNumber: 3,
            title: 'Bước 3: Năng lực phối hợp & Quản trị rủi ro',
            estimatedWeeks: 8,
            description: 'Kỹ năng làm việc liên chức năng, bảo mật dữ liệu và chuẩn hóa báo cáo.',
            competencyFocus: selectedSkillFocus[2] || 'Leadership & Compliance',
            linkedCourseId: 'crs-003',
            isCompleted: false
          }
        ]
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 font-bold text-xs mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Learning Path Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tự Động Tạo Lộ Trình Học Tập Cá Nhân Hóa (AI Career Roadmap)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Sử dụng AI phân tích vị trí công tác hiện tại, khoảng cách kỹ năng (Skill Gap) và mục tiêu thăng tiến để xây dựng lộ trình học tập từng bước.
          </p>
        </div>
      </div>

      {/* Generator Configuration Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Thiết Lập Mục Tiêu & Kỹ Năng Ưu Tiên</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
              Vị trí hiện tại:
            </label>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="Junior Product Owner / BA">Junior Product Owner / BA</option>
              <option value="Software Engineer (Fullstack)">Software Engineer (Fullstack)</option>
              <option value="QA / QC Automation Lead">QA / QC Automation Lead</option>
              <option value="Data Analyst / BI Specialist">Data Analyst / BI Specialist</option>
              <option value="Scrum Master / Agile Coach">Scrum Master / Agile Coach</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
              Mục tiêu vươn tới (Target Role):
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="Senior Product Owner / Tech Lead">Senior Product Owner / Tech Lead</option>
              <option value="Principal Product Manager (PM)">Principal Product Manager (PM)</option>
              <option value="Solution Architect (Enterprise)">Solution Architect (Enterprise)</option>
              <option value="Head of Digital Product">Head of Digital Product</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
              Khung thời gian mục tiêu:
            </label>
            <select
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="3 tháng">3 tháng (Cấp tốc)</option>
              <option value="6 tháng">6 tháng (Tiêu chuẩn)</option>
              <option value="12 tháng">12 tháng (Chiến lược dài hạn)</option>
            </select>
          </div>
        </div>

        {/* Skills Tag Cloud */}
        <div className="mb-5">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-2">
            Chọn các kỹ năng muốn tập trung đào sâu:
          </label>
          <div className="flex flex-wrap gap-2">
            {availableSkills.map((sk) => {
              const isSelected = selectedSkillFocus.includes(sk);
              return (
                <button
                  key={sk}
                  onClick={() => handleToggleSkill(sk)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {isSelected && '✓ '} {sk}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>AI đang phân tích khoảng cách năng lực...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Tạo Lộ Trình Học Tập Bằng AI Ngay</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Roadmap Display */}
      {generatedPath && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Summary Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">
                  {generatedPath.targetLevel} • Tổng thời lượng: {generatedPath.totalWeeks} tuần
                </span>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                  Lộ trình: {generatedPath.roleTitle} &rarr; {generatedPath.targetRole}
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-3xl leading-relaxed">
                  {generatedPath.summary}
                </p>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-indigo-200/60 dark:border-indigo-800/60 text-xs shrink-0">
                <span className="font-bold text-indigo-900 dark:text-indigo-200">Giai đoạn hoàn tất: </span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                  {generatedPath.steps.filter(s => s.isCompleted).length} / {generatedPath.steps.length}
                </span>
              </div>
            </div>

            {/* AI Reasoning box */}
            <div className="mt-4 pt-3 border-t border-indigo-100 dark:border-indigo-900/40 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
              <Sparkles className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
              <p>
                <strong className="text-slate-800 dark:text-slate-200">Lý giải của AI (Competency Gap Analysis): </strong>
                {generatedPath.aiReasoning}
              </p>
            </div>
          </div>

          {/* Interactive Steps Timeline */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Các Giai Đoạn Phát Triển Chi Tiết</span>
            </h3>

            <div className="space-y-4">
              {generatedPath.steps.map((step, idx) => {
                const linkedCourse = courses.find(c => c.id === step.linkedCourseId);
                const isEnrolled = linkedCourse && enrolledCourseIds.includes(linkedCourse.id);

                return (
                  <div
                    key={step.stepNumber}
                    className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                      step.isCompleted
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Number Badge */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 ${
                        step.isCompleted
                          ? 'bg-emerald-500 text-white'
                          : 'bg-indigo-600 text-white'
                      }`}>
                        {step.isCompleted ? <CheckCircle2 className="w-5 h-5" /> : step.stepNumber}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                            {step.title}
                          </h4>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                            {step.estimatedWeeks} tuần
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-semibold">
                            {step.competencyFocus}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                          {step.description}
                        </p>

                        {/* Linked Course Pill */}
                        {linkedCourse && (
                          <div className="pt-1 flex items-center gap-2 text-xs">
                            <span className="text-slate-400 font-medium text-[11px]">Khóa học tương ứng:</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200 underline decoration-indigo-500/40">
                              {linkedCourse.title}
                            </span>
                            <span className="text-[10px] text-slate-400">({linkedCourse.totalDurationMinutes} phút)</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Action */}
                    {linkedCourse && (
                      <div className="self-end md:self-center shrink-0">
                        {isEnrolled ? (
                          <button
                            onClick={() => onOpenCourse(linkedCourse.id)}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                          >
                            <span>{step.isCompleted ? 'Ôn lại' : 'Tiếp tục học'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => onEnrollCourse(linkedCourse.id)}
                            className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white font-bold text-xs transition-colors"
                          >
                            Đăng ký học ngay
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
