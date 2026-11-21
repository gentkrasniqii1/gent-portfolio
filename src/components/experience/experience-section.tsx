import { Timeline } from "@/components/experience/timeline";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { getWorkExperience } from "@/lib/experience";

export function ExperienceSection() {
  const items = getWorkExperience();

  return (
    <Reveal>
      <section
        id="experience"
        aria-labelledby="experience-heading"
        className="scroll-mt-24 space-y-8"
      >
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="Work history"
          description="Professional roles, most recent first."
        />
        <Timeline
          items={items}
          emptyMessage="Work experience will appear here once added."
        />
      </section>
    </Reveal>
  );
}
