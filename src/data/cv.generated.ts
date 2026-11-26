/** AUTO-GENERATED — do not edit manually.
 * Source: public/documents/cv.pdf
 */
import type { CvData, CvParseMeta } from "@/types/cv";

export const CV_PDF_PATH = "/documents/cv.pdf";

export const CV_PARSE_META: CvParseMeta = {
  sourcePath: "public/documents/cv.pdf",
  sourceSha256:
    "96d1792f4377e02b62824f0f57a0570d9d2e53e60da094c487f80a8edc8e9081",
  generatedAt: "2026-11-26T17:23:36.790Z",
  warnings: [],
};

export const CV_DATA: CvData = {
  identity: {
    name: "Gent Krasniqi",
    role: "Frontend / Full-Stack Developer",
    headline: "",
    summary:
      "Full-stack developer and Computer Science student at UBT who ships complete web apps, from UI to database and deployment. Founder of VELNORA, a digital studio, with three live platforms of my own. I also work full-time in IT support at SPEEEX. Looking for a Frontend or Full-Stack Developer role.",
    contactBits: [
      "Prizren, Kosovë",
      "+383 49 168 682",
      "gentkrass21@gmail.com",
      "gentkrasniqi.dev",
      "github.com/gentkrasniqii1",
      "linkedin.com/in/gent-krasniqi-19736a355",
    ],
    lastUpdatedLabel: null,
  },
  experience: [
    {
      id: "founder-backend-developer-velnora-prizren",
      title: "Founder & Backend Developer — VELNORA, Prizren",
      organization: "",
      period: "2026 – Present",
      description: [
        "Founded a digital studio that builds websites and web products for businesses in Kosovo",
        "Built the backend of velnora-ks.com and set up the studio's brand and Google Business Profile",
      ],
    },
    {
      id: "information-technology-assistant-speeex-prizren",
      title: "Information Technology Assistant — SPEEEX, Prizren",
      organization: "",
      period: "Oct 2026 – Present",
      description: [
        "On-site IT support for the agent teams of a BPO company",
        "Fix hardware and software issues on workstations and install required software",
        "Keep a register of defective PCs to track faults, repairs and replacements",
      ],
    },
    {
      id: "react-js-intern-azwedo-prishtin",
      title: "React.js Intern — Azwedo, Prishtinë",
      organization: "",
      period: "Jun 2023 – Jan 2024",
      description: [
        "Built responsive React.js interfaces for real client web apps",
        "Improved UI performance and code quality, using Git in a team workflow",
      ],
    },
  ],
  projects: [
    {
      id: "skillmatch-recruitment-platform",
      title: "SkillMatch — recruitment platform",
      year: "",
      shortDescription: "React, Node.js, MongoDB, Socket.io",
      highlights: [
        "Job-matching platform with candidate, employer and admin dashboards, real-time chat and interview scheduling",
        "Secure auth (email verification, 2FA, Google/LinkedIn), email via Resend; deployed on Vercel + Render",
      ],
      liveUrl: "https://skillmatchapp.com",
    },
    {
      id: "prizren-smart-city-citizen-issue-reporting",
      title: "Prizren Smart City — citizen issue reporting",
      year: "",
      shortDescription: "Next.js, NestJS, PostgreSQL/PostGIS",
      highlights: [
        "Citizens report city problems with a photo and map location; AI sorts each report, staff can correct it",
        "JWT auth with roles, interactive map and admin dashboard",
      ],
      liveUrl: "https://prizrensmartcity.com",
    },
    {
      id: "it-help-desk-knowledge-base",
      title: "IT Help Desk — knowledge base",
      year: "",
      shortDescription: "Next.js, Supabase, Vercel",
      highlights: [
        "Bilingual (sq/en) step-by-step guides for PC and software issues, with an admin panel to manage content",
      ],
      liveUrl: "https://it-helpdesk-jade.vercel.app",
    },
    {
      id: "earlier-projects",
      title: "Earlier projects",
      year: "",
      shortDescription: "",
      highlights: [
        "Real Estate listing app, Fresh Shop e-commerce store, AI Tools app, Recipes and Fitness apps.",
      ],
    },
  ],
  education: [
    {
      id: "bsc-computer-science-and-engineering-ubt",
      title: "BSc Computer Science and Engineering — UBT",
      organization: "",
      period: "Oct 2023 – Present",
      description: [],
    },
    {
      id: "gjimnazi-gjon-buzuku-prizren",
      title: "Gjimnazi “Gjon Buzuku”, Prizren",
      organization: "",
      period: "Sep 2020 – Jun 2023",
      description: ["GPA 4.8"],
    },
  ],
  skillGroups: [
    {
      id: "frontend",
      label: "Frontend",
      skills: [
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Vue.js",
        "Tailwind CSS",
        "i18n",
      ],
    },
    {
      id: "backend",
      label: "Backend",
      skills: [
        "Node.js",
        "NestJS",
        "Laravel",
        "REST APIs",
        "JWT/RBAC",
        "OAuth",
        "2FA",
        "WebSockets",
      ],
    },
    {
      id: "data-services",
      label: "Data & services",
      skills: [
        "PostgreSQL/PostGIS",
        "MongoDB",
        "Supabase",
        "Cloudinary",
        "Resend",
      ],
    },
    {
      id: "tools-it",
      label: "Tools & IT",
      skills: [
        "Git/GitHub",
        "Vercel",
        "Render",
        "DNS/domains",
        "Windows and hardware troubleshooting",
      ],
    },
  ],
  languages: [
    {
      name: "Albanian",
      proficiency: "native",
    },
    {
      name: "English",
      proficiency: "professional",
    },
  ],
  certifications: [
    {
      id: "shkolla-digjitale-frontend-developer-and-backend-developer",
      label: "Shkolla Digjitale — Frontend Developer and Backend Developer",
    },
    {
      id: "rda-empowering-prizren-s-youth-with-ai-participation",
      label: "RDA — Empowering Prizren’s Youth with AI (participation)",
    },
  ],
};

export function getCvData(): CvData {
  return CV_DATA;
}
