import { 
  Employee, CompetencyNode, ProficiencyLevel, 
  RoleMatrix, IDPPlan, CourseTraining, SuccessionPosition 
} from '../types/talent';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: 'Nguyen Thi Lan',
    code: 'HRDA-101',
    role: 'Junior HR Data Analyst',
    team: 'People Analytics',
    email: 'lan.nguyen@company.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    tenureYears: 1.5,
    performanceRatings: [3, 3, 3, 3],
    potentialRating: 2,
    certs: [],
    managerRecommendation: 3,
    targetRole: 'HR Data Analyst',
    careerHorizon: '1-2 years',
    businessKpi: ['Report rework rate', '18%', '12%']
  },
  {
    id: 2,
    name: 'Tran Minh Khoa',
    code: 'HRDA-204',
    role: 'HR Data Analyst',
    team: 'People Analytics',
    email: 'khoa.tran@company.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    tenureYears: 3.0,
    performanceRatings: [3, 3, 4, 3],
    potentialRating: 2,
    certs: ['Power BI Data Analyst Associate'],
    managerRecommendation: 3,
    targetRole: 'Senior HR Data Analyst',
    careerHorizon: '1-2 years',
    businessKpi: ['Sensitive data incidents (Privacy incidents)', '2 / quarter', '0 incidents']
  },
  {
    id: 3,
    name: 'Le Hoang Yen',
    code: 'HRDA-205',
    role: 'HR Data Analyst',
    team: 'HR Operations Analytics',
    email: 'yen.le@company.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    tenureYears: 3.5,
    performanceRatings: [3, 4, 4, 4],
    potentialRating: 3,
    certs: ['Power BI Data Analyst Associate'],
    managerRecommendation: 4,
    targetRole: 'Senior HR Data Analyst',
    careerHorizon: '6-12 months',
    businessKpi: ['Monthly report cycle time', '6 days', '4 days']
  },
  {
    id: 4,
    name: 'Pham Quoc Bao',
    code: 'HRDA-301',
    role: 'Senior HR Data Analyst',
    team: 'People Analytics',
    email: 'bao.pham@company.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    tenureYears: 6.0,
    performanceRatings: [4, 4, 5, 4],
    potentialRating: 3,
    certs: ['Certified People Analytics Professional', 'Power BI Data Analyst Associate'],
    managerRecommendation: 5,
    targetRole: 'HR Analytics Manager',
    careerHorizon: '1-2 years',
    businessKpi: ['Attrition predictive model accuracy', '71%', '84%']
  },
  {
    id: 5,
    name: 'Vo Thanh Mai',
    code: 'HRDA-302',
    role: 'Senior HR Data Analyst',
    team: 'HR Operations Analytics',
    email: 'mai.vo@company.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    tenureYears: 7.0,
    performanceRatings: [4, 5, 4, 5],
    potentialRating: 3,
    certs: ['Certified People Analytics Professional'],
    managerRecommendation: 4,
    targetRole: 'HR Analytics Manager',
    careerHorizon: '2-3 years',
    businessKpi: ['Manager dashboard adoption rate', '52%', '68%']
  }
];

