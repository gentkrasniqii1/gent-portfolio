import { ArrowRight } from "lucide-react";
import type { ProjectChallenge } from "@/types/project";

export function ChallengeList({ items }: { items: ProjectChallenge[] }) {
  return (
    <ul className="space-y-4">
      {items.map(({ challenge, solution }) => (
        <li
          key={challenge}
          className="border-border bg-card grid gap-4 rounded-xl border p-5 shadow-sm md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-start md:gap-6"
        >
          <div>
            <p className="text-muted-foreground font-mono text-[11px] tracking-[0.14em] uppercase">
              Challenge
            </p>
            <p className="text-foreground mt-1.5 text-base leading-relaxed">
              {challenge}
            </p>
          </div>
          <ArrowRight
            aria-hidden
            className="text-accent hidden size-5 md:mt-7 md:block"
          />
          <div>
            <p className="text-accent font-mono text-[11px] tracking-[0.14em] uppercase">
              How I solved it
            </p>
            <p className="text-foreground/85 mt-1.5 text-base leading-relaxed">
              {solution}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
