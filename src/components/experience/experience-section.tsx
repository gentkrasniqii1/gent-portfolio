import { Timeline } from "@/components/experience/timeline";
import { Reveal } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { getWorkExperience } from "@/lib/experience";

export function ExperienceSection() {
  const items = getWorkExperience();

  return (
    <Reveal>
      <section aria-labelledby="experience-heading" className="space-y-8">
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Work history"
          description="Roles and freelance engagements."
        />
        <Timeline
          items={items}
          emptyMessage="Work experience will appear here once added."
        />
      </section>
    </Reveal>
  );
}
