import { TechBadge } from "@/components/shared/tech-badge";
import type { Skill } from "@/types/skill";

type SkillGroupProps = {
  title: string;
  skills: Skill[];
};

export function SkillGroup({ title, skills }: SkillGroupProps) {
  if (skills.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-foreground text-sm font-medium tracking-wide uppercase">
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill.name}>
            <TechBadge>
              {skill.name}
              {typeof skill.level === "number" ? (
                <span className="text-muted-foreground ml-1.5 font-mono">
                  {skill.level}/5
                </span>
              ) : null}
            </TechBadge>
          </li>
        ))}
      </ul>
    </div>
  );
}
