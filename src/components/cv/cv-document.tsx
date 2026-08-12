import type { ReactNode } from "react";
import { TechBadge } from "@/components/shared/tech-badge";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { getEducation, getWorkExperience } from "@/lib/experience";
import {
  groupSkillsByCategory,
  SKILL_CATEGORY_LABELS,
  SKILL_CATEGORY_ORDER,
} from "@/lib/skills";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

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

/** CV-only date display (does not change shared About timeline formatting). */
function formatCvPeriod(
  startDate: string,
  endDate?: string | "present",
): string {
  const formatPart = (value: string) => {
    if (value === "present") return "Present";
    if (/^\d{4}-\d{2}(-\d{2})?$/.test(value)) {
      const normalized = value.length === 7 ? `${value}-01` : value;
      const date = new Date(normalized);
      if (!Number.isNaN(date.getTime())) {
        return new Intl.DateTimeFormat("en", {
          month: "short",
          year: "numeric",
        }).format(date);
      }
    }
    return value;
  };

  if (!endDate) return formatPart(startDate);
  return `${formatPart(startDate)} – ${formatPart(endDate)}`;
}

function cvProjectRank(project: Project) {
  if (project.featured) return 0;
  if (project.status === "completed") return 1;
  if (project.status === "in-progress") return 2;
  return 3;
}

function getCvProjects(items: Project[]) {
  return [...items].sort(
    (a, b) =>
      cvProjectRank(a) - cvProjectRank(b) ||
      b.year - a.year ||
      a.title.localeCompare(b.title),
  );
}

export function CvDocument() {
  const work = getWorkExperience();
  const education = getEducation();
  const cvProjects = getCvProjects(projects);
  const groupedSkills = groupSkillsByCategory(skills);
  const languages = profile.languages ?? [];
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
        "border-border bg-card text-card-foreground mx-auto w-full max-w-3xl border px-6 py-8 shadow-sm sm:px-10 sm:py-11",
        "rounded-none sm:rounded-sm",
        "print:max-w-none print:border-0 print:bg-white print:p-0 print:shadow-none print:text-black",
      )}
    >
      <header className="border-border space-y-2.5 border-b pb-8 print:border-neutral-400 print:pb-6">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground print:text-neutral-600">
          {profile.role}
        </p>
        <h2 className="font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem] print:text-black">
          {profile.name}
        </h2>
        <p className="text-muted-foreground max-w-2xl text-[0.95rem] leading-relaxed print:text-neutral-700">
          {profile.headline}
        </p>
        {contactBits.length > 0 ? (
          <p className="text-muted-foreground pt-1 text-sm print:text-neutral-600">
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
        <p className="text-foreground/90 text-sm leading-relaxed print:text-neutral-800">
          {profile.summary}
        </p>
      </CvBlock>

      <CvBlock title="Experience">
        {work.length === 0 ? (
          <EmptyHint message="Experience entries will appear here once added." />
        ) : (
          <ul className="space-y-6">
            {work.map((entry) => (
              <li key={entry.id} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="min-w-0 text-[0.95rem] font-semibold text-foreground print:text-black">
                    {entry.title}
                  </h3>
                  <p className="cv-entry-date shrink-0 font-mono text-xs text-muted-foreground print:text-neutral-600">
                    {formatCvPeriod(entry.startDate, entry.endDate)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground print:text-neutral-700">
                  {entry.organization}
                  {entry.location ? ` · ${entry.location}` : null}
                </p>
                {entry.description.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground print:text-neutral-700">
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

      <CvBlock title="Projects">
        {cvProjects.length === 0 ? (
          <EmptyHint message="Projects will appear here once added." />
        ) : (
          <ul className="space-y-6">
            {cvProjects.map((project) => {
              const highlights = (project.cvHighlights ?? []).slice(0, 3);
              return (
                <li key={project.id} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="min-w-0 text-[0.95rem] font-semibold text-foreground print:text-black">
                      {project.title}
                    </h3>
                    <p className="cv-entry-date shrink-0 font-mono text-xs text-muted-foreground print:text-neutral-600">
                      {project.year}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground print:text-neutral-700">
                    {project.shortDescription}
                  </p>
                  {highlights.length > 0 ? (
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground print:text-neutral-700">
                      {highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {project.liveUrl || project.githubUrl ? (
                    <p className="pt-1 text-sm text-muted-foreground print:text-neutral-600">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          className="text-foreground underline-offset-2 hover:underline print:text-neutral-800 print:no-underline"
                        >
                          Live
                        </a>
                      ) : null}
                      {project.liveUrl && project.githubUrl ? " · " : null}
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          className="text-foreground underline-offset-2 hover:underline print:text-neutral-800 print:no-underline"
                        >
                          GitHub
                        </a>
                      ) : null}
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
      </CvBlock>

      <CvBlock title="Education">
        {education.length === 0 ? (
          <EmptyHint message="Education entries will appear here once added." />
        ) : (
          <ul className="space-y-5">
            {education.map((entry) => (
              <li key={entry.id} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="min-w-0 text-[0.95rem] font-semibold text-foreground print:text-black">
                    {entry.title}
                  </h3>
                  <p className="cv-entry-date shrink-0 font-mono text-xs text-muted-foreground print:text-neutral-600">
                    {formatCvPeriod(entry.startDate, entry.endDate)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground print:text-neutral-700">
                  {entry.organization}
                  {entry.location ? ` · ${entry.location}` : null}
                </p>
                {entry.description.length > 0 ? (
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-muted-foreground print:text-neutral-700">
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

      <CvBlock title="Skills">
        {skills.length === 0 ? (
          <EmptyHint message="Skills will appear here once added." />
        ) : (
          <div className="space-y-5">
            {SKILL_CATEGORY_ORDER.map((category) => {
              const items = groupedSkills[category] ?? [];
              if (items.length === 0) return null;
              return (
                <div key={category} className="space-y-2.5">
                  <h3 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted-foreground print:text-neutral-600">
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

      <CvBlock title="Languages" className="border-b-0 pb-0">
        {languages.length === 0 ? (
          <EmptyHint message="Languages will appear here once added." />
        ) : (
          <ul className="space-y-2">
            {languages.map((language) => (
              <li
                key={language.name}
                className="flex items-baseline justify-between gap-4 text-sm"
              >
                <span className="font-medium text-foreground print:text-black">
                  {language.name}
                </span>
                <span className="text-muted-foreground print:text-neutral-600">
                  {language.proficiency}
                </span>
              </li>
            ))}
          </ul>
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
        "cv-section border-border space-y-4 border-b py-8 print:border-neutral-400",
        className,
      )}
    >
      <h2 className="cv-section-title font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground print:text-neutral-600">
        {title}
      </h2>
      {children}
    </section>
  );
}

function EmptyHint({ message }: { message: string }) {
  return (
    <p className="text-sm text-muted-foreground print:hidden">{message}</p>
  );
}
