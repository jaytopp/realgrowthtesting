"use client";

import { useEffect, useState } from "react";
import { PHASES } from "@/lib/steps";

interface MilestoneScreenProps {
  phaseNumber: number;
  onContinue: () => void;
}

function ConfettiPiece({ delay, left, color }: { delay: number; left: number; color: string }) {
  return (
    <div
      className="absolute w-2 h-2 rounded-sm"
      style={{
        left: `${left}%`,
        top: "-10px",
        backgroundColor: color,
        animation: `confetti-fall ${2 + Math.random() * 2}s ease-in ${delay}s forwards`,
      }}
    />
  );
}

export default function MilestoneScreen({ phaseNumber, onContinue }: MilestoneScreenProps) {
  const [show, setShow] = useState(false);
  const phase = PHASES.find((p) => p.number === phaseNumber);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!phase) return null;

  const isFinal = phaseNumber === 7;
  const nextPhase = PHASES.find((p) => p.number === phaseNumber + 1);
  const confettiColors = ["#6d28d9", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899", "#06b6d4", "#f97316"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface/90 backdrop-blur-sm">
      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <ConfettiPiece
            key={i}
            delay={Math.random() * 0.5}
            left={Math.random() * 100}
            color={confettiColors[i % confettiColors.length]}
          />
        ))}
      </div>

      {/* Card */}
      <div className={`relative max-w-md w-full mx-4 transition-all duration-700 ${show ? "animate-scale-in" : "opacity-0"}`}>
        <div className="bg-surface-raised border border-border rounded-3xl p-8 text-center shadow-2xl">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-brand/10 flex items-center justify-center text-4xl">
            {isFinal ? "🏆" : phase.icon}
          </div>

          {/* Phase Complete */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-success/10 text-success text-xs font-semibold mb-4">
            Phase {phase.number} Complete
          </div>

          {/* Message */}
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {phase.milestone}
          </h2>

          {/* Asset badge */}
          <p className="text-text-secondary mb-6">
            {isFinal ? (
              "Every asset, every page, every email. Your entire marketing system is ready to deploy."
            ) : (
              <>You&apos;ve unlocked your <span className="text-brand-light font-semibold">{phase.milestoneAsset}</span>.</>
            )}
          </p>

          {/* Steps completed summary */}
          <div className="bg-surface rounded-xl p-4 mb-6 border border-border">
            <div className="text-xs text-text-muted mb-2">Assets built in this phase:</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {phase.steps.map((step) => (
                <span key={step.number} className="inline-flex items-center px-2.5 py-1 rounded-lg bg-success/10 text-success text-xs">
                  ✓ {step.shortTitle}
                </span>
              ))}
            </div>
          </div>

          {/* Continue button */}
          <button
            onClick={onContinue}
            className={`
              w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200
              ${isFinal
                ? "bg-gold hover:bg-gold-light text-black"
                : "bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/20"
              }
            `}
          >
            {isFinal
              ? "View Your Complete System"
              : `Start Phase ${nextPhase?.number}: ${nextPhase?.name} →`
            }
          </button>
        </div>
      </div>
    </div>
  );
}
