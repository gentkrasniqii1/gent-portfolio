import type { Metadata } from "next";
import { AboutSummary } from "@/components/about/about-summary";
import { EducationList } from "@/components/about/education-list";
import { ExperienceSection } from "@/components/experience/experience-section";
import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/shared/button-link";
import { SkillsSection } from "@/components/skills/skills-section";

export const metadata: Metadata = {
  title: "About",
  description:
    "Professional background, skills, experience, and education of [YOUR NAME].",
};

export default function AboutPage() {
  return (
    <main className="py-section">
      <Container className="space-y-16 md:space-y-20">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-display text-foreground">About</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Background, skills, experience, and education — filled from typed
            data files as content is ready.
          </p>
          <ButtonLink href="/contact" variant="secondary" className="mt-2">
            Get in touch
          </ButtonLink>
        </div>

        <AboutSummary />
        <SkillsSection />
        <ExperienceSection />
        <EducationList />
      </Container>
    </main>
  );
}
