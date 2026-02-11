"use client";

import { useState } from "react";
import { type Step } from "@/lib/steps";

interface StepContentProps {
  step: Step;
  onComplete: () => void;
}

function TypeBadge({ type }: { type: Step["type"] }) {
  const config: Record<Step["type"], { label: string; color: string }> = {
    form: { label: "Fill Out", color: "bg-blue-500/20 text-blue-400" },
    select: { label: "Choose", color: "bg-purple-500/20 text-purple-400" },
    generate: { label: "AI Generate", color: "bg-amber-500/20 text-amber-400" },
    review: { label: "Review", color: "bg-emerald-500/20 text-emerald-400" },
    upload: { label: "Upload", color: "bg-pink-500/20 text-pink-400" },
    checklist: { label: "Checklist", color: "bg-cyan-500/20 text-cyan-400" },
    download: { label: "Download", color: "bg-green-500/20 text-green-400" },
  };
  const c = config[type];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.color}`}>
      {c.label}
    </span>
  );
}

function FormStep({ step, onComplete }: StepContentProps) {
  const [fields, setFields] = useState<Record<string, string>>({});
  const fieldDefs = getFieldsForStep(step.number);
  const allFilled = fieldDefs.every((f) => (fields[f.name] || "").trim().length > 0);

  return (
    <div className="space-y-5">
      {fieldDefs.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-text-secondary mb-1.5">{field.label}</label>
          {field.multiline ? (
            <textarea
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors resize-none"
              rows={3}
              placeholder={field.placeholder}
              value={fields[field.name] || ""}
              onChange={(e) => setFields({ ...fields, [field.name]: e.target.value })}
            />
          ) : (
            <input
              type="text"
              className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors"
              placeholder={field.placeholder}
              value={fields[field.name] || ""}
              onChange={(e) => setFields({ ...fields, [field.name]: e.target.value })}
            />
          )}
        </div>
      ))}
      <ContinueButton enabled={allFilled} onClick={onComplete} />
    </div>
  );
}

function SelectStep({ step, onComplete }: StepContentProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const options = getOptionsForStep(step.number);

  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setSelected(opt.value)}
          className={`
            w-full text-left px-5 py-4 rounded-xl border transition-all duration-200
            ${selected === opt.value
              ? "border-brand bg-brand/10 ring-1 ring-brand"
              : "border-border bg-surface-raised hover:border-text-muted"
            }
          `}
        >
          <div className="font-medium text-text-primary">{opt.label}</div>
          <div className="text-sm text-text-secondary mt-0.5">{opt.description}</div>
        </button>
      ))}
      <div className="pt-2">
        <ContinueButton enabled={!!selected} onClick={onComplete} />
      </div>
    </div>
  );
}

function GenerateStep({ step, onComplete }: StepContentProps) {
  const [generated, setGenerated] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [text, setText] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleGenerate = () => {
    setStreaming(true);
    setText("");
    const sample = getSampleOutput(step.number);
    let i = 0;
    const interval = setInterval(() => {
      i += 3;
      setText(sample.slice(0, i));
      if (i >= sample.length) {
        clearInterval(interval);
        setStreaming(false);
        setGenerated(true);
      }
    }, 15);
  };

  return (
    <div className="space-y-5">
      {!generated && !streaming && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand/10 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-light">
              <path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="1.5" />
              <path d="M2 17l10 5 10-5" strokeWidth="1.5" />
              <path d="M2 12l10 5 10-5" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="text-text-secondary mb-4">Ready to generate with AI using everything you&apos;ve built so far.</p>
          <button
            onClick={handleGenerate}
            className="px-6 py-3 bg-brand hover:bg-brand-dark text-white font-semibold rounded-xl transition-colors"
          >
            Generate with AI
          </button>
        </div>
      )}

      {(streaming || generated) && (
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
            {text}
            {streaming && <span className="inline-block w-0.5 h-4 bg-brand-light animate-pulse ml-0.5" />}
          </div>
        </div>
      )}

      {generated && !accepted && (
        <div className="flex gap-3">
          <button
            onClick={() => setAccepted(true)}
            className="flex-1 px-4 py-2.5 bg-success hover:bg-success-light text-white font-medium rounded-xl transition-colors"
          >
            Accept
          </button>
          <button
            onClick={handleGenerate}
            className="flex-1 px-4 py-2.5 bg-surface-raised border border-border hover:border-text-muted text-text-primary font-medium rounded-xl transition-colors"
          >
            Regenerate
          </button>
          <button
            className="flex-1 px-4 py-2.5 bg-surface-raised border border-border hover:border-text-muted text-text-primary font-medium rounded-xl transition-colors"
          >
            Edit
          </button>
        </div>
      )}

      {accepted && <ContinueButton enabled={true} onClick={onComplete} />}
    </div>
  );
}

function ReviewStep({ step, onComplete }: StepContentProps) {
  const [approved, setApproved] = useState(false);

  return (
    <div className="space-y-5">
      <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-border">
          <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-light">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="1.5" />
              <path d="M14 2v6h6" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-text-primary">Preview Ready</div>
            <div className="text-xs text-text-secondary">Review all content before approving</div>
          </div>
        </div>
        <div className="text-sm text-text-secondary leading-relaxed space-y-2">
          <p>All previous assets for this section have been compiled and are ready for your review.</p>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-surface-hover rounded-lg p-3 border border-border">
                <div className="h-2 w-3/4 bg-border rounded mb-2" />
                <div className="h-2 w-full bg-border rounded mb-2" />
                <div className="h-2 w-2/3 bg-border rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {!approved ? (
        <button
          onClick={() => setApproved(true)}
          className="w-full px-4 py-3 bg-success hover:bg-success-light text-white font-semibold rounded-xl transition-colors"
        >
          Approve
        </button>
      ) : (
        <ContinueButton enabled={true} onClick={onComplete} />
      )}
    </div>
  );
}

function ChecklistStep({ onComplete }: StepContentProps) {
  const items = [
    "Domain connected & live",
    "Email provider configured",
    "Lead magnet uploaded",
    "Funnel pages published",
    "Welcome sequence active",
    "Ad accounts ready",
    "Tracking pixels installed",
  ];
  const [checked, setChecked] = useState<boolean[]>(items.map(() => false));
  const allChecked = checked.every(Boolean);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            const next = [...checked];
            next[i] = !next[i];
            setChecked(next);
          }}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 text-left
            ${checked[i]
              ? "border-success/30 bg-success/5"
              : "border-border bg-surface-raised hover:border-text-muted"
            }
          `}
        >
          <div className={`
            w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors
            ${checked[i] ? "bg-success border-success" : "border-text-muted"}
          `}>
            {checked[i] && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <span className={`text-sm ${checked[i] ? "text-success line-through" : "text-text-primary"}`}>
            {item}
          </span>
        </button>
      ))}
      <div className="pt-2">
        <ContinueButton enabled={allChecked} onClick={onComplete} />
      </div>
    </div>
  );
}

