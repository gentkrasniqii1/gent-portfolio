import type { ReactNode } from "react";
import { TechBadge } from "@/components/shared/tech-badge";
import { skills } from "@/data/skills";
import { profile } from "@/data/profile";
import {
  formatExperiencePeriod,
  getEducation,
  getWorkExperience,
} from "@/lib/experience";
import {
  groupSkillsByCategory,
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_ORDER,
} from "@/lib/skills";
import { cn } from "@/lib/utils";

function isPlaceholder(value: string | undefined) {
  return !value || value.startsWith("[YOUR");
}

function formatLastUpdated(value: string) {
  if (isPlaceholder(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function CvDocument() {
  const work = getWorkExperience();
  const education = getEducation();
  const groupedSkills = groupSkillsByCategory(skills);
  const contactBits = [
    !isPlaceholder(profile.email) ? profile.email : null,
    !isPlaceholder(profile.location) ? profile.location : null,
    !isPlaceholder(profile.github) ? profile.github : null,
    !isPlaceholder(profile.linkedin) ? profile.linkedin : null,
  ].filter(Boolean) as string[];

  return (
    <article
      id="cv-document"
      className={cn(
        "border-border bg-card text-card-foreground rounded-lg border p-6 shadow-sm sm:p-10",
        "print:border-0 print:bg-white print:p-0 print:shadow-none print:text-black",
      )}
    >
      <header className="border-border space-y-3 border-b pb-6 print:border-black">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground print:text-neutral-600">
          {profile.role}
        </p>
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl print:text-black">
          {profile.name}
        </h2>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed print:text-neutral-700">
          {profile.headline}
        </p>
        {contactBits.length > 0 ? (
          <p className="text-muted-foreground text-sm print:text-neutral-600">
            {contactBits.join(" · ")}
          </p>
        ) : null}
        {!isPlaceholder(profile.cvLastUpdated) ? (
          <p className="text-muted-foreground text-xs print:text-neutral-500">
            Last updated: {formatLastUpdated(profile.cvLastUpdated)}
          </p>
        ) : null}
      </header>

      <CvBlock title="Summary">
        <p className="text-sm leading-relaxed text-muted-foreground print:text-neutral-700">
          {profile.summary}
        </p>
      </CvBlock>

      <CvBlock title="Experience">
        {work.length === 0 ? (
          <EmptyHint message="Experience entries will appear here once added." />
        ) : (
          <ul className="space-y-5">
            {work.map((entry) => (
              <li key={entry.id} className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-medium print:text-black">
                    {entry.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground print:text-neutral-600">
                    {formatExperiencePeriod(entry.startDate, entry.endDate)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground print:text-neutral-700">
                  {entry.organization}
                  {entry.location ? ` · ${entry.location}` : null}
                </p>
                {entry.description.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground print:text-neutral-700">
                    {entry.description.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </CvBlock>

      <CvBlock title="Education">
        {education.length === 0 ? (
          <EmptyHint message="Education entries will appear here once added." />
        ) : (
          <ul className="space-y-4">
            {education.map((entry) => (
              <li key={entry.id} className="space-y-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-medium print:text-black">
                    {entry.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground print:text-neutral-600">
                    {formatExperiencePeriod(entry.startDate, entry.endDate)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground print:text-neutral-700">
                  {entry.organization}
                  {entry.location ? ` · ${entry.location}` : null}
                </p>
              </li>
            ))}
          </ul>
        )}
      </CvBlock>

      <CvBlock title="Skills" className="border-b-0 pb-0">
        {skills.length === 0 ? (
          <EmptyHint message="Skills will appear here once added." />
        ) : (
          <div className="space-y-4">
            {SKILL_CATEGORY_ORDER.map((category) => {
              const items = groupedSkills[category] ?? [];
              if (items.length === 0) return null;
              return (
                <div key={category} className="space-y-2">
                  <h3 className="text-sm font-medium print:text-black">
                    {SKILL_CATEGORY_LABELS[category]}
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <li key={skill.name}>
                        <TechBadge className="print:border print:border-neutral-300 print:bg-transparent print:text-black">
                          {skill.name}
                        </TechBadge>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </CvBlock>
    </article>
  );
}

function CvBlock({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "border-border space-y-3 border-b py-6 print:break-inside-avoid print:border-neutral-300",
        className,
      )}
    >
      <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground print:text-neutral-600">
        {title}
      </h2>
      {children}
    </section>
  );
}

function EmptyHint({ message }: { message: string }) {
  return (
    <p className="text-sm text-muted-foreground print:text-neutral-600">
      {message}
    </p>
  );
}
