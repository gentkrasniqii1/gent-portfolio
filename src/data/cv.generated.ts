/** AUTO-GENERATED — do not edit manually.
 * Source: C:/Users/gentk/Desktop/gent-portfolio/public/documents/cv.pdf
 * Generated: 2026-08-28T22:25:09.130Z
 */
import type { CvData, CvParseMeta } from "@/types/cv";

export const CV_PDF_PATH = "/documents/cv.pdf";

export const CV_PARSE_META: CvParseMeta = {
  sourcePath: "C:/Users/gentk/Desktop/gent-portfolio/public/documents/cv.pdf",
  generatedAt: "2026-08-28T22:25:09.130Z",
  warnings: [],
};

export const CV_DATA: CvData = {
  identity: {
    name: "GENT KRASNIQI",
    role: "FRONTEND DEVELOPER",
    headline: "",
    summary:
      "Frontend-focused Computer Science student with hands-on experience building responsive, full-stack web applications using React.js, Vue.js, Node.js, and Laravel. Shipped and deployed multiple production applications, including a full-stack recruitment platform with real-time features and a civic-tech AI platform. Completed a 6-month professional React.js internship. Comfortable working across the stack with AI-assisted tools (Cursor, GitHub Copilot) while understanding the underlying logic well enough to debug, extend, and explain it.",
    contactBits: [
      "Prizren, Kosove",
      "+383 49 168 682",
      "gentkrass21@gmail.com",
      "linkedin.com/in/gent-krasniqi-19736a355",
      "github.com/gentkrasniqii1",
      "gent-portfolio.vercel.app",
    ],
    lastUpdatedLabel: null,
  },
  experience: [
    {
      id: "react-js-intern-azwedo-prishtine",
      title: "React.js Intern - Azwedo, Prishtine",
      organization: "",
      period: "Jun 2023 - Jan 2024",
      description: [
        "Developed responsive React.js UI components for real-world client applications, improving cross-browser compatibility and page performance",
        "Collaborated within an Agile workflow (sprints, stand-ups) alongside a professional development team on production web applications",
        "Used Git/GitHub for version control, code reviews, and team-based feature delivery",
      ],
    },
  ],
  projects: [
    {
      id: "skillmatch-ai-powered-job-matching-recruitment-platform",
      title: "SkillMatch - AI-Powered Job Matching & Recruitment Platform",
      year: "2026",
      shortDescription: "",
      highlights: [
        "Architected a full-stack recruitment platform matching candidates to jobs by skill, with employer applicant pipelines, interview scheduling, and real-time notifications",
        "Built with React 18, Vite, Tailwind CSS, Node.js/Express, MongoDB, and Socket.IO for real-time chat and live updates",
        "Implemented secure JWT authentication with email verification, 2FA, and Google/LinkedIn OAuth, plus role-based candidate/employer/admin dashboards",
        "Integrated Google Calendar/Zoom for auto-generated meeting links and Resend for transactional email delivery",
      ],
      liveUrl: "https://skillmatchapp.com",
      githubUrl: "https://github.com/gentkrasniqii1",
    },
    {
      id: "prizren-smart-city-ai-powered-civic-issue-reporting-platform",
      title: "Prizren Smart City - AI-Powered Civic Issue Reporting Platform",
      year: "2026",
      shortDescription:
        "Next.js, TypeScript, NestJS, PostgreSQL/PostGIS, Prisma",
      highlights: [
        "Built a citizen reporting platform for municipal issues (roads, lighting, waste) featuring photo upload, GPS geolocation, and an interactive live map with clustering",
        "Implemented AI-powered issue classification (category, severity, confidence scoring) using Claude Vision API, with admin review and override",
        "Designed an admin-configurable institution-routing engine assigning reports to departments based on category, priority, and SLA rules",
        "Implemented secure JWT authentication with refresh tokens, Google/Facebook OAuth, 2FA, and email verification via Resend",
      ],
      liveUrl: "https://prizrensmartcity.com",
      githubUrl: "https://github.com/gentkrasniqii1/prizren-smart-city",
    },
  ],
  education: [
    {
      id: "computer-science-and-engineering-ubt",
      title: "Computer Science and Engineering - UBT",
      organization: "",
      period: "Oct 2023 - Present",
      description: [],
    },
    {
      id: "high-school-diploma-gjimnazi-gjon-buzuku-prizren",
      title: 'High School Diploma - Gjimnazi "Gjon Buzuku", Prizren',
      organization: "",
      period: "Sep 2020 - Jun 2023",
      description: [],
    },
  ],
  skillGroups: [
    {
      id: "languages",
      label: "Languages",
      skills: ["JavaScript", "TypeScript", "PHP", "HTML5", "CSS3"],
    },
    {
      id: "frontend",
      label: "Frontend",
      skills: [
        "React.js",
        "Vue.js",
        "Tailwind CSS",
        "Vite",
        "Framer Motion",
        "Responsive Design",
      ],
    },
    {
      id: "backend",
      label: "Backend",
      skills: [
        "Node.js",
        "Express",
        "Laravel",
        "NestJS (basics)",
        "RESTful APIs",
      ],
    },
    {
      id: "databases",
      label: "Databases",
      skills: ["MongoDB", "MySQL", "PostgreSQL", "Prisma ORM"],
    },
    {
      id: "tools-platforms",
      label: "Tools & Platforms",
      skills: [
        "Git",
        "GitHub",
        "Vercel",
        "Render",
        "Docker (basics)",
        "Postman",
      ],
    },
    {
      id: "practices",
      label: "Practices",
      skills: ["Agile/Scrum", "Clean Code", "API Integration"],
    },
    {
      id: "ai-assisted-development",
      label: "AI-Assisted Development",
      skills: ["Cursor", "GitHub Copilot", "Claude"],
    },
  ],
  languages: [
    {
      name: "Albanian",
      proficiency: "Native",
    },
    {
      name: "English",
      proficiency: "Professional",
    },
  ],
  certifications: [
    {
      id: "shkolla-digjitale-frontend-developer",
      label: "Shkolla Digjitale - Frontend Developer",
    },
    {
      id: "shkolla-digjitale-backend-developer",
      label: "Shkolla Digjitale - Backend Developer",
    },
    {
      id: "rda-empowering-prizren-s-youth-with-ai-certificate-of-participation",
      label:
        "RDA - Empowering Prizren's Youth with AI (Certificate of Participation)",
    },
  ],
};

export function getCvData(): CvData {
  return CV_DATA;
}
