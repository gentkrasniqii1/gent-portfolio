import { SectionHeading } from "@/components/shared/section-heading";
import { formatExperiencePeriod, getEducation } from "@/lib/experience";

export function EducationList() {
  const education = getEducation();

  return (
    <section aria-labelledby="education-heading" className="space-y-8">
      <SectionHeading
        id="education-heading"
        eyebrow="Education"
        title="Studies & training"
        description="Formal education and relevant academic background."
      />

      {education.length === 0 ? (
        <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
          No education entries yet. Add items with{" "}
          <code className="text-foreground font-mono">
            type: &quot;education&quot;
          </code>{" "}
          in{" "}
          <code className="text-foreground font-mono">
            src/data/experience.ts
          </code>
          .
        </p>
      ) : (
        <ol className="border-border max-w-2xl space-y-0 border-l pl-6">
          {education.map((entry) => (
            <li key={entry.id} className="relative pb-10 last:pb-0">
              <span
                className="border-background bg-accent absolute top-1.5 -left-[1.625rem] size-2.5 rounded-full border-2"
                aria-hidden
              />
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {formatExperiencePeriod(entry.startDate, entry.endDate)}
              </p>
              <h3 className="text-foreground mt-2 text-xl">{entry.title}</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                {entry.organization}
                {entry.location ? ` · ${entry.location}` : null}
              </p>
              {entry.description.length > 0 ? (
                <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-relaxed">
                  {entry.description.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
