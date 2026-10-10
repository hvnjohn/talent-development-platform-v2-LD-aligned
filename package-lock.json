/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState } from 'react';
import { 
  Employee, CompetencyNode, ProficiencyLevel, RoleMatrix, 
  IDPPlan, CourseTraining, TrainingEnrollment, TrainingSession,
  SuccessionPosition, RoleCompetencyItem, IDPAction
} from '../types/talent';
import { 
  INITIAL_EMPLOYEES, INITIAL_COMPETENCY_NODES, INITIAL_PROFICIENCY_LEVELS,
  INITIAL_ROLE_MATRICES, INITIAL_ASSESSMENT_DATA, INITIAL_TRAINING_CATALOG,
  INITIAL_SUCCESSION_POSITIONS, INITIAL_IDP_PLANS
} from '../data/hrAnalyticsData';

// Observable behaviors dictionary mapped by competency code and level index (0-4)
const INITIAL_BEHAVIOR_DICT: Record<string, string[][]> = {
  'FUNC-HRA-003': [
    ['Identify defined categories of sensitive employee personal data (compensation, health, identification numbers)', 'Share human resources datasets strictly with verified, authorized business stakeholders', 'Immediately report suspected unauthorized data disclosures or anomaly exports to Data Owners'],
    ['Apply automated data masking or aggregation before distributing periodic workforce management reports', 'Configure and maintain file and folder permissions based on departmental job titles and security clearance', 'Pass mandatory annual enterprise data protection and privacy compliance examinations'],
    ['Incorporate Decree 13 and corporate privacy standards into the design specifications of all new analytics assets', 'Execute mandatory Pre-Release Privacy Check audits before deploying analytical workspaces to line managers', 'Maintain lineage documentation recording data source origins, processing purpose, and retention timelines'],
    ['Architect enterprise Privacy-by-Design structures and configure Row-Level Security (RLS) across corporate workspaces', 'Conduct formal peer reviews to audit data privacy risks and governance compliance in cross-functional analytical models', 'Collaborate with Legal, Internal Audit, and Cybersecurity to process employee data subject requests'],
    ['Establish the corporate People Data Governance Framework and enterprise data classification standards', 'Represent Human Resources in corporate information security assessments and statutory regulatory audits', 'Certify and train internal analytics practitioners on global and local personal data protection standards']
  ],
  'FUNC-HRA-002': [
    ['Define foundational workforce metrics including authorized headcount, voluntary turnover, and net recruitment capacity', 'Interpret standardized divisional workforce distribution and variance reports'],
    ['Compile monthly workforce movement and attrition variance reports across business units and grades', 'Segment historical turnover rates by tenure cohort, performance tier, and exit reason taxonomy'],
    ['Perform multivariate attrition root cause analysis synthesizing exit interviews and engagement survey sentiment', 'Forecast quarterly headcount requirements using historical run-rates and time-series models'],
    ['Engineer and validate predictive employee attrition risk algorithms utilizing Machine Learning classification models', 'Conduct scenario analyses evaluating the financial impact of voluntary turnover on recruitment and compensation budgets'],
    ['Formulate the enterprise strategic workforce planning model integrating HR, Finance, and commercial pipeline projections', 'Deliver strategic talent risk advisories and demographic risk models directly to the Board of Directors']
  ],
  'FUNC-DA-002': [
    ['Navigate, filter, and extract data from published business intelligence dashboards following standard operational guidelines', 'Select effective chart representations (bar, stacked, line, scatter) aligned with data communication goals'],
    ['Connect to clean relational data models and build multi-visual interactive reports with slicers and page filters', 'Author standard DAX aggregation metrics (SUM, COUNT, DIVIDE, basic filtering)'],
    ['Architect normalized star-schema data models establishing 1-to-many relationships and managing inactive relationships', 'Author complex context-aware DAX expressions (CALCULATE, Time Intelligence, FILTER, KEEPFILTERS)', 'Design and validate robust Row-Level Security (RLS) roles and test permission boundaries'],
    ['Tune dataset performance utilizing DAX Studio, query plans, aggregations, and incremental refresh policies', 'Administer Power BI Service tenant workspaces, automated gateway pipelines, and scheduled refresh frequencies'],
    ['Architect corporate semantic layers and certified dataset standards for federated self-service enterprise BI', 'Establish corporate data visualization standards and lead formal report certification and governance boards']
  ]
};

