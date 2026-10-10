import React, { useEffect } from 'react';
import { TalentProvider, useTalent } from './context/TalentContext';
import { SidebarNav } from './components/talent/SidebarNav';
import { TopHeader } from './components/talent/TopHeader';
import { OrgPlanningView } from './components/talent/views/OrgPlanningView';
import { CompetencyDictionaryView } from './components/talent/views/CompetencyDictionaryView';
import { ProficiencyScalesView } from './components/talent/views/ProficiencyScalesView';
import { RoleMatrixView } from './components/talent/views/RoleMatrixView';
import { AssessmentCycleView } from './components/talent/views/AssessmentCycleView';
import { CompetencyGapView } from './components/talent/views/CompetencyGapView';
import { IDPView } from './components/talent/views/IDPView';
import { LndManagementViews } from './components/talent/views/LndManagementViews';
import { PerformanceSuccessionViews } from './components/talent/views/PerformanceSuccessionViews';
import { ExecutiveDashboardView } from './components/talent/views/ExecutiveDashboardView';
import { POArchitectureView } from './components/talent/views/POArchitectureView';
import { PerformanceEvaluationView } from './components/talent/views/PerformanceEvaluationView';
import { TrainingPlanningView } from './components/talent/views/TrainingPlanningView';
import { ReadinessSixMonths } from './components/talent/views/ReadinessSixMonths';
import { PrintReportModal } from './components/talent/views/PrintReportModal';
import { DownloadHtmlModal } from './components/talent/views/DownloadHtmlModal';

function MainPlatform() {
  const { currentModule, darkMode } = useTalent();

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.dataset.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.dataset.theme = 'light';
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[#f3f2ef] dark:bg-[#1c1e1f] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors selection:bg-amber-500 selection:text-white">
      {/* Top Bar */}
      <TopHeader />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Sidebar Nav */}
        <SidebarNav />

        {/* Dynamic Module Content View */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {(currentModule === 65 || currentModule === 66) && (
            <OrgPlanningView />
          )}

          {currentModule === 52 && (
            <CompetencyDictionaryView />
          )}

          {currentModule === 53 && (
            <ProficiencyScalesView />
          )}

          {currentModule === 56 && (
            <RoleMatrixView />
          )}

          {currentModule === 54 && (
            <AssessmentCycleView />
          )}

          {currentModule === 55 && (
            <CompetencyGapView />
          )}

          {currentModule === 57 && (
            <IDPView />
          )}

          {(currentModule === 58 || currentModule === 59 || currentModule === 60) && (
            <LndManagementViews />
          )}

          {(currentModule === 61 || currentModule === 62 || currentModule === 63) && (
            <PerformanceSuccessionViews />
          )}

          {currentModule === 64 && (<><ReadinessSixMonths /><ExecutiveDashboardView /></>)}
          {currentModule === 70 && <PerformanceEvaluationView />}
          {currentModule === 71 && <TrainingPlanningView />}

          {currentModule === 99 && (
            <POArchitectureView />
          )}
        </main>
      </div>

      {/* Printable Report Modal */}
      <PrintReportModal />

      {/* Standalone Offline HTML Export Modal */}
      <DownloadHtmlModal />
    </div>
  );
}

export default function App() {
  return (
    <TalentProvider>
      <MainPlatform />
    </TalentProvider>
  );
}