export const INITIAL_COMPETENCY_NODES: CompetencyNode[] = [
  // Categories (Level 1)
  { id: 1, parent: null, code: 'CORE', name: 'Core Competencies', status: 'A', date: '2026-10-07', order: 1, category: 'Core' },
  { id: 2, parent: null, code: 'FUNC', name: 'Functional Competencies', status: 'A', date: '2026-10-07', order: 2, category: 'Functional' },
  { id: 3, parent: null, code: 'LEAD', name: 'Leadership Competencies', status: 'A', date: '2026-10-07', order: 3, category: 'Leadership' },
  { id: 4, parent: null, code: 'DIG', name: 'Digital & AI Competencies', status: 'A', date: '2026-10-07', order: 4, category: 'Digital' },

  // Core Competencies (Level 2)
  { id: 11, parent: 1, code: 'CORE-COM', name: 'Communication & Data Storytelling', status: 'A', date: '2026-10-07', order: 1 },
  { id: 12, parent: 1, code: 'CORE-COL', name: 'Cross-functional Collaboration', status: 'A', date: '2026-10-07', order: 2 },
  { id: 13, parent: 1, code: 'CORE-PS', name: 'Structured Problem Solving', status: 'A', date: '2026-10-07', order: 3 },

  // Functional: Data Analytics Group (Level 2)
  { id: 21, parent: 2, code: 'FUNC-DA', name: 'Data Analytics Mastery', status: 'A', date: '2026-10-07', order: 1 },
  { id: 211, parent: 21, code: 'FUNC-DA-001', name: 'Advanced Excel & Data Modeling', status: 'A', date: '2026-10-07', order: 1, def: 'Ability to clean, transform multi-source data with Power Query, and build automated reports.' },
  { id: 212, parent: 21, code: 'FUNC-DA-002', name: 'Power BI & DAX Modeling', status: 'A', date: '2026-10-07', order: 2, def: 'Ability to architect star schemas, write context-aware DAX measures, and enforce Row-Level Security (RLS).' },
  { id: 213, parent: 21, code: 'FUNC-DA-003', name: 'Python for People Analytics', status: 'A', date: '2026-10-07', order: 3, def: 'Ability to script pandas/NumPy, automate reconciliation pipelines, and train predictive models.' },

  // Functional: HR Analytics Group (Level 2)
  { id: 22, parent: 2, code: 'FUNC-HRA', name: 'People & HR Analytics', status: 'A', date: '2026-10-07', order: 2 },
  { id: 221, parent: 22, code: 'FUNC-HRA-001', name: 'HR Metrics & KPI Standardization', status: 'A', date: '2026-10-07', order: 1, def: 'Ability to define, compute and explain standardized HR metrics (headcount, turnover, absence, cost per hire).' },
  { id: 222, parent: 22, code: 'FUNC-HRA-002', name: 'Workforce Planning & Attrition Analytics', status: 'A', date: '2026-10-07', order: 2, def: 'Ability to analyze attrition drivers, forecast headcount requirements and model workforce risks.' },
  { id: 223, parent: 22, code: 'FUNC-HRA-003', name: 'HR Data Privacy & Decree 13 Compliance', status: 'A', date: '2026-10-07', order: 3, def: 'Ability to handle sensitive employee personal data lawfully under Decree 13/2023, enforce masking and RLS.' },

  // Leadership (Level 2)
  { id: 31, parent: 3, code: 'LEAD-COA', name: 'Coaching & Mentoring Leaders', status: 'A', date: '2026-10-07', order: 1 },
  { id: 32, parent: 3, code: 'LEAD-STR', name: 'Strategic Thinking', status: 'A', date: '2026-10-07', order: 2 },
  { id: 33, parent: 3, code: 'LEAD-CHG', name: 'Change Management', status: 'A', date: '2026-10-07', order: 3 }
];

export const INITIAL_PROFICIENCY_LEVELS: ProficiencyLevel[] = [
  { id: 1, sortOrder: 1, name: 'Basic (Level 1)', definition: 'Understands fundamental concepts and executes routine tasks under direct guidance.', status: 'A' },
  { id: 2, sortOrder: 2, name: 'Developing (Level 2)', definition: 'Handles standard familiar tasks independently; requires coaching in novel or complex situations.', status: 'A' },
  { id: 3, sortOrder: 3, name: 'Proficient (Level 3)', definition: 'Works fully independently and solves standard enterprise complex challenges with high quality.', status: 'A' },
  { id: 4, sortOrder: 4, name: 'Advanced (Level 4)', definition: 'Optimizes processes, solves cross-functional issues, and coaches other team members.', status: 'A' },
  { id: 5, sortOrder: 5, name: 'Expert (Level 5)', definition: 'Establishes enterprise-wide frameworks, guides business strategy, and serves as reference authority.', status: 'A' }
];

