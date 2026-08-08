import type { Certification } from "@/types/certification";

/**
 * Certifications — add real entries only.
 *
 * Example shape:
 * {
 *   id: "aws-ccp",
 *   name: "AWS Certified Cloud Practitioner",
 *   issuer: "Amazon Web Services",
 *   date: "2025-03",
 *   credentialUrl: "https://…",
 *   credentialId: "ABC-123",
 * }
 */
export const certifications: Certification[] = [
  {
    id: "frontend-shkolla-digjitale",
    name: "Front-End Developer",
    issuer: "Shkolla Digjitale, Prizren",
    date: "2022-11-02",
  },
  {
    id: "backend-shkolla-digjitale",
    name: "Back-End Developer",
    issuer: "Shkolla Digjitale, Prizren",
    date: "2023-06-27",
  },
  {
    id: "ai-empowering-prizren",
    name: "Certificate of Participation — Empowering Prizren's Youth with AI (5-Day Training)",
    issuer: "RDA South (Regional Development Agency)",
    date: "2025-05-21",
  },
];
