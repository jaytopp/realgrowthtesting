"use client";

import { useState, useCallback } from "react";
import { TOTAL_STEPS, isLastStepInPhase, getPhaseForStep } from "./steps";

export interface JourneyState {
  currentStep: number;
  showMilestone: boolean;
  milestonePhase: number | null;
  completedAt: string | null;
}

export function useJourneyState(initialStep = 1) {
  const [state, setState] = useState<JourneyState>({
    currentStep: initialStep,
    showMilestone: false,
    milestonePhase: null,
    completedAt: null,
  });

  const completeStep = useCallback(() => {
    setState((prev) => {
      const isPhaseEnd = isLastStepInPhase(prev.currentStep);
      const phase = getPhaseForStep(prev.currentStep);
      const nextStep = Math.min(prev.currentStep + 1, TOTAL_STEPS + 1);
      const isDone = prev.currentStep >= TOTAL_STEPS;

      if (isPhaseEnd && phase) {
        return {
          ...prev,
          showMilestone: true,
          milestonePhase: phase.number,
        };
      }

      return {
        ...prev,
        currentStep: nextStep,
        completedAt: isDone ? new Date().toISOString() : null,
      };
    });
  }, []);

  const dismissMilestone = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
      showMilestone: false,
      milestonePhase: null,
    }));
  }, []);

  const goToStep = useCallback((stepNum: number) => {
    setState((prev) => {
      if (stepNum >= prev.currentStep) return prev;
      return prev;
    });
  }, []);

  return { state, completeStep, dismissMilestone, goToStep };
}

export function getStepStatus(stepNum: number, currentStep: number): "completed" | "active" | "locked" {
  if (stepNum < currentStep) return "completed";
  if (stepNum === currentStep) return "active";
  return "locked";
}
