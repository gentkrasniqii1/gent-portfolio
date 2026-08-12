import { Reveal } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { profile } from "@/data/profile";

export function LanguagesList() {
  const languages = profile.languages ?? [];

  return (
    <Reveal>
      <section aria-labelledby="languages-heading" className="space-y-6">
        <SectionHeading
          id="languages-heading"
          eyebrow="Languages"
          title="Spoken languages"
          description="Communication languages beyond the technical stack."
        />

        {languages.length === 0 ? (
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            Languages will appear here once added.
          </p>
        ) : (
          <ul className="max-w-md space-y-3">
            {languages.map((language) => (
              <li
                key={language.name}
                className="border-border flex items-baseline justify-between gap-4 border-b pb-3 last:border-b-0 last:pb-0"
              >
                <span className="text-foreground font-medium">
                  {language.name}
                </span>
                <span className="text-muted-foreground text-sm">
                  {language.proficiency}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Reveal>
  );
}