interface TalentContextType {
  // Navigation & Theme
  currentModule: number;
  setCurrentModule: (mod: number) => void;
  selectedEmpId: number;
  setSelectedEmpId: (id: number) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  openPrintModal: boolean;
  setOpenPrintModal: (v: boolean) => void;
  openHtmlModal: boolean;
  setOpenHtmlModal: (v: boolean) => void;

  // Domain Entities
  employees: Employee[];
  competencies: CompetencyNode[];
  proficiencyLevels: ProficiencyLevel[];
  roleMatrices: RoleMatrix[];
  assessmentData: typeof INITIAL_ASSESSMENT_DATA;
  idpPlans: IDPPlan[];
  trainingCatalog: CourseTraining[];
  trainingEnrollments: TrainingEnrollment[];
  trainingSessions: TrainingSession[];
  successionPositions: SuccessionPosition[];

  // Skill Level Adjustments (Validated skill lifts)
  skillAdjustments: Record<string, number>; // key: "empId|competencyCode" -> level

  // Reactive Actions (Function Cross-Links)
  getCompetencyLevel: (empId: number, code: string) => number;
  getRoleMatrixForEmployee: (emp: Employee) => RoleMatrix | undefined;
  calculateGap: (empId: number, code: string) => { current: number; target: number; gap: number; imp: string; req: boolean };
  calculateCompetencyFit: (emp: Employee, targetRoleName: string) => number;
  calculatePromotionReadiness: (emp: Employee) => { score: number; category: string; breakdown: { label: string; value: number; weight: number }[] };
  
  // Full Cross-Link CRUD & Mutator Operations
  addCompetency: (node: Omit<CompetencyNode, 'id'>) => CompetencyNode;
  updateCompetency: (id: number, data: Partial<CompetencyNode>) => void;
  deleteCompetency: (id: number) => void;
  
  behaviorDictionary: Record<string, string[][]>;
  addBehaviorIndicator: (compCode: string, levelIdx: number, text: string) => void;
  
  addRoleCompetencyItem: (roleId: string, item: RoleCompetencyItem) => void;
  updateRoleCompetencyItem: (roleId: string, compCode: string, target: number, imp: 'Critical' | 'High' | 'Medium' | 'Low', req: boolean) => void;
  removeRoleCompetencyItem: (roleId: string, compCode: string) => void;
  
  addIDPAction: (planId: string, action: Omit<IDPAction, 'id'>) => void;
  deleteIDPAction: (planId: string, actionId: string) => void;
  updateIDPActionProgress: (planId: string, actionId: string, progress: number) => void;

  updateAssessmentScore: (empId: number, compCode: string, self: number, mg: number, note?: string, justification?: string) => void;
  lockAssessmentCycle: () => void;

  addTrainingSession: (session: Omit<TrainingSession, 'id'>) => void;
  enrollEmployeeInTraining: (empId: number, courseId: string) => void;
  validateSkillLiftFromTraining: (empId: number, compCode: string) => void;

  calibrate9Box: (empId: number, perf: number, pot: number, reason?: string) => void;
  addPromotionNomination: (empId: number, targetRole: string) => void;
  nominations: { empId: number; targetRole: string; status: 'Submitted' | 'Manager Endorsed' | 'HR Approved' }[];
  advanceNomination: (empId: number) => void;

  queueGapToIDP: (empId: number, code: string, actionType: 'course' | 'coach' | 'ojt', description: string) => void;
}

const TalentContext = createContext<TalentContextType | undefined>(undefined);

