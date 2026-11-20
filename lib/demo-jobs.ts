import type { JobFormValues } from "@/lib/employer-job"

/**
 * Demo jobs used to populate the Manage Jobs table on a fresh browser.
 *
 * They follow `JobFormValues` exactly; `lib/employer-job.ts` adds `id` and
 * `createdAt` when it seeds them into localStorage.
 */
export const demoJobs: JobFormValues[] = [
  {
    title: "Senior Product Designer",
    company: "Nexus Lab",
    category: "Design & Creative",
    type: "Full-time",
    isRemote: false,
    location: "San Francisco, CA",
    deadline: "2026-12-24",
    minSalary: "120000",
    maxSalary: "150000",
    frequency: "per year",
    responsibilities:
      "Own the end-to-end design of our hiring workspace, from research and flows to polished, production-ready interfaces.",
    requirements:
      "5+ years designing complex B2B products. Strong systems thinking and a portfolio of shipped work.",
  },
  {
    title: "Full-stack Engineer",
    company: "Quantum",
    category: "Engineering & Tech",
    type: "Contract",
    isRemote: false,
    location: "Austin, TX",
    deadline: "2026-12-31",
    minSalary: "65",
    maxSalary: "85",
    frequency: "per hour",
    responsibilities:
      "Build and ship features across our Next.js frontend and Node services, pairing closely with design and product.",
    requirements:
      "Strong TypeScript, React and API design skills. Experience with MongoDB or similar databases.",
  },
  {
    title: "Marketing Director",
    company: "Vanguard",
    category: "Marketing & Sales",
    type: "Full-time",
    isRemote: false,
    location: "New York, USA",
    deadline: "2026-10-15",
    minSalary: "130000",
    maxSalary: "160000",
    frequency: "per year",
    responsibilities:
      "Lead brand, growth and lifecycle marketing for the employer side of the platform.",
    requirements:
      "8+ years in B2B marketing, with at least 3 managing a team and owning a pipeline number.",
  },
  {
    title: "Backend Architect",
    company: "CloudScale",
    category: "Engineering & Tech",
    type: "Full-time",
    isRemote: true,
    location: "Remote — Worldwide",
    deadline: "2027-01-20",
    minSalary: "90",
    maxSalary: "110",
    frequency: "per hour",
    responsibilities:
      "Design the services, data models and queues behind high-volume job matching, and mentor the backend team.",
    requirements:
      "Deep experience with distributed systems, MongoDB and event-driven architecture.",
  },
  {
    title: "UX Research Lead",
    company: "Humanize",
    category: "Design & Creative",
    type: "Part-time",
    isRemote: false,
    location: "Hybrid — Berlin",
    deadline: "2026-12-05",
    minSalary: "55",
    maxSalary: "70",
    frequency: "per hour",
    responsibilities:
      "Plan and run generative and evaluative research that shapes the candidate experience.",
    requirements:
      "4+ years in UX research, comfortable mixing qualitative and quantitative methods.",
  },
  {
    title: "Customer Success Manager",
    company: "Brightline",
    category: "Customer Support",
    type: "Full-time",
    isRemote: false,
    location: "London, UK",
    deadline: "2026-09-30",
    minSalary: "30",
    maxSalary: "40",
    frequency: "per hour",
    responsibilities:
      "Onboard employers, run quarterly reviews and keep accounts healthy and renewing.",
    requirements:
      "2+ years in customer success or account management for a SaaS product.",
  },
]
