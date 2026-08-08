import { TechBadge } from "@/components/shared/tech-badge";
import { formatExperiencePeriod } from "@/lib/experience";
import type { Experience } from "@/types/experience";

type TimelineProps = {
  items: Experience[];
  emptyMessage: string;
};

const TYPE_LABELS: Record<Experience["type"], string> = {
  work: "Work",
  freelance: "Freelance",
  education: "Education",
  volunteer: "Volunteer",
};

export function Timeline({ items, emptyMessage }: TimelineProps) {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ol className="border-border max-w-2xl space-y-0 border-l pl-6">
      {items.map((entry) => (
        <li key={entry.id} className="relative pb-10 last:pb-0">
          <span
            className="border-background bg-primary absolute top-1.5 -left-[1.625rem] size-2.5 rounded-full border-2"
            aria-hidden
          />
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {formatExperiencePeriod(entry.startDate, entry.endDate)}
            </p>
            <span className="bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wide">
              {TYPE_LABELS[entry.type]}
            </span>
          </div>
          <h3 className="text-foreground mt-2 text-xl">{entry.title}</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            {entry.organization}
            {entry.location ? ` · ${entry.location}` : null}
          </p>
          {entry.description.length > 0 ? (
            <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-4 text-sm leading-relaxed">
              {entry.description.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {entry.technologies && entry.technologies.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {entry.technologies.map((tech) => (
                <li key={tech}>
                  <TechBadge>{tech}</TechBadge>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