export const TalentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentModule, setCurrentModule] = useState<number>(55); // Default to Identify Gaps / Dashboard
  const [selectedEmpId, setSelectedEmpId] = useState<number>(2); // Tran Minh Khoa default
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [openPrintModal, setOpenPrintModal] = useState<boolean>(false);
  const [openHtmlModal, setOpenHtmlModal] = useState<boolean>(false);

  // Entities
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [competencies, setCompetencies] = useState<CompetencyNode[]>(INITIAL_COMPETENCY_NODES);
  const [proficiencyLevels, setProficiencyLevels] = useState<ProficiencyLevel[]>(INITIAL_PROFICIENCY_LEVELS);
  const [roleMatrices, setRoleMatrices] = useState<RoleMatrix[]>(INITIAL_ROLE_MATRICES);
  const [assessmentData, setAssessmentData] = useState(INITIAL_ASSESSMENT_DATA);
  const [idpPlans, setIdpPlans] = useState<IDPPlan[]>(INITIAL_IDP_PLANS);
  const [trainingCatalog] = useState<CourseTraining[]>(INITIAL_TRAINING_CATALOG);
  const [successionPositions] = useState<SuccessionPosition[]>(INITIAL_SUCCESSION_POSITIONS);

  // Behavior Dictionary
  const [behaviorDictionary, setBehaviorDictionary] = useState<Record<string, string[][]>>(INITIAL_BEHAVIOR_DICT);

  // Training enrollments with Kirkpatrick scores
  const [trainingEnrollments, setTrainingEnrollments] = useState<TrainingEnrollment[]>([
    { id: 'E-01', empId: 2, courseId: 'TRN-PRV-01', source: 'IDP-2026-014', dueDate: '2026-11-30', progress: 40, status: 'In Progress', preTestScore: 45, postTestScore: 0, reactionScore: 4.5, behaviorScore: 3 },
    { id: 'E-02', empId: 2, courseId: 'TRN-WFA-01', source: 'IDP-2026-014', dueDate: '2026-10-05', progress: 100, status: 'Completed', completedDate: '2026-10-05', preTestScore: 50, postTestScore: 82, reactionScore: 4.8, behaviorScore: 4, validatedLevelLift: true },
    { id: 'E-03', empId: 1, courseId: 'TRN-XL-01', source: 'Manager Assigned', dueDate: '2026-10-31', progress: 75, status: 'In Progress', preTestScore: 40, postTestScore: 0, reactionScore: 4.2, behaviorScore: 3 },
    { id: 'E-04', empId: 4, courseId: 'TRN-COA-01', source: 'IDP-2026-015', dueDate: '2026-11-15', progress: 50, status: 'In Progress', preTestScore: 55, postTestScore: 0, reactionScore: 4.7, behaviorScore: 4 },
    { id: 'E-05', empId: 5, courseId: 'TRN-HRM-01', source: 'SME Certification', dueDate: '2026-08-20', progress: 100, status: 'Completed', completedDate: '2026-08-20', preTestScore: 60, postTestScore: 92, reactionScore: 4.9, behaviorScore: 5, validatedLevelLift: true }
  ]);

  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([
    { id: 'S-01', courseId: 'TRN-PRV-01', date: '2026-10-21', location: 'Training Room 2 / Hybrid', trainer: 'Chief Legal & Privacy Officer', totalSeats: 25, bookedSeats: 18 },
    { id: 'S-02', courseId: 'TRN-WFA-01', date: '2026-11-05', location: 'MS Teams Virtual Lab', trainer: 'Pham Quoc Bao (Senior Analyst)', totalSeats: 30, bookedSeats: 24 },
    { id: 'S-03', courseId: 'TRN-COA-01', date: '2026-11-12', location: 'Executive Seminar Hall 5th Floor', trainer: 'Global Leadership Executive Coach', totalSeats: 15, bookedSeats: 12 }
  ]);

  // Skill adjustments: key "empId|code" -> level override
  const [skillAdjustments, setSkillAdjustments] = useState<Record<string, number>>({});

  // 9-Box Calibration overrides: empId -> { perf, pot, reason }
  const [nineBoxOverrides, setNineBoxOverrides] = useState<Record<number, { perf: number; pot: number; reason: string }>>({});

  // Promotion nominations
  const [nominations, setNominations] = useState<{ empId: number; targetRole: string; status: 'Submitted' | 'Manager Endorsed' | 'HR Approved' }[]>([
    { empId: 3, targetRole: 'Senior HR Data Analyst', status: 'Manager Endorsed' }
  ]);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Helper: Retrieve validated competency level (combines baseline assessment + validated training lifts)
  const getCompetencyLevel = (empId: number, code: string): number => {
    const key = `${empId}|${code}`;
    if (skillAdjustments[key] !== undefined) {
      return skillAdjustments[key];
    }
    const empScores = (assessmentData.scores as any)[String(empId)];
    if (empScores && empScores[code]) {
      return empScores[code].final || empScores[code].mg || empScores[code].self || 0;
    }
    return 1;
  };

  // Helper: Get role matrix
  const getRoleMatrixForEmployee = (emp: Employee): RoleMatrix | undefined => {
    return roleMatrices.find(r => r.name.toLowerCase() === emp.role.toLowerCase());
  };

  // Helper: Calculate gap against employee's current role
  const calculateGap = (empId: number, code: string) => {
    const emp = employees.find(e => e.id === empId);
    if (!emp) return { current: 0, target: 0, gap: 0, imp: 'Medium', req: true };
    const matrix = getRoleMatrixForEmployee(emp);
    const item = matrix?.items.find(i => i.code === code);
    const target = item?.target || 3;
    const current = getCompetencyLevel(empId, code);
    return {
      current,
      target,
      gap: target - current,
      imp: item?.imp || 'Medium',
      req: item?.req ?? true
    };
  };

  // Helper: Calculate Competency Fit % against any target role
  const calculateCompetencyFit = (emp: Employee, targetRoleName: string): number => {
    const targetMatrix = roleMatrices.find(r => r.name.toLowerCase() === targetRoleName.toLowerCase());
    if (!targetMatrix || !targetMatrix.items.length) return 0.5;

    const weights: Record<string, number> = { Critical: 4, High: 3, Medium: 2, Low: 1 };
    let totalScore = 0;
    let totalWeight = 0;

    targetMatrix.items.filter(i => i.req).forEach(item => {
      const w = weights[item.imp] || 2;
      const currentLevel = getCompetencyLevel(emp.id, item.code);
      const ratio = Math.min(1, currentLevel / item.target);
      totalScore += ratio * w;
      totalWeight += w;
    });

    return totalWeight > 0 ? totalScore / totalWeight : 0.5;
  };

  // Helper: Promotion Readiness (Weighted formula)
  const calculatePromotionReadiness = (emp: Employee) => {
    const compFit = calculateCompetencyFit(emp, emp.targetRole);
    const latestPerf = (emp.performanceRatings[emp.performanceRatings.length - 1] || 3) / 5;
    
    // Learning completion %
    const empEnrollments = trainingEnrollments.filter(e => e.empId === emp.id);
    const lrnRate = empEnrollments.length 
      ? empEnrollments.filter(e => e.status === 'Completed').length / empEnrollments.length 
      : 0.6;
    
    // Tenure requirement: 2 yrs for Mid, 4 yrs for Senior, 6 yrs for Manager
    const targetReqYears = emp.targetRole.includes('Senior') ? 4 : emp.targetRole.includes('Manager') ? 6 : 2;
    const tenureScore = Math.min(1, emp.tenureYears / targetReqYears);

    // Certifications
    const certScore = Math.min(1, emp.certs.length / (emp.targetRole.includes('Manager') ? 2 : 1));

    // Manager endorsement
    const mgrScore = emp.managerRecommendation / 5;

    const breakdown = [
      { label: 'Competency Fit & Target Alignment', value: Math.round(compFit * 100), weight: 0.40 },
      { label: 'Performance Rating History', value: Math.round(latestPerf * 100), weight: 0.20 },
      { label: 'L&D / Training Completion Rate', value: Math.round(lrnRate * 100), weight: 0.15 },
      { label: 'Tenure & Hands-on Experience', value: Math.round(tenureScore * 100), weight: 0.10 },
      { label: 'Industry & Professional Certifications', value: Math.round(certScore * 100), weight: 0.05 },
      { label: 'People Manager Endorsement', value: Math.round(mgrScore * 100), weight: 0.10 }
    ];

    const score = Math.round(breakdown.reduce((sum, item) => sum + item.value * item.weight, 0));
    const category = score >= 85 ? 'Ready Now' : score >= 65 ? 'Ready Soon' : 'Future Ready';

    return { score, category, breakdown };
  };

  // Mutator: Add Competency Node
  const addCompetency = (node: Omit<CompetencyNode, 'id'>): CompetencyNode => {
    const newId = Date.now();
    const newNode: CompetencyNode = { ...node, id: newId };
    setCompetencies(prev => [...prev, newNode]);
    return newNode;
  };

  // Mutator: Update Competency Node
  const updateCompetency = (id: number, data: Partial<CompetencyNode>) => {
    setCompetencies(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  };

  // Mutator: Delete Competency Node
  const deleteCompetency = (id: number) => {
    setCompetencies(prev => prev.filter(c => c.id !== id && c.parent !== id));
  };

  // Mutator: Add Observable Behavior Indicator
  const addBehaviorIndicator = (compCode: string, levelIdx: number, text: string) => {
    setBehaviorDictionary(prev => {
      const existing = prev[compCode] ? [...prev[compCode].map(arr => [...arr])] : [[], [], [], [], []];
      while (existing.length < 5) existing.push([]);
      existing[levelIdx].push(text);
      return { ...prev, [compCode]: existing };
    });
  };

  // Mutator: Add item to Role Competency Matrix
  const addRoleCompetencyItem = (roleId: string, item: RoleCompetencyItem) => {
    setRoleMatrices(prev => prev.map(m => {
      if (m.id !== roleId) return m;
      const existingIdx = m.items.findIndex(i => i.code === item.code);
      const newItems = existingIdx >= 0 
        ? m.items.map((i, idx) => idx === existingIdx ? item : i)
        : [...m.items, item];
      return { ...m, items: newItems, updated: '2026-10-10' };
    }));
  };

  // Mutator: Update item in Role Competency Matrix
  const updateRoleCompetencyItem = (roleId: string, compCode: string, target: number, imp: 'Critical' | 'High' | 'Medium' | 'Low', req: boolean) => {
    setRoleMatrices(prev => prev.map(m => {
      if (m.id !== roleId) return m;
      return {
        ...m,
        updated: '2026-10-10',
        items: m.items.map(i => i.code === compCode ? { ...i, target, imp, req } : i)
      };
    }));
  };

  // Mutator: Remove item from Role Competency Matrix
  const removeRoleCompetencyItem = (roleId: string, compCode: string) => {
    setRoleMatrices(prev => prev.map(m => {
      if (m.id !== roleId) return m;
      return { ...m, items: m.items.filter(i => i.code !== compCode), updated: '2026-10-10' };
    }));
  };

  // Mutator: Add IDP Action Item
  const addIDPAction = (planId: string, action: Omit<IDPAction, 'id'>) => {
    const newAction: IDPAction = { ...action, id: `act-${Date.now()}` };
    setIdpPlans(prev => prev.map(p => p.id === planId ? { ...p, actions: [...p.actions, newAction] } : p));
  };

  // Mutator: Delete IDP Action Item
  const deleteIDPAction = (planId: string, actionId: string) => {
    setIdpPlans(prev => prev.map(p => p.id === planId ? { ...p, actions: p.actions.filter(a => a.id !== actionId) } : p));
  };

  // Mutator: Update Assessment Rating Score
  const updateAssessmentScore = (empId: number, compCode: string, self: number, mg: number, note?: string, justification?: string) => {
    setAssessmentData(prev => {
      const empKey = String(empId);
      const curEmpScores = (prev.scores as any)[empKey] || {};
      const updatedItem = {
        ...curEmpScores[compCode],
        self,
        mg,
        final: mg,
        note: note ?? curEmpScores[compCode]?.note,
        justification: justification ?? curEmpScores[compCode]?.justification
      };
      return {
        ...prev,
        scores: {
          ...prev.scores,
          [empKey]: {
            ...curEmpScores,
            [compCode]: updatedItem
          }
        }
      };
    });
  };

  // Mutator: Add Training Session
  const addTrainingSession = (session: Omit<TrainingSession, 'id'>) => {
    const newSession: TrainingSession = { ...session, id: `S-${Date.now().toString().slice(-4)}` };
    setTrainingSessions(prev => [...prev, newSession]);
  };

  // Mutator: Enroll Employee in Training Course
  const enrollEmployeeInTraining = (empId: number, courseId: string) => {
    setTrainingEnrollments(prev => {
      const exists = prev.find(e => e.empId === empId && e.courseId === courseId);
      if (exists) return prev;
      const newEnrollment: TrainingEnrollment = {
        id: `E-${Date.now().toString().slice(-4)}`,
        empId,
        courseId,
        source: 'Self / Manager Assigned',
        dueDate: '2026-12-31',
        progress: 0,
        status: 'Assigned',
        preTestScore: 40,
        postTestScore: 0,
        reactionScore: 4.5,
        behaviorScore: 3
      };
      return [...prev, newEnrollment];
    });
  };

  // Action: Lock assessment cycle and trigger gap updates
  const lockAssessmentCycle = () => {
    setAssessmentData(prev => ({
      ...prev,
      isLocked: true
    }));
  };

  // Action: Add gap action into employee's IDP queue
  const queueGapToIDP = (empId: number, code: string, actionType: 'course' | 'coach' | 'ojt', description: string) => {
    setIdpPlans(prevPlans => {
      const plan = prevPlans.find(p => p.empId === empId && p.status === 'Approved') || prevPlans.find(p => p.empId === empId);
      if (!plan) return prevPlans;

      const comp = competencies.find(c => c.code === code);
      const newAction: IDPAction = {
        id: `act-${Date.now()}`,
        area: comp ? comp.name : code,
        code,
        item: description,
        type: actionType === 'course' ? 'formal' : actionType,
        due: '2026-12-31',
        owner: employees.find(e => e.id === empId)?.name || 'Learner',
        status: 'Not Started',
        progress: 0
      };

      return prevPlans.map(p => p.id === plan.id ? { ...p, actions: [...p.actions, newAction] } : p);
    });
  };

  // Action: Update IDP action progress and sync training enrollment
  const updateIDPActionProgress = (planId: string, actionId: string, progress: number) => {
    setIdpPlans(prev => prev.map(p => {
      if (p.id !== planId) return p;
      return {
        ...p,
        actions: p.actions.map(a => {
          if (a.id !== actionId) return a;
          const status = progress >= 100 ? 'Completed' : progress > 0 ? 'In Progress' : 'Not Started';
          return { ...a, progress, status, doneDate: progress >= 100 ? '2026-10-09' : undefined };
        })
      };
    }));
  };

  // Action: Kirkpatrick effective validation lifts skill level by +1!
  const validateSkillLiftFromTraining = (empId: number, compCode: string) => {
    const current = getCompetencyLevel(empId, compCode);
    const newLevel = Math.min(5, current + 1);
    setSkillAdjustments(prev => ({
      ...prev,
      [`${empId}|${compCode}`]: newLevel
    }));

    // Mark enrollment as validated
    setTrainingEnrollments(prev => prev.map(e => {
      const course = trainingCatalog.find(c => c.id === e.courseId);
      if (e.empId === empId && course?.competencyCode === compCode) {
        return { ...e, validatedLevelLift: true };
      }
      return e;
    }));
  };

  // Action: Calibrate 9-Box
  const calibrate9Box = (empId: number, perf: number, pot: number, reason?: string) => {
    setNineBoxOverrides(prev => ({
      ...prev,
      [empId]: { perf, pot, reason: reason || 'Talent Committee consensus' }
    }));
    setEmployees(prev => prev.map(e => e.id === empId ? { ...e, potentialRating: pot } : e));
  };

  // Action: Add promotion nomination
  const addPromotionNomination = (empId: number, targetRole: string) => {
    setNominations(prev => [...prev.filter(n => n.empId !== empId), { empId, targetRole, status: 'Submitted' }]);
  };

  const advanceNomination = (empId: number) => {
    setNominations(prev => prev.map(n => {
      if (n.empId !== empId) return n;
      const nextStatus = n.status === 'Submitted' ? 'Manager Endorsed' : 'HR Approved';
      return { ...n, status: nextStatus };
    }));
  };

  return (
    <TalentContext.Provider
      value={{
        currentModule,
        setCurrentModule,
        selectedEmpId,
        setSelectedEmpId,
        darkMode,
        toggleDarkMode,
        openPrintModal,
        setOpenPrintModal,
        openHtmlModal,
        setOpenHtmlModal,

        employees,
        competencies,
        proficiencyLevels,
        roleMatrices,
        assessmentData,
        idpPlans,
        trainingCatalog,
        trainingEnrollments,
        trainingSessions,
        successionPositions,

        skillAdjustments,

        getCompetencyLevel,
        getRoleMatrixForEmployee,
        calculateGap,
        calculateCompetencyFit,
        calculatePromotionReadiness,

        addCompetency,
        updateCompetency,
        deleteCompetency,

        behaviorDictionary,
        addBehaviorIndicator,

        addRoleCompetencyItem,
        updateRoleCompetencyItem,
        removeRoleCompetencyItem,

        addIDPAction,
        deleteIDPAction,
        updateIDPActionProgress,

        updateAssessmentScore,
        lockAssessmentCycle,

        addTrainingSession,
        enrollEmployeeInTraining,
        validateSkillLiftFromTraining,

        calibrate9Box,
        addPromotionNomination,
        nominations,
        advanceNomination,

        queueGapToIDP
      }}
    >
      {children}
    </TalentContext.Provider>
  );
};

export const useTalent = () => {
  const context = useContext(TalentContext);
  if (!context) {
    throw new Error('useTalent must be used within a TalentProvider');
  }
  return context;
};
