import { Timeline } from "@/components/experience/timeline";
import { SectionHeading } from "@/components/shared/section-heading";
import { getEducation } from "@/lib/experience";

export function EducationList() {
  const education = getEducation();

  return (
    <section aria-labelledby="education-heading" className="space-y-8">
      <SectionHeading
        id="education-heading"
        eyebrow="Education"
        title="Studies & training"
        description="Formal education and relevant academic background."
      />
      <Timeline
        items={education}
        emptyMessage='No education entries yet. Add items with type: "education" in src/data/experience.ts.'
      />
    </section>
  );
}
