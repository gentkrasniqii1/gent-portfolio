import { SectionHeading } from "@/components/shared/section-heading";
import { profile } from "@/data/profile";

export function AboutSummary() {
  const locationLabel =
    profile.location && !profile.location.startsWith("[YOUR")
      ? `Based in ${profile.location}`
      : undefined;

  return (
    <section aria-labelledby="about-summary-heading" className="space-y-6">
      <SectionHeading
        id="about-summary-heading"
        eyebrow="Profile"
        title="Professional summary"
        description={locationLabel}
      />
      <div className="max-w-2xl space-y-4">
        <p className="text-foreground text-lg leading-relaxed">
          {profile.summary}
        </p>
        <p className="text-muted-foreground text-base leading-relaxed">
          {profile.headline}
        </p>
      </div>
    </section>
  );
}
