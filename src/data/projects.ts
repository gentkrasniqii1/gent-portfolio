import type { Project } from "@/types/project";

/**
 * Portfolio projects — add a new object here to show it in the UI.
 * Assets: `public/images/projects/<slug>/`.
 *
 * Content rules: only facts that are already true. Anything that still needs
 * real data is marked with a `TODO:` comment and left out of the UI until set
 * (empty lists and missing fields simply hide their section).
 */
export const projects: Project[] = [
  {
    id: "velnora",
    slug: "velnora",
    title: "Velnora",
    headline: "Velnora — Digital agency website",
    shortDescription:
      "Bilingual (Albanian/English) website for a Kosovo-based digital agency, with services, a five-step process, pricing tiers, an FAQ and a project inquiry form.",
    description:
      "Velnora is a Kosovo-based digital agency that turns ideas into digital products. Its website has to explain what the agency does, how a project runs and what it costs — in both Albanian and English — and give visitors an easy way to start a project. It presents the agency's services (web development, UI/UX design, AI & automation, e-commerce and maintenance), a five-step process timeline, three pricing tiers and an FAQ, and ends in a project inquiry form, with privacy and cookie settings throughout.",
    category: "web",
    // TODO: add the rest of the Velnora stack (e.g. i18n, forms, hosting).
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/images/projects/velnora/cover.jpg",
    imageAlt:
      "Velnora homepage in a desktop browser and on a phone: a dark hero with the headline “Nga ideja te produkti digjital.” beside a glowing green V",
    gallery: [
      {
        src: "/images/projects/velnora/velnora.png",
        alt: "Velnora homepage hero on desktop, with the Albanian headline, service tags around a glowing V and the SQ/EN language switch",
        device: "desktop",
        width: 1902,
        height: 911,
      },
      {
        src: "/images/projects/velnora/velnora2.png",
        alt: "Velnora about section on desktop, with the agency's three guiding values",
        device: "desktop",
        width: 1890,
        height: 912,
      },
      {
        src: "/images/projects/velnora/velnora3.png",
        alt: "Velnora homepage hero on mobile, with stacked call-to-action buttons",
        device: "mobile",
        width: 367,
        height: 802,
      },
      {
        src: "/images/projects/velnora/velnora4.png",
        alt: "Velnora about section on mobile",
        device: "mobile",
        width: 367,
        height: 795,
      },
    ],
    liveUrl: "https://velnora-ks.com",
    // TODO: add the Velnora repository URL, or leave unset to keep the button hidden.
    githubUrl: undefined,
    featured: true,
    featuredOrder: 1,
    year: 2026,
    // TODO: set the launch month (1–12) for Velnora.
    month: undefined,
    status: "live",
    // TODO: confirm the exact Velnora role (e.g. "Founder, designer & developer").
    role: "Designer & developer",
    // TODO: confirm or refine the Velnora responsibilities.
    responsibilities: [
      "Designed the interface for desktop and mobile",
      "Built the site with Next.js, TypeScript and Tailwind CSS",
      "Deployed and launched it at velnora-ks.com",
    ],
    outcome: "Live in Albanian and English, with pricing and an inquiry form",
    features: [
      {
        icon: "languages",
        title: "Bilingual SQ / EN",
        description:
          "Every section is available in Albanian and English, with a language switch in the header.",
      },
      {
        icon: "layers",
        title: "Five service lines",
        description:
          "Web development, UI/UX design, AI & automation, e-commerce and maintenance, each presented as a clear offer.",
      },
      {
        icon: "timeline",
        title: "Five-step process",
        description:
          "A timeline that shows clients how a project moves from idea to finished product.",
      },
      {
        icon: "pricing",
        title: "Three pricing tiers",
        description:
          "Three packages so clients can compare scope and cost up front.",
      },
      {
        icon: "form",
        title: "Project inquiry form",
        description:
          "An FAQ answers common questions, then a form lets visitors describe their project and send it to the agency.",
      },
      {
        icon: "cookie",
        title: "Privacy & cookie settings",
        description:
          "A privacy policy and cookie settings that let visitors choose which optional cookies to allow.",
      },
    ],
    // TODO: add Velnora's technical decisions (routing for the two languages, form handling, hosting).
    architecture: ["Next.js and TypeScript, styled with Tailwind CSS"],
    // TODO: add Velnora's main challenges and how you solved them.
    challenges: [],
    // TODO: add measurable Velnora outcomes (inquiries, Lighthouse scores, client feedback) once known.
    results: ["Live in production at velnora-ks.com, in Albanian and English."],
  },
  {
    id: "prizren-smart-city",
    slug: "prizren-smart-city",
    title: "Prizren Smart City",
    headline: "Prizren Smart City — AI-powered civic issue reporting",
    cvFullTitle:
      "Prizren Smart City - AI-Powered Civic Issue Reporting Platform",
    shortDescription:
      "AI-powered civic issue reporting platform for citizens to report municipal issues with photo upload, geolocation, and an interactive live map.",
    description:
      "A citizen platform for reporting municipal issues — roads, lighting, waste — with photo upload, geolocation and a live map of reports. Each report is classified by AI (category and severity) and routed to the right municipal department, where staff filter, manage and resolve it from an admin dashboard.",
    category: "fullstack",
    technologies: [
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "PostGIS",
      "Prisma",
      "Redis",
      "Docker",
    ],
    image: "/images/projects/prizren-smart-city/cover.png",
    imageAlt:
      "Prizren Smart City cover with the project logo, its report, track, collaborate and transparency pillars, and a photo of Prizren's Old Stone Bridge",
    // TODO: add Prizren Smart City screenshots (desktop + mobile) to public/images/projects/prizren-smart-city/.
    gallery: [],
    liveUrl: "https://www.prizrensmartcity.com/",
    githubUrl: "https://github.com/gentkrasniqii1/prizren-smart-city",
    featured: true,
    featuredOrder: 2,
    year: 2026,
    // TODO: set the month (1–12) for Prizren Smart City.
    month: undefined,
    status: "live",
    // TODO: confirm the role; the responsibilities below also cover backend work.
    role: "Frontend Developer",
    responsibilities: [
      "Built the citizen reporting flow: photo upload, GPS geolocation and an interactive live map with clustering",
      "Implemented AI issue classification (category, severity, confidence score) with admin review and override",
      "Designed an admin-configurable routing engine that assigns reports to departments by category, priority and SLA rules",
      "Implemented authentication with JWT refresh tokens, Google/Facebook OAuth, 2FA and email verification via Resend",
    ],
    outcome: "Live with AI-classified reports and department routing",
    features: [
      {
        icon: "upload",
        title: "Photo reports",
        description:
          "Citizens report road, lighting and waste issues with photos attached.",
      },
      {
        icon: "map",
        title: "Live map",
        description:
          "GPS geolocation and an interactive map that clusters nearby reports.",
      },
      {
        icon: "ai",
        title: "AI classification",
        description:
          "Claude Vision suggests category, severity and a confidence score; admins can review and override it.",
      },
      {
        icon: "route",
        title: "Department routing",
        description:
          "An admin-configurable engine routes each report by category, priority and SLA rules.",
      },
      {
        icon: "layers",
        title: "Admin dashboard",
        description:
          "Municipal departments filter, manage and resolve the reports assigned to them.",
      },
      {
        icon: "shield",
        title: "Secure accounts",
        description:
          "JWT with refresh tokens, Google/Facebook OAuth, two-factor authentication and email verification.",
      },
    ],
    architecture: [
      "Monorepo with a Next.js + TypeScript frontend and a NestJS API",
      "PostgreSQL with PostGIS for location data, accessed through Prisma",
      "Redis and Docker in the platform stack",
      "Resend for transactional email (verification and notifications)",
    ],
    // TODO: add Prizren Smart City's main challenges and how you solved them.
    challenges: [],
    // TODO: add measurable outcomes (reports submitted, resolution times, departments onboarded) once known.
    results: ["Live in production at prizrensmartcity.com."],
    cvHighlights: [
      "Built a citizen reporting platform for municipal issues (roads, lighting, waste) featuring photo upload, GPS geolocation, and an interactive live map with clustering",
      "Implemented AI-powered issue classification (category, severity, confidence scoring) using Claude Vision API, with admin review and override",
      "Designed an admin-configurable institution-routing engine assigning reports to departments based on category, priority, and SLA rules",
      "Implemented secure JWT authentication with refresh tokens, Google/Facebook OAuth, 2FA, and email verification via Resend",
    ],
    cvStack: "Next.js, TypeScript, NestJS, PostgreSQL/PostGIS, Prisma",
  },
  {
    id: "skillmatch",
    slug: "skillmatch",
    title: "SkillMatch",
    headline: "SkillMatch — AI-powered job matching & recruitment",
    cvFullTitle: "SkillMatch - AI-Powered Job Matching & Recruitment Platform",
    shortDescription:
      "AI-powered recruitment platform that matches candidates to jobs by skills, with scheduling, notifications, and employer pipeline tools.",
    description:
      "A full-stack recruitment platform that matches candidates to jobs by skill. Employers manage applicants through a pipeline and schedule interviews with auto-generated meeting links, while candidates, employers and admins each get their own dashboard — all with real-time notifications and a bilingual interface.",
    category: "fullstack",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Socket.IO",
      "JWT",
      "Stripe",
      "i18next",
    ],
    image: "/images/projects/skillmatch/cover.png",
    imageAlt:
      "SkillMatch cover showing the candidate dashboard on desktop and mobile, with AI match scores, upcoming interviews and recent job matches",
    // TODO: add SkillMatch screenshots (desktop + mobile) to public/images/projects/skillmatch/.
    gallery: [],
    liveUrl: "https://www.skillmatchapp.com/",
    // TODO: add the SkillMatch repository URL (button stays hidden until set; never link the GitHub profile here).
    githubUrl: undefined,
    featured: true,
    featuredOrder: 3,
    year: 2026,
    // TODO: set the month (1–12) for SkillMatch.
    month: undefined,
    status: "live",
    role: "Full-Stack Developer",
    responsibilities: [
      "Architected the platform: an Express API and a separate React + Vite frontend",
      "Built authentication with JWT, email verification, 2FA and Google/LinkedIn OAuth",
      "Built role-based dashboards for candidates, employers and admins",
      "Integrated Google Calendar, Zoom and Resend for meetings and email",
    ],
    outcome: "Live with candidate, employer and admin dashboards",
    features: [
      {
        icon: "ai",
        title: "Skill-based matching",
        description: "Candidates are matched to open roles by their skills.",
      },
      {
        icon: "users",
        title: "Employer pipelines",
        description:
          "Employers move applicants through a hiring pipeline from one dashboard.",
      },
      {
        icon: "calendar",
        title: "Interview scheduling",
        description:
          "Google Meet or Zoom links are generated automatically when no manual link is given.",
      },
      {
        icon: "chat",
        title: "Real-time chat & alerts",
        description:
          "A live notification feed and in-app messaging over Socket.IO.",
      },
      {
        icon: "shield",
        title: "Secure sign-in",
        description:
          "JWT sessions, email verification, TOTP two-factor and Google/LinkedIn OAuth.",
      },
      {
        icon: "languages",
        title: "Bilingual interface",
        description:
          "English and Albanian across the candidate, employer and admin dashboards.",
      },
    ],
    architecture: [
      "Express API organised as MVC plus feature modules (controllers, middleware, models, routes, validators, services)",
      "Separate React + Vite single-page frontend",
      "Socket.IO for notifications and chat, decoupled from the REST API",
      "Docker multi-stage builds: nginx serves the built frontend and Node runs the production API",
    ],
    challenges: [
      {
        challenge:
          "Scheduling interviews with a meeting link every time, even when the employer doesn't add one",
        solution:
          "Integrated the Google Calendar API and Zoom Server-to-Server OAuth to generate the link automatically when the field is left blank.",
      },
      {
        challenge:
          "Supporting several sign-in methods (JWT, TOTP 2FA, Google/LinkedIn OAuth) without hurting the experience",
        solution:
          "Put JWT sessions, TOTP two-factor and Passport OAuth strategies behind one auth layer, with bcrypt hashing and Helmet security headers.",
      },
      {
        challenge: "Delivering real-time notifications and chat at scale",
        solution:
          "Used Socket.IO for a live notification feed and messaging system kept separate from the REST API.",
      },
      {
        challenge:
          "Keeping a fully bilingual (English/Albanian) interface consistent across three roles",
        solution:
          "Used i18next for one shared set of translations across the candidate, employer and admin dashboards.",
      },
    ],
    // TODO: add measurable SkillMatch outcomes (users, matches, interviews scheduled) once known.
    results: ["Live in production at skillmatchapp.com."],
    cvHighlights: [
      "Architected a full-stack recruitment platform matching candidates to jobs by skill, with employer applicant pipelines, interview scheduling, and real-time notifications",
      "Built with React 18, Vite, Tailwind CSS, Node.js/Express, MongoDB, and Socket.IO for real-time chat and live updates",
      "Implemented secure JWT authentication with email verification, 2FA, and Google/LinkedIn OAuth, plus role-based candidate/employer/admin dashboards",
      "Integrated Google Calendar/Zoom for auto-generated meeting links and Resend for transactional email delivery",
    ],
  },
];
