import { Timeline } from "@/components/experience/timeline";
import { SectionHeading } from "@/components/shared/section-heading";
import { getWorkExperience } from "@/lib/experience";

export function ExperienceSection() {
  const items = getWorkExperience();

  return (
    <section aria-labelledby="experience-heading" className="space-y-8">
      <SectionHeading
        id="experience-heading"
        eyebrow="Experience"
        title="Work history"
        description="Roles and freelance engagements — add real entries only."
      />
      <Timeline
        items={items}
        emptyMessage='No work experience yet. Add items with type: "work" or "freelance" in src/data/experience.ts.'
      />
    </section>
  );
}
