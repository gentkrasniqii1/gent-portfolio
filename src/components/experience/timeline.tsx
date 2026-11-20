import { StaggerChildren, StaggerItem } from "@/components/motion/stagger";
import { TechBadge } from "@/components/shared/tech-badge";
import { formatExperiencePeriod } from "@/lib/experience";
import { cn } from "@/lib/utils";
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
    <StaggerChildren as="ol" className="border-border max-w-2xl border-l pl-7">
      {items.map((entry) => {
        const current = entry.endDate === "present";
        return (
          <StaggerItem
            key={entry.id}
            as="li"
            className="relative pb-10 last:pb-0"
          >
            {/* Rail marker; ongoing roles get a soft pulse. */}
            <span
              aria-hidden
              className="absolute top-1 -left-[2.125rem] flex size-3.5 items-center justify-center"
            >
              {current ? (
                <span className="bg-accent/50 absolute inset-0 rounded-full motion-safe:animate-ping" />
              ) : null}
              <span
                className={cn(
                  "border-background relative size-3.5 rounded-full border-[3px]",
                  current ? "bg-accent" : "bg-primary",
                )}
              />
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
                {formatExperiencePeriod(entry.startDate, entry.endDate)}
              </p>
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 text-[0.65rem] font-medium tracking-wide uppercase",
                  current
                    ? "bg-accent/10 text-accent"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {current && entry.type !== "education"
                  ? "Current"
                  : TYPE_LABELS[entry.type]}
              </span>
            </div>
            <h3 className="text-foreground mt-2 text-xl">{entry.title}</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {entry.organization}
              {entry.location ? ` · ${entry.location}` : null}
            </p>
            {entry.description.length > 0 ? (
              <ul className="text-muted-foreground mt-3 max-w-prose list-disc space-y-2 pl-4 text-sm leading-relaxed">
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
          </StaggerItem>
        );
      })}
    </StaggerChildren>
  );
}
