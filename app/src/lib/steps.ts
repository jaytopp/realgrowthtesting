export interface Step {
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  phase: number;
  phaseName: string;
  completionGate: string;
  type: "form" | "select" | "generate" | "review" | "upload" | "checklist" | "download";
}

export interface Phase {
  number: number;
  name: string;
  icon: string;
  milestone: string;
  milestoneAsset: string;
  steps: Step[];
}

export const PHASES: Phase[] = [
  {
    number: 1,
    name: "Foundation",
    icon: "🏗",
    milestone: "Your foundation is set.",
    milestoneAsset: "Brand Brief",
    steps: [
      { number: 1, title: "Brand Discovery", shortTitle: "Brand", description: "Answer questions about who you serve, your niche, and the transformation you deliver.", phase: 1, phaseName: "Foundation", completionGate: "All fields filled + submitted", type: "form" },
      { number: 2, title: "Customer Avatar", shortTitle: "Avatar", description: "Build your ideal reader/buyer profile: demographics, pains, desires, objections.", phase: 1, phaseName: "Foundation", completionGate: "Avatar approved", type: "form" },
      { number: 3, title: "Core Message & Mechanism", shortTitle: "Message", description: "Define your unique message, framework name, and differentiator.", phase: 1, phaseName: "Foundation", completionGate: "Message framework approved", type: "generate" },
      { number: 4, title: "Voice & Tone", shortTitle: "Voice", description: "Pick from voice/tone presets or describe your own. See a sample paragraph in that voice.", phase: 1, phaseName: "Foundation", completionGate: "Voice selection confirmed", type: "select" },
    ],
  },
  {
    number: 2,
    name: "Book",
    icon: "📖",
    milestone: "Your book is done.",
    milestoneAsset: "Complete Manuscript",
    steps: [
      { number: 5, title: "Book Type", shortTitle: "Type", description: "Choose: authority book, lead-gen book, or signature framework book.", phase: 2, phaseName: "Book", completionGate: "Type selected", type: "select" },
      { number: 6, title: "Title & Subtitle", shortTitle: "Title", description: "AI suggests options based on your brand brief. Pick or write your own.", phase: 2, phaseName: "Book", completionGate: "Title confirmed", type: "generate" },
      { number: 7, title: "Chapter Outline", shortTitle: "Outline", description: "AI generates chapter titles + descriptions. Reorder, add, or remove.", phase: 2, phaseName: "Book", completionGate: "Outline approved", type: "generate" },
      { number: 8, title: "Chapter 1 Draft", shortTitle: "Ch. 1", description: "AI writes your first chapter. Review and refine in the editor.", phase: 2, phaseName: "Book", completionGate: "Chapter marked done", type: "generate" },
      { number: 9, title: "Remaining Chapters", shortTitle: "Ch. 2+", description: "Write each chapter one at a time with AI assistance.", phase: 2, phaseName: "Book", completionGate: "All chapters marked done", type: "generate" },
      { number: 10, title: "Front & Back Matter", shortTitle: "Matter", description: "AI generates foreword, about the author, dedication, and CTA pages.", phase: 2, phaseName: "Book", completionGate: "All sections approved", type: "generate" },
      { number: 11, title: "Manuscript Review", shortTitle: "Review", description: "Full manuscript in reading view. Do your final approval.", phase: 2, phaseName: "Book", completionGate: "Manuscript approved", type: "review" },
      { number: 12, title: "Book Cover", shortTitle: "Cover", description: "Upload a cover or use AI to generate a cover concept.", phase: 2, phaseName: "Book", completionGate: "Cover confirmed", type: "upload" },
    ],
  },
  {
    number: 3,
    name: "Lead Magnet & Content",
    icon: "🧲",
    milestone: "Your content engine is built.",
    milestoneAsset: "Content Asset Pack",
    steps: [
      { number: 13, title: "Lead Magnet Type", shortTitle: "Lead Type", description: "Choose: checklist, cheat sheet, mini-course, quiz, or sample chapter.", phase: 3, phaseName: "Lead Magnet & Content", completionGate: "Type selected", type: "select" },
      { number: 14, title: "Lead Magnet Content", shortTitle: "Lead Gen", description: "AI generates your lead magnet from your book + brand brief.", phase: 3, phaseName: "Lead Magnet & Content", completionGate: "Content approved", type: "generate" },
      { number: 15, title: "Book Hook", shortTitle: "Hook", description: "AI writes a short punchy pitch paragraph for ads and social.", phase: 3, phaseName: "Lead Magnet & Content", completionGate: "Hook approved", type: "generate" },
      { number: 16, title: "Welcome Email Sequence", shortTitle: "Emails", description: "AI generates 3–5 welcome emails for new subscribers.", phase: 3, phaseName: "Lead Magnet & Content", completionGate: "All emails approved", type: "generate" },
      { number: 17, title: "Social Media Posts", shortTitle: "Social", description: "AI generates 5–10 launch/announcement posts.", phase: 3, phaseName: "Lead Magnet & Content", completionGate: "Posts approved", type: "generate" },
    ],
  },
  {
    number: 4,
    name: "Funnel",
    icon: "🔄",
    milestone: "Your funnel is mapped out.",
    milestoneAsset: "Funnel Copy Package",
    steps: [
      { number: 18, title: "Funnel Type", shortTitle: "Funnel", description: "Choose: free + shipping book funnel, webinar funnel, or lead magnet funnel.", phase: 4, phaseName: "Funnel", completionGate: "Type selected", type: "select" },
      { number: 19, title: "Landing Page Copy", shortTitle: "Landing", description: "AI generates headline, subhead, bullets, CTA, and social proof sections.", phase: 4, phaseName: "Funnel", completionGate: "Copy approved", type: "generate" },
      { number: 20, title: "Thank-You Page Copy", shortTitle: "Thanks", description: "AI generates confirmation + next-step page copy.", phase: 4, phaseName: "Funnel", completionGate: "Copy approved", type: "generate" },
      { number: 21, title: "Upsell / Order Bump", shortTitle: "Upsell", description: "AI generates upsell offer copy. Skip if your funnel doesn't need it.", phase: 4, phaseName: "Funnel", completionGate: "Copy approved or skipped", type: "generate" },
      { number: 22, title: "Sales Page Copy", shortTitle: "Sales", description: "AI generates long-form sales page for your core offer.", phase: 4, phaseName: "Funnel", completionGate: "Copy approved", type: "generate" },
      { number: 23, title: "Funnel Review", shortTitle: "Review", description: "Visual flow showing all pages in sequence. Final approval.", phase: 4, phaseName: "Funnel", completionGate: "Funnel approved", type: "review" },
    ],
  },
  {
    number: 5,
    name: "Email Sequences",
    icon: "📧",
    milestone: "Your email machine is loaded.",
    milestoneAsset: "Email Swipe File",
    steps: [
      { number: 24, title: "Offer Brief", shortTitle: "Offer", description: "Define your core offer, pricing, bonuses, and guarantee.", phase: 5, phaseName: "Email Sequences", completionGate: "Brief submitted", type: "form" },
      { number: 25, title: "Nurture Sequence", shortTitle: "Nurture", description: "AI generates 7–14 value/story emails to build trust.", phase: 5, phaseName: "Email Sequences", completionGate: "All emails approved", type: "generate" },
      { number: 26, title: "Launch Sequence", shortTitle: "Launch", description: "AI generates 5–7 cart-open / urgency emails.", phase: 5, phaseName: "Email Sequences", completionGate: "All emails approved", type: "generate" },
      { number: 27, title: "Follow-Up Sequence", shortTitle: "Follow-Up", description: "AI generates 3–5 abandoned cart / last-chance emails.", phase: 5, phaseName: "Email Sequences", completionGate: "All emails approved", type: "generate" },
    ],
  },
  {
    number: 6,
    name: "Ads & Traffic",
    icon: "📣",
    milestone: "Your traffic plan is ready.",
    milestoneAsset: "Ad Copy Kit",
    steps: [
      { number: 28, title: "Ad Strategy", shortTitle: "Strategy", description: "Pick platform(s), set budget range, define campaign goal.", phase: 6, phaseName: "Ads & Traffic", completionGate: "Strategy confirmed", type: "form" },
      { number: 29, title: "Ad Copy & Headlines", shortTitle: "Ad Copy", description: "AI generates 3–5 ad copy variations with headlines and hooks.", phase: 6, phaseName: "Ads & Traffic", completionGate: "Ads approved", type: "generate" },
      { number: 30, title: "Ad Creative Brief", shortTitle: "Creative", description: "AI generates specs, image/video direction, and creative guidelines.", phase: 6, phaseName: "Ads & Traffic", completionGate: "Brief approved", type: "generate" },
    ],
  },
  {
    number: 7,
    name: "Launch",
    icon: "🚀",
    milestone: "You did it. Your entire marketing system is built.",
    milestoneAsset: "Complete Marketing System",
    steps: [
      { number: 31, title: "Asset Library Review", shortTitle: "Assets", description: "See every asset you've created, organized by phase.", phase: 7, phaseName: "Launch", completionGate: "Reviewed", type: "review" },
      { number: 32, title: "Launch Checklist", shortTitle: "Checklist", description: "Interactive checklist: domain, email, funnel, ads — all systems go.", phase: 7, phaseName: "Launch", completionGate: "All items checked", type: "checklist" },
      { number: 33, title: "Download & Go Live", shortTitle: "Go Live", description: "Download everything as a ZIP. You're ready to launch.", phase: 7, phaseName: "Launch", completionGate: "Downloaded", type: "download" },
    ],
  },
];

export const ALL_STEPS: Step[] = PHASES.flatMap((p) => p.steps);
export const TOTAL_STEPS = ALL_STEPS.length;

export function getStep(num: number): Step | undefined {
  return ALL_STEPS.find((s) => s.number === num);
}

export function getPhaseForStep(stepNum: number): Phase | undefined {
  return PHASES.find((p) => p.steps.some((s) => s.number === stepNum));
}

export function isLastStepInPhase(stepNum: number): boolean {
  const phase = getPhaseForStep(stepNum);
  if (!phase) return false;
  return phase.steps[phase.steps.length - 1].number === stepNum;
}

export function getPhaseProgress(phaseNum: number, currentStep: number): { completed: number; total: number } {
  const phase = PHASES.find((p) => p.number === phaseNum);
  if (!phase) return { completed: 0, total: 0 };
  const completed = phase.steps.filter((s) => s.number < currentStep).length;
  return { completed, total: phase.steps.length };
}
