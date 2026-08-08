import type { Experience } from "@/types/experience";

/** Experience & education timeline — populate with real entries only. */
export const experience: Experience[] = [
  {
    id: "work-azwedo",
    title: "React.js Intern",
    organization: "Azwedo",
    location: "Prishtinë",
    startDate: "2023-06",
    endDate: "2024-01",
    description: [
      "Developed responsive user interfaces using React.js",
      "Collaborated on real-world web applications",
      "Improved UI/UX performance and code quality",
      "Used Git for version control and teamwork",
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
    title: 'Gjimnazi "Gjon Buzuku"',
    organization: 'Gjimnazi "Gjon Buzuku"',
    location: "Prizren",
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
  },
];
