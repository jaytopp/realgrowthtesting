"use client";

import { PHASES, type Phase, type Step } from "@/lib/steps";
import { getStepStatus } from "@/lib/journey-state";

interface VerticalTowerProps {
  currentStep: number;
  onStepClick: (stepNum: number) => void;
}

function StepIcon({ status }: { status: "completed" | "active" | "locked" }) {
  if (status === "completed") {
    return (
      <div className="w-7 h-7 rounded-full bg-success flex items-center justify-center shrink-0">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }
  if (status === "active") {
    return (
      <div className="w-7 h-7 rounded-full bg-brand pulse-active flex items-center justify-center shrink-0">
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full bg-surface-hover border border-border flex items-center justify-center shrink-0">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <rect x="3.5" y="1" width="5" height="7" rx="2.5" stroke="#6b6b80" strokeWidth="1.2" />
        <rect x="2" y="6" width="8" height="5" rx="1" stroke="#6b6b80" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

function StepRow({ step, status, onClick }: { step: Step; status: "completed" | "active" | "locked"; onClick: () => void }) {
  const isClickable = status === "completed";

  return (
    <button
      onClick={isClickable ? onClick : undefined}
      className={`
        flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-all duration-200
        ${status === "active" ? "bg-brand/10 border border-brand/30" : ""}
        ${status === "completed" ? "hover:bg-surface-hover cursor-pointer" : ""}
        ${status === "locked" ? "cursor-default opacity-50" : ""}
      `}
    >
      <StepIcon status={status} />
      <div className="min-w-0 flex-1">
        <div className={`text-sm font-medium truncate ${
          status === "active" ? "text-brand-light" :
          status === "completed" ? "text-text-primary" :
          "text-text-muted"
        }`}>
          <span className="text-xs text-text-muted mr-1.5">{step.number}</span>
          {step.shortTitle}
        </div>
      </div>
    </button>
  );
}

function PhaseHeader({ phase, currentStep }: { phase: Phase; currentStep: number }) {
  const firstStep = phase.steps[0].number;
  const lastStep = phase.steps[phase.steps.length - 1].number;
  const isCompleted = currentStep > lastStep;
  const isActive = currentStep >= firstStep && currentStep <= lastStep;

  return (
    <div className={`
      flex items-center gap-2 px-3 py-2 mt-1
      ${isCompleted ? "text-success" : isActive ? "text-brand-light" : "text-text-muted"}
    `}>
      <span className="text-xs">{phase.icon}</span>
      <span className="text-[11px] font-semibold uppercase tracking-wider">{phase.name}</span>
      {isCompleted && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-auto">
          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

function PhaseConnector() {
  return <div className="w-px h-2 bg-border mx-auto my-0.5" />;
}

export default function VerticalTower({ currentStep, onStepClick }: VerticalTowerProps) {
  return (
    <div className="flex flex-col py-3 px-2">
      {PHASES.map((phase, pi) => (
        <div key={phase.number}>
          {pi > 0 && <PhaseConnector />}
          <PhaseHeader phase={phase} currentStep={currentStep} />
          <div className="flex flex-col gap-0.5 ml-1">
            {/* Vertical line connector */}
            {phase.steps.map((step) => {
              const status = getStepStatus(step.number, currentStep);
              return (
                <StepRow
                  key={step.number}
                  step={step}
                  status={status}
                  onClick={() => onStepClick(step.number)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
