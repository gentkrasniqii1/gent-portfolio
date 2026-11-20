import {
  Database,
  ListChecks,
  Monitor,
  Server,
  Sparkles,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { StaggerChildren, StaggerItem } from "@/components/motion/stagger";
import {
  groupSkillsByCategory,
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_ORDER,
} from "@/lib/skills";
import type { Skill, SkillCategory } from "@/types/skill";

const CATEGORY_ICONS: Record<SkillCategory, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  devops: Workflow,
  tools: Wrench,
  practices: ListChecks,
  ai: Sparkles,
};

/**
 * Skills grouped into compact cards: one icon and heading per group and the
 * skills as a short, separated list instead of a wall of pills.
 */
export function SkillsGrid({ skills }: { skills: Skill[] }) {
  const grouped = groupSkillsByCategory(skills);
  const categories = SKILL_CATEGORY_ORDER.filter(
    (category) => (grouped[category]?.length ?? 0) > 0,
  );

  return (
    <StaggerChildren
      as="ul"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {categories.map((category) => {
        const Icon = CATEGORY_ICONS[category];
        const items = grouped[category] ?? [];
        return (
          <StaggerItem
            key={category}
            as="li"
            className="border-border bg-card rounded-xl border p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="bg-accent/10 text-accent inline-flex size-9 shrink-0 items-center justify-center rounded-lg">
                <Icon className="size-4.5" aria-hidden />
              </span>
              <h3 className="text-foreground font-sans text-sm font-semibold tracking-wide uppercase">
                {SKILL_CATEGORY_LABELS[category]}
              </h3>
            </div>
            <ul className="text-foreground/80 mt-4 flex flex-wrap gap-y-1 text-sm leading-relaxed">
              {items.map((skill, index) => (
                <li key={skill.name} className="whitespace-nowrap">
                  {skill.name}
                  {index < items.length - 1 ? (
                    <span aria-hidden className="text-muted-foreground/60 px-2">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </StaggerItem>
        );
      })}
    </StaggerChildren>
  );
}