export const INITIAL_ROLE_MATRICES: RoleMatrix[] = [
  {
    id: 'r1',
    name: 'Junior HR Data Analyst',
    dept: 'HR',
    family: 'People Analytics',
    grade: 'G2',
    updated: '2026-09-28',
    items: [
      { code: 'FUNC-DA-001', target: 2, imp: 'High', req: true },
      { code: 'FUNC-DA-002', target: 2, imp: 'High', req: true },
      { code: 'FUNC-DA-003', target: 1, imp: 'Medium', req: false },
      { code: 'FUNC-HRA-001', target: 2, imp: 'High', req: true },
      { code: 'FUNC-HRA-002', target: 1, imp: 'Medium', req: true },
      { code: 'FUNC-HRA-003', target: 2, imp: 'Critical', req: true },
      { code: 'CORE-COM', target: 2, imp: 'High', req: true },
      { code: 'CORE-PS', target: 2, imp: 'Medium', req: true }
    ]
  },
  {
    id: 'r2',
    name: 'HR Data Analyst',
    dept: 'HR',
    family: 'People Analytics',
    grade: 'G3',
    updated: '2026-10-01',
    items: [
      { code: 'FUNC-DA-001', target: 3, imp: 'High', req: true },
      { code: 'FUNC-DA-002', target: 3, imp: 'Critical', req: true },
      { code: 'FUNC-DA-003', target: 2, imp: 'Medium', req: false },
      { code: 'FUNC-HRA-001', target: 3, imp: 'High', req: true },
      { code: 'FUNC-HRA-002', target: 3, imp: 'High', req: true },
      { code: 'FUNC-HRA-003', target: 3, imp: 'Critical', req: true },
      { code: 'CORE-COM', target: 3, imp: 'Critical', req: true },
      { code: 'CORE-PS', target: 3, imp: 'Medium', req: true }
    ]
  },
  {
    id: 'r3',
    name: 'Senior HR Data Analyst',
    dept: 'HR',
    family: 'People Analytics',
    grade: 'G4',
    updated: '2026-10-01',
    items: [
      { code: 'FUNC-DA-001', target: 4, imp: 'High', req: true },
      { code: 'FUNC-DA-002', target: 4, imp: 'Critical', req: true },
      { code: 'FUNC-DA-003', target: 3, imp: 'Medium', req: false },
      { code: 'FUNC-HRA-001', target: 4, imp: 'High', req: true },
      { code: 'FUNC-HRA-002', target: 4, imp: 'High', req: true },
      { code: 'FUNC-HRA-003', target: 4, imp: 'Critical', req: true },
      { code: 'CORE-COM', target: 4, imp: 'Critical', req: true },
      { code: 'CORE-PS', target: 4, imp: 'High', req: true },
      { code: 'CORE-COL', target: 3, imp: 'Medium', req: true },
      { code: 'LEAD-COA', target: 3, imp: 'Medium', req: false }
    ]
  },
  {
    id: 'r4',
    name: 'HR Analytics Manager',
    dept: 'HR',
    family: 'People Analytics',
    grade: 'G5',
    updated: '2026-10-05',
    items: [
      { code: 'LEAD-COA', target: 4, imp: 'Critical', req: true },
      { code: 'LEAD-STR', target: 3, imp: 'High', req: true },
      { code: 'CORE-COL', target: 4, imp: 'High', req: true },
      { code: 'FUNC-HRA-001', target: 4, imp: 'High', req: true },
      { code: 'FUNC-HRA-002', target: 4, imp: 'High', req: true },
      { code: 'FUNC-HRA-003', target: 4, imp: 'Critical', req: true },
      { code: 'CORE-COM', target: 4, imp: 'Critical', req: true }
    ]
  },
  {
    id: 'r5',
    name: 'Head of People Analytics',
    dept: 'HR',
    family: 'People Analytics',
    grade: 'G6',
    updated: '2026-10-05',
    items: [
      { code: 'LEAD-STR', target: 4, imp: 'Critical', req: true },
      { code: 'LEAD-COA', target: 4, imp: 'High', req: true },
      { code: 'LEAD-CHG', target: 3, imp: 'High', req: true },
      { code: 'FUNC-HRA-002', target: 4, imp: 'High', req: true },
      { code: 'CORE-COM', target: 4, imp: 'Critical', req: true }
    ]
  }
];

