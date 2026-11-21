import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { SkillsGrid } from "@/components/skills/skills-grid";
import { skills } from "@/data/skills";

export function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="space-y-8">
      <Reveal>
        <SectionHeading
          id="skills-heading"
          eyebrow="Skills"
          title="Technical toolkit"
          description="Technologies and tools I use to design, build and ship software."
        />
      </Reveal>

      {skills.length === 0 ? (
        <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
          Skills will appear here once added.
        </p>
      ) : (
        <SkillsGrid skills={skills} />
      )}
    </section>
  );
}
