import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { SectionHeading } from "@/components/shared/section-heading";
import { profile } from "@/data/profile";
import { getFeaturedProjects, PROJECT_CATEGORY_LABELS } from "@/lib/projects";
import { isPlaceholder } from "@/lib/seo";

export function AboutSummary() {
  const locationLabel =
    profile.location && !isPlaceholder(profile.location)
      ? `Based in ${profile.location}`
      : undefined;
  const shipped = getFeaturedProjects().filter((project) => project.liveUrl);

  return (
    <FadeIn delay={90}>
      <section
        aria-labelledby="about-summary-heading"
        className="grid gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16"
      >
        <div className="space-y-6">
          <SectionHeading
            id="about-summary-heading"
            eyebrow="Profile"
            title="Professional summary"
            description={locationLabel}
          />
          <p className="text-foreground max-w-[68ch] text-lg leading-relaxed">
            {profile.summary}
          </p>
        </div>

        {shipped.length > 0 ? (
          <aside
            aria-labelledby="shipped-heading"
            className="border-border bg-card self-start rounded-xl border p-6 shadow-sm"
          >
            <h3
              id="shipped-heading"
              className="text-muted-foreground font-mono text-xs font-normal tracking-[0.16em] uppercase"
            >
              Shipped & live
            </h3>
            <ul className="divide-border mt-4 divide-y">
              {shipped.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group/shipped flex min-h-14 items-center justify-between gap-4 py-3"
                  >
                    <span>
                      <span className="text-foreground group-hover/shipped:text-primary block font-medium transition-colors">
                        {project.title}
                      </span>
                      <span className="text-muted-foreground block text-sm">
                        {PROJECT_CATEGORY_LABELS[project.category]} ·{" "}
                        {project.role}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="text-muted-foreground size-4 shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/shipped:translate-x-0.5 motion-safe:group-hover/shipped:-translate-y-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </section>
    </FadeIn>
  );
}
