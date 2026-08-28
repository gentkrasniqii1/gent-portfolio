import type { Experience } from "@/types/experience";

/** Experience & education timeline — populate with real entries only. */
export const experience: Experience[] = [
  {
    id: "work-azwedo",
    title: "React.js Intern",
    organization: "Azwedo",
    location: "Prishtine",
    startDate: "2023-06",
    endDate: "2024-01",
    description: [
      "Developed responsive React.js UI components for real-world client applications, improving cross-browser compatibility and page performance",
      "Collaborated within an Agile workflow (sprints, stand-ups) alongside a professional development team on production web applications",
      "Used Git/GitHub for version control, code reviews, and team-based feature delivery",
    ],
    type: "work",
  },
  {
    id: "edu-ubt",
    title: "Computer Science and Engineering",
    organization: "UBT",
    startDate: "2023-10",
    endDate: "present",
    description: [],
    type: "education",
  },
  {
    id: "edu-gjon-buzuku",
    title: "High School Diploma",
    organization: 'Gjimnazi "Gjon Buzuku", Prizren',
    startDate: "2020-09",
    endDate: "2023-06",
    description: ["GPA 4.8"],
    type: "education",
  },
  {
    id: "edu-ibrahim-fehmiu",
    title: 'SHFMU "Ibrahim Fehmiu"',
    organization: 'SHFMU "Ibrahim Fehmiu"',
    startDate: "2011-09",
    endDate: "2020-06",
    description: ["GPA 5.0"],
    type: "education",
    includeInCvPdf: false,
  },
];
