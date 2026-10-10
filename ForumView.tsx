export type UserRole = 'student' | 'instructor' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  jobTitle: string;
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  badges: string[];
}

export type CourseLevel = 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
export type CourseCategory = 
  | 'Kỹ thuật & Lập trình' 
  | 'Product & Agile' 
  | 'Bảo mật & Tuân thủ' 
  | 'Dữ liệu & AI' 
  | 'Kỹ năng mềm & Lãnh đạo';

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'video' | 'article' | 'quiz' | 'practice';
  contentUrl?: string;
  textContent?: string;
  isCompleted?: boolean;
  isDownloaded?: boolean;
  fileSizeMb?: number;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index 0-based
  explanation: string;
}

export interface CourseQuiz {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  passingScorePercent: number;
  questions: QuizQuestion[];
}

export interface CourseReview {
  id: string;
  userName: string;
  userAvatar: string;
  userTitle: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  likes: number;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  shortSummary: string;
  category: CourseCategory;
  level: CourseLevel;
  thumbnail: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  totalDurationMinutes: number;
  enrolledCount: number;
  rating: number;
  reviewCount: number;
  modules: CourseModule[];
  quiz?: CourseQuiz;
  reviews?: CourseReview[];
  skillsGained: string[];
  isFeatured?: boolean;
  isMandatory?: boolean; // Khóa học bắt buộc nội bộ
  certificateAvailable: boolean;
}

export interface Certificate {
  id: string;
  certificateCode: string;
  studentName: string;
  studentId: string;
  courseTitle: string;
  courseCode: string;
  completionDate: string;
  instructorName: string;
  directorName: string;
  scorePercent: number;
  verificationUrl: string;
}

export interface ForumReply {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  createdAt: string;
  content: string;
  upvotes: number;
  isInstructorAnswer?: boolean;
}

export interface ForumThread {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  courseId?: string;
  courseTitle?: string;
  category: string;
  createdAt: string;
  upvotes: number;
  views: number;
  replies: ForumReply[];
  isSolved: boolean;
  tags: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'quiz' | 'streak' | 'community';
  unlockedAt?: string;
  xpReward: number;
  progressPercent: number;
}

export interface LeaderboardUser {
  rank: number;
  userId: string;
  name: string;
  department: string;
  avatar: string;
  xp: number;
  completedCourses: number;
  streakDays: number;
  isCurrentUser?: boolean;
}

export interface LearningPathStep {
  stepNumber: number;
  title: string;
  estimatedWeeks: number;
  description: string;
  competencyFocus: string;
  linkedCourseId?: string;
  isCompleted?: boolean;
}

export interface LearningPath {
  id: string;
  roleTitle: string;
  targetRole: string;
  targetLevel: string;
  summary: string;
  totalWeeks: number;
  steps: LearningPathStep[];
  aiReasoning: string;
}

export interface LearningResource {
  id: string;
  title: string;
  format: 'PDF' | 'CheatSheet' | 'Ebook' | 'Template' | 'Audio';
  category: string;
  author: string;
  fileSize: string;
  downloadCount: number;
  description: string;
  downloadUrl: string;
  tags: string[];
}

export interface DailyQuizQuestion {
  id: string;
  date: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  xpReward: number;
}

export interface AppNotification {
  id: string;
  type: 'streak' | 'reminder' | 'course' | 'quiz' | 'badge';
  title: string;
  message: string;
  timeAgo: string;
  isRead: boolean;
  actionUrl?: string;
}
