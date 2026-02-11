"use client";

import { TOTAL_STEPS, getStep, getPhaseForStep } from "@/lib/steps";

interface ProgressHeaderProps {
  currentStep: number;
}

export default function ProgressHeader({ currentStep }: ProgressHeaderProps) {
  const step = getStep(currentStep);
  const phase = getPhaseForStep(currentStep);
  const progress = Math.round(((currentStep - 1) / TOTAL_STEPS) * 100);

  return (
    <header className="h-14 border-b border-border bg-surface/80 backdrop-blur-sm flex items-center px-4 lg:px-6 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mr-6">
        <div className="w-7 h-7 rounded-lg bg-brand flex items-center justify-center">
          <span className="text-white text-xs font-bold">RG</span>
        </div>
        <span className="text-sm font-semibold text-text-primary hidden sm:block">Real Growth</span>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span className="text-xs text-text-muted whitespace-nowrap">
          Step {currentStep > TOTAL_STEPS ? TOTAL_STEPS : currentStep} of {TOTAL_STEPS}
        </span>
        {step && phase && (
          <span className="text-xs text-text-secondary hidden md:block truncate">
            {phase.icon} {step.title}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3 ml-4">
        <div className="w-32 lg:w-48 h-2 bg-surface-hover rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs font-mono text-text-muted w-8 text-right">{progress}%</span>
      </div>
    </header>
  );
}
