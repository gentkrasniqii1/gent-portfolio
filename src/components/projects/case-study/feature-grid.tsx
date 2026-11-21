import { FeatureIcon } from "@/components/projects/case-study/feature-icon";
import type { ProjectFeature } from "@/types/project";

export function FeatureGrid({ features }: { features: ProjectFeature[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {features.map((feature) => (
        <li
          key={feature.title}
          className="border-border bg-card flex gap-4 rounded-xl border p-5 shadow-sm sm:block"
        >
          <span className="bg-accent/10 text-accent inline-flex size-10 shrink-0 items-center justify-center rounded-lg">
            <FeatureIcon icon={feature.icon} className="size-5" />
          </span>
          <div>
            <h3 className="text-foreground font-sans text-base font-semibold tracking-normal sm:mt-4">
              {feature.title}
            </h3>
            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