function DownloadStep({ onComplete }: StepContentProps) {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <div className="space-y-5 text-center py-6">
      <div className="w-20 h-20 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="1.5" />
          <polyline points="7 10 12 15 17 10" strokeWidth="1.5" />
          <line x1="12" y1="15" x2="12" y2="3" strokeWidth="1.5" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">Your Marketing System is Ready</h3>
        <p className="text-sm text-text-secondary mt-1">33 steps complete. Every asset, every page, every email — packaged and ready.</p>
      </div>
      <button
        onClick={() => setDownloaded(true)}
        className="px-8 py-3 bg-gold hover:bg-gold-light text-black font-semibold rounded-xl transition-colors"
      >
        Download Everything (ZIP)
      </button>
      {downloaded && (
        <div className="pt-2">
          <ContinueButton enabled={true} onClick={onComplete} label="Finish Journey" />
        </div>
      )}
    </div>
  );
}

function UploadStep({ step, onComplete }: StepContentProps) {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="space-y-5">
      <div
        className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-brand/50 transition-colors cursor-pointer"
        onClick={() => setUploaded(true)}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-text-muted mx-auto mb-3">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeWidth="1.5" />
          <polyline points="17 8 12 3 7 8" strokeWidth="1.5" />
          <line x1="12" y1="3" x2="12" y2="15" strokeWidth="1.5" />
        </svg>
        {uploaded ? (
          <p className="text-success font-medium">cover-design.png uploaded</p>
        ) : (
          <>
            <p className="text-text-secondary">Drag & drop your file here, or click to browse</p>
            <p className="text-xs text-text-muted mt-1">PNG, JPG up to 10MB</p>
          </>
        )}
      </div>
      <div className="text-center text-text-muted text-sm">— or —</div>
      <button
        onClick={() => setUploaded(true)}
        className="w-full px-4 py-3 bg-brand/10 border border-brand/30 text-brand-light font-medium rounded-xl hover:bg-brand/20 transition-colors"
      >
        Generate Cover Concept with AI
      </button>
      <ContinueButton enabled={uploaded} onClick={onComplete} />
    </div>
  );
}

function ContinueButton({ enabled, onClick, label }: { enabled: boolean; onClick: () => void; label?: string }) {
  return (
    <button
      onClick={enabled ? onClick : undefined}
      disabled={!enabled}
      className={`
        w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200
        ${enabled
          ? "bg-brand hover:bg-brand-dark text-white cursor-pointer shadow-lg shadow-brand/20"
          : "bg-surface-hover text-text-muted cursor-not-allowed border border-border"
        }
      `}
    >
      {label || "Continue →"}
    </button>
  );
}

