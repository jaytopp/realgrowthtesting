"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4">
      <div className="max-w-xl text-center">
        {/* Logo */}
        <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-brand flex items-center justify-center">
          <span className="text-white text-2xl font-bold">RG</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-4 leading-tight">
          Build Your Marketing System in{" "}
          <span className="text-brand-light">33 Steps</span>
        </h1>

        <p className="text-lg text-text-secondary mb-8 leading-relaxed">
          From blank page to fully built marketing machine. Write your book, create your lead magnet,
          build your funnel, craft your emails, and launch your ads — one step at a time.
        </p>

        {/* Step preview tower */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          {Array.from({ length: 33 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-brand/20"
              style={{
                height: `${8 + (i % 5) * 3}px`,
              }}
            />
          ))}
        </div>

        <button
          onClick={() => router.push("/journey")}
          className="px-8 py-4 bg-brand hover:bg-brand-dark text-white font-semibold rounded-xl text-lg transition-all duration-200 shadow-lg shadow-brand/25 hover:shadow-brand/40"
        >
          Start Your Journey →
        </button>

        <p className="text-sm text-text-muted mt-4">
          No credit card required. Your progress is saved automatically.
        </p>
      </div>

      {/* Phase previews */}
      <div className="mt-16 max-w-2xl w-full grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: "🏗", label: "Foundation", steps: "1–4" },
          { icon: "📖", label: "Book", steps: "5–12" },
          { icon: "🧲", label: "Lead Magnet", steps: "13–17" },
          { icon: "🔄", label: "Funnel", steps: "18–23" },
        ].map((phase) => (
          <div key={phase.label} className="bg-surface-raised border border-border rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">{phase.icon}</div>
            <div className="text-xs font-semibold text-text-primary">{phase.label}</div>
            <div className="text-[10px] text-text-muted">Steps {phase.steps}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