export const INITIAL_TRAINING_CATALOG: CourseTraining[] = [
  { id: 'TRN-XL-01', code: 'FUNC-DA-001', name: 'Advanced Excel & HR Reporting Automation', competencyCode: 'FUNC-DA-001', hours: 8, format: 'Workshop' },
  { id: 'TRN-PBI-01', code: 'FUNC-DA-002', name: 'Power BI Data Modeling & Advanced DAX', competencyCode: 'FUNC-DA-002', hours: 12, format: 'Instructor-led' },
  { id: 'TRN-PY-01', code: 'FUNC-DA-003', name: 'Python for HR Data Reconciliation & Scripting', competencyCode: 'FUNC-DA-003', hours: 16, format: 'Self-paced' },
  { id: 'TRN-HRM-01', code: 'FUNC-HRA-001', name: 'HR Metrics Standardization & KPI Dictionary', competencyCode: 'FUNC-HRA-001', hours: 10, format: 'Workshop' },
  { id: 'TRN-WFA-01', code: 'FUNC-HRA-002', name: 'Workforce Planning & Predictive Attrition Modeling', competencyCode: 'FUNC-HRA-002', hours: 14, format: 'Instructor-led' },
  { id: 'TRN-PRV-01', code: 'FUNC-HRA-003', name: 'HR Personal Data Privacy & Decree 13 Compliance', competencyCode: 'FUNC-HRA-003', hours: 12, format: 'Instructor-led' },
  { id: 'TRN-COM-01', code: 'CORE-COM', name: 'Data Storytelling & Executive Presentation', competencyCode: 'CORE-COM', hours: 6, format: 'Workshop' },
  { id: 'TRN-PS-01', code: 'CORE-PS', name: 'Structured Problem Solving & Root Cause Analysis', competencyCode: 'CORE-PS', hours: 8, format: 'Self-paced' },
  { id: 'TRN-COL-01', code: 'CORE-COL', name: 'Cross-functional Alignment (HR, Finance, IT)', competencyCode: 'CORE-COL', hours: 8, format: 'Workshop' },
  { id: 'TRN-COA-01', code: 'LEAD-COA', name: 'Coaching & Mentoring Skills for People Leaders', competencyCode: 'LEAD-COA', hours: 10, format: 'Instructor-led' }
];

export const INITIAL_SUCCESSION_POSITIONS: SuccessionPosition[] = [
  { id: 1, title: 'HR Analytics Manager (People Analytics)', type: 'Succession', incumbent: 'Pham Thi Hanh', vacancyRisk: 'High', notes: 'Incumbent transitioning to regional role in 12-18 months. Critical backfill needed.' },
  { id: 2, title: 'HR Analytics Manager (HR Operations)', type: 'Succession', incumbent: 'Do Quang Huy', vacancyRisk: 'Medium', notes: 'Requires successor with deep HR operational process and workforce data expertise.' },
  { id: 3, title: 'Senior HR Data Analyst (Core)', type: 'Succession', incumbent: 'Pham Quoc Bao', vacancyRisk: 'Low', notes: 'Backfill needed when Bao is promoted to HR Analytics Manager.' },
  { id: 4, title: 'Head of People Analytics (Enterprise)', type: 'Future', incumbent: 'Planned Role FY2027', vacancyRisk: '-', notes: 'New role planned for enterprise People Analytics center of excellence.' }
];