export default function StepContent({ step, onComplete }: StepContentProps) {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-mono text-text-muted bg-surface-raised px-2 py-0.5 rounded">
            Step {step.number} of 33
          </span>
          <TypeBadge type={step.type} />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">{step.title}</h1>
        <p className="text-text-secondary mt-1">{step.description}</p>
      </div>

      <div className="bg-surface-raised border border-border rounded-2xl p-6">
        {step.type === "form" && <FormStep step={step} onComplete={onComplete} />}
        {step.type === "select" && <SelectStep step={step} onComplete={onComplete} />}
        {step.type === "generate" && <GenerateStep step={step} onComplete={onComplete} />}
        {step.type === "review" && <ReviewStep step={step} onComplete={onComplete} />}
        {step.type === "upload" && <UploadStep step={step} onComplete={onComplete} />}
        {step.type === "checklist" && <ChecklistStep step={step} onComplete={onComplete} />}
        {step.type === "download" && <DownloadStep step={step} onComplete={onComplete} />}
      </div>
    </div>
  );
}

// --- Mock data helpers ---

function getFieldsForStep(stepNum: number): { name: string; label: string; placeholder: string; multiline?: boolean }[] {
  const map: Record<number, { name: string; label: string; placeholder: string; multiline?: boolean }[]> = {
    1: [
      { name: "audience", label: "Who do you serve?", placeholder: "e.g. Entrepreneurs who want to write their first book" },
      { name: "niche", label: "What's your niche?", placeholder: "e.g. Business book publishing for coaches" },
      { name: "transformation", label: "What transformation do you deliver?", placeholder: "e.g. From idea to published author with a full marketing system", multiline: true },
    ],
    2: [
      { name: "name", label: "Give your ideal reader a name", placeholder: "e.g. Sarah" },
      { name: "demographics", label: "Demographics", placeholder: "e.g. 35-50, female, small business owner, $75K-$150K income" },
      { name: "pain_points", label: "Top 3 pain points", placeholder: "e.g. Overwhelmed by marketing, doesn't know where to start...", multiline: true },
      { name: "desires", label: "Top 3 desires", placeholder: "e.g. Wants authority in their space, passive lead generation...", multiline: true },
    ],
    24: [
      { name: "offer_name", label: "Core Offer Name", placeholder: "e.g. The Authority Accelerator Program" },
      { name: "price", label: "Price Point", placeholder: "e.g. $997" },
      { name: "bonuses", label: "Bonuses included", placeholder: "e.g. 1-on-1 coaching call, private community access...", multiline: true },
      { name: "guarantee", label: "Guarantee", placeholder: "e.g. 30-day money-back guarantee" },
    ],
    28: [
      { name: "platforms", label: "Ad Platforms", placeholder: "e.g. Facebook, Instagram" },
      { name: "budget", label: "Monthly Budget Range", placeholder: "e.g. $500-$1,000/month" },
      { name: "goal", label: "Primary Campaign Goal", placeholder: "e.g. Drive free + shipping book orders" },
    ],
  };
  return map[stepNum] || [
    { name: "field1", label: "Your response", placeholder: "Enter your answer here...", multiline: true },
  ];
}

function getOptionsForStep(stepNum: number): { value: string; label: string; description: string }[] {
  const map: Record<number, { value: string; label: string; description: string }[]> = {
    4: [
      { value: "authoritative", label: "Authoritative & Professional", description: "Confident, clear, expert tone. Like a trusted advisor." },
      { value: "conversational", label: "Conversational & Friendly", description: "Warm, relatable, like talking to a smart friend." },
      { value: "bold", label: "Bold & Provocative", description: "Direct, opinionated, challenges the status quo." },
      { value: "inspirational", label: "Inspirational & Motivational", description: "Uplifting, empowering, moves people to action." },
    ],
    5: [
      { value: "authority", label: "Authority Book", description: "Establish yourself as the go-to expert in your space. Deep, valuable content." },
      { value: "leadgen", label: "Lead Generation Book", description: "Short, punchy book designed to attract leads into your funnel." },
      { value: "framework", label: "Signature Framework Book", description: "Build your book around your unique methodology or system." },
    ],
    13: [
      { value: "checklist", label: "Checklist", description: "A step-by-step checklist your audience can follow immediately." },
      { value: "cheatsheet", label: "Cheat Sheet", description: "A quick-reference guide with key takeaways from your book." },
      { value: "minicourse", label: "Mini-Course", description: "3-5 email lessons that deliver a quick win." },
      { value: "quiz", label: "Quiz", description: "An interactive quiz that segments your audience." },
    ],
    18: [
      { value: "freeship", label: "Free + Shipping Book Funnel", description: "Give away the book for free, charge shipping. Great for building a list fast." },
      { value: "webinar", label: "Webinar Funnel", description: "Drive to a webinar that sells your core offer." },
      { value: "leadmagnet", label: "Lead Magnet Funnel", description: "Offer a free resource to capture emails, then nurture to sale." },
    ],
  };
  return map[stepNum] || [
    { value: "option1", label: "Option A", description: "First choice for this step." },
    { value: "option2", label: "Option B", description: "Second choice for this step." },
    { value: "option3", label: "Option C", description: "Third choice for this step." },
  ];
}

