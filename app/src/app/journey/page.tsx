"use client";

import { useState } from "react";
import VerticalTower from "@/components/VerticalTower";
import StepContent from "@/components/StepContent";
import MilestoneScreen from "@/components/MilestoneScreen";
import CompletedStepPreview from "@/components/CompletedStepPreview";
import ProgressHeader from "@/components/ProgressHeader";
import { useJourneyState } from "@/lib/journey-state";
import { getStep, TOTAL_STEPS } from "@/lib/steps";

export default function JourneyPage() {
  const { state, completeStep, dismissMilestone } = useJourneyState();
  const [previewStep, setPreviewStep] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentStepData = getStep(state.currentStep);
  const previewStepData = previewStep ? getStep(previewStep) : null;
  const isComplete = state.currentStep > TOTAL_STEPS;

  return (
    <div className="h-screen flex flex-col bg-surface overflow-hidden">
      <ProgressHeader currentStep={state.currentStep} />

      {/* Mobile step indicator bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2 border-b border-border bg-surface-raised">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 text-sm text-text-secondary"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 4h12M2 8h12M2 12h12" />
          </svg>
          View all steps
        </button>
        {currentStepData && (
          <span className="text-xs text-text-muted">
            {currentStepData.phaseName}
          </span>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar — vertical tower */}
        <aside
          className={`
            absolute lg:relative z-30 h-full
            w-64 shrink-0 border-r border-border bg-surface-raised overflow-y-auto
            transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <VerticalTower
            currentStep={state.currentStep}
            onStepClick={(num) => {
              if (num < state.currentStep) {
                setPreviewStep(num);
              }
              setSidebarOpen(false);
            }}
          />
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="absolute inset-0 z-20 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 lg:px-8 py-8">
            {isComplete ? (
              <div className="text-center py-16 animate-fade-in-up">
                <div className="text-6xl mb-6">🏆</div>
                <h1 className="text-3xl font-bold text-text-primary mb-3">Journey Complete</h1>
                <p className="text-text-secondary text-lg mb-8">
                  You&apos;ve built your entire marketing system from the ground up.
                  Book, lead magnet, funnel, emails, and ads — all done.
                </p>
                <button className="px-8 py-3 bg-gold hover:bg-gold-light text-black font-semibold rounded-xl transition-colors">
                  Go to Asset Library
                </button>
              </div>
            ) : currentStepData ? (
              <StepContent
                key={state.currentStep}
                step={currentStepData}
                onComplete={completeStep}
              />
            ) : null}
          </div>
        </main>
      </div>

      {/* Milestone overlay */}
      {state.showMilestone && state.milestonePhase && (
        <MilestoneScreen
          phaseNumber={state.milestonePhase}
          onContinue={dismissMilestone}
        />
      )}

      {/* Completed step preview overlay */}
      {previewStepData && (
        <CompletedStepPreview
          step={previewStepData}
          onClose={() => setPreviewStep(null)}
        />
      )}
    </div>
  );
}
