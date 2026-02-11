"use client";

import { type Step } from "@/lib/steps";

interface CompletedStepPreviewProps {
  step: Step;
  onClose: () => void;
}

export default function CompletedStepPreview({ step, onClose }: CompletedStepPreviewProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-surface/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative max-w-lg w-full mx-4 bg-surface-raised border border-border rounded-2xl p-6 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-surface hover:bg-surface-hover border border-border flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <span className="text-xs text-text-muted">Step {step.number} — Completed</span>
            <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
          </div>
        </div>

        <div className="bg-surface rounded-xl p-4 border border-border">
          <div className="space-y-2">
            <div className="h-2 w-3/4 bg-border rounded" />
            <div className="h-2 w-full bg-border rounded" />
            <div className="h-2 w-5/6 bg-border rounded" />
            <div className="h-2 w-2/3 bg-border rounded" />
            <div className="h-8" />
            <div className="h-2 w-full bg-border rounded" />
            <div className="h-2 w-4/5 bg-border rounded" />
            <div className="h-2 w-3/4 bg-border rounded" />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-text-muted">Read-only preview</span>
          <button className="text-xs text-brand-light hover:text-brand underline">
            Request Revision
          </button>
        </div>
      </div>
    </div>
  );
}
