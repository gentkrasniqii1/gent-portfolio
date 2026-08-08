import { SkillGroup } from "@/components/skills/skill-group";
import { SectionHeading } from "@/components/shared/section-heading";
import { skills } from "@/data/skills";
import {
  groupSkillsByCategory,
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_ORDER,
} from "@/lib/skills";

export function SkillsSection() {
  const grouped = groupSkillsByCategory(skills);
  const hasSkills = skills.length > 0;

  return (
    <section aria-labelledby="skills-heading" className="space-y-8">
      <SectionHeading
        id="skills-heading"
        eyebrow="Skills"
        title="Technical toolkit"
        description="Technologies and tools I use to design, build, and ship software."
      />

      {!hasSkills ? (
        <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
          No skills yet. Add entries in{" "}
          <code className="text-foreground font-mono">src/data/skills.ts</code>.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2">
          {SKILL_CATEGORY_ORDER.map((category) => {
            const items = grouped[category] ?? [];
            return (
              <SkillGroup
                key={category}
                title={SKILL_CATEGORY_LABELS[category]}
                skills={items}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
