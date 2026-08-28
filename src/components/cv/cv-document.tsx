import type { ReactNode } from "react";
import { TechBadge } from "@/components/shared/tech-badge";
import { getCvData } from "@/data/cv";
import { cn } from "@/lib/utils";
import type { CvData } from "@/types/cv";

export function CvDocument({ data = getCvData() }: { data?: CvData }) {
  const {
    identity,
    experience,
    projects,
    education,
    skillGroups,
    languages,
    certifications,
  } = data;

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
          {identity.role}
        </p>
        <h2 className="font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-[2rem] print:text-black">
          {identity.name}
        </h2>
        <p className="text-muted-foreground max-w-2xl text-[0.95rem] leading-relaxed print:text-neutral-700">
          {identity.headline}
        </p>
        {identity.contactBits.length > 0 ? (
          <p className="text-muted-foreground pt-1 text-sm print:text-neutral-600">
            {identity.contactBits.join(" · ")}
          </p>
        ) : null}
        {identity.lastUpdatedLabel ? (
          <p className="text-muted-foreground text-xs print:text-neutral-500">
            {identity.lastUpdatedLabel}
          </p>
        ) : null}
      </header>

      <CvBlock title="Summary">
        <p className="text-foreground/90 text-sm leading-relaxed print:text-neutral-800">
          {identity.summary}
        </p>
      </CvBlock>

      <CvBlock title="Experience">
        {experience.length === 0 ? (
          <EmptyHint message="Experience entries will appear here once added." />
        ) : (
          <ul className="space-y-6">
            {experience.map((entry) => (
              <li key={entry.id} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="min-w-0 text-[0.95rem] font-semibold text-foreground print:text-black">
                    {entry.title}
                  </h3>
                  <p className="cv-entry-date shrink-0 font-mono text-xs text-muted-foreground print:text-neutral-600">
                    {entry.period}
                  </p>
                </div>
                {entry.organization || entry.location ? (
                  <p className="text-sm text-muted-foreground print:text-neutral-700">
                    {entry.organization}
                    {entry.location ? ` · ${entry.location}` : null}
                  </p>
                ) : null}
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
        {projects.length === 0 ? (
          <EmptyHint message="Projects will appear here once added." />
        ) : (
          <ul className="space-y-6">
            {projects.map((project) => (
              <li key={project.id} className="space-y-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="min-w-0 text-[0.95rem] font-semibold text-foreground print:text-black">
                    {project.title}
                  </h3>
                  <p className="cv-entry-date shrink-0 font-mono text-xs text-muted-foreground print:text-neutral-600">
                    {project.year}
                  </p>
                </div>
                {project.shortDescription ? (
                  <p className="text-sm leading-relaxed text-muted-foreground print:text-neutral-700">
                    Stack: {project.shortDescription}
                  </p>
                ) : null}
                {project.highlights.length > 0 ? (
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground print:text-neutral-700">
                    {project.highlights.map((item) => (
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
            ))}
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
                    {entry.period}
                  </p>
                </div>
                {entry.organization || entry.location ? (
                  <p className="text-sm text-muted-foreground print:text-neutral-700">
                    {entry.organization}
                    {entry.location ? ` · ${entry.location}` : null}
                  </p>
                ) : null}
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
        {skillGroups.length === 0 ? (
          <EmptyHint message="Skills will appear here once added." />
        ) : (
          <div className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.id} className="space-y-2.5">
                <h3 className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted-foreground print:text-neutral-600">
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <TechBadge className="print:border print:border-neutral-300 print:bg-transparent print:text-black">
                        {skill}
                      </TechBadge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </CvBlock>

      <CvBlock
        title="Additional Information"
        className={
          languages.length === 0 && certifications.length === 0
            ? "hidden"
            : undefined
        }
      >
        {languages.length > 0 ? (
          <p className="text-sm text-muted-foreground print:text-neutral-700">
            <span className="font-medium text-foreground print:text-black">
              Languages:{" "}
            </span>
            {languages
              .map((language) =>
                language.proficiency
                  ? `${language.name} (${language.proficiency})`
                  : language.name,
              )
              .join(", ")}
          </p>
        ) : null}
        {certifications.length > 0 ? (
          <p className="text-muted-foreground mt-3 text-sm print:text-neutral-700">
            <span className="font-medium text-foreground print:text-black">
              Certifications:{" "}
            </span>
            {certifications.map((cert) => cert.label).join("; ")}
          </p>
        ) : null}
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
