import type { Certification } from "@/types/certification";

/**
 * Certifications — add real entries only.
 */
export const certifications: Certification[] = [
  {
    id: "frontend-shkolla-digjitale",
    name: "Front-End Developer",
    issuer: "Shkolla Digjitale, Prizren",
    date: "2022-11-02",
    image: "/images/certifications/cert-frontend-developer.jpg",
    cvLabel: "Shkolla Digjitale - Frontend Developer",
  },
  {
    id: "backend-shkolla-digjitale",
    name: "Back-End Developer",
    issuer: "Shkolla Digjitale, Prizren",
    date: "2023-06-27",
    image: "/images/certifications/cert-backend-developer.jpg",
    cvLabel: "Shkolla Digjitale - Backend Developer",
  },
  {
    id: "ai-empowering-prizren",
    name: "Certificate of Participation — Empowering Prizren's Youth with AI (5-Day Training)",
    issuer: "RDA South (Regional Development Agency)",
    date: "2025-05-21",
    image: "/images/certifications/cert-ai-training.jpg",
    cvLabel:
      "RDA - Empowering Prizren's Youth with AI (Certificate of Participation)",
  },
];