export const INITIAL_IDP_PLANS: IDPPlan[] = [
  {
    id: 'IDP-2026-014',
    empId: 2, // Tran Minh Khoa
    period: 'Oct 2026 - Mar 2027',
    goal: 'Close Decree 13 data privacy gap and prepare for Senior HR Data Analyst readiness',
    targetRole: 'Senior HR Data Analyst',
    targetDate: '2027-03-31',
    priority: 'High',
    status: 'Approved',
    stage: '',
    hrRequired: true,
    createdDate: '2026-09-22',
    sources: ['Competency Gap Analysis', 'H1/2027 Assessment Results', 'Career Aspiration'],
    baseline: { 'FUNC-HRA-003': 1, 'FUNC-HRA-002': 2, 'CORE-PS': 2 },
    actions: [
      { id: 'a101', area: 'HR Data Privacy & Compliance', code: 'FUNC-HRA-003', item: 'Complete TRN-PRV-01 HR Personal Data Privacy and Decree 13 Compliance', type: 'formal', due: '2026-11-30', owner: 'Tran Minh Khoa', status: 'In Progress', progress: 40 },
      { id: 'a102', area: 'HR Data Privacy & Compliance', code: 'FUNC-HRA-003', item: 'Bi-weekly 1-1 coaching with Pham Quoc Bao: Review Privacy-by-design dashboards', type: 'coach', due: '2026-12-31', owner: 'Pham Quoc Bao', status: 'In Progress', progress: 30 },
      { id: 'a103', area: 'HR Data Privacy & Compliance', code: 'FUNC-HRA-003', item: 'Run a full Privacy Check & RLS audit on monthly attendance dashboards before release', type: 'ojt', due: '2026-10-31', owner: 'Tran Minh Khoa', status: 'Not Started', progress: 0 },
      { id: 'a104', area: 'Workforce Analytics', code: 'FUNC-HRA-002', item: 'Build Q4 attrition risk forecast model in collaboration with senior analyst', type: 'ojt', due: '2026-09-30', owner: 'Tran Minh Khoa', status: 'In Progress', progress: 60 },
      { id: 'a105', area: 'Workforce Analytics', code: 'FUNC-HRA-002', item: 'Attend TRN-WFA-01 Workforce Planning & Predictive Attrition Modeling', type: 'formal', due: '2026-10-05', owner: 'Tran Minh Khoa', status: 'Completed', progress: 100, doneDate: '2026-10-05' },
      { id: 'a106', area: 'Structured Problem Solving', code: 'CORE-PS', item: 'Lead root cause review (5 Whys) on headcount report reconciliation discrepancy', type: 'ojt', due: '2026-12-15', owner: 'Tran Minh Khoa', status: 'Not Started', progress: 0, stretch: true }
    ],
    log: [
      { date: '2026-09-22', who: 'Tran Minh Khoa', event: 'Created IDP draft' },
      { date: '2026-09-23', who: 'Tran Minh Khoa', event: 'Submitted for manager review' },
      { date: '2026-09-25', who: 'Pham Thi Hanh (Manager)', event: 'Manager approved', comment: 'Focus heavily on closing the privacy gap first.' },
      { date: '2026-09-27', who: 'HR Business Partner', event: 'HR approved & plan active', comment: 'Plan approved and currently tracking.' }
    ]
  },
  {
    id: 'IDP-2026-015',
    empId: 4, // Pham Quoc Bao
    period: 'Oct 2026 - Mar 2027',
    goal: 'Develop management and leadership readiness for HR Analytics Manager role',
    targetRole: 'HR Analytics Manager',
    targetDate: '2027-03-31',
    priority: 'High',
    status: 'Approved',
    stage: '',
    hrRequired: true,
    createdDate: '2026-09-24',
    sources: ['Succession Planning Bench', 'Senior Talent Review'],
    baseline: { 'LEAD-COA': 2, 'LEAD-STR': 2 },
    actions: [
      { id: 'a201', area: 'Coaching & Mentoring', code: 'LEAD-COA', item: 'Complete TRN-COA-01 Coaching & Mentoring Skills for Leaders', type: 'formal', due: '2026-11-15', owner: 'Pham Quoc Bao', status: 'In Progress', progress: 50 },
      { id: 'a202', area: 'Coaching & Mentoring', code: 'LEAD-COA', item: 'Mentor junior analyst (Nguyen Thi Lan) on KPI reporting over 3 months', type: 'ojt', due: '2027-01-15', owner: 'Pham Quoc Bao', status: 'In Progress', progress: 30 },
      { id: 'a203', area: 'Strategic Thinking', code: 'LEAD-STR', item: 'Present Q4 People Analytics Strategic Review directly to Executive Leadership', type: 'ojt', due: '2027-02-15', owner: 'Pham Quoc Bao', status: 'Not Started', progress: 0, stretch: true }
    ],
    log: [
      { date: '2026-09-24', who: 'Pham Quoc Bao', event: 'Created succession IDP' },
      { date: '2026-09-26', who: 'Pham Thi Hanh (Manager)', event: 'Manager approved' },
      { date: '2026-09-28', who: 'HR Director', event: 'HR approved succession roadmap' }
    ]
  }
];

