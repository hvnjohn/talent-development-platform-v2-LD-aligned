export type CompetencyCategory = 'Core' | 'Functional' | 'Leadership' | 'Digital';
export type ImportanceLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type AssessmentStatus = 'Draft' | 'Self Submitted' | 'Manager Reviewed' | 'Calibrated' | 'Locked';
export type ReadinessCategory = 'Ready Now' | 'Ready Soon' | 'Future Ready';

export interface CompetencyNode {
  id: number;
  parent: number | null;
  code: string;
  name: string;
  desc?: string;
  def?: string;
  status: 'A' | 'I';
  date: string;
  order: number;
  category?: CompetencyCategory;
}

export interface ProficiencyLevel {
  id: number;
  sortOrder: number;
  name: string;
  definition: string;
  status: 'A' | 'I';
}

export interface BehaviorIndicator {
  id: number;
  code: string;
  text: string;
  status: 'A' | 'I';
  date: string;
}

export interface CompetencyLevelMapping {
  id: number;
  competencyId: number;
  levelId: number;
  behaviorIds: number[];
}

export interface RoleCompetencyItem {
  code: string;
  target: number;
  imp: ImportanceLevel;
  req: boolean;
}

export interface RoleMatrix {
  id: string;
  name: string;
  dept: string;
  family: string;
  grade: string;
  updated: string;
  items: RoleCompetencyItem[];
}

export interface AssessmentRecord {
  selfLevel: number;
  selfCheckedBehaviors: string[]; // e.g. "3-12"
  selfEvidence?: string;
  selfNote?: string;
  managerLevel: number;
  managerJustification?: string;
  managerEvidence?: string;
  criticalIncident?: string;
  calibratedLevel: number;
  calibrationReason?: string;
  finalLevel: number;
}

export interface Employee {
  id: number;
  name: string;
  code: string;
  role: string;
  team: string;
  email: string;
  avatar: string;
  tenureYears: number;
  performanceRatings: number[]; // [H2 2024, H1 2025, H2 2025, H1 2026]
  potentialRating: number; // 1-3
  certs: string[];
  managerRecommendation: number; // 1-5
  targetRole: string;
  careerHorizon: string; // "6-12 months", "1-2 years", "3-5 years"
  businessKpi: [string, string, string]; // [KPI Name, Baseline, Current]
}

export interface IDPAction {
  id: string;
  area: string;
  code: string;
  item: string;
  type: 'ojt' | 'coach' | 'formal';
  due: string;
  owner: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  progress: number;
  doneDate?: string;
  stretch?: boolean;
}

export interface IDPLog {
  date: string;
  who: string;
  event: string;
  comment?: string;
}

export interface IDPPlan {
  id: string;
  empId: number;
  period: string;
  goal: string;
  targetRole: string;
  targetDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Draft' | 'Submitted' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Completed';
  stage: 'manager' | 'hr' | '';
  hrRequired: boolean;
  createdDate: string;
  sources: string[];
  baseline: Record<string, number>; // code -> level
  actions: IDPAction[];
  log: IDPLog[];
  review?: {
    reflection: string;
    feedback: string;
    achievements: string;
    lessons: string;
    result: 'Successfully Completed' | 'Partially Completed' | 'Not Completed';
  };
}

export interface CourseTraining {
  id: string;
  code: string;
  name: string;
  competencyCode: string;
  hours: number;
  format: 'Self-paced' | 'Instructor-led' | 'Workshop';
}

export interface TrainingEnrollment {
  id: string;
  empId: number;
  courseId: string;
  source: string;
  dueDate: string;
  progress: number;
  status: 'Assigned' | 'In Progress' | 'Completed';
  completedDate?: string;
  preTestScore?: number;
  postTestScore?: number;
  reactionScore?: number; // 1-5
  behaviorScore?: number; // 1-5
  validatedLevelLift?: boolean;
}

export interface TrainingSession {
  id: string;
  courseId: string;
  date: string;
  location: string;
  trainer: string;
  totalSeats: number;
  bookedSeats: number;
}

export interface SuccessionPosition {
  id: number;
  title: string;
  type: 'Succession' | 'Open' | 'Future';
  incumbent: string;
  vacancyRisk: 'High' | 'Medium' | 'Low' | '-';
  notes: string;
}
