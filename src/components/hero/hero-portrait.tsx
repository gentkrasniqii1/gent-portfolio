import Image from "next/image";
import { Code2, MapPinned, Rocket, type LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { liveProductCount } from "@/data/stats";
import { cn } from "@/lib/utils";
import portrait from "../../../public/images/profile/gent-portrait.jpg";

type Chip = {
  label: string;
  icon: LucideIcon;
  /** Placement around the portrait; chips only render from `md` up. */
  position: string;
};

const chips: Chip[] = [
  {
    label: "Next.js",
    icon: Code2,
    position: "top-5 -left-8 lg:top-10 lg:-left-12",
  },
  {
    label: "PostGIS",
    icon: MapPinned,
    position: "top-[46%] -right-4 lg:-right-7",
  },
  {
    label: `${liveProductCount} live products`,
    icon: Rocket,
    position: "bottom-3 -left-3 lg:bottom-6 lg:left-0",
  },
];

/**
 * Circular portrait with its own accent ring (the source photo is pre-cropped
 * inside its baked-in ring, so none of it shows through the mask).
 */
export function HeroPortrait() {
  return (
    <FadeIn variant="scale" className="relative">
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute -inset-10 rounded-full md:-inset-16"
      />

      <div className="relative size-40 md:size-[260px] lg:size-[360px]">
        <div
          aria-hidden
          className="portrait-ring absolute inset-0 rounded-full motion-safe:animate-ring"
        />
        <div className="bg-background absolute inset-[3px] rounded-full p-1 md:inset-1 md:p-1.5">
          <div className="bg-muted relative size-full overflow-hidden rounded-full">
            <Image
              src={portrait}
              alt="Portrait of Gent Krasniqi"
              placeholder="blur"
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 344px, (min-width: 768px) 248px, 150px"
              className="size-full object-cover"
            />
          </div>
        </div>

        <div aria-hidden className="pointer-events-none hidden md:block">
          {chips.map(({ label, icon: Icon, position }, index) => (
            <FadeIn
              key={label}
              delay={420 + index * 90}
              className={cn("absolute", position)}
            >
              <div
                className="motion-safe:animate-float"
                style={{ animationDelay: `${index * -2}s` }}
              >
                <span className="border-border bg-card text-card-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-md">
                  <Icon className="text-accent size-3.5" />
                  {label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