export const INITIAL_ASSESSMENT_DATA = {
  cycleName: 'People Analytics Competency Assessment Cycle H1/2027',
  isLocked: true,
  // Employee ID -> Competency Code -> AssessmentRecord
  scores: {
    // 1: Nguyen Thi Lan (Junior)
    '1': {
      'FUNC-DA-001': { self: 2, mg: 2, cal: 0, final: 2, note: 'Produces routine Excel monthly reports confidently.' },
      'FUNC-DA-002': { self: 2, mg: 2, cal: 0, final: 2, note: 'Navigates and filters published dashboards well.' },
      'FUNC-DA-003': { self: 2, mg: 1, cal: 0, final: 1, note: 'Basic syntax understanding, needs coaching.' },
      'FUNC-HRA-001': { self: 2, mg: 2, cal: 0, final: 2, note: 'Accurately computes headcount and turnover formulas.' },
      'FUNC-HRA-002': { self: 1, mg: 1, cal: 0, final: 1, note: 'Learning workforce analytics fundamentals.' },
      'FUNC-HRA-003': { self: 2, mg: 1, cal: 0, final: 1, note: 'Must complete Decree 13 privacy checklist.' },
      'CORE-COM': { self: 2, mg: 2, cal: 0, final: 2 },
      'CORE-PS': { self: 2, mg: 2, cal: 0, final: 2 }
    },
    // 2: Tran Minh Khoa (Mid Analyst)
    '2': {
      'FUNC-DA-001': { self: 3, mg: 3, cal: 0, final: 3, note: 'Strong Power Query and data modeling skills.' },
      'FUNC-DA-002': { self: 3, mg: 3, cal: 0, final: 3, note: 'Clear dashboard designs and advanced DAX measures.' },
      'FUNC-DA-003': { self: 3, mg: 2, cal: 0, final: 2, note: 'Automates payroll reconciliation scripts well.' },
      'FUNC-HRA-001': { self: 3, mg: 3, cal: 0, final: 3, note: 'Well-versed in HR metric dictionary formulas.' },
      'FUNC-HRA-002': { self: 3, mg: 2, cal: 0, final: 2, note: 'Needs senior guidance on multi-factor attrition models.' },
      'FUNC-HRA-003': { 
        self: 3, 
        mg: 1, 
        cal: 0, 
        final: 1, 
        justification: 'Shared published reports with visible compensation and personal details without configuring Row-Level Security, violating Decree 13 protocol.',
        criticalIncident: 'Oct 2026: Exported unmasked employee roster on general channel; caught by HR Compliance and remediated within 24 hours.' 
      },
      'CORE-COM': { self: 3, mg: 3, cal: 0, final: 3 },
      'CORE-PS': { self: 3, mg: 2, cal: 0, final: 2 }
    },
    // 3: Le Hoang Yen (Mid Analyst)
    '3': {
      'FUNC-DA-001': { self: 3, mg: 3, cal: 0, final: 3 },
      'FUNC-DA-002': { self: 4, mg: 4, cal: 0, final: 4, note: 'Certified Power BI Data Analyst Associate.' },
      'FUNC-DA-003': { self: 2, mg: 2, cal: 0, final: 2 },
      'FUNC-HRA-001': { self: 3, mg: 3, cal: 0, final: 3 },
      'FUNC-HRA-002': { self: 3, mg: 2, cal: 0, final: 2 },
      'FUNC-HRA-003': { self: 3, mg: 3, cal: 0, final: 3 },
      'CORE-COM': { self: 4, mg: 4, cal: 0, final: 4 },
      'CORE-PS': { self: 3, mg: 3, cal: 0, final: 3 }
    },
    // 4: Pham Quoc Bao (Senior Analyst)
    '4': {
      'FUNC-DA-001': { self: 4, mg: 4, cal: 0, final: 4 },
      'FUNC-DA-002': { self: 4, mg: 4, cal: 0, final: 4 },
      'FUNC-DA-003': { self: 4, mg: 4, cal: 0, final: 4 },
      'FUNC-HRA-001': { self: 4, mg: 4, cal: 0, final: 4 },
      'FUNC-HRA-002': { self: 4, mg: 3, cal: 0, final: 3, note: 'Attrition risk model undergoing enterprise validation.' },
      'FUNC-HRA-003': { self: 4, mg: 4, cal: 0, final: 4 },
      'CORE-COM': { self: 4, mg: 4, cal: 0, final: 4 },
      'CORE-PS': { self: 4, mg: 4, cal: 0, final: 4 },
      'CORE-COL': { self: 3, mg: 3, cal: 0, final: 3 },
      'LEAD-COA': { self: 3, mg: 2, cal: 0, final: 2, note: 'Taking on junior mentoring assignments.' }
    },
    // 5: Vo Thanh Mai (Senior Analyst)
    '5': {
      'FUNC-DA-001': { self: 4, mg: 4, cal: 0, final: 4 },
      'FUNC-DA-002': { self: 5, mg: 4, cal: 0, final: 4 },
      'FUNC-DA-003': { self: 3, mg: 3, cal: 0, final: 3 },
      'FUNC-HRA-001': { self: 4, mg: 3, cal: 4, final: 4, calibrationReason: 'Calibration committee recognized Mai as primary author of enterprise HR KPI dictionary.' },
      'FUNC-HRA-002': { self: 4, mg: 4, cal: 0, final: 4 },
      'FUNC-HRA-003': { self: 4, mg: 4, cal: 0, final: 4 },
      'CORE-COM': { self: 4, mg: 4, cal: 0, final: 4 },
      'CORE-PS': { self: 4, mg: 4, cal: 0, final: 4 },
      'CORE-COL': { self: 3, mg: 3, cal: 0, final: 3 },
      'LEAD-COA': { self: 3, mg: 3, cal: 0, final: 3 }
    }
  }
};