function getSampleOutput(stepNum: number): string {
  const map: Record<number, string> = {
    3: `Core Message Framework

Your Unique Message:
"Every entrepreneur has a book inside them — and that book is the key that unlocks their entire marketing system. You don't need a massive audience, a big budget, or years of experience. You need a clear message, a proven framework, and the right assets in place."

Your Unique Mechanism:
The Authority Engine™ — A step-by-step system that takes you from blank page to fully built marketing machine in 33 steps. Write the book. Build the funnel. Launch the ads. Every asset, generated and refined, in the right order.

Your Differentiator:
Unlike courses that teach theory, this system BUILDS the assets with you. You don't learn about landing pages — you leave with landing page copy. You don't study email marketing — you walk away with 30+ emails written and ready to send.`,
    6: `Here are 5 title options based on your brand brief:

1. "The Authority Engine" — Build Your Book, Funnel & Marketing System in 33 Steps
2. "Publish & Profit" — The Entrepreneur's Playbook for Turning One Book Into a Lead Machine
3. "Book to Business" — How Smart Entrepreneurs Use a Single Book to Build Their Entire Marketing System
4. "The One-Book Business" — Write Once, Market Forever
5. "Author to Authority" — The Step-by-Step System for Entrepreneurs Who Want to Write, Publish & Profit`,
    7: `Chapter Outline:

1. The Authority Engine — Why one book changes everything
2. The Myth of "More Content" — Why less is more in marketing
3. Finding Your One Reader — How to speak directly to the person who needs you most
4. Your Signature Framework — Packaging your expertise into a repeatable system
5. The 3-Hour Draft — How to write a chapter that teaches and sells (without overthinking)
6. From Manuscript to Magnet — Turning chapters into lead generation assets
7. The Funnel Blueprint — Landing pages, upsells, and the customer journey
8. Email Alchemy — Sequences that nurture, launch, and convert
9. Ads That Actually Work — Writing copy that stops the scroll
10. Launch Day — Your checklist for going live with confidence`,
    8: `Chapter 1: The Authority Engine

There's a moment every entrepreneur hits.

You've got the expertise. You've helped real people get real results. Your clients rave about you. But when it comes to reaching MORE people — scaling beyond referrals and word of mouth — you feel stuck.

You know you should be doing "content marketing." You've tried posting on social media. Maybe you started a podcast or a blog. But it feels like shouting into the void. Nothing compounds. Nothing converts. Every day you start from zero.

Here's the truth that changed everything for me: you don't need more content. You need one piece of foundational content — a book — and a system that turns that book into leads, sales, and authority on autopilot.

I call it The Authority Engine...`,
  };
  return map[stepNum] || `Generated content for "${getStepTitle(stepNum)}"

This is AI-generated content based on everything you've built in your journey so far. The system pulls from your brand brief, customer avatar, voice & tone settings, and all previous assets to create contextually relevant content.

Your content has been tailored to:
• Your specific audience and niche
• Your brand voice and tone
• Your unique framework and message
• The assets you've already approved

Review the content above and choose to Accept, Regenerate, or Edit manually.`;
}

function getStepTitle(stepNum: number): string {
  const titles: Record<number, string> = {
    1: "Brand Discovery", 2: "Customer Avatar", 3: "Core Message", 4: "Voice & Tone",
    5: "Book Type", 6: "Title & Subtitle", 7: "Chapter Outline", 8: "Chapter 1",
    9: "Remaining Chapters", 10: "Front & Back Matter", 11: "Manuscript Review", 12: "Book Cover",
    13: "Lead Magnet Type", 14: "Lead Magnet Content", 15: "Book Hook", 16: "Welcome Emails", 17: "Social Posts",
    18: "Funnel Type", 19: "Landing Page", 20: "Thank-You Page", 21: "Upsell Copy", 22: "Sales Page", 23: "Funnel Review",
    24: "Offer Brief", 25: "Nurture Sequence", 26: "Launch Sequence", 27: "Follow-Up Sequence",
    28: "Ad Strategy", 29: "Ad Copy", 30: "Creative Brief",
    31: "Asset Library", 32: "Launch Checklist", 33: "Download & Go Live",
  };
  return titles[stepNum] || `Step ${stepNum}`;
}
